import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const NUMBER_COLORS = [
  '#0ea66b',
  '#f27a05',
  '#2f6fe4',
  '#b456d9',
  '#d94b64',
  '#0c91a8',
  '#dd9b12',
  '#5f7a31'
];

function numberAudioFile(number) {
  return `${String(number).padStart(3, '0')}.mp3`;
}

function numberAudioSrc(fileName) {
  return new URL(
    `../../../../../assets/academies/cbc/numbers/${fileName}`,
    import.meta.url
  ).href;
}

function createNumberCard(number) {
  const audioFile = numberAudioFile(number);

  return {
    id: `number-${number}`,
    number,
    display: String(number),
    label: `Number ${number}`,
    ariaLabel: `Play number ${number}`,
    audioFile,
    audioSrc: numberAudioSrc(audioFile),
    color: NUMBER_COLORS[(number - 1) % NUMBER_COLORS.length]
  };
}

export const numbersOneToOneHundred = Array.from({ length: 100 }, (_, index) => createNumberCard(index + 1));

const lesson = defineLearningProblem({
  id: 'numbers-1-100-lesson-001',
  category: 'grade-1',
  topicId: 'mathematics',
  title: 'Numbers 1–100',
  difficulty: 'Easy',
  question: 'Tap each number card to hear the number name.',
  body: [
    {
      type: 'numberAudioGrid',
      title: 'Numbers 1–100',
      subtitle: 'Tap a number and listen',
      numbers: numbersOneToOneHundred
    },
    {
      type: 'section',
      title: 'Objective',
      content: 'I can listen to number names from 1 to 100 and match each spoken number with its written form.'
    }
  ],
  explanation: 'Listening to each number name helps learners connect number symbols with spoken counting words.',
  tags: ['cbc', 'grade-1', 'mathematics', 'numbers', 'lesson', 'audio'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['prod'],
    source: 'original',
    audience: 'grade-1',
    learningAreaId: 'numbers',
    skill: 'numbers-1-100',
    sequence: 10,
    audioMode: 'mp3',
    numbers: numbersOneToOneHundred
  }
});

export default lesson;