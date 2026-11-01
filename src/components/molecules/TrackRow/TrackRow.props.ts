import type { Track } from '../../../types/spotify';

export interface TrackRowProps {
  index: number;
  track: Track;
  /** Selected (clicked or picked with arrow keys). */
  selected: boolean;
  /** Currently playing. */
  current: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}
