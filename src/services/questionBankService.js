import {
  categoryManifest,
  getTopicsByCategory,
  topicManifest
} from '../academies/catalog.js';
import { applyQuestionOverrides } from '../academies/tech/_legacy/banks/question-overrides.js';
import { DEFAULT_ACADEMY_ID } from '../config/academyRegistry.ts';
import {
  filterCategoriesForActiveProfile,
  filterQuestionsForActiveProfile,
  filterTopicsForActiveProfile
} from '../config/contentProfile.js';
import {
  discoverProblems,
  getDiscoveredQuestionsForTopic,
  getProblemValidationResult
} from '../problems/problemDiscovery.js';
import { normalizeProblem } from '../problems/normalizeProblem.js';
import { isExamQuestion } from './examAttemptService.js';

const bankModules = import.meta.env
  ? import.meta.glob('../academies/*/_legacy/banks/**/*.js')
  : {};

function getTopic(topicId, topics = topicManifest) {
  const topic = topics.find((item) => item.id === topicId);
  if (!topic) throw new Error(`Unknown topic bank: ${topicId}`);
  return topic;
}

function getTopicsByCategoryFrom(categoryId, topics = topicManifest) {
  return topics.filter((topic) => topic.category === categoryId);
}

function hasExplicitQuestionsOption(options = {}) {
  return Object.prototype.hasOwnProperty.call(options, 'questions');
}

function hasCustomBankSourceOptions(options = {}) {
  return Boolean(
    options.modules
    || options.topics
    || options.profile
    || options.getDiscoveredQuestions
    || options.getAllDiscoveredQuestions
    || hasExplicitQuestionsOption(options)
  );
}

function resolveCategory(categoryOrId, options = {}) {
  if (categoryOrId && typeof categoryOrId === 'object') return categoryOrId;

  return getCategory(categoryOrId)
    || (options.categories || []).find((category) => category.id === categoryOrId)
    || null;
}

export function getOptionalBankPath(topic, modules = bankModules) {
  if (!topic?.category || !topic?.id) return null;

  const academyId = topic.academyId || topic.academy || DEFAULT_ACADEMY_ID;
  const candidates = [
    topic?.questionBank?.legacyPath,
    `../academies/${academyId}/_legacy/banks/${topic.category}/${topic.id}.js`
  ].filter(Boolean);

  return candidates.find((path) => modules[path]) || null;
}

export function createVirtualBank(topic, questions = []) {
  return {
    id: topic.id,
    name: topic.name,
    category: topic.category,
    academyId: topic.academyId || topic.academy,
    description: topic.description,
    questions
  };
}

export function canUseVirtualBank(topic, discoveredQuestions = []) {
  return discoveredQuestions.length > 0
    || topic?.allowVirtualBank === true
    || topic?.questionBank?.allowVirtual === true
    || topic?.questionBank?.mode === 'discovered'
    || topic?.questionBank?.mode === 'empty';
}

export function assertCanUseVirtualBank(topic, discoveredQuestions = []) {
  if (canUseVirtualBank(topic, discoveredQuestions)) return;

  throw new Error(
    `Missing quiz bank file for ${topic.id}. Expected academy-scoped legacy bank or authored content. `
    + 'Add content under src/academies/<academy>/<category>/<topic>/ or set questionBank.mode to "empty".'
  );
}

export async function loadLegacyBankIfPresent(topic, modules = bankModules) {
  const path = getOptionalBankPath(topic, modules);
  if (!path) return null;

  const module = await modules[path]();
  const academyId = topic.academyId || topic.academy || DEFAULT_ACADEMY_ID;
  return academyId === DEFAULT_ACADEMY_ID
    ? applyQuestionOverrides(module.default)
    : module.default;
}

function normalizeSystemQuestion(question) {
  const normalized = normalizeProblem(question);

  if (normalized.type === 'complex-system-design') return normalized;

  return {
    ...normalized,
    difficulty: 'Easy'
  };
}

function normalizeQuestionTypes(bank) {
  if (bank.category !== 'system') return bank;

  return {
    ...bank,
    questions: (bank.questions || []).map((question) => normalizeSystemQuestion(question))
  };
}

