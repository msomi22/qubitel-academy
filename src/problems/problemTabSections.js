function list(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value];
}

function text(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map(text).filter(Boolean).join(' ');
  if (typeof value === 'object') return Object.values(value).map(text).filter(Boolean).join(' | ');
  return String(value);
}

export function hasProblemTabContent(value) {
  return text(value).trim().length > 0;
}

export const PROBLEM_TAB_RESPONSIBILITIES = Object.freeze({
  overview: [
    'title',
    'difficulty',
    'category',
    'scenario',
    'question',
    'body',
    'examples',
    'constraints'
  ],
  visual: [
    'visualWalkthrough',
    'visualExplanation',
    'visual body blocks',
    'worked examples',
    'state transitions'
  ],
  intuition: [
    'starterThought',
    'mentalPicture',
    'intuition',
    'visualExplanation',
    'patternSignal',
    'invariant'
  ],
  approach: [
    'stepByStepBreakdown',
    'bruteForceThought',
    'optimizationJourney',
    'edgeCases',
    'keyTakeaway',
    'finalTakeaway',
    'commonMistake',
    'commonMistakes'
  ],
  solution: [
    'solutionCode',
    'code',
    'pseudocode',
    'approachPseudocode',
    'explanation'
  ],
  answer: [
    'options',
    'correctAnswer',
    'explanation',
    'finalTakeaway',
    'optionExplanations',
    'distractorExplanations'
  ],
  complexity: [
    'complexityAnalysis',
    'productionReality',
    'commonMistake'
  ]
});

export function getFocusedProblemTabs({ question, codeContent, explanation, hasMcq = false, hasVisualRichBody = false }) {
  return [
    ['overview', 'Overview', true],
    ['visual', 'Visual Walkthrough', hasVisualRichBody || hasProblemTabContent(question.visualExplanation)],
    [
      'intuition',
      'Intuition',
      hasProblemTabContent(question.intuition) ||
        hasProblemTabContent(question.starterThought) ||
        hasProblemTabContent(question.mentalPicture) ||
        hasProblemTabContent(question.visualExplanation)
    ],
    [
      'approach',
      'Approach',
      list(question.stepByStepBreakdown).length ||
        hasProblemTabContent(question.bruteForceThought) ||
        hasProblemTabContent(question.optimizationJourney) ||
        hasProblemTabContent(question.edgeCases) ||
        hasProblemTabContent(question.keyTakeaway) ||
        hasProblemTabContent(question.finalTakeaway) ||
        hasProblemTabContent(question.takeaway) ||
        hasProblemTabContent(question.engineeringInsight) ||
        hasProblemTabContent(question.commonMistake) ||
        list(question.commonMistakes).length
    ],
    [
      hasMcq ? 'answer' : 'solution',
      hasMcq ? 'Answer' : 'Solution',
      hasMcq || hasProblemTabContent(codeContent) || hasProblemTabContent(explanation)
    ],
    [
      'complexity',
      'Complexity',
      hasProblemTabContent(question.complexityAnalysis) ||
        hasProblemTabContent(question.productionReality) ||
        hasProblemTabContent(question.commonMistake)
    ]
  ].filter(([, , available]) => available);
}

export function getReinforcementCardsForTab(question, activeTab) {
  if (activeTab !== 'approach') return [];

  const commonMistakes = [question.commonMistake, ...list(question.commonMistakes)].filter(hasProblemTabContent);

  return [
    ['Key takeaway', question.finalTakeaway || question.keyTakeaway || question.takeaway || question.engineeringInsight],
    ['Common mistakes', commonMistakes]
  ].filter(([, value]) => hasProblemTabContent(value));
}
