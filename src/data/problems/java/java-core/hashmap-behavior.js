import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-hashmap-behavior-001',
  topicId: 'java-core',
  title: 'HashMap Behavior at a High Level',
  difficulty: 'Medium',
  prompt: 'Explain how a Java HashMap finds, stores, and retrieves values at a high level. Focus on hashing, buckets, equality checks, collision handling, and what makes a good key.',
  tags: ['java', 'collections', 'hashmap'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'green'
  },
  body: [
    {
      type: 'section',
      title: 'Mental model',
      content: 'A HashMap uses a key hash to choose a bucket, then verifies candidate keys using equality checks before returning the value.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Interview shortcut',
      content: 'HashMap performance depends on a stable hashCode(), a correct equals(), and a reasonable distribution of keys across buckets.'
    },
    {
      type: 'table',
      columns: ['Concept', 'Role'],
      rows: [
        ['hashCode()', 'Helps choose a bucket for the key.'],
        ['equals()', 'Confirms whether a candidate key is the exact logical key.'],
        ['Collision', 'Occurs when different keys land in the same bucket.'],
        ['Resize', 'Expands internal storage when the map grows beyond its load threshold.']
      ]
    },
    {
      type: 'comparison',
      items: [
        {
          title: 'Good key',
          content: 'Immutable or effectively immutable, stable hash code, and consistent equality behavior.'
        },
        {
          title: 'Risky key',
          content: 'Mutable fields used by hashCode() or equals(), causing lookups to become unreliable after mutation.'
        }
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: 'Map<String, Integer> scores = new HashMap<>();\nscores.put("Ada", 99);\nInteger score = scores.get("Ada");'
    },
    {
      type: 'checklist',
      title: 'Strong answer checklist',
      items: [
        'Mention hashCode() selects a bucket.',
        'Mention equals() verifies matching keys.',
        'Explain collisions without treating them as errors.',
        'Warn against mutable keys.'
      ]
    }
  ],
  explanation: 'A strong answer should connect hashing to bucket selection, equality to final key matching, and collisions to normal map behavior rather than failure.',
  metadata: {
    reviewStatus: 'draft',
    visibility: ['dev']
  }
});

export default problem;