function resolveLegacyMergePath(mergeConfig) {
  if (typeof mergeConfig === 'string') return mergeConfig;
  return mergeConfig?.path || null;
}

function applyLegacyMergeConfig(question, mergeConfig = {}) {
  const idPrefixFrom = mergeConfig.idPrefixFrom || '';
  const idPrefixTo = mergeConfig.idPrefixTo || '';
  const mergedTags = [...new Set([...(question.tags || []), ...(mergeConfig.tags || [])])];

  return {
    ...question,
    id: idPrefixFrom ? question.id.replace(new RegExp(`^${idPrefixFrom}`), idPrefixTo) : question.id,
    topicId: mergeConfig.topicId ?? question.topicId,
    finalPattern: mergeConfig.finalPattern ?? question.finalPattern,
    tags: mergedTags
  };
}

export async function mergeLegacyQuestionSources(bank, topic, modules = bankModules) {
  const legacyMerges = topic?.questionBank?.legacyMerges || [];
  if (!legacyMerges.length) return bank;

  let mergedQuestions = [...(bank.questions || [])];
  const existingIds = new Set(mergedQuestions.map((question) => question.id));

  for (const mergeConfig of legacyMerges) {
    const path = resolveLegacyMergePath(mergeConfig);
    if (!path || !modules[path]) continue;

    const module = await modules[path]();
    const sourceBank = module.default;
    const sourceQuestions = (sourceBank.questions || [])
      .map((question) => applyLegacyMergeConfig(question, mergeConfig))
      .filter((question) => !existingIds.has(question.id));

    for (const question of sourceQuestions) {
      existingIds.add(question.id);
    }

    mergedQuestions = [...mergedQuestions, ...sourceQuestions];
  }

  return {
    ...bank,
    questions: mergedQuestions
  };
}

export function mergeQuestionsById(primaryQuestions = [], fallbackQuestions = []) {
  const mergedQuestions = [];
  const seenIds = new Set();

  for (const question of [...primaryQuestions, ...fallbackQuestions]) {
    if (!question?.id || seenIds.has(question.id)) continue;

    seenIds.add(question.id);
    mergedQuestions.push(question);
  }

  return mergedQuestions;
}

function mergeDiscoveredQuestions(bank, discoveredQuestions = []) {
  const questions = mergeQuestionsById(discoveredQuestions, bank.questions || []);

  if (questions.length === (bank.questions || []).length && !discoveredQuestions.length) return bank;

  return {
    ...bank,
    questions
  };
}

function applyContentProfileToBank(bank, options = {}) {
  return {
    ...bank,
    questions: filterQuestionsForActiveProfile(bank.questions || [], options)
  };
}

export async function loadTopicBankFromSources(topicId, options = {}) {
  const topic = getTopic(topicId, options.topics || topicManifest);
  const modules = options.modules || bankModules;
  const getDiscoveredQuestions = options.getDiscoveredQuestions || getDiscoveredQuestionsForTopic;

  const discoveredQuestions = await getDiscoveredQuestions(topicId, {
    academyId: topic.academyId || topic.academy
  });
  const legacyBank = await loadLegacyBankIfPresent(topic, modules);

  if (!legacyBank) {
    assertCanUseVirtualBank(topic, discoveredQuestions);
  }

  const baseBank = legacyBank || createVirtualBank(topic);
  const withLegacySources = await mergeLegacyQuestionSources(baseBank, topic, modules);
  const withDiscoveredQuestions = mergeDiscoveredQuestions(withLegacySources, discoveredQuestions);
  const normalized = normalizeQuestionTypes(withDiscoveredQuestions);

  return applyContentProfileToBank(normalized, options);
}

const bankCache = new Map();
let discoveredQuestionsCache;
let visibleTopicsCache;
let visibleCategoriesCache;

async function getAllDiscoveredQuestions() {
  if (!discoveredQuestionsCache) {
    discoveredQuestionsCache = discoverProblems();
  }

  return discoveredQuestionsCache;
}

async function getQuestionsForProfileOptions(options = {}) {
  if (hasExplicitQuestionsOption(options)) return options.questions || [];
  if (options.getAllDiscoveredQuestions) return options.getAllDiscoveredQuestions();
  return getAllDiscoveredQuestions();
}

