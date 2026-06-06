import assert from 'node:assert/strict';
import test from 'node:test';

import { discoverProblems } from './problemDiscovery.js';

const catalog = {
  academy: { id: 'cbc' },
  categories: [],
  topics: [
    {
      id: 'english',
      academy: 'cbc',
      academyId: 'cbc',
      category: 'grade-3',
      displayName: 'English',
      name: 'English',
      learningAreas: [
        {
          id: 'reading-comprehension',
          title: 'Reading Comprehension',
          sequence: 20
        }
      ],
      lessons: [
        {
          id: 'reading-comprehension-school-garden-lesson-001',
          file: 'lessons/reading-comprehension-school-garden-lesson-001.js',
          learningAreaId: 'reading-comprehension'
        }
      ],
      practice: [],
      assessments: []
    }
  ]
};

test('discovered content carries its manifest entry metadata', async () => {
  const problems = await discoverProblems({
    catalog,
    modules: {
      '../academies/cbc/grade-3/english/lessons/reading-comprehension-school-garden-lesson-001.js': {
        default: {
          id: 'english-reading-comprehension-school-garden-lesson-001',
          type: 'learning',
          category: 'grade-3',
          topicId: 'english',
          title: 'The School Garden',
          difficulty: 'Easy',
          question: 'Read a short story about a school garden.'
        }
      }
    }
  });

  assert.equal(problems.length, 1);
  assert.deepEqual(problems[0].metadata.manifestEntry, {
    id: 'reading-comprehension-school-garden-lesson-001',
    kind: 'lesson',
    learningAreaId: 'reading-comprehension'
  });
});
