// Canonical URL shortener system-design walkthrough.
// This is the current learner-facing implementation that follows the newer
// rich content approach: requirements, APIs, data model, flows, trade-offs,
// scoring rubric, observability, and production considerations.
// Related legacy wrapper: `scalability-url-shortener-001.js`, which is kept as
// a review/scoring drill for the legacy bank version, not as the primary
// teaching walkthrough.

import { defineComplexSystemDesignProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineComplexSystemDesignProblem({
  id: 'scalability-url-shortener-v2',
  topicId: 'scalability',
  title: 'Design a URL Shortener',
  difficulty: 'Medium',
  scenario: 'You are asked to design a URL shortener similar to Bitly.',
  prompt: 'Design a URL shortener that supports creating short links, redirecting users, tracking analytics, link expiry, custom aliases, abuse prevention, and high availability.',
  tags: ['system-design', 'scalability', 'url-shortener', 'high-availability'],
  requirements: {
    functional: [
      'Create a short link from a long URL.',
      'Redirect users from a short code to the original long URL.',
      'Support optional custom aliases with uniqueness checks.',
      'Support link expiry and disabled-link behavior.',
      'Track analytics such as clicks, referrer, device, timestamp, and coarse location.',
      'Provide basic create/manage APIs for authenticated users.'
    ],
    nonFunctional: [
      'Keep redirect latency low because redirect is the hottest path.',
      'Design for high availability across multiple instances or zones.',
      'Optimize for read-heavy traffic and hot short links.',
      'Keep analytics eventually consistent so click tracking does not slow redirects.',
      'Use safe uniqueness guarantees for generated codes and custom aliases.',
      'Make the system observable with metrics, logs, alerts, and operational controls.'
    ]
  },
  constraints: [
    'Assume redirect traffic is much higher than create-link traffic.',
    'Assume some links can become very hot and should be cached.',
    'Assume users may retry create requests, so collision and idempotency behavior matter.',
    'Assume analytics can lag briefly and be eventually consistent.',
    'Assume abusive users may try to create phishing, malware, spam, or brand-impersonation links.'
  ],
  rendering: {
    variant: 'architecture-case-study',
    density: 'detailed',
    accent: 'blue'
  },
  body: [
    {
      type: 'section',
      title: 'Requirements clarification',
      content: 'Start by separating the critical user-facing path from secondary features. The system must create short links, redirect users quickly, support expiry and custom aliases, collect analytics, prevent obvious abuse, and remain highly available during traffic spikes.'
    },
    {
      type: 'table',
      title: 'Requirements table',
      columns: ['Area', 'Requirement', 'Notes'],
      rows: [
        ['Create link', 'Accept a long URL and return a short code.', 'Validate URL format, normalize input, and reject unsafe schemes.'],
        ['Redirect', 'Resolve a short code and redirect to the long URL.', 'This is the hottest path and should be optimized for low latency.'],
        ['Analytics', 'Track clicks, timestamp, referrer, coarse location, device, and user agent.', 'Collect asynchronously so analytics does not slow redirects.'],
        ['Expiry', 'Allow links to expire at a configured time.', 'Expired links should not redirect and can be cleaned up later.'],
        ['Custom aliases', 'Allow users to request a readable short code.', 'Must enforce uniqueness and reserved-word rules.'],
        ['Abuse prevention', 'Detect phishing, malware, spam, and excessive creation attempts.', 'Use rate limits, blocklists, scanning, and reporting workflows.'],
        ['Availability', 'Keep redirects available even if analytics or cleanup workers are degraded.', 'Prefer stateless services and replicated storage.']
      ]
    },
    {
      type: 'section',
      title: 'API design',
      body: [
        {
          type: 'code',
          language: 'http',
          code: 'POST /api/v1/links\n{\n  "longUrl": "https://example.com/some/page",\n  "customAlias": "launch",\n  "expiresAt": "2026-12-31T23:59:59Z"\n}\n\n201 Created\n{\n  "shortCode": "aB72xQ",\n  "shortUrl": "https://sho.rt/aB72xQ",\n  "expiresAt": "2026-12-31T23:59:59Z"\n}\n\nGET /{shortCode}\n302 Found\nLocation: https://example.com/some/page\n\nGET /api/v1/links/{shortCode}/analytics?from=2026-01-01&to=2026-01-31'
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Interview framing',
          content: 'Make create-link correctness strong, but keep redirect reads extremely fast. Treat analytics as eventually consistent.'
        }
      ]
    },
    {
      type: 'table',
      title: 'Data model',
      columns: ['Table / store', 'Important fields', 'Purpose'],
      rows: [
        ['short_links', 'short_code PK, long_url, user_id, created_at, expires_at, status, is_custom_alias', 'Authoritative mapping from short code to destination.'],
        ['alias_reservations', 'alias PK, owner_id, reserved_at, status', 'Optional helper for custom alias uniqueness and reserved aliases.'],
        ['click_events', 'event_id, short_code, clicked_at, referrer, user_agent, ip_hash, country, device_type', 'Append-only analytics events written asynchronously.'],
        ['daily_link_stats', 'short_code, date, clicks, unique_visitors, top_referrers', 'Aggregated analytics optimized for dashboard reads.'],
        ['abuse_rules', 'pattern, rule_type, severity, enabled', 'Block suspicious domains, aliases, or creation patterns.']
      ]
    },
    {
      type: 'section',
      title: 'Short code generation',
      content: 'A practical default is to generate random Base62 codes with enough entropy, then insert them with a unique constraint on short_code. For example, 7 Base62 characters gives a large keyspace while keeping URLs readable. A dedicated short-code service can own generation policy so API servers stay stateless.'
    },
    {
      type: 'comparison',
      title: 'Short code strategy trade-offs',
      items: [
        { label: 'Random Base62', content: 'Simple, hard to guess, horizontally friendly. It needs collision retry logic and good randomness.' },
        { label: 'Counter + Base62', content: 'No random collision and compact codes. It can reveal scale, needs careful sharding, and may create hot counters.' },
        { label: 'Hash long URL', content: 'Deterministic and easy to reproduce. It may leak patterns, needs collision handling, and duplicate-long-URL semantics must be clear.' },
        { label: 'Custom alias', content: 'Human friendly and useful for campaigns. It needs strong uniqueness checks, moderation, reserved words, and abuse controls.' }
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Collision handling',
      content: 'Never assume generated codes are unique. Put a unique index on short_code. On conflict, retry with a new random code a small number of times, then fail safely or increase code length. For custom aliases, do a conditional insert so two users cannot claim the same alias concurrently.'
    },
    {
      type: 'flow',
      title: 'Redirect flow',
      steps: [
        'Client requests GET /{shortCode}.',
        'Edge/CDN routes the request to the redirect service.',
        'Redirect service validates the code format and checks an in-memory or distributed cache.',
        'On cache miss, read short_links by short_code from replicated storage.',
        'If the link does not exist, is disabled, or is expired, return 404 or 410.',
        'Emit a click event to a queue or log stream without blocking the redirect.',
        'Return 301 or 302 with the long URL in the Location header.'
      ]
    },
    {
      type: 'flow',
      title: 'Analytics async flow',
      steps: [
        'Redirect service creates a compact click event after resolving the link.',
        'Event is published to Kafka, Kinesis, Pub/Sub, or a durable queue.',
        'Stream workers enrich events with coarse geo/device data and remove sensitive raw data where possible.',
        'Raw events are stored in an append-only analytics store with retention limits.',
        'Aggregation jobs update daily_link_stats for dashboard queries.',
        'Analytics API reads aggregated stats first and only scans raw events for narrow debugging or export cases.'
      ]
    },
    {
      type: 'section',
      title: 'Scaling and caching',
      content: 'Make API and redirect services stateless behind load balancers. Cache hot short-code mappings at the edge or in Redis with a TTL that respects link expiry. Partition the mapping table by short_code hash to spread reads and writes. Use read replicas or multi-region replicated key-value storage for redirect-heavy traffic. Keep analytics, abuse scanning, and cleanup workers off the redirect critical path.'
    },
    {
      type: 'architectureDecision',
      title: 'Availability decision',
      decision: 'Prefer serving redirects from replicated mapping storage and cache, while analytics degrades independently.',
      consequences: [
        'Users can still be redirected when the analytics pipeline is delayed.',
        'Click counts become eventually consistent, so dashboards may lag briefly.',
        'Analytics workers need idempotency and replay handling to recover from queue or worker failures.'
      ]
    },
    {
      type: 'section',
      title: 'Expiry and cleanup',
      content: 'Check expires_at during redirect so expired links stop working immediately even before cleanup runs. A periodic cleanup job can archive or delete expired links and evict cache entries. Analytics retention can be shorter than link retention depending on product and privacy requirements.'
    },
    {
      type: 'section',
      title: 'Custom aliases',
      content: 'For custom aliases, validate allowed characters, length, reserved words, and brand-sensitive terms before claiming the alias. Use a transactional or conditional insert on short_code so uniqueness is guaranteed. Normalize aliases consistently, for example by deciding whether aliases are case-sensitive before launch.'
    },
    {
      type: 'checklist',
      title: 'Abuse prevention checklist',
      items: [
        'Rate limit link creation by user, IP, API key, and domain.',
        'Scan destinations against phishing, malware, spam, and unsafe-domain feeds.',
        'Block reserved aliases such as admin, login, support, api, and brand-protected words.',
        'Add reporting and takedown flows for malicious links.',
        'Throttle suspicious redirect patterns to protect infrastructure.',
        'Store enough audit metadata to investigate abuse without keeping unnecessary sensitive data.',
        'Disable links quickly by setting status to disabled and evicting cache.'
      ]
    },
    {
      type: 'table',
      title: 'Trade-off comparison table',
      columns: ['Decision', 'Option A', 'Option B', 'Recommended interview answer'],
      rows: [
        ['Redirect status', '301 permanent redirect improves browser caching.', '302 temporary redirect preserves flexibility and analytics control.', 'Use 302 by default; use 301 only for stable links where caching is acceptable.'],
        ['Storage', 'Relational DB gives constraints and transactions.', 'Distributed KV gives very low-latency lookups at scale.', 'Start with relational plus cache; move hot mapping reads to KV/replicas as scale grows.'],
        ['Analytics write', 'Write synchronously during redirect.', 'Publish event asynchronously.', 'Use async events so redirect latency and availability are protected.'],
        ['Code generation', 'Counter-based codes are compact and collision-free.', 'Random Base62 codes are harder to guess and easy to shard.', 'Use random Base62 with unique constraint and retry unless sequential IDs are required.'],
        ['Multi-region', 'Single primary region is simpler.', 'Active-active improves availability and latency.', 'Use active-passive initially; evolve to active-active for global redirect traffic.']
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Interview-ready summary',
      content: 'The core design is a short-code mapping service with a fast redirect path, cache for hot codes, safe unique code generation, expiry checks, async analytics, abuse controls, replicated storage, and stateless services for high availability.'
    }
  ],
  scoringDictionary: {
    urlShortenerBasics: {
      terms: ['short url', 'short link', 'long url', 'url shortener', 'redirect', 'create short url'],
      synonyms: ['create compact link', 'shorten url', 'original url to short code']
    },
    base62Encoding: {
      terms: ['base62', 'url safe alphabet', 'digits and letters', 'short code'],
      synonyms: ['base 62 encoding', 'alphanumeric code']
    },
    urlMapping: {
      terms: ['short code to long url', 'lookup original url', 'save long url', 'mapping table', 'url mapping'],
      synonyms: ['short code mapping', 'mapping from code to original url'],
      proximity: {
        windowSize: 12,
        groups: [
          ['short code', 'short url'],
          ['long url', 'original url'],
          ['mapping', 'lookup', 'table', 'store', 'database']
        ]
      }
    },
    redirectDbFallback: {
      terms: ['database lookup on cache miss', 'cache miss then database', 'lookup database by short code', 'fallback to database'],
      synonyms: ['read through cache fallback', 'cache miss database fallback'],
      negativePhrases: ['do not check database', 'return 404 on cache miss', 'cache miss return 404'],
      proximity: {
        windowSize: 12,
        groups: [
          ['cache', 'redis', 'cdn'],
          ['miss', 'missing', 'not found', 'fails'],
          ['database', 'db', 'postgresql', 'storage'],
          ['lookup', 'check', 'read', 'fallback']
        ]
      }
    },
    urlMetadata: {
      terms: ['expiry', 'expiration', 'click count', 'owner', 'custom alias', 'created at', 'status', 'metadata'],
      synonyms: ['metadata fields']
    },
    customAlias: {
      terms: ['custom alias', 'reserved alias', 'ownership', 'alias ownership', 'vanity url'],
      proximity: {
        windowSize: 10,
        groups: [
          ['custom alias', 'alias', 'reserved'],
          ['owner', 'ownership', 'unique', 'protect']
        ]
      }
    },
    urlAbuse: {
      terms: ['malicious url', 'spam', 'phishing', 'blocklist', 'safe browsing', 'abuse prevention'],
      synonyms: ['unsafe link blocking', 'malware scanning']
    },
    clickAnalytics: {
      terms: ['analytics', 'click analytics', 'click events', 'queue clicks', 'asynchronous analytics', 'eventual analytics'],
      synonyms: ['track clicks', 'click stream'],
      proximity: {
        windowSize: 12,
        groups: [
          ['analytics', 'click', 'event'],
          ['queue', 'worker', 'kafka', 'stream'],
          ['asynchronous', 'eventual', 'background']
        ]
      }
    }
  },
  scoringRubric: [
    {
      id: 'requirements',
      title: 'Requirements Clarification',
      weight: 10,
      criteria: [
        { id: 'functional-requirements', label: 'Functional requirements', points: 4, questionConcepts: ['urlShortenerBasics', 'customAlias', 'urlMetadata', 'clickAnalytics'], aliases: ['create short url', 'expiry', 'analytics', 'click count'] },
        { id: 'non-functional-requirements', label: 'Non-functional requirements', points: 4, concepts: ['loadBalancing', 'orchestration'], aliases: ['latency', 'availability', 'scale', 'throughput', 'read heavy'] },
        { id: 'assumptions', label: 'Assumptions and traffic estimates', points: 2, aliases: ['assume', 'traffic', 'qps', 'read write ratio', 'read heavy'] }
      ]
    },
    {
      id: 'short-code-generation',
      title: 'Short Code Generation',
      weight: 15,
      criteria: [
        { id: 'base62', label: 'Base62 or URL-safe encoding', points: 5, questionConcepts: ['base62Encoding'], aliases: ['short code', 'alphanumeric'], requiresReasoning: true },
        { id: 'unique-id-generation', label: 'Unique ID generation strategy', points: 4, concepts: ['idGeneration'], aliases: ['generate code', 'random code', 'unique code'] },
        { id: 'collision-handling', label: 'Collision handling', points: 4, concepts: ['collisionHandling'], aliases: ['collision', 'unique constraint', 'retry', 'duplicate'] },
        { id: 'generation-tradeoffs', label: 'Generation trade-offs', points: 2, concepts: ['tradeoffs'], aliases: ['predictable', 'random', 'guessable', 'counter', 'hash'] }
      ]
    },
    {
      id: 'storage-design',
      title: 'Storage Design',
      weight: 10,
      criteria: [
        { id: 'url-mapping', label: 'URL mapping table', points: 4, concepts: ['storageWrite', 'storageModel'], questionConcepts: ['urlMapping'], aliases: ['mapping', 'url table', 'short code table'] },
        { id: 'metadata', label: 'Metadata', points: 3, concepts: ['metadata'], questionConcepts: ['urlMetadata'], aliases: ['metadata', 'expires at', 'created at', 'status'] },
        { id: 'indexes', label: 'Indexes', points: 3, concepts: ['indexing'], aliases: ['index', 'primary key', 'unique index', 'short code uniqueness'] }
      ]
    },
    {
      id: 'read-write-flows',
      title: 'Read and Write Flows',
      weight: 10,
      criteria: [
        { id: 'create-flow', label: 'Create short URL flow', points: 4, concepts: ['writePath', 'idGeneration', 'storageWrite', 'cache'], questionConcepts: ['urlShortenerBasics'], aliases: ['shortening request', 'receive request', 'create api'] },
        { id: 'redirect-flow', label: 'Redirect flow', points: 4, concepts: ['readPath', 'cache'], questionConcepts: ['redirectDbFallback', 'urlMapping'], criticalQuestionConcepts: ['redirectDbFallback'], maxRatioWithoutCritical: 0.6, aliases: ['redirect flow', 'lookup short code', 'fallback to database'] },
        { id: 'retry-idempotency', label: 'Retry and idempotency behavior', points: 2, concepts: ['writePath', 'collisionHandling'], aliases: ['retry', 'idempotency', 'same request', 'duplicate request'] }
      ]
    },
    {
      id: 'scaling-performance',
      title: 'Scaling and Performance',
      weight: 15,
      criteria: [
        { id: 'cache', label: 'Caching hot links', points: 5, concepts: ['cache'], aliases: ['hot link', 'redis', 'cdn', 'cache lookup'] },
        { id: 'partitioning', label: 'Partitioning or sharding', points: 4, concepts: ['partitioning'], aliases: ['partition', 'shard', 'split by code'] },
        { id: 'read-heavy-optimization', label: 'Read-heavy optimization', points: 3, concepts: ['readPath', 'cache'], aliases: ['read heavy', 'low latency', 'fast redirect'] },
        { id: 'backpressure', label: 'Backpressure and rate limits', points: 3, concepts: ['apiGateway', 'rateLimiting'], aliases: ['backpressure', 'rate limit', 'throttle'] }
      ]
    },
    {
      id: 'reliability-consistency',
      title: 'Reliability and Consistency',
      weight: 15,
      criteria: [
        { id: 'high-availability', label: 'High availability', points: 4, concepts: ['availability', 'loadBalancing', 'orchestration', 'replication'], aliases: ['high availability', 'availability zones', 'failover'] },
        { id: 'consistency-tradeoffs', label: 'Consistency trade-offs', points: 4, concepts: ['consistency', 'tradeoffs'], aliases: ['eventual consistency', 'strong consistency', 'unique constraint'] },
        { id: 'failure-modes', label: 'Failure modes', points: 4, concepts: ['failureHandling'], aliases: ['database down', 'cache fails', 'fallback', 'timeout', 'circuit breaker'] },
        { id: 'analytics-consistency', label: 'Analytics consistency', points: 3, concepts: ['queue', 'consistency'], questionConcepts: ['clickAnalytics'], aliases: ['async analytics', 'eventual analytics'] }
      ]
    },
    {
      id: 'security-abuse',
      title: 'Security and Abuse Prevention',
      weight: 10,
      criteria: [
        { id: 'malicious-url-protection', label: 'Malicious URL protection', points: 4, concepts: ['abusePrevention'], questionConcepts: ['urlAbuse'], aliases: ['block malicious', 'phishing', 'spam urls'] },
        { id: 'rate-limiting', label: 'Rate limiting', points: 3, concepts: ['rateLimiting'], aliases: ['rate limit', 'per user', 'ip address'] },
        { id: 'custom-alias-protection', label: 'Custom alias protection', points: 3, concepts: ['authentication'], questionConcepts: ['customAlias'], aliases: ['reserved alias', 'protect custom aliases', 'ownership'] }
      ]
    },
    {
      id: 'observability',
      title: 'Observability',
      weight: 15,
      criteria: [
        { id: 'metrics', label: 'Metrics', points: 5, concepts: ['observability'], aliases: ['metrics', 'latency', 'error rate', 'cache hit rate', 'qps'] },
        { id: 'logging-tracing', label: 'Logs and tracing', points: 4, concepts: ['observability'], aliases: ['logs', 'tracing', 'trace id', 'audit'] },
        { id: 'alerts', label: 'Alerts', points: 3, concepts: ['observability'], aliases: ['alert', 'dashboard', 'monitoring', 'slo'] },
        { id: 'operational-actions', label: 'Operational controls', points: 3, aliases: ['disable links', 'cleanup job', 'health checks', 'takedown'] }
      ]
    }
  ],
  explanation: 'A strong solution identifies redirect as the latency-critical path and keeps everything else off that path. The authoritative short_links store maps short_code to long_url and enforces uniqueness. New links use random Base62 generation with database-backed collision handling, while custom aliases use conditional uniqueness checks and moderation rules. Redirects check cache first, then storage, enforce status and expiry, emit analytics asynchronously, and return a redirect response. Analytics flows through a queue or stream into raw events and aggregated stats. The design scales with stateless services, partitioned storage, cache, replicas, rate limiting, abuse detection, and operational controls that can disable unsafe links quickly.',
  modelAnswer: 'A strong answer should clarify requirements, define APIs, design a short-code mapping table, generate unique short codes with Base62 or another URL-safe strategy, handle collisions through unique constraints and retries, optimize redirects with cache plus database fallback, record analytics asynchronously, enforce expiry, support custom aliases safely, prevent abuse through validation and rate limits, scale with stateless services and partitioned replicated storage, and explain availability, consistency, observability, and trade-offs.',
  commonWeakAnswers: [
    'Only mentions Base62 without explaining uniqueness or collision handling.',
    'Returns 404 immediately on cache miss instead of falling back to storage.',
    'Writes analytics synchronously on the redirect path.',
    'Ignores expiry, custom aliases, or abuse prevention.',
    'Ignores observability, failure modes, and operational controls.'
  ],
  hints: [
    'Clarify read/write ratio first; URL shorteners are usually read-heavy.',
    'Keep the redirect path fast and avoid synchronous analytics writes.',
    'Use a unique constraint or conditional insert for both generated codes and custom aliases.',
    'Explain what happens when a link is expired, disabled, or missing.',
    'Mention cache invalidation when a link is disabled or expires.',
    'Discuss trade-offs between random codes, counters, hashes, and custom aliases.'
  ],
  expectedAnswerOutline: [
    'Clarify requirements, assumptions, and read-heavy traffic shape.',
    'Define create, redirect, analytics, and management APIs.',
    'Design the short-code mapping table and metadata fields.',
    'Explain short-code generation, custom aliases, uniqueness, and collision handling.',
    'Walk through create-link and redirect flows.',
    'Use cache and database fallback for fast redirects.',
    'Collect analytics asynchronously through a queue or stream.',
    'Handle expiry, cleanup, disabled links, and cache invalidation.',
    'Add rate limiting, malicious URL scanning, reserved aliases, and takedown workflows.',
    'Discuss scaling, partitioning, high availability, consistency, failure modes, and observability.'
  ],
  followUpQuestions: [
    'How would you support custom domains for enterprise users?',
    'How would your design change for active-active multi-region redirects?',
    'How would you detect and disable phishing links quickly?',
    'What analytics would you store, and what would you avoid storing for privacy?',
    'How would you migrate from a relational mapping store to a distributed key-value store?',
    'How would you prevent hot links from overwhelming the origin database?'
  ],
  references: [
    'Base62 encoding for compact URL-safe identifiers',
    'Unique database constraints and conditional writes for collision handling',
    'Asynchronous event pipelines for analytics collection',
    'Rate limiting and abuse-detection patterns for public write APIs'
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
