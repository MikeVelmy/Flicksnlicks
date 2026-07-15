"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import AddToOrderButton from "@/components/menu/AddToOrderButton";
import { categories, products } from "@/data/menu";
import type { CategoryId } from "@/types";

type FilterId = CategoryId | "all";

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory =
        activeFilter === "all" || p.category === activeFilter;
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, query]);

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
          plates built for sharing — search, filter, and tap a dish for the
          full details.
        </p>

        <div className="mt-6 relative">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cream-dim/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu…"
            aria-label="Search the menu"
            className="w-full rounded-full border-2 border-white/15 bg-ink py-3.5 pl-12 pr-4 text-base text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
          />
        </div>

        <div
          className="mt-5 -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
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
              className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-white/10 bg-ink p-4 transition-colors hover:border-white/25"
            >
              <Link
                href={`/menu/${product.slug}`}
                className="flex gap-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
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
              </Link>

              <div className="border-t border-white/10 pt-3">
                <AddToOrderButton
                  product={{
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                  }}
                  size="sm"
                />
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-8 font-body text-cream-dim">
            No dishes match &ldquo;{query}&rdquo; — try another search or
            category.
          </p>
        )}
      </div>
    </section>
  );
}
