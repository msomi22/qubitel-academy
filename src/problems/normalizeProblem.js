import {
  getProblemTypeMetadata,
  normalizeProblemTypeAlias,
  normalizeProblemTypeTags
} from './problemTypeRegistry.js';

export function normalizeProblem(problem = {}) {
  const prompt = problem.prompt ?? problem.question ?? '';
  const question = problem.question ?? problem.prompt ?? '';
  const type = normalizeProblemTypeAlias(problem.type);
  const typeMetadata = getProblemTypeMetadata(problem.type);
  const normalized = {
    ...problem,
    id: problem.id,
    type,
    topicId: problem.topicId,
    title: problem.title,
    difficulty: problem.difficulty ?? typeMetadata?.defaultDifficulty,
    tags: normalizeProblemTypeTags(Array.isArray(problem.tags) ? problem.tags : []),
    prompt,
    question,
    options: problem.options,
    answer: problem.answer,
    correctAnswer: problem.correctAnswer,
    explanation: problem.explanation,
    hints: problem.hints,
    starterThought: problem.starterThought,
    relatedConcepts: problem.relatedConcepts,
    references: problem.references,
    followUpQuestions: problem.followUpQuestions,
    scoring: problem.scoring,
    metadata: problem.metadata ?? {}
  };

  if (problem.category !== undefined) {
    normalized.category = problem.category;
  }

  return normalized;
}
