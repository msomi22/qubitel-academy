import { createLearningNode } from '../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../core/learningNode.constants.ts';

import type { LearningNode } from '../../../core/index.ts';

type GradeNodeConfig = {
  id: string;
  label: string;
  summary: string;
  routeSegment: string;
  icon?: string;
  tone?: string;
  features?: Array<{ kind: string }>;
  actions?: Array<{ intent: string }>;
};

type LearningAreaNodeConfig = {
  id: string;
  label: string;
  summary: string;
  parentId: string;
  routeSegment: string;
  learningAreaId: string;
  learningAreaName: string;
  gradeId: string;
  gradeName: string;
  icon: string;
  tone?: string;
  features?: Array<{ kind: string }>;
  actions?: Array<{ intent: string }>;
};

export function createGradeNode(
  config: GradeNodeConfig,
  cbcAcademyNodeId: string
): LearningNode {
  return createLearningNode({
    id: config.id,
    kind: LEARNING_NODE_KINDS.grade,
    label: config.label,
    summary: config.summary,
    parentId: cbcAcademyNodeId,
    attributes: [
      { key: 'routeSegment', value: config.routeSegment },
      { key: 'gradeId', value: config.id },
      { key: 'gradeName', value: config.label }
    ],
    features: config.features || [{ kind: 'guidedContent' }],
    actions: config.actions || [],
    appearances: [
      { key: 'icon', value: config.icon || '🎒' },
      { key: 'tone', value: config.tone || 'childFriendly' }
    ],
    version: 1
  });
}

export function createLearningAreaNode(config: LearningAreaNodeConfig): LearningNode {
  return createLearningNode({
    id: config.id,
    kind: LEARNING_NODE_KINDS.learningArea,
    label: config.label,
    summary: config.summary,
    parentId: config.parentId,
    attributes: [
      { key: 'routeSegment', value: config.routeSegment },
      { key: 'learningAreaId', value: config.learningAreaId },
      { key: 'learningAreaName', value: config.learningAreaName },
      { key: 'gradeId', value: config.gradeId },
      { key: 'gradeName', value: config.gradeName }
    ],
    features: config.features || [{ kind: 'guidedContent' }],
    actions: config.actions || [],
    appearances: [
      { key: 'icon', value: config.icon },
      { key: 'tone', value: config.tone || 'childFriendly' }
    ],
    version: 1
  });
}