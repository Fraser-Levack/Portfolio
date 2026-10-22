"use client";

import { useState } from "react";

// Reviews longer than this get clamped with a "Read more" toggle
const PREVIEW_LENGTH = 280;

export default function ExpandableReview({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const long = text.length > PREVIEW_LENGTH;

  return (
    <div className="mt-2 max-w-[70ch]">
      <p className={`text-slate-800 leading-relaxed whitespace-pre-line ${long && !expanded ? "line-clamp-4" : ""}`}>
        {text}
      </p>
      {long && (
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Show less" : "Read more"}
          aria-expanded={expanded}
          className="mt-1 -ml-1 p-1 text-sm text-slate-400 hover:text-black transition-colors"
        >
          {expanded ? "▲" : "▼"}
        </button>
      )}
    </div>
  );
}
