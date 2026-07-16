import Image from "next/image";
import { branches, hours, siteInfo } from "@/data/site";

export default function LocationHours() {
  const flagship = branches.find((b) => b.isFlagship) ?? branches[0];

  return (
    <section
      id="location"
      className="bg-charcoal py-14 sm:py-20 scroll-mt-16"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-red-bright">
          Find us
        </span>
        <h2
          id="location-heading"
          className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl"
        >
          Location &amp; hours
        </h2>

        <div className="mt-9 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[320px]">
            <Image
              src="/images/interior-ambience.webp"
              alt="Flicks & Licks dine in seating area in Haatso Atomic"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="marker-tag inline-block rounded-md bg-red px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-cream">
                Dine in available
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-ink p-6 sm:p-7">
            <div>
              <h3 className="font-display text-xl font-bold text-cream">
                Flagship: {flagship.name}
              </h3>
              <p className="mt-2 font-body text-cream-dim">{flagship.address}</p>
              <a
                href={flagship.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 font-body text-sm font-semibold text-red-bright hover:underline"
              >
                View on Google Maps
                <span aria-hidden="true">→</span>
              </a>

              <h3 className="mt-6 font-display text-xl font-bold text-cream">
                Opening hours
              </h3>
              <dl className="mt-2 divide-y divide-white/10">
                {hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex items-center justify-between gap-4 py-2"
                  >
                    <dt className="font-body text-sm text-cream-dim">
                      {h.days}
                    </dt>
                    <dd className="font-display text-sm font-bold text-cream">
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-6 font-display text-xl font-bold text-cream">
                Contact
              </h3>
              <p className="mt-2 font-body text-cream-dim">
                {siteInfo.phonePrimary}
                <br />
                {siteInfo.handle} on social
              </p>
            </div>

            <a
              href={`https://wa.me/${siteInfo.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-red px-6 py-4 font-display text-base font-bold text-cream shadow-[0_5px_0_0_var(--color-red-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none sm:w-auto"
            >
              Get Directions on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl font-bold text-cream sm:text-2xl">
            All our branches
          </h3>
          <p className="mt-2 max-w-xl font-body text-sm text-cream-dim">
            Drop by any of our locations and enjoy a delicious meal with a
            side of unforgettable experiences.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-ink p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-base font-bold text-cream">
                      {branch.name}
                    </h4>
                    {branch.isFlagship && (
                      <span className="rounded-md bg-red/15 px-2 py-0.5 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-red-bright">
                        Flagship
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-body text-sm text-cream-dim">
                    {branch.address}
                  </p>
                </div>
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold text-red-bright hover:underline"
                >
                  View on Google Maps
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
