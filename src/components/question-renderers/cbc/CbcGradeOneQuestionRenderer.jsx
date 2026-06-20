import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ReadAloudButton from '../../cbc/ReadAloudButton.jsx';
import { buildProblemPath } from '../../../services/questionNavigationService.js';
import { storageService } from '../../../services/storageService.js';
import CbcVisualAid from './CbcVisualAid.jsx';

function optionLetter(index) {
  return String.fromCharCode(65 + index);
}

function optionVisualFor(question, index) {
  return question?.optionVisuals?.[index] || question?.metadata?.optionVisuals?.[index] || null;
}

function promptVisualFor(question) {
  return question?.promptVisual || question?.metadata?.promptVisual || null;
}

function friendlyPrompt(question) {
  return question?.question || question?.prompt || question?.readAloudText || question?.title || 'Choose the correct answer.';
}

function WordPatternChip({ question }) {
  const wordPattern = question?.rendering?.wordPattern;
  
  // Only show chip when rendering.wordPattern is explicitly set
  if (!wordPattern) return null;

  const tokens = wordPattern.split(' ').map((token, i) => {
    if (token === '_') {
      return { char: '_', isMissing: true, key: `m-${i}` };
    }
    return { char: token, isMissing: false, key: `c-${i}` };
  });

  return (
    <div className="cbc-word-pattern-chip">
      <span className="cbc-word-pattern-text">
        {tokens.map(({ char, isMissing, key }) => (
          <span
            key={key}
            className={isMissing ? 'cbc-word-pattern-missing' : 'cbc-word-pattern-letter'}
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  );
}

function navigationState(navigation) {
  return {
    ...(navigation?.returnToCategory ? { returnToCategory: navigation.returnToCategory } : {}),
    preserveProblemScroll: true
  };
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
          to={buildProblemPath(navigation.previousQuestion.id, navigation?.scope)}
          state={navigationState(navigation)}
          preventScrollReset
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
          to={buildProblemPath(navigation.nextQuestion.id, navigation?.scope)}
          state={navigationState(navigation)}
          preventScrollReset
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
      <CbcGradeOneNavigation navigation={navigation} placement="top" />

      <div className="cbc-grade-one-body-scroll">
        <header className="cbc-grade-one-header">
          <p>Grade 1 Practice</p>
          {question?.rendering?.suppressPromptHeading ? null : (
            <h1 id="grade-one-question-title">{friendlyPrompt(question)}</h1>
          )}
        </header>

        <WordPatternChip question={question} />

        <ReadAloudButton question={{ ...question, autoReadAloud: false }} className="cbc-grade-one-read-aloud" />

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

        <section className={`cbc-grade-one-feedback ${answered ? (isCorrect ? 'correct' : 'wrong') : 'empty'}`} role="status" aria-live="polite">
          {answered ? (
            <>
              <strong>{isCorrect ? 'Great job!' : 'Good try!'}</strong>
              <p>{isCorrect ? 'That answer is correct.' : question.explanation || 'Try the correct answer next time.'}</p>
            </>
          ) : <span aria-hidden="true">&nbsp;</span>}
        </section>

        <div className={`cbc-grade-one-actions ${completed || answered ? '' : 'empty'}`.trim()}>
          {completed || answered ? <button type="button" onClick={handleReset}>Try again</button> : <span aria-hidden="true">&nbsp;</span>}
        </div>
      </div>

      <CbcGradeOneNavigation navigation={navigation} placement="bottom" />
    </article>
  );
}
