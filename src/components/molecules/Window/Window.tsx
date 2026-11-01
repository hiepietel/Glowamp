import { cn } from '../../../lib/cn';
import { TitleBar } from '../TitleBar';
import type { WindowProps } from './Window.props';
import { windowStyles } from './Window.styles';

/** Ramka okna z paskiem tytułu. */
export function Window({ title, children, className }: WindowProps) {
  return (
    <section aria-label={title} className={cn(windowStyles.root, className)}>
      <TitleBar title={title} />
      {children}
    </section>
  );
}
