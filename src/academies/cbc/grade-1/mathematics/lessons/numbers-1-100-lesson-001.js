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

export const NUMBER_WORDS = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
  'Twenty',
  'Twenty One',
  'Twenty Two',
  'Twenty Three',
  'Twenty Four',
  'Twenty Five',
  'Twenty Six',
  'Twenty Seven',
  'Twenty Eight',
  'Twenty Nine',
  'Thirty',
  'Thirty One',
  'Thirty Two',
  'Thirty Three',
  'Thirty Four',
  'Thirty Five',
  'Thirty Six',
  'Thirty Seven',
  'Thirty Eight',
  'Thirty Nine',
  'Forty',
  'Forty One',
  'Forty Two',
  'Forty Three',
  'Forty Four',
  'Forty Five',
  'Forty Six',
  'Forty Seven',
  'Forty Eight',
  'Forty Nine',
  'Fifty',
  'Fifty One',
  'Fifty Two',
  'Fifty Three',
  'Fifty Four',
  'Fifty Five',
  'Fifty Six',
  'Fifty Seven',
  'Fifty Eight',
  'Fifty Nine',
  'Sixty',
  'Sixty One',
  'Sixty Two',
  'Sixty Three',
  'Sixty Four',
  'Sixty Five',
  'Sixty Six',
  'Sixty Seven',
  'Sixty Eight',
  'Sixty Nine',
  'Seventy',
  'Seventy One',
  'Seventy Two',
  'Seventy Three',
  'Seventy Four',
  'Seventy Five',
  'Seventy Six',
  'Seventy Seven',
  'Seventy Eight',
  'Seventy Nine',
  'Eighty',
  'Eighty One',
  'Eighty Two',
  'Eighty Three',
  'Eighty Four',
  'Eighty Five',
  'Eighty Six',
  'Eighty Seven',
  'Eighty Eight',
  'Eighty Nine',
  'Ninety',
  'Ninety One',
  'Ninety Two',
  'Ninety Three',
  'Ninety Four',
  'Ninety Five',
  'Ninety Six',
  'Ninety Seven',
  'Ninety Eight',
  'Ninety Nine',
  'One Hundred'
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
  const numberWord = NUMBER_WORDS[number];

  return {
    id: `number-${number}`,
    number,
    display: String(number),
    label: `${numberWord}`,
    ariaLabel: `Play number ${numberWord}`,
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
      type: 'section',
      title: 'Objective',
      content: 'I can listen to number names from 1 to 100 and match each spoken number with its written form.'
    },
    {
      type: 'numberAudioGrid',
      title: 'Numbers 1–100',
      subtitle: 'Tap a number and listen',
      numbers: numbersOneToOneHundred
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
