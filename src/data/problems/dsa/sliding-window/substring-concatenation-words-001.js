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
    'Imagine the string as a row of equal-sized word bricks. For s = "barfoofoofoobar" and words = ["foo", "bar", "foo"], each brick has length 3 and the target brick bag is { foo: 2, bar: 1 }. A valid answer is a starting index where the next three bricks use exactly that bag, in any order, with no missing word, no extra word, and no broken brick. In this example, index 0 gives "barfoofoo" and index 6 gives "foofoobar", so the answer is [0, 6].',
  prompt:
    'Find every starting index where a word-sized block of s is made from all words exactly once. Example: if s = "barfoothefoobarman" and words = ["foo", "bar"], the valid starts are [0, 9] because "barfoo" starts at 0 and "foobar" starts at 9. The hard part is that words may appear in any order, duplicates matter, and the search must move by word-sized tokens rather than ordinary characters.',
  question:
    'Find every starting index where a word-sized block of s is made from all words exactly once. Example: if s = "barfoothefoobarman" and words = ["foo", "bar"], the valid starts are [0, 9] because "barfoo" starts at 0 and "foobar" starts at 9. The hard part is that words may appear in any order, duplicates matter, and the search must move by word-sized tokens rather than ordinary characters.',
  constraints: [
    'All words have the same length, so the string can be scanned as fixed-size tokens instead of one character at a time.',
    'A valid substring length is words.length * words[0].length. For words = ["foo", "bar"], the valid block length is 6.',
    'Duplicate words are meaningful. For ["foo", "foo", "bar"], a valid block must contain foo twice and bar once.',
    'Invalid tokens reset the current window because no valid answer can cross a word that is not required.',
    'Overflow tokens shrink the window from the left. If foo appears three times but only two are allowed, remove whole tokens until the count is legal again.',
    'Return starting indices in increasing order, even though offset-based scans may discover them grouped by token alignment.'
  ],
  examples: [
    {
      input: 's = "barfoothefoobarman", words = ["foo", "bar"]',
      output: '[0, 9]',
      explanation: '"barfoo" starts at 0 and "foobar" starts at 9.'
    },
    {
      input: 's = "barfoofoofoobar", words = ["foo", "bar", "foo"]',
      output: '[0, 6]',
      explanation: 'The target counts are { foo: 2, bar: 1 }. Both "barfoofoo" and "foofoobar" match exactly.'
    },
    {
      input: 's = "aaaa", words = ["aa"]',
      output: '[0, 1, 2]',
      explanation: 'Different token offsets can produce valid starts, so final output order must be normalized.'
    }
  ],
  starterThought:
    'Before writing code, stop thinking character-by-character. The important unit is one whole word. The invariant is: within one offset scan, the active window contains only complete word tokens, currentCounts never exceeds requiredCounts after repair, and matchedWords equals the number of tokens currently inside the window.',
  plainLanguageExplanation:
    'A valid answer is a block of exact word-sized pieces. If words = ["foo", "bar"], then "barfoo" and "foobar" work. "fooba" does not because it cuts a word. "barfoox" does not because it has an extra character. With duplicates, counts matter: ["foo", "foo", "bar"] requires two foo tokens, not just one.',
  mentalPicture:
    'Picture a tray sliding over bricks. Each brick is one word-length slice of the string. The tray is valid only when the bricks inside it match the required word-count bag exactly. A bad brick clears the tray. Too many copies of a good brick forces the tray to slide forward until the extra copy is removed.',
  intuition:
    'Equal word length is the trick. It lets us run several aligned scans: offset 0, offset 1, up to wordLength - 1. Inside each scan, read one full token at a time. Valid tokens enter the window, overflow tokens make the left side shrink, and invalid tokens reset the window. Because each offset scan appends its own matches, sort the final indices before returning them.',
  workedExample: {
    input: 's = "barfoofoofoobar", words = ["foo", "bar", "foo"]',
    answer: [0, 6],
    explanation:
      'The target counts are { foo: 2, bar: 1 } and each token has length 3. Starting at index 0, "barfoofoo" uses bar once and foo twice. Starting at index 6, "foofoobar" also uses foo twice and bar once.',
    trace: [
      { token: 'bar', window: '[bar]', currentCounts: { bar: 1 }, note: 'Required token enters.' },
      { token: 'foo', window: '[bar, foo]', currentCounts: { bar: 1, foo: 1 }, note: 'Still legal, but not complete yet.' },
      { token: 'foo', window: '[bar, foo, foo]', currentCounts: { bar: 1, foo: 2 }, note: 'Counts match exactly, record 0.' },
      { token: 'foo', window: '[foo, foo, foo]', currentCounts: { foo: 3 }, note: 'foo overflows, so shrink from the left.' },
      { token: 'bar', window: '[foo, foo, bar]', currentCounts: { foo: 2, bar: 1 }, note: 'Counts match again, record 6.' }
    ]
  },
  bruteForceThought:
    'The simple baseline checks every starting index, slices a block of total length, splits it into word-sized pieces, and compares its frequency map to the required map. It is easy to reason about, but it rebuilds almost the same counts many times.',
  optimizationJourney:
    'Keep the frequency-map idea, but stop rebuilding from scratch. For each token alignment, reuse the current window. A token enters from the right once. If it causes overflow, tokens leave from the left until the invariant is restored. If the token is not required, clear the window because no valid answer can cross it. Sort at the end because offset scans can collect indices out of numeric order.',
  stepByStepBreakdown: [
    'Handle empty input and cases where the total concatenation length cannot fit inside s.',
    'Build requiredCounts from words so duplicate words are preserved.',
    'Compute wordLength and totalWords.',
    'For each offset from 0 to wordLength - 1, scan right in jumps of wordLength.',
    'If the current token is not required, clear currentCounts, reset matchedWords, and move left after that token.',
    'If the token is required, add it to currentCounts and increment matchedWords.',
    'While that token count is too high, remove leftmost tokens and move left by wordLength.',
    'When matchedWords equals totalWords, record left as a valid start.',
    'After recording, remove the leftmost token so overlapping answers can still be found.',
    'Sort the collected indices before returning them.'
  ],
  patternSignal:
    'Use this pattern when a string problem has equal-length target pieces and validity depends on matching a multiset of tokens.',
  invariant:
    'Within one offset scan, token boundaries stay aligned, currentCounts never exceeds requiredCounts after overflow repair, and matchedWords equals the number of tokens inside the active window.',
  language: 'javascript',
  solutionCode: `export function findSubstring(s, words) {
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

  return result.sort((a, b) => a - b);
}`,
  solution:
    'Scan by token offsets. For each offset, maintain left, right, currentCounts, and matchedWords. Valid tokens extend the window. Overflow shrinks from the left. Invalid tokens reset the window. Exact-count windows record left. Final sorting normalizes the order across different offset scans.',
  explanation:
    'This works because equal word length gives stable token boundaries. Every valid answer must belong to exactly one offset alignment. Within that alignment, the window moves only by whole words. The required map defines the allowed word bag; the current map describes the active tray of tokens. Overflow is repaired by removing whole tokens from the left. Invalid tokens clear the tray. Sorting at the end honors the increasing-order output contract.',
  complexityAnalysis:
    'Time is O(n + r log r), where n is the string length and r is the number of returned indices. The token scan is O(n) because each token enters and leaves at most once across its offset scan. Sorting the r answers adds O(r log r). Space is O(m + r), where m is the number of distinct required words and r is the output size.',
  commonMistake:
    'The most common mistake is treating this like a normal character window. The optimized window must move by whole word tokens, not by single characters inside an offset scan.',
  commonMistakes: [
    'Using a Set and losing duplicate-word counts.',
    'Scanning only offset 0 and missing answers from other alignments.',
    'Resetting on overflow instead of shrinking from the left.',
    'Recording a window with the right length but wrong frequencies.',
    'Forgetting to remove the leftmost token after recording, which can hide overlapping matches.',
    'Returning offset-grouped matches directly without sorting them into increasing order.'
  ],
  edgeCases: [
    's is shorter than the total concatenation length.',
    'words is empty.',
    'words contains duplicates, such as ["foo", "foo", "bar"].',
    'An invalid token appears inside a promising region.',
    'A valid token appears too many times and causes overflow.',
    'Valid answers overlap.',
    'Different offsets produce out-of-order discoveries, such as s = "aaaa" and words = ["aa"].'
  ],
  hints: [
    'Compute one word length first.',
    'Convert the word list into a frequency map, not a Set.',
    'Scan once for each possible token alignment.',
    'When a required token overflows, move left forward by whole tokens.',
    'Sort the final result because offset scans collect matches by alignment.'
  ],
  followUpQuestions: [
    'Why does scanning by offset cover every possible start?',
    'What breaks if words are not all the same length?',
    'Why is overflow repaired by shrinking instead of clearing the whole window?',
    'Why can offset scans discover indices out of increasing order?',
    'Which test proves duplicate words are handled correctly?'
  ],
  relatedConcepts: [
    'fixed-size sliding window',
    'frequency map',
    'multiset matching',
    'string tokenization',
    'hash map invariants'
  ],
  finalTakeaway:
    'This is a token-window problem, not a character-window problem. Move in word-sized jumps, protect the frequency-map invariant, repair overflow from the left, reset on invalid tokens, and normalize the final answer order.',
  visualWalkthrough: {
    diagram: {
      type: 'array',
      variant: 'sliding-window',
      title: 'Example walkthrough: s = "barfoofoofoobar", words = ["foo", "bar", "foo"]',
      description:
        'Word length is 3, so read the string as complete tokens: 0:bar, 3:foo, 6:foo, 9:foo, 12:bar. The target count is { foo: 2, bar: 1 }, so a valid window must contain exactly three tokens with those counts.',
      values: ['0:bar', '3:foo', '6:foo', '9:foo', '12:bar'],
      stateTitle: 'Current example state',
      stateDescription:
        'Track the required counts, the current window counts, the left start index, and the answer list.',
      frames: [
        {
          title: 'Start at index 0 with token "bar"',
          activeRange: [0, 0],
          items: [{ index: 0, role: 'current' }],
          state: {
            label: 'Read token at index 0',
            values: {
              required: '{ foo: 2, bar: 1 }',
              window: 'bar',
              currentCounts: '{ bar: 1 }',
              left: 0,
              answers: []
            },
            helper: 'bar is part of the required word list, so keep it in the window.'
          },
          description:
            'We are not reading characters one by one. We read the whole token "bar" because every word has length 3.'
        },
        {
          title: 'Add token "foo" at index 3',
          activeRange: [0, 1],
          items: [
            { index: 0, role: 'window' },
            { index: 1, role: 'current' }
          ],
          state: {
            label: 'Window is growing',
            values: {
              window: 'bar | foo',
              currentCounts: '{ bar: 1, foo: 1 }',
              needed: '{ bar: 1, foo: 2 }',
              answers: []
            },
            helper: 'The window is still missing one more foo.'
          },
          description:
            'The counts are legal, but the window does not yet contain all three required words.'
        },
        {
          title: 'Add token "foo" at index 6: record answer 0',
          activeRange: [0, 2],
          items: [
            { index: 0, role: 'answer' },
            { index: 1, role: 'window' },
            { index: 2, role: 'current' }
          ],
          state: {
            label: 'Exact match',
            values: {
              substring: 'barfoofoo',
              currentCounts: '{ bar: 1, foo: 2 }',
              required: '{ bar: 1, foo: 2 }',
              action: 'record 0',
              answers: [0]
            },
            helper: 'The window has exactly the required words, so start index 0 is valid.'
          },
          description:
            'This is the first full valid block: "bar" + "foo" + "foo".'
        },
        {
          title: 'Move forward, then token "foo" at index 9 causes overflow',
          activeRange: [1, 3],
          items: [
            { index: 1, role: 'window' },
            { index: 2, role: 'window' },
            { index: 3, role: 'warning' }
          ],
          state: {
            label: 'Too many foo tokens',
            values: {
              window: 'foo | foo | foo',
              currentCounts: '{ foo: 3 }',
              allowed: '{ foo: 2 }',
              action: 'remove tokens from the left'
            },
            helper: 'Do not throw away the whole scan. Shrink from the left until foo is no longer over-counted.'
          },
          description:
            'The new token is valid, but there are now too many copies of it.'
        },
        {
          title: 'After shrinking, add "bar" at index 12: record answer 6',
          activeRange: [2, 4],
          items: [
            { index: 2, role: 'answer' },
            { index: 3, role: 'window' },
            { index: 4, role: 'current' }
          ],
          state: {
            label: 'Second exact match',
            values: {
              substring: 'foofoobar',
              currentCounts: '{ foo: 2, bar: 1 }',
              required: '{ foo: 2, bar: 1 }',
              action: 'record 6',
              answers: [0, 6]
            },
            helper: 'The repaired window still leads to a valid block.'
          },
          description:
            'Starting at index 6 gives "foo" + "foo" + "bar", so 6 is valid.'
        },
        {
          title: 'Return the collected starts in increasing order',
          activeRange: [0, 4],
          items: [
            { index: 0, role: 'answer' },
            { index: 2, role: 'answer' }
          ],
          state: {
            label: 'Final answer',
            values: {
              foundStarts: [0, 6],
              output: [0, 6],
              reminder: 'sort before returning when multiple offsets are scanned'
            },
            helper: 'This example stays ordered, but other examples such as s = "aaaa", words = ["aa"] need final ordering normalization.'
          },
          description:
            'The visual example ends with the expected result: [0, 6].'
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
