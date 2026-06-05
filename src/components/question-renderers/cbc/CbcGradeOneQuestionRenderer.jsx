import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { storageService } from '../../../services/storageService.js';
import CbcVisualAid from './CbcVisualAid.jsx';
import {
  CbcKidsEncouragement,
  CbcKidsPromptRow,
  CbcKidsQuizTopBar,
  optionLetter,
  optionVisualFor,
  promptVisualFor
} from './CbcGradeOneKidsQuizShell.jsx';

function navigationState(navigation) {
  return navigation?.returnToCategory ? { returnToCategory: navigation.returnToCategory } : undefined;
}

function CbcGradeOneNavigation({ navigation, placement = 'bottom' }) {
  if (!navigation?.previousQuestion && !navigation?.nextQuestion) return null;

  const currentNumber = Number.isInteger(navigation.currentIndex) && navigation.currentIndex >= 0
    ? navigation.currentIndex + 1
    : null;

  return (
    <nav className={`cbc-grade-one-nav ${placement}`} aria-label={`Grade 1 ${placement} question navigation`}>
      {navigation.previousQuestion ? (
        <NavLink
          className="cbc-grade-one-nav-button previous"
          to={`/problem/${encodeURIComponent(navigation.previousQuestion.id)}`}
          state={navigationState(navigation)}
          aria-label={`Previous question: ${navigation.previousQuestion.title}`}
        >
          <span aria-hidden="true">←</span>
          <strong>Previous</strong>
        </NavLink>
      ) : <span className="cbc-grade-one-nav-placeholder" aria-hidden="true" />}

      {currentNumber && navigation.total ? (
        <span className="cbc-grade-one-nav-progress" aria-label={`Question ${currentNumber} of ${navigation.total}`}>
          {currentNumber} / {navigation.total}
        </span>
      ) : null}

      {navigation.nextQuestion ? (
        <NavLink
          className="cbc-grade-one-nav-button next"
          to={`/problem/${encodeURIComponent(navigation.nextQuestion.id)}`}
          state={navigationState(navigation)}
          aria-label={`Next question: ${navigation.nextQuestion.title}`}
        >
          <strong>Next</strong>
          <span aria-hidden="true">→</span>
        </NavLink>
      ) : <span className="cbc-grade-one-nav-placeholder" aria-hidden="true" />}
    </nav>
  );
}

export default function CbcGradeOneQuestionRenderer({
  question,
  completed,
  onToggle,
  onMarkComplete,
  navigation
}) {
  const [selected, setSelected] = useState(() => storageService.getSelectedAnswer(question.id));
  const answered = selected !== null;
  const isCorrect = answered && selected === question.correctAnswer;
  const promptVisual = promptVisualFor(question);
  const currentQuestion = Number.isInteger(navigation?.currentIndex) && navigation.currentIndex >= 0
    ? navigation.currentIndex + 1
    : 1;
  const totalQuestions = Number.isInteger(navigation?.total) && navigation.total > 0
    ? navigation.total
    : 1;
  const timeLimit = Number(question?.estimatedTimeSeconds ?? question?.metadata?.estimatedTimeSeconds) || null;

  function handleSelect(index) {
    setSelected(index);
    storageService.setSelectedAnswer(question.id, index);
    if (!completed) onMarkComplete?.(question.id);
  }

  function handleReset() {
    const updated = storageService.resetQuestionProgress(question.id);
    setSelected(null);
    onToggle?.(question.id, updated);
  }

  return (
    <article className="cbc-grade-one-card" aria-labelledby="grade-one-question-title">
      <CbcKidsQuizTopBar current={currentQuestion} total={totalQuestions} timeLimit={timeLimit} />

      <CbcKidsPromptRow
        question={question}
        headingId="grade-one-question-title"
        headingTag="h1"
        className="cbc-grade-one-prompt"
        readAloudClassName="cbc-grade-one-read-aloud"
      />

      {promptVisual ? (
        <section className="cbc-grade-one-prompt-visual" aria-label="Question visual">
          <CbcVisualAid visual={promptVisual} label={question.title} />
        </section>
      ) : null}

      <section className="cbc-grade-one-options" aria-label="Answer choices">
        {question.options?.map((option, index) => {
          const selectedOption = selected === index;
          const correctOption = question.correctAnswer === index;
          const optionVisual = optionVisualFor(question, index);
          const optionClass = [
            'cbc-grade-one-option',
            selectedOption ? 'selected' : '',
            answered && correctOption ? 'correct' : '',
            answered && selectedOption && !correctOption ? 'wrong' : ''
          ].filter(Boolean).join(' ');

          return (
            <button
              type="button"
              key={`${option}-${index}`}
              className={optionClass}
              aria-pressed={selectedOption}
              onClick={() => handleSelect(index)}
            >
              <span className="cbc-grade-one-option-letter">{optionLetter(index)}</span>
              {optionVisual ? <CbcVisualAid visual={optionVisual} label={option} /> : null}
              <span className="cbc-grade-one-option-text">{option}</span>
            </button>
          );
        })}
      </section>

      {answered ? (
        <section className={`cbc-grade-one-feedback ${isCorrect ? 'correct' : 'wrong'}`} role="status">
          <strong>{isCorrect ? 'Great job!' : 'Good try!'}</strong>
          <p>{isCorrect ? 'That answer is correct.' : question.explanation || 'Try the correct answer next time.'}</p>
        </section>
      ) : null}

      {completed || answered ? (
        <div className="cbc-grade-one-actions">
          <button type="button" onClick={handleReset}>Try again</button>
        </div>
      ) : null}

      <CbcGradeOneNavigation navigation={navigation} placement="bottom" />

      <CbcKidsEncouragement />
    </article>
  );
}
