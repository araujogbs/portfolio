import { useEffect, useRef, useState } from 'react';
import type { Shot } from '../data/projects';

/** Telas bem mais altas que largas aparecem cortadas no topo na faixa. */
function isTall(ratio: string): boolean {
  const [w, h] = ratio.split('/').map(Number);
  return !!w && !!h && h / w > 1.2;
}

interface Props {
  shots: Shot[];
  title: string;
}

export function Gallery({ shots, title }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = open === null ? null : shots[open];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current && !dialog.open) dialog.showModal();
    if (!current && dialog.open) dialog.close();
  }, [current]);

  function step(delta: number) {
    setOpen((i) => (i === null ? i : (i + delta + shots.length) % shots.length));
  }

  return (
    <>
      <ul className="gallery" aria-label={`Telas de ${title}`} data-reveal>
        {shots.map((s, i) => (
          <li key={s.src} className="gallery__item">
            <button type="button" onClick={() => setOpen(i)} aria-label={`Ampliar: ${s.alt}`}>
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className={isTall(s.ratio) ? 'is-tall' : undefined}
                style={{ aspectRatio: s.ratio }}
              />
              <span className="gallery__zoom mono">ampliar ↗</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
      >
        {current && (
          <div className="lightbox__inner">
            <div className="lightbox__bar mono">
              <span>
                {title} · {(open ?? 0) + 1}/{shots.length}
              </span>
              <span className="lightbox__actions">
                <button type="button" onClick={() => step(-1)} aria-label="Anterior">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Próxima">
                  →
                </button>
                <button type="button" onClick={() => setOpen(null)} aria-label="Fechar">
                  ✕
                </button>
              </span>
            </div>
            <div className="lightbox__scroll">
              <img src={current.src} alt={current.alt} />
            </div>
            <p className="lightbox__caption">{current.alt}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
