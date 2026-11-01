import './Principles.css';

const principles = [
  {
    code: 'regra.no_servidor',
    title: 'Não confio no que vem do navegador',
    body: 'Taxa de deslocamento, cupom e nota da prova são calculados de novo na API. Se alguém mudar o valor pelo DevTools, não adianta nada.',
    proof: 'Lari Novais · Lessionato',
  },
  {
    code: 'garantia.no_banco',
    title: 'Deixo o banco cuidar do que é crítico',
    body: 'Checar no código não resolve quando dois pedidos chegam no mesmo segundo. No site da Lari, coloquei uma constraint no PostgreSQL que não aceita dois horários sobrepostos.',
    proof: 'Lari Novais',
  },
  {
    code: 'deploy.reproduzivel',
    title: 'O projeto só acaba quando está no ar',
    body: 'Eu mesmo faço o deploy: Docker Compose, HTTPS, backup todo dia, firewall, fail2ban e senha fora do Git. E deixo anotado como subir tudo de novo.',
    proof: 'Lari Novais · Lessionato',
  },
  {
    code: 'automatizar.o_repetido',
    title: 'Se repete toda semana, vira ferramenta',
    body: 'O time respondia os mesmos erros toda semana e a resposta se perdia no meio das mensagens. Fiz um bot que lê os prints e guarda as soluções, e hoje todo mundo usa.',
    proof: 'Bot de suporte ERP',
  },
];

export function Principles() {
  return (
    <section className="section principles" aria-labelledby="principles-title">
      <div className="wrap principles__grid">
        <div className="principles__head" data-reveal>
          <span className="eyebrow">Como eu trabalho</span>
          <h2 className="section-title" id="principles-title">
            Algumas coisas que aprendi <em>vendo sistema quebrar.</em>
          </h2>
          <p className="lead">
            Comecei implantando ERP nos clientes e hoje fico no N2, investigando os problemas que o primeiro nível não
            consegue resolver. Muito do que eu faço nos meus projetos vem daí.
          </p>
        </div>

        <ol className="principles__list">
          {principles.map((p, i) => (
            <li key={p.code} className="principle" data-reveal style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}>
              <span className="principle__code mono">{p.code}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <span className="principle__proof mono">em: {p.proof}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
