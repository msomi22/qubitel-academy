import { useState } from 'react';

import ReadAloudButton from '../../cbc/ReadAloudButton.jsx';
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

export default function CbcGradeOneQuestionRenderer({
  question,
  completed,
  onToggle,
  onMarkComplete
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
      <header className="cbc-grade-one-header">
        <p>Grade 1 Practice</p>
        <h1 id="grade-one-question-title">{friendlyPrompt(question)}</h1>
      </header>

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
    </article>
  );
}
