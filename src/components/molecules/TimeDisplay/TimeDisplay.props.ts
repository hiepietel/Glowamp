import type { PlaybackStatus } from '../../../types/spotify';

export interface TimeDisplayProps {
  status: PlaybackStatus;
  /** Preformatted time, e.g. "01:23" or "-02:10". */
  time: string;
  /** Clicking toggles elapsed / remaining time. */
  onToggleMode: () => void;
}
