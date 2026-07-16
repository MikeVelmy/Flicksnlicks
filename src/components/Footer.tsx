import Image from "next/image";
import { siteInfo } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";

const quickLinks = [
  { href: "/#about", label: "About" },
  { href: "/#menu", label: "Menu" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#location", label: "Location" },
  { href: "/#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="relative block h-10 w-10 overflow-hidden rounded-full ring-2 ring-red">
                <Image
                  src="/images/logo.webp"
                  alt="Flicks & Licks logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-lg font-bold text-cream">
                Flicks &amp; Licks
              </span>
            </div>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-cream-dim">
              Flicks &amp; Licks, the Suya Boss, is a local food brand with
              5 locations across Accra, serving fresh suya, loaded shawarma,
              wood fired pizza and combo plates. Cash &amp; Mobile Money accepted, pickup and
              dine in, easy ordering, big flavor.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-cream">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-cream-dim transition-colors hover:text-red-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-cream">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-cream-dim">
              <li>{siteInfo.location}</li>
              <li>{siteInfo.phonePrimary}</li>
            </ul>
            <SocialLinks className="mt-5 flex flex-wrap gap-3" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-cream-dim/70">
            © {new Date().getFullYear()} Flicks &amp; Licks. All rights
            reserved. 5 locations across Accra, Ghana.
          </p>
          <p className="font-body text-xs text-cream-dim/70">
            Cash &amp; Mobile Money · Local food brand in Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
