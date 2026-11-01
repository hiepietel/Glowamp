import type { ComponentProps } from 'react';
import type { IconName } from '../Icon';

export interface TransportButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  icon: IconName;
  size?: 'md' | 'sm';
}
