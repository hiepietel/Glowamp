import type { AuthStatus } from '../../../types/spotify';

export interface AccountBarProps {
  status: AuthStatus;
  userName: string;
  onLogin: () => void;
  onLogout: () => void;
}
