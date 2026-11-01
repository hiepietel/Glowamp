import { useEffect, useRef } from 'react';

type Handlers = Record<string, () => void>;

/** Single-key shortcuts (ignored while typing in a form field). */
export function useKeyboardShortcuts(handlers: Handlers): void {
  const ref = useRef(handlers);

  useEffect(() => {
    ref.current = handlers;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof Element && e.target.matches('input, select, textarea')) return;
      const handler = ref.current[e.key.toLowerCase()];
      if (!handler) return;
      e.preventDefault();
      handler();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
}
