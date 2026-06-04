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

test('rejects duplicate topic ids within an academy until topic routes are category-scoped', () => {
  const topic = {
    id: 'english',
    academy: 'cbc',
    displayName: 'English',
    lessons: [],
    practice: [],
    assessments: []
  };
  const result = validateManifestRecords({
    topicRecords: [
      { path: './cbc/grade-3/english/topic.manifest.json', manifest: { ...topic, category: 'grade-3' } },
      { path: './cbc/grade-4/english/topic.manifest.json', manifest: { ...topic, category: 'grade-4' } }
    ]
  });

  assert.ok(result.errors.some((error) => error.message.includes('Duplicate academy topic id')));
});
