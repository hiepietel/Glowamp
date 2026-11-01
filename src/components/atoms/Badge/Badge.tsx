import type { BadgeProps } from './Badge.props';
import { badgeStyles } from './Badge.styles';

export function Badge({ children }: BadgeProps) {
  return <span className={badgeStyles.root}>{children}</span>;
}
