import { useId } from 'react';
import './Vista.css';

/**
 * Paisagem enevoada com ponte de pedra antiga e um feixe de luz subindo de uma
 * figura pequena. Desenho original, sem imagem externa.
 */
export function Vista({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const sky = `${id}-sky`;
  const sun = `${id}-sun`;
  const fog = `${id}-fog`;
  const beam = `${id}-beam`;

  return (
    <div className={`vista ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3f1ea" />
            <stop offset="0.55" stopColor="#d9dbd6" />
            <stop offset="1" stopColor="#b9bab2" />
          </linearGradient>
          <radialGradient id={sun} cx="0.74" cy="0.2" r="0.45">
            <stop offset="0" stopColor="#fffdf6" stopOpacity="1" />
            <stop offset="0.35" stopColor="#fbf6e6" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fbf6e6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={fog} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9e8e2" stopOpacity="0" />
            <stop offset="1" stopColor="#e9e8e2" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={beam} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="0.6" stopColor="#dff6ff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#dff6ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="400" height="260" fill={`url(#${sky})`} />
        <rect width="400" height="260" fill={`url(#${sun})`} />

        {/* cordilheiras ao fundo, cada vez mais perto e mais escuras */}
        <path d="M0 150 L40 118 L72 132 L118 96 L160 128 L196 104 L240 136 L286 92 L330 124 L370 108 L400 120 V260 H0Z" fill="#c4c5bf" />
        <rect y="110" width="400" height="60" fill={`url(#${fog})`} />
        <path d="M0 176 L56 146 L98 164 L150 138 L206 166 L262 142 L316 170 L360 150 L400 162 V260 H0Z" fill="#a9aaa3" />
        <rect y="140" width="400" height="56" fill={`url(#${fog})`} />

        {/* ponte de pedra com arcos */}
        <g fill="#8b8a83">
          <rect x="0" y="178" width="400" height="9" />
          <path d={bridgeArches()} />
        </g>

        {/* figura e o feixe de luz */}
        <g className="vista__beam">
          <rect x="222" y="0" width="12" height="176" fill={`url(#${beam})`} opacity="0.6" />
          <rect x="227.3" y="20" width="1.4" height="156" fill={`url(#${beam})`} />
        </g>
        <path d="M226.6 178 v-6.2 a1.5 1.5 0 0 1 1.4 -1.6 a1.5 1.5 0 0 1 1.4 1.6 v6.2 Z M227.6 170.4 l0.4 -6" fill="#4a4943" stroke="#4a4943" strokeWidth="0.6" />

        {/* névoa que corre por cima de tudo */}
        <g className="vista__fog">
          <ellipse cx="80" cy="214" rx="140" ry="22" fill="#f1f0ea" opacity="0.75" />
          <ellipse cx="320" cy="226" rx="160" ry="26" fill="#f1f0ea" opacity="0.7" />
          <ellipse cx="520" cy="212" rx="140" ry="20" fill="#f1f0ea" opacity="0.7" />
        </g>
        <rect y="200" width="400" height="60" fill={`url(#${fog})`} />

        {/* pássaros */}
        <g fill="none" stroke="#6f6e67" strokeWidth="0.9" strokeLinecap="round">
          <path d="M92 64 q3 -3 6 0 q3 -3 6 0" />
          <path d="M112 54 q2 -2 4 0 q2 -2 4 0" />
          <path d="M80 50 q2 -2 4 0 q2 -2 4 0" />
        </g>
      </svg>
    </div>
  );
}

/** Pilares e arcos da ponte embaixo do tabuleiro. */
function bridgeArches(): string {
  const span = 50;
  const parts: string[] = [];
  for (let x = -10; x < 410; x += span) {
    parts.push(`M${x} 187 h8 v73 h-8 Z`);
    parts.push(`M${x + 8} 187 h${span - 8} v6 a${(span - 8) / 2} 22 0 0 0 -${span - 8} 0 Z`);
  }
  return parts.join(' ');
}
