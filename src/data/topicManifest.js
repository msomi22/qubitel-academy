export const topicManifest = [
  {
    "id": "sliding-window",
    "name": "WIND — Sliding Window",
    "category": "dsa",
    "description": "Use moving contiguous windows for subarray and substring questions while maintaining a validity invariant.",
    "objectives": [
      "Recognize when a problem is asking about a contiguous subarray or substring.",
      "Distinguish fixed-size windows from variable-size windows before writing code.",
      "Maintain a clear invariant: what makes the current window valid?",
      "Update the answer only at the moment that is correct for the problem type.",
      "Use sums, counts, frequency maps, products, distinct counts, and replacement budgets as window state.",
      "Decide whether the prompt asks for one best window, many valid windows, or exact matches.",
      "Explain why each pointer only moves forward and why the solution is O(n).",
      "Identify when normal Sliding Window is unsafe and another pattern is a better fit."
    ],
    "notes": {
      "summary": "Sliding Window works when candidates are contiguous and the next candidate can be built from the previous one. A window usually has a left boundary, a right boundary, and small state such as a sum, count map, product, distinct count, violation count, or replacement budget.",
      "strategy": "Use a fixed-size window when the length is known upfront. Use a variable-size window when validity controls when the left pointer moves.",
      "mentalModel": [
        "Expand right to include new information.",
        "Repair or shrink from the left when the invariant is broken or when a valid window can be improved.",
        "Update the answer only at the correct moment for that problem type.",
        "For count-all problems, count how many valid windows end at the current right pointer after the window has been repaired.",
        "If negatives or non-monotonic state break the invariant, consider prefix sums, hash maps, or monotonic queues instead."
      ]
    },
    "roadmap": [
      {
        "stage": "Stage A",
        "title": "Foundations",
        "purpose": "Teach what a window is, why contiguous matters, and how a fixed window reuses work instead of recomputing every candidate.",
        "currentExamples": [
          "Maximum Sum Subarray of Size K",
          "Fixed Window Maximum Average"
        ],
        "nearTermAdditions": [
          "Fixed Window State MCQ",
          "Which value leaves and enters?",
          "When is the first valid fixed window ready?",
          "Maximum Average Subarray I",
          "Contains Duplicate II as an index-distance/window-set example"
        ],
        "futureIdeas": [
          "What makes the window contiguous?",
          "Why does a fixed-size window subtract exactly one outgoing value?",
          "When should the answer first be updated?"
        ]
      },
      {
        "stage": "Stage B",
        "title": "Fixed-size counting and matching",
        "purpose": "Teach exact-length windows with frequency arrays or maps so learners can match anagrams, permutations, and encoded fixed-length patterns.",
        "currentExamples": [
          "Count Anagrams Inside a String"
        ],
        "nearTermAdditions": [
          "Permutation in String",
          "Find All Anagrams in a String",
          "Repeated DNA Sequences as a fixed-length encoded window example"
        ],
        "futureIdeas": [
          "Why does an anagram window have fixed length?",
          "What state changes when a character leaves the window?",
          "How do frequency deltas avoid recomputing counts?",
          "When are two frequency maps considered matched?"
        ]
      },
      {
        "stage": "Stage C",
        "title": "Variable window: grow until valid, shrink while valid",
        "purpose": "Teach shortest-valid-window problems where right grows the window until it works, then left shrinks it while it remains valid.",
        "currentExamples": [
          "Minimum Size Subarray Sum",
          "Smallest Subarray With Sum At Least Target"
        ],
        "nearTermAdditions": [
          "Minimum Window Substring / Minimum Window Containing All Characters",
          "Shortest Subarray With OR at Least K as a careful bit-count state example"
        ],
        "futureIdeas": [
          "Why update best before removing left?",
          "What makes the current window valid?",
          "Why does positivity matter for Minimum Size Subarray Sum?",
          "What changes when validity depends on character requirements instead of numeric sum?"
        ]
      },
      {
        "stage": "Stage D",
        "title": "Variable window: repair when invalid",
        "purpose": "Teach longest-valid-window problems where the window may become invalid, then left moves until the invariant is restored.",
        "currentExamples": [
          "Longest Substring Without Repeating Characters",
          "Fruit Into Baskets",
          "Longest Subarray With At Most K Distinct Values"
        ],
        "nearTermAdditions": [
          "Longest Substring With At Most K Distinct Characters",
          "Longest Substring With At Most Two Distinct Characters",
          "Longest Subarray of 1s After Deleting One Element"
        ],
        "futureIdeas": [
          "When should best be updated: before or after repair?",
          "Why must left sometimes move more than once?",
          "What does the count map represent?",
          "What exactly makes the window invalid?"
        ]
      },
      {
        "stage": "Stage E",
        "title": "Budget / replacement windows",
        "purpose": "Teach windows where validity depends on a limited number of flips, replacements, edits, or accumulated transformation cost.",
        "currentExamples": [
          "Max Consecutive Ones After K Flips",
          "Longest Repeating Character Replacement"
        ],
        "nearTermAdditions": [
          "Max Consecutive Ones III if not already represented clearly",
          "Get Equal Substrings Within Budget",
          "Frequency of the Most Frequent Element as a sorted-window budget variant"
        ],
        "futureIdeas": [
          "What is the budget variable?",
          "When is the budget exceeded?",
          "Why can max frequency be treated carefully in character replacement?",
          "How does sorting change the meaning of the window?"
        ]
      },
      {
        "stage": "Stage F",
        "title": "Counting all valid subarrays/substrings",
        "purpose": "Teach count-many-window problems where the answer is not one best length, but every valid window contribution.",
        "currentExamples": [
          "Subarray Product Less Than K"
        ],
        "nearTermAdditions": [
          "Count Subarrays With Score Less Than K",
          "Number of Substrings Containing All Three Characters",
          "Count Subarrays Where Max Appears at Least K Times",
          "Binary Subarrays With Sum as a boundary case that may use at-most counting or prefix sums",
          "Count Number of Nice Subarrays as a boundary case where sliding window can combine with prefix/counting"
        ],
        "futureIdeas": [
          "Why does a valid window ending at right contribute right - left + 1 subarrays?",
          "When do we count after shrinking?",
          "What changes between best-length and count-all problems?",
          "When do we count substrings starting at left instead of ending at right?"
        ]
      },
      {
        "stage": "Stage G",
        "title": "Edge cases and anti-patterns",
        "purpose": "Teach when Sliding Window does not directly apply, including negative numbers, non-monotonic state, exact-K traps, prefix-sum boundaries, monotonic-deque boundaries, and substring/subarray versus subsequence confusion.",
        "currentExamples": [],
        "nearTermAdditions": [
          "Negative numbers breaking monotonic sum assumptions",
          "Prefix sums + hash map when normal Sliding Window cannot preserve validity",
          "Monotonic deque when a normal window needs ordered max/min state",
          "Contiguous substring/subarray versus subsequence decision checks",
          "Exactly-K via atMost(K) - atMost(K - 1) or prefix counts"
        ],
        "futureIdeas": [
          "Why does Minimum Size Subarray Sum require positive numbers?",
          "Why does Subarray Sum Equals K not use a normal sliding window when negatives exist?",
          "When should Sliding Window be replaced by prefix sums?",
          "Why is Sliding Window Maximum a monotonic deque problem?",
          "Why is subsequence not a sliding-window trigger?"
        ]
      }
    ]
  },
  {
    "id": "recursion",
    "name": "RECUR — Recursion",
    "category": "dsa",
    "description": "Master recursive thinking, base cases, call stack tracing, return unwinding, branching choices, and the foundations behind DFS, backtracking, divide-and-conquer, trees, and dynamic programming.",
    "questionBank": {
      "mode": "discovered"
    },
    "objectives": [
      "Explain the three laws of recursion: self-call, base case, and progress toward termination.",
      "Trace recursive calls using the call stack mental model.",
      "Identify base cases and recursive cases before writing code.",
      "Explain how values return and unwind after the base case is reached.",
      "Recognize when recursion leads into DFS, trees, backtracking, divide-and-conquer, and dynamic programming.",
      "Practice recursion from simple linear calls to branching choice trees."
    ],
    "notes": {
      "summary": "Recursion solves a problem by reducing it into smaller versions of the same problem. The learner must understand the base case, the recursive case, and how each call moves closer to stopping.",
      "strategy": "Before writing recursive code, define the smallest answer, the work done in the current call, and the smaller problem passed to the next call.",
      "mentalModel": [
        "Each recursive call pauses the current function and pushes a new frame onto the call stack.",
        "The base case stops new calls from being added.",
        "After the base case returns, stack frames pop one by one and each paused call continues.",
        "For branching recursion, each call may create multiple smaller calls, forming a recursion tree.",
        "If the input does not move toward the base case, recursion will not terminate safely."
      ]
    },
    "roadmap": [
      {
        "stage": "Stage A",
        "title": "Recursion foundations",
        "purpose": "Teach the base case, recursive case, progress toward termination, and call stack tracing.",
        "currentExamples": [],
        "nearTermAdditions": [
          "Recursion — The Gateway to Everything",
          "Factorial(n)",
          "Sum of digits"
        ],
        "futureIdeas": [
          "What makes a recursive function stop?",
          "What gets pushed onto the call stack?",
          "What happens when recursive calls return?"
        ]
      },
      {
        "stage": "Stage B",
        "title": "Linear recursion",
        "purpose": "Teach one-call recursion where each call makes the problem smaller by one step.",
        "currentExamples": [],
        "nearTermAdditions": [
          "Reverse a string",
          "Check palindrome with two-pointer recursion"
        ],
        "futureIdeas": [
          "Where does the answer get built?",
          "What work happens before the recursive call?",
          "What work happens after the recursive call returns?"
        ]
      },
      {
        "stage": "Stage C",
        "title": "Divide-and-conquer recursion",
        "purpose": "Teach recursion that splits the search or computation space into smaller independent pieces.",
        "currentExamples": [],
        "nearTermAdditions": [
          "Power(x, n)",
          "Recursive binary search"
        ],
        "futureIdeas": [
          "Why does halving the input change complexity?",
          "What is the combine step?",
          "How is divide-and-conquer different from simple linear recursion?"
        ]
      },
      {
        "stage": "Stage D",
        "title": "Branching recursion and choices",
        "purpose": "Teach recursion where each call explores multiple choices, preparing learners for backtracking.",
        "currentExamples": [],
        "nearTermAdditions": [
          "Generate all subsets",
          "Generate all permutations",
          "Tower of Hanoi"
        ],
        "futureIdeas": [
          "What is the choice at each call?",
          "What state is carried forward?",
          "When does the recursion tree stop expanding?"
        ]
      },
      {
        "stage": "Stage E",
        "title": "Bridge to advanced patterns",
        "purpose": "Connect recursion to DFS, tree traversal, backtracking, divide-and-conquer, and dynamic programming.",
        "currentExamples": [],
        "nearTermAdditions": [
          "Recursion to DFS mental model",
          "Recursion to DP overlapping subproblems"
        ],
        "futureIdeas": [
          "Why does DFS naturally use recursion?",
          "Why does Fibonacci reveal overlapping subproblems?",
          "When should recursion be converted to iteration or memoization?"
        ]
      }
    ]
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
  },
  {
    "id": "java-core",
    "name": "Java Core",
    "category": "java",
    "description": "Practice Java language fundamentals, object-oriented reasoning, collections, exceptions, and JVM basics.",
    "questionBank": {
      "mode": "discovered"
    }
  },
  {
    "id": "ckad-preparation",
    "name": "CKAD Preparation",
    "category": "kubernetes-ckad",
    "description": "Prepare a repeatable Kubernetes cloud lab before starting the KubeTasker CKAD stages.",
    "questionBank": {
      "mode": "discovered"
    }
  },
  {
    "id": "workloads-services",
    "name": "Workloads & Services",
    "category": "kubernetes-ckad",
    "description": "Deploy application workloads and expose them inside the cluster using Deployments, Pods, Services, Endpoints, and DNS.",
    "questionBank": {
      "mode": "discovered"
    }
  },
  {
    "id": "numerical-reasoning",
    "name": "Numerical Reasoning",
    "category": "aptitude",
    "description": "Practice timed arithmetic, percentages, ratios, sequences, and data interpretation questions for aptitude assessments.",
    "questionBank": {
      "mode": "discovered"
    }
  },
  {
    "id": "ml-foundations",
    "name": "ML Foundations",
    "category": "ml-ai",
    "description": "Build practical intuition for machine learning systems, model lifecycle, data quality, evaluation, and production behavior.",
    "questionBank": {
      "mode": "discovered"
    }
  },
  {
    "id": "management-track",
    "name": "Management Track",
    "category": "engineering-leadership",
    "description": "Practice senior engineering leadership judgment around delegation, ownership, mentoring, communication, delivery, and team growth.",
    "questionBank": {
      "mode": "discovered"
    }
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
  },
  {
    id: "java",
    name: "Java",
    shortName: "Java",
    description: "Core Java, backend fundamentals, language behavior, and production-ready Java reasoning.",
    domain: "Backend Engineering",
    tags: ["java", "backend", "engineering"],
    route: "/category/java",
    featured: true
  },
  {
    id: "kubernetes-ckad",
    name: "Kubernetes CKAD",
    shortName: "CKAD",
    description: "Hands-on Kubernetes and CKAD preparation through the incremental KubeTasker project.",
    domain: "Cloud Native Engineering",
    tags: ["kubernetes", "ckad", "cloud-native"],
    route: "/category/kubernetes-ckad",
    featured: true
  },
  {
    id: "aptitude",
    name: "Aptitude Test",
    shortName: "Aptitude",
    description: "Timed numerical, verbal, logical, and cognitive reasoning practice for assessment preparation.",
    domain: "Assessment Prep",
    tags: ["aptitude", "reasoning", "timed-practice"],
    route: "/category/aptitude",
    featured: true
  },
  {
    id: "ml-ai",
    name: "ML / AI",
    shortName: "ML / AI",
    description: "Machine learning and AI engineering practice focused on model behavior, evaluation, data, and production trade-offs.",
    domain: "AI Engineering",
    tags: ["machine-learning", "ai", "production-ml"],
    route: "/category/ml-ai",
    featured: true
  },
  {
    id: "engineering-leadership",
    name: "Engineering Leadership",
    shortName: "Leadership",
    description: "Senior developer leadership practice for delegation, ownership, mentoring, communication, delivery judgment, and team effectiveness.",
    domain: "Engineering Leadership",
    tags: ["leadership", "management", "mentorship"],
    route: "/category/engineering-leadership",
    featured: true
  }
];

export const getTopicsByCategory = (categoryId) =>
  topicManifest.filter((topic) => topic.category === categoryId);

export const getCategoryById = (categoryId) =>
  categoryManifest.find((category) => category.id === categoryId);

export const dsaTopicManifest = getTopicsByCategory("dsa");
export const systemTopicManifest = getTopicsByCategory("system");
export const javaTopicManifest = getTopicsByCategory("java");
export const kubernetesCkadTopicManifest = getTopicsByCategory("kubernetes-ckad");
export const aptitudeTopicManifest = getTopicsByCategory("aptitude");
export const mlAiTopicManifest = getTopicsByCategory("ml-ai");
export const engineeringLeadershipTopicManifest = getTopicsByCategory("engineering-leadership");