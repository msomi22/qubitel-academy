import foundationPractice from '../../foundation-practice/practice/foundation-practice-001.js';
import { retargetFoundationQuestions } from '../../_shared/migrateFoundationContent.js';

export default retargetFoundationQuestions(foundationPractice, {
  ids: [
    'foundation-practice-counting-three-stars-007',
    'foundation-practice-counting-after-five-008'
  ],
  topicId: 'mathematics',
  learningAreaId: 'numbers',
  tags: ['numbers'],
  metadata: {
    practiceId: 'numbers-practice-001',
    practiceTitle: 'Grade 1 Numbers Practice'
  },
  sequenceStart: 10
});
