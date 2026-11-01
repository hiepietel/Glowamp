import type { LampProps } from './Lamp.props';
import { lampStyles } from './Lamp.styles';

export function Lamp({ on, children }: LampProps) {
  return <span className={on ? lampStyles.on : lampStyles.off}>{children}</span>;
}
