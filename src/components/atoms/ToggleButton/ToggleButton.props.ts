import type { ComponentProps } from 'react';

export interface ToggleButtonProps extends ComponentProps<'button'> {
  /** Lit up (e.g. SHUFFLE is on). */
  active?: boolean;
  size?: 'md' | 'lg';
}
