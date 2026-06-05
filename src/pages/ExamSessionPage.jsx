import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingCard from '../components/LoadingCard.jsx';
import ReadAloudButton from '../components/cbc/ReadAloudButton.jsx';
import CbcVisualAid from '../components/question-renderers/cbc/CbcVisualAid.jsx';
import { siteConfig } from '../config/siteConfig.js';
import { buildCategoryReturnPath } from '../services/categoryNavigationService.js';
import { buildExamAttempt } from '../services/examAttemptService.js';
import { downloadExamResultPdf } from '../services/examPdfService.js';
import { findExamById } from '../services/questionBankService.js';
import { storageService } from '../services/storageService.js';

const LEAVE_WARNING = 'You are still taking this exam. Leaving now may end this attempt.';

function optionLetter(index) {
  return String.fromCharCode(65 + index);
}

function formattedDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function questionTimeLimit(question) {
  const seconds = Number(question?.estimatedTimeSeconds ?? question?.metadata?.estimatedTimeSeconds);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 30;
}

function promptVisualFor(question) {
  return question?.promptVisual || question?.metadata?.promptVisual || null;
}

function optionVisualFor(question, index) {
  return question?.optionVisuals?.[index] || question?.metadata?.optionVisuals?.[index] || null;
}

function hasVisualMcq(question) {
  return Boolean(
    question?.interactionType === 'visual-mcq'
    || question?.metadata?.interactionType === 'visual-mcq'
    || promptVisualFor(question)
    || question?.optionVisuals?.length
    || question?.metadata?.optionVisuals?.length
  );
}

function categoryDisplayName(exam) {
  return exam?.categoryName || exam?.category?.name || 'Grade 3';
}

function topicDisplayName(exam) {
  return exam?.topic?.name || 'English';
}

function skillDisplayName(exam) {
  const firstQuestion = exam?.questions?.[0];
  const skill = firstQuestion?.metadata?.skill;
  if (skill === 'counting') return 'Counting';
  if (skill === 'object-matching') return 'Object Matching';
  if (skill === 'alphabet-sounds') return 'Alphabet Sounds';
  if (skill === 'short-vowels') return 'Vowel Sounds';
  if (firstQuestion?.metadata?.examId?.includes('spelling')) return 'Spelling';
  return exam?.examTitle?.replace(/^Grade \d+\s+/i, '').replace(/\s+Exam$/i, '') || 'Exam';
}

function startInstructions(exam) {
  const firstQuestion = exam?.questions?.[0];
  if (firstQuestion?.metadata?.skill === 'alphabet-sounds') {
    return `Listen to each alphabet sound, then choose the matching letter, word, or picture. You have ${questionTimeLimit(firstQuestion)} seconds for each question.`;
  }
  if (firstQuestion?.metadata?.skill === 'short-vowels') {
    return `Listen to each short vowel sound, then choose the matching word, letter, or picture. You have ${questionTimeLimit(firstQuestion)} seconds for each question.`;
  }
  if (hasVisualMcq(firstQuestion)) {
    return `Look at the pictures carefully and choose the correct answer. You have ${questionTimeLimit(firstQuestion)} seconds for each question.`;
  }
  return `Choose the correctly spelt word. You have ${questionTimeLimit(firstQuestion)} seconds for each question.`;
}

function captureScrollSnapshot() {
  if (typeof window === 'undefined') return null;

  const pageWrap = document.querySelector('.page-wrap');
  const mainContent = document.querySelector('.main-content');
  const questionScroll = document.querySelector('.cbc-exam-question-scroll');

  return {
    windowX: window.scrollX,
    windowY: window.scrollY,
    pageWrapTop: pageWrap?.scrollTop ?? null,
    pageWrapLeft: pageWrap?.scrollLeft ?? null,
    mainContentTop: mainContent?.scrollTop ?? null,
    mainContentLeft: mainContent?.scrollLeft ?? null,
    questionScrollTop: questionScroll?.scrollTop ?? null,
    questionScrollLeft: questionScroll?.scrollLeft ?? null
  };
}

