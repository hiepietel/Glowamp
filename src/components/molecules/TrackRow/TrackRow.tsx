import { cn } from '../../../lib/cn';
import { formatTime } from '../../../lib/format';
import type { TrackRowProps } from './TrackRow.props';
import { trackRowStyles as s } from './TrackRow.styles';

export function TrackRow({ index, track, selected, current, onClick, onDoubleClick }: TrackRowProps) {
  return (
    <div
      role="option"
      aria-selected={selected}
      aria-current={current || undefined}
      className={cn(s.base, selected && s.selected, current && s.current)}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <span className={s.name}>
        {index + 1}. {track.artists} - {track.name}
      </span>
      <span>{formatTime(track.duration)}</span>
    </div>
  );
}
