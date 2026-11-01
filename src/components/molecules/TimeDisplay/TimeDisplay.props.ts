import type { PlaybackStatus } from '../../../types/spotify';

export interface TimeDisplayProps {
  status: PlaybackStatus;
  /** Gotowy tekst czasu, np. "01:23" albo "-02:10". */
  time: string;
  /** Kliknięcie przełącza czas upłynięty / pozostały. */
  onToggleMode: () => void;
}
