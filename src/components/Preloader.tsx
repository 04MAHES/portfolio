import { useEffect, useState } from 'react';

export default function Preloader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setComplete(true), reduced ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${complete ? 'preloader--complete' : ''}`} aria-hidden="true">
      <div className="preloader__mark">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
