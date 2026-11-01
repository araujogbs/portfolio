import { layers } from '../data/profile';
import { projects } from '../data/projects';
import './Stack.css';

export function Stack() {
  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Stack</span>
          <h2 className="section-title" id="stack-title">
            O que eu <em>uso no dia a dia.</em>
          </h2>
          <p className="lead">
            Separei pela parte do sistema onde cada coisa entra. Tudo aqui eu usei em pelo menos um dos projetos acima.
          </p>
        </div>

        <ol className="layers">
          {layers.map((layer, i) => {
            const used = projects.filter((p) => p.layers.includes(layer.id));
            return (
              <li key={layer.id} className="layer" data-reveal style={{ '--delay': `${i * 0.07}s` } as React.CSSProperties}>
                <div className="layer__head">
                  <span className="layer__depth mono">L{i + 1}</span>
                  <h3>{layer.label}</h3>
                  <span className="layer__hint">{layer.hint}</span>
                </div>
                <ul className="layer__stack">
                  {layer.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="layer__used mono">
                  {used.map((p) => (
                    <a key={p.id} href={`#projeto-${p.id}`}>
                      {p.index} {p.name.split(' ·')[0]}
                    </a>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
