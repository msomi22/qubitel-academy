const topic = {
  "id": "two-pointers",
  "name": "PAIR — Two Pointers",
  "category": "dsa",
  "description": "Use two moving positions to reduce comparisons while preserving a search or partition invariant.",
  "questions": [
    {
      "id": "two-pointers-001",
      "type": "coding",
      "topicId": "two-pointers",
      "title": "Two Sum in Sorted Array",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "two-sum-in-sorted-array",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Two Sum in Sorted Array\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Two Sum in Sorted Array.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Two Sum in Sorted Array in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Two Sum in Sorted Array, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-002",
      "type": "coding",
      "topicId": "two-pointers",
      "title": "Valid Palindrome Ignoring Symbols",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "valid-palindrome-ignoring-symbols",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Valid Palindrome Ignoring Symbols\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Valid Palindrome Ignoring Symbols.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Valid Palindrome Ignoring Symbols in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Valid Palindrome Ignoring Symbols, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-003",
      "type": "optimization",
      "topicId": "two-pointers",
      "title": "Remove Duplicates from Sorted Array",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "remove-duplicates-from-sorted-array",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Remove Duplicates from Sorted Array\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Remove Duplicates from Sorted Array.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Remove Duplicates from Sorted Array in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Remove Duplicates from Sorted Array, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-004",
      "type": "trace",
      "topicId": "two-pointers",
      "title": "Container With Most Water",
      "difficulty": "Easy",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "container-with-most-water",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Container With Most Water\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Container With Most Water.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Container With Most Water in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Container With Most Water, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-005",
      "type": "coding",
      "topicId": "two-pointers",
      "title": "Three Sum",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "three-sum",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Three Sum\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Three Sum.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Three Sum in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Three Sum, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-006",
      "type": "debugging",
      "topicId": "two-pointers",
      "title": "Sort Colors",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "sort-colors",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Sort Colors\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Sort Colors.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Sort Colors in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Sort Colors, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-007",
      "type": "coding",
      "topicId": "two-pointers",
      "title": "Move Zeroes",
      "difficulty": "Hard",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "move-zeroes",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Move Zeroes\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Move Zeroes.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Move Zeroes in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Move Zeroes, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-008",
      "type": "coding",
      "topicId": "two-pointers",
      "title": "Linked List Cycle",
      "difficulty": "Easy",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "linked-list-cycle",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Linked List Cycle\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Linked List Cycle.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Linked List Cycle in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Linked List Cycle, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-009",
      "type": "optimization",
      "topicId": "two-pointers",
      "title": "Middle of Linked List",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "middle-of-linked-list",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Middle of Linked List\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Middle of Linked List.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Middle of Linked List in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Middle of Linked List, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-010",
      "type": "trace",
      "topicId": "two-pointers",
      "title": "Merge Two Sorted Arrays",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "merge-two-sorted-arrays",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Merge Two Sorted Arrays\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Merge Two Sorted Arrays.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Merge Two Sorted Arrays in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Merge Two Sorted Arrays, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-011",
      "type": "coding",
      "topicId": "two-pointers",
      "title": "Pair Difference Target",
      "difficulty": "Hard",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "pair-difference-target",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Pair Difference Target\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Pair Difference Target.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Pair Difference Target in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Pair Difference Target, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-012",
      "type": "debugging",
      "topicId": "two-pointers",
      "title": "Closest Two Sum",
      "difficulty": "Easy",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "closest-two-sum",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Closest Two Sum\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Closest Two Sum.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Closest Two Sum in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Closest Two Sum, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-013",
      "type": "coding",
      "topicId": "two-pointers",
      "title": "Trapping Rain Water",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "trapping-rain-water",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Trapping Rain Water\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Trapping Rain Water.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Trapping Rain Water in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Trapping Rain Water, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-014",
      "type": "coding",
      "topicId": "two-pointers",
      "title": "Partition Around Pivot",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "partition-around-pivot",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Partition Around Pivot\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Partition Around Pivot.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Partition Around Pivot in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Partition Around Pivot, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
      "id": "two-pointers-015",
      "type": "optimization",
      "topicId": "two-pointers",
      "title": "Palindrome Linked List",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "two-pointers",
        "pair",
        "palindrome-linked-list",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Two Pointers with the problem \"Palindrome Linked List\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Palindrome Linked List.",
      "starterThought": "Before thinking about syntax, name the pattern: Two Pointers. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Do not start with code; first protect this invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Two Pointers is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "left →              ← right\nmove the pointer whose side can no longer produce the target",
      "stepByStepBreakdown": [
        "Restate Palindrome Linked List in terms of input, output, and the shape of the data.",
        "Spot the trigger words: sorted input, pair sum, palindrome, partitioning, fast/slow movement.",
        "Define the invariant: the pointers preserve a candidate region or processed prefix where no skipped answer can be better.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Two Pointers",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Palindrome Linked List, the winning move is to make the invariant visible: the pointers preserve a candidate region or processed prefix where no skipped answer can be better. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Two Pointers teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "This mirrors merge pipelines, cursor scans, deduplication jobs, and low-allocation stream compaction.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Two Pointers",
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
