import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'two-pointers-container-with-most-water-001',
  topicId: 'two-pointers',
  title: 'Container With Most Water — two pointers',
  difficulty: 'Medium',
  estimatedTime: '13 min',
  tags: ['arrays', 'two-pointers', 'interview-pattern', 'mental-model', 'visual-walkthrough'],
  scenario: 'Given vertical line heights, choose two lines that hold the most water.',
  prompt: 'Why does the two-pointer solution move the shorter wall instead of trying every pair?',
  starterThought: 'Area depends on width and the shorter wall. The shorter wall is the bottleneck.',
  plainLanguageExplanation: 'Start with the widest possible container. At each step, compute area using width times the shorter height. Moving the taller wall inward cannot improve the height limit while the shorter wall stays, so move the shorter wall and look for a better bottleneck.',
  mentalPicture: 'Two walls hold water. The shorter wall decides the water height. To hold more water after width shrinks, you must try to find a taller short wall.',
  bruteForceThought: 'Brute force checks every pair of walls, which is easy to understand but wastes work on pairs that can be safely eliminated.',
  optimizationJourney: 'The elimination proof is the whole pattern: if left is shorter, any container with the same left wall and a smaller width cannot beat the current one unless the limiting height changes. So left must move.',
  finalPattern: 'Two-pointer bottleneck elimination.',
  commonMistake: 'Moving the taller pointer because it looks bigger misses the fact that the shorter pointer limits the current area.',
  edgeCases: ['Only two lines', 'Equal heights', 'Strictly increasing heights', 'Strictly decreasing heights', 'Very tall wall with tiny width'],
  complexityAnalysis: 'Time is O(n) because each pointer moves inward at most n times total. Space is O(1) because only pointers and the best area are tracked.',
  finalTakeaway: 'When one side is the bottleneck, move the bottleneck.',
  selfExplanationPrompt: 'Explain why moving the taller wall cannot help while the shorter wall remains fixed.',
  body: [
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use two pointers when a sorted order, boundary pair, or bottleneck lets you eliminate one side safely.' },
    {
      type: 'table',
      title: 'Walkthrough: heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
      columns: ['Left', 'Right', 'Left height', 'Right height', 'Width', 'Area', 'Move', 'Reason'],
      rows: [
        ['0', '8', '1', '7', '8', '8', 'left', 'Left wall is shorter bottleneck.'],
        ['1', '8', '8', '7', '7', '49', 'right', 'Right wall is shorter bottleneck.'],
        ['1', '7', '8', '3', '6', '18', 'right', 'Right wall limits height.'],
        ['1', '6', '8', '8', '5', '40', 'either', 'Equal height; width must shrink.']
      ]
    },
    { type: 'flow', title: 'Elimination loop', steps: ['Start at widest pair', 'Compute current area', 'Update best area', 'Move the pointer at the shorter wall', 'Repeat until pointers meet'] },
    { type: 'checklist', title: 'Explain it well', items: ['Define area = width × shorter height', 'Say why widest start is useful', 'Prove why the shorter wall moves', 'Track best area separately'] }
  ],
  relatedConcepts: ['two pointers', 'greedy elimination', 'bottleneck reasoning'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
