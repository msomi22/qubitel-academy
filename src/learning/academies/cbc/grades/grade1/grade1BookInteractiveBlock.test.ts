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
    title: 'Letters A–D',
    letters: Array.from({ length: 4 }, (_, index) => ({ id: index }))
  }, true);
  const numbersSummary = resolveInteractiveBookBlock({
    type: 'numberAudioGrid',
    title: 'Numbers 1–10',
    numbers: Array.from({ length: 10 }, (_, index) => ({ id: index }))
  }, true);

  assert.deepEqual(alphabetSummary, {
    mode: 'summary',
    title: 'Letters A–D',
    text: '4 letter cards'
  });
  assert.deepEqual(numbersSummary, {
    mode: 'summary',
    title: 'Numbers 1–10',
    text: '10 number cards'
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
  assert.match(
    componentSource,
    /<AlphabetMasteryBlock block=\{block\} presentation="book" \/>/
  );
  assert.match(
    componentSource,
    /<NumberAudioGridBlock block=\{block\} presentation="book" \/>/
  );
  assert.doesNotMatch(componentSource, /CompactAlphabetMasteryBlock/);
  assert.doesNotMatch(componentSource, /CompactNumber|compactNumber/);
  assert.doesNotMatch(componentSource, /grade-1|School|routeSegment|themeId/);
});

test('omits only the existing hero in book presentation and preserves card and audio controls', () => {
  const componentSource = readFileSync(
    new URL('../../../../../components/rich-problem/AlphabetMasteryBlock.jsx', import.meta.url),
    'utf8'
  );

  assert.match(componentSource, /presentation = 'standalone'/);
  assert.match(componentSource, /const isBookPresentation = presentation === 'book'/);
  assert.match(componentSource, /!isBookPresentation \? \(/);
  assert.match(componentSource, /className="alphabet-mastery-hero"/);
  assert.match(componentSource, /className="alphabet-mastery-mascot"/);
  assert.match(componentSource, /className="alphabet-mastery-progress"/);
  assert.match(componentSource, /className="alphabet-mastery-interval-control"/);
  assert.match(componentSource, /handleAutoReadIntervalChange/);
  assert.match(componentSource, /handleStartAutoRead/);
  assert.match(componentSource, /handlePauseAutoRead/);
  assert.match(componentSource, /handleResumeAutoRead/);
  assert.match(componentSource, /handleStopAutoRead/);
  assert.match(componentSource, /className="alphabet-mastery-letter-row"/);
  assert.equal((componentSource.match(/<AlphabetCard/g) || []).length, 2);
});

test('omits only the Number hero in book presentation and preserves existing controls', () => {
  const componentSource = readFileSync(
    new URL('../../../../../components/rich-problem/NumberAudioGridBlock.jsx', import.meta.url),
    'utf8'
  );

  assert.match(componentSource, /presentation = 'standalone'/);
  assert.match(componentSource, /const isBookPresentation = presentation === 'book'/);
  assert.match(componentSource, /!isBookPresentation \? \(/);
  assert.match(componentSource, /className="number-audio-hero"/);
  assert.match(componentSource, /className="number-audio-back"/);
  assert.match(componentSource, /className="number-audio-mascot"/);
  assert.match(componentSource, /className="number-audio-progress"/);
  assert.match(componentSource, /className="number-audio-toolbar-count"/);
  assert.match(componentSource, /className="number-audio-sound-status"/);
  assert.match(componentSource, /className="number-audio-interval-control"/);
  assert.match(componentSource, /handleAutoReadIntervalChange/);
  assert.match(componentSource, /handleStartAutoRead/);
  assert.match(componentSource, /handlePauseAutoRead/);
  assert.match(componentSource, /handleResumeAutoRead/);
  assert.match(componentSource, /handleStopAutoRead/);
  assert.match(componentSource, /clearAutoReadPlayTimer\(\)/);
  assert.match(componentSource, /clearCurrentAudio\(\)/);
  assert.equal((componentSource.match(/<NumberAudioCard/g) || []).length, 1);
});