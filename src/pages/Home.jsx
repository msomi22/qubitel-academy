import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import '../styles/dashboard-hero.css';
import {
  getAllTopicsWithCounts,
  getCategoriesWithCounts,
  getCategorySummaries,
  topicProgress
} from '../services/questionBankService.js';
import { getDashboardQuestionSummary } from '../services/visibleQuestionInventoryService.js';
import { buildCategorySearchParams, categoryPath } from '../services/categoryNavigationService.js';
import {
  getRecommendedStartTopics,
  getTopicDisplayName,
  getTopicLearningTitle
} from '../services/dashboardLearningPathService.js';
import { usePreferences } from '../hooks/usePreferences.js';
import SupportButton from '../components/SupportButton.jsx';

const emptySummary = { total: 0, done: 0, percent: 0 };

const categoryIconMap = {
  dsa: '⌁',
  system: '▣',
  java: '☕',
  'kubernetes-ckad': '⎈',
  aptitude: '∑',
  'ml-ai': 'AI',
  'engineering-leadership': '★'
};

function getTopicLearningPath(topic) {
  if (!topic?.category || !topic?.id) return '/random';

  const query = buildCategorySearchParams({
    topicId: topic.id,
    page: 1
  }).toString();
  const basePath = categoryPath(topic.category);

  return query ? `${basePath}?${query}` : basePath;
}

