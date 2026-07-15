import Image from "next/image";
import { featuredProducts } from "@/data/site";

export default function FeaturedItems() {
  return (
    <section className="bg-ink py-14 sm:py-20" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-red-bright">
              Crowd favorites
            </span>
            <h2
              id="featured-heading"
              className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl"
            >
              Featured picks
            </h2>
          </div>
        </div>

        <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article
              key={product.slug}
              className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-charcoal sm:w-auto"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-light">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 78vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-deep via-red to-charcoal-light p-4">
                    <span className="font-display text-center text-xl font-bold leading-tight text-cream">
                      {product.name}
                    </span>
                  </div>
                )}
                {product.badge && (
                  <span className="marker-tag absolute left-3 top-3 rounded-md bg-red px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-wide text-cream shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-cream">
                  {product.name}
                </h3>
                <p className="mt-1 line-clamp-2 font-body text-sm text-cream-dim">
                  {product.description}
                </p>
                <p className="mt-3 font-display text-lg font-bold text-red-bright">
                  ₵{product.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
