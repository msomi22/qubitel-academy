export const glossaryTerms = [
  {
    id: 'api',
    term: 'API',
    aliases: ['APIs'],
    definition: 'A clear way for one piece of software to ask another piece of software for data or action.',
    category: 'backend'
  },
  {
    id: 'cache',
    term: 'Cache',
    aliases: ['Caching'],
    definition: 'A fast storage layer that helps avoid repeatedly reading slower data sources.',
    category: 'system-design'
  },
  {
    id: 'sharding',
    term: 'Sharding',
    aliases: ['Shard', 'Shards'],
    definition: 'Splitting data across multiple machines so each machine handles only part of the total data.',
    category: 'system-design'
  },
  {
    id: 'partition',
    term: 'Partition',
    aliases: ['Partitions', 'Partitioning'],
    definition: 'One slice of data or work from a larger set, usually assigned so systems can process pieces separately.',
    category: 'system-design'
  },
  {
    id: 'queue',
    term: 'Queue',
    aliases: ['Queues'],
    definition: 'A waiting line for work where items are stored until a consumer is ready to process them.',
    category: 'backend'
  },
  {
    id: 'deployment',
    term: 'Deployment',
    aliases: ['Deployments'],
    definition: 'The process or Kubernetes object that rolls an application version out to running environments.',
    category: 'kubernetes-ckad'
  },
  {
    id: 'replicaset',
    term: 'ReplicaSet',
    aliases: ['ReplicaSets'],
    definition: 'A Kubernetes controller that keeps the requested number of matching Pods running.',
    category: 'kubernetes-ckad'
  },
  {
    id: 'pod',
    term: 'Pod',
    aliases: ['Pods'],
    definition: 'The smallest Kubernetes unit you run; it wraps one or more containers that belong together.',
    category: 'kubernetes-ckad'
  },
  {
    id: 'namespace',
    term: 'Namespace',
    aliases: ['Namespaces'],
    definition: 'A named space in Kubernetes that keeps related resources grouped and separated from others.',
    category: 'kubernetes-ckad'
  },
  {
    id: 'heap',
    term: 'Heap',
    aliases: ['Heaps'],
    definition: 'A tree-shaped structure that keeps the smallest or largest item easy to remove first.',
    category: 'dsa'
  },
  {
    id: 'stack',
    term: 'Stack',
    aliases: ['Stacks'],
    definition: 'A last-in, first-out structure, like a pile where the newest item is removed first.',
    category: 'dsa'
  },
  {
    id: 'sliding-window',
    term: 'Sliding Window',
    aliases: ['Sliding Windows'],
    definition: 'A technique that keeps a moving range of items so you can update an answer without restarting from scratch.',
    category: 'dsa'
  },
  {
    id: 'prefix-sum',
    term: 'Prefix Sum',
    aliases: ['Prefix Sums'],
    definition: 'A running total that lets you answer range-sum questions quickly.',
    category: 'dsa'
  },
  {
    id: 'jwt',
    term: 'JWT',
    aliases: ['JSON Web Token', 'JSON Web Tokens'],
    definition: 'A signed token that carries claims so a service can verify who or what made a request.',
    category: 'security'
  },
  {
    id: 'oauth',
    term: 'OAuth',
    aliases: ['OAuth2', 'OAuth 2'],
    definition: 'A standard way to let an app access something on behalf of a user without sharing the user’s password.',
    category: 'security'
  },
  {
    id: 'idempotency',
    term: 'Idempotency',
    aliases: ['Idempotent'],
    definition: 'Repeating the same request safely produces the same final outcome.',
    category: 'system-design'
  }
];

export default glossaryTerms;
