import { getActiveAcademy } from '../config/detectAcademy.ts';
import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import { createSkillProgrammesRegistrySource } from '../learning/academies/skill/skillProgrammes.registry.ts';
import { getBreadcrumbs } from '../learning/navigation/index.ts';
import {
  createLearningNodeRegistry,
  getNodeById,
  isLearningNodeReady
} from '../learning/registry/index.ts';
import { storageService } from './storageService.js';

const SKILL_ACADEMY_ID = 'skill';
const CONTINUE_KINDS = new Set([
  'programme',
  'level',
  'module',
  'topic',
  'learningMaterial',
  'lesson',
  'practice',
  'assessment'
]);

const skillAcademyNode = getAcademyRootNodeById('skill-academy');
const skillSource = createSkillProgrammesRegistrySource();
const skillRegistry = createLearningNodeRegistry({
  nodes: [skillAcademyNode, ...skillSource.nodes].filter(Boolean)
});

function getSkillBreadcrumbs(registry, node) {
  const breadcrumbs = getBreadcrumbs(registry, node);
  return breadcrumbs.some((item) => item.id === 'skill-academy') ? breadcrumbs : [];
}

export function resolveSkillContinueCandidate(registry, node) {
  const breadcrumbs = getSkillBreadcrumbs(registry, node);

  return [...breadcrumbs].reverse().find((item) => (
    CONTINUE_KINDS.has(item.kind) && isLearningNodeReady(registry, item)
  )) || null;
}

export function recordSkillLearningNodeVisit({ registry, node } = {}) {
  if (getActiveAcademy().id !== SKILL_ACADEMY_ID || !registry || !node) return null;

  const candidate = resolveSkillContinueCandidate(registry, node);
  if (!candidate) return null;

  return storageService.setLastLearningNodeActivity(SKILL_ACADEMY_ID, {
    nodeId: candidate.id,
    nodeKind: candidate.kind
  });
}

export function getSkillLastActivityContinueState(
  registry = skillRegistry,
  activity = storageService.getLastLearningNodeActivity(SKILL_ACADEMY_ID)
) {
  if (!registry || activity?.academy !== SKILL_ACADEMY_ID || !activity.nodeId) return null;

  const node = getNodeById(registry, activity.nodeId);
  if (!node || !CONTINUE_KINDS.has(node.kind) || !isLearningNodeReady(registry, node)) return null;

  return {
    href: `/learn/${node.id}`,
    title: `Continue ${node.label}`,
    description: node.summary || `Pick up from ${node.label}`
  };
}
