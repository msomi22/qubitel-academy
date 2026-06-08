import type {
  LearningNode,
  NodeAction,
  NodeAppearance,
  NodeAttribute,
  NodeFeature
} from './learningNode.types.ts';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNodeAttribute(value: unknown): value is NodeAttribute {
  return isRecord(value) && isString(value.key) && 'value' in value;
}

function isNodeFeature(value: unknown): value is NodeFeature {
  return isRecord(value) && isString(value.kind);
}

function isNodeAction(value: unknown): value is NodeAction {
  return isRecord(value) && isString(value.intent);
}

function isNodeAppearance(value: unknown): value is NodeAppearance {
  return isRecord(value) && isString(value.key) && 'value' in value;
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === 'string';
}

function isOptionalStringArray(value: unknown): value is string[] | undefined {
  return value === undefined || (Array.isArray(value) && value.every((item) => typeof item === 'string'));
}

function isOptionalNumber(value: unknown): value is number | undefined {
  return value === undefined || typeof value === 'number';
}

function isOptionalArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] | undefined {
  return value === undefined || (Array.isArray(value) && value.every(guard));
}

export function isLearningNode(value: unknown): value is LearningNode {
  if (!isRecord(value)) return false;

  return isString(value.id)
    && isString(value.kind)
    && isString(value.label)
    && isOptionalString(value.summary)
    && isOptionalString(value.parentId)
    && isOptionalStringArray(value.childIds)
    && isOptionalArrayOf(value.attributes, isNodeAttribute)
    && isOptionalArrayOf(value.features, isNodeFeature)
    && isOptionalArrayOf(value.actions, isNodeAction)
    && isOptionalArrayOf(value.appearances, isNodeAppearance)
    && isOptionalNumber(value.version);
}

export function getChildIds(node: LearningNode): string[] {
  return [...(node.childIds || [])];
}

export function hasChildren(node: LearningNode): boolean {
  return getChildIds(node).length > 0;
}

export function getAttribute<TValue = unknown>(node: LearningNode, key: string): TValue | undefined {
  return node.attributes?.find((attribute) => attribute.key === key)?.value as TValue | undefined;
}

export function getAppearance<TValue = unknown>(node: LearningNode, key: string): TValue | undefined {
  return node.appearances?.find((appearance) => appearance.key === key)?.value as TValue | undefined;
}

export function hasFeature(node: LearningNode, kind: string): boolean {
  return Boolean(node.features?.some((feature) => feature.kind === kind));
}

export function hasAction(node: LearningNode, intent: string): boolean {
  return Boolean(node.actions?.some((action) => action.intent === intent));
}

export function normalizeLearningNode(node: LearningNode): LearningNode {
  return {
    ...node,
    childIds: getChildIds(node),
    attributes: [...(node.attributes || [])],
    features: [...(node.features || [])],
    actions: [...(node.actions || [])],
    appearances: [...(node.appearances || [])],
    version: node.version ?? 1
  };
}
