import { topicManifest } from '../data/topicManifest.js';
import { normalizeProblem } from './normalizeProblem.js';

const DEFAULT_DIFFICULTY = 'Medium';
const DEFAULT_AUTHORING_VERSION = 2;

function findTopic(topicId, topics) {
  return topics.find((topic) => topic.id === topicId) || null;
}

function mergeTags(existingTags, ...defaultTags) {
  const tags = Array.isArray(existingTags) ? existingTags : [];
  return [...new Set([...tags, ...defaultTags.filter(Boolean)])];
}

function normalizeBaseProblem(problem = {}, options = {}) {
  const topics = options.topics || topicManifest;
  const topic = findTopic(problem.topicId, topics);
  const category = problem.category ?? topic?.category;
  const prompt = problem.prompt ?? problem.question ?? '';
  const question = problem.question ?? problem.prompt ?? '';

  return normalizeProblem({
    ...problem,
    category,
    difficulty: problem.difficulty ?? DEFAULT_DIFFICULTY,
    tags: mergeTags(problem.tags, category, problem.topicId),
    prompt,
    question,
    metadata: {
      authoringVersion: DEFAULT_AUTHORING_VERSION,
      ...(problem.metadata || {})
    }
  });
}

function normalizeCorrectAnswer(problem = {}) {
  if (problem.correctAnswer === undefined || problem.correctAnswer === null) return undefined;

  const options = problem.options;
  if (!Array.isArray(options)) {
    throw new Error(`Problem ${problem.id || 'unknown'} correctAnswer requires an options array.`);
  }

  if (Number.isInteger(problem.correctAnswer)) {
    if (problem.correctAnswer >= 0 && problem.correctAnswer < options.length) return problem.correctAnswer;
    throw new Error(`Problem ${problem.id || 'unknown'} correctAnswer index ${problem.correctAnswer} is outside options range 0-${options.length - 1}.`);
  }

  if (typeof problem.correctAnswer === 'string') {
    const index = options.findIndex((option) => option === problem.correctAnswer);
    if (index !== -1) return index;
    throw new Error(`Problem ${problem.id || 'unknown'} correctAnswer must exactly match one of the provided options.`);
  }

  throw new Error(`Problem ${problem.id || 'unknown'} correctAnswer must be a number index or exact option string.`);
}

export function defineProblem(problem = {}, options = {}) {
  return normalizeBaseProblem(problem, options);
}

export function defineMcqProblem(problem = {}, options = {}) {
  const correctAnswer = normalizeCorrectAnswer(problem);

  return defineProblem({
    ...problem,
    type: 'mcq',
    ...(correctAnswer === undefined ? {} : { correctAnswer }),
    answer: problem.answer ?? correctAnswer
  }, options);
}

export function defineLearningProblem(problem = {}, options = {}) {
  return defineProblem({
    ...problem,
    type: problem.type ?? 'learning'
  }, options);
}

export function defineSimpleSystemDesignProblem(problem = {}, options = {}) {
  return defineProblem({
    ...problem,
    type: problem.type ?? 'simple-system-design'
  }, options);
}

export function defineComplexSystemDesignProblem(problem = {}, options = {}) {
  return defineProblem({
    ...problem,
    type: problem.type ?? 'complex-system-design'
  }, options);
}
