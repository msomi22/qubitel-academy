import type { LearningNode } from '../core/index.ts';
import { getAttribute } from '../core/index.ts';
import type { LearningNodeOrId, LearningNodeRegistry } from '../registry/index.ts';
import { getNodeById } from '../registry/index.ts';
import { getBreadcrumbs } from '../navigation/index.ts';
import { LEARNING_NODE_ROUTING_DEFAULTS } from './routing.constants.ts';
import type {
  LearningNodeRouteEntry,
  LearningNodeRouteIndex,
  LearningNodeRouteMatch,
  LearningNodeRoutingOptions
} from './routing.types.ts';

function resolveNode(registry: LearningNodeRegistry, nodeOrId: LearningNodeOrId): LearningNode | undefined {
  return typeof nodeOrId === 'string' ? getNodeById(registry, nodeOrId) : getNodeById(registry, nodeOrId.id);
}

function getIncludeRoot(options: LearningNodeRoutingOptions): boolean {
  return options.includeRoot ?? LEARNING_NODE_ROUTING_DEFAULTS.includeRoot;
}

function cleanPathParts(path: string): string[] {
  return String(path || '')
    .trim()
    .replaceAll('\\', '/')
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
}

export function normalizeRoutePath(path: string): string {
  const parts = cleanPathParts(path);
  return parts.length > 0 ? `/${parts.join('/')}` : '/';
}

export function splitRoutePath(path: string): string[] {
  return cleanPathParts(normalizeRoutePath(path)).map((segment) => decodeURIComponent(segment));
}

function slugifySegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/u)
    .filter(Boolean)
    .join('-');
}

export function createRouteSegment(node: LearningNode, options: LearningNodeRoutingOptions = {}): string {
  const segmentAttributeKey = options.segmentAttributeKey ?? LEARNING_NODE_ROUTING_DEFAULTS.segmentAttributeKey;
  const configuredSegment = segmentAttributeKey ? getAttribute<unknown>(node, segmentAttributeKey) : undefined;
  const rawSegment = typeof configuredSegment === 'string' && configuredSegment.trim().length > 0
    ? configuredSegment
    : node.id;

  return encodeURIComponent(slugifySegment(rawSegment));
}

export function createNodeRoutePath(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeRoutingOptions = {}
): string | undefined {
  const node = resolveNode(registry, nodeOrId);
  if (!node) return undefined;

  const baseSegments = splitRoutePath(options.basePath ?? LEARNING_NODE_ROUTING_DEFAULTS.basePath);
  const breadcrumbs = getBreadcrumbs(registry, node.id, { includeCurrentInBreadcrumbs: true });
  const routeNodes = getIncludeRoot(options) ? breadcrumbs : breadcrumbs.slice(1);
  const routeSegments = routeNodes.map((routeNode) => createRouteSegment(routeNode, options));

  return normalizeRoutePath([...baseSegments, ...routeSegments].join('/'));
}

function addDuplicatePath(duplicatePaths: Map<string, string[]>, path: string, nodeId: string): void {
  const nodeIds = duplicatePaths.get(path) || [];
  if (!nodeIds.includes(nodeId)) {
    duplicatePaths.set(path, [...nodeIds, nodeId].sort());
  }
}

export function createRouteIndex(
  registry: LearningNodeRegistry,
  options: LearningNodeRoutingOptions = {}
): LearningNodeRouteIndex {
  const entriesByNodeId = new Map<string, LearningNodeRouteEntry>();
  const nodeIdsByPath = new Map<string, string>();
  const duplicatePaths = new Map<string, string[]>();

  [...registry.nodesById.values()]
    .sort((a, b) => a.id.localeCompare(b.id))
    .forEach((node) => {
      const path = createNodeRoutePath(registry, node.id, options);
      if (!path) return;

      const entry = {
        nodeId: node.id,
        path,
        segments: splitRoutePath(path)
      };

      entriesByNodeId.set(node.id, entry);

      const existingNodeId = nodeIdsByPath.get(path);
      if (existingNodeId && existingNodeId !== node.id) {
        addDuplicatePath(duplicatePaths, path, existingNodeId);
        addDuplicatePath(duplicatePaths, path, node.id);
        return;
      }

      nodeIdsByPath.set(path, node.id);
    });

  return {
    entriesByNodeId,
    nodeIdsByPath,
    duplicatePaths
  };
}

export function getNodeRouteEntry(
  routeIndex: LearningNodeRouteIndex,
  nodeOrId: LearningNodeOrId
): LearningNodeRouteEntry | undefined {
  const nodeId = typeof nodeOrId === 'string' ? nodeOrId : nodeOrId.id;
  return routeIndex.entriesByNodeId.get(nodeId);
}

export function getRouteNode(
  registry: LearningNodeRegistry,
  routeIndex: LearningNodeRouteIndex,
  path: string
): LearningNode | undefined {
  const nodeId = routeIndex.nodeIdsByPath.get(normalizeRoutePath(path));
  return nodeId ? getNodeById(registry, nodeId) : undefined;
}

export function resolveNodeFromRoutePath(
  registry: LearningNodeRegistry,
  path: string,
  options: LearningNodeRoutingOptions = {}
): LearningNodeRouteMatch {
  const routeIndex = createRouteIndex(registry, options);
  const nodeId = routeIndex.nodeIdsByPath.get(normalizeRoutePath(path));

  if (!nodeId) return {};

  return {
    node: getNodeById(registry, nodeId),
    entry: routeIndex.entriesByNodeId.get(nodeId)
  };
}
