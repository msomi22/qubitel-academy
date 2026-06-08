import type { LearningNodeOrId, LearningNodeRegistry } from '../registry/index.ts';
import type { LearningNodeRouteIndex, LearningNodeRouteMatch, LearningNodeRoutingOptions } from './routing.types.ts';
import {
  createNodeRoutePath,
  createRouteIndex,
  getNodeRouteEntry,
  getRouteNode,
  resolveNodeFromRoutePath
} from './routing.utils.ts';

export function getRoutingPath(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId,
  options: LearningNodeRoutingOptions = {}
): string | undefined {
  return createNodeRoutePath(registry, nodeOrId, options);
}

export function getRoutingMatch(
  registry: LearningNodeRegistry,
  path: string,
  options: LearningNodeRoutingOptions = {}
): LearningNodeRouteMatch {
  return resolveNodeFromRoutePath(registry, path, options);
}

export function createRoutingIndex(
  registry: LearningNodeRegistry,
  options: LearningNodeRoutingOptions = {}
): LearningNodeRouteIndex {
  return createRouteIndex(registry, options);
}

export {
  createNodeRoutePath,
  createRouteIndex,
  getNodeRouteEntry,
  getRouteNode,
  resolveNodeFromRoutePath
};
