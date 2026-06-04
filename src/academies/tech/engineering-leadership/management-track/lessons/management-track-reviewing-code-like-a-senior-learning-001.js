import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const prompt = 'A pull request from a mid-level engineer is mostly solid, but it has a few real risks, some naming issues, and several choices you personally would have made differently.\n\nHow should a senior engineer review this PR without either rubber-stamping risk or turning every opinion into a blocker?';

const problem = defineLearningProblem({
  id: 'management-track-reviewing-code-like-a-senior-learning-001',
  category: 'engineering-leadership',
  topicId: 'management-track',
  title: 'Reviewing Code Like a Senior Engineer',
  difficulty: 'Medium',
  estimatedTimeSeconds: 300,
  tags: [
    'engineering-leadership',
    'management-track',
    'code-review',
    'technical-leadership',
    'mentorship',
    'delivery-quality',
    'production-risk'
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
      content: 'Senior code review is not about maximizing comment count. It is about protecting correctness, maintainability, readability, production safety, delivery flow, and team learning while keeping feedback respectful and clearly prioritized.'
    },
    {
      type: 'comparison',
      title: 'Three review modes',
      items: [
        {
          label: 'Nitpick gatekeeping',
          content: 'The reviewer blocks on personal preferences, style opinions, and small rewrites. The author receives noise instead of judgment, and delivery slows without a matching quality gain.'
        },
        {
          label: 'Rubber stamp',
          content: 'The reviewer approves because the code looks mostly fine, even though there are correctness, security, data-loss, or critical testing risks that should be resolved before merge.'
        },
        {
          label: 'Senior review',
          content: 'The reviewer separates blockers from suggestions and preferences, explains the impact, uses respectful language, and protects quality without turning every opinion into a gate.'
        }
      ]
    },
    {
      type: 'table',
      title: 'How to classify review feedback',
      columns: ['Feedback type', 'Examples', 'Review stance'],
      rows: [
        ['Blocker', 'Correctness bug, security risk, data-loss risk, missing critical test, unclear dangerous behavior', 'Must be addressed before merge because the impact is material.'],
        ['Non-blocking suggestion', 'Naming clarity, maintainability improvement, readability improvement, follow-up refactor', 'Worth raising, but not necessarily merge-blocking if the current code is safe and understandable.'],
        ['Optional preference', 'Personal style, a different structure you would have chosen, small phrasing preference', 'Label clearly as optional or omit if it does not improve the outcome.']
      ]
    },
    {
      type: 'checklist',
      title: 'Senior review checklist',
      items: [
        'Start with the highest-impact risks: correctness, security, data safety, production behavior, and critical tests.',
        'Separate must-fix blockers from suggestions, questions, and optional preferences.',
        'Explain the impact and reasoning instead of asserting authority.',
        'Comment on the code and the risk, not the person who wrote it.',
        'Use questions when intent is unclear, but be direct when a real blocker exists.',
        'Consider delivery impact: do not block the PR for changes that can safely become follow-up work.',
        'Leave the author with a clearer mental model, not just a list of edits.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Review smell',
      content: 'Sarcastic or personal comments are never senior behavior. A strong reviewer can be firm about risk while still being specific, respectful, and focused on the code path, user impact, and production consequences.\n\nBad examples:\n\n1. “Did you even test this? This is obviously broken.”\n\n2. “Why are you improving this? Maybe you should write to Oracle’s engineers and ask if they have a better alternative than replaceAll.”'
    },
    {
      type: 'section',
      title: 'Better review language',
      content: 'Instead of sarcastic or personal comments, rewrite the same concern into feedback that explains the risk, impact, and path to approval.\n\nFor: “Did you even test this? This is obviously broken.”\n\nBetter alternative: “This path looks untested for retry-after-timeout behavior. Because it can duplicate the payment request, I think we should add a regression test and an idempotency guard before merge.”\n\nFor: “Why are you improving this? Maybe you should write to Oracle’s engineers and ask if they have a better alternative than replaceAll.”\n\nBetter alternative: “I’m not yet convinced the new implementation gives enough benefit over the existing replaceAll approach. Could you explain the performance, readability, or correctness advantage so we can evaluate whether the added complexity is justified?”\n\nThe better comments are still firm, but they avoid sarcasm. They focus on the code, explain why the concern matters, and give the author a clear way to respond or improve the PR.'
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'A senior review protects the system and the team at the same time. Block real risk, suggest meaningful improvements, label preferences honestly, and teach through clear reasoning rather than authority or sarcasm.'
    }
  ],
  explanation: 'A senior engineer should review the PR by prioritizing impact. Correctness bugs, security or data-loss risk, missing critical tests, and unclear dangerous behavior can be blockers. Naming, readability, maintainability, and follow-up refactors are usually non-blocking suggestions unless they create real risk. Personal style preferences should be clearly marked optional or skipped. The reviewer should explain why each important comment matters, avoid sarcastic or personal language, and protect quality without turning every opinion into a gate.',
  starterThought: 'Ask which comments protect users, production, and maintainability, and which comments are only personal preference.',
  hints: [
    'Not every valid comment should block a merge.',
    'The strongest review comments explain impact, not authority.',
    'A respectful review can still be firm when production risk is real.'
  ],
  relatedConcepts: [
    'code review',
    'technical judgment',
    'production risk',
    'maintainability',
    'mentorship',
    'delivery impact'
  ],
  followUpQuestions: [
    'Which comments on this PR should block merge, and why?',
    'How would you rewrite a harsh review comment into a specific, impact-focused one?',
    'Which suggestions could safely become follow-up work instead of blocking delivery?'
  ],
  finalTakeaway: 'Senior code review is disciplined prioritization: block real risk, suggest useful improvements, label preferences honestly, and explain impact with respect.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 300
  }
});

export default problem;
