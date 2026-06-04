const apiRateLimiting = {
  id: 'api-design-rate-limiting-001',
  type: 'mcq',
  topicId: 'api-design',
  title: 'Choosing a Simple Rate Limiting Strategy',
  difficulty: 'Easy',
  estimatedTime: '5 min',
  tags: ['system', 'api-design', 'rate-limiting', 'junior', 'mcq', 'architecture-reasoning'],
  scenario: 'A public API is receiving too many requests from some users. The team wants a simple way to prevent abuse by allowing each user a fixed number of requests per minute.',
  question: 'Which approach is the best starting point?',
  starterThought: 'Start with the simplest control that can identify the caller and count recent usage without storing unlimited request history.',
  constraints: [
    'Limit requests per user within a short window.',
    'Keep the first implementation simple and cheap to operate.',
    'Preserve authentication so limits can be applied by user identity.'
  ],
  hints: ['Think about the simplest way to count requests within a short time window without storing unlimited history.'],
  intuition: 'Basic rate limiting is about controlling abuse close to the API boundary with a small amount of short-lived state.',
  visualExplanation: 'user request → API gateway/service → per-user counter with expiry → allow or reject',
  stepByStepBreakdown: [
    'Identify the user making the request.',
    'Increment a counter for the current time window.',
    'Allow requests while the counter is within the limit.',
    'Expire or reset the counter after the window ends.'
  ],
  bruteForceThought: 'Scanning every historical request can answer the question but becomes expensive and unnecessary for simple minute-based limits.',
  optimizationJourney: 'Move from unlimited request logs to bounded, expiring counters that match the enforcement window.',
  finalPattern: 'API Design / Rate Limiting',
  complexityAnalysis: 'Storage is bounded by active users and short expiry windows instead of unlimited request history.',
  explanation: 'A per-user counter with a short expiry window is a practical starting point for basic rate limiting. It is simple, cheap to store, and easy to reason about. Each user gets a counter that resets or expires after the configured window, such as one minute. This helps protect the API from obvious abuse without requiring a complex distributed algorithm upfront. Storing every request forever is expensive and unnecessary for basic rate limits. Adding more servers may increase capacity, but it does not control abusive behavior. Disabling authentication removes user identity, making per-user limits harder and weakening security.',
  engineeringInsight: 'Capacity and abuse control are different problems: scaling servers does not replace explicit traffic limits.',
  commonMistake: 'Trying to solve abuse by adding capacity instead of enforcing clear limits.',
  commonMistakes: [
    'Storing unbounded request history for a short-window problem.',
    'Removing authentication even though user identity is needed for per-user limits.',
    'Adding servers without reducing abusive traffic.'
  ],
  productionReality: 'Most production APIs begin with simple limits, then evolve toward distributed counters, token buckets, or gateway-managed throttling when scale requires it.',
  followUpQuestion: 'How would this change if the API runs across many regions or many gateway instances?',
  followUpQuestions: [
    'Where should counters live if traffic is load balanced?',
    'What response should clients receive when limited?',
    'How would you protect shared resources from anonymous traffic?'
  ],
  relatedConcepts: ['rate limiting', 'authentication', 'API gateway', 'backpressure'],
  references: ['HTTP 429 Too Many Requests', 'API gateway throttling patterns'],
  options: [
    'Store every request forever and scan the full history before allowing a new request',
    'Use a per-user counter with an expiry window, such as 60 seconds',
    'Add more servers so abusive users are less noticeable',
    'Disable authentication to reduce request processing time'
  ],
  correctAnswer: 1
};

