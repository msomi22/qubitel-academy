export const LEARNING_NODE_NAVIGATION_DIRECTIONS = {
  previous: 'previous',
  next: 'next',
  parent: 'parent',
  child: 'child'
} as const;

export const LEARNING_NODE_NAVIGATION_DEFAULTS = {
  includeCurrentInBreadcrumbs: true,
  skipKinds: ['platform']
} as const;
