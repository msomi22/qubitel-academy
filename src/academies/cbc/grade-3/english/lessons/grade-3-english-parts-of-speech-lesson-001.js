import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const learningAreaId = 'parts-of-speech';

const lesson = defineLearningProblem({
  id: 'grade-3-english-parts-of-speech-lesson-001',
  category: 'grade-3',
  topicId: 'english',
  title: 'Parts of Speech',
  difficulty: 'Easy',
  estimatedTimeSeconds: 720,
  question: 'Learn the words we use to name things, show actions, tell more, join ideas, and show feelings.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can name the main parts of speech and explain the job each word does in a simple sentence.'
    },
    {
      type: 'section',
      title: 'Words Do Different Jobs',
      content: 'Words do different jobs in a sentence. Some words name people, places, animals, or things. Some words show actions. Some words tell us more about other words. Some words join ideas together. These word groups are called parts of speech.'
    },
    {
      type: 'checklist',
      title: 'You will learn',
      items: [
        '👦 Nouns',
        '🙋 Pronouns',
        '🏃 Verbs',
        '🎨 Adjectives',
        '⚡ Adverbs',
        '📍 Prepositions',
        '🔗 Conjunctions',
        '😲 Interjections',
        '🔤 Articles'
      ]
    },
    {
      type: 'section',
      title: '1. Nouns',
      content: 'A noun is a naming word. It names a person, place, animal, or thing. Visual examples: boy, teacher, school, dog, book. Sentence: The boy carries a book to school. boy names a person, book names a thing, and school names a place. Mini practice: Find the nouns in "The dog sits near the tree." Answer: dog and tree.'
    },
    {
      type: 'table',
      title: 'Noun Visual Examples',
      columns: ['Picture', 'Word', 'Type'],
      rows: [
        ['👦', 'boy', 'person'],
        ['👩‍🏫', 'teacher', 'person'],
        ['🏫', 'school', 'place'],
        ['🐶', 'dog', 'animal'],
        ['📘', 'book', 'thing']
      ]
    },
    {
      type: 'section',
      title: '2. Pronouns',
      content: 'A pronoun is a word we use instead of a noun. It helps us avoid repeating the same name again and again. Mary is reading. She is happy. She is a pronoun because it is used instead of saying Mary again. Mini practice: Amina is writing. ____ is using a pencil. Answer: She.'
    },
    {
      type: 'table',
      title: 'Pronoun Examples',
      columns: ['Noun', 'Pronoun'],
      rows: [
        ['Mary', 'she'],
        ['John', 'he'],
        ['dog', 'it'],
        ['children', 'they'],
        ['my friend and I', 'we']
      ]
    },
    {
      type: 'section',
      title: '3. Verbs',
      content: 'A verb is an action word. It tells us what someone or something does. Visual examples: 🏃 run, 🤸 jump, 🍽️ eat, ✍️ write, and 🎶 sing. Sentence: The boy runs. runs is the verb because it tells us what the boy does. Mini practice: Find the verb in "The girl reads a story." Answer: reads.'
    },
    {
      type: 'table',
      title: 'Verb Visual Examples',
      columns: ['Picture', 'Verb'],
      rows: [
        ['🏃', 'run'],
        ['🤸', 'jump'],
        ['🍽️', 'eat'],
        ['✍️', 'write'],
        ['🎶', 'sing']
      ]
    },
    {
      type: 'section',
      title: '4. Adjectives',
      content: 'An adjective tells us more about a person, animal, place, or thing. It can tell us color, size, shape, feeling, number, or how something looks. Sentence: The happy girl has a red bag. happy tells us more about the girl. red tells us more about the bag. Mini practice: Find the adjectives in "The small boy has a blue pencil." Answer: small and blue.'
    },
    {
      type: 'table',
      title: 'Adjective Visual Examples',
      columns: ['Picture', 'Words', 'What the adjective tells us'],
      rows: [
        ['🔴', 'red ball', 'color'],
        ['🐘', 'big elephant', 'size'],
        ['😊', 'happy child', 'feeling'],
        ['🧼', 'clean classroom', 'how it looks'],
        ['3️⃣', 'three pencils', 'number']
      ]
    },
    {
      type: 'section',
      title: '5. Adverbs',
      content: 'An adverb tells us more about an action. It can tell us how an action happens, when an action happens, or where an action happens. Sentence: The girl reads slowly. slowly is an adverb because it tells us how the girl reads. Mini practice: Find the adverb in "The rabbit jumps quickly." Answer: quickly.'
    },
    {
      type: 'table',
      title: 'Adverb Examples',
      columns: ['Question', 'Example', 'Sentence'],
      rows: [
        ['How?', 'quickly', 'The boy runs quickly.'],
        ['How?', 'slowly', 'The old man walks slowly.'],
        ['How?', 'loudly', 'The baby cries loudly.'],
        ['When?', 'today', 'We shall play today.'],
        ['Where?', 'outside', 'The children are playing outside.']
      ]
    },
    {
      type: 'section',
      title: '6. Prepositions',
      content: 'A preposition tells us where something is. It can show position or place. Sentence: The cat is under the table. under is a preposition because it tells us where the cat is. Mini practice: Find the preposition in "The pencil is in the box." Answer: in.'
    },
    {
      type: 'table',
      title: 'Preposition Visual Examples',
      columns: ['Picture idea', 'Preposition', 'Example'],
      rows: [
        ['📦🐱', 'in', 'The cat is in the box.'],
        ['🪑🐱', 'on', 'The cat is on the chair.'],
        ['🪑⬇️🐱', 'under', 'The cat is under the chair.'],
        ['🚪🐱', 'behind', 'The cat is behind the door.'],
        ['🏠🌳', 'near', 'The tree is near the house.']
      ]
    },
    {
      type: 'section',
      title: '7. Conjunctions',
      content: 'A conjunction is a joining word. It joins words or sentences. Sentence: I like mangoes and bananas. and is a conjunction because it joins mangoes and bananas. Mini practice: Find the conjunction in "I like rice and beans." Answer: and.'
    },
    {
      type: 'table',
      title: 'Conjunction Examples',
      columns: ['Conjunction', 'What it does', 'Example'],
      rows: [
        ['and', 'joins things together', 'tea and bread'],
        ['but', 'joins different ideas', 'I am small but strong.'],
        ['or', 'shows a choice', 'Do you want milk or juice?'],
        ['because', 'gives a reason', 'I slept because I was tired.']
      ]
    },
    {
      type: 'section',
      title: '8. Interjections',
      content: 'An interjection is a word that shows a strong feeling. It can show surprise, joy, pain, excitement, or worry. Sentence: Wow! That cake is big. Wow! is an interjection because it shows surprise. Mini practice: Find the interjection in "Oops! I spilled the water." Answer: Oops!'
    },
    {
      type: 'table',
      title: 'Interjection Examples',
      columns: ['Feeling', 'Interjection', 'Example'],
      rows: [
        ['surprise', 'Wow!', 'Wow! That balloon is big.'],
        ['mistake', 'Oops!', 'Oops! I dropped my pencil.'],
        ['joy', 'Hurray!', 'Hurray! We won the game.'],
        ['pain', 'Ouch!', 'Ouch! My foot hurts.'],
        ['sadness', 'Oh no!', 'Oh no! It is raining.']
      ]
    },
    {
      type: 'section',
      title: '9. Articles',
      content: 'An article is a small word used before a noun. The common articles are a, an, and the. I saw a dog. She ate an orange. The sun is hot. Mini practice: I ate ____ apple. Answer: an.'
    },
    {
      type: 'table',
      title: 'Article Examples',
      columns: ['Article', 'Example', 'Explanation'],
      rows: [
        ['a', 'a dog', 'use before one dog'],
        ['an', 'an orange', 'use before words that begin with a vowel sound'],
        ['the', 'the sun', 'use when we are talking about something known']
      ]
    },
    {
      type: 'table',
      title: 'Recap Table',
      columns: ['Part of speech', 'Simple meaning', 'Example'],
      rows: [
        ['Noun', 'A naming word', 'dog, school, book'],
        ['Pronoun', 'Used instead of a noun', 'he, she, it, they'],
        ['Verb', 'An action word', 'run, eat, write'],
        ['Adjective', 'Tells us more about a person, animal, place, or thing', 'big, red, happy'],
        ['Adverb', 'Tells us more about an action', 'quickly, slowly, today'],
        ['Preposition', 'Tells us where something is', 'in, on, under'],
        ['Conjunction', 'A joining word', 'and, but, or'],
        ['Interjection', 'Shows strong feeling', 'Wow!, Oops!, Hurray!'],
        ['Article', 'A small word used before a noun', 'a, an, the']
      ]
    },
    {
      type: 'checklist',
      title: 'Final Practice',
      items: [
        'The teacher is in the classroom. Which word is a noun? Answer: teacher.',
        'The boy jumps high. Which word shows an action? Answer: jumps.',
        'The girl has a red dress. Which word tells us more about the dress? Answer: red.',
        'The dog runs quickly. Which word tells us more about the action? Answer: quickly.',
        'The book is on the table. Which word tells us where the book is? Answer: on.',
        'I like milk and bread. Which word joins milk and bread? Answer: and.',
        'Wow! The rainbow is beautiful. Which word shows surprise? Answer: Wow!',
        'I saw an elephant. Which word is used before the noun elephant? Answer: an.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Mixed example',
      content: 'The dog runs quickly. dog is a noun because it names an animal. runs is a verb because it shows an action. quickly is an adverb because it tells us more about the action.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Mixed example',
      content: 'Wow! The cat is under the table. Wow! shows strong feeling. cat is a noun. under tells us where the cat is. table is a noun.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Mixed example',
      content: 'I ate an orange and a banana. I is a pronoun. ate is an action word. an is an article. orange and banana are nouns. and is a joining word.'
    }
  ],
  explanation: 'Parts of speech help us understand the job each word does in a sentence.',
  finalTakeaway: 'Look at the job a word is doing. A word may name something, show an action, tell us more, show where something is, join words, show feeling, or come before a noun.',
  tags: ['cbc', 'grade-3', 'english', learningAreaId, 'lesson', 'grammar'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'local issue #302 spec',
    audience: 'grade-3',
    gradeId: 'grade-3',
    subjectId: 'english',
    learningAreaId,
    sequence: 90
  }
});

export default lesson;
