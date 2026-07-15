"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteInfo } from "@/data/site";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        isScrolled || isOpen
          ? "bg-ink/95 border-white/10 backdrop-blur-sm"
          : "bg-ink/70 border-transparent backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="#top"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative block h-11 w-11 overflow-hidden rounded-full ring-2 ring-red">
            <Image
              src="/images/logo.webp"
              alt="Flicks & Licks logo"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </span>
          <span className="font-display text-lg font-bold leading-none text-cream sm:text-xl">
            Flicks<span className="text-red-bright"> &amp; </span>Licks
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm font-semibold text-cream-dim transition-colors hover:text-red-bright"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={`https://wa.me/${siteInfo.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-red px-5 py-2.5 font-display text-sm font-bold text-cream shadow-[0_4px_0_0_var(--color-red-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
          >
            Order Now
          </a>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-charcoal md:hidden"
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-cream transition-transform ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-cream transition-opacity ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-cream transition-transform ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${isOpen ? "block" : "hidden"} border-t border-white/10 bg-ink`}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-4"
          aria-label="Mobile primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 font-display text-base font-semibold text-cream active:bg-charcoal"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${siteInfo.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-red px-5 py-3.5 font-display text-base font-bold text-cream shadow-[0_4px_0_0_var(--color-red-deep)]"
          >
            Order Now on WhatsApp
          </a>
          <p className="mt-3 px-3 text-xs text-cream-dim/70">
            {siteInfo.location} · Cash only
          </p>
        </nav>
      </div>
    </header>
  );
}
