import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AddToOrderButton from "@/components/menu/AddToOrderButton";
import Gallery from "@/components/menu/Gallery";
import LikeButton from "@/components/menu/LikeButton";
import Recommendations from "@/components/menu/Recommendations";
import ReviewSection from "@/components/menu/ReviewSection";
import ShareButton from "@/components/menu/ShareButton";
import { categories, products, seedReviews } from "@/data/menu";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.description} ₵${product.price} at Flicks & Licks. Order for pickup at any of our Accra locations.`,
    openGraph: {
      title: `${product.name} | Flicks & Licks`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.category);
  const recommended = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);
  const filler = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        !recommended.some((r) => r.slug === p.slug)
    )
    .slice(0, 3 - recommended.length);
  const recommendations = [...recommended, ...filler];

  return (
    <>
      <Header />
      <main className="flex-1 bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/#menu"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-cream-dim hover:text-red-bright"
          >
            <span aria-hidden="true">←</span> Back to menu
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <Gallery images={product.images} alt={product.name} />

            <div>
              {category && (
                <span className="font-display text-xs font-bold uppercase tracking-widest text-red-bright">
                  {category.label}
                </span>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-bold text-cream sm:text-4xl">
                  {product.name}
                </h1>
                {product.badge && (
                  <span className="marker-tag inline-block rounded-md bg-red px-2.5 py-1 font-display text-xs font-bold uppercase tracking-wide text-cream">
                    {product.badge}
                  </span>
                )}
              </div>
              {product.style && (
                <p className="mt-1 font-body text-sm font-semibold uppercase tracking-wide text-cream-dim/60">
                  {product.style}
                </p>
              )}

              <p className="mt-4 font-display text-3xl font-bold text-red-bright">
                ₵{product.price}
              </p>

              <p className="mt-4 font-body leading-relaxed text-cream-dim">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <LikeButton slug={product.slug} />
                <ShareButton
                  title={`${product.name} | Flicks & Licks`}
                  text={`Check out ${product.name} at Flicks & Licks, ₵${product.price}`}
                />
              </div>

              {product.extras && product.extras.length > 0 && (
                <div className="mt-8 space-y-5">
                  {product.extras.map((group) => (
                    <div key={group.group}>
                      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-cream">
                        {group.group}
                        {group.optional && (
                          <span className="ml-2 font-body text-xs font-normal normal-case text-cream-dim/60">
                            optional, ask at the counter
                          </span>
                        )}
                      </h3>
                      <ul className="mt-2 divide-y divide-white/10 rounded-xl border border-white/10">
                        {group.options.map((opt) => (
                          <li
                            key={opt.name}
                            className="flex items-center justify-between gap-4 px-4 py-2.5"
                          >
                            <span className="font-body text-sm text-cream-dim">
                              {opt.name}
                            </span>
                            <span className="font-display text-sm font-bold text-cream">
                              +₵{opt.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <AddToOrderButton
                  product={{
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                  }}
                />
              </div>
              <p className="mt-3 font-body text-xs text-cream-dim/60">
                Cash &amp; Mobile Money accepted · Pickup &amp; dine in
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-12">
            <ReviewSection
              slug={product.slug}
              seedReviews={seedReviews[product.slug] ?? []}
            />
          </div>

          {recommendations.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-12">
              <Recommendations products={recommendations} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
