import type { ReactNode } from 'react';
import { REDIRECT_URI } from '../../../config';
import type { ListMessageKind } from '../../../types/spotify';
import type { ListMessageProps } from './ListMessage.props';
import { listMessageStyles as s } from './ListMessage.styles';

const SIMPLE: Record<Exclude<ListMessageKind, 'setup' | 'empty-playlist'>, string> = {
  login: 'Kliknij „ZALOGUJ PRZEZ SPOTIFY” na dole okna.',
  checking: 'Łączenie...',
  denied: 'Brak dostępu do konta Spotify.',
  loading: 'Wczytywanie...',
  searching: 'Szukam...',
  empty: 'Brak utworów.',
};

function content(kind: ListMessageKind): ReactNode {
  if (kind === 'setup') {
    return (
      <>
        Konfiguracja (jednorazowo):
        <ol className={s.steps}>
          <li>Wejdź na developer.spotify.com/dashboard i utwórz aplikację.</li>
          <li>
            Redirect URI: <code className={s.code}>{REDIRECT_URI}</code>
          </li>
          <li>Zaznacz „Web API” i „Web Playback SDK”.</li>
          <li>
            Skopiuj Client ID do pliku <code className={s.code}>.env.local</code> jako{' '}
            <code className={s.code}>VITE_SPOTIFY_CLIENT_ID</code> i uruchom ponownie <code className={s.code}>npm run dev</code>.
          </li>
        </ol>
        Odtwarzanie wymaga konta Spotify Premium.
      </>
    );
  }
  if (kind === 'empty-playlist') {
    return (
      <>
        Spotify pokazuje utwory tylko z Twoich własnych playlist.
        <br />
        Naciśnij ▶, aby odtworzyć całą tę playlistę.
      </>
    );
  }
  return SIMPLE[kind];
}

export function ListMessage({ kind }: ListMessageProps) {
  return <div className={s.root}>{content(kind)}</div>;
}
