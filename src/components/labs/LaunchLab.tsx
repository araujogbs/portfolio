import { useEffect, useRef, useState } from 'react';
import { useNow } from '../../hooks/useNow';
import { LabFrame } from './LabFrame';

const EVENT_START = new Date('2026-11-22T00:00:00-03:00');
const EVENT_END = new Date('2026-11-23T06:00:00-03:00');

const scores = {
  celular: [
    { label: 'Performance', value: 99 },
    { label: 'Acessibilidade', value: 100 },
    { label: 'Boas práticas', value: 100 },
    { label: 'SEO', value: 100 },
  ],
  desktop: [
    { label: 'Performance', value: 100 },
    { label: 'Acessibilidade', value: 100 },
    { label: 'Boas práticas', value: 100 },
    { label: 'SEO', value: 100 },
  ],
};

type Device = keyof typeof scores;

function Ring({ value, label, run }: { value: number; label: string; run: boolean }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="ring">
      <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
        <circle cx="32" cy="32" r={r} className="ring__bg" />
        <circle
          cx="32"
          cy="32"
          r={r}
          className="ring__fg"
          strokeDasharray={c}
          strokeDashoffset={run ? c * (1 - value / 100) : c}
        />
      </svg>
      <span className="ring__value">{value}</span>
      <span className="ring__label mono">{label}</span>
    </div>
  );
}

export function LaunchLab() {
  const now = useNow(1000);
  const [device, setDevice] = useState<Device>('celular');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry?.isIntersecting && setVisible(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const diff = Math.max(0, EVENT_START.getTime() - now.getTime());
  const parts = [
    { value: Math.floor(diff / 86_400_000), label: 'dias' },
    { value: Math.floor(diff / 3_600_000) % 24, label: 'horas' },
    { value: Math.floor(diff / 60_000) % 60, label: 'min' },
    { value: Math.floor(diff / 1000) % 60, label: 'seg' },
  ];
  const phase = now < EVENT_START ? 'antes' : now < EVENT_END ? 'agora' : 'depois';

  return (
    <LabFrame name="contagem e números do site" note="contagem ao vivo, no fuso de Brasília · notas do Lighthouse no build de produção">
      <div className="launch" ref={ref}>
        <div className="launch__count">
          <span className="mono launch__kicker">
            {phase === 'antes' && 'até o primeiro kick · 22.11.2026'}
            {phase === 'agora' && 'acontecendo agora'}
            {phase === 'depois' && 'obrigado, pista'}
          </span>
          {phase === 'antes' ? (
            <div className="launch__digits" role="timer" aria-label="Tempo até o evento">
              {parts.map((p) => (
                <div key={p.label}>
                  <strong>{String(p.value).padStart(2, '0')}</strong>
                  <span className="mono">{p.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="launch__done">{phase === 'agora' ? 'A pista está aberta.' : 'A 1ª edição aconteceu.'}</p>
          )}
        </div>

        <div className="launch__lh">
          <div className="launch__lh-head">
            <span className="mono">Lighthouse</span>
            <div className="launch__toggle" role="tablist" aria-label="Dispositivo">
              {(Object.keys(scores) as Device[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  role="tab"
                  aria-selected={device === d}
                  className={device === d ? 'is-active' : ''}
                  onClick={() => setDevice(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="launch__rings">
            {scores[device].map((s) => (
              <Ring key={s.label} {...s} run={visible} />
            ))}
          </div>
        </div>

        <div className="launch__weight">
          <span className="mono">mídia de fundo</span>
          <div className="launch__bar">
            <span className="launch__bar-before mono">GIFs · 6 MB</span>
          </div>
          <div className="launch__bar">
            <span className={`launch__bar-after mono${visible ? ' is-run' : ''}`}>MP4 · 470 KB</span>
          </div>
        </div>
      </div>
    </LabFrame>
  );
}
