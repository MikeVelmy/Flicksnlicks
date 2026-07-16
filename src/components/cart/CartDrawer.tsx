"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantityStepper from "@/components/menu/QuantityStepper";
import PaymentMethods, { type PaymentMethod } from "@/components/cart/PaymentMethods";
import { loadPaystackScript } from "@/lib/loadPaystackScript";
import { siteInfo } from "@/data/site";

type PaymentStatus = "idle" | "processing" | "success" | "unconfirmed";

const PENDING_PAYMENT_KEY = "fl-pending-payment";
const PENDING_PAYMENT_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24h

interface PaidOrder {
  reference: string;
  amountGhs: number;
  orderLines: string;
  deliveryLocation: string;
}

interface PendingPayment {
  reference: string;
  orderLines: string;
  deliveryLocation: string;
  savedAt: number;
}

export default function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile-money");
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [phone, setPhone] = useState("");
  const [provider, setProvider] = useState("mtn");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [payError, setPayError] = useState<string | null>(null);
  const [paidOrder, setPaidOrder] = useState<PaidOrder | null>(null);
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(null);
  const paymentResolvedRef = useRef(false);
  const hydratedPendingPaymentRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeCart]);

  // Rehydrate an unresolved Mobile Money payment across page reloads —
  // never let a customer re-pay when we simply couldn't confirm a charge
  // that may have already gone through.
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem(PENDING_PAYMENT_KEY);
        if (stored) {
          const parsed: PendingPayment = JSON.parse(stored);
          if (Date.now() - parsed.savedAt < PENDING_PAYMENT_MAX_AGE_MS) {
            setDeliveryLocation((prev) => prev || parsed.deliveryLocation);
            verifyPayment(parsed);
          } else {
            localStorage.removeItem(PENDING_PAYMENT_KEY);
          }
        }
      } catch {
        // ignore malformed local storage
      } finally {
        hydratedPendingPaymentRef.current = true;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydratedPendingPaymentRef.current) return;
    if (pendingPayment) {
      localStorage.setItem(PENDING_PAYMENT_KEY, JSON.stringify(pendingPayment));
    } else {
      localStorage.removeItem(PENDING_PAYMENT_KEY);
    }
  }, [pendingPayment]);

  const orderLines = items.map((i) => `${i.quantity}x ${i.name}`).join("\n");
  const whatsappMessage = `Hello Flicks & Licks, I'd like to order:\n${orderLines}\nTotal: GHS ${totalPrice}\nDelivery location: ${
    deliveryLocation.trim() || "___"
  }`;
  const whatsappHref = `https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const paidWhatsappHref = paidOrder
    ? `https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(
        `Hello Flicks & Licks, I just paid via Mobile Money.\nReference: ${paidOrder.reference}\nOrder:\n${paidOrder.orderLines}\nDelivery location: ${
          paidOrder.deliveryLocation || "___"
        }`
      )}`
    : "";

  const verifyPayment = async (payment: Omit<PendingPayment, "savedAt">) => {
    setPendingPayment({ ...payment, savedAt: Date.now() });
    setPaymentStatus("processing");
    try {
      const res = await fetch(
        `/api/paystack/verify?reference=${encodeURIComponent(payment.reference)}`
      );
      const data = await res.json();

      if (!res.ok) {
        if (data.networkError) {
          // We simply couldn't reach Paystack (network blip, timeout, etc).
          // The charge may have already gone through — do NOT let the
          // customer pay again. Offer retry-verification instead.
          setPayError(
            data.error ||
              "We couldn't confirm your payment. If money left your account, don't pay again — tap Retry."
          );
          setPaymentStatus("unconfirmed");
        } else {
          // Paystack gave us a definitive answer (e.g. invalid/unknown
          // reference) — safe to let the customer try a fresh payment.
          setPayError(data.error || "Could not verify payment. Please try again.");
          setPaymentStatus("idle");
          setPendingPayment(null);
        }
        return;
      }

      if (data.status === "success") {
        setPaidOrder({
          reference: data.reference,
          amountGhs: data.amountGhs,
          orderLines: payment.orderLines,
          deliveryLocation: payment.deliveryLocation,
        });
        setPaymentStatus("success");
        setPendingPayment(null);
        clearCart();
      } else {
        // Paystack gave us a definitive answer: the charge did not succeed.
        setPayError("Payment was not successful. Please try again.");
        setPaymentStatus("idle");
        setPendingPayment(null);
      }
    } catch (error) {
      setPayError(
        error instanceof Error ? error.message : "Could not verify payment."
      );
      setPaymentStatus("unconfirmed");
    }
  };

  const handlePayWithMobileMoney = async () => {
    if (!phone.trim()) {
      setPayError("Enter the phone number to pay with.");
      return;
    }
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      setPayError("Online payment isn't set up yet. Please choose Cash on Pickup.");
      return;
    }

    setPayError(null);
    setPaymentStatus("processing");
    paymentResolvedRef.current = false;

    try {
      await loadPaystackScript();
    } catch (error) {
      setPayError(
        error instanceof Error ? error.message : "Could not load payment provider."
      );
      setPaymentStatus("idle");
      return;
    }

    const email = `${phone.replace(/\D/g, "")}@guest.flicksandlicks.com`;

    window.PaystackPop!.setup({
      key: publicKey,
      email,
      amount: Math.round(totalPrice * 100),
      currency: "GHS",
      channels: ["mobile_money"],
      metadata: {
        phone,
        provider,
        deliveryLocation: deliveryLocation.trim(),
        orderLines,
        custom_fields: [
          { display_name: "Phone", variable_name: "phone", value: phone },
          { display_name: "Mobile Money Provider", variable_name: "provider", value: provider },
        ],
      },
      callback: (response) => {
        paymentResolvedRef.current = true;
        verifyPayment({
          reference: response.reference,
          orderLines,
          deliveryLocation: deliveryLocation.trim(),
        });
      },
      onClose: () => {
        if (!paymentResolvedRef.current) {
          setPaymentStatus("idle");
        }
      },
    }).openIframe();
  };

  return (
    <>
      <button
        type="button"
        aria-hidden={!isOpen}
        tabIndex={-1}
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Your order"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-white/10 bg-ink shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-lg font-bold text-cream">
            Your Order
            {totalItems > 0 && (
              <span className="ml-2 font-body text-sm font-normal text-cream-dim">
                ({totalItems} item{totalItems === 1 ? "" : "s"})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {(paymentStatus === "unconfirmed" ||
          (paymentStatus === "processing" && pendingPayment)) &&
        pendingPayment ? (
          /* Unconfirmed Screen — Paystack may have already charged the
             customer; never let them pay again from here, only retry
             confirming or fall back to WhatsApp with the reference. */
          <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15">
              {paymentStatus === "processing" ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400/30 border-t-amber-400" />
              ) : (
                <svg
                  className="h-7 w-7 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M12 3l9 16H3L12 3z"
                  />
                </svg>
              )}
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-cream">
              {paymentStatus === "processing"
                ? "Confirming your payment…"
                : "We couldn't confirm your payment"}
            </h3>
            <p className="mt-1 font-body text-sm text-cream-dim">
              {paymentStatus === "processing"
                ? "Hang tight, this only takes a moment."
                : payError ||
                  "If money left your account, don't pay again — tap Retry below."}
            </p>

            <div className="mt-5 w-full rounded-lg border border-white/10 bg-charcoal/60 p-3.5 text-left">
              <p className="font-body text-xs text-cream-dim">Reference</p>
              <p className="font-display text-sm font-semibold text-cream">
                {pendingPayment.reference}
              </p>
            </div>

            {paymentStatus === "unconfirmed" && (
              <>
                <button
                  type="button"
                  onClick={() => verifyPayment(pendingPayment)}
                  className="mt-5 flex w-full items-center justify-center rounded-full bg-amber-500 px-6 py-3.5 font-display text-base font-bold text-ink shadow-[0_5px_0_0_var(--color-amber-700,_#b45309)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  Retry confirmation
                </button>
                <a
                  href={`https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Flicks & Licks, I paid via Mobile Money but the site couldn't confirm it.\nReference: ${pendingPayment.reference}\nOrder:\n${pendingPayment.orderLines}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3.5 font-display text-base font-bold text-cream transition-colors hover:border-white/30"
                >
                  Message us on WhatsApp instead
                </a>
              </>
            )}
          </div>
        ) : paymentStatus === "success" && paidOrder ? (
          /* Success Screen */
          <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15">
              <svg
                className="h-7 w-7 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-cream">
              Payment successful!
            </h3>
            <p className="mt-1 font-body text-sm text-cream-dim">
              Your order is confirmed. We&apos;ve got it from here.
            </p>

            <div className="mt-5 w-full rounded-lg border border-white/10 bg-charcoal/60 p-3.5 text-left">
              <p className="font-body text-xs text-cream-dim">Reference</p>
              <p className="font-display text-sm font-semibold text-cream">
                {paidOrder.reference}
              </p>
              <p className="mt-2.5 font-body text-xs text-cream-dim">Amount paid</p>
              <p className="font-display text-sm font-semibold text-red-bright">
                ₵{paidOrder.amountGhs}
              </p>
            </div>

            <a
              href={paidWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center rounded-full bg-red px-6 py-3.5 font-display text-base font-bold text-cream shadow-[0_5px_0_0_var(--color-red-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Send confirmation on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                setPaymentStatus("idle");
                setPaidOrder(null);
                closeCart();
              }}
              className="mt-4 font-body text-sm text-cream-dim hover:text-red-bright"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Items Section - Scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-body text-cream-dim">
                    Your order is empty.
                  </p>
                  <Link
                    href="/#menu"
                    onClick={closeCart}
                    className="mt-3 font-display text-sm font-bold text-red-bright hover:underline"
                  >
                    Browse the menu →
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {items.map((item) => (
                    <li key={item.slug} className="flex items-center gap-3 py-3 first:pt-0">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-sm font-bold leading-tight text-cream">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeItem(item.slug)}
                            aria-label={`Remove ${item.name}`}
                            className="shrink-0 font-body text-base leading-none text-cream-dim/50 hover:text-red-bright"
                          >
                            ×
                          </button>
                        </div>
                        <p className="mt-0.5 font-body text-xs text-cream-dim">
                          ₵{item.price} each
                        </p>
                      </div>
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(q) => updateQuantity(item.slug, q)}
                        size="sm"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Checkout Section - Fixed Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-5 pt-3 pb-4">
                <div className="max-h-56 space-y-2.5 overflow-y-auto">
                  <input
                    id="delivery-location"
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Delivery / pickup location"
                    aria-label="Delivery or pickup location"
                    className="w-full rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
                  />

                  {/* Payment Methods Dropdown */}
                  <button
                    type="button"
                    onClick={() => setShowPaymentMethods(!showPaymentMethods)}
                    aria-expanded={showPaymentMethods}
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2.5 transition-colors hover:border-white/20"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-cream-dim">Pay with</span>
                      <span className="font-display font-semibold text-cream">
                        {paymentMethod === "cash" ? "Cash on Pickup" : "Mobile Money"}
                      </span>
                      {paymentMethod === "mobile-money" && (
                        <span className="rounded-full bg-purple-500/15 px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-purple-300">
                          Pay online
                        </span>
                      )}
                    </div>
                    <svg
                      className={`h-4 w-4 shrink-0 text-cream-dim transition-transform ${
                        showPaymentMethods ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showPaymentMethods && (
                    <PaymentMethods
                      selected={paymentMethod}
                      onSelect={(method) => {
                        setPaymentMethod(method);
                        setShowPaymentMethods(false);
                        setPayError(null);
                      }}
                    />
                  )}

                  {paymentMethod === "mobile-money" && (
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile Money number"
                        aria-label="Mobile Money phone number"
                        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
                      />
                      <select
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        aria-label="Mobile Money provider"
                        className="rounded-lg border border-white/10 bg-charcoal/60 px-2.5 py-2.5 text-sm text-cream focus:border-red focus:outline-none"
                      >
                        <option value="mtn">MTN</option>
                        <option value="airteltigo">AirtelTigo</option>
                        <option value="telecel">Telecel</option>
                      </select>
                    </div>
                  )}

                  {payError && (
                    <p className="font-body text-xs text-red-bright">{payError}</p>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-body text-sm text-cream-dim">Total</span>
                  <span className="font-display text-2xl font-bold text-red-bright">
                    ₵{totalPrice}
                  </span>
                </div>

                {paymentMethod === "mobile-money" ? (
                  <button
                    type="button"
                    onClick={handlePayWithMobileMoney}
                    disabled={paymentStatus === "processing"}
                    className="mt-3 flex w-full items-center justify-center rounded-full bg-purple-600 px-6 py-3.5 font-display text-base font-bold text-cream shadow-[0_5px_0_0_var(--color-purple-700)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {paymentStatus === "processing" ? "Processing…" : "Pay with Mobile Money"}
                  </button>
                ) : (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full items-center justify-center rounded-full bg-red px-6 py-3.5 font-display text-base font-bold text-cream shadow-[0_5px_0_0_var(--color-red-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    Pay with Cash on Pickup
                  </a>
                )}
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-2 w-full text-center font-body text-xs text-cream-dim/50 hover:text-red-bright"
                >
                  Clear order
                </button>
              </div>
            )}
          </>
        )}
      </aside>
    </>
  );
}
