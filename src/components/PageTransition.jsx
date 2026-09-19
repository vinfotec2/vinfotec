import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Fades route content in on navigation. Keyed off the pathname so each route
 * replays the animation; the previous page is replaced immediately rather than
 * cross-faded, which keeps navigation feeling instant.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [stage, setStage] = useState('in');

  useEffect(() => {
    setStage('out');
    const id = requestAnimationFrame(() => setStage('in'));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      className={`transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
        stage === 'in' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
