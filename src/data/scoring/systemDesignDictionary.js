export const COMMON_SYSTEM_DESIGN_DICTIONARY = {
  requirements: [
    'functional requirements',
    'non functional requirements',
    'latency requirement',
    'availability requirement',
    'throughput requirement',
    'scale requirement',
    'traffic estimate',
    'qps estimate',
    'read write ratio',
    'assumptions'
  ],
  apiGateway: [
    'api gateway',
    'request validation',
    'ssl termination'
  ],
  authentication: [
    'authentication',
    'authorization',
    'authenticated user',
    'owner auth',
    'access control'
  ],
  rateLimiting: [
    'rate limit',
    'rate limiting',
    'throttle',
    'throttling',
    'quota',
    'per user',
    'per ip',
    'ip address',
    'abuse limit'
  ],
  loadBalancing: [
    'load balancer',
    'load balancing',
    'stateless service',
    'multiple instances',
    'horizontal scaling'
  ],
  orchestration: [
    'k8s',
    'kubernetes',
    'pod autoscaler',
    'auto scaler',
    'autoscaler',
    'auto scaling'
  ],
  idGeneration: [
    'unique id',
    'sequence id',
    'snowflake',
    'distributed id',
    'auto increment',
    'random token',
    'generate code',
    'generate id',
    'hashcode',
    'hash code'
  ],
  collisionHandling: [
    'collision',
    'duplicate',
    'already exists',
    'unique constraint',
    'unique index',
    'retry generation',
    'regenerate code',
    'check uniqueness',
    'exists in database',
    'if exists return'
  ],
  storageWrite: [
    'save in database',
    'store in database',
    'insert',
    'persist',
    'database write',
    'write to database'
  ],
  storageModel: [
    'database table',
    'table schema',
    'data model',
    'mapping table',
    'primary key',
    'row',
    'column'
  ],
  metadata: [
    'metadata',
    'created at',
    'updated at',
    'status',
    'owner',
    'expiry',
    'expires at'
  ],
  indexing: [
    'index',
    'indexes',
    'primary key',
    'lookup index',
    'unique index',
    'database lookup indexed',
    'indexed lookup'
  ],
  cache: [
    'cache',
    'redis',
    'memcached',
    'cdn',
    'edge cache',
    'cache hit',
    'cache miss',
    'hot key',
    'hot item',
    'cached value',
    'update cache'
  ],
  readPath: [
    'read path',
    'lookup',
    'retrieve',
    'fetch',
    'get request',
    'read replica',
    'low latency',
    'high qps'
  ],
  writePath: [
    'write path',
    'create flow',
    'write request',
    'save',
    'persist',
    'idempotency',
    'idempotency key',
    'retry request',
    'duplicate request'
  ],
  partitioning: [
    'partition',
    'shard',
    'consistent hashing',
    'hash partition',
    'split by key',
    'split by id',
    'database partition'
  ],
  queue: [
    'queue',
    'message queue',
    'kafka',
    'rabbitmq',
    'sqs',
    'pub sub',
    'event stream',
    'async processing',
    'background worker'
  ],
  consistency: [
    'consistency',
    'strong consistency',
    'eventual consistency',
    'stale read',
    'read after write',
    'replication lag',
    'source of truth'
  ],
  availability: [
    'high availability',
    'failover',
    'replication',
    'multi region',
    'multi availability zone',
    'active active',
    'active passive'
  ],
  failureHandling: [
    'fallback',
    'timeout',
    'retry',
    'circuit breaker',
    'graceful degradation',
    'partial failure',
    'region fails',
    'database down',
    'cache down'
  ],
  abusePrevention: [
    'abuse',
    'spam',
    'phishing',
    'blocklist',
    'allowlist',
    'safe browsing',
    'malicious',
    'malware'
  ],
  observability: [
    'metrics',
    'logs',
    'structured logs',
    'trace',
    'tracing',
    'trace id',
    'dashboard',
    'alert',
    'monitoring',
    'slo',
    'error rate',
    'p95 latency',
    'p99 latency',
    'cache hit rate'
  ],
  tradeoffs: [
    'trade-off',
    'tradeoff',
    'downside',
    'cost',
    'complexity',
    'latency',
    'throughput',
    'availability',
    'consistency',
    'why',
    'because',
    'this allows',
    'this ensures'
  ]
};

export default COMMON_SYSTEM_DESIGN_DICTIONARY;
