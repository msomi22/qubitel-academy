import { COMMON_SYSTEM_DESIGN_DICTIONARY } from '../data/scoring/systemDesignDictionary.js';

export const SCORING_MODEL_LABEL = 'Hybrid deterministic scoring model';

const REASONING_WORDS = [
  'because', 'due to', 'since', 'therefore', 'as a result', 'leads to', 'drives',
  'optimizes', 'reduces', 'improves', 'prevents', 'avoids', 'so we can', 'helps us',
  'this helps', 'the goal is', 'this means', 'this allows', 'this ensures', 'in order to',
  'why', 'so that', 'so it can', 'the reason'
];

const TRADE_OFF_WORDS = [
  'trade-off', 'tradeoff', 'trade off', 'overhead', 'bottleneck', 'expensive', 'cheap',
  'slower', 'faster', 'operational cost', 'write cost', 'read cost', 'memory cost',
  'complexity', 'predictable', 'guessable', 'latency', 'throughput', 'consistency',
  'availability', 'downside', 'cost', 'stale', 'eventual', 'strong consistency'
];

const FAILURE_WORDS = [
  'failure', 'fail', 'fails', 'failing', 'failover', 'single point of failure', 'spof',
  'network partition', 'split brain', 'split-brain', 'cascading failure', 'timeout',
  'retry', 'circuit breaker', 'fallback', 'degraded mode', 'degraded', 'database down',
  'cache down', 'region failure', 'region fails', 'queue backlog', 'data loss',
  'replication lag', 'unavailable', 'outage', 'partial failure', 'db fails'
];

const OBSERVABILITY_WORDS = [
  'metric', 'metrics', 'logs', 'structured logs', 'log', 'trace', 'tracing', 'trace id',
  'correlation id', 'dashboard', 'alert', 'slo', 'sla', 'p95', 'p99', 'error rate',
  'queue lag', 'cache hit rate', 'database latency', 'db latency', 'monitoring'
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
  'partial credit',
  'reasoning signals',
  'trade-off signals',
  'failure-mode signals',
  'observability signals'
];

const GENERIC_NON_FUZZY_WORDS = new Set([
  'fast', 'good', 'server', 'data', 'open', 'link', 'user', 'system', 'work', 'website'
]);

const STEM_REPLACEMENTS = new Map([
  ['metrics', 'metric'], ['replicas', 'replica'], ['indexes', 'index'], ['indices', 'index'],
  ['failures', 'failure'], ['failing', 'fail'], ['failed', 'fail'], ['fails', 'fail'],
  ['retries', 'retry'], ['retried', 'retry'], ['replicated', 'replicate'], ['replicating', 'replicate'],
  ['partitioned', 'partition'], ['partitioning', 'partition'], ['throttled', 'throttle'],
  ['throttling', 'throttle'], ['cached', 'cache'], ['caching', 'cache'], ['redirected', 'redirect'],
  ['redirecting', 'redirect'], ['queued', 'queue'], ['queuing', 'queue'], ['sharded', 'shard'],
  ['sharding', 'shard'], ['monitored', 'monitor'], ['monitoring', 'monitor']
]);

const GATEKEEPER_CAPS = [
  ['storage-design', 0.4],
  ['read-write-flows', 0.5],
  ['short-code-generation', 0.65],
  ['reliability-consistency', 0.8],
  ['security-abuse', 0.85],
  ['observability', 0.9]
];

export function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const NORMALIZE_CACHE = new Map();

export function normalize(value = '') {
  const original = String(value);
  if (NORMALIZE_CACHE.has(original)) return NORMALIZE_CACHE.get(original);
  let normalized = original.toLowerCase();

  TYPO_REPLACEMENTS.forEach(([from, to]) => {
    normalized = normalized.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, 'g'), to);
  });

  normalized = normalized
    .replace(/base\s*62/g, 'base62')
    .replace(/hash\s*code/g, 'hashcode')
    .replace(/\bk8s\b/g, 'kubernetes')
    .replace(/\bdb\b/g, 'database')
    .replace(/\bpostgres\b/g, 'postgresql')
    .replace(/\basync\b/g, 'asynchronous')
    .replace(/short\s*url/g, 'short url')
    .replace(/long\s*url/g, 'long url')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (NORMALIZE_CACHE.size > 1000) NORMALIZE_CACHE.clear();
  NORMALIZE_CACHE.set(original, normalized);
  return normalized;
}

