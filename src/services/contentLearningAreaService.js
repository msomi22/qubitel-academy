const FALLBACK_SEQUENCE = 999;
const UNGROUPED_AREA = {
  id: 'ungrouped',
  title: 'Ungrouped',
  description: '',
  sequence: FALLBACK_SEQUENCE
};

function titleFromId(id = '') {
  return String(id)
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ') || 'General';
}

function finiteSequence(value, fallback = FALLBACK_SEQUENCE) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function normalizeLearningArea(area = {}) {
  if (!area?.id) return null;

  return {
    id: area.id,
    title: area.title || area.strandTitle || titleFromId(area.id),
    description: area.description || area.strandDescription || '',
    sequence: finiteSequence(area.sequence)
  };
}

function topicLearningAreas(topicManifest = {}) {
  return (topicManifest.learningAreas || [])
    .map(normalizeLearningArea)
    .filter(Boolean);
}

function getManifestEntry(item = {}) {
  return item.metadata?.manifestEntry || null;
}

function getItemLearningAreaId(item = {}) {
  return item.metadata?.learningAreaId
    || item.metadata?.strandId
    || getManifestEntry(item)?.learningAreaId
    || null;
}

function getItemLearningAreaMetadata(item = {}, topicManifest = {}) {
  const id = getItemLearningAreaId(item);
  if (!id) return null;

  const manifestArea = topicLearningAreas(topicManifest).find((area) => area.id === id);
  if (manifestArea) return manifestArea;

  return normalizeLearningArea({
    id,
    title: item.metadata?.learningAreaTitle || item.metadata?.strandTitle,
    description: item.metadata?.learningAreaDescription || item.metadata?.strandDescription,
    sequence: item.metadata?.learningAreaSequence || item.metadata?.strandSequence || item.metadata?.sequence
  });
}

function getItemContentKind(item = {}) {
  const manifestKind = getManifestEntry(item)?.kind;
  if (manifestKind === 'lesson') return 'lesson';
  if (manifestKind === 'assessment') return 'assessment';
  if (manifestKind === 'practice') return 'practice';
  if (item.metadata?.assessmentType === 'exam') return 'assessment';
  if (item.type === 'learning') return 'lesson';
  return 'practice';
}

function assessmentGroupKey(item = {}) {
  return item.metadata?.examId || getManifestEntry(item)?.id || item.id;
}

function createEmptySummary(area) {
  return {
    ...area,
    items: [],
    lessons: [],
    practice: [],
    assessments: [],
    assessmentGroupIds: new Set(),
    completedCount: 0,
    totalCount: 0
  };
}

function finalizeSummary(summary) {
  const assessmentCount = summary.assessmentGroupIds.size || summary.assessments.length;
  const totalCount = summary.items.length;
  const percent = totalCount ? Math.round((summary.completedCount / totalCount) * 100) : 0;

  return {
    id: summary.id,
    title: summary.title,
    description: summary.description,
    sequence: summary.sequence,
    items: summary.items,
    lessons: summary.lessons,
    practice: summary.practice,
    assessments: summary.assessments,
    lessonCount: summary.lessons.length,
    practiceCount: summary.practice.length,
    assessmentCount,
    totalCount,
    completedCount: summary.completedCount,
    percent
  };
}

function sortLearningAreas(a, b) {
  const sequenceDelta = finiteSequence(a.sequence) - finiteSequence(b.sequence);
  if (sequenceDelta !== 0) return sequenceDelta;
  return String(a.title || a.id).localeCompare(String(b.title || b.id));
}

export function shouldUseLearningAreaNavigation(topicManifest = {}) {
  return topicLearningAreas(topicManifest).length > 0;
}

export function getContentLearningArea(item = {}, topicManifest = {}) {
  return getItemLearningAreaMetadata(item, topicManifest);
}

export function filterContentByLearningArea(items = [], topicManifest = {}, learningAreaId) {
  if (!learningAreaId) return items;
  return items.filter((item) => getContentLearningArea(item, topicManifest)?.id === learningAreaId);
}

export function buildLearningAreaSummaries(topicManifest = {}, items = [], completed = {}) {
  const summaries = new Map();

  for (const area of topicLearningAreas(topicManifest)) {
    summaries.set(area.id, createEmptySummary(area));
  }

  for (const item of items) {
    const area = getContentLearningArea(item, topicManifest) || UNGROUPED_AREA;
    if (!summaries.has(area.id)) summaries.set(area.id, createEmptySummary(area));

    const summary = summaries.get(area.id);
    const kind = getItemContentKind(item);
    summary.items.push(item);
    summary.totalCount += 1;
    if (completed[item.id]) summary.completedCount += 1;

    if (kind === 'lesson') summary.lessons.push(item);
    else if (kind === 'assessment') {
      summary.assessments.push(item);
      const groupKey = assessmentGroupKey(item);
      if (groupKey) summary.assessmentGroupIds.add(groupKey);
    } else {
      summary.practice.push(item);
    }
  }

  return Array.from(summaries.values())
    .map(finalizeSummary)
    .sort(sortLearningAreas);
}
