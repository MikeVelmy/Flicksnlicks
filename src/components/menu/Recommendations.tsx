import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

export default function Recommendations({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
        You might also like
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/menu/${product.slug}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-charcoal transition-colors hover:border-white/25"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-charcoal-light">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(min-width: 640px) 200px, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <h3 className="font-display text-sm font-bold leading-tight text-cream">
                {product.name}
              </h3>
              <p className="mt-1 font-display text-sm font-bold text-red-bright">
                ₵{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
