import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineMcqProblem({
  id: 'java-core-pass-by-value-object-references-001',
  topicId: 'java-core',
  title: 'Java Pass-by-Value and Object References',
  difficulty: 'Medium',
  prompt: 'A method receives a Dog object reference, then reassigns the method parameter to a new Dog. What is printed, and what happens to the caller\'s original dog variable?',
  options: [
    'It prints Max because the caller\'s dog variable is reassigned to the new Dog("Max").',
    'It prints Buddy because the caller\'s dog variable still points to the original Dog("Buddy").',
    'It prints Max because Java passes objects by reference, so dog and pet are the same variable slot.',
    'The code will not compile because Java objects cannot be passed to methods.'
  ],
  correctAnswer: 'It prints Buddy because the caller\'s dog variable still points to the original Dog("Buddy").',
  explanation: 'Java is pass-by-value. For objects, the value being copied is the reference value. The method parameter gets its own copy of the reference. Reassigning the parameter makes only the parameter point somewhere else; it does not change the caller\'s variable. But if the method uses the copied reference to mutate the same object, the caller can observe that mutation.',
  tags: ['java', 'references', 'oop'],
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
      content: 'What does this print, and did changeName replace the caller\'s original dog variable?'
    },
    {
      type: 'section',
      title: 'Teacher explanation',
      content: 'Think of dog as a remote control pointing to a Dog object. When changeName(dog) is called, Java copies the remote control and gives the copy to the method. Inside the method, pet is the copied remote. When pet = new Dog("Max") runs, only the copied remote points to a new dog. The original dog remote in main still points to Buddy.'
    },
    {
      type: 'diagram',
      title: 'Visual walkthrough',
      lines: [
        '1) Before method call',
        '',
        'main stack:',
        '  dog ───────────────┐',
        '                      ▼',
        'heap:',
        '  Dog object #1 { name: "Buddy" }',
        '',
        '2) When changeName(dog) is called',
        '',
        'main stack:             changeName stack:',
        '  dog ───────────────┐     pet ─────────┐',
        '                      ▼                 │',
        'heap:                                   │',
        '  Dog object #1 { name: "Buddy" } ◄─────┘',
        '',
        'Both dog and pet point to the same Dog object, but dog and pet are two different variables.',
        '',
        '3) Inside changeName: pet = new Dog("Max")',
        '',
        'main stack:             changeName stack:',
        '  dog ───────────────┐     pet ─────────┐',
        '                      ▼                 ▼',
        'heap:',
        '  Dog object #1 { name: "Buddy" }   Dog object #2 { name: "Max" }',
        '',
        'Only pet was redirected. dog was not touched.',
        '',
        '4) After the method returns',
        '',
        'main stack:',
        '  dog ───────────────┐',
        '                      ▼',
        'heap:',
        '  Dog object #1 { name: "Buddy" }',
        '',
        'So System.out.println(dog.name) prints Buddy.'
      ],
      caption: 'The key mental picture: Java copied the reference value into pet. It did not give the method access to the caller\'s dog variable slot.'
    },
    {
      type: 'flow',
      title: 'Visual walkthrough as steps',
      steps: [
        {
          title: 'Create the original object',
          detail: 'Dog dog = new Dog("Buddy") creates one Dog object on the heap and stores a reference to it in the dog variable.'
        },
        {
          title: 'Call the method',
          detail: 'changeName(dog) copies the reference value from dog into the method parameter pet.'
        },
        {
          title: 'Reassign the parameter',
          detail: 'pet = new Dog("Max") creates another Dog object and makes only pet point to it.'
        },
        {
          title: 'Return to the caller',
          detail: 'The pet variable disappears when the method ends. The original dog variable still points to Dog("Buddy").'
        }
      ]
    },
    {
      type: 'comparison',
      title: 'Reassignment versus mutation',
      items: [
        {
          label: 'Parameter reassignment',
          content: 'pet = new Dog("Max") changes only the local parameter variable. The caller\'s dog variable is unchanged.'
        },
        {
          label: 'Object mutation',
          content: 'pet.name = "Max" would change the object that both dog and pet currently point to, so the caller would see the new name.'
        }
      ]
    },
    {
      type: 'code',
      title: 'Mutation example: this changes the shared object',
      language: 'java',
      code: 'static void mutateName(Dog pet) {\n    pet.name = "Max";\n}\n\nDog dog = new Dog("Buddy");\nmutateName(dog);\nSystem.out.println(dog.name); // Max'
    },
    {
      type: 'diagram',
      title: 'Mutation visual picture',
      lines: [
        'Before pet.name = "Max"',
        '',
        'dog ──┐',
        '      ▼',
        '  Dog object #1 { name: "Buddy" }',
        '      ▲',
        'pet ──┘',
        '',
        'After pet.name = "Max"',
        '',
        'dog ──┐',
        '      ▼',
        '  Dog object #1 { name: "Max" }',
        '      ▲',
        'pet ──┘',
        '',
        'Here pet did not point to a new object. It changed the object that dog also points to.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Memory sentence',
      content: 'Java passes everything by value. With objects, the copied value is a reference to an object, not the caller\'s variable itself.'
    }
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
