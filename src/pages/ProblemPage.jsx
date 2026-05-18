import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import FocusedProblemWorkspace from '../components/FocusedProblemWorkspace.jsx';
import LoadingCard from '../components/LoadingCard.jsx';
import ComplexSystemDesignProblem from '../components/problems/ComplexSystemDesignProblem.jsx';

import { findQuestionById } from '../services/questionBankService.js';
import { recordQuestionOpen } from '../services/recentQuestionService.js';
import { storageService } from '../services/storageService.js';

function uniqueItems(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    if (!item?.label) return false;

    const key = item.label.toLowerCase();
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function categoryPath(categoryId) {
  if (categoryId === 'dsa') return '/dsa';
  if (categoryId === 'system') return '/system-design';
  return categoryId ? `/category/${categoryId}` : '/';
}

function pillClass(type, label, difficulty) {
  const normalizedLabel = String(label || '').toLowerCase();
  const normalizedDifficulty = String(difficulty || '').toLowerCase();

  if (type === 'difficulty' || normalizedLabel === normalizedDifficulty) {
    if (normalizedLabel === 'easy') return 'difficulty-pill difficulty-easy';
    if (normalizedLabel === 'medium') return 'difficulty-pill difficulty-medium';
    if (normalizedLabel === 'hard') return 'difficulty-pill difficulty-hard';
    return 'difficulty-pill';
  }

  if (type === 'topic') return 'topic-pill';

  return 'meta-pill';
}

export default function ProblemPage() {
  const { questionId } = useParams();
  const location = useLocation();
  const lastRecordedQuestionId = useRef('');

  const [entry, setEntry] = useState(null);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProblem() {
      setLoading(true);
      setError('');

      const decodedQuestionId = decodeURIComponent(questionId || '');
      const searchEntry = location.state?.searchEntry;

      try {
        if (searchEntry?.question) {
          const stateEntry = {
            question: searchEntry.question,
            topic: {
              id: searchEntry.topicId,
              name: searchEntry.topicName,
              description: searchEntry.topicDescription,
              category: searchEntry.category
            },
            categoryName: searchEntry.category
          };

          if (active) {
            setEntry(stateEntry);
            setLoading(false);
          }

          return;
        }

        const result = await findQuestionById(decodedQuestionId);

        if (active) {
          setEntry(result);

          if (!result) setError('Problem not found.');
        }
      } catch (err) {
        console.error(err);

        if (active) setError('Could not load this problem.');
      } finally {
        if (active) setLoading(false);
      }
    }

    setCompleted(storageService.read().completed);
    loadProblem();

    return () => {
      active = false;
    };
  }, [questionId, location.state]);

  useEffect(() => {
    const currentQuestionId = entry?.question?.id;
    if (!currentQuestionId || lastRecordedQuestionId.current === currentQuestionId) return;

    lastRecordedQuestionId.current = currentQuestionId;
    recordQuestionOpen(entry.question);
  }, [entry?.question?.id, entry?.question]);

  function handleCompletionClick(id) {
    if (completed[id]) {
      const updated = storageService.resetQuestionProgress(id);
      setCompleted(updated.completed);
      return;
    }

    const updated = storageService.markComplete(id);
    setCompleted(updated);
  }

  function handleMarkComplete(id) {
    const updated = storageService.markComplete(id);
    setCompleted(updated);
  }

  if (loading) return <LoadingCard label="Loading problem workspace..." />;

  if (error || !entry) {
    return (
      <main className="page">
        <section className="hero-card problem-detail-shell">
          <p className="eyebrow">Problem workspace</p>
          <h1>{error || 'Problem not found.'}</h1>
          <p>The selected question may have moved or the bank may have been renamed.</p>
          <NavLink className="btn" to="/">Back to dashboard</NavLink>
        </section>
      </main>
    );
  }

  const categoryId = entry.topic?.category || entry.category?.id;
  const categoryBackPath = categoryPath(categoryId);
  const primaryPattern = entry.question.finalPattern || entry.topic?.name;
  const isComplexSystemDesign = entry.question.type === 'complex-system-design';

  const problemTags = uniqueItems([
    { label: entry.question.difficulty, type: 'difficulty' },
    { label: entry.question.estimatedTime, type: 'meta' },
    { label: primaryPattern, type: 'topic' },
    { label: entry.question.type, type: 'meta' }
  ]);

  return (
    <main className="page problem-detail-shell focused-problem-page">
      <div className="problem-breadcrumb compact-problem-breadcrumb">
        <NavLink to="/">Back to Dashboard</NavLink>
        <span>/</span>
        <NavLink to={categoryBackPath}>{entry.topic?.name || entry.categoryName || 'Topic'}</NavLink>
        <span>/</span>
        <span>{entry.question.title}</span>
      </div>

      <section className="reference-problem-intro">
        <div>
          <h1>{entry.question.title}</h1>

          <div className="problem-meta-pills" aria-label="Problem metadata">
            {problemTags.map(({ label, type }) => (
              <span key={label} className={pillClass(type, label, entry.question.difficulty)}>
                {label}
              </span>
            ))}
          </div>

          <p>{entry.question.question || entry.topic?.description || entry.question.scenario}</p>
        </div>

        <div className="reference-action-group" aria-label="Focused problem actions">
          <NavLink className="btn ghost" to={categoryBackPath}>Back to category</NavLink>

          {!isComplexSystemDesign ? (
            <button className="mark reference-mark" onClick={() => handleCompletionClick(entry.question.id)}>
              {completed[entry.question.id] ? 'Reset progress' : 'Mark complete'}
            </button>
          ) : null}
        </div>
      </section>

      {isComplexSystemDesign ? (
        <ComplexSystemDesignProblem
          question={entry.question}
          completed={!!completed[entry.question.id]}
          onToggle={handleCompletionClick}
          onMarkComplete={handleMarkComplete}
        />
      ) : (
        <FocusedProblemWorkspace
          question={entry.question}
          completed={!!completed[entry.question.id]}
          onToggle={handleCompletionClick}
          onMarkComplete={handleMarkComplete}
          hideTopline
        />
      )}
    </main>
  );
}
