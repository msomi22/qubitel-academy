import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-memory-model-garbage-collection-zero-to-hero',
  topicId: 'java-core',
  title: 'Java Memory Model & Garbage Collection: From Zero to Hero',
  difficulty: 'Easy',
  prompt: 'A rigorous, production-grade masterclass on JVM memory management, dissecting stack vs. heap allocation, object memory layout, reference strength semantics, generational garbage collection theory, G1 and ZGC internals, escape analysis, memory leak patterns, GC tuning, and production diagnostics.',
  tags: ['java', 'memory-model', 'garbage-collection', 'jvm', 'g1', 'zgc', 'references', 'architecture'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'amber'
  },
  body: [
    {
      type: 'section',
      title: 'Architectural Introduction: Memory Is Not Free, Even When It Feels Automatic',
      content: 'Java\'s automatic memory management liberates developers from manual allocation and deallocation bookkeeping, but it does not eliminate memory as an architectural concern — it relocates it. An engineer who treats the heap as an infinite, cost-free resource will eventually ship an application that stalls under load with multi-second stop-the-world pauses, leaks memory through forgotten collection references, or crashes with a cryptic OutOfMemoryError. Understanding stack versus heap allocation, reference strength, and collector mechanics is what separates code that merely runs from code that scales.'
    },
    {
      type: 'section',
      title: '1. Stack vs. Heap: Architecture & Allocation Overhead',
      content: 'Every thread owns a private Stack composed of stacked Frames, one per active method invocation. Each frame holds local variables, method parameters, and partial results — primitives stored directly, object references stored as pointers. The Heap, by contrast, is a single memory region shared across all threads, where every object instance (and its instance fields) actually lives. Stack allocation is essentially free — a pointer bump on method entry, a pointer decrement on return — while heap allocation requires the allocator to find space, zero it, and later have the garbage collector prove it is unreachable before reclaiming it. This asymmetry is why excessive short-lived object churn is one of the most common non-obvious throughput killers in enterprise Java.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Stack: primitives and references live in each thread\'s own frame\npublic int computeTotal(int quantity, double price) {\n    int stackInt = quantity;                       // Lives directly on the stack\n    double stackDouble = price;                    // Lives directly on the stack\n    Order heapOrder = new Order(quantity, price);  // Reference on stack, object on heap\n    return heapOrder.getTotal();\n}\n\n// Uncontrolled stack growth manifests as a StackOverflowError, not an OutOfMemoryError\npublic int recurseForever(int n) {\n    return recurseForever(n + 1); // Never returns — each call pushes a new frame\n}'
    },
    {
      type: 'section',
      title: '2. Anatomy of an Object: Headers, Alignment & Compressed Oops',
      content: 'Every object on the heap carries hidden bookkeeping in addition to its declared fields. The object header contains a Mark Word (used for the identity hash code, GC age, and lock/biasing state) and a Klass Pointer identifying the object\'s class metadata. On 64-bit JVMs, Compressed Oops (Ordinary Object Pointers) shrink object references from 8 bytes to 4 bytes for heaps under roughly 32GB by encoding pointers as offsets rather than raw addresses, meaningfully reducing memory footprint and improving CPU cache utilization for reference-heavy object graphs. Field layout is also subject to padding — the JVM reorders and pads fields to satisfy alignment requirements, so a class with many small primitive fields can consume more memory than its fields\' raw sizes suggest.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Field Ordering Matters at Scale',
      content: 'For classes instantiated millions of times (cache entries, event records, DTOs), reordering fields from largest to smallest — long/double, then int/float, then short/char, then boolean/byte — minimizes the padding waste introduced by alignment requirements, shrinking the per-instance memory footprint across an entire object population.'
    },
    {
      type: 'section',
      title: '3. The Generational Heap: Eden, Survivor Spaces, Old Gen & Metaspace',
      content: 'The heap is not one uniform pool of memory; it is divided by generation based on the empirical observation that most objects die young. The Young Generation holds new allocations in an Eden space, with two Survivor spaces (S0/S1) used to age objects that survive an initial collection. Objects that survive enough Minor GC cycles are promoted into the Old Generation (Tenured space), which is collected far less frequently but far more expensively. Class metadata itself (not instance data) lives in Metaspace, a native-memory region that replaced the fixed-size PermGen starting in Java 8, growing dynamically instead of throwing PermGen space errors.'
    },
    {
      type: 'table',
      columns: ['Heap Region', 'Purpose', 'Collected By'],
      rows: [
        ['Eden', 'Initial allocation target for nearly all new objects.', 'Minor GC'],
        ['Survivor (S0 / S1)', 'Holds objects that survived at least one Minor GC, aging them before promotion.', 'Minor GC (copying)'],
        ['Old Generation (Tenured)', 'Long-lived objects promoted after surviving enough Minor GC cycles.', 'Major / Full GC'],
        ['Metaspace', 'Class metadata (not instances) — native memory, grows dynamically.', 'Class unloading during a Full GC']
      ]
    },
    {
      type: 'section',
      title: '4. GC Roots & the Mark-Sweep-Compact Algorithm',
      content: 'Garbage collection is fundamentally a reachability analysis, not a reference-counting scheme. The collector starts from a fixed set of GC Roots and traces every object reachable from them during the Mark phase. Anything left unmarked is garbage by definition, regardless of how many objects still reference each other in an unreachable island. The Sweep phase reclaims unmarked memory, and the Compact phase (used by most modern collectors) slides surviving objects together to eliminate fragmentation and keep future allocation as a simple pointer bump.'
    },
    {
      type: 'checklist',
      title: 'What Counts as a GC Root',
      items: [
        'Local variables and method parameters currently on any live thread\'s stack.',
        'Static fields on currently loaded classes — a classic source of unintentional retention.',
        'JNI references held by native code.',
        'Objects referenced by currently-executing synchronized blocks or monitors.'
      ]
    },
    {
      type: 'section',
      title: '5. Reference Types: Strong, Soft, Weak & Phantom',
      content: 'Ordinary object references (Strong references) prevent the collector from ever reclaiming the target while the reference itself is reachable. The java.lang.ref package exposes three weaker reference strengths that give the collector explicit permission to reclaim an object under specific conditions, enabling memory-sensitive caches and cleanup hooks without manual bookkeeping.'
    },
    {
      type: 'checklist',
      title: 'The Four Reference Strengths',
      items: [
        'Strong: the default reference type. The object is never collected while reachable through it.',
        'Soft (SoftReference): cleared only when the JVM is under memory pressure and about to throw OutOfMemoryError — ideal for memory-sensitive caches that should shrink before crashing the application.',
        'Weak (WeakReference): cleared at the very next garbage collection cycle regardless of memory pressure — the backbone of WeakHashMap and canonicalizing maps that must never prevent key eviction.',
        'Phantom (PhantomReference): get() always returns null; its sole purpose is to be enqueued onto a ReferenceQueue after the referent has already been finalized and its memory reclaimed, enabling deterministic post-mortem cleanup.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: '// SoftReference-backed cache: entries survive until memory pressure forces eviction\nMap<String, SoftReference<byte[]>> imageCache = new ConcurrentHashMap<>();\nimageCache.put(key, new SoftReference<>(loadImageBytes(key)));\n\nbyte[] cached = Optional.ofNullable(imageCache.get(key))\n    .map(SoftReference::get)\n    .orElseGet(() -> loadImageBytes(key));\n\n// PhantomReference + ReferenceQueue: reliable post-GC cleanup, replacing finalize()\nReferenceQueue<Connection> queue = new ReferenceQueue<>();\nPhantomReference<Connection> ref = new PhantomReference<>(connection, queue);\n// A dedicated cleanup thread polls queue.remove() to release native resources\n// once the JVM confirms the connection object itself is unreachable.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'finalize() Is Deprecated for Removal',
      content: 'Object.finalize() is unpredictable — no timing guarantee, can resurrect objects, can silently swallow exceptions — and is deprecated for removal. Prefer try-with-resources and AutoCloseable for deterministic cleanup, or the Cleaner API (itself backed by PhantomReference) as a safety net for native-resource cleanup.'
    },
    {
      type: 'section',
      title: '6. Minor vs. Major GC and the Generational Hypothesis',
      content: 'The weak generational hypothesis observes that most objects die young and few old objects reference young ones. Minor GC collects only the Young Generation and runs frequently but briefly, since Eden and Survivor spaces are small and mostly garbage. Major GC (often used loosely to mean a Full GC) collects the Old Generation and is dramatically more expensive because it must scan a much larger live-object graph. To avoid re-scanning the entire heap on every Minor GC, collectors maintain a Remembered Set via Card Marking — a coarse-grained table tracking which old-generation memory cards might contain references into the young generation, so a Minor GC only needs to check those flagged cards rather than the whole Old Generation.'
    },
    {
      type: 'section',
      title: '7. G1: Region-Based Garbage Collection',
      content: 'The Garbage-First (G1) collector, the default since Java 9, abandons strictly contiguous Young/Old spaces in favor of dividing the heap into many equally-sized regions (typically 1-32MB), each dynamically labeled Eden, Survivor, or Old as needed. G1 prioritizes collecting the regions containing the most garbage first (hence "Garbage-First"), and targets a configurable pause-time goal rather than a fixed generation size, using concurrent marking to identify mostly-garbage regions before a mixed collection reclaims both young and select old regions within the same pause.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Common G1 tuning flags — start with the pause-time goal, resist over-tuning further\njava -XX:+UseG1GC \\\n     -XX:MaxGCPauseMillis=200 \\\n     -Xms4g -Xmx4g \\\n     -jar enterprise-service.jar'
    },
    {
      type: 'section',
      title: '8. ZGC & Low-Latency Collectors',
      content: 'ZGC targets sub-millisecond pause times regardless of heap size — from a few gigabytes to multiple terabytes — by performing almost all work (marking, relocating, and reference updates) concurrently with running application threads. It achieves this using colored pointers (metadata bits embedded directly in each reference) and load barriers that transparently redirect a thread to the relocated copy of an object it is reading, entirely avoiding the long stop-the-world compaction pauses that even G1 still requires for its old generation. Generational ZGC (the default since Java 21) adds a young generation to this design, further reducing overhead by collecting short-lived objects separately from long-lived ones, while keeping ZGC\'s near-zero pause guarantee.'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'G1 GC',
          content: 'Region-based, mostly concurrent, but still requires stop-the-world phases for evacuation; pause times scale somewhat with live-set size; mature and broadly battle-tested as the default.'
        },
        {
          label: 'ZGC',
          content: 'Colored pointers and load barriers keep marking and relocation concurrent; pause times stay sub-millisecond even on multi-terabyte heaps; ideal for latency-sensitive services where p99 pause time matters more than raw throughput.'
        }
      ]
    },
    {
      type: 'section',
      title: '9. Escape Analysis & Scalar Replacement',
      content: 'Not every `new` keyword in source code results in an actual heap allocation at runtime. The JIT compiler performs Escape Analysis to determine whether an object\'s reference ever "escapes" the method or thread that created it — is it returned, stored in a field, or passed to an unanalyzable call? If an object provably does not escape, the JIT may apply Scalar Replacement, decomposing the object into its individual primitive fields and allocating those directly on the stack (or even in CPU registers) instead of the heap, eliminating both the allocation cost and any future GC pressure for that object entirely.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// A classic escape-analysis candidate: temp never escapes sum()\nprivate static int sum(int a, int b, int c) {\n    Point temp = new Point(a, b); // May never actually touch the heap\n    return temp.x + temp.y + c;\n}'
    },
    {
      type: 'section',
      title: '10. Common Memory Leak Patterns in Managed Memory',
      content: 'A "memory leak" in a garbage-collected language is not a bug in the collector — it is an unintentional strong reference chain from a GC root that keeps objects alive long after they are logically dead. Because the collector faithfully honors every reachable reference, these leaks are entirely a design and lifecycle-management problem, not a runtime defect.'
    },
    {
      type: 'checklist',
      title: 'Common Leak Patterns to Watch For',
      items: [
        'Unbounded static caches: a static Map that only grows and never evicts entries effectively becomes a permanent GC root chain for every value ever inserted.',
        'Unclosed resources: streams, connections, or other AutoCloseable resources left open outside try-with-resources retain native and heap memory indefinitely.',
        'Forgotten listener/callback registrations: a long-lived publisher holding references to short-lived listener objects that were never explicitly unregistered.',
        'ThreadLocal entries never removed in pooled-thread environments: since pool threads live indefinitely, a ThreadLocal value that is set but never remove()d outlives the logical task that created it.',
        'Non-static inner classes: implicitly hold a reference to their enclosing instance, so a long-lived inner-class object silently keeps its entire outer object graph alive.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: '// Leak: this cache only ever grows — nothing ever evicts an entry\nprivate static final Map<String, Session> SESSION_CACHE = new HashMap<>();\n\npublic void register(String id, Session session) {\n    SESSION_CACHE.put(id, session); // Never removed — unbounded growth over the JVM lifetime\n}\n\n// Fix: bound the cache size so old entries are evicted automatically\nprivate static final Map<String, Session> BOUNDED_CACHE =\n    Collections.synchronizedMap(new LinkedHashMap<>(16, 0.75f, true) {\n        protected boolean removeEldestEntry(Map.Entry<String, Session> eldest) {\n            return size() > 10_000; // Evict the least-recently-used entry past this bound\n        }\n    });'
    },
    {
      type: 'section',
      title: '11. GC Tuning Basics: Flags, Logging & Monitoring',
      content: 'Effective GC tuning starts with measurement, not flags. Before adjusting a single JVM parameter, enable GC logging and observe actual pause frequency, pause duration, and promotion rate under realistic load; guessing at tuning flags without data routinely makes performance worse. Once a genuine problem is identified — excessive pause time, premature promotion, or thrashing between generations — target it with the smallest, most specific flag change rather than broadly increasing heap size or switching collectors as a first resort.'
    },
    {
      type: 'table',
      columns: ['Flag', 'Purpose'],
      rows: [
        ['-Xms / -Xmx', 'Set the initial and maximum heap size; setting them equal avoids resize pauses.'],
        ['-XX:+UseG1GC / -XX:+UseZGC', 'Select the garbage collector implementation.'],
        ['-XX:MaxGCPauseMillis=N', 'Set a soft pause-time goal for G1 (a target, not a hard guarantee).'],
        ['-Xlog:gc*:file=gc.log:time,uptime', 'Enable detailed unified GC logging for offline analysis.']
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Resist Premature Tuning',
      content: 'The single most common GC tuning mistake is changing collector flags before establishing a baseline from GC logs or a profiler. Most "GC problems" are actually allocation-rate or object-lifetime problems in application code that no flag can fix.'
    },
    {
      type: 'section',
      title: '12. OutOfMemoryError Varieties & What Each One Means',
      content: 'Not every OutOfMemoryError means "the heap is full" — the message following the colon identifies which memory region or condition actually failed, and misdiagnosing it wastes significant troubleshooting time chasing the wrong fix.'
    },
    {
      type: 'table',
      columns: ['OutOfMemoryError Message', 'Actual Cause'],
      rows: [
        ['Java heap space', 'The heap itself is exhausted and cannot be expanded further — a classic leak or an undersized heap.'],
        ['GC overhead limit exceeded', 'The collector is running almost continuously while reclaiming very little memory each cycle — the heap is nearly full and thrashing.'],
        ['Metaspace', 'Class metadata has exhausted its native memory region — frequently caused by classloader leaks in redeployed applications.'],
        ['Unable to create new native thread', 'The OS has refused to allocate another native thread — usually an unbounded thread-pool or thread-creation leak, not a heap problem at all.'],
        ['Direct buffer memory', 'Off-heap NIO direct buffers (allocated via ByteBuffer.allocateDirect) have exceeded -XX:MaxDirectMemorySize.']
      ]
    },
    {
      type: 'section',
      title: '13. Diagnosing Memory Issues with Heap Dumps & JFR',
      content: 'When logs and metrics point to a memory problem but not its root cause, a heap dump — a full snapshot of every live object on the heap at a point in time — is the definitive diagnostic artifact. Tools like Eclipse Memory Analyzer (MAT) can open a heap dump and compute the "dominator tree," ranking objects by how much retained memory each one alone is responsible for keeping alive, quickly surfacing the actual leak source rather than a list of every large object. Java Flight Recorder (JFR) complements this with low-overhead, continuous production profiling — capturing allocation profiles, GC pause events, and object-age histograms — safe enough to run always-on rather than only after a problem has already occurred.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Trigger a heap dump on demand for offline analysis\njmap -dump:live,format=b,file=heap.hprof <pid>\n\n// Automatically capture a heap dump the moment an OutOfMemoryError is thrown\njava -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/var/dumps -jar service.jar\n\n// Start a continuous, low-overhead JFR recording for production diagnostics\njava -XX:StartFlightRecording=filename=recording.jfr,duration=60s -jar service.jar'
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Enterprise-grade memory management means treating the heap as a finite, tiered resource: understand stack vs. heap allocation cost, respect the generational hypothesis when reasoning about GC behavior, choose reference strength deliberately for caches and cleanup hooks, pick G1 or ZGC based on your actual latency requirements rather than habit, and diagnose real problems with GC logs, heap dumps, and JFR before ever reaching for a tuning flag.'
    }
  ],
  explanation: 'An enterprise-grade masterclass covering stack vs. heap allocation, object memory layout and compressed oops, the generational heap and Metaspace, GC roots and mark-sweep-compact mechanics, the four reference strengths, minor vs. major GC theory, G1 and ZGC internals, escape analysis and scalar replacement, common memory leak patterns, GC tuning fundamentals, OutOfMemoryError diagnosis, and production diagnostics via heap dumps and JFR.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;