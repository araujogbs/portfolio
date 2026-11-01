import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LabFrame } from './LabFrame';

const actors = ['Aluno', 'React', 'API Node', 'MongoDB', 'PIX (EFI)'] as const;

interface Step {
  from: number;
  to: number;
  label: string;
  reply?: boolean;
  tag?: string;
}

const steps: Step[] = [
  { from: 0, to: 1, label: 'Compra o curso' },
  { from: 1, to: 2, label: 'POST /api/cursos/:id/pix', tag: 'JWT' },
  { from: 2, to: 4, label: 'Cria a cobrança', tag: 'OAuth + mTLS' },
  { from: 4, to: 2, label: 'txid + QR Code', reply: true },
  { from: 2, to: 3, label: 'Transaction pendente' },
  { from: 2, to: 1, label: 'QR Code e copia e cola', reply: true },
  { from: 0, to: 4, label: 'Paga no app do banco' },
  { from: 4, to: 2, label: 'POST /webhook/pix/pix', tag: 'liquidação' },
  { from: 2, to: 3, label: 'Paga + curso liberado' },
  { from: 1, to: 2, label: 'GET /status/:txid → completed', tag: 'polling' },
];

const col = (i: number) => ((i + 0.5) / actors.length) * 100;

export function PixLab() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setStep((s) => s + 1), reduced ? 0 : 850);
    return () => window.clearTimeout(id);
  }, [playing, step, reduced]);

  const screen = step >= steps.length ? 'liberado' : step >= 6 ? 'aguardando' : step >= 1 ? 'gerando' : 'inicio';

  return (
    <LabFrame
      name="o caminho de um PIX"
      note="fluxo real da plataforma, passo a passo · valores ilustrativos"
      actions={
        <span className="pix__controls">
          <button
            type="button"
            className="lab__reset mono"
            onClick={() => {
              setStep(0);
              setPlaying(false);
            }}
          >
            reiniciar
          </button>
        </span>
      }
    >
      <div className="pix">
        <div className="pix__scroller">
          <div className="pix__diagram">
            <div className="pix__actors">
              {actors.map((a, i) => (
                <span key={a} className="mono" style={{ left: `${col(i)}%` }}>
                  {a}
                </span>
              ))}
            </div>
            <div className="pix__lanes" aria-hidden="true">
              {actors.map((a, i) => (
                <span key={a} style={{ left: `${col(i)}%` }} />
              ))}
            </div>
            <ol className="pix__steps">
              {steps.map((s, i) => {
                const left = Math.min(col(s.from), col(s.to));
                const width = Math.abs(col(s.to) - col(s.from));
                const dir = s.to > s.from ? 'right' : 'left';
                const state = i < step ? 'is-done' : 'is-todo';
                return (
                  <li key={i} className={`pix__step ${state}${i === step - 1 ? ' is-current' : ''}`}>
                    <span className="pix__num mono">{i + 1}</span>
                    <div
                      className={`pix__arrow pix__arrow--${dir}${s.reply ? ' is-reply' : ''}`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                    >
                      <span className="pix__label mono">
                        {s.label}
                        {s.tag && <em>{s.tag}</em>}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="pix__bottom">
          <div className={`pix__screen pix__screen--${screen}`} aria-live="polite">
            <span className="mono pix__screen-label">tela do aluno</span>
            {screen === 'inicio' && <p>Curso: Gestão da Qualidade · R$ 97,00</p>}
            {screen === 'gerando' && <p>Gerando cobrança PIX…</p>}
            {screen === 'aguardando' && (
              <p>
                <span className="pix__qr" aria-hidden="true" />
                Aguardando pagamento · conferindo a cada poucos segundos
              </p>
            )}
            {screen === 'liberado' && <p>✓ Pagamento confirmado. Acesso liberado, sem recarregar a página.</p>}
          </div>

          <div className="pix__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                if (step >= steps.length) setStep(0);
                setPlaying(true);
              }}
              disabled={playing}
            >
              {playing ? 'Rodando…' : step >= steps.length ? 'Ver de novo' : step === 0 ? 'Simular pagamento ▶' : 'Continuar ▶'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setPlaying(false);
                setStep((s) => Math.min(s + 1, steps.length));
              }}
              disabled={step >= steps.length}
            >
              Próximo passo
            </button>
          </div>
        </div>
      </div>
    </LabFrame>
  );
}
