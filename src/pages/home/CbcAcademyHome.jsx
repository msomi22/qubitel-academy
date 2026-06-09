import { Link } from 'react-router-dom';
import '../../styles/cbc-academy-home.css';

const emptyProgress = {
  done: 0,
  total: 0,
  percent: 0
};

function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

function getSectionByKind(homeModel, kind) {
  return homeModel?.sections?.find((section) => section.kind === kind) || null;
}

function getSectionChildren(section) {
  if (Array.isArray(section?.children)) return section.children;
  if (Array.isArray(section?.nodes)) return section.nodes;
  return [];
}

function getNodeEmoji(section) {
  const title = String(section?.title || '').toLowerCase();

  if (title.includes('english')) return '📚';
  if (title.includes('math')) return '🔢';
  if (title.includes('kiswahili')) return '🗣️';
  if (title.includes('grade 1')) return '🌱';
  if (title.includes('grade 3')) return '⭐';

  return '🎒';
}

function CbcProgressPill({ progress }) {
  const safeProgress = progress || emptyProgress;

  return (
    <div className="cbc-home-progress-pill">
      <span>{clampPercent(safeProgress.percent)}%</span>
      <small>{safeProgress.done || 0}/{safeProgress.total || 0} done</small>
    </div>
  );
}

function CbcActionCard({ to, emoji, title, description, variant = '' }) {
  return (
    <Link to={to} className={`cbc-home-action-card ${variant}`.trim()}>
      <span className="cbc-home-action-card__emoji" aria-hidden="true">{emoji}</span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </Link>
  );
}

function CbcLearningAreaCard({ section }) {
  const progress = section.progress || emptyProgress;

  return (
    <Link to={section.href || '/categories'} className="cbc-home-learning-card">
      <span className="cbc-home-learning-card__emoji" aria-hidden="true">
        {getNodeEmoji(section)}
      </span>

      <span className="cbc-home-learning-card__copy">
        <strong>{section.title}</strong>
        <small>{section.summary || 'Tap to learn and practise.'}</small>
      </span>

      <CbcProgressPill progress={progress} />
    </Link>
  );
}

function CbcFocusCard({ section }) {
  const progress = section.progress || emptyProgress;

  return (
    <Link to={section.href || '/categories'} className="cbc-home-focus-card">
      <span aria-hidden="true">💪</span>
      <span>
        <strong>{section.title}</strong>
        <small>{progress.done || 0}/{progress.total || 0} complete</small>
      </span>
      <b>{clampPercent(progress.percent)}%</b>
    </Link>
  );
}

function CbcEmptyHome({ homeModel }) {
  const title = homeModel.title || 'CBC Academy';
  const primaryAction = homeModel.continueAction || {
    href: '/categories',
    label: 'See learning areas'
  };

  return (
    <main className="cbc-home-page">
      <section className="cbc-home-hero">
        <div className="cbc-home-hero__copy">
          <p className="cbc-home-eyebrow">CBC Academy</p>
          <h1>Hi learner! 🌈</h1>
          <p>{homeModel.summary || `${title} lessons will appear here soon.`}</p>

          <Link className="cbc-home-primary-button" to={primaryAction.href}>
            {primaryAction.label}
          </Link>
        </div>

        <div className="cbc-home-mascot-card" aria-hidden="true">
          <span>🦉</span>
          <strong>Ready to learn?</strong>
        </div>
      </section>

      <section className="cbc-home-panel">
        <h2>{homeModel.emptyState?.title || 'Lessons are coming soon'}</h2>
        <p>{homeModel.emptyState?.description || 'Your learning areas will show here once they are ready.'}</p>
      </section>
    </main>
  );
}

