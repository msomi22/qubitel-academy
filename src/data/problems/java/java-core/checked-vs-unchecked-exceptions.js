import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-checked-vs-unchecked-exceptions-001',
  topicId: 'java-core',
  title: 'Checked vs Unchecked Exceptions',
  difficulty: 'Medium',
  prompt: 'Teach the difference between checked and unchecked exceptions in Java. Explain compiler rules, examples, when to use each, and how the choice affects API design.',
  tags: ['java', 'exceptions', 'api-design'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'amber'
  },
  body: [
    {
      type: 'section',
      title: 'The simplest explanation',
      content: 'A checked exception is an exception Java forces you to think about at compile time. An unchecked exception is an exception Java allows to happen at runtime without forcing every caller to catch or declare it.'
    },
    {
      type: 'diagram',
      title: 'Exception hierarchy mental model',
      content: 'Throwable\n├── Error                          usually serious JVM/system problems\n└── Exception\n    ├── checked exceptions          must be caught or declared\n    └── RuntimeException            unchecked; compiler does not force handling',
      caption: 'The key split is whether the exception is under RuntimeException or not.'
    },
    {
      type: 'callout',
      tone: 'question',
      title: 'Predict before reveal',
      content: 'A method reads a file from disk. Should callers be forced to handle failure? Now compare that to a method receiving a negative withdrawal amount. Which one sounds recoverable by the caller?'
    },
    {
      type: 'table',
      columns: ['Type', 'Compiler forces handling?', 'Common parent', 'Simple meaning'],
      rows: [
        ['Checked exception', 'Yes', 'Exception but not RuntimeException', 'The caller is expected to know this can happen and may recover.'],
        ['Unchecked exception', 'No', 'RuntimeException', 'Usually a programming mistake, invalid input, or unrecoverable runtime condition.'],
        ['Error', 'No', 'Error', 'Serious JVM/system problem that application code usually should not handle.']
      ]
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
      code: 'void withdraw(int amount) {\n    if (amount <= 0) {\n        throw new IllegalArgumentException("amount must be positive");\n    }\n\n    // continue withdrawal\n}'
    },
    {
      type: 'comparison',
      items: [
        {
          title: 'Use checked exceptions when',
          content: 'The caller can reasonably recover or choose a clear fallback, such as retrying, asking for another file, or showing a helpful message.'
        },
        {
          title: 'Use unchecked exceptions when',
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
        ['Null where null is not allowed', 'Unchecked NullPointerException or validation exception', 'Usually a programming or validation problem.']
      ]
    },
    {
      type: 'callout',
      tone: 'question',
      title: 'Self-explanation prompt',
      content: 'Explain the difference using this sentence frame: checked exceptions are for failures the caller may reasonably handle; unchecked exceptions are often for violated assumptions or invalid usage.'
    },
    {
      type: 'checklist',
      title: 'Strong answer checklist',
      items: [
        'Checked exceptions must be caught or declared.',
        'Unchecked exceptions extend RuntimeException and are not forced by the compiler.',
        'Checked exceptions are useful when recovery is realistic.',
        'Unchecked exceptions are common for programming errors or invalid arguments.',
        'Exception choices affect method signatures and API usability.',
        'Production code should translate low-level failures into useful boundary-level errors.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Memory sentence',
      content: 'Checked means the compiler says, "Handle this or declare it." Unchecked means the compiler says, "This may happen, but I will not force every caller to catch it."'
    }
  ],
  explanation: 'A strong answer explains the compiler rule, shows examples, and then talks about design intent: checked exceptions are useful when callers can recover, while unchecked exceptions are often used for invalid usage, programming mistakes, or conditions that should be handled at a boundary.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
