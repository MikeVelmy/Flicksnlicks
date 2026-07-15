"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, products } from "@/data/site";
import type { CategoryId } from "@/types";

type FilterId = CategoryId | "all";

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="menu" className="bg-charcoal py-14 sm:py-20 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-red-bright">
          Full menu
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl">
          Pick your craving
        </h2>
        <p className="mt-3 max-w-xl font-body text-cream-dim">
          From suya straight off the grill to loaded shawarma and combo
          plates built for sharing — browse by category or see it all.
        </p>

        <div
          className="mt-7 -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter menu by category"
        >
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            aria-pressed={activeFilter === "all"}
            className={`shrink-0 rounded-full border-2 px-4 py-2.5 font-display text-sm font-bold transition-colors ${
              activeFilter === "all"
                ? "border-red bg-red text-cream"
                : "border-white/15 bg-transparent text-cream-dim hover:border-white/35"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
              className={`shrink-0 rounded-full border-2 px-4 py-2.5 font-display text-sm font-bold transition-colors ${
                activeFilter === cat.id
                  ? "border-red bg-red text-cream"
                  : "border-white/15 bg-transparent text-cream-dim hover:border-white/35"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.slug}
              className="relative flex gap-4 overflow-hidden rounded-xl border border-white/10 bg-ink p-4"
            >
              {product.image ? (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-deep to-charcoal-light">
                  <span className="font-display text-lg font-bold text-cream/90">
                    {product.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold leading-tight text-cream">
                    {product.name}
                  </h3>
                  <span className="shrink-0 font-display text-base font-bold text-red-bright">
                    ₵{product.price}
                  </span>
                </div>
                {product.style && (
                  <p className="mt-0.5 font-body text-xs font-semibold uppercase tracking-wide text-cream-dim/60">
                    {product.style}
                  </p>
                )}
                <p className="mt-1 line-clamp-2 font-body text-sm text-cream-dim">
                  {product.description}
                </p>
                {product.badge && (
                  <span className="mt-2 inline-block rounded-md bg-red/15 px-2 py-0.5 font-body text-[0.7rem] font-semibold text-red-bright">
                    {product.badge}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-8 font-body text-cream-dim">
            No items in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
