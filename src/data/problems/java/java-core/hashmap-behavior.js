import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-hashmap-behavior-001',
  topicId: 'java-core',
  title: 'HashMap Behavior at a High Level',
  difficulty: 'Medium',
  prompt: 'Teach how a Java HashMap works at a high level. Explain hashing, buckets, equality checks, collisions, resizing, key design, and common production mistakes.',
  tags: ['java', 'collections', 'hashmap'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'green'
  },
  body: [
    {
      type: 'section',
      title: 'Big idea',
      content: 'A HashMap stores key-value pairs. You give it a key, and it tries to find the value quickly without checking every entry one by one. It does this by using the key\'s hashCode() to decide where the entry should live internally.'
    },
    {
      type: 'diagram',
      title: 'Bucket mental picture',
      content: 'key -> hashCode() -> bucket index -> small bucket scan with equals() -> value\n\nSame bucket does not mean same key. HashMap still checks equals() before it returns or replaces a value.',
      caption: 'Hashing gets close to the answer; equality confirms the exact key.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Predict before reveal',
      content: 'If two different keys land in the same bucket, does HashMap overwrite the first value immediately? Predict the answer before reading the collision section.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'Map<String, Integer> ages = new HashMap<>();\n\nages.put("Amina", 12);\nages.put("Brian", 14);\n\nInteger age = ages.get("Amina"); // 12'
    },
    {
      type: 'section',
      title: 'Step-by-step: put(key, value)',
      content: 'When you call put("Amina", 12), HashMap asks the key for its hashCode(). It uses that hash to choose an internal bucket. Inside that bucket, it stores the key and value together. If another key already lives in the same bucket, HashMap checks whether the keys are equal before deciding whether to replace an existing value or add a new entry.'
    },
    {
      type: 'section',
      title: 'Step-by-step: get(key)',
      content: 'When you call get("Amina"), HashMap again calculates the hash for "Amina", jumps to the likely bucket, and then uses equals() to find the exact matching key. If it finds the matching key, it returns the stored value. If not, it returns null.'
    },
    {
      type: 'table',
      columns: ['Concept', 'What it does', 'Why it matters'],
      rows: [
        ['hashCode()', 'Produces an integer used to choose a bucket.', 'Good distribution keeps lookups fast.'],
        ['Bucket', 'An internal place where entries may be stored.', 'HashMap jumps to a bucket instead of scanning everything.'],
        ['equals()', 'Confirms the exact logical key inside a bucket.', 'Different keys can have the same hash or bucket.'],
        ['Collision', 'Two different keys land in the same bucket.', 'Normal behavior, but too many collisions hurt performance.'],
        ['Resize', 'HashMap grows its internal table when it gets too full.', 'Keeps buckets from becoming overcrowded.']
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The simple formula',
      content: 'hashCode() gets HashMap close to the right place. equals() confirms the exact key.'
    },
    {
      type: 'section',
      title: 'Collisions are not bugs',
      content: 'A collision does not mean the map is broken. It only means two keys ended up in the same bucket area. HashMap handles this by storing multiple entries in that bucket and checking keys with equals(). In modern Java, very crowded buckets can be organized more efficiently internally, but your high-level mental model should remain: hash first, then equality check.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Self-explanation prompt',
      content: 'In your own words, explain why same hash or same bucket is not enough to prove two keys are the same.'
    },
    {
      type: 'section',
      title: 'Why mutable keys are dangerous',
      content: 'A key should not change in a way that affects hashCode() or equals() after it is inserted. If the key changes, HashMap may look in the wrong bucket later and fail to find an entry that is still inside the map.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'class UserKey {\n    String email;\n\n    UserKey(String email) {\n        this.email = email;\n    }\n\n    @Override\n    public boolean equals(Object other) {\n        if (!(other instanceof UserKey user)) return false;\n        return email.equals(user.email);\n    }\n\n    @Override\n    public int hashCode() {\n        return email.hashCode();\n    }\n}\n\nUserKey key = new UserKey("a@example.com");\nMap<UserKey, String> map = new HashMap<>();\nmap.put(key, "Amina");\n\nkey.email = "changed@example.com";\nSystem.out.println(map.get(key)); // likely null or unexpected'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Mutable key prediction',
      content: 'After key.email changes, HashMap may search a different bucket than the one used during put(). The entry can still exist internally but become hard to retrieve through that mutated key.'
    },
    {
      type: 'comparison',
      items: [
        {
          title: 'Good HashMap key',
          content: 'Immutable or effectively immutable, has consistent equals() and hashCode(), and represents identity clearly.'
        },
        {
          title: 'Bad HashMap key',
          content: 'Mutable fields are used for equals() or hashCode(), or equals() and hashCode() disagree with each other.'
        }
      ]
    },
    {
      type: 'section',
      title: 'Performance intuition',
      content: 'HashMap is usually very fast for put and get because it narrows the search to a small bucket. The expected time is commonly treated as O(1), but that depends on good hashing and reasonable collision levels. Bad hash functions, too many collisions, or poorly designed keys can make performance worse.'
    },
    {
      type: 'checklist',
      title: 'Strong answer checklist',
      items: [
        'Explain that HashMap stores key-value pairs.',
        'Mention hashCode() helps choose a bucket.',
        'Mention equals() confirms the exact key.',
        'Explain that collisions are normal and handled internally.',
        'Mention resizing/load factor at a high level.',
        'Warn against mutable keys.',
        'Connect equals() and hashCode(): equal objects must have equal hash codes.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Interview-ready summary',
      content: 'A Java HashMap uses hashing to jump near the answer and equality to confirm the exact key. It is fast when keys have stable, well-distributed hash codes and correct equality behavior.'
    }
  ],
  explanation: 'A complete answer should teach the path of put and get, explain why hashCode() and equals() work together, describe collisions as normal, and warn that mutable keys can make entries difficult to retrieve.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
