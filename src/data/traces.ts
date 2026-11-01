import type { Layer } from './profile';

export interface Span {
  layer: Layer;
  label: string;
  /** início e fim em ms dentro da requisição */
  start: number;
  end: number;
}

export interface Trace {
  project: string;
  method: string;
  route: string;
  status: string;
  tone: 'ok' | 'info';
  total: number;
  spans: Span[];
}

/** Ordem das linhas no waterfall: do clique ao dado, como spans aninhados. */
export const traceRows: { layer: Layer; label: string }[] = [
  { layer: 'interface', label: 'interface' },
  { layer: 'infra', label: 'infra' },
  { layer: 'api', label: 'api' },
  { layer: 'dados', label: 'dados' },
];

export const traces: Trace[] = [
  {
    project: 'Lari Novais Beauty',
    method: 'POST',
    route: '/api/appointments',
    status: '201 Created',
    tone: 'ok',
    total: 180,
    spans: [
      { layer: 'interface', label: 'React envia multipart com fotos', start: 0, end: 180 },
      { layer: 'infra', label: 'Caddy · HTTPS → contêiner', start: 8, end: 172 },
      { layer: 'api', label: '.NET · rate limit, taxa pelo CEP', start: 16, end: 160 },
      { layer: 'dados', label: 'INSERT · exclusion constraint ok', start: 96, end: 138 },
    ],
  },
  {
    project: 'Lessionato',
    method: 'GET',
    route: '/api/transactions/status/:txid',
    status: '200 · completed',
    tone: 'ok',
    total: 90,
    spans: [
      { layer: 'interface', label: 'React consulta até o PIX cair', start: 0, end: 90 },
      { layer: 'infra', label: 'Nginx → Node (PM2)', start: 5, end: 84 },
      { layer: 'api', label: 'Express · checkToken (JWT)', start: 12, end: 74 },
      { layer: 'dados', label: 'MongoDB · Transaction paga', start: 34, end: 62 },
    ],
  },
  {
    project: 'Bot de suporte ERP',
    method: 'CMD',
    route: '!buscar  [print anexado]',
    status: '5 casos parecidos',
    tone: 'info',
    total: 1400,
    spans: [
      { layer: 'interface', label: 'Discord · print colado no canal', start: 0, end: 1400 },
      { layer: 'api', label: 'Python · OCR fora do loop do bot', start: 60, end: 1180 },
      { layer: 'dados', label: 'SQLite · 13,5 mil prints, busca fuzzy', start: 1180, end: 1340 },
    ],
  },
  {
    project: 'MHBA',
    method: 'GET',
    route: '/',
    status: '200 · Lighthouse 100',
    tone: 'ok',
    total: 60,
    spans: [
      { layer: 'interface', label: 'TypeScript puro, sem framework', start: 0, end: 60 },
      { layer: 'infra', label: 'CDN · CSP em _headers', start: 4, end: 26 },
    ],
  },
];
