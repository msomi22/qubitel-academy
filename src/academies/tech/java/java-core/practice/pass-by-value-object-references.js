import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineMcqProblem({
  id: 'java-core-pass-by-value-object-references-001',
  topicId: 'java-core',
  title: 'Java Pass‑by‑Value and Object References',
  difficulty: 'Medium',
  prompt: 'A method receives a Dog object reference, then reassigns the method parameter to a new Dog. What is printed, and what happens to the caller\'s original dog variable? Explain why reassigning the parameter does not affect the caller, but mutating the object does.',
  options: [
    'It prints Max because the caller\'s dog variable is reassigned to the new Dog("Max").',
    'It prints Buddy because the caller\'s dog variable still points to the original Dog("Buddy").',
    'It prints Max because Java passes objects by reference, so dog and pet are the same variable slot.',
    'It prints Buddy because the method mutated the object, but the caller\'s variable still points to the original object.',
    'The code will not compile because Java objects cannot be passed to methods.'
  ],
  correctAnswer: 'It prints Buddy because the caller\'s dog variable still points to the original Dog("Buddy").',
  explanation: 'Java is pass‑by‑value. For objects, the value being copied is the reference value (the "address" of the object). The method parameter `pet` gets its own copy of that reference value. Reassigning `pet = new Dog("Max")` makes only the local `pet` variable point somewhere else; it does not change the caller\'s `dog` variable. However, if the method uses the copied reference to mutate the object (e.g., `pet.name = "Max"`), the caller observes that change because both `dog` and `pet` point to the same object — the reference was copied, not the object itself. This is the key distinction: Java copies references, not objects, but it does not pass the caller\'s variable slot itself.',
  mentalPicture: 'Imagine `dog` is a remote control pointing at a TV. When you call `changeName(dog)`, Java copies the remote control and hands the copy to the method. The method uses its copy. If the method uses its copy to press "Power" (mutate the object), the TV changes for both remotes. If the method instead points its copy at a different TV (`pet = new Dog("Max")`), the original remote still points at the original TV. The caller\'s remote was never touched.',
  visualExplanation: 'Reference copy model (pass‑by‑value):\n\ndog (main) ──────────────┐\n                          ▼\n                     Dog #1: "Buddy"\n                          ▲\npet (changeName) ────────┘\n\nAfter `pet = new Dog("Max")`:\n\ndog (main) ──────────────┐\n                          ▼\n                     Dog #1: "Buddy"\n\npet (changeName) ────────┐\n                          ▼\n                     Dog #2: "Max"\n\nThe caller\'s `dog` still points to Dog #1. The method\'s `pet` now points to Dog #2. The caller never sees Dog #2.\n\nWith mutation (`pet.name = "Max"`):\n\ndog (main) ──────────────┐\n                          ▼\n                     Dog #1: "Max"  ← both dog and pet see the change\n                          ▲\npet (changeName) ────────┘',
  productionReality: 'In production Java code, understanding pass‑by‑value is essential when writing builders, factories, or any method that receives an object and "transforms" it. Methods that reassign parameters are usually a code smell — they mislead readers into thinking the caller will be affected. Use `final` parameters to prevent accidental reassignment. For builder patterns, always return `this` from setter methods rather than reassigning a parameter. In frameworks like Spring, understanding that method parameters are copies of references helps when debugging dependency injection and proxy behavior.',
  commonMistake: 'A common mistake is believing that Java passes objects by reference (like C++ reference parameters). It does not. Java passes the reference value by value. Another common mistake is confusing reassignment (`pet = new Dog(...)`) with mutation (`pet.name = ...`). Reassignment affects only the local parameter; mutation affects the shared object. A third mistake is trying to write a generic `swap` method for objects — it cannot work because reassigning parameters doesn\'t affect the caller\'s variables.',
  finalTakeaway: 'Java is always pass‑by‑value. For objects, the value is a reference to the object. Reassigning the method parameter changes only the local copy of the reference. Mutating the object through that reference changes the object shared with the caller. Use `final` parameters to guard against accidental reassignment, and remember that the classic `swap` anti‑pattern fails in Java.',
  tags: ['java', 'references', 'oop', 'pass-by-value'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'blue'
  },
  body: [
    {
      type: 'section',
      title: 'Problem setup',
      content: 'We want to know whether assigning a method parameter to a new object changes the original variable in the caller. The example below keeps the code in one proper block so it is easier to read.'
    },
    {
      type: 'code',
      title: 'Code example: parameter reassignment',
      language: 'java',
      code: 'class Dog {\n    String name;\n\n    Dog(String name) {\n        this.name = name;\n    }\n}\n\npublic class Demo {\n    static void changeName(Dog pet) {\n        pet = new Dog("Max");\n    }\n\n    public static void main(String[] args) {\n        Dog dog = new Dog("Buddy");\n\n        changeName(dog);\n\n        System.out.println(dog.name);\n    }\n}'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Question to answer',
      content: 'What does this print, and did `changeName` replace the caller\'s original `dog` variable?'
    },
    {
      type: 'section',
      title: 'Teacher explanation',
      content: 'Think of `dog` as a remote control pointing to a Dog object. When `changeName(dog)` is called, Java copies the remote control and gives the copy to the method. Inside the method, `pet` is the copied remote. When `pet = new Dog("Max")` runs, only the copied remote points to a new dog. The original `dog` remote in `main` still points to `Buddy`.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The "pass by reference" myth',
      content: 'Some people say "Java passes objects by reference." This is incorrect and leads to confusion. Java passes the **value** of the reference (the address of the object). The reference is copied, not the object, and not the caller\'s variable slot. This is why reassigning the parameter does not affect the caller.'
    },
    {
      type: 'section',
      title: 'Visual walkthrough: Reassignment',
      content: 'The following steps show how reassignment affects only the local parameter.'
    },
    {
      type: 'checklist',
      title: 'Step‑by‑step walkthrough',
      items: [
        'Step 1: `Dog dog = new Dog("Buddy")` creates one Dog object on the heap and stores a reference to it in the `dog` variable.',
        'Step 2: `changeName(dog)` copies the reference value from `dog` into the method parameter `pet`. Both `dog` and `pet` now point to the same `Dog("Buddy")` object.',
        'Step 3: `pet = new Dog("Max")` creates another Dog object and makes only `pet` point to it. The original `dog` variable in `main` still points to `Dog("Buddy")`.',
        'Step 4: The `pet` variable disappears when the method returns. The original `dog` variable still points to `Dog("Buddy")`.',
        'Result: `System.out.println(dog.name)` prints `Buddy`.'
      ]
    },
    {
      type: 'section',
      title: 'Reassignment versus Mutation: The Critical Distinction',
      content: 'The most common confusion is between reassigning the parameter (which affects only the local copy) and mutating the object through the reference (which affects the shared object). This distinction is why pass‑by‑value can sometimes *look* like pass‑by‑reference when objects are mutated.'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'Parameter reassignment',
          content: '`pet = new Dog("Max")` changes only the local parameter variable. The caller\'s `dog` variable is unchanged. This is what our original example demonstrates.'
        },
        {
          label: 'Object mutation',
          content: '`pet.name = "Max"` changes the object that both `dog` and `pet` currently point to. The caller sees the change because the shared object was mutated, not because the reference was reassigned.'
        }
      ]
    },
    {
      type: 'section',
      title: 'Mutation Example: This Changes the Shared Object',
      content: 'If the method uses the copied reference to mutate the object, the caller observes the change because both the caller and the method point to the same object.'
    },
    {
      type: 'code',
      title: 'Mutation example',
      language: 'java',
      code: 'static void mutateName(Dog pet) {\n    pet.name = "Max";  // Mutates the shared object\n}\n\nDog dog = new Dog("Buddy");\nmutateName(dog);\nSystem.out.println(dog.name); // Prints "Max"'
    },
    {
      type: 'section',
      title: 'Visual Walkthrough: Mutation',
      content: 'Here, `pet` did not point to a new object. It changed the object that `dog` also points to.'
    },
    {
      type: 'checklist',
      title: 'Mutation step‑by‑step',
      items: [
        'Before `pet.name = "Max"`: `dog` and `pet` both point to the same `Dog("Buddy")` object.',
        'After `pet.name = "Max"`: the shared object\'s `name` field is changed to `"Max"`.',
        'Because both `dog` and `pet` point to the same object, `dog.name` is now also `"Max"`.',
        'The caller sees `"Max"` because the object was mutated, not because the reference was reassigned.'
      ]
    },
    {
      type: 'section',
      title: 'The Classic Swap Anti‑Pattern',
      content: 'A common interview question asks: "Write a method that swaps two objects." In Java, this cannot work because reassigning parameters only affects the local copies. This is a classic demonstration of pass‑by‑value.'
    },
    {
      type: 'code',
      title: 'The swap anti‑pattern',
      language: 'java',
      code: '// This does NOT work in Java!\nstatic void swap(Dog a, Dog b) {\n    Dog temp = a;\n    a = b;\n    b = temp;\n}\n\nDog d1 = new Dog("Buddy");\nDog d2 = new Dog("Max");\nswap(d1, d2);\nSystem.out.println(d1.name); // Still "Buddy" — swap had no effect\n\n// To swap, you must use a mutable container or return new values:\nstatic Dog[] swap(Dog[] dogs) {\n    Dog temp = dogs[0];\n    dogs[0] = dogs[1];\n    dogs[1] = temp;\n    return dogs;\n}'
    },
    {
      type: 'section',
      title: 'Pass‑by‑Value with Primitives',
      content: 'Java is pass‑by‑value for **all** types. For primitives, the value itself is copied. For objects, the reference value is copied. This is why a method that reassigns a primitive parameter also does not affect the caller.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// With primitives — same pass‑by‑value behavior\nstatic void increment(int x) {\n    x = x + 1; // Only changes the local parameter copy\n}\n\nint age = 5;\nincrement(age);\nSystem.out.println(age); // Still 5\n\n// For objects — the reference value is copied, not the object itself\nstatic void reassignList(List<String> list) {\n    list = new ArrayList<>(); // Only changes the local parameter copy\n}\n\nList<String> names = new ArrayList<>();\nnames.add("Alice");\nreassignList(names);\nSystem.out.println(names.size()); // Still 1'
    },
    {
      type: 'section',
      title: 'Using `final` Parameters to Prevent Reassignment',
      content: 'You can declare a method parameter `final` to prevent reassignment inside the method. This is a good practice for methods that should not reassign parameters, making the code more predictable and clear.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'static void safeMethod(final Dog pet) {\n    // pet = new Dog("Max"); // Compilation error — pet is final\n    pet.name = "Max"; // Still allowed! Final prevents reassignment, not mutation\n}\n\n// For true immutability, the class itself must be immutable (final fields, no setters)'
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Memory sentence',
      content: 'Java passes everything by value. With objects, the copied value is a reference to an object, not the caller\'s variable itself. Reassign the parameter and you only affect the copy; mutate the object and you change what both copies see.'
    }
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;