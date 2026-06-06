function readContentProfile() {
  const viteProfile = import.meta.env?.VITE_CONTENT_PROFILE;
  const nodeProfile = typeof process !== 'undefined'
    ? process.env?.VITE_CONTENT_PROFILE
    : undefined;

  return viteProfile || nodeProfile || 'dev';
}

const CONTENT_PROFILE = readContentProfile();

const APPROVED_PROD_QUESTION_IDS = new Set([]);

const APPROVED_PROD_TOPIC_IDS = new Set([
  'sliding-window',
  'dynamic-programming',
  'graphs',
  'two-pointers',
  'binary-search',
  'prefix-sum-hashing',
  'monotonic-stack-queue',
  'recursion',
  'api-design',
  'caching',
  'messaging-queues',
  'scalability',
  'databases',
  'java-core',
  'ckad-preparation',
  'workloads-services',
  'numerical-reasoning',
  'ml-foundations',
  'management-track'
]);

function resolveProfile(options = {}) {
  return options.profile || CONTENT_PROFILE;
}

function isProductionProfile(options = {}) {
  return resolveProfile(options) === 'prod';
}

function hasEmptyVisibilityList(question) {
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
  if (!isProductionProfile(options)) return !hasEmptyVisibilityList(question);

  if (isProblemApprovedForProduction(question)) return true;

  return isLegacyQuestionApprovedForProduction(question);
}

export function filterQuestionsForActiveProfile(questions = [], options = {}) {
  return questions.filter((question) => isQuestionApprovedForProfile(question, options));
}

function questionMatchesTopic(topicOrId, question) {
  if (typeof topicOrId === 'string') return question?.topicId === topicOrId;

  return question?.topicId === topicOrId?.id
    && (!topicOrId?.category || !question?.category || question.category === topicOrId.category);
}

export function hasVisibleQuestionForTopic(topicOrId, questions = [], options = {}) {
  return questions.some((question) => (
    questionMatchesTopic(topicOrId, question) && isQuestionApprovedForProfile(question, options)
  ));
}

export function isTopicVisibleForActiveProfile(topicOrId, questions = [], options = {}) {
  const topicId = typeof topicOrId === 'string' ? topicOrId : topicOrId?.id;
  if (!isProductionProfile(options)) return true;

  if (hasVisibleQuestionForTopic(topicOrId, questions, options)) return true;

  return APPROVED_PROD_TOPIC_IDS.has(topicId);
}

export function filterTopicsForActiveProfile(topics = [], questions = [], options = {}) {
  return topics.filter((topic) => isTopicVisibleForActiveProfile(topic, questions, options));
}

export function filterCategoriesForActiveProfile(categories = [], topics = [], questions = [], options = {}) {
  if (!isProductionProfile(options)) return categories;

  const visibleTopics = filterTopicsForActiveProfile(topics, questions, options);
  const visibleCategoryIds = new Set(visibleTopics.map((topic) => topic.category));

  return categories.filter((category) => visibleCategoryIds.has(category.id));
}
