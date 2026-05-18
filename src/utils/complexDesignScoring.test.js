import assert from 'node:assert/strict';
import test from 'node:test';

import topic from '../data/banks/system/complex-system-design.js';
import { scoreComplexDesignAnswer } from './complexDesignScoring.js';

const question = topic.questions.find((item) => item.id === 'complex-system-design-url-shortener-001');

const issue49SampleAnswer = `
1. shortening request
- user provide long url
- request goes throug an api gateway (here we have rate limiting, throttleing, authenatication and ssl termination)
- happy path is sent to shortner micro service that runs behind a load balancer
- the micro service is running in k8s, with pod auto scaller enabled based cpu and memory usage, and nework traffic
- the micro service uses base 62 to shortne url, the flow is as follows
- receive request - long url
- generate hashcode
- check whether the hash existing in cache (redis)
- if exist return the cached value
- otherwise start the shorten process, this will savein the database and then update the cache
- we saves the hashcode, long url and the short usrl, plus other metadata
- while saing, if hascode exists in the database, we return that and update the cache, otherwise we save and update the cache

2. accessing short url
- user provides short url,
- we check whether this exists in the cache using the short url, if it doesn’t we return 404
- otherwise we retrice the long url, and redirect use to the correct long url
- the request passes through the api gateway and same authentication, throttling, rate limiting applies, basically per user or ip address
`;

const completeAnswer = `
Assumptions and requirements: the service must create short URLs, redirect short URLs to long URLs,
support custom alias ownership, expiry, analytics, low redirect latency, high availability, read heavy
traffic, and about 100k QPS with a 100:1 read write ratio. Analytics can be eventually consistent
because redirects should stay fast.

APIs: POST /urls receives a long URL, optional custom alias, owner, expiry, and idempotency key.
GET /{shortCode} performs the redirect. The create flow validates the request, checks safe browsing,
applies quota and rate limit controls, generates the code, inserts the mapping, and returns the same
result for duplicate retry requests with the same idempotency key.

Short code generation: use a Snowflake or sequence id and encode it with Base62 using digits and letters
as a URL safe alphabet. This avoids random-token collision risk. If we allow random codes or custom aliases,
a unique index on shortCode detects duplicate short code collisions and the service retries generation.
The trade-off is that sequence ids can be predictable, so we can salt or randomize if security requires it.

Storage design: store a URL table mapping short code to long URL with primary key shortCode, unique index
on custom alias namespace, owner, created at, expiry, status, click count, and lookup index fields.
The lookup original URL path only needs shortCode, longUrl, status, and expiry for fast redirects.

Redirect flow: check CDN or Redis cache for the short code. On cache miss, lookup the database by primary key,
verify status and expiry, cache the result, then return a 301 or 302 redirect to the long URL. If the row is
missing, return 404. Click events are written asynchronously to a queue so redirect latency remains low.

Scaling and performance: the system is read heavy, so use edge cache, Redis cache for hot links, read replicas,
and partition or shard by short code using consistent hashing. Use backpressure, throttling, and API gateway
rate limits to protect the create service and high QPS redirect path.

Reliability and consistency: run multiple stateless services behind a load balancer across multiple regions.
Replicate the database and use failover. If cache is down, fallback to the database. If a region fails, route
traffic to another region. Strong consistency is required for short code uniqueness, while analytics and click
events can use eventual consistency and may be stale briefly.

Security and abuse prevention: validate malicious URLs with safe browsing, block phishing and spam, enforce
reserved alias rules, namespace aliases by owner, require authentication for create and management APIs, and
apply per user quota and IP address rate limiting.

Observability: emit metrics for QPS, p95 latency, redirect error rate, create error rate, cache hit rate,
queue lag, and database latency. Add structured logs with trace id and distributed tracing. Build dashboards,
SLOs, and alerts for high error rate, latency, cache failures, database down, and queue backlog.
`;

test('returns zero score and helpful feedback for an empty answer', () => {
  const result = scoreComplexDesignAnswer(question, '');

  assert.equal(result.totalScore, 0);
  assert.equal(result.percentage, 0);
  assert.equal(result.level, 'Needs work');
  assert.equal(result.sectionScores.length, question.scoringRubric.length);
});

