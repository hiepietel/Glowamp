import { useEffect, useRef, useState } from 'react';
import { RangeSlider } from '../../atoms/RangeSlider';
import type { SeekBarProps } from './SeekBar.props';
import { SEEK_STEPS, seekBarStyles } from './SeekBar.styles';

export function SeekBar({ position, duration, onSeek }: SeekBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const latest = useRef({ duration, onSeek });
  // Podczas przeciągania suwak pokazuje wartość użytkownika, a nie pozycję utworu.
  const [dragValue, setDragValue] = useState<number | null>(null);

  useEffect(() => {
    latest.current = { duration, onSeek };
  }, [duration, onSeek]);

  // React mapuje onChange na zdarzenie "input", a przewijać chcemy dopiero po puszczeniu ("change").
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const commit = () => {
      setDragValue(null);
      const { duration: d, onSeek: seek } = latest.current;
      if (d) seek(Math.round((Number(el.value) / SEEK_STEPS) * d));
    };
    el.addEventListener('change', commit);
    return () => el.removeEventListener('change', commit);
  }, []);

  const value = dragValue ?? (duration ? Math.round((position / duration) * SEEK_STEPS) : 0);

  return (
    <RangeSlider
      ref={inputRef}
      variant="seek"
      min={0}
      max={SEEK_STEPS}
      value={value}
      aria-label="Pozycja utworu"
      className={seekBarStyles.root}
      onChange={(e) => setDragValue(Number(e.target.value))}
    />
  );
}