const productDetailsCaching = {
  id: 'caching-product-details-001',
  type: 'mcq',
  topicId: 'caching',
  title: 'Reducing Database Load with Caching',
  difficulty: 'Medium',
  estimatedTime: '6 min',
  tags: ['system', 'caching', 'read-optimization', 'mid-level', 'mcq', 'architecture-reasoning'],
  scenario: 'An e-commerce product details page is read-heavy. Product information changes occasionally, but users view product pages thousands of times per minute.',
  question: 'What is the best improvement?',
  starterThought: 'Look for repeated reads of mostly stable data before adding more database capacity.',
  constraints: [
    'Reduce repeated database reads.',
    'Keep product data reasonably fresh.',
    'Avoid creating unnecessary write or consistency problems.'
  ],
  hints: ['Focus on reducing repeated reads for data that is frequently viewed but rarely changed.'],
  intuition: 'Caching works best when data is read much more often than it changes and the system has a clear freshness strategy.',
  visualExplanation: 'browser → API → cache hit → product details\nbrowser → API → cache miss → database → cache update',
  stepByStepBreakdown: [
    'Identify product details as read-heavy data.',
    'Serve repeated reads from cache where possible.',
    'Update or invalidate cached entries when product data changes.',
    'Monitor cache hit rate and stale data incidents.'
  ],
  bruteForceThought: 'Serving every page view directly from the database is simple but pushes unnecessary read pressure onto the primary store.',
  optimizationJourney: 'Add a cache for hot product details, then pair it with invalidation or update logic to control staleness.',
  finalPattern: 'Caching / Read Optimization',
  complexityAnalysis: 'Caching reduces read latency and database load, but adds freshness and invalidation complexity.',
  explanation: 'Caching product details is a good fit because the workload is read-heavy and the data changes less often than it is read. The cache can serve repeated requests quickly and reduce pressure on the database. To avoid stale product information, the system should update or invalidate cached entries when product data changes. Writing on every view increases database load instead of reducing it. Removing product descriptions damages the product experience and does not solve the scaling issue. Duplicating rows creates consistency problems and unnecessary storage complexity.',
  engineeringInsight: 'A cache is not just a fast store; it is a contract about acceptable freshness.',
  commonMistake: 'Adding caching without deciding how cached data becomes fresh again.',
  commonMistakes: [
    'Caching without invalidation rules.',
    'Creating duplicate database rows as a scaling shortcut.',
    'Optimizing by removing useful product content.'
  ],
  productionReality: 'Real product systems often combine cache TTLs, event-based invalidation, and monitoring for cache hit rate and stale reads.',
  followUpQuestion: 'What cache invalidation strategy would you choose when product price changes?',
  followUpQuestions: [
    'What data can tolerate short staleness?',
    'What should bypass cache?',
    'How do you measure whether the cache is helping?'
  ],
  relatedConcepts: ['cache invalidation', 'TTL', 'read-heavy workloads', 'staleness'],
  references: ['cache-aside pattern', 'read-through caching'],
  options: [
    'Cache product details and invalidate or update the cache when product data changes',
    'Write product details to the database every time a user views the page',
    'Remove product descriptions to reduce database size',
    'Use a larger database table with duplicate product rows'
  ],
  correctAnswer: 0
};

