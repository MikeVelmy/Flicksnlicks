"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantityStepper from "@/components/menu/QuantityStepper";
import PaymentMethods, { type PaymentMethod } from "@/components/cart/PaymentMethods";
import OrderDetails, { emptyOrderDetails, type OrderDetailsValue } from "@/components/cart/OrderDetails";
import { siteInfo } from "@/data/site";

const MOMO_CHECKOUT_KEY = "fl-momo-checkout";
const MOMO_CHECKOUT_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24h
const REFERENCE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous 0/O/1/I

interface MomoCheckoutState {
  reference: string;
  submitted: boolean;
  savedAt: number;
}

function generateReference() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += REFERENCE_CHARS[Math.floor(Math.random() * REFERENCE_CHARS.length)];
  }
  return `FL-${code}`;
}

function formatDetailsLines(details: OrderDetailsValue) {
  return [
    details.name.trim() && `Receiver: ${details.name.trim()}`,
    details.contact.trim() && `Contact: ${details.contact.trim()}`,
    `Location: ${details.location.trim() || "___"}`,
    details.notes.trim() && `Notes: ${details.notes.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
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
  const [details, setDetails] = useState<OrderDetailsValue>(emptyOrderDetails);
  const [showDetails, setShowDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile-money");
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [momoReference, setMomoReference] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreviewUrl, setScreenshotPreviewUrl] = useState<string | null>(null);
  const [momoSubmitted, setMomoSubmitted] = useState(false);
  const [proofError, setProofError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"number" | "reference" | null>(null);
  const hydratedMomoRef = useRef(false);

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

  // Build a tiny local preview for the attached screenshot and clean it up
  // when it changes or unmounts, so we don't leak blob URLs.
  useEffect(() => {
    if (!screenshotFile) {
      setScreenshotPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(screenshotFile);
    setScreenshotPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [screenshotFile]);

  // Rehydrate an in-progress Mobile Money checkout across reloads so the
  // customer doesn't lose their reference number mid-payment.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MOMO_CHECKOUT_KEY);
      if (stored) {
        const parsed: MomoCheckoutState = JSON.parse(stored);
        if (Date.now() - parsed.savedAt < MOMO_CHECKOUT_MAX_AGE_MS) {
          setMomoReference(parsed.reference);
          setMomoSubmitted(parsed.submitted);
        } else {
          localStorage.removeItem(MOMO_CHECKOUT_KEY);
        }
      }
    } catch {
      // ignore malformed local storage
    } finally {
      hydratedMomoRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydratedMomoRef.current) return;
    if (momoReference) {
      localStorage.setItem(
        MOMO_CHECKOUT_KEY,
        JSON.stringify({ reference: momoReference, submitted: momoSubmitted, savedAt: Date.now() })
      );
    } else {
      localStorage.removeItem(MOMO_CHECKOUT_KEY);
    }
  }, [momoReference, momoSubmitted]);

  // Generate a reference the moment Mobile Money becomes the selected method.
  useEffect(() => {
    if (paymentMethod === "mobile-money" && !momoReference && items.length > 0) {
      setMomoReference(generateReference());
    }
  }, [paymentMethod, momoReference, items.length]);

  // Clear a stale reference once the cart is emptied outside of a submission
  // (e.g. "Clear order"), so the next checkout starts fresh.
  useEffect(() => {
    if (items.length === 0 && momoReference && !momoSubmitted) {
      setMomoReference(null);
    }
  }, [items.length, momoReference, momoSubmitted]);

  const orderLines = items.map((i) => `${i.quantity}x ${i.name}`).join("\n");
  const whatsappMessage = `Hello Flicks & Licks, I'd like to order:\n${orderLines}\nTotal: GHS ${totalPrice}\n${formatDetailsLines(details)}`;
  const whatsappHref = `https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopy = async (text: string, field: "number" | "reference") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // Clipboard API unavailable — the value is still visible to copy manually.
    }
  };

  const handleNotifyRestaurant = () => {
    if (!transactionId.trim() && !screenshotFile) {
      setProofError("Enter your transaction ID or attach a screenshot.");
      return;
    }
    setProofError(null);

    const proofLines = [
      transactionId.trim() && `Transaction ID: ${transactionId.trim()}`,
      screenshotFile && `Screenshot: ${screenshotFile.name} (I'll attach this here)`,
    ]
      .filter(Boolean)
      .join("\n");

    const message = `Hello Flicks & Licks, I've sent Mobile Money payment.\nReference: ${momoReference}\nAmount: GHS ${totalPrice}\n${proofLines}\n\nOrder:\n${orderLines}\n${formatDetailsLines(details)}`;
    const href = `https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(href, "_blank", "noopener,noreferrer");

    setMomoSubmitted(true);
    clearCart();
  };

  const handleDone = () => {
    setMomoSubmitted(false);
    setMomoReference(null);
    setTransactionId("");
    setScreenshotFile(null);
    closeCart();
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

        {momoSubmitted ? (
          /* Pending Confirmation Screen */
          <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/15">
              <svg
                className="h-7 w-7 text-purple-300"
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
              We&apos;ve got your payment details!
            </h3>
            <p className="mt-1 font-body text-sm text-cream-dim">
              We&apos;re confirming your Mobile Money payment on WhatsApp — we&apos;ll start
              preparing your order as soon as it&apos;s confirmed.
            </p>

            <div className="mt-5 w-full rounded-lg border border-white/10 bg-charcoal/60 p-3.5 text-left">
              <p className="font-body text-xs text-cream-dim">Reference</p>
              <p className="font-display text-lg font-bold tracking-wide text-purple-300">
                {momoReference}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDone}
              className="mt-5 flex w-full items-center justify-center rounded-full bg-red px-6 py-3.5 font-display text-base font-bold text-cream shadow-[0_5px_0_0_var(--color-red-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
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
                <div className="max-h-80 space-y-2.5 overflow-y-auto">
                  {/* Order Details Dropdown */}
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    aria-expanded={showDetails}
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2.5 transition-colors hover:border-white/20"
                  >
                    <div className="min-w-0 text-left text-sm">
                      <span className="text-cream-dim">Details</span>{" "}
                      <span className="font-display font-semibold text-cream">
                        {[details.name.trim(), details.location.trim()]
                          .filter(Boolean)
                          .join(" · ") || "Add receiver & location"}
                      </span>
                    </div>
                    <svg
                      className={`h-4 w-4 shrink-0 text-cream-dim transition-transform ${
                        showDetails ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDetails && <OrderDetails value={details} onChange={setDetails} />}

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
                          Send MoMo
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
                        setProofError(null);
                      }}
                    />
                  )}

                  {paymentMethod === "mobile-money" && momoReference && (
                    <>
                      {/* Payment instructions */}
                      <div className="space-y-3 rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-body text-xs text-cream-dim">Send Mobile Money to</p>
                            <p className="font-display text-base font-bold text-cream">
                              {siteInfo.momoNumber}
                            </p>
                            <p className="font-body text-xs text-cream-dim">
                              {siteInfo.momoAccountName}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(siteInfo.momoNumber, "number")}
                            className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 font-body text-[11px] font-semibold text-cream-dim transition-colors hover:border-white/30"
                          >
                            {copied === "number" ? "Copied" : "Copy"}
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-3">
                          <div className="min-w-0">
                            <p className="font-body text-xs text-cream-dim">Amount</p>
                            <p className="font-display text-base font-bold text-red-bright">
                              ₵{totalPrice}
                            </p>
                          </div>
                          <div className="min-w-0 text-right">
                            <p className="font-body text-xs text-cream-dim">Your reference</p>
                            <p className="font-display text-base font-bold tracking-wide text-purple-300">
                              {momoReference}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(momoReference, "reference")}
                            className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 font-body text-[11px] font-semibold text-cream-dim transition-colors hover:border-white/30"
                          >
                            {copied === "reference" ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>

                      {/* Proof of payment */}
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Transaction ID (from MoMo SMS)"
                        aria-label="Mobile Money transaction ID"
                        className="w-full rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
                      />
                      {screenshotFile && screenshotPreviewUrl ? (
                        <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-charcoal/60 px-2.5 py-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={screenshotPreviewUrl}
                            alt="Payment screenshot preview"
                            className="h-10 w-10 shrink-0 rounded-md object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-body text-sm text-cream">
                              {screenshotFile.name}
                            </p>
                            <p className="font-body text-xs text-cream-dim">
                              Screenshot attached
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setScreenshotFile(null)}
                            aria-label="Remove screenshot"
                            className="shrink-0 font-body text-lg leading-none text-cream-dim/50 hover:text-red-bright"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2.5 text-sm text-cream-dim transition-colors hover:border-white/20">
                          <span>Or attach a screenshot</span>
                          <span className="shrink-0 font-display text-xs font-bold text-red-bright">
                            Browse
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setScreenshotFile(e.target.files?.[0] ?? null)}
                          />
                        </label>
                      )}
                    </>
                  )}

                  {proofError && (
                    <p className="font-body text-xs text-red-bright">{proofError}</p>
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
                    onClick={handleNotifyRestaurant}
                    className="mt-3 flex w-full items-center justify-center rounded-full bg-purple-600 px-6 py-3.5 font-display text-base font-bold text-cream shadow-[0_5px_0_0_var(--color-purple-700)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    Payment Made — Notify Restaurant
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
