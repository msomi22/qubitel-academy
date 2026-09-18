import { Link } from 'react-router-dom';
import { getAcademyRootNodeById } from '../../learning/academies/index.ts';
import { createSkillProgrammesRegistrySource } from '../../learning/academies/skill/skillProgrammes.registry.ts';
import {
  createLearningNodeRegistry,
  getChildren,
  isLearningNodeReady
} from '../../learning/registry/index.ts';
import { getAppearance } from '../../learning/core/index.ts';
import '../../styles/dashboard-hero.css';
import '../../styles/categories-premium-grid.css';

function createSkillRegistry() {
  const academyNode = getAcademyRootNodeById('skill-academy');
  const source = createSkillProgrammesRegistrySource();

  return createLearningNodeRegistry({
    nodes: [academyNode, ...source.nodes].filter(Boolean)
  });
}

function ProgrammeCard({ registry, programme }) {
  const ready = isLearningNodeReady(registry, programme);
  const icon = getAppearance(programme, 'icon') || '🎓';

  if (!ready) {
    return (
      <div className="premium-category-card is-disabled" aria-disabled="true">
        <div className="premium-category-card__head">
          <span className="premium-category-card__icon" aria-hidden="true">{icon}</span>
          <div className="premium-category-card__copy">
            <div className="premium-category-card__title-line">
              <strong>{programme.label}</strong>
              <span className="premium-category-card__badge">Soon</span>
            </div>
            <span className="premium-category-card__domain">Programme</span>
          </div>
        </div>
        {programme.summary && <p>{programme.summary}</p>}
      </div>
    );
  }

  return (
    <Link
      to={`/learn/${programme.id}`}
      className="premium-category-card"
      aria-label={`Open ${programme.label} programme`}
    >
      <div className="premium-category-card__head">
        <span className="premium-category-card__icon" aria-hidden="true">{icon}</span>
        <div className="premium-category-card__copy">
          <div className="premium-category-card__title-line">
            <strong>{programme.label}</strong>
            <span className="premium-category-card__badge">Ready</span>
          </div>
          <span className="premium-category-card__domain">Programme</span>
        </div>
      </div>
      {programme.summary && <p>{programme.summary}</p>}
    </Link>
  );
}

export default function SkillAcademyHome({ homeModel }) {
  const registry = createSkillRegistry();
  const academyNode = getAcademyRootNodeById('skill-academy');
  const programmes = academyNode ? getChildren(registry, academyNode.id) : [];
  const firstReadyProgramme = programmes.find((programme) => isLearningNodeReady(registry, programme));

  return (
    <div className="learning-dashboard-page dashboard-command-center">
      <section className="glass dashboard-command-hero" aria-labelledby="skill-dashboard-title">
        <div className="dashboard-command-hero__copy">
          <p className="eyebrow">Skill Academy</p>
          <h1 id="skill-dashboard-title">Build practical, professional skills.</h1>
          <p>
            Learn through structured programmes, clear levels, focused modules, practical material,
            practice and assessments.
          </p>

          <div className="dashboard-command-hero__actions">
            <Link className="btn dashboard-command-primary" to="/categories">
              Browse Programmes
            </Link>
            {firstReadyProgramme ? (
              <Link className="btn ghost dashboard-command-secondary" to={`/learn/${firstReadyProgramme.id}`}>
                Continue {firstReadyProgramme.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="dashboard-progress-ring" aria-label="Skill Academy programme count">
          <span>{programmes.length}</span>
          <small>{programmes.length === 1 ? 'Programme' : 'Programmes'}</small>
        </div>
      </section>

      <section className="glass dashboard-command-card dashboard-category-card" aria-labelledby="skill-programmes-title">
        <div className="dashboard-command-card__head">
          <div>
            <p className="eyebrow">Learning paths</p>
            <h2 id="skill-programmes-title">Programmes</h2>
          </div>
          <div className="dashboard-command-card__action">
            <Link to="/categories">View all programmes</Link>
          </div>
        </div>

        <div className="premium-category-grid">
          {programmes.map((programme) => (
            <ProgrammeCard key={programme.id} registry={registry} programme={programme} />
          ))}
        </div>

        {programmes.length === 0 ? (
          <p>Programmes will appear here when they are connected beneath the Skill Academy node.</p>
        ) : null}
      </section>

      {homeModel?.summary ? (
        <p className="sr-only">{homeModel.summary}</p>
      ) : null}
    </div>
  );
}
