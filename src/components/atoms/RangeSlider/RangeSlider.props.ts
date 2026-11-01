import type { ComponentProps } from 'react';

export interface RangeSliderProps extends Omit<ComponentProps<'input'>, 'type'> {
  /** volume: short slider with a gradient; seek: wide track position bar. */
  variant?: 'volume' | 'seek';
}
