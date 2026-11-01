export const toastStyles = {
  base:
    'pointer-events-none fixed bottom-6 left-1/2 max-w-[calc(100%-32px)] -translate-x-1/2 border border-lcd ' +
    'bg-lcd-bg px-3 py-1.5 font-lcd text-xl text-lcd opacity-0 transition-opacity duration-200',
  visible: 'opacity-100',
} as const;
