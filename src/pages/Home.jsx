import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  getAllTopicsWithCounts,
  getCategoriesWithCounts,
  getCategorySummaries,
  progressSummary,
  topicProgress
} from '../services/questionBankService.js';
import { usePreferences } from '../hooks/usePreferences.js';
import ProgressChart from '../components/ProgressChart.jsx';
import BuyCoffeeButton from '../components/BuyCoffeeButton.jsx';

const emptySummary = { total: 0, done: 0, percent: 0 };

const dashboardHeroStyles = `
  .dashboard-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: grid;
    gap: clamp(22px, 3vw, 34px);
    width: 100%;
    padding: clamp(22px, 3vw, 34px);
    border: 1px solid color-mix(in srgb, var(--accent) 34%, var(--border));
    border-radius: 18px;
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--bg-card) 96%, var(--accent) 4%),
        var(--bg-card)
      );
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--accent) 8%, transparent),
      0 18px 36px rgba(0, 0, 0, 0.12),
      var(--shadow-soft);
  }

  .dashboard-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(circle at 0 0, color-mix(in srgb, var(--accent) 12%, transparent) 0, transparent 32%),
      linear-gradient(90deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent 42%);
    opacity: 0.58;
  }

  .dashboard-hero__main {
    display: grid;
    gap: 16px;
    min-width: 0;
  }

  .dashboard-hero__identity {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
  }

  .dashboard-hero__eyebrow {
    margin: 0;
    color: var(--accent-dark) !important;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .dashboard-hero__title {
    max-width: 820px;
    margin: 0;
    color: var(--text-primary);
    font-family: var(--font-serif);
    font-size: clamp(2rem, 3vw, 2.85rem);
    font-style: italic;
    font-weight: 400;
    line-height: 1.06;
    letter-spacing: 0;
  }

  .dashboard-hero__description {
    max-width: 720px;
    margin: 0;
    color: var(--text-secondary);
    font-size: clamp(0.95rem, 1vw, 1.02rem);
    line-height: 1.65;
  }

  .dashboard-hero__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-top: 6px;
  }

  .dashboard-hero__path,
  .dashboard-hero .start-here-track {
    margin-top: 18px;
  }

  .dashboard-hero__path {
    max-width: 100%;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 2px;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--accent) 44%, var(--border)) transparent;
  }

  .dashboard-hero__path > .eyebrow {
    margin-bottom: 10px !important;
  }

  .dashboard-hero .start-here-track {
    min-width: max-content;
  }

  .dashboard-hero .start-here-step-card {
    min-width: 140px;
    min-height: 76px;
    border-radius: 14px;
  }

  .dashboard-hero .start-here-connector {
    opacity: 0.45;
  }

  .dashboard-hero__stage-panel {
    width: 100%;
    border: 1px solid color-mix(in srgb, var(--accent) 20%, var(--border));
    border-radius: 16px;
    background: color-mix(in srgb, var(--bg-card) 94%, var(--accent) 6%);
    box-shadow: var(--shadow-soft);
  }

  .dashboard-hero__stage-panel span {
    color: var(--accent-dark) !important;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .dashboard-hero__stage-panel strong {
    display: block;
    margin-block: 12px 10px;
    color: var(--text-primary);
    font-size: clamp(1.35rem, 1.7vw, 1.85rem);
    line-height: 1.12;
  }

  .dashboard-hero__stage-panel p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  @media (min-width: 1024px) {
    .dashboard-hero {
      grid-template-columns: minmax(0, 1fr) clamp(260px, 22vw, 340px);
      align-items: start;
      gap: clamp(28px, 4vw, 56px);
    }

    .dashboard-hero__main {
      max-width: 900px;
    }

    .dashboard-hero__stage-panel {
      max-width: 340px;
      justify-self: end;
    }
  }

  @media (max-width: 1023px) {
    .dashboard-hero {
      grid-template-columns: 1fr;
    }

    .dashboard-hero__main,
    .dashboard-hero__stage-panel {
      max-width: none;
    }

    .dashboard-hero__stage-panel {
      justify-self: stretch;
    }
  }

  @media (max-width: 760px) {
    .dashboard-hero {
      gap: 20px;
      padding: 20px;
      border-radius: 14px;
    }

    .dashboard-hero__main {
      gap: 14px;
    }

    .dashboard-hero__eyebrow {
      font-size: 0.68rem;
    }

    .dashboard-hero__title {
      font-size: clamp(1.85rem, 9vw, 2.35rem);
      line-height: 1.08;
    }

    .dashboard-hero__description {
      max-width: none;
      font-size: 0.94rem;
    }

    .dashboard-hero__actions .btn {
      flex: 1 1 150px;
      justify-content: center;
      text-align: center;
    }

    .dashboard-hero .start-here-step-card {
      min-width: 132px;
    }
  }
`;

