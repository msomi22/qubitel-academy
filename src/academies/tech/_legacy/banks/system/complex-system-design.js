const topic = {
  id: 'complex-system-design',
  name: 'Complex System Design',
  category: 'system',
  description: 'Practice full-system architecture prompts with rubric-based scoring and production trade-off feedback.',
  questions: [
    {
      id: 'complex-system-design-url-shortener-001',
      type: 'complex-system-design',
      topicId: 'complex-system-design',
      title: 'Design a URL Shortener',
      difficulty: 'Hard',
      estimatedTime: '30-45 min',
      tags: ['system', 'scalability', 'url-shortener', 'complex-system-design'],
      scenario: 'You are asked to design a URL shortener similar to Bitly.',
      question: 'Design a URL shortener that supports creating short links, redirecting users, tracking analytics, expiry, custom aliases, abuse prevention, and high availability.',
      requirements: {
        functional: [
          'Create a short URL from a long URL',
          'Redirect users from short URL to long URL',
          'Support optional custom aliases',
          'Support link expiry',
          'Track basic analytics such as click count'
        ],
        nonFunctional: [
          'Low redirect latency',
          'High availability',
          'Read-heavy traffic',
          'Safe handling of duplicate or invalid links',
          'Observable and debuggable production behavior'
        ]
      },
      constraints: [
        'Assume the system is read-heavy.',
        'Assume short links may become hot.',
        'Assume users may retry create requests.',
        'Assume analytics can be eventually consistent.'
      ],
      hints: [
        'Start with APIs and the core short-code mapping.',
        'Explain why your code generation strategy is safe.',
        'Separate redirect latency from asynchronous analytics.',
        'Discuss what happens when cache, database, or a region fails.'
      ],
      expectedAnswerOutline: [
        'Clarify requirements and assumptions',
        'Define APIs',
        'Design short-code generation',
        'Design storage model',
        'Explain create and redirect flows',
        'Add caching for hot links',
        'Handle collisions and uniqueness',
        'Discuss scaling and partitioning',
        'Discuss reliability and failure modes',
        'Discuss security and abuse prevention',
        'Add observability and metrics'
      ],
      scoringDictionary: {
        urlShortenerBasics: {
          terms: ['shorten request', 'short url', 'long url', 'short link', 'redirect', 'url shortener'],
          synonyms: ['create compact link', 'original url to short code']
        },
        base62Encoding: {
          terms: ['base62', '62 characters', 'url safe alphabet', 'digits and letters', 'short code'],
          synonyms: ['base 62 encoding', 'alphanumeric code']
        },
        urlMapping: {
          terms: [
            'short code to long url',
            'short url to long url',
            'hashcode long url',
            'lookup original url',
            'save long url',
            'save short url'
          ],
          synonyms: ['short code mapping', 'mapping from code to original url'],
          proximity: {
            windowSize: 12,
            groups: [
              ['short code', 'short url', 'hashcode'],
              ['long url', 'original url'],
              ['mapping', 'lookup', 'table', 'save', 'store']
            ]
          }
        },
        redirect: {
          terms: [
            'accessing short url',
            'user provides short url',
            'redirect user',
            'redirect to long url',
            '301',
            '302',
            'return long url'
          ],
          stems: ['redirect']
        },
        redirectDbFallback: {
          terms: [
            'database lookup on cache miss',
            'check database on cache miss',
            'cache miss then database',
            'if not in cache check database',
            'lookup database by short code',
            'database miss then 404'
          ],
          synonyms: ['read through cache fallback', 'cache miss database fallback'],
          negativePhrases: [
            'do not check database',
            'do not check the database',
            'never check database',
            'never check the database',
            'do not lookup database',
            'do not lookup the database',
            'never lookup database',
            'skip database',
            'skip the database',
            'no database lookup',
            'database lookup is not needed',
            'database is not needed',
            'return 404 immediately',
            'return 404 on cache miss',
            'cache miss return 404',
            'cache miss returns 404'
          ],
          proximity: {
            windowSize: 12,
            groups: [
              ['cache', 'redis', 'cdn', 'memcached'],
              ['miss', 'missing', 'not found', 'no value', 'empty', 'no hit'],
              ['database', 'db', 'postgres', 'postgresql', 'mysql', 'dynamodb', 'cassandra', 'storage'],
              ['lookup', 'check', 'read', 'query', 'fetch', 'retrieve']
            ]
          }
        },
        urlMetadata: {
          terms: ['expiry', 'click count', 'owner', 'custom alias', 'created at', 'status', 'other metadata'],
          synonyms: ['expiration', 'metadata fields']
        },
        customAlias: {
          terms: ['custom alias', 'reserved alias', 'namespace', 'ownership', 'alias ownership'],
          synonyms: ['vanity url', 'owned alias'],
          proximity: {
            windowSize: 10,
            groups: [
              ['custom alias', 'alias', 'reserved'],
              ['owner', 'ownership', 'namespace', 'authenticated']
            ]
          }
        },
        urlAbuse: {
          terms: ['malicious url', 'spam', 'phishing', 'blocklist', 'safe browsing'],
          synonyms: ['url abuse prevention', 'unsafe link blocking']
        },
        clickAnalytics: {
          terms: ['analytics', 'click analytics', 'click events', 'queue clicks', 'asynchronous analytics', 'eventual analytics'],
          synonyms: ['track clicks', 'click stream'],
          proximity: {
            windowSize: 12,
            groups: [
              ['analytics', 'click', 'event'],
              ['queue', 'worker', 'kafka', 'event stream'],
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
            {
              id: 'functional-requirements',
              label: 'Functional requirements',
              points: 4,
              concepts: ['requirements'],
              questionConcepts: ['urlShortenerBasics', 'customAlias', 'urlMetadata', 'clickAnalytics'],
              aliases: ['create short url', 'expiry', 'analytics', 'click count']
            },
            {
              id: 'non-functional-requirements',
              label: 'Non-functional requirements',
              points: 4,
              concepts: ['requirements', 'loadBalancing', 'orchestration'],
              aliases: ['latency', 'availability', 'scale', 'throughput', 'read heavy', 'network traffic']
            },
            {
              id: 'assumptions',
              label: 'Assumptions and traffic estimates',
              points: 2,
              concepts: ['requirements'],
              aliases: ['assume', 'traffic', 'qps', 'read write ratio', 'estimate']
            }
          ]
        },
        {
          id: 'short-code-generation',
          title: 'Short Code Generation',
          weight: 15,
          criteria: [
            {
              id: 'base62',
              label: 'Base62 or URL-safe encoding',
              points: 5,
              questionConcepts: ['base62Encoding'],
              aliases: ['shorten url'],
              requiresReasoning: true
            },
            {
              id: 'unique-id-generation',
              label: 'Unique ID generation strategy',
              points: 4,
              concepts: ['idGeneration'],
              aliases: ['generate hashcode', 'generate code']
            },
            {
              id: 'collision-handling',
              label: 'Collision handling',
              points: 4,
              concepts: ['collisionHandling'],
              aliases: ['hash exists', 'hash existing', 'return cached value']
            },
            {
              id: 'generation-tradeoffs',
              label: 'Generation trade-offs',
              points: 2,
              concepts: ['tradeoffs'],
              aliases: ['predictable', 'random', 'security', 'guessable', 'hash', 'unique id']
            }
          ]
        },
        {
          id: 'storage-design',
          title: 'Storage Design',
          weight: 10,
          criteria: [
            {
              id: 'url-mapping',
              label: 'URL mapping table',
              points: 4,
              concepts: ['storageWrite', 'storageModel'],
              questionConcepts: ['urlMapping'],
              aliases: ['mapping', 'url table']
            },
            {
              id: 'metadata',
              label: 'Metadata',
              points: 3,
              concepts: ['metadata'],
              questionConcepts: ['urlMetadata'],
              aliases: ['metadata', 'other metadata']
            },
            {
              id: 'indexes',
              label: 'Indexes',
              points: 3,
              concepts: ['indexing'],
              aliases: ['index', 'primary key', 'lookup index', 'unique index', 'database lookup']
            }
          ]
        },
        {
          id: 'read-write-flows',
          title: 'Read and Write Flows',
          weight: 10,
          criteria: [
            {
              id: 'create-flow',
              label: 'Create short URL flow',
              points: 4,
              concepts: ['writePath', 'idGeneration', 'storageWrite', 'cache'],
              questionConcepts: ['urlShortenerBasics'],
              aliases: ['shortening request', 'receive request']
            },
            {
              id: 'redirect-flow',
              label: 'Redirect flow',
              points: 4,
              concepts: ['readPath', 'cache'],
              questionConcepts: ['redirect', 'urlMapping'],
              criticalQuestionConcepts: ['redirectDbFallback'],
              maxRatioWithoutCritical: 0.6,
              maxRatioWithContradiction: 0.1,
              negativePhrases: [
                'do not check database',
                'do not check the database',
                'return 404 immediately',
                'return 404 on cache miss',
                'cache miss return 404',
                'cache miss returns 404'
              ],
              aliases: ['redirect flow', 'lookup short code']
            },
            {
              id: 'retry-idempotency',
              label: 'Retry and idempotency behavior',
              points: 2,
              concepts: ['writePath', 'collisionHandling'],
              aliases: ['same result', 'return cached value']
            }
          ]
        },
        {
          id: 'scaling-performance',
          title: 'Scaling and Performance',
          weight: 15,
          criteria: [
            {
              id: 'cache',
              label: 'Caching hot links',
              points: 5,
              concepts: ['cache'],
              aliases: ['hot link']
            },
            {
              id: 'partitioning',
              label: 'Partitioning or sharding',
              points: 4,
              concepts: ['partitioning'],
              aliases: ['split by code']
            },
            {
              id: 'read-heavy-optimization',
              label: 'Read-heavy optimization',
              points: 3,
              concepts: ['readPath', 'cache'],
              aliases: ['read heavy', 'cache lookup', 'check cache']
            },
            {
              id: 'backpressure',
              label: 'Backpressure and rate limits',
              points: 3,
              concepts: ['apiGateway', 'rateLimiting'],
              aliases: ['backpressure', 'protect service']
            }
          ]
        },
        {
          id: 'reliability-consistency',
          title: 'Reliability and Consistency',
          weight: 15,
          criteria: [
            {
              id: 'high-availability',
              label: 'High availability',
              points: 4,
              concepts: ['availability', 'loadBalancing', 'orchestration', 'replication'],
              aliases: ['high availability']
            },
            {
              id: 'consistency-tradeoffs',
              label: 'Consistency trade-offs',
              points: 4,
              concepts: ['consistency', 'tradeoffs'],
              aliases: ['eventual consistency', 'strong consistency', 'stale']
            },
            {
              id: 'failure-modes',
              label: 'Failure modes',
              points: 4,
              concepts: ['failureHandling'],
              aliases: ['database down', 'cache down', 'cache miss', 'if cache fails']
            },
            {
              id: 'analytics-consistency',
              label: 'Analytics consistency',
              points: 3,
              concepts: ['queue', 'consistency'],
              questionConcepts: ['clickAnalytics'],
              aliases: ['async analytics', 'eventual analytics']
            }
          ]
        },
        {
          id: 'security-abuse',
          title: 'Security and Abuse Prevention',
          weight: 10,
          criteria: [
            {
              id: 'malicious-url-protection',
              label: 'Malicious URL protection',
              points: 4,
              concepts: ['abusePrevention'],
              questionConcepts: ['urlAbuse'],
              aliases: ['ssl termination']
            },
            {
              id: 'rate-limiting',
              label: 'Rate limiting',
              points: 3,
              concepts: ['rateLimiting'],
              aliases: ['api gateway', 'per user', 'ip address']
            },
            {
              id: 'custom-alias-protection',
              label: 'Custom alias protection',
              points: 3,
              concepts: ['authentication'],
              questionConcepts: ['customAlias'],
              aliases: ['reserved alias']
            }
          ]
        },
        {
          id: 'observability',
          title: 'Observability',
          weight: 10,
          criteria: [
            {
              id: 'metrics',
              label: 'Metrics',
              points: 4,
              concepts: ['observability'],
              aliases: ['metrics', 'latency', 'error rate', 'cache hit rate', 'qps']
            },
            {
              id: 'logging-tracing',
              label: 'Logs and tracing',
              points: 3,
              concepts: ['observability'],
              aliases: ['logs', 'tracing', 'trace id', 'debug']
            },
            {
              id: 'alerts',
              label: 'Alerts',
              points: 3,
              concepts: ['observability'],
              aliases: ['alert', 'dashboard', 'monitoring', 'slo']
            }
          ]
        }
      ],
      modelAnswer: 'A strong answer should clarify requirements, explain APIs, describe generating short codes using a safe strategy such as Base62 encoding over unique IDs, handle collisions, store short-code mappings with indexes, optimize redirects with caching, handle hot links, discuss eventual consistency for analytics, add abuse prevention, and include observability.',
      commonWeakAnswers: [
        'Only says use Base62 without explaining why.',
        'Mentions Redis/PostgreSQL/Kafka without explaining trade-offs.',
        'Ignores collision handling.',
        'Ignores redirect latency.',
        'Ignores abuse prevention.',
        'Ignores failure modes and observability.'
      ],
      finalPattern: 'Complex System Design'
    }
  ]
};

export default topic;
