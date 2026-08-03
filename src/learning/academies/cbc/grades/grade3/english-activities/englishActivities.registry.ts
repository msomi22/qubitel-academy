import type { LearningNode } from '../../../../../core/index.ts';
import { grade3EnglishSpellingNodes } from './themes/spelling/spelling.registry.ts';
import {
  grade3EnglishReadingComprehensionNodes
} from './themes/reading-comprehension/readingComprehension.registry.ts';
import {
  grade3EnglishPartsOfSpeechNodes
} from './themes/parts-of-speech/partsOfSpeech.registry.ts';

export const grade3EnglishActivitiesNodes: LearningNode[] = [
  ...grade3EnglishSpellingNodes,
  ...grade3EnglishReadingComprehensionNodes,
  ...grade3EnglishPartsOfSpeechNodes
];
