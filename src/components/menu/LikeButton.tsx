"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setLiked(localStorage.getItem(`fl-like-${slug}`) === "1");
    });
  }, [slug]);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(`fl-like-${slug}`, next ? "1" : "0");
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      aria-pressed={liked}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 font-display text-sm font-bold transition-colors ${
        liked
          ? "border-red bg-red text-cream"
          : "border-white/15 bg-transparent text-cream hover:border-white/35"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.5s-7.5-4.6-10-9.1C.5 8 2 4.5 5.5 4c2.2-.3 4 .8 6.5 3.3C14.5 4.8 16.3 3.7 18.5 4c3.5.5 5 4 3.5 7.4C19.5 15.9 12 20.5 12 20.5z"
        />
      </svg>
      {liked ? "Liked" : "Like"}
    </button>
  );
}
