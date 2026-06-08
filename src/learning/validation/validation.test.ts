import assert from 'node:assert/strict';
import test from 'node:test';

import type { LearningNode } from '../core/index.ts';
import { createLearningNodeRegistry } from '../registry/index.ts';
import {
  createValidatedLearningNodeRegistry,
  createValidationIssue,
  getValidationErrors,
  getValidationWarnings,
  hasValidationErrors,
  LEARNING_NODE_VALIDATION_CODES,
  validateLearningNodeRegistry,
  validateLearningNodes
} from './index.ts';

function node(input: Partial<LearningNode> & Pick<LearningNode, 'id' | 'kind' | 'label'>): LearningNode {
  return input;
}

const validGraph = [
  node({ id: 'platform', kind: 'platform', label: 'Qubitel Academy', childIds: ['tech'] }),
  node({ id: 'tech', kind: 'academy', label: 'Technology Academy', parentId: 'platform', childIds: ['dsa'] }),
  node({ id: 'dsa', kind: 'category', label: 'DSA', parentId: 'tech', childIds: ['sliding-window'] }),
  node({ id: 'sliding-window', kind: 'topic', label: 'Sliding Window', parentId: 'dsa' })
];

function codes(result: ReturnType<typeof validateLearningNodes>): string[] {
  return result.issues.map((issue) => issue.code);
}

test('valid graph passes validation', () => {
  const result = validateLearningNodes(validGraph, { requireSingleRoot: true });

  assert.equal(result.valid, true);
  assert.deepEqual(result.issues, []);
});

test('duplicate ids fail validation', () => {
  const result = validateLearningNodes([
    node({ id: 'duplicate', kind: 'topic', label: 'One' }),
    node({ id: 'duplicate', kind: 'topic', label: 'Two' })
  ]);

  assert.equal(result.valid, false);
  assert.deepEqual(codes(result), [LEARNING_NODE_VALIDATION_CODES.duplicateNodeId]);
});

test('missing parent fails validation', () => {
  const result = validateLearningNodes([
    node({ id: 'child', kind: 'topic', label: 'Child', parentId: 'missing-parent' })
  ]);

  assert.equal(result.valid, false);
  assert.equal(result.issues[0].code, LEARNING_NODE_VALIDATION_CODES.missingParent);
  assert.equal(result.issues[0].nodeId, 'child');
  assert.equal(result.issues[0].relatedNodeId, 'missing-parent');
});

test('missing child fails validation', () => {
  const result = validateLearningNodes([
    node({ id: 'parent', kind: 'topic', label: 'Parent', childIds: ['missing-child'] })
  ]);

  assert.equal(result.valid, false);
  assert.equal(result.issues[0].code, LEARNING_NODE_VALIDATION_CODES.missingChild);
  assert.equal(result.issues[0].nodeId, 'parent');
  assert.equal(result.issues[0].relatedNodeId, 'missing-child');
});

test('parent child mismatch fails when child points to another parent', () => {
  const result = validateLearningNodes([
    node({ id: 'parent-a', kind: 'topic', label: 'Parent A', childIds: ['child'] }),
    node({ id: 'parent-b', kind: 'topic', label: 'Parent B' }),
    node({ id: 'child', kind: 'topic', label: 'Child', parentId: 'parent-b' })
  ]);

  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.code === LEARNING_NODE_VALIDATION_CODES.parentChildMismatch));
});

test('parent child mismatch fails when parent lists children but omits child parent reference', () => {
  const result = validateLearningNodes([
    node({ id: 'parent', kind: 'topic', label: 'Parent', childIds: ['other-child'] }),
    node({ id: 'other-child', kind: 'topic', label: 'Other Child', parentId: 'parent' }),
    node({ id: 'child', kind: 'topic', label: 'Child', parentId: 'parent' })
  ]);

  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.code === LEARNING_NODE_VALIDATION_CODES.parentChildMismatch));
});

test('self-parent fails validation', () => {
  const result = validateLearningNodes([
    node({ id: 'self', kind: 'topic', label: 'Self', parentId: 'self' })
  ]);

  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.code === LEARNING_NODE_VALIDATION_CODES.selfParent));
});

test('self-child fails validation', () => {
  const result = validateLearningNodes([
    node({ id: 'self', kind: 'topic', label: 'Self', childIds: ['self'] })
  ]);

  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.code === LEARNING_NODE_VALIDATION_CODES.selfChild));
});

