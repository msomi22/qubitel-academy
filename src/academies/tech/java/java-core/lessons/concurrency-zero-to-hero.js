import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-concurrency-zero-to-hero',
  topicId: 'java-core',
  title: 'Java Concurrency & Multithreading: From Zero to Hero',
  difficulty: 'Easy',
  prompt: 'A rigorous, production-grade masterclass on Java concurrency, dissecting OS thread mechanics, JVM monitor internals, happens-before consistency models, lock-free synchronization, virtual thread scalability, structured concurrency, concurrent collections, and reactive asynchronous pipelines.',
  tags: ['java', 'concurrency', 'multithreading', 'virtual-threads', 'memory-model', 'architecture', 'structured-concurrency', 'concurrent-collections'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'green'
  },
  body: [
    {
      type: 'section',
      title: 'Architectural Introduction: Concurrency vs. Parallelism',
      content: 'At enterprise scale, concurrency is about structural separation of concerns (managing multiple independent tasks interleaving over execution slices), while parallelism is about execution throughput (multiplexing instructions across hardware CPU cores). As architects, our primary challenge is safely orchestrating shared mutable state without succumbing to contention bottlenecks, memory visibility bugs, or thread starvation.'
    },
    {
      type: 'section',
      title: '1. OS Threads vs. JVM Platform Threads & Scheduling',
      content: 'Every standard Java thread (`java.lang.Thread`) maps directly to a native OS-level thread via the JVM Native Interface (JNI). The operating system kernel schedules these threads onto physical CPU cores via context switching—saving registers, flushing instruction pipelines, and swapping memory mappings. Because OS thread stacks consume substantial memory (typically 1MB per thread) and context switching incurs microsecond-scale overhead, scaling naive 1:1 thread per request architectures to hundreds of thousands of concurrent network connections causes kernel thrashing and memory exhaustion.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Legacy OS Platform Thread creation\nThread platformThread = new Thread(() -> {\n    System.out.println("Executing on OS thread: " + Thread.currentThread());\n});\nplatformThread.start();'
    },
    {
      type: 'section',
      title: '2. The Thread Lifecycle: States & Transitions',
      content: 'Every `Thread` object moves through a well-defined state machine exposed via `Thread.State`. Understanding these transitions is essential for diagnosing thread dumps, detecting deadlocks, and reasoning about scheduler behavior. A thread is NEW after construction but before `start()`; it becomes RUNNABLE once eligible for CPU time (the OS scheduler decides actual execution); it moves to BLOCKED while waiting to acquire a monitor lock held by another thread; it enters WAITING or TIMED_WAITING when parked via `Object.wait()`, `Thread.join()`, or `LockSupport.park()`; and finally reaches TERMINATED once `run()` completes or an uncaught exception propagates.'
    },
    {
      type: 'checklist',
      title: 'Thread.State Transition Reference',
      items: [
        'NEW: Thread object instantiated but start() has not yet been invoked.',
        'RUNNABLE: Eligible for execution; may be actively running or simply waiting for a CPU time slice from the OS scheduler.',
        'BLOCKED: Waiting to acquire a monitor lock (synchronized block/method) currently held by another thread.',
        'WAITING: Parked indefinitely via wait(), join(), or LockSupport.park() until another thread signals or interrupts it.',
        'TIMED_WAITING: Parked with a bounded timeout via sleep(millis), wait(timeout), or join(timeout).',
        'TERMINATED: run() has completed execution or exited abruptly due to an uncaught exception.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: '// Inspecting live thread state — invaluable when diagnosing production thread dumps\nThread worker = new Thread(() -> {\n    try {\n        Thread.sleep(5000);\n    } catch (InterruptedException e) {\n        Thread.currentThread().interrupt();\n    }\n}, "worker-diagnostic");\n\nSystem.out.println(worker.getState()); // NEW\nworker.start();\nSystem.out.println(worker.getState()); // RUNNABLE\nThread.sleep(100);\nSystem.out.println(worker.getState()); // TIMED_WAITING (inside sleep)'
    },
    {
      type: 'section',
      title: '3. The Thread Pool Architecture & ExecutorService Internals',
      content: 'To prevent thread creation explosion, production systems utilize thread pools via the `ExecutorService` framework. Understanding the internal mechanics of backing queues (`BlockingQueue`) and rejection policies is vital for avoiding OutOfMemoryErrors and request drops.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Configuring a robust production ExecutorService with a bounded queue and rejection policy\nThreadPoolExecutor productionExecutor = new ThreadPoolExecutor(\n    8,                          // Core pool size\n    64,                         // Maximum pool size\n    60L, TimeUnit.SECONDS,      // Keep-alive time for idle extra threads\n    new ArrayBlockingQueue<>(1000), // Bounded work queue to prevent OOM\n    new ThreadPoolExecutor.CallerRunsPolicy() // Backpressure mechanism\n);'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Avoid the Executors Convenience Factories in Production',
      content: 'Static factories like `Executors.newFixedThreadPool()` and `Executors.newCachedThreadPool()` wrap unbounded queues or unbounded thread creation, which can silently exhaust memory under sustained load. Prefer constructing `ThreadPoolExecutor` directly with explicit bounds, or use `Executors.newVirtualThreadPerTaskExecutor()` for I/O-bound workloads.'
    },
    {
      type: 'section',
      title: '4. JVM Monitors, Bytecode Synchronization, & Lock Operations',
      content: 'When multiple threads access shared memory blocks, mutual exclusion must be enforced. In Java, every object possesses an intrinsic lock (or Monitor). At the bytecode level, synchronization is managed via `monitorenter` and `monitorexit` instructions.'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'Intrinsic Locks (synchronized)',
          content: 'Managed entirely by the JVM. Implements biased locking, lightweight locking, and heavy monitor inflation strategies automatically. Syntax-driven.'
        },
        {
          label: 'Explicit Locks (ReentrantLock)',
          content: 'Managed via API calls in java.util.concurrent.locks. Offers advanced architectural features: timed lock acquisition, interruptible locks, and multiple Condition queues.'
        }
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: 'private final ReentrantLock bankLock = new ReentrantLock(true); // Fair lock policy\n\npublic void transferFunds(Account from, Account to, BigDecimal amount) {\n    if (bankLock.tryLock()) {\n        try {\n            from.debit(amount);\n            to.credit(amount);\n        } finally {\n            bankLock.unlock();\n        }\n    } else {\n        handleContentionFallback();\n    }\n}'
    },
    {
      type: 'section',
      title: '5. Deadlock, Livelock & Starvation',
      content: 'Concurrent systems can fail even when every individual lock is used correctly. Deadlock occurs when two or more threads each hold a lock the other needs and neither can proceed—classically arising from inconsistent lock ordering. Livelock occurs when threads actively respond to one another but make no forward progress (e.g., both repeatedly backing off and retrying in lockstep). Starvation occurs when a thread is perpetually denied access to a resource because other threads are favored, often due to unfair scheduling or greedy lock holders.'
    },
    {
      type: 'checklist',
      title: 'Deadlock Prevention Strategies',
      items: [
        'Lock Ordering: Always acquire multiple locks in a single, globally consistent order across the entire codebase.',
        'Lock Timeout: Use tryLock(timeout) instead of a blocking lock() to allow a thread to back off and retry rather than wait forever.',
        'Single Lock Acquisition: Where feasible, redesign critical sections to require only one lock at a time.',
        'Deadlock Detection Tooling: Use jstack or ThreadMXBean.findDeadlockedThreads() to detect deadlocks in production thread dumps.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: '// Classic deadlock: two threads acquire the same two locks in opposite order\n// Thread A: synchronized(lockOne) { synchronized(lockTwo) { ... } }\n// Thread B: synchronized(lockTwo) { synchronized(lockOne) { ... } }\n\n// Fix: enforce a consistent global ordering, e.g. by System.identityHashCode()\nObject first = System.identityHashCode(lockOne) < System.identityHashCode(lockTwo) ? lockOne : lockTwo;\nObject second = (first == lockOne) ? lockTwo : lockOne;\nsynchronized (first) {\n    synchronized (second) {\n        performTransfer();\n    }\n}'
    },
    {
      type: 'section',
      title: '6. Read-Write Locks & Optimistic Locking with StampedLock',
      content: '`ReentrantReadWriteLock` allows multiple concurrent readers or a single exclusive writer, which dramatically improves throughput for read-heavy workloads compared to a plain mutex. `StampedLock` goes further by introducing an optimistic read mode: readers proceed without blocking at all and only validate afterward that no write occurred, falling back to a pessimistic read lock if validation fails. This avoids reader/writer contention entirely in the common uncontended case.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'private final StampedLock stampedLock = new StampedLock();\nprivate double x, y;\n\npublic double distanceFromOrigin() {\n    long stamp = stampedLock.tryOptimisticRead();\n    double currentX = x, currentY = y;\n    if (!stampedLock.validate(stamp)) {\n        // A write occurred during the read; fall back to a pessimistic read lock\n        stamp = stampedLock.readLock();\n        try {\n            currentX = x;\n            currentY = y;\n        } finally {\n            stampedLock.unlockRead(stamp);\n        }\n    }\n    return Math.sqrt(currentX * currentX + currentY * currentY);\n}'
    },
    {
      type: 'section',
      title: '7. The Java Memory Model (JMM) & Happens-Before Mechanics',
      content: 'CPUs utilize L1/L2/L3 caches and store buffers, meaning a write by Thread A is not instantly visible to Thread B. The Java Memory Model defines the "happens-before" consistency relationship to guarantee visibility across threads without forcing synchronization everywhere.'
    },
    {
      type: 'checklist',
      title: 'Core Happens-Before Guarantees',
      items: [
        'Program Order Rule: Each action in a thread happens-before every action in that thread that comes later in the program order.',
        'Monitor Lock Rule: An unlock on a monitor lock happens-before every subsequent lock on that same monitor.',
        'Volatile Variable Rule: A write to a volatile field happens-before every subsequent read of that same field (establishing a memory barrier).',
        'Thread Start & Join Rules: A call to thread.start() and thread.join() guarantees state visibility across thread boundaries.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The Volatile Limitation Trap',
      content: 'Declaring a variable volatile guarantees immediate visibility and suppresses CPU instruction reordering across memory barriers. However, it does NOT provide atomicity for compound actions like count++. For atomic increments, always rely on CAS (Compare-And-Swap) primitives like AtomicInteger or StampedLock.'
    },
    {
      type: 'section',
      title: '8. ThreadLocal & Thread Confinement',
      content: '`ThreadLocal<T>` provides each thread with its own independent copy of a variable, sidestepping synchronization entirely by confining state to a single thread rather than sharing it. This is widely used for per-thread contextual data such as database connections, `SimpleDateFormat` instances, or request-scoped correlation IDs in web frameworks. Because virtual threads are cheap and numerous, `ThreadLocal` usage should be reconsidered on Loom-based architectures—`ScopedValue` (introduced as a modern alternative) offers immutable, structured sharing of context without the memory-leak risks of long-lived `ThreadLocal` entries in pooled threads.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Confining a non-thread-safe SimpleDateFormat instance per thread\nprivate static final ThreadLocal<SimpleDateFormat> dateFormatter =\n    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));\n\npublic String formatDate(Date date) {\n    return dateFormatter.get().format(date);\n}\n\n// Always remove ThreadLocal entries in pooled-thread environments to prevent leaks\npublic void cleanup() {\n    dateFormatter.remove();\n}'
    },
    {
      type: 'section',
      title: '9. Virtual Threads (Project Loom) & High-Throughput I/O',
      content: 'Project Loom revolutionizes Java concurrency by introducing Virtual Threads (user-mode threads). Managed directly by the JVM runtime rather than the OS kernel, millions of virtual threads multiplex onto a small pool of carrier OS platform threads (ForkJoinPool). When a virtual thread hits a blocking I/O operation (e.g., socket read, database query), the JVM unmounts it from the carrier thread, freeing the carrier to execute another virtual thread. This eliminates thread pool starvation for blocking workloads.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Spawning a virtual thread per task executor for high-concurrency I/O microservices\ntry (ExecutorService virtualExecutor = Executors.newVirtualThreadPerTaskExecutor()) {\n    virtualExecutor.submit(() -> {\n        String response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());\n        return response;\n    });\n}'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Pinning: The Virtual Thread Gotcha',
      content: 'A virtual thread cannot unmount from its carrier while executing inside a `synchronized` block or a native method frame—this is known as "pinning." Under sustained pinning with blocking I/O, carrier threads can become exhausted just as with platform threads. Prefer `ReentrantLock` over `synchronized` in hot paths that run on virtual threads and are expected to block.'
    },
    {
      type: 'section',
      title: '10. Structured Concurrency: Treating Related Tasks as a Unit',
      content: 'Structured concurrency (delivered as a preview feature in recent JDK releases) addresses a subtle but common bug class: when a parent task spawns several child subtasks, an error or cancellation in one subtask should not leave the others running as orphaned, unaccounted-for threads. `StructuredTaskScope` ties the lifetime of child virtual threads to a well-defined block scope, ensuring that if one subtask fails, the others are automatically cancelled, and the scope will not exit until every child has either completed or been cancelled.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Fan out two independent I/O calls; cancel both if either fails\ntry (var scope = new StructuredTaskScope.ShutdownOnFailure()) {\n    Supplier<Inventory> inventoryTask = scope.fork(() -> fetchInventoryData());\n    Supplier<Pricing> pricingTask = scope.fork(() -> fetchPricingData());\n\n    scope.join();           // Wait for both subtasks to finish\n    scope.throwIfFailed();  // Propagate the first failure, if any\n\n    Order order = calculateCheckout(inventoryTask.get(), pricingTask.get());\n}'
    },
    {
      type: 'section',
      title: '11. Asynchronous Pipelines with CompletableFuture',
      content: 'Blocking on `Future.get()` destroys concurrency structures. `CompletableFuture` provides a monadic framework for non-blocking asynchronous composition, enabling complex workflow chaining, exception recovery, and thread-pool delegation.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'CompletableFuture.supplyAsync(() -> fetchInventoryData(), ioThreadPool)\n    .thenCombineAsync(CompletableFuture.supplyAsync(() -> fetchPricingData(), ioThreadPool),\n        (inventory, pricing) -> calculateCheckout(inventory, pricing))\n    .thenApplyAsync(order -> persistOrder(order), dbThreadPool)\n    .exceptionally(ex -> {\n        logger.error("Order processing pipeline crashed", ex);\n        return FallbackOrder.getInstance();\n    });'
    },
    {
      type: 'section',
      title: '12. Coordination Utilities: Latches, Barriers & Semaphores',
      content: 'Beyond locks, `java.util.concurrent` provides higher-level synchronizers for coordinating groups of threads. `CountDownLatch` lets one or more threads wait until a set of operations completes elsewhere (single-use). `CyclicBarrier` makes a group of threads wait for each other at a common point, then resets for reuse across phases. `Semaphore` limits the number of threads that may access a resource concurrently by managing a set of permits.'
    },
    {
      type: 'table',
      columns: ['Synchronizer', 'Reusable?', 'Typical Use Case'],
      rows: [
        ['CountDownLatch', 'No — one-shot', 'Wait for N startup tasks to finish before serving traffic.'],
        ['CyclicBarrier', 'Yes — resets automatically', 'Coordinate parallel workers that must sync at the end of each phase.'],
        ['Semaphore', 'Yes — permits acquired/released repeatedly', 'Cap concurrent access to a limited resource pool, e.g. a connection pool.'],
        ['Phaser', 'Yes — supports dynamic party registration', 'Multi-phase pipelines with a variable number of participants.']
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: '// Wait for 3 subsystems to initialize before accepting requests\nCountDownLatch startupLatch = new CountDownLatch(3);\n\nfor (Runnable subsystemInit : List.of(cacheWarmup, dbConnect, configLoad)) {\n    virtualExecutor.submit(() -> {\n        subsystemInit.run();\n        startupLatch.countDown();\n    });\n}\n\nstartupLatch.await(); // Blocks until all three have counted down\nSystem.out.println("All subsystems ready — accepting traffic.");'
    },
    {
      type: 'section',
      title: '13. Concurrent Collections & Producer-Consumer Pipelines',
      content: 'Wrapping a collection with `Collections.synchronizedMap()` serializes every access behind a single lock, which becomes a severe bottleneck under contention. `java.util.concurrent` collections instead use fine-grained or lock-free internal strategies: `ConcurrentHashMap` shards its internal structure to allow concurrent reads and segmented writes, `CopyOnWriteArrayList` is ideal for read-mostly lists with rare mutation, and `BlockingQueue` implementations (`ArrayBlockingQueue`, `LinkedBlockingQueue`) provide the backbone for producer-consumer pipelines by blocking producers when full and consumers when empty.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Producer-consumer pipeline using a bounded BlockingQueue\nBlockingQueue<Order> orderQueue = new ArrayBlockingQueue<>(500);\n\n// Producer thread(s)\nvirtualExecutor.submit(() -> {\n    while (true) {\n        Order order = receiveIncomingOrder();\n        orderQueue.put(order); // Blocks if the queue is full — natural backpressure\n    }\n});\n\n// Consumer thread(s)\nvirtualExecutor.submit(() -> {\n    while (true) {\n        Order order = orderQueue.take(); // Blocks if the queue is empty\n        processOrder(order);\n    }\n});'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'ConcurrentHashMap',
          content: 'Lock-striped / CAS-based map supporting high-concurrency reads and writes without blocking the entire structure. Ideal for shared caches and counters.'
        },
        {
          label: 'CopyOnWriteArrayList',
          content: 'Mutations copy the entire backing array. Reads never block and never see a torn iteration, at the cost of expensive writes — best for rarely-mutated, frequently-iterated lists such as listener registries.'
        }
      ]
    },
    {
      type: 'table',
      columns: ['Concurrency Primitive', 'Underlying Mechanism', 'Ideal Architectural Use Case'],
      rows: [
        ['Platform Threads (OS)', '1:1 Kernel mapping with heavy stack allocations', 'Long-running, heavy CPU-bound computational loops.'],
        ['Virtual Threads (Loom)', 'M:N JVM user-mode scheduling over carrier threads', 'Massive high-throughput blocking I/O (REST APIs, DB clients).'],
        ['Atomic Variables (CAS)', 'Hardware-level atomic CPU instructions (Compare-And-Swap)', 'Lock-free counters, flags, and low-contention metrics.'],
        ['CompletableFuture', 'Non-blocking callback state machine graphs', 'Composing asynchronous microservice orchestration flows.'],
        ['StructuredTaskScope', 'Scoped virtual-thread fan-out with unified cancellation', 'Fan-out/fan-in subtasks that must share a single failure/cancellation policy.'],
        ['BlockingQueue', 'Internal lock/condition-based blocking on put()/take()', 'Producer-consumer pipelines with natural backpressure.']
      ]
    },
    {
      type: 'checklist',
      title: 'Common Concurrency Pitfalls to Avoid in Code Review',
      items: [
        'Publishing a partially-constructed object reference to another thread before the constructor finishes ("unsafe publication").',
        'Using a non-volatile boolean flag to signal thread shutdown, relying on a visibility guarantee that does not exist.',
        'Calling wait()/notify() outside a synchronized block, which throws IllegalMonitorStateException.',
        'Holding a lock while performing blocking I/O or calling into untrusted code, inflating contention windows.',
        'Iterating a non-concurrent collection while another thread mutates it, risking ConcurrentModificationException.',
        'Forgetting to unwrap ExecutionException when calling Future.get(), losing the original stack trace context.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Mastering modern Java concurrency requires moving beyond basic Runnable threads. Design systems using virtual threads for I/O scalability, protect shared transactional state using proper synchronization or lock-free atomics, understand memory visibility barriers, coordinate related subtasks with structured concurrency, choose the right concurrent collection for the access pattern, and compose asynchronous pipelines reactively.'
    }
  ],
  explanation: 'An enterprise-grade masterclass covering low-level OS thread mechanics, thread lifecycle states, JVM monitor states, deadlock/livelock/starvation avoidance, read-write and optimistic locking, hardware memory models, happens-before consistency rules, thread confinement via ThreadLocal, Project Loom virtual thread scheduling, structured concurrency, high-level coordination utilities, concurrent collections, and reactive asynchronous pipelines.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;