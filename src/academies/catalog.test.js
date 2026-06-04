import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import { academyRegistry } from '../config/academyRegistry.ts';
import { getCatalogContentReferences } from '../lib/content-loader.js';
import {
  academyCatalogs,
  getAcademyCatalog,
  manifestValidation,
  techCatalog
} from './catalog.js';
import {
  academyManifestRecords,
  categoryManifestRecords,
  topicManifestRecords
} from './manifestImports.generated.js';

const academiesRoot = fileURLToPath(new URL('.', import.meta.url));

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

test('academy manifests build a valid active tech catalog', () => {
  assert.equal(manifestValidation.valid, true);
  assert.equal(techCatalog.categories.length, 7);
  assert.equal(techCatalog.topics.length, 27);
  assert.equal(getAcademyCatalog('missing'), techCatalog);
});

test('generated manifest imports include every academy manifest on disk', () => {
  const generatedPaths = [
    ...academyManifestRecords,
    ...categoryManifestRecords,
    ...topicManifestRecords
  ].map((record) => record.path).sort();
  const diskPaths = walk(academiesRoot)
    .filter((path) => /\/(academy|category|topic)\.manifest\.json$/.test(path))
    .map((path) => `./${relative(academiesRoot, path).replaceAll('\\', '/')}`)
    .sort();

  assert.deepEqual(generatedPaths, diskPaths);
});

test('future academies stay registered without learner-facing categories', () => {
  assert.deepEqual(academyCatalogs.cbc.categories, []);
  assert.deepEqual(academyCatalogs.cbc.topics, []);
  assert.deepEqual(academyCatalogs['customer-experience'].categories, []);
  assert.deepEqual(academyCatalogs['customer-experience'].topics, []);
});

test('academy manifests stay consistent with routing registry boundaries', () => {
  for (const [academyId, config] of Object.entries(academyRegistry)) {
    const manifest = academyCatalogs[academyId].academy;
    assert.equal(manifest.productName, config.productName);
    assert.equal(manifest.storageKey, config.storageKey);
    assert.deepEqual(manifest.subdomains, config.subdomains);
    assert.deepEqual(manifest.categories, config.categoryIds);
  }
});

test('every active catalog content reference resolves to a migrated file', () => {
  const references = getCatalogContentReferences(techCatalog);
  const paths = references.map((reference) => reference.path);

  assert.equal(new Set(paths).size, paths.length);
  assert.ok(references.length > 0);
  assert.ok(references.every((reference) => !reference.file.includes('_legacy-bank')));

  for (const reference of references) {
    const file = new URL(
      `./${reference.academyId}/${reference.categoryId}/${reference.topicId}/${reference.file}`,
      import.meta.url
    );
    assert.equal(existsSync(file), true, `${reference.path} does not exist`);
  }
});

test('every declared content module exports problems for its manifest topic', async () => {
  for (const reference of getCatalogContentReferences(techCatalog)) {
    const file = new URL(
      `./${reference.academyId}/${reference.categoryId}/${reference.topicId}/${reference.file}`,
      import.meta.url
    );
    const module = await import(file);
    const problems = Array.isArray(module.default) ? module.default : [module.default];

    assert.ok(problems.length > 0, `${reference.path} has no default problem export`);
    for (const problem of problems) {
      assert.ok(problem?.id, `${reference.path} exports a problem without an id`);
      assert.equal(problem.topicId, reference.topicId, `${reference.path} has the wrong topicId`);
    }
  }
});
