import { useEffect, useRef } from 'react';

type Options = {
  /** Animate descendants with their individual stagger delays instead of the root el */
  stagger?: boolean;
  /** IntersectionObserver threshold (default 0.08) */
  threshold?: number;
};

export function useReveal<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T | null>(null);
  const { stagger = false, threshold = 0.08 } = opts;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect prefers-reduced-motion at the JS level too
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      node.classList.add('is-visible');
      node.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el =>
        el.classList.add('is-visible'),
      );
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    if (stagger) {
      // Keep observing so cards replay their entrance whenever they return to view.
      const children = Array.from(
        node.querySelectorAll<HTMLElement>('[data-reveal]'),
      );

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
          });
        },
        { threshold },
      );

      children.forEach(child => observer.observe(child));
      return () => observer.disconnect();
    }

    // Keep section reveals reversible rather than treating them as one-time events.
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [stagger, threshold]);

  return ref;
}
