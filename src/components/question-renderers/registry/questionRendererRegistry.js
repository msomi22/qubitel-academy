import CbcGradeOneQuestionRenderer from '../cbc/CbcGradeOneQuestionRenderer.jsx';
import DefaultQuestionRenderer from '../default/DefaultQuestionRenderer.jsx';

export const DEFAULT_RENDERER_KEY = 'default';

const rendererRegistry = {
  cbc: {
    'grade-1': {
      'visual-mcq': CbcGradeOneQuestionRenderer
    }
  }
};

function lookup(registry, keys = []) {
  let cursor = registry;

  for (const key of keys) {
    if (!key || !cursor?.[key]) return null;
    cursor = cursor[key];
  }

  return cursor || null;
}

export function getQuestionRenderer({
  academyId = DEFAULT_RENDERER_KEY,
  categoryId = '',
  topicId = '',
  questionType = '',
  interactionType = ''
} = {}) {
  const keys = [interactionType, questionType, DEFAULT_RENDERER_KEY].filter(Boolean);

  for (const key of keys) {
    const topicRenderer = lookup(rendererRegistry, [academyId, categoryId, topicId, key]);
    if (topicRenderer) return topicRenderer;
  }

  for (const key of keys) {
    const categoryRenderer = lookup(rendererRegistry, [academyId, categoryId, key]);
    if (categoryRenderer) return categoryRenderer;
  }

  for (const key of keys) {
    const academyRenderer = lookup(rendererRegistry, [academyId, key]);
    if (academyRenderer) return academyRenderer;
  }

  return DefaultQuestionRenderer;
}

export function hasRendererOverride(context = {}) {
  return getQuestionRenderer(context) !== DefaultQuestionRenderer;
}
