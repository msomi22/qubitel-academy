import {
  getAcademyCatalog,
  getActiveAcademyCatalog
} from '../academies/catalog.js';
import {
  getCatalogContentReferences,
  selectCatalogContentModules
} from '../lib/content-loader.js';
import { problemTypeRegistry } from './problemTypeRegistry.js';
import { normalizeProblem } from './normalizeProblem.js';
import { validateProblemCollection } from './validateProblem.js';

const academyContentModules = import.meta.env
  ? import.meta.glob('../academies/*/*/*/{lessons,practice,assessments}/*.js')
  : {};

const discoveryCache = new Map();
const validationCache = new Map();

function readProblemExports(module) {
  const exported = module?.default || module?.problem || module?.problems || null;
  if (!exported) return [];
  return Array.isArray(exported) ? exported : [exported];
}

function inferAcademyId(path) {
  return path.match(/\/academies\/([^/]+)\//)?.[1] || null;
}

function manifestEntryMetadata(reference) {
  if (!reference) return null;

  return {
    id: reference.id,
    kind: reference.kind,
    ...(reference.learningAreaId ? { learningAreaId: reference.learningAreaId } : {})
  };
}

function normalizeDiscoveredProblem(problem, path, index, academyId, reference) {
  const manifestEntry = manifestEntryMetadata(reference);

  return normalizeProblem({
    ...problem,
    academyId: problem.academyId || academyId || inferAcademyId(path),
    metadata: {
      ...(problem.metadata || {}),
      ...(manifestEntry ? { manifestEntry } : {}),
      sourcePath: path,
      sourceIndex: index
    }
  });
}

function reportValidationIssues(result) {
  if (result.valid) return;
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') return;
  if (typeof console !== 'undefined') {
    console.warn('[problem-validation]', result.errors);
  }
}

export async function discoverProblems(options = {}) {
  const catalog = options.catalog
    || (options.academyId ? getAcademyCatalog(options.academyId) : getActiveAcademyCatalog(options.hostname));
  const academyId = options.academyId || catalog.academy.id;
  const modules = options.modules || selectCatalogContentModules(catalog, academyContentModules);
  const topics = options.topics || catalog.topics;
  const registry = options.registry || problemTypeRegistry;
  const contentReferenceByPath = new Map(
    getCatalogContentReferences({ ...catalog, topics }).map((reference) => [reference.path, reference])
  );
  const shouldUseCache = !options.modules && !options.topics && !options.registry && !options.catalog;

  if (shouldUseCache && discoveryCache.has(academyId)) return discoveryCache.get(academyId);

  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const module = typeof loader === 'function' ? await loader() : loader;
      return readProblemExports(module).map((problem, index) => (
        normalizeDiscoveredProblem(problem, path, index, academyId, contentReferenceByPath.get(path))
      ));
    })
  );

  const problems = entries.flat().filter(Boolean);
  const validation = validateProblemCollection(problems, { topics, registry });
  reportValidationIssues(validation);

  if (shouldUseCache) {
    discoveryCache.set(academyId, problems);
    validationCache.set(academyId, validation);
  }

  return problems;
}

export async function getDiscoveredQuestionsForTopic(topicId, options = {}) {
  const problems = await discoverProblems(options);
  return problems.filter((problem) => (
    problem.topicId === topicId
    && (!options.categoryId || problem.category === options.categoryId)
  ));
}

export async function getProblemValidationResult(options = {}) {
  const catalog = options.catalog
    || (options.academyId ? getAcademyCatalog(options.academyId) : getActiveAcademyCatalog(options.hostname));
  const academyId = options.academyId || catalog.academy.id;
  if (!options.modules && !options.topics && !options.registry && validationCache.has(academyId)) {
    return validationCache.get(academyId);
  }

  const problems = await discoverProblems(options);
  return validateProblemCollection(problems, {
    topics: options.topics || catalog.topics,
    registry: options.registry || problemTypeRegistry
  });
}

export function clearProblemDiscoveryCache() {
  discoveryCache.clear();
  validationCache.clear();
}
