export interface SeekBarProps {
  /** Position in ms. */
  position: number;
  /** Track length in ms (0 = nothing playing). */
  duration: number;
  /** Called when the slider is released, with the new position in ms. */
  onSeek: (positionMs: number) => void;
}
