import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';
import { greetingsNotesBook } from './notes/greetingsNotes.book.ts';

const grade1EnglishThemeGreetings = createLearningNode({
  id: 'grade-1-english-activities-theme-greetings',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Greetings',
  summary: 'Learn how to greet people in different situations.',
  parentId: 'grade-1-english-activities',
  childIds: [
    'gd1-eng-greetings-notes',
    'gd1-eng-greetings-practice',
    'gd1-eng-greetings-revision',
    'gd1-eng-greetings-assessment'
  ],
  attributes: [
    { key: 'routeSegment', value: 'greetings' },
    { key: 'themeId', value: 'greetings' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '👋' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishGreetingsNotes = createLearningNode({
  id: 'gd1-eng-greetings-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Notes',
  summary: 'Learn how to greet people politely at different times and in different situations.',
  parentId: grade1EnglishThemeGreetings.id,
  content: greetingsNotesBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'routeSegment', value: 'notes' },
    { key: 'contentType', value: 'notes' },
    { key: 'themeId', value: 'greetings' }
  ],
  features: [{ kind: 'readAloud' }, { kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '📒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishGreetingsPractice = createLearningNode({
  id: 'gd1-eng-greetings-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Practice',
  summary: 'Practice using greetings politely.',
  parentId: grade1EnglishThemeGreetings.id,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'routeSegment', value: 'practice' },
    { key: 'contentType', value: 'practice' },
    { key: 'themeId', value: 'greetings' }
  ],
  features: [{ kind: 'practice' }, { kind: 'readAloud' }],
  actions: [{ intent: 'startPractice' }],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishGreetingsRevision = createLearningNode({
  id: 'gd1-eng-greetings-revision',
  kind: LEARNING_NODE_KINDS.revision,
  label: 'Revision',
  summary: 'Review greetings words and when to use them.',
  parentId: grade1EnglishThemeGreetings.id,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'routeSegment', value: 'revision' },
    { key: 'contentType', value: 'revision' },
    { key: 'themeId', value: 'greetings' }
  ],
  features: [{ kind: 'revision' }, { kind: 'practice' }],
  actions: [{ intent: 'startPractice' }],
  appearances: [
    { key: 'icon', value: '🔄' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishGreetingsAssessment = createLearningNode({
  id: 'gd1-eng-greetings-assessment',
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Assessment',
  summary: 'Check your understanding of greetings.',
  parentId: grade1EnglishThemeGreetings.id,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'greetings' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishGreetingsNodes: LearningNode[] = [
  grade1EnglishThemeGreetings,
  grade1EnglishGreetingsNotes,
  grade1EnglishGreetingsPractice,
  grade1EnglishGreetingsRevision,
  grade1EnglishGreetingsAssessment
];