const slowEmailNotifications = {
  id: 'messaging-queues-email-notification-001',
  type: 'mcq',
  topicId: 'messaging-queues',
  title: 'Handling Slow Email Notifications',
  difficulty: 'Medium',
  estimatedTime: '6 min',
  tags: ['system', 'messaging-queues', 'async-processing', 'mid-level', 'mcq', 'architecture-reasoning'],
  scenario: 'A checkout API sends an order confirmation email before returning a response to the user. Sometimes the email provider is slow, causing checkout requests to take too long.',
  question: 'What is the best design improvement?',
  starterThought: 'Separate the critical user-facing transaction from non-critical work that can happen shortly afterward.',
  constraints: [
    'Keep checkout latency low.',
    'Do not lose email work when the provider is slow.',
    'Allow failed notifications to be retried safely.'
  ],
  hints: ['Separate the critical checkout path from work that can happen shortly after the order is accepted.'],
  intuition: 'Queues help protect critical request paths by moving slower side effects into reliable background processing.',
  visualExplanation: 'checkout API → create order → enqueue email job → return response\nworker → send email → retry on failure',
  stepByStepBreakdown: [
    'Create the order in the critical path.',
    'Publish an email job to a queue.',
    'Return the checkout response without waiting for the email provider.',
    'Let a worker send and retry the email.'
  ],
  bruteForceThought: 'Calling the email provider inline is easy but couples checkout latency to a dependency the user does not need to wait for.',
  optimizationJourney: 'Move email sending behind a durable queue and make workers handle retries, monitoring, and dead-letter behavior.',
  finalPattern: 'Messaging Queues / Async Processing',
  complexityAnalysis: 'The queue adds operational complexity but reduces user-facing latency and isolates email-provider slowdowns.',
  explanation: 'The checkout request should complete once the order is safely created. Sending the confirmation email can happen asynchronously through a queue. This keeps the user-facing checkout flow fast and makes the system more resilient when the email provider is slow or temporarily unavailable. A worker can retry failed email jobs without forcing the customer to wait. Asking users to refresh creates a poor experience and does not fix backend coupling. Browser localStorage is not reliable for server-side order communication. Blocking all new orders because of email delays couples a non-critical task to a critical revenue path.',
  engineeringInsight: 'Not every side effect belongs in the synchronous request path.',
  commonMistake: 'Making user-facing checkout depend on a slow notification provider.',
  commonMistakes: [
    'Treating email as part of the critical transaction.',
    'Retrying only from the browser.',
    'Blocking revenue paths because a notification dependency is degraded.'
  ],
  productionReality: 'Production queues need retry limits, dead-letter queues, idempotent workers, and alerts when jobs pile up.',
  followUpQuestion: 'How would you prevent the same email from being sent many times during retries?',
  followUpQuestions: [
    'What should happen if the queue is down?',
    'How do you monitor delayed email jobs?',
    'When should a job move to a dead-letter queue?'
  ],
  relatedConcepts: ['async processing', 'queues', 'retries', 'dead-letter queues'],
  references: ['outbox pattern', 'message retry patterns'],
  options: [
    'Send the email asynchronously using a queue after the order is created',
    'Ask users to refresh the checkout page until the email is sent',
    'Store the email content only in browser localStorage',
    'Block all new orders when the email provider is slow'
  ],
  correctAnswer: 0
};

const duplicatePaymentProcessing = {
  id: 'api-design-payment-idempotency-001',
  type: 'mcq',
  topicId: 'api-design',
  title: 'Preventing Duplicate Payment Processing',
  difficulty: 'Hard',
  estimatedTime: '7 min',
  tags: ['system', 'api-design', 'payments', 'idempotency', 'senior', 'mcq', 'architecture-reasoning'],
  scenario: 'A payment API sometimes receives duplicate requests because users retry after a timeout. The system must avoid charging the customer twice.',
  question: 'What is the best design choice?',
  starterThought: 'Timeouts are ambiguous: the client may not know whether the original payment succeeded, failed, or is still processing.',
  constraints: [
    'Avoid duplicate customer charges.',
    'Allow safe client retries after timeout.',
    'Preserve enough state for recovery and reconciliation.'
  ],
  hints: ['Think about how the server can recognize that two requests represent the same logical payment attempt.'],
  intuition: 'Idempotency lets clients retry uncertain operations while the server preserves one logical outcome.',
  visualExplanation: 'client payment attempt + idempotency key → API → stored result → same result for retries',
  stepByStepBreakdown: [
    'Client creates a unique idempotency key for the payment attempt.',
    'Server stores the attempt and eventual result under that key.',
    'Retries with the same key return the same result.',
    'Reconciliation uses stored attempts and provider responses.'
  ],
  bruteForceThought: 'Processing every retry independently is simple but unsafe because retries can represent the same logical payment.',
  optimizationJourney: 'Store idempotency state before calling the provider, then return the previously recorded result for repeated keys.',
  finalPattern: 'Reliability / Idempotency / Payments',
  complexityAnalysis: 'Idempotency adds storage and lifecycle rules for keys, but protects correctness for high-risk money movement.',
  explanation: 'An idempotency key lets the server safely handle retries. The client sends a unique key for a payment attempt, and the server stores the result associated with that key. If the same request is retried, the server returns the original result instead of creating another charge. This is especially important in payment systems because timeouts do not always mean the original operation failed. Rejecting all retries makes the system brittle and user-hostile. Processing every retry risks duplicate charges. Writing logs only after provider success may lose important in-flight or failed-attempt information needed for recovery and reconciliation.',
  engineeringInsight: 'For payments, correctness beats convenience: retries must be safe by design.',
  commonMistake: 'Assuming a timeout means the payment failed.',
  commonMistakes: [
    'Processing duplicate retries as new charges.',
    'Rejecting retries instead of making them safe.',
    'Recording only successful provider responses.'
  ],
  productionReality: 'Payment systems usually need idempotency records, provider references, audit logs, and reconciliation jobs.',
  followUpQuestion: 'What should happen if the same idempotency key is reused with a different amount?',
  followUpQuestions: [
    'How long should idempotency keys be retained?',
    'What fields define the same logical payment attempt?',
    'How do you reconcile unknown provider outcomes?'
  ],
  relatedConcepts: ['idempotency', 'payments', 'retries', 'reconciliation'],
  references: ['idempotent API design', 'payment retry safety'],
  options: [
    'Use an idempotency key so repeated requests with the same key return the same result',
    'Reject all payment retries permanently',
    'Process every request immediately because retries are rare',
    'Store payment logs only after the payment provider succeeds'
  ],
  correctAnswer: 0
};