export default function CbcAcademyHome({ homeModel, randomCount = 0 }) {
  const progress = homeModel.progress || emptyProgress;
  const continueSection = getSectionByKind(homeModel, 'continue');
  const focusSection = getSectionByKind(homeModel, 'focus');
  const learningPathsSection = getSectionByKind(homeModel, 'learningPaths');
  const stageSection = getSectionByKind(homeModel, 'stage');
  const focusChildren = getSectionChildren(focusSection);
  const learningAreas = getSectionChildren(learningPathsSection);

  if (!homeModel.hasContent) {
    return <CbcEmptyHome homeModel={homeModel} />;
  }

  return (
    <main className="cbc-home-page">
      <section className="cbc-home-hero" aria-labelledby="cbc-home-title">
        <div className="cbc-home-hero__copy">
          <p className="cbc-home-eyebrow">CBC Academy</p>
          <h1 id="cbc-home-title">Ready for today’s learning? 🌟</h1>
          <p>
            Choose a learning area, practise a little, and keep growing step by step.
          </p>

          <div className="cbc-home-hero__actions">
            <Link className="cbc-home-primary-button" to={homeModel.continueAction.href}>
              {homeModel.continueAction.label}
            </Link>

            <Link className="cbc-home-secondary-button" to="/categories">
              Pick a learning area
            </Link>
          </div>
        </div>

        <div className="cbc-home-mascot-card">
          <span aria-hidden="true">🦉</span>
          <strong>{clampPercent(progress.percent)}%</strong>
          <small>overall progress</small>
        </div>
      </section>

      <section className="cbc-home-action-grid" aria-label="CBC quick actions">
        <CbcActionCard
          to={continueSection?.href || homeModel.continueAction.href}
          emoji="📖"
          title="Continue learning"
          description={continueSection?.summary || 'Open your next activity.'}
          variant="cbc-home-action-card--primary"
        />

        <CbcActionCard
          to="/random"
          emoji="🎯"
          title="Practise"
          description="Try a friendly mixed practice."
        />

        <CbcActionCard
          to="/progress"
          emoji="🏅"
          title="My progress"
          description={`${progress.done || 0} completed so far.`}
        />
      </section>

      <section className="cbc-home-panel">
        <div className="cbc-home-section-heading">
          <div>
            <p className="cbc-home-eyebrow">Learning areas</p>
            <h2>{learningPathsSection?.title || 'Choose where to learn'}</h2>
          </div>

          <Link to={learningPathsSection?.href || '/categories'}>
            View all
          </Link>
        </div>

        <div className="cbc-home-learning-grid">
          {learningAreas.length ? learningAreas.map((section) => (
            <CbcLearningAreaCard key={section.id} section={section} />
          )) : (
            <p className="cbc-home-empty-note">Learning areas will appear here soon.</p>
          )}
        </div>
      </section>

      <section className="cbc-home-two-column">
        <article className="cbc-home-panel">
          <div className="cbc-home-section-heading">
            <div>
              <p className="cbc-home-eyebrow">Practise more</p>
              <h2>{focusSection?.title || 'Areas to improve'}</h2>
            </div>
          </div>

          <div className="cbc-home-focus-list">
            {focusChildren.length ? focusChildren.map((section) => (
              <CbcFocusCard key={section.id} section={section} />
            )) : (
              <p className="cbc-home-empty-note">
                Start learning to see what needs more practice.
              </p>
            )}
          </div>
        </article>

        <article className="cbc-home-panel cbc-home-stage-card">
          <p className="cbc-home-eyebrow">Today’s cheer</p>
          <h2>{stageSection?.title || 'Keep going'}</h2>
          <p>
            {stageSection?.summary || 'Every small practice makes you stronger.'}
          </p>

          <div className="cbc-home-mini-stats">
            <span>
              <strong>{progress.done || 0}</strong>
              <small>Done</small>
            </span>
            <span>
              <strong>{Math.max((progress.total || 0) - (progress.done || 0), 0)}</strong>
              <small>Left</small>
            </span>
            <span>
              <strong>{randomCount}</strong>
              <small>Practice</small>
            </span>
          </div>

        </article>
      </section>
    </main>
  );
}