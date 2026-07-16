"use client";

export type PaymentMethod = "cash" | "mobile-money";

interface PaymentMethodsProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const methods = [
  {
    id: "mobile-money" as const,
    label: "Pay with Mobile Money",
    description: "MTN, AirtelTigo, Telecel — pay online now",
    icon: "📱",
  },
  {
    id: "cash" as const,
    label: "Pay with Cash on Pickup",
    description: "Pay at the counter",
    icon: "💵",
  },
];

export default function PaymentMethods({
  selected,
  onSelect,
}: PaymentMethodsProps) {
  return (
    <div className="space-y-1 rounded-lg border border-white/10 bg-charcoal/40 p-1">
      {methods.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method.id)}
          className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${
            selected === method.id ? "bg-red/15" : "hover:bg-white/5"
          }`}
        >
          <span className="text-base">{method.icon}</span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold leading-tight text-cream">
              {method.label}
            </p>
            <p className="truncate text-xs text-cream-dim">
              {method.description}
            </p>
          </div>
          {selected === method.id && (
            <svg
              className="h-4 w-4 shrink-0 text-red-bright"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}
