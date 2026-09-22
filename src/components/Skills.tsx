import Section from './Section';
import { skillGroups } from '../data/resume';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="02 / Skills" title="Technical Skills">
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="card">
            <h3 className="text-sm font-semibold text-white">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="badge">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
