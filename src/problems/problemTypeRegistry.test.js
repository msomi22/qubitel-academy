import test from 'node:test';
import assert from 'node:assert/strict';

import {
  isSupportedProblemType,
  normalizeProblemTypeAlias,
  normalizeProblemTypeTags
} from './problemTypeRegistry.js';

test('legacy system-design aliases are normalized through registry metadata', () => {
  assert.equal(normalizeProblemTypeAlias('system-design'), 'simple-system-design');
  assert.equal(normalizeProblemTypeAlias('production-scenario'), 'simple-system-design');
});

test('canonical simple-system-design remains supported', () => {
  assert.equal(normalizeProblemTypeAlias('simple-system-design'), 'simple-system-design');
  assert.equal(isSupportedProblemType('simple-system-design'), true);
});

test('legacy system-design aliases remain supported for validation compatibility', () => {
  assert.equal(isSupportedProblemType('system-design'), true);
  assert.equal(isSupportedProblemType('production-scenario'), true);
});

test('problem type tags normalize legacy aliases and remove duplicates', () => {
  assert.deepEqual(
    normalizeProblemTypeTags(['system-design', 'production-scenario', 'scalability']),
    ['simple-system-design', 'scalability']
  );
});
