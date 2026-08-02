import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import examOne from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-exam-001.js';
import examTwo from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-exam-002.js';
import examThree from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-exam-003.js';
import examFour from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-exam-004.js';
import examFive from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-exam-005.js';
import examSix from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-exam-006.js';
import examSeven from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-classroom-items-exam-007.js';
import examEight from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-furniture-exam-008.js';
import examNine from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-body-parts-exam-009.js';
import examTen from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-random-hard-exam-010.js';
import examEleven from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-random-super-hard-exam-011.js';
import examTwelve from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-random-super-hard-genius-exam-012.js';
import examThirteen from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-domestic-animals-exam-013.js';
import examFourteen from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-wild-animals-exam-014.js';
import examFifteen from '../../../../../academies/cbc/grade-3/english/assessments/spelling/spelling-aquatic-animals-exam-015.js';
import partsOfSpeechOne from '../../../../../academies/cbc/grade-3/english/assessments/spelling/grade-3-parts-of-speech-spelling-exam-001.js';
import partsOfSpeechTwo from '../../../../../academies/cbc/grade-3/english/assessments/spelling/grade-3-parts-of-speech-spelling-exam-002.js';
import classLibrary from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/reading-comprehension-class-library-exam-001.js';
import faithfulCollie from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/faithful-collie-exam-011.js';
import bearCub from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/bear-cub-adventure-exam-012.js';
import blackBeauty from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/black-beauty-and-ginger-exam-013.js';
import johnCherries from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/john-and-the-cherries-exam-014.js';
import campingHoliday from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/camping-holiday-exam-015.js';
import lionMouse from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/lion-and-the-mouse-exam-016.js';
import foxGoat from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/fox-and-the-goat-exam-017.js';
import tomThumb from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/tom-thumb-exam-018.js';
import usefulFinds from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/some-useful-finds-exam-019.js';
import ramanHorse from '../../../../../academies/cbc/grade-3/english/assessments/comprehension/raman-meets-the-rocking-horse-exam-020.js';
import mathOne from '../../../../../academies/cbc/grade-3/mathematics/assessments/mixed/mixed-mathematics-exam-001.js';
import mathTwo from '../../../../../academies/cbc/grade-3/mathematics/assessments/mixed/mixed-mathematics-exam-002.js';
import mathThree from '../../../../../academies/cbc/grade-3/mathematics/assessments/mixed/mixed-mathematics-exam-003.js';
import mathFour from '../../../../../academies/cbc/grade-3/mathematics/assessments/mixed/mixed-mathematics-exam-004.js';
import mathFive from '../../../../../academies/cbc/grade-3/mathematics/assessments/mixed/mixed-mathematics-exam-005.js';
import mathSix from '../../../../../academies/cbc/grade-3/mathematics/assessments/mixed/mixed-mathematics-exam-006.js';
import mathSeven from '../../../../../academies/cbc/grade-3/mathematics/assessments/mixed/mixed-mathematics-exam-007.js';
import mathEight from '../../../../../academies/cbc/grade-3/mathematics/assessments/mixed/mixed-mathematics-exam-008.js';
import kiswahiliHadithi from '../../../../../academies/cbc/grade-3/kiswahili/assessments/kiswahili-hadithi-exam-001.js';
import type { LearningNode } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { createLearningNodeRegistry, getChildren } from '../../../../registry/index.ts';
import { isLearningNodeReady } from '../../../../registry/registry.readiness.ts';
import { createNodeRoutePath, createRouteIndex } from '../../../../routing/index.ts';
import { grade3LearningAreaNodes } from '../grade3.registry.ts';
import {
  createAssessmentExamDescriptor
} from './assessmentExamDescriptor.ts';
import {
  grade3SpellingExamDescriptors
} from './english-activities/themes/spelling/spelling.registry.ts';
import {
  grade3ReadingComprehensionExamDescriptors
} from './english-activities/themes/reading-comprehension/readingComprehension.registry.ts';
import {
  grade3PartsOfSpeechExamDescriptors
} from './english-activities/themes/parts-of-speech/partsOfSpeech.registry.ts';
import {
  grade3MixedRevisionExamDescriptors
} from './mathematical-activities/themes/mixed-revision/mixedRevision.registry.ts';
import {
  grade3UfahamuExamDescriptors
} from './kiswahili-activities/themes/ufahamu/ufahamu.registry.ts';

type CanonicalQuestion = {
  estimatedTimeSeconds?: number;
  metadata: {
    assessmentType?: string;
    examId: string;
    examMode?: string;
    examTitle: string;
    questionTimeSeconds?: number;
    totalTimeSeconds?: number;
  };
};

