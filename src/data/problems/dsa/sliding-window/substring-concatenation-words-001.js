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
      title: 'Code view: required words vs current window',
      description:
        'words = ["bar", "foo", "the"] is the required input list. In the code, this becomes required = { bar: 1, foo: 1, the: 1 }. Each card below is the current 3-token window being checked from s, not another words array.',
      values: [
        'left 0: bar | foo | foo',
        'left 3: foo | foo | bar',
        'left 6: foo | bar | the',
        'left 9: bar | the | foo',
        'left 12: the | foo | bar',
        'left 15: foo | bar | man'
      ],
      stateTitle: 'What to watch in the code',
      stateDescription:
        'required is built once from words. current is the frequency map for the active window in s. left is the candidate start index. right reads the next word-sized token. A start is recorded only when current matches required.',
      frames: [
        {
          title: 'Start 0 is checked, then rejected',
          activeRange: [0, 0],
          items: [{ index: 0, role: 'warning' }],
          state: {
            label: 'left = 0',
            values: {
              required: '{ bar: 1, foo: 1, the: 1 }',
              windowFromS: 'bar | foo | foo',
              current: '{ bar: 1, foo: 2 }',
              codeCheck: 'current does not match required',
              result: []
            },
            helper: 'This is why you see words = [bar, foo, the] and window = bar | foo | foo together: one is the target; the other is the current candidate from s.'
          },
          description:
            'The substring "barfoofoo" has length 9, but it is rejected because the current map has too many foo tokens and no the token.'
        },
        {
          title: 'Start 6 matches required',
          activeRange: [2, 2],
          items: [{ index: 2, role: 'answer' }],
          state: {
            label: 'left = 6',
            values: {
              required: '{ bar: 1, foo: 1, the: 1 }',
              windowFromS: 'foo | bar | the',
              current: '{ foo: 1, bar: 1, the: 1 }',
              codeCheck: 'matchedWords == totalWords',
              action: 'result.add(6)'
            },
            helper: 'In the Java solution, this is the moment the if (matchedWords == totalWords) block records left.'
          },
          description:
            'The substring "foobarthe" uses every required word exactly once, so the code records 6.'
        },
        {
          title: 'Start 9 also matches required',
          activeRange: [3, 3],
          items: [{ index: 3, role: 'answer' }],
          state: {
            label: 'left = 9',
            values: {
              windowFromS: 'bar | the | foo',
              current: '{ bar: 1, the: 1, foo: 1 }',
              required: '{ bar: 1, foo: 1, the: 1 }',
              action: 'result.add(9)',
              result: [6, 9]
            },
            helper: 'The order inside the window can change. The code compares counts, not sequence order.'
          },
          description:
            'The substring "barthefoo" is another valid permutation of the required word bag.'
        },
        {
          title: 'Start 12 also matches required',
          activeRange: [4, 4],
          items: [{ index: 4, role: 'answer' }],
          state: {
            label: 'left = 12',
            values: {
              windowFromS: 'the | foo | bar',
              current: '{ the: 1, foo: 1, bar: 1 }',
              required: '{ bar: 1, foo: 1, the: 1 }',
              action: 'result.add(12)',
              result: [6, 9, 12]
            },
            helper: 'Again, the order is different, but the frequency map is the same.'
          },
          description:
            'The substring "thefoobar" is valid, so the code records 12.'
        },
        {
          title: 'Start 15 is rejected, then return the result',
          activeRange: [5, 5],
          items: [{ index: 5, role: 'warning' }],
          state: {
            label: 'left = 15',
            values: {
              windowFromS: 'foo | bar | man',
              codeCheck: '!required.containsKey("man")',
              action: 'clear current and move left after man',
              output: [6, 9, 12]
            },
            helper: 'This corresponds to the invalid-token branch in the Java code.'
          },
          description:
            'The token "man" is not in required, so no valid answer can include this window. The final answer is [6, 9, 12].'
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
