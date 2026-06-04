import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const prompt = 'A senior developer gives a junior engineer an important feature and says, “You own this now.” After that, the senior developer barely checks in until the deadline, then discovers the work is off track.\n\nWhat went wrong with this delegation, and what should good delegation look like instead?';

const problem = defineLearningProblem({
  id: 'management-track-delegation-without-abandonment-learning-001',
  category: 'engineering-leadership',
  topicId: 'management-track',
  title: 'Delegation Without Abandonment',
  difficulty: 'Medium',
  estimatedTimeSeconds: 240,
  tags: [
    'engineering-leadership',
    'management-track',
    'delegation',
    'ownership',
    'mentorship',
    'technical-leadership',
    'delivery-quality'
  ],
  rendering: {
    variant: 'deep-dive',
    density: 'compact',
    accent: 'blue'
  },
  prompt,
  question: prompt,
  body: [
    {
      type: 'section',
      title: 'Big idea',
      content: 'Delegation is not disappearing. Good delegation transfers meaningful ownership while keeping enough context, support, and visibility for the person to succeed safely.'
    },
    {
      type: 'comparison',
      title: 'Three delegation styles',
      items: [
        {
          label: 'Abandonment',
          content: 'The senior developer gives the work away, provides little context, and waits until the deadline to inspect the result. The junior engineer is left guessing while risk grows silently.'
        },
        {
          label: 'Micromanagement',
          content: 'The senior developer assigns the work but keeps control of every choice. Delivery may feel safer in the short term, but the other person does not build real judgment or ownership.'
        },
        {
          label: 'Good delegation',
          content: 'The senior developer explains the goal, success criteria, constraints, and review points, then gives the junior engineer room to make decisions while staying available for help.'
        }
      ]
    },
    {
      type: 'checklist',
      title: 'What to clarify before handing off work',
      items: [
        'What problem are we solving, and why does it matter?',
        'What does a successful outcome look like?',
        'Which constraints, risks, dependencies, or non-negotiables should be known upfront?',
        'What decisions can the assignee make independently?',
        'When should we check progress, review trade-offs, or escalate risk?'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Common mistake',
      content: 'Some seniors call it empowerment when they simply stop paying attention. That is not trust; it is missing leadership. Trust still needs shared context and early risk detection.'
    },
    {
      type: 'section',
      title: 'Better leadership mental model',
      content: 'A strong senior developer says: “Here is the goal, why it matters, what good looks like, what constraints matter, when we will check progress, and where you can ask for help.” That keeps ownership with the junior engineer without leaving them isolated.'
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'Good delegation balances trust, accountability, learning, and delivery quality. You do not take the work back, and you do not vanish. You create the conditions for someone else to own the work successfully.'
    }
  ],
  explanation: 'The delegation failed because ownership was handed over without enough context, success criteria, guardrails, or checkpoints. Good delegation is not micromanagement, but it is also not abandonment. The senior developer should explain the goal and constraints, agree on what good looks like, create review points that catch risk early, and stay available for support while letting the junior engineer make meaningful decisions.',
  starterThought: 'Ask what information and support the junior engineer needed before they could safely own the work.',
  hints: [
    'Delegation should transfer ownership, not confusion.',
    'A checkpoint is not micromanagement when it is used to detect risk early.',
    'The goal is both delivery and growth.'
  ],
  relatedConcepts: [
    'delegation',
    'ownership',
    'guardrails',
    'mentorship',
    'accountability',
    'technical leadership'
  ],
  followUpQuestions: [
    'What would you say in the handoff conversation before the junior engineer starts?',
    'How would you set checkpoints without taking control away from the assignee?'
  ],
  finalTakeaway: 'Delegation means ownership with context, support, and early risk detection — not control, and not disappearance.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 240
  }
});

export default problem;
