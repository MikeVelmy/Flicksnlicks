export default function CashNotice() {
  return (
    <section className="bg-red py-3.5" aria-label="Payment options notice">
      <div className="mx-auto max-w-6xl overflow-hidden px-0">
        <div
          className="ticker-track flex w-max gap-8 whitespace-nowrap"
          aria-hidden="true"
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-8">
              {Array.from({ length: 6 }).map((_, j) => (
                <span
                  key={j}
                  className="font-display text-sm font-bold uppercase tracking-wide text-cream sm:text-base"
                >
                  Cash &amp; Mobile Money · Fast pickup · Easy cravings ·
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">
          We accept cash and Mobile Money. Fast pickup, easy cravings.
        </p>
      </div>
    </section>
  );
}
