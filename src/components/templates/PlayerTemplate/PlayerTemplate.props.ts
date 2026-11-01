import type { ReactNode } from 'react';

export interface PlayerTemplateProps {
  main: ReactNode;
  playlist: ReactNode;
  /** Notification pinned to the bottom of the screen. */
  overlay?: ReactNode;
}
