import { Grip } from '../../atoms/Grip';
import type { TitleBarProps } from './TitleBar.props';
import { titleBarStyles as s } from './TitleBar.styles';

export function TitleBar({ title }: TitleBarProps) {
  return (
    <div className={s.root}>
      <Grip />
      <span className={s.title}>{title}</span>
      <Grip />
    </div>
  );
}
