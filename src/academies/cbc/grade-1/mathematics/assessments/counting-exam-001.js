import countingExam from '../../foundation-practice/assessments/counting-exam-001.js';
import { retargetFoundationQuestions } from '../../_shared/migrateFoundationContent.js';

export default retargetFoundationQuestions(countingExam, {
  ids: countingExam.map((question) => question.id),
  topicId: 'mathematics',
  learningAreaId: 'numbers',
  tags: ['numbers'],
  metadata: {
    examTitle: 'Grade 1 Mathematics Numbers Exam'
  },
  sequenceStart: 100
});