type ManifestReference = {
  id: string;
  file: string;
  learningAreaId: string;
};

const descriptorGroups = [
  grade3SpellingExamDescriptors,
  grade3ReadingComprehensionExamDescriptors,
  grade3PartsOfSpeechExamDescriptors,
  grade3MixedRevisionExamDescriptors,
  grade3UfahamuExamDescriptors
];
const allDescriptors = descriptorGroups.flat();

const canonicalGroups: CanonicalQuestion[][] = [
  examOne, examTwo, examThree, examFour, examFive, examSix, examSeven, examEight,
  examNine, examTen, examEleven, examTwelve, examThirteen, examFourteen, examFifteen,
  classLibrary, faithfulCollie, bearCub, blackBeauty, johnCherries, campingHoliday,
  lionMouse, foxGoat, tomThumb, usefulFinds, ramanHorse,
  partsOfSpeechOne, partsOfSpeechTwo,
  mathOne, mathTwo, mathThree, mathFour, mathFive, mathSix, mathSeven, mathEight,
  kiswahiliHadithi
] as CanonicalQuestion[][];

function readManifest(relativePath: string): { assessments: ManifestReference[] } {
  return JSON.parse(readFileSync(new URL(relativePath, import.meta.url), 'utf8'));
}

const englishManifest = readManifest(
  '../../../../../academies/cbc/grade-3/english/topic.manifest.json'
);
const mathematicsManifest = readManifest(
  '../../../../../academies/cbc/grade-3/mathematics/topic.manifest.json'
);
const kiswahiliManifest = readManifest(
  '../../../../../academies/cbc/grade-3/kiswahili/topic.manifest.json'
);

const manifestGroups = [
  englishManifest.assessments.filter((item) => item.learningAreaId === 'spelling'),
  englishManifest.assessments.filter((item) => item.learningAreaId === 'reading-comprehension'),
  englishManifest.assessments.filter((item) => item.learningAreaId === 'parts-of-speech'),
  mathematicsManifest.assessments.filter((item) => item.learningAreaId === 'mixed-revision'),
  kiswahiliManifest.assessments.filter((item) => item.learningAreaId === 'ufahamu')
];
const manifestSourceRoots = [
  'src/academies/cbc/grade-3/english',
  'src/academies/cbc/grade-3/english',
  'src/academies/cbc/grade-3/english',
  'src/academies/cbc/grade-3/mathematics',
  'src/academies/cbc/grade-3/kiswahili'
];

const mismatchPairs = new Map([
  ['spelling-classroom-items-exam-007', 'grade-3-spelling-classroom-items-exam-007'],
  ['spelling-furniture-exam-008', 'grade-3-spelling-furniture-exam-008'],
  ['spelling-body-parts-exam-009', 'grade-3-spelling-body-parts-exam-009'],
  ['spelling-random-hard-exam-010', 'grade-3-spelling-random-hard-exam-010'],
  ['spelling-random-super-hard-exam-011', 'grade-3-spelling-random-super-hard-exam-011'],
  [
    'spelling-random-super-hard-genius-exam-012',
    'grade-3-spelling-random-super-hard-genius-exam-012'
  ],
  ['spelling-domestic-animals-exam-013', 'grade-3-spelling-domestic-animals-exam-013'],
  ['spelling-wild-animals-exam-014', 'grade-3-spelling-wild-animals-exam-014'],
  ['spelling-aquatic-animals-exam-015', 'grade-3-spelling-aquatic-animals-exam-015'],
  ['kiswahili-hadithi-exam-001', 'grade-3-kiswahili-hadithi-exam-001']
]);

const academyNode = createLearningNode({
  id: 'cbc-academy',
  kind: 'academy',
  label: 'CBC Academy',
  childIds: ['grade-3']
});
const gradeNode = createLearningNode({
  id: 'grade-3',
  kind: 'grade',
  label: 'Grade 3',
  parentId: academyNode.id,
  childIds: [
    'grade-3-english-activities',
    'grade-3-mathematical-activities',
    'grade-3-kiswahili-activities'
  ],
  attributes: [
    { key: 'routeSegment', value: 'grade-3' },
    { key: 'gradeCode', value: 'GD3' }
  ]
});
const registry = createLearningNodeRegistry({
  nodes: [academyNode, gradeNode, ...grade3LearningAreaNodes]
});