function restoreScrollSnapshot(snapshot) {
  if (!snapshot || typeof window === 'undefined') return;

  const pageWrap = document.querySelector('.page-wrap');
  const mainContent = document.querySelector('.main-content');
  const questionScroll = document.querySelector('.cbc-exam-question-scroll');

  if (pageWrap && snapshot.pageWrapTop !== null) {
    pageWrap.scrollTo({ top: snapshot.pageWrapTop, left: snapshot.pageWrapLeft || 0, behavior: 'auto' });
  }
  if (mainContent && snapshot.mainContentTop !== null) {
    mainContent.scrollTo({ top: snapshot.mainContentTop, left: snapshot.mainContentLeft || 0, behavior: 'auto' });
  }
  if (questionScroll && snapshot.questionScrollTop !== null) {
    questionScroll.scrollTo({ top: snapshot.questionScrollTop, left: snapshot.questionScrollLeft || 0, behavior: 'auto' });
  }
  window.scrollTo({ top: snapshot.windowY, left: snapshot.windowX, behavior: 'auto' });
}

function ExamNavigation({ currentIndex, totalQuestions, onPrevious, onNext }) {
  if (totalQuestions <= 1) return null;

  function handlePreviousClick(event) {
    event.currentTarget.blur();
    onPrevious();
  }

  function handleNextClick(event) {
    event.currentTarget.blur();
    onNext();
  }

  return (
    <nav className="cbc-exam-navigation" aria-label="Exam question navigation">
      <button type="button" className="cbc-exam-button secondary" onClick={handlePreviousClick} disabled={currentIndex === 0}>
        Previous
      </button>
      <button type="button" className="cbc-exam-button primary" onClick={handleNextClick}>
        {currentIndex === totalQuestions - 1 ? 'Finish exam' : 'Next'}
      </button>
    </nav>
  );
}

