import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';
import { alphabetSounds } from '../phonicsData.js';

const lesson = defineLearningProblem({
  id: 'phonics-alphabet-sounds-lesson-001',
  category: 'grade-1',
  topicId: 'phonics',
  title: 'Alphabet Sounds: Letter Names and Sounds',
  difficulty: 'Easy',
  estimatedTime: '8 min',
  estimatedTimeSeconds: 480,
  question: 'Learn that letters have names and sounds.',
  readAloud: true,
  autoReadAloud: false,
  readAloudText: 'Letters have names and sounds. B is called bee. B says /b/ as in ball. Listen, say the sound, then say the example word.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can say letter names, letter sounds, and example words.'
    },
    {
      type: 'section',
      title: 'Letters have names and sounds',
      content: 'A letter name is what we call the letter. A letter sound is what we hear at the start or inside words.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Example',
      content: 'Letter B is called bee. B makes the /b/ sound. Ball starts with /b/.'
    },
    {
      type: 'section',
      title: 'How to practise',
      content: 'Look at the big letter. Tap read aloud. Say the sound quickly and clearly. Then say the example words.'
    },
    {
      type: 'section',
      title: 'Alphabet sound cards',
      content: alphabetSounds.map((item) => `${item.letter} (${item.letterName}) says ${item.sound}: ${item.examples.join(', ')}`).join('\n')
    }
  ],
  explanation: 'Letter sounds help learners begin reading words by hearing the first sound clearly.',
  finalTakeaway: 'A letter has a name and a sound. In phonics, listen for the sound.',
  tags: ['cbc', 'grade-1', 'phonics', 'alphabet-sounds', 'lesson', 'read-aloud'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-1',
    skill: 'alphabet-sounds',
    readAloud: true,
    autoReadAloud: false,
    readAloudText: 'Letters have names and sounds. B is called bee. B says /b/ as in ball.',
    alphabetSounds,
    sequence: 1
  }
});

export default lesson;
