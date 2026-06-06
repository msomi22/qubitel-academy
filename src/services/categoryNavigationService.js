import { ALL_FILTER } from './topicFilterService.js';

export const DEFAULT_COMPLETION_FILTER = 'all';

export function categoryPath(categoryId) {
  if (categoryId === 'dsa') return '/dsa';
  if (categoryId === 'system') return '/system-design';
  return categoryId ? `/category/${categoryId}` : '/';
}

export function parseCategoryPage(value) {
  const page = Number.parseInt(value, 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function readCategorySearchState(searchParams = new URLSearchParams()) {
  return {
    topicId: searchParams.get('topic') || '',
    learningAreaId: searchParams.get('area') || searchParams.get('strand') || '',
    page: parseCategoryPage(searchParams.get('page')),
    difficulty: searchParams.get('difficulty') || ALL_FILTER,
    completionFilter: searchParams.get('completion') || DEFAULT_COMPLETION_FILTER
  };
}

export function buildCategorySearchParams({
  topicId,
  learningAreaId,
  page,
  difficulty = ALL_FILTER,
  completionFilter = DEFAULT_COMPLETION_FILTER,
  questionId
} = {}) {
  const params = new URLSearchParams();

  if (topicId) params.set('topic', topicId);
  if (learningAreaId) params.set('area', learningAreaId);
  if (page) params.set('page', String(parseCategoryPage(page)));
  if (difficulty && difficulty !== ALL_FILTER) params.set('difficulty', difficulty);
  if (completionFilter && completionFilter !== DEFAULT_COMPLETION_FILTER) {
    params.set('completion', completionFilter);
  }
  if (questionId) params.set('question', questionId);

  return params;
}

export function buildCategoryReturnPath(returnContext = {}) {
  const basePath = categoryPath(returnContext.categoryId);
  const query = buildCategorySearchParams(returnContext).toString();

  return query ? `${basePath}?${query}` : basePath;
}
