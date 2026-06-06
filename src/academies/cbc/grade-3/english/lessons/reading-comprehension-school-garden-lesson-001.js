import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

export const schoolGardenPassage = `On Friday morning, Grade Three learners visited the school garden with their teacher, Miss Amina. The garden was behind the classroom, near the water tank. It had rows of sukuma wiki, spinach, carrots, and tomatoes.

Miss Amina asked the learners to walk carefully between the rows. She showed them how to remove weeds without pulling out the young plants. Brian carried a small watering can, while Nia collected dry leaves in a basket. The dry leaves would later be used to make compost.

After watering the plants, the learners sat under a tree. Miss Amina explained that plants need soil, water, air, and sunlight to grow well. She also reminded the class not to waste water because the school garden helped provide vegetables for lunch.

Before going back to class, each learner drew one plant they had seen. Nia drew a tomato plant with small green tomatoes. Brian drew carrots growing in the soil. The learners were happy because they had learned how to care for plants and keep the garden clean.`;

const lesson = defineLearningProblem({
  id: 'english-reading-comprehension-school-garden-lesson-001',
  category: 'grade-3',
  topicId: 'english',
  title: 'Reading Comprehension: A Visit to the School Garden',
  difficulty: 'Easy',
  estimatedTimeSeconds: 420,
  question: 'Read the passage and learn how to answer questions using details from the text.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can read a short passage carefully and answer questions using details from the text.'
    },
    {
      type: 'section',
      title: 'How to read the passage',
      content: 'Read slowly. Notice who is in the passage, where they are, what they do first, what happens next, and what lesson they learn.'
    },
    {
      type: 'section',
      title: 'A Visit to the School Garden',
      content: schoolGardenPassage
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Remember',
      content: 'When answering a reading question, go back to the passage and look for the words that support your answer.'
    }
  ],
  explanation: 'Reading comprehension means understanding a passage and using its details to answer questions.',
  finalTakeaway: 'Read the passage carefully, find the important details, and use the passage to choose your answer.',
  tags: ['cbc', 'grade-3', 'english', 'reading-comprehension', 'lesson'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    sequence: 70
  }
});

export default lesson;
