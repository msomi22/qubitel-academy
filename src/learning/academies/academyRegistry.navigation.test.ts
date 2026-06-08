import assert from 'node:assert/strict';
import test from 'node:test';
import { getBreadcrumbs } from '../navigation/index.ts';
import { createQubitelAcademyPlatformRegistry as reg } from './index.ts';

test('academy breadcrumbs include platform root', () => {
  assert.deepEqual(getBreadcrumbs(reg(), 'cbc-academy').map((n) => n.id), [
    'qubitel-academy',
    'cbc-academy'
  ]);
});
