import test from 'node:test';
import assert from 'node:assert/strict';

import legacyTopic from '../data/banks/dsa/bit-manipulation.js';
import migrated001 from '../data/problems/dsa/bit-manipulation/bit-manipulation-001.js';
import migrated002 from '../data/problems/dsa/bit-manipulation/bit-manipulation-002.js';
import migrated003 from '../data/problems/dsa/bit-manipulation/bit-manipulation-003.js';
import migrated004 from '../data/problems/dsa/bit-manipulation/bit-manipulation-004.js';
import migrated005 from '../data/problems/dsa/bit-manipulation/bit-manipulation-005.js';
import migrated006 from '../data/problems/dsa/bit-manipulation/bit-manipulation-006.js';
import migrated007 from '../data/problems/dsa/bit-manipulation/bit-manipulation-007.js';
import legacyRemainder from '../data/problems/dsa/bit-manipulation/_legacy-bank.js';
import { normalizeProblem } from './normalizeProblem.js';
import { validateProblemCollection } from './validateProblem.js';

const migratedProblems = [
  migrated001,
  migrated002,
  migrated003,
  migrated004,
  migrated005,
  migrated006,
  migrated007
];

const migratedBitManipulationTopic = [
  ...migratedProblems,
  ...legacyRemainder
].map(normalizeProblem);

function sortedIds(items) {
  return items.map((item) => item.id).sort();
}

test('bit manipulation migrated files are valid problem records', () => {
  const validation = validateProblemCollection(migratedBitManipulationTopic);

  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
});

test('bit manipulation migration preserves the legacy bank count and IDs', () => {
  assert.equal(migratedBitManipulationTopic.length, legacyTopic.questions.length);
  assert.deepEqual(sortedIds(migratedBitManipulationTopic), sortedIds(legacyTopic.questions));
});

test('bit manipulation migrated files cover the explicitly migrated IDs', () => {
  assert.deepEqual(
    sortedIds(migratedProblems),
    [
      'bit-manipulation-001',
      'bit-manipulation-002',
      'bit-manipulation-003',
      'bit-manipulation-004',
      'bit-manipulation-005',
      'bit-manipulation-006',
      'bit-manipulation-007'
    ]
  );
});

test('bit manipulation legacy remainder excludes migrated IDs', () => {
  const migratedIds = new Set(sortedIds(migratedProblems));
  const leakedIds = legacyRemainder
    .map((problem) => problem.id)
    .filter((id) => migratedIds.has(id));

  assert.deepEqual(leakedIds, []);
});
