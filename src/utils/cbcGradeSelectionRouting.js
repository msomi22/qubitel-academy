import { getAttribute } from '../learning/core/index.ts';
import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import {
  createCbcGradesRegistrySource
} from '../learning/academies/cbc/cbcGrades.registry.ts';
import {
  createLearningNodeRegistry,
  getChildren,
  getNodeById,
  isLearningNodeReady
} from '../learning/registry/index.ts';
import { createNodeRoutePath } from '../learning/routing/index.ts';

const CBC_GRADE_SELECTION_PATH = '/categories';
const CBC_ROUTE_OPTIONS = {
  includeRoot: false,
  includeAcademyRoot: false
};
const cbcAcademyNode = getAcademyRootNodeById('cbc-academy');
const cbcGradesSource = createCbcGradesRegistrySource();
const cbcRegistry = createLearningNodeRegistry({
  nodes: [cbcAcademyNode, ...cbcGradesSource.nodes].filter(Boolean)
});

const SUBJECT_ALIASES = {
  english: ['english', 'english-activities', 'eng'],
  math: ['math', 'mathematics', 'mathematical-activities'],
  'environmental-activities': ['environmental-activities', 'environment'],
  cre: ['cre', 'religious-education-activities'],
  kiswahili: ['kiswahili', 'kiswahili-activities']
};

const SUBJECT_QUERY_VALUES = {
  english: 'english',
  eng: 'english',
  math: 'math',
  mathematics: 'math',
  'mathematical-activities': 'math',
  'environmental-activities': 'environmental-activities',
  environment: 'environmental-activities',
  cre: 'cre',
  kiswahili: 'kiswahili',
  'kiswahili-activities': 'kiswahili'
};

const ACTION_QUERY_VALUES = {
  continue: 'continue',
  'read-with-me': 'read-with-me'
};

function toSearchParams(searchParams = new URLSearchParams()) {
  if (searchParams instanceof URLSearchParams) return searchParams;
  return new URLSearchParams(searchParams);
}

function normalizeValue(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeSubject(value) {
  return SUBJECT_QUERY_VALUES[normalizeValue(value)] || '';
}

function normalizeAction(value) {
  return ACTION_QUERY_VALUES[normalizeValue(value)] || '';
}

function getLearningAreaSearchValues(node) {
  return [
    node.id,
    node.label,
    getAttribute(node, 'learningAreaCode'),
    getAttribute(node, 'learningAreaId'),
    getAttribute(node, 'learningAreaName'),
    getAttribute(node, 'routeSegment')
  ].map(normalizeValue);
}

function learningAreaMatchesSubject(node, subject) {
  const aliases = SUBJECT_ALIASES[normalizeSubject(subject)] || [];
  const values = getLearningAreaSearchValues(node);

  return aliases.some((alias) => values.some((value) => (
    value === alias || value.endsWith(`-${alias}`)
  )));
}

export function buildCbcSubjectGradeSelectionPath({ subject } = {}) {
  const normalizedSubject = normalizeSubject(subject);
  if (!normalizedSubject) return CBC_GRADE_SELECTION_PATH;

  const params = new URLSearchParams();
  params.set('subject', normalizedSubject);
  return `${CBC_GRADE_SELECTION_PATH}?${params.toString()}`;
}

export function buildCbcLearningAreaPath({ gradeId, subject } = {}) {
  const grade = getNodeById(cbcRegistry, normalizeValue(gradeId));
  if (!grade || grade.kind !== 'grade') return CBC_GRADE_SELECTION_PATH;

  const normalizedSubject = normalizeSubject(subject);
  const target = normalizedSubject
    ? findReadyCbcLearningArea(cbcRegistry, grade, normalizedSubject)
    : grade;

  return target
    ? createNodeRoutePath(cbcRegistry, target, CBC_ROUTE_OPTIONS) || CBC_GRADE_SELECTION_PATH
    : createNodeRoutePath(cbcRegistry, grade, CBC_ROUTE_OPTIONS) || CBC_GRADE_SELECTION_PATH;
}

export function buildCbcGradeSelectionPath({ subject, action } = {}) {
  const normalizedSubject = normalizeSubject(subject);
  const normalizedAction = normalizeAction(action);

  if (normalizedSubject === 'english' || normalizedAction === 'read-with-me') {
    return buildCbcLearningAreaPath({ gradeId: 'grade-1', subject: 'english' });
  }

  if (normalizedSubject === 'math') {
    return buildCbcLearningAreaPath({ gradeId: 'grade-1', subject: 'math' });
  }

  if (normalizedAction === 'continue' || normalizedSubject) {
    return buildCbcLearningAreaPath({ gradeId: 'grade-1' });
  }

  return CBC_GRADE_SELECTION_PATH;
}

export function readCbcGradeSelectionIntent(searchParams = new URLSearchParams()) {
  const params = toSearchParams(searchParams);
  const subject = normalizeSubject(params.get('subject'));
  if (subject) return { type: 'subject', subject };

  const action = normalizeAction(params.get('action'));
  if (action) return { type: 'action', action };

  return null;
}

export function findReadyCbcLearningArea(registry, grade, subject) {
  const normalizedSubject = normalizeSubject(subject);
  if (!registry || !grade?.id || !normalizedSubject) return null;

  return getChildren(registry, grade)
    .filter((node) => node.kind === 'learningArea')
    .find((node) => (
      learningAreaMatchesSubject(node, normalizedSubject)
      && isLearningNodeReady(registry, node)
    )) || null;
}

export function buildCbcGradeDestinationPath(registry, grade, intent) {
  if (!registry || !grade?.id) return null;

  if (intent?.type === 'subject') {
    const learningArea = findReadyCbcLearningArea(registry, grade, intent.subject);
    return learningArea
      ? createNodeRoutePath(registry, learningArea, CBC_ROUTE_OPTIONS) || null
      : null;
  }

  return createNodeRoutePath(registry, grade, CBC_ROUTE_OPTIONS) || null;
}
