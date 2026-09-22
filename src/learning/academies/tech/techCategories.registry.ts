import type { LearningNode } from '../../core/index.ts';
import { createLearningNode } from '../../core/index.ts';
import { dsaNodes } from './dsa/dsa.registry.ts';

export const techCategoryNodes: LearningNode[] = [
  ...dsaNodes
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
