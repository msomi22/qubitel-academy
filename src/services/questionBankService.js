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

const bankModules = import.meta.env
  ? import.meta.glob('../data/banks/**/*.js')
  : {};
const SIMPLE_SYSTEM_DESIGN_TYPES = new Set(['system-design', 'production-scenario']);
const COMPLEX_SYSTEM_DESIGN_BANK_PATH = '../data/banks/system/complex-system-design.js';

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

function normalizeSimpleSystemDesignTags(tags = []) {
  const normalizedTags = tags.map((tag) => (
    SIMPLE_SYSTEM_DESIGN_TYPES.has(tag) ? 'simple-system-design' : tag
  ));

  return [...new Set(normalizedTags)];
}

function normalizeQuestionTypes(bank) {
  if (bank.category !== 'system') return bank;

  return {
    ...bank,
    questions: (bank.questions || []).map((question) => {
      if (question.type === 'complex-system-design') return question;

      if (SIMPLE_SYSTEM_DESIGN_TYPES.has(question.type)) {
        return {
          ...question,
          type: 'simple-system-design',
          difficulty: 'Easy',
          tags: normalizeSimpleSystemDesignTags(question.tags)
        };
      }

      return {
        ...question,
        difficulty: 'Easy'
      };
    })
  };
}

async function mergeComplexDesignQuestions(bank, modules = bankModules) {
  if (bank.id !== 'scalability') return bank;
  if (!modules[COMPLEX_SYSTEM_DESIGN_BANK_PATH]) return bank;

  const module = await modules[COMPLEX_SYSTEM_DESIGN_BANK_PATH]();
  const complexBank = module.default;
  const existingIds = new Set((bank.questions || []).map((question) => question.id));
  const complexQuestions = (complexBank.questions || [])
    .map((question) => ({
      ...question,
      id: question.id.replace(/^complex-system-design-/, 'scalability-'),
      topicId: 'scalability',
      finalPattern: 'Scalability',
      tags: [...new Set([...(question.tags || []), 'scalability'])]
    }))
    .filter((question) => !existingIds.has(question.id));

  return {
    ...bank,
    questions: [...(bank.questions || []), ...complexQuestions]
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
  const merged = await mergeComplexDesignQuestions(baseBank, modules);
  const normalized = normalizeQuestionTypes(merged);
  const withDiscoveredQuestions = mergeDiscoveredQuestions(normalized, discoveredQuestions);

  return applyContentProfileToBank(withDiscoveredQuestions);
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
