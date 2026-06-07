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

function normalizeSpace(value = '') {
  return String(value).replace(/\s+/g, ' ').trim();
}

function isCbcAssessment(question) {
  const gradeId = question?.metadata?.gradeId || question?.category || question?.metadata?.audience || '';
  return /^grade-\d+$/i.test(String(gradeId)) || (question?.tags || []).includes('cbc');
}

function gradeLabelFor(question) {
  const gradeId = question?.metadata?.gradeId || question?.category || question?.metadata?.audience || '';
  const match = String(gradeId).match(/^grade-(\d+)$/i);
  return match ? `Grade ${Number(match[1])}` : '';
}

function assessmentPrefixFor(question) {
  const learningAreaId = question?.metadata?.learningAreaId || '';
  const examTitle = question?.metadata?.examTitle || '';
  const tags = question?.tags || [];

  return learningAreaId === 'spelling'
    || /^Spelling\b/i.test(examTitle)
    || (learningAreaId !== 'parts-of-speech' && tags.includes('spelling'))
    ? 'Spelling'
    : 'Exam';
}

function titleFromId(examId = '') {
  return normalizeSpace(
    String(examId)
      .replace(/-exam-0*\d+$/i, '')
      .replace(/^grade-\d+-/i, '')
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  );
}

function examNumberFrom(value) {
  const raw = String(value || '');
  const titleMatch = raw.match(/\b(?:spelling\s+)?exam\s+0*(\d+)\b/i);
  if (titleMatch) return Number(titleMatch[1]);

  const idMatch = raw.match(/exam-0*(\d+)$/i);
  return idMatch ? Number(idMatch[1]) : null;
}

function explicitTopicTitle(question, examTitle, examId) {
  const metadata = question?.metadata || {};
  const timedComprehension = metadata.timedComprehensionExam || null;
  const colonTitle = String(examTitle || '').match(/:\s*(.+)$/)?.[1];

  return normalizeSpace(
    metadata.examCardTitle
    || metadata.cardTitle
    || colonTitle
    || timedComprehension?.passageTitle
    || timedComprehension?.passage?.title
    || examTitle
    || titleFromId(examId)
  );
}

function cleanTopicTitle(title) {
  return normalizeSpace(
    title
      .replace(/^Grade\s+\d+\s+/i, '')
      .replace(/^(English|Kiswahili|Mathematics)\s+/i, '')
      .replace(/^The New\s+/i, '')
      .replace(/^Spelling\s+Exam\s+0*\d+\s*:?\s*/i, '')
      .replace(/^Parts of Speech\s+Exam\s+0*\d+\s*:?\s*/i, '')
      .replace(/^(?:Timed\s+)?Comprehension\s+Exam\s+0*\d+\s*:?\s*/i, '')
      .replace(/\s+Exam\s+0*\d+$/i, '')
      .replace(/\s+Exam$/i, '')
  );
}

function sameAssessmentGroup(question, firstQuestion) {
  return question?.category === firstQuestion?.category
    && question?.topicId === firstQuestion?.topicId
    && (question?.metadata?.learningAreaId || '') === (firstQuestion?.metadata?.learningAreaId || '');
}

function sequentialDisplayNumberFor(examId, questions = [], allQuestions = []) {
  const firstQuestion = questions[0];
  if (!firstQuestion || !allQuestions.length) return null;

  const groups = new Map();
  for (const question of allQuestions) {
    if (!isExamQuestion(question) || !sameAssessmentGroup(question, firstQuestion)) continue;

    const group = groups.get(question.metadata.examId) || [];
    group.push(question);
    groups.set(question.metadata.examId, group);
  }

  if (!groups.has(examId)) return null;

  const orderedGroups = Array.from(groups, ([groupExamId, groupQuestions]) => ({
    examId: groupExamId,
    sequence: Math.min(...groupQuestions.map(sequenceFor))
  })).sort((a, b) => {
    const sequenceDelta = a.sequence - b.sequence;
    return sequenceDelta || a.examId.localeCompare(b.examId);
  });

  const index = orderedGroups.findIndex((group) => group.examId === examId);
  return index >= 0 ? index + 1 : null;
}

function formatDuration(totalSeconds) {
  const minutes = Math.max(1, Math.ceil(totalSeconds / 60));
  return `${minutes} min`;
}

function formatDisplayTitle(prefix, displayNumber, topicTitle) {
  const numberedPrefix = displayNumber ? `${prefix} ${displayNumber}` : prefix;
  return topicTitle ? `${numberedPrefix}: ${topicTitle}` : numberedPrefix;
}

function formatPageTitle(prefix, displayNumber, gradeLabel, topicTitle) {
  const numberedPrefix = displayNumber ? `${prefix} ${displayNumber}` : prefix;
  const context = [gradeLabel, topicTitle].filter(Boolean).join(' - ');
  return context ? `${numberedPrefix}: ${context}` : formatDisplayTitle(prefix, displayNumber, topicTitle);
}

export function isExamQuestion(question) {
  return question?.metadata?.assessmentType === 'exam'
    && Boolean(question?.metadata?.examId);
}

export function buildExamDisplayMetadata(examId, questions = [], allQuestions = questions) {
  const orderedQuestions = [...questions].sort((a, b) => sequenceFor(a) - sequenceFor(b));
  const firstQuestion = orderedQuestions[0];
  const rawTitle = firstQuestion?.metadata?.examTitle || examId;

  if (!isCbcAssessment(firstQuestion)) {
    return {
      cardTitle: rawTitle,
      pageTitle: firstQuestion?.metadata?.examPageTitle || rawTitle,
      displayNumber: examNumberFrom(rawTitle) || examNumberFrom(examId),
      topicTitle: rawTitle,
      prefix: 'Exam',
      gradeLabel: ''
    };
  }

  const prefix = assessmentPrefixFor(firstQuestion);
  const displayNumber = (
    prefix === 'Spelling'
      ? null
      : sequentialDisplayNumberFor(examId, orderedQuestions, allQuestions)
  ) || examNumberFrom(rawTitle) || examNumberFrom(examId);
  const topicTitle = cleanTopicTitle(explicitTopicTitle(firstQuestion, rawTitle, examId));
  const gradeLabel = gradeLabelFor(firstQuestion);

  return {
    cardTitle: firstQuestion?.metadata?.examCardTitle || formatDisplayTitle(prefix, displayNumber, topicTitle),
    pageTitle: firstQuestion?.metadata?.examPageTitle || formatPageTitle(prefix, displayNumber, gradeLabel, topicTitle),
    displayNumber,
    topicTitle,
    prefix,
    gradeLabel
  };
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
    const readingGuideSeconds = Number(timedComprehension?.readingGuideSeconds) || 0;
    const questionTimeSeconds = Number(timedComprehension?.questionTimeSeconds) || secondsPerQuestion;
    const displayMetadata = buildExamDisplayMetadata(examId, orderedQuestions, questions);
    const totalSeconds = (orderedQuestions.length * questionTimeSeconds) + (isTimedComprehension ? readingGuideSeconds : 0);

    return {
      id: examId,
      type: 'exam',
      category: firstQuestion?.category,
      topicId: firstQuestion?.topicId,
      title: displayMetadata.cardTitle,
      difficulty: isTimedComprehension ? 'Timed Exam' : 'Exam',
      estimatedTime: formatDuration(totalSeconds),
      examQuestions: orderedQuestions,
      metadata: {
        assessmentType: 'exam-entry',
        examId,
        examTitle: firstQuestion?.metadata?.examTitle || examId,
        examCardTitle: displayMetadata.cardTitle,
        examPageTitle: displayMetadata.pageTitle,
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
