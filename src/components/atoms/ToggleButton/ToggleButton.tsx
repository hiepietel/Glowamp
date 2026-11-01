import { cn } from '../../../lib/cn';
import type { ToggleButtonProps } from './ToggleButton.props';
import { toggleButtonStyles as s } from './ToggleButton.styles';

export function ToggleButton({ active = false, size = 'md', className, type = 'button', ...rest }: ToggleButtonProps) {
  return <button type={type} className={cn(s.base, s.size[size], active && s.active, className)} {...rest} />;
}
