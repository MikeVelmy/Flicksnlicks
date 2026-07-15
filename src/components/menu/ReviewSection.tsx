"use client";

import { useEffect, useMemo, useState } from "react";
import type { Review } from "@/types";

function Stars({
  rating,
  size = "h-4 w-4",
}: {
  rating: number;
  size?: string;
}) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${size} ${i < rating ? "fill-red-bright" : "fill-white/15"}`}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6L10 14.9 4.6 17.8l1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Your rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => onChange(n)}
            className="p-1"
          >
            <svg
              viewBox="0 0 20 20"
              className={`h-7 w-7 ${n <= value ? "fill-red-bright" : "fill-white/15"}`}
            >
              <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6L10 14.9 4.6 17.8l1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default function ReviewSection({
  slug,
  seedReviews,
}: {
  slug: string;
  seedReviews: Review[];
}) {
  const storageKey = `fl-reviews-${slug}`;
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) setLocalReviews(JSON.parse(stored));
      } catch {
        // ignore malformed local storage
      }
    });
  }, [storageKey]);

  const allReviews = useMemo(
    () => [...localReviews, ...seedReviews],
    [localReviews, seedReviews]
  );

  const average = useMemo(() => {
    if (allReviews.length === 0) return 0;
    return (
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    );
  }, [allReviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const review: Review = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    const updated = [review, ...localReviews];
    setLocalReviews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setName("");
    setComment("");
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
          Tell us what you think
        </h2>
      </div>
      {allReviews.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <Stars rating={Math.round(average)} />
          <span className="font-body text-sm text-cream-dim">
            {average.toFixed(1)} out of 5 · {allReviews.length} review
            {allReviews.length === 1 ? "" : "s"}
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-white/10 bg-charcoal p-5 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label
              htmlFor="review-name"
              className="block font-body text-sm font-semibold text-cream-dim"
            >
              Your name
            </label>
            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-ink px-3.5 py-3 text-base text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
              placeholder="e.g. Ama S."
            />
          </div>
          <div className="sm:col-span-1">
            <span className="block font-body text-sm font-semibold text-cream-dim">
              Rating
            </span>
            <div className="mt-1.5">
              <StarPicker value={rating} onChange={setRating} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="review-comment"
            className="block font-body text-sm font-semibold text-cream-dim"
          >
            Your review
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={3}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-ink px-3.5 py-3 text-base text-cream placeholder:text-cream-dim/50 focus:border-red focus:outline-none"
            placeholder="What did you think of this dish?"
          />
        </div>

        <button
          type="submit"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-red px-6 py-3.5 font-display text-sm font-bold text-cream shadow-[0_4px_0_0_var(--color-red-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
        >
          Submit review
        </button>
        {submitted && (
          <p className="mt-3 font-body text-sm font-semibold text-red-bright">
            Thanks! Your review has been posted below.
          </p>
        )}
      </form>

      {allReviews.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {allReviews.map((r) => (
            <figure
              key={r.id}
              className="rounded-2xl border border-white/10 bg-ink p-5"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-3 font-body text-sm leading-relaxed text-cream-dim">
                &ldquo;{r.comment}&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-display text-sm font-bold text-cream">
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
