function sequenceFor(question) {
  const sequence = Number(question?.metadata?.sequence ?? question?.sequence);
  return Number.isFinite(sequence) ? sequence : Number.MAX_SAFE_INTEGER;
}

function optionLabel(question, answerIndex) {
  return Number.isInteger(answerIndex) ? question?.options?.[answerIndex] ?? null : null;
}

function attemptId(examId, timestamp) {
  return `${examId}-${timestamp.replace(/[:.]/g, '-')}`;
}

export function isExamQuestion(question) {
  return question?.metadata?.assessmentType === 'exam'
    && Boolean(question?.metadata?.examId);
}

export function createExamEntries(questions = []) {
  const examGroups = new Map();
  const regularQuestions = [];

  for (const question of questions) {
    if (!isExamQuestion(question)) {
      regularQuestions.push(question);
      continue;
    }

    const examId = question.metadata.examId;
    const group = examGroups.get(examId) || [];
    group.push(question);
    examGroups.set(examId, group);
  }

  const examEntries = Array.from(examGroups, ([examId, examQuestions]) => {
    const orderedQuestions = [...examQuestions].sort((a, b) => sequenceFor(a) - sequenceFor(b));
    const firstQuestion = orderedQuestions[0];
    const secondsPerQuestion = Number(firstQuestion?.estimatedTimeSeconds) || 30;
    const timedComprehension = firstQuestion?.metadata?.timedComprehensionExam || null;
    const isTimedComprehension = firstQuestion?.metadata?.examMode === 'timed-comprehension' && timedComprehension;
    const readingGuideMinutes = Math.round((Number(timedComprehension?.readingGuideSeconds) || 0) / 60);

    return {
      id: examId,
      type: 'exam',
      category: firstQuestion?.category,
      topicId: firstQuestion?.topicId,
      title: firstQuestion?.metadata?.examTitle || examId,
      difficulty: isTimedComprehension ? 'Timed Exam' : 'Exam',
      estimatedTime: isTimedComprehension
        ? `Timed Exam | ${secondsPerQuestion} seconds each | Reading guide: ${readingGuideMinutes} minutes`
        : `${orderedQuestions.length} questions | ${secondsPerQuestion}s each`,
      examQuestions: orderedQuestions,
      metadata: {
        assessmentType: 'exam-entry',
        examId,
        examTitle: firstQuestion?.metadata?.examTitle || examId,
        ...(isTimedComprehension ? {
          examMode: 'timed-comprehension',
          readingGuideSeconds: timedComprehension.readingGuideSeconds,
          questionTimeSeconds: timedComprehension.questionTimeSeconds
        } : {}),
        sequence: Math.min(...orderedQuestions.map(sequenceFor))
      }
    };
  });

  return [...regularQuestions, ...examEntries];
}

export function buildExamAttempt({
  examId,
  examTitle,
  questions = [],
  answers = {},
  attemptNumber,
  status = 'completed',
  startedAt,
  completedAt = new Date().toISOString()
}) {
  const answerReview = {};
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  for (const question of questions) {
    const answer = answers[question.id] || {};
    const selectedAnswerIndex = Number.isInteger(answer.selectedAnswer)
      ? answer.selectedAnswer
      : null;
    const isCorrect = selectedAnswerIndex === question.correctAnswer;
    const unanswered = selectedAnswerIndex === null;

    if (isCorrect) correctCount += 1;
    else if (unanswered) unansweredCount += 1;
    else incorrectCount += 1;

    answerReview[question.id] = {
      question: question.question,
      title: question.title,
      options: [...(question.options || [])],
      selectedAnswerIndex,
      selectedAnswer: optionLabel(question, selectedAnswerIndex),
      correctAnswerIndex: question.correctAnswer,
      correctAnswer: optionLabel(question, question.correctAnswer),
      isCorrect,
      timedOut: Boolean(answer.timedOut),
      explanation: question.explanation
    };
  }

  const totalQuestions = questions.length;

  return {
    attemptId: attemptId(examId, completedAt),
    examId,
    examTitle,
    status,
    attemptNumber,
    startedAt,
    completedAt,
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    percentage: totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0,
    answers: answerReview
  };
}
