import { topicManifest } from '../data/topicManifest.js';
import { problemTypeRegistry } from './problemTypeRegistry.js';
import { normalizeProblem } from './normalizeProblem.js';
import { validateProblemCollection } from './validateProblem.js';

const discoveredProblemModules = typeof import.meta.glob === 'function'
  ? import.meta.glob('../data/problems/**/*.js')
  : {};

let discoveryCache;
let validationCache;

function readProblemExport(module) {
  return module?.default || module?.problem || null;
}

function reportValidationIssues(result) {
  if (result.valid) return;
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') return;
  if (typeof console !== 'undefined') {
    console.warn('[problem-validation]', result.errors);
  }
}

export async function discoverProblems(options = {}) {
  const modules = options.modules || discoveredProblemModules;
  const topics = options.topics || topicManifest;
  const registry = options.registry || problemTypeRegistry;
  const shouldUseCache = !options.modules && !options.topics && !options.registry;

  if (shouldUseCache && discoveryCache) return discoveryCache;

  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const module = typeof loader === 'function' ? await loader() : loader;
      const problem = readProblemExport(module);
      return problem ? normalizeProblem({ ...problem, metadata: { ...(problem.metadata || {}), sourcePath: path } }) : null;
    })
  );

  const problems = entries.filter(Boolean);
  const validation = validateProblemCollection(problems, { topics, registry });
  reportValidationIssues(validation);

  if (shouldUseCache) {
    discoveryCache = problems;
    validationCache = validation;
  }

  return problems;
}

export async function getDiscoveredQuestionsForTopic(topicId, options = {}) {
  const problems = await discoverProblems(options);
  return problems.filter((problem) => problem.topicId === topicId);
}

export async function getProblemValidationResult(options = {}) {
  if (!options.modules && !options.topics && !options.registry && validationCache) return validationCache;
  const problems = await discoverProblems(options);
  return validateProblemCollection(problems, {
    topics: options.topics || topicManifest,
    registry: options.registry || problemTypeRegistry
  });
}

export function clearProblemDiscoveryCache() {
  discoveryCache = undefined;
  validationCache = undefined;
}
