import { createLearningAreaNode } from './factories.ts';
import { pp1 } from './gradeNodes.ts';
import { pp2 } from './gradeNodes.ts';
import { grade1 } from './gradeNodes.ts';
import { grade2 } from './gradeNodes.ts';
import { grade3 } from './gradeNodes.ts';
import { grade4 } from './gradeNodes.ts';
import { grade5 } from './gradeNodes.ts';
import { grade6 } from './gradeNodes.ts';
import { grade7 } from './gradeNodes.ts';
import { grade8 } from './gradeNodes.ts';

export const pp1English = createLearningAreaNode({
  id: 'pp1-english-activities',
  label: 'English Activities',
  summary: 'PP1 English Activities.',
  parentId: pp1.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'pp1',
  gradeName: 'PP1',
  icon: '📚'
});

export const pp1Math = createLearningAreaNode({
  id: 'pp1-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'PP1 Mathematical Activities.',
  parentId: pp1.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'pp1',
  gradeName: 'PP1',
  icon: '🔢'
});

export const pp2English = createLearningAreaNode({
  id: 'pp2-english-activities',
  label: 'English Activities',
  summary: 'PP2 English Activities.',
  parentId: pp2.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'pp2',
  gradeName: 'PP2',
  icon: '📚'
});

export const pp2Math = createLearningAreaNode({
  id: 'pp2-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'PP2 Mathematical Activities.',
  parentId: pp2.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'pp2',
  gradeName: 'PP2',
  icon: '🔢'
});

export const grade1English = createLearningAreaNode({
  id: 'grade-1-english-activities',
  label: 'English Activities',
  summary: 'Grade 1 English Activities.',
  parentId: grade1.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'grade-1',
  gradeName: 'Grade 1',
  icon: '📚'
});

export const grade1Kiswahili = createLearningAreaNode({
  id: 'grade-1-kiswahili-activities',
  label: 'Kiswahili Activities',
  summary: 'Grade 1 Kiswahili Activities.',
  parentId: grade1.id,
  routeSegment: 'kiswahili-activities',
  learningAreaId: 'kiswahili-activities',
  learningAreaName: 'Kiswahili Activities',
  gradeId: 'grade-1',
  gradeName: 'Grade 1',
  icon: '🗣️'
});

export const grade1Math = createLearningAreaNode({
  id: 'grade-1-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'Grade 1 Mathematics.',
  parentId: grade1.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'grade-1',
  gradeName: 'Grade 1',
  icon: '🔢'
});

export const grade1Science = createLearningAreaNode({
  id: 'grade-1-science',
  label: 'Science',
  summary: 'Grade 1 Science.',
  parentId: grade1.id,
  routeSegment: 'science',
  learningAreaId: 'science',
  learningAreaName: 'Science',
  gradeId: 'grade-1',
  gradeName: 'Grade 1',
  icon: '🔬'
});

export const grade1Hygiene = createLearningAreaNode({
  id: 'grade-1-hygiene',
  label: 'Hygiene',
  summary: 'Grade 1 Hygiene.',
  parentId: grade1.id,
  routeSegment: 'hygiene',
  learningAreaId: 'hygiene',
  learningAreaName: 'Hygiene',
  gradeId: 'grade-1',
  gradeName: 'Grade 1',
  icon: '🧼'
});

export const grade1Movement = createLearningAreaNode({
  id: 'grade-1-movement',
  label: 'Movement Activities',
  summary: 'Grade 1 Movement Activities.',
  parentId: grade1.id,
  routeSegment: 'movement',
  learningAreaId: 'movement',
  learningAreaName: 'Movement Activities',
  gradeId: 'grade-1',
  gradeName: 'Grade 1',
  icon: '⚽'
});

export const grade1Religious = createLearningAreaNode({
  id: 'grade-1-religious',
  label: 'Religious Activities',
  summary: 'Grade 1 Religious Activities.',
  parentId: grade1.id,
  routeSegment: 'religious',
  learningAreaId: 'religious',
  learningAreaName: 'Religious Activities',
  gradeId: 'grade-1',
  gradeName: 'Grade 1',
  icon: '🕌'
});

