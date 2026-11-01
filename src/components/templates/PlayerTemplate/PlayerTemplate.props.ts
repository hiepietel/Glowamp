import type { ReactNode } from 'react';

export interface PlayerTemplateProps {
  main: ReactNode;
  playlist: ReactNode;
  /** Powiadomienie przyklejone do dołu ekranu. */
  overlay?: ReactNode;
}
