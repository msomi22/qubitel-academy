const DEFAULT_WORD_BOUNDARY = '[\\p{L}\\p{N}_-]';

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeTermValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeAliasList(term) {
  return [term.term, ...(Array.isArray(term.aliases) ? term.aliases : [])]
    .map(normalizeTermValue)
    .filter(Boolean);
}

function compareByMatchPriority(left, right) {
  return right.matchText.length - left.matchText.length
    || left.matchText.localeCompare(right.matchText);
}

export function normalizeGlossaryTerms(terms = []) {
  const seenAliases = new Set();

  return terms
    .filter((term) => term && typeof term === 'object')
    .flatMap((term) => {
      const id = normalizeTermValue(term.id);
      const canonicalTerm = normalizeTermValue(term.term);
      const definition = normalizeTermValue(term.definition);

      if (!id || !canonicalTerm || !definition) return [];

      return normalizeAliasList(term).map((alias) => {
        const aliasKey = alias.toLocaleLowerCase();
        if (seenAliases.has(aliasKey)) return null;
        seenAliases.add(aliasKey);

        return {
          ...term,
          id,
          term: canonicalTerm,
          definition,
          matchText: alias,
          matchKey: aliasKey
        };
      }).filter(Boolean);
    })
    .sort(compareByMatchPriority);
}

export function buildGlossaryMatcher(terms = []) {
  const entries = normalizeGlossaryTerms(terms);

  if (!entries.length) {
    return {
      entries,
      pattern: null,
      findMatches: () => []
    };
  }

  const source = entries.map((entry) => escapeRegExp(entry.matchText)).join('|');
  const pattern = new RegExp(`(?<!${DEFAULT_WORD_BOUNDARY})(${source})(?!${DEFAULT_WORD_BOUNDARY})`, 'giu');
  const byMatchKey = new Map(entries.map((entry) => [entry.matchKey, entry]));

  function findMatches(text) {
    if (typeof text !== 'string' || !text || !pattern) return [];

    const matches = [];
    let match;
    pattern.lastIndex = 0;

    while ((match = pattern.exec(text)) !== null) {
      const [matchedText] = match;
      const entry = byMatchKey.get(matchedText.toLocaleLowerCase());
      if (!entry) continue;

      matches.push({
        start: match.index,
        end: match.index + matchedText.length,
        text: matchedText,
        term: entry
      });
    }

    return matches;
  }

  return { entries, pattern, findMatches };
}

export function findGlossaryMatches(text, terms = []) {
  return buildGlossaryMatcher(terms).findMatches(text);
}
