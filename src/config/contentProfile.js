function readContentProfile() {
  const viteProfile = import.meta.env?.VITE_CONTENT_PROFILE;
  const nodeProfile = typeof process !== 'undefined'
    ? process.env?.VITE_CONTENT_PROFILE
    : undefined;

  return viteProfile || nodeProfile || 'dev';
}

const CONTENT_PROFILE = readContentProfile();

const APPROVED_PROD_QUESTION_IDS = new Set([
  'sliding-window-001',
  'dynamic-programming-020',
  'api-design-rate-limiting-001',
  'caching-product-details-001',
  'messaging-queues-email-notification-001',
  'api-design-payment-idempotency-001',
  'scalability-realtime-updates-001',
  'databases-multi-region-consistency-001',
  'scalability-url-shortener-001'
]);

const APPROVED_PROD_TOPIC_IDS = new Set(
  Array.from(APPROVED_PROD_QUESTION_IDS)
    .map((questionId) => questionId.split('-').slice(0, -1).join('-'))
    .filter(Boolean)
);

export function getContentProfile() {
  return CONTENT_PROFILE;
}

export function isProductionContentProfile() {
  return CONTENT_PROFILE === 'prod';
}

export function isQuestionApprovedForProfile(question) {
  if (!isProductionContentProfile()) return true;

  return (
    APPROVED_PROD_QUESTION_IDS.has(question.id) ||
    APPROVED_PROD_TOPIC_IDS.has(question.topicId)
  );
}

export function filterQuestionsForActiveProfile(questions = []) {
  return questions.filter(isQuestionApprovedForProfile);
}

export function isTopicVisibleForActiveProfile(topicId) {
  if (!isProductionContentProfile()) return true;

  return APPROVED_PROD_TOPIC_IDS.has(topicId);
}

export function filterTopicsForActiveProfile(topics = []) {
  return topics.filter((topic) => isTopicVisibleForActiveProfile(topic.id));
}