const liveOrderStatusUpdates = {
  id: 'scalability-realtime-updates-001',
  type: 'mcq',
  topicId: 'scalability',
  title: 'Scaling Live Order Status Updates',
  difficulty: 'Hard',
  estimatedTime: '7 min',
  tags: ['system', 'scalability', 'websockets', 'pub-sub', 'senior', 'mcq', 'architecture-reasoning'],
  scenario: 'A delivery platform shows live order status updates to users. The first version uses WebSocket connections handled by one server. Traffic is growing, and users connected to different servers must still receive the correct updates.',
  question: 'What design is most appropriate?',
  starterThought: 'Once WebSocket connections are spread across servers, the event producer may not know which server owns the user connection.',
  constraints: [
    'Support many WebSocket servers.',
    'Deliver updates to the server holding the active connection.',
    'Avoid a single server bottleneck.'
  ],
  hints: ['When connections are spread across many servers, updates need a way to reach the server holding the user’s active connection.'],
  intuition: 'Pub/sub decouples event creation from connection ownership in real-time systems.',
  visualExplanation: 'order service → pub/sub channel → WebSocket server with user connection → user device',
  stepByStepBreakdown: [
    'Publish order status changes to a shared channel.',
    'Subscribe WebSocket servers to relevant channels or routing keys.',
    'Deliver the update from the server that owns the user connection.',
    'Scale WebSocket servers horizontally as connection count grows.'
  ],
  bruteForceThought: 'Keeping all connections on one server avoids routing complexity but creates a bottleneck and a single point of failure.',
  optimizationJourney: 'Introduce pub/sub so updates can reach whichever server currently owns the active connection.',
  finalPattern: 'Scalability / WebSockets / Pub-Sub',
  complexityAnalysis: 'Pub/sub adds messaging infrastructure and delivery semantics, but enables horizontal scaling of real-time connections.',
  explanation: 'A pub/sub layer helps scale real-time systems across multiple WebSocket servers. Order events can be published to a shared channel, and the server that has the user’s active connection can receive the event and deliver it. This avoids forcing all users onto one server and supports horizontal scaling. Frontend-only storage cannot deliver server-side state changes reliably. Forcing all users onto one server creates a bottleneck and single point of failure. Disabling live updates avoids the problem instead of designing a scalable solution.',
  engineeringInsight: 'Real-time scale is mostly a routing problem: events must find the server that owns the live connection.',
  commonMistake: 'Scaling WebSockets like stateless HTTP without planning event routing.',
  commonMistakes: [
    'Putting every connection on one server.',
    'Assuming the frontend can invent authoritative state updates.',
    'Turning off core product behavior during normal traffic growth.'
  ],
  productionReality: 'Production real-time systems need connection tracking, authorization, heartbeat handling, backpressure, and fan-out monitoring.',
  followUpQuestion: 'How would you handle a user connected from multiple devices?',
  followUpQuestions: [
    'How are users authorized for order channels?',
    'What happens if a WebSocket server disconnects?',
    'How do you avoid overwhelming slow clients?'
  ],
  relatedConcepts: ['WebSockets', 'pub/sub', 'fan-out', 'horizontal scaling'],
  references: ['publish-subscribe pattern', 'real-time messaging architectures'],
  options: [
    'Add a pub/sub layer so any server can publish updates and connected servers can deliver them to users',
    'Store all WebSocket messages in the frontend only',
    'Force all users to connect to one server forever',
    'Disable live updates during peak traffic'
  ],
  correctAnswer: 0
};

