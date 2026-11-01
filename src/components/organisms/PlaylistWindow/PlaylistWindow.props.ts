import type { Ref } from 'react';
import type { ListMessageKind, Playlist, Track } from '../../../types/spotify';
import type { AccountBarProps } from '../../molecules/AccountBar';

export interface PlaylistWindowProps {
  playlists: Playlist[];
  sourceValue: string;
  sourceDisabled: boolean;
  onSourceChange: (value: string) => void;
  onSearch: (query: string) => void;
  searchInputRef: Ref<HTMLInputElement>;
  tracks: Track[];
  selected: number;
  currentUri: string | null;
  message: ListMessageKind | null;
  onSelect: (index: number) => void;
  onPlay: (index: number) => void;
  account: AccountBarProps;
}
