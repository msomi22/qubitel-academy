import foundationPractice from '../../foundation-practice/practice/foundation-practice-001.js';
import { retargetFoundationQuestions } from '../../_shared/migrateFoundationContent.js';

export default retargetFoundationQuestions(foundationPractice, {
  ids: [
    'foundation-practice-recognition-shape-circle-001'
  ],
  topicId: 'mathematics',
  learningAreaId: 'shapes',
  tags: ['shapes'],
  metadata: {
    practiceId: 'shapes-practice-001',
    practiceTitle: 'Grade 1 Shapes Practice'
  },
  sequenceStart: 40
});
