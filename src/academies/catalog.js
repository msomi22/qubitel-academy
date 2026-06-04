import { DEFAULT_ACADEMY_ID, academyRegistry } from '../config/academyRegistry.ts';
import { getActiveAcademy } from '../config/detectAcademy.ts';
import { validateManifestRecords } from '../lib/manifest.js';
import {
  academyManifestRecords,
  categoryManifestRecords,
  topicManifestRecords
} from './manifestImports.generated.js';

const structuralManifestValidation = validateManifestRecords({
  academyRecords: academyManifestRecords,
  categoryRecords: categoryManifestRecords,
  topicRecords: topicManifestRecords
});

function registryConsistencyErrors() {
  const errors = [];
  const manifestsById = new Map(
    academyManifestRecords.map((record) => [record.manifest.id, record])
  );

  for (const [academyId, config] of Object.entries(academyRegistry)) {
    const record = manifestsById.get(academyId);
    if (!record) {
      errors.push({
        path: './academyRegistry.ts',
        field: academyId,
        message: `Missing academy manifest for registered academy: ${academyId}.`
      });
      continue;
    }

    const comparisons = [
      ['displayName', config.displayName, record.manifest.displayName],
      ['productName', config.productName, record.manifest.productName],
      ['storageKey', config.storageKey, record.manifest.storageKey],
      ['subdomains', config.subdomains, record.manifest.subdomains],
      ['categories', config.categoryIds, record.manifest.categories]
    ];

    for (const [field, expected, actual] of comparisons) {
      if (JSON.stringify(expected) === JSON.stringify(actual)) continue;
      errors.push({
        path: record.path,
        field,
        message: `${field} must match academyRegistry.ts for ${academyId}.`
      });
    }
  }

  for (const { path, manifest } of academyManifestRecords) {
    if (academyRegistry[manifest.id]) continue;
    errors.push({
      path,
      field: 'id',
      message: `Academy is not registered in academyRegistry.ts: ${manifest.id}.`
    });
  }

  return errors;
}

const manifestErrors = [...structuralManifestValidation.errors, ...registryConsistencyErrors()];
export const manifestValidation = {
  valid: manifestErrors.length === 0,
  errors: manifestErrors
};

if (!manifestValidation.valid) {
  const summary = manifestValidation.errors
    .map((error) => `${error.path} ${error.field}: ${error.message}`)
    .join('\n');
  throw new Error(`Invalid academy manifests:\n${summary}`);
}

function normalizeCategory(manifest) {
  return {
    ...manifest,
    academyId: manifest.academy,
    name: manifest.displayName,
    scopedId: `${manifest.academy}/${manifest.id}`
  };
}

function normalizeTopic(manifest) {
  return {
    ...manifest,
    academyId: manifest.academy,
    name: manifest.displayName,
    scopedId: `${manifest.academy}/${manifest.category}/${manifest.id}`
  };
}

function buildCatalog(academy) {
  const categoriesById = new Map(
    categoryManifestRecords
      .filter(({ manifest }) => manifest.academy === academy.id)
      .map(({ manifest }) => [manifest.id, normalizeCategory(manifest)])
  );
  const topicsByScopedId = new Map(
    topicManifestRecords
      .filter(({ manifest }) => manifest.academy === academy.id)
      .map(({ manifest }) => [`${manifest.category}/${manifest.id}`, normalizeTopic(manifest)])
  );

  const categories = academy.categories
    .map((categoryId) => categoriesById.get(categoryId))
    .filter(Boolean);
  const topics = categories.flatMap((category) => category.topics
    .map((topicId) => topicsByScopedId.get(`${category.id}/${topicId}`))
    .filter(Boolean));

  return {
    academy,
    categories,
    topics
  };
}

export const academyCatalogs = Object.fromEntries(
  academyManifestRecords.map(({ manifest }) => [manifest.id, buildCatalog(manifest)])
);

export function getAcademyCatalog(academyId = DEFAULT_ACADEMY_ID) {
  return academyCatalogs[academyId] || academyCatalogs[DEFAULT_ACADEMY_ID];
}

export function getActiveAcademyCatalog(hostname) {
  return getAcademyCatalog(getActiveAcademy(hostname).id);
}

export function getCategoryFromCatalog(catalog, categoryId) {
  return catalog.categories.find((category) => category.id === categoryId) || null;
}

export function getTopicFromCatalog(catalog, topicId, categoryId) {
  return catalog.topics.find((topic) => (
    topic.id === topicId && (!categoryId || topic.category === categoryId)
  )) || null;
}

export const techCatalog = getAcademyCatalog('tech');
export const activeCatalog = getActiveAcademyCatalog();
export const categoryManifest = activeCatalog.categories;
export const topicManifest = activeCatalog.topics;

export function getTopicsByCategory(categoryId, catalog = activeCatalog) {
  return catalog.topics.filter((topic) => topic.category === categoryId);
}

export function getCategoryById(categoryId, catalog = activeCatalog) {
  return getCategoryFromCatalog(catalog, categoryId);
}
