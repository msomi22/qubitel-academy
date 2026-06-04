const topic = {
  "id": "monotonic-stack-queue",
  "name": "STACK — Monotonic Stack / Queue",
  "category": "dsa",
  "description": "Maintain increasing or decreasing candidates for next greater/smaller and sliding max/min questions.",
  "questions": [
    {
      "id": "monotonic-stack-queue-001",
      "type": "coding",
      "topicId": "monotonic-stack-queue",
      "title": "Daily Temperatures",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "daily-temperatures",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Daily Temperatures\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Daily Temperatures.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Daily Temperatures in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Daily Temperatures, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-002",
      "type": "coding",
      "topicId": "monotonic-stack-queue",
      "title": "Next Greater Element",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "next-greater-element",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Next Greater Element\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Next Greater Element.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Next Greater Element in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Next Greater Element, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-003",
      "type": "optimization",
      "topicId": "monotonic-stack-queue",
      "title": "Next Smaller Element",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "next-smaller-element",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Next Smaller Element\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Next Smaller Element.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Next Smaller Element in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Next Smaller Element, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-004",
      "type": "trace",
      "topicId": "monotonic-stack-queue",
      "title": "Stock Span",
      "difficulty": "Easy",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "stock-span",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Stock Span\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Stock Span.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Stock Span in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Stock Span, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-005",
      "type": "coding",
      "topicId": "monotonic-stack-queue",
      "title": "Largest Rectangle in Histogram",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "largest-rectangle-in-histogram",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Largest Rectangle in Histogram\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Largest Rectangle in Histogram.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Largest Rectangle in Histogram in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Largest Rectangle in Histogram, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-006",
      "type": "debugging",
      "topicId": "monotonic-stack-queue",
      "title": "Maximal Rectangle",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "maximal-rectangle",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Maximal Rectangle\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Maximal Rectangle.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Maximal Rectangle in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Maximal Rectangle, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-007",
      "type": "coding",
      "topicId": "monotonic-stack-queue",
      "title": "Sliding Window Maximum",
      "difficulty": "Hard",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "sliding-window-maximum",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Sliding Window Maximum\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Sliding Window Maximum.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Sliding Window Maximum in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Sliding Window Maximum, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-008",
      "type": "coding",
      "topicId": "monotonic-stack-queue",
      "title": "Sliding Window Minimum",
      "difficulty": "Easy",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "sliding-window-minimum",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Sliding Window Minimum\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Sliding Window Minimum.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Sliding Window Minimum in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Sliding Window Minimum, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-009",
      "type": "optimization",
      "topicId": "monotonic-stack-queue",
      "title": "Remove K Digits",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "remove-k-digits",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Remove K Digits\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Remove K Digits.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Remove K Digits in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Remove K Digits, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-010",
      "type": "trace",
      "topicId": "monotonic-stack-queue",
      "title": "132 Pattern",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "132-pattern",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"132 Pattern\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: 132 Pattern.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate 132 Pattern in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For 132 Pattern, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-011",
      "type": "coding",
      "topicId": "monotonic-stack-queue",
      "title": "Trapping Rain Water Stack",
      "difficulty": "Hard",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "trapping-rain-water-stack",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Trapping Rain Water Stack\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Trapping Rain Water Stack.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Trapping Rain Water Stack in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Trapping Rain Water Stack, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-012",
      "type": "debugging",
      "topicId": "monotonic-stack-queue",
      "title": "Sum of Subarray Minimums",
      "difficulty": "Easy",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "sum-of-subarray-minimums",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Sum of Subarray Minimums\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Sum of Subarray Minimums.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Sum of Subarray Minimums in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Sum of Subarray Minimums, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-013",
      "type": "coding",
      "topicId": "monotonic-stack-queue",
      "title": "Asteroid Collision",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "asteroid-collision",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Asteroid Collision\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Asteroid Collision.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Asteroid Collision in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Asteroid Collision, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-014",
      "type": "coding",
      "topicId": "monotonic-stack-queue",
      "title": "Online Stock Span",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "online-stock-span",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Online Stock Span\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Online Stock Span.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Online Stock Span in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Online Stock Span, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
      "id": "monotonic-stack-queue-015",
      "type": "optimization",
      "topicId": "monotonic-stack-queue",
      "title": "Circular Next Greater Element",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "monotonic-stack-queue",
        "stack",
        "circular-next-greater-element",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Monotonic Stack / Queue with the problem \"Circular Next Greater Element\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Circular Next Greater Element.",
      "starterThought": "Before thinking about syntax, name the pattern: Monotonic Stack / Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the structure remains increasing or decreasing after every insertion/removal.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Do not start with code; first protect this invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Monotonic Stack / Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "new value arrives → remove weaker candidates → keep useful ordered candidates",
      "stepByStepBreakdown": [
        "Restate Circular Next Greater Element in terms of input, output, and the shape of the data.",
        "Spot the trigger words: next greater, next smaller, nearest greater, histogram, stock span, sliding maximum.",
        "Define the invariant: the structure remains increasing or decreasing after every insertion/removal.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Monotonic Stack / Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Circular Next Greater Element, the winning move is to make the invariant visible: the structure remains increasing or decreasing after every insertion/removal. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Monotonic Stack / Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Monotonic queues show up in rolling maxima, alert windows, time-series analytics, and online scoring.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Monotonic Stack / Queue",
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
