import { DEFAULT_LEARNING_NODE_VERSION, LEARNING_NODE_KINDS } from './learningNode.constants.ts';
import type {
  ContainerNodeKind,
  ContentNodeKind,
  LearningNode,
  LearningNodeInput
} from './learningNode.types.ts';
import { normalizeLearningNode } from './learningNode.utils.ts';

export function createLearningNode(input: LearningNodeInput): LearningNode {
  return normalizeLearningNode({
    ...input,
    version: input.version ?? DEFAULT_LEARNING_NODE_VERSION
  });
}

export function createPlatformNode(input: Omit<LearningNodeInput, 'kind'>): LearningNode {
  return createLearningNode({
    ...input,
    kind: LEARNING_NODE_KINDS.platform
  });
}

export function createAcademyNode(input: Omit<LearningNodeInput, 'kind'>): LearningNode {
  return createLearningNode({
    ...input,
    kind: LEARNING_NODE_KINDS.academy
  });
}

export function createContainerNode(input: Omit<LearningNodeInput, 'kind'> & { kind: ContainerNodeKind | string }): LearningNode {
  return createLearningNode(input);
}

export function createContentNode(input: Omit<LearningNodeInput, 'kind'> & { kind: ContentNodeKind | string }): LearningNode {
  return createLearningNode(input);
}
