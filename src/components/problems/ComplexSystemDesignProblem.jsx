import { useEffect, useMemo, useRef, useState } from 'react';

import { storageService } from '../../services/storageService.js';
import {
  SCORING_MODEL_LABEL,
  scoreComplexDesignAnswer
} from '../../utils/complexDesignScoring.js';

function rows(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function difficultyLevel(difficulty) {
  const value = String(difficulty || '').trim().toLowerCase();
  if (value === 'easy') return 'easy';
  if (value === 'medium') return 'medium';
  if (value === 'super hard') return 'super-hard';
  return 'hard';
}

function guidanceFor(question, submitted) {
  const level = difficultyLevel(question.difficulty);
  const functional = question.requirements?.functional;
  const nonFunctional = question.requirements?.nonFunctional;
  const constraints = question.constraints;
  const hints = question.hints;

  if (level === 'easy') {
    return {
      visible: true,
      title: 'Guidance',
      note: 'Use this to understand the expected design shape.',
      sections: [
        ['Functional requirements', functional],
        ['Non-functional requirements', nonFunctional],
        ['Constraints', constraints],
        ['Hints', hints]
      ]
    };
  }

  if (level === 'medium') {
    return {
      visible: true,
      title: 'Limited guidance',
      note: 'Only a few clues are shown before submission. More detail unlocks after evaluation.',
      sections: submitted
        ? [
            ['Functional requirements', functional],
            ['Non-functional requirements', nonFunctional],
            ['Constraints', constraints],
            ['Hints', hints]
          ]
        : [
            ['Constraints', rows(constraints).slice(0, 2)],
            ['Hints', rows(hints).slice(0, 1)]
          ]
    };
  }

  if (!submitted) {
    return {
      visible: false,
      title: 'Guidance locked',
      note: level === 'super-hard'
        ? 'No guidance is shown before submission for Super Hard prompts.'
        : 'Guidance unlocks after you submit your first answer.',
      sections: []
    };
  }

  return {
    visible: true,
    title: 'Post-submission guidance',
    note: level === 'super-hard'
      ? 'Guidance is available only after submission so the first attempt stays realistic.'
      : 'Guidance is now unlocked. Compare it with your submitted answer.',
    sections: [
      ['Functional requirements', functional],
      ['Non-functional requirements', nonFunctional],
      ['Constraints', constraints],
      ['Hints', hints]
    ]
  };
}

function ListSection({ title, items }) {
  const list = rows(items);
  if (!list.length) return null;

  return (
    <section className="complex-design-card">
      <span className="mini-label">{title}</span>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function OptionalListSection({ title, items }) {
  const list = rows(items);
  if (!list.length) return null;

  return (
    <details className="complex-design-reveal-card">
      <summary>{title}</summary>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </details>
  );
}

function ScoreMeter({ result }) {
  if (!result) return null;

  return (
    <section className="complex-design-score-card" aria-live="polite">
      <span className="mini-label">{result.scoringModel || SCORING_MODEL_LABEL}</span>
      <strong>{result.totalScore}/{result.maxScore}</strong>
      <p>{result.percentage}% · {result.level}</p>
    </section>
  );
}

function FeedbackList({ title, items }) {
  const list = rows(items);
  if (!list.length) return null;

  return (
    <section className="complex-design-card compact">
      <span className="mini-label">{title}</span>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function SectionBreakdown({ result }) {
  if (!result?.sectionScores?.length) return null;

  const signals = rows(result.scoringSignals);

  return (
    <section className="complex-design-breakdown">
      <div className="complex-design-section-heading">
        <span className="mini-label">{result.scoringModel || SCORING_MODEL_LABEL}</span>
        <p>
          Scored based on key design coverage, clear reasoning, trade-offs,
          reliability, security, scaling, and observability.
        </p>
      </div>

      {signals.length ? (
        <div className="complex-design-signal-list" aria-label="Scoring signals">
          {signals.map((signal) => <span key={signal}>{signal}</span>)}
        </div>
      ) : null}

      <div className="complex-design-section-list">
        {result.sectionScores.map((section) => (
          <article key={section.id} className="complex-design-section-score">
            <div>
              <strong>{section.title}</strong>
              <span>{section.score}/{section.maxScore}</span>
            </div>
            <p>{section.feedback}</p>
            {section.missedCriteria.length ? (
              <small>Missing: {(section.missedLabels || section.missedCriteria).join(', ')}</small>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ComplexSystemDesignProblem({ question, completed, onToggle, onMarkComplete }) {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const previousQuestionId = useRef('');
  const previousCompleted = useRef(false);

  useEffect(() => {
    const questionChanged = previousQuestionId.current !== question.id;
    const wasReset = previousCompleted.current && !completed;

    if (questionChanged || wasReset) {
      const savedSubmission = storageService.getComplexDesignSubmission(question.id);

      setAnswer(savedSubmission?.answer || '');
      setResult(savedSubmission?.result || null);
      setSubmitted(Boolean(savedSubmission));
    }

    previousQuestionId.current = question.id;
    previousCompleted.current = completed;
  }, [question.id, completed]);

  const wordCount = useMemo(() => answer.trim().split(/\s+/).filter(Boolean).length, [answer]);
  const guidance = guidanceFor(question, submitted);

  function handleEvaluate() {
    const nextResult = scoreComplexDesignAnswer(question, answer);
    setResult(nextResult);
    setSubmitted(true);
    storageService.setComplexDesignSubmission(question.id, {
      answer,
      result: nextResult,
      submittedAt: new Date().toISOString()
    });
    onMarkComplete?.(question.id);
  }

  return (
    <article className={`complex-design-workspace glass-lite ${completed ? 'done' : ''}`}>
      <header className="complex-design-header">
        <div>
          <span className="mini-label">Complex system design</span>
          <h2>{question.title}</h2>
          <p>{question.scenario}</p>
        </div>
        <button className="mark" type="button" onClick={() => onToggle?.(question.id)}>
          {completed ? 'Reset progress' : 'Mark complete'}
        </button>
      </header>

      <section className="complex-design-prompt compact-prompt">
        <span className="mini-label">Design prompt</span>
        <p>{question.question}</p>
      </section>

      <section className={`complex-design-reveal-panel ${guidance.visible ? '' : 'locked'}`}>
        <div>
          <span className="mini-label">{guidance.title}</span>
          <p>{guidance.note}</p>
        </div>
        {guidance.visible ? (
          <div className="complex-design-reveal-grid">
            {guidance.sections.map(([title, items]) => (
              <OptionalListSection key={title} title={title} items={items} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="complex-design-answer-panel">
        <div className="complex-design-section-heading">
          <div>
            <span className="mini-label">Your answer</span>
            <p>Write your architecture, trade-offs, and production reasoning.</p>
          </div>
          <span>{wordCount} words</span>
        </div>

        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Write your full system design answer here..."
          rows={14}
        />

        <div className="complex-design-actions">
          <button className="btn" type="button" onClick={handleEvaluate}>Evaluate answer</button>
          {submitted && result ? <span>{result.level} · {result.percentage}% · saved</span> : null}
        </div>
      </section>

      <ScoreMeter result={result} />

      {result ? (
        <div className="complex-design-feedback-grid">
          <FeedbackList title="Strong areas" items={result.strengths} />
          <FeedbackList title="Improvements" items={result.improvements} />
        </div>
      ) : null}

      <SectionBreakdown result={result} />

      {submitted ? (
        <details className="complex-design-model-answer">
          <summary>Model answer outline</summary>
          <ListSection title="Expected answer outline" items={question.expectedAnswerOutline} />
          <section className="complex-design-card">
            <span className="mini-label">Model answer summary</span>
            <p>{question.modelAnswer}</p>
          </section>
          <ListSection title="Common weak answers" items={question.commonWeakAnswers} />
        </details>
      ) : null}
    </article>
  );
}
