import Section from './Section';
import { certifications } from '../data/resume';
import { ExternalIcon } from './Icons';

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="05 / Certifications" title="Certifications">
      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((item, i) => (
          <article
            key={`${item.issuer}-${item.name}`}
            data-reveal
            className={`card flex flex-col reveal delay-${[0, 150, 300][i] ?? 0}`}
          >
            <h3 className="text-base font-semibold text-white">{item.name}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {item.issuer}
              {item.year ? ` · ${item.year}` : ''}
            </p>
            {item.url ? (
              <a
                className="mt-5 inline-flex items-center gap-2 text-sm text-sky-400 transition-colors hover:text-sky-300"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon />
                View certificate
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
