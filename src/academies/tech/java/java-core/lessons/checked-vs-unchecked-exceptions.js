import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-checked-vs-unchecked-exceptions-001',
  topicId: 'java-core',
  title: 'Checked vs Unchecked Exceptions',
  difficulty: 'Medium',
  prompt: 'A rigorous, production-grade masterclass on Java exception handling, dissecting checked vs unchecked exception contracts, try-catch-finally semantics, suppression, try-with-resources, exception chaining, multi-catch, catch ordering, custom exception design, exception wrapping patterns, handling exceptions in lambdas, performance considerations, and API design best practices.',
  tags: ['java', 'exceptions', 'api-design', 'error-handling', 'try-with-resources'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'amber'
  },
  body: [
    {
      type: 'section',
      title: 'The simplest explanation',
      content: 'A checked exception is an exception Java forces you to think about at compile time. An unchecked exception is an exception Java allows to happen at runtime without forcing every caller to catch or declare it. The distinction exists because some failures are recoverable and predictable (check them), while others indicate programming errors or unrecoverable conditions (don\'t force handling).'
    },
    {
      type: 'section',
      title: 'Exception hierarchy mental model',
      content: 'Throwable\n├── Error                          serious JVM/system problems, virtually unrecoverable\n└── Exception\n    ├── checked exceptions          must be caught or declared in the throws clause\n    └── RuntimeException            unchecked; compiler does not force handling'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The key split',
      content: 'The key split is whether the exception is under RuntimeException or not. Error is also unchecked but should almost never be caught.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Predict before reveal',
      content: 'A method reads a file from disk. Should callers be forced to handle failure? Now compare that to a method receiving a negative withdrawal amount. Which one sounds recoverable by the caller?'
    },
    {
      type: 'table',
      columns: ['Type', 'Compiler forces handling?', 'Common parent', 'Simple meaning'],
      rows: [
        ['Checked exception', 'Yes', 'Exception (but not RuntimeException)', 'The caller is expected to know this can happen and may recover.'],
        ['Unchecked exception', 'No', 'RuntimeException', 'Usually a programming mistake, invalid input, or unrecoverable runtime condition.'],
        ['Error', 'No', 'Error', 'Serious JVM/system problem that application code should almost never handle.']
      ]
    },
    {
      type: 'section',
      title: 'throw vs throws: The Two Keywords',
      content: 'The `throws` keyword appears in a method signature to declare that the method might throw one or more checked exceptions, delegating the responsibility to the caller. The `throw` keyword is used inside a method body to actually create and throw an exception instance. A method cannot `throw` a checked exception that it does not declare with `throws`.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// throws — declares that this method may propagate this checked exception outward\npublic String readFile(String path) throws IOException {\n    // throw — actually creates and throws the exception instance\n    if (path == null) {\n        throw new IllegalArgumentException("path cannot be null");\n    }\n    // ...\n}'
    },
    {
      type: 'section',
      title: 'Checked exception example',
      content: 'If a method reads a file, the file may be missing or inaccessible. Java can force the method or caller to handle that possibility because the failure is part of the operation contract.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'import java.io.IOException;\nimport java.nio.file.Files;\nimport java.nio.file.Path;\n\nString readConfig(Path path) throws IOException {\n    return Files.readString(path);\n}'
    },
    {
      type: 'section',
      title: 'What throws IOException means',
      content: 'The method is telling callers: reading this file can fail for reasons outside normal business logic. The caller must either catch IOException or declare it further. This makes the risk visible in the method contract.'
    },
    {
      type: 'section',
      title: 'Unchecked exception example',
      content: 'If a caller passes an invalid value, many Java APIs throw unchecked exceptions. The compiler does not force every caller to catch them because the better fix is often to correct the calling code or validate earlier.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'void withdraw(int amount) {\n    if (amount <= 0) {\n        throw new IllegalArgumentException("amount must be positive");\n    }\n    // continue withdrawal\n}'
    },
    {
      type: 'section',
      title: 'try-catch-finally and Exception Suppression',
      content: 'The `finally` block executes regardless of whether an exception is thrown or not. However, if both the `try` block and the `finally` block throw exceptions, the exception from `finally` suppresses the `try` exception — the `try` exception is added as a suppressed exception on the `finally` exception. This is a common pitfall in resource cleanup code that `try-with-resources` solves elegantly.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Before Java 7 — manual resource cleanup with suppression risk\nInputStream in = null;\ntry {\n    in = new FileInputStream("data.txt");\n    // ... use in, may throw\n} finally {\n    if (in != null) {\n        in.close(); // If this throws, it suppresses the original exception\n    }\n}\n\n// Modern try-with-resources — suppresses correctly, then can retrieve suppressed exceptions\ntry (InputStream in = new FileInputStream("data.txt")) {\n    // ... use in\n} catch (IOException e) {\n    // The primary exception may have suppressed exceptions from close()\n    for (Throwable suppressed : e.getSuppressed()) {\n        logger.error("Suppressed: ", suppressed);\n    }\n}'
    },
    {
      type: 'section',
      title: 'Try-With-Resources: The Modern Standard',
      content: 'Java 7 introduced try-with-resources, which automatically closes any resource that implements `AutoCloseable`. The resources are closed in reverse order of declaration. If a resource throws an exception during closing, it is added as a suppressed exception to the primary exception. This is the only correct way to manage resources like streams, connections, or files in modern Java.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Multiple resources — closed in reverse declaration order (smtpStream then htmlStream)\ntry (HTMLStream htmlStream = new HTMLStream();\n     SMTPStream smtpStream = new SMTPStream(htmlStream)) {\n    smtpStream.sendMessage();\n} catch (IOException e) {\n    for (Throwable suppressed : e.getSuppressed()) {\n        System.err.println("Suppressed: " + suppressed);\n    }\n}\n\n// Full syntax: try-with-resources + catch + finally\ntry (Connection conn = dataSource.getConnection()) {\n    // ... use connection\n} catch (SQLException e) {\n    // ... handle SQL-specific error\n} finally {\n    // This executes after the try block completes (or after the catch block)\n    cleanupRegistry.flush();\n}'
    },
    {
      type: 'section',
      title: 'Exception Chaining: The Cause Pattern',
      content: 'When translating a low-level exception into a higher-level domain exception, always preserve the original cause. Every `Throwable` supports a `cause` via the constructor or `initCause()`, and `getCause()` retrieves it. This preserves the full stack trace and debugging context without leaking internal implementation details to the caller.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Custom exception that accepts a cause for chaining\npublic class DataAccessException extends RuntimeException {\n    public DataAccessException(String message) {\n        super(message);\n    }\n    public DataAccessException(String message, Throwable cause) {\n        super(message, cause);\n    }\n}\n\n// Usage: translating a low-level SQLException into a domain exception\ntry {\n    // ... JDBC operation\n} catch (SQLException e) {\n    throw new DataAccessException("Failed to fetch user by ID: " + userId, e);\n}\n\n// The full stack trace is accessible via getCause()\nThrowable cause = dataAccessException.getCause(); // SQLException'
    },
    {
      type: 'section',
      title: 'Multi-Catch: Catching Multiple Exception Types (Java 7+)',
      content: 'When multiple exceptions require identical handling, multi-catch reduces duplication. The caught exception variable is implicitly `final` and cannot be reassigned. The types must not overlap (e.g., you cannot catch `IOException` and `FileNotFoundException` in the same multi-catch because one is a subclass of the other).'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Before Java 7 — duplicated handling\ntry {\n    // ... operation\n} catch (IOException e) {\n    logger.error("I/O error", e);\n    throw new ServiceException("I/O error", e);\n} catch (SQLException e) {\n    logger.error("SQL error", e);\n    throw new ServiceException("SQL error", e);\n}\n\n// Java 7+ — multi-catch, variable is implicitly final\ntry {\n    // ... operation\n} catch (IOException | SQLException e) {\n    logger.error("Operation failed", e);\n    throw new ServiceException("Operation failed", e);\n}'
    },
    {
      type: 'section',
      title: 'Catch Ordering: Specific Before General',
      content: 'Catch blocks are evaluated in order. A more specific exception must appear before a more general one; otherwise, the code will not compile. This is because the general catch would "steal" the exception from the specific catch.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Correct order: specific to general\ntry {\n    // ... operation\n} catch (FileNotFoundException e) {\n    // Specific: file missing\n} catch (IOException e) {\n    // General: any other I/O error\n} catch (Exception e) {\n    // Very general: any other unexpected exception\n}\n\n// Incorrect: would not compile because IOException catches FileNotFoundException first\n/*\ntry {\n    // ... operation\n} catch (IOException e) {\n    // This catches FileNotFoundException too (it\'s a subclass)\n} catch (FileNotFoundException e) {\n    // Unreachable — compilation error\n}\n*/'
    },
    {
      type: 'section',
      title: 'Catching Exception vs Throwable: Know the Risk',
      content: 'Catching `Exception` catches all checked and unchecked exceptions except `Error`. Catching `Throwable` catches absolutely everything including `Error` (like `OutOfMemoryError`, `StackOverflowError`, `VirtualMachineError`). In application code, catching `Throwable` or `Error` is almost always wrong because you cannot meaningfully recover from a JVM-level failure, and doing so can mask serious problems. Catch `Exception` if you must catch broadly, and never catch `Error` without a very specific reason.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Acceptable: catch Exception at an outer boundary to log and then rethrow\npublic void processRequest(Request req) {\n    try {\n        // ... business logic that throws various exceptions\n    } catch (Exception e) {\n        logger.error("Request processing failed", e);\n        throw new ServiceException("Processing error", e);\n    }\n}\n\n// Dangerous: catching Throwable hides severe JVM errors\n/*\ntry {\n    // ... operation\n} catch (Throwable t) {\n    // This catches OutOfMemoryError, StackOverflowError, etc.\n    // The JVM is likely in an unstable state — catching this is usually a mistake\n}\n*/'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'Use checked exceptions when',
          content: 'The caller can reasonably recover or choose a clear fallback, such as retrying, asking for another file, or showing a helpful message.'
        },
        {
          label: 'Use unchecked exceptions when',
          content: 'The problem usually means the program was called incorrectly, the state is invalid, or forcing every caller to catch it would add noise without real recovery.'
        }
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'API design warning',
      content: 'Checked exceptions become part of your public API. Once many callers depend on that method signature, changing it can be painful. Use checked exceptions intentionally, not automatically.'
    },
    {
      type: 'section',
      title: 'Exception Wrapping and Translation Patterns',
      content: 'A common enterprise pattern is to wrap checked exceptions in unchecked exceptions to prevent leaky abstractions. This is especially common at application boundaries: a `SQLException` becomes a `DataAccessException` (unchecked), an `IOException` becomes a `StorageException` (unchecked). This keeps callers free from low-level implementation details while preserving the root cause for debugging.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Repository layer — translate checked SQLException to unchecked DataAccessException\npublic User findById(long id) {\n    try {\n        // ... JDBC query\n    } catch (SQLException e) {\n        throw new DataAccessException("Failed to find user: " + id, e);\n    }\n}\n\n// Helper pattern for lambda/stream exception handling\n@FunctionalInterface\ninterface ThrowingFunction<T, R> { R apply(T t) throws Exception; }\n\nstatic <T, R> Function<T, R> wrap(ThrowingFunction<T, R> fn) {\n    return t -> {\n        try { return fn.apply(t); }\n        catch (Exception e) { throw new RuntimeException(e); }\n    };\n}\n\n// Usage in a stream\nfiles.stream()\n    .map(wrap(Files::readString))\n    .collect(Collectors.toList());'
    },
    {
      type: 'section',
      title: 'Exception Handling in Lambdas and Streams',
      content: 'Functional interfaces in `java.util.function` do not declare checked exceptions, so lambdas inside streams cannot throw checked exceptions directly. The solution is to wrap checked exceptions in unchecked ones using a helper method (as shown above) or to create a custom functional interface that declares the exception and adapt it. Never ignore or swallow exceptions inside a lambda to make it compile — that hides failures that will break your application silently.'
    },
    {
      type: 'section',
      title: 'How this affects clean backend code',
      content: 'At application boundaries, it is common to translate low-level exceptions into meaningful domain or API errors. For example, an IOException from storage might become a clear response like "configuration file unavailable" or a service-level failure. Good code does not blindly leak every internal exception detail to callers.'
    },
    {
      type: 'table',
      columns: ['Situation', 'Reasonable choice', 'Why'],
      rows: [
        ['File cannot be read', 'Checked or translated application exception', 'The caller may recover or report a clear operational issue.'],
        ['Negative amount passed to withdraw()', 'Unchecked IllegalArgumentException', 'The caller violated the method contract.'],
        ['Database temporarily unavailable', 'Often translated at service boundary', 'The API should expose a meaningful failure, not raw internals.'],
        ['Null where null is not allowed', 'Unchecked NullPointerException or validation exception', 'Usually a programming or validation problem.'],
        ['Thread interrupted', 'Propagate InterruptedException or restore interrupt status', 'Interruption is a cooperative cancellation signal. Always handle it correctly.']
      ]
    },
    {
      type: 'section',
      title: 'Performance Impact of Exceptions',
      content: 'Creating and throwing an exception is expensive — it fills the entire stack trace, capturing every frame from the throw site back to the top. In hot code paths, this can be a performance killer. Exceptions should be used for exceptional conditions, not for control flow. Validate inputs before calling methods rather than catching and handling expected failures.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Anti-pattern: using exceptions for control flow\nboolean isValidNumber(String input) {\n    try {\n        Integer.parseInt(input);\n        return true;\n    } catch (NumberFormatException e) {\n        return false;\n    }\n}\n\n// Better: validation without throwing (parse is called once anyway, but the\n// performance cost matters when this is in a hot loop — use a regex or manual validation first)'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Self-explanation prompt',
      content: 'Explain the difference using this sentence frame: checked exceptions are for failures the caller may reasonably handle; unchecked exceptions are often for violated assumptions or invalid usage.'
    },
    {
      type: 'checklist',
      title: 'Strong answer checklist',
      items: [
        'Checked exceptions must be caught or declared in the throws clause.',
        'Unchecked exceptions extend RuntimeException and are not forced by the compiler.',
        'Checked exceptions are useful when recovery is realistic.',
        'Unchecked exceptions are common for programming errors or invalid arguments.',
        'Exception choices affect method signatures and API usability.',
        'Production code should translate low-level failures into useful boundary-level errors.',
        'Try-with-resources is the modern standard for resource management and suppression handling.',
        'Multi-catch reduces duplication; catch order is specific to general.',
        'Never catch Throwable or Error in application code without a very specific reason.',
        'Preserve exception causes via chaining to maintain debugging context.',
        'Do not use exceptions for flow control — they are expensive.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Memory sentence',
      content: 'Checked means the compiler says, "Handle this or declare it." Unchecked means the compiler says, "This may happen, but I will not force every caller to catch it." Use checked for recoverable failures, unchecked for programming errors, and always preserve the cause for debugging.'
    }
  ],
  explanation: 'A comprehensive, enterprise-grade masterclass covering the checked vs unchecked exception contract, throw vs throws distinction, try-catch-finally semantics, exception suppression, try-with-resources with multiple resources and suppressed exceptions, exception chaining via cause, multi-catch, catch ordering, custom exception design with cause constructors, exception wrapping and translation patterns, handling exceptions in lambdas, performance considerations, and API design best practices.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;