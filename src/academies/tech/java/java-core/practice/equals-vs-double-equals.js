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
  explanation: 'For objects, == compares references (identity) — "Are these two variables pointing to the exact same object?" equals() compares logical content — "Do these objects represent the same value?" String literals are interned (cached) by the JVM, so "Java" == "Java" can be true due to sharing, which misleads beginners into thinking == compares text. Always use equals() for content.',
  mentalPicture: 'Imagine two lunch boxes. == asks, "Is this the exact same lunch box?" equals() asks, "Do the lunch boxes have the same food inside?" String interning is like having a shared pool: if you ask for "Java", you might get the same shared box every time.',
  visualExplanation: 'a = new String("Java") → object #1\nb = new String("Java") → object #2\na == b       → false (different objects)\na.equals(b) → true  (same text)\n\nc = "Java" (literal)\nd = "Java" (literal)\nc == d       → true (interned, same object)\n\nMoral: == works for interned strings but never rely on it for content.',
  productionReality: 'In production, using == for object content causes subtle bugs in authentication, caching, and validation. Always use equals() (or Objects.equals() for null‑safe checks). For BigDecimal, use compareTo() instead of equals() because equals() also compares scale (2.0 vs 2.00 are not equal).',
  commonMistake: 'Seeing == work for string literals and assuming it compares text. It works only because of interning, not because == checks content. Also, StringBuffer/StringBuilder do not override equals() — they behave like ==.',
  finalTakeaway: 'For objects, == compares identity; equals() compares logical meaning. Use equals() for content, Objects.equals() for null‑safe comparisons, and BigDecimal.compareTo() for numeric equality. Never rely on == for object content, even if it appears to work.',
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
      type: 'code',
      language: 'java',
      code: 'String a = new String("Java");\nString b = new String("Java");\n\nSystem.out.println(a == b);      // false — different objects\nSystem.out.println(a.equals(b)); // true — same content\n\nString c = "Java"; // interned literal\nString d = "Java"; // interned literal\nSystem.out.println(c == d);      // true — same interned object'
    },
    {
      type: 'table',
      columns: ['Comparison', 'Meaning', 'Result'],
      rows: [
        ['a == b (new String vs new String)', 'Are they the exact same object?', 'false'],
        ['a.equals(b)', 'Do they have the same logical value?', 'true'],
        ['c == d (literal vs literal)', 'Are they the exact same object?', 'true (due to interning)']
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Common beginner trap',
      content: 'Do not use == to compare String content. Use equals() (or Objects.equals() for null‑safe comparison). The fact that == works for string literals is a special case, not the rule.'
    }
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;