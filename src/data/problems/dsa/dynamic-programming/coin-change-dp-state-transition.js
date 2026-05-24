import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'dynamic-programming-coin-change-state-transition-001',
  topicId: 'dynamic-programming',
  title: 'Coin Change — dynamic programming state/transition',
  difficulty: 'Medium',
  estimatedTime: '17 min',
  language: 'java',
  tags: ['dynamic-programming', 'state-transition', 'arrays', 'interview-pattern', 'visual-walkthrough', 'coding'],
  scenario: 'Given coin denominations and a target amount, find the fewest coins needed to make that amount.',
  question: 'Given coins = [1, 2, 5] and amount = 11, return 3.',
  examples: ['coins = [1, 2, 5], amount = 11 -> 3'],
  constraints: ['Each coin can be used multiple times.', 'Return -1 if the amount cannot be made.'],
  starterThought: 'To solve amount X, try using one coin now and ask which smaller amount remains.',
  intuition: 'Let dp[a] mean the fewest coins needed to make amount a. Start with dp[0] = 0, then build every larger amount from reachable smaller amounts.',
  mentalPicture: 'A row of boxes from amount 0 to the target amount. Each box stores the fewest coins needed for that amount.',
  patternSignal: 'Use DP when a large answer can be built from repeated smaller answers that should be saved.',
  invariant: 'After processing an amount, its dp cell stores the minimum number of coins currently known for that exact amount.',
  stepByStepBreakdown: ['Create the dp table.', 'Set the zero amount to zero.', 'Try every coin for every amount.', 'Keep the smallest reachable candidate.', 'Return the target cell or -1.'],
  bruteForceThought: 'Brute force repeats the same remaining amounts many times.',
  optimizationJourney: 'DP saves each smaller result once and reuses it.',
  finalPattern: 'Bottom-up DP with state and transition.',
  commonMistake: 'Treating unreachable states as valid can produce fake answers.',
  edgeCases: ['Amount zero', 'No valid combination', 'Coin larger than amount'],
  complexityAnalysis: 'Time is O(amount times number of coins). Space is O(amount).',
  explanation: 'For every amount, try each coin as the last coin used. If the remaining amount is reachable, that creates a candidate answer. The smallest candidate becomes the dp value.',
  solutionCode: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int limit = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, limit);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                int prev = a - coin;
                if (prev >= 0 && dp[prev] != limit) {
                    dp[a] = Math.min(dp[a], dp[prev] + 1);
                }
            }
        }

        return dp[amount] == limit ? -1 : dp[amount];
    }
}`,
  finalTakeaway: 'Dynamic programming works when a big answer can be built from saved smaller answers.',
  visualExplanation: 'Each frame highlights the dp cell that improves and the smaller saved answer it reuses.',
  visualWalkthrough: {
    title: 'Coin Change DP walkthrough',
    summary: 'Build the answer amount by amount using saved smaller answers.',
    diagram: {
      type: 'array',
      title: 'DP table updates',
      description: 'The highlighted cell is the amount currently being improved.',
      values: ['dp[0]', 'dp[1]', 'dp[2]', '...', 'dp[11]'],
      stateTitle: 'Current update',
      stateDescription: 'Only real table changes are shown here.',
      frames: [
        {
          title: 'Set dp[0] = 0',
          items: [{ index: 0, role: 'answer', label: '0', caption: 'known' }],
          state: { label: 'dp[0]', values: ['0 coins'], helper: 'Making amount 0 needs no coins, so this becomes the trusted starting point.' },
          description: 'Before solving positive amounts, the table needs one known answer: amount 0 costs 0 coins.'
        },
        {
          title: 'Improve dp[1] using coin 1',
          items: [{ index: 0, role: 'success', label: '0', caption: 'reuse' }, { index: 1, role: 'current', label: '1', caption: 'update' }],
          state: { label: 'dp[1]', values: ['dp[1]=1', 'dp[0]+1'], helper: 'Use the saved answer for amount 0, then add one coin of value 1.' },
          description: 'Amount 1 can be made from amount 0 plus coin 1, so dp[1] becomes 1.'
        },
        {
          title: 'Improve dp[2] using coin 2',
          items: [{ index: 0, role: 'success', label: '0', caption: 'reuse' }, { index: 2, role: 'current', label: '1', caption: 'update' }],
          state: { label: 'dp[2]', values: ['dp[2]=1', 'dp[0]+1'], helper: 'Coin 2 reaches amount 2 directly, so one coin is better than two 1-coins.' },
          description: 'The table keeps the fewest coins. For amount 2, one coin of value 2 is optimal.'
        },
        {
          title: 'Reach dp[11] with 5 + 5 + 1',
          items: [{ index: 0, role: 'success', label: '0', caption: 'base' }, { index: 4, role: 'answer', label: '3', caption: 'answer' }],
          state: { label: 'dp[11]', values: ['dp[11]=3', '5+5+1', '3 coins'], helper: 'The target amount 11 can be made with two 5-coins and one 1-coin.' },
          description: 'The best saved answer for amount 11 uses three coins: 5 + 5 + 1.',
          finalResult: { title: 'Final answer', body: 'Return 3 because 11 can be made with three coins, and no two-coin combination from [1, 2, 5] can make 11.' }
        }
      ]
    }
  },
  body: [
    {
      type: 'callout',
      tone: 'info',
      title: 'Why the answer is 3',
      content: 'We need to make 11 using the fewest coins. One optimal choice is 5 + 5 + 1 = 11, which uses 3 coins. The goal is not just to make the amount; it is to make it with the minimum number of coins.'
    },
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use DP when smaller saved answers build larger answers.' }
  ],
  relatedConcepts: ['bottom-up DP', 'state definition', 'transition'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