test('creates exactly 37 ordered metadata-only descriptors for 740 canonical questions', () => {
  assert.deepEqual(descriptorGroups.map((group) => group.length), [15, 11, 2, 8, 1]);
  assert.equal(allDescriptors.length, 37);
  assert.equal(canonicalGroups.length, 37);
  assert.equal(canonicalGroups.reduce((total, questions) => total + questions.length, 0), 740);
  assert.equal(new Set(allDescriptors.map((descriptor) => descriptor.id)).size, 37);
  assert.equal(
    new Set(allDescriptors.map((descriptor) => descriptor.metadata.manifestId)).size,
    37
  );

  allDescriptors.forEach((descriptor) => {
    const forbiddenPayloadKeys = [
      'questions',
      'passage',
      'options',
      'correctAnswer',
      'explanation',
      'visualHint'
    ];

    forbiddenPayloadKeys.forEach((key) => {
      assert.equal(key in descriptor, false, `${descriptor.id}:${key}`);
      assert.equal(key in descriptor.metadata, false, `${descriptor.id}:metadata:${key}`);
    });
    assert.equal('description' in descriptor, false, descriptor.id);
    assert.deepEqual(
      Object.keys(descriptor).sort(),
      ['estimatedTime', 'id', 'metadata', 'title']
    );
  });
});

test('keeps descriptor order aligned with each authoritative manifest group', () => {
  descriptorGroups.forEach((descriptors, index) => {
    assert.deepEqual(
      descriptors.map((descriptor) => descriptor.metadata.manifestId),
      manifestGroups[index].map((item) => item.id)
    );
    assert.deepEqual(
      descriptors.map((descriptor) => descriptor.metadata.sourceFile),
      manifestGroups[index].map((item) => `${manifestSourceRoots[index]}/${item.file}`)
    );
  });
});

test('matches every descriptor to canonical runtime ID, title, count, and timing', () => {
  allDescriptors.forEach((descriptor, index) => {
    const questions = canonicalGroups[index];
    const firstQuestion = questions[0];
    const questionTimeSeconds =
      firstQuestion.metadata.questionTimeSeconds ?? firstQuestion.estimatedTimeSeconds;

    assert.ok(firstQuestion, descriptor.id);
    assert.equal(descriptor.id, firstQuestion.metadata.examId);
    assert.equal(descriptor.metadata.examId, firstQuestion.metadata.examId);
    assert.equal(descriptor.title, firstQuestion.metadata.examTitle);
    assert.equal(descriptor.metadata.examTitle, firstQuestion.metadata.examTitle);
    assert.equal(descriptor.metadata.questionCount, questions.length);
    assert.equal(descriptor.metadata.questionTimeSeconds, questionTimeSeconds);
    assert.equal(
      descriptor.metadata.totalTimeSeconds,
      questions.length * Number(questionTimeSeconds)
    );
    assert.equal(descriptor.metadata.assessmentType, 'exam');
    assert.equal(firstQuestion.metadata.assessmentType, 'exam');
    assert.equal(
      descriptor.estimatedTime,
      `${descriptor.metadata.totalTimeSeconds / 60} min`
    );
    assert.ok(questions.every((question) => question.metadata.examId === descriptor.id));

    if (firstQuestion.metadata.examMode) {
      assert.equal(descriptor.metadata.examMode, firstQuestion.metadata.examMode);
    } else {
      assert.equal('examMode' in descriptor.metadata, false);
    }
  });
});

test('preserves the exact ten manifest and runtime ID mismatches', () => {
  const actualMismatches = allDescriptors
    .filter((descriptor) => descriptor.metadata.manifestId !== descriptor.id)
    .map((descriptor) => [descriptor.metadata.manifestId, descriptor.id]);

  assert.deepEqual(actualMismatches, [...mismatchPairs.entries()]);
});

test('validates descriptor input and derives deterministic durations without descriptions', () => {
  const descriptor = createAssessmentExamDescriptor({
    manifestId: 'manifest-exam',
    runtimeExamId: 'runtime-exam',
    title: 'Exam',
    sourceFile: 'exam.js',
    questionCount: 3,
    questionTimeSeconds: 45
  });

  assert.equal(descriptor.estimatedTime, '2 min 15 sec');
  assert.equal(descriptor.metadata.totalTimeSeconds, 135);
  assert.equal('description' in descriptor, false);
  assert.throws(() => createAssessmentExamDescriptor({
    manifestId: '',
    runtimeExamId: 'runtime-exam',
    title: 'Exam',
    sourceFile: 'exam.js',
    questionCount: 1,
    questionTimeSeconds: 30
  }));
  assert.throws(() => createAssessmentExamDescriptor({
    manifestId: 'manifest-exam',
    runtimeExamId: 'runtime-exam',
    title: 'Exam',
    sourceFile: 'exam.js',
    questionCount: 0,
    questionTimeSeconds: 30
  }));
});

