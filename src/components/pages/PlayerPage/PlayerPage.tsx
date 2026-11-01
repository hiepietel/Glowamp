import { useGlowamp } from '../../../hooks/useGlowamp';
import { Toast } from '../../atoms/Toast';
import { MainWindow } from '../../organisms/MainWindow';
import { PlaylistWindow } from '../../organisms/PlaylistWindow';
import { PlayerTemplate } from '../../templates/PlayerTemplate';

export function PlayerPage() {
  const { mainWindow, playlistWindow, toast } = useGlowamp();

  return (
    <PlayerTemplate
      main={<MainWindow {...mainWindow} />}
      playlist={<PlaylistWindow {...playlistWindow} />}
      overlay={<Toast {...toast} />}
    />
  );
}
