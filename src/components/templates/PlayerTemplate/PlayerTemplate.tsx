import type { PlayerTemplateProps } from './PlayerTemplate.props';
import { playerTemplateStyles as s } from './PlayerTemplate.styles';

/** Page layout: main window above the playlist window, centered. */
export function PlayerTemplate({ main, playlist, overlay }: PlayerTemplateProps) {
  return (
    <main className={s.root}>
      <div className={s.stack}>
        {main}
        {playlist}
      </div>
      {overlay}
    </main>
  );
}
