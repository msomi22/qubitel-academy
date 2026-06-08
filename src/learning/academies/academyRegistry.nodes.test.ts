import assert from 'node:assert/strict';
import test from 'node:test';
import { getAcademyRootNodes as nodes } from './index.ts';

test('academy nodes use generic academy kind and platform parent', () => {
  for (const node of nodes()) {
    assert.equal(node.kind, 'academy');
    assert.equal(node.parentId, 'qubitel-academy');
  }
});
