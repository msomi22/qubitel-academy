import type { LearningNode } from '../core/index.ts';
import { getChildIds, isLearningNode } from '../core/index.ts';
import {
  createLearningNodeRegistry,
  getDuplicateNodeIds,
  getRootNodes,
  type LearningNodeRegistry
} from '../registry/index.ts';
import { LEARNING_NODE_VALIDATION_CODES, LEARNING_NODE_VALIDATION_SEVERITIES } from './validation.constants.ts';
import type {
  CreateValidationIssueInput,
  LearningNodeValidationIssue,
  LearningNodeValidationOptions
} from './validation.types.ts';

export function createValidationIssue(input: CreateValidationIssueInput): LearningNodeValidationIssue {
  return {
    severity: input.severity || LEARNING_NODE_VALIDATION_SEVERITIES.error,
    code: input.code,
    message: input.message,
    ...(input.nodeId ? { nodeId: input.nodeId } : {}),
    ...(input.relatedNodeId ? { relatedNodeId: input.relatedNodeId } : {})
  };
}

export function sortValidationIssues(issues: LearningNodeValidationIssue[]): LearningNodeValidationIssue[] {
  return [...issues].sort((a, b) => {
    const codeCompare = a.code.localeCompare(b.code);
    if (codeCompare !== 0) return codeCompare;

    const nodeCompare = (a.nodeId || '').localeCompare(b.nodeId || '');
    if (nodeCompare !== 0) return nodeCompare;

    const relatedCompare = (a.relatedNodeId || '').localeCompare(b.relatedNodeId || '');
    if (relatedCompare !== 0) return relatedCompare;

    return a.message.localeCompare(b.message);
  });
}

function getNodeIdForInvalidNode(value: unknown, index: number): string {
  if (value && typeof value === 'object' && 'id' in value && typeof value.id === 'string') {
    return value.id;
  }

  return `index:${index}`;
}

export function validateNodeShapes(values: unknown[]): {
  validNodes: LearningNode[];
  issues: LearningNodeValidationIssue[];
} {
  const validNodes: LearningNode[] = [];
  const issues: LearningNodeValidationIssue[] = [];

  values.forEach((value, index) => {
    if (isLearningNode(value)) {
      validNodes.push(value);
      return;
    }

    issues.push(createValidationIssue({
      code: LEARNING_NODE_VALIDATION_CODES.invalidNode,
      nodeId: getNodeIdForInvalidNode(value, index),
      message: `Invalid LearningNode shape at index ${index}.`
    }));
  });

  return { validNodes, issues };
}

export function validateDuplicateNodeIds(nodes: LearningNode[]): LearningNodeValidationIssue[] {
  return getDuplicateNodeIds(nodes).map((nodeId) => createValidationIssue({
    code: LEARNING_NODE_VALIDATION_CODES.duplicateNodeId,
    nodeId,
    message: `Duplicate LearningNode id: ${nodeId}.`
  }));
}

