import Section from './Section';
import { projects } from '../data/resume';
import { GitHubIcon } from './Icons';

export default function Projects() {
  return (
    <Section id="projects" eyebrow="04 / Projects" title="Projects">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <article
            key={project.name}
            data-reveal
            className={`card project-card flex flex-col reveal delay-${[0, 150, 300][i] ?? 0}`}
          >
            <h3 className="text-base font-semibold text-white">
              {project.name}
              {project.subtitle && <span className="text-slate-400"> — {project.subtitle}</span>}
            </h3>
            <ul className="mt-3 space-y-2">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-sky-400" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="badge">
                  {tech}
                </li>
              ))}
            </ul>
            {project.repo && (
              <a
                className="mt-5 inline-flex items-center gap-2 text-sm text-sky-400 transition-colors hover:text-sky-300"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-4 w-4" />
                {project.repoLabel ?? 'View repository'}
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
