import './Ticker.css';

const facts = [
  ['13.500+', 'prints de erro indexados por OCR'],
  ['1.337', 'relatórios de ERP catalogados'],
  ['100', 'de acessibilidade no Lighthouse da MHBA'],
  ['2,5 MB → 438 KB', 'na primeira tela do site da Lari'],
  ['409', 'quando o horário já está ocupado'],
  ['mTLS', 'na integração PIX com o banco'],
  ['6 MB → 470 KB', 'nos vídeos de fundo da MHBA'],
];

export function Ticker() {
  const row = facts.map(([value, label]) => (
    <li key={label} className="ticker__item">
      <strong>{value}</strong>
      <span>{label}</span>
    </li>
  ));

  return (
    <div className="ticker" role="region" aria-label="Números dos projetos">
      <ul className="ticker__track">{row}</ul>
      <ul className="ticker__track" aria-hidden="true">
        {row}
      </ul>
    </div>
  );
}
