import assert from 'node:assert/strict';
import test from 'node:test';

import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import {
  createCbcGradesRegistrySource
} from '../learning/academies/cbc/cbcGrades.registry.ts';
import {
  createLearningNodeRegistry,
  getNodeById
} from '../learning/registry/index.ts';
import {
  buildCbcTopicActivityHref,
  getCbcLastActivityContinueState,
  resolveCbcContinueCandidate
} from './cbcLastActivityService.js';

const academyNode = getAcademyRootNodeById('cbc-academy');
const source = createCbcGradesRegistrySource();
const registry = createLearningNodeRegistry({ nodes: [academyNode, ...source.nodes] });

function activity(nodeId, extra = {}) {
  return { academy: 'cbc', nodeId, ...extra };
}

test('CBC topic activity href keeps selected grade and subject', () => {
  assert.equal(
    buildCbcTopicActivityHref({
      categoryId: 'grade-1',
      topicId: 'environmental-activities',
      page: 1
    }),
    '/category/grade-1?topic=environmental-activities&page=1'
  );
});

test('Grade 1 English theme resolves semantic destination and dynamic copy', () => {
  assert.deepEqual(
    getCbcLastActivityContinueState(
      registry,
      activity('grade-1-english-activities-theme-school')
    ),
    {
      href: '/gd1/eng/school',
      title: 'Continue English',
      description: 'Pick up from Grade 1 English'
    }
  );
});

test('Grade 1 Mathematics theme resolves semantic destination and dynamic copy', () => {
  assert.deepEqual(
    getCbcLastActivityContinueState(
      registry,
      activity('grade-1-mathematical-activities-theme-numbers')
    ),
    {
      href: '/gd1/mathematical-activities/numbers',
      title: 'Continue Math',
      description: 'Pick up from Grade 1 Math'
    }
  );
});

test('Grade 3 English theme resolves semantic destination and dynamic copy', () => {
  assert.deepEqual(
    getCbcLastActivityContinueState(
      registry,
      activity('grade-3-english-activities-theme-reading-comprehension')
    ),
    {
      href: '/gd3/english-activities/reading-comprehension',
      title: 'Continue English',
      description: 'Pick up from Grade 3 English'
    }
  );
});

test('learning-area and grade history provide safe hierarchy fallbacks', () => {
  assert.deepEqual(
    getCbcLastActivityContinueState(registry, activity('grade-1-english-activities')),
    {
      href: '/gd1/eng',
      title: 'Continue English',
      description: 'Pick up from Grade 1 English'
    }
  );
  assert.deepEqual(
    getCbcLastActivityContinueState(registry, activity('grade-3')),
    {
      href: '/gd3',
      title: 'Continue Grade 3',
      description: 'Pick up from Grade 3'
    }
  );
});

test('deep LearningNode visits prefer theme, then learning area, then grade', () => {
  const theme = getNodeById(registry, 'grade-3-english-activities-theme-reading-comprehension');
  const content = [...registry.nodesById.values()].find((node) => node.parentId === theme.id);
  const learningArea = getNodeById(registry, 'grade-3-english-activities');
  const grade = getNodeById(registry, 'grade-3');

  assert.equal(resolveCbcContinueCandidate(registry, content)?.id, theme.id);
  assert.equal(resolveCbcContinueCandidate(registry, learningArea)?.id, learningArea.id);
  assert.equal(resolveCbcContinueCandidate(registry, grade)?.id, grade.id);
});

test('candidate resolution is isolated to CBC ancestry', () => {
  const externalRegistry = createLearningNodeRegistry({
    nodes: [{
      id: 'tech-grade',
      kind: 'grade',
      label: 'Tech Grade',
      content: { type: 'book', pages: [{ id: 'page-1' }] }
    }]
  });

  assert.equal(
    resolveCbcContinueCandidate(externalRegistry, getNodeById(externalRegistry, 'tech-grade')),
    null
  );
});

test('valid theme tab is retained while arbitrary stored URLs are ignored', () => {
  assert.equal(
    getCbcLastActivityContinueState(
      registry,
      activity('grade-1-english-activities-theme-school', {
        tab: 'assessment',
        href: '/practice/alphabet-mastery-lesson-001?backPath=/gd1/eng'
      })
    )?.href,
    '/gd1/eng/school?tab=assessment'
  );
  assert.equal(
    getCbcLastActivityContinueState(
      registry,
      activity('grade-1-english-activities-theme-school', { tab: 'external' })
    )?.href,
    '/gd1/eng/school'
  );
});

test('stale, malformed, non-CBC, unknown, and non-continuable history is rejected', () => {
  assert.equal(getCbcLastActivityContinueState(registry, {
    academy: 'cbc',
    categoryId: 'grade-1',
    topicId: 'alphabet-mastery',
    href: '/practice/alphabet-mastery-lesson-001?backPath=/gd1/eng'
  }), null);
  assert.equal(getCbcLastActivityContinueState(registry, null), null);
  assert.equal(getCbcLastActivityContinueState(registry, { academy: 'cbc' }), null);
  assert.equal(
    getCbcLastActivityContinueState(registry, activity('grade-1', { academy: 'tech' })),
    null
  );
  assert.equal(getCbcLastActivityContinueState(registry, activity('missing-node')), null);
  assert.equal(getCbcLastActivityContinueState(registry, activity('cbc-academy')), null);
});
