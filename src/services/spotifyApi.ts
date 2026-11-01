import { getToken } from './auth';
import type { Playlist, SpotifyUser, Track } from '../types/spotify';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface RequestOptions {
  method?: 'GET' | 'PUT' | 'POST';
  body?: unknown;
  retry?: boolean;
}

async function api<T = unknown>(path: string, { method = 'GET', body, retry = true }: RequestOptions = {}): Promise<T> {
  const token = await getToken();
  if (!token) throw new ApiError('Nie jesteś zalogowany', 401);
  const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
  if (body) headers['Content-Type'] = 'application/json';
  const r = await fetch(`https://api.spotify.com/v1${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.status === 401 && retry) {
    await getToken(true);
    return api<T>(path, { method, body, retry: false });
  }
  const text = await r.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON response */
  }
  if (!r.ok) {
    const message = (json as { error?: { message?: string } } | null)?.error?.message;
    throw new ApiError(message || `HTTP ${r.status}`, r.status);
  }
  return json as T;
}

/* ---------- raw responses ---------- */

interface RawTrack {
  uri?: string;
  name: string;
  is_local?: boolean;
  duration_ms?: number;
  artists?: { name: string }[];
  show?: { name: string };
}

interface RawItem {
  item?: RawTrack | null;
  track?: RawTrack | null;
}

interface Paging<T> {
  items?: (T | null)[];
}

function normalize(raw: (RawTrack | null | undefined)[]): Track[] {
  return raw
    .filter((t): t is RawTrack & { uri: string } => !!t?.uri && !t.is_local)
    .map((t) => ({
      uri: t.uri,
      name: t.name,
      artists: (t.artists ?? []).map((a) => a.name).join(', ') || t.show?.name || '',
      duration: t.duration_ms ?? 0,
    }));
}

const fromItems = (page: Paging<RawItem>) => normalize((page.items ?? []).map((x) => x?.item ?? x?.track));

/* ---------- data ---------- */

export const fetchMe = () => api<SpotifyUser>('/me');

export async function fetchPlaylists(): Promise<Playlist[]> {
  const page = await api<Paging<Playlist>>('/me/playlists?limit=50');
  return (page.items ?? []).filter((p): p is Playlist => !!p);
}

export async function fetchLikedTracks(): Promise<Track[]> {
  return fromItems(await api<Paging<RawItem>>('/me/tracks?limit=50'));
}

export async function fetchPlaylistTracks(id: string): Promise<Track[]> {
  try {
    return fromItems(await api<Paging<RawItem>>(`/playlists/${id}/items?limit=100`));
  } catch (e) {
    if (!(e instanceof ApiError) || e.status !== 404) throw e;
    return fromItems(await api<Paging<RawItem>>(`/playlists/${id}/tracks?limit=100`));
  }
}

export async function searchTracks(q: string): Promise<Track[]> {
  const params = new URLSearchParams({ q, type: 'track', limit: '10' });
  const r = await api<{ tracks?: Paging<RawTrack> }>(`/search?${params}`);
  return normalize(r.tracks?.items ?? []);
}

/* ---------- playback control ---------- */

export type PlayBody =
  | { context_uri: string; offset?: { uri: string } }
  | { uris: string[]; offset: { position: number } };

export const startPlayback = (deviceId: string, body: PlayBody) =>
  api(`/me/player/play?device_id=${deviceId}`, { method: 'PUT', body });

export const setShuffle = (deviceId: string, on: boolean) =>
  api(`/me/player/shuffle?state=${on}&device_id=${deviceId}`, { method: 'PUT' });

export const setRepeat = (deviceId: string, mode: 'off' | 'context' | 'track') =>
  api(`/me/player/repeat?state=${mode}&device_id=${deviceId}`, { method: 'PUT' });
