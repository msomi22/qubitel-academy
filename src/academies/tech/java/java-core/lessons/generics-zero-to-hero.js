import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-generics-zero-to-hero',
  topicId: 'java-core',
  title: 'Java Generics: From Zero to Hero',
  difficulty: 'Easy',
  prompt: 'Teach Java Generics comprehensively. Cover basic compile-time safety, bounded types, the PECS rule, type erasure limitations, and advanced architectural patterns like recursive bounds and super type tokens.',
  tags: ['java', 'generics', 'architecture', 'type-erasure', 'pecs'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'blue'
  },
  body: [
    {
      type: 'section',
      title: 'The architectural shift',
      content: 'Generics separate Java beginners from seasoned architects. At their core, they are syntactic sugar designed to provide compile-time type safety. But under the hood, they introduce complex rules around inheritance, memory, and compiler behavior.'
    },
    {
      type: 'section',
      title: '1. The Genesis: Why Generics Exist',
      content: 'Before Java 5, collections held raw Object references. You could put anything into a List, but you had to explicitly cast it back out. If you guessed the type wrong, the compiler did not care, but the JVM threw a ClassCastException at runtime. Generics shift this burden from runtime to compile-time.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Pre-Java 5 (Error-prone)\nList rawList = new ArrayList();\nrawList.add("Microservice");\nrawList.add(200); // Compiles fine!\nString status = (String) rawList.get(1); // Runtime ClassCastException\n\n// Post-Java 5 (Type-Safe)\nList<String> genericList = new ArrayList<>();\ngenericList.add("Microservice");\n// genericList.add(200); // Compiler error! Fast failure.\nString safeStatus = genericList.get(0); // No casting needed'
    },
    {
      type: 'section',
      title: '2. Core Syntax and Patterns',
      content: 'You define a generic type parameter (usually T for Type, E for Element, K for Key, V for Value) in angle brackets. This is incredibly useful for enterprise patterns like standardizing API responses.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'public class ApiResponse<T> {\n    private int statusCode;\n    private T payload;\n\n    public ApiResponse(int statusCode, T payload) {\n        this.statusCode = statusCode;\n        this.payload = payload;\n    }\n    \n    public T getPayload() { return payload; }\n}'
    },
    {
      type: 'section',
      title: '3. Bounded Types & Wildcards',
      content: 'Sometimes you do not want just any type; you want a type that meets specific criteria.'
    },
    {
      type: 'checklist',
      title: 'Types of Bounds',
      items: [
        'Upper Bounds (extends): Restricts a generic type to a specific class or its subclasses (e.g., <T extends Number>).',
        'Multiple Bounds: A type can extend one class and multiple interfaces (e.g., <T extends Entity & Serializable>).',
        'The Wildcard (?): Represents an unknown type. List<?> means a list of some unknown specific type.'
      ]
    },
    {
      type: 'section',
      title: '4. The Architect\'s Secret: PECS',
      content: 'If you have a method that operates on collections, how do you make it flexible enough to accept subtypes or supertypes? This is where PECS comes in: Producer Extends, Consumer Super.'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'Producer Extends',
          content: 'If your method reads data OUT of a generic structure, that structure is a Producer. Use <? extends T>.'
        },
        {
          label: 'Consumer Super',
          content: 'If your method puts data INTO a generic structure, it is a Consumer. Use <? super T>.'
        }
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The Golden Rule of Wildcards',
      content: 'Use "? extends" when you only intend to read from a collection. Use "? super" when you only intend to write to a collection. If you need to do both, do not use wildcards at all—use a precise type T.'
    },
    {
      type: 'section',
      title: '5. Under the Hood: Type Erasure',
      content: 'Generics do not exist at runtime. The JVM knows nothing about them. When you compile your code, the compiler implements Type Erasure: it replaces all type parameters with their bounds (or Object) and inserts type casts where necessary.'
    },
    {
      type: 'checklist',
      title: 'Limitations caused by Type Erasure',
      items: [
        'You cannot instantiate generic types (new T() is illegal).',
        'You cannot create arrays of generic types (new T[10] is illegal).',
        'You cannot use instanceof with parameterized types (if (obj instanceof List<String>) is illegal).'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Heap Pollution Warning',
      content: 'Mixing varargs with generic types (e.g., List<String>... lists) can cause heap pollution, where a parameterized variable refers to an object of a different type. Use @SafeVarargs only when verified safe.'
    },
    {
      type: 'section',
      title: '6. Recursive Type Bounds (Self-Bounding)',
      content: 'This pattern is frequently used when designing extensible fluent APIs or complex Builder patterns. You solve inheritance breaks by passing the class type into itself.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// The generic parameter B represents the concrete subclass\npublic abstract class VehicleBuilder<B extends VehicleBuilder<B>> {\n    protected String color;\n\n    public B withColor(String color) {\n        this.color = color;\n        return self(); // Returns the specific subclass\n    }\n\n    protected abstract B self(); \n}'
    },
    {
      type: 'section',
      title: '7. Bypassing Type Erasure (Super Type Token)',
      content: 'Libraries like Jackson deserialize JSON arrays into a List<UserDTO> at runtime by exploiting a loophole: while the generic type of an instance is erased, the generic superclass signature of a class is preserved in the compiled bytecode. They use an anonymous inner class to capture this metadata.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// The {} creates an anonymous subclass to preserve the signature\nTypeReference<List<UserDTO>> typeRef = new TypeReference<List<UserDTO>>() {};\n\n// Frameworks use reflection to read the preserved signature:\nType superclass = typeRef.getClass().getGenericSuperclass();\nParameterizedType parameterized = (ParameterizedType) superclass;\nSystem.out.println(parameterized.getActualTypeArguments()[0]);'
    },
    {
      type: 'section',
      title: '8. Bridge Methods',
      content: 'When you implement a generic interface, type erasure creates a problem for polymorphism. The Java compiler secretly writes a Bridge Method into your .class file to bridge the gap.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// What you write:\npublic class MyNode implements Comparable<MyNode> {\n    public int compareTo(MyNode other) { return 0; }\n}\n\n// What the compiler secretly adds underneath:\npublic int compareTo(Object other) {\n    return this.compareTo((MyNode) other);\n}'
    },
    {
      type: 'section',
      title: '9. Intersection Types in Casts',
      content: 'Java allows casting an object to multiple types simultaneously using the & operator. This is highly useful for dynamic proxies or lambdas needing multiple marker interfaces.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Forcing a lambda to be both a Runnable and Serializable\nRunnable r = (Runnable & Serializable) () -> System.out.println("Running");'
    },
    {
      type: 'table',
      columns: ['Type Concept', 'Definition', 'Allowed Operations'],
      rows: [
        ['Reifiable Types', 'Information is fully available at runtime (e.g., int, String, List, List<?>).', 'Can be used with instanceof and generic array creation.'],
        ['Non-Reifiable Types', 'Information is lost at runtime due to erasure (e.g., List<String>).', 'Cannot be used with instanceof or generic array creation.']
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Memory sentence',
      content: 'Generics are a compile-time illusion for type safety; at runtime, Type Erasure wipes them away, leaving behind raw types, bridge methods, and the strict rules of PECS.'
    }
  ],
  explanation: 'A strong understanding of generics moves beyond basic syntax to architectural application. Recognizing how Type Erasure affects runtime behavior, when to apply PECS for API flexibility, and how to utilize recursive bounds are critical skills for senior Java development.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;