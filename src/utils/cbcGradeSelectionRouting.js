import { categoryPath } from '../services/categoryNavigationService.js';

const CBC_GRADE_SELECTION_PATH = '/categories';

const SUBJECT_ALIASES = {
  english: ['english'],
  math: ['mathematics', 'math'],
  mathematics: ['mathematics', 'math'],
  'environmental-activities': ['environmental-activities', 'cre'],
  environment: ['environmental-activities', 'cre'],
  cre: ['cre', 'environmental-activities'],
  kiswahili: ['kiswahili']
};

const SUBJECT_QUERY_VALUES = {
  english: 'english',
  math: 'math',
  mathematics: 'math',
  'environmental-activities': 'environmental-activities',
  environment: 'environmental-activities',
  cre: 'cre',
  kiswahili: 'kiswahili'
};

const ACTION_QUERY_VALUES = {
  continue: 'continue',
  'read-with-me': 'read-with-me'
};

function toSearchParams(searchParams = new URLSearchParams()) {
  if (searchParams instanceof URLSearchParams) return searchParams;
  return new URLSearchParams(searchParams);
}

function normalizeSubject(value) {
  return SUBJECT_QUERY_VALUES[String(value || '').trim().toLowerCase()] || '';
}

function normalizeAction(value) {
  return ACTION_QUERY_VALUES[String(value || '').trim().toLowerCase()] || '';
}

function getCategoryTopicIds(category = {}) {
  return Array.isArray(category.topics)
    ? category.topics.map((topicId) => String(topicId))
    : [];
}

function findAvailableTopic(category, candidates = []) {
  const topicIds = getCategoryTopicIds(category);
  return candidates.find((topicId) => topicIds.includes(topicId)) || '';
}

function buildCategoryTopicPath(category, topicId) {
  const basePath = category?.route || categoryPath(category?.id);
  if (!topicId) return basePath;

  const params = new URLSearchParams();
  params.set('topic', topicId);
  params.set('page', '1');
  return `${basePath}?${params.toString()}`;
}

export function buildCbcGradeSelectionPath({ subject, action } = {}) {
  const params = new URLSearchParams();
  const normalizedSubject = normalizeSubject(subject);
  const normalizedAction = normalizeAction(action);

  if (normalizedSubject) params.set('subject', normalizedSubject);
  else if (normalizedAction) params.set('action', normalizedAction);

  const query = params.toString();
  return query ? `${CBC_GRADE_SELECTION_PATH}?${query}` : CBC_GRADE_SELECTION_PATH;
}

export function readCbcGradeSelectionIntent(searchParams = new URLSearchParams()) {
  const params = toSearchParams(searchParams);
  const subject = normalizeSubject(params.get('subject'));
  if (subject) return { type: 'subject', subject };

  const action = normalizeAction(params.get('action'));
  if (action) return { type: 'action', action };

  return null;
}

export function buildCbcGradeDestinationPath(category, intent, options = {}) {
  const basePath = category?.route || categoryPath(category?.id);
  if (!category?.id || !intent) return basePath;

  if (intent.type === 'action') {
    if (intent.action === 'read-with-me') {
      return buildCategoryTopicPath(
        category,
        findAvailableTopic(category, ['english']) || 'english'
      );
    }

    if (intent.action === 'continue') {
      return buildCategoryTopicPath(
        category,
        findAvailableTopic(category, [options.continueTopicId])
      );
    }

    return basePath;
  }

  const subject = normalizeSubject(intent.subject);
  const candidates = SUBJECT_ALIASES[subject] || [];
  return buildCategoryTopicPath(category, findAvailableTopic(category, candidates));
}
