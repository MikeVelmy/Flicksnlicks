import { orderSteps } from "@/data/site";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-ink py-14 sm:py-20 scroll-mt-16"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-red-bright">
          Easy ordering
        </span>
        <h2
          id="how-it-works-heading"
          className="mt-2 font-display text-3xl font-bold text-cream sm:text-4xl"
        >
          How it works
        </h2>

        <ol className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-white/10 bg-charcoal p-5"
            >
              <span className="font-display text-4xl font-bold text-red/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-cream">
                {step.title}
              </h3>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-cream-dim">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
