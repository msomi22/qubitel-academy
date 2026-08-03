import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import ProblemBodyRenderer from './rich-problem/ProblemBodyRenderer.jsx';
import VisualRail from './visuals/VisualRail.jsx';
import { loadVisualWalkthrough } from '../services/visualWalkthroughService.js';
import { storageService } from '../services/storageService.js';

const TYPE_LABELS = {
  coding: 'Coding',
  mcq: 'Quick check',
  debugging: 'Debugging',
  trace: 'Trace',
  optimization: 'Optimization',
  'system-design': 'System design',
  'production-scenario': 'Production'
};

const SUMMARY_LIMIT = 128;

function optionLetter(index) {
  return String.fromCharCode(65 + index);
}

function compactText(value, limit = SUMMARY_LIMIT) {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  return normalized.length > limit ? `${normalized.slice(0, limit - 1).trim()}…` : normalized;
}

function getPrimaryPattern(question) {
  return question.primaryPattern || question.finalPattern || question.pattern || question.category || question.tags?.[0] || 'Practice';
}

function getProblemSummary(question) {
  return compactText(question.summary || question.shortSummary || question.scenario || question.question || question.starterThought);
}

function getDifficultyClass(difficulty) {
  const normalized = String(difficulty || '').toLowerCase();
  if (normalized.includes('easy')) return 'difficulty-pill difficulty-easy';
  if (normalized.includes('medium')) return 'difficulty-pill difficulty-medium';
  if (normalized.includes('hard')) return 'difficulty-pill difficulty-hard';
  return 'difficulty-pill';
}

function getDisplayTime(question) {
  if (question.estimatedTime) return question.estimatedTime;
  const seconds = Number(question.estimatedTimeSeconds ?? question.metadata?.estimatedTimeSeconds);
  return Number.isFinite(seconds) && seconds > 0 ? `${seconds}s timed quiz` : '10 min';
}

function ListBlock({ title, items, ordered = false }) {
  if (!items?.length) return null;
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <section className="workspace-block">
      <span className="mini-label">{title}</span>
      <Tag>{items.map((item) => <li key={item}>{item}</li>)}</Tag>
    </section>
  );
}

function TextBlock({ title, children, className = '' }) {
  if (!children) return null;
  return (
    <section className={`workspace-block ${className}`}>
      <span className="mini-label">{title}</span>
      <p>{children}</p>
    </section>
  );
}

function VisualMedia({ item }) {
  if (!item?.src) return null;
  const type = item.type || (item.src.endsWith('.mp4') || item.src.endsWith('.webm') ? 'video' : 'image');

  return (
    <figure className={`visual-media visual-media-${type}`}>
      {type === 'video' ? (
        <video src={item.src} poster={item.poster} controls={item.controls !== false} muted={item.muted !== false} loop={item.loop !== false} playsInline />
      ) : (
        <img src={item.src} alt={item.alt || item.caption || 'Visual explanation'} loading="lazy" />
      )}
      {item.caption ? <figcaption>{item.caption}</figcaption> : null}
    </figure>
  );
}

