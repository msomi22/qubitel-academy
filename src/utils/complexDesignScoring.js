import { COMMON_SYSTEM_DESIGN_DICTIONARY } from '../data/scoring/systemDesignDictionary.js';

export const SCORING_MODEL_LABEL = 'Hybrid deterministic scoring model';

const REASONING_WORDS = [
  'because',
  'so that',
  'in order to',
  'this helps',
  'since',
  'therefore',
  'why',
  'so it can',
  'as a result',
  'this allows',
  'this ensures',
  'the reason'
];

const TRADE_OFF_WORDS = [
  'trade-off',
  'tradeoff',
  'downside',
  'cost',
  'latency',
  'consistency',
  'availability',
  'complexity',
  'throughput',
  'stale',
  'eventual',
  'strong consistency',
  'predictable',
  'guessable'
];

const FAILURE_WORDS = [
  'failure',
  'failover',
  'retry',
  'timeout',
  'fallback',
  'unavailable',
  'degraded',
  'outage',
  'partial failure',
  'database down',
  'cache down',
  'region fails',
  'db fails'
];

const OBSERVABILITY_WORDS = [
  'metric',
  'metrics',
  'log',
  'logs',
  'trace',
  'tracing',
  'alert',
  'dashboard',
  'slo',
  'monitoring',
  'error rate',
  'latency'
];

const TYPO_REPLACEMENTS = [
  ['throug', 'through'],
  ['throtteling', 'throttling'],
  ['throttleing', 'throttling'],
  ['authenatication', 'authentication'],
  ['shortner', 'shortener'],
  ['shortne', 'shorten'],
  ['scaller', 'scaler'],
  ['autoscaller', 'autoscaler'],
  ['nework', 'network'],
  ['savein', 'save in'],
  ['saing', 'saving'],
  ['hascode', 'hashcode'],
  ['retrice', 'retrieve'],
  ['usrl', 'url']
];

