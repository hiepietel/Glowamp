import { ToggleButton } from '../../atoms/ToggleButton';
import type { AccountBarProps } from './AccountBar.props';
import { accountBarStyles as s } from './AccountBar.styles';

export function AccountBar({ status, userName, onLogin, onLogout }: AccountBarProps) {
  return (
    <div className={s.root}>
      {status === 'logged-out' && <ToggleButton onClick={onLogin}>ZALOGUJ PRZEZ SPOTIFY</ToggleButton>}
      {userName && <span className={s.user}>{userName}</span>}
      {(status === 'ready' || status === 'denied') && <ToggleButton onClick={onLogout}>WYLOGUJ</ToggleButton>}
      <span className={s.attribution}>Muzyka i dane: Spotify</span>
    </div>
  );
}
