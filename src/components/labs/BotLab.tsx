import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LabFrame } from './LabFrame';

interface Scenario {
  command: string;
  attachment?: string;
  reply: ReactNode;
}

const scenarios: Scenario[] = [
  {
    command: '!buscar rejeição 539',
    reply: (
      <>
        <p className="bot__title">🔎 3 casos parecidos com “rejeição 539”</p>
        <ol className="bot__results">
          <li>
            <span className="bot__score">94%</span> Rejeição 539: Duplicidade de NF-e com diferença na chave de acesso
            <span className="bot__meta">12/08 · #suporte-fiscal · ver conversa</span>
            <span className="bot__solution">✅ Solução: consultar o protocolo da nota na Sefaz e…</span>
          </li>
          <li>
            <span className="bot__score">81%</span> Duplicidade de NF-e ao reenviar lote
            <span className="bot__meta">03/06 · #suporte-n1 · ver conversa</span>
            <span className="bot__solution">✅ Solução registrada</span>
          </li>
          <li>
            <span className="bot__score">67%</span> Rejeição 539 após troca de série
            <span className="bot__meta">21/03 · #implantacao · sem solução ainda</span>
          </li>
        </ol>
      </>
    ),
  },
  {
    command: '!buscar',
    attachment: 'print-erro.png',
    reply: (
      <>
        <p className="bot__title">🖼️ Li o print com OCR</p>
        <p className="bot__ocr">“Ocorreu um Erro no Sistema · Violação de chave estrangeira ao gravar o pedido”</p>
        <p className="bot__line">
          Usei só as frases do erro. <strong>5 casos parecidos</strong>, o mais próximo com solução registrada há 4 dias.
        </p>
      </>
    ),
  },
  {
    command: '!relatoriov8 ipi + icms',
    reply: (
      <>
        <p className="bot__title">📄 Telas com IPI e ICMS (os dois)</p>
        <ul className="bot__results bot__results--plain">
          <li>
            Fiscal › Livros › <strong>Registro de Saídas</strong> <span className="bot__code">V020_11</span>
          </li>
          <li>
            Fiscal › Apuração › <strong>Resumo por CFOP</strong> <span className="bot__code">V031_02</span>
          </li>
          <li>
            Exportações › <strong>Itens das notas (Excel)</strong> <span className="bot__code">X008_04</span>
          </li>
        </ul>
        <div className="bot__buttons">
          <span>📎 Baixar um dos arquivos</span>
          <span>📍 Ver onde fica no menu</span>
        </div>
      </>
    ),
  },
  {
    command: '!relatoriov8 paciete',
    reply: (
      <>
        <p className="bot__title">🤔 Nada com “paciete”.</p>
        <p className="bot__line">
          Você quis dizer <strong>paciente</strong>? Encontrei 14 telas com esse campo.
        </p>
      </>
    ),
  },
];

type Phase = 'idle' | 'typing' | 'thinking' | 'done';

export function BotLab() {
  const [current, setCurrent] = useState<number | null>(null);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const reduced = useReducedMotion();
  const timers = useRef<number[]>([]);
  const scenario = current === null ? null : scenarios[current];

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  function run(i: number) {
    const s = scenarios[i];
    if (!s) return;
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setCurrent(i);

    if (reduced) {
      setTyped(s.command);
      setPhase('done');
      return;
    }

    setTyped('');
    setPhase('typing');
    const speed = 38;
    for (let c = 1; c <= s.command.length; c++) {
      timers.current.push(window.setTimeout(() => setTyped(s.command.slice(0, c)), c * speed));
    }
    const typedAt = s.command.length * speed + 200;
    timers.current.push(window.setTimeout(() => setPhase('thinking'), typedAt));
    timers.current.push(window.setTimeout(() => setPhase('done'), typedAt + (s.attachment ? 1400 : 800)));
  }

  return (
    <LabFrame name="converse com o bot" note="demonstração com dados fictícios · no Discord real a base tem 13,5 mil prints">
      <div className="bot">
        <div className="bot__channel mono"># suporte-erros</div>

        <div className="bot__feed">
          {!scenario && <p className="bot__empty">Escolha um comando abaixo para ver o bot responder.</p>}

          {scenario && (
            <div className="bot__msg">
              <span className="bot__avatar bot__avatar--user" aria-hidden="true">
                AN
              </span>
              <div>
                <span className="bot__author">analista.n1</span>
                <p className="bot__text mono">
                  {typed}
                  {phase === 'typing' && <span className="bot__caret" />}
                </p>
                {scenario.attachment && phase !== 'typing' && (
                  <div className="bot__attach mono">
                    <span className="bot__attach-thumb" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                    {scenario.attachment}
                  </div>
                )}
              </div>
            </div>
          )}

          {scenario && phase === 'thinking' && (
            <div className="bot__msg">
              <span className="bot__avatar bot__avatar--bot" aria-hidden="true">
                ⚙
              </span>
              <div>
                <span className="bot__author">
                  suporte-bot <span className="bot__badge">APP</span>
                </span>
                <p className="bot__thinking">
                  {scenario.attachment ? 'lendo o print com OCR' : 'procurando'}
                  <span className="bot__dots">
                    <i />
                    <i />
                    <i />
                  </span>
                </p>
              </div>
            </div>
          )}

          {scenario && phase === 'done' && (
            <div className="bot__msg bot__msg--in">
              <span className="bot__avatar bot__avatar--bot" aria-hidden="true">
                ⚙
              </span>
              <div>
                <span className="bot__author">
                  suporte-bot <span className="bot__badge">APP</span>
                </span>
                <div className="bot__embed">{scenario.reply}</div>
              </div>
            </div>
          )}
        </div>

        <div className="bot__commands" aria-label="Comandos de exemplo">
          {scenarios.map((s, i) => (
            <button
              key={s.command + (s.attachment ?? '')}
              type="button"
              className={`bot__cmd mono${current === i ? ' is-active' : ''}`}
              onClick={() => run(i)}
            >
              {s.command}
              {s.attachment && ' + 🖼️'}
            </button>
          ))}
        </div>
      </div>
    </LabFrame>
  );
}
