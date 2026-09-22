import { useEffect, useState } from 'react';
import { RESUME_FILE, navItems, profile } from '../data/resume';
import { DownloadIcon } from './Icons';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <a href="#home" className="font-mono text-sm font-semibold tracking-tight text-white">
          {profile.name.split(' ')[0]}
          <span className="text-sky-400">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a className="btn-primary" href={`/${RESUME_FILE}`} download={RESUME_FILE}>
              <DownloadIcon /> Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 text-slate-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-800 bg-slate-950 md:hidden">
          <ul className="container-page flex flex-col py-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block rounded-md px-2 py-3 text-sm text-slate-300 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                className="btn-primary w-full"
                href={`/${RESUME_FILE}`}
                download={RESUME_FILE}
                onClick={() => setOpen(false)}
              >
                <DownloadIcon /> Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
