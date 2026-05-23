import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'two-pointers-container-with-most-water-001',
  topicId: 'two-pointers',
  title: 'Container With Most Water — two pointers',
  difficulty: 'Medium',
  estimatedTime: '13 min',
  language: 'java',
  tags: ['arrays', 'two-pointers', 'interview-pattern', 'mental-model', 'visual-walkthrough', 'coding'],
  scenario: 'Given vertical line heights, choose two lines that hold the most water.',
  question: 'Given height = [1, 8, 6, 2, 5, 4, 8, 3, 7], return 49.',
  examples: ['Input: height = [1,8,6,2,5,4,8,3,7] -> Output: 49'],
  constraints: ['Area is width times the shorter wall.', 'Move two pointers inward until they meet.', 'Return the maximum area found.'],
  starterThought: 'Area depends on width and the shorter wall. The shorter wall is the bottleneck.',
  intuition: 'Start with the widest container. Moving the taller wall inward cannot improve the height limit while the shorter wall stays, so move the shorter wall and search for a better bottleneck.',
  mentalPicture: 'Two walls hold water. The shorter wall decides the water height.',
  patternSignal: 'Use two pointers when a boundary pair and a bottleneck rule let you eliminate one side safely.',
  invariant: 'best stores the maximum area seen so far, and every move discards only pairs that cannot beat the current pair with the same bottleneck.',
  bruteForceThought: 'Brute force checks every pair of walls, which is clear but wastes work on pairs that can be eliminated.',
  optimizationJourney: 'If the left wall is shorter, any smaller-width container using that same left wall cannot beat the current area. So the left pointer must move.',
  stepByStepBreakdown: ['Start left at 0 and right at n - 1.', 'Compute width times min(height[left], height[right]).', 'Update best.', 'Move the pointer at the shorter wall.', 'Repeat until pointers meet.'],
  finalPattern: 'Two-pointer bottleneck elimination.',
  commonMistake: 'Moving the taller pointer because it looks more important misses the fact that the shorter pointer limits the current area.',
  commonMistakes: ['Using the taller height in the area formula.', 'Moving both pointers every time.', 'Forgetting to update best before moving.'],
  edgeCases: ['Only two lines', 'Equal heights', 'Strictly increasing heights', 'Strictly decreasing heights'],
  complexityAnalysis: 'Time is O(n) because each pointer moves inward at most n times total. Space is O(1).',
  explanation: 'The best container uses height 8 at index 1 and height 7 at index 8. Width is 7 and the limiting height is 7, so the area is 49.',
  solutionCode: `class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int best = 0;

        while (left < right) {
            int width = right - left;
            int limitingHeight = Math.min(height[left], height[right]);
            best = Math.max(best, width * limitingHeight);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return best;
    }
}`,
  finalTakeaway: 'When one side is the bottleneck, move the bottleneck.',
  visualExplanation: 'The visual tracks left, right, width, limiting height, and best area while the shorter wall moves.',
  visualWalkthrough: {
    title: 'Two-pointer bottleneck walkthrough',
    summary: 'Each step computes the current area and moves the shorter wall because it limits the water height.',
    diagram: {
      type: 'array',
      title: 'height = [1,8,6,2,5,4,8,3,7]',
      values: [1, 8, 6, 2, 5, 4, 8, 3, 7],
      stateTitle: 'Pointer state evolution',
      stateDescription: 'The shorter wall is the bottleneck for the current container.',
      frames: [
        { title: 'Start widest', activeRange: [0, 8], items: [{ index: 0, role: 'current', caption: 'L' }, { index: 8, role: 'current', caption: 'R' }], state: { label: 'area=8', values: { left: 0, right: 8, width: 8, limit: 1, best: 8 }, helper: 'Left wall is shorter, so move left.' }, description: 'The widest pair has small height limit because height[0] is only 1.' },
        { title: 'Find strong container', activeRange: [1, 8], items: [{ index: 1, role: 'answer', caption: 'L' }, { index: 8, role: 'answer', caption: 'R' }], state: { label: 'area=49', values: { left: 1, right: 8, width: 7, limit: 7, best: 49 }, helper: 'This becomes the best area.' }, description: 'Now the limiting height is 7 and the width is 7, producing area 49.' },
        { title: 'Move shorter right wall', activeRange: [1, 7], items: [{ index: 1, role: 'current', caption: 'L' }, { index: 7, role: 'remove', caption: 'R' }], state: { label: 'area=18', values: { left: 1, right: 7, width: 6, limit: 3, best: 49 }, helper: 'Right wall is shorter, so move right.' }, description: 'The area is smaller. The shorter right wall is the only useful pointer to move.' },
        { title: 'Best remains 49', activeRange: [1, 6], items: [{ index: 1, role: 'answer', caption: 'best L' }, { index: 8, role: 'answer', caption: 'best R' }], state: { label: 'answer', values: { best: 49 }, helper: 'No later smaller-width pair beats 49.' }, description: 'Continue until pointers meet; the maximum stays 49.', finalResult: { title: 'Final answer', body: 'Return 49.' } }
      ]
    }
  },
  body: [{ type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use two pointers when a bottleneck lets you safely eliminate one boundary.' }],
  relatedConcepts: ['two pointers', 'greedy elimination', 'bottleneck reasoning'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
