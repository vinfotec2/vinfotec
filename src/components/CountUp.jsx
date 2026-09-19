import { useEffect, useState } from 'react';
import { useInView } from './Reveal.jsx';

// Splits "300+", "98%", "$1.6M+" into prefix / number / suffix so the numeric
// part can animate while the decoration around it stays put.
const PARTS = /^(\D*?)([\d.,]+)(.*)$/;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Counts a stat up to its final value the first time it scrolls into view. */
export default function CountUp({ value, duration = 1600, className }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const match = String(value).match(PARTS);
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : NaN;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target);
      return undefined;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCurrent(target * easeOut(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  // Anything we cannot parse renders verbatim rather than breaking.
  if (!match || Number.isNaN(target)) {
    return <span className={className}>{value}</span>;
  }

  const [, prefix, rawNumber, suffix] = match;
  const decimals = (rawNumber.split('.')[1] || '').length;
  const display = current.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
