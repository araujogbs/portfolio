import { education, jobs } from '../data/profile';
import './Experience.css';

export function Experience() {
  return (
    <section className="section experience" id="trajetoria" aria-labelledby="exp-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Trajetória</span>
          <h2 className="section-title" id="exp-title">
            Por onde <em>eu passei.</em>
          </h2>
          <p className="lead">
            Comecei implantando ERP nos clientes, depois fui pro suporte N2 e, em paralelo, fiz projetos como freelancer.
            Então já estive dos dois lados: de quem desenvolve e de quem atende o cliente quando dá problema.
          </p>
        </div>

        <ol className="timeline">
          {jobs.map((job, i) => (
            <li
              key={job.role + job.org}
              className={`timeline__item${job.current ? ' is-current' : ''}`}
              data-reveal
              style={{ '--delay': `${i * 0.06}s` } as React.CSSProperties}
            >
              <span className="timeline__period mono">{job.period}</span>
              <div className="timeline__card">
                <h3>
                  {job.role} <span>· {job.org}</span>
                </h3>
                <span className="timeline__mode mono">{job.mode}</span>
                <ul>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li className="timeline__item timeline__item--edu" data-reveal>
            <span className="timeline__period mono">{education.period}</span>
            <div className="timeline__card">
              <h3>
                {education.course} <span>· {education.school}</span>
              </h3>
              <span className="timeline__mode mono">{education.extra}</span>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
