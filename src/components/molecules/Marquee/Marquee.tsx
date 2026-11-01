import { useMarquee } from '../../../hooks/useMarquee';
import type { MarqueeProps } from './Marquee.props';
import { marqueeStyles } from './Marquee.styles';

export function Marquee({ text }: MarqueeProps) {
  const display = useMarquee(text);
  return (
    <div className={marqueeStyles.root} title={text}>
      {display}
    </div>
  );
}
