import { useRef } from 'react';

export default function MotionOrb() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty('--tilt-x', `${y * -14}deg`);
    node.style.setProperty('--tilt-y', `${x * 14}deg`);
  };

  const reset = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg');
    ref.current?.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={ref}
      className="motion-orb"
      aria-hidden="true"
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <div className="motion-orb__ring motion-orb__ring--one" />
      <div className="motion-orb__ring motion-orb__ring--two" />
      <div className="motion-orb__core">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
