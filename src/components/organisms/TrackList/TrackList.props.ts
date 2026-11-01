import type { ListMessageKind, Track } from '../../../types/spotify';

export interface TrackListProps {
  tracks: Track[];
  selected: number;
  currentUri: string | null;
  /** When set, a message is shown instead of the tracks. */
  message: ListMessageKind | null;
  onSelect: (index: number) => void;
  onPlay: (index: number) => void;
}
