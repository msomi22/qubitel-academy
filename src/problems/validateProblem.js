import { topicManifest } from '../data/topicManifest.js';
import { isSupportedProblemType, problemTypeRegistry } from './problemTypeRegistry.js';

const SUPPORTED_RICH_BODY_BLOCK_TYPES = new Set(['section', 'callout', 'table', 'image', 'diagram', 'flow', 'code', 'checklist', 'comparison', 'architectureDecision', 'divider']);
const CALLOUT_TONES = new Set(['info', 'warning', 'success', 'danger']);
const RENDERING_VARIANTS = new Set(['default', 'architecture-case-study', 'interview-drill', 'deep-dive']);
const RENDERING_DENSITIES = new Set(['compact', 'comfortable', 'detailed']);
const RENDERING_ACCENTS = new Set(['blue', 'green', 'amber', 'neutral']);

function error(problemId, field, message) {
  return { problemId: problemId || 'unknown', field, message };
}

function isMcqProblem(problem) {
  return problem?.type === 'mcq' || problem?.type === 'multiple-choice';
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isTrustedStaticImageSrc(src) {
  if (typeof src !== 'string') return false;
  const trimmed = src.trim();
  if (!trimmed || trimmed.includes('://') || trimmed.startsWith('//')) return false;
  return ['/assets/', '/images/', '/diagrams/', '/screenshots/', '/static/'].some((prefix) => trimmed.startsWith(prefix));
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

function validateRendering(problem, errors) {
  if (problem?.rendering === undefined) return;
  if (!isPlainObject(problem.rendering)) {
    errors.push(error(problem?.id, 'rendering', 'Problem rendering metadata must be an object when provided.'));
    return;
  }
  if (problem.rendering.variant !== undefined && !RENDERING_VARIANTS.has(problem.rendering.variant)) errors.push(error(problem.id, 'rendering.variant', `Unsupported rendering variant: ${problem.rendering.variant}.`));
  if (problem.rendering.density !== undefined && !RENDERING_DENSITIES.has(problem.rendering.density)) errors.push(error(problem.id, 'rendering.density', `Unsupported rendering density: ${problem.rendering.density}.`));
  if (problem.rendering.accent !== undefined && !RENDERING_ACCENTS.has(problem.rendering.accent)) errors.push(error(problem.id, 'rendering.accent', `Unsupported rendering accent: ${problem.rendering.accent}.`));
}

function validateBody(problem, body, errors, field = 'body') {
  if (body === undefined) return;
  if (!Array.isArray(body)) {
    errors.push(error(problem?.id, field, 'Problem body must be an array of rich render blocks.'));
    return;
  }

  body.forEach((block, index) => {
    const blockField = `${field}[${index}]`;
    if (!isPlainObject(block)) {
      errors.push(error(problem?.id, blockField, 'Rich body block must be an object.'));
      return;
    }
    if (typeof block.type !== 'string' || !block.type) {
      errors.push(error(problem?.id, `${blockField}.type`, 'Rich body block type is required.'));
      return;
    }
    if (!SUPPORTED_RICH_BODY_BLOCK_TYPES.has(block.type)) {
      errors.push(error(problem?.id, `${blockField}.type`, `Unsupported rich body block type: ${block.type}.`));
      return;
    }

    if (block.type === 'section') {
      if (!block.title && !block.content && !Array.isArray(block.body)) errors.push(error(problem?.id, blockField, 'Section block requires title, content, or nested body blocks.'));
      if (block.body !== undefined) validateBody(problem, block.body, errors, `${blockField}.body`);
    }
    if (block.type === 'callout') {
      if (block.tone !== undefined && !CALLOUT_TONES.has(block.tone)) errors.push(error(problem?.id, `${blockField}.tone`, `Unsupported callout tone: ${block.tone}.`));
      if (!block.title && !block.content) errors.push(error(problem?.id, blockField, 'Callout block requires title or content.'));
    }
    if (block.type === 'table') {
      if (!isStringArray(block.columns) || block.columns.length === 0) errors.push(error(problem?.id, `${blockField}.columns`, 'Table block columns must be a non-empty array of strings.'));
      if (!Array.isArray(block.rows) || block.rows.length === 0) errors.push(error(problem?.id, `${blockField}.rows`, 'Table block rows must be a non-empty array.'));
    }
    if (block.type === 'image' && !isTrustedStaticImageSrc(block.src)) errors.push(error(problem?.id, `${blockField}.src`, 'Image block src must use an allowed root-relative static path.'));
    if (block.type === 'diagram' && !block.content && !isStringArray(block.lines) && !isTrustedStaticImageSrc(block.src)) errors.push(error(problem?.id, blockField, 'Diagram block requires content, lines, or an allowed root-relative static src.'));
    if (block.type === 'flow' && (!Array.isArray(block.steps) || block.steps.length === 0)) errors.push(error(problem?.id, `${blockField}.steps`, 'Flow block steps must be a non-empty array.'));
    if (block.type === 'code' && (typeof (block.code ?? block.content) !== 'string' || !(block.code ?? block.content).trim())) errors.push(error(problem?.id, `${blockField}.code`, 'Code block requires non-empty code or content.'));
    if (block.type === 'checklist' && (!Array.isArray(block.items) || block.items.length === 0)) errors.push(error(problem?.id, `${blockField}.items`, 'Checklist block items must be a non-empty array.'));
    if (block.type === 'comparison' && (!Array.isArray(block.items) || block.items.length < 2)) errors.push(error(problem?.id, `${blockField}.items`, 'Comparison block items must include at least two entries.'));
    if (block.type === 'architectureDecision' && !block.title && !block.decision) errors.push(error(problem?.id, blockField, 'Architecture decision block requires title or decision.'));
  });
}

export function validateProblem(problem, options = {}) {
  const topics = options.topics || topicManifest;
  const registry = options.registry || problemTypeRegistry;
  const errors = [];
  const problemId = problem?.id;

  if (!isPlainObject(problem)) {
    errors.push(error(problemId, 'problem', 'Problem must be an object.'));
    return { valid: false, errors };
  }

  if (!problemId) errors.push(error(problemId, 'id', 'Problem id is required.'));
  if (!problem?.type) errors.push(error(problemId, 'type', 'Problem type is required.'));
  if (problem?.type && !isSupportedProblemType(problem.type, registry)) errors.push(error(problemId, 'type', `Unsupported problem type: ${problem.type}.`));
  if (!problem?.category) errors.push(error(problemId, 'category', 'Problem category is required.'));
  if (!problem?.topicId) errors.push(error(problemId, 'topicId', 'Problem topicId is required.'));
  if (!problem?.title) errors.push(error(problemId, 'title', 'Problem title is required.'));
  if (!problem?.difficulty) errors.push(error(problemId, 'difficulty', 'Problem difficulty is required.'));
  if (!problem?.prompt && !problem?.question) errors.push(error(problemId, 'prompt', 'Problem prompt or question is required.'));

  const topic = topics.find((item) => item.id === problem?.topicId);
  if (problem?.topicId && !topic) errors.push(error(problemId, 'topicId', `Unknown topicId: ${problem.topicId}.`));
  if (topic && problem?.category && topic.category !== problem.category) errors.push(error(problemId, 'category', `Category must match topicManifest category: ${topic.category}.`));

  validateMcqProblem(problem, errors);
  validateRendering(problem, errors);
  validateBody(problem, problem?.body, errors);

  return { valid: errors.length === 0, errors };
}

export function validateProblemCollection(problems = [], options = {}) {
  const errors = [];
  const seen = new Map();

  for (const problem of problems) {
    const result = validateProblem(problem, options);
    errors.push(...result.errors);

    if (!problem?.id) continue;

    if (seen.has(problem.id)) errors.push(error(problem.id, 'id', `Duplicate problem id also used by ${seen.get(problem.id)}.`));
    else seen.set(problem.id, problem.title || problem.id);
  }

  return { valid: errors.length === 0, errors };
}
