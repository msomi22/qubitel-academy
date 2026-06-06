function normalizeQuestionList(questions = []) {
  return (Array.isArray(questions) ? questions : [])
    .filter((question) => question?.id)
    .map((question) => ({
      id: question.id,
      title: question.title || question.question || question.id,
      topicId: question.topicId,
      category: question.category
    }));
}

function titleFromId(id = '') {
  return String(id)
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ') || 'Learning Area';
}

function getManifestEntry(question = {}) {
  return question.metadata?.manifestEntry || null;
}

function normalizeCategoryId(category) {
  if (!category) return '';
  if (typeof category === 'string') return category;
  return category.id || '';
}

function normalizeCategoryName(category) {
  if (!category || typeof category === 'string') return '';
  return category.name || category.title || category.id || '';
}

function getTopicLearningAreas(topic = {}) {
  return Array.isArray(topic.learningAreas) ? topic.learningAreas : [];
}

export function getQuestionLearningAreaId(question = {}) {
  return question.metadata?.learningAreaId
    || question.metadata?.strandId
    || getManifestEntry(question)?.learningAreaId
    || null;
}

export function getQuestionNavigationKind(question = {}) {
  const manifestKind = getManifestEntry(question)?.kind;
  if (manifestKind === 'lesson') return 'lesson';
  if (manifestKind === 'assessment') return 'assessment';
  if (manifestKind === 'practice') return 'practice';
  if (question.metadata?.assessmentType === 'exam' || question.metadata?.assessmentType === 'exam-entry') return 'assessment';
  if (question.type === 'learning') return 'lesson';
  return 'practice';
}

export function resolveQuestionNavigationScope({
  requestedLearningAreaId = '',
  question = {},
  topic = {},
  category = null
} = {}) {
  const questionLearningAreaId = getQuestionLearningAreaId(question);
  const learningAreaId = questionLearningAreaId || requestedLearningAreaId || '';
  const categoryId = question.category || topic.category || normalizeCategoryId(category);
  const topicId = question.topicId || topic.id || '';

  if (!learningAreaId || !categoryId || !topicId) return null;

  const manifestArea = getTopicLearningAreas(topic).find((area) => area.id === learningAreaId);
  const categoryName = normalizeCategoryName(category);

  return {
    categoryId,
    categoryName: categoryName || categoryId,
    topicId,
    topicName: topic.name || topic.displayName || topicId,
    learningAreaId,
    learningAreaTitle: manifestArea?.title
      || question.metadata?.learningAreaTitle
      || question.metadata?.strandTitle
      || titleFromId(learningAreaId),
    contentKind: getQuestionNavigationKind(question)
  };
}

export function questionMatchesNavigationScope(question = {}, scope = null) {
  if (!scope?.learningAreaId || !scope?.categoryId || !scope?.topicId) return false;

  return question.category === scope.categoryId
    && question.topicId === scope.topicId
    && getQuestionLearningAreaId(question) === scope.learningAreaId
    && getQuestionNavigationKind(question) === scope.contentKind;
}

export function getQuestionsForNavigationScope(questions = [], scope = null) {
  if (!scope) return [];
  return (Array.isArray(questions) ? questions : []).filter((question) => questionMatchesNavigationScope(question, scope));
}

export function buildProblemPath(questionId = '', scope = null) {
  const path = `/problem/${encodeURIComponent(questionId)}`;
  const learningAreaId = scope?.learningAreaId || '';
  if (!learningAreaId) return path;

  const params = new URLSearchParams({ scope: learningAreaId });
  return `${path}?${params.toString()}`;
}

export function getAdjacentQuestions(questions = [], currentQuestionId = '') {
  const rows = normalizeQuestionList(questions);
  const currentIndex = rows.findIndex((question) => question.id === currentQuestionId);

  if (currentIndex === -1) {
    return {
      previousQuestion: null,
      nextQuestion: null,
      currentIndex: -1,
      total: rows.length
    };
  }

  return {
    previousQuestion: rows[currentIndex - 1] || null,
    nextQuestion: rows[currentIndex + 1] || null,
    currentIndex,
    total: rows.length
  };
}

export function buildQuestionNavigationState({ returnToCategory } = {}) {
  return returnToCategory ? { returnToCategory } : undefined;
}
