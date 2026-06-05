import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import LoadingCard from '../components/LoadingCard.jsx';
import ComplexSystemDesignProblem from '../components/problems/ComplexSystemDesignProblem.jsx';
import { getQuestionRenderer } from '../components/question-renderers/registry/questionRendererRegistry.js';
import { getActiveAcademy } from '../config/detectAcademy.ts';

import { findQuestionById } from '../services/questionBankService.js';
import { getAdjacentQuestions } from '../services/questionNavigationService.js';
import { recordQuestionOpen } from '../services/recentQuestionService.js';
import { storageService } from '../services/storageService.js';
import {
  buildCategoryReturnPath,
  categoryPath
} from '../services/categoryNavigationService.js';

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

function isMcqType(type) {
  return type === 'mcq' || type === 'multiple-choice';
}

function problemTypeLabel(type) {
  return String(type || 'problem').replace(/-/g, ' ');
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
            bank: searchEntry.bank,
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

  const activeAcademy = getActiveAcademy();
  const categoryId = entry.question.category || entry.topic?.category || entry.category?.id;
  const categoryBackPath = location.state?.returnToCategory
    ? buildCategoryReturnPath({
        categoryId,
        ...location.state.returnToCategory
      })
    : categoryPath(categoryId);
  const topicName = entry.topic?.name || entry.categoryName || 'Topic';
  const categoryName = entry.category?.name || entry.categoryName || entry.topic?.category || 'Learning';
  const primaryPattern = entry.question.finalPattern || topicName;
  const isComplexSystemDesign = entry.question.type === 'complex-system-design';
  const isMcq = isMcqType(entry.question.type);
  const isComplete = !!completed[entry.question.id];
  const introText = isMcq ? '' : entry.question.question || entry.topic?.description || entry.question.scenario;
  const questionNavigation = {
    ...getAdjacentQuestions(entry.bank?.questions || [], entry.question.id),
    returnToCategory: location.state?.returnToCategory || null
  };
  const QuestionRenderer = getQuestionRenderer({
    academyId: activeAcademy.id,
    categoryId,
    topicId: entry.question.topicId || entry.topic?.id,
    questionType: entry.question.type,
    interactionType: entry.question.interactionType || entry.question.metadata?.interactionType
  });
  const isCbcGradeOneKidsQuiz = activeAcademy.id === 'cbc'
    && categoryId === 'grade-1'
    && (entry.question.interactionType === 'visual-mcq' || entry.question.metadata?.interactionType === 'visual-mcq');

  const problemTags = uniqueItems([
    { label: entry.question.difficulty, type: 'difficulty' },
    { label: entry.question.estimatedTime, type: 'meta' },
    { label: primaryPattern, type: 'topic' },
    { label: problemTypeLabel(entry.question.type), type: 'meta' },
    { label: isComplete ? 'Completed' : 'In progress', type: 'meta' }
  ]);

  return (
    <main className={`page problem-detail-shell focused-problem-page premium-problem-page ${isCbcGradeOneKidsQuiz ? 'cbc-grade-one-problem-page' : ''}`.trim()}>
      {!isCbcGradeOneKidsQuiz ? (
        <>
          <div className="problem-breadcrumb compact-problem-breadcrumb">
            <NavLink to="/">Dashboard</NavLink>
            <span>/</span>
            <NavLink to={categoryBackPath}>{topicName}</NavLink>
            <span>/</span>
            <span>{entry.question.title}</span>
          </div>

          <section className="reference-problem-intro premium-problem-intro">
            <div className="premium-problem-title-area">
              <div className="premium-problem-context-row">
                <NavLink to={categoryBackPath}>Back to topic</NavLink>
                <span>{categoryName}</span>
                <span>{topicName}</span>
              </div>

              <h1>{entry.question.title}</h1>

              <div className="problem-meta-pills" aria-label="Problem metadata">
                {problemTags.map(({ label, type }) => (
                  <span key={label} className={pillClass(type, label, entry.question.difficulty)}>
                    {label}
                  </span>
                ))}
              </div>

              {introText ? <p className="premium-problem-summary">{introText}</p> : null}
            </div>

            <aside className="premium-problem-progress-card" aria-label="Focused problem actions">
              <span className="mini-label">Current state</span>
              <strong>{isComplete ? 'Completed' : 'Ready to solve'}</strong>
              <small>{isMcq ? 'Select an answer, then review the explanation.' : 'Read, draft mentally, then compare with the solution.'}</small>

              <div className="reference-action-group premium-problem-actions">
                <NavLink className="btn ghost" to={categoryBackPath}>Back to topic</NavLink>

                {!isComplexSystemDesign ? (
                  <button className="mark reference-mark" onClick={() => handleCompletionClick(entry.question.id)}>
                    {isComplete ? 'Reset' : 'Done'}
                  </button>
                ) : null}
              </div>
            </aside>
          </section>
        </>
      ) : null}

      {isComplexSystemDesign ? (
        <ComplexSystemDesignProblem
          question={entry.question}
          completed={isComplete}
          onToggle={handleCompletionClick}
          onMarkComplete={handleMarkComplete}
        />
      ) : (
        <QuestionRenderer
          question={entry.question}
          completed={isComplete}
          onToggle={handleCompletionClick}
          onMarkComplete={handleMarkComplete}
          navigation={questionNavigation}
          hideTopline
        />
      )}
    </main>
  );
}
