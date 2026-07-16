const PAYSTACK_API = "https://api.paystack.co";

/**
 * Thrown when we genuinely couldn't reach Paystack (network/timeout).
 * The charge may have already gone through — callers must NOT treat this
 * as "payment failed" and must not let the customer pay again.
 * Distinct from a definitive answer from Paystack (e.g. "reference not
 * found"), which is safe to treat as a real, final result.
 */
export class PaystackNetworkError extends Error {}

export interface VerifyResult {
  status: "success" | "failed" | "abandoned" | "pending" | string;
  amountGhs: number;
  currency: string;
  reference: string;
  gatewayResponse: string;
  paidAt: string | null;
  metadata: Record<string, unknown> | null;
}

const MAX_ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 8000;
const RETRY_DELAY_MS = 800;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function verifyTransaction(reference: string): Promise<VerifyResult> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "Paystack is not configured yet. Set PAYSTACK_SECRET_KEY in your environment."
    );
  }

  const url = `${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`;
  let lastNetworkError: unknown = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let res: Response;
    try {
      res = await fetchWithTimeout(
        url,
        { headers: { Authorization: `Bearer ${secretKey}` } },
        ATTEMPT_TIMEOUT_MS
      );
    } catch (error) {
      // Transient network failure (DNS blip, connection timeout, etc.) — retry.
      lastNetworkError = error;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(RETRY_DELAY_MS * attempt);
        continue;
      }
      throw new PaystackNetworkError(
        "We couldn't reach Paystack to confirm your payment. If money left your account, it went through — please contact us and we'll confirm your order manually."
      );
    }

    const json = await res.json();
    if (!res.ok || !json.status) {
      // Paystack responded — this is a real answer, not a network issue. Don't retry.
      throw new Error(json.message || "Failed to verify Paystack transaction.");
    }

    const data = json.data;
    return {
      status: data.status,
      amountGhs: data.amount / 100,
      currency: data.currency,
      reference: data.reference,
      gatewayResponse: data.gateway_response,
      paidAt: data.paid_at,
      metadata: data.metadata ?? null,
    };
  }

  // Unreachable, but keeps TypeScript happy.
  throw lastNetworkError instanceof Error
    ? lastNetworkError
    : new PaystackNetworkError("Failed to verify Paystack transaction.");
}
