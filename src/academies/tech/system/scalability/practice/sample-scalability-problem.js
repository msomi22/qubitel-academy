const problem = {
  id: 'scalability-sample-new-style-001',
  type: 'simple-system-design',
  category: 'system',
  topicId: 'scalability',
  title: 'Handle a Read Traffic Spike',
  difficulty: 'Easy',
  tags: ['system', 'scalability', 'new-style-problem'],
  question: 'A read-heavy endpoint suddenly receives 10x traffic. Describe a safe scaling approach and the trade-offs.',
  prompt: 'A read-heavy endpoint suddenly receives 10x traffic. Describe a safe scaling approach and the trade-offs.',
  explanation: 'A strong answer mentions caching, horizontal scaling, rate limits, observability, rollback, and the freshness/cost trade-off.',
  metadata: {
    authoringVersion: 1
  }
};

export default problem;
