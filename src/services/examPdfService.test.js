import assert from 'node:assert/strict';
import test from 'node:test';

import { createExamResultPdf } from './examPdfService.js';

test('creates a dependency-free PDF result with required CBC report fields', () => {
  const pdf = createExamResultPdf({
    examId: 'spelling-exam-001',
    examTitle: 'Spelling Exam 1',
    attemptNumber: 2,
    completedAt: '2026-06-04T10:02:00.000Z',
    status: 'completed',
    correctCount: 16,
    incorrectCount: 3,
    unansweredCount: 1,
    totalQuestions: 20,
    percentage: 80
  }, {
    platformName: 'Qubitel Academy Platform',
    productName: 'CBC Exam Practice',
    academyName: 'CBC Academy',
    categoryName: 'Grade 3',
    topicName: 'English',
    skillName: 'Spelling'
  });

  assert.ok(pdf.startsWith('%PDF-1.4'));
  assert.match(pdf, /CBC Academy/);
  assert.match(pdf, /Grade 3/);
  assert.match(pdf, /Spelling Exam 1/);
  assert.match(pdf, /Score: 16 \/ 20/);
  assert.match(pdf, /Percentage: 80%/);
  assert.ok(pdf.endsWith('%%EOF'));
});