test('cycle detection fails safely', () => {
  const result = validateLearningNodes([
    node({ id: 'a', kind: 'topic', label: 'A', childIds: ['b'] }),
    node({ id: 'b', kind: 'topic', label: 'B', childIds: ['a'] })
  ]);

  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.code === LEARNING_NODE_VALIDATION_CODES.cycleDetected));
});

test('invalid node shape fails validation', () => {
  const result = validateLearningNodes([
    { id: 'bad-node', kind: 'topic' }
  ]);

  assert.equal(result.valid, false);
  assert.equal(result.issues[0].code, LEARNING_NODE_VALIDATION_CODES.invalidNode);
  assert.equal(result.issues[0].nodeId, 'bad-node');
});

test('multiple roots fail only when requireSingleRoot is true', () => {
  const nodes = [
    node({ id: 'root-a', kind: 'academy', label: 'Root A' }),
    node({ id: 'root-b', kind: 'academy', label: 'Root B' })
  ];

  assert.equal(validateLearningNodes(nodes).valid, true);

  const strictResult = validateLearningNodes(nodes, { requireSingleRoot: true });
  assert.equal(strictResult.valid, false);
  assert.ok(strictResult.issues.some((issue) => issue.code === LEARNING_NODE_VALIDATION_CODES.multipleRoots));
});

test('orphan roots fail when allowOrphans is false', () => {
  const result = validateLearningNodes([
    node({ id: 'root-a', kind: 'academy', label: 'Root A' }),
    node({ id: 'root-b', kind: 'academy', label: 'Root B' })
  ], { allowOrphans: false });

  assert.equal(result.valid, false);
  assert.ok(result.issues.some((issue) => issue.code === LEARNING_NODE_VALIDATION_CODES.orphanNode));
});

test('empty graph is valid unless a single root is required', () => {
  assert.equal(validateLearningNodes([]).valid, true);

  const strictResult = validateLearningNodes([], { requireSingleRoot: true });
  assert.equal(strictResult.valid, false);
  assert.equal(strictResult.issues[0].code, LEARNING_NODE_VALIDATION_CODES.multipleRoots);
});

test('validates an existing registry', () => {
  const registry = createLearningNodeRegistry({ nodes: validGraph });
  const result = validateLearningNodeRegistry(registry, { requireSingleRoot: true });

  assert.equal(result.valid, true);
});

test('creates validated registry and validation result together', () => {
  const { registry, validation } = createValidatedLearningNodeRegistry(validGraph, { requireSingleRoot: true });

  assert.equal(registry.nodesById.get('tech')?.label, 'Technology Academy');
  assert.equal(validation.valid, true);
});

test('helper functions separate errors and warnings', () => {
  const warning = createValidationIssue({
    code: 'CUSTOM_WARNING',
    severity: 'warning',
    message: 'Custom warning.'
  });
  const error = createValidationIssue({
    code: 'CUSTOM_ERROR',
    message: 'Custom error.'
  });
  const result = { valid: false, issues: [warning, error] };

  assert.equal(hasValidationErrors(result), true);
  assert.deepEqual(getValidationWarnings(result), [warning]);
  assert.deepEqual(getValidationErrors(result), [error]);
});

test('issue ordering is deterministic', () => {
  const result = validateLearningNodes([
    node({ id: 'z', kind: 'topic', label: 'Z', parentId: 'missing-z' }),
    node({ id: 'a', kind: 'topic', label: 'A', childIds: ['missing-a'] }),
    node({ id: 'z', kind: 'topic', label: 'Z duplicate' })
  ]);

  assert.deepEqual(result.issues.map((issue) => `${issue.code}:${issue.nodeId || ''}:${issue.relatedNodeId || ''}`), [
    'DUPLICATE_NODE_ID:z:',
    'MISSING_CHILD:a:missing-a',
    'MISSING_PARENT:z:missing-z'
  ]);
});

test('validation does not mutate input nodes', () => {
  const inputNodes = [
    node({ id: 'platform', kind: 'platform', label: 'Platform', childIds: ['academy'] }),
    node({ id: 'academy', kind: 'academy', label: 'Academy', parentId: 'platform' })
  ];
  const snapshot = JSON.stringify(inputNodes);

  validateLearningNodes(inputNodes, { requireSingleRoot: true });

  assert.equal(JSON.stringify(inputNodes), snapshot);
});
