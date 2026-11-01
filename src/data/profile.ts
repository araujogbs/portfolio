export const profile = {
  name: 'Gabriel Araújo',
  role: 'Desenvolvedor Full Stack',
  location: 'São Paulo, SP',
  status: 'No ar agora: larinovaisbeauty.com.br',
  email: 'Gabriel.AraujoC@outlook.com',
  github: 'https://github.com/araujogbs',
  linkedin: 'https://www.linkedin.com/in/gabriel-araujoc/',
  cv: '/cv/Gabriel-Araujo-CV.pdf',
} as const;

export type Layer = 'interface' | 'api' | 'dados' | 'infra';

export interface LayerInfo {
  id: Layer;
  label: string;
  hint: string;
  stack: string[];
}

/** As camadas que uma requisição atravessa; usadas no hero e na seção de stack. */
export const layers: LayerInfo[] = [
  {
    id: 'interface',
    label: 'Interface',
    hint: 'telas e app',
    stack: ['React 19', 'React Native', 'Expo', 'TypeScript strict', 'Vite', 'PWA + Web Push', 'Vitest', 'CSS'],
  },
  {
    id: 'api',
    label: 'API',
    hint: 'regras de negócio',
    stack: ['ASP.NET Core (.NET 10)', 'EF Core', 'Node.js', 'Express', 'Python', 'JWT', 'Webhooks', 'REST'],
  },
  {
    id: 'dados',
    label: 'Dados',
    hint: 'banco de dados',
    stack: ['PostgreSQL', 'SQL', 'MongoDB', 'SQLite', 'MySQL', 'Mongoose'],
  },
  {
    id: 'infra',
    label: 'Infra',
    hint: 'servidor e deploy',
    stack: ['Linux / VPS', 'Docker Compose', 'Caddy', 'Nginx', 'PM2', "Let's Encrypt", 'Cloudflare', 'Git'],
  },
];

export interface Job {
  period: string;
  role: string;
  org: string;
  mode: string;
  current?: boolean;
  points: string[];
}

export const jobs: Job[] = [
  {
    period: 'dez 2025 — agora',
    role: 'Analista de Suporte Nível 2',
    org: 'Joinner Sistemas',
    mode: 'Tempo integral · híbrido',
    current: true,
    points: [
      'Sou a referência técnica dos analistas N1 e quem leva os problemas para o time de desenvolvimento.',
      'Investigo a causa dos incidentes em produção: leio log, reproduzo o erro e uso SQL no PostgreSQL pra auditar e corrigir dados.',
      'Fiz o bot de suporte com OCR (Python, Tesseract, SQLite, RapidFuzz) que hoje a equipe inteira usa.',
      'Documento bugs e customizações pro time de desenvolvimento, com cenário, evidência e passo a passo pra reproduzir.',
    ],
  },
  {
    period: 'fev 2024 — dez 2025',
    role: 'Analista de Implantação',
    org: 'Joinner Sistemas',
    mode: 'Tempo integral',
    points: ['Instalava e configurava o ERP nos clientes, quase sempre por acesso remoto, e dava suporte nos servidores.'],
  },
  {
    period: 'mar 2024 — jun 2024',
    role: 'Desenvolvedor Full Stack',
    org: 'Gemba Serviços & Consultoria',
    mode: 'Freelance · remoto',
    points: [
      'Fiz a plataforma Lessionato inteira: React + TypeScript, Node/Express, MongoDB, pagamento PIX com webhook e certificado em PDF.',
      'Subi e mantive tudo numa VPS Linux com Nginx, PM2 e HTTPS.',
    ],
  },
  {
    period: 'mar 2022 — mai 2023',
    role: 'Gestão de sistema e e-commerce',
    org: 'Rei da Pesca',
    mode: 'Tempo integral · presencial',
    points: ['Cuidava do sistema de gestão e da loja virtual.'],
  },
];

export const education = {
  course: 'Análise e Desenvolvimento de Sistemas (CST)',
  school: 'UNIP',
  period: '2019 — 2021',
  extra: 'Rocketseat · trilhas Fundamentar e Especializar',
};
