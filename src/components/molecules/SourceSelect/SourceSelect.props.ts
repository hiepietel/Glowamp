import type { Playlist } from '../../../types/spotify';

export interface SourceSelectProps {
  playlists: Playlist[];
  /** 'liked', 'search' albo 'pl:<id>' */
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