export function words(value = '') {
  const normalized = normalize(value);
  return normalized ? normalized.split(/\s+/).filter(Boolean) : [];
}

export function stemWord(word = '') {
  const token = normalize(word);
  if (STEM_REPLACEMENTS.has(token)) return STEM_REPLACEMENTS.get(token);
  if (token.length > 6 && token.endsWith('ies')) return `${token.slice(0, -3)}y`;
  if (token.length > 6 && token.endsWith('ing')) return token.slice(0, -3);
  if (token.length > 5 && token.endsWith('ed')) return token.slice(0, -2);
  if (token.length > 5 && token.endsWith('es')) return token.slice(0, -2);
  if (token.length > 5 && token.endsWith('s')) return token.slice(0, -1);
  return token;
}

export function levenshtein(a = '', b = '') {
  const left = String(a);
  const right = String(b);
  if (left === right) return 0;
  if (!left.length) return right.length;
  if (!right.length) return left.length;

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost
      );
    }
    previous = current;
  }
  return previous[right.length];
}

export function shouldFuzzyMatch(dictionaryWord = '') {
  const token = normalize(dictionaryWord);
  return token.length > 5 && !GENERIC_NON_FUZZY_WORDS.has(token) && /^[a-z0-9]+$/.test(token);
}

export function fuzzyWordMatches(answerWord = '', dictionaryWord = '') {
  const answerToken = normalize(answerWord);
  const dictionaryToken = normalize(dictionaryWord);
  if (!answerToken || !shouldFuzzyMatch(dictionaryToken)) return false;
  if (GENERIC_NON_FUZZY_WORDS.has(answerToken)) return false;
  if (Math.abs(answerToken.length - dictionaryToken.length) > 2) return false;
  const maxDistance = dictionaryToken.length >= 9 ? 2 : 1;
  return levenshtein(answerToken, dictionaryToken) <= maxDistance;
}

const TOKEN_MATCH_CACHE = new Map();

export function tokenMatches(answerWord = '', dictionaryWord = '') {
  const answerToken = normalize(answerWord);
  const dictionaryToken = normalize(dictionaryWord);
  if (!answerToken || !dictionaryToken) return false;
  const cacheKey = `${answerToken}|${dictionaryToken}`;
  if (TOKEN_MATCH_CACHE.has(cacheKey)) return TOKEN_MATCH_CACHE.get(cacheKey);
  const answerStem = stemWord(answerToken);
  const dictionaryStem = stemWord(dictionaryToken);
  const matched = answerToken === dictionaryToken
    || answerStem === dictionaryStem
    || fuzzyWordMatches(answerToken, dictionaryToken)
    || fuzzyWordMatches(answerStem, dictionaryStem);
  if (TOKEN_MATCH_CACHE.size > 5000) TOKEN_MATCH_CACHE.clear();
  TOKEN_MATCH_CACHE.set(cacheKey, matched);
  return matched;
}

function containsOrderedPhrase(answerWords, phraseWords) {
  if (!phraseWords.length) return false;
  for (let index = 0; index <= answerWords.length - phraseWords.length; index += 1) {
    const matched = phraseWords.every((word, offset) => tokenMatches(answerWords[index + offset], word));
    if (matched) return true;
  }
  return false;
}

function sentenceChunks(text = '') {
  return String(text)
    .toLowerCase()
    .split(/[.!?;\n]+/)
    .map(normalize)
    .filter(Boolean);
}

function conceptConfigFrom(entry) {
  if (!entry) return { terms: [], synonyms: [], stems: [], negativePhrases: [], proximity: null };
  if (Array.isArray(entry)) return { terms: entry, synonyms: [], stems: [], negativePhrases: [], proximity: null };
  return {
    terms: entry.terms || [],
    synonyms: entry.synonyms || [],
    stems: entry.stems || [],
    negativePhrases: entry.negativePhrases || [],
    proximity: entry.proximity || null
  };
}

