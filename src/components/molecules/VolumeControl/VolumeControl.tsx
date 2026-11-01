import { RangeSlider } from '../../atoms/RangeSlider';
import type { VolumeControlProps } from './VolumeControl.props';
import { volumeControlStyles } from './VolumeControl.styles';

export function VolumeControl({ value, onChange }: VolumeControlProps) {
  return (
    <label className={volumeControlStyles.root}>
      VOL
      <RangeSlider min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}
