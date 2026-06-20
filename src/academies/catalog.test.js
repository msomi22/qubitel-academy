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
const subjectTopicIds = [
  'cre',
  'creative-activities',
  'english',
  'environmental-activities',
  'kiswahili',
  'mathematics'
];

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
    .filter((path) => path.endsWith('academy.manifest.json') || path.endsWith('category.manifest.json') || path.endsWith('topic.manifest.json'))
    .map((path) => `./${relative(academiesRoot, path).split('\\').join('/')}`)
    .sort();

  assert.deepEqual(generatedPaths, diskPaths);
});

test('CBC exposes Grade 1 and Grade 3 while Customer Experience stays registered without learner-facing categories', () => {
  assert.deepEqual(academyCatalogs.cbc.categories.map((category) => category.id), ['grade-1', 'grade-3']);
  assert.deepEqual(academyCatalogs.cbc.topics.map((topic) => `${topic.category}/${topic.id}`), [
    ...subjectTopicIds.map((topicId) => `grade-1/${topicId}`),
    ...subjectTopicIds.map((topicId) => `grade-3/${topicId}`)
  ]);
  assert.equal(academyCatalogs.cbc.topics.some((topic) => topic.id === 'phonics'), false);
  assert.deepEqual(academyCatalogs['customer-experience'].categories, []);
  assert.deepEqual(academyCatalogs['customer-experience'].topics, []);
});

test('CBC Grade 1 declares the shared subject structure with content under learning areas', () => {
  const gradeOneTopics = academyCatalogs.cbc.topics.filter((topic) => topic.category === 'grade-1');

  assert.deepEqual(gradeOneTopics.map((topic) => topic.id), subjectTopicIds);
  assert.equal(academyCatalogs.cbc.topics.some((topic) => topic.id === 'foundation-practice'), false);

  const cre = gradeOneTopics.find((topic) => topic.id === 'cre');
  const english = gradeOneTopics.find((topic) => topic.id === 'english');
  const environmentalActivities = gradeOneTopics.find((topic) => topic.id === 'environmental-activities');
  const mathematics = gradeOneTopics.find((topic) => topic.id === 'mathematics');
  const emptySubjects = gradeOneTopics.filter((topic) => ['creative-activities', 'kiswahili'].includes(topic.id));

  assert.deepEqual(cre.practice.map((item) => item.id), ['christian-values-practice-001']);
  assert.deepEqual(english.learningAreas.map((area) => area.id), [
    'listening-speaking',
    'alphabet-mastery',
    'reading-readiness',
    'writing-readiness',
    'language-use'
  ]);
  assert.equal(english.learningAreas.find((area) => area.id === 'alphabet-mastery').sequence, 15);
  assert.deepEqual(english.lessons.map((item) => item.id), ['alphabet-mastery-lesson-001']);
  assert.equal(english.lessons[0].learningAreaId, 'alphabet-mastery');
  assert.deepEqual(english.practice.map((item) => item.id), ['listening-speaking-practice-001', 'reading-readiness-practice-002']);
  assert.deepEqual(english.assessments.map((item) => item.id), ['object-matching-exam-001', 'reading-word-mastery-exam-002', 'reading-word-mastery-exam-003', 'reading-word-mastery-exam-004', 'reading-word-mastery-exam-005', 'reading-word-mastery-exam-006']);
  assert.deepEqual(environmentalActivities.practice.map((item) => item.id), ['home-and-school-practice-001']);
  assert.deepEqual(mathematics.lessons.map((item) => item.id), ['numbers-1-100-lesson-001']);
  assert.equal(mathematics.lessons[0].learningAreaId, 'numbers');
  assert.deepEqual(mathematics.practice.map((item) => item.id), ['numbers-practice-001', 'shapes-practice-001']);
  assert.deepEqual(mathematics.assessments.map((item) => item.id), ['counting-exam-001']);

  for (const subject of gradeOneTopics) {
    assert.ok(subject.learningAreas.length > 0, subject.id);
  }

  for (const subject of emptySubjects) {
    assert.equal(subject.questionBank.mode, 'empty');
    assert.deepEqual([...subject.lessons, ...subject.practice, ...subject.assessments], []);
  }
});

test('CBC English declares the spelling and reading comprehension content', () => {
  const english = academyCatalogs.cbc.topics.find((topic) => topic.category === 'grade-3' && topic.id === 'english');

  assert.deepEqual(english.lessons.map((item) => item.id), [
    'spelling-lesson-001',
    'reading-comprehension-school-garden-lesson-001',
    'grade-3-english-parts-of-speech-lesson-001'
  ]);
  assert.deepEqual(english.practice.map((item) => item.id), [
    'spelling-practice-001',
    'spelling-practice-002',
    'reading-comprehension-school-garden-practice-001'
  ]);
  assert.deepEqual(english.assessments.map((item) => item.id), [
    'spelling-exam-001',
    'spelling-exam-002',
    'spelling-exam-003',
    'spelling-exam-004',
    'spelling-exam-005',
    'spelling-exam-006',
    'spelling-classroom-items-exam-007',
    'spelling-furniture-exam-008',
    'spelling-body-parts-exam-009',
    'spelling-random-hard-exam-010',
    'spelling-random-super-hard-exam-011',
    'spelling-random-super-hard-genius-exam-012',
    'spelling-domestic-animals-exam-013',
    'spelling-wild-animals-exam-014',
    'spelling-aquatic-animals-exam-015',
    'grade-3-parts-of-speech-spelling-exam-001',
    'grade-3-parts-of-speech-spelling-exam-002',
    'reading-comprehension-class-library-exam-001',
    'grade-3-english-comprehension-faithful-collie-exam-011',
    'grade-3-english-comprehension-bear-cub-adventure-exam-012',
    'grade-3-english-comprehension-black-beauty-and-ginger-exam-013',
    'grade-3-english-comprehension-john-and-the-cherries-exam-014',
    'grade-3-english-comprehension-camping-holiday-exam-015',
    'grade-3-english-comprehension-lion-and-the-mouse-exam-016',
    'grade-3-english-comprehension-fox-and-the-goat-exam-017',
    'grade-3-english-comprehension-tom-thumb-exam-018',
    'grade-3-english-comprehension-some-useful-finds-exam-019',
    'grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020'
  ]);
});

test('CBC Grade 3 subjects declare learning areas and current content state', () => {
  const subjects = academyCatalogs.cbc.topics.filter((topic) => topic.category === 'grade-3');
  const kiswahili = subjects.find((topic) => topic.id === 'kiswahili');

  assert.deepEqual(subjects.map((topic) => topic.id), [
    ...subjectTopicIds
  ]);

  assert.deepEqual(kiswahili.assessments.map((item) => item.id), ['kiswahili-hadithi-exam-001']);
  assert.equal(kiswahili.assessments[0].learningAreaId, 'ufahamu');

  for (const subject of subjects.filter((topic) => !['english', 'kiswahili'].includes(topic.id))) {
    assert.equal(subject.questionBank.mode, 'empty');
    assert.ok(subject.learningAreas.length > 0, subject.id);
    assert.deepEqual([...subject.lessons, ...subject.practice, ...subject.assessments], []);
  }
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
