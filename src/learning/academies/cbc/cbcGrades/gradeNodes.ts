import { createGradeNode } from './factories.ts';

export const CBC_ACADEMY_NODE_ID = 'cbc-academy';

export const pp1 = createGradeNode(
  {
    id: 'pp1',
    label: 'PP1',
    summary: 'Pre-Primary 1 curriculum learning areas.',
    routeSegment: 'pp1',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: []
  },
  CBC_ACADEMY_NODE_ID
);

export const pp2 = createGradeNode(
  {
    id: 'pp2',
    label: 'PP2',
    summary: 'Pre-Primary 2 curriculum learning areas.',
    routeSegment: 'pp2',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openContent' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const grade1 = createGradeNode(
  {
    id: 'grade-1',
    label: 'Grade 1',
    summary: 'Grade 1 curriculum learning areas.',
    routeSegment: 'grade-1',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openChildren' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const grade2 = createGradeNode(
  {
    id: 'grade-2',
    label: 'Grade 2',
    summary: 'Grade 2 curriculum learning areas.',
    routeSegment: 'grade-2',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openChildren' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const grade3 = createGradeNode(
  {
    id: 'grade-3',
    label: 'Grade 3',
    summary: 'Grade 3 curriculum learning areas.',
    routeSegment: 'grade-3',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openChildren' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const grade4 = createGradeNode(
  {
    id: 'grade-4',
    label: 'Grade 4',
    summary: 'Grade 4 curriculum learning areas.',
    routeSegment: 'grade-4',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openChildren' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const grade5 = createGradeNode(
  {
    id: 'grade-5',
    label: 'Grade 5',
    summary: 'Grade 5 curriculum learning areas.',
    routeSegment: 'grade-5',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openChildren' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const grade6 = createGradeNode(
  {
    id: 'grade-6',
    label: 'Grade 6',
    summary: 'Grade 6 curriculum learning areas.',
    routeSegment: 'grade-6',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openChildren' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const grade7 = createGradeNode(
  {
    id: 'grade-7',
    label: 'Grade 7',
    summary: 'Grade 7 curriculum learning areas.',
    routeSegment: 'grade-7',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openChildren' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const grade8 = createGradeNode(
  {
    id: 'grade-8',
    label: 'Grade 8',
    summary: 'Grade 8 curriculum learning areas.',
    routeSegment: 'grade-8',
    icon: '🎒',
    tone: 'childFriendly',
    features: [{ kind: 'guidedContent' }],
    actions: [{ intent: 'openChildren' }]
  },
  CBC_ACADEMY_NODE_ID
);

export const cbcGradeNodes = [
  pp1,
  pp2,
  grade1,
  grade2,
  grade3,
  grade4,
  grade5,
  grade6,
  grade7,
  grade8
];