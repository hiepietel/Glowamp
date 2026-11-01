import { useEffect, useRef, type KeyboardEvent } from 'react';
import { ListMessage } from '../../molecules/ListMessage';
import { TrackRow } from '../../molecules/TrackRow';
import type { TrackListProps } from './TrackList.props';
import { trackListStyles } from './TrackList.styles';

export function TrackList({ tracks, selected, currentUri, message, onSelect, onPlay }: TrackListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected >= 0) listRef.current?.children[selected]?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (message || !tracks.length) return;
    if (e.key === 'Enter') {
      if (selected >= 0) onPlay(selected);
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    onSelect(e.key === 'ArrowDown' ? Math.min(tracks.length - 1, selected + 1) : Math.max(0, selected - 1));
  };

  // Double-tap is awkward on touch screens, so a single tap plays right away.
  const onRowClick = (index: number) => {
    if (window.matchMedia('(pointer: coarse)').matches) onPlay(index);
    else onSelect(index);
  };

  return (
    <div ref={listRef} role="listbox" aria-label="Utwory" tabIndex={0} className={trackListStyles.root} onKeyDown={onKeyDown}>
      {message ? (
        <ListMessage kind={message} />
      ) : (
        tracks.map((track, i) => (
          <TrackRow
            key={`${track.uri}-${i}`}
            index={i}
            track={track}
            selected={i === selected}
            current={track.uri === currentUri}
            onClick={() => onRowClick(i)}
            onDoubleClick={() => onPlay(i)}
          />
        ))
      )}
    </div>
  );
}
