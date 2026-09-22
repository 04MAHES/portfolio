import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export default function Section({ id, eyebrow, title, children }: SectionProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section id={id} ref={ref} className="section reveal" aria-labelledby={`${id}-heading`}>
      <div className="container-page">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`} className="section-title">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
