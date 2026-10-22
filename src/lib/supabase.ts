// lib/supabase.ts
// Talks to Supabase's REST API directly - server-side only (uses the service role key)

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type MusicReview = {
  id: string;
  album: string;
  artist: string;
  rating: number;
  review: string | null;
  favourite_track: string | null;
  cover_url: string | null;
  spotify_url: string | null;
  release_year: number | null;
  listened_on: string;
  relisten: boolean;
  created_at: string;
};

export type MusicReviewInput = Omit<MusicReview, 'id' | 'created_at'>;

const REVIEWS_ENDPOINT = `${SUPABASE_URL}/rest/v1/music_reviews`;

const headers = () => ({
  apikey: SUPABASE_SERVICE_ROLE_KEY || '',
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
});

export const getReviews = async (): Promise<MusicReview[]> => {
  const res = await fetch(`${REVIEWS_ENDPOINT}?select=*&order=listened_on.asc,created_at.asc`, {
    headers: headers(),
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error("SUPABASE READ ERROR:", await res.text());
    return [];
  }

  return res.json();
};

export const getReview = async (id: string): Promise<MusicReview | null> => {
  const res = await fetch(`${REVIEWS_ENDPOINT}?select=*&id=eq.${encodeURIComponent(id)}`, {
    headers: headers(),
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const rows: MusicReview[] = await res.json();
  return rows[0] ?? null;
};

export const addReview = async (review: MusicReviewInput) => {
  const res = await fetch(REVIEWS_ENDPOINT, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify(review),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("SUPABASE WRITE ERROR:", errorBody);
    throw new Error(`Supabase insert failed: ${res.status}`);
  }
};

export const updateReview = async (id: string, review: MusicReviewInput) => {
  const res = await fetch(`${REVIEWS_ENDPOINT}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify(review),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("SUPABASE UPDATE ERROR:", errorBody);
    throw new Error(`Supabase update failed: ${res.status}`);
  }
};
