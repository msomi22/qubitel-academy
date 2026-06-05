import assert from 'node:assert/strict';
import test from 'node:test';

import CbcGradeOneQuestionRenderer from '../cbc/CbcGradeOneQuestionRenderer.jsx';
import DefaultQuestionRenderer from '../default/DefaultQuestionRenderer.jsx';
import {
  getQuestionRenderer,
  hasRendererOverride
} from './questionRendererRegistry.js';

test('returns the default renderer when no academy override exists', () => {
  const renderer = getQuestionRenderer({
    academyId: 'tech',
    categoryId: 'dsa',
    topicId: 'sliding-window',
    questionType: 'mcq'
  });

  assert.equal(renderer, DefaultQuestionRenderer);
});

test('returns CBC Grade 1 renderer for CBC Grade 1 questions', () => {
  const renderer = getQuestionRenderer({
    academyId: 'cbc',
    categoryId: 'grade-1',
    topicId: 'foundation-practice',
    questionType: 'mcq'
  });

  assert.equal(renderer, CbcGradeOneQuestionRenderer);
});

test('detects whether a renderer override applies', () => {
  assert.equal(hasRendererOverride({ academyId: 'cbc', categoryId: 'grade-1' }), true);
  assert.equal(hasRendererOverride({ academyId: 'cbc', categoryId: 'grade-3' }), false);
  assert.equal(hasRendererOverride({ academyId: 'tech', categoryId: 'java' }), false);
});
