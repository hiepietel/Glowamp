export interface SeekBarProps {
  /** Pozycja w ms. */
  position: number;
  /** Długość utworu w ms (0 = nic nie gra). */
  duration: number;
  /** Wywoływane po puszczeniu suwaka, z nową pozycją w ms. */
  onSeek: (positionMs: number) => void;
}
