import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const AUDIO_ASSET_ROOT = '../../../../../assets/academies/cbc/alphabets';
const viteAlphabetAudio = typeof import.meta.glob === 'function'
  ? import.meta.glob('../../../../../assets/academies/cbc/alphabets/*.mp3', {
    eager: true,
    query: '?url',
    import: 'default'
  })
  : {};


  function isNodeTestRunner() {
    return (
      typeof process !== 'undefined' &&
      Array.isArray(process.argv) &&
      process.argv.includes('--test')
    );
  }

// function alphabetAudioSrc(fileName) {
//   const vitePath = `${AUDIO_ASSET_ROOT}/${fileName}`;
//   return viteAlphabetAudio[vitePath] || new URL(`${AUDIO_ASSET_ROOT}/${fileName}`, import.meta.url).href;
// }

function alphabetAudioSrc(fileName) {
  const key = Object.keys(viteAlphabetAudio).find((path) => path.endsWith(`/${fileName}`));

  // if (!key) {
  //   console.warn('Alphabet audio asset missing', {
  //     fileName,
  //     availableAudioKeysSample: Object.keys(viteAlphabetAudio).slice(0, 10)
  //   });
  //   return '';
  // }


  if (!key) {
    if (isNodeTestRunner()) {
      return new URL(`${AUDIO_ASSET_ROOT}/${fileName}`, import.meta.url).href;
    }
  
    console.warn('Alphabet audio asset missing', {
      fileName,
      availableAudioKeysSample: Object.keys(viteAlphabetAudio).slice(0, 10)
    });
  
    return '';
  }
  

  return viteAlphabetAudio[key];
}

function createAlphabetCard({ letter, word, visual, color }) {
  const lower = letter.toLowerCase();
  const letterFile = `${lower}_letter.mp3`;
  const soundWordFile = `${lower}_sound_word.mp3`;

  return {
    id: lower,
    letter,
    lower,
    display: `${letter} ${lower}`,
    color,
    identifier: {
      id: `${lower}-letter`,
      label: `Letter ${letter}`,
      ariaLabel: `Play Letter ${letter}`,
      audioFile: letterFile,
      audioSrc: alphabetAudioSrc(letterFile)
    },
    phonetic: {
      id: `${lower}-sound-word`,
      label: `${lower} for ${word}`,
      ariaLabel: `Play ${lower} for ${word}`,
      audioFile: soundWordFile,
      audioSrc: alphabetAudioSrc(soundWordFile),
      visual,
      word
    }
  };
}

export const alphabetMasteryLetters = [
  { letter: 'A', word: 'apple', visual: '🍎', color: '#12a150' },
  { letter: 'B', word: 'ball', visual: '⚽', color: '#f27a05' },
  { letter: 'C', word: 'cat', visual: '🐱', color: '#8057e6' },
  { letter: 'D', word: 'dog', visual: '🐶', color: '#2776e8' },
  { letter: 'E', word: 'egg', visual: '🥚', color: '#e94a82' },
  { letter: 'F', word: 'fish', visual: '🐟', color: '#0aa6a2' },
  { letter: 'G', word: 'goat', visual: '🐐', color: '#32a852' },
  { letter: 'H', word: 'hat', visual: '🎩', color: '#d9602d' },
  { letter: 'I', word: 'ink', visual: '🖋️', color: '#356fd4' },
  { letter: 'J', word: 'jug', visual: '🏺', color: '#b456d9' },
  { letter: 'K', word: 'kite', visual: '🪁', color: '#d99019' },
  { letter: 'L', word: 'lion', visual: '🦁', color: '#c97b1b' },
  { letter: 'M', word: 'moon', visual: '🌙', color: '#6272d9' },
  { letter: 'N', word: 'net', visual: '🥅', color: '#0d9488' },
  { letter: 'O', word: 'orange', visual: '🍊', color: '#f26b1d' },
  { letter: 'P', word: 'pot', visual: '🍲', color: '#cc4a82' },
  { letter: 'Q', word: 'queen', visual: '👑', color: '#9a59d1' },
  { letter: 'R', word: 'rabbit', visual: '🐰', color: '#d14e57' },
  { letter: 'S', word: 'sun', visual: '☀️', color: '#e5a500' },
  { letter: 'T', word: 'tiger', visual: '🐯', color: '#de6f20' },
  { letter: 'U', word: 'umbrella', visual: '☂️', color: '#5b7ee5' },
  { letter: 'V', word: 'van', visual: '🚐', color: '#168f6f' },
  { letter: 'W', word: 'woman', visual: '👩', color: '#bf5674' },
  { letter: 'X', word: 'fox', visual: '🦊', color: '#5966c7' },
  { letter: 'Y', word: 'yacht', visual: '⛵', color: '#0c8db3' },
  { letter: 'Z', word: 'zebra', visual: '🦓', color: '#4f6f38' }
].map(createAlphabetCard);

const lesson = defineLearningProblem({
  id: 'alphabet-mastery-lesson-001',
  category: 'grade-1',
  topicId: 'english',
  title: 'Alphabet Mastery',
  difficulty: 'Easy',
  question: 'Tap each alphabet card to hear the letter name and sound word.',
  body: [
    {
      type: 'alphabetMastery',
      title: 'Alphabet Mastery',
      subtitle: 'Tap a card and listen',
      letters: alphabetMasteryLetters
    },
    {
      type: 'section',
      title: 'Objective',
      content: 'I can listen to letter names and match each sound with its example word.'
    }
  ],
  explanation: 'Letter names and sound-word pairs help learners connect printed letters with spoken sounds.',
  tags: ['cbc', 'grade-1', 'english', 'alphabet-mastery', 'lesson', 'audio'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['prod'],
    source: 'original',
    audience: 'grade-1',
    learningAreaId: 'alphabet-mastery',
    skill: 'alphabet-mastery',
    sequence: 15,
    audioMode: 'mp3',
    alphabetMasteryLetters
  }
});

export default lesson;
