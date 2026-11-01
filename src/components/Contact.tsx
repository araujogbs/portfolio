import { useState } from 'react';
import { profile } from '../data/profile';
import { useNow } from '../hooks/useNow';
import { copyText } from '../lib/clipboard';
import './Contact.css';

const spTime = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
});

export function Contact() {
  const [copied, setCopied] = useState(false);
  const now = useNow(30_000);

  async function copy() {
    if (await copyText(profile.email)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <section className="section contact" id="contato" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact__card" data-reveal>
          <img className="contact__avatar" src="/img/avatar.jpg" alt="Foto de Gabriel Araújo" width={88} height={88} />
          <span className="eyebrow">Contato</span>
          <h2 className="contact__title" id="contact-title">
            Tem um projeto em mente? <em>Me chama.</em>
          </h2>
          <p className="lead">
            Pode mandar um e-mail ou uma mensagem no LinkedIn. Costumo responder no mesmo dia.
          </p>

          <div className="contact__email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button type="button" className="contact__copy mono" onClick={() => void copy()}>
              {copied ? 'copiado ✓' : 'copiar'}
            </button>
          </div>

          <div className="contact__actions">
            <a className="btn btn--primary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              Falar no LinkedIn <span className="arrow">↗</span>
            </a>
            <a className="btn" href={profile.cv} download="Gabriel-Araujo-CV.pdf">
              Baixar CV <span className="arrow">↓</span>
            </a>
            <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
              Ver o GitHub <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="wrap footer mono">
        <span>
          © {now.getFullYear()} {profile.name}
        </span>
        <span>
          São Paulo · {spTime.format(now)} <span className="footer__dot" />
        </span>
        <span>tocando enquanto eu codava: Mac Miller · The Divine Feminine</span>
        <span>
          Feito com React 19 + TypeScript strict + Vite ·{' '}
          <a href={`${profile.github}`} target="_blank" rel="noopener noreferrer">
            código ↗
          </a>
        </span>
      </footer>
    </section>
  );
}
