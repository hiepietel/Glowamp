import type { ReactNode } from 'react';

export interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}
