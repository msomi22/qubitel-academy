import test from 'node:test';
import assert from 'node:assert/strict';

import { buildGlossaryMatcher } from './glossaryMatcher.js';
import { hasGlossaryTokens, tokenizeGlossaryText } from './glossaryTokenizer.js';

const terms = [
  {
    id: 'cache',
    term: 'Cache',
    aliases: ['Caching'],
    definition: 'A fast storage layer.'
  },
  {
    id: 'pod',
    term: 'Pod',
    aliases: ['Pods'],
    definition: 'The smallest Kubernetes unit you run.'
  },
  {
    id: 'api',
    term: 'API',
    aliases: ['APIs'],
    definition: 'A software contract.'
  }
];

const matcher = buildGlossaryMatcher(terms);

function tokenize(text, options = {}) {
  return tokenizeGlossaryText(text, { matcher, ...options });
}

test('tokenizeGlossaryText returns text tokens when disabled', () => {
  assert.deepEqual(tokenize('A Cache helps.', { enabled: false }), [
    { type: 'text', value: 'A Cache helps.' }
  ]);
});

test('tokenizeGlossaryText creates glossary tokens between text tokens', () => {
  const tokens = tokenize('A Cache protects an API.');

  assert.deepEqual(tokens.map((token) => token.type), ['text', 'glossary', 'text', 'glossary', 'text']);
  assert.equal(tokens[1].term.id, 'cache');
  assert.equal(tokens[1].value, 'Cache');
  assert.equal(tokens[3].term.id, 'api');
  assert.equal(tokens[3].value, 'API');
});

test('tokenizeGlossaryText protects URLs from glossary replacement', () => {
  const tokens = tokenize('Read https://example.com/API before using the Cache.');

  assert.equal(tokens.filter((token) => token.type === 'glossary').length, 1);
  assert.equal(tokens.find((token) => token.type === 'glossary').term.id, 'cache');
});

test('tokenizeGlossaryText protects inline code from glossary replacement', () => {
  const tokens = tokenize('Do not alter `kubectl get pods` but explain Pods outside code.');

  assert.equal(tokens.filter((token) => token.type === 'glossary').length, 1);
  assert.equal(tokens.find((token) => token.type === 'glossary').value, 'Pods');
});

test('tokenizeGlossaryText leaves executable command-like text untouched', () => {
  assert.deepEqual(tokenize('kubectl get pods'), [
    { type: 'text', value: 'kubectl get pods' }
  ]);
});

test('hasGlossaryTokens detects glossary-enabled text', () => {
  assert.equal(hasGlossaryTokens('Cache improves reads.', { matcher }), true);
  assert.equal(hasGlossaryTokens('No known term here.', { matcher }), false);
});
