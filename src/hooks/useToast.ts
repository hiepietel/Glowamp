import { useCallback, useEffect, useRef, useState } from 'react';

const DURATION_MS = 4000;

export function useToast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((text: string) => {
    setMessage(text);
    setVisible(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setVisible(false), DURATION_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { message, visible, show };
}
