import objectMatchingExam from '../../foundation-practice/assessments/object-matching-exam-001.js';
import { retargetFoundationQuestions } from '../../_shared/migrateFoundationContent.js';

export default retargetFoundationQuestions(objectMatchingExam, {
  ids: objectMatchingExam.map((question) => question.id),
  topicId: 'english',
  learningAreaId: 'reading-readiness',
  tags: ['reading-readiness'],
  metadata: {
    examTitle: 'Grade 1 Reading Readiness Exam'
  },
  sequenceStart: 200
});