function phraseMatches(text, phrase) {
  const phraseWords = words(phrase);
  if (!phraseWords.length) return false;
  const answerWords = words(text);
  if (phraseWords.length === 1) {
    return answerWords.some((answerWord) => tokenMatches(answerWord, phraseWords[0]));
  }
  return normalize(text).includes(normalize(phrase)) || containsOrderedPhrase(answerWords, phraseWords);
}

function exactPhraseMatches(text, phrase) {
  const normalizedPhrase = normalize(phrase);
  if (!normalizedPhrase) return false;
  const phraseWords = words(normalizedPhrase);
  if (phraseWords.length === 1) return words(text).includes(phraseWords[0]);
  return normalize(text).includes(normalizedPhrase);
}

function includesAny(text, phrases = []) {
  return phrases.some((phrase) => phraseMatches(text, phrase));
}

function matchPhraseList(text, phrases = []) {
  const exactMatches = phrases.filter((phrase) => exactPhraseMatches(text, phrase));
  if (exactMatches.length) return exactMatches;
  return phrases.filter((phrase) => phraseMatches(text, phrase));
}

export function tokenPositions(answerWords = [], termGroup = []) {
  const positions = [];
  const normalizedTerms = termGroup.flatMap((term) => {
    const termWords = words(term);
    return termWords.length ? [termWords] : [];
  });

  answerWords.forEach((_, index) => {
    const matched = normalizedTerms.some((termWords) => termWords.every((word, offset) => tokenMatches(answerWords[index + offset], word)));
    if (matched) positions.push(index);
  });
  return positions;
}

export function termsNearEachOther(answerWords = [], groups = [], windowSize = 12) {
  const groupPositions = groups.map((group) => tokenPositions(answerWords, group));
  if (groupPositions.some((positions) => positions.length === 0)) return false;

  const anchors = groupPositions[0];
  return anchors.some((anchor) => groupPositions.every((positions) => positions.some((position) => Math.abs(position - anchor) <= windowSize)));
}

export function hasNegativePhraseNearConcept(answerText, conceptConfig = {}) {
  const negativePhrases = conceptConfig.negativePhrases || [];
  if (!negativePhrases.length) return false;

  const relatedTerms = [
    ...(conceptConfig.terms || []),
    ...(conceptConfig.synonyms || []),
    ...((conceptConfig.proximity?.groups || []).flat())
  ];

  return sentenceChunks(answerText).some((sentence) => {
    const hasNegative = negativePhrases.some((phrase) => exactPhraseMatches(sentence, phrase) || phraseMatches(sentence, phrase));
    if (!hasNegative) return false;
    return !relatedTerms.length || relatedTerms.some((term) => phraseMatches(sentence, term));
  });
}

export function proximityConceptMatches(answerText, conceptConfig = {}) {
  if (!conceptConfig.proximity || hasNegativePhraseNearConcept(answerText, conceptConfig)) return false;
  const answerWords = words(answerText);
  const groups = conceptConfig.proximity.groups || [];
  const requiredGroups = conceptConfig.proximity.requiredGroups || groups.length;
  const windowSize = Math.min(Number(conceptConfig.proximity.windowSize || 12), 15);

  if (!groups.length) return false;
  if (requiredGroups >= groups.length) return termsNearEachOther(answerWords, groups, windowSize);

  const matchedGroups = groups.filter((group) => tokenPositions(answerWords, group).length > 0);
  if (matchedGroups.length < requiredGroups) return false;
  for (let i = 0; i < matchedGroups.length; i += 1) {
    const subset = matchedGroups.slice(i, i + requiredGroups);
    if (subset.length === requiredGroups && termsNearEachOther(answerWords, subset, windowSize)) return true;
  }
  return false;
}

function conceptMatches(text, entry, conceptName = '') {
  const config = conceptConfigFrom(entry);
  if (hasNegativePhraseNearConcept(text, config)) return { matched: false, labels: [] };

  const termMatches = matchPhraseList(text, config.terms);
  if (termMatches.length) return { matched: true, labels: termMatches };

  const synonymMatches = matchPhraseList(text, config.synonyms);
  if (synonymMatches.length) return { matched: true, labels: synonymMatches };

  const answerStems = new Set(words(text).map(stemWord));
  const stemMatches = (config.stems || []).filter((stem) => answerStems.has(stemWord(stem)));
  if (stemMatches.length) return { matched: true, labels: stemMatches };

  if (proximityConceptMatches(text, config)) return { matched: true, labels: [conceptName] };

  return { matched: false, labels: [] };
}

