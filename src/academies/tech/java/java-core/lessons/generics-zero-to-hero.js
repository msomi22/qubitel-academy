import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-generics-zero-to-hero',
  topicId: 'java-core',
  title: 'Java Generics: From Zero to Hero',
  difficulty: 'Easy',
  prompt: 'Teach Java Generics comprehensively. Cover basic compile-time safety, naming conventions, generic methods, bounded types, the PECS rule, wildcard capture, type erasure limitations, array covariance vs. generic invariance, and advanced architectural patterns like recursive bounds, super type tokens, and generic singleton factories.',
  tags: ['java', 'generics', 'architecture', 'type-erasure', 'pecs', 'wildcards', 'array-covariance'],
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
      type: 'checklist',
      title: '3. Type Parameter Naming Conventions',
      items: [
        'T — Type: the general-purpose, most common type parameter name.',
        'E — Element: used throughout the Collections Framework (e.g., List<E>, Set<E>).',
        'K, V — Key and Value: used together for map-like structures (e.g., Map<K, V>).',
        'N — Number: signals a parameter that should be a numeric type.',
        'R — Return type: used when a type parameter specifically represents a method\'s return value, distinct from its inputs.',
        'S, U, and subsequent letters: used for additional type parameters when T is already taken, e.g., a BiFunction<T, U, R>.'
      ]
    },
    {
      type: 'section',
      title: '4. Generic Methods: Type Parameters Independent of the Class',
      content: 'A method can introduce its own type parameter even inside a non-generic class, by declaring it in angle brackets immediately before the return type. This is the backbone of generic static utility methods, such as those found throughout java.util.Collections. The compiler usually infers the type argument from the method call context, but an explicit type witness can be supplied when inference fails.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// A generic method, scoped independently of any enclosing class type parameter\npublic static <T extends Comparable<T>> T max(T a, T b) {\n    return a.compareTo(b) >= 0 ? a : b;\n}\n\n// Usual call — the compiler infers T = Integer from the arguments\nInteger winner = max(3, 7);\n\n// Explicit type witness — useful when the compiler cannot infer T on its own\nInteger explicitWinner = ThisClass.<Integer>max(3, 7);'
    },
    {
      type: 'section',
      title: '5. Bounded Types & Wildcards',
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
      type: 'code',
      language: 'java',
      code: '// Multiple bounds: the class bound (if any) must be listed first, followed by interfaces\npublic <T extends Entity & Serializable & Comparable<T>> void persistAndSort(List<T> records) {\n    records.sort(Comparator.naturalOrder());\n    records.forEach(this::persist);\n}'
    },
    {
      type: 'section',
      title: '6. Why Generics Are Invariant: Array Covariance vs. Generic Invariance',
      content: 'Arrays in Java are covariant: an Object[] reference is allowed to point at a String[] instance, because arrays carry their component type at runtime and enforce it with a runtime check. Generics deliberately do not behave this way — List<String> is not a subtype of List<Object> — because the type information is erased and no such runtime check could ever occur. This invariance is what allows generics to catch type-safety violations at compile time instead of deferring them to a runtime crash.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Arrays are covariant — this compiles, but fails loudly at runtime\nObject[] objectArray = new String[3];\nobjectArray[0] = 42; // Throws ArrayStoreException at runtime\n\n// Generics are invariant — the equivalent mistake is caught at compile time instead\nList<Object> objectList = new ArrayList<String>(); // Compiler error: incompatible types'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'Arrays (Covariant)',
          content: 'Component type is reified and checked on every element write. Type-safety violations surface as an ArrayStoreException at runtime.'
        },
        {
          label: 'Generics (Invariant)',
          content: 'No runtime component-type checks are possible due to erasure, so the compiler forbids the unsafe assignment entirely, moving the failure earlier in the development cycle.'
        }
      ]
    },
    {
      type: 'section',
      title: '7. The Architect\'s Secret: PECS',
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
      title: '8. The Wildcard Capture Helper Pattern',
      content: 'Occasionally you must mutate a List<?> whose element type is genuinely unknown to the caller, but the compiler will refuse to call add() or set() on it directly since it cannot prove type safety for an unnamed wildcard. The idiomatic fix is "wildcard capture": delegate to a private generic helper method whose own type parameter captures the unknown type, letting the compiler treat every element consistently within that helper.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// The public-facing method accepts the flexible wildcard type\npublic void swapFirstTwo(List<?> list) {\n    swapHelper(list); // Delegates to capture the wildcard as a concrete T\n}\n\n// The private helper "captures" the unknown type as T, enabling safe mutation\nprivate <T> void swapHelper(List<T> list) {\n    T first = list.get(0);\n    T second = list.get(1);\n    list.set(0, second);\n    list.set(1, first);\n}'
    },
    {
      type: 'section',
      title: '9. Under the Hood: Type Erasure',
      content: 'Generics do not exist at runtime. The JVM knows nothing about them. When you compile your code, the compiler implements Type Erasure: it replaces all type parameters with their bounds (or Object) and inserts type casts where necessary.'
    },
    {
      type: 'checklist',
      title: 'Limitations caused by Type Erasure',
      items: [
        'You cannot instantiate generic types (new T() is illegal).',
        'You cannot create arrays of generic types (new T[10] is illegal).',
        'You cannot use instanceof with parameterized types (if (obj instanceof List<String>) is illegal).',
        'You cannot declare a checked exception class with a type parameter (class MyException<T> extends Exception {} is illegal), since the catch clause needs a reified type to match against at runtime.',
        'You cannot overload two methods whose erasure produces an identical signature (e.g., void process(List<String> l) and void process(List<Integer> l) in the same class).'
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
      title: '10. Unchecked Warnings, Raw Types & @SuppressWarnings',
      content: 'When the compiler cannot verify that a cast or operation is fully type-safe — usually because of an unavoidable interaction with erasure or a raw type — it emits an "unchecked" warning rather than a hard error. These warnings should never be silenced blindly. @SuppressWarnings("unchecked") should be applied to the smallest possible scope (a single local variable or return statement, not an entire method or class) and always paired with a comment proving why the operation is actually safe.'
    },
    {
      type: 'code',
      language: 'java',
      code: '@SuppressWarnings("unchecked") // Safe: componentType guarantees T at the reflective call site\npublic static <T> T[] newArray(int size, Class<T> componentType) {\n    return (T[]) java.lang.reflect.Array.newInstance(componentType, size);\n}'
    },
    {
      type: 'section',
      title: '11. Recursive Type Bounds (Self-Bounding)',
      content: 'This pattern is frequently used when designing extensible fluent APIs or complex Builder patterns. You solve inheritance breaks by passing the class type into itself.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// The generic parameter B represents the concrete subclass\npublic abstract class VehicleBuilder<B extends VehicleBuilder<B>> {\n    protected String color;\n\n    public B withColor(String color) {\n        this.color = color;\n        return self(); // Returns the specific subclass\n    }\n\n    protected abstract B self(); \n}'
    },
    {
      type: 'section',
      title: '12. Bypassing Type Erasure (Super Type Token)',
      content: 'Libraries like Jackson deserialize JSON arrays into a List<UserDTO> at runtime by exploiting a loophole: while the generic type of an instance is erased, the generic superclass signature of a class is preserved in the compiled bytecode. They use an anonymous inner class to capture this metadata.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// The {} creates an anonymous subclass to preserve the signature\nTypeReference<List<UserDTO>> typeRef = new TypeReference<List<UserDTO>>() {};\n\n// Frameworks use reflection to read the preserved signature:\nType superclass = typeRef.getClass().getGenericSuperclass();\nParameterizedType parameterized = (ParameterizedType) superclass;\nSystem.out.println(parameterized.getActualTypeArguments()[0]);'
    },
    {
      type: 'section',
      title: '13. Bridge Methods',
      content: 'When you implement a generic interface, type erasure creates a problem for polymorphism. The Java compiler secretly writes a Bridge Method into your .class file to bridge the gap.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// What you write:\npublic class MyNode implements Comparable<MyNode> {\n    public int compareTo(MyNode other) { return 0; }\n}\n\n// What the compiler secretly adds underneath:\npublic int compareTo(Object other) {\n    return this.compareTo((MyNode) other);\n}'
    },
    {
      type: 'section',
      title: '14. Intersection Types in Casts',
      content: 'Java allows casting an object to multiple types simultaneously using the & operator. This is highly useful for dynamic proxies or lambdas needing multiple marker interfaces.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Forcing a lambda to be both a Runnable and Serializable\nRunnable r = (Runnable & Serializable) () -> System.out.println("Running");'
    },
    {
      type: 'section',
      title: '15. The Generic Singleton Factory Pattern',
      content: 'Because erasure means every parameterization of a generic class shares a single .class file at runtime, a single stateless, immutable instance can safely be reused and re-cast for any type argument the caller needs, rather than allocating a fresh instance per type. Collections.emptyList() and Function.identity() are standard-library examples of this pattern.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'private static final UnaryOperator<Object> IDENTITY_FN = t -> t;\n\n@SuppressWarnings("unchecked") // Safe: IDENTITY_FN ignores its type parameter entirely\npublic static <T> UnaryOperator<T> identityFunction() {\n    return (UnaryOperator<T>) IDENTITY_FN;\n}'
    },
    {
      type: 'table',
      columns: ['Type Concept', 'Definition', 'Allowed Operations'],
      rows: [
        ['Reifiable Types', 'Information is fully available at runtime (e.g., int, String, List, List<?>).', 'Can be used with instanceof and generic array creation.'],
        ['Non-Reifiable Types', 'Information is lost at runtime due to erasure (e.g., List<String>).', 'Cannot be used with instanceof or generic array creation.'],
        ['Generic Array via Reflection', 'Component type supplied explicitly at runtime through a Class<T> token.', 'Enables safe generic array creation despite erasure — see the newArray pattern above.']
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Memory sentence',
      content: 'Generics are a compile-time illusion for type safety; at runtime, Type Erasure wipes them away, leaving behind raw types, bridge methods, and the strict rules of PECS — while invariance, wildcard capture, and generic singleton factories are the tools that keep the illusion airtight.'
    }
  ],
  explanation: 'A strong understanding of generics moves beyond basic syntax to architectural application. Recognizing how Type Erasure affects runtime behavior, when to apply PECS for API flexibility, why generics are invariant while arrays are covariant, how to capture wildcards for safe mutation, and how to utilize recursive bounds and generic singleton factories are critical skills for senior Java development.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;