import { AccountBar } from '../../molecules/AccountBar';
import { SearchForm } from '../../molecules/SearchForm';
import { SourceSelect } from '../../molecules/SourceSelect';
import { Window } from '../../molecules/Window';
import { TrackList } from '../TrackList';
import type { PlaylistWindowProps } from './PlaylistWindow.props';
import { playlistWindowStyles as s } from './PlaylistWindow.styles';

/** Playlist window: source picker, search, track list and account. */
export function PlaylistWindow(props: PlaylistWindowProps) {
  return (
    <Window title="GLOWAMP PLAYLIST">
      <div className={s.toolbar}>
        <SourceSelect
          playlists={props.playlists}
          value={props.sourceValue}
          onChange={props.onSourceChange}
          disabled={props.sourceDisabled}
        />
        <SearchForm onSearch={props.onSearch} inputRef={props.searchInputRef} disabled={props.sourceDisabled} />
      </div>

      <TrackList
        tracks={props.tracks}
        selected={props.selected}
        currentUri={props.currentUri}
        message={props.message}
        onSelect={props.onSelect}
        onPlay={props.onPlay}
      />

      <AccountBar {...props.account} />
    </Window>
  );
}
