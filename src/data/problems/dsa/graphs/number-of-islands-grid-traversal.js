import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'graphs-number-of-islands-grid-traversal-001',
  topicId: 'graphs',
  title: 'Number of Islands — graph/grid traversal',
  difficulty: 'Medium',
  estimatedTime: '16 min',
  tags: ['graph', 'grid', 'dfs', 'bfs', 'interview-pattern', 'mental-model', 'visual-walkthrough'],
  scenario: 'Given a grid of land and water, count how many connected groups of land exist.',
  prompt: 'How can a grid be treated like a graph so each island is counted once?',
  starterThought: 'An island is not one land cell. It is a connected component of land cells.',
  plainLanguageExplanation: 'Every land cell is a graph node. Land cells connect to neighboring land up, down, left, and right. When scanning finds unvisited land, that is a new island. DFS or BFS then marks the whole connected island as visited so it is not counted again.',
  mentalPicture: 'A map of land and water. When you step onto a new island, you walk across all connected land and mark your footprints before looking for another island.',
  bruteForceThought: 'Counting every land cell is tempting, but it counts the size of land, not the number of connected groups.',
  optimizationJourney: 'The key is to count only the first unvisited land cell of a component. Traversal absorbs the rest of that island into visited state.',
  finalPattern: 'Connected component traversal on a grid.',
  commonMistake: 'Counting each land cell instead of each connected group. Another common bug is accidentally allowing diagonal connections when the problem only allows four directions.',
  edgeCases: ['All water', 'All land', 'Single cell grid', 'Thin island line', 'Separate islands touching only diagonally', 'Out-of-bounds neighbor checks'],
  complexityAnalysis: 'Time is O(rows × cols) because each cell is visited at most once. Space is O(rows × cols) in the worst case for visited tracking or the DFS/BFS frontier.',
  finalTakeaway: 'A grid problem often becomes a graph problem when neighboring cells are connected.',
  selfExplanationPrompt: 'Explain why the count increases before traversal, not for every land cell reached during traversal.',
  body: [
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use graph traversal when neighboring cells form connected groups and you must avoid double-counting.' },
    { type: 'diagram', title: 'Grid mental picture', content: '1 1 0 0\n1 0 0 1\n0 0 1 1\n\nScan left to right. First unvisited 1 starts island #1. Later unvisited 1 at the right starts island #2.' },
    {
      type: 'table',
      title: 'Walkthrough highlights',
      columns: ['Step', 'Cell', 'Action', 'Visited land after action', 'Island count'],
      rows: [
        ['1', '(0,0)', 'Unvisited land found. Count new island and start DFS/BFS.', '(0,0), (0,1), (1,0)', '1'],
        ['2', '(0,1)', 'Already visited as part of island #1.', 'unchanged', '1'],
        ['3', '(1,3)', 'Unvisited land found. Count new island and expand.', '(1,3), (2,2), (2,3)', '2'],
        ['4', '(2,2)', 'Already visited through island #2.', 'unchanged', '2']
      ]
    },
    { type: 'flow', title: 'Traversal flow', steps: ['Scan every cell', 'When cell is unvisited land, increment island count', 'Run DFS/BFS from that cell', 'Mark every connected land neighbor visited', 'Continue scanning for the next unvisited land cell'] },
    { type: 'checklist', title: 'Mistakes to avoid', items: ['Track visited or mutate the grid safely', 'Use only allowed directions', 'Check bounds before reading neighbors', 'Count components, not cells'] }
  ],
  relatedConcepts: ['connected components', 'DFS', 'BFS', 'visited set'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
