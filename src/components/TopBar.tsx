import { useEffect, useRef, useState } from 'react';
import { scrollToId } from '../lib/scroll';
import './TopBar.css';

const links = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'stack', label: 'Stack' },
  { id: 'contato', label: 'Contato' },
];

interface Props {
  onOpenPalette: () => void;
}

export function TopBar({ onOpenPalette }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      barRef.current?.style.setProperty('--progress', progress.toFixed(4));
      setScrolled(window.scrollY > 24);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap topbar__inner">
        <a
          className="topbar__logo"
          href="#topo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="topbar__prompt">~/</span>gabriel-araujo
          <span className="topbar__caret" aria-hidden="true" />
        </a>

        <nav className="topbar__nav" aria-label="Seções">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.id);
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button className="topbar__cmd" type="button" onClick={onOpenPalette} aria-label="Abrir menu de comandos">
          <span className="topbar__cmd-label">Ir para…</span>
          <span className="topbar__cmd-keys" aria-hidden="true">
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd>K</kbd>
          </span>
          <svg className="topbar__cmd-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      </div>
      <div className="topbar__progress" ref={barRef} aria-hidden="true" />
    </header>
  );
}
