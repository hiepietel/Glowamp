import type { ComponentProps } from 'react';

export interface RangeSliderProps extends Omit<ComponentProps<'input'>, 'type'> {
  /** volume: krótki suwak z gradientem, seek: szeroki pasek pozycji utworu. */
  variant?: 'volume' | 'seek';
}