// The 4-step "Start Here" learning path surfaced on the dashboard.
// Topics are ordered by recommended learning sequence.
const START_HERE_STEPS = [
  { label: 'Sliding Window', to: '/category/dsa', title: 'Learn fixed and variable windows' },
  { label: 'Two Pointers', to: '/category/dsa', title: 'Master the PAIR pattern' },
  { label: 'Binary Search', to: '/category/dsa', title: 'Understand the SEAR template' },
  { label: 'Dynamic Programming', to: '/category/dsa', title: 'Tackle the STATE pattern' }
];

function buildLearningStage(percent) {
  if (percent >= 80) {
    return {
      label: 'Senior interview polish',
      description: 'You are now in refinement mode: revisit weak topics, explain trade-offs aloud, and practice mixed questions.'
    };
  }

  if (percent >= 50) {
    return {
      label: 'Depth and consistency',
      description: 'Keep building breadth, but start comparing patterns and explaining why one approach beats another.'
    };
  }

  if (percent >= 20) {
    return {
      label: 'Pattern recognition sprint',
      description: 'Focus on recognizing the shape of each problem before jumping into implementation details.'
    };
  }

  return {
    label: 'Foundation builder',
    description: 'Start with high-signal fundamentals and build a steady habit before increasing difficulty.'
  };
}

function DashboardCard({ eyebrow, title, children, action }) {
  return (
    <article className="glass learning-dashboard-card">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div>{children}</div>
      {action ? <div className="dashboard-card-action">{action}</div> : null}
    </article>
  );
}

