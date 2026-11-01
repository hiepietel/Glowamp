import { Badge } from '../../atoms/Badge';
import { Lamp } from '../../atoms/Lamp';
import type { StatusLampsProps } from './StatusLamps.props';
import { statusLampsStyles } from './StatusLamps.styles';

export function StatusLamps({ stereo, online }: StatusLampsProps) {
  return (
    <div className={statusLampsStyles.root}>
      <Badge>SPOTIFY</Badge>
      <Lamp on={stereo}>STEREO</Lamp>
      <Lamp on={online}>ONLINE</Lamp>
    </div>
  );
}