export const grade2English = createLearningAreaNode({
  id: 'grade-2-english-activities',
  label: 'English Activities',
  summary: 'Grade 2 English Activities.',
  parentId: grade2.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'grade-2',
  gradeName: 'Grade 2',
  icon: '📚'
});

export const grade2Math = createLearningAreaNode({
  id: 'grade-2-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'Grade 2 Mathematics.',
  parentId: grade2.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'grade-2',
  gradeName: 'Grade 2',
  icon: '🔢'
});

export const grade3English = createLearningAreaNode({
  id: 'grade-3-english-activities',
  label: 'English Activities',
  summary: 'Grade 3 English Activities.',
  parentId: grade3.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'grade-3',
  gradeName: 'Grade 3',
  icon: '📚'
});

export const grade3Math = createLearningAreaNode({
  id: 'grade-3-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'Grade 3 Mathematics.',
  parentId: grade3.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'grade-3',
  gradeName: 'Grade 3',
  icon: '🔢'
});

export const grade4English = createLearningAreaNode({
  id: 'grade-4-english-activities',
  label: 'English Activities',
  summary: 'Grade 4 English Activities.',
  parentId: grade4.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'grade-4',
  gradeName: 'Grade 4',
  icon: '📚'
});

export const grade4Math = createLearningAreaNode({
  id: 'grade-4-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'Grade 4 Mathematics.',
  parentId: grade4.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'grade-4',
  gradeName: 'Grade 4',
  icon: '🔢'
});

export const grade5English = createLearningAreaNode({
  id: 'grade-5-english-activities',
  label: 'English Activities',
  summary: 'Grade 5 English Activities.',
  parentId: grade5.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'grade-5',
  gradeName: 'Grade 5',
  icon: '📚'
});

export const grade5Math = createLearningAreaNode({
  id: 'grade-5-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'Grade 5 Mathematics.',
  parentId: grade5.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'grade-5',
  gradeName: 'Grade 5',
  icon: '🔢'
});

export const grade6English = createLearningAreaNode({
  id: 'grade-6-english-activities',
  label: 'English Activities',
  summary: 'Grade 6 English Activities.',
  parentId: grade6.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'grade-6',
  gradeName: 'Grade 6',
  icon: '📚'
});

export const grade6Math = createLearningAreaNode({
  id: 'grade-6-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'Grade 6 Mathematics.',
  parentId: grade6.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'grade-6',
  gradeName: 'Grade 6',
  icon: '🔢'
});

export const grade7English = createLearningAreaNode({
  id: 'grade-7-english-activities',
  label: 'English Activities',
  summary: 'Grade 7 English Activities.',
  parentId: grade7.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'grade-7',
  gradeName: 'Grade 7',
  icon: '📚'
});

export const grade7Math = createLearningAreaNode({
  id: 'grade-7-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'Grade 7 Mathematics.',
  parentId: grade7.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'grade-7',
  gradeName: 'Grade 7',
  icon: '🔢'
});

export const grade8English = createLearningAreaNode({
  id: 'grade-8-english-activities',
  label: 'English Activities',
  summary: 'Grade 8 English Activities.',
  parentId: grade8.id,
  routeSegment: 'english-activities',
  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',
  gradeId: 'grade-8',
  gradeName: 'Grade 8',
  icon: '📚'
});

export const grade8Math = createLearningAreaNode({
  id: 'grade-8-mathematical-activities',
  label: 'Mathematical Activities',
  summary: 'Grade 8 Mathematics.',
  parentId: grade8.id,
  routeSegment: 'mathematical-activities',
  learningAreaId: 'mathematical-activities',
  learningAreaName: 'Mathematical Activities',
  gradeId: 'grade-8',
  gradeName: 'Grade 8',
  icon: '🔢'
});

export const cbcLearningAreaNodes = [
  pp1English,
  pp1Math,
  pp2English,
  pp2Math,
  grade1English,
  grade1Kiswahili,
  grade1Math,
  grade1Science,
  grade1Hygiene,
  grade1Movement,
  grade1Religious,
  grade2English,
  grade2Math,
  grade3English,
  grade3Math,
  grade4English,
  grade4Math,
  grade5English,
  grade5Math,
  grade6English,
  grade6Math,
  grade7English,
  grade7Math,
  grade8English,
  grade8Math
];