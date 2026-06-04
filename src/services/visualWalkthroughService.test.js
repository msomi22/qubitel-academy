import test from 'node:test';
import assert from 'node:assert/strict';

import { buildCandidatePaths } from './visualWalkthroughService.js';

test('supports two-segment IDs', () => {
  const paths = buildCandidatePaths('backtracking-001', 'tech');

  assert.ok(paths[0].includes('backtracking'));
});

test('supports multi-segment IDs', () => {
  const paths = buildCandidatePaths('sliding-window-001', 'tech');

  assert.ok(paths[0].includes('sliding-window'));
});

test('migrated DSA problem IDs still resolve to existing visual walkthrough folders', () => {
  assert.deepEqual(buildCandidatePaths('sliding-window-001', 'tech'), [
    '../academies/tech/dsa/sliding-window/practice/visuals/sliding-window-001.js',
    '../academies/tech/system/sliding-window/practice/visuals/sliding-window-001.js'
  ]);

  assert.deepEqual(buildCandidatePaths('two-pointers-001', 'tech'), [
    '../academies/tech/dsa/two-pointers/practice/visuals/two-pointers-001.js',
    '../academies/tech/system/two-pointers/practice/visuals/two-pointers-001.js'
  ]);
});
