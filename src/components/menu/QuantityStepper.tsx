"use client";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div
      className="inline-flex items-center rounded-full border-2 border-white/15"
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(Math.max(min, value - 1));
        }}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`flex ${dim} items-center justify-center rounded-full font-display text-lg font-bold text-cream disabled:opacity-30`}
      >
        −
      </button>
      <span
        className={`min-w-[1.75rem] text-center font-display font-bold text-cream ${textSize}`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(Math.min(max, value + 1));
        }}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`flex ${dim} items-center justify-center rounded-full font-display text-lg font-bold text-cream disabled:opacity-30`}
      >
        +
      </button>
    </div>
  );
}
