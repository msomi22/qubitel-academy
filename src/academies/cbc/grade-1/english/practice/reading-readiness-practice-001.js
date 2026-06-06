import foundationPractice from '../../foundation-practice/practice/foundation-practice-001.js';
import { retargetFoundationQuestions } from '../../_shared/migrateFoundationContent.js';

export default retargetFoundationQuestions(foundationPractice, {
  ids: [
    'foundation-practice-recognition-letter-b-002',
    'foundation-practice-matching-uppercase-a-005',
    'foundation-practice-matching-cat-word-006',
    'foundation-practice-reading-word-dog-009',
    'foundation-practice-reading-sentence-cat-010'
  ],
  topicId: 'english',
  learningAreaId: 'reading-readiness',
  tags: ['reading-readiness'],
  metadata: {
    practiceId: 'reading-readiness-practice-001',
    practiceTitle: 'Grade 1 Reading Readiness Practice'
  },
  sequenceStart: 20
});
