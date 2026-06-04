const topic = {
  "id": "api-design",
  "name": "API Design",
  "category": "system",
  "description": "Create clear, secure, versioned, reliable APIs with strong contracts and operational behavior.",
  "questions": [
    {
      "id": "api-design-001",
      "type": "system-design",
      "topicId": "api-design",
      "title": "Design REST Resource URLs",
      "difficulty": "Medium",
      "estimatedTime": "7 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "design-rest-resource-urls",
        "system-design",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Design REST Resource URLs\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Propose the design decision and defend the operational trade-offs. Focus on failure behavior, scale, and client impact. Problem focus: Design REST Resource URLs.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Design REST Resource URLs, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-002",
      "type": "production-scenario",
      "topicId": "api-design",
      "title": "Idempotent POST Requests",
      "difficulty": "Medium",
      "estimatedTime": "9 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "idempotent-post-requests",
        "production-scenario",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Idempotent POST Requests\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Reason through the operational behavior under load, partial failure, and retries. Problem focus: Idempotent POST Requests.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Idempotent POST Requests, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-003",
      "type": "system-design",
      "topicId": "api-design",
      "title": "Pagination Strategy",
      "difficulty": "Hard",
      "estimatedTime": "12 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "pagination-strategy",
        "system-design",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Pagination Strategy\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Propose the design decision and defend the operational trade-offs. Focus on failure behavior, scale, and client impact. Problem focus: Pagination Strategy.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Pagination Strategy, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-004",
      "type": "mcq",
      "topicId": "api-design",
      "title": "Filtering and Sorting",
      "difficulty": "Easy",
      "estimatedTime": "7 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "filtering-and-sorting",
        "mcq",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Filtering and Sorting\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Choose the best answer, then read the explanation to understand the operational reason behind it. Problem focus: Filtering and Sorting.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Filtering and Sorting, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ],
      "options": [
        "Use explicit contracts, backpressure, idempotency, and observable failure behavior.",
        "Return generic failures and let clients retry as aggressively as they want.",
        "Hide overload symptoms by delaying every request indefinitely.",
        "Scale only the frontend and assume backend dependencies will absorb the load."
      ],
      "correctAnswer": 0
    },
    {
      "id": "api-design-005",
      "type": "production-scenario",
      "topicId": "api-design",
      "title": "API Versioning",
      "difficulty": "Medium",
      "estimatedTime": "9 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "api-versioning",
        "production-scenario",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"API Versioning\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Identify the failure mode and propose the safest production-grade mitigation. Problem focus: API Versioning.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For API Versioning, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-006",
      "type": "system-design",
      "topicId": "api-design",
      "title": "Error Response Format",
      "difficulty": "Medium",
      "estimatedTime": "12 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "error-response-format",
        "system-design",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Error Response Format\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Explain which architecture choice best protects correctness and stability as the system grows. Problem focus: Error Response Format.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Error Response Format, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-007",
      "type": "production-scenario",
      "topicId": "api-design",
      "title": "Protecting Public APIs During Traffic Spikes",
      "difficulty": "Hard",
      "estimatedTime": "9 min",
      "tags": [
        "system",
        "api-design",
        "rate-limiting",
        "http",
        "retries",
        "resilience",
        "production-scenario",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Protecting Public APIs During Traffic Spikes\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Identify the failure mode and propose the safest production-grade mitigation. Problem focus: Protecting Public APIs During Traffic Spikes.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Protecting Public APIs During Traffic Spikes, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "RFC 6585 HTTP 429 Too Many Requests",
        "MDN Retry-After header",
        "Google SRE overload handling principles"
      ]
    },
    {
      "id": "api-design-008",
      "type": "system-design",
      "topicId": "api-design",
      "title": "Authentication and Authorization",
      "difficulty": "Easy",
      "estimatedTime": "9 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "authentication-and-authorization",
        "system-design",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Authentication and Authorization\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Explain which architecture choice best protects correctness and stability as the system grows. Problem focus: Authentication and Authorization.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Authentication and Authorization, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-009",
      "type": "mcq",
      "topicId": "api-design",
      "title": "OpenAPI Contract",
      "difficulty": "Medium",
      "estimatedTime": "12 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "openapi-contract",
        "mcq",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"OpenAPI Contract\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Choose the best answer, then read the explanation to understand the operational reason behind it. Problem focus: OpenAPI Contract.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For OpenAPI Contract, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ],
      "options": [
        "Use explicit contracts, backpressure, idempotency, and observable failure behavior.",
        "Return generic failures and let clients retry as aggressively as they want.",
        "Hide overload symptoms by delaying every request indefinitely.",
        "Scale only the frontend and assume backend dependencies will absorb the load."
      ],
      "correctAnswer": 0
    },
    {
      "id": "api-design-010",
      "type": "production-scenario",
      "topicId": "api-design",
      "title": "Webhook Design",
      "difficulty": "Medium",
      "estimatedTime": "7 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "webhook-design",
        "production-scenario",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Webhook Design\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Reason through the operational behavior under load, partial failure, and retries. Problem focus: Webhook Design.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Webhook Design, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-011",
      "type": "system-design",
      "topicId": "api-design",
      "title": "Partial Updates",
      "difficulty": "Hard",
      "estimatedTime": "9 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "partial-updates",
        "system-design",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Partial Updates\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Propose the design decision and defend the operational trade-offs. Focus on failure behavior, scale, and client impact. Problem focus: Partial Updates.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Partial Updates, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-012",
      "type": "production-scenario",
      "topicId": "api-design",
      "title": "Bulk API Endpoint",
      "difficulty": "Easy",
      "estimatedTime": "12 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "bulk-api-endpoint",
        "production-scenario",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Bulk API Endpoint\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Reason through the operational behavior under load, partial failure, and retries. Problem focus: Bulk API Endpoint.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Bulk API Endpoint, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-013",
      "type": "system-design",
      "topicId": "api-design",
      "title": "GraphQL vs REST",
      "difficulty": "Medium",
      "estimatedTime": "7 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "graphql-vs-rest",
        "system-design",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"GraphQL vs REST\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Propose the design decision and defend the operational trade-offs. Focus on failure behavior, scale, and client impact. Problem focus: GraphQL vs REST.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For GraphQL vs REST, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    },
    {
      "id": "api-design-014",
      "type": "mcq",
      "topicId": "api-design",
      "title": "Backward Compatibility",
      "difficulty": "Medium",
      "estimatedTime": "9 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "backward-compatibility",
        "mcq",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Backward Compatibility\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Choose the best answer, then read the explanation to understand the operational reason behind it. Problem focus: Backward Compatibility.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Backward Compatibility, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ],
      "options": [
        "Use explicit contracts, backpressure, idempotency, and observable failure behavior.",
        "Return generic failures and let clients retry as aggressively as they want.",
        "Hide overload symptoms by delaying every request indefinitely.",
        "Scale only the frontend and assume backend dependencies will absorb the load."
      ],
      "correctAnswer": 0
    },
    {
      "id": "api-design-015",
      "type": "production-scenario",
      "topicId": "api-design",
      "title": "Observability in APIs",
      "difficulty": "Hard",
      "estimatedTime": "12 min",
      "tags": [
        "system",
        "api-design",
        "api",
        "observability-in-apis",
        "production-scenario",
        "architecture-reasoning"
      ],
      "scenario": "You are designing a production system related to API Design. The case is \"Observability in APIs\". The goal is to reason like a senior engineer: protect users, protect dependencies, and make failure behavior explicit.",
      "question": "Identify the failure mode and propose the safest production-grade mitigation. Problem focus: Observability in APIs.",
      "starterThought": "First separate the product need from the operational risk. API Design decisions are senior-level because they shape how the system behaves when reality becomes messy.",
      "constraints": [
        "Assume real traffic, partial failures, retries, and monitoring gaps.",
        "Prefer designs that degrade safely instead of failing silently.",
        "Call out latency, consistency, cost, and operational complexity trade-offs.",
        "Explain what metric or signal proves the design is working."
      ],
      "hints": [
        "Look for the system pressure: status codes, pagination, versioning, idempotency, rate limits, error contracts.",
        "Think about what happens when clients retry, dependencies slow down, or data becomes hot.",
        "Prefer explicit contracts and backpressure over silent failure.",
        "A senior answer includes observability and rollback, not only the happy path."
      ],
      "intuition": "The intuition is that architecture is controlled trade-off management. The best answer is not the fanciest component; it is the design that keeps the system understandable, stable, observable, and recoverable under pressure.",
      "visualExplanation": "traffic/users → API/service boundary → dependency/resource → feedback signal\nThe design should control pressure before the weakest dependency collapses.",
      "stepByStepBreakdown": [
        "Restate the system pressure or failure mode in plain language.",
        "Identify the design area: API Design.",
        "Choose the mechanism that controls load, correctness, or coordination.",
        "Describe what happens during normal traffic, spikes, dependency failure, and retries.",
        "Add observability: metrics, logs, alerts, and safe rollback behavior.",
        "Name the trade-off you accept and why it is safer than the alternatives."
      ],
      "bruteForceThought": "The naive design usually works at small scale: direct calls, simple storage, no throttling, minimal observability. It fails when traffic, failure modes, or data volume become non-trivial.",
      "optimizationJourney": "Move from a happy-path design to an operational design: add limits, safe retries, idempotency, isolation, observability, and rollback paths only where the risk justifies the complexity.",
      "finalPattern": "API Design",
      "complexityAnalysis": "Complexity is operational: latency, throughput, storage cost, coordination overhead, consistency guarantees, and human debugging cost all matter.",
      "explanation": "For Observability in APIs, the best answer is the one that makes system behavior explicit under stress. A senior engineer designs not only for successful requests, but also for overload, retries, partial failure, stale data, observability, and safe recovery.",
      "engineeringInsight": "Good system design is operational empathy: you design the contract so services, clients, and humans can behave safely during failure.",
      "commonMistake": "Optimizing for the architecture diagram while ignoring retry storms, backpressure, data growth, ownership, and observability.",
      "commonMistakes": [
        "Designing only the happy path.",
        "Ignoring retries and idempotency.",
        "Adding distributed components without explaining the new failure modes.",
        "Forgetting metrics, alerts, dashboards, and rollback."
      ],
      "productionReality": "Bad API behavior can turn a partial outage into a full outage through retries, ambiguity, and missing limits.",
      "followUpQuestion": "How would this design behave during a regional outage, a dependency slowdown, or a 10x traffic spike?",
      "followUpQuestions": [
        "What fails first at 10x traffic?",
        "How do clients know whether to retry?",
        "What is the rollback plan?",
        "Which metric would alert before users complain?"
      ],
      "relatedConcepts": [
        "API Design",
        "trade-offs",
        "failure modes",
        "observability"
      ],
      "references": [
        "Google SRE principles",
        "AWS Well-Architected reliability guidance",
        "HTTP and distributed systems best practices"
      ]
    }
  ]
};

export default topic;
