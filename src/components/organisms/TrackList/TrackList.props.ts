import type { ListMessageKind, Track } from '../../../types/spotify';

export interface TrackListProps {
  tracks: Track[];
  selected: number;
  currentUri: string | null;
  /** Gdy ustawione, zamiast utworów pokazuje komunikat. */
  message: ListMessageKind | null;
  onSelect: (index: number) => void;
  onPlay: (index: number) => void;
}
