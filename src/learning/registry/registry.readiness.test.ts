import assert from 'node:assert/strict';
import test from 'node:test';

import type { LearningNode } from '../core/index.ts';
import { createLearningNodeRegistry } from './registry.utils.ts';
import { isLearningNodeReady } from './registry.readiness.ts';

type TestNodeInput = Partial<LearningNode> & Pick<LearningNode, 'id' | 'kind' | 'label'> & {
  [key: string]: unknown;
};

function node(input: TestNodeInput): LearningNode {
  return input as LearningNode;
}

function registry(nodes: LearningNode[]) {
  return createLearningNodeRegistry({ nodes });
}

test('classifies a non-empty book as ready', () => {
  const book = node({
    id: 'book',
    kind: 'notes',
    label: 'Book',
    content: { type: 'book', title: 'Book', pages: [{ id: 'page-1' }] }
  });

  assert.equal(isLearningNodeReady(registry([book]), book), true);
});

test('does not classify an empty book as ready', () => {
  const book = node({
    id: 'book',
    kind: 'notes',
    label: 'Book',
    content: { type: 'book', title: 'Book', pages: [] }
  });

  assert.equal(isLearningNodeReady(registry([book]), book.id), false);
});

test('does not classify an action-only node as ready', () => {
  const actionOnly = node({
    id: 'action-only',
    kind: 'theme',
    label: 'Action only',
    actions: [{ intent: 'openChildren' }]
  });

  assert.equal(isLearningNodeReady(registry([actionOnly]), actionOnly), false);
});

test('classifies an ancestor with a ready descendant as ready', () => {
  const parent = node({
    id: 'parent',
    kind: 'grade',
    label: 'Parent',
    childIds: ['child']
  });
  const child = node({
    id: 'child',
    kind: 'practice',
    label: 'Child',
    parentId: parent.id,
    questions: [{ question: 'Ready?' }]
  });

  assert.equal(isLearningNodeReady(registry([parent, child]), parent), true);
});

test('does not classify an ancestor with only placeholder descendants as ready', () => {
  const parent = node({
    id: 'parent',
    kind: 'grade',
    label: 'Parent',
    childIds: ['placeholder']
  });
  const placeholder = node({
    id: 'placeholder',
    kind: 'learningArea',
    label: 'Placeholder',
    parentId: parent.id,
    summary: 'Content is coming soon.',
    actions: [{ intent: 'openChildren' }]
  });

  assert.equal(isLearningNodeReady(registry([parent, placeholder]), parent), false);
});

test('handles a missing child without throwing or reporting readiness', () => {
  const parent = node({
    id: 'parent',
    kind: 'grade',
    label: 'Parent',
    childIds: ['missing']
  });

  assert.equal(isLearningNodeReady(registry([parent]), parent), false);
});

test('returns false for a cycle without renderable content', () => {
  const first = node({
    id: 'first',
    kind: 'theme',
    label: 'First',
    childIds: ['second']
  });
  const second = node({
    id: 'second',
    kind: 'strand',
    label: 'Second',
    childIds: ['first']
  });

  assert.equal(isLearningNodeReady(registry([first, second]), first), false);
});

test('returns true for a cycle with a reachable renderable descendant', () => {
  const first = node({
    id: 'first',
    kind: 'theme',
    label: 'First',
    childIds: ['second']
  });
  const second = node({
    id: 'second',
    kind: 'strand',
    label: 'Second',
    childIds: ['first', 'ready']
  });
  const ready = node({
    id: 'ready',
    kind: 'practice',
    label: 'Ready',
    content: { type: 'practiceCardList', cards: [{ id: 'card-1' }] }
  });

  assert.equal(isLearningNodeReady(registry([first, second, ready]), first), true);
});

test('classifies each supported non-book content shape correctly', () => {
  const readyNodes = [
    node({
      id: 'practice-cards',
      kind: 'practice',
      label: 'Practice cards',
      content: { type: 'practiceCardList', cards: [{ id: 'card-1' }] }
    }),
    node({
      id: 'assessment-exams',
      kind: 'assessment',
      label: 'Assessment exams',
      content: { type: 'assessmentExamList', exams: [{ id: 'exam-1' }] }
    }),
    node({ id: 'questions', kind: 'practice', label: 'Questions', questions: [{}] }),
    node({ id: 'items', kind: 'notes', label: 'Items', items: ['item'] }),
    node({ id: 'sections', kind: 'notes', label: 'Sections', sections: [{}] }),
    node({ id: 'content-text', kind: 'notes', label: 'Content text', content: 'Lesson' }),
    node({ id: 'body-text', kind: 'notes', label: 'Body text', body: 'Lesson' }),
    node({
      id: 'instructions-text',
      kind: 'practice',
      label: 'Instructions text',
      instructions: 'Choose an answer.'
    })
  ];
  const contentRegistry = registry(readyNodes);

  readyNodes.forEach((readyNode) => {
    assert.equal(isLearningNodeReady(contentRegistry, readyNode), true, readyNode.id);
  });
});

test('does not classify an unresolved content reference as ready', () => {
  const referenced = node({
    id: 'referenced',
    kind: 'notes',
    label: 'Referenced',
    contentRef: 'missing-content',
    attributes: [
      { key: 'legacyManifestId', value: 'missing-manifest' },
      { key: 'legacyPath', value: 'missing/path' }
    ]
  });

  assert.equal(isLearningNodeReady(registry([referenced]), referenced), false);
});

test('does not use grade or learning-area labels and IDs as readiness signals', () => {
  const labeledPlaceholder = node({
    id: 'grade-3-english-activities',
    kind: 'learningArea',
    label: 'English Activities',
    summary: 'A learning area summary.',
    attributes: [{ key: 'routeSegment', value: 'english-activities' }]
  });

  assert.equal(
    isLearningNodeReady(registry([labeledPlaceholder]), labeledPlaceholder.id),
    false
  );
});