export function validateParentChildReferences(nodes: LearningNode[], registry: LearningNodeRegistry): LearningNodeValidationIssue[] {
  const issues: LearningNodeValidationIssue[] = [];
  const nodeIds = new Set(nodes.map((node) => node.id));

  nodes.forEach((node) => {
    if (node.parentId) {
      if (node.parentId === node.id) {
        issues.push(createValidationIssue({
          code: LEARNING_NODE_VALIDATION_CODES.selfParent,
          nodeId: node.id,
          relatedNodeId: node.parentId,
          message: `LearningNode ${node.id} cannot parent itself.`
        }));
      }

      if (!nodeIds.has(node.parentId)) {
        issues.push(createValidationIssue({
          code: LEARNING_NODE_VALIDATION_CODES.missingParent,
          nodeId: node.id,
          relatedNodeId: node.parentId,
          message: `LearningNode ${node.id} references missing parent ${node.parentId}.`
        }));
      } else {
        const parent = registry.nodesById.get(node.parentId);
        const declaredSiblingIds = parent ? getChildIds(parent) : [];
        if (parent && declaredSiblingIds.length > 0 && !declaredSiblingIds.includes(node.id)) {
          issues.push(createValidationIssue({
            code: LEARNING_NODE_VALIDATION_CODES.parentChildMismatch,
            nodeId: node.id,
            relatedNodeId: node.parentId,
            message: `LearningNode ${node.id} references parent ${node.parentId}, but the parent does not list it as a child.`
          }));
        }
      }
    }

    getChildIds(node).forEach((childId) => {
      if (childId === node.id) {
        issues.push(createValidationIssue({
          code: LEARNING_NODE_VALIDATION_CODES.selfChild,
          nodeId: node.id,
          relatedNodeId: childId,
          message: `LearningNode ${node.id} cannot list itself as a child.`
        }));
      }

      if (!nodeIds.has(childId)) {
        issues.push(createValidationIssue({
          code: LEARNING_NODE_VALIDATION_CODES.missingChild,
          nodeId: node.id,
          relatedNodeId: childId,
          message: `LearningNode ${node.id} references missing child ${childId}.`
        }));
        return;
      }

      const child = registry.nodesById.get(childId);
      if (child?.parentId && child.parentId !== node.id) {
        issues.push(createValidationIssue({
          code: LEARNING_NODE_VALIDATION_CODES.parentChildMismatch,
          nodeId: node.id,
          relatedNodeId: childId,
          message: `LearningNode ${node.id} lists child ${childId}, but the child references parent ${child.parentId}.`
        }));
      }
    });
  });

  return issues;
}

export function validateCycles(registry: LearningNodeRegistry): LearningNodeValidationIssue[] {
  const issues: LearningNodeValidationIssue[] = [];
  const visitedIds = new Set<string>();
  const completedIds = new Set<string>();
  const reportedCycleKeys = new Set<string>();

  function visit(nodeId: string, path: string[]): void {
    if (completedIds.has(nodeId)) return;

    const pathIndex = path.indexOf(nodeId);
    if (pathIndex >= 0) {
      const cyclePath = [...path.slice(pathIndex), nodeId];
      const cycleKey = cyclePath.join('>');
      if (!reportedCycleKeys.has(cycleKey)) {
        reportedCycleKeys.add(cycleKey);
        issues.push(createValidationIssue({
          code: LEARNING_NODE_VALIDATION_CODES.cycleDetected,
          nodeId,
          message: `LearningNode cycle detected: ${cyclePath.join(' -> ')}.`
        }));
      }
      return;
    }

    if (visitedIds.has(nodeId)) return;

    visitedIds.add(nodeId);
    const childIds = registry.childIdsByParentId.get(nodeId) || [];
    childIds.forEach((childId) => {
      if (registry.nodesById.has(childId)) {
        visit(childId, [...path, nodeId]);
      }
    });
    completedIds.add(nodeId);
  }

  [...registry.nodesById.keys()].sort().forEach((nodeId) => visit(nodeId, []));

  return issues;
}

export function validateRoots(registry: LearningNodeRegistry, options: LearningNodeValidationOptions = {}): LearningNodeValidationIssue[] {
  const issues: LearningNodeValidationIssue[] = [];
  const roots = getRootNodes(registry);

  if (options.requireSingleRoot && roots.length !== 1) {
    issues.push(createValidationIssue({
      code: LEARNING_NODE_VALIDATION_CODES.multipleRoots,
      message: `Expected exactly one root LearningNode, found ${roots.length}.`
    }));
  }

  if (options.allowOrphans === false && roots.length > 1) {
    roots.slice(1).forEach((root) => {
      issues.push(createValidationIssue({
        code: LEARNING_NODE_VALIDATION_CODES.orphanNode,
        nodeId: root.id,
        message: `LearningNode ${root.id} is an orphan root.`
      }));
    });
  }

  return issues;
}

export function validateRules(nodes: LearningNode[], options: LearningNodeValidationOptions = {}): LearningNodeValidationIssue[] {
  const registry = createLearningNodeRegistry({ nodes });

  return sortValidationIssues([
    ...validateDuplicateNodeIds(nodes),
    ...validateParentChildReferences(nodes, registry),
    ...validateCycles(registry),
    ...validateRoots(registry, options)
  ]);
}
