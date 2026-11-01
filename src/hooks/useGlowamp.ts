import { useCallback, useRef, useState } from 'react';
import type { MainWindowProps } from '../components/organisms/MainWindow';
import type { PlaylistWindowProps } from '../components/organisms/PlaylistWindow';
import type { ToastProps } from '../components/atoms/Toast';
import { errorMessage, formatTime } from '../lib/format';
import { storage } from '../lib/storage';
import { setRepeat, setShuffle, startPlayback } from '../services/spotifyApi';
import type { AuthStatus, ListMessageKind, PlaybackStatus } from '../types/spotify';
import { useAuth } from './useAuth';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import { useLibrary, type LibraryStatus } from './useLibrary';
import { usePlaybackPosition } from './usePlaybackPosition';
import { useSpotifyPlayer } from './useSpotifyPlayer';
import { useToast } from './useToast';

const VOLUME_KEY = 'ga_volume';
const REPEAT_CYCLE = ['context', 'track', 'off'] as const;

function initialVolume(): number {
  const v = Number(storage.get(VOLUME_KEY));
  return storage.get(VOLUME_KEY) !== null && Number.isFinite(v) ? v : 50;
}

function marqueeText(auth: AuthStatus, online: boolean, track: Spotify.Track | null, duration: number): string {
  if (auth === 'unconfigured') return 'USTAW VITE_SPOTIFY_CLIENT_ID W PLIKU .ENV.LOCAL';
  if (auth === 'logged-out') return 'ZALOGUJ SIĘ PRZEZ SPOTIFY, ABY SŁUCHAĆ';
  if (auth !== 'ready') return '';
  if (track) return `${track.artists.map((a) => a.name).join(', ')} - ${track.name} (${formatTime(duration)})`;
  return online ? 'GLOWAMP GOTOWY - WYBIERZ UTWÓR Z PLAYLISTY' : 'ŁĄCZENIE Z SPOTIFY...';
}

function listMessage(
  auth: AuthStatus,
  library: LibraryStatus,
  isEmpty: boolean,
  isPlaylist: boolean,
): ListMessageKind | null {
  if (auth === 'unconfigured') return 'setup';
  if (auth === 'logged-out') return 'login';
  if (auth === 'checking') return 'checking';
  if (auth === 'denied') return 'denied';
  if (library === 'loading') return 'loading';
  if (library === 'searching') return 'searching';
  if (isEmpty) return isPlaylist ? 'empty-playlist' : 'empty';
  return null;
}

