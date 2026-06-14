import assert from 'node:assert/strict';
import test from 'node:test';

import { storageService } from './storageService.js';

function memoryStorage(initialValues = {}) {
  const values = new Map(Object.entries(initialValues));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) || null : null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    }
  };
}

test('reads legacy progress through the new Qubitel storage key without deleting old data', () => {
  const previousLocalStorage = globalThis.localStorage;
  const legacyValue = JSON.stringify({ completed: { 'legacy-question-001': true } });
  globalThis.localStorage = memoryStorage({
    'senior-dev-accelerator:v2': legacyValue
  });

  try {
    const state = storageService.read();

    assert.equal(state.completed['legacy-question-001'], true);
    assert.equal(globalThis.localStorage.getItem('senior-dev-accelerator:v2'), legacyValue);
    assert.equal(globalThis.localStorage.getItem('qubitel-academy:v2'), legacyValue);
  } finally {
    globalThis.localStorage = previousLocalStorage;
  }
});

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

test('active exam sessions can be saved, restored, and cleared', () => {
  const previousLocalStorage = globalThis.localStorage;
  globalThis.localStorage = memoryStorage();

  try {
    storageService.setActiveExamSession('spelling-exam-001', {
      answers: {
        q1: { selectedAnswer: 2, timedOut: false }
      },
      currentIndex: 3,
      startedAt: '2026-06-04T10:00:00.000Z',
      attemptNumber: 1,
      timeLeftByQuestion: {
        q1: 12
      }
    });

    const session = storageService.getActiveExamSession('spelling-exam-001');

    assert.equal(session.examId, 'spelling-exam-001');
    assert.equal(session.currentIndex, 3);
    assert.equal(session.answers.q1.selectedAnswer, 2);
    assert.equal(session.timeLeftByQuestion.q1, 12);
    assert.ok(session.updatedAt);

    storageService.clearActiveExamSession('spelling-exam-001');
    assert.equal(storageService.getActiveExamSession('spelling-exam-001'), null);
  } finally {
    globalThis.localStorage = previousLocalStorage;
  }
});

test('last CBC activity can be saved and restored for Continue', () => {
  const previousLocalStorage = globalThis.localStorage;
  globalThis.localStorage = memoryStorage();

  try {
    const activity = storageService.setLastCbcActivity({
      categoryId: 'grade-1',
      topicId: 'environmental-activities',
      activityType: 'practice',
      href: '/category/grade-1?topic=environmental-activities&page=1',
      title: 'Environmental Activities',
      categoryTitle: 'Grade 1',
      updatedAt: '2026-06-14T10:00:00.000Z'
    });

    assert.deepEqual(activity, {
      academy: 'cbc',
      categoryId: 'grade-1',
      topicId: 'environmental-activities',
      activityType: 'practice',
      href: '/category/grade-1?topic=environmental-activities&page=1',
      title: 'Environmental Activities',
      categoryTitle: 'Grade 1',
      updatedAt: '2026-06-14T10:00:00.000Z'
    });
    assert.deepEqual(storageService.getLastCbcActivity(), activity);
  } finally {
    globalThis.localStorage = previousLocalStorage;
  }
});

test('last CBC activity ignores incomplete stored activity data', () => {
  const previousLocalStorage = globalThis.localStorage;
  globalThis.localStorage = memoryStorage({
    'qubitel-academy:v2': JSON.stringify({
      lastCbcActivity: {
        academy: 'cbc',
        categoryId: 'grade-1'
      }
    })
  });

  try {
    assert.equal(storageService.getLastCbcActivity(), null);
    assert.equal(storageService.setLastCbcActivity({ categoryId: 'grade-1' }), null);
  } finally {
    globalThis.localStorage = previousLocalStorage;
  }
});

test('grade one voice preference defaults to female and persists male selection', () => {
  const previousLocalStorage = globalThis.localStorage;
  globalThis.localStorage = memoryStorage();

  try {
    assert.equal(storageService.getGradeOneVoiceType(), 'female');
    assert.equal(storageService.setGradeOneVoiceType('male'), 'male');
    assert.equal(storageService.getGradeOneVoiceType(), 'male');
    assert.equal(storageService.setGradeOneVoiceType('unknown'), 'female');
    assert.equal(storageService.getGradeOneVoiceType(), 'female');
  } finally {
    globalThis.localStorage = previousLocalStorage;
  }
});
