import { cn } from '../../../lib/cn';
import type { SelectProps } from './Select.props';
import { selectStyles } from './Select.styles';

export function Select({ className, ...rest }: SelectProps) {
  return <select className={cn(selectStyles.root, className)} {...rest} />;
}
