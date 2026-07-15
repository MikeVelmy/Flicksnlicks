"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 520px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2.5">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              aria-pressed={active === i}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20 ${
                active === i ? "border-red" : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
