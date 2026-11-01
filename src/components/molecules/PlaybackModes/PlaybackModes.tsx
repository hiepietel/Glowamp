import { ToggleButton } from '../../atoms/ToggleButton';
import type { PlaybackModesProps } from './PlaybackModes.props';
import { playbackModesStyles } from './PlaybackModes.styles';

export function PlaybackModes({ shuffle, repeatMode, onShuffle, onRepeat }: PlaybackModesProps) {
  return (
    <div className={playbackModesStyles.root}>
      <ToggleButton active={shuffle} title="Losowo (S)" onClick={onShuffle}>
        SHUFFLE
      </ToggleButton>
      <ToggleButton active={repeatMode !== 0} title="Powtarzanie (R)" onClick={onRepeat}>
        {repeatMode === 2 ? 'REP 1' : 'REP'}
      </ToggleButton>
    </div>
  );
}
