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
  visualExplanation: 'For coins = [1, 2, 5] and amount = 11, the visual shows the actual dp table from amount 0 through amount 11.',
  visualWalkthrough: {
    title: 'Coin Change DP walkthrough',
    summary: 'For coins = [1, 2, 5] and amount = 11, solve every amount from 0 through 11 and reuse saved smaller answers.',
    diagram: {
      type: 'array',
      title: 'DP table updates',
      description: 'Top numbers are the amounts being solved: 0 through 11. Each box shows dp[amount], the fewest coins needed for that amount using coins [1, 2, 5].',
      values: ['0', '1', '1', '2', '2', '1', '2', '2', '3', '3', '2', '3'],
      stateTitle: 'Current update',
      stateDescription: 'The latest state explains the highlighted amount.',
      stateOrder: 'latest-first',
      frames: [
        {
          title: 'Start with amount 0',
          items: [{ index: 0, role: 'answer', label: '0', caption: 'dp[0]' }],
          state: { label: 'dp[0] = 0', values: ['amount 0', '0 coins'], helper: 'Making amount 0 needs no coins. This is the base state every later amount can build from.' },
          description: 'The full table has one cell for every amount from 0 to 11. Start with dp[0] = 0.'
        },
        {
          title: 'Fill the one-coin amounts',
          items: [
            { index: 1, role: 'current', label: '1', caption: 'dp[1]' },
            { index: 2, role: 'current', label: '1', caption: 'dp[2]' },
            { index: 5, role: 'current', label: '1', caption: 'dp[5]' }
          ],
          state: { label: 'dp[1], dp[2], dp[5] = 1', values: ['coin 1', 'coin 2', 'coin 5'], helper: 'Amounts 1, 2, and 5 each match an available coin, so each needs exactly one coin.' },
          description: 'The denominations are [1, 2, 5]. Those amounts are easy: each can be made directly with one coin.'
        },
        {
          title: 'Intermediate amounts are still part of the table',
          items: [
            { index: 3, role: 'current', label: '2', caption: 'dp[3]' },
            { index: 4, role: 'current', label: '2', caption: 'dp[4]' },
            { index: 7, role: 'current', label: '2', caption: 'dp[7]' },
            { index: 8, role: 'current', label: '3', caption: 'dp[8]' },
            { index: 9, role: 'current', label: '3', caption: 'dp[9]' },
            { index: 10, role: 'current', label: '2', caption: 'dp[10]' }
          ],
          state: { label: 'No skipped amounts', values: ['dp[3]=2', 'dp[4]=2', 'dp[7]=2', 'dp[8]=3', 'dp[9]=3', 'dp[10]=2'], helper: 'DP solves every amount from 0 to 11. The visual highlights several middle cells here so it is clear they are not omitted.' },
          description: 'The table also contains amounts like 3, 4, 7, 8, 9, and 10. We still compute them because any of them might help build a later amount.'
        },
        {
          title: 'Amount 6 becomes useful for the target',
          items: [
            { index: 1, role: 'success', label: '1', caption: 'dp[1]' },
            { index: 6, role: 'current', label: '2', caption: 'dp[6]' }
          ],
          state: { label: 'dp[6] = 2', values: ['dp[1] + coin 5', '1 + 1 = 2'], helper: 'Amount 6 can be made by reusing the saved answer for amount 1, then adding coin 5: 1 + 5 = 6.' },
          description: 'Amount 6 matters because it is the smaller solved amount we can reuse to reach 11.'
        },
        {
          title: 'Reach amount 11',
          items: [
            { index: 6, role: 'success', label: '2', caption: 'reuse dp[6]' },
            { index: 11, role: 'answer', label: '3', caption: 'dp[11]' }
          ],
          state: { label: 'dp[11] = 3', values: ['dp[6] + coin 5', '2 + 1 = 3', '5 + 1 + 5'], helper: 'Use coin 5 as the last coin. Before that, amount 6 was already solved in 2 coins, so amount 11 takes 3 coins.' },
          description: 'Since dp[6] = 2, adding one more 5-coin gives dp[11] = 3. This matches 5 + 5 + 1.',
          finalResult: { title: 'Final answer', body: 'Return 3 because 11 can be made with three coins: 5 + 5 + 1. The problem asks for the fewest coins, not just any combination.' }
        }
      ]
    }
  },
  body: [
    {
      type: 'callout',
      tone: 'info',
      title: 'Why the answer is 3',
      content: 'We need to make 11 using coins [1, 2, 5]. One optimal way is 5 + 5 + 1 = 11, which uses 3 coins. The problem asks for the fewest coins, so the answer is 3.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Why dynamic programming?',
      content: 'For this example, the best answer is easy to see. In general, choosing the biggest coin first can fail, so DP saves the best answer for each smaller amount and reuses it.'
    },
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use DP when smaller saved answers build larger answers.' }
  ],
  relatedConcepts: ['bottom-up DP', 'state definition', 'transition'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
