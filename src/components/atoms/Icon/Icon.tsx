import { cn } from '../../../lib/cn';
import type { IconName, IconProps } from './Icon.props';
import { iconStyles } from './Icon.styles';

const PATHS: Record<IconName, string> = {
  prev: 'M3 3h2v10H3zM13 3v10L6 8z',
  play: 'M4 3v10l9-5z',
  pause: 'M4 3h3v10H4zM9 3h3v10H9z',
  stop: 'M4 4h8v8H4z',
  next: 'M11 3h2v10h-2zM3 3v10l7-5z',
  eject: 'M8 3l5 6H3zM3 11h10v2H3z',
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={cn(iconStyles.root, className)}>
      <path d={PATHS[name]} />
    </svg>
  );
}
