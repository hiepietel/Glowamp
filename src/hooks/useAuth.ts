import { useCallback, useEffect, useState } from 'react';
import { CLIENT_ID } from '../config';
import { errorMessage } from '../lib/format';
import { clearTokens, getToken, handleCallback, login as startLogin } from '../services/auth';
import { ApiError, fetchMe } from '../services/spotifyApi';
import type { AuthStatus, SpotifyUser } from '../types/spotify';

export function useAuth(notify: (message: string) => void) {
  const [status, setStatus] = useState<AuthStatus>(CLIENT_ID ? 'checking' : 'unconfigured');
  const [user, setUser] = useState<SpotifyUser | null>(null);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;

    (async () => {
      try {
        await handleCallback();
      } catch (e) {
        notify(`Logowanie nie powiodło się: ${errorMessage(e)}`);
      }
      const token = await getToken();
      if (cancelled) return;
      if (!token) {
        setStatus('logged-out');
        return;
      }
      try {
        const me = await fetchMe();
        if (cancelled) return;
        setUser(me);
        setStatus('ready');
        if (me.product && me.product !== 'premium') notify('Uwaga: odtwarzanie wymaga Spotify Premium');
      } catch (e) {
        if (cancelled) return;
        setStatus('denied');
        notify(
          e instanceof ApiError && e.status === 403
            ? 'Brak dostępu: dodaj swoje konto w panelu Spotify (User Management)'
            : errorMessage(e),
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [notify]);

  const login = useCallback(() => {
    startLogin().catch((e) => notify(errorMessage(e)));
  }, [notify]);

  const logout = useCallback(() => {
    clearTokens();
    window.location.reload();
  }, []);

  return { status, user, login, logout };
}
