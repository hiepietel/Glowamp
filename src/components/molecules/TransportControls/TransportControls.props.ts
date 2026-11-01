export interface TransportControlsProps {
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onNext: () => void;
  /** Przycisk "eject" przenosi do wyszukiwarki. */
  onEject: () => void;
}
