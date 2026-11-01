/** Utwór w uproszczonej postaci używanej przez listę. */
export interface Track {
  uri: string;
  name: string;
  artists: string;
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  uri: string;
}

export interface SpotifyUser {
  id: string;
  display_name: string | null;
  product?: string;
}

export type Source =
  | { type: 'none' }
  | { type: 'liked' }
  | { type: 'playlist'; uri: string }
  | { type: 'search' };

export type RepeatMode = 0 | 1 | 2;

export type PlaybackStatus = 'stopped' | 'playing' | 'paused';

export type AuthStatus = 'unconfigured' | 'checking' | 'logged-out' | 'denied' | 'ready';

/** Co pokazać w liście zamiast utworów. */
export type ListMessageKind =
  | 'setup'
  | 'login'
  | 'checking'
  | 'denied'
  | 'loading'
  | 'searching'
  | 'empty'
  | 'empty-playlist';
