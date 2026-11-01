export const transportButtonStyles = {
  base:
    'grid h-7 cursor-pointer place-items-center border bevel-btn bg-linear-to-b from-btn-top to-btn-bottom p-0 text-btn-icon ' +
    'active:bevel-btn-pressed active:from-btn-bottom active:to-btn-top',
  size: {
    md: 'w-9.5',
    sm: 'ml-1.5 w-7.5',
  },
} as const;