async function getVisibleTopics() {
  if (!visibleTopicsCache) {
    visibleTopicsCache = getAllDiscoveredQuestions()
      .then((questions) => filterTopicsForActiveProfile(topicManifest, questions));
  }

  return visibleTopicsCache;
}

async function getVisibleCategories() {
  if (!visibleCategoriesCache) {
    visibleCategoriesCache = getAllDiscoveredQuestions()
      .then((questions) => filterCategoriesForActiveProfile(categoryManifest, topicManifest, questions));
  }

  return visibleCategoriesCache;
}

export const categories = categoryManifest;
export const allTopics = filterTopicsForActiveProfile(topicManifest);
export const dsaTopics = filterTopicsForActiveProfile(getTopicsByCategory('dsa'));
export const systemDesignTopics = filterTopicsForActiveProfile(getTopicsByCategory('system'));
export const javaTopics = filterTopicsForActiveProfile(getTopicsByCategory('java'));
export const kubernetesCkadTopics = filterTopicsForActiveProfile(getTopicsByCategory('kubernetes-ckad'));
export const aptitudeTopics = filterTopicsForActiveProfile(getTopicsByCategory('aptitude'));
export const mlAiTopics = filterTopicsForActiveProfile(getTopicsByCategory('ml-ai'));
export const engineeringLeadershipTopics = filterTopicsForActiveProfile(getTopicsByCategory('engineering-leadership'));

export function getCategory(categoryId) {
  return categories.find((category) => category.id === categoryId);
}

export function getTopicsForCategory(categoryId) {
  return filterTopicsForActiveProfile(getTopicsByCategory(categoryId));
}

export async function getVisibleCategoriesForActiveProfile(options = {}) {
  if (options.categories || options.topics || options.profile || hasExplicitQuestionsOption(options)) {
    const questions = await getQuestionsForProfileOptions(options);

    return filterCategoriesForActiveProfile(
      options.categories || categoryManifest,
      options.topics || topicManifest,
      questions,
      options
    );
  }

  return getVisibleCategories();
}

export async function getVisibleTopicsForActiveProfile(options = {}) {
  if (options.topics || options.profile || hasExplicitQuestionsOption(options)) {
    const questions = await getQuestionsForProfileOptions(options);

    return filterTopicsForActiveProfile(
      options.topics || topicManifest,
      questions,
      options
    );
  }

  return getVisibleTopics();
}

export async function getVisibleTopicsForCategory(categoryId, options = {}) {
  if (options.topics || options.profile || hasExplicitQuestionsOption(options)) {
    const topics = await getVisibleTopicsForActiveProfile(options);
    return topics.filter((topic) => topic.category === categoryId);
  }

  const topics = await getVisibleTopics();
  return topics.filter((topic) => topic.category === categoryId);
}

export async function loadTopicBank(topicId, options = {}) {
  if (hasCustomBankSourceOptions(options)) {
    return loadTopicBankFromSources(topicId, options);
  }

  if (!bankCache.has(topicId)) {
    bankCache.set(topicId, loadTopicBankFromSources(topicId));
  }

  return bankCache.get(topicId);
}

export async function getTopicCount(topicId, options = {}) {
  const bank = await loadTopicBank(topicId, options);
  return bank.questions.length;
}

export async function getTopicWithCount(topic, options = {}) {
  const count = await getTopicCount(topic.id, options);
  return { ...topic, count };
}

export async function getTopicsWithCounts(categoryId, options = {}) {
  const topics = await getVisibleTopicsForCategory(categoryId, options);
  return Promise.all(topics.map((topic) => getTopicWithCount(topic, options)));
}

export async function getAllTopicsWithCounts(options = {}) {
  const topics = await getVisibleTopicsForActiveProfile(options);
  return Promise.all(topics.map((topic) => getTopicWithCount(topic, options)));
}

export async function getCategorySummaries(options = {}) {
  const visibleCategories = await getVisibleCategoriesForActiveProfile(options);

  return Promise.all(visibleCategories.map(async (category) => {
    const topics = await getVisibleTopicsForCategory(category.id, options);
    return {
      ...category,
      topicCount: topics.length
    };
  }));
}

