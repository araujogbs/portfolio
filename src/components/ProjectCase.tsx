import type { ReactNode } from 'react';
import type { Project } from '../data/projects';
import { layers } from '../data/profile';
import { Gallery } from './Gallery';

interface Props {
  project: Project;
  children: ReactNode;
}

export function ProjectCase({ project: p, children }: Props) {
  return (
    <article className="case" id={`projeto-${p.id}`} aria-labelledby={`case-${p.id}`}>
      <div className="wrap">
        <header className="case__head" data-reveal>
          <span className="case__index" aria-hidden="true" data-roman={toRoman(Number(p.index))}>
            {p.index}
          </span>
          <div className="case__titles">
            <div className="case__meta">
              <span className={`case__status case__status--${p.status.tone} mono`}>
                <span className="case__status-dot" />
                {p.status.label}
              </span>
              <span className="mono case__client">{p.client}</span>
            </div>
            <h3 className="case__name" id={`case-${p.id}`}>
              {p.name}
            </h3>
            <p className="case__tagline">{p.tagline}</p>
          </div>
        </header>

        <div className="case__body">
          <div className="case__text" data-reveal>
            <p className="case__summary">{p.summary}</p>

            <div className="case__problem">
              <span className="mono">antes</span>
              <p>{p.problem}</p>
            </div>

            <dl className="case__metrics">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.value}</dt>
                  <dd>{m.label}</dd>
                </div>
              ))}
            </dl>

            <div className="case__layers mono" aria-label="Camadas envolvidas">
              {layers.map((l) => (
                <span key={l.id} className={p.layers.includes(l.id) ? 'is-on' : ''}>
                  {l.label}
                </span>
              ))}
            </div>

            <ul className="case__stack" aria-label="Tecnologias">
              {p.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>

            <div className="case__links">
              {p.links.map((l, i) => (
                <a
                  key={l.href}
                  className={`btn${i === 0 ? ' btn--primary' : ''}`}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label} <span className="arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="case__lab" data-reveal style={{ '--delay': '0.1s' } as React.CSSProperties}>
            {children}
          </div>
        </div>

        <ol className="case__highlights">
          {p.highlights.map((h, i) => (
            <li key={h.title} data-reveal style={{ '--delay': `${i * 0.06}s` } as React.CSSProperties}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h4>{h.title}</h4>
              <p>{h.body}</p>
            </li>
          ))}
        </ol>

        {p.shots.length > 0 && <Gallery shots={p.shots} title={p.name} />}
      </div>
    </article>
  );
}

/** Numeral romano usado no número grande de cada projeto. */
function toRoman(n: number): string {
  const table: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let out = '';
  for (const [value, glyph] of table) {
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  }
  return out;
}
