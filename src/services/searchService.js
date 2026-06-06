import { searchConfig } from '../config/searchConfig.js';
import { loadTopicBank } from './questionBankService.js';

const indexCache = new Map();
const EMPTY_FILTER = 'All';

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactJoin(parts) {
  return parts
    .flatMap((part) => Array.isArray(part) ? part : [part])
    .filter(Boolean)
    .join(' ');
}

function buildSearchText(question, topic) {
  return normalize(compactJoin([
    topic.id,
    topic.name,
    topic.description,
    topic.category,
    question.id,
    question.category,
    question.topicId,
    question.type,
    question.title,
    question.difficulty,
    question.estimatedTime,
    question.tags,
    question.scenario,
    question.prompt,
    question.question,
    question.starterThought,
    question.constraints,
    question.hints,
    question.intuition,
    question.visualExplanation,
    question.stepByStepBreakdown,
    question.bruteForceThought,
    question.optimizationJourney,
    question.finalPattern,
    question.explanation,
    question.complexityAnalysis,
    question.engineeringInsight,
    question.productionReality,
    question.commonMistake,
    question.commonMistakes,
    question.followUpQuestion,
    question.followUpQuestions,
    question.relatedConcepts,
    question.references
  ]));
}

function makeSnippet(question) {
  const text = question.scenario || question.question || question.prompt || question.explanation || '';
  if (text.length <= searchConfig.maxIndexedSnippetLength) return text;
  return `${text.slice(0, searchConfig.maxIndexedSnippetLength).trim()}…`;
}

function scoreEntry(entry, tokens, rawQuery) {
  if (!tokens.length) return 1;

  const title = normalize(entry.question.title);
  const tags = normalize(entry.question.tags?.join(' '));
  const scenario = normalize(entry.question.scenario);
  const prompt = normalize(compactJoin([entry.question.prompt, entry.question.question]));
  const topicName = normalize(entry.topicName);
  const topicId = normalize(entry.topicId);
  const category = normalize(entry.category);
  const finalPattern = normalize(entry.question.finalPattern);

  let score = 0;

  if (title.includes(rawQuery)) score += 30;
  if (tags.includes(rawQuery)) score += 22;
  if (topicName.includes(rawQuery)) score += 18;
  if (topicId.includes(rawQuery)) score += 16;
  if (category.includes(rawQuery)) score += 15;
  if (prompt.includes(rawQuery)) score += 14;
  if (finalPattern.includes(rawQuery)) score += 12;
  if (scenario.includes(rawQuery)) score += 10;

  for (const token of tokens) {
    if (title.includes(token)) score += 8;
    if (tags.includes(token)) score += 7;
    if (topicName.includes(token)) score += 5;
    if (topicId.includes(token)) score += 5;
    if (category.includes(token)) score += 5;
    if (prompt.includes(token)) score += 4;
    if (finalPattern.includes(token)) score += 4;
    if (scenario.includes(token)) score += 3;
    if (entry.searchText.includes(token)) score += 1;
  }

  return score;
}

export async function buildSearchIndex(topics) {
  const key = topics.map((topic) => `${topic.category}/${topic.id}`).join('|');
  if (indexCache.has(key)) return indexCache.get(key);

  const indexPromise = Promise.all(topics.map(async (topicMeta) => {
    const bank = await loadTopicBank(topicMeta.id, { categoryId: topicMeta.category });
    return bank.questions.map((question) => ({
      id: question.id,
      topicId: bank.id,
      topicName: bank.name,
      topicDescription: bank.description,
      category: bank.category,
      difficulty: question.difficulty,
      type: question.type,
      tags: question.tags || [],
      snippet: makeSnippet(question),
      question,
      searchText: buildSearchText(question, bank)
    }));
  })).then((groups) => groups.flat());

  indexCache.set(key, indexPromise);
  return indexPromise;
}

export function searchQuestionIndex(index, filters = {}) {
  const query = normalize(filters.query);
  const tokens = query.split(' ').filter(Boolean);
  const hasSearch = query.length >= searchConfig.minimumQueryLength;
  const hasFilters = [filters.category, filters.topicId, filters.difficulty, filters.type].some(
    (value) => value && value !== EMPTY_FILTER
  );

  if (!hasSearch && !hasFilters) return [];

  return index
    .map((entry) => {
      if (filters.category && filters.category !== EMPTY_FILTER && entry.category !== filters.category) return null;
      if (filters.topicId && filters.topicId !== EMPTY_FILTER && entry.topicId !== filters.topicId) return null;
      if (filters.difficulty && filters.difficulty !== EMPTY_FILTER && entry.difficulty !== filters.difficulty) return null;
      if (filters.type && filters.type !== EMPTY_FILTER && entry.type !== filters.type) return null;

      const score = hasSearch ? scoreEntry(entry, tokens, query) : 1;
      if (hasSearch && score <= 0) return null;

      return { ...entry, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.question.title.localeCompare(b.question.title));
}
