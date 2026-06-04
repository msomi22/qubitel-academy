import { defineProblem } from '../../../../../problems/problemAuthoring.js';

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
  scenario: `We are given:

s = "barfoofoobarthefoobarman"
words = ["bar", "foo", "the"]

First, look at the string by character index:

Index:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
Chars:  b  a  r  f  o  o  f  o  o  b  a  r  t  h  e  f  o  o  b  a  r  m  a  n

Every word has length 3, so a valid substring must use 9 characters: 3 words × 3 characters.

We need substrings made from all words exactly once: ["bar", "foo", "the"].

Starting at index 6 gives "foobarthe" = "foo" + "bar" + "the".
Starting at index 9 gives "barthefoo" = "bar" + "the" + "foo".
Starting at index 12 gives "thefoobar" = "the" + "foo" + "bar".

So the answer is [6, 9, 12].`,
  prompt:
    'Given a string s and an array words, where every word in words has the same length, return all starting indices of substrings in s that are formed by concatenating every word in words exactly once, in any order, without extra characters between them. If a word appears more than once in words, it must appear the same number of times in the substring. Return the indices in increasing order.',
  question:
    'Given a string s and an array words, where every word in words has the same length, return all starting indices of substrings in s that are formed by concatenating every word in words exactly once, in any order, without extra characters between them. If a word appears more than once in words, it must appear the same number of times in the substring. Return the indices in increasing order.',
  constraints: [
    'All words have the same length, so the string can be scanned as fixed-size tokens instead of one character at a time.',
    'A valid substring length is words.length * words[0].length. For words = ["bar", "foo", "the"], the valid block length is 9.',
    'The words may appear in any order inside the valid substring.',
    'Duplicate words are meaningful. For ["foo", "foo", "bar"], a valid block must contain foo twice and bar once.',
    'Invalid tokens reset the current window because no valid answer can cross a word that is not required.',
    'Overflow tokens shrink the window from the left. If foo appears more times than allowed, remove whole tokens until the count is legal again.',
    'Return starting indices in increasing order, even though offset-based scans may discover them grouped by token alignment.'
  ],
  examples: [
    {
      input: 's = "barfoothefoobarman", words = ["foo", "bar"]',
      output: '[0, 9]',
      explanation:
        'The substring starting at 0 is "barfoo". The substring starting at 9 is "foobar". Both use "foo" and "bar" exactly once.'
    },
    {
      input: 's = "aaaa", words = ["aa"]',
      output: '[0, 1, 2]',
      explanation:
        'The valid substring "aa" starts at indices 0, 1, and 2. Different token offsets can produce valid starts, so the final result must be ordered.'
    }
  ],
  starterThought:
    'Before writing code, stop thinking character-by-character. The important unit is one whole word. Within one offset scan, the active window contains only complete word tokens, currentCounts never exceeds requiredCounts after repair, and matchedWords equals the number of tokens currently inside the window.',
  plainLanguageExplanation:
    'A valid answer is a block of exact word-sized pieces. If words = ["bar", "foo", "the"], then "foobarthe", "barthefoo", and "thefoobar" all work because each uses the same three words exactly once. "foofoofoo" does not work because it repeats foo and misses bar and the. With duplicates, counts matter: ["foo", "foo", "bar"] requires two foo tokens, not just one.',
  mentalPicture:
    'Picture a tray sliding over word bricks. Each brick is one word-length slice of the string. The tray is valid only when the bricks inside it match the required word-count bag exactly. A bad brick clears the tray. Too many copies of a good brick forces the tray to slide forward until the extra copy is removed.',
  intuition:
    'Equal word length is the trick. It lets us run several aligned scans: offset 0, offset 1, up to wordLength - 1. Inside each scan, read one full token at a time. Valid tokens enter the window, overflow tokens make the left side shrink, and invalid tokens reset the window. Because each offset scan appends its own matches, sort the final indices before returning them.',
  workedExample: {
    input: 's = "barfoofoobarthefoobarman", words = ["bar", "foo", "the"]',
    answer: [6, 9, 12],
    explanation:
      'The target counts are { bar: 1, foo: 1, the: 1 } and each token has length 3. Starting at 6 gives "foo | bar | the". Starting at 9 gives "bar | the | foo". Starting at 12 gives "the | foo | bar". All three windows match the required word bag exactly.',
    trace: [
      { start: 0, window: '[bar, foo, foo]', currentCounts: { bar: 1, foo: 2 }, note: 'Invalid because the is missing and foo appears too many times.' },
      { start: 3, window: '[foo, foo, bar]', currentCounts: { foo: 2, bar: 1 }, note: 'Invalid because the is missing and foo appears too many times.' },
      { start: 6, window: '[foo, bar, the]', currentCounts: { foo: 1, bar: 1, the: 1 }, note: 'Counts match exactly, record 6.' },
      { start: 9, window: '[bar, the, foo]', currentCounts: { bar: 1, the: 1, foo: 1 }, note: 'Same words in a different order, record 9.' },
      { start: 12, window: '[the, foo, bar]', currentCounts: { the: 1, foo: 1, bar: 1 }, note: 'Same words in another order, record 12.' }
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
  language: 'java',
  solutionCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> result = new ArrayList<>();

        if (s == null || words == null || words.length == 0) {
            return result;
        }

        int wordLength = words[0].length();
        int totalWords = words.length;
        int totalLength = wordLength * totalWords;

        if (wordLength == 0 || totalLength > s.length()) {
            return result;
        }

        Map<String, Integer> required = new HashMap<>();
        for (String word : words) {
            required.put(word, required.getOrDefault(word, 0) + 1);
        }

        for (int offset = 0; offset < wordLength; offset++) {
            int left = offset;
            int matchedWords = 0;
            Map<String, Integer> current = new HashMap<>();

            for (int right = offset; right + wordLength <= s.length(); right += wordLength) {
                String token = s.substring(right, right + wordLength);

                if (!required.containsKey(token)) {
                    current.clear();
                    matchedWords = 0;
                    left = right + wordLength;
                    continue;
                }

                current.put(token, current.getOrDefault(token, 0) + 1);
                matchedWords++;

                while (current.get(token) > required.get(token)) {
                    String leftToken = s.substring(left, left + wordLength);
                    current.put(leftToken, current.get(leftToken) - 1);
                    matchedWords--;
                    left += wordLength;
                }

                if (matchedWords == totalWords) {
                    result.add(left);

                    String leftToken = s.substring(left, left + wordLength);
                    current.put(leftToken, current.get(leftToken) - 1);
                    matchedWords--;
                    left += wordLength;
                }
            }
        }

        Collections.sort(result);
        return result;
    }
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
      title: 'Example walkthrough: checking 3-word substrings',
      description:
        'Input: s = "barfoofoobarthefoobarman", words = ["bar", "foo", "the"]. Each word has length 3, so every candidate substring must be 9 characters long and split into exactly 3 word-sized pieces.',
      values: [
        'start 0: bar | foo | foo',
        'start 3: foo | foo | bar',
        'start 6: foo | bar | the',
        'start 9: bar | the | foo',
        'start 12: the | foo | bar',
        'start 15: foo | bar | man'
      ],
      stateTitle: 'Candidate check',
      stateDescription:
        'The required counts are bar = 1, foo = 1, and the = 1. A candidate is valid only when its own counts match those required counts exactly.',
      frames: [
        {
          title: 'Start 0 is not valid',
          activeRange: [0, 0],
          items: [{ index: 0, role: 'warning' }],
          state: {
            label: 'start = 0',
            values: {
              input: 's = "barfoofoobarthefoobarman"',
              words: '["bar", "foo", "the"]',
              requiredCounts: 'bar = 1, foo = 1, the = 1',
              candidate: 'bar | foo | foo',
              candidateCounts: 'bar = 1, foo = 2, the = 0',
              decision: 'invalid: foo appears twice and the is missing',
              answers: []
            },
            helper: 'Same length is not enough. The word counts must match exactly.'
          },
          description:
            'Starting at index 0 gives "barfoofoo" = "bar" + "foo" + "foo". It has 2 foo words and 0 the words, so it is rejected.'
        },
        {
          title: 'Start 3 is not valid',
          activeRange: [1, 1],
          items: [{ index: 1, role: 'warning' }],
          state: {
            label: 'start = 3',
            values: {
              input: 's = "barfoofoobarthefoobarman"',
              words: '["bar", "foo", "the"]',
              requiredCounts: 'bar = 1, foo = 1, the = 1',
              candidate: 'foo | foo | bar',
              candidateCounts: 'bar = 1, foo = 2, the = 0',
              decision: 'invalid: foo appears twice and the is missing',
              answers: []
            },
            helper: 'This is the second candidate window. It is checked before moving to start 6.'
          },
          description:
            'Starting at index 3 gives "foofoobar" = "foo" + "foo" + "bar". It also has 2 foo words and 0 the words, so it is rejected.'
        },
        {
          title: 'Start 6 is valid',
          activeRange: [2, 2],
          items: [{ index: 2, role: 'answer' }],
          state: {
            label: 'start = 6',
            values: {
              input: 's = "barfoofoobarthefoobarman"',
              words: '["bar", "foo", "the"]',
              requiredCounts: 'bar = 1, foo = 1, the = 1',
              candidate: 'foo | bar | the',
              candidateCounts: 'bar = 1, foo = 1, the = 1',
              decision: 'valid: all required counts match',
              answers: [6]
            },
            helper: 'The order is allowed to change. This candidate contains foo, bar, and the exactly once.'
          },
          description:
            'Starting at index 6 gives "foobarthe" = "foo" + "bar" + "the". Its counts match the required counts, so 6 is recorded.'
        },
        {
          title: 'Start 9 is valid',
          activeRange: [3, 3],
          items: [{ index: 3, role: 'answer' }],
          state: {
            label: 'start = 9',
            values: {
              words: '["bar", "foo", "the"]',
              requiredCounts: 'bar = 1, foo = 1, the = 1',
              candidate: 'bar | the | foo',
              candidateCounts: 'bar = 1, foo = 1, the = 1',
              decision: 'valid: same counts, different order',
              answers: [6, 9]
            },
            helper: 'The candidate does not need to match the order inside words. It only needs the same word counts.'
          },
          description:
            'Starting at index 9 gives "barthefoo" = "bar" + "the" + "foo". Its counts match the required counts, so 9 is recorded.'
        },
        {
          title: 'Start 12 is valid',
          activeRange: [4, 4],
          items: [{ index: 4, role: 'answer' }],
          state: {
            label: 'start = 12',
            values: {
              words: '["bar", "foo", "the"]',
              requiredCounts: 'bar = 1, foo = 1, the = 1',
              candidate: 'the | foo | bar',
              candidateCounts: 'bar = 1, foo = 1, the = 1',
              decision: 'valid: same required counts exactly once',
              answers: [6, 9, 12]
            },
            helper: 'This is another valid ordering of the same three words.'
          },
          description:
            'Starting at index 12 gives "thefoobar" = "the" + "foo" + "bar". Its counts match the required counts, so 12 is recorded.'
        },
        {
          title: 'Start 15 is not valid, so the final answer is complete',
          activeRange: [5, 5],
          items: [{ index: 5, role: 'warning' }],
          state: {
            label: 'start = 15',
            values: {
              words: '["bar", "foo", "the"]',
              requiredCounts: 'bar = 1, foo = 1, the = 1',
              candidate: 'foo | bar | man',
              candidateCounts: 'bar = 1, foo = 1, the = 0, man = 1',
              decision: 'invalid: man is not required and the is missing',
              output: [6, 9, 12]
            },
            helper: 'A candidate containing a word outside the required list cannot be a valid answer.'
          },
          description:
            'Starting at index 15 gives "foobarman" = "foo" + "bar" + "man". Because "man" is not required and "the" is missing, the final answer remains [6, 9, 12].'
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
