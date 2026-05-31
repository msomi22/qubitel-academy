const URL_PATTERN = /https?:\/\/[^\s)]+/giu;
const MARKDOWN_LINK_PATTERN = /\[[^\]]+\]\(https?:\/\/[^\s)]+\)/giu;
const INLINE_CODE_PATTERN = /`[^`]+`/gu;
const COMMAND_LINE_PATTERN = /(^|\n)\s*(kubectl|k\s|docker|npm|node|git|helm|curl|wget|ssh|scp|cat|grep|awk|sed|chmod|chown|mkdir|rm|cp|mv)\b[^\n]*/giu;
const CODEISH_PATTERN = /\b[a-zA-Z_$][\w$]*\s*\(|[{};]|=>|\.\w+\b|\/api\/|--[\w-]+/u;

function collectRanges(text, pattern) {
  if (typeof text !== 'string' || !text) return [];

  const ranges = [];
  let match;
  pattern.lastIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    ranges.push({ start: match.index, end: match.index + match[0].length });
  }

  return ranges;
}

export function mergeRanges(ranges = []) {
  const sorted = ranges
    .filter((range) => Number.isInteger(range?.start) && Number.isInteger(range?.end) && range.end > range.start)
    .sort((left, right) => left.start - right.start || left.end - right.end);

  const merged = [];

  for (const range of sorted) {
    const previous = merged[merged.length - 1];
    if (!previous || range.start > previous.end) {
      merged.push({ ...range });
    } else {
      previous.end = Math.max(previous.end, range.end);
    }
  }

  return merged;
}

export function getProtectedTextRanges(text) {
  return mergeRanges([
    ...collectRanges(text, MARKDOWN_LINK_PATTERN),
    ...collectRanges(text, URL_PATTERN),
    ...collectRanges(text, INLINE_CODE_PATTERN),
    ...collectRanges(text, COMMAND_LINE_PATTERN)
  ]);
}

export function rangeOverlapsProtectedRange(range, protectedRanges = []) {
  return protectedRanges.some((protectedRange) => range.start < protectedRange.end && range.end > protectedRange.start);
}

export function isLikelyExecutableOrCodeText(text) {
  if (typeof text !== 'string') return false;
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (COMMAND_LINE_PATTERN.test(trimmed)) {
    COMMAND_LINE_PATTERN.lastIndex = 0;
    return true;
  }
  COMMAND_LINE_PATTERN.lastIndex = 0;
  return CODEISH_PATTERN.test(trimmed);
}
