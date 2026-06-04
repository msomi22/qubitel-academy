const minimumSidewayJumps = {
  id: 'dynamic-programming-020',
  type: 'coding',
  topicId: 'dynamic-programming',
  title: 'Minimum Sideway Jumps',
  difficulty: 'Medium',
  estimatedTime: '10 min',
  language: 'java',
  tags: [
    'dsa',
    'dynamic-programming',
    'state-compression',
    'greedy',
    'minimum-sideway-jumps',
    'coding'
  ],
  scenario:
    'A frog starts in lane 2 at position 0 and wants to reach the end of a three-lane road. Some positions have obstacles in specific lanes. Moving forward in the same lane is free, while side-jumping to another lane costs 1.',
  question:
    'Given obstacles = [0, 1, 2, 3, 0, 0], find the minimum number of sideway jumps needed for the frog to reach the end. Output: 2.',
  examples: [
    'Input: obstacles = [0, 1, 2, 3, 0, 0] → Output: 2'
  ],
  constraints: [
    'The road has exactly 3 lanes.',
    'obstacles[i] is 0 when no lane is blocked at position i.',
    'obstacles[i] is 1, 2, or 3 when that lane is blocked at position i.',
    'Moving forward in the same lane costs 0; side-jumping costs 1.'
  ],
  starterThought:
    'The key is not to choose one lane too early. Because choosing left or right immediately may be locally okay but not globally best, keep three values alive at every position: the minimum cost to stand in lane 1, lane 2, and lane 3. At each obstacle, mark the blocked lane as unreachable, then relax every open lane using the cheapest valid lane plus one side jump.',
  intuition:
    'Key Insight — State Compression: instead of asking only “I am currently in lane 2, lane 2 is blocked ahead, should I jump left or right?”, ask three DP questions at every position: What is the minimum cost to be in lane 1? What is the minimum cost to be in lane 2? What is the minimum cost to be in lane 3? Those three costs are enough because future decisions only need the cheapest valid cost for each lane right now. A blocked lane becomes impossible, open lanes are relaxed, and the final answer is min(dp) because the frog may finish in any lane.',
  visualExplanation:
    'Start with dp = [1, 0, 1]. For every position, DP tracks all three lane costs at once. The frog marker is only illustrative; the algorithm has not committed to one final lane. First block impossible lanes, then relax open lanes, then return the minimum state at the end.',
  patternSignal:
    'The problem asks for a minimum cost over positions, but each position only needs three lane states. This is space-optimized dynamic programming with a local relaxation step that preserves the globally best answer.',
  invariant:
    'After processing each position, dp[lane] stores the minimum side jumps needed to be safely standing in that lane at that position. Blocked lanes are impossible before relaxation; open lanes are updated from the cheapest valid lane cost.',
  hints: [
    'Initialize dp = [1, 0, 1] because the frog starts in lane 2, while lanes 1 and 3 require one side jump to reach.',
    'Do not greedily choose left or right when the current lane is blocked; keep the best cost for all three lanes.',
    'When a lane is blocked at the current position, set that lane to infinity before relaxing open lanes.',
    'For every unblocked lane, compare its current cost with best + 1.',
    'The answer is the minimum of the three lane costs after processing all positions.'
  ],
  stepByStepBreakdown: [
    'Initialize DP array: start at position 0 in lane 2 with dp = [1, 0, 1].',
    'At each position, ask: what is the minimum cost to be in lane 1, lane 2, and lane 3?',
    'Set the blocked lane cost to infinity because the frog cannot stand there.',
    'Find the best cost among the remaining valid lanes.',
    'For each unblocked lane, relax its cost using best + 1 side jump.',
    'Return min(dp) after processing the final position, because the frog can finish in any lane.'
  ],
  bruteForceThought:
    'A brute-force search could try every forward move and side jump path. That quickly repeats the same lane-position states. A greedy version that immediately chooses left or right can also miss the globally best path, because the better lane may only become obvious after future obstacles.',
  optimizationJourney:
    'The optimized version compresses all path history into three lane costs. Local updates are safe because each dp value already stores the best known way to stand in that lane at the current position. Since there are only three lanes, every position does constant work.',
  finalPattern: 'Dynamic Programming with State Compression',
  complexityAnalysis:
    'Time: O(n), because each obstacle position is processed once and each position performs constant work across 3 lanes. Space: O(1), because only 3 DP values are stored.',
  explanation:
    'Set dp = [1, 0, 1]. For each obstacle position after the start, first mark the blocked lane as unreachable. Then compute the best current valid cost and relax each unblocked lane with best + 1. This avoids committing to a left-or-right jump too early. For obstacles = [0, 1, 2, 3, 0, 0], the final state is [2, 3, 3], so the minimum number of sideway jumps is 2.',
  solutionCode: `class Solution {
    public int minSideJumps(int[] obstacles) {
        final int INF = 1_000_000;
        int[] dp = {1, 0, 1};

        for (int i = 1; i < obstacles.length; i++) {
            int blockedLane = obstacles[i];

            if (blockedLane != 0) {
                dp[blockedLane - 1] = INF;
            }

            int best = Math.min(dp[0], Math.min(dp[1], dp[2]));

            for (int lane = 0; lane < 3; lane++) {
                if (blockedLane != lane + 1) {
                    dp[lane] = Math.min(dp[lane], best + 1);
                }
            }
        }

        return Math.min(dp[0], Math.min(dp[1], dp[2]));
    }
}`,
  engineeringInsight:
    'This is a strong example of senior DP thinking: keep the state small, update it safely, and prove that the compressed state still contains everything needed for the next decision.',
  commonMistake:
    'A natural but incomplete framing is: “I am currently in lane 2. Lane 2 is blocked ahead. Should I jump left or right?” That commits to one side too early. Instead, keep the minimum cost for all three lanes and let the DP state decide which lane remains globally cheapest.',
  commonMistakes: [
    'Choosing left or right greedily as soon as the current lane is blocked, instead of tracking all three lane costs.',
    'Forgetting that lane numbers are 1-based while array indexes are 0-based.',
    'Relaxing a blocked lane instead of leaving it as infinity.',
    'Keeping a full DP table even though only the current 3-lane state is needed.',
    'Returning a specific lane cost instead of min(dp).'
  ],
  productionReality:
    'The same idea appears in route planning and constrained optimization: carry only the cheapest valid state for each small category of future choices, instead of committing to one locally attractive path too early.',
  relatedConcepts: [
    'Dynamic Programming',
    'State Compression',
    'Greedy Relaxation',
    'Minimum Cost Path',
    'O(1) Space DP'
  ],
  references: [
    'LeetCode 1824: Minimum Sideway Jumps',
    'Pattern: Dynamic Programming with 3 compressed lane states'
  ],
  visualWalkthrough: {
    title: 'Three-lane DP state walkthrough',
    summary: 'Track the compressed DP state [lane 1, lane 2, lane 3] at each obstacle. The frog marker is illustrative only; the important state is the cheapest valid cost for every lane.',
    diagram: {
      type: 'grid',
      variant: 'road',
      title: 'Three-lane road',
      description: 'Move forward for free when the lane is open, or side-jump once when an obstacle blocks the path. DP keeps all lane costs alive instead of committing to one lane too early.',
      rows: ['Lane 1', 'Lane 2', 'Lane 3'],
      columns: ['0', '1', '2', '3', '4', '5'],
      defaultCellLabel: '→',
      stateTitle: 'DP States Evolution',
      stateDescription: 'Each frame stores the best known cost as [lane 1, lane 2, lane 3]. ∞ means that lane is blocked or currently impossible.',
      legend: [
        { role: 'active', marker: '🐸', label: 'Illustrative frog marker' },
        { role: 'open', marker: '→', label: 'Open lane' },
        { role: 'blocked', marker: 'X', label: 'Blocked lane' },
        { role: 'goal', marker: '🏁', label: 'Goal' }
      ],
      baseCells: [
        { row: 0, col: 1, role: 'blocked', label: 'X' },
        { row: 1, col: 2, role: 'blocked', label: 'X' },
        { row: 2, col: 3, role: 'blocked', label: 'X' },
        { row: 0, col: 5, role: 'goal', label: '🏁' },
        { row: 1, col: 5, role: 'goal', label: '🏁' },
        { row: 2, col: 5, role: 'goal', label: '🏁' }
      ],
      frames: [
        { title: 'Start with three lane costs', position: 0, cells: [{ row: 1, col: 0, role: 'active', label: '🐸' }], state: { label: 'P0', values: [1, 0, 1], helper: 'Lane 2 costs 0; lanes 1 and 3 cost one side jump.' }, description: 'The frog starts in lane 2 at position 0. DP does not store one path; it stores the cheapest cost to be in each lane: [1, 0, 1].' },
        { title: 'Block lane 1 before relaxing', position: 1, cells: [{ row: 1, col: 1, role: 'active', label: '🐸' }], state: { label: 'P1', values: ['∞', 0, 1], helper: 'Lane 1 is impossible; lanes 2 and 3 remain valid states.' }, description: 'Position 1 blocks lane 1, so lane 1 becomes ∞ before any relaxation. DP still tracks lane 2 and lane 3 costs instead of committing to a single lane.' },
        { title: 'Lane 2 blocked: do not choose too early', position: 2, cells: [{ row: 0, col: 2, role: 'active', label: '🐸' }], state: { label: 'P2', values: [2, '∞', 1], helper: 'Lane 3 is currently cheapest; lane 1 is also reachable.' }, description: 'Position 2 blocks lane 2. The tempting question is “should I jump left or right?” DP avoids that greedy choice by keeping both open-lane costs: lane 1 costs 2 and lane 3 costs 1.' },
        { title: 'Lane 3 blocked: carry valid alternatives', position: 3, cells: [{ row: 0, col: 3, role: 'active', label: '🐸' }], state: { label: 'P3', values: [2, 3, '∞'], helper: 'Lane 1 is cheapest, lane 2 remains possible, lane 3 is blocked.' }, description: 'Position 3 blocks lane 3, so lane 3 becomes ∞ before relaxation. Lane 1 remains cheapest, but lane 2 is still tracked as a valid alternative at cost 3.' },
        { title: 'Relax all open lanes', position: 4, cells: [{ row: 0, col: 4, role: 'active', label: '🐸' }], state: { label: 'P4', values: [2, 3, 3], helper: 'No block: every open lane compares against best + 1.' }, description: 'Position 4 has no block. DP relaxes every lane from the best valid cost, so lane 3 becomes reachable again at cost 3. The marker does not mean the algorithm has committed to lane 1 only.' },
        { title: 'Return the cheapest finishing lane', position: 5, cells: [{ row: 0, col: 5, role: 'active', label: '🐸' }], state: { label: 'P5', values: [2, 3, 3], helper: 'Final answer is min(dp), not a hardcoded lane.' }, description: 'At the end, the frog may finish in any lane. The final state is [2, 3, 3], so the answer is min(2, 3, 3) = 2 sideway jumps.', finalResult: { title: 'Final answer', body: 'Minimum sideway jumps = min(2, 3, 3) = 2.' } }
      ]
    }
  }
};

export default minimumSidewayJumps;
