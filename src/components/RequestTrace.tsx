import { useEffect, useState, type CSSProperties } from 'react';
import { traceRows, traces } from '../data/traces';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './RequestTrace.css';

const PLAY_MS = 2600;
const HOLD_MS = 2400;

export function RequestTrace() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const trace = traces[index] ?? traces[0]!;

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % traces.length), PLAY_MS + HOLD_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced]);

  return (
    <figure
      className="trace"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Simulação do caminho de uma requisição em cada projeto"
    >
      <div className="trace__bar">
        <span className="trace__title mono">trace</span>
        <div className="trace__tabs" role="tablist" aria-label="Projeto">
          {traces.map((t, i) => (
            <button
              key={t.project}
              role="tab"
              type="button"
              aria-selected={i === index}
              className={i === index ? 'is-active' : ''}
              onClick={() => {
                setIndex(i);
                setPaused(true);
              }}
              title={t.project}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {/* a key reinicia as animações de CSS a cada troca de cenário */}
      <div className="trace__body" key={index} style={{ '--play': `${PLAY_MS}ms` } as CSSProperties}>
        <div className="trace__req mono">
          <span className={`trace__method trace__method--${trace.method.toLowerCase()}`}>{trace.method}</span>
          <span className="trace__route">{trace.route}</span>
          <span className="trace__project">{trace.project}</span>
        </div>

        <div className="trace__grid">
          <div className="trace__playhead" aria-hidden="true" />
          {traceRows.map((row) => {
            const span = trace.spans.find((s) => s.layer === row.layer);
            const style = span
              ? ({
                  '--s': `${(span.start / trace.total) * 100}%`,
                  '--w': `${((span.end - span.start) / trace.total) * 100}%`,
                  '--delay': `${(span.start / trace.total) * PLAY_MS}ms`,
                } as CSSProperties)
              : undefined;
            return (
              <div key={row.layer} className={`trace__row${span ? '' : ' is-idle'}`} style={style}>
                <span className="trace__layer mono">{row.label}</span>
                <div className="trace__track">
                  {span ? (
                    <>
                      <span className={`trace__span trace__span--${row.layer}`} />
                      <span className="trace__label mono">{span.label}</span>
                    </>
                  ) : (
                    <span className="trace__label trace__label--idle mono">— não participa</span>
                  )}
                </div>
                <span className="trace__ms mono">{span ? `${span.end - span.start}ms` : ''}</span>
              </div>
            );
          })}
        </div>

        <div className={`trace__status trace__status--${trace.tone} mono`}>
          <span className="trace__dot" />
          <span>← {trace.status}</span>
          <span className="trace__total">{trace.total} ms</span>
        </div>
      </div>

      <figcaption className="trace__caption mono">simulação ilustrativa · passe o mouse para pausar</figcaption>
    </figure>
  );
}
