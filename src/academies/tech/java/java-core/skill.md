# AI Agent Skill: Qubitel Academy Content Authoring (Java Core)

## Description
This skill defines the standard operating procedure for authoring and registering advanced, highly-structured educational notes (lessons) within the Qubitel Academy java-core module. 

## Target Architecture
Content in this module does not use Markdown or JSON files for lessons. Instead, each lesson is an ES6 JavaScript module located in the lessons/ directory that uses the platform's defineLearningProblem helper.

## Directory Context
* Lessons Path: src/academies/tech/java/java-core/lessons/
* Manifest Path: src/academies/tech/java/java-core/topic.manifest.json

---

## Step 1: Create the Lesson File
Create a new JavaScript file using kebab-case for the filename (e.g., generics-zero-to-hero.js). 

The file must import defineLearningProblem and export a default problem object structured with rich UI blocks.

### Lesson File Template:
import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-unique-kebab-id',
  topicId: 'java-core',
  title: 'Lesson Title',
  difficulty: 'Hard',
  prompt: 'A concise summary explaining what this deep-dive lesson covers.',
  tags: ['java', 'tag1', 'tag2'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'blue'
  },
  body: [
    {
      type: 'section',
      title: 'Section Title',
      content: 'Explanatory paragraph text goes here.'
    },
    {
      type: 'code',
      language: 'java',
      code: 'public class Example {\n    // Java code snippet\n}'
    },
    {
      type: 'checklist',
      title: 'Key Takeaways / List Title',
      items: [
        'First bullet point item.',
        'Second bullet point item.'
      ]
    },
    {
      type: 'comparison',
      items: [
        {
          title: 'Option A Title',
          content: 'Description for option A.'
        },
        {
          title: 'Option B Title',
          content: 'Description for option B.'
        }
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Callout Header',
      content: 'Important rule or warning text.'
    },
    {
      type: 'table',
      columns: ['Column 1', 'Column 2'],
      rows: [
        ['Row 1 Col 1', 'Row 1 Col 2'],
        ['Row 2 Col 1', 'Row 2 Col 2']
      ]
    }
  ],
  explanation: 'Concluding architectural summary or high-level takeaway.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;

---

## Step 2: Register the Lesson in the Manifest
Open topic.manifest.json at the root of the java-core directory. Add the new lesson entry to the lessons array.

### Manifest Entry Format:
{
  "id": "java-core-unique-kebab-id",
  "file": "lessons/your-filename.js"
}

---

## Minimal Input Prompt Shortcut
When instructed to create a new lesson with minimal input, the AI agent should automatically:
1. Formulate a unique kebab-case ID matching the filename.
2. Structure technical explanations into appropriate UI block types (section, code, callout, table, checklist) rather than raw walls of text.
3. Automatically append the entry into topic.manifest.json.