const SCORING_SIGNALS = [
  'rubric criteria',
  'shared scoring dictionary',
  'question-specific scoring dictionary',
  'natural wording aliases',
  'typo-tolerant matching',
  'critical concept caps',
  'partial credit',
  'reasoning signals',
  'trade-off signals',
  'failure-mode signals',
  'observability signals',
  'quality caps'
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalize(value = '') {
  let normalized = String(value).toLowerCase();

  TYPO_REPLACEMENTS.forEach(([from, to]) => {
    normalized = normalized.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, 'g'), to);
  });

  return normalized
    .replace(/base\s*62/g, 'base62')
    .replace(/hash\s*code/g, 'hashcode')
    .replace(/short\s*url/g, 'short url')
    .replace(/long\s*url/g, 'long url')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function words(value = '') {
  return normalize(value)
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function phraseMatches(text, phrase) {
  const normalizedPhrase = normalize(phrase);
  if (!normalizedPhrase) return false;

  const phraseWords = words(normalizedPhrase);
  if (phraseWords.length === 1) {
    return words(text).includes(phraseWords[0]);
  }

  if (text.includes(normalizedPhrase)) return true;

  if (phraseWords.length <= 3) return false;

  const answerWords = new Set(words(text));
  const matchedWords = phraseWords.filter((word) => answerWords.has(word)).length;
  const requiredWords = Math.ceil(phraseWords.length * 0.75);

  return matchedWords >= requiredWords;
}

function strictPhraseMatches(text, phrase) {
  const normalizedPhrase = normalize(phrase);
  if (!normalizedPhrase) return false;

  const phraseWords = words(normalizedPhrase);
  if (phraseWords.length === 1) {
    return words(text).includes(phraseWords[0]);
  }

  return text.includes(normalizedPhrase);
}

function criticalPhraseMatches(text, phrase) {
  if (strictPhraseMatches(text, phrase)) return true;

  const normalizedPhrase = normalize(phrase);
  const isCacheMissDatabaseFallback = normalizedPhrase.includes('cache miss') && normalizedPhrase.includes('database');

  if (!isCacheMissDatabaseFallback) return false;

  return text.includes('cache miss') && (
    text.includes('lookup database')
    || text.includes('lookup the database')
    || text.includes('check database')
    || text.includes('check the database')
    || text.includes('database lookup')
  );
}

function includesAny(text, phrases = []) {
  return phrases.some((phrase) => phraseMatches(text, phrase));
}

function includesAnyCritical(text, phrases = []) {
  return phrases.some((phrase) => criticalPhraseMatches(text, phrase));
}

function matchedAliases(text, phrases = []) {
  return phrases.filter((phrase) => phraseMatches(text, phrase));
}

function dictionaryTermsFor(concepts = [], dictionary = {}) {
  return concepts.flatMap((concept) => dictionary[concept] || []);
}

function questionDictionaryFor(question) {
  return question?.scoringDictionary || {};
}

function criterionPhrases(question, criterion) {
  const sharedTerms = dictionaryTermsFor(criterion.concepts, COMMON_SYSTEM_DESIGN_DICTIONARY);
  const questionTerms = dictionaryTermsFor(criterion.questionConcepts, questionDictionaryFor(question));
  return [...sharedTerms, ...questionTerms, ...(criterion.aliases || [])];
}

function criterionCriticalPhrases(question, criterion) {
  const sharedTerms = dictionaryTermsFor(criterion.criticalConcepts, COMMON_SYSTEM_DESIGN_DICTIONARY);
  const questionTerms = dictionaryTermsFor(criterion.criticalQuestionConcepts, questionDictionaryFor(question));
  return [...sharedTerms, ...questionTerms, ...(criterion.criticalAliases || [])];
}

function countSignalFamilies(answerText) {
  return [
    includesAny(answerText, REASONING_WORDS),
    includesAny(answerText, TRADE_OFF_WORDS),
    includesAny(answerText, FAILURE_WORDS),
    includesAny(answerText, OBSERVABILITY_WORDS)
  ].filter(Boolean).length;
}

function criterionLabel(criterion) {
  return criterion.label || criterion.id;
}

function scoreCriterion(answerText, criterion, question) {
  const phrases = criterionPhrases(question, criterion);
  const matches = matchedAliases(answerText, phrases);

  if (!matches.length) {
    return {
      score: 0,
      matched: false,
      keywordOnly: false,
      matchedAliases: []
    };
  }

  const max = Number(criterion.points || 0);
  const requestedMinimumMatches = Number(criterion.minimumMatches || 0);
  const targetCoverage = requestedMinimumMatches > 0
    ? Math.max(1, Math.min(phrases.length, requestedMinimumMatches))
    : 1;
  const aliasCoverage = Math.min(1, matches.length / targetCoverage);
  const signalFamilies = countSignalFamilies(answerText);
  const criticalPhrases = criterionCriticalPhrases(question, criterion);
  const criticalMatched = !criticalPhrases.length || includesAnyCritical(answerText, criticalPhrases);
  const criticalCap = Number(criterion.maxRatioWithoutCritical || 0.65);

  let ratio = 0.42 + aliasCoverage * 0.38;

  if (includesAny(answerText, REASONING_WORDS)) ratio += 0.08;
  if (includesAny(answerText, TRADE_OFF_WORDS)) ratio += 0.05;
  if (includesAny(answerText, FAILURE_WORDS)) ratio += 0.05;
  if (includesAny(answerText, OBSERVABILITY_WORDS)) ratio += 0.02;

  if (criterion.requiresReasoning && !includesAny(answerText, REASONING_WORDS)) {
    ratio = Math.min(ratio, 0.65);
  }

  if (!criticalMatched) {
    ratio = Math.min(ratio, criticalCap);
  }

  if (
    matches.length >= targetCoverage
    && criticalMatched
    && (!criterion.requiresReasoning || includesAny(answerText, REASONING_WORDS))
  ) {
    ratio = Math.max(ratio, 1);
  }

  const score = Math.min(max, Math.max(1, Math.round(max * ratio)));

  return {
    score,
    matched: true,
    keywordOnly: signalFamilies <= 1 && matches.length <= 1,
    matchedAliases: matches
  };
}

function levelFor(percentage) {
  if (percentage >= 85) return 'Excellent';
  if (percentage >= 70) return 'Good';
  if (percentage >= 50) return 'Developing';
  return 'Needs work';
}

function sectionFeedback(section, score, maxScore, matchedLabels, missedLabels) {
  if (score === 0) return `Missing ${section.title}. Add the core concepts and explain the design reasoning.`;
  if (!missedLabels.length && score >= maxScore * 0.8) return `Strong coverage of ${section.title}.`;
  if (matchedLabels.length) {
    return `Covered ${matchedLabels.length} area${matchedLabels.length === 1 ? '' : 's'} in ${section.title}, but ${missedLabels.slice(0, 2).join(', ') || 'some details'} could be clearer.`;
  }
  return `${section.title} needs more concrete design detail.`;
}

function buildStrength(section) {
  return `Covered ${section.title.toLowerCase()} well.`;
}

function buildImprovement(section) {
  const missed = (section.missedLabels || section.missedCriteria || []).slice(0, 2).join(' and ');
  return missed ? `Improve ${section.title.toLowerCase()}: add ${missed}.` : `Add more reasoning for ${section.title.toLowerCase()}.`;
}

function baseResult(overrides = {}) {
  return {
    scoringModel: SCORING_MODEL_LABEL,
    scoringSignals: SCORING_SIGNALS,
    ...overrides
  };
}

function countWords(answerText) {
  return words(answerText).length;
}

function applyQualityCaps(totalScore, maxScore, sectionScores, answerText) {
  const wordCount = countWords(answerText);
  const coveredSections = sectionScores.filter((section) => section.score > 0).length;
  const strongSections = sectionScores.filter((section) => section.score >= section.maxScore * 0.6).length;
  const signalFamilies = countSignalFamilies(answerText);
  const matchedCriteria = sectionScores.reduce((sum, section) => sum + section.matchedCriteria.length, 0);
  const totalCriteria = sectionScores.reduce((sum, section) => sum + section.matchedCriteria.length + section.missedCriteria.length, 0);

  let cap = maxScore;

  if (wordCount < 25) cap = Math.min(cap, Math.round(maxScore * 0.35));
  else if (wordCount < 80) cap = Math.min(cap, Math.round(maxScore * 0.7));

  if (coveredSections < 4) cap = Math.min(cap, Math.round(maxScore * 0.6));
  if (strongSections < 3) cap = Math.min(cap, Math.round(maxScore * 0.75));
  if (signalFamilies <= 1 && matchedCriteria < totalCriteria) cap = Math.min(cap, Math.round(maxScore * 0.65));

  return Math.min(totalScore, cap);
}

export function scoreComplexDesignAnswer(question, answer) {
  const answerText = normalize(answer);
  const rubric = question?.scoringRubric || [];
  const maxScore = rubric.reduce((sum, section) => sum + Number(section.weight || 0), 0) || 100;

  if (!answerText) {
    return baseResult({
      totalScore: 0,
      maxScore,
      percentage: 0,
      level: 'Needs work',
      sectionScores: rubric.map((section) => ({
        id: section.id,
        title: section.title,
        score: 0,
        maxScore: Number(section.weight || 0),
        feedback: `Missing ${section.title}.`,
        matchedCriteria: [],
        missedCriteria: (section.criteria || []).map((criterion) => criterion.id),
        matchedLabels: [],
        missedLabels: (section.criteria || []).map(criterionLabel)
      })),
      strengths: [],
      improvements: ['Write a complete design answer before evaluating.']
    });
  }

  const sectionScores = rubric.map((section) => {
    const rawMax = (section.criteria || []).reduce((sum, criterion) => sum + Number(criterion.points || 0), 0) || Number(section.weight || 0) || 1;
    let rawScore = 0;
    const matchedCriteria = [];
    const missedCriteria = [];
    const matchedLabels = [];
    const missedLabels = [];

    (section.criteria || []).forEach((criterion) => {
      const result = scoreCriterion(answerText, criterion, question);
      rawScore += result.score;

      if (result.matched) {
        matchedCriteria.push(criterion.id);
        matchedLabels.push(criterionLabel(criterion));
      } else {
        missedCriteria.push(criterion.id);
        missedLabels.push(criterionLabel(criterion));
      }
    });

    const maxSectionScore = Number(section.weight || rawMax);
    const score = Math.min(maxSectionScore, Math.round((rawScore / rawMax) * maxSectionScore));

    return {
      id: section.id,
      title: section.title,
      score,
      maxScore: maxSectionScore,
      feedback: sectionFeedback(section, score, maxSectionScore, matchedLabels, missedLabels),
      matchedCriteria,
      missedCriteria,
      matchedLabels,
      missedLabels
    };
  });

  let totalScore = sectionScores.reduce((sum, section) => sum + section.score, 0);

  const allCriteriaMatched = sectionScores.every((section) => section.missedCriteria.length === 0);
  if (!allCriteriaMatched) {
    if (includesAny(answerText, OBSERVABILITY_WORDS)) totalScore = Math.min(maxScore, totalScore + 2);
    if (includesAny(answerText, FAILURE_WORDS) && includesAny(answerText, TRADE_OFF_WORDS)) totalScore = Math.min(maxScore, totalScore + 3);
  }

  totalScore = applyQualityCaps(totalScore, maxScore, sectionScores, answerText);

  const percentage = Math.round((totalScore / maxScore) * 100);
  const strongSections = sectionScores.filter((section) => section.score >= section.maxScore * 0.7);
  const weakSections = sectionScores.filter((section) => section.score < section.maxScore * 0.7);

  return baseResult({
    totalScore,
    maxScore,
    percentage,
    level: levelFor(percentage),
    sectionScores,
    strengths: strongSections.slice(0, 4).map(buildStrength),
    improvements: weakSections.slice(0, 5).map(buildImprovement)
  });
}

export default scoreComplexDesignAnswer;
