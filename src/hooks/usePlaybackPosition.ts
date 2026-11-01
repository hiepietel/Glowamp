import { useEffect, useState } from 'react';

function positionAt(state: Spotify.PlaybackState | null, receivedAt: number): number {
  if (!state) return 0;
  if (state.paused) return state.position;
  return Math.min(state.duration, state.position + performance.now() - receivedAt);
}

/** Bieżąca pozycja utworu w ms, odświeżana kilka razy na sekundę podczas grania. */
export function usePlaybackPosition(state: Spotify.PlaybackState | null, receivedAt: number, intervalMs = 250) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(positionAt(state, receivedAt));
    if (!state || state.paused) return;
    const id = window.setInterval(() => setPosition(positionAt(state, receivedAt)), intervalMs);
    return () => window.clearInterval(id);
  }, [state, receivedAt, intervalMs]);

  return position;
}