function StartHereTrack({ nextTopic, className = '' }) {
  return (
    <div className={className}>
      <p className="eyebrow" style={{ marginBottom: 10 }}>Recommended starting path</p>
      <div className="start-here-track">
        {START_HERE_STEPS.map((step, i) => (
          <div key={step.label} className="start-here-step">
            <Link
              to={step.to}
              className="start-here-step-card"
              title={step.title}
            >
              <span className="step-num">{i + 1}</span>
              {step.label}
            </Link>
            {i < START_HERE_STEPS.length - 1 && (
              <div className="start-here-connector" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { completed } = usePreferences();
  const [summary, setSummary] = useState(emptySummary);
  const [categories, setCategories] = useState([]);
  const [countedCategories, setCountedCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoadingStats(true);

    Promise.all([
      progressSummary(completed),
      getCategoriesWithCounts(completed),
      getAllTopicsWithCounts(),
      getCategorySummaries()
    ])
      .then(([nextSummary, nextCategories, nextTopics, nextCategorySummaries]) => {
        if (!alive) return;
        setSummary(nextSummary);
        setCountedCategories(Array.isArray(nextCategories) ? nextCategories : []);
        setTopics(Array.isArray(nextTopics) ? nextTopics : []);
        setCategories(Array.isArray(nextCategorySummaries) ? nextCategorySummaries : []);
      })
      .finally(() => {
        if (alive) setLoadingStats(false);
      });

    return () => { alive = false; };
  }, [completed]);

  const topicCount = categories.reduce((sum, category) => sum + (category.topicCount || 0), 0);
  const remainingQuestions = Math.max(summary.total - summary.done, 0);
  const learningStage = buildLearningStage(summary.percent);

  const topicProgressRows = useMemo(() => topics
    .map((topic) => ({ ...topic, progress: topicProgress(topic, completed) }))
    .filter((topic) => topic.progress.total > 0), [topics, completed]);

  const nextTopic = useMemo(() => {
    const unfinished = topicProgressRows.filter((topic) => topic.progress.percent < 100);
    return [...unfinished].sort((a, b) => {
      const byProgress = a.progress.percent - b.progress.percent;
      if (byProgress !== 0) return byProgress;
      return a.name.localeCompare(b.name);
    })[0];
  }, [topicProgressRows]);

  const weakAreas = useMemo(() => [...topicProgressRows]
    .filter((topic) => topic.progress.percent < 60)
    .sort((a, b) => a.progress.percent - b.progress.percent)
    .slice(0, 3), [topicProgressRows]);

  const strongestCategory = useMemo(() => [...countedCategories]
    .sort((a, b) => (b.progressPercent || 0) - (a.progressPercent || 0))[0], [countedCategories]);

  const isNewUser = summary.done === 0;

  return (
    <div className="learning-dashboard-page">
      <style>{dashboardHeroStyles}</style>

      <section className="hero-card glass learning-hero dashboard-hero">
        <div className="dashboard-hero__main">
          <div className="dashboard-hero__identity">
            <p className="eyebrow dashboard-hero__eyebrow">Senior developer learning platform</p>
          </div>

          <h1 className="dashboard-hero__title">
            {isNewUser
              ? 'Go from mid-level to senior — one pattern at a time.'
              : 'Master DSA, algorithms, system design, and backend engineering.'}
          </h1>

          {/* Value prop — tells new users why this beats raw LeetCode */}
          <p className="hero-value-prop dashboard-hero__description">
            {isNewUser
              ? 'Pattern-based DSA and system design, structured like a curriculum — not a random problem dump. Start with Sliding Window and build up from there.'
              : 'Senior Dev Accelerator helps developers prepare for coding interviews, strengthen computer science fundamentals, and build practical senior-level engineering skills.'}
          </p>

          <div className="hero-actions dashboard-hero__actions">
            <Link className="btn" to={nextTopic ? `/category/${nextTopic.category}` : '/random'}>
              {isNewUser ? 'Start learning' : 'Continue recommended path'}
            </Link>
            <Link className="btn ghost" to="/random">Random practice</Link>
            <BuyCoffeeButton className="btn coffee-btn" />
          </div>

          {/* Start Here track — shown to new users or those with low progress */}
          {summary.percent < 20 && (
            <StartHereTrack nextTopic={nextTopic} className="dashboard-hero__path" />
          )}
        </div>

        <div className="learning-hero-panel glass-lite dashboard-hero__stage-panel">
          <span>Current stage</span>
          <strong>{learningStage.label}</strong>
          <p>{learningStage.description}</p>
        </div>
      </section>

      <section className="dashboard-grid learning-stats-grid">
        <ProgressChart {...summary} />
        <div className="glass stat"><h2>{categories.length}</h2><p>categories</p></div>
        <div className="glass stat"><h2>{topicCount}</h2><p>topic banks</p></div>
        <div className="glass stat"><h2>{loadingStats ? '…' : summary.total}</h2><p>real questions</p></div>
      </section>

      <section className="learning-dashboard-grid">
        <DashboardCard
          eyebrow="Next best action"
          title={nextTopic ? nextTopic.name : 'All topics complete'}
          action={
            <Link className="btn" to={nextTopic ? `/category/${nextTopic.category}` : '/progress'}>
              {nextTopic ? 'Open path' : 'Review progress'}
            </Link>
          }
        >
          <p>
            {nextTopic
              ? nextTopic.description
              : 'Excellent work. Move into review mode and revisit older questions until your explanations feel automatic.'}
          </p>
          {nextTopic ? (
            <div className="dashboard-mini-progress">
              <span>{nextTopic.progress.done}/{nextTopic.progress.total} complete</span>
              <meter min="0" max={nextTopic.progress.total} value={nextTopic.progress.done} />
            </div>
          ) : null}
        </DashboardCard>

        <DashboardCard eyebrow="Focus areas" title="Weak topics to revisit">
          <div className="weak-area-list">
            {weakAreas.length ? weakAreas.map((topic) => (
              <Link key={topic.id} to={`/category/${topic.category}`} className="weak-area-row">
                <span>{topic.name}</span>
                <strong>{topic.progress.percent}%</strong>
              </Link>
            )) : <p>No weak areas yet. Start solving questions to unlock useful recommendations.</p>}
          </div>
        </DashboardCard>

        <DashboardCard eyebrow="Progress signal" title="Momentum summary">
          <ul className="dashboard-checklist">
            <li><strong>{summary.done}</strong> questions completed.</li>
            <li><strong>{remainingQuestions}</strong> questions remaining.</li>
            <li>
              <strong>{strongestCategory?.name || 'No category yet'}</strong>{' '}
              is currently your strongest path.
            </li>
          </ul>
        </DashboardCard>
      </section>

      <section className="learning-map glass">
        <h2>Practical senior software engineering roadmap</h2>
        <p>
          Follow a focused path across data structures and algorithms, LeetCode-style
          patterns, system design diagrams, microservices, API design, databases,
          distributed systems, caching, observability, and backend performance optimization.
        </p>
        <div className="road">
          <span>Recognize pattern</span>
          <span>State invariant</span>
          <span>Explain trade-off</span>
          <span>Design clean solution</span>
          <span>Review progress</span>
        </div>
      </section>
    </div>
  );
}
