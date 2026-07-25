import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineMcqProblem({
  id: 'java-core-equals-vs-double-equals-001',
  topicId: 'java-core',
  title: 'equals() vs ==',
  difficulty: 'Easy',
  prompt: 'Two different String objects both contain the text "Java". In Java, what is the best simple explanation of == versus equals() for objects, and why does == sometimes appear to work for strings?',
  options: [
    '== asks whether two variables point to the same object, while equals() can ask whether two objects mean the same value. For strings, literals may be interned, so == can appear to work but is not reliable for content comparison.',
    '== and equals() always do exactly the same thing for every object.',
    'equals() checks whether two variables point to the same object, while == checks whether their text is equal.',
    '== automatically converts objects into strings before comparing them.'
  ],
  correctAnswer: '== asks whether two variables point to the same object, while equals() can ask whether two objects mean the same value. For strings, literals may be interned, so == can appear to work but is not reliable for content comparison.',
  explanation: 'For objects, == is like asking, "Are these two names pointing to the very same box?" equals() is like asking, "Do the things inside the boxes represent the same value?" For String, equals() compares the characters, so two different String objects can still be logically equal. However, string literals are automatically interned (shared), so "Java" == "Java" is true because both point to the same cached instance. This is a special case that often misleads beginners into thinking == compares text.',
  mentalPicture: 'Imagine two separate boxes with the same label inside. == asks whether both variables point to the exact same box. equals() can ask whether the labels inside the boxes mean the same value. String interning is like having a shared box pool: if you ask for "Java", you might get the same shared box every time.',
  visualExplanation: 'Reference vs value meaning, with the interning caveat:\n\na -> String object #1 containing "Java" (from new String())\nb -> String object #2 containing "Java" (from new String())\n\na == b       -> false, because they are different objects\na.equals(b) -> true, because String compares the text value\n\nBut with interned literals:\n\nc -> interned "Java"\nd -> interned "Java"\nc == d       -> true, because both point to the same interned instance\nc.equals(d) -> true, obviously\n\nMoral: == works for interned strings, but never rely on it for content comparison.',
  productionReality: 'In production Java code, using == for object content can create subtle bugs in authentication checks, request validation, cache keys, tests, and business rules. For object meaning, use equals() and make sure domain classes implement equals() and hashCode() consistently. In modern Java, use Objects.equals(a, b) for null‑safe equality checks. For BigDecimal, use compareTo() instead of equals() because equals() also compares scale (2.0 vs 2.00 are not equal).',
  commonMistake: 'A common mistake is seeing == work for some string literals and assuming it compares text. That happens because of string interning (the JVM caches literal strings), but it is not the rule to rely on for object content. Another mistake is using == on String objects created with new String() and expecting them to be equal, or using == on StringBuffer/StringBuilder (which don\'t override equals()).',
  finalTakeaway: 'For objects, == compares identity; equals() compares logical meaning when the class implements it correctly. Use equals() for content, except for BigDecimal where compareTo() is preferred. Use Objects.equals() for null‑safe comparisons. Never rely on == for object content, even if it appears to work due to interning.',
  tags: ['java', 'objects', 'equality', 'string-interning'],
  rendering: {
    variant: 'deep-dive',
    density: 'comfortable',
    accent: 'blue'
  },
  body: [
    {
      type: 'section',
      title: 'Explain it like a very simple story',
      content: 'Imagine two lunch boxes. The == operator asks, "Is this the exact same lunch box?" The equals() method asks, "Do the lunch boxes have the same food inside?" In Java object comparison, those are different questions.'
    },
    {
      type: 'section',
      title: 'The String Interning Trap',
      content: 'String literals (like "Java") are automatically interned by the JVM — they are stored in a shared pool. If you write "Java" in two different places, they often point to the exact same object. That makes == return true, tricking beginners into thinking == compares text. But this only works for literals and some interned strings, not for strings created with new String() or from external sources.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Two different String objects — new creates distinct instances\nString a = new String("Java");\nString b = new String("Java");\n\nSystem.out.println(a == b);      // false — different objects\nSystem.out.println(a.equals(b)); // true — same content\n\n// String literals are interned — shared instance\nString c = "Java";\nString d = "Java";\n\nSystem.out.println(c == d);      // true — same interned object\nSystem.out.println(c.equals(d)); // true — same content\n\n// Mixing interned and new String\nString e = "Java";\nString f = new String("Java");\n\nSystem.out.println(e == f);      // false — different objects (interned vs new)\nSystem.out.println(e.equals(f)); // true — same content'
    },
    {
      type: 'section',
      title: 'What each line means',
      content: 'a and b are two separate String objects. They both contain the same letters, but they are not the same object. That is why a == b is false. Their text is the same, and String implements equals() to compare text, so a.equals(b) is true.\n\nc and d are both string literals, so the JVM interns (caches) a single instance. Both c and d point to that same cached instance, so c == d is true.\n\nThis is why relying on == for string content is dangerous — it only works in some cases and breaks unpredictably.'
    },
    {
      type: 'table',
      columns: ['Comparison', 'Simple meaning', 'Example result'],
      rows: [
        ['a == b (new String vs new String)', 'Are a and b pointing to the exact same object?', 'false'],
        ['a.equals(b)', 'Do a and b have the same logical value?', 'true'],
        ['c == d (literal vs literal)', 'Are c and d pointing to the exact same object?', 'true (due to interning)'],
        ['a == c (new vs literal)', 'Are a and c pointing to the exact same object?', 'false'],
        ['a == a', 'Is a the same reference as itself?', 'true']
      ]
    },
    {
      type: 'section',
      title: 'Objects.equals(): The Modern Null‑Safe Standard',
      content: 'Java 7 introduced `Objects.equals(a, b)`, which returns `true` if both arguments are `null`, `false` if one is `null`, and otherwise returns `a.equals(b)`. This eliminates the risk of `NullPointerException` and is the preferred way to compare objects in modern code. For arrays, use `Arrays.equals()` for one‑dimensional arrays and `Arrays.deepEquals()` for nested arrays.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Null‑safe equality with Objects.equals()\nString name1 = "Alice";\nString name2 = null;\n\nSystem.out.println(Objects.equals(name1, name2)); // false — no NPE\nSystem.out.println(Objects.equals(name2, name2)); // true — both null\n\n// The old way — risk of NPE\nSystem.out.println(name1.equals(name2)); // false, but if name1 were null, this throws NPE'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Common beginner trap',
      content: 'Do not use == to compare String content. Use equals(), or better yet, Objects.equals() for null‑safe comparison. You usually care whether the words match, not whether both variables point to the exact same String object. The fact that == works for string literals is a special case, not the rule.'
    },
    {
      type: 'section',
      title: 'Special Cases: BigDecimal, StringBuilder, and Arrays',
      content: 'Some Java types have surprising equals() behavior:\n- `BigDecimal` compares both value AND scale — `new BigDecimal("2.0").equals(new BigDecimal("2.00"))` returns `false`, even though the values are mathematically equal. Use `compareTo()` for numerical equality.\n- `StringBuilder` and `StringBuffer` do NOT override `equals()` — they inherit from Object, so equals() behaves like ==. Compare their content by converting to String first.\n- Arrays do NOT override equals() — use `Arrays.equals()` for array content.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// BigDecimal surprise\nBigDecimal twoPointZero = new BigDecimal("2.0");\nBigDecimal twoPointZeroZero = new BigDecimal("2.00");\n\nSystem.out.println(twoPointZero.equals(twoPointZeroZero)); // false — scale differs!\nSystem.out.println(twoPointZero.compareTo(twoPointZeroZero)); // true — values are equal\n\n// StringBuilder does not override equals()\nStringBuilder sb1 = new StringBuilder("Hello");\nStringBuilder sb2 = new StringBuilder("Hello");\nSystem.out.println(sb1.equals(sb2)); // false — different objects, even with same content\n\n// Arrays do not override equals()\nint[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 3};\nSystem.out.println(arr1.equals(arr2)); // false — Arrays.equals() is needed\nSystem.out.println(Arrays.equals(arr1, arr2)); // true'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The equals() + hashCode() Contract',
      content: 'If you override equals(), you MUST also override hashCode() so that equal objects have equal hash codes. Otherwise, your objects will break in HashSets, HashMaps, and other hash‑based collections. String, Integer, and other JDK classes already implement this correctly.'
    },
    {
      type: 'checklist',
      title: 'Remember this',
      items: [
        'For primitives like int, == compares values.',
        'For objects, == compares references: same object or not.',
        'For objects, equals() can compare meaning, if the class implemented it properly.',
        'For String content, prefer equals() — not ==, even if == sometimes works due to interning.',
        'Use Objects.equals(a, b) for null‑safe comparisons.',
        'For BigDecimal, use compareTo() for numerical equality.',
        'For arrays, use Arrays.equals() or Arrays.deepEquals().',
        'StringBuilder and StringBuffer do NOT override equals().',
        'If you override equals(), override hashCode() too.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Interview‑Ready Summary',
      content: '== compares object references; equals() compares logical content when properly overridden. String literals are interned, so == can appear to work for them — never rely on this. Use Objects.equals() for null‑safe equality. BigDecimal uses compareTo() for numerical equality. Arrays and StringBuilder require special handling. Always override hashCode() when overriding equals().'
    }
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;