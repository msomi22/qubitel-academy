import { useEffect, useMemo, useRef, useState } from 'react';
import ReadAloudButton from './cbc/ReadAloudButton.jsx';
import CodeBlock from './code/CodeBlock.jsx';
import VisualRail from './visuals/VisualRail.jsx';
import ProblemBlockRenderer from './rich-problem/ProblemBlockRenderer.jsx';
import { loadVisualWalkthrough } from '../services/visualWalkthroughService.js';
import { storageService } from '../services/storageService.js';
import { getFocusedProblemTabs, getReinforcementCardsForTab } from '../problems/problemTabSections.js';

function optionLetter(index) {
  return String.fromCharCode(65 + index);
}

function list(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value];
}

function text(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map(text).filter(Boolean).join(' ');
  if (typeof value === 'object') return Object.values(value).map(text).filter(Boolean).join(' | ');
  return String(value);
}

function getTimedLimitSeconds(question) {
  const seconds = Number(question.estimatedTimeSeconds ?? question.metadata?.estimatedTimeSeconds);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
}

function formatIndexedString(value) {
  const raw = text(value);
  if (!raw.includes('barfoofoobarthefoobarman')) return raw;

  const s = 'barfoofoobarthefoobarman';
  const indexRow = Array.from(s, (_, index) => String(index).padStart(2, ' ')).join(' ');
  const charRow = Array.from(s, (char) => char.padStart(2, ' ')).join(' ');

  return `We are given:

s = "${s}"
words = ["bar", "foo", "the"]

First, look at the string by character index:

Index: ${indexRow}
Chars: ${charRow}

Every word has length 3, so a valid substring must use 9 characters: 3 words × 3 characters.

We need substrings made from all words exactly once: ["bar", "foo", "the"].

Starting at index 6 gives "foobarthe" = "foo" + "bar" + "the".
Starting at index 9 gives "barthefoo" = "bar" + "the" + "foo".
Starting at index 12 gives "thefoobar" = "the" + "foo" + "bar".

So the answer is [6, 9, 12].`;
}

function isVisualRichBlock(block) {
  return block?.type === 'diagram' || block?.type === 'flow' || block?.type === 'image';
}

function RichBodyBlocks({ blocks, mode = 'overview' }) {
  const rows = list(blocks).filter((block) => {
    const visual = isVisualRichBlock(block);
    return mode === 'visual' ? visual : !visual;
  });

  if (!rows.length) return null;

  return (
    <div className="focused-rich-body-stack">
      {rows.map((block, index) => (
        <ProblemBlockRenderer
          block={block}
          index={index}
          key={`${block?.type || 'block'}-${block?.title || block?.label || index}`}
        />
      ))}
    </div>
  );
}

function TextBlock({ title, children, className = '', preserveWhitespace = false }) {
  const value = preserveWhitespace ? formatIndexedString(children) : text(children);
  if (!value) return null;
  return (
    <section className={`workspace-block ${className}`}>
      <span className="mini-label">{title}</span>
      {preserveWhitespace ? (
        <pre
          className="workspace-preformatted-text"
          style={{
            margin: 0,
            maxWidth: '100%',
            overflowX: 'auto',
            whiteSpace: 'pre',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '0.95em',
            lineHeight: 1.7
          }}
        >
          {value}
        </pre>
      ) : (
        <p>{value}</p>
      )}
    </section>
  );
}

function ListBlock({ title, items, ordered = false, className = '' }) {
  const rows = list(items);
  if (!rows.length) return null;
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <section className={`workspace-block ${className}`}>
      <span className="mini-label">{title}</span>
      <Tag>{rows.map((row, index) => <li key={`${text(row)}-${index}`}>{text(row)}</li>)}</Tag>
    </section>
  );
}

function HighlightedSegments({ segments }) {
  const rows = list(segments);
  if (!rows.length) return null;

  return (
    <span className="example-highlighted-sequence" aria-label={rows.map((segment) => text(segment?.text || segment)).join('')}>
      {rows.map((segment, index) => {
        const value = typeof segment === 'object' ? segment.text : segment;
        const highlighted = typeof segment === 'object' && segment.highlight;
        return (
          <span className={highlighted ? 'example-highlight-match' : ''} key={`${value}-${index}`}>
            {value}
          </span>
        );
      })}
    </span>
  );
}