test('scores a complete rubric-covering answer at 100%', () => {
  const result = scoreComplexDesignAnswer(question, completeAnswer);

  assert.equal(result.totalScore, result.maxScore);
  assert.equal(result.maxScore, 95);
  assert.equal(result.percentage, 100);
  assert.equal(result.level, 'Excellent');
  assert.ok(result.sectionScores.every((section) => section.missedCriteria.length === 0));
});

test('scores the issue #49 natural wording sample higher than the old overly strict score', () => {
  const result = scoreComplexDesignAnswer(question, issue49SampleAnswer);

  assert.ok(result.totalScore > 12, `Expected score to improve beyond 12, got ${result.totalScore}`);
  assert.ok(result.totalScore >= 30, `Expected meaningful partial credit, got ${result.totalScore}`);
  assert.ok(result.totalScore < 70, `Expected incomplete answer to remain capped below 70, got ${result.totalScore}`);
  assert.ok(result.sectionScores.some((section) => section.id === 'storage-design' && section.score > 0));
  assert.ok(result.sectionScores.some((section) => section.id === 'read-write-flows' && section.score > 0));
  assert.ok(result.sectionScores.some((section) => section.id === 'scaling-performance' && section.score > 0));
});

test('does not award full redirect flow credit when cache miss incorrectly returns 404 before database lookup', () => {
  const result = scoreComplexDesignAnswer(question, issue49SampleAnswer);
  const readWrite = result.sectionScores.find((section) => section.id === 'read-write-flows');

  assert.ok(readWrite.score < readWrite.maxScore, `Expected read/write score below full marks, got ${readWrite.score}/${readWrite.maxScore}`);
});

test('keeps short keyword-stuffed answers capped', () => {
  const result = scoreComplexDesignAnswer(
    question,
    'Base62 Redis Kafka latency consistency failover metrics alert rate limit shard custom alias expiry analytics.'
  );

  assert.ok(result.totalScore <= Math.round(result.maxScore * 0.7));
  assert.notEqual(result.level, 'Excellent');
});

test('returns learner-friendly missed labels alongside stable criterion ids', () => {
  const result = scoreComplexDesignAnswer(question, 'Use Base62 and Redis cache for fast redirects.');

  const storage = result.sectionScores.find((section) => section.id === 'storage-design');

  assert.ok(storage.missedCriteria.includes('url-mapping'));
  assert.ok(storage.missedLabels.includes('URL mapping table'));
});

test('uses shared dictionary concepts without repeating aliases in every criterion', () => {
  const testQuestion = {
    scoringRubric: [
      {
        id: 'performance',
        title: 'Performance',
        weight: 10,
        criteria: [
          { id: 'cache', label: 'Cache usage', points: 10, concepts: ['cache'] }
        ]
      }
    ]
  };

  const result = scoreComplexDesignAnswer(testQuestion, 'Use Redis and a CDN for cache hits on hot items because this keeps reads low latency.');

  assert.equal(result.totalScore, 10);
  assert.equal(result.percentage, 100);
});

test('uses question-specific dictionary concepts for domain wording', () => {
  const testQuestion = {
    scoringDictionary: {
      domainEvents: ['seat reserved', 'ticket booked', 'booking confirmation']
    },
    scoringRubric: [
      {
        id: 'domain-flow',
        title: 'Domain Flow',
        weight: 10,
        criteria: [
          { id: 'booking-event', label: 'Booking event', points: 10, questionConcepts: ['domainEvents'] }
        ]
      }
    ]
  };

  const result = scoreComplexDesignAnswer(testQuestion, 'After payment succeeds, publish a ticket booked event and send booking confirmation.');

  assert.equal(result.totalScore, 10);
  assert.equal(result.percentage, 100);
});

test('keeps typo replacement word-boundary safe for throughput wording', () => {
  const testQuestion = {
    scoringRubric: [
      {
        id: 'requirements',
        title: 'Requirements',
        weight: 10,
        criteria: [
          { id: 'throughput', label: 'Throughput requirement', points: 10, concepts: ['requirements'], aliases: ['throughput'] }
        ]
      }
    ]
  };

  const result = scoreComplexDesignAnswer(testQuestion, 'The system needs high throughput because many users will access it.');

  assert.equal(result.totalScore, 10);
  assert.equal(result.percentage, 100);
});