test('registers the exact assessment hierarchy with ready learning areas and no placeholders', () => {
  const expectedThemeChildren = new Map([
    ['grade-3-english-activities', [
      'grade-3-english-activities-theme-spelling',
      'grade-3-english-activities-theme-reading-comprehension',
      'grade-3-english-activities-theme-parts-of-speech'
    ]],
    ['grade-3-mathematical-activities', [
      'grade-3-mathematical-activities-theme-mixed-revision'
    ]],
    ['grade-3-kiswahili-activities', ['grade-3-kiswahili-activities-theme-ufahamu']]
  ]);

  expectedThemeChildren.forEach((childIds, learningAreaId) => {
    assert.deepEqual(getChildren(registry, learningAreaId).map((node) => node.id), childIds);
    assert.equal(isLearningNodeReady(registry, learningAreaId), true);
  });

  assert.deepEqual(
    getChildren(registry, 'grade-3-english-activities-theme-spelling').map((node) => node.id),
    ['gd3-eng-spelling-learning-material', 'gd3-eng-spelling-assessment']
  );
  const spellingMaterial = registry.nodesById.get('gd3-eng-spelling-learning-material');
  assert.equal(spellingMaterial?.kind, 'learningMaterial');
  assert.ok(
    spellingMaterial?.content &&
    typeof spellingMaterial.content === 'object' &&
    'type' in spellingMaterial.content &&
    spellingMaterial.content.type === 'book' &&
    'pages' in spellingMaterial.content &&
    Array.isArray(spellingMaterial.content.pages) &&
    spellingMaterial.content.pages.length === 1
  );

  const assessmentOnlyThemeIds = [
    'grade-3-english-activities-theme-reading-comprehension',
    'grade-3-english-activities-theme-parts-of-speech',
    'grade-3-mathematical-activities-theme-mixed-revision',
    'grade-3-kiswahili-activities-theme-ufahamu'
  ];

  assessmentOnlyThemeIds.forEach((themeId) => {
    const children = getChildren(registry, themeId);
    assert.equal(children.length, 1, themeId);
    assert.equal(children[0].kind, 'assessment', themeId);
    assert.equal(isLearningNodeReady(registry, themeId), true, themeId);
  });

  assert.equal(
    grade3LearningAreaNodes.some((node) => (
      ['practice', 'lessonPlan', 'lesson', 'placeholder'].includes(node.kind)
    )),
    false
  );
});

test('creates five non-colliding theme routes and valid direct assessment routes', () => {
  const expectedRoutes = new Map([
    ['grade-3-english-activities-theme-spelling', '/gd3/english-activities/spelling'],
    [
      'grade-3-english-activities-theme-reading-comprehension',
      '/gd3/english-activities/reading-comprehension'
    ],
    [
      'grade-3-english-activities-theme-parts-of-speech',
      '/gd3/english-activities/parts-of-speech'
    ],
    [
      'grade-3-mathematical-activities-theme-mixed-revision',
      '/gd3/mathematical-activities/mixed-revision'
    ],
    ['grade-3-kiswahili-activities-theme-ufahamu', '/gd3/kiswahili-activities/ufahamu']
  ]);
  const routeOptions = { includeRoot: false, includeAcademyRoot: false };
  const routeIndex = createRouteIndex(registry, routeOptions);

  expectedRoutes.forEach((path, nodeId) => {
    assert.equal(createNodeRoutePath(registry, nodeId, routeOptions), path);
  });
  assert.equal(routeIndex.duplicatePaths.size, 0);

  const assessmentIds = [
    'gd3-eng-spelling-assessment',
    'gd3-eng-reading-comprehension-assessment',
    'gd3-eng-parts-of-speech-assessment',
    'gd3-math-mixed-revision-assessment',
    'gd3-kis-ufahamu-assessment'
  ];

  assessmentIds.forEach((assessmentId) => {
    const assessment = registry.nodesById.get(assessmentId) as LearningNode;
    const parentPath = createNodeRoutePath(registry, assessment.parentId as string, routeOptions);

    assert.equal(
      createNodeRoutePath(registry, assessmentId, routeOptions),
      `${parentPath}/assessment`
    );
  });
});
