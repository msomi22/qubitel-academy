function readContentProfile() {
  const viteProfile = import.meta.env?.VITE_CONTENT_PROFILE;
  const nodeProfile = typeof process !== 'undefined'
    ? process.env?.VITE_CONTENT_PROFILE
    : undefined;

  return viteProfile || nodeProfile || 'dev';
}

const CONTENT_PROFILE = readContentProfile();

// Intentionally empty after production-visible System Design and DSA content moved
// to discovered problem files under src/data/problems/**. Keep this hook only so
// older callers can safely ask whether a legacy question has explicit production
// approval without reintroducing per-question allow-list approvals.
const APPROVED_PROD_QUESTION_IDS = new Set([]);

// Topic fallback keeps production topic/category pages stable for callers that do
// not yet pass discovered questions into the visibility filter. This is a topic
// visibility compatibility hook only; it must not approve individual questions.
const APPROVED_PROD_TOPIC_IDS = new Set([
  'sliding-window',
  'dynamic-programming',
  'graphs',
  'two-pointers',
  'binary-search',
  'prefix-sum-hashing',
  'monotonic-stack-queue',
  'api-design',
  'caching',
  'messaging-queues',
  'scalability',
  'databases',
  'java-core'
]);

function resolveProfile(options = {}) {
  return options.profile || CONTENT_PROFILE;
}

function isProductionProfile(options = {}) {
  return resolveProfile(options) === 'prod';
}

function hasExplicitHiddenVisibility(question) {
  const visibility = question?.metadata?.visibility;
  return Array.isArray(visibility) && visibility.length === 0;
}

export function getContentProfile() {
  return CONTENT_PROFILE;
}

export function isProductionContentProfile() {
  return isProductionProfile();
}

export function isProblemApprovedForProduction(question) {
  return question?.metadata?.reviewStatus === 'approved'
    && Array.isArray(question?.metadata?.visibility)
    && question.metadata.visibility.includes('prod');
}

export function isLegacyQuestionApprovedForProduction(question) {
  return APPROVED_PROD_QUESTION_IDS.has(question?.id);
}

export function isQuestionApprovedForProfile(question, options = {}) {
  if (!isProductionProfile(options)) return !hasExplicitHiddenVisibility(question);

  if (isProblemApprovedForProduction(question)) return true;

  return isLegacyQuestionApprovedForProduction(question);
}

export function filterQuestionsForActiveProfile(questions = [], options = {}) {
  return questions.filter((question) => isQuestionApprovedForProfile(question, options));
}

export function hasVisibleQuestionForTopic(topicId, questions = [], options = {}) {
  return questions.some((question) => (
    question?.topicId === topicId && isQuestionApprovedForProfile(question, options)
  ));
}

export function isTopicVisibleForActiveProfile(topicId, questions = [], options = {}) {
  if (!isProductionProfile(options)) return true;

  if (hasVisibleQuestionForTopic(topicId, questions, options)) return true;

  return APPROVED_PROD_TOPIC_IDS.has(topicId);
}

export function filterTopicsForActiveProfile(topics = [], questions = [], options = {}) {
  return topics.filter((topic) => isTopicVisibleForActiveProfile(topic.id, questions, options));
}

export function filterCategoriesForActiveProfile(categories = [], topics = [], questions = [], options = {}) {
  if (!isProductionProfile(options)) return categories;

  const visibleTopics = filterTopicsForActiveProfile(topics, questions, options);
  const visibleCategoryIds = new Set(visibleTopics.map((topic) => topic.category));

  return categories.filter((category) => visibleCategoryIds.has(category.id));
}
