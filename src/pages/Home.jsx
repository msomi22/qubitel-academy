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

  return (
    <div className="learning-dashboard-page">
      <section className="hero-card glass learning-hero">
        <div>
          <p className="eyebrow">Senior developer learning platform</p>
          <h1>Master DSA, algorithms, system design, and backend engineering.</h1>
          <p>
            Senior Dev Accelerator helps developers prepare for coding interviews,
            strengthen computer science fundamentals, practice scalable architecture,
            and build the practical software engineering skills expected from senior engineers.
          </p>
          <div className="hero-actions">
            <Link className="btn" to={nextTopic ? `/category/${nextTopic.category}` : '/random'}>
              Continue recommended path
            </Link>
            <Link className="btn ghost" to="/random">Start random practice</Link>
            <BuyCoffeeButton className="btn coffee-btn" />
          </div>
        </div>
        <div className="learning-hero-panel glass-lite">
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
          action={<Link className="btn" to={nextTopic ? `/category/${nextTopic.category}` : '/progress'}>{nextTopic ? 'Open path' : 'Review progress'}</Link>}
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
            <li><strong>{strongestCategory?.name || 'No category yet'}</strong> is currently your strongest path.</li>
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
