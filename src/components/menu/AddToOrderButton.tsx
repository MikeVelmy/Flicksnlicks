"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantityStepper from "./QuantityStepper";

export default function AddToOrderButton({
  product,
  size = "md",
}: {
  product: { slug: string; name: string; price: number; image: string };
  size?: "sm" | "md";
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, quantity);
    setQuantity(1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const buttonPadding = size === "sm" ? "px-4 py-2" : "px-5 py-3";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="flex flex-wrap items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
      <QuantityStepper value={quantity} onChange={setQuantity} size={size} />
      <button
        type="button"
        onClick={handleAdd}
        className={`inline-flex items-center justify-center rounded-full font-display font-bold transition-colors ${buttonPadding} ${textSize} ${
          justAdded
            ? "bg-cream text-ink"
            : "bg-red text-cream hover:bg-red-deep"
        }`}
      >
        {justAdded ? "Added ✓" : "Add to Order"}
      </button>
    </div>
  );
}
