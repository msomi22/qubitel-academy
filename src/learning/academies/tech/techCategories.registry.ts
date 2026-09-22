import type { LearningNode } from '../../core/index.ts';
import { createLearningNode } from '../../core/index.ts';
import { dsaNodes } from './dsa/dsa.registry.ts';
import { itilNodes } from './itil/itil.registry.ts';

export const techCategoryNodes: LearningNode[] = [
  ...dsaNodes,
  ...itilNodes
];

export function createTechCategoriesRegistrySource() {
  return {
    id: 'tech-categories',
    layer: 'tech-categories',
    nodes: techCategoryNodes
  };
}

export function getTechCategoryNodes(): LearningNode[] {
  return techCategoryNodes.map((node) => createLearningNode(node));
}
