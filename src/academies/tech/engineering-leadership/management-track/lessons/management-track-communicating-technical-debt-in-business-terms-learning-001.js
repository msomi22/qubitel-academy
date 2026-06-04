import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const prompt = 'A product stakeholder wants the team to keep shipping features quickly. The team has been working around an old part of the system that is slow to change, poorly tested, and frequently causes regressions. Engineers keep saying “this is technical debt,” but the business side does not understand why it should matter now.\n\nHow should a senior developer or engineering lead explain the technical debt in business terms and propose a practical path forward?';

const problem = defineLearningProblem({
  id: 'management-track-communicating-technical-debt-in-business-terms-learning-001',
  category: 'engineering-leadership',
  topicId: 'management-track',
  title: 'Communicating Technical Debt in Business Terms',
  difficulty: 'Medium',
  estimatedTimeSeconds: 300,
  tags: [
    'engineering-leadership',
    'management-track',
    'technical-debt',
    'stakeholder-communication',
    'trade-offs',
    'delivery-risk',
    'technical-leadership',
    'business-impact'
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
      content: 'Technical debt becomes easier to discuss when it is translated from engineering discomfort into concrete consequences. A senior developer should explain what the debt is making slower, riskier, more expensive, harder to maintain, or harder to change. The goal is not to win an argument about code quality. The goal is to help the team make an informed trade-off.'
    },
    {
      type: 'comparison',
      title: 'Vague debt complaint vs business-impact framing',
      items: [
        {
          label: 'Vague complaint',
          content: '“This area has too much technical debt.” This may be true, but it does not explain the practical cost or help stakeholders decide what to do next.'
        },
        {
          label: 'Rewrite-first framing',
          content: '“We need to pause feature work and clean this up first.” This may sound responsible, but it can be too broad if the leader has not separated urgent risk from general messiness.'
        },
        {
          label: 'Business-impact framing',
          content: '“This area has low test coverage, so changes take longer to validate and create higher regression risk. We can ship the feature, but I recommend adding coverage around the affected path first.” This connects the debt to delivery, risk, and a practical option.'
        }
      ]
    },
    {
      type: 'table',
      title: 'Technical debt signal, business impact, and practical response',
      columns: ['Technical debt signal', 'Business impact', 'Practical leadership response'],
      rows: [
        [
          'Low test coverage around a risky path',
          'Every change takes longer to validate and has a higher chance of regression or rework.',
          'Add focused coverage around the affected path before or alongside the feature instead of asking for a broad cleanup.'
        ],
        [
          'Small changes require touching many unrelated files',
          'Delivery becomes slower and mistakes are harder to catch because the change surface is too wide.',
          'Offer options: make a narrow change now with extra review, or spend a small fixed amount of time isolating the risky logic.'
        ],
        [
          'Only a few engineers understand the old module',
          'Onboarding is slower and delivery depends on a small group of people, increasing bottleneck and continuity risk.',
          'Reduce risk through documentation, pairing, ownership rotation, or incremental simplification rather than a sudden rewrite.'
        ],
        [
          'Recurring regressions in the same area',
          'Customer trust and engineering confidence decline because similar problems keep returning.',
          'Treat the next fix as a chance to prevent the class of issue, not just patch the visible symptom.'
        ]
      ]
    },
    {
      type: 'checklist',
      title: 'How to explain technical debt well',
      items: [
        'Name the concrete technical constraint without overloading the conversation with jargon.',
        'Explain the impact in terms of delivery time, regression risk, customer impact, support load, onboarding friction, or opportunity cost.',
        'Separate urgent risk from general code messiness.',
        'Offer options instead of only asking for cleanup time.',
        'Recommend the smallest responsible action that reduces the most important risk.',
        'Make the trade-off explicit: what happens if the team fixes it now, schedules it later, contains it, or accepts it temporarily.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Common mistake',
      content: 'Do not use “technical debt” as a magic phrase that should automatically win priority. Stakeholders usually need to understand the consequence of the debt, the cost of fixing it, the cost of ignoring it, and the options available. Without that translation, the message can sound like engineering is blocking progress or asking for cleanup because the code feels uncomfortable.'
    },
    {
      type: 'section',
      title: 'Better communication examples',
      content: 'Weak: “We cannot build this properly because the codebase has too much technical debt.”\n\nBetter: “This part of the system has very little test coverage, so every change takes longer to validate and creates a higher regression risk. We can still deliver the feature, but I recommend adding coverage around the affected path first so we reduce the chance of rework or production issues.”\n\nOverly technical: “The service boundaries are wrong, the abstractions are leaky, and the module needs a full refactor.”\n\nBetter: “The current design means a small pricing change touches several unrelated files. That increases delivery time and makes mistakes harder to catch. We have two options: make a narrow change now with extra testing, or spend two days separating the pricing logic so future pricing changes are safer and faster.”\n\nAll-or-nothing: “We need to pause feature work and clean this up first.”\n\nBetter: “I do not think we need a full cleanup before shipping. The highest-risk area is the checkout path. My recommendation is to protect that path with tests now, ship the feature, then schedule the larger cleanup after this release.”'
    },
    {
      type: 'section',
      title: 'Better leadership mental model',
      content: 'A senior engineer does not treat technical debt as either invisible or catastrophic. The better model is to translate the debt into consequences, give stakeholders real options, and recommend a balanced path. Sometimes the right answer is to fix the debt now. Sometimes it is to contain the risk, ship carefully, and schedule deeper cleanup later. The leadership skill is making that trade-off visible and responsible.'
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'Explain technical debt through impact and options: what risk it creates, what it costs to ignore, what it costs to fix, and what smallest responsible step reduces the most important risk.'
    }
  ],
  explanation: 'The senior developer should avoid using technical debt as a vague complaint or defaulting to a large cleanup request. A stronger response translates the technical problem into business-relevant impact: delivery speed, regression risk, incident likelihood, maintenance cost, onboarding friction, customer impact, or opportunity cost. Then it gives stakeholders options, such as fixing the risky part now, adding tests around the affected path, making a narrow change with extra review, scheduling cleanup after the release, or intentionally accepting the debt for a defined reason. This helps the team make a responsible trade-off instead of treating technical debt as either an engineering preference or an emergency.',
  starterThought: 'Ask whether the explanation connects the debt to concrete impact and gives practical options rather than only asking for cleanup.',
  hints: [
    'Stakeholders do not need every technical detail, but they do need the consequence of the technical constraint.',
    'Not all debt needs to be fixed immediately; the key is to distinguish urgent risk from general messiness.',
    'A strong recommendation explains options, trade-offs, and the smallest responsible step forward.'
  ],
  relatedConcepts: [
    'technical debt',
    'stakeholder communication',
    'delivery risk',
    'trade-offs',
    'business impact',
    'maintainability',
    'technical leadership'
  ],
  followUpQuestions: [
    'What business impact would you name if a technical debt issue is slowing delivery?',
    'When would you fix technical debt now versus schedule it after a release?',
    'How would you explain a risky refactor option without sounding like you are blocking product progress?'
  ],
  finalTakeaway: 'Explain technical debt through impact and options: what risk it creates, what it costs to ignore, what it costs to fix, and what smallest responsible step reduces the most important risk.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 300
  }
});

export default problem;
