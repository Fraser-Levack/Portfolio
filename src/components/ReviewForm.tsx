"use client";

import { useActionState } from "react";
import Link from "next/link";
import Triangle from "@/components/Triangle";
import type { FormState } from "@/app/musicreviews/actions";
import type { MusicReview } from "@/lib/supabase";

const unbounded = { fontFamily: "var(--font-unbounded), sans-serif" };
const input = "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#549CE6]";
const label = "text-xs font-bold tracking-widest uppercase text-slate-500";

type Props = {
  title: string;
  submitLabel: string;
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  review?: MusicReview;
};

export default function ReviewForm({ title, submitLabel, action: serverAction, review }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(serverAction, { error: null });

  return (
    <main className="min-h-screen bg-[#f8faf9] text-black">
      <div className="max-w-xl mx-auto px-6 py-10 md:py-16">
        <Link href="/musicreviews" className="text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-[#549CE6] transition-colors">
          <Triangle dir="left" /> Reviews
        </Link>
        <h1 className="font-black text-4xl md:text-6xl tracking-tighter leading-none mt-4 mb-10" style={unbounded}>
          {title}
        </h1>

        <form action={action} className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className={label}>Album</span>
            <input name="album" required defaultValue={review?.album} className={input} autoComplete="off" />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Artist</span>
            <input name="artist" required defaultValue={review?.artist} className={input} autoComplete="off" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className={label}>Rating /10</span>
              <input name="rating" type="number" inputMode="decimal" min="0" max="10" step="0.5" required defaultValue={review?.rating} className={input} />
            </label>
            <label className="flex flex-col gap-2">
              <span className={label}>Listened</span>
              <input name="listened_on" type="date" defaultValue={review?.listened_on ?? new Date().toISOString().slice(0, 10)} className={input} />
            </label>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input name="relisten" type="checkbox" defaultChecked={review?.relisten} className="w-5 h-5 accent-[#549CE6]" />
            <span className={label}>This is a relisten</span>
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Favourite track</span>
            <input name="favourite_track" defaultValue={review?.favourite_track ?? ""} className={input} autoComplete="off" />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Review</span>
            <textarea name="review" rows={6} defaultValue={review?.review ?? ""} className={input} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Password</span>
            <input name="password" type="password" required className={input} autoComplete="current-password" />
          </label>

          {state.error && <p className="text-red-600 font-medium">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="px-6 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {pending ? "Saving..." : submitLabel}
          </button>
        </form>
      </div>
    </main>
  );
}
