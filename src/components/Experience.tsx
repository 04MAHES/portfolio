import Section from './Section';
import { experience } from '../data/resume';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="03 / Experience" title="Professional Experience">
      <ol className="relative space-y-10 border-l border-slate-800 pl-6">
        {experience.map((job, ji) => (
          <li
            key={`${job.company}-${job.role}`}
            data-reveal
            className={`relative reveal delay-${[0, 150, 300][ji] ?? 0}`}
          >
            <span
              className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-sky-400 bg-slate-950"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold text-white">
                {job.role} · <span className="text-sky-400">{job.company}</span>
              </h3>
              <p className="font-mono text-xs text-slate-400">{job.period}</p>
            </div>
            <p className="mt-1 text-sm text-slate-400">{job.location}</p>

            <div className="mt-5 space-y-5">
              {job.engagements.map((engagement, ei) => (
                <div
                  key={engagement.name}
                  className={`card reveal delay-${[100, 200, 300][ei] ?? 100}`}
                  data-reveal
                >
                  <h4 className="text-sm font-semibold text-white">{engagement.name}</h4>
                  {engagement.context && (
                    <p className="mt-1 text-xs text-slate-400">{engagement.context}</p>
                  )}
                  <ul className="mt-3 space-y-2">
                    {engagement.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-sky-400" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  {engagement.tech.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {engagement.tech.map((tech) => (
                        <li key={tech} className="badge">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