/** The whole player state, mapped to props for the windows. */
export function useGlowamp(): {
  mainWindow: MainWindowProps;
  playlistWindow: PlaylistWindowProps;
  toast: ToastProps;
} {
  const toast = useToast();
  const notify = toast.show;
  const auth = useAuth(notify);
  const ready = auth.status === 'ready';

  const [volume, setVolume] = useState(initialVolume);
  const [showRemaining, setShowRemaining] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { deviceId, snapshot, activate, getPlayer } = useSpotifyPlayer(ready, volume, notify);
  const library = useLibrary(ready, notify);
  const { tracks, source, selected, setSelected } = library;

  const { state, receivedAt } = snapshot;
  const currentTrack = state?.track_window.current_track ?? null;
  const duration = state?.duration ?? 0;
  const position = usePlaybackPosition(state, receivedAt);
  const playing = !!state && !state.paused;

  /* ---------- playback control ---------- */

  const requireDevice = useCallback((): string | null => {
    activate();
    if (!deviceId) {
      notify('Odtwarzacz jeszcze się łączy...');
      return null;
    }
    return deviceId;
  }, [activate, deviceId, notify]);

  const run = useCallback(
    (action: Promise<unknown> | undefined, prefix = '') => {
      action?.catch((e) => notify(prefix + errorMessage(e)));
    },
    [notify],
  );

  const playIndex = useCallback(
    (index: number) => {
      const device = requireDevice();
      const track = tracks[index];
      if (!device || !track) return;
      setSelected(index);
      const body =
        source.type === 'playlist'
          ? { context_uri: source.uri, offset: { uri: track.uri } }
          : { uris: tracks.map((t) => t.uri), offset: { position: index } };
      run(startPlayback(device, body), 'Nie można odtworzyć: ');
    },
    [requireDevice, tracks, source, setSelected, run],
  );

  const play = useCallback(() => {
    const device = requireDevice();
    if (!device) return;
    if (currentTrack) run(getPlayer()?.resume());
    else if (tracks.length) playIndex(selected >= 0 ? selected : 0);
    else if (source.type === 'playlist') run(startPlayback(device, { context_uri: source.uri }), 'Nie można odtworzyć: ');
  }, [requireDevice, currentTrack, tracks.length, selected, source, playIndex, getPlayer, run]);

  const pause = useCallback(() => {
    if (requireDevice()) run(getPlayer()?.pause());
  }, [requireDevice, getPlayer, run]);

  const stop = useCallback(() => {
    if (!requireDevice()) return;
    const player = getPlayer();
    run(player?.pause().then(() => player.seek(0)));
  }, [requireDevice, getPlayer, run]);

  const prev = useCallback(() => {
    if (requireDevice()) run(getPlayer()?.previousTrack());
  }, [requireDevice, getPlayer, run]);

  const next = useCallback(() => {
    if (requireDevice()) run(getPlayer()?.nextTrack());
  }, [requireDevice, getPlayer, run]);

  const toggleShuffle = useCallback(() => {
    const device = requireDevice();
    if (device && state) run(setShuffle(device, !state.shuffle));
  }, [requireDevice, state, run]);

  const cycleRepeat = useCallback(() => {
    const device = requireDevice();
    if (device && state) run(setRepeat(device, REPEAT_CYCLE[state.repeat_mode] ?? 'off'));
  }, [requireDevice, state, run]);

  const focusSearch = useCallback(() => searchInputRef.current?.focus(), []);

  const changeVolume = useCallback((value: number) => {
    setVolume(value);
    storage.set(VOLUME_KEY, String(value));
  }, []);

  const seek = useCallback((ms: number) => run(getPlayer()?.seek(ms)), [getPlayer, run]);

  useKeyboardShortcuts({
    z: prev,
    x: play,
    c: pause,
    v: stop,
    b: next,
    s: toggleShuffle,
    r: cycleRepeat,
    l: focusSearch,
  });

  /* ---------- view ---------- */

  const status: PlaybackStatus = !state || !currentTrack ? 'stopped' : playing ? 'playing' : 'paused';

  return {
    mainWindow: {
      status,
      time: showRemaining && duration ? `-${formatTime(duration - position)}` : formatTime(position),
      onToggleTimeMode: () => setShowRemaining((v) => !v),
      playing,
      online: !!deviceId,
      marquee: marqueeText(auth.status, !!deviceId, currentTrack, duration),
      volume,
      onVolumeChange: changeVolume,
      position,
      duration,
      onSeek: seek,
      controls: { onPrev: prev, onPlay: play, onPause: pause, onStop: stop, onNext: next, onEject: focusSearch },
      modes: {
        shuffle: !!state?.shuffle,
        repeatMode: state?.repeat_mode ?? 0,
        onShuffle: toggleShuffle,
        onRepeat: cycleRepeat,
      },
    },
    playlistWindow: {
      playlists: library.playlists,
      sourceValue: library.sourceValue,
      sourceDisabled: !ready,
      onSourceChange: (value) => void library.loadSource(value),
      onSearch: (query) => void library.search(query),
      searchInputRef,
      tracks,
      selected,
      currentUri: currentTrack?.uri ?? null,
      message: listMessage(auth.status, library.status, !tracks.length, source.type === 'playlist'),
      onSelect: setSelected,
      onPlay: playIndex,
      account: {
        status: auth.status,
        userName: auth.user ? auth.user.display_name || auth.user.id : '',
        onLogin: auth.login,
        onLogout: auth.logout,
      },
    },
    toast: { message: toast.message, visible: toast.visible },
  };
}
