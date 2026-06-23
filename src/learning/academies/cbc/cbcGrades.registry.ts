import type { LearningNode } from '../../core/index.ts';
import { createLearningNode } from '../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../core/learningNode.constants.ts';
import { pp1LearningAreaNodes } from './grades/pp1.registry.ts';
import { pp2LearningAreaNodes } from './grades/pp2.registry.ts';
import { grade1Nodes } from './grades/grade1.registry.ts';
import { grade2LearningAreaNodes } from './grades/grade2.registry.ts';
import { grade3LearningAreaNodes } from './grades/grade3.registry.ts';
import { grade4LearningAreaNodes } from './grades/grade4.registry.ts';
import { grade5LearningAreaNodes } from './grades/grade5.registry.ts';
import { grade6LearningAreaNodes } from './grades/grade6.registry.ts';
import { grade7LearningAreaNodes } from './grades/grade7.registry.ts';
import { grade8LearningAreaNodes } from './grades/grade8.registry.ts';

export const CBC_ACADEMY_NODE_ID = 'cbc-academy';

// Grade nodes
const pp1 = createLearningNode({
  id: 'pp1',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'PP1',
  summary: 'Pre-Primary 1 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'pp1' },
    { key: 'gradeId', value: 'pp1' },
    { key: 'gradeName', value: 'PP1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const pp2 = createLearningNode({
  id: 'pp2',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'PP2',
  summary: 'Pre-Primary 2 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'pp2' },
    { key: 'gradeId', value: 'pp2' },
    { key: 'gradeName', value: 'PP2' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openContent' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1 = createLearningNode({
  id: 'grade-1',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 1',
  summary: 'Grade 1 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-1' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade2 = createLearningNode({
  id: 'grade-2',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 2',
  summary: 'Grade 2 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-2' },
    { key: 'gradeId', value: 'grade-2' },
    { key: 'gradeName', value: 'Grade 2' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade3 = createLearningNode({
  id: 'grade-3',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 3',
  summary: 'Grade 3 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-3' },
    { key: 'gradeId', value: 'grade-3' },
    { key: 'gradeName', value: 'Grade 3' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade4 = createLearningNode({
  id: 'grade-4',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 4',
  summary: 'Grade 4 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-4' },
    { key: 'gradeId', value: 'grade-4' },
    { key: 'gradeName', value: 'Grade 4' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade5 = createLearningNode({
  id: 'grade-5',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 5',
  summary: 'Grade 5 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-5' },
    { key: 'gradeId', value: 'grade-5' },
    { key: 'gradeName', value: 'Grade 5' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade6 = createLearningNode({
  id: 'grade-6',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 6',
  summary: 'Grade 6 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-6' },
    { key: 'gradeId', value: 'grade-6' },
    { key: 'gradeName', value: 'Grade 6' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade7 = createLearningNode({
  id: 'grade-7',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 7',
  summary: 'Grade 7 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-7' },
    { key: 'gradeId', value: 'grade-7' },
    { key: 'gradeName', value: 'Grade 7' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade8 = createLearningNode({
  id: 'grade-8',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 8',
  summary: 'Grade 8 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-8' },
    { key: 'gradeId', value: 'grade-8' },
    { key: 'gradeName', value: 'Grade 8' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

// Learning areas for each grade

export const cbcGradesNodes: LearningNode[] = [
  pp1,
  pp2,
  grade1,
  grade2,
  grade3,
  grade4,
  grade5,
  grade6,
  grade7,
  grade8,
  ...pp1LearningAreaNodes,
  ...pp2LearningAreaNodes,
  ...grade1Nodes,
  ...grade2LearningAreaNodes,
  ...grade3LearningAreaNodes,
  ...grade4LearningAreaNodes,
  ...grade5LearningAreaNodes,
  ...grade6LearningAreaNodes,
  ...grade7LearningAreaNodes,
  ...grade8LearningAreaNodes
];

export function createCbcGradesRegistrySource() {
  return {
    id: 'cbc-grades',
    layer: 'cbc-grades',
    nodes: cbcGradesNodes
  };
}

export function getCbcGradesNodes(): LearningNode[] {
  return cbcGradesNodes.map((node) => createLearningNode(node));
}