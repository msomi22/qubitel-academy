import { cbcGradeNodes } from './gradeNodes.ts';
import { cbcLearningAreaNodes } from './learningAreaNodes.ts';

export { createGradeNode, createLearningAreaNode } from './factories.ts';
export { cbcGradeNodes } from './gradeNodes.ts';
export { cbcLearningAreaNodes } from './learningAreaNodes.ts';

export const cbcGradesNodes = [
  ...cbcGradeNodes,
  ...cbcLearningAreaNodes
];
