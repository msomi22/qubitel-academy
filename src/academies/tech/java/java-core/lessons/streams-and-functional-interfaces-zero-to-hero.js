import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-streams-functional-interfaces-zero-to-hero',
  topicId: 'java-core',
  title: 'Java Streams & Functional Interfaces: From Zero to Hero',
  difficulty: 'Easy',
  prompt: 'A rigorous, production-grade masterclass on Java functional programming, dissecting lambda expressions, method references, core functional interfaces, primitive specializations, stream pipeline architecture, lazy evaluation, short-circuiting, flatMap flattening, custom collectors, Optional, and parallel streams internals and pitfalls.',
  tags: ['java', 'streams', 'functional-programming', 'lambdas', 'architecture', 'method-references', 'optional', 'parallel-streams', 'collectors'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'blue'
  },
  body: [
    {
      type: 'section',
      title: 'Architectural Introduction: Imperative vs. Declarative Data Processing',
      content: 'For decades, enterprise Java relied on imperative programming—writing explicit loops, managing iterator states, and mutating local variables to filter and transform collections. While imperative code dictates *how* things happen step-by-step, modern Java embraces declarative programming via Lambdas and Streams, allowing developers to specify *what* transformation should occur. This shifts cognitive load away from boilerplate loop boilerplate toward clean, composable data pipelines.'
    },
    {
      type: 'section',
      title: '1. Lambda Expressions & Functional Interfaces',
      content: 'A functional interface is an interface containing exactly one abstract method (SAM type), optionally annotated with `@FunctionalInterface`. Lambda expressions provide a compact, concise syntax for implementing these interfaces inline without creating verbose anonymous inner classes. Under the hood, the JVM uses `invokedynamic` bytecode instructions to defer class loading and optimize runtime lambda instantiation.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Pre-Java 8 Anonymous Inner Class\nRunnable legacyRunner = new Runnable() {\n    @Override\n    public void run() {\n        System.out.println("Executing legacy runnable");\n    }\n};\n\n// Modern Lambda Expression\nRunnable modernRunner = () -> System.out.println("Executing modern lambda");'
    },
    {
      type: 'section',
      title: '2. Method References — The Four Kinds',
      content: 'A method reference (`::`) is a further shorthand for a lambda that does nothing but delegate to an already-existing method. There are four distinct forms, and recognizing which one applies determines how the reference resolves its receiver and arguments at call time.'
    },
    {
      type: 'checklist',
      title: 'The Four Method Reference Forms',
      items: [
        'Static: ClassName::staticMethodName — e.g. Integer::parseInt, calls a static method directly.',
        'Bound (a particular object): instance::instanceMethodName — e.g. myLogger::info, the receiver is captured at the moment the reference is created.',
        'Unbound (an arbitrary object of a type): ClassName::instanceMethodName — e.g. String::toUpperCase, the first parameter supplied to the functional interface becomes the implicit receiver.',
        'Constructor: ClassName::new — e.g. ArrayList::new, matches a functional interface whose method signature invokes a constructor.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: '// Static method reference\nFunction<String, Integer> parser = Integer::parseInt;\n\n// Bound instance method reference — receiver captured right now\nString prefix = "ORDER-";\nPredicate<String> startsWithPrefix = prefix::startsWith;\n\n// Unbound instance method reference — receiver supplied per invocation\nFunction<String, String> upper = String::toUpperCase;\n\n// Constructor reference\nSupplier<ArrayList<String>> listFactory = ArrayList::new;'
    },
    {
      type: 'section',
      title: '3. The Core Functional Interface Categories',
      content: 'The `java.util.function` package provides standard functional interfaces categorized by their input and output behaviors. Mastering these contracts is essential for building custom higher-order methods and fluent API abstractions.'
    },
    {
      type: 'checklist',
      title: 'Primary Functional Interface Contracts',
      items: [
        'Predicate<T>: Takes one argument of type T and returns a boolean (boolean test(T t)). Used for filtering and evaluation.',
        'Function<T, R>: Takes an argument of type T and produces a result of type R (R apply(T t)). Used for transformation mapping.',
        'Consumer<T>: Takes an argument of type T and returns no result (void accept(T t)). Used for side-effects and consumption.',
        'Supplier<T>: Takes no arguments and returns a result of type T (T get()). Used for lazy generation and factories.',
        'BinaryOperator<T>: Takes two arguments of the same type and returns a result of that same type. Used for reductions and aggregation.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: '// Composing predicates for robust filtering logic\nPredicate<String> isNotNull = Objects::nonNull;\nPredicate<String> isNotEmpty = s -> !s.trim().isEmpty();\nPredicate<String> isValidUser = isNotNull.and(isNotEmpty);\n\nboolean valid = isValidUser.test("Enterprise Architect");'
    },
    {
      type: 'section',
      title: '4. Primitive Specializations: Avoiding Autoboxing Overhead',
      content: 'Generic functional interfaces and streams operate on reference types, meaning every `int` or `double` passing through a `Predicate<Integer>` or `Stream<Integer>` must be boxed into a wrapper object first — an allocation cost that adds up in hot loops. To avoid this, `java.util.function` provides primitive-specialized interfaces (`IntPredicate`, `ToIntFunction<T>`, `IntUnaryOperator`) and `java.util.stream` provides primitive stream types (`IntStream`, `LongStream`, `DoubleStream`) with specialized terminal operations such as `sum()`, `average()`, and `summaryStatistics()` that never box at all.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Boxing overhead with a generic Stream<Integer>\nint total = orders.stream()\n    .map(Order::getQuantity)   // Stream<Integer> — every quantity gets boxed\n    .reduce(0, Integer::sum);\n\n// Primitive IntStream avoids boxing entirely\nint totalPrimitive = orders.stream()\n    .mapToInt(Order::getQuantity) // IntStream — no boxing\n    .sum();\n\nIntSummaryStatistics stats = orders.stream()\n    .mapToInt(Order::getQuantity)\n    .summaryStatistics();\nSystem.out.println(stats.getAverage() + " / " + stats.getMax());'
    },
    {
      type: 'section',
      title: '5. Stream Pipeline Architecture: Source, Intermediates, & Terminal',
      content: 'A Stream is not a data structure; it is a declarative pipeline carrying data from a source through a sequence of operations. Every Stream pipeline consists of three distinct phases: a Source (such as a Collection, array, or I/O channel), zero or more Intermediate operations that transform or filter the stream while returning another stream, and a Terminal operation that triggers execution and produces a result or side-effect.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'List<String> seniorArchitects = engineers.stream() // Source\n    .filter(e -> e.getExperienceYears() >= 5)        // Intermediate\n    .map(Engineer::getName)                          // Intermediate\n    .sorted()                                        // Intermediate\n    .collect(Collectors.toList());                   // Terminal (triggers execution)'
    },
    {
      type: 'section',
      title: '6. flatMap & Stream Flattening',
      content: 'The `map()` operation is strictly one-to-one, but real domain models are frequently nested — a list of orders, each containing its own list of line items. Mapping each order to its line-item stream naively produces an unwieldy `Stream<Stream<LineItem>>`. `flatMap()` solves this by mapping every element to its own inner stream and then flattening all of those inner streams into a single, flat output stream.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Flattening a nested order -> line-items structure into one flat stream\nList<LineItem> allLineItems = orders.stream()\n    .flatMap(order -> order.getLineItems().stream())\n    .collect(Collectors.toList());'
    },
    {
      type: 'section',
      title: '7. Lazy Evaluation & Short-Circuiting',
      content: 'Intermediate operations are strictly lazy—they do not process any data when declared. Instead, the Stream builds an internal operation graph, delaying execution until the terminal operation invokes an iterator. Furthermore, operations like `findFirst()`, `anyMatch()`, or `limit()` support short-circuiting, meaning they terminate processing early as soon as a condition is met without iterating over the remaining elements.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Stateful vs. Stateless Operations',
      content: 'Stateless operations (like map and filter) process each element independently without retaining state from previous elements. Stateful operations (like sorted, distinct, or dropWhile) must buffer or process the entire stream before emitting output, which can heavily impact memory performance on large infinite streams.'
    },
    {
      type: 'section',
      title: '8. Reduction, Collect, and Custom Collectors',
      content: 'Terminal operations frequently aggregate stream contents. While `reduce()` is ideal for mathematical accumulations, `collect()` utilizes a mutable reduction container via the `Collector` interface. For advanced enterprise reporting, you can build custom collectors or leverage built-in groupings like `Collectors.groupingBy()` and `Collectors.partitioningBy()`.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Grouping microservice telemetry logs by status code\nMap<Integer, List<LogEntry>> logsByStatus = telemetryStream\n    .collect(Collectors.groupingBy(LogEntry::getStatusCode));'
    },
    {
      type: 'section',
      title: '9. Building Custom Collectors with Collector.of()',
      content: 'When the built-in `Collectors` factories cannot express a required aggregation, the `Collector` interface can be implemented directly via `Collector.of()`. It accepts a supplier that creates a fresh mutable container, an accumulator that folds one element into that container, a combiner that merges two partial containers (required for parallel execution), and an optional finisher that converts the container into the final result type.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'Collector<LogEntry, StringJoiner, String> csvCollector = Collector.of(\n    () -> new StringJoiner(","),                 // Supplier: fresh container\n    (joiner, entry) -> joiner.add(entry.getId()), // Accumulator: fold one element\n    StringJoiner::merge,                          // Combiner: merge parallel partial results\n    StringJoiner::toString                        // Finisher: produce the final result\n);\n\nString csv = telemetryStream.collect(csvCollector);'
    },
    {
      type: 'section',
      title: '10. Infinite Streams: generate(), iterate(), and peek() for Debugging',
      content: '`Stream.generate(Supplier)` and `Stream.iterate(seed, UnaryOperator)` produce infinite streams driven by a generator function rather than a bounded source, and must always be paired with a short-circuiting operation such as `limit()` to avoid running forever. `peek()` is a stateless intermediate operation meant purely for debugging or inspection side effects mid-pipeline; it should never be relied upon to drive actual business logic, since some pipeline optimizations can skip calling it altogether.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Infinite stream of powers of two, bounded by limit()\nList<Integer> powersOfTwo = Stream.iterate(1, n -> n * 2)\n    .limit(10)\n    .collect(Collectors.toList());\n\n// peek() for debugging a pipeline — never for side effects that matter\nList<String> validated = names.stream()\n    .peek(name -> logger.debug("Validating: {}", name))\n    .filter(this::isValidName)\n    .collect(Collectors.toList());'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The Infinite Stream Trap',
      content: 'Forgetting to chain limit() (or another short-circuiting operation) onto a Stream.generate() or Stream.iterate() pipeline will hang the executing thread indefinitely, since there is no natural end to the source.'
    },
    {
      type: 'section',
      title: '11. Common Stream Anti-Patterns and Pitfalls',
      content: 'Misusing streams can introduce subtle bugs, performance regressions, and maintenance nightmares. Understanding common traps prevents production failures.'
    },
    {
      type: 'checklist',
      title: 'Stream Anti-Patterns to Avoid',
      items: [
        'Side-Effect Mutation: Modifying external mutable variables or collections inside a stream intermediate operation breaks thread-safety and parallel guarantees.',
        'Reusing Streams: Streams cannot be reused after a terminal operation has been executed; attempting to do so throws an IllegalStateException.',
        'Overusing Streams for Simple Loops: Forcing basic index-based side effects into streams instead of standard loops reduces code readability.',
        'Unbounded Parallel Streams: Using parallel streams on small datasets or I/O-bound tasks introduces thread-pool contention on the common ForkJoinPool.'
      ]
    },
    {
      type: 'section',
      title: '12. Optional<T>: Explicit Absence Without Null',
      content: '`Optional<T>` is a container object that may or may not hold a non-null value, designed primarily as a method return type that forces callers to explicitly confront the possibility of absence rather than risk an unchecked NullPointerException. It composes naturally with streams via map/filter/flatMap chains, but is easy to misuse outside of that narrow purpose.'
    },
    {
      type: 'checklist',
      title: 'Optional Usage Guidelines',
      items: [
        'Prefer orElseGet(Supplier) over orElse(value) when computing the default is expensive, since orElse always evaluates its argument eagerly even when the Optional is present.',
        'Never call get() without first checking isPresent(); prefer orElseThrow() for the same intent with clearer, self-documenting failure behavior.',
        'Do not use Optional as a class field, constructor parameter, or method argument — it is not Serializable and adds needless indirection to ordinary object graphs.',
        'Avoid Optional<Collection<T>>; return an empty collection instead of Optional.empty() so callers can iterate without an extra presence check.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: 'Optional<Engineer> seniorLead = engineers.stream()\n    .filter(e -> e.getExperienceYears() >= 10)\n    .findFirst();\n\nString leadName = seniorLead\n    .map(Engineer::getName)\n    .orElseGet(() -> "No senior lead assigned");'
    },
    {
      type: 'section',
      title: '13. Parallel Streams Internals: Spliterator & the Common ForkJoinPool',
      content: 'Calling `parallelStream()` (or `.parallel()`) splits the source using a `Spliterator` into balanced chunks and dispatches them onto the JVM-wide common `ForkJoinPool`, which by default sizes itself to `Runtime.availableProcessors() - 1`. Because that pool is shared across the entire application, one poorly-behaved parallel stream — especially one performing blocking I/O — can starve unrelated parallel work everywhere else in the same JVM. Parallel streams pay off only for large, in-memory datasets backed by an efficiently-splittable source (arrays, ArrayList) undergoing computationally expensive, stateless, non-blocking work; sources like LinkedList or I/O channels split poorly and rarely benefit.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Good candidate: large in-memory dataset, CPU-bound, stateless operation\ndouble totalRevenue = largeOrderList.parallelStream()\n    .mapToDouble(Order::getTotal)\n    .sum();\n\n// Anti-pattern: blocking network I/O inside a parallel stream starves the shared common pool\nuserIds.parallelStream()\n    .map(this::fetchUserProfileOverNetwork) // Blocks a shared ForkJoinPool worker thread\n    .forEach(this::cache);'
    },
    {
      type: 'table',
      columns: ['Operation Type', 'Execution Model', 'Examples'],
      rows: [
        ['Intermediate (Stateless)', 'Lazy; processes elements independently', 'filter, map, flatMap, peek'],
        ['Intermediate (Stateful)', 'Lazy; requires buffering or whole-stream visibility', 'sorted, distinct, limit, skip'],
        ['Terminal (Reduction)', 'Eager; triggers pipeline execution and aggregates data', 'collect, reduce, count, min, max'],
        ['Terminal (Matching/Finding)', 'Eager with short-circuiting; halts processing early', 'anyMatch, allMatch, findFirst, findAny'],
        ['Primitive Streams', 'Eager avoidance of boxing via specialized numeric pipelines', 'IntStream, LongStream, DoubleStream, mapToInt/mapToLong/mapToDouble'],
        ['Custom Collector', 'Eager; user-defined supplier/accumulator/combiner/finisher', 'Collector.of(supplier, accumulator, combiner, finisher)']
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Java Streams provide a declarative, expressive paradigm for data transformation. Design pipelines with pure, stateless functions, reach for method references and primitive specializations to cut boilerplate and boxing overhead, flatten nested structures with flatMap, leverage lazy evaluation and short-circuiting for efficiency, build custom collectors for advanced aggregation, use Optional only at API boundaries to make absence explicit, and reserve parallel streams strictly for large, CPU-intensive, non-blocking data sets.'
    }
  ],
  explanation: 'An enterprise-grade masterclass covering lambda expressions, the four forms of method references, core functional interface categories, primitive specializations that avoid autoboxing, stream pipeline architecture, flatMap flattening, lazy evaluation mechanics, short-circuiting operators, grouping and custom collectors, infinite streams, Optional usage discipline, parallel stream internals, and avoiding stateful stream anti-patterns.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;