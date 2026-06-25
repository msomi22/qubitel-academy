import { overviewPage } from './pages/overview.page.ts';
import { vocabularyPage } from './pages/vocabulary.page.ts';
import { listeningSpeakingPage } from './pages/listeningSpeaking.page.ts';
import { signReadingPage } from './pages/signReading.page.ts';
import { languageUsePage } from './pages/languageUse.page.ts';
import { writingPage } from './pages/writing.page.ts';
import { recapPage } from './pages/recap.page.ts';

export const greetingsLearningMaterialBook = {
  type: 'book',
  title: 'Greetings Learning Material',
  description: 'In this lesson, you will learn greeting words and how to use them politely.',
  pages: [
    overviewPage,
    vocabularyPage,
    listeningSpeakingPage,
    signReadingPage,
    languageUsePage,
    writingPage,
    recapPage
  ],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'ENG',
    learningAreaName: 'English Activities',
    themeName: 'Greetings',
    sourceThemeNumber: '1.0',
    audience: 'learner'
  }
};