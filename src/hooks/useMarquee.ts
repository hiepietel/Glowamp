import { useEffect, useState } from 'react';

const STEP_MS = 180;
const WINDOW = 120;
const SEPARATOR = '   ***   ';

/** Scrolling text like on a classic player's display. */
export function useMarquee(text: string): string {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const loop = text + SEPARATOR;
    const strip = loop.repeat(3);
    let offset = 0;
    setDisplay(strip.slice(0, WINDOW));
    if (!text) return;
    const id = window.setInterval(() => {
      offset = (offset + 1) % loop.length;
      setDisplay(strip.slice(offset, offset + WINDOW));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [text]);

  return text ? display : '';
}