function AttemptHistory({ attempts, onViewResult }) {
  if (!attempts.length) return null;

  return (
    <section className="cbc-exam-history" aria-labelledby="exam-history-title">
      <div>
        <p className="cbc-exam-kicker">Saved results</p>
        <h2 id="exam-history-title">Attempt history</h2>
      </div>
      <div className="cbc-exam-history-list">
        {[...attempts].reverse().map((attempt) => (
          <article key={attempt.attemptId}>
            <div>
              <strong>Attempt {attempt.attemptNumber}</strong>
              <span>{formattedDate(attempt.completedAt)}</span>
            </div>
            <div>
              <span className={`cbc-attempt-status ${attempt.status}`}>{attempt.status}</span>
              <strong>{attempt.correctCount} / {attempt.totalQuestions}</strong>
              {attempt.status === 'completed' ? (
                <button type="button" onClick={() => onViewResult(attempt)}>View result</button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RecoveryView({ exam, session, onContinue, onStartAgain, onBack }) {
  return (
    <main className="page cbc-exam-page">
      <section className="cbc-exam-start-card cbc-exam-recovery-card">
        <p className="cbc-exam-kicker">Unfinished exam</p>
        <h1>Continue {exam.examTitle}?</h1>
        <p>
          We found an unfinished attempt from {formattedDate(session.updatedAt || session.startedAt)}.
          You can continue from Question {(session.currentIndex || 0) + 1}, or start again.
        </p>
        <div className="cbc-exam-result-actions">
          <button type="button" className="cbc-exam-button primary" onClick={onContinue}>Continue exam</button>
          <button type="button" className="cbc-exam-button secondary" onClick={onStartAgain}>Start again</button>
          <button type="button" className="cbc-exam-button quiet" onClick={onBack}>Back to {topicDisplayName(exam)}</button>
        </div>
      </section>
    </main>
  );
}

function ResultView({ attempt, exam, onRetake, onHistory, onBack }) {
  const answerReview = Object.entries(attempt.answers || {});

  function downloadPdf() {
    downloadExamResultPdf(attempt, {
      platformName: 'Qubitel Academy Platform',
      productName: siteConfig.appName,
      academyName: 'CBC Academy',
      categoryName: categoryDisplayName(exam),
      topicName: topicDisplayName(exam),
      skillName: skillDisplayName(exam)
    });
  }

  return (
    <main className="page cbc-exam-page cbc-exam-result-page">
      <section className="cbc-exam-result-card">
        <p className="cbc-exam-kicker">Attempt {attempt.attemptNumber} complete</p>
        <h1>{attempt.examTitle} Result</h1>
        <div className="cbc-exam-score">
          <strong>{attempt.correctCount} / {attempt.totalQuestions}</strong>
          <span>{attempt.percentage}%</span>
        </div>
        <div className="cbc-exam-result-stats">
          <span><strong>{attempt.correctCount}</strong> correct</span>
          <span><strong>{attempt.incorrectCount}</strong> incorrect</span>
          <span><strong>{attempt.unansweredCount}</strong> unanswered</span>
        </div>
        <p>Completed {formattedDate(attempt.completedAt)}</p>
        <div className="cbc-exam-result-actions">
          <button type="button" className="cbc-exam-button primary" onClick={downloadPdf}>Download PDF</button>
          <button type="button" className="cbc-exam-button secondary" onClick={onRetake}>Retake exam</button>
          <button type="button" className="cbc-exam-button secondary" onClick={onHistory}>Attempt history</button>
          <button type="button" className="cbc-exam-button quiet" onClick={onBack}>Back to {topicDisplayName(exam)}</button>
        </div>
      </section>

      <section className="cbc-answer-review" aria-labelledby="answer-review-title">
        <div>
          <p className="cbc-exam-kicker">Learn from your answers</p>
          <h2 id="answer-review-title">Answer review</h2>
        </div>
        <div className="cbc-answer-review-list">
          {answerReview.map(([questionId, answer], index) => (
            <article key={questionId} className={answer.isCorrect ? 'correct' : 'incorrect'}>
              <div>
                <strong>Question {index + 1}</strong>
                <span>{answer.timedOut ? 'Time ran out' : answer.isCorrect ? 'Correct' : answer.selectedAnswer ? 'Try again next time' : 'Unanswered'}</span>
              </div>
              <p>Your answer: <strong>{answer.selectedAnswer || 'No answer'}</strong></p>
              {!answer.isCorrect ? <p>Correct answer: <strong>{answer.correctAnswer}</strong></p> : null}
              <small>{answer.explanation}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ExamSessionPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [history, setHistory] = useState([]);
  const [view, setView] = useState('loading');
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeftByQuestion, setTimeLeftByQuestion] = useState({});
  const [startedAt, setStartedAt] = useState('');
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [result, setResult] = useState(null);
  const [recoverySession, setRecoverySession] = useState(null);
  const activeRef = useRef(false);
  const exitSavedRef = useRef(false);
  const sessionRef = useRef({});
  const pendingScrollSnapshotRef = useRef(null);

  activeRef.current = view === 'exam';
  sessionRef.current = { answers, currentIndex, startedAt, attemptNumber, timeLeftByQuestion };

  const topicReturnPath = useMemo(() => buildCategoryReturnPath({
    categoryId: exam?.category?.id,
    topicId: exam?.topic?.id
  }), [exam?.category?.id, exam?.topic?.id]);

  useEffect(() => {
    let alive = true;

    findExamById(decodeURIComponent(examId || ''))
      .then((foundExam) => {
        if (!alive) return;
        if (!foundExam) {
          setError('Exam not found.');
          setView('error');
          return;
        }

        const savedSession = storageService.getActiveExamSession(foundExam.examId);
        setExam(foundExam);
        setHistory(storageService.getExamAttempts(foundExam.examId));

        if (savedSession) {
          setRecoverySession(savedSession);
          setView('recover');
          return;
        }
        setView('start');
      })
      .catch((loadError) => {
        console.error(loadError);
        if (alive) {
          setError('Could not load this exam.');
          setView('error');
        }
      });

    return () => {
      alive = false;
    };
  }, [examId]);

  const currentQuestion = exam?.questions?.[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;
  const remainingSeconds = currentQuestion
    ? timeLeftByQuestion[currentQuestion.id] ?? questionTimeLimit(currentQuestion)
    : 0;

  const saveAbandonedAttempt = useCallback(() => {
    if (!exam || !activeRef.current || exitSavedRef.current) return null;

    const session = sessionRef.current;
    const attempt = buildExamAttempt({
      examId: exam.examId,
      examTitle: exam.examTitle,
      questions: exam.questions,
      answers: session.answers,
      attemptNumber: session.attemptNumber,
      status: 'abandoned',
      startedAt: session.startedAt,
      completedAt: new Date().toISOString()
    });

    storageService.addExamAttempt(exam.examId, attempt);
    storageService.clearActiveExamSession(exam.examId);
    exitSavedRef.current = true;
    return attempt;
  }, [exam]);

  useLayoutEffect(() => {
    if (view !== 'exam' || !pendingScrollSnapshotRef.current) return undefined;

    const snapshot = pendingScrollSnapshotRef.current;
    pendingScrollSnapshotRef.current = null;
    restoreScrollSnapshot(snapshot);

    const frameId = window.requestAnimationFrame(() => restoreScrollSnapshot(snapshot));
    const timeoutId = window.setTimeout(() => restoreScrollSnapshot(snapshot), 80);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [currentIndex, view]);

  useEffect(() => {
    if (view !== 'exam') return undefined;

    storageService.setActiveExamSession(exam.examId, {
      answers,
      currentIndex,
      startedAt,
      attemptNumber,
      timeLeftByQuestion
    });

    return undefined;
  }, [answers, attemptNumber, currentIndex, exam?.examId, startedAt, timeLeftByQuestion, view]);

  useEffect(() => {
    if (view !== 'exam') return undefined;

    function warnBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = LEAVE_WARNING;
      return LEAVE_WARNING;
    }

    window.addEventListener('beforeunload', warnBeforeUnload);
    return () => window.removeEventListener('beforeunload', warnBeforeUnload);
  }, [view]);

  useEffect(() => {
    if (view !== 'exam') return undefined;

    const guardState = { ...window.history.state, cbcExamGuard: true };
    window.history.pushState(guardState, '', window.location.href);

    function guardBrowserBack() {
      if (!activeRef.current) return;
      if (window.confirm(LEAVE_WARNING)) {
        saveAbandonedAttempt();
        activeRef.current = false;
        window.history.back();
        return;
      }
      window.history.pushState(guardState, '', window.location.href);
    }

    window.addEventListener('popstate', guardBrowserBack);
    return () => window.removeEventListener('popstate', guardBrowserBack);
  }, [saveAbandonedAttempt, view]);

  useEffect(() => {
    if (view !== 'exam' || !currentQuestion || remainingSeconds <= 0) return undefined;

    const timer = window.setTimeout(() => {
      setTimeLeftByQuestion((current) => ({
        ...current,
        [currentQuestion.id]: Math.max(0, remainingSeconds - 1)
      }));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [currentQuestion, remainingSeconds, view]);

  useEffect(() => {
    if (view !== 'exam' || !currentQuestion || remainingSeconds !== 0) return;

    const nextAnswers = currentAnswer
      ? answers
      : {
        ...answers,
        [currentQuestion.id]: {
          selectedAnswer: null,
          timedOut: true
        }
      };

    if (!currentAnswer) setAnswers(nextAnswers);
    if (currentIndex === exam.questions.length - 1) completeExam(nextAnswers);
    else {
      pendingScrollSnapshotRef.current = captureScrollSnapshot();
      setCurrentIndex((index) => index + 1);
    }
  }, [answers, currentAnswer, currentIndex, currentQuestion, exam?.questions?.length, remainingSeconds, view]);

  function initialQuestionTimes() {
    return Object.fromEntries(
      exam.questions.map((question) => [question.id, questionTimeLimit(question)])
    );
  }

  function startExam() {
    const attempts = storageService.getExamAttempts(exam.examId);
    storageService.clearActiveExamSession(exam.examId);
    exitSavedRef.current = false;
    setAnswers({});
    setTimeLeftByQuestion(initialQuestionTimes());
    setCurrentIndex(0);
    setStartedAt(new Date().toISOString());
    setAttemptNumber(attempts.length + 1);
    setResult(null);
    setRecoverySession(null);
    setView('exam');
  }

  function continueExam() {
    if (!recoverySession) return;

    exitSavedRef.current = false;
    setAnswers(recoverySession.answers || {});
    setTimeLeftByQuestion(recoverySession.timeLeftByQuestion || initialQuestionTimes());
    setCurrentIndex(Math.min(Math.max(Number(recoverySession.currentIndex || 0), 0), exam.questions.length - 1));
    setStartedAt(recoverySession.startedAt || new Date().toISOString());
    setAttemptNumber(Number(recoverySession.attemptNumber) || storageService.getExamAttempts(exam.examId).length + 1);
    setResult(null);
    setView('exam');
  }

  function selectAnswer(answerIndex) {
    if (!currentQuestion || currentAnswer?.timedOut) return;
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: {
        selectedAnswer: answerIndex,
        timedOut: false
      }
    }));
  }

  function completeExam(finalAnswers) {
    if (!exam || exitSavedRef.current) return;

    const attempt = buildExamAttempt({
      examId: exam.examId,
      examTitle: exam.examTitle,
      questions: exam.questions,
      answers: finalAnswers,
      attemptNumber,
      status: 'completed',
      startedAt,
      completedAt: new Date().toISOString()
    });

    storageService.addExamAttempt(exam.examId, attempt);
    storageService.clearActiveExamSession(exam.examId);
    exam.questions.forEach((question) => storageService.markComplete(question.id));
    activeRef.current = false;
    exitSavedRef.current = true;
    setResult(attempt);
    setHistory(storageService.getExamAttempts(exam.examId));
    setView('result');
    window.history.back();
  }

  function nextQuestion() {
    pendingScrollSnapshotRef.current = captureScrollSnapshot();
    if (currentIndex === exam.questions.length - 1) {
      completeExam(answers);
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function previousQuestion() {
    pendingScrollSnapshotRef.current = captureScrollSnapshot();
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  function leaveExam() {
    if (!window.confirm(LEAVE_WARNING)) return;
    saveAbandonedAttempt();
    activeRef.current = false;
    window.history.back();
    window.setTimeout(() => navigate(topicReturnPath, { replace: true }), 0);
  }

  function showHistory() {
    setResult(null);
    setHistory(storageService.getExamAttempts(exam.examId));
    setView('start');
  }

  function showResult(attempt) {
    setResult(attempt);
    setView('result');
  }

  if (view === 'loading') return <LoadingCard label="Loading exam..." />;

  if (view === 'error' || !exam) {
    return (
      <main className="page cbc-exam-page">
        <section className="cbc-exam-start-card">
          <h1>{error || 'Exam not found.'}</h1>
          <button type="button" className="cbc-exam-button primary" onClick={() => navigate('/categories')}>Back to topics</button>
        </section>
      </main>
    );
  }

  if (view === 'recover' && recoverySession) {
    return (
      <RecoveryView
        exam={exam}
        session={recoverySession}
        onContinue={continueExam}
        onStartAgain={startExam}
        onBack={() => navigate(topicReturnPath)}
      />
    );
  }

  if (view === 'result' && result) {
    return (
      <ResultView
        attempt={result}
        exam={exam}
        onRetake={startExam}
        onHistory={showHistory}
        onBack={() => navigate(topicReturnPath)}
      />
    );
  }

  if (view === 'start') {
    const firstQuestion = exam.questions[0];
    const secondsPerQuestion = questionTimeLimit(firstQuestion);

    return (
      <main className="page cbc-exam-page">
        <section className="cbc-exam-start-card">
          <p className="cbc-exam-kicker">{categoryDisplayName(exam)} | {topicDisplayName(exam)}</p>
          <h1>{exam.examTitle}</h1>
          <p>{startInstructions(exam)}</p>
          <div className="cbc-exam-start-stats">
            <span><strong>{exam.questions.length}</strong> questions</span>
            <span><strong>{secondsPerQuestion}</strong> seconds each</span>
            <span><strong>{history.length + 1}</strong> next attempt</span>
          </div>
          <div className="cbc-exam-result-actions">
            <button type="button" className="cbc-exam-button primary" onClick={startExam}>Start exam</button>
            <button type="button" className="cbc-exam-button quiet" onClick={() => navigate(topicReturnPath)}>Back to {topicDisplayName(exam)}</button>
          </div>
        </section>
        <AttemptHistory attempts={history} onViewResult={showResult} />
      </main>
    );
  }

  const progress = Math.round(((currentIndex + 1) / exam.questions.length) * 100);
  const questionTimedOut = Boolean(currentAnswer?.timedOut);
  const promptVisual = promptVisualFor(currentQuestion);
  const visualQuestion = hasVisualMcq(currentQuestion);
  const questionCardClass = [
    'cbc-exam-question-card',
    visualQuestion ? 'visual-mcq' : '',
    promptVisual ? '' : 'no-prompt-visual'
  ].filter(Boolean).join(' ');

  return (
    <main className="page cbc-exam-page cbc-exam-active-page stable-exam-page">
      <section className="cbc-exam-session-head">
        <div>
          <p className="cbc-exam-kicker">{exam.examTitle}</p>
          <h1>Question {currentIndex + 1} of {exam.questions.length}</h1>
        </div>
        <div className={`cbc-exam-timer ${remainingSeconds <= 10 ? 'ending' : ''}`}>
          <span>Time left</span>
          <strong>{remainingSeconds}s</strong>
        </div>
        <button type="button" className="cbc-exam-leave" onClick={leaveExam}>Leave exam</button>
        <div className="cbc-exam-progress" aria-label={`${progress}% through exam`}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </section>

      <ExamNavigation
        currentIndex={currentIndex}
        totalQuestions={exam.questions.length}
        onPrevious={previousQuestion}
        onNext={nextQuestion}
      />

      <section className={questionCardClass}>
        <div className="cbc-exam-question-scroll">
          <p className="cbc-exam-objective">{currentQuestion.body?.[0]?.content || `I can complete ${skillDisplayName(exam).toLowerCase()} questions.`}</p>
          <h2>{currentQuestion.question}</h2>
          <ReadAloudButton question={{ ...currentQuestion, autoReadAloud: false }} className="cbc-exam-read-aloud" />
          {promptVisual ? (
            <div className="cbc-exam-prompt-visual" aria-label="Question visual">
              <CbcVisualAid visual={promptVisual} label={currentQuestion.title} />
            </div>
          ) : null}
          <div className="cbc-exam-options" role="radiogroup" aria-label={currentQuestion.question}>
            {currentQuestion.options.map((option, index) => {
              const selected = currentAnswer?.selectedAnswer === index;
              const optionVisual = optionVisualFor(currentQuestion, index);
              return (
                <button
                  type="button"
                  key={`${option}-${index}`}
                  className={`${selected ? 'selected' : ''} ${questionTimedOut ? 'timed-out' : ''}`.trim()}
                  aria-pressed={selected}
                  disabled={questionTimedOut}
                  onClick={() => selectAnswer(index)}
                >
                  <strong>{optionLetter(index)}</strong>
                  {optionVisual ? (
                    <span className="cbc-exam-option-visual" aria-hidden="true">
                      <CbcVisualAid visual={optionVisual} label={option} />
                    </span>
                  ) : null}
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className={`cbc-exam-answer-status ${currentAnswer ? '' : 'empty'}`.trim()} role="status" aria-live="polite">
          {currentAnswer
            ? currentAnswer.timedOut
              ? 'Time is up. Moving to the next question.'
              : 'Answer saved. You can still change it before you finish.'
            : 'Choose an answer to continue.'}
        </p>
      </section>

      <ExamNavigation
        currentIndex={currentIndex}
        totalQuestions={exam.questions.length}
        onPrevious={previousQuestion}
        onNext={nextQuestion}
      />
    </main>
  );
}