function buildLearningStage(percent) {
  if (percent >= 80) {
    return {
      label: 'Senior interview polish',
      description: 'Refine weak topics, explain trade-offs aloud, and practice mixed questions.'
    };
  }

  if (percent >= 50) {
    return {
      label: 'Depth and consistency',
      description: 'Keep building breadth while comparing patterns and why one approach wins.'
    };
  }

  if (percent >= 20) {
    return {
      label: 'Pattern recognition sprint',
      description: 'Focus on recognizing the problem shape before jumping into implementation.'
    };
  }

  return {
    label: 'Foundation builder',
    description: 'Start with high-signal fundamentals and build a steady learning habit.'
  };
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

function getCategoryIcon(category) {
  return categoryIconMap[category?.id] || String(category?.name || '•').slice(0, 2).toUpperCase();
}

function getCategorySubtitle(category) {
  if (category?.description) return category.description;
  const topicCount = Number(category?.topicCount || 0);
  const quizCount = Number(category?.quizCount || 0);

  if (quizCount > 0) return `${quizCount} practice questions`;
  return `${topicCount} ${topicCount === 1 ? 'topic bank' : 'topic banks'}`;
}

function ProgressBar({ percent, label }) {
  const safePercent = clampPercent(percent);

  return (
    <div className="dashboard-progress-bar" aria-label={label} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={safePercent}>
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

function TopicProgressRow({ topic }) {
  return (
    <Link to={getTopicLearningPath(topic)} className="dashboard-topic-row">
      <span className="dashboard-topic-row__icon" aria-hidden="true">↗</span>
      <span className="dashboard-topic-row__copy">
        <strong>{getTopicDisplayName(topic)}</strong>
        <small>{topic.progress.done}/{topic.progress.total} complete</small>
      </span>
      <span className="dashboard-topic-row__percent">{topic.progress.percent}%</span>
    </Link>
  );
}

function CategoryProgressRow({ category }) {
  const percent = clampPercent(category.progressPercent);

  return (
    <Link to={categoryPath(category.id)} className="dashboard-category-row">
      <span className="dashboard-category-row__icon" aria-hidden="true">{getCategoryIcon(category)}</span>
      <span className="dashboard-category-row__copy">
        <strong>{category.name}</strong>
        <small>{getCategorySubtitle(category)}</small>
        <ProgressBar percent={percent} label={`${category.name} progress`} />
      </span>
      <span className="dashboard-category-row__percent">{percent}%</span>
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

export default function Home() {
  const { completed, randomCount = 0 } = usePreferences();
  const [summary, setSummary] = useState(emptySummary);
  const [categories, setCategories] = useState([]);
  const [countedCategories, setCountedCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoadingStats(true);

    Promise.all([
      getDashboardQuestionSummary(completed),
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

  const recommendedStartTopics = useMemo(
    () => getRecommendedStartTopics(topicProgressRows),
    [topicProgressRows]
  );

  const nextTopic = useMemo(() => {
    const unfinished = topicProgressRows.filter((topic) => topic.progress.percent < 100);
    const activeTopic = [...unfinished]
      .filter((topic) => topic.progress.done > 0)
      .sort((a, b) => b.progress.percent - a.progress.percent || a.name.localeCompare(b.name))[0];
    const recommendedTopic = getRecommendedStartTopics(unfinished, { limit: 1 })[0];

    return activeTopic || recommendedTopic || unfinished[0] || null;
  }, [topicProgressRows]);

  const weakAreas = useMemo(() => {
    const lowProgressTopics = [...topicProgressRows]
      .filter((topic) => topic.progress.percent < 75)
      .sort((a, b) => a.progress.percent - b.progress.percent || b.progress.total - a.progress.total)
      .slice(0, 3);

    return lowProgressTopics.length ? lowProgressTopics : recommendedStartTopics.slice(0, 3);
  }, [recommendedStartTopics, topicProgressRows]);

  const categoryProgressRows = useMemo(() => [...countedCategories]
    .sort((a, b) => {
      const progressDelta = Number(b.progressPercent > 0) - Number(a.progressPercent > 0);
      if (progressDelta !== 0) return progressDelta;

      return (b.quizCount || 0) - (a.quizCount || 0) || a.name.localeCompare(b.name);
    })
    .slice(0, 4), [countedCategories]);

  const strongestCategory = useMemo(() => [...countedCategories]
    .sort((a, b) => (b.progressPercent || 0) - (a.progressPercent || 0))[0], [countedCategories]);

  const nextTopicPath = getTopicLearningPath(nextTopic);
  const nextTopicLabel = nextTopic ? getTopicDisplayName(nextTopic) : 'Review progress';
  const nextTopicTitle = nextTopic ? getTopicLearningTitle(nextTopic) : 'All visible topics are complete.';

  return (
    <div className="learning-dashboard-page dashboard-command-center">
      <section className="glass dashboard-command-hero" aria-labelledby="dashboard-command-title">
        <div className="dashboard-command-hero__copy">
          <p className="eyebrow">Learning command center</p>
          <h1 id="dashboard-command-title">Welcome back! 👋</h1>
          <p>Keep your momentum going. Your next useful action is always one tap away.</p>

          <div className="dashboard-command-hero__progress">
            <span>Overall progress</span>
            <strong>{summary.done}/{loadingStats ? '…' : summary.total} questions</strong>
            <ProgressBar percent={summary.percent} label="Overall dashboard progress" />
          </div>
        </div>

        <ProgressRing percent={summary.percent} />

        <div className="dashboard-command-hero__actions">
          <Link className="btn dashboard-command-primary" to={nextTopic ? nextTopicPath : '/progress'}>
            Continue Learning
          </Link>
          <Link className="btn ghost dashboard-command-secondary" to="/random">Random Practice</Link>
        </div>
      </section>

      <section className="dashboard-command-split" aria-label="Recommended dashboard actions">
        <CommandCard eyebrow="Continue learning" title={nextTopicLabel} className="dashboard-action-card">
          <p>{nextTopicTitle}</p>
          {nextTopic ? (
            <div className="dashboard-inline-progress">
              <span>{nextTopic.progress.done}/{nextTopic.progress.total} complete</span>
              <strong>{nextTopic.progress.percent}%</strong>
              <ProgressBar percent={nextTopic.progress.percent} label={`${nextTopic.name} progress`} />
            </div>
          ) : (
            <p className="dashboard-empty-note">You have completed the visible question set. Review progress or start random practice.</p>
          )}
          <Link className="dashboard-card-link" to={nextTopic ? nextTopicPath : '/progress'}>
            {nextTopic ? 'Resume topic' : 'Review progress'}
          </Link>
        </CommandCard>

        <CommandCard eyebrow="Focus areas" title="Weak topics" className="dashboard-action-card">
          <div className="dashboard-topic-list">
            {weakAreas.length ? weakAreas.map((topic) => (
              <TopicProgressRow key={topic.id} topic={topic} />
            )) : <p className="dashboard-empty-note">Start solving questions to unlock focus signals.</p>}
          </div>
          <Link className="dashboard-card-link" to="/categories">View all focus areas</Link>
        </CommandCard>
      </section>

      <section className="dashboard-command-grid" aria-label="Dashboard learning summary">
        <CommandCard
          eyebrow="Category progress"
          title="Learning paths"
          action={<Link to="/categories">View all categories</Link>}
          className="dashboard-category-card"
        >
          <div className="dashboard-category-list">
            {categoryProgressRows.length ? categoryProgressRows.map((category) => (
              <CategoryProgressRow key={category.id} category={category} />
            )) : <p className="dashboard-empty-note">Category progress will appear once the question banks finish loading.</p>}
          </div>
        </CommandCard>

        <CommandCard eyebrow="Today's practice" title="Quick starts" className="dashboard-practice-card">
          <div className="dashboard-practice-list">
            <PracticeAction to="/random" icon="🎯" title="Random Question" description="One fresh question from visible banks" />
            <PracticeAction to="/random" icon="⚡" title="Mixed Quiz" description="Use random mode for mixed practice" />
            <PracticeAction to="/progress" icon="📈" title="Progress Review" description="Check completed and remaining work" />
          </div>
        </CommandCard>

        <CommandCard eyebrow="Quick stats" title="Momentum" className="dashboard-stats-card">
          <div className="dashboard-metric-grid">
            <MetricTile value={summary.done} label="Completed" helper="visible banks" />
            <MetricTile value={remainingQuestions} label="Remaining" />
            <MetricTile value={randomCount} label="Random runs" />
            <MetricTile value={topicCount} label="Topic banks" />
          </div>
        </CommandCard>

        <CommandCard eyebrow="Current stage" title={learningStage.label} className="dashboard-stage-card">
          <p>{learningStage.description}</p>
          <ul className="dashboard-stage-list">
            <li><strong>{categories.length}</strong> categories available.</li>
            <li><strong>{strongestCategory?.name || 'No category yet'}</strong> is your strongest visible path.</li>
          </ul>
          <SupportButton className="dashboard-support-link" />
        </CommandCard>
      </section>
    </div>
  );
}
