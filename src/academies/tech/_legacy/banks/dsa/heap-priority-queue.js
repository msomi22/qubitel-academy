const topic = {
  "id": "heap-priority-queue",
  "name": "HEAP — Heap / Priority Queue",
  "category": "dsa",
  "description": "Keep candidates ordered by priority so the best next item is cheap to access.",
  "questions": [
    {
      "id": "heap-priority-queue-001",
      "type": "coding",
      "topicId": "heap-priority-queue",
      "title": "Top K Frequent Elements",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "top-k-frequent-elements",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Top K Frequent Elements\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Top K Frequent Elements.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Top K Frequent Elements in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Top K Frequent Elements, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-002",
      "type": "coding",
      "topicId": "heap-priority-queue",
      "title": "Kth Largest Element",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "kth-largest-element",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Kth Largest Element\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Kth Largest Element.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Kth Largest Element in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Kth Largest Element, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-003",
      "type": "optimization",
      "topicId": "heap-priority-queue",
      "title": "Merge K Sorted Lists",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "merge-k-sorted-lists",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Merge K Sorted Lists\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Merge K Sorted Lists.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Merge K Sorted Lists in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Merge K Sorted Lists, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-004",
      "type": "trace",
      "topicId": "heap-priority-queue",
      "title": "Running Median",
      "difficulty": "Easy",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "running-median",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Running Median\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Running Median.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Running Median in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Running Median, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-005",
      "type": "coding",
      "topicId": "heap-priority-queue",
      "title": "Meeting Rooms Required",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "meeting-rooms-required",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Meeting Rooms Required\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Meeting Rooms Required.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Meeting Rooms Required in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Meeting Rooms Required, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-006",
      "type": "debugging",
      "topicId": "heap-priority-queue",
      "title": "Reorganize String",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "reorganize-string",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Reorganize String\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Reorganize String.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Reorganize String in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Reorganize String, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-007",
      "type": "coding",
      "topicId": "heap-priority-queue",
      "title": "Task Scheduler With Cooldown",
      "difficulty": "Hard",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "task-scheduler-with-cooldown",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Task Scheduler With Cooldown\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Task Scheduler With Cooldown.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Task Scheduler With Cooldown in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Task Scheduler With Cooldown, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-008",
      "type": "coding",
      "topicId": "heap-priority-queue",
      "title": "Dijkstra Shortest Path",
      "difficulty": "Easy",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "dijkstra-shortest-path",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Dijkstra Shortest Path\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Dijkstra Shortest Path.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Dijkstra Shortest Path in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Dijkstra Shortest Path, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-009",
      "type": "optimization",
      "topicId": "heap-priority-queue",
      "title": "K Closest Points",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "k-closest-points",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"K Closest Points\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: K Closest Points.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate K Closest Points in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For K Closest Points, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-010",
      "type": "trace",
      "topicId": "heap-priority-queue",
      "title": "Find K Pairs With Smallest Sums",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "find-k-pairs-with-smallest-sums",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Find K Pairs With Smallest Sums\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Find K Pairs With Smallest Sums.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Find K Pairs With Smallest Sums in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Find K Pairs With Smallest Sums, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-011",
      "type": "coding",
      "topicId": "heap-priority-queue",
      "title": "Last Stone Weight",
      "difficulty": "Hard",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "last-stone-weight",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Last Stone Weight\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Last Stone Weight.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Last Stone Weight in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Last Stone Weight, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-012",
      "type": "debugging",
      "topicId": "heap-priority-queue",
      "title": "Minimum Cost to Connect Ropes",
      "difficulty": "Easy",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "minimum-cost-to-connect-ropes",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Minimum Cost to Connect Ropes\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Minimum Cost to Connect Ropes.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Minimum Cost to Connect Ropes in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Minimum Cost to Connect Ropes, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-013",
      "type": "coding",
      "topicId": "heap-priority-queue",
      "title": "Smallest Range Covering K Lists",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "smallest-range-covering-k-lists",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Smallest Range Covering K Lists\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Smallest Range Covering K Lists.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Smallest Range Covering K Lists in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Smallest Range Covering K Lists, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-014",
      "type": "coding",
      "topicId": "heap-priority-queue",
      "title": "IPO Capital Maximization",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "ipo-capital-maximization",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"IPO Capital Maximization\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: IPO Capital Maximization.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate IPO Capital Maximization in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For IPO Capital Maximization, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
      "id": "heap-priority-queue-015",
      "type": "optimization",
      "topicId": "heap-priority-queue",
      "title": "Sliding Window Median",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "heap-priority-queue",
        "heap",
        "sliding-window-median",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Heap / Priority Queue with the problem \"Sliding Window Median\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Sliding Window Median.",
      "starterThought": "Before thinking about syntax, name the pattern: Heap / Priority Queue. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: the heap top is always the best next candidate according to the selected priority.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: top K, kth largest, stream, merge K, scheduling, running median.",
        "Do not start with code; first protect this invariant: the heap top is always the best next candidate according to the selected priority.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Heap / Priority Queue is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "push candidates → pop best → add next candidate → repeat",
      "stepByStepBreakdown": [
        "Restate Sliding Window Median in terms of input, output, and the shape of the data.",
        "Spot the trigger words: top K, kth largest, stream, merge K, scheduling, running median.",
        "Define the invariant: the heap top is always the best next candidate according to the selected priority.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Heap / Priority Queue",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Sliding Window Median, the winning move is to make the invariant visible: the heap top is always the best next candidate according to the selected priority. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Heap / Priority Queue teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Heaps power job schedulers, delayed queues, retry systems, ranking, alert prioritization, and event simulation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Heap / Priority Queue",
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
