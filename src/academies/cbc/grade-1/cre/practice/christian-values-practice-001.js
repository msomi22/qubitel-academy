import foundationPractice from '../../foundation-practice/practice/foundation-practice-001.js';
import { retargetFoundationQuestions } from '../../_shared/migrateFoundationContent.js';

export default retargetFoundationQuestions(foundationPractice, {
  ids: [
    'foundation-practice-clear-options-thank-you-011'
  ],
  topicId: 'cre',
  learningAreaId: 'christian-values',
  tags: ['christian-values'],
  metadata: {
    practiceId: 'christian-values-practice-001',
    practiceTitle: 'Grade 1 Christian Values Practice'
  },
  sequenceStart: 20
});
