const topic = {
  "id": "sliding-window",
  "name": "WIND — Sliding Window",
  "category": "dsa",
  "description": "Use moving contiguous windows for subarray and substring questions while maintaining a validity invariant.",
  "questions": [
    {
      "id": "sliding-window-001",
      "type": "coding",
      "topicId": "sliding-window",
      "title": "Maximum Sum Subarray of Size K",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "maximum-sum-subarray-of-size-k",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Maximum Sum Subarray of Size K\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Maximum Sum Subarray of Size K.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Maximum Sum Subarray of Size K in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Maximum Sum Subarray of Size K, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-002",
      "type": "coding",
      "topicId": "sliding-window",
      "title": "Longest Substring Without Repeating Characters",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "longest-substring-without-repeating-characters",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Longest Substring Without Repeating Characters\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Longest Substring Without Repeating Characters.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Longest Substring Without Repeating Characters in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Longest Substring Without Repeating Characters, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-003",
      "type": "optimization",
      "topicId": "sliding-window",
      "title": "Minimum Window Containing All Characters",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "minimum-window-containing-all-characters",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Minimum Window Containing All Characters\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Minimum Window Containing All Characters.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Minimum Window Containing All Characters in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Minimum Window Containing All Characters, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-004",
      "type": "trace",
      "topicId": "sliding-window",
      "title": "Fruit Into Baskets",
      "difficulty": "Easy",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "fruit-into-baskets",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Fruit Into Baskets\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Fruit Into Baskets.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Fruit Into Baskets in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Fruit Into Baskets, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-005",
      "type": "coding",
      "topicId": "sliding-window",
      "title": "Max Consecutive Ones After K Flips",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "max-consecutive-ones-after-k-flips",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Max Consecutive Ones After K Flips\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Max Consecutive Ones After K Flips.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Max Consecutive Ones After K Flips in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Max Consecutive Ones After K Flips, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-006",
      "type": "debugging",
      "topicId": "sliding-window",
      "title": "Longest Subarray With At Most K Distinct Values",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "longest-subarray-with-at-most-k-distinct-values",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Longest Subarray With At Most K Distinct Values\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Longest Subarray With At Most K Distinct Values.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Longest Subarray With At Most K Distinct Values in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Longest Subarray With At Most K Distinct Values, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-007",
      "type": "coding",
      "topicId": "sliding-window",
      "title": "Count Anagrams Inside a String",
      "difficulty": "Hard",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "count-anagrams-inside-a-string",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Count Anagrams Inside a String\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Count Anagrams Inside a String.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Count Anagrams Inside a String in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Count Anagrams Inside a String, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-008",
      "type": "coding",
      "topicId": "sliding-window",
      "title": "Subarray Product Less Than K",
      "difficulty": "Easy",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "subarray-product-less-than-k",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Subarray Product Less Than K\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Subarray Product Less Than K.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Subarray Product Less Than K in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Subarray Product Less Than K, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-009",
      "type": "optimization",
      "topicId": "sliding-window",
      "title": "Smallest Subarray With Sum At Least Target",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "smallest-subarray-with-sum-at-least-target",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Smallest Subarray With Sum At Least Target\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Smallest Subarray With Sum At Least Target.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Smallest Subarray With Sum At Least Target in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Smallest Subarray With Sum At Least Target, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-010",
      "type": "trace",
      "topicId": "sliding-window",
      "title": "Longest Repeating Character Replacement",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "longest-repeating-character-replacement",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Longest Repeating Character Replacement\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Longest Repeating Character Replacement.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Longest Repeating Character Replacement in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Longest Repeating Character Replacement, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-011",
      "type": "coding",
      "topicId": "sliding-window",
      "title": "Fixed Window Maximum Average",
      "difficulty": "Hard",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "fixed-window-maximum-average",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Fixed Window Maximum Average\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Fixed Window Maximum Average.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Fixed Window Maximum Average in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Fixed Window Maximum Average, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-012",
      "type": "debugging",
      "topicId": "sliding-window",
      "title": "Longest Nice Subarray",
      "difficulty": "Easy",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "longest-nice-subarray",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Longest Nice Subarray\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Longest Nice Subarray.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Longest Nice Subarray in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Longest Nice Subarray, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-013",
      "type": "coding",
      "topicId": "sliding-window",
      "title": "Repeated DNA Sequence Detection",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "repeated-dna-sequence-detection",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Repeated DNA Sequence Detection\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Repeated DNA Sequence Detection.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Repeated DNA Sequence Detection in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Repeated DNA Sequence Detection, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-014",
      "type": "coding",
      "topicId": "sliding-window",
      "title": "Count Valid Windows Ending at Each Index",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "count-valid-windows-ending-at-each-index",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Count Valid Windows Ending at Each Index\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Count Valid Windows Ending at Each Index.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Count Valid Windows Ending at Each Index in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Count Valid Windows Ending at Each Index, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    },
    {
      "id": "sliding-window-015",
      "type": "optimization",
      "topicId": "sliding-window",
      "title": "Sliding Window Median Discussion",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "sliding-window",
        "wind",
        "sliding-window-median-discussion",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Sliding Window with the problem \"Sliding Window Median Discussion\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Sliding Window Median Discussion.",
      "starterThought": "Before thinking about syntax, name the pattern: Sliding Window. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the active region is contiguous and valid before the answer is updated.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Do not start with code; first protect this invariant: the active region is contiguous and valid before the answer is updated.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Sliding Window is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "[left ... right] expands → violation appears → left moves until valid → answer updates",
      "stepByStepBreakdown": [
        "Restate Sliding Window Median Discussion in terms of input, output, and the shape of the data.",
        "Spot the trigger words: contiguous subarray/substring, longest/shortest, at most K, fixed-size K.",
        "Define the invariant: the active region is contiguous and valid before the answer is updated.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Sliding Window",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Sliding Window Median Discussion, the winning move is to make the invariant visible: the active region is contiguous and valid before the answer is updated. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Sliding Window teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "The same mental model appears in stream analytics, rate-limit windows, fraud windows, and rolling observability metrics.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Sliding Window",
        "invariants",
        "complexity analysis",
        "edge-case design"
      ],
      "references": [
        "Internal DSA Pattern Frameworks 2026 guide",
        "CLRS-style algorithmic invariants",
        "Common coding interview pattern catalog"
      ]
    }
  ]
};

export default topic;
