"use client";

import { useState } from "react";

export default function ShareButton({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled the share sheet, nothing to do
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border-2 border-white/15 bg-transparent px-5 py-3 font-display text-sm font-bold text-cream transition-colors hover:border-white/35"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4M18 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM8.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM18 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
        />
      </svg>
      {copied ? "Link copied!" : "Share"}
    </button>
  );
}
