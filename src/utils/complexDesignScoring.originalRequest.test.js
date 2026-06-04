import assert from 'node:assert/strict';
import test from 'node:test';

import topic from '../academies/tech/_legacy/banks/system/complex-system-design.js';
import { COMMON_SYSTEM_DESIGN_DICTIONARY } from '../data/scoring/systemDesignDictionary.js';
import { scoreComplexDesignAnswer } from './complexDesignScoring.js';

const question = topic.questions.find(
  (item) => item.id === 'complex-system-design-url-shortener-001'
);

function section(id) {
  return question.scoringRubric.find((item) => item.id === id);
}

function criterion(sectionId, criterionId) {
  return section(sectionId).criteria.find((item) => item.id === criterionId);
}

test('URL shortener rubric covers the original requested scoring improvements', () => {
  assert.ok(criterion('requirements', 'assumptions'));
  assert.ok(criterion('short-code-generation', 'collision-handling'));
  assert.ok(criterion('storage-design', 'indexes'));
  assert.ok(criterion('read-write-flows', 'create-flow'));
  assert.ok(criterion('read-write-flows', 'redirect-flow'));
  assert.ok(criterion('scaling-performance', 'partitioning'));
  assert.ok(criterion('scaling-performance', 'read-heavy-optimization'));
});

test('shared dictionary supports collision handling, indexes, flows, partitioning, and read-heavy optimization', () => {
  assert.ok(COMMON_SYSTEM_DESIGN_DICTIONARY.collisionHandling);
  assert.ok(COMMON_SYSTEM_DESIGN_DICTIONARY.indexing);
  assert.ok(COMMON_SYSTEM_DESIGN_DICTIONARY.writePath);
  assert.ok(COMMON_SYSTEM_DESIGN_DICTIONARY.readPath);
  assert.ok(COMMON_SYSTEM_DESIGN_DICTIONARY.partitioning);
  assert.ok(COMMON_SYSTEM_DESIGN_DICTIONARY.cache);
});

test('scoring rewards a concise answer that directly covers the original requested improvements', () => {
  const answer = `
    Assume read-heavy traffic and retries from clients.
    Generate a unique id and encode it with Base62.
    Handle collisions with a unique index on shortCode and retry generation when a duplicate exists.
    Store shortCode, longUrl, owner, expiry, status, createdAt, and indexes for lookup.
    Create flow validates the long URL, generates the short code, writes the mapping, and returns the short URL.
    Redirect flow checks cache first, then reads the database on cache miss, verifies expiry, updates cache, and redirects.
    Partition by short code and optimize reads with Redis cache, CDN cache, read replicas, and hot-link handling.
  `;

  const result = scoreComplexDesignAnswer(question, answer);

  assert.ok(result.totalScore > 0);
  assert.ok(
    result.sectionScores.find((item) => item.id === 'requirements').score > 0
  );
  assert.ok(
    result.sectionScores.find((item) => item.id === 'short-code-generation').score > 0
  );
  assert.ok(
    result.sectionScores.find((item) => item.id === 'storage-design').score > 0
  );
  assert.ok(
    result.sectionScores.find((item) => item.id === 'read-write-flows').score > 0
  );
  assert.ok(
    result.sectionScores.find((item) => item.id === 'scaling-performance').score > 0
  );
});
