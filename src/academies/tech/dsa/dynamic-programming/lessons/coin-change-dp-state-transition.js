import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

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
  starterThought: 'Treat each amount from 0 to 11 as its own smaller target. For each target amount, ask: what is the fewest number of coins needed to make exactly this amount?',
  intuition: 'Do not try to guess the full answer for 11 immediately. First build a table of trusted answers for smaller amounts. Once a smaller amount has a best answer saved, larger amounts can reuse it instead of solving that smaller amount again.',
  mentalPicture: 'Imagine a row of boxes from amount 0 to the target amount. Each box is a mini target. When a box is solved, its value becomes a trusted answer that later boxes can use.',
  patternSignal: 'Use DP when a large answer can be built from repeated smaller answers that should be saved.',
  invariant: 'After processing an amount, its dp cell stores the minimum number of coins currently known for that exact amount.',
  stepByStepBreakdown: ['Create one dp cell for every amount from 0 through 11.', 'Set dp[0] = 0 because amount 0 needs zero coins.', 'For each amount, try every coin that can fit.', 'Turn each valid coin into a candidate answer using the already-solved remaining amount.', 'Keep the smallest candidate in dp[amount].', 'Return dp[11] because 11 is the final target.'],
  bruteForceThought: 'Brute force keeps revisiting the same remaining amounts through different coin choices.',
  optimizationJourney: 'DP avoids that repetition by saving the best result for each amount once, then reusing it whenever a larger amount needs that smaller answer.',
  finalPattern: 'Bottom-up DP with state and transition.',
  commonMistake: 'Thinking dp[1], dp[2], and dp[3] mean progress toward 11. They are separate smaller target amounts, and each asks for the fewest coins needed to make that exact amount.',
  edgeCases: ['Amount zero', 'No valid combination', 'Coin larger than amount'],
  complexityAnalysis: 'Time is O(amount times number of coins). Space is O(amount).',
  explanation: 'For every amount a, try each coin as the last coin used. If the coin fits, the remaining amount is a - coin, so the candidate answer is dp[a - coin] + 1. The dp cell keeps the smallest valid candidate. If no candidate exists, the amount stays unreachable.',
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
  finalTakeaway: 'Dynamic programming works when a big answer can be built from saved smaller target amounts.',
  visualExplanation: 'For coins = [1, 2, 5] and amount = 11, the visual shows each mini target amount from 0 through 11 and the fewest coins needed for that amount.',
  visualWalkthrough: {
    title: 'Coin Change DP walkthrough',
    summary: 'Each dp cell is a smaller target amount. Solve 0 through 11, keep the fewest coins for each amount, then read the final answer from dp[11].',
    diagram: {
      type: 'array',
      title: 'DP table updates',
      description: 'Top numbers are the amounts being solved: 0 through 11. Each box shows dp[amount], the fewest coins needed for that exact amount using coins [1, 2, 5].',
      values: ['0', '1', '1', '2', '2', '1', '2', '2', '3', '3', '2', '3'],
      stateTitle: 'Current update',
      stateDescription: 'The highlighted box is the mini target currently being solved. Try every coin that can fit, then keep the candidate with the fewest coins.',
      stateOrder: 'latest-first',
      frames: [
        {
          title: 'Amount 0: base case',
          items: [{ index: 0, role: 'answer', label: '0', caption: 'dp[0]' }],
          state: { label: 'dp[0] = 0', values: ['target amount: 0', 'best: 0 coins'], helper: 'Making amount 0 needs no coins. This is the trusted starting point for every later transition.' },
          description: 'Before solving positive amounts, set dp[0] = 0.'
        },
        {
          title: 'Amount 1: only coin 1 fits',
          items: [{ index: 1, role: 'current', label: '1', caption: 'dp[1]' }],
          state: { label: 'dp[1] = 1', values: ['candidate: coin 1 gives dp[0] + 1 = 1 coin', 'skipped: coin 2 cannot help, because 2 > 1', 'skipped: coin 5 cannot help, because 5 > 1', 'best: 1 coin of denomination 1'], helper: 'For the mini target amount 1, only coin 1 can fit. So the fewest coins needed is 1.' },
          description: 'dp[1] asks: what is the fewest coins needed to make amount 1?'
        },
        {
          title: 'Amount 2: one 2-coin beats two 1-coins',
          items: [{ index: 2, role: 'current', label: '1', caption: 'dp[2]' }],
          state: { label: 'dp[2] = 1', values: ['candidate: using 1-coins gives 1 + 1 = 2 coins', 'candidate: coin 2 gives 1 coin', 'skipped: coin 5 cannot help, because 5 > 2', 'best: 1 coin of denomination 2'], helper: 'Amount 2 could be made with two 1-coins, but one 2-coin is fewer. So dp[2] = 1.' },
          description: 'For each amount, we compare valid ways and keep the fewest coins.'
        },
        {
          title: 'Amount 3: best is two coins',
          items: [{ index: 3, role: 'current', label: '2', caption: 'dp[3]' }],
          state: { label: 'dp[3] = 2', values: ['candidate: using 1-coins gives 1 + 1 + 1 = 3 coins', 'candidate: using 2 + 1 gives 2 coins', 'skipped: coin 5 cannot help, because 5 > 3', 'best: 2 coins, using denominations 2 and 1'], helper: 'Amount 3 is not a coin denomination, so DP builds it from smaller solved amounts.' },
          description: 'dp[3] asks for the fewest coins needed to make exactly amount 3.'
        },
        {
          title: 'Amount 4: two 2-coins beat four 1-coins',
          items: [{ index: 4, role: 'current', label: '2', caption: 'dp[4]' }],
          state: { label: 'dp[4] = 2', values: ['candidate: using 1-coins gives 4 coins', 'candidate: using 2 + 2 gives 2 coins', 'skipped: coin 5 cannot help, because 5 > 4', 'best: 2 coins of denomination 2'], helper: 'Many combinations can make the same amount, but dp keeps only the fewest coins.' },
          description: 'Amount 4 makes the comparison clear: four 1-coins work, but two 2-coins are better.'
        },
        {
          title: 'Amount 5: one 5-coin is best',
          items: [{ index: 5, role: 'current', label: '1', caption: 'dp[5]' }],
          state: { label: 'dp[5] = 1', values: ['candidate: using 1-coins gives 5 coins', 'candidate: using 2s and 1s gives 3 coins', 'candidate: coin 5 gives 1 coin', 'best: 1 coin of denomination 5'], helper: 'Coin 5 reaches amount 5 directly, so one coin is the best possible answer.' },
          description: 'A larger denomination can suddenly make a bigger amount cheaper.'
        },
        {
          title: 'Amount 6: add 1 to 5',
          items: [{ index: 6, role: 'current', label: '2', caption: 'dp[6]' }],
          state: { label: 'dp[6] = 2', values: ['candidate: coin 1 gives dp[5] + 1 = 2 coins', 'candidate: coin 2 gives dp[4] + 1 = 3 coins', 'candidate: coin 5 gives dp[1] + 1 = 2 coins', 'best: 2 coins, using denominations 5 and 1'], helper: 'Amount 6 is a mini target too. The best way is 5 + 1, using 2 coins.' },
          description: 'Amount 6 later helps solve amount 11.'
        },
        {
          title: 'Amount 7: add 2 to 5',
          items: [{ index: 7, role: 'current', label: '2', caption: 'dp[7]' }],
          state: { label: 'dp[7] = 2', values: ['candidate: coin 1 gives dp[6] + 1 = 3 coins', 'candidate: coin 2 gives dp[5] + 1 = 2 coins', 'candidate: coin 5 gives dp[2] + 1 = 2 coins', 'best: 2 coins, using denominations 5 and 2'], helper: 'Amount 7 can be made as 5 + 2, using 2 coins.' },
          description: 'DP continues solving every amount, even if it is not the final target.'
        },
        {
          title: 'Amount 8: best is three coins',
          items: [{ index: 8, role: 'current', label: '3', caption: 'dp[8]' }],
          state: { label: 'dp[8] = 3', values: ['candidate: coin 1 gives dp[7] + 1 = 3 coins', 'candidate: coin 2 gives dp[6] + 1 = 3 coins', 'candidate: coin 5 gives dp[3] + 1 = 3 coins', 'best: 3 coins, for example 5 + 2 + 1'], helper: 'Every valid last-coin choice gives 3 coins, so dp[8] = 3.' },
          description: 'Saved middle amounts, like dp[3] and dp[6], become useful later.'
        },
        {
          title: 'Amount 9: best is three coins',
          items: [{ index: 9, role: 'current', label: '3', caption: 'dp[9]' }],
          state: { label: 'dp[9] = 3', values: ['candidate: coin 1 gives dp[8] + 1 = 4 coins', 'candidate: coin 2 gives dp[7] + 1 = 3 coins', 'candidate: coin 5 gives dp[4] + 1 = 3 coins', 'best: 3 coins, for example 5 + 2 + 2'], helper: 'Amount 9 is best made in 3 coins, such as 5 + 2 + 2.' },
          description: 'This is why DP does not skip middle amounts like 4 and 7.'
        },
        {
          title: 'Amount 10: two 5-coins',
          items: [{ index: 10, role: 'current', label: '2', caption: 'dp[10]' }],
          state: { label: 'dp[10] = 2', values: ['candidate: coin 1 gives dp[9] + 1 = 4 coins', 'candidate: coin 2 gives dp[8] + 1 = 4 coins', 'candidate: coin 5 gives dp[5] + 1 = 2 coins', 'best: 2 coins of denomination 5'], helper: 'Amount 10 is best made with two 5-coins.' },
          description: 'The table keeps the minimum known coin count for amount 10.'
        },
        {
          title: 'Amount 11: final target',
          items: [{ index: 11, role: 'answer', label: '3', caption: 'dp[11]' }],
          state: { label: 'dp[11] = 3', values: ['candidate: make 10 first, dp[10] = 2, then add coin 1 → 3 coins', 'candidate: make 9 first, dp[9] = 3, then add coin 2 → 4 coins', 'candidate: make 6 first, dp[6] = 2, then add coin 5 → 3 coins', 'best: 3 coins, using 5 + 5 + 1'], helper: 'The best answer is 3 coins. One optimal combination is 5 + 5 + 1.' },
          description: 'For amount 11, we compare the smaller saved answers that can lead into 11, then keep the fewest coins.',
          finalResult: { title: 'Final answer', body: 'Return 3 because 11 can be made with three coins: 5 + 5 + 1. The problem asks for the fewest coins, not just any combination.' }
        }
      ]
    }
  },
  body: [
    {
      type: 'callout',
      tone: 'info',
      title: 'How to think about this problem',
      content: 'What each dp cell means\nBecause the final target is 11, we create one smaller target for every amount from 0 up to 11. dp[4] means: what is the fewest number of coins needed to make exactly amount 4? The answer is 2, because 2 + 2 uses fewer coins than 1 + 1 + 1 + 1.\n\nWhy the final answer is 3\nWe need to make amount 11 using coins [1, 2, 5]. The optimal way is 5 + 5 + 1 = 11, which uses 3 coins. The problem asks for the fewest coins, so the answer is 3.\n\nWhy dynamic programming?\nLarger amounts can reuse answers from smaller amounts. For example, once we know dp[6] = 2 from 5 + 1, amount 11 can reuse that saved answer by adding one more 5-coin: dp[6] + 1 = 3.\n\nPattern signal\nUse DP when smaller saved answers build larger answers.'
    }
  ],
  relatedConcepts: ['bottom-up DP', 'state definition', 'transition'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
