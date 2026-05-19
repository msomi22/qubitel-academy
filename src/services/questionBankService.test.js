import test from 'node:test';
import assert from 'node:assert/strict';

import { mergeQuestionsById, topicProgress } from './questionBankService.js';

test('mergeQuestionsById prefers migrated problem files and avoids duplicate IDs', () => {
  const migratedProblems = [
    {
      id: 'scalability-001',
      title: 'Migrated URL Shortener',
      category: 'system',
      topicId: 'scalability'
    },
    {
      id: 'scalability-002',
      title: 'Migrated News Feed',
      category: 'system',
      topicId: 'scalability'
    }
  ];

  const legacyQuestions = [
    {
      id: 'scalability-001',
      title: 'Legacy URL Shortener',
      category: 'system',
      topicId: 'scalability'
    },
    {
      id: 'scalability-003',
      title: 'Legacy Chat App',
      category: 'system',
      topicId: 'scalability'
    }
  ];

  const merged = mergeQuestionsById(migratedProblems, legacyQuestions);

  assert.deepEqual(
    merged.map((question) => question.id),
    ['scalability-001', 'scalability-002', 'scalability-003']
  );
  assert.equal(merged.find((question) => question.id === 'scalability-001').title, 'Migrated URL Shortener');
});

test('mergeQuestionsById ignores malformed entries without IDs', () => {
  const merged = mergeQuestionsById(
    [{ title: 'Missing ID' }, null, { id: 'graphs-001', title: 'Graph BFS' }],
    [{ id: 'graphs-001', title: 'Legacy Graph BFS' }, { id: 'graphs-002', title: 'Graph DFS' }]
  );

  assert.deepEqual(
    merged.map((question) => question.id),
    ['graphs-001', 'graphs-002']
  );
});

test('topicProgress keeps existing ID-prefix completed status behavior', () => {
  const progress = topicProgress(
    { id: 'scalability', count: 3 },
    {
      'scalability-001': true,
      'scalability-002': false,
      'databases-001': true,
      'scalability-extra': true
    }
  );

  assert.deepEqual(progress, { done: 2, total: 3, percent: 67 });
});
