import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getRecommendedStartTopics,
  getTopicDisplayName,
  scoreDashboardStartTopic
} from './dashboardLearningPathService.js';

test('getTopicDisplayName removes pattern prefix from topic names', () => {
  assert.equal(getTopicDisplayName({ name: 'WIND — Sliding Window' }), 'Sliding Window');
  assert.equal(getTopicDisplayName({ name: 'Binary Search' }), 'Binary Search');
});

test('recommended starting path excludes empty topics and prefers foundational incomplete topics', () => {
  const topics = [
    {
      id: 'graphs',
      name: 'NODES — Graph BFS / DFS',
      category: 'dsa',
      count: 9,
      progress: { percent: 0 }
    },
    {
      id: 'sliding-window',
      name: 'WIND — Sliding Window',
      category: 'dsa',
      count: 10,
      progress: { percent: 0 }
    },
    {
      id: 'two-pointers',
      name: 'PAIR — Two Pointers',
      category: 'dsa',
      count: 1,
      progress: { percent: 0 }
    },
    {
      id: 'empty-topic',
      name: 'Empty Topic',
      category: 'dsa',
      count: 0,
      progress: { percent: 0 }
    },
    {
      id: 'completed-binary-search',
      name: 'SEAR — Binary Search',
      category: 'dsa',
      count: 4,
      progress: { percent: 100 }
    }
  ];

  const recommended = getRecommendedStartTopics(topics, { limit: 3 });

  assert.deepEqual(recommended.map((topic) => topic.id), [
    'sliding-window',
    'two-pointers',
    'graphs'
  ]);
});

test('explicit learning path rank overrides heuristic ordering when present', () => {
  const topics = [
    {
      id: 'sliding-window',
      name: 'WIND — Sliding Window',
      category: 'dsa',
      count: 10,
      progress: { percent: 0 },
      learningPath: { startHereRank: 2 }
    },
    {
      id: 'java-core',
      name: 'Java Core',
      category: 'java',
      count: 3,
      progress: { percent: 0 },
      learningPath: { startHereRank: 1 }
    }
  ];

  assert.deepEqual(getRecommendedStartTopics(topics).map((topic) => topic.id), [
    'java-core',
    'sliding-window'
  ]);
});

test('completed topics score lower than incomplete topics', () => {
  const incompleteScore = scoreDashboardStartTopic({
    id: 'binary-search',
    name: 'SEAR — Binary Search',
    category: 'dsa',
    count: 2,
    progress: { percent: 0 }
  });
  const completedScore = scoreDashboardStartTopic({
    id: 'binary-search',
    name: 'SEAR — Binary Search',
    category: 'dsa',
    count: 2,
    progress: { percent: 100 }
  });

  assert.ok(incompleteScore > completedScore);
});
