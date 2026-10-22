import type { Metadata } from "next";
import Link from "next/link";
import { getReviews, type MusicReview } from "@/lib/supabase";
import Footer from "@/components/footer";
import RatingChart from "@/components/RatingChart";
import ExpandableReview from "@/components/ExpandableReview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Music Reviews | Fraser Levack",
  description: "Albums Fraser Levack has listened to and reviewed",
};

const skyImage = "/content/Pier.jpg";
const unbounded = { fontFamily: "var(--font-unbounded), sans-serif" };

// Long album/artist names get cut off (full name still shows on hover)
const ALBUM_LIMIT = 20;
const ARTIST_LIMIT = 15;
const truncate = (text: string, limit: number) =>
  text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text;

type Dir = "asc" | "desc";

// Each sort has an ascending compare; clicking the active one flips direction.
// `dir` is the direction picked when first switching to that sort.
const SORTS: Record<string, { compare: (a: MusicReview, b: MusicReview) => number; dir: Dir; label: (dir: Dir) => string }> = {
  age: {
    compare: (a, b) => a.listened_on.localeCompare(b.listened_on) || a.created_at.localeCompare(b.created_at),
    dir: "asc",
    label: (dir) => `Age ${dir === "asc" ? "▲" : "▼"}`,
  },
  rating: {
    compare: (a, b) => Number(a.rating) - Number(b.rating),
    dir: "desc",
    label: (dir) => `Rating ${dir === "asc" ? "▲" : "▼"}`,
  },
  alpha: {
    compare: (a, b) => a.album.localeCompare(b.album),
    dir: "asc",
    label: (dir) => (dir === "asc" ? "A–Z" : "Z–A"),
  },
};

// Builds the page URL, leaving out anything that's at its default
const buildHref = (sort: string, dir: Dir, score: number | null) => {
  const query = new URLSearchParams();
  if (!(sort === "age" && dir === "asc")) {
    query.set("sort", sort);
    query.set("dir", dir);
  }
  if (score !== null) query.set("score", String(score));
  const qs = query.toString();
  return qs ? `/musicreviews?${qs}` : "/musicreviews";
};

export default async function MusicReviews({ searchParams }: { searchParams: Promise<{ sort?: string; dir?: string; score?: string }> }) {
  const params = await searchParams;
  const sort = params.sort && params.sort in SORTS ? params.sort : "age";
  const dir: Dir = params.dir === "asc" || params.dir === "desc" ? params.dir : SORTS[sort].dir;
  const parsedScore = Number(params.score);
  const score = params.score && Number.isInteger(parsedScore) && parsedScore >= 0 && parsedScore <= 10 ? parsedScore : null;
  const reviews = await getReviews();
  const sorted = reviews
    .filter((r) => score === null || Math.floor(Number(r.rating)) === score)
    .sort((a, b) => (dir === "asc" ? 1 : -1) * SORTS[sort].compare(a, b));
  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <main className="min-h-screen bg-[#f8faf9] text-black">
      {/* Header */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-6 md:pt-12">
        <div className="relative overflow-hidden rounded-lg">
          <img src={skyImage} alt="Sky Background" className="w-full h-[260px] md:h-[400px] object-cover" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
            <Link href="/" className="text-[#f8faf9] font-bold tracking-widest text-xs md:text-sm uppercase w-max hover:-translate-x-1 transition-transform">
              ◀ Back home
            </Link>
            <div className="space-y-2">
              <h1 className="text-[#f8faf9] font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none" style={unbounded}>
                MUSIC REVIEWS
              </h1>
              <h2 className="text-[#f8faf9] font-bold tracking-widest text-sm uppercase">
                {reviews.length} albums{average && ` · avg ${average}/10`}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 md:pt-16">
          <RatingChart
            reviews={reviews}
            selected={score}
            hrefFor={(s) => buildHref(sort, dir, s === score ? null : s)}
          />
        </section>
      )}

      {/* Review list */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 md:pt-16">
        {reviews.length === 0 ? (
          <p className="text-slate-500 text-center py-24">No reviews yet. Go listen to something.</p>
        ) : (
          <>
          {/* Sort controls */}
          <nav className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
            {Object.entries(SORTS).map(([key, option]) => {
              const active = sort === key;
              const shownDir = active ? dir : option.dir;
              const nextDir: Dir = active ? (dir === "asc" ? "desc" : "asc") : option.dir;
              return (
                <Link
                  key={key}
                  href={buildHref(key, nextDir, score)}
                  scroll={false}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    active
                      ? "bg-black border border-black text-white hover:bg-[#549CE6] hover:border-[#549CE6]"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-[#549CE6]"
                  }`}
                >
                  {option.label(shownDir)}
                </Link>
              );
            })}
            {score !== null && (
              <Link
                href={buildHref(sort, dir, null)}
                scroll={false}
                className="ml-auto px-4 py-2 rounded-full text-sm font-bold border border-[#549CE6] text-[#549CE6] hover:bg-[#549CE6] hover:text-white transition-colors"
              >
                {score}/10 ✕
              </Link>
            )}
          </nav>
          <ul className="flex flex-col divide-y divide-slate-200">
            {sorted.map((r) => (
              <li key={r.id} className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-5 md:gap-10 items-start">
                {/* Full-width cover on mobile, thumbnail beside the text on desktop */}
                <div className="aspect-square w-full rounded-sm overflow-hidden bg-[#121212] shadow-xl">
                  {r.cover_url && <img src={r.cover_url} alt={`${r.album} cover`} className="w-full h-full object-cover" />}
                </div>

                <div className="flex flex-col gap-2 min-w-0">
                  <h3 className="text-xl md:text-3xl font-bold leading-tight" style={unbounded} title={r.album}>
                    {truncate(r.album, ALBUM_LIMIT)}
                  </h3>
                  <p className="text-slate-600 font-medium" title={r.artist}>
                    {truncate(r.artist, ARTIST_LIMIT)}{r.release_year && ` · ${r.release_year}`}
                  </p>
                  {/* Rating shows inline on mobile */}
                  <p className="md:hidden text-2xl font-black text-[#549CE6]" style={unbounded}>
                    {Number(r.rating)}<span className="text-sm text-slate-400">/10</span>
                  </p>
                  {r.review && <ExpandableReview text={r.review} />}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-xs font-bold tracking-widest uppercase text-slate-400">
                    <span>{new Date(r.listened_on).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    {r.relisten && <span>↻ Relisten</span>}
                    {r.favourite_track && <span>★ {r.favourite_track}</span>}
                    {r.spotify_url && (
                      <a href={r.spotify_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#549CE6] transition-colors">
                        Spotify ▶
                      </a>
                    )}
                    <Link href={`/musicreviews/${r.id}/edit`} className="hover:text-[#549CE6] transition-colors">
                      Edit
                    </Link>
                  </div>
                </div>

                <p className="hidden md:block text-6xl font-black text-[#549CE6] tracking-tighter" style={unbounded}>
                  {Number(r.rating)}<span className="text-xl text-slate-400">/10</span>
                </p>
              </li>
            ))}
          </ul>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
