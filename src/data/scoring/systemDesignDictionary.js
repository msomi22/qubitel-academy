export const COMMON_SYSTEM_DESIGN_DICTIONARY = {
  requirements: {
    terms: ['functional requirements', 'non functional requirements', 'latency requirement', 'availability requirement', 'throughput requirement', 'scale requirement', 'traffic estimate', 'qps estimate', 'read write ratio', 'assumptions'],
    synonyms: ['capacity estimate', 'read heavy assumption', 'write heavy assumption', 'success criteria']
  },
  apiGateway: {
    terms: ['api gateway', 'request validation', 'ssl termination'],
    synonyms: ['edge gateway', 'ingress gateway']
  },
  authentication: {
    terms: ['authentication', 'authorization', 'authenticated user', 'owner auth', 'access control'],
    synonyms: ['auth', 'identity check', 'permission check']
  },
  rateLimiting: {
    terms: ['rate limit', 'rate limiting', 'throttle', 'throttling', 'quota', 'per user', 'per ip', 'ip address', 'abuse limit', 'backpressure'],
    synonyms: ['request quota', 'traffic shaping'],
    stems: ['throttle']
  },
  loadBalancing: {
    terms: ['load balancer', 'load balancing', 'stateless service', 'multiple instances', 'horizontal scaling'],
    synonyms: ['balanced traffic', 'scale out services']
  },
  orchestration: {
    terms: ['kubernetes', 'pod autoscaler', 'auto scaler', 'autoscaler', 'auto scaling'],
    synonyms: ['container orchestration', 'horizontal pod autoscaler']
  },
  idGeneration: {
    terms: ['unique id', 'sequence id', 'snowflake', 'distributed id', 'auto increment', 'random token', 'generate code', 'generate id', 'hashcode'],
    synonyms: ['id generator', 'code generator', 'unique token']
  },
  collisionHandling: {
    terms: ['collision', 'duplicate', 'already exists', 'unique constraint', 'unique index', 'retry generation', 'regenerate code', 'check uniqueness', 'exists in database', 'if exists return'],
    synonyms: ['dedupe generated code', 'retry on duplicate key'],
    proximity: {
      windowSize: 12,
      groups: [
        ['collision', 'duplicate', 'already exists', 'conflict'],
        ['unique constraint', 'unique index', 'primary key'],
        ['retry', 'regenerate', 'generate again']
      ]
    }
  },
  storageWrite: {
    terms: ['save in database', 'store in database', 'insert', 'persist', 'database write', 'write to database'],
    stems: ['persist']
  },
  storageModel: {
    terms: ['database table', 'table schema', 'data model', 'mapping table', 'primary key', 'row', 'column'],
    synonyms: ['schema design', 'storage schema']
  },
  metadata: {
    terms: ['metadata', 'created at', 'updated at', 'status', 'owner', 'expiry', 'expires at'],
    synonyms: ['creation time', 'expiration time']
  },
  indexing: {
    terms: ['index', 'indexes', 'primary key', 'lookup index', 'unique index', 'database lookup indexed', 'indexed lookup'],
    stems: ['index']
  },
  cache: {
    terms: ['cache', 'redis', 'memcached', 'cdn', 'edge cache', 'cache hit', 'cache miss', 'hot key', 'hot item', 'cached value', 'update cache'],
    synonyms: ['in memory store', 'temporary fast lookup'],
    stems: ['cache']
  },
  database: {
    terms: ['database', 'postgresql', 'mysql', 'dynamodb', 'cassandra', 'storage'],
    synonyms: ['persistent store', 'source of truth']
  },
  readPath: {
    terms: ['read path', 'lookup', 'retrieve', 'fetch', 'get request', 'read replica', 'low latency', 'high qps'],
    stems: ['redirect']
  },
  writePath: {
    terms: ['write path', 'create flow', 'write request', 'save', 'persist', 'idempotency', 'idempotency key', 'retry request', 'duplicate request'],
    synonyms: ['creation workflow', 'create request path']
  },
  partitioning: {
    terms: ['partition', 'shard', 'consistent hashing', 'hash partition', 'split by key', 'split by id', 'database partition'],
    synonyms: ['partition by key', 'shard by code'],
    stems: ['partition', 'shard'],
    proximity: {
      windowSize: 10,
      groups: [
        ['partition', 'shard', 'split'],
        ['key', 'id', 'short code', 'hash']
      ]
    }
  },
  queue: {
    terms: ['queue', 'message queue', 'kafka', 'rabbitmq', 'sqs', 'pub sub', 'event stream', 'asynchronous processing', 'background worker'],
    synonyms: ['event queue', 'worker queue'],
    stems: ['queue'],
    proximity: {
      windowSize: 12,
      groups: [
        ['asynchronous', 'background', 'eventual'],
        ['analytics', 'click', 'event'],
        ['queue', 'worker', 'kafka', 'rabbitmq', 'sqs']
      ]
    }
  },
  replication: {
    terms: ['replication', 'replica', 'read replica', 'replicated database'],
    stems: ['replicate', 'replica']
  },
  consistency: {
    terms: ['consistency', 'strong consistency', 'eventual consistency', 'stale read', 'read after write', 'replication lag', 'source of truth'],
    synonyms: ['fresh read', 'consistent write']
  },
  availability: {
    terms: ['high availability', 'failover', 'replication', 'multi region', 'multi availability zone', 'active active', 'active passive'],
    synonyms: ['ha', 'regional redundancy']
  },
  failureHandling: {
    terms: ['fallback', 'timeout', 'retry', 'circuit breaker', 'graceful degradation', 'partial failure', 'region fails', 'database down', 'cache down', 'failover', 'degraded mode'],
    stems: ['fail', 'retry'],
    proximity: {
      windowSize: 12,
      groups: [
        ['failure', 'fails', 'down', 'unavailable', 'timeout'],
        ['fallback', 'retry', 'failover', 'circuit breaker', 'degraded']
      ]
    }
  },
  abusePrevention: {
    terms: ['abuse', 'spam', 'phishing', 'blocklist', 'allowlist', 'safe browsing', 'malicious', 'malware'],
    synonyms: ['malicious url protection', 'url safety check']
  },
  observability: {
    terms: ['metric', 'metrics', 'logs', 'structured logs', 'trace', 'tracing', 'trace id', 'correlation id', 'dashboard', 'alert', 'monitoring', 'slo', 'sla', 'error rate', 'p95 latency', 'p99 latency', 'cache hit rate', 'queue lag', 'database latency', 'db latency'],
    stems: ['metric', 'monitor'],
    proximity: {
      windowSize: 15,
      requiredGroups: 2,
      groups: [
        ['metric', 'metrics', 'p95', 'p99', 'error rate'],
        ['log', 'logs', 'structured logs'],
        ['trace', 'tracing', 'trace id', 'correlation id'],
        ['alert', 'dashboard', 'slo', 'monitoring']
      ]
    }
  },
  tradeoffs: {
    terms: ['trade-off', 'tradeoff', 'trade off', 'overhead', 'bottleneck', 'expensive', 'cheap', 'slower', 'faster', 'operational cost', 'write cost', 'read cost', 'memory cost', 'complexity', 'predictable', 'guessable', 'latency', 'throughput', 'availability', 'consistency', 'why', 'because', 'this allows', 'this ensures'],
    synonyms: ['design compromise', 'cost of this choice']
  }
};

export default COMMON_SYSTEM_DESIGN_DICTIONARY;
