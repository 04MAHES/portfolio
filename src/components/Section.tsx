import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export default function Section({ id, eyebrow, title, children }: SectionProps) {
  // Observe the whole section wrapper for the section-level fade-up
  const sectionRef = useReveal<HTMLElement>();
  // Observe children container for staggered card animations
  const contentRef = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.05 });

  return (
    <section
      id={id}
      ref={sectionRef}
      className="section reveal"
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-page">
        {/* Eyebrow + title animate with the section reveal */}
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`} className="section-title">
          {title}
        </h2>

        {/* Content area — children tagged with data-reveal get staggered */}
        <div ref={contentRef} className="mt-8">
          {children}
        </div>
      </div>
    </section>
  );
}
