import Link from "next/link";
import type { MusicReview } from "@/lib/supabase";

type Props = {
  reviews: MusicReview[];
  selected: number | null;
  // Link for clicking a bar - toggles that score's filter on/off
  hrefFor: (score: number) => string;
};

// Bar chart of how many albums landed on each whole-number score (half scores round down)
export default function RatingChart({ reviews, selected, hrefFor }: Props) {
  const counts = Array.from({ length: 11 }, (_, score) =>
    reviews.filter((r) => Math.floor(Number(r.rating)) === score).length
  );
  const max = Math.max(...counts, 1);

  return (
    <figure className="flex flex-col gap-4">

      <div className="flex items-end gap-[2px] md:gap-2 h-40 md:h-56 border-b border-slate-300">
        {counts.map((count, score) => (
          <div key={score} className="relative flex-1 h-full flex items-end justify-center">
            {count > 0 && (
              <Link
                href={hrefFor(score)}
                scroll={false}
                aria-label={`${score}/10: ${count} ${count === 1 ? "album" : "albums"}`}
                className={`group relative w-full max-w-14 bg-[#549CE6] rounded-t-[4px] transition-opacity hover:opacity-80 ${
                  selected !== null && selected !== score ? "opacity-30" : ""
                }`}
                style={{ height: `${(count / max) * 100}%` }}
              >
                {/* Hover tooltip */}
                <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-3 py-1.5 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {score}/10 · {count} {count === 1 ? "album" : "albums"}
                  {selected === score && " · tap to clear"}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-[2px] md:gap-2 -mt-2">
        {counts.map((_, score) => (
          <span key={score} className={`flex-1 text-center text-xs font-medium ${selected === score ? "text-black font-bold" : "text-slate-400"}`}>
            {score}
          </span>
        ))}
      </div>
    </figure>
  );
}
