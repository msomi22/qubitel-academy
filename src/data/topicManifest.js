export const topicManifest = [
  {
    "id": "sliding-window",
    "name": "WIND — Sliding Window",
    "category": "dsa",
    "description": "Use moving contiguous windows for subarray and substring questions while maintaining a validity invariant."
  },
  {
    "id": "dynamic-programming",
    "name": "STATE — Dynamic Programming",
    "category": "dsa",
    "description": "Define states, transitions, base cases, and computation order for overlapping subproblems."
  },
  {
    "id": "graphs",
    "name": "NODES — Graph BFS / DFS",
    "category": "dsa",
    "description": "Model relationships as nodes and edges, then traverse for reachability, components, distance, or ordering."
  },
  {
    "id": "trees",
    "name": "Trees",
    "category": "dsa",
    "description": "Master binary trees, BSTs, traversal, recursion, and tree-shaped decision problems."
  },
  {
    "id": "two-pointers",
    "name": "PAIR — Two Pointers",
    "category": "dsa",
    "description": "Use two moving positions to reduce comparisons while preserving a search or partition invariant."
  },
  {
    "id": "binary-search",
    "name": "SEAR — Binary Search",
    "category": "dsa",
    "description": "Search sorted or monotonic spaces by repeatedly preserving the half that can still contain the answer."
  },
  {
    "id": "prefix-sum-hashing",
    "name": "PREF — Prefix Sum & Hashing",
    "category": "dsa",
    "description": "Store cumulative states so range answers become subtraction or hash lookup problems."
  },
  {
    "id": "greedy",
    "name": "GREED — Greedy",
    "category": "dsa",
    "description": "Make a locally best choice only when an invariant or exchange argument proves it remains globally safe."
  },
  {
    "id": "heap-priority-queue",
    "name": "HEAP — Heap / Priority Queue",
    "category": "dsa",
    "description": "Keep candidates ordered by priority so the best next item is cheap to access."
  },
  {
    "id": "backtracking",
    "name": "CHOOSE — Backtracking",
    "category": "dsa",
    "description": "Build a partial solution, test constraints, recurse deeper, then undo to try alternatives."
  },
  {
    "id": "union-find",
    "name": "UNION — Union-Find / DSU",
    "category": "dsa",
    "description": "Maintain connected groups with representatives for dynamic connectivity and undirected cycle checks."
  },
  {
    "id": "trie",
    "name": "TRIE — Prefix Tree",
    "category": "dsa",
    "description": "Store words by shared prefixes for fast prefix lookup, autocomplete, and dictionary pruning."
  },
  {
    "id": "bit-manipulation",
    "name": "BITS — Bit Manipulation",
    "category": "dsa",
    "description": "Represent flags, parity, subsets, and cancellation rules using binary operations and masks."
  },
  {
    "id": "divide-conquer",
    "name": "SPLIT — Divide & Conquer",
    "category": "dsa",
    "description": "Split into smaller independent subproblems, solve them, then combine the results correctly."
  },
  {
    "id": "monotonic-stack-queue",
    "name": "STACK — Monotonic Stack / Queue",
    "category": "dsa",
    "description": "Maintain increasing or decreasing candidates for next greater/smaller and sliding max/min questions."
  },
  {
    "id": "scalability",
    "name": "Scalability",
    "category": "system",
    "description": "Design systems that keep working as users, traffic, data, and teams grow.",
    "questionBank": {
      "legacyMerges": [
        {
          "path": "../data/banks/system/complex-system-design.js",
          "idPrefixFrom": "complex-system-design-",
          "idPrefixTo": "scalability-",
          "topicId": "scalability",
          "finalPattern": "Scalability",
          "tags": ["scalability"]
        }
      ]
    }
  },
  {
    "id": "databases",
    "name": "Databases",
    "category": "system",
    "description": "Choose storage models, indexes, transactions, partitioning, and consistency trade-offs."
  },
  {
    "id": "caching",
    "name": "Caching",
    "category": "system",
    "description": "Use caches to reduce latency and load while managing freshness, invalidation, and failure modes."
  },
  {
    "id": "messaging-queues",
    "name": "Messaging Queues",
    "category": "system",
    "description": "Decouple producers and consumers with queues, streams, retries, ordering, and idempotency."
  },
  {
    "id": "api-design",
    "name": "API Design",
    "category": "system",
    "description": "Create clear, secure, versioned, reliable APIs with strong contracts and operational behavior."
  }
];


export const categoryManifest = [
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    shortName: "DSA",
    description: "Pattern-based coding interview mastery with invariants, intuition, and optimized reasoning.",
    domain: "Core Engineering",
    tags: ["coding", "interviews", "algorithms"],
    route: "/category/dsa",
    featured: true
  },
  {
    id: "system",
    name: "System Design",
    shortName: "System Design",
    description: "Architecture, scalability, APIs, data, queues, caching, and production trade-off practice.",
    domain: "Architecture",
    tags: ["architecture", "distributed systems", "scalability"],
    route: "/category/system",
    featured: true
  }
];

export const getTopicsByCategory = (categoryId) =>
  topicManifest.filter((topic) => topic.category === categoryId);

export const getCategoryById = (categoryId) =>
  categoryManifest.find((category) => category.id === categoryId);

export const dsaTopicManifest = getTopicsByCategory("dsa");
export const systemTopicManifest = getTopicsByCategory("system");
