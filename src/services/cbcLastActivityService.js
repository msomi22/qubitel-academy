import { getActiveAcademy } from '../config/detectAcademy.ts';
import { buildCategoryReturnPath } from './categoryNavigationService.js';
import { storageService } from './storageService.js';

const CBC_ACADEMY_ID = 'cbc';

const CBC_TOPIC_TITLES = {
  cre: 'CRE',
  english: 'English',
  'environmental-activities': 'Environmental Activities',
  kiswahili: 'Kiswahili',
  math: 'Math',
  mathematics: 'Math'
};

function normalizeId(value) {
  return String(value || '').trim();
}

function titleFromId(value = '') {
  return String(value)
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

export function getCbcGradeTitle(categoryOrId = '') {
  const id = normalizeId(typeof categoryOrId === 'string' ? categoryOrId : categoryOrId.id);
  const name = normalizeId(typeof categoryOrId === 'string' ? '' : categoryOrId.name || categoryOrId.title);

  if (/^grade-\d+$/i.test(id)) return `Grade ${id.split('-')[1]}`;
  return name || titleFromId(id) || 'CBC';
}

export function getCbcTopicTitle(topicOrId = '') {
  const id = normalizeId(typeof topicOrId === 'string' ? topicOrId : topicOrId.id);
  const mappedTitle = CBC_TOPIC_TITLES[id.toLowerCase()];

  if (mappedTitle) return mappedTitle;

  if (typeof topicOrId !== 'string') {
    const rawTitle = normalizeId(topicOrId.displayName || topicOrId.name || topicOrId.title);
    if (rawTitle) return rawTitle.split(' / ')[0];
  }

  return titleFromId(id) || 'Learning';
}

export function buildCbcTopicActivityHref({
  categoryId,
  topicId,
  learningAreaId = '',
  page = 1,
  difficulty,
  completionFilter
} = {}) {
  return buildCategoryReturnPath({
    categoryId,
    topicId,
    learningAreaId,
    page,
    difficulty,
    completionFilter
  });
}

export function isCbcActivityContext(categoryId = '') {
  return getActiveAcademy().id === CBC_ACADEMY_ID && /^grade-\d+$/i.test(normalizeId(categoryId));
}

export function getCbcLastActivityContinueState(activity = storageService.getLastCbcActivity()) {
  if (!activity?.href) return null;

  const title = getCbcTopicTitle(activity.title || activity.topicId);
  const categoryTitle = activity.categoryTitle || getCbcGradeTitle(activity.categoryId);

  return {
    href: activity.href,
    title: `Continue ${title}`,
    description: `Pick up from ${categoryTitle} ${title}`
  };
}

export function recordCbcLastActivity({
  category,
  categoryId,
  topic,
  topicId,
  learningAreaId = '',
  page = 1,
  difficulty,
  completionFilter,
  activityType = 'topic',
  href
} = {}) {
  const resolvedCategoryId = normalizeId(categoryId || category?.id || topic?.category);
  const resolvedTopicId = normalizeId(topicId || topic?.id);

  if (!isCbcActivityContext(resolvedCategoryId) || !resolvedTopicId) return null;

  return storageService.setLastCbcActivity({
    categoryId: resolvedCategoryId,
    topicId: resolvedTopicId,
    activityType,
    href: href || buildCbcTopicActivityHref({
      categoryId: resolvedCategoryId,
      topicId: resolvedTopicId,
      learningAreaId,
      page,
      difficulty,
      completionFilter
    }),
    title: getCbcTopicTitle(topic || resolvedTopicId),
    categoryTitle: getCbcGradeTitle(category || resolvedCategoryId)
  });
}
