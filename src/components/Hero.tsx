import Image from "next/image";
import { siteInfo } from "@/data/site";

const trustTags = [
  "Cash only",
  "Fresh off the grill",
  "Fast pickup",
  "5 locations in Accra",
  "The Suya Boss",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-charcoal"
    >
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-red/25 blur-3xl sm:h-96 sm:w-96"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:grid-cols-2 lg:items-center lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="order-2 lg:order-1">
          <span className="marker-tag inline-block rounded-md bg-red px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-cream sm:text-sm">
            The Suya Boss · Haatso Atomic
          </span>

          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.05] font-bold text-cream sm:text-6xl lg:text-6xl xl:text-7xl">
            Big flavor.
            <br />
            <span className="text-red-bright">Bold vibes.</span>
          </h1>

          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-cream-dim sm:text-lg">
            Fresh suya, loaded shawarma and combo plates grilled hot and
            served fast. Fresh picks, made to satisfy — cash only, easy
            cravings.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${siteInfo.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-red px-7 py-4 font-display text-base font-bold text-cream shadow-[0_5px_0_0_var(--color-red-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Order Now
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full border-2 border-cream/25 px-7 py-4 font-display text-base font-bold text-cream transition-colors hover:border-cream/60"
            >
              View Menu
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {trustTags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 font-body text-xs font-semibold text-cream-dim/80 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-bright" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border-4 border-charcoal-light shadow-2xl sm:max-w-md lg:max-w-none">
            <Image
              src="/images/hero-storefront.webp"
              alt="Flicks & Licks storefront signage in Haatso Atomic, home of the Suya Boss"
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 90vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10">
              <p className="font-display text-sm font-bold text-cream sm:text-base">
                Our flagship in Haatso Atomic — 5 locations across Accra
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
