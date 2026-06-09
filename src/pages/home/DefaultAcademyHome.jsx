import { Link } from 'react-router-dom';
import SupportButton from '../../components/SupportButton.jsx';
import '../../styles/dashboard-hero.css';

const emptyProgress = {
  done: 0,
  total: 0,
  percent: 0
};

const emptyHomeContent = {
  summary: emptyProgress,
  categories: [],
  countedCategories: [],
  topics: []
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

function getNodeIcon(node) {
  return String(node?.title || node?.label || node?.id || '•')
    .slice(0, 2)
    .toUpperCase();
}

function getProgressLabel(progress) {
  if (!progress) return 'Not started';
  return `${progress.done || 0}/${progress.total || 0} complete`;
}

function ProgressBar({ percent, label }) {
  const safePercent = clampPercent(percent);

  return (
    <div
      className="dashboard-progress-bar"
      aria-label={label}
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={safePercent}
    >
      <span style={{ width: `${safePercent}%` }} />
    </div>
  );
}

function ProgressRing({ percent }) {
  const safePercent = clampPercent(percent);

  return (
    <div
      className="dashboard-progress-ring"
      role="progressbar"
      aria-label="Overall learning progress"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={safePercent}
      style={{ '--progress': `${safePercent}%` }}
    >
      <span>{safePercent}%</span>
      <small>Overall</small>
    </div>
  );
}

function CommandCard({ eyebrow, title, children, className = '', action }) {
  return (
    <article className={`glass dashboard-command-card ${className}`.trim()}>
      <div className="dashboard-command-card__head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {action ? <div className="dashboard-command-card__action">{action}</div> : null}
      </div>
      {children}
    </article>
  );
}

function MetricTile({ value, label, helper }) {
  return (
    <div className="dashboard-metric-tile">
      <strong>{value}</strong>
      <span>{label}</span>
      {helper ? <small>{helper}</small> : null}
    </div>
  );
}

function TopicProgressRow({ section }) {
  const progress = section.progress || emptyProgress;

  return (
    <Link to={section.href || '/categories'} className="dashboard-topic-row">
      <span className="dashboard-topic-row__icon" aria-hidden="true">↗</span>
      <span className="dashboard-topic-row__copy">
        <strong>{section.title}</strong>
        <small>{getProgressLabel(progress)}</small>
      </span>
      <span className="dashboard-topic-row__percent">{clampPercent(progress.percent)}%</span>
    </Link>
  );
}

function CategoryProgressRow({ section }) {
  const progress = section.progress || emptyProgress;

  return (
    <Link to={section.href || '/categories'} className="dashboard-category-row">
      <span className="dashboard-category-row__icon" aria-hidden="true">{getNodeIcon(section)}</span>
      <span className="dashboard-category-row__copy">
        <strong>{section.title}</strong>
        <small>{section.summary}</small>
        <ProgressBar percent={progress.percent} label={`${section.title} progress`} />
      </span>
      <span className="dashboard-category-row__percent">{clampPercent(progress.percent)}%</span>
    </Link>
  );
}

function PracticeAction({ to, icon, title, description }) {
  return (
    <Link to={to} className="dashboard-practice-action">
      <span aria-hidden="true">{icon}</span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </Link>
  );
}

export function LoadingAcademyHome() {
  return (
    <div className="learning-dashboard-page dashboard-command-center">
      <section className="glass dashboard-command-hero" aria-labelledby="dashboard-command-title">
        <div className="dashboard-command-hero__copy">
          <p className="eyebrow">Academy home</p>
          <h1 id="dashboard-command-title">Preparing your learning space…</h1>
          <p>Loading the academy home view.</p>

          <div className="dashboard-command-hero__progress">
            <span>Loading</span>
            <strong>Preparing dashboard</strong>
            <ProgressBar percent={0} label="Academy home loading" />
          </div>
        </div>

        <ProgressRing percent={0} />
      </section>
    </div>
  );
}

function EmptyAcademyHome({ homeModel }) {
  const progress = homeModel.progress || emptyProgress;
  const title = homeModel.title || homeModel.academyNode?.label || 'Academy';
  const primaryAction = homeModel.continueAction || {
    href: '/categories',
    label: 'Check available content'
  };

  return (
    <div className="learning-dashboard-page dashboard-command-center">
      <section className="glass dashboard-command-hero" aria-labelledby="dashboard-command-title">
        <div className="dashboard-command-hero__copy">
          <p className="eyebrow">{title} command center</p>
          <h1 id="dashboard-command-title">Welcome back! 👋</h1>
          <p>{homeModel.summary}</p>

          <div className="dashboard-command-hero__progress">
            <span>Academy status</span>
            <strong>Preparing content</strong>
            <ProgressBar percent={progress.percent} label={`${title} content progress`} />
          </div>
        </div>

        <ProgressRing percent={progress.percent} />

        <div className="dashboard-command-hero__actions">
          <Link className="btn dashboard-command-primary" to={primaryAction.href}>
            {primaryAction.label}
          </Link>
        </div>
      </section>

      <section className="dashboard-command-grid" aria-label={`${title} content status`}>
        <CommandCard
          eyebrow="Academy content"
          title={homeModel.emptyState?.title || `${title} is getting ready`}
          className="dashboard-action-card"
        >
          <p>{homeModel.emptyState?.description || 'Learning content will appear here once it is published for this academy.'}</p>
          <p className="dashboard-empty-note">
            {homeModel.emptyState?.note || 'Published categories, topics, lessons, and assessments will show here when available.'}
          </p>
        </CommandCard>

        <CommandCard
          eyebrow="Current academy"
          title={title}
          className="dashboard-stage-card"
        >
          <p>
            You are viewing the academy assigned to this domain. There is no academy switcher or cross-academy navigation.
          </p>
          <SupportButton className="dashboard-support-link" />
        </CommandCard>
      </section>
    </div>
  );
}

export function DefaultAcademyHome({ homeModel, loadingStats, randomCount = 0 }) {
  if (!homeModel) {
    return <LoadingAcademyHome />;
  }

  const progress = homeModel.progress || emptyProgress;
  const homeContent = homeModel.homeContent || emptyHomeContent;
  const remainingQuestions = Math.max(progress.total - progress.done, 0);
  const topicCount = homeContent.categories.reduce(
    (sum, category) => sum + (category.topicCount || 0),
    0
  );
  const strongestCategory = [...homeContent.countedCategories]
    .sort((a, b) => (b.progressPercent || 0) - (a.progressPercent || 0))[0];

  const continueSection = getSectionByKind(homeModel, 'continue');
  const focusSection = getSectionByKind(homeModel, 'focus');
  const learningPathsSection = getSectionByKind(homeModel, 'learningPaths');
  const stageSection = getSectionByKind(homeModel, 'stage');

  const focusChildren = getSectionChildren(focusSection);
  const learningPathChildren = getSectionChildren(learningPathsSection);
  const nextTopicProgress = continueSection?.progress;

  const randomPracticeAction = homeModel.secondaryActions.find(
    (action) => action.kind === 'secondary'
  );
  const quickStartActions = homeModel.secondaryActions.filter(
    (action) => action.kind === 'quickStart'
  );

  if (!homeModel.hasContent) {
    return <EmptyAcademyHome homeModel={homeModel} />;
  }

  return (
    <div className="learning-dashboard-page dashboard-command-center">
      <section className="glass dashboard-command-hero" aria-labelledby="dashboard-command-title">
        <div className="dashboard-command-hero__copy">
          <p className="eyebrow">{homeModel.title} command center</p>
          <h1 id="dashboard-command-title">Welcome back! 👋</h1>
          <p>{homeModel.summary}</p>

          <div className="dashboard-command-hero__progress">
            <span>Overall progress</span>
            <strong>{progress.done}/{loadingStats ? '…' : progress.total} questions</strong>
            <ProgressBar percent={progress.percent} label="Overall dashboard progress" />
          </div>
        </div>

        <ProgressRing percent={progress.percent} />

        <div className="dashboard-command-hero__actions">
          <Link className="btn dashboard-command-primary" to={homeModel.continueAction.href}>
            {homeModel.continueAction.label}
          </Link>
          {randomPracticeAction ? (
            <Link className="btn ghost dashboard-command-secondary" to={randomPracticeAction.href}>
              {randomPracticeAction.label}
            </Link>
          ) : null}
        </div>
      </section>

      <section className="dashboard-command-split" aria-label="Recommended dashboard actions">
        <CommandCard
          eyebrow="Continue learning"
          title={continueSection?.title || 'Review progress'}
          className="dashboard-action-card"
        >
          <p>{continueSection?.summary || 'All visible topics are complete.'}</p>
          {nextTopicProgress ? (
            <div className="dashboard-inline-progress">
              <span>{getProgressLabel(nextTopicProgress)}</span>
              <strong>{clampPercent(nextTopicProgress.percent)}%</strong>
              <ProgressBar
                percent={nextTopicProgress.percent}
                label={`${continueSection.title} progress`}
              />
            </div>
          ) : (
            <p className="dashboard-empty-note">
              You have completed the visible question set. Review progress or start random practice.
            </p>
          )}
          <Link className="dashboard-card-link" to={continueSection?.href || '/progress'}>
            {continueSection?.href ? 'Resume topic' : 'Review progress'}
          </Link>
        </CommandCard>

        <CommandCard
          eyebrow="Focus areas"
          title={focusSection?.title || 'Weak topics'}
          className="dashboard-action-card"
        >
          <div className="dashboard-topic-list">
            {focusChildren.length ? focusChildren.map((section) => (
              <TopicProgressRow key={section.id} section={section} />
            )) : (
              <p className="dashboard-empty-note">Start solving questions to unlock focus signals.</p>
            )}
          </div>
          <Link className="dashboard-card-link" to={focusSection?.href || '/categories'}>
            View all focus areas
          </Link>
        </CommandCard>
      </section>

      <section className="dashboard-command-grid" aria-label="Dashboard learning summary">
        <CommandCard
          eyebrow="Category progress"
          title={learningPathsSection?.title || 'Learning paths'}
          action={<Link to={learningPathsSection?.href || '/categories'}>View all categories</Link>}
          className="dashboard-category-card"
        >
          <div className="dashboard-category-list">
            {learningPathChildren.length ? learningPathChildren.map((section) => (
              <CategoryProgressRow key={section.id} section={section} />
            )) : (
              <p className="dashboard-empty-note">
                Category progress will appear once the question banks finish loading.
              </p>
            )}
          </div>
        </CommandCard>

        <CommandCard
          eyebrow="Quick starts"
          title="Practice launcher"
          action={<Link to="/categories">Browse topics</Link>}
          className="dashboard-practice-card"
        >
          <div className="dashboard-practice-list">
            <PracticeAction
              to="/random"
              icon="🎯"
              title="Random Question"
              description="One fresh question from visible banks"
            />
            {quickStartActions.map((action) => (
              <PracticeAction
                key={action.id}
                to={action.href}
                icon={action.icon || '↗'}
                title={action.label}
                description={action.description || 'Continue practice'}
              />
            ))}
          </div>
        </CommandCard>

        <CommandCard eyebrow="Quick stats" title="Momentum" className="dashboard-stats-card">
          <div className="dashboard-metric-grid">
            <MetricTile value={progress.done} label="Completed" helper="visible banks" />
            <MetricTile value={remainingQuestions} label="Remaining" />
            <MetricTile value={randomCount} label="Random runs" />
            <MetricTile value={topicCount} label="Topic banks" />
          </div>
        </CommandCard>

        <CommandCard
          eyebrow="Current stage"
          title={stageSection?.title || 'Foundation builder'}
          className="dashboard-stage-card"
        >
          <p>
            {stageSection?.summary || 'Start with high-signal fundamentals and build a steady learning habit.'}
          </p>
          <ul className="dashboard-stage-list">
            <li><strong>{homeContent.categories.length}</strong> categories available.</li>
            <li><strong>{strongestCategory?.name || 'No category yet'}</strong> is your strongest visible path.</li>
          </ul>
          <SupportButton className="dashboard-support-link" />
        </CommandCard>
      </section>
    </div>
  );
}

export default DefaultAcademyHome;