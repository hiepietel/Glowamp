import type { Track } from '../../../types/spotify';

export interface TrackRowProps {
  index: number;
  track: Track;
  /** Zaznaczony (kliknięty / strzałki). */
  selected: boolean;
  /** Teraz grany. */
  current: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}
