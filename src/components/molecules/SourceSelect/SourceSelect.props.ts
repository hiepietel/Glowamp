import type { Playlist } from '../../../types/spotify';

export interface SourceSelectProps {
  playlists: Playlist[];
  /** 'liked', 'search' or 'pl:<id>' */
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
