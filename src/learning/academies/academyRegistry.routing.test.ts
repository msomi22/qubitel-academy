import assert from 'node:assert/strict';
import test from 'node:test';
import { createNodeRoutePath as route } from '../routing/index.ts';
import { createQubitelAcademyPlatformRegistry as reg } from './index.ts';

test('academy routes generate below academy base path', () => {
  assert.equal(route(reg(), 'technology-academy'), '/academy/technology-academy');
  assert.equal(route(reg(), 'customer-experience-academy'), '/academy/customer-experience-academy');
});