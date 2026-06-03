export const performanceConfig = {
  questionsPerPage: Number(import.meta.env.VITE_QUESTIONS_PER_PAGE || 8),
  paginationWindow: Number(import.meta.env.VITE_PAGINATION_WINDOW || 2),
  enableAnimatedTopicOrbit: import.meta.env.VITE_ENABLE_TOPIC_ORBIT !== 'false'
};
