import { asset } from '../lib/asset';
import type { Layer } from './profile';

export type ProjectId = 'lari' | 'bot' | 'lessionato' | 'mhba';

export interface Shot {
  src: string;
  alt: string;
  /** Proporção usada para reservar espaço e evitar pulo de layout. */
  ratio: string;
}

export interface Project {
  id: ProjectId;
  index: string;
  name: string;
  tagline: string;
  client: string;
  status: { label: string; tone: 'live' | 'used' | 'paused' };
  summary: string;
  problem: string;
  highlights: { title: string; body: string }[];
  metrics: { value: string; label: string }[];
  layers: Layer[];
  stack: string[];
  links: { label: string; href: string }[];
  shots: Shot[];
}

export const projects: Project[] = [
  {
    id: 'lari',
    index: '01',
    name: 'Lari Novais Beauty',
    tagline: 'Site e sistema de agendamento de uma maquiadora que atende em casa',
    client: 'Cliente · São Paulo',
    status: { label: 'No ar', tone: 'live' },
    summary:
      'A cliente escolhe o serviço de cada pessoa, o dia e o horário, e já vê quanto vai ficar o deslocamento pelo CEP. A Lari recebe uma notificação no iPhone, aprova pelo painel, manda o PIX do sinal no WhatsApp e o horário vai direto pro Google Agenda dela.',
    problem:
      'Tudo era combinado pelo WhatsApp. Às vezes dois horários batiam e a taxa de deslocamento era calculada na mão. Ela precisava de um sistema que não deixasse duas pessoas marcarem o mesmo horário, nem se clicassem ao mesmo tempo.',
    highlights: [
      {
        title: 'Dois pedidos no mesmo horário não passam',
        body: 'Além de checar no código, coloquei uma exclusion constraint no PostgreSQL (GiST + tstzrange). Se dois pedidos chegam juntos, o banco recusa o segundo e a API responde 409.',
      },
      {
        title: 'Cada pedido tem um status',
        body: 'Pendente, confirmado, recusado ou expirado. Um BackgroundService expira os pedidos que ficaram parados, e o UPDATE é condicional pra não dar conflito se a Lari aprovar no mesmo momento.',
      },
      {
        title: 'A taxa é calculada no servidor',
        body: 'CEP → endereço (BrasilAPI) → coordenadas (Nominatim) → distância de carro (OSRM). O valor que vem do navegador é ignorado. Já em produção, achei e corrigi um bug que dava a mesma distância pra todos os CEPs da cidade.',
      },
      {
        title: 'Notificação no iPhone sem app na loja',
        body: 'O painel é um PWA com Web Push. Tive que trocar de biblioteca porque a primeira mandava a notificação num formato que o iPhone não entregava.',
      },
    ],
    metrics: [
      { value: '2,5 MB → 438 KB', label: 'primeira tela no celular' },
      { value: '409', label: 'quando o horário já está ocupado' },
      { value: '0', label: 'senhas no repositório' },
    ],
    layers: ['interface', 'api', 'dados', 'infra'],
    stack: ['React 19', 'TypeScript strict', 'ASP.NET Core .NET 10', 'EF Core', 'PostgreSQL', 'Docker', 'Caddy', 'Cloudflare', 'Vitest', 'React Native (app v1)'],
    links: [
      { label: 'Ver o site', href: 'https://larinovaisbeauty.com.br' },
      { label: 'Código do site', href: 'https://github.com/araujogbs/lari-novais-beauty-site' },
      { label: 'Código da API', href: 'https://github.com/araujogbs/lari-novais-beauty-agendamento' },
    ],
    shots: [
      { src: asset('img/lari-home.jpg'), alt: 'Página inicial do site da Lari Novais Beauty', ratio: '1440 / 860' },
      { src: asset('img/lari-agendamento.png'), alt: 'Agendamento online com calendário de dias livres e resumo', ratio: '760 / 2535' },
      { src: asset('img/lari-painel.png'), alt: 'Painel da maquiadora com pedidos em análise (dados fictícios)', ratio: '1280 / 1943' },
      { src: asset('img/lari-celular.jpg'), alt: 'Site no celular', ratio: '780 / 1688' },
    ],
  },
  {
    id: 'mhba',
    index: '02',
    name: 'MHBA · Make House Black Again',
    tagline: 'Site de um evento de house music que celebra as raízes negras do gênero',
    client: 'Evento · São Paulo, 22.11.2026',
    status: { label: 'No ar', tone: 'live' },
    summary:
      'Tem contagem regressiva até o evento, um mural de lambe-lambe com seis animações de colagem, um manifesto que vai acendendo palavra por palavra conforme você rola e a inscrição do Warmup Contest.',
    problem:
      'A ideia era um site com bastante personalidade e animação, mas que continuasse leve e acessível. Fiz tudo em TypeScript puro, sem framework.',
    highlights: [
      {
        title: 'Funciona com "reduzir movimento"',
        body: 'Se a pessoa ativa essa opção no sistema, o site continua completo e só troca as animações por imagens paradas.',
      },
      {
        title: 'Vídeo no lugar de GIF',
        body: 'Troquei os GIFs de fundo por MP4 (de 6 MB pra 470 KB), e eles só tocam quando aparecem na tela.',
      },
      {
        title: 'O layout não pula',
        body: 'As fontes ficam hospedadas no próprio site com preload, e todas as imagens têm o tamanho declarado.',
      },
      {
        title: 'SEO e compartilhamento',
        body: 'Dados estruturados de evento (schema.org), Open Graph, sitemap e CSP nos cabeçalhos.',
      },
    ],
    metrics: [
      { value: '6 MB → 470 KB', label: 'vídeos de fundo' },
      { value: '100', label: 'acessibilidade, boas práticas e SEO' },
      { value: '0', label: 'frameworks' },
    ],
    layers: ['interface', 'infra'],
    stack: ['TypeScript', 'Vite', 'HTML', 'CSS', 'Netlify'],
    links: [
      { label: 'Ver o site', href: 'https://makehouseblackagain.com.br' },
      { label: 'Código no GitHub', href: 'https://github.com/araujogbs/make-house-black-again' },
    ],
    shots: [
      { src: asset('img/mhba-hero.jpg'), alt: 'Abertura do site com a contagem regressiva até o evento', ratio: '1546 / 784' },
      { src: asset('img/mhba-manifesto.jpg'), alt: 'Manifesto que acende com a rolagem', ratio: '1546 / 784' },
      { src: asset('img/mhba-cartazes.jpg'), alt: 'Mural de lambe-lambe interativo com seis cartazes', ratio: '1546 / 784' },
      { src: asset('img/mhba-pista.jpg'), alt: 'Galeria da pista com fotos que ganham cor', ratio: '1546 / 784' },
      { src: asset('img/mhba-contest.jpg'), alt: 'Inscrição do Warmup Contest', ratio: '1546 / 784' },
    ],
  },
  {
    id: 'bot',
    index: '03',
    name: 'Bot de suporte ERP',
    tagline: 'Bot no Discord que ajuda o time de suporte a achar soluções e relatórios do ERP',
    client: 'Projeto meu · usado na Joinner Sistemas',
    status: { label: 'Em uso pela equipe', tone: 'used' },
    summary:
      'Fiz em Python. Ele lê com OCR os prints de erro que o pessoal posta, guarda a solução junto com o erro e mostra em qual relatório do ERP está uma informação, com a tela marcada em vermelho no print do menu.',
    problem:
      'Os mesmos erros voltavam toda hora e a resposta ficava perdida no meio de milhares de mensagens. E pra descobrir em qual relatório estava um campo, alguém tinha que abrir tela por tela.',
    highlights: [
      {
        title: 'Dá pra buscar pelo print',
        body: 'Você cola o print do erro, o OCR pega só as frases que importam (ele reconhece a janela de erro e os códigos de rejeição da Sefaz) e o bot traz os 5 casos mais parecidos.',
      },
      {
        title: 'Quem resolve, registra',
        body: 'Quem achou a solução responde com !solucao ou reage com ✅. A partir daí ela aparece pra qualquer pessoa que buscar aquele erro.',
      },
      {
        title: 'Busca de relatórios',
        body: 'Aceita E/OU, plural e singular, filtro por formato e sugere a palavra certa quando você digita errado. Mostra o código do layout pra diferenciar relatórios com o mesmo nome.',
      },
      {
        title: 'O bot não trava',
        body: 'O OCR roda fora do loop de eventos, a indexação do histórico continua de onde parou e os dados de clientes e o token ficam fora do Git.',
      },
    ],
    metrics: [
      { value: '13.500+', label: 'prints indexados' },
      { value: '1.337', label: 'relatórios e exportações catalogados' },
      { value: '459', label: 'telas mapeadas no menu' },
    ],
    layers: ['api', 'dados'],
    stack: ['Python', 'discord.py', 'Tesseract OCR', 'SQLite', 'RapidFuzz'],
    links: [{ label: 'Código no GitHub', href: 'https://github.com/araujogbs/bot-suporte-ERP' }],
    shots: [],
  },
  {
    id: 'lessionato',
    index: '04',
    name: 'Lessionato',
    tagline: 'Plataforma de cursos com pagamento por PIX, prova e certificado',
    client: 'Gemba Consultoria · freelance',
    status: { label: 'Entregue · pausado pelo cliente', tone: 'paused' },
    summary:
      'O aluno compra o curso no PIX e o acesso libera sozinho quando o banco confirma o pagamento. No fim ele faz a prova e baixa um certificado em PDF com QR Code, que qualquer empresa consegue validar.',
    problem:
      'A consultoria queria vender cursos sem ter que conferir pagamento na mão, e precisava de um certificado que não desse pra falsificar. O código foi vendido junto com o produto, então no GitHub deixei só a documentação da arquitetura.',
    highlights: [
      {
        title: 'PIX direto com o banco',
        body: 'Integrei com a API da EFI usando o certificado .pfx (mTLS) e OAuth. Quando o pagamento cai, o webhook libera o curso certo.',
      },
      {
        title: 'Certificado gerado no servidor',
        body: 'Uso pdf-lib + fontkit pra preencher o modelo em memória, com um código de autenticidade aleatório e um QR Code pra validação.',
      },
      {
        title: 'As regras ficam na API',
        body: 'Cupom, liberação do curso e nota mínima são conferidos no servidor. O certificado só sai depois dos 7 dias de arrependimento do CDC.',
      },
      {
        title: 'Login',
        body: 'Token de 30 minutos com renovação de 7 dias, senha com bcrypt (custo 12) e recuperação de senha com um token que só funciona uma vez.',
      },
    ],
    metrics: [
      { value: 'mTLS', label: 'integração direta com o banco' },
      { value: '60%', label: 'nota mínima, conferida na API' },
      { value: '7 dias', label: 'prazo do CDC antes do certificado' },
    ],
    layers: ['interface', 'api', 'dados', 'infra'],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PIX (EFI)', 'pdf-lib', 'Nginx', 'PM2'],
    links: [{ label: 'Documentação no GitHub', href: 'https://github.com/araujogbs/lessionato-edtech-platform' }],
    shots: [
      { src: asset('img/lessionato-home.jpg'), alt: 'Página inicial da Lessionato', ratio: '1280 / 800' },
      { src: asset('img/lessionato-pagamento-pix.jpg'), alt: 'Tela de pagamento PIX com QR Code de exemplo', ratio: '1280 / 764' },
      { src: asset('img/lessionato-certificado-frente.jpg'), alt: 'Certificado em PDF gerado no servidor', ratio: '1280 / 906' },
      { src: asset('img/lessionato-validacao-certificado.jpg'), alt: 'Validação pública do certificado', ratio: '1280 / 382' },
    ],
  },
];
