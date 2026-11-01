import { cn } from '../../../lib/cn';
import { Icon } from '../Icon';
import type { TransportButtonProps } from './TransportButton.props';
import { transportButtonStyles as s } from './TransportButton.styles';

export function TransportButton({ icon, size = 'md', className, type = 'button', ...rest }: TransportButtonProps) {
  return (
    <button type={type} className={cn(s.base, s.size[size], className)} {...rest}>
      <Icon name={icon} />
    </button>
  );
}
