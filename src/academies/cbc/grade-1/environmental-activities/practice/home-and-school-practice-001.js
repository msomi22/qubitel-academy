import foundationPractice from '../../foundation-practice/practice/foundation-practice-001.js';
import { retargetFoundationQuestions } from '../../_shared/migrateFoundationContent.js';

export default retargetFoundationQuestions(foundationPractice, {
  ids: [
    'foundation-practice-clear-options-cross-road-012'
  ],
  topicId: 'environmental-activities',
  learningAreaId: 'home-and-school',
  tags: ['home-and-school'],
  metadata: {
    practiceId: 'home-and-school-practice-001',
    practiceTitle: 'Grade 1 Home and School Practice'
  },
  sequenceStart: 20
});
