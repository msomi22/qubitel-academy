import type { LearningNode } from '../core/index.ts';
import type { LearningNodeOrId, LearningNodeRegistry } from './registry.types.ts';
import { getChildren, getNodeById } from './registry.utils.ts';

type RenderableNodeFields = LearningNode & {
  body?: unknown;
  instructions?: unknown;
  items?: unknown;
  questions?: unknown;
  sections?: unknown;
};

function isNonBlankText(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNonEmptyCollection(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0;
}

function hasRenderablePayload(node: LearningNode): boolean {
  const renderableNode = node as RenderableNodeFields;
  const content = node.content;

  if (isNonBlankText(content)) return true;

  if (content && typeof content === 'object' && !Array.isArray(content)) {
    const contentRecord = content as Record<string, unknown>;

    if (contentRecord.type === 'book') {
      return isNonEmptyCollection(contentRecord.pages);
    }

    if (contentRecord.type === 'practiceCardList') {
      return isNonEmptyCollection(contentRecord.cards);
    }

    if (isNonEmptyCollection(contentRecord.exams)) return true;
  }

  return (
    isNonBlankText(renderableNode.body) ||
    isNonBlankText(renderableNode.instructions) ||
    isNonEmptyCollection(renderableNode.questions) ||
    isNonEmptyCollection(renderableNode.items) ||
    isNonEmptyCollection(renderableNode.sections)
  );
}

export function isLearningNodeReady(
  registry: LearningNodeRegistry,
  nodeOrId: LearningNodeOrId
): boolean {
  const node = typeof nodeOrId === 'string'
    ? getNodeById(registry, nodeOrId)
    : getNodeById(registry, nodeOrId.id);
  const visitedIds = new Set<string>();

  function visit(currentNode: LearningNode | undefined): boolean {
    if (!currentNode || visitedIds.has(currentNode.id)) return false;

    visitedIds.add(currentNode.id);
    if (hasRenderablePayload(currentNode)) return true;

    return getChildren(registry, currentNode.id).some(visit);
  }

  return visit(node);
}
