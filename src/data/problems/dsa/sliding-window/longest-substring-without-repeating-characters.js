import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'sliding-window-longest-substring-unique-001',
  topicId: 'sliding-window',
  title: 'Longest Substring Without Repeating Characters — variable sliding window',
  difficulty: 'Medium',
  estimatedTime: '15 min',
  tags: ['strings', 'sliding-window', 'hash-set', 'interview-pattern', 'mental-model', 'visual-walkthrough'],
  scenario: 'Find the length of the longest contiguous substring that contains no repeated characters.',
  prompt: 'How does a variable-size sliding window grow while valid and shrink when a duplicate enters?',
  starterThought: 'Keep one live window instead of restarting every substring from scratch.',
  plainLanguageExplanation: 'The right pointer expands the window by adding new characters. If the window becomes invalid because a duplicate appears, the left pointer moves forward until the duplicate is removed. The best length is updated only after the window is valid.',
  mentalPicture: 'A camera frame moves across the string. The frame is only allowed to contain unique characters. If a repeated character enters the frame, the left side slides forward until the frame is clean again.',
  bruteForceThought: 'Brute force checks many substrings and repeatedly rechecks characters it already understood.',
  optimizationJourney: 'The key is that a bad window can be repaired by moving the left edge. Each character enters once and leaves once, so the scan stays linear.',
  finalPattern: 'Variable sliding window with a validity invariant.',
  commonMistake: 'Moving left only once when several removals are needed can leave the window invalid. Another common mistake is updating best length before removing duplicates.',
  edgeCases: ['Empty string', 'All unique characters', 'All same characters', 'Duplicates far apart', 'Substring is contiguous; subsequence is not allowed'],
  complexityAnalysis: 'Time is O(n) because each character enters the window at most once and leaves at most once. Space is O(k), where k is the character set stored in the set or map.',
  finalTakeaway: 'Sliding window works when you can fix a bad window by moving one side instead of starting over.',
  selfExplanationPrompt: 'Explain why the left pointer never needs to move backward.',
  body: [
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use a sliding window when you need the best contiguous subarray or substring and can repair invalid windows by moving one boundary.' },
    {
      type: 'table',
      title: 'Step frames: s = "abca"',
      columns: ['Left', 'Right', 'Entering', 'Window before fix', 'Action', 'Best'],
      rows: [
        ['0', '0', 'a', 'a', 'Valid. Keep [a].', '1'],
        ['0', '1', 'b', 'ab', 'Valid. Keep [ab].', '2'],
        ['0', '2', 'c', 'abc', 'Valid. Keep [abc].', '3'],
        ['0', '3', 'a', 'abca', 'Duplicate a. Remove from left until old a leaves.', '3'],
        ['1', '3', 'a', 'bca', 'Valid again. Keep best at 3.', '3']
      ]
    },
    { type: 'flow', title: 'Window loop', steps: ['Add s[right]', 'If duplicate appears, move left and remove characters until valid', 'Update best length from the valid window', 'Move right forward'] },
    { type: 'checklist', title: 'Explain it well', items: ['Name the invariant: window has unique characters', 'Say what the set/map tracks', 'Shrink until valid, not just once', 'Update best only when valid'] }
  ],
  relatedConcepts: ['two pointers', 'hash set', 'window invariant'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
