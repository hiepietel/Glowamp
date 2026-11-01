import type { RepeatMode } from '../../../types/spotify';

export interface PlaybackModesProps {
  shuffle: boolean;
  /** 0 = wyłączone, 1 = cała lista, 2 = jeden utwór */
  repeatMode: RepeatMode;
  onShuffle: () => void;
  onRepeat: () => void;
}
