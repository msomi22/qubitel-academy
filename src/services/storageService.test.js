import assert from 'node:assert/strict';
import test from 'node:test';

import { storageService } from './storageService.js';

function memoryStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.get(key) || null;
    },
    setItem(key, value) {
      values.set(key, value);
    }
  };
}

test('exam attempts append so retakes preserve previous scores', () => {
  const previousLocalStorage = globalThis.localStorage;
  globalThis.localStorage = memoryStorage();

  try {
    storageService.addExamAttempt('spelling-exam-001', {
      attemptId: 'attempt-1',
      percentage: 60
    });
    storageService.addExamAttempt('spelling-exam-001', {
      attemptId: 'attempt-2',
      percentage: 90
    });

    assert.deepEqual(
      storageService.getExamAttempts('spelling-exam-001').map((attempt) => attempt.percentage),
      [60, 90]
    );
  } finally {
    globalThis.localStorage = previousLocalStorage;
  }
});
