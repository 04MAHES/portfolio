import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { RESUME_FILE, profile } from '../data/resume';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import MotionOrb from './MotionOrb';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = node.querySelectorAll<HTMLElement>('[data-hero]');
    if (reduced) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    // Small initial delay so the page has painted before animating
    const timer = setTimeout(() => {
      items.forEach(el => el.classList.add('is-visible'));
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="hero scroll-mt-20 overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24"
      aria-labelledby="hero-heading"
    >
      <div ref={ref} className="container-page relative">
        <div className="hero__parallax" aria-hidden="true">
          <MotionOrb />
        </div>
        {/* Name */}
        <h1
          data-hero
          id="hero-heading"
          className="hero-reveal delay-0 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          {profile.name.split(' ').map((word, index) => (
            <span className="hero-word" style={{ '--word-index': index } as CSSProperties} key={word}>
              {word}
            </span>
          ))}
        </h1>

        {/* Title */}
        <p
          data-hero
          className="hero-reveal delay-100 mt-3 text-xl font-medium text-sky-400 sm:text-2xl"
        >
          {profile.title}
        </p>

        {/* Tagline */}
        <p
          data-hero
          className="hero-reveal delay-200 mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          {profile.tagline}
        </p>

        {/* CTA buttons */}
        <div
          data-hero
          className="hero-reveal delay-300 mt-8 flex flex-wrap gap-3"
        >
          <a
            className="btn-primary"
            href={`/${RESUME_FILE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View My Resume
          </a>
          <a className="btn-secondary" href="#contact">
            Contact Me
          </a>
        </div>

        {/* Social links */}
        <ul
          data-hero
          className="hero-reveal delay-400 mt-8 flex flex-wrap items-center gap-4"
        >
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
