import assert from 'node:assert/strict';
import test from 'node:test';
import { getAcademyRootNodeById as byId } from './index.ts';

test('academy lookup returns safe copies and undefined for unknown ids', () => {
  const first = byId('cbc-academy');
  assert.equal(first?.label, 'CBC Academy');
  if (first) first.label = 'Mutated';
  assert.equal(byId('cbc-academy')?.label, 'CBC Academy');
  assert.equal(byId('missing-academy'), undefined);
});
