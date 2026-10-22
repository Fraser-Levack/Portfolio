"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addReview, getReview, updateReview, type MusicReview, type MusicReviewInput } from '@/lib/supabase';
import { searchAlbum } from '@/lib/spotify';

export type FormState = { error: string | null };

// Validates the form and builds the row. `existing` keeps the Spotify details
// when editing, unless the album/artist were changed.
async function buildReview(formData: FormData, existing?: MusicReview): Promise<MusicReviewInput | string> {
  const password = String(formData.get('password') ?? '');
  if (!process.env.REVIEW_PASSWORD || password !== process.env.REVIEW_PASSWORD) {
    return "Wrong password.";
  }

  const album = String(formData.get('album') ?? '').trim();
  const artist = String(formData.get('artist') ?? '').trim();
  const rating = Number(formData.get('rating'));

  if (!album || !artist) return "Album and artist are required.";
  if (Number.isNaN(rating) || rating < 0 || rating > 10) return "Rating must be 0-10.";

  const unchanged = existing && existing.album === album && existing.artist === artist;

  // Fill in cover art etc. from Spotify - not fatal if it fails
  const match = unchanged ? null : await searchAlbum(album, artist).catch(() => null);

  return {
    album: match?.title ?? album,
    artist: match?.artist ?? artist,
    rating,
    review: String(formData.get('review') ?? '').trim() || null,
    favourite_track: String(formData.get('favourite_track') ?? '').trim() || null,
    cover_url: unchanged ? existing.cover_url : match?.coverUrl ?? null,
    spotify_url: unchanged ? existing.spotify_url : match?.spotifyUrl ?? null,
    release_year: unchanged ? existing.release_year : match?.releaseYear ?? null,
    listened_on: String(formData.get('listened_on') || new Date().toISOString().slice(0, 10)),
    relisten: formData.get('relisten') === 'on',
  };
}

export async function submitReview(_prev: FormState, formData: FormData): Promise<FormState> {
  const review = await buildReview(formData);
  if (typeof review === 'string') return { error: review };

  try {
    await addReview(review);
  } catch {
    return { error: "Couldn't save the review. Check the Supabase env vars." };
  }

  revalidatePath('/musicreviews');
  redirect('/musicreviews');
}

export async function editReview(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  const existing = await getReview(id);
  if (!existing) return { error: "That review doesn't exist any more." };

  const review = await buildReview(formData, existing);
  if (typeof review === 'string') return { error: review };

  try {
    await updateReview(id, review);
  } catch {
    return { error: "Couldn't save the changes. Check the Supabase env vars." };
  }

  revalidatePath('/musicreviews');
  redirect('/musicreviews');
}
