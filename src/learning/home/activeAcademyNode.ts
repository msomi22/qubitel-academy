import { getActiveAcademy } from '../../config/detectAcademy.ts';
import {
  CBC_ACADEMY_NODE_ID,
  CUSTOMER_EXPERIENCE_ACADEMY_NODE_ID,
  TECHNOLOGY_ACADEMY_NODE_ID,
  getAcademyRootNodeById
} from '../academies/index.ts';
import type { LearningNode } from '../core/index.ts';

export const RUNTIME_ACADEMY_TO_LEARNING_NODE_ID: Record<string, string> = {
  tech: TECHNOLOGY_ACADEMY_NODE_ID,
  cbc: CBC_ACADEMY_NODE_ID,
  'customer-experience': CUSTOMER_EXPERIENCE_ACADEMY_NODE_ID
};

export function getLearningNodeAcademyIdForRuntimeAcademy(runtimeAcademyId?: string): string {
  return runtimeAcademyId && RUNTIME_ACADEMY_TO_LEARNING_NODE_ID[runtimeAcademyId]
    ? RUNTIME_ACADEMY_TO_LEARNING_NODE_ID[runtimeAcademyId]
    : TECHNOLOGY_ACADEMY_NODE_ID;
}

export function getLearningNodeAcademyForRuntimeAcademy(runtimeAcademyId?: string): LearningNode {
  const learningNodeId = getLearningNodeAcademyIdForRuntimeAcademy(runtimeAcademyId);
  const academyNode = getAcademyRootNodeById(learningNodeId);

  if (!academyNode) {
    const fallbackNode = getAcademyRootNodeById(TECHNOLOGY_ACADEMY_NODE_ID);
    if (!fallbackNode) {
      throw new Error(`Missing fallback LearningNode academy: ${TECHNOLOGY_ACADEMY_NODE_ID}`);
    }

    return fallbackNode;
  }

  return academyNode;
}

export function getActiveAcademyLearningNode(hostname?: string): LearningNode {
  return getLearningNodeAcademyForRuntimeAcademy(getActiveAcademy(hostname).id);
}