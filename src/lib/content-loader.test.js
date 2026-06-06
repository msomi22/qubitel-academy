import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getCatalogContentReferences,
  selectCatalogContentModules
} from './content-loader.js';

const catalog = {
  academy: { id: 'tech' },
  categories: [],
  topics: [
    {
      id: 'sliding-window',
      academy: 'tech',
      category: 'dsa',
      lessons: [{ id: 'window-lesson', file: 'lessons/window-lesson.js' }],
      practice: [{ id: 'window-practice', file: 'practice/window-practice.js', learningAreaId: 'fixed-window' }],
      assessments: []
    }
  ]
};

test('builds academy-scoped content references from topic manifests', () => {
  assert.deepEqual(getCatalogContentReferences(catalog), [
    {
      id: 'window-lesson',
      file: 'lessons/window-lesson.js',
      academyId: 'tech',
      categoryId: 'dsa',
      topicId: 'sliding-window',
      kind: 'lesson',
      path: '../academies/tech/dsa/sliding-window/lessons/window-lesson.js'
    },
    {
      id: 'window-practice',
      file: 'practice/window-practice.js',
      academyId: 'tech',
      categoryId: 'dsa',
      topicId: 'sliding-window',
      kind: 'practice',
      learningAreaId: 'fixed-window',
      path: '../academies/tech/dsa/sliding-window/practice/window-practice.js'
    }
  ]);
});

test('selects only content modules declared by the active catalog', () => {
  const declared = { default: { id: 'window-practice' } };
  const modules = selectCatalogContentModules(catalog, {
    '../academies/tech/dsa/sliding-window/practice/window-practice.js': declared,
    '../academies/tech/dsa/sliding-window/practice/undeclared.js': { default: {} },
    '../academies/cbc/grade-3/english/practice/nouns.js': { default: {} }
  });

  assert.deepEqual(modules, {
    '../academies/tech/dsa/sliding-window/practice/window-practice.js': declared
  });
});
