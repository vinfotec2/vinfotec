import { useEffect, useRef, useState } from 'react';
import { cn } from './ui.jsx';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals an element the first time it scrolls into view.
 * Returns [ref, isVisible]; visible immediately when motion is reduced or when
 * IntersectionObserver is unavailable, so content is never hidden by a failure.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    if (inView || !ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return [ref, inView];
}

const DIRECTIONS = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
  none: 'scale-95',
};

/**
 * Fades and slides its children in on first scroll into view.
 * `delay` is in milliseconds and is applied as an inline transition delay so
 * arbitrary stagger values work without generating a Tailwind class per value.
 */
export default function Reveal({
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  duration = 600,
  className,
  children,
  ...props
}) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-[opacity,transform] ease-out motion-reduce:transition-none',
        inView ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : `opacity-0 ${DIRECTIONS[direction]}`,
        className
      )}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${inView ? delay : 0}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
