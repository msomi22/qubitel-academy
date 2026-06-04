const topic = {
  "id": "greedy",
  "name": "GREED — Greedy",
  "category": "dsa",
  "description": "Make a locally best choice only when an invariant or exchange argument proves it remains globally safe.",
  "questions": [
    {
      "id": "greedy-001",
      "type": "coding",
      "topicId": "greedy",
      "title": "Maximum Non-Overlapping Meetings",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "maximum-non-overlapping-meetings",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Maximum Non-Overlapping Meetings\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Maximum Non-Overlapping Meetings.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Maximum Non-Overlapping Meetings in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Maximum Non-Overlapping Meetings, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-002",
      "type": "coding",
      "topicId": "greedy",
      "title": "Minimum Arrows to Burst Balloons",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "minimum-arrows-to-burst-balloons",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Minimum Arrows to Burst Balloons\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Minimum Arrows to Burst Balloons.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Minimum Arrows to Burst Balloons in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Minimum Arrows to Burst Balloons, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-003",
      "type": "optimization",
      "topicId": "greedy",
      "title": "Jump Game Reachability",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "jump-game-reachability",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Jump Game Reachability\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Jump Game Reachability.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Jump Game Reachability in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Jump Game Reachability, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-004",
      "type": "trace",
      "topicId": "greedy",
      "title": "Jump Game Minimum Jumps",
      "difficulty": "Easy",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "jump-game-minimum-jumps",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Jump Game Minimum Jumps\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Jump Game Minimum Jumps.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Jump Game Minimum Jumps in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Jump Game Minimum Jumps, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-005",
      "type": "coding",
      "topicId": "greedy",
      "title": "Gas Station Circuit",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "gas-station-circuit",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Gas Station Circuit\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Gas Station Circuit.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Gas Station Circuit in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Gas Station Circuit, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-006",
      "type": "debugging",
      "topicId": "greedy",
      "title": "Assign Cookies",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "assign-cookies",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Assign Cookies\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Assign Cookies.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Assign Cookies in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Assign Cookies, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-007",
      "type": "coding",
      "topicId": "greedy",
      "title": "Lemonade Change",
      "difficulty": "Hard",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "lemonade-change",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Lemonade Change\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Lemonade Change.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Lemonade Change in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Lemonade Change, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-008",
      "type": "coding",
      "topicId": "greedy",
      "title": "Remove K Digits",
      "difficulty": "Easy",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "remove-k-digits",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Remove K Digits\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Remove K Digits.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Remove K Digits in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Remove K Digits, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-009",
      "type": "optimization",
      "topicId": "greedy",
      "title": "Merge Intervals",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "merge-intervals",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Merge Intervals\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Merge Intervals.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Merge Intervals in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Merge Intervals, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-010",
      "type": "trace",
      "topicId": "greedy",
      "title": "Insert Interval",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "insert-interval",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Insert Interval\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Insert Interval.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Insert Interval in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Insert Interval, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-011",
      "type": "coding",
      "topicId": "greedy",
      "title": "Task Scheduler",
      "difficulty": "Hard",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "task-scheduler",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Task Scheduler\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Task Scheduler.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Task Scheduler in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Task Scheduler, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-012",
      "type": "debugging",
      "topicId": "greedy",
      "title": "Partition Labels",
      "difficulty": "Easy",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "partition-labels",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Partition Labels\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Partition Labels.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Partition Labels in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Partition Labels, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-013",
      "type": "coding",
      "topicId": "greedy",
      "title": "Candy Distribution",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "candy-distribution",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Candy Distribution\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Candy Distribution.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Candy Distribution in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Candy Distribution, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-014",
      "type": "coding",
      "topicId": "greedy",
      "title": "Huffman Merge Cost",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "huffman-merge-cost",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Huffman Merge Cost\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Huffman Merge Cost.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Huffman Merge Cost in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Huffman Merge Cost, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
      "id": "greedy-015",
      "type": "optimization",
      "topicId": "greedy",
      "title": "Boats to Save People",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "greedy",
        "greed",
        "boats-to-save-people",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Greedy with the problem \"Boats to Save People\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Boats to Save People.",
      "starterThought": "Before thinking about syntax, name the pattern: Greedy. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: each local choice leaves at least one optimal solution still possible.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Do not start with code; first protect this invariant: each local choice leaves at least one optimal solution still possible.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Greedy is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "sort by the proof key → take safe choice → shrink remaining problem",
      "stepByStepBreakdown": [
        "Restate Boats to Save People in terms of input, output, and the shape of the data.",
        "Spot the trigger words: maximize/minimize, scheduling, intervals, deadlines, choose least/most.",
        "Define the invariant: each local choice leaves at least one optimal solution still possible.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Greedy",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Boats to Save People, the winning move is to make the invariant visible: each local choice leaves at least one optimal solution still possible. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Greedy teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Greedy reasoning appears in schedulers, load shedding, batch selection, cache eviction, and resource allocation.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Greedy",
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
