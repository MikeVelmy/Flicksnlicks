import { NextRequest, NextResponse } from "next/server";
import { PaystackNetworkError, verifyTransaction } from "@/lib/paystack";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  try {
    const result = await verifyTransaction(reference);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment verification failed.";
    // networkError: true means we simply couldn't reach Paystack — the charge
    // may still have gone through, so the client must not treat this as a
    // final "payment failed" and must not allow a fresh payment attempt.
    return NextResponse.json(
      { error: message, networkError: error instanceof PaystackNetworkError },
      { status: 500 }
    );
  }
}
