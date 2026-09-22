import { useState } from 'react';
import type { FormEvent } from 'react';
import Section from './Section';
import { RESUME_FILE, profile } from '../data/resume';
import { DownloadIcon, ExternalIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

const FORM_ENDPOINT = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) ?? '/api/contact';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function mailtoFor(data: FormData) {
  const subject = encodeURIComponent(String(data.get('subject') ?? ''));
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`,
  );
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [fallback, setFallback] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('sending');
    setFallback('');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
      setFallback(mailtoFor(data));
    }
  };

  return (
    <Section id="contact" eyebrow="06 / Contact" title="Get in Touch">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-slate-300">
            Open to software engineering roles. The fastest way to reach me is email.
          </p>

          <div className="space-y-3">
            <a
              className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
              href={`mailto:${profile.email}`}
            >
              <MailIcon className="h-4 w-4" /> {profile.email}
            </a>
            <div>
              <a className="btn-primary" href={`mailto:${profile.email}`}>
                <MailIcon className="h-4 w-4" /> Send Me an Email
              </a>
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <a
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
            </li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <a className="btn-secondary" href={`/${RESUME_FILE}`} download={RESUME_FILE}>
              <DownloadIcon /> Download Resume
            </a>
            <a className="btn-secondary" href={`/${RESUME_FILE}`} target="_blank" rel="noopener noreferrer">
              <ExternalIcon /> View Resume
            </a>
          </div>
        </div>

        <form className="card space-y-4" onSubmit={handleSubmit} noValidate={false}>
          <div>
            <label className="block text-sm font-medium text-slate-200" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Opportunity / question"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Your message"
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          <p aria-live="polite" className="min-h-[1.25rem] text-sm">
            {status === 'sent' && (
              <span className="text-emerald-400">Thanks — your message has been sent to {profile.email}.</span>
            )}
            {status === 'error' && (
              <span className="text-amber-400">
                The message service is unavailable right now.{' '}
                <a className="underline hover:text-amber-300" href={fallback}>
                  Send it by email instead
                </a>
                .
              </span>
            )}
          </p>
        </form>
      </div>
    </Section>
  );
}
