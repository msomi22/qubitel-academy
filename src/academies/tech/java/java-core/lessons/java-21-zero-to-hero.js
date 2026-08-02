import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-java-21-zero-to-hero',
  category: 'java',
  topicId: 'java-core',
  title: 'Java 21: From Zero to Hero',
  difficulty: 'Medium',
  prompt: 'A rigorous, production-grade masterclass on Java 21, the latest LTS release. Covers all 15 finalized JEPs including Virtual Threads (Project Loom), Record Patterns, Pattern Matching for switch, Sequenced Collections, Generational ZGC, and preview features like String Templates, Unnamed Classes, and Structured Concurrency. Includes practical code examples, migration guidance from Java 17, and production-ready best practices.',
  tags: ['java', 'java-21', 'lts', 'virtual-threads', 'pattern-matching', 'records', 'zgc', 'project-loom'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'blue'
  },
  body: [
    // ============================================================
    // INTRODUCTION
    // ============================================================
    {
      type: 'section',
      title: 'Architectural Introduction: Java 21 — The Next LTS Milestone',
      content: 'Java 21, released on September 19, 2023, is a landmark Long-Term Support (LTS) release — the first since Java 17 in 2021. With **15 finalized JDK Enhancement Proposals (JEPs)** covering language, libraries, JVM, and tooling, Java 21 represents a significant leap forward for the platform. This masterclass covers every major feature, from the game-changing Virtual Threads (Project Loom) to finalized Pattern Matching, Record Patterns, Sequenced Collections, and the Generational ZGC. You\'ll also learn about preview features like String Templates, Unnamed Classes, and Structured Concurrency that are shaping the future of Java.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Why Java 21 Matters for Production',
      content: 'Oracle will support JDK 21 for at least eight years, making it the recommended upgrade path for enterprises still on Java 11 or 17. The combination of Virtual Threads, Pattern Matching, and modern GC makes Java 21 the most compelling LTS release in years. This masterclass will prepare you to adopt it with confidence.'
    },

    // ============================================================
    // PART 1: LANGUAGE FEATURES — FINALIZED
    // ============================================================
    {
      type: 'section',
      title: 'Part 1: Language Features — Finalized in Java 21',
      content: 'Java 21 finalizes several long-awaited language features that have been in preview since earlier versions. These features make Java more expressive, concise, and safer.'
    },

    // --- 1.1 Pattern Matching for switch ---
    {
      type: 'section',
      title: '1.1 Pattern Matching for switch (JEP 441) — Final',
      content: 'Pattern matching for `switch` has been a preview feature since Java 17 and is now **finalized** in Java 21. It allows `switch` statements and expressions to test against patterns, making code more concise and less error-prone than chains of `instanceof` checks.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Before Java 21 — verbose instanceof checks\npublic String describe(Object obj) {\n    if (obj instanceof String s) {\n        return "String: " + s;\n    } else if (obj instanceof Integer i) {\n        return "Integer: " + i;\n    } else if (obj instanceof List<?> list) {\n        return "List of size: " + list.size();\n    } else {\n        return "Unknown";\n    }\n}\n\n// Java 21+ — pattern matching switch\npublic String describe(Object obj) {\n    return switch (obj) {\n        case String s -> "String: " + s;\n        case Integer i -> "Integer: " + i;\n        case List<?> list -> "List of size: " + list.size();\n        case null -> "Null value";\n        default -> "Unknown";\n    };\n}\n\n// Guarded patterns for refined matching\npublic String classify(Object obj) {\n    return switch (obj) {\n        case Integer i when i < 0 -> "Negative number";\n        case Integer i when i == 0 -> "Zero";\n        case Integer i -> "Positive number";\n        case String s when s.length() > 10 -> "Long string";\n        case String s -> "Short string";\n        default -> "Other";\n    };\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use Pattern Matching switch',
      content: '✅ **Use when**: You have complex type-checking logic, especially with nested types or null handling.\n\n❌ **AVOID when**: A simple if-else is clearer, or you\'re only checking one type.\n\n💡 **Remember**: The compiler checks exhaustiveness — if you don\'t cover all cases, you\'ll get a compile-time error. This makes your code safer than a chain of `instanceof` checks.'
    },

    // --- 1.2 Record Patterns ---
    {
      type: 'section',
      title: '1.2 Record Patterns (JEP 440) — Final',
      content: 'Record patterns allow you to destructure records directly in pattern matching, making data extraction more concise and readable. This is particularly useful when working with data-oriented programming.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Define a simple record\nrecord Point(int x, int y) {}\nrecord Line(Point start, Point end) {}\n\n// Before Java 21 — manual destructuring\npublic String describe(Point point) {\n    if (point != null) {\n        int x = point.x();\n        int y = point.y();\n        return "Point(" + x + ", " + y + ")";\n    }\n    return "Null";\n}\n\n// Java 21+ — record pattern matching\npublic String describe(Point point) {\n    return switch (point) {\n        case Point(int x, int y) -> "Point(" + x + ", " + y + ")";\n        case null -> "Null";\n    };\n}\n\n// Nested record patterns\npublic String describeLine(Line line) {\n    return switch (line) {\n        case Line(Point(int x1, int y1), Point(int x2, int y2)) ->\n            "Line from (" + x1 + "," + y1 + ") to (" + x2 + "," + y2 + ")";\n        case null -> "Null line";\n    };\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use Record Patterns',
      content: '✅ **Use when**: You\'re working with records (or value objects) and want to extract data concisely, especially in `switch` expressions or `instanceof` checks.\n\n❌ **AVOID when**: You only need one field from a record — a simple accessor is clearer.\n\n💡 **Remember**: Record patterns work with any record, including nested records, making them powerful for destructuring complex data structures.'
    },

    // --- 1.3 Sequenced Collections ---
    {
      type: 'section',
      title: '1.3 Sequenced Collections (JEP 431) — Final',
      content: 'Sequenced Collections introduce a new interface hierarchy for collections with a defined encounter order. This provides consistent APIs for accessing the first and last elements, and for reversing collections — addressing a long-standing gap in the Collections Framework.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 21+ — Sequenced Collections\nimport java.util.*;\n\n// SequencedCollection — for List, Deque, etc.\nList<String> list = List.of("a", "b", "c");\nString first = list.getFirst();  // "a" — no more list.get(0)\nString last = list.getLast();    // "c" — no more list.get(list.size() - 1)\n\n// SequencedSet — for SortedSet, LinkedHashSet\nSortedSet<String> set = new TreeSet<>(Set.of("c", "a", "b"));\nString firstSet = set.getFirst();  // "a"\nString lastSet = set.getLast();    // "c"\n\n// SequencedMap — for LinkedHashMap, TreeMap\nMap<String, Integer> map = new LinkedHashMap<>();\nmap.put("a", 1);\nmap.put("b", 2);\nmap.put("c", 3);\nMap.Entry<String, Integer> firstEntry = map.firstEntry(); // "a"=1\nMap.Entry<String, Integer> lastEntry = map.lastEntry();   // "c"=3\n\n// Reverse a collection\nList<String> reversed = list.reversed(); // [c, b, a]'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Use Sequenced Collections',
      content: '✅ **Use when**: You need predictable ordering, want to get the first or last element safely, or need to reverse collections.\n\n❌ **AVOID when**: You\'re using unordered collections like `HashSet` or `HashMap` — they don\'t implement these interfaces.\n\n💡 **Remember**: This is a **backward-compatible** addition — existing code continues to work. The new methods make common operations much more readable.'
    },

    // ============================================================
    // PART 2: CONCURRENCY — VIRTUAL THREADS (PROJECT LOOM)
    // ============================================================
    {
      type: 'section',
      title: 'Part 2: Concurrency — Virtual Threads (Project Loom)',
      content: 'Virtual Threads (JEP 444) are the headline feature of Java 21. They are lightweight threads that dramatically reduce the effort of writing, maintaining, and observing high-throughput concurrent applications. Virtual threads are now **finalized** and ready for production use.'
    },

    // --- 2.1 What Are Virtual Threads? ---
    {
      type: 'section',
      title: '2.1 What Are Virtual Threads?',
      content: 'Traditional platform threads (Java threads) are expensive — each consumes about 1MB of stack memory and OS resources. This limits how many you can create. Virtual threads, by contrast, are managed by the JVM and are extremely lightweight, allowing you to create **millions** of concurrent threads without the overhead of platform threads.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Creating virtual threads\n// 1. Using Thread.startVirtualThread()\nThread vThread = Thread.startVirtualThread(() -> {\n    System.out.println("Running in a virtual thread");\n});\n\n// 2. Using Thread.ofVirtual()\nThread vThread2 = Thread.ofVirtual()\n    .name("my-virtual-thread")\n    .start(() -> {\n        System.out.println("Named virtual thread");\n    });\n\n// 3. Using Executors.newVirtualThreadPerTaskExecutor()\ntry (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    executor.submit(() -> System.out.println("Task 1"));\n    executor.submit(() -> System.out.println("Task 2"));\n} // Automatically closes and waits for all tasks\n\n// 4. Scaling to handle thousands of concurrent tasks\nList<Future<Integer>> futures = new ArrayList<>();\ntry (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    for (int i = 0; i < 100_000; i++) {\n        int taskId = i;\n        futures.add(executor.submit(() -> {\n            Thread.sleep(100); // Simulate I/O\n            return taskId;\n        }));\n    }\n}\n// All 100,000 tasks run concurrently without overwhelming the system'
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Virtual Threads Best Practices',
      content: '✅ **Use virtual threads for**: I/O-bound workloads, web servers, microservices, database queries, and any task that blocks frequently.\n\n❌ **DON\'T use virtual threads for**: CPU-bound computation — use platform threads (or parallel streams) instead. Virtual threads don\'t speed up CPU work.\n\n💡 **Remember**: Virtual threads are **not** faster at executing code — they reduce the overhead of context switching and blocking, making your application more scalable. Use them where you would have used thread pools before, but without the pool size limitations.'
    },

    // --- 2.2 Structured Concurrency (Preview) ---
    {
      type: 'section',
      title: '2.2 Structured Concurrency (JEP 453) — Preview',
      content: 'Structured Concurrency simplifies concurrent programming by treating groups of related tasks as a single unit of work. It streamlines error handling and cancellation, improving reliability and observability. This is a **preview** feature in Java 21.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 21 Preview — Structured Concurrency\nimport java.util.concurrent.*;\n\n// Using StructuredTaskScope to run multiple tasks concurrently\nResponse handleRequest() throws ExecutionException, InterruptedException {\n    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {\n        // Fork tasks that run concurrently\n        Subtask<User> userTask = scope.fork(() -> fetchUser());\n        Subtask<Order> orderTask = scope.fork(() -> fetchOrder());\n        Subtask<Inventory> inventoryTask = scope.fork(() -> checkInventory());\n\n        // Join all tasks — if any fails, all are cancelled\n        scope.join();\n        scope.throwIfFailed();\n\n        // All tasks succeeded — get results\n        User user = userTask.get();\n        Order order = orderTask.get();\n        Inventory inventory = inventoryTask.get();\n\n        return new Response(user, order, inventory);\n    }\n}\n\n// Error handling is automatic — any failure cancels all subtasks'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Structured Concurrency — What You Need to Know',
      content: '✅ **Use when**: You have multiple independent I/O tasks that can run concurrently and all results are needed before proceeding.\n\n❌ **AVOID when**: Tasks are independent and don\'t need to be cancelled together, or when you\'re working with CPU-bound tasks.\n\n💡 **Remember**: This is a **preview** feature in Java 21 — use it for experimentation and feedback, but be aware that the API may change in future releases.'
    },

    // ============================================================
    // PART 3: GARBAGE COLLECTION
    // ============================================================
    {
      type: 'section',
      title: 'Part 3: Garbage Collection — Generational ZGC',
      content: 'Java 21 introduces **Generational ZGC** (JEP 439), a major enhancement to the Z Garbage Collector. Generational ZGC improves performance by collecting short-lived objects separately from long-lived objects.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Enable Generational ZGC in Java 21\njava -XX:+UseZGC -XX:+ZGenerational -jar my-app.jar\n\n# ZGC is designed for low-latency workloads\n# Generational ZGC offers better throughput for typical applications\n# Test both modes to see which works best for your workload'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Generational ZGC — When to Use',
      content: '✅ **Use when**: You need low-latency GC (sub-millisecond pauses) and your application creates many short-lived objects.\n\n❌ **AVOID when**: Your application is throughput-sensitive and can tolerate longer GC pauses — G1 GC may be a better choice.\n\n💡 **Remember**: Generational ZGC is **optional** — you can still use non-generational ZGC with `-XX:-ZGenerational`. Test both modes to see which performs better for your workload.'
    },

    // ============================================================
    // PART 4: LIBRARY AND TOOLING IMPROVEMENTS
    // ============================================================
    {
      type: 'section',
      title: 'Part 4: Library and Tooling Improvements',
      content: 'Java 21 includes several important library and tooling improvements that enhance security, performance, and developer experience.'
    },

    // --- 4.1 Key Encapsulation Mechanism API ---
    {
      type: 'section',
      title: '4.1 Key Encapsulation Mechanism API (JEP 452) — Final',
      content: 'The Key Encapsulation Mechanism (KEM) API provides a standard way to securely encrypt symmetric keys using public key cryptography. This is important for modern security protocols like post-quantum cryptography.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 21 — KEM API (Preview in earlier versions, finalized in 21)\nimport javax.crypto.*;\nimport java.security.*;\n\n// KEM allows secure key exchange without traditional key agreement protocols\n// Example: encapsulating a symmetric key for transmission\n// (Detailed implementation depends on the specific KEM algorithm)'
    },

    // --- 4.2 UTF-8 by Default ---
    {
      type: 'section',
      title: '4.2 UTF-8 by Default (JEP 400) — Final',
      content: 'Java now uses UTF-8 as the default charset, eliminating the platform-dependent behavior that caused many encoding bugs. This is a significant quality-of-life improvement for cross-platform applications.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 21 — UTF-8 is the default charset\n// No more relying on `file.encoding` or platform defaults\nString text = "Hello, 世界";\nbyte[] bytes = text.getBytes(); // Now UTF-8 by default\nString decoded = new String(bytes); // UTF-8 by default\n\n// The old way (still works, but no longer needed)\n// byte[] bytes = text.getBytes(StandardCharsets.UTF_8);'
    },

    // --- 4.3 Simple Web Server ---
    {
      type: 'section',
      title: '4.3 Simple Web Server (JEP 408) — Final',
      content: 'Java 21 includes a simple web server for prototyping and testing, launched from the command line. This is useful for local development and serving static files.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Start a simple web server on port 8080 serving the current directory\njwebserver\n\n# Serve a specific directory on port 9000\njwebserver -p 9000 -d /path/to/files\n\n# The server serves static files with basic directory listing\n# Perfect for quick prototyping and local testing'
    },

    // ============================================================
    // PART 5: PREVIEW FEATURES
    // ============================================================
    {
      type: 'section',
      title: 'Part 5: Preview Features — The Future of Java',
      content: 'Java 21 includes several preview features that are not yet finalized but give you a glimpse into the future of the language. These are safe to experiment with but should not be used in production.'
    },

    // --- 5.1 String Templates ---
    {
      type: 'section',
      title: '5.1 String Templates (JEP 430) — Preview',
      content: 'String Templates introduce a new way to embed expressions in strings, improving readability and security compared to traditional string concatenation or `String.format()`.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 21 Preview — String Templates\nimport static java.lang.StringTemplate.*;\n\n// Traditional approach — hard to read and error-prone\nString message = "Hello, " + name + "! You have " + count + " messages.";\n\n// String.format — better but still verbose\nString message = String.format("Hello, %s! You have %d messages.", name, count);\n\n// String Templates (Preview)\nString message = STR."Hello, \{name}! You have \{count} messages.";\n\n// Also supports multi-line strings\nString html = STR."\"\"\"\n    <html>\n        <head><title>\{title}</title></head>\n        <body>\n            <h1>\{heading}</h1>\n            <p>\{content}</p>\n        </body>\n    </html>\n    \"\"\";\n\n// Custom processors for security\nString safe = RAW."User input: \{userInput}"; // RAW doesn\'t process, just returns the template'
    },

    // --- 5.2 Unnamed Classes and Instance Main Methods ---
    {
      type: 'section',
      title: '5.2 Unnamed Classes and Instance Main Methods (JEP 445) — Preview',
      content: 'This feature simplifies the entry point for Java programs, making it easier for beginners to write simple Java applications without the ceremony of `public static void main(String[] args)`.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 21 Preview — Unnamed classes and instance main methods\n// No need for a class declaration, no need for public static void main\n\nvoid main() {\n    System.out.println("Hello, world!");\n}\n\n// Or with arguments\nvoid main(String[] args) {\n    System.out.println("Hello, " + args[0]);\n}\n\n// The compiler generates the boilerplate for you'
    },

    // --- 5.3 Unnamed Patterns and Variables ---
    {
      type: 'section',
      title: '5.3 Unnamed Patterns and Variables (JEP 443) — Preview',
      content: 'Unnamed patterns and variables use `_` to indicate that a variable is not needed, improving code clarity and reducing lint warnings.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 21 Preview — Unnamed patterns and variables\n\n// Unused variable in a catch block\ntry {\n    // some operation\n} catch (Exception _) {\n    // We don\'t care about the exception\n    System.out.println("Operation failed");\n}\n\n// Unused parameter in a lambda\nlist.forEach((_) -> System.out.println("Processing element"));\n\n// Unnamed pattern in a switch\nswitch (obj) {\n    case String _ -> System.out.println("It\'s a string");\n    case Integer _ -> System.out.println("It\'s an integer");\n    default -> System.out.println("Something else");\n}'
    },

    // ============================================================
    // PART 6: MIGRATION FROM JAVA 17
    // ============================================================
    {
      type: 'section',
      title: 'Part 6: Migration from Java 17 to Java 21',
      content: 'Migrating from Java 17 to Java 21 is straightforward, but there are a few things to keep in mind.'
    },
    {
      type: 'checklist',
      title: 'Migration Checklist',
      items: [
        '**Check your dependencies**: Ensure all libraries support Java 21. Most popular libraries already do.',
        '**Test with preview features disabled**: Run your application with `--enable-preview` disabled first to ensure no preview features are accidentally used.',
        '**Review deprecated APIs**: Java 21 deprecates some APIs — check your code for warnings.',
        '**Consider virtual threads**: Evaluate whether virtual threads can improve your application\'s scalability.',
        '**Update your build tools**: Ensure Maven/Gradle and your CI/CD pipeline are using Java 21.',
        '**Test performance**: Run performance benchmarks to ensure the new GC and JIT improvements benefit your application.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Key Migration Command',
      content: 'Run your application with `-XX:+EnablePreview` and `--enable-preview` to test preview features. For production, omit these flags to ensure only finalized features are used.'
    },

    // ============================================================
    // PART 7: QUICK REFERENCE — JAVA 21 JEPs
    // ============================================================
    {
      type: 'table',
      columns: ['JEP', 'Feature', 'Status', 'Category'],
      rows: [
        ['431', 'Sequenced Collections', 'Final', 'Collections'],
        ['439', 'Generational ZGC', 'Final', 'Garbage Collection'],
        ['440', 'Record Patterns', 'Final', 'Language'],
        ['441', 'Pattern Matching for switch', 'Final', 'Language'],
        ['444', 'Virtual Threads', 'Final', 'Concurrency'],
        ['452', 'Key Encapsulation Mechanism API', 'Final', 'Security'],
        ['400', 'UTF-8 by Default', 'Final', 'Libraries'],
        ['408', 'Simple Web Server', 'Final', 'Tooling'],
        ['413', 'Code Snippets in JavaDoc', 'Final', 'Documentation'],
        ['416', 'Reimplement Core Reflection', 'Final', 'Performance'],
        ['418', 'Internet-Address Resolution SPI', 'Final', 'Networking'],
        ['451', 'Prepare to Disallow Dynamic Loading of Agents', 'Final', 'Security'],
        ['430', 'String Templates', 'Preview', 'Language'],
        ['443', 'Unnamed Patterns and Variables', 'Preview', 'Language'],
        ['445', 'Unnamed Classes and Instance Main Methods', 'Preview', 'Language'],
        ['453', 'Structured Concurrency', 'Preview', 'Concurrency']
      ]
    },

    // ============================================================
    // CONCLUSION
    // ============================================================
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Java 21 is a transformative LTS release that brings together years of innovation. **Virtual Threads** revolutionize concurrency, making high-throughput applications easier to write and scale. **Pattern Matching for switch** and **Record Patterns** make code more expressive and safer. **Generational ZGC** delivers low-latency garbage collection for modern workloads. Preview features like **String Templates** and **Structured Concurrency** give you a glimpse into Java\'s future.\n\n**When to adopt**: Java 21 is production-ready and LTS-supported. If you\'re on Java 11 or 17, now is the time to plan your migration. The benefits — especially virtual threads and pattern matching — are substantial enough to justify the upgrade.\n\n**Key takeaway**: Java 21 isn\'t just another release — it\'s the foundation for the next generation of Java applications.'
    }
  ],
  explanation: 'A comprehensive, production-grade masterclass on Java 21, covering all 15 finalized JEPs including Virtual Threads (Project Loom), Record Patterns, Pattern Matching for switch, Sequenced Collections, Generational ZGC, and preview features like String Templates, Unnamed Classes, and Structured Concurrency. Includes practical code examples, migration guidance from Java 17, and production-ready best practices.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;