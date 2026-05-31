import test from 'node:test';
import assert from 'node:assert/strict';

import { buildGlossaryMatcher, normalizeGlossaryTerms } from './glossaryMatcher.js';

const terms = [
  {
    id: 'cache',
    term: 'Cache',
    aliases: ['Caching'],
    definition: 'A fast storage layer.'
  },
  {
    id: 'sliding-window',
    term: 'Sliding Window',
    definition: 'A moving range technique.'
  },
  {
    id: 'api',
    term: 'API',
    aliases: ['APIs'],
    definition: 'A software contract.'
  }
];

test('normalizeGlossaryTerms expands aliases and sorts longer matches first', () => {
  const normalized = normalizeGlossaryTerms(terms);

  assert.ok(normalized.some((entry) => entry.id === 'cache' && entry.matchText === 'Caching'));
  assert.equal(normalized[0].matchText, 'Sliding Window');
});

test('buildGlossaryMatcher matches exact terms case-insensitively', () => {
  const matcher = buildGlossaryMatcher(terms);
  const matches = matcher.findMatches('A cache can protect an API.');

  assert.deepEqual(matches.map((match) => match.term.id), ['cache', 'api']);
  assert.deepEqual(matches.map((match) => match.text), ['cache', 'API']);
});

test('buildGlossaryMatcher supports aliases', () => {
  const matcher = buildGlossaryMatcher(terms);
  const matches = matcher.findMatches('Caching helps APIs stay responsive.');

  assert.deepEqual(matches.map((match) => match.term.id), ['cache', 'api']);
  assert.deepEqual(matches.map((match) => match.text), ['Caching', 'APIs']);
});

test('buildGlossaryMatcher avoids partial-word matches', () => {
  const matcher = buildGlossaryMatcher(terms);
  const matches = matcher.findMatches('The word handicap should not match API.');

  assert.deepEqual(matches.map((match) => match.term.id), ['api']);
});

test('buildGlossaryMatcher returns no matches for empty registries', () => {
  const matcher = buildGlossaryMatcher([]);

  assert.deepEqual(matcher.entries, []);
  assert.deepEqual(matcher.findMatches('Cache'), []);
});
