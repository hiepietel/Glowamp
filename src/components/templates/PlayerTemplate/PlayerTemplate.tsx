import type { PlayerTemplateProps } from './PlayerTemplate.props';
import { playerTemplateStyles as s } from './PlayerTemplate.styles';

/** Układ strony: okno główne nad oknem playlisty, wyśrodkowane. */
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
