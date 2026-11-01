export interface TransportControlsProps {
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onNext: () => void;
  /** The "eject" button jumps to the search field. */
  onEject: () => void;
}
