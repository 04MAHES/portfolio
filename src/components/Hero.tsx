import { RESUME_FILE, profile } from '../data/resume';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-20 pb-16 pt-16 sm:pb-24 sm:pt-24" aria-labelledby="hero-heading">
      <div className="container-page">
        <p className="eyebrow">{profile.location}</p>
        <h1 id="hero-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl font-medium text-sky-400 sm:text-2xl">{profile.title}</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{profile.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn-primary" href={`/${RESUME_FILE}`} target="_blank" rel="noopener noreferrer">
            View My Resume
          </a>
          <a className="btn-secondary" href="#contact">
            Contact Me
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap items-center gap-4">
          <li>
            <a
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="h-5 w-5" /> GitHub
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="h-5 w-5" /> LinkedIn
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              href={`mailto:${profile.email}`}
            >
              <MailIcon className="h-5 w-5" /> {profile.email}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
