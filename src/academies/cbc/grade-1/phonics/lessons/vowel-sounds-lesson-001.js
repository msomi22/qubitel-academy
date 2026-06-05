import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';
import { shortVowels } from '../phonicsData.js';

const lesson = defineLearningProblem({
  id: 'phonics-vowel-sounds-lesson-001',
  category: 'grade-1',
  topicId: 'phonics',
  title: 'Vowel Sounds: A, E, I, O, U',
  difficulty: 'Easy',
  estimatedTime: '6 min',
  estimatedTimeSeconds: 360,
  question: 'Learn the short vowel sounds for A, E, I, O, and U.',
  readAloud: true,
  autoReadAloud: false,
  readAloudText: 'The vowels are A, E, I, O, and U. Today we practise short vowel sounds. A says /a/ as in apple. E says /e/ as in egg. I says /i/ as in insect. O says /o/ as in orange. U says /u/ as in umbrella.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can name the vowels and hear their short sounds.'
    },
    {
      type: 'section',
      title: 'The vowels',
      content: 'The main vowels are A, E, I, O, and U. Sometimes Y helps make vowel sounds, but we first practise A, E, I, O, and U.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Short vowel sounds',
      content: 'A says /a/ as in apple. E says /e/ as in egg. I says /i/ as in insect. O says /o/ as in orange. U says /u/ as in umbrella.'
    },
    {
      type: 'section',
      title: 'Vowel sound cards',
      content: shortVowels.map((item) => `${item.letter} (${item.letterName}) says ${item.sound}: ${item.examples.join(', ')}`).join('\n')
    }
  ],
  explanation: 'Short vowel sounds help learners read simple words like cat, bed, pig, pot, and cup.',
  finalTakeaway: 'The vowels are A, E, I, O, and U. Each vowel has a short sound to practise.',
  tags: ['cbc', 'grade-1', 'phonics', 'vowels', 'short-vowels', 'lesson', 'read-aloud'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-1',
    skill: 'short-vowels',
    readAloud: true,
    autoReadAloud: false,
    readAloudText: 'The vowels are A, E, I, O, and U. A says /a/. E says /e/. I says /i/. O says /o/. U says /u/.',
    vowelSounds: shortVowels,
    sequence: 2
  }
});

export default lesson;
