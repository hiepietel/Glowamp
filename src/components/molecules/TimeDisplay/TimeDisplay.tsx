import type { PlaybackStatus } from '../../../types/spotify';
import type { TimeDisplayProps } from './TimeDisplay.props';
import { timeDisplayStyles as s } from './TimeDisplay.styles';

const STATUS_ICON: Record<PlaybackStatus, string> = {
  stopped: '■',
  playing: '▶',
  paused: '❚❚',
};

export function TimeDisplay({ status, time, onToggleMode }: TimeDisplayProps) {
  return (
    <div className={s.root}>
      <span className={s.status} aria-label={status}>
        {STATUS_ICON[status]}
      </span>
      <button type="button" className={s.time} title="Kliknij, aby przełączyć czas pozostały" onClick={onToggleMode}>
        {time}
      </button>
    </div>
  );
}
