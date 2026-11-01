import { cn } from '../../../lib/cn';
import type { TextInputProps } from './TextInput.props';
import { textInputStyles } from './TextInput.styles';

export function TextInput({ className, type = 'text', ...rest }: TextInputProps) {
  return <input type={type} className={cn(textInputStyles.root, className)} {...rest} />;
}
