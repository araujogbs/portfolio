import { profile } from '../data/profile';
import { scrollToId } from '../lib/scroll';
import { RequestTrace } from './RequestTrace';
import { Vista } from './Vista';
import './Hero.css';

interface Props {
  onOpenPalette: () => void;
}

export function Hero({ onOpenPalette }: Props) {
  return (
    <section className="hero" id="topo">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__status mono">
            <span className="hero__pulse" aria-hidden="true" />
            {profile.status}
          </p>

          <h1 className="hero__title">
            <span className="hero__name">
              {profile.name} <span className="hero__role">· {profile.role}</span>
            </span>
            <span className="hero__line">
              <span className="hero__word" style={{ '--i': 0 } as React.CSSProperties}>
                Oi,
              </span>{' '}
              <span className="hero__word" style={{ '--i': 1 } as React.CSSProperties}>
                eu sou
              </span>
            </span>
            <span className="hero__line">
              <span className="hero__word" style={{ '--i': 2 } as React.CSSProperties}>
                o
              </span>{' '}
              <span className="hero__word hero__word--accent" style={{ '--i': 3 } as React.CSSProperties}>
                Gabriel.
              </span>
            </span>
          </h1>

          <p className="hero__lead">
            Sou desenvolvedor full stack em São Paulo e gosto de pegar um projeto do zero e levar até o ar: tela, API, banco
            e servidor. Trabalho com <strong>TypeScript, React, Node.js e .NET</strong>. Hoje estou no suporte N2 de um
            ERP, e ver todo dia o que dá errado em produção mudou bastante o jeito que eu programo.
          </p>

          <div className="hero__actions">
            <a
              className="btn btn--primary"
              href="#projetos"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('projetos');
              }}
            >
              Ver projetos <span className="arrow">↓</span>
            </a>
            <a className="btn" href={profile.cv} download="Gabriel-Araujo-CV.pdf">
              Baixar CV <span className="arrow">↓</span>
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span className="arrow">↗</span>
            </a>
          </div>

          <button type="button" className="hero__hint mono" onClick={onOpenPalette}>
            aperte <kbd>/</kbd> pra abrir o menu
          </button>
        </div>

        <div className="hero__visual">
          <Vista className="hero__vista" />
          <RequestTrace />
        </div>
      </div>
    </section>
  );
}
