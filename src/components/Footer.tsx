import { profile } from '../data/resume';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a
              className="text-slate-400 transition-colors hover:text-white"
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a
              className="text-slate-400 transition-colors hover:text-white"
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a
              className="text-slate-400 transition-colors hover:text-white"
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
            >
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
