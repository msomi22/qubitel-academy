import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-equals-hashcode-immutability-zero-to-hero',
  topicId: 'java-core',
  title: 'Java equals(), hashCode() & Immutability: From Zero to Hero',
  difficulty: 'Easy',
  prompt: 'A rigorous, production-grade masterclass on Java object equality and state safety, dissecting the equals()/hashCode() contract, hash-based collection internals, getClass() vs. instanceof symmetry pitfalls, defensive copying, immutable class design, final-field safe publication, records, and value-based class gotchas.',
  tags: ['java', 'equals', 'hashcode', 'immutability', 'object-contracts', 'records', 'architecture'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'violet'
  },
  body: [
    {
      type: 'section',
      title: 'Architectural Introduction: Identity vs. Equality',
      content: 'The == operator compares object identity — are these two variables pointing at the exact same location in memory? The equals() method, by contrast, is meant to compare logical equality — do these two objects represent the same value, even if they are distinct instances? Object.equals() defaults to identity comparison, which is correct for very few domain types. Getting equals() and its inseparable partner hashCode() wrong does not throw a compile error or even a runtime exception in most cases — it silently corrupts the behavior of every hash-based collection your objects are ever stored in, which is precisely what makes this one of the most dangerous, hard-to-detect bug categories in enterprise Java.'
    },
    {
      type: 'section',
      title: '1. The equals() Contract: Reflexive, Symmetric, Transitive, Consistent',
      content: 'Object.equals() is governed by a formal contract that every override must satisfy, whether or not the compiler can verify it. Breaking any single clause does not fail to compile — it silently breaks any collection, framework, or algorithm that relies on the contract holding.'
    },
    {
      type: 'checklist',
      title: 'The Five equals() Contract Rules',
      items: [
        'Reflexive: x.equals(x) must always return true.',
        'Symmetric: x.equals(y) must return the same result as y.equals(x).',
        'Transitive: if x.equals(y) and y.equals(z) are both true, then x.equals(z) must also be true.',
        'Consistent: repeated calls to x.equals(y) must keep returning the same result, provided neither object\'s relevant state changes.',
        'Non-null: x.equals(null) must always return false, never throw a NullPointerException.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: '@Override\npublic boolean equals(Object other) {\n    if (this == other) return true;                                    // Reflexive short-circuit\n    if (other == null || getClass() != other.getClass()) return false; // Non-null + type check\n    Order order = (Order) other;\n    return Objects.equals(this.id, order.id)\n        && Objects.equals(this.customerEmail, order.customerEmail);\n}'
    },
    {
      type: 'section',
      title: '2. The hashCode() Contract & Its Bond with equals()',
      content: 'hashCode() carries its own, narrower contract: it must return the same integer across repeated calls within a single execution provided no equals()-relevant field changes, and — critically — two objects that are equal according to equals() must produce the exact same hashCode(). The reverse is not required: two unequal objects are permitted to share a hash code (a "collision"), which hash-based collections are explicitly designed to tolerate. What they cannot tolerate is the forward direction being violated.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The Classic Bug: Overriding equals() Without hashCode()',
      content: 'If you override equals() but leave the inherited Object.hashCode() (which is identity-based) in place, two objects that are logically equal will almost certainly land in different hash buckets. A HashSet or HashMap will then treat them as distinct entries even though equals() says they are the same — a bug that compiles cleanly and often passes casual manual testing.'
    },
    {
      type: 'section',
      title: '3. Why Violating the Contract Breaks Hash-Based Collections',
      content: 'HashMap and HashSet use a two-step lookup: first they call hashCode() to jump directly to the correct bucket, then they call equals() only against the (usually few) candidates already in that bucket to find an exact match. If hashCode() is inconsistent with equals(), the second step never even runs against the right bucket — the object is not "almost found," it is invisible to contains() and get() entirely, even though it is sitting right there in the collection\'s internal array.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'public class BrokenPoint {\n    int x, y;\n\n    // equals() correctly overridden...\n    @Override\n    public boolean equals(Object o) {\n        if (!(o instanceof BrokenPoint p)) return false;\n        return x == p.x && y == p.y;\n    }\n    // ...but hashCode() was never touched — still identity-based\n}\n\nSet<BrokenPoint> visited = new HashSet<>();\nvisited.add(new BrokenPoint(3, 4));\n\nboolean found = visited.contains(new BrokenPoint(3, 4)); // false! Wrong bucket entirely.'
    },
    {
      type: 'section',
      title: '4. getClass() vs. instanceof: The Inheritance Symmetry Trap',
      content: 'A subtler contract violation appears in inheritance hierarchies. Using instanceof in equals() allows a subclass instance to equal a superclass instance (or vice versa), which sounds convenient but frequently breaks symmetry the moment the subclass adds its own equals()-relevant field: a superclass instance can consider itself equal to a subclass instance, while the subclass instance — correctly comparing its extra field — considers itself unequal to the superclass instance. Using getClass() instead enforces exact-class equality, restoring symmetry and transitivity, at the cost of two instances of sibling subclasses never being able to equal each other, even if all shared fields match.'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'instanceof check',
          content: 'Allows cross-subclass equality, which reads naturally, but breaks symmetry the moment any subclass adds new equals()-relevant state.'
        },
        {
          label: 'getClass() check',
          content: 'Enforces exact-class matching, preserving the full equals() contract reliably across any inheritance hierarchy, at the cost of disallowing equality between sibling subclasses.'
        }
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Joshua Bloch\'s Advice',
      content: 'Effective Java recommends favoring composition over inheritance for value classes entirely: rather than extending a concrete class to add a field, wrap it as a private field in a new class. This sidesteps the equals()-symmetry problem structurally instead of choosing between two imperfect implementations.'
    },
    {
      type: 'section',
      title: '5. Effective Generation: Objects.hash(), IDEs, and Records',
      content: 'Hand-writing hashCode() correctly — combining fields with a well-distributed multiplier, traditionally 31 — is mechanical, tedious, and error-prone to review by eye. Objects.hash(Object... values) provides a convenient, if not maximally performant, general-purpose implementation; IDEs generate an equivalent but typically faster hand-unrolled version; and starting with Java 16, records generate a correct, contract-compliant equals() and hashCode() automatically from their component list, with zero risk of the classic mismatch bug.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Objects.hash() — convenient, contract-correct, slight per-call boxing overhead\n@Override\npublic int hashCode() {\n    return Objects.hash(id, customerEmail);\n}\n\n// A record generates a correct, matching equals()/hashCode()/toString() automatically\npublic record OrderId(String value) {}'
    },
    {
      type: 'section',
      title: '6. Mutable Fields as Hash Keys: The Silent Corruption Bug',
      content: 'Even a perfectly correct equals()/hashCode() pair can be defeated at runtime if an object is mutated after being inserted into a HashSet or used as a HashMap key. The object is stored according to the hash code it had at insertion time; if a field participating in hashCode() later changes, the object effectively "moves" to a different logical bucket without actually moving in memory — contains() and get() will fail to locate it by its new state, yet iterating the entire collection will still show it sitting there, unreachable by lookup.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'Set<MutablePoint> points = new HashSet<>();\nMutablePoint p = new MutablePoint(1, 1);\npoints.add(p);\n\np.setX(99); // Mutates a field that participates in hashCode()\n\nboolean stillFindable = points.contains(p);               // false — hash code changed, wrong bucket now\nboolean stillPresent = points.iterator().next().equals(p); // true — the object is still there, just unreachable by lookup'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Rule of Thumb',
      content: 'Never use a mutable object as a HashMap key or HashSet element unless you can absolutely guarantee its equals()/hashCode()-relevant fields will never change while it remains in the collection. This is one of the strongest practical arguments for designing key and value-object types as immutable.'
    },
    {
      type: 'section',
      title: '7. Designing Immutable Classes: The Core Checklist',
      content: 'Immutability is not a single keyword — it is a design discipline enforced across every part of a class, and getting even one piece wrong (a leaked mutable reference, a non-final field visible to a data race) silently reintroduces the exact bugs immutability exists to prevent.'
    },
    {
      type: 'checklist',
      title: 'Effective Java\'s Immutability Checklist',
      items: [
        'Do not provide any method that modifies the object\'s observable state (no setters).',
        'Ensure the class cannot be subclassed in a way that adds mutable behavior — make the class final, or make all constructors private with static factory methods.',
        'Make every field private and final.',
        'Ensure exclusive access to any mutable component the object holds — never let a reference to a mutable internal field escape unguarded.',
        'Perform defensive copies of any mutable objects passed into the constructor and any mutable objects returned from accessors.'
      ]
    },
    {
      type: 'code',
      language: 'java',
      code: 'public final class Money {\n    private final BigDecimal amount;\n    private final Currency currency;\n\n    public Money(BigDecimal amount, Currency currency) {\n        this.amount = Objects.requireNonNull(amount);\n        this.currency = Objects.requireNonNull(currency);\n    }\n\n    public Money add(Money other) {\n        if (!this.currency.equals(other.currency)) {\n            throw new IllegalArgumentException("Currency mismatch");\n        }\n        return new Money(this.amount.add(other.amount), this.currency); // Returns a new instance\n    }\n\n    public BigDecimal getAmount() { return amount; } // BigDecimal is itself immutable — safe to return directly\n}'
    },
    {
      type: 'section',
      title: '8. Defensive Copying: Protecting Construction and Accessors',
      content: 'Declaring a field final only prevents the field\'s reference from being reassigned — it does nothing to stop the object that reference points to from being mutated by whoever else holds a reference to it. True immutability requires defensive copying at two boundaries: on the way in, copy any caller-supplied mutable argument before storing it, so the caller cannot mutate your internal state after construction; and on the way out, copy (or return an unmodifiable view of) any internally-held mutable object before handing it back, so the caller cannot mutate your internal state via the getter.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'public final class Schedule {\n    private final List<LocalDate> meetingDates;\n\n    public Schedule(List<LocalDate> meetingDates) {\n        // Defensive copy on the way in — ignores later mutation of the caller\'s list\n        this.meetingDates = new ArrayList<>(meetingDates);\n    }\n\n    public List<LocalDate> getMeetingDates() {\n        // Defensive copy (or unmodifiable view) on the way out\n        return Collections.unmodifiableList(meetingDates);\n    }\n}'
    },
    {
      type: 'section',
      title: '9. Immutability & Thread Safety: Safe Publication via Final Fields',
      content: 'Because an immutable object\'s state can never change after construction, it is inherently thread-safe and can be freely shared across threads with no synchronization whatsoever — there is no mutable state for a data race to corrupt. The Java Memory Model reinforces this at the language level: the final field semantics of the JMM guarantee that as long as an object is properly constructed (its final fields are fully assigned before the reference to the object escapes the constructor), any thread that later obtains a reference to that object is guaranteed to see the correctly initialized final field values, with no additional synchronization required — a much stronger guarantee than ordinary field visibility.'
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Ties Back to the JMM',
      content: 'This "safe publication" guarantee is exactly why immutable value objects are the simplest possible building block for concurrent architectures — they sidestep the happens-before reasoning that mutable shared state otherwise demands entirely.'
    },
    {
      type: 'section',
      title: '10. Records: Java\'s Built-In Immutable Data Carriers',
      content: 'A record declares its state once, as a list of components, and the compiler generates a canonical constructor, private final fields, public accessors, and a contract-correct equals()/hashCode()/toString() — all automatically. A compact constructor lets you insert validation or normalization logic without repeating the field assignments, which the compiler still generates for you afterward.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'public record OrderLine(String sku, int quantity, BigDecimal unitPrice) {\n    // Compact constructor: validate without re-declaring field assignments\n    public OrderLine {\n        if (quantity <= 0) {\n            throw new IllegalArgumentException("Quantity must be positive");\n        }\n        unitPrice = unitPrice.setScale(2, RoundingMode.HALF_UP); // Normalize before assignment\n    }\n\n    public BigDecimal lineTotal() {\n        return unitPrice.multiply(BigDecimal.valueOf(quantity));\n    }\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'What Records Cannot Do',
      content: 'Records cannot extend another class (they implicitly extend Record), cannot declare additional instance fields beyond their components, and are implicitly final. They fit transparent data carriers, not every immutable class — an entity requiring inheritance or non-component internal state still needs a hand-written immutable class.'
    },
    {
      type: 'section',
      title: '11. Value-Based Classes & the == Trap',
      content: 'Several JDK types — including the primitive wrapper classes and java.time types like LocalDate — are documented as value-based classes: their instances are considered interchangeable purely on the basis of equals(), and code should never rely on their reference identity, because the JDK explicitly reserves the right to reuse instances internally as a caching optimization, and future Project Valhalla value types may not guarantee stable identity at all. The Integer cache is the most common place this bites developers, because it appears to work for a deceptively wide range of everyday values.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'Integer a = 127;\nInteger b = 127;\nSystem.out.println(a == b); // true — both draw from the cached Integer pool (-128 to 127)\n\nInteger c = 128;\nInteger d = 128;\nSystem.out.println(c == d); // false — outside the cache range, two distinct objects\n\n// Always compare value-based classes with equals(), never ==\nSystem.out.println(c.equals(d)); // true, and the only reliable answer'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'BigDecimal: equals() Is Not compareTo()',
      content: 'BigDecimal.equals() considers scale part of equality, so new BigDecimal("2.0").equals(new BigDecimal("2.00")) returns false, even though the two values are mathematically identical. compareTo() correctly treats them as equal. Using BigDecimal as a HashMap key compared via equals() is a frequent source of "duplicate" entries that a naive test suite never catches.'
    },
    {
      type: 'section',
      title: '12. Pre-Merge Review: Bringing the Rules Together',
      content: 'Bringing every rule together into a single review pass catches the overwhelming majority of real-world equals()/hashCode()/immutability defects before they ever reach production.'
    },
    {
      type: 'checklist',
      title: 'Pre-Merge equals() / hashCode() / Immutability Review',
      items: [
        'Every field used in equals() is also used in hashCode(), and vice versa — no partial overlap.',
        'equals() and hashCode() only reference immutable (or never-mutated-after-insertion) fields if the object may ever be used as a hash key.',
        'equals() checks the null and identity ("this == other") cases before any field comparison.',
        'Classes intended for use as map keys or set elements are effectively immutable.',
        'Mutable objects passed into a constructor or returned from an accessor of an immutable class are defensively copied.',
        'BigDecimal, arrays, and other equals()-quirky types are compared with the correct method (compareTo, Arrays.equals) rather than assumed default behavior.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Correct equals() and hashCode() are a matched pair, not two independent methods — get one right without the other and hash-based collections silently misbehave. Favor getClass() over instanceof (or composition over inheritance) to preserve symmetry across subclasses, treat mutable objects as unsafe hash keys, and default to immutable design — final fields, no setters, defensive copying — both to eliminate an entire class of contract-violation bugs and to get thread safety for free via the JMM\'s final-field safe-publication guarantee. Records give you all of this automatically for simple data carriers, but the underlying rules still govern every hand-written class you design.'
    }
  ],
  explanation: 'An enterprise-grade masterclass covering the equals() and hashCode() contracts, why hash-based collections silently break under contract violations, the getClass() vs. instanceof symmetry trap in inheritance hierarchies, effective hashCode() generation via Objects.hash() and records, the mutable-hash-key corruption bug, immutable class design and defensive copying, safe publication of immutable objects via the JMM\'s final-field guarantees, records as built-in immutable data carriers, value-based class and Integer-caching gotchas, and a pre-merge review checklist tying every rule together.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;