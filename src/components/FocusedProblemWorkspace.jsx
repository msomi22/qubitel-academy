import { useEffect, useMemo, useRef, useState } from 'react';
import CodeBlock from './code/CodeBlock.jsx';
import VisualRail from './visuals/VisualRail.jsx';
import ProblemBlockRenderer from './rich-problem/ProblemBlockRenderer.jsx';
import { loadVisualWalkthrough } from '../services/visualWalkthroughService.js';
import { storageService } from '../services/storageService.js';
import { getFocusedProblemTabs, getReinforcementCardsForTab, hasProblemTabContent } from '../problems/problemTabSections.js';

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

function has(value) {
  return text(value).trim().length > 0;
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

function TextBlock({ title, children, className = '' }) {
  const value = text(children);
  if (!value) return null;
  return (
    <section className={`workspace-block ${className}`}>
      <span className="mini-label">{title}</span>
      <p>{value}</p>
    </section>
  );
}

function ListBlock({ title, items, ordered = false }) {
  const rows = list(items);
  if (!rows.length) return null;
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <section className="workspace-block">
      <span className="mini-label">{title}</span>
      <Tag>{rows.map((row, index) => <li key={`${text(row)}-${index}`}>{text(row)}</li>)}</Tag>
    </section>
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

function McqBlock({ question, selected, onSelect }) {
  if (question.type !== 'mcq' || !question.options?.length) return null;
  const answered = selected !== null;
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
          const className = ['option-btn', chosen ? 'selected' : '', answered && correct ? 'correct' : '', answered && chosen && !correct ? 'wrong' : ''].filter(Boolean).join(' ');
          return (
            <button key={`${option}-${index}`} type="button" className={className} aria-pressed={chosen} onClick={() => onSelect(index)}>
              <strong>{optionLetter(index)}</strong>
              <span>{option}</span>
              {answered && correct ? <em>Correct</em> : null}
              {answered && chosen && !correct ? <em>Selected</em> : null}
            </button>
          );
        })}
      </div>
      {answered ? (
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
  const hasVisual = Boolean(visual?.summary || visual?.steps?.length || visual?.diagram?.frames?.length || visual?.image);
  if (!hasVisual) return showFallback ? <EmptyState title="Visual walkthrough">Visual walkthrough is not available for this problem yet.</EmptyState> : null;

  return (
    <section className="learning-panel visual-walkthrough-panel reference-visual-panel">
      <div className="visual-walkthrough-header">
        <span className="mini-label">Visual clarity</span>
        <strong>{visual?.title || 'Mental model walkthrough'}</strong>
      </div>
      {visual?.summary ? <p className="visual-summary">{visual.summary}</p> : null}
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
  const summary = question.patternSummary || question.intuition || question.visualExplanation;
  if (!summary && !concepts.length && !tags.length) return null;
  return (
    <aside className="problem-support-panel" aria-label="Problem support details">
      <TextBlock title="Pattern summary">{summary}</TextBlock>
      {concepts.length ? <section><span className="mini-label">Concepts</span><div className="compact-chip-row">{concepts.map((concept) => <span key={text(concept)}>{text(concept)}</span>)}</div></section> : null}
      {tags.length ? <section><span className="mini-label">Tags</span><div className="compact-chip-row muted">{tags.map((tag) => <span key={text(tag)}>#{text(tag)}</span>)}</div></section> : null}
    </aside>
  );
}

function ReinforcementCards({ question, activeTab }) {
  const cards = getReinforcementCardsForTab(question, activeTab);

  if (!cards.length) return null;

  return (
    <aside className="learning-reinforcement-grid">
      {cards.map(([title, value]) => Array.isArray(value)
        ? <ListBlock key={title} title={title} items={value} />
        : <TextBlock key={title} title={title}>{value}</TextBlock>)}
    </aside>
  );
}

export default function FocusedProblemWorkspace({ question, completed, onToggle, onMarkComplete, hideTopline = false }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selected, setSelected] = useState(() => storageService.getSelectedAnswer(question.id));
  const [focusMode, setFocusMode] = useState(false);
  const lastCompletedQuestionId = useRef('');
  const codeContent = question.solutionCode || question.code || question.pseudocode || question.approachPseudocode;
  const explanation = question.explanation || question.solutionExplanation || question.answerExplanation || question.finalReasoning;
  const hasMcq = question.type === 'mcq' && question.options?.length;
  const richBody = list(question.body);
  const hasOverviewRichBody = richBody.some((block) => !isVisualRichBlock(block));
  const hasVisualRichBody = richBody.some(isVisualRichBlock);

  const tabs = useMemo(() => getFocusedProblemTabs({
    question,
    codeContent,
    explanation,
    hasMcq,
    hasVisualRichBody
  }), [codeContent, explanation, hasMcq, hasVisualRichBody, question]);

  useEffect(() => {
    if (!tabs.some(([id]) => id === activeTab)) setActiveTab(tabs[0]?.[0] || 'overview');
  }, [activeTab, tabs]);

  useEffect(() => {
    setSelected(storageService.getSelectedAnswer(question.id));
    lastCompletedQuestionId.current = completed ? question.id : '';
  }, [completed, question.id]);

  function handleMcqSelect(answerIndex) {
    setSelected(answerIndex);
    storageService.setSelectedAnswer(question.id, answerIndex);

    if (!completed && lastCompletedQuestionId.current !== question.id) {
      lastCompletedQuestionId.current = question.id;
      onMarkComplete?.(question.id);
    }
  }

  return (
    <article className={`focused-problem-workspace glass-lite ${completed ? 'done' : ''} ${focusMode ? 'focus-mode' : ''}`}>
      {!hideTopline ? <div className="focused-problem-topline"><div className="meta-strip"><span className="pill">{question.difficulty}</span><span className="time-pill">Time: {question.estimatedTime || '10 min'}</span></div><button className="mark" onClick={() => onToggle?.(question.id)}>{completed ? 'Reset progress' : 'Mark complete'}</button></div> : null}
      <div className="focused-tabs-wrap">
        <div className="focused-tabs" role="tablist" aria-label="Problem learning sections">{tabs.map(([id, label]) => <button key={id} type="button" className={`focused-tab-btn ${activeTab === id ? 'active' : ''}`} role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)}>{label}</button>)}</div>
        <button type="button" className={`focus-mode-toggle ${focusMode ? 'active' : ''}`} aria-pressed={focusMode} onClick={() => setFocusMode((current) => !current)}>{focusMode ? 'Exit focus' : 'Focus mode'}</button>
      </div>

      <div className="focused-workspace-layout">
        <div className="focused-tab-content">
          {activeTab === 'overview' ? <div className="focused-panel-stack"><div className="focused-two-col"><TextBlock title="Scenario" className="scenario-box">{question.scenario}</TextBlock>{!hasOverviewRichBody ? <TextBlock title={hasMcq ? 'Question' : 'Problem'} className="question-prompt">{question.question}</TextBlock> : null}</div><RichBodyBlocks blocks={question.body} mode="overview" />{hasMcq ? <McqBlock question={question} selected={selected} onSelect={handleMcqSelect} /> : null}<ListBlock title="Examples" items={question.examples} /><ListBlock title="Constraints" items={question.constraints} /></div> : null}
          {activeTab === 'visual' ? <div className="focused-panel-stack">{hasVisualRichBody ? <RichBodyBlocks blocks={question.body} mode="visual" /> : <VisualBlock question={question} showFallback />}{hasVisualRichBody ? <VisualBlock question={question} /> : null}</div> : null}
          {activeTab === 'intuition' ? <div className="focused-two-col"><TextBlock title="Think first" className="think-box">{question.starterThought}</TextBlock><TextBlock title="Why this pattern fits">{question.intuition || question.visualExplanation}</TextBlock><TextBlock title="Recognition signal">{question.patternSignal}</TextBlock><TextBlock title="Invariant to maintain">{question.invariant}</TextBlock></div> : null}
          {activeTab === 'approach' ? <div className="focused-panel-stack"><ListBlock title="Step-by-step breakdown" items={question.stepByStepBreakdown} ordered /><div className="focused-two-col"><TextBlock title="Brute-force thought">{question.bruteForceThought}</TextBlock><TextBlock title="Optimization journey">{question.optimizationJourney}</TextBlock><TextBlock title="Edge cases">{question.edgeCases}</TextBlock></div></div> : null}
          {activeTab === 'solution' ? <div className="focused-panel-stack"><TextBlock title="Solution explanation">{explanation}</TextBlock><CodeBlock code={codeContent || 'No code sample is configured yet.'} language={question.language || 'java'} title="Implementation notes" className="workspace-block focused-code-block" /></div> : null}
          {activeTab === 'answer' ? <div className="focused-panel-stack"><McqBlock question={question} selected={selected} onSelect={handleMcqSelect} /><TextBlock title="Explanation">{explanation || question.intuition}</TextBlock><ListBlock title="Why other options are wrong" items={question.optionExplanations || question.wrongOptionExplanations} /></div> : null}
          {activeTab === 'complexity' ? <div className="focused-two-col"><TextBlock title="Complexity / trade-off analysis">{question.complexityAnalysis}</TextBlock><TextBlock title="Production reality">{question.productionReality}</TextBlock></div> : null}
          <ReinforcementCards question={question} activeTab={activeTab} />
        </div>
        {!focusMode ? <SupportPanel question={question} /> : null}
      </div>
    </article>
  );
}
