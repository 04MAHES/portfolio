import Section from './Section';
import { education, profile } from '../data/resume';

export default function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="About Me">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-base leading-relaxed text-slate-300">{profile.summary}</p>
        </div>
        <aside className="space-y-6">
          <div id="education">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Education</h3>
            {education.map((item) => (
              <div key={item.degree} className="mt-3">
                <p className="text-sm font-medium text-white">{item.degree}</p>
                <p className="text-sm text-slate-400">{item.school}</p>
                <p className="text-sm text-slate-500">
                  {item.location} · {item.period}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Based in</h3>
            <p className="mt-3 text-sm text-slate-300">{profile.location}</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
