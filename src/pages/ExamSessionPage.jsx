import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingCard from '../components/LoadingCard.jsx';
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

function ExamNavigation({ currentIndex, totalQuestions, onPrevious, onNext }) {
  if (totalQuestions <= 1) return null;

  return (
    <nav className="cbc-exam-navigation" aria-label="Exam question navigation">
      <button type="button" className="cbc-exam-button secondary" onClick={onPrevious} disabled={currentIndex === 0}>
        Previous
      </button>
      <button type="button" className="cbc-exam-button primary" onClick={onNext}>
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

function ResultView({ attempt, exam, onRetake, onHistory, onBack }) {
  const answerReview = Object.entries(attempt.answers || {});

  function downloadPdf() {
    downloadExamResultPdf(attempt, {
      platformName: 'Qubitel Academy Platform',
      productName: siteConfig.appName,
      academyName: 'CBC Academy',
      categoryName: exam.categoryName || 'Grade 3',
      topicName: exam.topic?.name || 'English',
      skillName: 'Spelling'
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
          <button type="button" className="cbc-exam-button quiet" onClick={onBack}>Back to English</button>
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
  const activeRef = useRef(false);
  const exitSavedRef = useRef(false);
  const sessionRef = useRef({});

  activeRef.current = view === 'exam';
  sessionRef.current = { answers, startedAt, attemptNumber };

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

        setExam(foundExam);
        setHistory(storageService.getExamAttempts(foundExam.examId));
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
  const topicReturnPath = useMemo(() => buildCategoryReturnPath({
    categoryId: exam?.category?.id,
    topicId: exam?.topic?.id
  }), [exam?.category?.id, exam?.topic?.id]);

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
    exitSavedRef.current = true;
    return attempt;
  }, [exam]);

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
    if (view !== 'exam' || !currentQuestion || currentAnswer || remainingSeconds <= 0) return undefined;

    const timer = window.setTimeout(() => {
      setTimeLeftByQuestion((current) => ({
        ...current,
        [currentQuestion.id]: Math.max(0, remainingSeconds - 1)
      }));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [currentAnswer, currentQuestion, remainingSeconds, view]);

  useEffect(() => {
    if (view !== 'exam' || !currentQuestion || currentAnswer || remainingSeconds !== 0) return;

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: {
        selectedAnswer: null,
        timedOut: true
      }
    };

    setAnswers(nextAnswers);
    if (currentIndex === exam.questions.length - 1) completeExam(nextAnswers);
    else setCurrentIndex((index) => index + 1);
  }, [answers, currentAnswer, currentIndex, currentQuestion, exam?.questions?.length, remainingSeconds, view]);

  function startExam() {
    const attempts = storageService.getExamAttempts(exam.examId);
    const initialTimes = Object.fromEntries(
      exam.questions.map((question) => [question.id, questionTimeLimit(question)])
    );

    exitSavedRef.current = false;
    setAnswers({});
    setTimeLeftByQuestion(initialTimes);
    setCurrentIndex(0);
    setStartedAt(new Date().toISOString());
    setAttemptNumber(attempts.length + 1);
    setResult(null);
    setView('exam');
  }

  function selectAnswer(answerIndex) {
    if (!currentQuestion || currentAnswer) return;
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
    exam.questions.forEach((question) => storageService.markComplete(question.id));
    activeRef.current = false;
    exitSavedRef.current = true;
    setResult(attempt);
    setHistory(storageService.getExamAttempts(exam.examId));
    setView('result');
    window.history.back();
  }

  function nextQuestion() {
    if (currentIndex === exam.questions.length - 1) {
      completeExam(answers);
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function previousQuestion() {
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

  if (view === 'loading') return <LoadingCard label="Loading spelling exam..." />;

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
    return (
      <main className="page cbc-exam-page">
        <section className="cbc-exam-start-card">
          <p className="cbc-exam-kicker">Grade 3 English | Spelling</p>
          <h1>{exam.examTitle}</h1>
          <p>Choose the correctly spelt word. You have 30 seconds for each question.</p>
          <div className="cbc-exam-start-stats">
            <span><strong>{exam.questions.length}</strong> questions</span>
            <span><strong>30</strong> seconds each</span>
            <span><strong>{history.length + 1}</strong> next attempt</span>
          </div>
          <div className="cbc-exam-result-actions">
            <button type="button" className="cbc-exam-button primary" onClick={startExam}>Start exam</button>
            <button type="button" className="cbc-exam-button quiet" onClick={() => navigate(topicReturnPath)}>Back to English</button>
          </div>
        </section>
        <AttemptHistory attempts={history} onViewResult={showResult} />
      </main>
    );
  }

  const progress = Math.round(((currentIndex + 1) / exam.questions.length) * 100);

  return (
    <main className="page cbc-exam-page cbc-exam-active-page">
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

      <section className="cbc-exam-question-card">
        <p className="cbc-exam-objective">I can choose the correctly spelt word.</p>
        <h2>{currentQuestion.question}</h2>
        <div className="cbc-exam-options" role="radiogroup" aria-label={currentQuestion.question}>
          {currentQuestion.options.map((option, index) => {
            const selected = currentAnswer?.selectedAnswer === index;
            return (
              <button
                type="button"
                key={`${option}-${index}`}
                className={selected ? 'selected' : ''}
                aria-pressed={selected}
                disabled={Boolean(currentAnswer)}
                onClick={() => selectAnswer(index)}
              >
                <strong>{optionLetter(index)}</strong>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
        {currentAnswer ? (
          <p className="cbc-exam-answer-status" role="status">
            {currentAnswer.timedOut ? 'Time is up. Moving to the next question.' : 'Answer saved. Tap Next when you are ready.'}
          </p>
        ) : null}
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
