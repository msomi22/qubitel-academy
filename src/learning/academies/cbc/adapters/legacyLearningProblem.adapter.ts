import type {
  LearningBookContent,
  LearningContentBlock
} from '../../../core/learningNode.types.ts';

type LegacyLearningProblem = {
  id: string;
  type?: string;
  title: string;
  question?: string;
  prompt?: string;
  body?: unknown[];
  explanation?: string;
  finalTakeaway?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  difficulty?: unknown;
  estimatedTimeSeconds?: unknown;
  [key: string]: unknown;
};

type LegacyLearningProblemBookOptions = {
  manifestId?: string;
  pageId?: string;
  pageSubtitle?: string;
};

type LegacyBodyBlock = Record<string, unknown> & {
  type: string;
};

function requireNonEmptyString(value: unknown, field: string, sourceId: string): string {
  if (typeof value === 'string' && value.trim()) return value;
  throw new Error(`Legacy learning problem ${sourceId} requires a non-empty ${field}.`);
}

function requireBodyBlock(
  block: unknown,
  index: number,
  sourceId: string
): LegacyBodyBlock {
  if (!block || typeof block !== 'object' || Array.isArray(block)) {
    throw new Error(
      `Legacy learning problem ${sourceId} has a malformed body block at index ${index}.`
    );
  }

  const blockType = (block as Record<string, unknown>).type;
  if (typeof blockType !== 'string' || !blockType.trim()) {
    throw new Error(
      `Legacy learning problem ${sourceId} has a body block without a type at index ${index}.`
    );
  }

  return block as LegacyBodyBlock;
}

function adaptBodyBlock(
  candidate: unknown,
  index: number,
  sourceId: string
): LearningContentBlock {
  const block = requireBodyBlock(candidate, index, sourceId);

  if (block.type !== 'section' && block.type !== 'callout') {
    throw new Error(
      `Legacy learning problem ${sourceId} uses unsupported body block type `
      + `${block.type} at index ${index}.`
    );
  }

  const title = requireNonEmptyString(block.title, `body[${index}].title`, sourceId);
  const text = requireNonEmptyString(block.content, `body[${index}].content`, sourceId);

  return {
    id: `${sourceId}-block-${String(index + 1).padStart(3, '0')}`,
    type: 'text',
    title,
    text,
    metadata: {
      sourceBlockType: block.type,
      ...(block.type === 'callout' && typeof block.tone === 'string'
        ? { sourceTone: block.tone }
        : {})
    }
  };
}

function appendAuthoredTextBlock(
  blocks: LearningContentBlock[],
  value: unknown,
  field: 'explanation' | 'finalTakeaway',
  sourceId: string
): void {
  if (value === undefined || value === null) return;

  const text = requireNonEmptyString(value, field, sourceId);
  blocks.push({
    id: `${sourceId}-${field}`,
    type: 'text',
    title: field === 'explanation' ? 'Explanation' : 'Remember',
    text,
    metadata: { sourceField: field }
  });
}

export function adaptLegacyLearningProblemToBook(
  lesson: LegacyLearningProblem,
  options: LegacyLearningProblemBookOptions = {}
): LearningBookContent {
  if (!lesson || typeof lesson !== 'object') {
    throw new Error('A normalized legacy learning problem object is required.');
  }

  const sourceId = requireNonEmptyString(lesson.id, 'id', 'unknown');
  const title = requireNonEmptyString(lesson.title, 'title', sourceId);
  if (!Array.isArray(lesson.body)) {
    throw new Error(`Legacy learning problem ${sourceId} requires a body array.`);
  }

  const blocks = lesson.body.map(
    (block, index) => adaptBodyBlock(block, index, sourceId)
  );
  appendAuthoredTextBlock(blocks, lesson.explanation, 'explanation', sourceId);
  appendAuthoredTextBlock(blocks, lesson.finalTakeaway, 'finalTakeaway', sourceId);

  const provenance = {
    sourceType: 'legacyLearningProblem',
    authoredProblemType: lesson.type,
    authoredLessonId: sourceId,
    ...(options.manifestId ? { manifestId: options.manifestId } : {}),
    tags: Array.isArray(lesson.tags) ? [...lesson.tags] : [],
    authoredMetadata: { ...(lesson.metadata || {}) },
    difficulty: lesson.difficulty,
    estimatedTimeSeconds: lesson.estimatedTimeSeconds
  };

  return {
    type: 'book',
    title,
    description: lesson.question || lesson.prompt || '',
    pages: [
      {
        id: options.pageId || `${sourceId}-page-001`,
        title,
        ...(options.pageSubtitle ? { subtitle: options.pageSubtitle } : {}),
        blocks,
        metadata: { ...provenance }
      }
    ],
    metadata: provenance
  };
}
