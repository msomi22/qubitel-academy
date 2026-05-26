import { defineProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineProblem({
  id: 'substring-concatenation-words-001',
  category: 'dsa',
  topicId: 'sliding-window',
  type: 'coding',
  difficulty: 'Hard',
  title: 'Substring with Concatenation of All Words',
  estimatedTime: '35-45 minutes',
  tags: [
    'dsa',
    'sliding-window',
    'hash-map',
    'strings',
    'hard',
    'frequency-map',
    'token-window'
  ],
  scenario:
    'You are given a string and a list of words where every word has the same length. Find every starting index where the string contains one contiguous block made from all the words exactly once, in any order, with no extra characters in the middle.',
  prompt:
    'Given a string s and an array words of equal-length strings, return all starting indices where a substring of s is a concatenation of every word in words exactly once. The words may appear in any order, but each word must be used exactly as many times as it appears in words.',
  question:
    'Given a string s and an array words of equal-length strings, return all starting indices where a substring of s is a concatenation of every word in words exactly once. The words may appear in any order, but each word must be used exactly as many times as it appears in words.',
  constraints: [
    'All words have the same length.',
    'A valid substring has total length words.length * words[0].length.',
    'The same word may appear more than once in words, so counts matter.',
    'Return starting indices in increasing scan order.'
  ],
  starterThought:
    'Do not picture a normal character-by-character window first. Picture the string split into equal-size word tokens. The useful window grows, shrinks, and resets by whole tokens because partial words can never help form a valid answer.',
  plainLanguageExplanation:
    'A valid answer is not just a substring with the right characters. It is a block of exact word-sized tokens. If words = ["foo", "bar"], then "barfoo" works and "foobar" works, but "fooba" or "barfoox" do not because the token boundaries or the total length are wrong.',
  mentalPicture:
    'Imagine sliding a tray across the string, but the tray moves over bricks instead of letters. Each brick has length wordLength. The tray is valid only when the bricks inside it match the required word counts exactly.',
  intuition:
    'The equal word length is the key that turns a hard substring search into several token scans. For each possible offset from 0 to wordLength - 1, read the string in word-sized chunks. Keep a required frequency map for the target words and a current frequency map for the active window. If a token is valid, add it. If that token appears too many times, move the left side forward by whole tokens until the count is legal again. If the token is not required at all, reset the current window because no valid answer can cross that invalid token.',
  workedExample: {
    input: 's = "barfoofoofoobar", words = ["foo", "bar", "foo"]',
    answer: [0, 6],
    explanation:
      'The target counts are { foo: 2, bar: 1 } and each token has length 3. Starting at index 0, "barfoofoo" uses bar once and foo twice, so 0 is valid. Later, "foofoobar" starting at index 6 also has the exact required counts, so 6 is valid.',
    trace: [
      {
        offset: 0,
        token: 'bar',
        window: '[bar]',
        currentCounts: { bar: 1 },
        note: 'bar is required, so the window starts cleanly.'
      },
      {
        offset: 3,
        token: 'foo',
        window: '[bar, foo]',
        currentCounts: { bar: 1, foo: 1 },
        note: 'foo is required and the count is still within the target.'
      },
      {
        offset: 6,
        token: 'foo',
        window: '[bar, foo, foo]',
        currentCounts: { bar: 1, foo: 2 },
        note: 'The window now contains all three required tokens, so index 0 is recorded.'
      },
      {
        offset: 9,
        token: 'foo',
        window: '[foo, foo, foo]',
        currentCounts: { foo: 3 },
        note: 'foo overflows, so the left side shrinks until foo is allowed again.'
      },
      {
        offset: 12,
        token: 'bar',
        window: '[foo, foo, bar]',
        currentCounts: { foo: 2, bar: 1 },
        note: 'The counts match again, so index 6 is recorded.'
      }
    ]
  },
  bruteForceThought:
    'The tempting baseline checks every possible starting index, slices a substring of total length, breaks it into word-sized pieces, and compares its frequency map against the target map. That is clear, but it repeatedly rebuilds nearly the same token counts for overlapping candidates.',
  optimizationJourney:
    'The optimized version keeps the useful part of the brute-force check: word frequency counts. The improvement is that each offset scan reuses the current window counts. A token enters once from the right. If the token causes overflow, tokens leave from the left until the invariant is restored. If an invalid token appears, the scan resets because every candidate crossing that token is impossible.',
  stepByStepBreakdown: [
    'Return [] immediately when s is empty, words is empty, wordLength is 0, or the total concatenation length is greater than s.length.',
    'Build requiredCounts from words. This preserves duplicates, such as ["foo", "foo", "bar"].',
    'Let wordLength = words[0].length and totalWords = words.length.',
    'For each offset from 0 to wordLength - 1, scan right in jumps of wordLength.',
    'Read token = s.slice(right, right + wordLength).',
    'If token is not in requiredCounts, clear currentCounts, reset matchedWords to 0, and move left to right + wordLength.',
    'If token is required, add it to currentCounts and increment matchedWords.',
    'While currentCounts[token] is greater than requiredCounts[token], remove the leftmost token from currentCounts, move left by wordLength, and decrement matchedWords.',
    'When matchedWords equals totalWords, record left as a valid answer.',
    'After recording, remove the leftmost token and move left forward so the scan can find overlapping valid answers.'
  ],
  patternSignal:
    'Use this pattern when the input is a string, the target pieces all have the same length, and validity depends on matching a multiset of tokens rather than a single count or simple character set.',
  invariant:
    'Within one offset scan, every token boundary is aligned to that offset. After overflow handling, currentCounts never contains more copies of any word than requiredCounts, and matchedWords equals the number of required-sized tokens currently inside the window.',
  solutionCode: {
    language: 'javascript',
    code: `export function findSubstring(s, words) {
  if (!s || !Array.isArray(words) || words.length === 0) return [];

  const wordLength = words[0].length;
  const totalWords = words.length;
  const totalLength = wordLength * totalWords;

  if (wordLength === 0 || totalLength > s.length) return [];

  const required = new Map();
  for (const word of words) {
    required.set(word, (required.get(word) || 0) + 1);
  }

  const result = [];

  for (let offset = 0; offset < wordLength; offset += 1) {
    let left = offset;
    let matchedWords = 0;
    const current = new Map();

    for (let right = offset; right + wordLength <= s.length; right += wordLength) {
      const token = s.slice(right, right + wordLength);

      if (!required.has(token)) {
        current.clear();
        matchedWords = 0;
        left = right + wordLength;
        continue;
      }

      current.set(token, (current.get(token) || 0) + 1);
      matchedWords += 1;

      while (current.get(token) > required.get(token)) {
        const leftToken = s.slice(left, left + wordLength);
        current.set(leftToken, current.get(leftToken) - 1);
        matchedWords -= 1;
        left += wordLength;
      }

      if (matchedWords === totalWords) {
        result.push(left);

        const leftToken = s.slice(left, left + wordLength);
        current.set(leftToken, current.get(leftToken) - 1);
        matchedWords -= 1;
        left += wordLength;
      }
    }
  }

  return result;
}`
  },
  solution:
    'Scan the string by token offsets. For each offset, maintain a left boundary, a right boundary, and a frequency map for the current token window. Valid tokens extend the window. Overflow shrinks from the left. Invalid tokens reset the window. Whenever the window contains exactly words.length tokens without overflow, the left boundary is a valid starting index.',
  explanation:
    'The solution works because equal word length gives us stable token boundaries. Starting at each offset covers every possible alignment a valid answer could use. Within one alignment, the window only moves by whole words. The required map defines what the window is allowed to contain; the current map describes what it currently contains. Overflow means the window has too many copies of one word, so removing whole tokens from the left is the smallest repair that keeps the scan useful. An invalid token cannot be part of any answer, so the current scan restarts immediately after it.',
  complexityAnalysis:
    'Time is O(n) after accounting for the word-sized offset scans: there are wordLength offsets, and each offset visits about n / wordLength tokens. Each token enters the current window once and leaves at most once, so the total scanning work is linear in the string length, plus constant-time map operations on average. Space is O(m), where m is the number of distinct words in the required word list, because the required and current maps only store word counts.',
  commonMistake:
    'A common mistake is to slide by one character inside the optimized scan. That mixes token boundaries and makes the current frequency map describe pieces that can never be valid words.',
  commonMistakes: [
    'Ignoring duplicate words and using a Set instead of a frequency map.',
    'Scanning only from offset 0 and missing answers that start at offset 1, 2, and so on.',
    'Resetting on overflow instead of shrinking from the left, which can skip overlapping answers.',
    'Recording an answer when the window has the right length but the counts do not match.',
    'Forgetting to remove the leftmost token after recording an answer, which can hide overlapping matches.',
    'Using character counts instead of word counts.'
  ],
  edgeCases: [
    's is shorter than words.length * wordLength, so no valid block can fit.',
    'words is empty, so there is no meaningful concatenation to search for.',
    'words contains duplicates, such as ["foo", "foo", "bar"].',
    'An invalid token appears inside an otherwise promising window and forces a reset.',
    'A repeated valid token causes overflow and requires shrinking, not a full reset.',
    'Valid answers overlap, so the scan must continue after recording an index.',
    'wordLength is greater than s.length.'
  ],
  hints: [
    'First compute the length of one word and the total length of all words together.',
    'Treat each candidate window as a sequence of word-sized tokens, not individual characters.',
    'Use one map for required counts and one map for the current window counts.',
    'When a token is valid but appears too many times, move left forward by whole tokens until the overflow disappears.',
    'Run the scan once for each possible token alignment: 0 through wordLength - 1.'
  ],
  followUpQuestions: [
    'Why does scanning by offset cover all possible valid starting indices?',
    'What breaks if the words are not all the same length?',
    'Why is overflow repaired by shrinking instead of clearing the whole window?',
    'How would the approach change if the output only needed the count of valid starts?',
    'What test case would prove that duplicate words are handled correctly?'
  ],
  relatedConcepts: [
    'fixed-size sliding window',
    'frequency map',
    'multiset matching',
    'string tokenization',
    'hash map invariants'
  ],
  finalTakeaway:
    'The senior-level insight is that this is not a normal character window. It is a token window. Once you move in word-sized jumps and protect the frequency-map invariant, the hard-looking substring search becomes a controlled sliding-window scan.',
  visualWalkthrough: {
    diagram: {
      type: 'array',
      variant: 'sliding-window',
      title: 'Token window walkthrough',
      description:
        'The string is split into word-sized chunks for offset 0. Watch how counts grow, overflow is repaired, invalid tokens reset the scan, and valid starts are recorded.',
      values: ['bar', 'foo', 'foo', 'foo', 'bar', 'baz', 'foo', 'bar', 'foo'],
      stateTitle: 'Window state',
      stateDescription:
        'required = { foo: 2, bar: 1 }. current changes as whole tokens enter and leave.',
      legend: [
        { role: 'window', label: 'active token window' },
        { role: 'current', label: 'incoming token' },
        { role: 'warning', label: 'frequency overflow' },
        { role: 'remove', label: 'token removed from left' },
        { role: 'error', label: 'invalid token resets window' },
        { role: 'answer', label: 'valid start recorded' }
      ],
      frames: [
        {
          title: 'Start with the first required token',
          activeRange: [0, 0],
          items: [{ index: 0, role: 'current' }],
          state: {
            label: 'right = 0',
            values: {
              required: '{ foo: 2, bar: 1 }',
              current: '{ bar: 1 }',
              left: 0,
              matchedWords: 1,
              answers: []
            },
            helper: 'bar is required, so it enters the current token window.'
          },
          description:
            'The scan reads one full token at a time. The current map starts with bar: 1.'
        },
        {
          title: 'A second required token enters',
          activeRange: [0, 1],
          items: [
            { index: 0, role: 'window' },
            { index: 1, role: 'current' }
          ],
          state: {
            label: 'right = 3',
            values: {
              current: '{ bar: 1, foo: 1 }',
              left: 0,
              matchedWords: 2,
              answers: []
            },
            helper: 'foo is also required, and its count is still legal.'
          },
          description:
            'The active window now has two useful tokens, but it does not yet contain all three required words.'
        },
        {
          title: 'Counts match exactly',
          activeRange: [0, 2],
          items: [
            { index: 0, role: 'answer' },
            { index: 1, role: 'window' },
            { index: 2, role: 'current' }
          ],
          state: {
            label: 'record left = 0',
            values: {
              current: '{ bar: 1, foo: 2 }',
              left: 0,
              matchedWords: 3,
              answers: [0]
            },
            helper: 'The window contains exactly three tokens and the counts match required.'
          },
          description:
            'barfoofoo is a valid concatenation, so the scan records starting index 0.'
        },
        {
          title: 'Repeated foo creates overflow',
          activeRange: [1, 3],
          items: [
            { index: 1, role: 'window' },
            { index: 2, role: 'window' },
            { index: 3, role: 'warning' }
          ],
          state: {
            label: 'right = 9',
            values: {
              current: '{ foo: 3 }',
              overflow: 'foo appears 3 times, but only 2 are allowed',
              left: 3,
              answers: [0]
            },
            helper: 'Overflow does not mean give up. Shrink from the left until foo is legal again.'
          },
          description:
            'The extra foo makes the window invalid, so the left boundary moves by whole tokens.'
        },
        {
          title: 'Shrink left to repair overflow',
          activeRange: [2, 3],
          items: [
            { index: 1, role: 'remove' },
            { index: 2, role: 'window' },
            { index: 3, role: 'window' }
          ],
          state: {
            label: 'left = 6',
            values: {
              current: '{ foo: 2 }',
              left: 6,
              matchedWords: 2,
              answers: [0]
            },
            helper: 'Removing the leftmost foo restores the allowed foo count.'
          },
          description:
            'The window is useful again because no word count exceeds the required frequency.'
        },
        {
          title: 'Another exact match is found',
          activeRange: [2, 4],
          items: [
            { index: 2, role: 'answer' },
            { index: 3, role: 'window' },
            { index: 4, role: 'current' }
          ],
          state: {
            label: 'record left = 6',
            values: {
              current: '{ foo: 2, bar: 1 }',
              left: 6,
              matchedWords: 3,
              answers: [0, 6]
            },
            helper: 'The window foofoobar has the exact required multiset.'
          },
          description:
            'The scan records another valid starting index at 6.'
        },
        {
          title: 'Invalid token resets the window',
          activeRange: [5, 5],
          items: [{ index: 5, role: 'error' }],
          state: {
            label: 'right = 15',
            values: {
              token: 'baz',
              action: 'clear current map and move left after baz',
              left: 18,
              matchedWords: 0,
              answers: [0, 6]
            },
            helper: 'A valid answer cannot cross a token that is not in requiredCounts.'
          },
          description:
            'baz is not required, so every candidate crossing it is impossible and the current window resets.'
        },
        {
          title: 'The scan continues after reset',
          activeRange: [6, 8],
          items: [
            { index: 6, role: 'window' },
            { index: 7, role: 'window' },
            { index: 8, role: 'current' }
          ],
          state: {
            label: 'after reset',
            values: {
              current: '{ foo: 2, bar: 1 }',
              left: 18,
              matchedWords: 3,
              answers: [0, 6, 18]
            },
            helper: 'Resetting does not stop the scan; it starts a clean window after the invalid token.'
          },
          description:
            'The same invariant finds later valid blocks without revisiting earlier characters.'
        }
      ]
    }
  },
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
