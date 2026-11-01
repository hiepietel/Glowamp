// Tailwind nie ma wariantów dla części suwaka, więc stylujemy pseudo-elementy przez [&::...].
// Klasy muszą być pełnymi napisami (Tailwind ich nie składa dynamicznie).
const base =
  'm-0 h-4 w-full cursor-pointer appearance-none bg-transparent ' +
  '[&::-webkit-slider-runnable-track]:border [&::-webkit-slider-runnable-track]:border-black ' +
  '[&::-moz-range-track]:border [&::-moz-range-track]:border-black ' +
  '[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border ' +
  '[&::-webkit-slider-thumb]:bevel-btn [&::-webkit-slider-thumb]:bg-linear-to-b ' +
  '[&::-webkit-slider-thumb]:from-btn-top [&::-webkit-slider-thumb]:to-btn-bottom ' +
  '[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border ' +
  '[&::-moz-range-thumb]:border-btn-lo [&::-moz-range-thumb]:bg-linear-to-b ' +
  '[&::-moz-range-thumb]:from-btn-top [&::-moz-range-thumb]:to-btn-bottom';

export const rangeSliderStyles = {
  base,
  variant: {
    volume:
      '[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:bg-linear-to-r ' +
      '[&::-webkit-slider-runnable-track]:from-lcd-dim [&::-webkit-slider-runnable-track]:to-lcd ' +
      '[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:bg-linear-to-r ' +
      '[&::-moz-range-track]:from-lcd-dim [&::-moz-range-track]:to-lcd ' +
      '[&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:w-3.5 [&::-moz-range-thumb]:w-3.5',
    seek:
      '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-seek-track ' +
      '[&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-seek-track ' +
      '[&::-webkit-slider-thumb]:-mt-[3px] [&::-webkit-slider-thumb]:w-7.5 [&::-moz-range-thumb]:w-7.5',
  },
} as const;
