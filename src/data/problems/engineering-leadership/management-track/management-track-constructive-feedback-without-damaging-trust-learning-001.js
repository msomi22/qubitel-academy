import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'A senior engineer needs to give feedback to a teammate whose recent changes moved quickly but created avoidable production risk and tense PR discussions.\n\nHow should the senior engineer give honest, actionable feedback that improves accountability without damaging trust?';

const problem = defineLearningProblem({
  id: 'management-track-constructive-feedback-without-damaging-trust-learning-001',
  category: 'engineering-leadership',
  topicId: 'management-track',
  title: 'Constructive Feedback Without Damaging Trust',
  difficulty: 'Medium',
  estimatedTimeSeconds: 300,
  tags: [
    'engineering-leadership',
    'management-track',
    'feedback',
    'accountability',
    'psychological-safety',
    'code-review',
    'technical-leadership',
    'team-trust'
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
      content: 'Constructive feedback is not soft feedback. It is clear feedback that focuses on observable behavior, explains engineering impact, and points toward a better future outcome. The goal is not to unload frustration. The goal is to improve how the team delivers, reviews, tests, and collaborates.'
    },
    {
      type: 'comparison',
      title: 'Three feedback modes',
      items: [
        {
          label: 'Vague feedback',
          content: '“You need to communicate better.” This may be true, but it does not tell the person what happened, why it mattered, or what should change next time.'
        },
        {
          label: 'Harsh feedback',
          content: '“You are careless and difficult to work with.” This turns a delivery or collaboration issue into an attack on identity. It may create defensiveness without improving the actual engineering behavior.'
        },
        {
          label: 'Constructive feedback',
          content: 'Specific, behavior-focused feedback names the observable issue, connects it to impact, and asks for a better operating pattern. It can be direct and uncomfortable without becoming hostile.'
        }
      ]
    },
    {
      type: 'table',
      title: 'Identity-focused vs behavior-focused language',
      columns: ['Weak or damaging language', 'Better senior-engineering language', 'Why it works better'],
      rows: [
        [
          '“You are careless.”',
          '“Important edge cases were not validated before merge, and that introduced avoidable regressions.”',
          'It focuses on the review and testing behavior that can change, not the person’s character.'
        ],
        [
          '“You never listen in reviews.”',
          '“In a few recent review threads, we moved to defending the implementation before fully exploring the risk.”',
          'It names a discussion pattern without turning disagreement into a personal accusation.'
        ],
        [
          '“You need to communicate better.”',
          '“When risky behavior changes, I need the PR description to call out the risk, rollback behavior, and test coverage so reviewers can reason about the change quickly.”',
          'It explains the expected behavior and why the team needs it.'
        ],
        [
          '“This was a bad PR.”',
          '“The retry change touched a production-sensitive path, but the tests did not cover rollback behavior. That made the deployment risk harder to catch.”',
          'It separates the technical concern from judgment about the author.'
        ]
      ]
    },
    {
      type: 'checklist',
      title: 'Senior feedback checklist',
      items: [
        'Name the specific behavior, decision, or pattern you observed.',
        'Connect the behavior to engineering impact: production risk, review quality, delivery flow, customer impact, or team trust.',
        'Avoid identity labels such as careless, lazy, difficult, sloppy, or defensive.',
        'Be direct about the standard that was missed without adding hostility.',
        'Ask for a concrete improvement in the next PR, incident follow-up, design review, or delivery cycle.',
        'Separate disagreement about a technical choice from conflict between people.',
        'Keep the conversation focused on future outcomes, not emotional release.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Feedback smells',
      content: 'Watch for feedback that sounds satisfying to say but does not help the person improve. Examples: “You are careless.” “You always argue.” “You need to be better.” “This is obvious.” “Everyone is tired of this.” These statements may express frustration, but they do not give a clear engineering standard, observable behavior, or next step.'
    },
    {
      type: 'table',
      title: 'Better feedback language examples',
      columns: ['Weak feedback', 'Better feedback', 'Teaching focus'],
      rows: [
        [
          '“You need to communicate better.”',
          '“In the last two PRs, the retry logic changed without tests, and it caused production instability during rollback. I want us to slow down on risky paths and add regression coverage before merge. How can we make that easier going forward?”',
          'Replaces vague criticism with specific behavior, observable evidence, production impact, and a practical next step.'
        ],
        [
          '“You’re careless and difficult to work with.”',
          '“A few recent changes introduced avoidable regressions because important edge cases were not validated before merge. I’d like us to improve the review and testing approach on risky paths so the team can trust deployments more consistently.”',
          'Avoids attacking identity and focuses on testing behavior, regression risk, professionalism, and team trust.'
        ],
        [
          '“Every review with you turns into an argument.”',
          '“I’ve noticed that review discussions sometimes become defensive before we fully explore the technical concern. I’d like us to focus first on understanding the risk and trade-offs before deciding whether feedback should be accepted or rejected.”',
          'Names defensiveness as a discussion pattern while keeping the goal collaborative: understand the technical risk before deciding what to do.'
        ]
      ]
    },
    {
      type: 'section',
      title: 'Psychological safety is not avoiding standards',
      content: 'A common wrong mental model is that being direct means being harsh. Another wrong model is that constructive feedback means avoiding discomfort entirely. Neither is senior leadership. Psychological safety means people can hear difficult truths without being shamed or attacked. Accountability means the team still names missed standards, production impact, and needed improvement. Strong feedback holds both at the same time.'
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'Strong feedback is specific, behavior-focused, impact-focused, and improvement-oriented. Accountability and empathy are not opposites. A senior engineer can be clear about production risk, review behavior, and missed standards while still protecting professionalism and trust.'
    }
  ],
  explanation: 'The senior engineer should avoid both vague softness and hostile directness. Good feedback should name specific observable behavior, explain the engineering impact, and ask for a concrete improvement. Instead of saying “you are careless” or “you need to communicate better,” the feedback should discuss what happened in recent PRs, what risk it created for rollback, testing, deployment confidence, or review quality, and what operating pattern should change next time. This preserves professionalism while still creating accountability.',
  starterThought: 'Ask whether the feedback names an observable behavior, explains impact, and gives a clear next step without attacking the person.',
  hints: [
    'Direct feedback does not need to be harsh.',
    'Constructive feedback can still be uncomfortable.',
    'Focus on behavior, impact, and future improvement rather than identity or frustration.'
  ],
  relatedConcepts: [
    'constructive feedback',
    'accountability',
    'psychological safety',
    'code review',
    'production risk',
    'team trust',
    'technical leadership'
  ],
  followUpQuestions: [
    'How would you rewrite a vague feedback statement into behavior-focused feedback?',
    'What production or team impact should be named in the feedback?',
    'How can you be direct about a missed standard without attacking the person?'
  ],
  finalTakeaway: 'Senior feedback improves future behavior by being specific, respectful, impact-focused, and clear about the standard that needs to change.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 300
  }
});

export default problem;
