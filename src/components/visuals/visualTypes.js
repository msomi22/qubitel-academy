export const VISUAL_TYPES = Object.freeze({
  GRID: 'grid',
  MATRIX: 'matrix',
  BOARD: 'board',
  ARRAY: 'array',
  TIMELINE: 'timeline',
  TABLE: 'table',
  CARDS: 'cards',
  GRAPH: 'graph',
  TREE: 'tree',
  HEAP: 'heap',
  STATE: 'state',
  CONTAINER_WATER: 'container-water'
});

export const GRID_ALIASES = new Set([
  VISUAL_TYPES.GRID,
  VISUAL_TYPES.MATRIX,
  VISUAL_TYPES.BOARD
]);

export const GENERIC_VISUAL_TYPES = new Set([
  VISUAL_TYPES.ARRAY,
  VISUAL_TYPES.TIMELINE,
  VISUAL_TYPES.TABLE,
  VISUAL_TYPES.CARDS,
  VISUAL_TYPES.GRAPH,
  VISUAL_TYPES.TREE,
  VISUAL_TYPES.HEAP,
  VISUAL_TYPES.STATE,
  VISUAL_TYPES.CONTAINER_WATER
]);

export function normalizeVisualType(type) {
  return String(type || '').trim().toLowerCase();
}

export function isGridVisual(type) {
  return GRID_ALIASES.has(normalizeVisualType(type));
}

export function isGenericVisual(type) {
  return GENERIC_VISUAL_TYPES.has(normalizeVisualType(type));
}

export function formatVisualValue(value) {
  if (value === Infinity || value === 'Infinity') return '∞';
  if (value === null || value === undefined) return '';
  return String(value);
}

export function getVisualFrames(diagram) {
  return Array.isArray(diagram?.frames) ? diagram.frames : [];
}

export function getSemanticRoleClass(role, prefix = 'config-visual') {
  return `${prefix}-role-${String(role || 'neutral').trim().toLowerCase()}`;
}