function dictionaryMatchesFor(concepts = [], dictionary = {}, text = '') {
  const labels = [];
  concepts.forEach((concept) => {
    const result = conceptMatches(text, dictionary[concept], concept);
    if (result.matched) labels.push(...result.labels);
  });
  return labels;
}

function questionDictionaryFor(question) {
  return question?.scoringDictionary || {};
}

function criterionMatches(question, criterion, answerText) {
  return [
    ...dictionaryMatchesFor(criterion.concepts, COMMON_SYSTEM_DESIGN_DICTIONARY, answerText),
    ...dictionaryMatchesFor(criterion.questionConcepts, questionDictionaryFor(question), answerText),
    ...matchPhraseList(answerText, criterion.aliases || [])
  ];
}

function criticalMatches(question, criterion, answerText) {
  const shared = dictionaryMatchesFor(criterion.criticalConcepts, COMMON_SYSTEM_DESIGN_DICTIONARY, answerText);
  const questionSpecific = dictionaryMatchesFor(criterion.criticalQuestionConcepts, questionDictionaryFor(question), answerText);
  const aliases = matchPhraseList(answerText, criterion.criticalAliases || []);
  const hasCriticalTerms = [
    ...(criterion.criticalConcepts || []),
    ...(criterion.criticalQuestionConcepts || []),
    ...(criterion.criticalAliases || [])
  ].length > 0;
  return !hasCriticalTerms || shared.length > 0 || questionSpecific.length > 0 || aliases.length > 0;
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
  const matches = [...new Set(criterionMatches(question, criterion, answerText))];
  if (!matches.length) {
    return { score: 0, matched: false, keywordOnly: false, matchedAliases: [] };
  }

  const max = Number(criterion.points || 0);
  const requestedMinimumMatches = Number(criterion.minimumMatches || 0);
  const targetCoverage = requestedMinimumMatches > 0 ? requestedMinimumMatches : 1;
  const aliasCoverage = Math.min(1, matches.length / targetCoverage);
  const signalFamilies = countSignalFamilies(answerText);
  const criticalMatched = criticalMatches(question, criterion, answerText);
  const criticalCap = Number(criterion.maxRatioWithoutCritical || 0.65);

  let ratio = 0.42 + aliasCoverage * 0.38;
  if (includesAny(answerText, REASONING_WORDS)) ratio += 0.08;
  if (includesAny(answerText, TRADE_OFF_WORDS)) ratio += 0.05;
  if (includesAny(answerText, FAILURE_WORDS)) ratio += 0.05;
  if (includesAny(answerText, OBSERVABILITY_WORDS)) ratio += 0.02;

  if (criterion.requiresReasoning && !includesAny(answerText, REASONING_WORDS)) ratio = Math.min(ratio, 0.65);
  if (!criticalMatched) ratio = Math.min(ratio, criticalCap);

  if (matches.length >= targetCoverage && criticalMatched && (!criterion.requiresReasoning || includesAny(answerText, REASONING_WORDS))) {
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
  if (matchedLabels.length) return `Covered ${matchedLabels.length} area${matchedLabels.length === 1 ? '' : 's'} in ${section.title}, but ${missedLabels.slice(0, 2).join(', ') || 'some details'} could be clearer.`;
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
    scoringExplanation: 'Scored based on key design coverage, clear reasoning, trade-offs, reliability, security, scaling, and observability.',
    scoringSignals: SCORING_SIGNALS,
    ...overrides
  };
}

function countWords(answerText) {
  return words(answerText).length;
}

export function applyGatekeeperCaps(totalScore, maxScore, sectionScores) {
  let cappedScore = totalScore;
  GATEKEEPER_CAPS.forEach(([sectionId, maxRatio]) => {
    const section = sectionScores.find((item) => item.id === sectionId);
    if (section && section.score === 0) cappedScore = Math.min(cappedScore, Math.round(maxScore * maxRatio));
  });
  return cappedScore;
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

  totalScore = applyGatekeeperCaps(totalScore, maxScore, sectionScores);
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
