import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-hashmap-behavior-001',
  topicId: 'java-core',
  title: 'HashMap Behavior at a High Level',
  difficulty: 'Medium',
  prompt: 'A rigorous, production-grade masterclass on Java HashMap internals, dissecting hashing, bucket selection, equality checks, collisions, Java 8 treeification, load factor and resizing, null handling, key design principles, functional methods (computeIfAbsent, merge), iteration patterns, and common production anti-patterns.',
  tags: ['java', 'collections', 'hashmap', 'hashing', 'performance'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'green'
  },
  body: [
    {
      type: 'section',
      title: 'Big idea',
      content: 'A HashMap stores key-value pairs. You give it a key, and it tries to find the value quickly without checking every entry one by one. It does this by using the key\'s hashCode() to decide where the entry should live internally. HashMap is the workhorse of Java collections — used in caches, lookup tables, and countless enterprise patterns — but only if its internal behavior is understood at a deep level.'
    },
    {
      type: 'section',
      title: 'Bucket mental picture',
      content: 'key -> hashCode() -> additional hash mixing -> bucket index -> small bucket scan with equals() -> value\n\nSame bucket does not mean same key. HashMap still checks equals() before it returns or replaces a value.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The simple formula',
      content: 'hashCode() gets HashMap close to the right place. equals() confirms the exact key.'
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
      content: 'When you call put("Amina", 12), HashMap asks the key for its hashCode(). It then applies an internal hash mixing function to spread the bits more evenly, reducing the risk of poor hashCode() implementations. The mixed hash is used to select an internal bucket using a bitwise AND with the table length minus one (because table length is always a power of two). Inside that bucket, it stores the key and value together. If another key already lives in the same bucket, HashMap checks whether the keys are equal before deciding whether to replace an existing value or add a new entry.'
    },
    {
      type: 'section',
      title: 'Step-by-step: get(key)',
      content: 'When you call get("Amina"), HashMap again calculates the mixed hash for "Amina", jumps to the likely bucket, and then uses equals() to find the exact matching key. If it finds the matching key, it returns the stored value. If not, it returns null (or the default value if using getOrDefault()).'
    },
    {
      type: 'section',
      title: 'Java 8+ Treeification: When Buckets Become Trees',
      content: 'Before Java 8, all collisions were handled with a simple linked list in each bucket. This meant worst-case O(n) performance if a malicious or poorly designed key caused many collisions. Starting in Java 8, when a bucket grows beyond a threshold of 8 entries and the total table size is at least 64, the linked list is replaced with a balanced red‑black tree (TreeNode). This improves worst-case lookup time from O(n) to O(log n), making HashMap resistant to hash collision attacks and degenerate performance.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// The treeification threshold in HashMap source code\nstatic final int TREEIFY_THRESHOLD = 8;\nstatic final int MIN_TREEIFY_CAPACITY = 64;\n\n// Once a bucket exceeds 8 entries, and the table has at least 64 slots,\n// the bucket converts from a linked list to a red‑black tree for O(log n) access.'
    },
    {
      type: 'table',
      columns: ['Concept', 'What it does', 'Why it matters'],
      rows: [
        ['hashCode()', 'Produces an integer used to choose a bucket.', 'Good distribution keeps lookups fast.'],
        ['Hash mixing (spread)', 'Spreads higher bits of hashCode() into lower bits.', 'Improves distribution, especially for power-of-two table sizes.'],
        ['Bucket', 'An internal place where entries may be stored.', 'HashMap jumps to a bucket instead of scanning everything.'],
        ['equals()', 'Confirms the exact logical key inside a bucket.', 'Different keys can have the same hash or bucket.'],
        ['Collision', 'Two different keys land in the same bucket.', 'Normal behavior, but too many collisions hurt performance. Java 8+ treeifies crowded buckets.'],
        ['Resize', 'HashMap grows its internal table when it gets too full.', 'Keeps buckets from becoming overcrowded.'],
        ['Load factor', '0.75 by default — triggers resize when 75% of capacity is reached.', 'Balances memory usage vs. lookup performance.'],
        ['Initial capacity', 'The initial number of buckets.', 'Choosing this wisely avoids expensive resizing operations.']
      ]
    },
    {
      type: 'section',
      title: 'Load Factor and Resizing',
      content: 'The `load factor` (default 0.75) determines when HashMap resizes its internal table. When the number of entries exceeds `capacity * load factor`, the table doubles in size. All existing entries must be rehashed and redistributed across the new table, which is an O(n) operation that can cause latency spikes in production. The initial capacity should be set to `expected entries / load factor` when you know the approximate size, avoiding unnecessary resizing.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Setting initial capacity to avoid resizing when you know the approximate size\nMap<String, User> expectedUsers = new HashMap<>(100); // capacity = 100, load factor = 0.75\n// Threshold = 100 * 0.75 = 75 entries before resize\n\n// When you know the exact size, use this formula to avoid any resizing:\nMap<String, User> exactUsers = new HashMap<>((int) (100 / 0.75f) + 1); // capacity = 134'
    },
    {
      type: 'section',
      title: 'The hash() Function: Why More Than hashCode()',
      content: 'HashMap doesn\'t use `hashCode()` directly. It applies a supplementary mixing function: the hash code is shifted right by 16 bits and XORed with itself. This spreads higher bits downward, improving distribution when the table length is small (which is a power of two). Without this, keys whose hash codes differ only in the high bits would collide unnecessarily.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// The hash mixing function from HashMap source (simplified)\nstatic final int hash(Object key) {\n    int h = key.hashCode();\n    return h ^ (h >>> 16); // Spreads higher bits into lower bits\n}\n\n// Bucket index calculation: hash & (capacity - 1)\n// Since capacity is a power of two, this is equivalent to hash % capacity\n// but uses bitwise AND for speed.'
    },
    {
      type: 'section',
      title: 'null Keys and Values',
      content: 'HashMap permits one `null` key and unlimited `null` values. The `null` key is stored in a special bucket (bucket 0) with its own handling. This is useful for representing "unknown" or "unset" keys, but be cautious when using `get()` — it returns `null` both when the key maps to `null` and when the key is absent. Use `getOrDefault()` or `containsKey()` to disambiguate.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'Map<String, String> settings = new HashMap<>();\nsettings.put(null, "default");\nsettings.put("theme", null);\n\n// Both return null, but mean different things\nString missing = settings.get("unknown");          // null (key absent)\nString nullValue = settings.get("theme");          // null (key present, value is null)\n\n// Disambiguate with containsKey() or getOrDefault()\nString safe = settings.getOrDefault("unknown", "fallback"); // "fallback"'
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
      content: 'A key should not change in a way that affects hashCode() or equals() after it is inserted. If the key changes, HashMap may look in the wrong bucket later and fail to find an entry that is still inside the map. This is one of the most common and subtle bugs in production systems.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'class UserKey {\n    String email;\n\n    UserKey(String email) {\n        this.email = email;\n    }\n\n    @Override\n    public boolean equals(Object other) {\n        if (!(other instanceof UserKey user)) return false;\n        return email.equals(user.email);\n    }\n\n    @Override\n    public int hashCode() {\n        return email.hashCode();\n    }\n}\n\nUserKey key = new UserKey("a@example.com");\nMap<UserKey, String> map = new HashMap<>();\nmap.put(key, "Amina");\n\nkey.email = "changed@example.com"; // MUTATING A KEY IN THE MAP!\nSystem.out.println(map.get(key)); // likely null — wrong bucket now\n\n// The entry still exists but is unreachable by lookup\nboolean stillContains = map.containsKey(key); // false\nboolean stillInside = map.size() == 1;        // true — it\'s still there, just lost'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The Golden Rule of HashMap Keys',
      content: 'Keys used in a HashMap must be immutable, or at least effectively immutable, with consistent equals() and hashCode() as long as they are in the map. Otherwise, you risk unreachable entries, memory leaks, and heisenbugs that defy reproduction.'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'Good HashMap key',
          content: 'Immutable (String, Integer, UUID) or effectively immutable, has consistent equals() and hashCode(), and represents identity clearly.'
        },
        {
          label: 'Bad HashMap key',
          content: 'Mutable fields used for equals() or hashCode(), or equals() and hashCode() disagree with each other, or the object can change after insertion.'
        }
      ]
    },
    {
      type: 'section',
      title: 'Modern Functional Methods: computeIfAbsent, merge, putIfAbsent',
      content: 'Java 8 added functional methods that simplify common patterns and reduce boilerplate. Methods like `computeIfAbsent`, `merge`, and `putIfAbsent` are convenient for single‑threaded code, but **they are not atomic** in a `HashMap` — they do not provide any synchronization or concurrency guarantees. In a single‑threaded context they are safe and useful; for concurrent access, always use `ConcurrentHashMap`, which provides atomic versions of these methods (e.g., `computeIfAbsent`, `merge`, `putIfAbsent` are atomic in `ConcurrentHashMap`). Using these methods on a plain `HashMap` in a multi‑threaded environment can lead to corruption, lost updates, and race conditions.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// These are convenience methods, not concurrency primitives — use them only in single-threaded code\nMap<String, List<String>> usersByRole = new HashMap<>();\nusersByRole.computeIfAbsent("admin", k -> new ArrayList<>()).add("alice");\n\nMap<String, Integer> inventory = new HashMap<>();\ninventory.merge("SKU-001", 5, Integer::sum); // quantity = 5\ninventory.merge("SKU-001", 3, Integer::sum); // quantity = 8\n\n// putIfAbsent — only insert if absent\nMap<String, Connection> cache = new HashMap<>();\ncache.putIfAbsent("db-primary", createConnection("db-primary"));\n\n// For concurrent use, always switch to ConcurrentHashMap\nConcurrentHashMap<String, Integer> concurrentInventory = new ConcurrentHashMap<>();\nconcurrentInventory.merge("SKU-001", 5, Integer::sum); // Atomic and thread-safe'
    },
    {
      type: 'section',
      title: 'Iteration Patterns: entrySet, keySet, values',
      content: 'HashMap provides three views: `entrySet()` (the most efficient for accessing both key and value), `keySet()` (for iterating keys), and `values()` (for iterating values). All views reflect the current state of the map and modifications to the map are reflected in the views. Use `forEach` for clean, modern iteration with lambdas.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Modern iteration with forEach\nMap<String, Integer> ages = new HashMap<>();\nages.put("Amina", 12);\nages.put("Brian", 14);\n\nages.forEach((name, age) -> System.out.println(name + " = " + age));\n\n// entrySet iteration (preferred when you need both key and value)\nfor (Map.Entry<String, Integer> entry : ages.entrySet()) {\n    System.out.println(entry.getKey() + " -> " + entry.getValue());\n}\n\n// keySet iteration (only need keys)\nfor (String name : ages.keySet()) {\n    System.out.println(name);\n}\n\n// Warning: modifying the map while iterating over its view throws ConcurrentModificationException,\n// unless you use the iterator\'s remove() method.\nIterator<Map.Entry<String, Integer>> it = ages.entrySet().iterator();\nwhile (it.hasNext()) {\n    Map.Entry<String, Integer> entry = it.next();\n    if (entry.getValue() < 18) {\n        it.remove(); // Safe removal during iteration\n    }\n}'
    },
    {
      type: 'section',
      title: 'HashMap vs Alternatives: When Not to Use HashMap',
      content: 'HashMap is the right tool for most random-access lookup scenarios, but not all. Use `LinkedHashMap` when insertion order matters (or access order for LRU caches). Use `TreeMap` when keys need to be sorted or you need range queries. Use `ConcurrentHashMap` in multi-threaded environments. Use `EnumMap` when keys are enums for extreme performance. Use `IdentityHashMap` when you need reference-equality semantics.'
    },
    {
      type: 'table',
      columns: ['Map Type', 'Use Case', 'Key Feature'],
      rows: [
        ['HashMap', 'General-purpose key-value lookup', 'O(1) average time, fast and lightweight.'],
        ['LinkedHashMap', 'Predictable iteration order', 'Keeps insertion order or access order.'],
        ['TreeMap', 'Sorted keys or range queries', 'Red‑black tree, O(log n) operations.'],
        ['ConcurrentHashMap', 'Multi‑threaded environments', 'Thread-safe, high concurrency.'],
        ['EnumMap', 'Enum keys only', 'Extremely fast, implemented as an array.'],
        ['IdentityHashMap', 'Reference equality', 'Uses == instead of equals()/hashCode().']
      ]
    },
    {
      type: 'section',
      title: 'Performance intuition',
      content: 'HashMap is usually very fast for put and get because it narrows the search to a small bucket. The expected time is commonly treated as O(1), but that depends on good hashing and reasonable collision levels. Bad hash functions, too many collisions, or poorly designed keys can make performance worse. With Java 8\'s treeification, worst-case performance improves from O(n) to O(log n), but the average remains O(1). The cost of resizing is O(n) and occurs only periodically, but can be smoothed by setting an appropriate initial capacity.'
    },
    {
      type: 'checklist',
      title: 'Strong answer checklist',
      items: [
        'Explain that HashMap stores key-value pairs in buckets.',
        'Mention hashCode() and the internal hash mixing function.',
        'Mention equals() confirms the exact key within a bucket.',
        'Explain that collisions are normal and handled internally (linked lists, then trees in Java 8+).',
        'Explain load factor and resizing — and why initial capacity matters.',
        'Warn against mutable keys with a concrete example.',
        'Connect equals() and hashCode(): equal objects must have equal hash codes.',
        'Mention null key support and get() ambiguity with getOrDefault().',
        'Cover modern functional methods: computeIfAbsent, merge, putIfAbsent, noting they are not atomic in HashMap.',
        'Mention iteration patterns and ConcurrentModificationException.',
        'Compare with LinkedHashMap, TreeMap, and ConcurrentHashMap.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Interview-ready summary',
      content: 'A Java HashMap uses hashing to jump near the answer and equality to confirm the exact key. It handles collisions with linked lists, upgrading to balanced trees in Java 8+ when buckets get crowded. It resizes at the load factor (default 0.75) and rehashes all entries. Keys must be immutable or effectively immutable, and equal keys must have equal hash codes. Use ConcurrentHashMap for concurrency, LinkedHashMap for order, and TreeMap for sorting. Set initial capacity when you know the size to avoid expensive resizing.'
    }
  ],
  explanation: 'A comprehensive masterclass covering HashMap internal structure, hash mixing, bucket selection via bitwise AND, Java 8 treeification for collision resistance, load factor and resizing mechanics, the hash() mixing function, null key handling, key immutability requirements, functional methods (computeIfAbsent, merge, putIfAbsent) with clarity that they are not atomic in HashMap, iteration patterns, comparisons with alternative maps, and common production anti-patterns.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;