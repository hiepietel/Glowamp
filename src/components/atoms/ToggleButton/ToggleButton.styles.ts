export const toggleButtonStyles = {
  base: 'cursor-pointer border bevel-out bg-toggle-bg px-2 font-pixel text-[9px] text-muted active:bevel-in',
  active: 'text-toggle-on glow-on',
  size: {
    md: 'h-5.5',
    lg: 'h-7.5',
  },
} as const;
