"use client";

export interface OrderDetailsValue {
  name: string;
  contact: string;
  location: string;
  notes: string;
}

export const emptyOrderDetails: OrderDetailsValue = {
  name: "",
  contact: "",
  location: "",
  notes: "",
};

interface OrderDetailsProps {
  value: OrderDetailsValue;
  onChange: (value: OrderDetailsValue) => void;
}

export default function OrderDetails({ value, onChange }: OrderDetailsProps) {
  const update =
    (field: keyof OrderDetailsValue) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ ...value, [field]: e.target.value });

  return (
    <div className="space-y-2 rounded-lg border border-white/10 bg-charcoal/40 p-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value.name}
          onChange={update("name")}
          placeholder="Receiver's name"
          aria-label="Receiver's name"
          className="min-w-0 flex-1 rounded-md border border-white/10 bg-charcoal/60 px-2.5 py-2 text-sm text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
        />
        <input
          type="tel"
          value={value.contact}
          onChange={update("contact")}
          placeholder="Contact number"
          aria-label="Receiver's contact number"
          className="min-w-0 flex-1 rounded-md border border-white/10 bg-charcoal/60 px-2.5 py-2 text-sm text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
        />
      </div>
      <input
        type="text"
        value={value.location}
        onChange={update("location")}
        placeholder="Delivery / pickup location"
        aria-label="Delivery or pickup location"
        className="w-full rounded-md border border-white/10 bg-charcoal/60 px-2.5 py-2 text-sm text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
      />
      <textarea
        value={value.notes}
        onChange={update("notes")}
        placeholder="Additional info (optional): landmark, gate code, etc."
        aria-label="Additional delivery info"
        rows={2}
        className="w-full resize-none rounded-md border border-white/10 bg-charcoal/60 px-2.5 py-2 text-sm text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
      />
    </div>
  );
}
