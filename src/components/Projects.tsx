import { projects, type ProjectId } from '../data/projects';
import { ProjectCase } from './ProjectCase';
import { SlotLab } from './labs/SlotLab';
import { BotLab } from './labs/BotLab';
import { PixLab } from './labs/PixLab';
import { LaunchLab } from './labs/LaunchLab';
import './Projects.css';

const labs: Record<ProjectId, React.ComponentType> = {
  lari: SlotLab,
  bot: BotLab,
  lessionato: PixLab,
  mhba: LaunchLab,
};

export function Projects() {
  return (
    <section className="section projects" id="projetos" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Projetos</span>
          <h2 className="section-title" id="projects-title">
            O que eu já <em>coloquei no ar.</em>
          </h2>
          <p className="lead">
            Já fiz projetos pra uma maquiadora, um evento, o meu próprio time de suporte e uma consultoria. Em cada um
            deixei uma parte funcionando aqui embaixo pra você mexer.
          </p>
        </div>
      </div>

      {projects.map((p) => {
        const Lab = labs[p.id];
        return (
          <ProjectCase key={p.id} project={p}>
            <Lab />
          </ProjectCase>
        );
      })}
    </section>
  );
}