export async function getCategoryWithCounts(categoryOrId, completed = {}, options = {}) {
  const category = resolveCategory(categoryOrId, options);
  if (!category) return null;

  const topics = await getTopicsWithCounts(category.id, options);
  if (!topics.length) return null;

  const quizCount = topics.reduce((sum, topic) => topic.count + sum, 0);
  const done = topics.reduce((sum, topic) => topicProgress(topic, completed).done + sum, 0);

  return {
    ...category,
    topicCount: topics.length,
    quizCount,
    done,
    progressPercent: quizCount ? Math.round((done / quizCount) * 100) : 0
  };
}

export async function getCategoriesWithCounts(completed = {}, options = {}) {
  const summaries = await getCategorySummaries(options);
  const enriched = await Promise.all(summaries.map((category) => getCategoryWithCounts(category, completed, options)));
  return enriched.filter(Boolean);
}

export async function loadTopicBanks(topicIds, options = {}) {
  return Promise.all(topicIds.map((topicId) => loadTopicBank(topicId, options)));
}

export function normalizeRandomQuestionFilters(filters = {}) {
  return {
    category: filters.category && filters.category !== 'all' ? filters.category : null,
    topicId: filters.topicId || null
  };
}

export async function getRandomQuestion(filters = {}, options = {}) {
  const normalizedFilters = normalizeRandomQuestionFilters(filters);
  const topics = await getVisibleTopicsForActiveProfile(options);
  const candidates = topics.filter((topic) => {
    if (normalizedFilters.category && topic.category !== normalizedFilters.category) return false;
    if (normalizedFilters.topicId && topic.id !== normalizedFilters.topicId) return false;
    return true;
  });

  for (const pickedTopic of candidates.sort(() => Math.random() - 0.5)) {
    const bank = await loadTopicBank(pickedTopic.id, options);
    if (!bank.questions.length) continue;

    const question = bank.questions[Math.floor(Math.random() * bank.questions.length)];
    return { ...question, parentTopic: bank.name, category: bank.category };
  }

  throw new Error('No questions available for the selected filters.');
}

export async function findQuestionById(questionId) {
  const topics = await getVisibleTopics();

  for (const topic of topics) {
    const bank = await loadTopicBank(topic.id);
    const question = bank.questions.find((item) => item.id === questionId);

    if (question) {
      const category = getCategory(topic.category);
      return {
        question,
        topic: { ...topic, count: bank.questions.length },
        bank,
        category,
        categoryName: category?.name || topic.category
      };
    }
  }

  return null;
}

export async function findExamById(examId) {
  const topics = await getVisibleTopics();

  for (const topic of topics) {
    const bank = await loadTopicBank(topic.id);
    const questions = bank.questions
      .filter((question) => isExamQuestion(question) && question.metadata.examId === examId)
      .sort((a, b) => Number(a.metadata.sequence || 0) - Number(b.metadata.sequence || 0));

    if (questions.length) {
      const category = getCategory(topic.category);
      return {
        examId,
        examTitle: questions[0].metadata.examTitle || examId,
        questions,
        topic,
        category,
        categoryName: category?.name || topic.category
      };
    }
  }

  return null;
}

export async function progressSummary(completed = {}, options = {}) {
  const topicsWithCounts = await getAllTopicsWithCounts(options);
  const total = topicsWithCounts.reduce((sum, topic) => sum + topic.count, 0);
  const visibleQuestionIds = new Set();

  for (const topic of topicsWithCounts) {
    const bank = await loadTopicBank(topic.id, options);
    for (const question of bank.questions || []) {
      visibleQuestionIds.add(question.id);
    }
  }

  const done = Object.keys(completed).filter((id) => completed[id] && visibleQuestionIds.has(id)).length;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

export function topicProgress(topic, completed = {}) {
  const total = Number(topic.count ?? 0);
  const prefix = `${topic.id}-`;
  const done = Object.keys(completed).filter((id) => completed[id] && id.startsWith(prefix)).length;

  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

export { getProblemValidationResult };
