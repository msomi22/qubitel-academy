import ReadAloudButton from '../../cbc/ReadAloudButton.jsx';

export function optionLetter(index) {
  return String.fromCharCode(65 + index);
}

export function optionVisualFor(question, index) {
  return question?.optionVisuals?.[index] || question?.metadata?.optionVisuals?.[index] || null;
}

export function promptVisualFor(question) {
  return question?.promptVisual || question?.metadata?.promptVisual || null;
}

export function friendlyPrompt(question) {
  return question?.question || question?.prompt || question?.readAloudText || question?.title || 'Choose the correct answer.';
}

function timeLabel(seconds) {
  const safeSeconds = Number(seconds);
  if (!Number.isFinite(safeSeconds) || safeSeconds <= 0) return '';
  if (safeSeconds < 60) return `${safeSeconds}s`;
  if (safeSeconds % 60 === 0) return `${safeSeconds / 60}m`;
  return `${safeSeconds}s`;
}

function progressNumbers({ current, total }) {
  const safeTotal = Number.isInteger(total) && total > 0 ? total : 1;
  const safeCurrent = Number.isInteger(current) && current > 0
    ? Math.min(current, safeTotal)
    : 1;

  return { safeCurrent, safeTotal };
}

function highlightCandidateFor(question, prompt) {
  const candidates = [
    question?.options?.[question?.correctAnswer],
    question?.metadata?.targetWord,
    question?.metadata?.exampleWord,
    question?.metadata?.phonics?.exampleWord
  ]
    .filter(Boolean)
    .map((candidate) => String(candidate).trim())
    .filter((candidate) => candidate.length > 1)
    .sort((a, b) => b.length - a.length);

  const loweredPrompt = prompt.toLowerCase();
  return candidates.find((candidate) => loweredPrompt.includes(candidate.toLowerCase())) || '';
}

function HighlightedPrompt({ question }) {
  const prompt = friendlyPrompt(question);
  const candidate = highlightCandidateFor(question, prompt);

  if (!candidate) return prompt;

  const index = prompt.toLowerCase().indexOf(candidate.toLowerCase());
  if (index === -1) return prompt;

  return (
    <>
      {prompt.slice(0, index)}
      <mark>{prompt.slice(index, index + candidate.length)}</mark>
      {prompt.slice(index + candidate.length)}
    </>
  );
}

export function CbcKidsProgressSegments({ current, total }) {
  const { safeCurrent, safeTotal } = progressNumbers({ current, total });
  const segmentCount = Math.min(Math.max(safeTotal, 4), 12);
  const activeSegments = Math.max(1, Math.ceil((safeCurrent / safeTotal) * segmentCount));

  return (
    <div className="cbc-kids-progress-segments" aria-hidden="true">
      {Array.from({ length: segmentCount }).map((_, index) => (
        <span className={index < activeSegments ? 'active' : ''} key={`progress-${index}`} />
      ))}
    </div>
  );
}

export function CbcKidsQuizTopBar({
  current = 1,
  total = 1,
  timeLeft = null,
  timeLimit = null,
  timerEnding = false
}) {
  const { safeCurrent, safeTotal } = progressNumbers({ current, total });
  const displayedTime = timeLabel(timeLeft ?? timeLimit);

  return (
    <header className="cbc-kids-topbar">
      <div className="cbc-kids-grade-badge" aria-label="Grade 1">
        <span className="cbc-kids-grade-star" aria-hidden="true">⭐</span>
        <strong>Grade 1</strong>
      </div>

      <div className="cbc-kids-progress" aria-label={`Question ${safeCurrent} of ${safeTotal}`}>
        <div>
          <strong>{safeCurrent}</strong>
          <span>/ {safeTotal}</span>
        </div>
        <CbcKidsProgressSegments current={safeCurrent} total={safeTotal} />
      </div>

      <div className={`cbc-kids-timer-card ${timerEnding ? 'ending' : ''}`.trim()} aria-label={displayedTime ? `Time ${displayedTime}` : 'Question time'}>
        <span className="cbc-kids-timer-icon" aria-hidden="true">⏰</span>
        <strong>{displayedTime || 'Ready'}</strong>
      </div>
    </header>
  );
}

export function CbcKidsPromptRow({
  question,
  headingId,
  headingTag = 'h1',
  className = '',
  readAloudClassName = ''
}) {
  const Heading = headingTag;

  return (
    <section className={`cbc-kids-prompt-row ${className}`.trim()} aria-labelledby={headingId}>
      <span className="cbc-kids-speaker-orb" aria-hidden="true">🔊</span>
      <Heading id={headingId} className="cbc-kids-question-title">
        <HighlightedPrompt question={question} />
      </Heading>
      <ReadAloudButton
        question={{ ...question, autoReadAloud: false }}
        className={`cbc-kids-read-aloud ${readAloudClassName}`.trim()}
      />
    </section>
  );
}

export function CbcKidsEncouragement({ children = null }) {
  return (
    <footer className="cbc-kids-encouragement">
      <span className="cbc-kids-encouragement-star" aria-hidden="true">⭐</span>
      <strong>You can do it!</strong>
      <span className="cbc-kids-encouragement-heart" aria-hidden="true">💛</span>
      {children}
    </footer>
  );
}
