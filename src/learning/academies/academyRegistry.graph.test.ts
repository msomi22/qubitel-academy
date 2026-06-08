import assert from 'node:assert/strict';
import test from 'node:test';
import { validateLearningNodeRegistry as validate } from '../validation/index.ts';
import { createQubitelAcademyPlatformRegistry as reg } from './index.ts';

test('academy platform graph validates', () => {
  assert.equal(validate(reg(), { requireSingleRoot: true }).valid, true);
});
