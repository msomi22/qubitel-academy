import { getActiveAcademy } from '../config/detectAcademy.ts';
import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import {
  createCbcGradesRegistrySource
} from '../learning/academies/cbc/cbcGrades.registry.ts';
import { getAttribute } from '../learning/core/index.ts';
import { getBreadcrumbs } from '../learning/navigation/index.ts';
import {
  createLearningNodeRegistry,
  getNodeById,
  isLearningNodeReady
} from '../learning/registry/index.ts';
import { createNodeRoutePath } from '../learning/routing/index.ts';
import { buildCategoryReturnPath } from './categoryNavigationService.js';
import { storageService } from './storageService.js';

const CBC_ACADEMY_ID = 'cbc';
const CONTINUE_KINDS = new Set(['theme', 'learningArea', 'grade']);
const ALLOWED_THEME_TABS = new Set(['learningMaterial', 'practice', 'assessment']);
const CBC_ROUTE_OPTIONS = {
  includeRoot: false,
  includeAcademyRoot: false
};
const cbcAcademyNode = getAcademyRootNodeById('cbc-academy');
const cbcGradesSource = createCbcGradesRegistrySource();
const cbcRegistry = createLearningNodeRegistry({
  nodes: [cbcAcademyNode, ...cbcGradesSource.nodes].filter(Boolean)
});

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

function getCbcBreadcrumbs(registry, node) {
  const breadcrumbs = getBreadcrumbs(registry, node);
  return breadcrumbs.some((item) => item.id === 'cbc-academy') ? breadcrumbs : [];
}

export function resolveCbcContinueCandidate(registry, node) {
  const breadcrumbs = getCbcBreadcrumbs(registry, node);
  return [...breadcrumbs].reverse().find((item) => (
    CONTINUE_KINDS.has(item.kind) && isLearningNodeReady(registry, item)
  )) || null;
}

function getAncestryNode(breadcrumbs, kind) {
  return breadcrumbs.find((node) => node.kind === kind) || null;
}

function getLearningAreaTitle(node) {
  const compact = normalizeId(
    getAttribute(node, 'learningAreaName')
    || node?.label
    || getAttribute(node, 'learningAreaId')
  )
    .replace(/mathematical/i, 'Math')
    .replace(/\s+Activities$/i, '')
    .trim();

  return compact || 'Learning';
}

function normalizeThemeTab(value) {
  const tab = normalizeId(value);
  return ALLOWED_THEME_TABS.has(tab) ? tab : '';
}

export function recordCbcLearningNodeVisit({ registry, node, tab } = {}) {
  if (getActiveAcademy().id !== CBC_ACADEMY_ID || !registry || !node) return null;

  const candidate = resolveCbcContinueCandidate(registry, node);
  if (!candidate) return null;

  return storageService.setLastCbcActivity({
    nodeId: candidate.id,
    nodeKind: candidate.kind,
    tab: candidate.kind === 'theme' ? normalizeThemeTab(tab) : ''
  });
}

export function getCbcLastActivityContinueState(
  registry = cbcRegistry,
  activity = storageService.getLastCbcActivity()
) {
  if (!registry || activity?.academy !== CBC_ACADEMY_ID || !activity.nodeId) return null;

  const node = getNodeById(registry, activity.nodeId);
  if (!node || !CONTINUE_KINDS.has(node.kind) || !isLearningNodeReady(registry, node)) return null;

  const breadcrumbs = getCbcBreadcrumbs(registry, node);
  if (!breadcrumbs.length) return null;

  const grade = getAncestryNode(breadcrumbs, 'grade');
  const learningArea = getAncestryNode(breadcrumbs, 'learningArea');
  const path = createNodeRoutePath(registry, node, CBC_ROUTE_OPTIONS);
  if (!path || !grade) return null;

  const tab = node.kind === 'theme' ? normalizeThemeTab(activity.tab) : '';
  const href = tab ? `${path}?${new URLSearchParams({ tab }).toString()}` : path;
  const gradeTitle = grade.label || getCbcGradeTitle(grade.id);

  if (!learningArea) {
    return {
      href,
      title: `Continue ${gradeTitle}`,
      description: `Pick up from ${gradeTitle}`
    };
  }

  const learningAreaTitle = getLearningAreaTitle(learningArea);
  return {
    href,
    title: `Continue ${learningAreaTitle}`,
    description: `Pick up from ${gradeTitle} ${learningAreaTitle}`
  };
}

export function recordCbcLastActivity() {
  return null;
}