const multiRegionConsistency = {
  id: 'databases-multi-region-consistency-001',
  type: 'mcq',
  topicId: 'databases',
  title: 'Choosing a Multi-Region Consistency Strategy',
  difficulty: 'Hard',
  estimatedTime: '8 min',
  tags: ['system', 'databases', 'multi-region', 'consistency', 'principal', 'mcq', 'architecture-reasoning'],
  scenario: 'A global application serves users from multiple regions. Product browsing must be very fast worldwide, but financial transactions must remain strongly consistent.',
  question: 'What is the best architectural approach?',
  starterThought: 'Different parts of a system can have different correctness, latency, and availability requirements.',
  constraints: [
    'Keep global product browsing fast.',
    'Preserve correctness for financial transactions.',
    'Avoid forcing one consistency model onto every workflow.'
  ],
  hints: ['Different domains inside the same system can have different correctness and latency requirements.'],
  intuition: 'Principal-level system design often splits the architecture by business risk instead of applying one rule everywhere.',
  visualExplanation: 'catalog reads → replicated/eventual data for low latency\nfinancial transaction → strongly consistent write path/system of record',
  stepByStepBreakdown: [
    'Classify data by business risk.',
    'Use fast replicated reads where short staleness is acceptable.',
    'Use stronger consistency where money movement or correctness risk is high.',
    'Document the trade-off so product and engineering teams understand behavior.'
  ],
  bruteForceThought: 'Using one consistency model everywhere sounds simpler but can either slow down low-risk reads or weaken high-risk transactions.',
  optimizationJourney: 'Separate read-heavy catalog paths from financial transaction paths and choose consistency per domain.',
  finalPattern: 'Distributed Systems / Consistency / Architecture Trade-Offs',
  complexityAnalysis: 'Mixed consistency increases architecture complexity, but better matches latency and correctness needs across domains.',
  explanation: 'A strong architecture applies different consistency models based on business risk and user experience needs. Product catalog browsing is often read-heavy and can usually tolerate slightly stale data, so eventual consistency can improve global latency and availability. Financial transactions require stronger correctness guarantees because duplicate, lost, or inconsistent money movement is unacceptable. One consistency model for everything often over-constrains the system or weakens critical workflows. Browser cache is not a reliable system of record. Avoiding regional deployments may simplify consistency, but it sacrifices global latency and resilience.',
  engineeringInsight: 'Consistency is a product and risk decision, not only a database setting.',
  commonMistake: 'Treating all data as if it has the same freshness and correctness requirements.',
  commonMistakes: [
    'Using strong consistency for every global read without considering latency.',
    'Using eventual consistency for money movement without safeguards.',
    'Avoiding regional architecture instead of making trade-offs explicit.'
  ],
  productionReality: 'Global platforms often combine replicated read models, regional caches, strongly consistent ledgers, and reconciliation processes.',
  followUpQuestion: 'Which parts of the system should be the source of truth for financial transactions?',
  followUpQuestions: [
    'What data can be stale and for how long?',
    'How are cross-region conflicts detected?',
    'What user experience is acceptable during regional failure?'
  ],
  relatedConcepts: ['eventual consistency', 'strong consistency', 'multi-region architecture', 'system of record'],
  references: ['CAP theorem trade-offs', 'distributed database consistency models'],
  options: [
    'Use the same consistency model for every part of the system',
    'Use eventual consistency for read-heavy catalog data and stronger consistency for financial transactions',
    'Store all data only in one browser cache to avoid database complexity',
    'Disable regional deployments because consistency is hard'
  ],
  correctAnswer: 1
};

export const systemDesignMcqsByTopic = {
  'api-design': [apiRateLimiting, duplicatePaymentProcessing],
  caching: [productDetailsCaching],
  'messaging-queues': [slowEmailNotifications],
  scalability: [liveOrderStatusUpdates],
  databases: [multiRegionConsistency]
};

export default systemDesignMcqsByTopic;
