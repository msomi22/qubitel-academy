import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineMcqProblem({
  id: 'java-core-pass-by-value-object-references-001',
  topicId: 'java-core',
  title: 'Java Pass-by-Value and Object References',
  difficulty: 'Medium',
  prompt: 'A method receives a Java object reference parameter and assigns the parameter to a new object. What happens to the caller\'s original variable?',
  options: [
    'The caller\'s variable is reassigned to the new object.',
    'The caller\'s variable still points to the original object.',
    'Java passes all objects by reference, so both variables become aliases of the new object.',
    'The code will not compile because objects cannot be passed to methods.'
  ],
  correctAnswer: 'The caller\'s variable still points to the original object.',
  explanation: 'Java passes the value of the reference. The method receives a copy of that reference value, so reassigning the parameter does not reassign the caller\'s variable. Mutating the object through the copied reference can still affect the same object.',
  tags: ['java', 'references', 'oop'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
