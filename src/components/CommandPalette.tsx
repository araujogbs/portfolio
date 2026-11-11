import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { copyText } from '../lib/clipboard';
import { scrollToId } from '../lib/scroll';
import './CommandPalette.css';

interface Command {
  id: string;
  group: string;
  label: string;
  hint?: string;
  /** termos extras que entram na busca, sem aparecer na lista */
  keywords?: string;
  run: () => void | Promise<void>;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

function normalize(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => scrollToId(id);
    const open = (href: string) => () => void window.open(href, '_blank', 'noopener');
    return [
      { id: 'nav-projetos', group: 'Navegar', label: 'Projetos', hint: 'seção', run: go('projetos') },
      { id: 'nav-trajetoria', group: 'Navegar', label: 'Trajetória', hint: 'seção', run: go('trajetoria') },
      { id: 'nav-stack', group: 'Navegar', label: 'Stack', hint: 'seção', run: go('stack') },
      { id: 'nav-contato', group: 'Navegar', label: 'Contato', hint: 'seção', run: go('contato') },
      ...projects.map((p) => ({
        id: `p-${p.id}`,
        group: 'Projetos',
        label: p.name,
        hint: p.status.label.toLowerCase(),
        keywords: `${p.tagline} ${p.stack.join(' ')}`,
        run: go(`projeto-${p.id}`),
      })),
      {
        id: 'copy-email',
        group: 'Ações',
        label: 'Copiar e-mail',
        hint: profile.email,
        run: async () => {
          const ok = await copyText(profile.email);
          setToast(ok ? 'E-mail copiado' : profile.email);
        },
      },
      {
        id: 'cv',
        group: 'Ações',
        label: 'Baixar currículo (PDF)',
        hint: 'CV',
        keywords: 'curriculo resume pdf',
        run: () => {
          const a = document.createElement('a');
          a.href = profile.cv;
          a.download = 'Gabriel-Araujo-CV.pdf';
          a.click();
        },
      },
      { id: 'mail', group: 'Ações', label: 'Enviar e-mail', hint: 'abre o app de e-mail', run: () => void (location.href = `mailto:${profile.email}`) },
      { id: 'linkedin', group: 'Links', label: 'LinkedIn', hint: '↗', run: open(profile.linkedin) },
      { id: 'github', group: 'Links', label: 'GitHub', hint: '↗', run: open(profile.github) },
      { id: 'lari-live', group: 'Links', label: 'larinovaisbeauty.com.br', hint: 'em produção ↗', run: open('https://larinovaisbeauty.com.br') },
      { id: 'mhba-live', group: 'Links', label: 'makehouseblackagain.com.br', hint: 'no ar ↗', run: open('https://makehouseblackagain.com.br') },
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return commands;
    return commands.filter((c) => normalize(`${c.group} ${c.label} ${c.hint ?? ''} ${c.keywords ?? ''}`).includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const previous = document.activeElement as HTMLElement | null;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    document.documentElement.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.style.overflow = '';
      previous?.focus?.();
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  async function runCommand(cmd: Command) {
    await cmd.run();
    if (cmd.id !== 'copy-email') onClose();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) void runCommand(cmd);
    }
  }

  if (!open) return toast ? <div className="cmdk-toast">{toast}</div> : null;

  let lastGroup = '';

  return (
    <>
      <div className="cmdk-backdrop" onClick={onClose} />
      <div className="cmdk" role="dialog" aria-modal="true" aria-label="Menu de comandos" onKeyDown={onKeyDown}>
        <div className="cmdk__search">
          <span className="cmdk__prompt" aria-hidden="true">
            ❯
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Para onde vamos? Tente “pix”, “bot” ou “email”"
            aria-label="Buscar comando"
            aria-controls="cmdk-list"
            aria-activedescendant={filtered[active] ? `cmdk-${filtered[active].id}` : undefined}
            role="combobox"
            aria-expanded="true"
          />
          <kbd>esc</kbd>
        </div>

        <ul className="cmdk__list" id="cmdk-list" role="listbox" ref={listRef}>
          {filtered.length === 0 && <li className="cmdk__empty">Nada encontrado para “{query}”.</li>}
          {filtered.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null;
            lastGroup = cmd.group;
            return (
              <li key={cmd.id} role="presentation">
                {header && <div className="cmdk__group">{header}</div>}
                <div
                  id={`cmdk-${cmd.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  className={`cmdk__item${i === active ? ' is-active' : ''}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => void runCommand(cmd)}
                >
                  <span>{cmd.label}</span>
                  {cmd.hint && <span className="cmdk__hint">{cmd.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="cmdk__foot mono">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navegar
          </span>
          <span>
            <kbd>enter</kbd> abrir
          </span>
          <span className="cmdk__tip">
            atalho: <kbd>/</kbd>
          </span>
        </div>
      </div>
      {toast && <div className="cmdk-toast">{toast}</div>}
    </>
  );
}
