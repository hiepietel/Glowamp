import { Visualizer } from '../../atoms/Visualizer';
import { Marquee } from '../../molecules/Marquee';
import { PlaybackModes } from '../../molecules/PlaybackModes';
import { SeekBar } from '../../molecules/SeekBar';
import { StatusLamps } from '../../molecules/StatusLamps';
import { TimeDisplay } from '../../molecules/TimeDisplay';
import { TransportControls } from '../../molecules/TransportControls';
import { VolumeControl } from '../../molecules/VolumeControl';
import { Window } from '../../molecules/Window';
import type { MainWindowProps } from './MainWindow.props';
import { mainWindowStyles as s } from './MainWindow.styles';

/** Main window: display, sliders and buttons. */
export function MainWindow(props: MainWindowProps) {
  return (
    <Window title="GLOWAMP">
      <div className={s.body}>
        <div className={s.lcd}>
          <TimeDisplay status={props.status} time={props.time} onToggleMode={props.onToggleTimeMode} />
          <Visualizer playing={props.playing} />
        </div>

        <div className={s.info}>
          <Marquee text={props.marquee} />
          <StatusLamps stereo={props.playing} online={props.online} />
          <VolumeControl value={props.volume} onChange={props.onVolumeChange} />
        </div>
      </div>

      <SeekBar position={props.position} duration={props.duration} onSeek={props.onSeek} />

      <div className={s.controls}>
        <TransportControls {...props.controls} />
        <span className={s.spacer} />
        <PlaybackModes {...props.modes} />
      </div>
    </Window>
  );
}
