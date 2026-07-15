import Image from "next/image";
import { testimonials } from "@/data/site";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? "fill-red-bright" : "fill-white/15"}`}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6L10 14.9 4.6 17.8l1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-ink py-14 sm:py-20" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 sm:max-w-md lg:max-w-none">
            <Image
              src="/images/social-friends.webp"
              alt="Friends celebrating a night out at Flicks & Licks"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-red-bright">
              Loved locally
            </span>
            <h2
              id="testimonials-heading"
              className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl"
            >
              What the neighborhood is saying
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="rounded-2xl border border-white/10 bg-charcoal p-5"
                >
                  <Stars rating={t.rating} />
                  <blockquote className="mt-3 font-body text-sm leading-relaxed text-cream-dim">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 font-display text-sm font-bold text-cream">
                    {t.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
