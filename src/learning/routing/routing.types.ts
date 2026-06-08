import type { LearningNode } from '../core/index.ts';

export type LearningNodeRoutingOptions = {
  basePath?: string;
  includeRoot?: boolean;
  segmentAttributeKey?: string;
};

export type LearningNodeRouteEntry = {
  nodeId: string;
  path: string;
  segments: string[];
};

export type LearningNodeRouteIndex = {
  entriesByNodeId: Map<string, LearningNodeRouteEntry>;
  nodeIdsByPath: Map<string, string>;
  duplicatePaths: Map<string, string[]>;
};

export type LearningNodeRouteMatch = {
  node?: LearningNode;
  entry?: LearningNodeRouteEntry;
};
