import foundationPractice from '../../foundation-practice/practice/foundation-practice-001.js';
import { retargetFoundationQuestions } from '../../_shared/migrateFoundationContent.js';

export default retargetFoundationQuestions(foundationPractice, {
  ids: [
    'foundation-practice-listening-ball-starts-b-003',
    'foundation-practice-listening-sun-word-004'
  ],
  topicId: 'english',
  learningAreaId: 'listening-speaking',
  tags: ['listening-speaking'],
  metadata: {
    practiceId: 'listening-speaking-practice-001',
    practiceTitle: 'Grade 1 Listening and Speaking Practice'
  },
  sequenceStart: 10
});
