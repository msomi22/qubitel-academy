import minimumSidewayJumps from './dsa/minimum-sideway-jumps.js';
import slidingWindowMaxSumK from './dsa/sliding-window-max-sum-k.js';
import { systemDesignMcqsByTopic } from './system/real-world-mcqs.js';

const questionOverrides = {
  'sliding-window-001': slidingWindowMaxSumK
};

const additionalQuestionsByTopic = {
  'dynamic-programming': [minimumSidewayJumps],
  ...systemDesignMcqsByTopic
};

export function applyQuestionOverrides(bank) {
  const additions = additionalQuestionsByTopic[bank.id] || [];

  return {
    ...bank,
    questions: [
      ...bank.questions.map((question) => ({
        ...question,
        ...(questionOverrides[question.id] || {})
      })),
      ...additions
    ]
  };
}

export default questionOverrides;
