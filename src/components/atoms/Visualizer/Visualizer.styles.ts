export const visualizerStyles = {
  root: 'block h-9 w-38 [image-rendering:pixelated] max-[520px]:w-full',
} as const;

/** Colors drawn on the canvas (a canvas can't use classes). */
export const visualizerColors = {
  low: '#118a11',
  mid: '#d8d81e',
  high: '#e8361e',
  peak: '#bdbdd0',
} as const;

export const VISUALIZER_SIZE = { width: 152, height: 36, bars: 19 } as const;
