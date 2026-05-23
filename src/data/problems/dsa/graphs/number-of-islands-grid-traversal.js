import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'graphs-number-of-islands-grid-traversal-001',
  topicId: 'graphs',
  title: 'Number of Islands — graph/grid traversal',
  difficulty: 'Medium',
  estimatedTime: '16 min',
  language: 'java',
  tags: ['graph', 'grid', 'dfs', 'bfs', 'interview-pattern', 'mental-model', 'visual-walkthrough', 'coding'],
  scenario: 'Given a grid of land and water, count how many connected groups of land exist.',
  question: 'Given a grid with land cells connected up, down, left, and right, return the number of islands.',
  examples: ['Input grid rows: 1100, 1001, 0011 -> Output: 2'],
  constraints: ['1 means land and 0 means water.', 'Only four-directional connection counts.', 'Each island should be counted once.'],
  starterThought: 'An island is not one land cell. It is a connected component of land cells.',
  intuition: 'Every land cell is a graph node. When scanning finds unvisited land, that is a new island. DFS or BFS then marks the whole connected island as visited.',
  mentalPicture: 'A map of land and water. When you step onto a new island, you walk across all connected land and mark your footprints.',
  patternSignal: 'Use graph traversal when neighboring cells form connected groups and you must avoid double-counting.',
  invariant: 'Every visited land cell already belongs to an island that has been counted.',
  bruteForceThought: 'Counting every land cell counts land size, not connected groups.',
  optimizationJourney: 'Count only the first unvisited land cell of a component. Traversal absorbs the rest of that island.',
  stepByStepBreakdown: ['Scan every cell.', 'When unvisited land is found, increment island count.', 'Run DFS from that cell.', 'Mark all connected land as visited.', 'Continue scanning for the next unvisited land cell.'],
  finalPattern: 'Connected component traversal on a grid.',
  commonMistake: 'Counting each land cell instead of each connected group, or accidentally allowing diagonal connections.',
  commonMistakes: ['Missing bounds checks.', 'Forgetting to mark visited before recursion continues.', 'Using diagonal directions when only four directions are allowed.'],
  edgeCases: ['All water', 'All land', 'Single cell grid', 'Separate islands touching only diagonally'],
  complexityAnalysis: 'Time is O(rows * cols) because each cell is visited at most once. Space is O(rows * cols) in the worst case for recursion depth or visited tracking.',
  explanation: 'Scan the grid. The first unvisited land cell starts island one and DFS marks its connected land. Later another unvisited land group starts island two. Visited land is skipped so each island is counted once.',
  solutionCode: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }

        int islands = 0;
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[0].length; col++) {
                if (grid[row][col] == '1') {
                    islands++;
                    dfs(grid, row, col);
                }
            }
        }
        return islands;
    }

    private void dfs(char[][] grid, int row, int col) {
        if (row < 0 || row >= grid.length ||
            col < 0 || col >= grid[0].length ||
            grid[row][col] != '1') {
            return;
        }

        grid[row][col] = '0';
        dfs(grid, row + 1, col);
        dfs(grid, row - 1, col);
        dfs(grid, row, col + 1);
        dfs(grid, row, col - 1);
    }
}`,
  finalTakeaway: 'A grid problem often becomes a graph problem when neighboring cells are connected.',
  visualExplanation: 'The visual shows scanning, counting only the first unvisited land cell of an island, and marking the entire component visited.',
  visualWalkthrough: {
    title: 'Grid connected-component walkthrough',
    summary: 'Each new unvisited land cell starts a new island, then traversal marks the whole component.',
    diagram: {
      type: 'grid',
      title: 'Grid islands',
      rows: ['r0', 'r1', 'r2'],
      columns: ['c0', 'c1', 'c2', 'c3'],
      defaultCellLabel: '0',
      stateTitle: 'Traversal state evolution',
      stateDescription: 'Visited land is turned into water or marked so it cannot be counted again.',
      baseCells: [
        { row: 0, col: 0, role: 'open', label: '1' },
        { row: 0, col: 1, role: 'open', label: '1' },
        { row: 1, col: 0, role: 'open', label: '1' },
        { row: 1, col: 3, role: 'open', label: '1' },
        { row: 2, col: 2, role: 'open', label: '1' },
        { row: 2, col: 3, role: 'open', label: '1' }
      ],
      frames: [
        { title: 'First unvisited land starts island 1', cells: [{ row: 0, col: 0, role: 'active', label: '1' }], state: { label: 'count=1', values: { row: 0, col: 0, islands: 1 }, helper: 'Start DFS from the first land cell.' }, description: 'The scan finds land that has not been visited. This is a new island.' },
        { title: 'DFS marks island 1', cells: [{ row: 0, col: 0, role: 'visited', label: 'v' }, { row: 0, col: 1, role: 'visited', label: 'v' }, { row: 1, col: 0, role: 'visited', label: 'v' }], state: { label: 'island 1 visited', values: { islands: 1 }, helper: 'Connected land is absorbed into the same island.' }, description: 'Traversal marks all connected land so those cells will not start new islands.' },
        { title: 'Second unvisited component starts island 2', cells: [{ row: 1, col: 3, role: 'active', label: '1' }, { row: 2, col: 2, role: 'open', label: '1' }, { row: 2, col: 3, role: 'open', label: '1' }], state: { label: 'count=2', values: { row: 1, col: 3, islands: 2 }, helper: 'This land was not connected to island 1.' }, description: 'A later unvisited land cell starts the second island.' },
        { title: 'All components counted', cells: [{ row: 1, col: 3, role: 'visited', label: 'v' }, { row: 2, col: 2, role: 'visited', label: 'v' }, { row: 2, col: 3, role: 'visited', label: 'v' }], state: { label: 'answer', values: { islands: 2 }, helper: 'No unvisited land remains.' }, description: 'The scan finishes after both components are marked.', finalResult: { title: 'Final answer', body: 'Return 2.' } }
      ]
    }
  },
  body: [{ type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use graph traversal when neighboring cells form connected groups.' }],
  relatedConcepts: ['connected components', 'DFS', 'BFS', 'visited set'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
