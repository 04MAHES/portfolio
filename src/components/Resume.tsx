import Section from './Section';
import { RESUME_FILE, profile } from '../data/resume';
import { DownloadIcon, ExternalIcon } from './Icons';

export default function Resume() {
  return (
    <Section id="resume" eyebrow="05 / Resume" title="Resume">
      <div className="card flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-300">
            Full resume for {profile.name}, {profile.title}.
          </p>
          <p className="mt-1 font-mono text-xs text-slate-500">{RESUME_FILE}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a className="btn-primary" href={`/${RESUME_FILE}`} download={RESUME_FILE}>
            <DownloadIcon /> Download Resume
          </a>
          <a className="btn-secondary" href={`/${RESUME_FILE}`} target="_blank" rel="noopener noreferrer">
            <ExternalIcon /> View Resume
          </a>
        </div>
      </div>
    </Section>
  );
}
