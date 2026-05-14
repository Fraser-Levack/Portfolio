// lib/spotify.ts

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
    cache: 'no-store', // Ensures we don't use a stale token
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("SPOTIFY AUTH ERROR:", errorBody);
    throw new Error(`Spotify Auth Failed: ${response.status}`);
  }

  return response.json();
};

export const getMySongStatus = async () => {
  const { access_token } = await getAccessToken();

  // 1. Try to get what's playing RIGHT NOW
  const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });

  // Spotify returns 204 No Content if nothing is active
  if (nowPlayingRes.status === 200) {
    const song = await nowPlayingRes.json();
    
    // Only return if it's actually a track (not an ad or podcast)
    if (song.currently_playing_type === 'track') {
      return {
        isPlaying: song.is_playing,
        title: song.item.name,
        artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
        albumImageUrl: song.item.album.images[0].url,
        songUrl: song.item.external_urls.spotify,
      };
    }
  }

  // 2. If nothing is playing (204) or it's not a track, get RECENTLY played
  const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });

  if (recentlyPlayedRes.status !== 200) {
    throw new Error("Failed to fetch recently played");
  }

  const recentData = await recentlyPlayedRes.json();
  const lastSong = recentData.items[0].track;

  return {
    isPlaying: false, // It's a history item, so not "live"
    title: lastSong.name,
    artist: lastSong.artists.map((_artist: any) => _artist.name).join(', '),
    albumImageUrl: lastSong.album.images[0].url,
    songUrl: lastSong.external_urls.spotify,
  };
};