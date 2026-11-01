import { TransportButton } from '../../atoms/TransportButton';
import type { TransportControlsProps } from './TransportControls.props';
import { transportControlsStyles } from './TransportControls.styles';

export function TransportControls({ onPrev, onPlay, onPause, onStop, onNext, onEject }: TransportControlsProps) {
  return (
    <div className={transportControlsStyles.root}>
      <TransportButton icon="prev" title="Poprzedni (Z)" onClick={onPrev} />
      <TransportButton icon="play" title="Odtwórz (X)" onClick={onPlay} />
      <TransportButton icon="pause" title="Pauza (C)" onClick={onPause} />
      <TransportButton icon="stop" title="Stop (V)" onClick={onStop} />
      <TransportButton icon="next" title="Następny (B)" onClick={onNext} />
      <TransportButton icon="eject" size="sm" title="Szukaj (L)" onClick={onEject} />
    </div>
  );
}
