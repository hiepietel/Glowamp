import { useEffect, useRef } from 'react';
import { cn } from '../../../lib/cn';
import type { VisualizerProps } from './Visualizer.props';
import { VISUALIZER_SIZE, visualizerColors, visualizerStyles } from './Visualizer.styles';

const { width: W, height: H, bars: BARS } = VISUALIZER_SIZE;

/**
 * The spectrum analyzer is decorative only: Spotify doesn't expose raw audio,
 * so the bars are animated artificially.
 */
export function Visualizer({ playing, className }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, H, 0, 0);
    grad.addColorStop(0, visualizerColors.low);
    grad.addColorStop(0.55, visualizerColors.mid);
    grad.addColorStop(1, visualizerColors.high);

    const bars = new Array<number>(BARS).fill(0);
    const peaks = new Array<number>(BARS).fill(0);
    const bw = W / BARS;
    let frame = 0;

    const draw = () => {
      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < BARS; i++) {
        let target = 0;
        if (playingRef.current) {
          const wave = Math.abs(Math.sin(t * (2.1 + i * 0.37) + i) * Math.sin(t * 1.3 + i * i * 0.11));
          target = Math.min(1, (0.2 + 0.8 * wave) * (1.05 - i / (BARS * 1.6)) + Math.random() * 0.12);
        }
        bars[i] = target > bars[i] ? target : bars[i] * 0.88;
        peaks[i] = bars[i] > peaks[i] ? bars[i] : Math.max(0, peaks[i] - 0.012);

        const x = Math.floor(i * bw);
        const h = Math.round(bars[i] * H);
        ctx.fillStyle = grad;
        ctx.fillRect(x, H - h, Math.ceil(bw) - 2, h);
        if (peaks[i] > 0.02) {
          ctx.fillStyle = visualizerColors.peak;
          ctx.fillRect(x, H - Math.round(peaks[i] * H) - 1, Math.ceil(bw) - 2, 1);
        }
      }
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      aria-hidden="true"
      className={cn(visualizerStyles.root, className)}
    />
  );
}
