import { cn } from '../../../lib/cn';
import type { GripProps } from './Grip.props';
import { gripStyles } from './Grip.styles';

/** Stripes on a window's title bar. */
export function Grip({ className }: GripProps) {
  return <span aria-hidden="true" className={cn(gripStyles.root, className)} />;
}