function VisualWalkthrough({ question }) {
  const [loadedVisual, setLoadedVisual] = useState(null);

  useEffect(() => {
    let active = true;
    setLoadedVisual(question.visualWalkthrough || null);

    if (!question.visualWalkthrough && question?.id) {
      loadVisualWalkthrough(question.id).then((visual) => {
        if (active) setLoadedVisual(visual);
      });
    }

    return () => {
      active = false;
    };
  }, [question.id, question.visualWalkthrough]);

  const visual = question.visualWalkthrough || loadedVisual;
  const hasStructuredVisual = Boolean(visual?.summary || visual?.steps?.length || visual?.media?.length || visual?.diagram?.frames?.length);
  if (!hasStructuredVisual) return null;

  return (
    <section className="learning-panel visual-walkthrough-panel">
      <div className="visual-walkthrough-header">
        <span className="mini-label">Visual clarity</span>
        <strong>{visual?.title || 'Mental model walkthrough'}</strong>
      </div>
      {visual?.summary ? <p className="visual-summary">{visual.summary}</p> : null}
      <VisualRail diagram={visual?.diagram} />
      {visual?.productionMapping?.length ? (
        <div className="production-mapping-panel">
          <span className="mini-label">Production relevance</span>
          <div className="production-mapping-grid">
            {visual.productionMapping.map((item) => <div className="production-chip" key={item}>{item}</div>)}
          </div>
        </div>
      ) : null}
      {visual?.steps?.length ? (
        <ol className="visual-step-list">
          {visual.steps.map((step, index) => (
            <li key={`${step.title || step.body}-${index}`}>
              <span>{index + 1}</span>
              <div>
                {step.title ? <strong>{step.title}</strong> : null}
                {step.body ? <p>{step.body}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}
      {visual?.media?.length ? (
        <div className="visual-media-grid">
          {visual.media.map((item, index) => <VisualMedia item={item} key={`${item.src}-${index}`} />)}
        </div>
      ) : null}
    </section>
  );
}

function McqBlock({ question, selected, onSelect, showExplanation, disabled }) {
  if (!question.options?.length) return null;

  const answered = selected !== null;
  const isCorrect = selected === question.correctAnswer;
  const correctLabel = question.options?.[question.correctAnswer]
    ? `${optionLetter(question.correctAnswer)}. ${question.options[question.correctAnswer]}`
    : 'Not configured';

  return (
    <>
      <div className="option-list" role="radiogroup" aria-label={question.title}>
        {question.options.map((option, index) => {
          const chosen = selected === index;
          const correct = question.correctAnswer === index;
          const reveal = answered || showExplanation;
          const className = [
            'option-btn',
            chosen ? 'selected' : '',
            reveal && correct ? 'correct' : '',
            reveal && chosen && !correct ? 'wrong' : ''
          ].filter(Boolean).join(' ');

          return (
            <button key={option} type="button" className={className} aria-pressed={chosen} disabled={disabled} onClick={() => onSelect(index)}>
              <strong>{optionLetter(index)}</strong>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {answered ? (
        <div className={`answer-banner ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? 'Correct.' : 'Not quite.'} Best answer: <strong>{correctLabel}</strong>
        </div>
      ) : null}
    </>
  );
}

function QuestionCard({ question, completed, onToggle, disableCardNavigation = false, compact = false }) {
  const [selected, setSelected] = useState(() => storageService.getSelectedAnswer(question.id));
  const [activePanel, setActivePanel] = useState(null);
  const navigate = useNavigate();

  const isMcq = question.type === 'mcq' && question.options?.length;
  const quizLocked = Boolean(completed);
  const showHints = activePanel === 'hints';
  const showThinking = activePanel === 'thinking';
  const showSolution = activePanel === 'solution';
  const typeLabel = TYPE_LABELS[question.type] || 'Practice';
  const typeClass = `type-${question.type || 'learning'}`;
  const difficultyClass = getDifficultyClass(question.difficulty);
  const primaryPattern = getPrimaryPattern(question);
  const summary = getProblemSummary(question);

  useEffect(() => {
    setSelected(storageService.getSelectedAnswer(question.id));
  }, [question.id]);

  function togglePanel(panel) {
    setActivePanel((current) => (current === panel ? null : panel));
  }

  function handleMcqSelect(index) {
    if (quizLocked) return;

    setSelected(index);
    storageService.setSelectedAnswer(question.id, index);

    if (!completed) {
      onToggle?.(question.id);
    }
  }

  function openFocusedProblem() {
    if (!disableCardNavigation && question?.id) navigate(`/practice/${question.id}`);
  }

  function handleCardClick(event) {
    if (event.target.closest('button, a, input, select, textarea, summary, details, [data-no-card-nav]')) return;
    openFocusedProblem();
  }

  function handleCardKeyDown(event) {
    if (disableCardNavigation || event.key !== 'Enter') return;
    if (event.target.closest('button, a, input, select, textarea, summary, details, [data-no-card-nav]')) return;
    openFocusedProblem();
  }

  const primaryActionLabel = useMemo(() => {
    if (question.type === 'coding') return 'Reveal intuition';
    if (question.type === 'optimization') return 'Reveal optimization path';
    if (question.type === 'trace') return 'Reveal walkthrough';
    if (question.type === 'debugging') return 'Reveal debugging lens';
    return 'Reveal thinking';
  }, [question.type]);

  if (compact) {
    return (
      <article className={`question-card practice-workspace compact-practice-card glass-lite ${completed ? 'done' : ''} ${disableCardNavigation ? '' : 'clickable-practice-card'}`} role={disableCardNavigation ? undefined : 'button'} tabIndex={disableCardNavigation ? undefined : 0} onClick={handleCardClick} onKeyDown={handleCardKeyDown} aria-label={disableCardNavigation ? undefined : `Open ${question.title} practice`}>
        <div className="q-top">
          <div className="meta-strip">
            <span className={`pill ${difficultyClass}`}>{question.difficulty || 'Practice'}</span>
            <span className={`pill type-pill ${typeClass}`}>{primaryPattern}</span>
          </div>
          <button className="mark" onClick={() => onToggle?.(question.id)}>{completed ? 'Reset progress' : 'Mark complete'}</button>
        </div>
        <h3>{question.title}</h3>
        {summary ? <p className="question-text">{summary}</p> : null}
        <div className="meta-strip" aria-label="Practice type"><span className="time-pill">{typeLabel}</span></div>
      </article>
    );
  }

  return (
    <article className={`question-card practice-workspace glass-lite ${completed ? 'done' : ''} ${quizLocked ? 'locked' : ''} ${disableCardNavigation ? '' : 'clickable-practice-card'}`} role={disableCardNavigation ? undefined : 'button'} tabIndex={disableCardNavigation ? undefined : 0} onClick={handleCardClick} onKeyDown={handleCardKeyDown} aria-label={disableCardNavigation ? undefined : `Open ${question.title} practice`}>
      <div className="q-top">
        <div className="meta-strip">
          <span className={`pill type-pill ${typeClass}`}>{typeLabel}</span>
          <span className={`pill ${difficultyClass}`}>{question.difficulty}</span>
          <span className="time-pill">⏱ {getDisplayTime(question)}</span>
        </div>
        <button className="mark" onClick={() => onToggle?.(question.id)}>{completed ? 'Reset progress' : 'Mark complete'}</button>
      </div>

      <h3>{question.title}</h3>
      <TextBlock title="Scenario" className="scenario-box">{question.scenario}</TextBlock>
      <TextBlock title="Practice" className="question-prompt">{question.question}</TextBlock>
      <ProblemBodyRenderer body={question.body} rendering={question.rendering} />
      <VisualWalkthrough question={question} />
      <TextBlock title="Think first" className="think-box">{question.starterThought}</TextBlock>

      {isMcq ? (
        <McqBlock question={question} selected={selected} onSelect={handleMcqSelect} showExplanation={showSolution} disabled={quizLocked} />
      ) : (
        <div className="practice-mode-banner"><strong>No answer input needed.</strong><span> Pause, reason through the approach, then reveal hints and the explanation journey.</span></div>
      )}

      <div className="question-actions">
        <Button className={showHints ? 'ghost active-action' : 'ghost'} onClick={() => togglePanel('hints')}>{showHints ? '✓ Hints active' : 'Show hints'}</Button>
        <Button className={showThinking ? 'ghost active-action' : 'ghost'} onClick={() => togglePanel('thinking')}>{showThinking ? '✓ Thinking active' : primaryActionLabel}</Button>
        <Button className={showSolution ? 'ghost active-action' : 'ghost'} onClick={() => togglePanel('solution')}>{showSolution ? '✓ Explanation active' : 'Reveal full explanation'}</Button>
      </div>

      {showHints ? <ListBlock title="Hints" items={question.hints} ordered /> : null}

      {showThinking ? (
        <section className="learning-panel thinking-panel">
          <TextBlock title="Intuition">{question.intuition}</TextBlock>
          <TextBlock title="Visual mental model" className="visual-model">{question.visualExplanation}</TextBlock>
          <ListBlock title="Step-by-step breakdown" items={question.stepByStepBreakdown} ordered />
          <TextBlock title="Brute-force thought">{question.bruteForceThought}</TextBlock>
          <TextBlock title="Optimization journey">{question.optimizationJourney}</TextBlock>
        </section>
      ) : null}

      {showSolution ? (
        <section className="learning-panel explanation-panel">
          <div className="solution-header">
            <span className="mini-label">Final mental model</span>
            <strong>{question.finalPattern}</strong>
          </div>
          <p>{question.explanation}</p>
          <TextBlock title="Complexity / trade-off analysis">{question.complexityAnalysis}</TextBlock>
          <div className="insight-grid">
            <div><strong>Engineering insight</strong><p>{question.engineeringInsight}</p></div>
            <div><strong>Production reality</strong><p>{question.productionReality}</p></div>
            <div><strong>Common mistake</strong><p>{question.commonMistake}</p></div>
            <div><strong>Follow-up question</strong><p>{question.followUpQuestion}</p></div>
          </div>
          <ListBlock title="Common mistakes" items={question.commonMistakes} />
          <ListBlock title="Follow-up questions" items={question.followUpQuestions} ordered />
          {question.relatedConcepts?.length ? <div className="concept-row">{question.relatedConcepts.map(concept => <span key={concept}>{concept}</span>)}</div> : null}
          {question.references?.length ? (
            <details className="reference-box">
              <summary>References</summary>
              <ul>{question.references.map(ref => <li key={ref}>{ref}</li>)}</ul>
            </details>
          ) : null}
        </section>
      ) : null}

      <div className="tags">{question.tags?.map(t => <span key={t}>#{t}</span>)}</div>
    </article>
  );
}

export default memo(QuestionCard);
