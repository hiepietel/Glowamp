import type { PlaybackStatus } from '../../../types/spotify';
import type { PlaybackModesProps } from '../../molecules/PlaybackModes';
import type { TransportControlsProps } from '../../molecules/TransportControls';

export interface MainWindowProps {
  status: PlaybackStatus;
  time: string;
  onToggleTimeMode: () => void;
  playing: boolean;
  online: boolean;
  marquee: string;
  volume: number;
  onVolumeChange: (value: number) => void;
  position: number;
  duration: number;
  onSeek: (positionMs: number) => void;
  controls: TransportControlsProps;
  modes: PlaybackModesProps;
}
