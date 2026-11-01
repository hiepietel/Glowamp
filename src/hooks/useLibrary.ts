import { useCallback, useEffect, useRef, useState } from 'react';
import { errorMessage } from '../lib/format';
import {
  ApiError,
  fetchLikedTracks,
  fetchPlaylists,
  fetchPlaylistTracks,
  searchTracks,
} from '../services/spotifyApi';
import type { Playlist, Source, Track } from '../types/spotify';

export const SOURCE_LIKED = 'liked';
export const SOURCE_SEARCH = 'search';
export const playlistValue = (id: string) => `pl:${id}`;

export type LibraryStatus = 'idle' | 'loading' | 'searching';

/** Playlisty, aktualna lista utworów i wyszukiwanie. */
export function useLibrary(enabled: boolean, notify: (message: string) => void) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [source, setSource] = useState<Source>({ type: 'none' });
  const [sourceValue, setSourceValue] = useState(SOURCE_LIKED);
  const [status, setStatus] = useState<LibraryStatus>('idle');
  const [selected, setSelected] = useState(-1);

  const playlistsRef = useRef<Playlist[]>([]);
  const searchResults = useRef<Track[]>([]);
  // Odrzuca odpowiedzi, które przyszły po nowszym żądaniu.
  const requestId = useRef(0);

  const loadSource = useCallback(
    async (value: string) => {
      const id = ++requestId.current;
      setSourceValue(value);
      setSelected(-1);

      if (value === SOURCE_SEARCH) {
        setSource({ type: 'search' });
        setTracks(searchResults.current);
        setStatus('idle');
        return;
      }

      const playlist = playlistsRef.current.find((p) => playlistValue(p.id) === value);
      setSource(playlist ? { type: 'playlist', uri: playlist.uri } : { type: 'liked' });
      setStatus('loading');
      try {
        const result = playlist ? await fetchPlaylistTracks(playlist.id) : await fetchLikedTracks();
        if (id === requestId.current) setTracks(result);
      } catch (e) {
        if (id !== requestId.current) return;
        setTracks([]);
        // Cudzych playlist Spotify nie pokazuje (403) - to nie błąd, tylko komunikat w liście.
        if (!(playlist && e instanceof ApiError && e.status === 403)) {
          notify(`Nie udało się wczytać: ${errorMessage(e)}`);
        }
      } finally {
        if (id === requestId.current) setStatus('idle');
      }
    },
    [notify],
  );

  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) return;
      const id = ++requestId.current;
      setStatus('searching');
      try {
        const result = await searchTracks(query);
        if (id !== requestId.current) return;
        searchResults.current = result;
        setTracks(result);
        setSource({ type: 'search' });
        setSourceValue(SOURCE_SEARCH);
        setSelected(-1);
      } catch (e) {
        if (id === requestId.current) notify(`Wyszukiwanie nie powiodło się: ${errorMessage(e)}`);
      } finally {
        if (id === requestId.current) setStatus('idle');
      }
    },
    [notify],
  );

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetchPlaylists()
      .then((list) => {
        if (cancelled) return;
        playlistsRef.current = list;
        setPlaylists(list);
      })
      .catch((e) => !cancelled && notify(`Nie udało się wczytać playlist: ${errorMessage(e)}`));
    void loadSource(SOURCE_LIKED);
    return () => {
      cancelled = true;
    };
  }, [enabled, loadSource, notify]);

  return { playlists, tracks, source, sourceValue, status, selected, setSelected, loadSource, search };
}
