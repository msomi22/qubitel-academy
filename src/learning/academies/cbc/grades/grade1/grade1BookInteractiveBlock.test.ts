import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  resolveInteractiveBookBlock
} from '../../../../../components/book/learningBookInteractiveBlock.model.js';

test('dispatches both generic interactive block types on resting pages', () => {
  assert.deepEqual(resolveInteractiveBookBlock({
    type: 'alphabetMastery',
    letters: [{ id: 'a' }]
  }), {
    mode: 'interactive',
    renderer: 'alphabetMastery'
  });
  assert.deepEqual(resolveInteractiveBookBlock({
    type: 'numberAudioGrid',
    numbers: [{ id: 'number-1' }]
  }), {
    mode: 'interactive',
    renderer: 'numberAudioGrid'
  });
  assert.equal(resolveInteractiveBookBlock({ type: 'text' }), null);
});

test('returns inert summaries instead of interactive controls for animation copies', () => {
  const alphabetSummary = resolveInteractiveBookBlock({
    type: 'alphabetMastery',
    title: 'Letters A–E',
    letters: Array.from({ length: 5 }, (_, index) => ({ id: index }))
  }, true);
  const numbersSummary = resolveInteractiveBookBlock({
    type: 'numberAudioGrid',
    title: 'Numbers 1–20',
    numbers: Array.from({ length: 20 }, (_, index) => ({ id: index }))
  }, true);

  assert.deepEqual(alphabetSummary, {
    mode: 'summary',
    title: 'Letters A–E',
    text: '5 letter cards'
  });
  assert.deepEqual(numbersSummary, {
    mode: 'summary',
    title: 'Numbers 1–20',
    text: '20 number cards'
  });
  assert.equal('renderer' in alphabetSummary, false);
  assert.equal('renderer' in numbersSummary, false);
});

test('reuses existing renderers through generic book-block dispatch', () => {
  const componentSource = readFileSync(
    new URL('../../../../../components/book/LearningBookContentBlock.jsx', import.meta.url),
    'utf8'
  );

  assert.match(componentSource, /import AlphabetMasteryBlock/);
  assert.match(componentSource, /import NumberAudioGridBlock/);
  assert.match(componentSource, /resolveInteractiveBookBlock\(block, isAnimationCopy\)/);
  assert.match(componentSource, /interactiveBlock\?\.mode === 'summary'/);
  assert.match(componentSource, /<AlphabetMasteryBlock block=\{block\} \/>/);
  assert.match(componentSource, /<NumberAudioGridBlock block=\{block\} \/>/);
  assert.doesNotMatch(componentSource, /grade-1|School|routeSegment|themeId/);
});