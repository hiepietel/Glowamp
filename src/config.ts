export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? '';
export const REDIRECT_URI = window.location.origin + import.meta.env.BASE_URL;

export const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
];
