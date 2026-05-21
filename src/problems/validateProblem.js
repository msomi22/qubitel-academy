import { topicManifest } from '../data/topicManifest.js';
import { problemTypeRegistry } from './problemTypeRegistry.js';

function error(problemId, field, message) {
  return { problemId: problemId || 'unknown', field, message };
}

function isMcqProblem(problem) {
  return problem?.type === 'mcq' || problem?.type === 'multiple-choice';
}

function validateMcqProblem(problem, errors) {
  if (!isMcqProblem(problem)) return;

  if (problem.options !== undefined && !Array.isArray(problem.options)) {
    errors.push(error(problem.id, 'options', 'MCQ options must be an array when provided.'));
    return;
  }

  const answerIndex = problem.correctAnswer ?? (Number.isInteger(problem.answer) ? problem.answer : undefined);
  if (answerIndex === undefined) return;

  if (!Array.isArray(problem.options)) {
    errors.push(error(problem.id, 'options', 'MCQ correctAnswer requires an options array.'));
    return;
  }

  if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= problem.options.length) {
    errors.push(error(problem.id, 'correctAnswer', `MCQ correctAnswer must point to a real option index between 0 and ${problem.options.length - 1}.`));
  }
}

export function validateProblem(problem, options = {}) {
  const topics = options.topics || topicManifest;
  const registry = options.registry || problemTypeRegistry;
  const errors = [];
  const problemId = problem?.id;

  if (!problemId) errors.push(error(problemId, 'id', 'Problem id is required.'));
  if (!problem?.type) errors.push(error(problemId, 'type', 'Problem type is required.'));
  if (problem?.type && !registry[problem.type]) {
    errors.push(error(problemId, 'type', `Unsupported problem type: ${problem.type}.`));
  }
  if (!problem?.category) errors.push(error(problemId, 'category', 'Problem category is required.'));
  if (!problem?.topicId) errors.push(error(problemId, 'topicId', 'Problem topicId is required.'));
  if (!problem?.title) errors.push(error(problemId, 'title', 'Problem title is required.'));
  if (!problem?.difficulty) errors.push(error(problemId, 'difficulty', 'Problem difficulty is required.'));
  if (!problem?.prompt && !problem?.question) {
    errors.push(error(problemId, 'prompt', 'Problem prompt or question is required.'));
  }

  const topic = topics.find((item) => item.id === problem?.topicId);
  if (problem?.topicId && !topic) {
    errors.push(error(problemId, 'topicId', `Unknown topicId: ${problem.topicId}.`));
  }

  if (topic && problem?.category && topic.category !== problem.category) {
    errors.push(error(problemId, 'category', `Category must match topicManifest category: ${topic.category}.`));
  }

  validateMcqProblem(problem, errors);

  return { valid: errors.length === 0, errors };
}

export function validateProblemCollection(problems = [], options = {}) {
  const errors = [];
  const seen = new Map();

  for (const problem of problems) {
    const result = validateProblem(problem, options);
    errors.push(...result.errors);

    if (!problem?.id) continue;

    if (seen.has(problem.id)) {
      errors.push(error(problem.id, 'id', `Duplicate problem id also used by ${seen.get(problem.id)}.`));
    } else {
      seen.set(problem.id, problem.title || problem.id);
    }
  }

  return { valid: errors.length === 0, errors };
}
