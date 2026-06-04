import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button.jsx';

import { performanceConfig } from '../config/performanceConfig.js';
import { createExamEntries } from '../services/examAttemptService.js';

function clampPage(page, totalPages) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function buildPageNumbers(currentPage, totalPages, windowSize) {
  const safeWindow = Math.max(3, windowSize);
  const half = Math.floor(safeWindow / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + safeWindow - 1);

  start = Math.max(1, end - safeWindow + 1);

  const pages = [];
  for (let page = start; page <= end; page += 1) pages.push(page);
  return pages;
}

function hasListItems(items) {
  return Array.isArray(items) && items.length > 0;
}

function getFiniteSequenceValue(value) {
  if (value === null || value === undefined || value === '') return null;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function getProblemSequence(question) {
  const sequence = getFiniteSequenceValue(question?.metadata?.sequence ?? question?.sequence ?? question?.metadata?.order ?? question?.order);
  return sequence ?? Number.MAX_SAFE_INTEGER;
}

function compareProblemFallback(a, b) {
  const titleDelta = String(a?.title || '').localeCompare(String(b?.title || ''));
  if (titleDelta !== 0) return titleDelta;
  return String(a?.id || '').localeCompare(String(b?.id || ''));
}

function compareProblemsBySequence(a, b) {
  const sequenceDelta = getProblemSequence(a) - getProblemSequence(b);
  if (sequenceDelta !== 0) return sequenceDelta;
  return compareProblemFallback(a, b);
}

function difficultyClassName(difficulty) {
  const normalized = String(difficulty || 'practice').toLowerCase();
  return `difficulty-${normalized}`;
}

function getEstimatedTime(question) {
  return question?.estimatedTime || question?.metadata?.estimatedTime || '10 min';
}

function isExamEntry(question) {
  return question?.metadata?.assessmentType === 'exam-entry';
}

function isEntryComplete(question, completed) {
  if (!isExamEntry(question)) return Boolean(completed[question.id]);
  return question.examQuestions.every((examQuestion) => completed[examQuestion.id]);
}

function TopicMetadataList({ className, items }) {
  if (!hasListItems(items)) return null;
  return <ul className={className}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function RoadmapItemList({ label, items }) {
  if (!hasListItems(items)) return null;
  return <div className="workspace-block topic-roadmap-list"><span className="mini-label">{label}</span><TopicMetadataList items={items} /></div>;
}

function TopicLearningGuide({ topic }) {
  const hasObjectives = hasListItems(topic.objectives);
  const hasNotes = topic.notes && (topic.notes.summary || topic.notes.strategy || hasListItems(topic.notes.mentalModel));
  const hasRoadmap = hasListItems(topic.roadmap);

  if (!hasObjectives && !hasNotes && !hasRoadmap) return null;

  return (
    <details className="question-card topic-learning-guide" style={{ marginTop: 12, maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}>
      <summary style={{ cursor: 'pointer', display: 'grid', gap: 4, listStyle: 'revert', minWidth: 0 }}>
        <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Topic notes & roadmap</span>
        <small style={{ color: 'var(--text-secondary)' }}>Optional learner guide for objectives, mental model, and staged coverage.</small>
      </summary>

      <div className="topic-learning-guide-body" style={{ borderTop: '1px solid var(--border)', display: 'grid', gap: 12, marginTop: 12, maxWidth: '100%', minWidth: 0, overflow: 'hidden', overflowWrap: 'anywhere', paddingTop: 12, wordBreak: 'normal' }}>
        {hasObjectives ? <section className="workspace-block topic-objectives" style={{ minWidth: 0 }}><span className="mini-label">Learning focus</span><h3>Objectives</h3><TopicMetadataList items={topic.objectives} /></section> : null}
        {hasNotes ? <section className="workspace-block topic-notes" style={{ minWidth: 0 }}><span className="mini-label">How to think</span><h3>Topic notes</h3>{topic.notes.summary ? <p>{topic.notes.summary}</p> : null}{topic.notes.strategy ? <p>{topic.notes.strategy}</p> : null}<TopicMetadataList className="topic-notes-list" items={topic.notes.mentalModel} /></section> : null}
        {hasRoadmap ? (
          <section className="topic-roadmap" aria-labelledby={`${topic.id}-roadmap-heading`} style={{ minWidth: 0 }}>
            <div className="section-head compact-section-head"><div><p className="eyebrow">Mastery path</p><h3 id={`${topic.id}-roadmap-heading`}>Roadmap</h3><p>Follow the stages in order to connect the current practice set with near-term and future coverage.</p></div></div>
            <div className="card-grid compact-grid topic-roadmap-grid">
              {topic.roadmap.map((stage) => <article key={`${stage.stage}-${stage.title}`} className="question-card topic-roadmap-card" style={{ minWidth: 0 }}><p className="eyebrow">{stage.stage}</p><h3>{stage.title}</h3><p>{stage.purpose}</p><RoadmapItemList label="Current examples" items={stage.currentExamples} /><RoadmapItemList label="Near-term additions" items={stage.nearTermAdditions} /><RoadmapItemList label="Future ideas" items={stage.futureIdeas} /></article>)}
            </div>
          </section>
        ) : null}
      </div>
    </details>
  );
}

function TopicSection({
  topic,
  questions,
  completed,
  activeDifficulty = 'all',
  currentPage,
  onPageChange,
  returnContext
}) {
  const [internalPage, setInternalPage] = useState(1);
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const previousTopicKey = useRef('');
  const isControlled = typeof currentPage === 'number';

  const safeQuestions = questions || topic.questions || [];
  const orderedQuestions = useMemo(
    () => createExamEntries(safeQuestions).sort(compareProblemsBySequence),
    [safeQuestions]
  );
  const itemLabel = orderedQuestions.some(isExamEntry) ? 'activities' : 'questions';

  const pageSize = Math.max(1, performanceConfig.questionsPerPage);
  const totalQuestions = orderedQuestions.length;
  const totalPages = Math.max(1, Math.ceil(totalQuestions / pageSize));
  const rawPage = isControlled ? currentPage : internalPage;
  const safePage = clampPage(rawPage, totalPages);

  useEffect(() => {
    const topicKey = `${topic.id}:${activeDifficulty}`;
    const hadPreviousTopic = Boolean(previousTopicKey.current);
    if (!isControlled) setInternalPage(1);
    if (hadPreviousTopic && previousTopicKey.current !== topicKey) sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    previousTopicKey.current = topicKey;
  }, [topic.id, activeDifficulty, isControlled]);

  useEffect(() => {
    if (safePage === rawPage) return;
    if (isControlled) {
      onPageChange?.(safePage);
      return;
    }
    setInternalPage(safePage);
  }, [isControlled, onPageChange, rawPage, safePage]);

  const pageStart = (safePage - 1) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, totalQuestions);
  const visibleQuestions = useMemo(() => orderedQuestions.slice(pageStart, pageEnd), [orderedQuestions, pageStart, pageEnd]);
  const pageNumbers = useMemo(() => buildPageNumbers(safePage, totalPages, performanceConfig.paginationWindow), [safePage, totalPages]);

  function openFocusedProblem(question) {
    if (!question?.id) return;
    if (isExamEntry(question)) {
      navigate(`/exam/${question.id}`);
      return;
    }
    navigate(`/problem/${question.id}`, { state: { returnToCategory: { ...returnContext, questionId: question.id } } });
  }

  function shouldIgnoreCardNavigation(event) {
    return event.target.closest('button, a, input, select, summary, details, [data-no-card-nav]');
  }

  function goToPage(page) {
    const nextPage = clampPage(page, totalPages);
    if (isControlled) onPageChange?.(nextPage);
    else setInternalPage(nextPage);
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  return (
    <section className="topic-section premium-question-section premium-topic-detail" ref={sectionRef}>
      {totalQuestions === 0 ? (
        <div className="empty-state glass-lite premium-question-empty"><h3>No questions found</h3><p>Try another difficulty or clear the filter.</p></div>
      ) : (
        <div className="premium-question-table-card" aria-label={`${topic.name} questions`}>
          <div className="premium-question-table-head"><div><h2>{topic.name}</h2><p>{topic.description}</p></div><span className="premium-topic-question-count">{totalQuestions} {itemLabel}</span></div>
          <div className="premium-question-table" role="table" aria-label={`${topic.name} question list`}>
            <div className="premium-question-row premium-question-row--header" role="row"><span role="columnheader">#</span><span role="columnheader">Question</span><span role="columnheader">Difficulty</span><span role="columnheader">Status</span><span role="columnheader">Est. Time</span><span role="columnheader" className="sr-only">Open</span></div>
            {visibleQuestions.map((question, index) => {
              const questionNumber = pageStart + index + 1;
              const isCompleted = isEntryComplete(question, completed);
              const actionLabel = isExamEntry(question) ? `Start ${question.title}` : `Open ${question.title} in focused workspace`;
              return (
                <div key={question.id} role="button" tabIndex={0} className={`premium-question-row premium-question-row--item ${isExamEntry(question) ? 'is-exam-entry' : ''} ${isCompleted ? 'is-complete' : ''}`} aria-label={actionLabel} onClick={(event) => { if (shouldIgnoreCardNavigation(event)) return; openFocusedProblem(question); }} onKeyDown={(event) => { if (event.key !== 'Enter' && event.key !== ' ') return; if (shouldIgnoreCardNavigation(event)) return; event.preventDefault(); openFocusedProblem(question); }}>
                  <span className="premium-question-number">{questionNumber}</span>
                  <span className="premium-question-title">{question.title}</span>
                  <span className={`pill ${difficultyClassName(question.difficulty)}`}>{question.difficulty || 'Practice'}</span>
                  <span className="premium-question-status" role="img" aria-label={isCompleted ? 'Completed' : 'Not completed'}>{isCompleted ? '✓' : ''}</span>
                  <span className="premium-question-time">{getEstimatedTime(question)}</span>
                  <span className="premium-question-chevron" aria-hidden="true">›</span>
                </div>
              );
            })}
          </div>
          <div className="premium-question-footer"><p>Showing {totalQuestions ? pageStart + 1 : 0}-{pageEnd} of {totalQuestions}</p>{totalPages > 1 ? <nav className="pagination glass-lite premium-question-pagination" aria-label={`${topic.name} question pages`}><div className="pagination-controls"><Button className="ghost premium-pagination-arrow" onClick={() => goToPage(safePage - 1)} disabled={safePage === 1} aria-label="Previous page">←</Button>{pageNumbers.map((page) => <button key={page} type="button" className={`page-btn ${page === safePage ? 'active' : ''}`} onClick={() => goToPage(page)} aria-current={page === safePage ? 'page' : undefined}>{page}</button>)}<Button className="ghost premium-pagination-arrow" onClick={() => goToPage(safePage + 1)} disabled={safePage === totalPages} aria-label="Next page">→</Button></div></nav> : null}</div>
        </div>
      )}
      <TopicLearningGuide topic={topic} />
    </section>
  );
}

export default memo(TopicSection);
