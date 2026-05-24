import { defineProblem } from '../../../../problems/problemAuthoring.js';

const question = 'Given strings s and p, return all start indices of p\'s anagrams in s. The result must contain indices in increasing order.';

const problem = defineProblem({
  id: 'anagram-frequency-window-001',
  type: 'coding',
  category: 'dsa',
  topicId: 'sliding-window',
  title: 'Find All Anagrams in a String — fixed-size frequency window',
  difficulty: 'Medium',
  estimatedTime: '20 min',
  language: 'javascript',
  tags: [
    'strings',
    'sliding-window',
    'fixed-window',
    'frequency-map',
    'anagram',
    'coding',
    'visual-walkthrough'
  ],
  scenario: 'Find every contiguous substring of s that is a permutation of p. For s = "cbaebabacd" and p = "abc", the valid windows are "cba" starting at 0 and "bac" starting at 6.',
  prompt: question,
  question,
  examples: [
    {
      input: 's = "cbaebabacd", p = "abc"',
      output: '[0, 6]',
      explanation: '"cba" at index 0 is an anagram of "abc", and "bac" at index 6 is also an anagram of "abc".'
    },
    {
      input: 's = "abab", p = "ab"',
      output: '[0, 1, 2]',
      explanation: '"ab", "ba", and "ab" are overlapping fixed-size windows, and all three are anagrams of "ab".'
    }
  ],
  constraints: [
    'The candidate must be a contiguous substring of s, not a subsequence.',
    'Every candidate window has fixed length p.length.',
    'Assume lowercase English letters for the count-array solution.',
    'Return [] when p is longer than s.',
    'If p is empty, return [] for this authored problem convention because there is no meaningful non-empty anagram window to report.',
    'The result indices must be returned in increasing order.'
  ],
  starterThought: 'Stage A used the same fixed-size slide with a rolling sum. Here the window still moves the same way, but the maintained state is a frequency table instead of one number.',
  intuition: 'An anagram of p must use exactly the same characters with exactly the same counts. That means every candidate in s must have length p.length. Slide a fixed-size window across s. When a character enters from the right, increment its window count. If the window grows too large, the character at left leaves, so decrement its count and move left. Once the window has exactly p.length characters, compare the window counts with the target counts from p. A match means the current left index is an answer.',
  mentalPicture: 'Picture a small tray that can hold exactly p.length letters. The tray slides across s one position at a time. Each slide removes the oldest letter and adds the newest letter. If the tray contains the same letter counts as p, the tray spells an anagram even if the order is different.',
  patternSignal: 'Use this pattern when the prompt asks for permutations or anagrams inside a string and every valid answer must have the same length as the pattern.',
  invariant: 'After each iteration, the window frequency array describes exactly the characters in s[left..right]. Before checking for a match, the algorithm ensures the window length is exactly p.length.',
  bruteForceThought: 'A brute-force solution sorts every length-p substring and compares it with sorted p. That repeats O(k log k) sorting work for each candidate window and hides the simple outgoing/incoming update.',
  optimizationJourney: 'A fixed-size frequency window reuses the previous window. One character leaves, one character enters, and only two counts change. Comparing 26 lowercase counts is constant-size work, so the scan is effectively linear.',
  stepByStepBreakdown: [
    'If p is empty or p.length is greater than s.length, return [].',
    'Build targetFreq from the characters in p.',
    'Keep windowFreq for the current window in s and start left at 0.',
    'Move right from 0 to s.length - 1 and increment the count for s[right].',
    'If the current window length becomes greater than p.length, decrement the count for s[left] and move left forward.',
    'When the window length equals p.length, compare targetFreq and windowFreq.',
    'If the frequencies match, push left into the answer list.',
    'Continue sliding so overlapping answers, such as s = "abab" and p = "ab", are not missed.'
  ],
  finalPattern: 'Fixed-size sliding window with frequency state.',
  workedExample: {
    input: 's = "cbaebabacd", p = "abc"',
    targetFrequency: '{ a: 1, b: 1, c: 1 }',
    trace: [
      { window: 'cba', indices: '0..2', windowFrequency: '{ a: 1, b: 1, c: 1 }', action: 'record 0' },
      { window: 'bae', indices: '1..3', outgoing: 'c', incoming: 'e', windowFrequency: '{ a: 1, b: 1, e: 1 }', action: 'no match' },
      { window: 'bac', indices: '6..8', windowFrequency: '{ a: 1, b: 1, c: 1 }', action: 'record 6' }
    ],
    answer: '[0, 6]'
  },
  edgeCases: [
    'p longer than s returns [].',
    's empty returns [].',
    'p empty returns [] in this problem convention.',
    'Repeated characters in p require exact counts, such as p = "aab" needing two a characters and one b.',
    'Overlapping windows must be checked, such as s = "abab", p = "ab" producing [0, 1, 2].',
    'A mismatch can have the right length but the wrong counts, such as "bae" versus target "abc".'
  ],
  commonMistake: 'The most common mistake is sorting every substring or comparing only sets of characters. Anagrams need exact frequency counts, and the window can update those counts in O(1) per move for entering and leaving characters.',
  commonMistakes: [
    'Sorting every length-p substring instead of maintaining frequency state.',
    'Letting the window grow beyond p.length before checking for a match.',
    'Forgetting to decrement the outgoing character when left advances.',
    'Treating subsequences as valid anagrams even though the problem requires contiguous substrings.',
    'Recording an answer before the first full p.length window exists.',
    'Forgetting overlapping answers, especially examples like s = "abab", p = "ab".',
    'Comparing only distinct characters and missing repeated-character requirements such as p = "aab".'
  ],
  hints: [
    'Every valid anagram window has length p.length.',
    'Build one frequency table for p and one for the active window in s.',
    'When right adds a character, increment its window count.',
    'When the window becomes too long, decrement s[left] and then move left.',
    'Only record left after the window is full and its counts match the target counts.'
  ],
  complexityAnalysis: 'Let n be s.length and let alphabet be 26 for lowercase English letters. The loop visits each character once with right, and left only moves forward as characters leave the fixed-size window. Comparing two 26-length arrays after each full window costs O(26), so the total time is O(n * 26), which is effectively O(n) for a fixed alphabet. Extra space is O(26) for the target and window frequency arrays, which is O(1) for lowercase English letters.',
  explanation: 'For s = "cbaebabacd" and p = "abc", the target count is a:1, b:1, c:1. The first full window "cba" has exactly the same counts, so index 0 is recorded. The window then slides one step: c leaves and e enters, producing "bae", whose counts do not match the target. The scan continues with the same fixed-size rule. Later, the window "bac" at indices 6..8 again has a:1, b:1, c:1, so index 6 is recorded. The final answer is [0, 6].',
  solutionCode: `function findAnagrams(s, p) {
  if (p.length === 0 || p.length > s.length) {
    return [];
  }

  const base = 'a'.charCodeAt(0);
  const targetFreq = Array(26).fill(0);
  const windowFreq = Array(26).fill(0);
  const result = [];
  let left = 0;

  for (const ch of p) {
    targetFreq[ch.charCodeAt(0) - base]++;
  }

  for (let right = 0; right < s.length; right++) {
    windowFreq[s.charCodeAt(right) - base]++;

    if (right - left + 1 > p.length) {
      windowFreq[s.charCodeAt(left) - base]--;
      left++;
    }

    if (right - left + 1 === p.length && sameFrequency(targetFreq, windowFreq)) {
      result.push(left);
    }
  }

  return result;
}

function sameFrequency(a, b) {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}`,
  solution: {
    language: 'javascript',
    approach: 'Maintain target and window frequency arrays for lowercase English letters, slide a fixed-size window, and record the left index whenever the arrays match.',
    code: `function findAnagrams(s, p) {
  if (p.length === 0 || p.length > s.length) {
    return [];
  }

  const base = 'a'.charCodeAt(0);
  const targetFreq = Array(26).fill(0);
  const windowFreq = Array(26).fill(0);
  const result = [];
  let left = 0;

  for (const ch of p) {
    targetFreq[ch.charCodeAt(0) - base]++;
  }

  for (let right = 0; right < s.length; right++) {
    windowFreq[s.charCodeAt(right) - base]++;

    if (right - left + 1 > p.length) {
      windowFreq[s.charCodeAt(left) - base]--;
      left++;
    }

    if (right - left + 1 === p.length && sameFrequency(targetFreq, windowFreq)) {
      result.push(left);
    }
  }

  return result;
}

function sameFrequency(a, b) {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}`
  },
  finalTakeaway: 'The window movement is still fixed-size: one character leaves and one enters. The new Stage B idea is that the rolling state is a frequency table, not a sum.',
  visualWalkthrough: {
    title: 'Fixed-size frequency window',
    summary: 'Watch the window keep length 3 while counts change. A match happens when the active window has the same frequency table as p = "abc".',
    diagram: {
      type: 'array',
      variant: 'sliding-window',
      title: 'Fixed-size frequency window',
      description: 'One character leaves and one character enters while frequency counts are updated.',
      values: ['c', 'b', 'a', 'e', 'b', 'a', 'b', 'a', 'c', 'd'],
      stateTitle: 'Frequency state',
      stateDescription: 'The window tracks character counts and compares them with the target pattern counts.',
      legend: [
        { role: 'window', label: 'current fixed-size window' },
        { role: 'remove', label: 'outgoing character' },
        { role: 'current', label: 'incoming character' },
        { role: 'answer', label: 'recorded anagram start' },
        { role: 'success', label: 'frequency match' },
        { role: 'warning', label: 'frequency mismatch' }
      ],
      frames: [
        {
          title: 'First full window cba matches',
          description: 'The first full length-3 window is "cba". Order is different from "abc", but the frequency counts are identical.',
          activeRange: [0, 2],
          items: [
            { index: 0, role: 'answer', caption: 'record 0' },
            { index: 1, role: 'window' },
            { index: 2, role: 'current', caption: 'full window' }
          ],
          state: {
            label: 'match',
            role: 'success',
            values: ['target {a:1,b:1,c:1}', 'window {a:1,b:1,c:1}', 'left 0', 'right 2', 'result [0]'],
            helper: 'The window has exactly p.length characters, and every target count matches.'
          }
        },
        {
          title: 'Slide from cba to bae',
          description: 'Move one step. The outgoing c is decremented, and the incoming e is incremented.',
          activeRange: [1, 3],
          items: [
            { index: 0, role: 'remove', caption: 'c leaves' },
            { index: 1, role: 'window', caption: 'left' },
            { index: 3, role: 'current', caption: 'e enters' }
          ],
          state: {
            label: 'mismatch',
            role: 'warning',
            values: ['target {a:1,b:1,c:1}', 'window {a:1,b:1,e:1}', 'decrement c', 'increment e', 'result [0]'],
            helper: 'The window has length 3, but it has e instead of c, so left is not recorded.'
          }
        },
        {
          title: 'Another full window still mismatches',
          description: 'The window "aeb" keeps the correct size, but the counts still do not equal the target counts.',
          activeRange: [2, 4],
          items: [
            { index: 1, role: 'remove', caption: 'b left earlier' },
            { index: 2, role: 'window', caption: 'left' },
            { index: 4, role: 'current', caption: 'b enters' }
          ],
          state: {
            label: 'mismatch',
            role: 'warning',
            values: ['target {a:1,b:1,c:1}', 'window {a:1,b:1,e:1}', 'missing c', 'extra e', 'result [0]'],
            helper: 'Correct length is necessary, but not enough. The frequency table must also match.'
          }
        },
        {
          title: 'Later window bac matches',
          description: 'At indices 6..8, the window is "bac". Its counts match "abc", so record index 6.',
          activeRange: [6, 8],
          items: [
            { index: 6, role: 'answer', caption: 'record 6' },
            { index: 7, role: 'window' },
            { index: 8, role: 'current', caption: 'c enters' }
          ],
          state: {
            label: 'match',
            role: 'success',
            values: ['target {a:1,b:1,c:1}', 'window {a:1,b:1,c:1}', 'left 6', 'right 8', 'result [0, 6]'],
            helper: 'The same frequency state appears again, so this start index is also an answer.'
          }
        },
        {
          title: 'Final result',
          description: 'After scanning every full fixed-size window, only starts 0 and 6 matched the target frequency.',
          activeRange: [7, 9],
          items: [
            { index: 6, role: 'answer', caption: 'answer 0' },
            { index: 8, role: 'answer', caption: 'answer 6 window end' },
            { index: 9, role: 'current', caption: 'scan complete' }
          ],
          state: {
            label: 'done',
            role: 'success',
            values: ['checked all length-3 windows', 'matches at starts 0 and 6', 'final result [0, 6]'],
            helper: 'Answers are recorded only after a full window exists and its frequency table matches the target.'
          },
          finalResult: { title: 'Return value', body: 'Return [0, 6].' }
        }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'Core idea', content: 'This is the same fixed-size slide from rolling-sum problems, but the state is a frequency table. One character leaves, one character enters, and the counts decide whether the window is an anagram.' },
    { type: 'callout', tone: 'warning', title: 'Contiguous only', content: 'Do not skip characters. Every candidate is a contiguous length-p.length window inside s.' },
    {
      type: 'flow',
      title: 'Window update order',
      steps: [
        'Add s[right] to the window frequency.',
        'If the window is too long, remove s[left] and advance left.',
        'Only when the window length equals p.length, compare frequencies.',
        'Record left if the frequency arrays match.'
      ]
    }
  ],
  relatedConcepts: ['fixed-size window', 'frequency array', 'anagram matching', 'outgoing character', 'incoming character'],
  followUpQuestions: [
    'How would you change this for a larger character set where 26-count arrays are not enough?',
    'How could a matched-count or frequency-delta approach avoid comparing all 26 counts each time?',
    'Why does this problem allow overlapping windows while still moving left and right only forward?'
  ],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
