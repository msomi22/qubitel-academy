import type { LearningNode } from '../core/index.ts';
import type { LearningNodeOrId, LearningNodeRegistry } from '../registry/index.ts';
import { getChildren, getNodeById, getParent, getRootNodes } from '../registry/index.ts';
import { LEARNING_NODE_NAVIGATION_DEFAULTS } from './navigation.constants.ts';
import type { LearningNodeNavigationOptions } from './navigation.types.ts';

function resolveNodeId(nodeOrId: LearningNodeOrId): string {
  return typeof nodeOrId === 'string' ? nodeOrId : nodeOrId.id;
}

function isSkipped(node: LearningNode, options: LearningNodeNavigationOptions = {}): boolean {
  return Boolean(options.skipKinds?.includes(node.kind));
}

function filterSkipped(nodes: LearningNode[], options: LearningNodeNavigationOptions = {}): LearningNode[] {
  return nodes.filter((node) => !isSkipped(node, options));
}

export function resolveNavigationNode(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId
): LearningNode | undefined {
  return typeof nodeOrId === 'string' ? getNodeById(registry, nodeOrId) : getNodeById(registry, nodeOrId.id);
}

export function getBreadcrumbs(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode[] {
  const current = resolveNavigationNode(registry, nodeOrId);
  if (!current) return [];

  const includeCurrent = options.includeCurrentInBreadcrumbs
    ?? LEARNING_NODE_NAVIGATION_DEFAULTS.includeCurrentInBreadcrumbs;
  const breadcrumbs: LearningNode[] = [];
  const visitedIds = new Set<string>();
  let activeNode: LearningNode | undefined = current;

  while (activeNode && !visitedIds.has(activeNode.id)) {
    visitedIds.add(activeNode.id);
    breadcrumbs.unshift(activeNode);
    activeNode = getParent(registry, activeNode.id);
  }

  const resolvedBreadcrumbs = includeCurrent ? breadcrumbs : breadcrumbs.filter((node) => node.id !== current.id);
  return filterSkipped(resolvedBreadcrumbs, options);
}

export function getNavigationChildren(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode[] {
  const current = resolveNavigationNode(registry, nodeOrId);
  if (!current) return [];

  return filterSkipped(getChildren(registry, current.id), options);
}

export function getSiblings(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode[] {
  const current = resolveNavigationNode(registry, nodeOrId);
  if (!current) return [];

  const parent = getParent(registry, current.id);
  if (!parent) return [current].filter((node) => !isSkipped(node, options));

  return filterSkipped(getChildren(registry, parent.id), options);
}

export function getPreviousSibling(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode | undefined {
  const current = resolveNavigationNode(registry, nodeOrId);
  if (!current) return undefined;

  const siblings = getSiblings(registry, current.id, options);
  const currentIndex = siblings.findIndex((sibling) => sibling.id === current.id);
  return currentIndex > 0 ? siblings[currentIndex - 1] : undefined;
}

export function getNextSibling(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode | undefined {
  const current = resolveNavigationNode(registry, nodeOrId);
  if (!current) return undefined;

  const siblings = getSiblings(registry, current.id, options);
  const currentIndex = siblings.findIndex((sibling) => sibling.id === current.id);
  return currentIndex >= 0 && currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : undefined;
}

export function getFirstChild(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode | undefined {
  return getNavigationChildren(registry, nodeOrId, options)[0];
}

export function getLastChild(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode | undefined {
  const children = getNavigationChildren(registry, nodeOrId, options);
  return children[children.length - 1];
}

export function flattenDepthFirst(
  registry: LearningNodeRegistry,
  options: LearningNodeNavigationOptions = {}
): LearningNode[] {
  const flattenedNodes: LearningNode[] = [];
  const visitedIds = new Set<string>();

  function visit(node: LearningNode): void {
    if (visitedIds.has(node.id)) return;
    visitedIds.add(node.id);

    if (!isSkipped(node, options)) {
      flattenedNodes.push(node);
    }

    getChildren(registry, node.id).forEach(visit);
  }

  getRootNodes(registry).forEach(visit);

  [...registry.nodesById.values()]
    .sort((a, b) => a.id.localeCompare(b.id))
    .forEach(visit);

  return flattenedNodes;
}

export function getNextNodeDepthFirst(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode | undefined {
  const current = resolveNavigationNode(registry, nodeOrId);
  if (!current) return undefined;

  const flattenedNodes = flattenDepthFirst(registry, options);
  const currentIndex = flattenedNodes.findIndex((node) => node.id === current.id);
  return currentIndex >= 0 && currentIndex < flattenedNodes.length - 1
    ? flattenedNodes[currentIndex + 1]
    : undefined;
}

export function getPreviousNodeDepthFirst(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode | undefined {
  const current = resolveNavigationNode(registry, nodeOrId);
  if (!current) return undefined;

  const flattenedNodes = flattenDepthFirst(registry, options);
  const currentIndex = flattenedNodes.findIndex((node) => node.id === current.id);
  return currentIndex > 0 ? flattenedNodes[currentIndex - 1] : undefined;
}

export function getNearestNavigableAncestor(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeNavigationOptions = {}
): LearningNode | undefined {
  let current = resolveNavigationNode(registry, nodeOrId);
  const visitedIds = new Set<string>();

  while (current && !visitedIds.has(current.id)) {
    visitedIds.add(current.id);
    const parent = getParent(registry, current.id);
    if (!parent) return undefined;
    if (!isSkipped(parent, options)) return parent;
    current = parent;
  }

  return undefined;
}
