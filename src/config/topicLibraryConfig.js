export const topicLibraryConfig = {
  topicsPerPage: Number(import.meta.env.VITE_TOPICS_PER_PAGE || 12),
  topicSearchDebounceMs: Number(import.meta.env.VITE_TOPIC_SEARCH_DEBOUNCE_MS || 160),
  visibleCountBatchSize: Number(import.meta.env.VITE_VISIBLE_TOPIC_COUNT_BATCH_SIZE || 12)
};
