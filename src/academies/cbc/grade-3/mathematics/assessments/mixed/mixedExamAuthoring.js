import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

const learningAreaId = 'mixed-revision';
const learningAreaTitle = 'Mixed Revision';
const questionTimeSeconds = 120;

const strandTitles = {
  numbers: 'Numbers',
  measurements: 'Measurements',
  geometry: 'Geometry'
};

const subStrandTitles = {
  'number-concept': 'Number Concept',
  'whole-numbers': 'Whole Numbers',
  addition: 'Addition',
  subtraction: 'Subtraction',
  multiplication: 'Multiplication',
  division: 'Division',
  fractions: 'Fractions',
  length: 'Length',
  mass: 'Mass',
  capacity: 'Capacity',
  time: 'Time',
  money: 'Money',
  'position-direction': 'Position and Direction',
  shapes: 'Shapes'
};

export function createMixedMathExamQuestions({ examId, examTitle, sequenceBase, questions }) {
  return questions.map((item, index) => defineMcqProblem({
    id: `${examId}-q${String(index + 1).padStart(3, '0')}`,
    category: 'grade-3',
    topicId: 'mathematics',
    title: `${examTitle} Question ${index + 1}`,
    difficulty: 'Medium',
    estimatedTime: '1 min',
    estimatedTimeSeconds: questionTimeSeconds,
    question: item.question,
    readAloud: false,
    autoReadAloud: false,
    readAloudText: item.readAloudText || item.question,
    readOptionsAloud: false,
    body: [
      {
        type: 'section',
        title: 'Objective',
        content: 'I can solve mixed Grade 3 mathematics questions.'
      }
    ],
    rendering: item.rendering,
    options: item.options,
    correctAnswer: item.correctAnswer,
    explanation: item.explanation,
    finalTakeaway: item.finalTakeaway || 'Think carefully and check your answer.',
    tags: [
      'cbc',
      'grade-3',
      'mathematics',
      learningAreaId,
      item.strandId,
      item.subStrandId,
      item.skill,
      'exam'
    ],
    metadata: {
      reviewStatus: 'approved',
      visibility: ['dev', 'prod'],
      source: 'original',
      audience: 'grade-3',
      gradeId: 'grade-3',
      subjectId: 'mathematics',
      learningAreaId,
      learningAreaTitle,
      strandId: item.strandId,
      strandTitle: strandTitles[item.strandId],
      subStrandId: item.subStrandId,
      subStrandTitle: subStrandTitles[item.subStrandId],
      examId,
      examTitle,
      assessmentType: 'exam',
      skill: item.skill,
      conceptKey: item.conceptKey,
      questionTimeSeconds,
      totalTimeSeconds: questions.length * questionTimeSeconds,
      points: 1,
      sequence: sequenceBase + index
    }
  }));
}
