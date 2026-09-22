import Section from './Section';
import { skillGroups } from '../data/resume';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="02 / Skills" title="Technical Skills">
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <div
            key={group.title}
            data-reveal
            className={`card reveal delay-${[0, 100, 200, 300, 400, 500, 600][i] ?? 0}`}
          >
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
