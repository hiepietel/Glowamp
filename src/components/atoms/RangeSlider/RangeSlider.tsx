import { cn } from '../../../lib/cn';
import type { RangeSliderProps } from './RangeSlider.props';
import { rangeSliderStyles as s } from './RangeSlider.styles';

export function RangeSlider({ variant = 'volume', className, ...rest }: RangeSliderProps) {
  return <input type="range" className={cn(s.base, s.variant[variant], className)} {...rest} />;
}
