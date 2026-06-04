import { defineProblem } from '../../../../../problems/problemAuthoring.js';

const question = 'Given two strings s1 and s2, return true if s2 contains a permutation of s1. Otherwise, return false.';

const javaSolution = `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() == 0 || s1.length() > s2.length()) {
            return false;
        }

        int[] targetFreq = new int[26];
        int[] windowFreq = new int[26];

        for (int i = 0; i < s1.length(); i++) {
            targetFreq[s1.charAt(i) - 'a']++;
        }

        int left = 0;
        int windowLength = s1.length();

        for (int right = 0; right < s2.length(); right++) {
            windowFreq[s2.charAt(right) - 'a']++;

            if (right - left + 1 > windowLength) {
                windowFreq[s2.charAt(left) - 'a']--;
                left++;
            }

            if (right - left + 1 == windowLength && sameFrequency(targetFreq, windowFreq)) {
                return true;
            }
        }

        return false;
    }

    private boolean sameFrequency(int[] a, int[] b) {
        for (int i = 0; i < 26; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }

        return true;
    }
}`;

const problem = defineProblem({
  id: 'sliding-window-permutation-in-string-001',
  type: 'coding',
  category: 'dsa',
  topicId: 'sliding-window',
  title: 'Permutation in String — exact frequency window',
  difficulty: 'Medium',
  estimatedTime: '20 min',
  language: 'java',
  tags: [
    'strings',
    'sliding-window',
    'fixed-window',
    'frequency-map',
    'permutation',
    'java',
    'coding',
    'visual-walkthrough'
  ],
  scenario: 'You are given a short pattern string s1 and a larger search string s2. The task is not to build every permutation of s1. Instead, ask whether any contiguous length-s1.length() window inside s2 has exactly the same character counts as s1. For s1 = "ab" and s2 = "eidbaooo", the window "ba" is enough to return true because it has one b and one a.',
  prompt: question,
  question,
  examples: [
    {
      input: 's1 = "ab", s2 = "eidbaooo"',
      output: 'true',
      explanation: 's2 contains "ba", which is a permutation of "ab". The order changed, but the counts are still one a and one b.'
    },
    {
      input: 's1 = "ab", s2 = "eidboaoo"',
      output: 'false',
      explanation: 'No length-2 substring has one a and one b.'
    },
    {
      input: 's1 = "aabc", s2 = "eidbacaooo"',
      output: 'true',
      explanation: 's2 contains "baca", which has two a characters, one b, and one c.'
    }
  ],
  constraints: [
    'A permutation of s1 must use exactly the same characters with exactly the same counts.',
    'The matching substring must be contiguous inside s2.',
    'Every candidate window has length s1.length().',
    'The result is boolean, not a list of indices.',
    'Assume lowercase English letters for the Java int[26] solution.',
    'Return false when s1.length() > s2.length().',
    'For this authored problem convention, return false when s1 is empty.'
  ],
  starterThought: 'This is the boolean sibling of finding all anagram indices. The window state is still exact character frequency, but the moment one window matches, the job is finished.',
  intuition: 'A permutation ignores order but does not ignore counts. If s1 is "aabc", a valid window must contain two a characters, one b, and one c. That makes this a fixed-size window problem: any possible answer must be exactly s1.length() characters long. Slide that fixed-size window across s2 while maintaining character counts. When a new character enters on the right, increment its count. If the window becomes too long, remove the left character and decrement its count. Once the window length is exactly s1.length(), compare counts. If they match, return true immediately.',
  mentalPicture: 'Imagine a small scanner that can see exactly s1.length() characters at a time. The scanner does not care about the order of letters inside the glass. It only checks the inventory: how many a, how many b, how many c, and so on. If that inventory equals the inventory of s1, the scanner stops and reports success.',
  patternSignal: 'Use this pattern when the prompt asks whether one string contains a permutation of another, the valid candidate must be a contiguous substring, every candidate has a fixed length equal to the pattern length, and matching depends on exact character counts rather than order.',
  invariant: 'Before checking for a match, the window always contains exactly s1.length() characters from s2, and windowFreq describes exactly those characters. A match exists when windowFreq equals targetFreq.',
  bruteForceThought: 'A brute-force solution could sort every length-s1.length() substring of s2 and compare it with sorted s1. That works logically, but it rebuilds or sorts almost the same window again and again.',
  optimizationJourney: 'Sliding the window reuses the previous state. One character enters, and when the window is too long one character leaves. Only two frequency counts change per slide. Since the alphabet is fixed at 26 lowercase letters, checking whether two frequency arrays match is constant-size work.',
  stepByStepBreakdown: [
    'If s1 is empty, return false for this authored problem convention.',
    'If s1.length() is greater than s2.length(), return false because no full window can exist.',
    'Build targetFreq from s1 so each character count is known.',
    'Scan s2 with right, adding s2.charAt(right) into windowFreq.',
    'If the window grows beyond s1.length(), subtract s2.charAt(left) from windowFreq and move left forward.',
    'Only after the window length equals s1.length(), compare targetFreq and windowFreq.',
    'Return true immediately when the counts match because the problem only asks whether one permutation exists.',
    'If the scan finishes without an exact-frequency window, return false.'
  ],
  finalPattern: 'Fixed-size sliding window with exact frequency matching and boolean early return.',
  workedExample: {
    input: 's1 = "ab", s2 = "eidbaooo"',
    targetFrequency: '{ a: 1, b: 1 }',
    trace: [
      { window: 'ei', indices: '0..1', windowFrequency: '{ e: 1, i: 1 }', action: 'no match: correct length, wrong counts' },
      { window: 'id', indices: '1..2', outgoing: 'e', incoming: 'd', windowFrequency: '{ i: 1, d: 1 }', action: 'no match' },
      { window: 'db', indices: '2..3', outgoing: 'i', incoming: 'b', windowFrequency: '{ d: 1, b: 1 }', action: 'no match' },
      { window: 'ba', indices: '3..4', outgoing: 'd', incoming: 'a', windowFrequency: '{ a: 1, b: 1 }', action: 'return true' }
    ],
    answer: 'true'
  },
  edgeCases: [
    's1 longer than s2 returns false.',
    'Empty s1 returns false by this authored problem convention.',
    'Empty s2 returns false.',
    'Exact same strings return true.',
    'Repeated characters require exact counts, such as s1 = "aabc" needing two a characters.',
    'The matching substring may appear in the middle or at the end of s2.',
    'Overlapping candidate windows are still checked naturally by the scan.'
  ],
  commonMistake: 'The most common mistake is treating this as set comparison. The window must match counts, not just contain the same distinct letters. For example, "abc" is not a permutation of "aabc" because it has only one a.',
  commonMistakes: [
    'Treating the problem as set comparison instead of count comparison.',
    'Forgetting repeated characters, such as s1 = "aabc".',
    'Checking non-contiguous subsequences instead of contiguous substrings.',
    'Letting the window grow beyond s1.length().',
    'Forgetting to decrement the outgoing character when left moves.',
    'Returning false too early before all full windows are scanned.',
    'Recording indices even though this problem asks for a boolean.'
  ],
  hints: [
    'Every possible answer has length s1.length().',
    'Build one frequency array from s1 and one frequency array for the active window in s2.',
    'When right moves, one character enters the window.',
    'When the window is too long, left moves and one character leaves the window.',
    'As soon as the two frequency arrays match for a full-size window, return true.'
  ],
  complexityAnalysis: 'Let n be s2.length() and alphabet be 26 for lowercase English letters. The right pointer scans s2 once, and left only moves forward when the fixed-size window becomes too long. Each full window comparison checks 26 counts, so the time is O(n * 26), which is effectively O(n) for a fixed alphabet. Extra space is O(26), which is O(1).',
  explanation: 'The implementation first handles impossible inputs: an empty s1 or an s1 longer than s2 cannot produce a meaningful full window, so it returns false. It then builds targetFreq from s1. During the scan, right adds one new character to windowFreq. If the active window becomes longer than s1, left removes the oldest character so the invariant is restored. Whenever the window has exactly the required length, sameFrequency compares the 26 lowercase counts. A match means the current contiguous substring is a permutation, so the method returns true immediately. If no window ever matches, the method returns false after the scan.',
  solutionCode: javaSolution,
  solution: {
    language: 'java',
    approach: 'Maintain target and window int[26] frequency arrays, keep the active window at exactly s1.length(), and return true on the first exact-frequency match.',
    code: javaSolution
  },
  finalTakeaway: 'Permutation-in-string is not about generating permutations. It is about recognizing that every candidate is a fixed-size contiguous window and that exact character counts are the state that decides success.',
  visualWalkthrough: {
    title: 'Exact frequency window',
    summary: 'Watch a length-2 window move across s2 = "eidbaooo". Each full window is compared against the target counts for s1 = "ab", and the algorithm stops as soon as the window "ba" matches.',
    inputs: [
      { label: 's1', value: '"ab"' },
      { label: 's2', value: '"eidbaooo"' },
      { label: 'window length', value: '2' },
      { label: 'expected result', value: 'true' }
    ],
    diagram: {
      type: 'array',
      variant: 'sliding-window',
      title: 'Permutation in String',
      description: 'A fixed-size window slides over s2 while the frequency state tracks the exact characters inside the window.',
      values: ['e', 'i', 'd', 'b', 'a', 'o', 'o', 'o'],
      stateTitle: 'Frequency state',
      stateDescription: 'The target is {a:1,b:1}. A window matches only when its counts are exactly the same.',
      frames: [
        {
          title: 'First full window does not match',
          description: 'The first length-2 window is "ei". The length is correct, but the counts do not match one a and one b.',
          activeRange: [0, 1],
          items: [
            { index: 0, role: 'window', caption: 'left' },
            { index: 1, role: 'current', caption: 'right' }
          ],
          state: {
            label: 'full window, mismatch',
            role: 'warning',
            values: ['target {a:1,b:1}', 'window {e:1,i:1}', 'length 2', 'keep scanning'],
            helper: 'A full window is only a candidate. The frequency table decides whether it is a permutation.'
          }
        },
        {
          title: 'Slide by removing and adding',
          description: 'When right moves to d, the window would become too long. Remove e from the left so the window returns to length 2.',
          activeRange: [1, 2],
          items: [
            { index: 0, role: 'remove', caption: 'e leaves' },
            { index: 1, role: 'window', caption: 'new left' },
            { index: 2, role: 'current', caption: 'd enters' }
          ],
          state: {
            label: 'restore fixed length',
            role: 'neutral',
            values: ['decrement e', 'increment d', 'window "id"', 'window {i:1,d:1}'],
            helper: 'The invariant is restored before checking: the window contains exactly s1.length() characters.'
          }
        },
        {
          title: 'The window ba matches',
          description: 'At indices 3..4, the active window is "ba". It has exactly one b and one a, so it is a permutation of "ab".',
          activeRange: [3, 4],
          items: [
            { index: 2, role: 'remove', caption: 'd left' },
            { index: 3, role: 'answer', caption: 'match start' },
            { index: 4, role: 'current', caption: 'a enters' }
          ],
          state: {
            label: 'match',
            role: 'success',
            values: ['target {a:1,b:1}', 'window {a:1,b:1}', 'left 3', 'right 4'],
            helper: 'The exact-frequency invariant is true, so this contiguous substring is a valid permutation.'
          }
        },
        {
          title: 'Return immediately',
          description: 'Because the question asks for a boolean, the algorithm returns true as soon as it finds the first matching window.',
          activeRange: [3, 4],
          items: [
            { index: 3, role: 'answer', caption: 'found' },
            { index: 4, role: 'success', caption: 'return true' },
            { index: 5, role: 'neutral', caption: 'not needed' },
            { index: 6, role: 'neutral', caption: 'not needed' },
            { index: 7, role: 'neutral', caption: 'not needed' }
          ],
          state: {
            label: 'early return',
            role: 'success',
            values: ['first match found', 'answer is true', 'no need to scan later windows'],
            helper: 'This differs from the anagram-indices problem: here one valid window is enough.'
          },
          finalResult: { title: 'Return value', body: 'Return true.' }
        }
      ]
    }
  },
  body: [
    {
      type: 'callout',
      tone: 'info',
      title: 'Boolean exact-match window',
      content: 'This problem uses the same frequency-window idea as anagram search, but the output changes the control flow. We do not collect every start index. We stop on the first exact-frequency window.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Counts beat order',
      content: 'The window "ba" matches "ab" because the counts match. The window "aa" does not match "ab" even though it has the right length and contains a character from the target.'
    }
  ],
  relatedConcepts: ['fixed-size window', 'frequency array', 'permutation matching', 'anagram matching', 'early return'],
  followUpQuestions: [
    'How would you adapt the solution if s1 and s2 could contain Unicode characters instead of lowercase English letters?',
    'How could a matched-count or frequency-delta approach avoid comparing all 26 counts each time?',
    'Why does this problem return immediately, while Find All Anagrams must continue scanning?'
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
