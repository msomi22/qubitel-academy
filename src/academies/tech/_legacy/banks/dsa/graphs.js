const topic = {
  "id": "graphs",
  "name": "NODES — Graph BFS / DFS",
  "category": "dsa",
  "description": "Model relationships as nodes and edges, then traverse for reachability, components, distance, or ordering.",
  "questions": [
    {
      "id": "graphs-001",
      "type": "coding",
      "topicId": "graphs",
      "title": "Number of Islands",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "number-of-islands",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Number of Islands\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Number of Islands.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Number of Islands in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Number of Islands, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-002",
      "type": "coding",
      "topicId": "graphs",
      "title": "Shortest Path in Binary Matrix",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "shortest-path-in-binary-matrix",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Shortest Path in Binary Matrix\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Shortest Path in Binary Matrix.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Shortest Path in Binary Matrix in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Shortest Path in Binary Matrix, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-003",
      "type": "optimization",
      "topicId": "graphs",
      "title": "Rotting Oranges",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "rotting-oranges",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Rotting Oranges\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Rotting Oranges.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Rotting Oranges in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Rotting Oranges, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-004",
      "type": "trace",
      "topicId": "graphs",
      "title": "Course Schedule Feasibility",
      "difficulty": "Easy",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "course-schedule-feasibility",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Course Schedule Feasibility\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Course Schedule Feasibility.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Course Schedule Feasibility in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Course Schedule Feasibility, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-005",
      "type": "coding",
      "topicId": "graphs",
      "title": "Topological Course Order",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "topological-course-order",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Topological Course Order\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Topological Course Order.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Topological Course Order in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Topological Course Order, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-006",
      "type": "debugging",
      "topicId": "graphs",
      "title": "Clone Graph",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "clone-graph",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Clone Graph\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Clone Graph.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Clone Graph in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Clone Graph, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-007",
      "type": "coding",
      "topicId": "graphs",
      "title": "Detect Cycle in Undirected Graph",
      "difficulty": "Hard",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "detect-cycle-in-undirected-graph",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Detect Cycle in Undirected Graph\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Detect Cycle in Undirected Graph.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Detect Cycle in Undirected Graph in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Detect Cycle in Undirected Graph, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-008",
      "type": "coding",
      "topicId": "graphs",
      "title": "Detect Cycle in Directed Graph",
      "difficulty": "Easy",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "detect-cycle-in-directed-graph",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Detect Cycle in Directed Graph\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Detect Cycle in Directed Graph.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Detect Cycle in Directed Graph in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Detect Cycle in Directed Graph, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-009",
      "type": "optimization",
      "topicId": "graphs",
      "title": "Word Ladder",
      "difficulty": "Medium",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "word-ladder",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Word Ladder\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Word Ladder.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Word Ladder in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Word Ladder, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-010",
      "type": "trace",
      "topicId": "graphs",
      "title": "Pacific Atlantic Water Flow",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "pacific-atlantic-water-flow",
        "trace",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Pacific Atlantic Water Flow\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Show the first few transitions by hand so the invariant becomes visible instead of abstract. Problem focus: Pacific Atlantic Water Flow.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Pacific Atlantic Water Flow in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Pacific Atlantic Water Flow, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-011",
      "type": "coding",
      "topicId": "graphs",
      "title": "Evaluate Division",
      "difficulty": "Hard",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "evaluate-division",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Evaluate Division\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Evaluate Division.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Evaluate Division in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Evaluate Division, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-012",
      "type": "debugging",
      "topicId": "graphs",
      "title": "Network Delay Time",
      "difficulty": "Easy",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "network-delay-time",
        "debugging",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Network Delay Time\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Explain which invariant is probably being violated and what test case would expose it. Problem focus: Network Delay Time.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Network Delay Time in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Network Delay Time, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-013",
      "type": "coding",
      "topicId": "graphs",
      "title": "Minimum Genetic Mutation",
      "difficulty": "Medium",
      "estimatedTime": "6 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "minimum-genetic-mutation",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Minimum Genetic Mutation\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Design the algorithm and explain the invariant clearly. You do not need to write final code; focus on how a senior engineer would reason toward the solution. Problem focus: Minimum Genetic Mutation.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Minimum Genetic Mutation in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Minimum Genetic Mutation, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-014",
      "type": "coding",
      "topicId": "graphs",
      "title": "Flood Fill",
      "difficulty": "Medium",
      "estimatedTime": "8 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "flood-fill",
        "coding",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Flood Fill\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Walk through the best approach, including what state you maintain and exactly when the answer changes. Problem focus: Flood Fill.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Flood Fill in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Flood Fill, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
      "id": "graphs-015",
      "type": "optimization",
      "topicId": "graphs",
      "title": "Bipartite Graph Check",
      "difficulty": "Hard",
      "estimatedTime": "10 min",
      "tags": [
        "dsa",
        "graphs",
        "nodes",
        "bipartite-graph-check",
        "optimization",
        "coding-reasoning"
      ],
      "scenario": "You are practicing Graph BFS / DFS with the problem \"Bipartite Graph Check\". The goal is not to memorize a solution, but to discover the invariant, explain the state changes, and build the intuition that lets you solve variants under interview pressure.",
      "question": "Start from brute force, then explain the observation that removes unnecessary work and leads to the intended pattern. Problem focus: Bipartite Graph Check.",
      "starterThought": "Before thinking about syntax, name the pattern: Graph BFS / DFS. Then ask: what state changes one step at a time, and what must remain true after every change? For this problem, the key invariant is: visited nodes are marked at the right time so each reachable entity is processed correctly.",
      "constraints": [
        "Input can be large enough that brute force should be treated as a learning baseline, not the final answer.",
        "Explain the invariant before describing implementation details.",
        "Handle empty, tiny, duplicate-heavy, and boundary-case inputs intentionally.",
        "State time and space complexity in terms of the input size."
      ],
      "hints": [
        "Look for the trigger: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Do not start with code; first protect this invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Use one tiny example and narrate the state after each step.",
        "Ask what work can be reused instead of recomputed."
      ],
      "intuition": "The intuition is that Graph BFS / DFS is not a trick; it is a disciplined way to avoid repeated work. Once you can say what remains true after every step, the implementation becomes a translation of the invariant instead of guesswork.",
      "visualExplanation": "node → neighbors → frontier/layer → next frontier",
      "stepByStepBreakdown": [
        "Restate Bipartite Graph Check in terms of input, output, and the shape of the data.",
        "Spot the trigger words: nodes, edges, grid, maze, reachability, dependencies, shortest path.",
        "Define the invariant: visited nodes are marked at the right time so each reachable entity is processed correctly.",
        "Walk through a small example and update only the minimum necessary state.",
        "Explain why the movement/state update cannot skip a better answer.",
        "Finish with complexity and edge cases."
      ],
      "bruteForceThought": "The brute-force idea is useful as a baseline: try every candidate and compute the answer directly. It is usually too slow, but it reveals what repeated work the optimized pattern must remove.",
      "optimizationJourney": "Move from recomputation to maintained state. The moment you can update the answer using only what changed since the previous step, you have found the senior-level path.",
      "finalPattern": "Graph BFS / DFS",
      "complexityAnalysis": "Target complexity should be justified by the pattern. Explain what is processed once, what is stored, and why the total work does not secretly become quadratic.",
      "explanation": "For Bipartite Graph Check, the winning move is to make the invariant visible: visited nodes are marked at the right time so each reachable entity is processed correctly. Then solve the problem by updating only the state needed to preserve that truth. This is why the explanation matters more than code syntax: once the mental model is correct, many variants become straightforward.",
      "engineeringInsight": "Graph BFS / DFS teaches incremental reasoning: keep just enough state, update it safely, and prove no answer was skipped.",
      "commonMistake": "Jumping into code before stating the invariant. That often creates off-by-one bugs, duplicate handling bugs, or hidden quadratic behavior.",
      "commonMistakes": [
        "Starting with syntax instead of the invariant.",
        "Updating the answer before the state is valid.",
        "Forgetting boundary cases such as empty input, duplicates, or one-element input.",
        "Stating Big-O without explaining why each item is processed a bounded number of times."
      ],
      "productionReality": "Graph traversal maps to dependency analysis, service topology, authorization graphs, workflow engines, and incident blast radius.",
      "followUpQuestion": "How would the approach change if the input were streaming, memory were limited, or the data contained adversarial edge cases?",
      "followUpQuestions": [
        "Can you explain the same solution using only a tiny example?",
        "What input breaks the brute-force version first?",
        "What metric would prove the optimized approach is actually better?",
        "How would you test the boundary cases?"
      ],
      "relatedConcepts": [
        "Graph BFS / DFS",
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
