import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-java-26-zero-to-hero',
  category: 'java',
  topicId: 'java-core',
  title: 'Java 26: From Zero to Hero',
  difficulty: 'Medium',
  prompt: 'A rigorous, production-grade masterclass on Java 26, the latest feature release. Covers all 10 JEPs including Primitive Types in Patterns (fourth preview), HTTP/3 support, PEM Encoding, Lazy Constants, Structured Concurrency (sixth preview), G1 GC throughput improvements, and the Prepare to Make Final Mean Final initiative. Includes practical code examples and production considerations.',
  tags: ['java', 'java-26', 'pattern-matching', 'http3', 'pem', 'lazy-constants', 'structured-concurrency', 'g1gc'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'purple'
  },
  body: [
    // ============================================================
    // INTRODUCTION
    // ============================================================
    {
      type: 'section',
      title: 'Architectural Introduction: Java 26 — The Non-LTS Powerhouse',
      content: 'Java 26, released on March 17, 2026, is a feature release that delivers **10 JDK Enhancement Proposals (JEPs)** covering language, security, performance, and libraries. While Java 26 is not a Long-Term Support (LTS) release, it contains significant advancements: primitive types in patterns (fourth preview), HTTP/3 support, PEM encoding for cryptographic objects, lazy constants, structured concurrency (sixth preview), G1 GC throughput improvements, and the groundbreaking "Prepare to Make Final Mean Final" initiative. This masterclass covers every JEP in detail, with practical examples and production considerations for teams that adopt frequent release cycles.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Java 26 in Production — Should You Upgrade?',
      content: 'Java 26 is not an LTS release, but it is production-ready. If you use a CI/CD pipeline with frequent deployments and want the latest features, Java 26 is a great choice. For enterprises requiring long-term stability, Java 25 (LTS) or Java 21 (LTS) are the recommended versions. However, understanding Java 26 features gives you a preview of what\'s coming in the next LTS.'
    },

    // ============================================================
    // PART 1: LANGUAGE FEATURES
    // ============================================================
    {
      type: 'section',
      title: 'Part 1: Language Features — Primitive Types in Patterns',
      content: 'The only language-specific feature in Java 26 is the continued evolution of pattern matching to support primitive types. This is the **fourth preview** of this feature.'
    },

    // --- 1.1 Primitive Types in Patterns ---
    {
      type: 'section',
      title: '1.1 Primitive Types in Patterns, instanceof, and switch (JEP 530) — Fourth Preview',
      content: 'JEP 530 enhances pattern matching by allowing primitive types in all pattern contexts. It extends `instanceof` and `switch` to work with all primitive types, making Java more uniform and expressive. This eliminates friction when using pattern matching with primitive types.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 26 Preview — Primitive types in patterns\n\n// Before Java 26 — primitive types required manual boxing\nObject value = 42;\nif (value instanceof Integer i) {\n    int num = i; // Manual unboxing\n}\n\n// Java 26+ — primitive types work directly in patterns\nObject value = 42;\nif (value instanceof int num) {\n    System.out.println("Number: " + num); // No boxing/unboxing needed\n}\n\n// Switch with primitive patterns\nString describe(Object obj) {\n    return switch (obj) {\n        case int i when i < 0 -> "Negative integer: " + i;\n        case int i when i == 0 -> "Zero";\n        case int i -> "Positive integer: " + i;\n        case long l -> "Long: " + l;\n        case double d -> "Double: " + d;\n        case boolean b -> "Boolean: " + b;\n        case char c -> "Character: " + c;\n        default -> "Other";\n    };\n}\n\n// instanceof with primitive types\nif (obj instanceof int num) {\n    System.out.println("It\'s an int: " + num);\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Primitive Types in Patterns — What You Need to Know',
      content: '✅ **Use when**: You\'re working with pattern matching and want to avoid manual boxing/unboxing.\n\n❌ **AVOID when**: You\'re not using pattern matching — this feature doesn\'t change how you write simple code.\n\n💡 **Remember**: This is a **preview** feature in Java 26. Use `--enable-preview` to try it. The feature is expected to be finalized in a future release.'
    },

    // ============================================================
    // PART 2: LIBRARY IMPROVEMENTS
    // ============================================================
    {
      type: 'section',
      title: 'Part 2: Library Improvements — The Bulk of Java 26',
      content: 'The majority of changes in Java 26 are in the libraries, bringing modern networking, cryptography, and concurrency APIs to the platform.'
    },

    // --- 2.1 HTTP/3 Support ---
    {
      type: 'section',
      title: '2.1 HTTP/3 for the HTTP Client API (JEP 517) — Final',
      content: 'The HTTP Client API has been enhanced to support HTTP/3, the latest version of the HTTP protocol. HTTP/3 uses the UDP-based QUIC protocol instead of TCP, delivering better performance without requiring code changes.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 26 — HTTP/3 support in the HTTP Client API\nimport java.net.http.*;\nimport java.net.URI;\n\n// Create an HTTP Client that supports HTTP/3\nHttpClient client = HttpClient.newHttpClient();\n\n// Specify HTTP/3 protocol when creating the request\nHttpRequest request = HttpRequest.newBuilder()\n    .uri(URI.create("https://example.com/api"))\n    .version(HttpClient.Version.HTTP_3)  // HTTP/3 support\n    .GET()\n    .build();\n\n// Send the request — HTTP/3 is negotiated automatically\nHttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());\nSystem.out.println(response.body());\n\n// HTTP/3 falls back to HTTP/2 or HTTP/1.1 if the server doesn\'t support it\n// No code changes needed beyond specifying the version'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'HTTP/3 — When to Use',
      content: '✅ **Use when**: You\'re building applications that make many network requests and want to leverage the performance benefits of QUIC (faster connection establishment, better multiplexing, improved loss recovery).\n\n❌ **AVOID when**: Your target servers don\'t support HTTP/3 — the client will fall back to HTTP/2 or HTTP/1.1 automatically.\n\n💡 **Remember**: HTTP/3 uses UDP (QUIC), which can be blocked in some corporate networks. Test before deploying to production.'
    },

    // --- 2.2 PEM Encoding for Cryptographic Objects ---
    {
      type: 'section',
      title: '2.2 PEM Encoding for Cryptographic Objects (JEP 524) — Second Preview',
      content: 'PEM (Privacy-Enhanced Mail) encoding is widely used for transmitting cryptographic objects like public keys, private keys, and certificates. This JEP adds a concise API for converting between PEM text and cryptographic objects, reducing errors and simplifying compliance.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 26 Preview — PEM Encoding API\nimport javax.crypto.*;\nimport java.security.*;\nimport java.security.cert.*;\n\n// Encode a public key to PEM format\nPublicKey publicKey = ...;\nString pemEncoded = PEM.encode(publicKey);\n\n// Decode a PEM string back to a cryptographic object\nPublicKey decodedKey = PEM.decodePublicKey(pemEncoded);\n\n// Encode a certificate to PEM format\nCertificate cert = ...;\nString pemCert = PEM.encode(cert);\n\n// Decode a PEM certificate\nCertificate decodedCert = PEM.decodeCertificate(pemCert);\n\n// Works for private keys, public keys, certificates, and CRLs'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'PEM Encoding — When to Use',
      content: '✅ **Use when**: You need to exchange cryptographic objects (keys, certificates) in a text format, especially for email or configuration files.\n\n❌ **AVOID when**: You\'re already using a binary format like DER, and there\'s no need for human readability.\n\n💡 **Remember**: This is a **preview** feature in Java 26. The API is designed to be simple and reduce the risk of errors in cryptography setup.'
    },

    // --- 2.3 Lazy Constants ---
    {
      type: 'section',
      title: '2.3 Lazy Constants (JEP 526) — Second Preview',
      content: 'Lazy Constants are objects that hold unmodifiable data and are initialized on demand. The JVM treats them as true constants, enabling performance optimizations like constant folding. This feature serves as a middle ground between eager initialization and peak performance.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 26 Preview — Lazy Constants API\nimport java.lang.LazyConstant;\n\n// Before Java 26 — manual lazy initialization with double-checked locking\nclass Service {\n    private volatile Service instance;\n\n    Service get() {\n        if (instance == null) {\n            synchronized (this) {\n                if (instance == null) {\n                    instance = new Service();\n                }\n            }\n        }\n        return instance;\n    }\n}\n\n// Java 26+ — LazyConstant simplifies this\nclass Application {\n    private static final LazyConstant<Service> SERVICE = LazyConstant.of(Service::new);\n\n    static Service service() {\n        return SERVICE.get(); // Initialized at most once, thread-safe\n    }\n}\n\n// Lazy lists and maps\nList<String> lazyList = List.ofLazy(() -> computeExpensiveList());\nMap<String, Integer> lazyMap = Map.ofLazy(() -> computeExpensiveMap());\n\n// Null is not allowed as a computed value — improves performance and aligns with other constructs\n// LazyConstant.of(() -> null) // Throws NullPointerException'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Lazy Constants — When to Use',
      content: '✅ **Use when**: You have expensive initialization that should be deferred until needed, and you want thread-safe, at-most-once initialization with JVM-level optimizations.\n\n❌ **AVOID when**: Initialization is cheap, or you need the value eagerly for correctness.\n\n💡 **Remember**: This is a **preview** feature in Java 26. The API was renamed from `StableValue` to `LazyConstant` based on community feedback. The `LazyConstant` itself must be stored in a `final` field for the JVM to optimize access.'
    },

    // --- 2.4 Structured Concurrency ---
    {
      type: 'section',
      title: '2.4 Structured Concurrency (JEP 525) — Sixth Preview',
      content: 'Structured Concurrency simplifies concurrent programming by treating groups of related tasks as a single unit of work. In Java 26, this is the **sixth preview**, with minor API improvements including a new `onTimeout()` method in the `Joiner` interface.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 26 Preview — Structured Concurrency with timeout handling\nimport java.util.concurrent.*;\n\nResponse handleRequest() throws ExecutionException, InterruptedException {\n    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {\n        // Fork tasks\n        Subtask<User> userTask = scope.fork(() -> fetchUser());\n        Subtask<Order> orderTask = scope.fork(() -> fetchOrder());\n\n        // Join with timeout handling\n        scope.join();\n\n        // New in Java 26: onTimeout() in Joiner\n        var joiner = StructuredTaskScope.Joiner.allSuccessfulOrThrow();\n        var results = joiner.onTimeout(() -> {\n            // Handle timeout — return defaults or throw\n            return List.of(defaultUser, defaultOrder);\n        });\n\n        return new Response(results.get(0), results.get(1));\n    }\n}\n\n// StructuredTaskScope now uses static factory methods instead of public constructors\n// Subtask replaces Future as the return type of fork()'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Structured Concurrency — What\'s New in Java 26',
      content: '✅ **Use when**: You have multiple independent tasks that need to run concurrently and be treated as a single unit of work.\n\n❌ **AVOID when**: Tasks are independent and don\'t need to be cancelled together, or when you\'re not using virtual threads.\n\n💡 **Remember**: This is the **sixth preview** of this API. The API continues to evolve based on community feedback. In Java 26, the `onTimeout()` method allows graceful handling of timeouts.'
    },

    // ============================================================
    // PART 3: PERFORMANCE AND RUNTIME IMPROVEMENTS
    // ============================================================
    {
      type: 'section',
      title: 'Part 3: Performance and Runtime Improvements',
      content: 'Java 26 includes several performance enhancements that make applications faster and more efficient, from garbage collection to startup time.'
    },

    // --- 3.1 G1 GC Throughput Improvements ---
    {
      type: 'section',
      title: '3.1 G1 GC: Improve Throughput by Reducing Synchronization (JEP 522) — Final',
      content: 'JEP 522 improves G1 GC throughput by reducing synchronization between application and garbage collector threads. This allows applications to process more work in less time, improving memory efficiency.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Java 26 — G1 GC improvements are automatic\n# No new flags needed — just use G1 GC\njava -XX:+UseG1GC -jar my-app.jar\n\n# The improvements reduce synchronization overhead\n# Result: better throughput, lower GC pause times\n# Especially beneficial for applications with high allocation rates'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'G1 GC Improvements — What You Need to Know',
      content: '✅ **Use when**: You\'re already using G1 GC — these improvements are automatic and require no configuration.\n\n❌ **AVOID when**: You\'re using a different GC (ZGC, Shenandoah) — these improvements are specific to G1.\n\n💡 **Remember**: The improvements reduce synchronization between application and GC threads, which is particularly beneficial for applications with high allocation rates.'
    },

    // --- 3.2 Ahead-of-Time Object Caching ---
    {
      type: 'section',
      title: '3.2 Ahead-of-Time Object Caching (JEP 516) — Final',
      content: 'JEP 516 allows sequential loading of cached, pre-initialized Java objects into memory from a GC-agnostic format. This improves startup time and warm-up time for Java applications with any garbage collector, including ZGC.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Java 26 — Ahead-of-Time Object Caching\n# Reduces application startup delays\n# Works with any GC, including ZGC\n# Helps applications scale faster and deliver better user experiences\n\n# Automatic when using the HotSpot JVM\n# No explicit configuration required for most use cases'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'AOT Caching — When It Matters',
      content: '✅ **Use when**: You have applications that need fast startup times (serverless, microservices, CLI tools).\n\n❌ **AVOID when**: Startup time is not a concern, or you\'re running long-lived applications where startup is a one-time cost.\n\n💡 **Remember**: This feature works with any GC, making it useful even with low-latency collectors like ZGC.'
    },

    // --- 3.3 Smaller Default Heap ---
    {
      type: 'section',
      title: '3.3 Smaller Default Initial Heap — Improved Startup',
      content: 'JDK 26 improves JVM startup performance by making the default initial Java heap smaller when you do not configure an explicit heap size. This reduces memory usage at startup and improves startup time.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Java 26 — Smaller default initial heap\n# If you don\'t set -Xms, the JVM uses a smaller initial heap\n# Improves startup performance\n\n# You can still override with explicit settings\njava -Xms2g -Xmx2g -jar my-app.jar  # Explicitly set heap size'
    },

    // ============================================================
    // PART 4: SECURITY AND INTEGRITY
    // ============================================================
    {
      type: 'section',
      title: 'Part 4: Security and Integrity — Prepare to Make Final Mean Final',
      content: 'One of the most significant changes in Java 26 is the beginning of enforcing that `final` fields are truly immutable. This is part of Java\'s "integrity by default" principle.'
    },

    // --- 4.1 Prepare to Make Final Mean Final ---
    {
      type: 'section',
      title: '4.1 Prepare to Make Final Mean Final (JEP 500) — Final',
      content: 'JEP 500 issues warnings about uses of deep reflection to mutate final fields. In a future release, such mutations will be restricted or disallowed. This change enforces Java\'s integrity by default, preventing unintended modifications, tampering, or accidental errors in critical business systems.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Java 26 — Warnings for mutating final fields via reflection\n\n// Code that mutates a final field via reflection will now produce a warning\n// Example: Libraries that use reflection to set private final fields\n\nField field = SomeClass.class.getDeclaredField("finalField");\nfield.setAccessible(true);\nfield.set(obj, newValue); // WARNING in Java 26\n\n// In a future release, this will throw an exception\n// To avoid warnings, update your code to not mutate final fields\n\n// Java 26 allows developers to mutate final fields where essential\n// to avoid both current warnings and future restrictions\n// But this should be a temporary measure while refactoring'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Prepare to Make Final Mean Final — Critical for All Developers',
      content: '✅ **Action required**: Run your application on Java 26 to surface warnings from your dependencies. If you use libraries that mutate final fields via reflection, you\'ll see warnings.\n\n❌ **Don\'t ignore**: In a future release, these mutations will be restricted. Start refactoring now.\n\n💡 **Remember**: This change protects application integrity and security. It\'s a fundamental shift in how Java enforces immutability. If you\'re using Spring, Hibernate, or other frameworks, check their compatibility with this change.'
    },

    // ============================================================
    // PART 5: ADDITIONAL IMPROVEMENTS
    // ============================================================
    {
      type: 'section',
      title: 'Part 5: Additional Improvements',
      content: 'Java 26 includes several smaller but important improvements that did not warrant their own JEP.'
    },
    {
      type: 'checklist',
      title: 'Additional Improvements',
      items: [
        '**Virtual thread improvements**: Virtual threads now automatically detach from the carrier thread when waiting for another thread to execute a class initializer.',
        '**DecimalFormat consistency**: `DecimalFormat.format()` now uses the same algorithm as `Double.toString()` and `Formatter`, ensuring consistent output.',
        '**Performance in cryptography**: AES, ML-DSA, and Elliptic Curve P-256 cryptographic algorithms see performance improvements.',
        '**MemorySegment::getString**: String extraction from memory segments now has lower latency, especially for short strings.',
        '**HTTP Client improvements**: Extended request timeout to cover the response body.'
      ]
    },

    // ============================================================
    // PART 6: QUICK REFERENCE — JAVA 26 JEPs
    // ============================================================
    {
      type: 'table',
      columns: ['JEP', 'Feature', 'Status', 'Category'],
      rows: [
        ['500', 'Prepare to Make Final Mean Final', 'Final', 'Security'],
        ['516', 'Ahead-of-Time Object Caching', 'Final', 'Performance'],
        ['517', 'HTTP/3 Support', 'Final', 'Networking'],
        ['522', 'G1 GC: Reduce Synchronization', 'Final', 'Performance'],
        ['525', 'Structured Concurrency (Sixth Preview)', 'Preview', 'Concurrency'],
        ['526', 'Lazy Constants (Second Preview)', 'Preview', 'Libraries'],
        ['524', 'PEM Encodings (Second Preview)', 'Preview', 'Security'],
        ['529', 'Vector API (Eleventh Incubator)', 'Incubator', 'Performance'],
        ['530', 'Primitive Types in Patterns (Fourth Preview)', 'Preview', 'Language'],
        ['517', 'HTTP/3 Support', 'Final', 'Networking']
      ]
    },

    // ============================================================
    // CONCLUSION
    // ============================================================
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Java 26 is a feature-rich release that builds on the foundation laid by Java 21. Key themes include:\n\n1. **Pattern matching reaches primitives**: `int`, `long`, `double`, and other primitives can now be used directly in patterns, making Java more uniform and expressive.\n\n2. **Modern networking**: HTTP/3 support brings the performance benefits of QUIC to Java applications.\n\n3. **Enhanced cryptography**: PEM encoding simplifies working with cryptographic objects in text format.\n\n4. **Performance improvements**: G1 GC throughput improvements, smaller default heap, and lazy constants make applications faster and more efficient.\n\n5. **Security and integrity**: "Prepare to Make Final Mean Final" is a critical step toward stronger immutability guarantees in Java.\n\n6. **Concurrency evolution**: Structured Concurrency continues to evolve toward finalization.\n\n**When to adopt**: Java 26 is production-ready for teams with frequent release cycles. For enterprises requiring long-term stability, stick with Java 21 or 25 LTS, but use Java 26 to test and prepare for the next LTS release.\n\n**Key takeaway**: Java 26 demonstrates the platform\'s continued evolution toward performance, security, and developer productivity.'
    }
  ],
  explanation: 'A comprehensive, production-grade masterclass on Java 26, covering all 10 JEPs including Primitive Types in Patterns (fourth preview), HTTP/3 support, PEM Encoding, Lazy Constants, Structured Concurrency (sixth preview), G1 GC throughput improvements, and the Prepare to Make Final Mean Final initiative. Includes practical code examples and production considerations.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;