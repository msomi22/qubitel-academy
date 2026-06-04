import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const prompt = 'A capable teammate has repeatedly missed expectations over several weeks. They deliver work late without raising risks early, ship changes that need significant rework, miss agreed follow-up actions, and other engineers have started quietly working around them.\n\nHow should a senior engineer or team lead respond in a way that is fair, specific, supportive, and accountable?';

const problem = defineLearningProblem({
  id: 'management-track-handling-underperformance-without-avoidance-or-blame-learning-001',
  category: 'engineering-leadership',
  topicId: 'management-track',
  title: 'Handling Underperformance Without Avoidance or Blame',
  difficulty: 'Medium',
  estimatedTimeSeconds: 300,
  tags: [
    'engineering-leadership',
    'management-track',
    'underperformance',
    'accountability',
    'feedback',
    'team-trust',
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
      content: 'Repeated underperformance should be handled as a clear pattern of observable behavior and impact, not as a personal attack. The conversation is not about punishment or emotional release. It is about naming what has happened, understanding what may be getting in the way, and creating a specific path back to reliable delivery and team trust.'
    },
    {
      type: 'comparison',
      title: 'Avoidance vs blame vs fair accountability',
      items: [
        {
          label: 'Avoidance',
          content: '“Let\'s give it more time. I do not want to make things awkward.” This delays a necessary conversation while the teammate receives unclear signals and the team keeps compensating silently.'
        },
        {
          label: 'Blame',
          content: '“You are unreliable. The team cannot count on you.” This labels the person instead of the pattern, which often creates defensiveness without clarifying what must change.'
        },
        {
          label: 'Fair accountability',
          content: 'A fair leader names the repeated behavior, explains the delivery and trust impact, asks what context is missing, resets expectations, agrees on support and next actions, and follows up consistently.'
        }
      ]
    },
    {
      type: 'table',
      title: 'Pattern, impact, and better leadership response',
      columns: ['Observed pattern', 'Impact on the team', 'Better leadership response'],
      rows: [
        [
          'Missed dates without early risk updates',
          'The team and stakeholders are surprised late, which makes planning and recovery harder.',
          'Agree on earlier risk signals: blockers, confidence changes, and dates that must be raised before the deadline is already missed.'
        ],
        [
          'Rework on risky changes',
          'Delivery confidence drops because other engineers must inspect, repair, or work around avoidable gaps.',
          'Clarify the quality bar, risky paths, expected tests, and checkpoints before the next similar change proceeds too far.'
        ],
        [
          'Missed follow-up actions',
          'Trust weakens because commitments stop feeling dependable.',
          'Make next actions explicit, time-bound, visible, and small enough to verify in the next follow-up.'
        ]
      ]
    },
    {
      type: 'checklist',
      title: 'How to prepare for the conversation',
      items: [
        'Collect specific examples from recent weeks instead of relying on a general feeling.',
        'Separate facts from frustration so the conversation stays fair and useful.',
        'Identify the impact on delivery, rework, risk visibility, and team trust.',
        'Ask what context may be missing before assuming intent or motivation.',
        'Define what good looks like for the next task, not just what was wrong before.',
        'Agree on support, checkpoints, and follow-up so improvement is visible rather than hoped for.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Common mistake',
      content: 'Waiting too long because the conversation is uncomfortable can be unfair to both the teammate and the team. The teammate does not get a clear chance to improve, and the team quietly absorbs the cost. The opposite mistake is using labels like “unreliable,” “not serious,” or “the team cannot count on you.” Labels express frustration but do not create a clear improvement path.'
    },
    {
      type: 'section',
      title: 'Better feedback examples',
      content: 'Avoidant: “Let\'s just give them more time. I do not want to make things awkward.”\n\nBetter: “I have noticed the last three deliverables missed the agreed dates, and risk was raised only after the deadline had passed. I want us to understand what is getting in the way and agree on how risks will be surfaced earlier from now on.”\n\nHarsh: “You are becoming unreliable and the team cannot count on you.”\n\nBetter: “The team has had to rework several recent changes, and that is affecting delivery confidence. Let\'s look at the specific gaps, clarify what good looks like for the next task, and agree on checkpoints so problems are visible earlier.”\n\nVague: “You need to improve your ownership.”\n\nBetter: “For ownership on this next task, I expect you to confirm scope by Tuesday, flag blockers within one day, add tests for the risky paths, and share progress before the Thursday review. I will check in midweek to help remove blockers.”'
    },
    {
      type: 'section',
      title: 'Better leadership mental model',
      content: 'Strong leaders combine clarity and care. They do not avoid hard truths, because avoiding the pattern lets delivery confidence and team trust degrade. They also do not turn hard truths into personal attacks. The better model is: name the pattern clearly, understand contributing context, reset expectations, agree on support and next actions, and follow up consistently.'
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'Handle underperformance early, specifically, and humanely: name the pattern, understand context, reset expectations, agree on support, and follow up. Empathy does not mean silently lowering expectations, and accountability does not mean blame or humiliation.'
    }
  ],
  explanation: 'The senior engineer or team lead should address the repeated pattern directly, but keep the conversation focused on observable behavior, impact, context, expectations, support, and follow-up. Avoiding the conversation allows the pattern to continue and can be unfair to the teammate and the team. Blame-focused language such as “you are unreliable” attacks identity and rarely creates a useful path forward. Fair accountability names the pattern, asks what is getting in the way, clarifies what needs to change, agrees on concrete next actions, and follows up consistently.',
  starterThought: 'Ask whether the response names the pattern clearly, avoids identity labels, understands context, and creates a concrete next step.',
  hints: [
    'A pattern should be discussed earlier than feels comfortable, before the team normalizes working around it.',
    'Specific examples are fairer and more useful than labels like unreliable or careless.',
    'Support and accountability belong together: understand what is getting in the way, then make expectations and follow-up clear.'
  ],
  relatedConcepts: [
    'underperformance',
    'accountability',
    'feedback',
    'team trust',
    'delivery confidence',
    'risk communication',
    'technical leadership'
  ],
  followUpQuestions: [
    'How would you open the conversation without sounding avoidant or accusatory?',
    'Which examples would you bring so the feedback is evidence-based and fair?',
    'What support and checkpoints would make improvement visible on the next task?'
  ],
  finalTakeaway: 'Handle underperformance early, specifically, and humanely: name the pattern, understand context, reset expectations, agree on support, and follow up.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 300
  }
});

export default problem;
