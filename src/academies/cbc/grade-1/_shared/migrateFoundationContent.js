const FOUNDATION_TAG = 'foundation-practice';

function retargetTags(question, topicId, learningAreaId, extraTags = []) {
  return [
    ...new Set([
      ...(question.tags || []).filter((tag) => tag !== FOUNDATION_TAG),
      topicId,
      learningAreaId,
      ...extraTags
    ])
  ];
}

export function retargetFoundationQuestions(sourceQuestions, {
  ids,
  topicId,
  learningAreaId,
  tags = [],
  metadata = {},
  sequenceStart = null
}) {
  const selectedIds = new Set(ids);

  return sourceQuestions
    .filter((question) => selectedIds.has(question.id))
    .map((question, index) => ({
      ...question,
      topicId,
      tags: retargetTags(question, topicId, learningAreaId, tags),
      metadata: {
        ...question.metadata,
        ...metadata,
        subject: topicId,
        learningAreaId,
        sequence: Number.isFinite(sequenceStart)
          ? sequenceStart + index
          : question.metadata?.sequence
      }
    }));
}