function ExampleBlock({ items }) {
  const rows = list(items);
  if (!rows.length) return null;

  return (
    <section className="workspace-block focused-examples-block">
      <span className="mini-label">Examples</span>
      <ul>
        {rows.map((row, index) => {
          const hasHighlightedInput = row?.highlightedInput?.segments?.length;
          if (!hasHighlightedInput) return <li key={`${text(row)}-${index}`}>{text(row)}</li>;

          return (
            <li className="focused-example-item" key={`${row.input || index}-${index}`}>
              <div className="focused-example-main">
                <span>{row.highlightedInput.prefix || ''}</span>
                <HighlightedSegments segments={row.highlightedInput.segments} />
                <span>{row.highlightedInput.suffix || ''}</span>
                {row.output ? <span className="focused-example-output">→ {text(row.output)}</span> : null}
              </div>
              {row.explanation ? <p>{text(row.explanation)}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function VisualInputStrip({ inputs }) {
  const rows = list(inputs);
  if (!rows.length) return null;

  return (
    <div className="visual-input-strip" aria-label="Walkthrough input values">
      {rows.map((item, index) => {
        const label = typeof item === 'object' ? item.label : `input ${index + 1}`;
        const value = typeof item === 'object' ? item.value : item;
        return (
          <div className="visual-input-chip" key={`${label}-${text(value)}-${index}`}>
            <small>{label}</small>
            <code>{text(value)}</code>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState({ title, children }) {
  return (
    <section className="workspace-empty-state">
      <span className="mini-label">{title}</span>
      <p>{children}</p>
    </section>
  );
}

function McqBlock({ question, selected, onSelect, disabled = false, timedAttempt = null }) {
  if (question.type !== 'mcq' || !question.options?.length) return null;
  const answered = selected !== null;
  const timedOut = timedAttempt?.status === 'timeout';
  const shouldReveal = answered || timedOut;
  const isCorrect = selected === question.correctAnswer;
  const correctLabel = question.options?.[question.correctAnswer]
    ? `${optionLetter(question.correctAnswer)}. ${question.options[question.correctAnswer]}`
    : 'Not configured';

  return (
    <section className="focused-mcq-panel">
      <span className="mini-label">Choose your answer</span>
      <div className="option-list" role="radiogroup" aria-label={question.title}>
        {question.options.map((option, index) => {
          const chosen = selected === index;
          const correct = question.correctAnswer === index;
          const className = [
            'option-btn',
            chosen ? 'selected' : '',
            shouldReveal && correct ? 'correct' : '',
            shouldReveal && chosen && !correct ? 'wrong' : ''
          ].filter(Boolean).join(' ');

          return (
            <button
              key={`${option}-${index}`}
              type="button"
              className={className}
              aria-pressed={chosen}
              disabled={disabled}
              onClick={() => onSelect(index)}
            >
              <strong>{optionLetter(index)}</strong>
              <span>{option}</span>
              {shouldReveal && correct ? <em>Correct</em> : null}
              {shouldReveal && chosen && !correct ? <em>Selected</em> : null}
            </button>
          );
        })}
      </div>
      {timedOut ? (
        <div className="answer-banner wrong" role="status">
          Time is up. The quiz is closed and this attempt is marked failed. Best answer: <strong>{correctLabel}</strong>
        </div>
      ) : answered ? (
        <div className={`answer-banner ${isCorrect ? 'correct' : 'wrong'}`} role="status">
          {isCorrect ? 'Correct.' : 'Not quite.'} Best answer: <strong>{correctLabel}</strong>
        </div>
      ) : null}
    </section>
  );
}

function VisualBlock({ question, showFallback = false }) {
  const [loadedVisual, setLoadedVisual] = useState(null);
  useEffect(() => {
    let active = true;
    setLoadedVisual(question.visualWalkthrough || null);
    if (!question.visualWalkthrough && question?.id) {
      loadVisualWalkthrough(question.id).then((visual) => {
        if (active) setLoadedVisual(visual);
      });
    }
    return () => { active = false; };
  }, [question.id, question.visualWalkthrough]);

  const visual = question.visualWalkthrough || loadedVisual;
  const fallbackVisualExplanation = text(question.visualExplanation);
  const hasStructuredVisual = Boolean(visual?.summary || visual?.steps?.length || visual?.diagram?.frames?.length || visual?.image);
  const hasVisualExplanation = fallbackVisualExplanation.trim().length > 0;

  if (!hasStructuredVisual && !hasVisualExplanation) {
    return showFallback ? <EmptyState title="Visual walkthrough">Visual walkthrough is not available for this problem yet.</EmptyState> : null;
  }

  return (
    <section className="learning-panel visual-walkthrough-panel reference-visual-panel">
      <div className="visual-walkthrough-header"><span className="mini-label">Visual clarity</span><strong>{visual?.title || 'Mental model walkthrough'}</strong></div>
      {visual?.summary ? <p className="visual-summary">{visual.summary}</p> : null}
      <VisualInputStrip inputs={visual?.inputs} />
      {hasVisualExplanation ? <p className="visual-summary">{fallbackVisualExplanation}</p> : null}
      {visual?.image ? <img className="visual-image-panel" src={visual.image} alt={visual.imageAlt || visual.title || 'Problem visual walkthrough'} loading="lazy" /> : null}
      <VisualRail diagram={visual?.diagram} />
      {visual?.steps?.length ? (
        <ol className="visual-step-list">
          {visual.steps.map((step, index) => (
            <li key={`${step.title || step.body}-${index}`}><span>{index + 1}</span><div>{step.title ? <strong>{step.title}</strong> : null}{step.body ? <p>{step.body}</p> : null}</div></li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

function SupportPanel({ question }) {
  const concepts = list(question.relatedConcepts).slice(0, 4);
  const tags = list(question.tags).slice(0, 3);

  if (!concepts.length && !tags.length) return null;

  return (
    <aside className="problem-support-panel" aria-label="Problem metadata">
      {concepts.length ? <section><span className="mini-label">Concepts</span><div className="compact-chip-row">{concepts.map((concept) => <span key={text(concept)}>{text(concept)}</span>)}</div></section> : null}
      {tags.length ? <section><span className="mini-label">Tags</span><div className="compact-chip-row muted">{tags.map((tag) => <span key={text(tag)}>#{text(tag)}</span>)}</div></section> : null}
    </aside>
  );
}

function ApproachReinforcementCards({ question }) {
  const cards = getReinforcementCardsForTab(question, 'approach');

  if (!cards.length) return null;

  return (
    <aside className="learning-reinforcement-stack">
      {cards.map(([title, value]) => Array.isArray(value)
        ? <ListBlock key={title} title={title} items={value} />
        : <TextBlock key={title} title={title}>{value}</TextBlock>)}
    </aside>
  );
}

function TimedQuizStatus({ seconds, locked }) {
  const safeSeconds = Math.max(0, seconds);
  const label = locked && safeSeconds === 0 ? 'Quiz closed' : 'Time left';

  return (
    <span className={`time-pill quiz-timer-pill ${locked ? 'locked' : ''}`} aria-live="polite" title="Quiz countdown">
      <strong>⏱ {label}:</strong> {safeSeconds}s
    </span>
  );
}

export default function FocusedProblemWorkspace({ question, completed, onToggle, onMarkComplete, hideTopline = false, problemHeader = null }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selected, setSelected] = useState(() => storageService.getSelectedAnswer(question.id));
  const [timedAttempt, setTimedAttempt] = useState(() => storageService.getTimedQuestionAttempt(question.id));
  const [remainingSeconds, setRemainingSeconds] = useState(() => getTimedLimitSeconds(question));
  const [focusMode, setFocusMode] = useState(false);
  const lastCompletedQuestionId = useRef('');
  const codeContent = question.solutionCode || question.code || question.pseudocode || question.approachPseudocode;
  const explanation = question.explanation || question.solutionExplanation || question.answerExplanation || question.finalReasoning;
  const hasMcq = question.type === 'mcq' && question.options?.length;
  const timeLimitSeconds = getTimedLimitSeconds(question);
  const isTimedMcq = hasMcq && timeLimitSeconds > 0;
  const timedAttemptComplete = Boolean(timedAttempt?.status);
  const quizLocked = isTimedMcq && (timedAttemptComplete || completed || remainingSeconds <= 0);
  const richBody = list(question.body);
  const isAlphabetMastery = richBody.some((block) => block?.type === 'alphabetMastery');
  const hasOverviewRichBody = richBody.some((block) => !isVisualRichBlock(block));
  const hasVisualRichBody = richBody.some(isVisualRichBlock);
  const hasVisualExplanation = text(question.visualExplanation).trim().length > 0;

  const tabs = useMemo(() => getFocusedProblemTabs({
    question,
    codeContent,
    explanation,
    hasMcq,
    hasVisualRichBody: hasVisualRichBody || hasVisualExplanation
  }), [codeContent, explanation, hasMcq, hasVisualRichBody, hasVisualExplanation, question]);

  const displayTabs = useMemo(
    () => tabs.map(([id, label]) => [id, id === 'solution' ? 'Practice Guide' : label]),
    [tabs]
  );

  useEffect(() => {
    if (!tabs.some(([id]) => id === activeTab)) setActiveTab(tabs[0]?.[0] || 'overview');
  }, [activeTab, tabs]);

  useEffect(() => {
    const storedSelected = storageService.getSelectedAnswer(question.id);
    const storedAttempt = storageService.getTimedQuestionAttempt(question.id);
    setSelected(storedSelected);
    setTimedAttempt(storedAttempt);
    setRemainingSeconds(storedAttempt?.status || storedSelected !== null ? 0 : getTimedLimitSeconds(question));
    lastCompletedQuestionId.current = completed ? question.id : '';
  }, [completed, question.id]);

  useEffect(() => {
    if (!isTimedMcq || selected !== null || timedAttemptComplete || completed || remainingSeconds <= 0) return undefined;

    const timer = window.setTimeout(() => {
      setRemainingSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [completed, isTimedMcq, remainingSeconds, selected, timedAttemptComplete]);

  useEffect(() => {
    if (!isTimedMcq || selected !== null || timedAttemptComplete || completed || remainingSeconds !== 0) return;

    const attempt = storageService.setTimedQuestionAttempt(question.id, {
      status: 'timeout',
      selectedAnswer: null,
      correctAnswer: question.correctAnswer,
      completedAt: new Date().toISOString()
    });

    setTimedAttempt(attempt);
    setActiveTab('answer');

    if (lastCompletedQuestionId.current !== question.id) {
      lastCompletedQuestionId.current = question.id;
      onMarkComplete?.(question.id);
    }
  }, [completed, isTimedMcq, onMarkComplete, question.correctAnswer, question.id, remainingSeconds, selected, timedAttemptComplete]);

  function handleMcqSelect(answerIndex) {
    if (quizLocked) return;

    setSelected(answerIndex);
    storageService.setSelectedAnswer(question.id, answerIndex);

    if (isTimedMcq) {
      const attempt = storageService.setTimedQuestionAttempt(question.id, {
        status: answerIndex === question.correctAnswer ? 'correct' : 'incorrect',
        selectedAnswer: answerIndex,
        correctAnswer: question.correctAnswer,
        completedAt: new Date().toISOString()
      });

      setTimedAttempt(attempt);
      setRemainingSeconds(0);
      setActiveTab('answer');
    }

    if (!completed && lastCompletedQuestionId.current !== question.id) {
      lastCompletedQuestionId.current = question.id;
      onMarkComplete?.(question.id);
    }
  }

  const headerControls = problemHeader && typeof problemHeader === 'object' && !problemHeader.type ? problemHeader : null;

  return (
    <article className={`focused-problem-workspace glass-lite ${completed ? 'done' : ''} ${focusMode ? 'focus-mode' : ''}`}>
      {!headerControls ? problemHeader : null}

      {!hideTopline ? (
        <div className="focused-problem-topline">
          <div className="meta-strip">
            <span className="pill">{question.difficulty}</span>
            {!isTimedMcq ? <span className="time-pill">Time: {question.estimatedTime || '10 min'}</span> : null}
          </div>
          <button className="mark" onClick={() => onToggle?.(question.id)}>{completed ? 'Reset progress' : 'Mark complete'}</button>
        </div>
      ) : null}
      <div className="focused-tabs-wrap learning-node-problem-header" aria-label={headerControls ? 'Problem navigation' : undefined}>
        <div className="focused-tabs learning-node-problem-tabs" role="tablist" aria-label="Problem learning sections">{headerControls?.backControl}{displayTabs.map(([id, label]) => <button key={id} type="button" className={`focused-tab-btn ${activeTab === id ? 'active' : ''}`} role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)}>{label}</button>)}</div>
        <div className="focused-tabs-actions">
          {isTimedMcq ? <TimedQuizStatus seconds={remainingSeconds} locked={quizLocked} /> : null}
          <button type="button" className={`focus-mode-toggle ${focusMode ? 'active' : ''}`} aria-pressed={focusMode} onClick={() => setFocusMode((current) => !current)}>{focusMode ? 'Exit focus' : 'Focus mode'}</button>
          {headerControls?.doneControl}
        </div>
      </div>
      {headerControls?.progressControl}

      <div className="focused-workspace-layout">
        <div className="focused-tab-content">
          {activeTab === 'overview' ? <div className="focused-panel-stack"><ReadAloudButton question={question} /><TextBlock title="Scenario" className="scenario-box" preserveWhitespace>{question.scenario}</TextBlock>{!hasOverviewRichBody ? <TextBlock title={hasMcq ? 'Question' : 'Problem'} className="problem-prompt">{question.question}</TextBlock> : null}<RichBodyBlocks blocks={question.body} mode="overview" />{hasMcq ? <McqBlock question={question} selected={selected} onSelect={handleMcqSelect} disabled={quizLocked} timedAttempt={timedAttempt} /> : null}<ExampleBlock items={question.examples} /><ListBlock title="Constraints" items={question.constraints} /></div> : null}
          {activeTab === 'visual' ? <div className="focused-panel-stack">{hasVisualRichBody ? <RichBodyBlocks blocks={question.body} mode="visual" /> : <VisualBlock question={question} showFallback />}{hasVisualRichBody ? <VisualBlock question={question} /> : null}</div> : null}
          {activeTab === 'intuition' ? <div className="focused-two-col"><TextBlock title="1. Think first" className="think-box">{question.starterThought}</TextBlock><TextBlock title="2. Mental picture">{question.mentalPicture}</TextBlock><TextBlock title="3. Why this pattern fits">{question.intuition}</TextBlock><TextBlock title="4. Recognition signal">{question.patternSignal}</TextBlock><TextBlock title="5. Invariant to maintain">{question.invariant}</TextBlock></div> : null}
          {activeTab === 'approach' ? <div className="focused-panel-stack"><ListBlock title="Step-by-step breakdown" items={question.stepByStepBreakdown} ordered /><div className="approach-card-stack"><TextBlock title="Brute-force thought">{question.bruteForceThought}</TextBlock><TextBlock title="Optimization journey">{question.optimizationJourney}</TextBlock><ListBlock title="Edge cases" items={question.edgeCases} /></div><ApproachReinforcementCards question={question} /></div> : null}
          {activeTab === 'solution' && isAlphabetMastery ? <div className="focused-panel-stack"><ListBlock title="How to practise" items={['Tap a letter card to hear the letter name.', 'Tap the picture card to hear the sound word.', 'Repeat the sound aloud.', 'Try Auto Read to listen through the cards.', 'Keep practising until all cards are complete.']} ordered /></div> : null}
          {activeTab === 'solution' && !isAlphabetMastery ? <div className="focused-panel-stack"><TextBlock title="Practice Guide">{explanation}</TextBlock><CodeBlock code={codeContent || 'No code sample is configured yet.'} language={question.language || 'java'} title="Implementation notes" className="workspace-block focused-code-block" /><RichBodyBlocks blocks={question.solutionBody || question.solutionBlocks} mode="overview" /></div> : null}
          {activeTab === 'answer' ? <div className="focused-panel-stack"><McqBlock question={question} selected={selected} onSelect={handleMcqSelect} disabled={quizLocked} timedAttempt={timedAttempt} /><TextBlock title="Explanation">{explanation || question.intuition}</TextBlock><TextBlock title="Final takeaway">{question.finalTakeaway || question.keyTakeaway || question.takeaway}</TextBlock><ListBlock title="Why other options are wrong" items={question.optionExplanations || question.wrongOptionExplanations || question.distractorExplanations} /></div> : null}
          {activeTab === 'complexity' ? <div className="focused-two-col"><TextBlock title="Complexity / trade-off analysis">{question.complexityAnalysis}</TextBlock><TextBlock title="Production reality">{question.productionReality}</TextBlock><TextBlock title="Common mistake">{question.commonMistake}</TextBlock></div> : null}
        </div>
        {!focusMode ? <SupportPanel question={question} /> : null}
      </div>
    </article>
  );
}
