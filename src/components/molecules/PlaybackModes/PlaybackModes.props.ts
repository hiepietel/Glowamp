import type { RepeatMode } from '../../../types/spotify';

export interface PlaybackModesProps {
  shuffle: boolean;
  /** 0 = off, 1 = whole list, 2 = single track */
  repeatMode: RepeatMode;
  onShuffle: () => void;
  onRepeat: () => void;
}
