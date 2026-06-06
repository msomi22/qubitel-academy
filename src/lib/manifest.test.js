import assert from 'node:assert/strict';
import test from 'node:test';

import { validateManifestRecords, validateTopicManifest } from './manifest.js';

test('rejects unsafe ids and content files that do not match their reference', () => {
  const errors = validateTopicManifest({
    id: 'Sliding Window',
    academy: 'tech',
    category: 'dsa',
    displayName: 'Sliding Window',
    lessons: [{ id: 'intro', file: 'practice/intro.js' }],
    practice: [],
    assessments: []
  });

  assert.ok(errors.some((error) => error.field === 'id'));
  assert.ok(errors.some((error) => error.field === 'lessons[0].file'));
});

test('rejects duplicate content ids across topic sections', () => {
  const errors = validateTopicManifest({
    id: 'sliding-window',
    academy: 'tech',
    category: 'dsa',
    displayName: 'Sliding Window',
    lessons: [{ id: 'intro', file: 'lessons/intro.js' }],
    practice: [{ id: 'intro', file: 'practice/intro.js' }],
    assessments: []
  });

  assert.ok(errors.some((error) => error.message === 'Duplicate content id: intro.'));
});

test('accepts manifest-driven learning areas and content reference links', () => {
  const errors = validateTopicManifest({
    id: 'english',
    academy: 'cbc',
    category: 'grade-3',
    displayName: 'English',
    learningAreas: [
      {
        id: 'spelling',
        title: 'Spelling',
        description: 'Build strong word skills.',
        sequence: 10
      }
    ],
    lessons: [{ id: 'spelling-lesson-001', file: 'lessons/spelling-lesson-001.js', learningAreaId: 'spelling' }],
    practice: [],
    assessments: []
  });

  assert.deepEqual(errors, []);
});

test('rejects content references linked to unknown learning areas', () => {
  const errors = validateTopicManifest({
    id: 'english',
    academy: 'cbc',
    category: 'grade-3',
    displayName: 'English',
    learningAreas: [{ id: 'spelling', title: 'Spelling' }],
    lessons: [{ id: 'grammar-lesson-001', file: 'lessons/grammar-lesson-001.js', learningAreaId: 'grammar' }],
    practice: [],
    assessments: []
  });

  assert.ok(errors.some((error) => error.message === 'Unknown learning area: grammar.'));
});

test('rejects category and topic records missing from their registered parents', () => {
  const result = validateManifestRecords({
    academyRecords: [{
      path: './tech/academy.manifest.json',
      manifest: {
        id: 'tech',
        displayName: 'Technology Academy',
        productName: 'Senior Dev Accelerator',
        subdomains: ['academy.qubitel.net'],
        storageKey: 'senior-dev-accelerator:v2',
        categories: ['dsa']
      }
    }],
    categoryRecords: [],
    topicRecords: []
  });

  assert.equal(result.valid, false);
  assert.match(result.errors[0].message, /Missing category manifest/);
});

test('allows duplicate topic ids when they live in different categories', () => {
  const topic = {
    id: 'english',
    academy: 'cbc',
    displayName: 'English',
    lessons: [],
    practice: [],
    assessments: []
  };
  const result = validateManifestRecords({
    academyRecords: [{
      path: './cbc/academy.manifest.json',
      manifest: {
        id: 'cbc',
        displayName: 'CBC Academy',
        productName: 'CBC Exam Practice',
        subdomains: ['cbc.academy.qubitel.net'],
        storageKey: 'senior-dev-accelerator:v2:cbc',
        categories: ['grade-3', 'grade-4']
      }
    }],
    categoryRecords: [
      {
        path: './cbc/grade-3/category.manifest.json',
        manifest: { id: 'grade-3', academy: 'cbc', displayName: 'Grade 3', topics: ['english'] }
      },
      {
        path: './cbc/grade-4/category.manifest.json',
        manifest: { id: 'grade-4', academy: 'cbc', displayName: 'Grade 4', topics: ['english'] }
      }
    ],
    topicRecords: [
      { path: './cbc/grade-3/english/topic.manifest.json', manifest: { ...topic, category: 'grade-3' } },
      { path: './cbc/grade-4/english/topic.manifest.json', manifest: { ...topic, category: 'grade-4' } }
    ]
  });

  assert.deepEqual(result.errors, []);
});
