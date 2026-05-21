import { categoryManifest, topicManifest, getTopicsByCategory } from '../data/topicManifest.js';
import { applyQuestionOverrides } from '../data/banks/question-overrides.js';
import {
  filterQuestionsForActiveProfile,
  filterTopicsForActiveProfile
} from '../config/contentProfile.js';
import {
  getDiscoveredQuestionsForTopic,
  getProblemValidationResult
} from '../problems/problemDiscovery.js';
import { normalizeProblem } from '../problems/normalizeProblem.js';

const bankModules = import.meta.env
  ? import.meta.glob('../data/banks/**/*.js')
  : {};

function getTopic(topicId, topics = topicManifest) {
  const topic = topics.find((item) => item.id === topicId);
  if (!topic) throw new Error(`Unknown topic bank: ${topicId}`);
  return topic;
}

export function getOptionalBankPath(topic, modules = bankModules) {
  if (!topic?.category || !topic?.id) return null;

  const path = `../data/banks/${topic.category}/${topic.id}.js`;
  return modules[path] ? path : null;
}

export function createVirtualBank(topic, questions = []) {
  return {
    id: topic.id,
    name: topic.name,
    category: topic.category,
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
    `Missing quiz bank file for ${topic.id}. Expected: src/data/banks/${topic.category}/${topic.id}.js. `
    + 'Add discovered problems for this topic or set questionBank.mode to "discovered" or "empty" in topicManifest.'
  );
}

export async function loadLegacyBankIfPresent(topic, modules = bankModules) {
  const path = getOptionalBankPath(topic, modules);
  if (!path) return null;

  const module = await modules[path]();
  return applyQuestionOverrides(module.default);
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

function applyContentProfileToBank(bank) {
  return {
    ...bank,
    questions: filterQuestionsForActiveProfile(bank.questions || [])
  };
}

export async function loadTopicBankFromSources(topicId, options = {}) {
  const topic = getTopic(topicId, options.topics || topicManifest);
  const modules = options.modules || bankModules;
  const getDiscoveredQuestions = options.getDiscoveredQuestions || getDiscoveredQuestionsForTopic;

  const discoveredQuestions = await getDiscoveredQuestions(topicId);
  const legacyBank = await loadLegacyBankIfPresent(topic, modules);

  if (!legacyBank) {
    assertCanUseVirtualBank(topic, discoveredQuestions);
  }

  const baseBank = legacyBank || createVirtualBank(topic);
  const withLegacySources = await mergeLegacyQuestionSources(baseBank, topic, modules);
  const withDiscoveredQuestions = mergeDiscoveredQuestions(withLegacySources, discoveredQuestions);
  const normalized = normalizeQuestionTypes(withDiscoveredQuestions);

  return applyContentProfileToBank(normalized);
}

const bankCache = new Map();
const countCache = new Map();

export const categories = categoryManifest;
export const allTopics = filterTopicsForActiveProfile(topicManifest);
export const dsaTopics = filterTopicsForActiveProfile(getTopicsByCategory('dsa'));
export const systemDesignTopics = filterTopicsForActiveProfile(getTopicsByCategory('system'));

export function getCategory(categoryId) {
  return categories.find((category) => category.id === categoryId);
}

export function getTopicsForCategory(categoryId) {
  return filterTopicsForActiveProfile(getTopicsByCategory(categoryId));
}

export async function loadTopicBank(topicId) {
  if (!bankCache.has(topicId)) {
    bankCache.set(topicId, loadTopicBankFromSources(topicId));
  }

  return bankCache.get(topicId);
}

export async function getTopicCount(topicId) {
  if (!countCache.has(topicId)) {
    countCache.set(topicId, loadTopicBank(topicId).then((bank) => bank.questions.length));
  }
  return countCache.get(topicId);
}

export async function getTopicWithCount(topic) {
  const count = await getTopicCount(topic.id);
  return { ...topic, count };
}

export async function getTopicsWithCounts(categoryId) {
  const topics = getTopicsForCategory(categoryId);
  return Promise.all(topics.map(getTopicWithCount));
}

export async function getAllTopicsWithCounts() {
  return Promise.all(allTopics.map(getTopicWithCount));
}

export function getCategorySummaries() {
  return categories.map((category) => {
    const topics = getTopicsForCategory(category.id);
    return {
      ...category,
      topicCount: topics.length
    };
  });
}

export async function getCategoryWithCounts(categoryId, completed = {}) {
  const category = getCategory(categoryId);
  if (!category) return null;

  const topics = await getTopicsWithCounts(categoryId);
  const quizCount = topics.reduce((sum, topic) => sum + topic.count, 0);
  const done = topics.reduce((sum, topic) => sum + topicProgress(topic, completed).done, 0);

  return {
    ...category,
    topicCount: topics.length,
    quizCount,
    done,
    progressPercent: quizCount ? Math.round((done / quizCount) * 100) : 0
  };
}

export async function getCategoriesWithCounts(completed = {}) {
  const summaries = getCategorySummaries();
  const enriched = await Promise.all(summaries.map((category) => getCategoryWithCounts(category.id, completed)));
  return enriched.filter(Boolean);
}

export async function loadTopicBanks(topicIds) {
  return Promise.all(topicIds.map(loadTopicBank));
}

export async function getRandomQuestion(filters = {}) {
  const candidates = allTopics.filter((topic) => {
    if (filters.category && topic.category !== filters.category) return false;
    if (filters.topicId && topic.id !== filters.topicId) return false;
    return true;
  });

  for (const pickedTopic of candidates.sort(() => Math.random() - 0.5)) {
    const bank = await loadTopicBank(pickedTopic.id);
    if (!bank.questions.length) continue;

    const question = bank.questions[Math.floor(Math.random() * bank.questions.length)];
    return { ...question, parentTopic: bank.name, category: bank.category };
  }

  throw new Error('No questions available for the selected filters.');
}

export async function findQuestionById(questionId) {
  for (const topic of allTopics) {
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

export async function progressSummary(completed = {}) {
  const topicsWithCounts = await getAllTopicsWithCounts();
  const total = topicsWithCounts.reduce((sum, topic) => sum + topic.count, 0);
  const done = Object.keys(completed).filter((id) => completed[id]).length;

  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

export function topicProgress(topic, completed = {}) {
  const total = Number(topic.count ?? 0);
  const prefix = `${topic.id}-`;
  const done = Object.keys(completed).filter((id) => completed[id] && id.startsWith(prefix)).length;

  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

export { getProblemValidationResult };
