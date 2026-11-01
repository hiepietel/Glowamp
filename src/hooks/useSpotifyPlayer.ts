import { useCallback, useEffect, useRef, useState } from 'react';
import { getToken } from '../services/auth';

const SDK_URL = 'https://sdk.scdn.co/spotify-player.js';

export interface PlayerSnapshot {
  state: Spotify.PlaybackState | null;
  /** performance.now() w chwili otrzymania stanu, do liczenia pozycji. */
  receivedAt: number;
}

function loadSdk(): void {
  if (document.querySelector(`script[src="${SDK_URL}"]`)) return;
  const script = document.createElement('script');
  script.src = SDK_URL;
  document.head.appendChild(script);
}

/** Łączy się z Spotify Web Playback SDK, gdy `enabled` jest true. */
export function useSpotifyPlayer(enabled: boolean, volume: number, notify: (message: string) => void) {
  const playerRef = useRef<Spotify.Player | null>(null);
  const volumeRef = useRef(volume);
  const notifyRef = useRef(notify);
  const activatedRef = useRef(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<PlayerSnapshot>({ state: null, receivedAt: 0 });

  useEffect(() => {
    notifyRef.current = notify;
  }, [notify]);

  useEffect(() => {
    volumeRef.current = volume;
    void playerRef.current?.setVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let player: Spotify.Player | null = null;
    const say = (message: string) => notifyRef.current(message);

    const init = () => {
      if (disposed || !window.Spotify) return;
      player = new window.Spotify.Player({
        name: 'Glowamp',
        getOAuthToken: (cb) => {
          void getToken().then((token) => token && cb(token));
        },
        volume: volumeRef.current / 100,
      });
      player.addListener('ready', ({ device_id }) => setDeviceId(device_id));
      player.addListener('not_ready', () => {
        setDeviceId(null);
        say('Odtwarzacz rozłączony');
      });
      player.addListener('initialization_error', ({ message }) => say(`Błąd inicjalizacji: ${message}`));
      player.addListener('authentication_error', ({ message }) => say(`Błąd autoryzacji: ${message}`));
      player.addListener('account_error', () => say('Odtwarzanie wymaga konta Spotify Premium'));
      player.addListener('playback_error', ({ message }) => say(`Błąd odtwarzania: ${message}`));
      player.addListener('player_state_changed', (state) => setSnapshot({ state, receivedAt: performance.now() }));
      void player.connect();
      playerRef.current = player;
    };

    if (window.Spotify) init();
    else {
      window.onSpotifyWebPlaybackSDKReady = init;
      loadSdk();
    }

    return () => {
      disposed = true;
      player?.disconnect();
      playerRef.current = null;
      setDeviceId(null);
    };
  }, [enabled]);

  // Przeglądarki wymagają gestu użytkownika, zanim pozwolą grać dźwięk.
  const activate = useCallback(() => {
    if (activatedRef.current || !playerRef.current) return;
    void playerRef.current.activateElement();
    activatedRef.current = true;
  }, []);

  const getPlayer = useCallback(() => playerRef.current, []);

  return { deviceId, snapshot, activate, getPlayer };
}
