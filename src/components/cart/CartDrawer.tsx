"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantityStepper from "@/components/menu/QuantityStepper";
import { siteInfo } from "@/data/site";

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

  const orderLines = items.map((i) => `${i.quantity}x ${i.name}`).join("\n");
  const whatsappMessage = `Hello Flicks & Licks, I'd like to order:\n${orderLines}\nTotal: GHS ${totalPrice}\nDelivery location: ${
    deliveryLocation.trim() || "___"
  }`;
  const whatsappHref = `https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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

        <div className="flex-1 overflow-y-auto px-5 py-4">
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
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
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
                        className="shrink-0 font-body text-lg leading-none text-cream-dim/60 hover:text-red-bright"
                      >
                        ×
                      </button>
                    </div>
                    <p className="mt-0.5 font-body text-xs text-cream-dim">
                      ₵{item.price} each
                    </p>
                    <div className="mt-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(q) => updateQuantity(item.slug, q)}
                        size="sm"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 px-5 py-4">
            <label
              htmlFor="delivery-location"
              className="block font-body text-sm font-semibold text-cream-dim"
            >
              Delivery / pickup location
            </label>
            <input
              id="delivery-location"
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="e.g. Haatso Atomic branch"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-charcoal px-3.5 py-3 text-base text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="font-body text-sm text-cream-dim">Total</span>
              <span className="font-display text-xl font-bold text-red-bright">
                ₵{totalPrice}
              </span>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center rounded-full bg-red px-6 py-4 font-display text-base font-bold text-cream shadow-[0_5px_0_0_var(--color-red-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Order on WhatsApp
            </a>
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full text-center font-body text-xs text-cream-dim/60 hover:text-red-bright"
            >
              Clear order
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
