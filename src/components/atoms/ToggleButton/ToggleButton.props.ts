import type { ComponentProps } from 'react';

export interface ToggleButtonProps extends ComponentProps<'button'> {
  /** Podświetlony (np. SHUFFLE włączony). */
  active?: boolean;
  size?: 'md' | 'lg';
}
