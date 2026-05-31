import { glossaryTerms } from '../../data/glossary/glossaryTerms.js';
import { buildGlossaryMatcher } from './glossaryMatcher.js';
import {
  getProtectedTextRanges,
  isLikelyExecutableOrCodeText,
  rangeOverlapsProtectedRange
} from './glossaryGuards.js';

let defaultMatcher;

export function getDefaultGlossaryMatcher() {
  if (!defaultMatcher) {
    defaultMatcher = buildGlossaryMatcher(glossaryTerms);
  }

  return defaultMatcher;
}

function appendTextToken(tokens, value) {
  if (!value) return;
  const previous = tokens[tokens.length - 1];

  if (previous?.type === 'text') {
    previous.value += value;
    return;
  }

  tokens.push({ type: 'text', value });
}

export function tokenizeGlossaryText(text, options = {}) {
  if (typeof text !== 'string' || !text) return [];
  if (options.enabled === false) return [{ type: 'text', value: text }];
  if (isLikelyExecutableOrCodeText(text)) return [{ type: 'text', value: text }];

  const matcher = options.matcher || getDefaultGlossaryMatcher();
  const protectedRanges = options.protectedRanges || getProtectedTextRanges(text);
  const matches = matcher.findMatches(text)
    .filter((match) => !rangeOverlapsProtectedRange(match, protectedRanges));

  if (!matches.length) return [{ type: 'text', value: text }];

  const tokens = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.start < cursor) continue;

    appendTextToken(tokens, text.slice(cursor, match.start));
    tokens.push({
      type: 'glossary',
      value: match.text,
      term: match.term,
      start: match.start,
      end: match.end
    });
    cursor = match.end;
  }

  appendTextToken(tokens, text.slice(cursor));
  return tokens;
}

export function hasGlossaryTokens(text, options = {}) {
  return tokenizeGlossaryText(text, options).some((token) => token.type === 'glossary');
}
