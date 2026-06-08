import assert from 'node:assert/strict';
import test from 'node:test';
import { getAcademyRootNodeIds as ids } from './index.ts';

test('academy registry exposes stable ids', () => assert.deepEqual(ids(), [
  'technology-academy',
  'cbc-academy',
  'customer-experience-academy'
]));
