import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getLegacyAcademyStorageKey,
  getLegacyRecentQuestionsStorageKey,
  migrateStorageKey
} from './storageKeyMigration.ts';

function memoryStorage(initialValues: Record<string, string> = {}) {
  const values = new Map(Object.entries(initialValues));
  return {
    getItem(key: string) {
      return values.has(key) ? values.get(key) || null : null;
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
    snapshot() {
      return Object.fromEntries(values.entries());
    }
  };
}

test('maps academies to their legacy progress storage keys', () => {
  assert.equal(getLegacyAcademyStorageKey('tech'), 'senior-dev-accelerator:v2');
  assert.equal(getLegacyAcademyStorageKey('cbc'), 'senior-dev-accelerator:v2:cbc');
  assert.equal(
    getLegacyAcademyStorageKey('customer-experience'),
    'senior-dev-accelerator:v2:customer-experience'
  );
});

test('maps academies to their legacy recent-question storage keys', () => {
  assert.equal(getLegacyRecentQuestionsStorageKey('tech'), 'senior-dev-accelerator:recent-questions');
  assert.equal(getLegacyRecentQuestionsStorageKey('cbc'), 'senior-dev-accelerator:v2:cbc:recent-questions');
  assert.equal(
    getLegacyRecentQuestionsStorageKey('customer-experience'),
    'senior-dev-accelerator:v2:customer-experience:recent-questions'
  );
});

test('copies legacy progress into the new key without deleting old data', () => {
  const storage = memoryStorage({
    'senior-dev-accelerator:v2': JSON.stringify({ completed: { q1: true } })
  });

  const migrated = migrateStorageKey({
    legacyKey: 'senior-dev-accelerator:v2',
    currentKey: 'qubitel-academy:v2',
    storage
  });

  assert.equal(migrated, true);
  assert.equal(storage.getItem('senior-dev-accelerator:v2'), JSON.stringify({ completed: { q1: true } }));
  assert.equal(storage.getItem('qubitel-academy:v2'), JSON.stringify({ completed: { q1: true } }));
});

test('does not overwrite existing new progress data', () => {
  const storage = memoryStorage({
    'senior-dev-accelerator:v2': JSON.stringify({ completed: { legacy: true } }),
    'qubitel-academy:v2': JSON.stringify({ completed: { current: true } })
  });

  const migrated = migrateStorageKey({
    legacyKey: 'senior-dev-accelerator:v2',
    currentKey: 'qubitel-academy:v2',
    storage
  });

  assert.equal(migrated, false);
  assert.equal(storage.getItem('qubitel-academy:v2'), JSON.stringify({ completed: { current: true } }));
});

test('skips migration when legacy storage is missing', () => {
  const storage = memoryStorage();

  const migrated = migrateStorageKey({
    legacyKey: 'senior-dev-accelerator:v2',
    currentKey: 'qubitel-academy:v2',
    storage
  });

  assert.equal(migrated, false);
  assert.equal(storage.getItem('qubitel-academy:v2'), null);
});
