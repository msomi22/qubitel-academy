import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildLearningAreaSummaries,
  filterContentByLearningArea,
  getContentLearningArea,
  shouldUseLearningAreaNavigation
} from './contentLearningAreaService.js';

const topicManifest = {
  id: 'english',
  category: 'grade-3',
  learningAreas: [
    {
      id: 'spelling',
      title: 'Spelling',
      description: 'Build strong word skills.',
      sequence: 10
    },
    {
      id: 'reading-comprehension',
      title: 'Reading Comprehension',
      description: 'Read short passages and answer questions using details from the text.',
      sequence: 20
    }
  ]
};

const spellingLesson = {
  id: 'english-spelling-lesson-001',
  type: 'learning',
  metadata: {
    manifestEntry: {
      id: 'spelling-lesson-001',
      kind: 'lesson',
      learningAreaId: 'spelling'
    }
  }
};

const spellingPractice = {
  id: 'english-spelling-practice-001-q001',
  type: 'mcq',
  metadata: {
    manifestEntry: {
      id: 'spelling-practice-001',
      kind: 'practice',
      learningAreaId: 'spelling'
    }
  }
};

const spellingExam = {
  id: 'english-spelling-exam-001-q001',
  type: 'mcq',
  metadata: {
    assessmentType: 'exam',
    examId: 'spelling-exam-001',
    manifestEntry: {
      id: 'spelling-exam-001',
      kind: 'assessment',
      learningAreaId: 'spelling'
    }
  }
};

const readingPractice = {
  id: 'english-reading-comprehension-school-garden-practice-001-q001',
  type: 'mcq',
  metadata: {
    manifestEntry: {
      id: 'reading-comprehension-school-garden-practice-001',
      kind: 'practice',
      learningAreaId: 'reading-comprehension'
    }
  }
};

test('learning-area navigation is enabled by manifest declaration', () => {
  assert.equal(shouldUseLearningAreaNavigation(topicManifest), true);
  assert.equal(shouldUseLearningAreaNavigation({ id: 'arrays' }), false);
});

test('content learning area resolves from manifest entry metadata', () => {
  assert.deepEqual(getContentLearningArea(readingPractice, topicManifest), {
    id: 'reading-comprehension',
    title: 'Reading Comprehension',
    description: 'Read short passages and answer questions using details from the text.',
    sequence: 20
  });
});

test('legacy strand metadata remains supported without subject-specific fallbacks', () => {
  const area = getContentLearningArea({
    id: 'legacy-grammar-001',
    metadata: {
      strandId: 'grammar',
      strandTitle: 'Grammar',
      strandDescription: 'Practise sentence patterns.',
      sequence: 30
    }
  }, topicManifest);

  assert.deepEqual(area, {
    id: 'grammar',
    title: 'Grammar',
    description: 'Practise sentence patterns.',
    sequence: 30
  });
});

test('summaries count lessons, practice questions, and assessment groups by learning area', () => {
  const summaries = buildLearningAreaSummaries(
    topicManifest,
    [spellingLesson, spellingPractice, spellingExam, readingPractice],
    { 'english-spelling-practice-001-q001': true }
  );

  const spelling = summaries.find((summary) => summary.id === 'spelling');
  const reading = summaries.find((summary) => summary.id === 'reading-comprehension');

  assert.equal(spelling.lessonCount, 1);
  assert.equal(spelling.practiceCount, 1);
  assert.equal(spelling.assessmentCount, 1);
  assert.equal(spelling.completedCount, 1);
  assert.equal(spelling.percent, 33);
  assert.equal(reading.lessonCount, 0);
  assert.equal(reading.practiceCount, 1);
  assert.equal(reading.assessmentCount, 0);
});

test('declared learning areas remain visible even before content exists', () => {
  const summaries = buildLearningAreaSummaries(topicManifest, [spellingLesson]);

  assert.deepEqual(
    summaries.map((summary) => [summary.id, summary.totalCount]),
    [
      ['spelling', 1],
      ['reading-comprehension', 0]
    ]
  );
});

test('content without an area is isolated in an ungrouped bucket only when needed', () => {
  const summaries = buildLearningAreaSummaries(topicManifest, [
    { id: 'english-unmapped-q001', type: 'mcq', metadata: {} }
  ]);

  assert.ok(summaries.some((summary) => summary.id === 'ungrouped'));
});

test('filters loaded content by selected learning area', () => {
  assert.deepEqual(
    filterContentByLearningArea([spellingPractice, readingPractice], topicManifest, 'reading-comprehension')
      .map((item) => item.id),
    ['english-reading-comprehension-school-garden-practice-001-q001']
  );
});
