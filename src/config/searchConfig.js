function readSearchEnv() {
  return import.meta.env || {};
}

const env = readSearchEnv();

export const searchConfig = {
  debounceMs: Number(env.VITE_SEARCH_DEBOUNCE_MS || 180),
  minimumQueryLength: Number(env.VITE_SEARCH_MIN_CHARS || 2),
  searchPageSize: Number(env.VITE_SEARCH_PAGE_SIZE || 6),
  maxIndexedSnippetLength: Number(env.VITE_SEARCH_SNIPPET_LENGTH || 180)
};

export const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];
export const typeOptions = ['All', 'coding', 'debugging', 'trace', 'optimization', 'system-design', 'production-scenario', 'mcq'];
