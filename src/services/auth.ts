// Logowanie Spotify: Authorization Code + PKCE (bez serwera).
import { CLIENT_ID, REDIRECT_URI, SCOPES } from '../config';
import { storage } from '../lib/storage';

const KEYS = {
  access: 'ga_access',
  refresh: 'ga_refresh',
  expires: 'ga_expires',
  verifier: 'ga_verifier',
  state: 'ga_state',
} as const;

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  error?: string;
  error_description?: string;
}

function base64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function randomString(length: number): string {
  return base64Url(crypto.getRandomValues(new Uint8Array(length)));
}

export async function login(): Promise<void> {
  if (!CLIENT_ID) throw new Error('Najpierw ustaw VITE_SPOTIFY_CLIENT_ID w .env.local');
  const verifier = randomString(64);
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  const state = randomString(16);
  storage.set(KEYS.verifier, verifier);
  storage.set(KEYS.state, state);
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: base64Url(new Uint8Array(digest)),
    scope: SCOPES.join(' '),
    state,
  });
  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

function saveTokens(t: TokenResponse): void {
  storage.set(KEYS.access, t.access_token);
  if (t.refresh_token) storage.set(KEYS.refresh, t.refresh_token);
  storage.set(KEYS.expires, String(Date.now() + (t.expires_in - 60) * 1000));
}

async function tokenRequest(params: Record<string, string>): Promise<string> {
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: CLIENT_ID, ...params }),
  });
  const j = (await r.json()) as TokenResponse;
  if (!r.ok) throw new Error(j.error_description || j.error || 'błąd tokenu');
  saveTokens(j);
  return j.access_token;
}

async function exchangeCode(): Promise<void> {
  const p = new URLSearchParams(window.location.search);
  if (!p.has('code') && !p.has('error')) return;
  window.history.replaceState(null, '', window.location.pathname);
  if (p.get('error')) throw new Error(`anulowano (${p.get('error')})`);
  if (p.get('state') !== storage.get(KEYS.state)) throw new Error('niezgodny state');
  await tokenRequest({
    grant_type: 'authorization_code',
    code: p.get('code') ?? '',
    redirect_uri: REDIRECT_URI,
    code_verifier: storage.get(KEYS.verifier) ?? '',
  });
  storage.remove(KEYS.verifier);
  storage.remove(KEYS.state);
}

// Kod z adresu można wymienić tylko raz (StrictMode uruchamia efekty dwa razy).
let callback: Promise<void> | null = null;
export function handleCallback(): Promise<void> {
  callback ??= exchangeCode();
  return callback;
}

let refreshing: Promise<string> | null = null;
export async function getToken(force = false): Promise<string | null> {
  const access = storage.get(KEYS.access);
  const expires = Number(storage.get(KEYS.expires)) || 0;
  if (access && !force && Date.now() < expires) return access;
  const refresh = storage.get(KEYS.refresh);
  if (!refresh) return null;
  refreshing ??= tokenRequest({ grant_type: 'refresh_token', refresh_token: refresh }).finally(() => {
    refreshing = null;
  });
  try {
    return await refreshing;
  } catch {
    clearTokens();
    return null;
  }
}

export function clearTokens(): void {
  storage.remove(KEYS.access);
  storage.remove(KEYS.refresh);
  storage.remove(KEYS.expires);
}
