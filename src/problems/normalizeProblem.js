export function normalizeProblem(problem = {}) {
  const prompt = problem.prompt ?? problem.question ?? '';
  const question = problem.question ?? problem.prompt ?? '';

  return {
    ...problem,
    id: problem.id,
    type: problem.type,
    category: problem.category,
    topicId: problem.topicId,
    title: problem.title,
    difficulty: problem.difficulty,
    tags: Array.isArray(problem.tags) ? problem.tags : [],
    prompt,
    question,
    options: problem.options,
    answer: problem.answer,
    explanation: problem.explanation,
    scoring: problem.scoring,
    metadata: problem.metadata ?? {}
  };
}
