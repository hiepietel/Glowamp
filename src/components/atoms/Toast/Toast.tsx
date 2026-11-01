import { cn } from '../../../lib/cn';
import type { ToastProps } from './Toast.props';
import { toastStyles } from './Toast.styles';

export function Toast({ message, visible }: ToastProps) {
  return (
    <div role="status" className={cn(toastStyles.base, visible && toastStyles.visible)}>
      {message}
    </div>
  );
}
