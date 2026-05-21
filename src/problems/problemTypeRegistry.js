const defaultNormalize = (problem) => problem;
const defaultValidate = () => [];
const defaultScorer = () => null;
const defaultComponent = null;

const legacyDsaType = (label) => ({
  label,
  normalize: defaultNormalize,
  validate: defaultValidate,
  scorer: defaultScorer,
  component: defaultComponent
});

export const problemTypeRegistry = {
  'multiple-choice': {
    label: 'Multiple Choice',
    normalize: defaultNormalize,
    validate: defaultValidate,
    scorer: defaultScorer,
    component: defaultComponent
  },
  mcq: legacyDsaType('Multiple Choice'),
  learning: legacyDsaType('Learning'),
  coding: {
    label: 'Coding',
    normalize: defaultNormalize,
    validate: defaultValidate,
    scorer: defaultScorer,
    component: defaultComponent
  },
  code: {
    label: 'Code',
    normalize: defaultNormalize,
    validate: defaultValidate,
    scorer: defaultScorer,
    component: defaultComponent
  },
  optimization: legacyDsaType('Optimization'),
  trace: legacyDsaType('Trace'),
  debugging: legacyDsaType('Debugging'),
  'simple-system-design': {
    label: 'Simple System Design',
    legacyAliases: ['system-design', 'production-scenario'],
    defaultDifficulty: 'Easy',
    normalize: defaultNormalize,
    validate: defaultValidate,
    scorer: defaultScorer,
    component: defaultComponent
  },
  'complex-system-design': {
    label: 'Complex System Design',
    normalize: defaultNormalize,
    validate: defaultValidate,
    scorer: defaultScorer,
    component: defaultComponent
  }
};

export function getProblemType(type, registry = problemTypeRegistry) {
  return registry[type] || null;
}

export function getCanonicalProblemType(type, registry = problemTypeRegistry) {
  if (!type) return type;
  if (registry[type]) return type;

  const canonicalEntry = Object.entries(registry).find(([, metadata]) => (
    Array.isArray(metadata.legacyAliases) && metadata.legacyAliases.includes(type)
  ));

  return canonicalEntry ? canonicalEntry[0] : type;
}

export function getProblemTypeMetadata(type, registry = problemTypeRegistry) {
  return getProblemType(getCanonicalProblemType(type, registry), registry);
}

export function normalizeProblemTypeAlias(type, registry = problemTypeRegistry) {
  return getCanonicalProblemType(type, registry);
}

export function normalizeProblemTypeTags(tags = [], registry = problemTypeRegistry) {
  const normalizedTags = tags.map((tag) => normalizeProblemTypeAlias(tag, registry));
  return [...new Set(normalizedTags)];
}

export function isSupportedProblemType(type, registry = problemTypeRegistry) {
  return Boolean(getProblemTypeMetadata(type, registry));
}
