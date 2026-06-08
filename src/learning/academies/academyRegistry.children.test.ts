import assert from 'node:assert/strict';
import test from 'node:test';
import { getChildren } from '../registry/index.ts';
import { createQubitelAcademyPlatformRegistry as reg } from './index.ts';

test('platform root resolves academy children', () => {
  assert.deepEqual(getChildren(reg(), 'qubitel-academy').map((n) => n.id), [
    'technology-academy',
    'cbc-academy',
    'customer-experience-academy'
  ]);
});
