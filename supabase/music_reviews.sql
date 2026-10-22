-- Run this once in the Supabase SQL editor
create table if not exists public.music_reviews (
  id uuid primary key default gen_random_uuid(),
  album text not null,
  artist text not null,
  rating numeric(3,1) not null check (rating >= 0 and rating <= 10),
  review text,
  favourite_track text,
  cover_url text,
  spotify_url text,
  release_year int,
  listened_on date not null default current_date,
  created_at timestamptz not null default now()
);

-- Anyone can read; only the service role key (used server-side) can write
alter table public.music_reviews enable row level security;

drop policy if exists "Public read" on public.music_reviews;
create policy "Public read" on public.music_reviews for select using (true);

-- Added later: flag a review as a relisten of an album
alter table public.music_reviews add column if not exists relisten boolean not null default false;
