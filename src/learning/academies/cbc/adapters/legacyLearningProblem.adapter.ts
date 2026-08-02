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
  /**
   * Zero-based authored body indexes after which a semantic page break is inserted.
   * These indexes are resolved before explanation and finalTakeaway are appended.
   */
  pageBreakAfterBodyIndexes?: readonly number[];
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
  const blockId = `${sourceId}-block-${String(index + 1).padStart(3, '0')}`;

  if (
    block.type !== 'section'
    && block.type !== 'callout'
    && block.type !== 'checklist'
    && block.type !== 'table'
  ) {
    throw new Error(
      `Legacy learning problem ${sourceId} uses unsupported body block type `
      + `${block.type} at index ${index}.`
    );
  }

  const title = requireNonEmptyString(block.title, `body[${index}].title`, sourceId);

  if (block.type === 'checklist') {
    if (!Array.isArray(block.items) || block.items.length === 0) {
      throw new Error(
        `Legacy learning problem ${sourceId} requires non-empty body[${index}].items.`
      );
    }

    const items = block.items.map((item, itemIndex) => (
      requireNonEmptyString(item, `body[${index}].items[${itemIndex}]`, sourceId)
    ));

    return {
      id: blockId,
      type: 'list',
      title,
      items,
      metadata: {
        sourceBlockId: blockId,
        sourceBlockType: block.type,
        sourceBlockIndex: index,
        sourceItems: [...items]
      }
    };
  }

  if (block.type === 'table') {
    if (!Array.isArray(block.columns) || block.columns.length === 0) {
      throw new Error(
        `Legacy learning problem ${sourceId} requires non-empty body[${index}].columns.`
      );
    }
    if (!Array.isArray(block.rows) || block.rows.length === 0) {
      throw new Error(
        `Legacy learning problem ${sourceId} requires non-empty body[${index}].rows.`
      );
    }

    const columns = block.columns.map((column, columnIndex) => (
      requireNonEmptyString(column, `body[${index}].columns[${columnIndex}]`, sourceId)
    ));
    const rows = block.rows.map((candidateRow, rowIndex) => {
      if (!Array.isArray(candidateRow) || candidateRow.length !== columns.length) {
        throw new Error(
          `Legacy learning problem ${sourceId} requires body[${index}].rows[${rowIndex}] `
          + `to contain ${columns.length} cells.`
        );
      }

      return candidateRow.map((cell, columnIndex) => (
        requireNonEmptyString(
          cell,
          `body[${index}].rows[${rowIndex}][${columnIndex}]`,
          sourceId
        )
      ));
    });
    const items = rows.map((row) => (
      row.map((cell, columnIndex) => `${columns[columnIndex]}: ${cell}`).join(' · ')
    ));

    return {
      id: blockId,
      type: 'list',
      title,
      items,
      metadata: {
        sourceBlockId: blockId,
        sourceBlockType: block.type,
        sourceBlockIndex: index,
        sourceColumns: [...columns],
        sourceRows: rows.map((row) => [...row])
      }
    };
  }

  const text = requireNonEmptyString(block.content, `body[${index}].content`, sourceId);

  return {
    id: blockId,
    type: 'text',
    title,
    text,
    metadata: {
      sourceBlockId: blockId,
      sourceBlockType: block.type,
      sourceBlockIndex: index,
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

function resolvePageBreakIndexes(
  candidateIndexes: readonly number[] | undefined,
  bodyLength: number,
  hasAppendedContent: boolean,
  sourceId: string
): Set<number> {
  if (candidateIndexes === undefined) return new Set();
  if (!Array.isArray(candidateIndexes)) {
    throw new Error(
      `Legacy learning problem ${sourceId} pageBreakAfterBodyIndexes must be an array.`
    );
  }

  let previousIndex = -1;
  candidateIndexes.forEach((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= bodyLength) {
      throw new Error(
        `Legacy learning problem ${sourceId} has an out-of-range semantic page break ${index}.`
      );
    }
    if (index <= previousIndex) {
      throw new Error(
        `Legacy learning problem ${sourceId} semantic page breaks must be sorted and unique.`
      );
    }
    if (index === bodyLength - 1 && !hasAppendedContent) {
      throw new Error(
        `Legacy learning problem ${sourceId} semantic page break ${index} creates an empty page.`
      );
    }
    previousIndex = index;
  });

  return new Set(candidateIndexes);
}

function createSemanticPages(
  bodyBlocks: LearningContentBlock[],
  appendedBlocks: LearningContentBlock[],
  title: string,
  sourceId: string,
  options: LegacyLearningProblemBookOptions,
  provenance: Record<string, unknown>
): LearningBookContent['pages'] {
  const pageBreakIndexes = resolvePageBreakIndexes(
    options.pageBreakAfterBodyIndexes,
    bodyBlocks.length,
    appendedBlocks.length > 0,
    sourceId
  );
  const groupedBlocks: LearningContentBlock[][] = [];
  let currentBlocks: LearningContentBlock[] = [];

  bodyBlocks.forEach((block, index) => {
    currentBlocks.push(block);
    if (pageBreakIndexes.has(index)) {
      groupedBlocks.push(currentBlocks);
      currentBlocks = [];
    }
  });
  currentBlocks.push(...appendedBlocks);
  if (currentBlocks.length > 0) groupedBlocks.push(currentBlocks);

  return groupedBlocks.map((blocks, index) => {
    const pageNumber = index + 1;
    const pageId = groupedBlocks.length === 1 && options.pageId
      ? options.pageId
      : `${sourceId}-page-${String(pageNumber).padStart(3, '0')}`;

    return {
      id: pageId,
      title: groupedBlocks.length === 1 ? title : blocks[0]?.title || `${title} ${pageNumber}`,
      ...(options.pageSubtitle ? { subtitle: options.pageSubtitle } : {}),
      blocks,
      metadata: {
        ...provenance,
        semanticPagePosition: pageNumber
      }
    };
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
  if (lesson.body.length === 0) {
    throw new Error(`Legacy learning problem ${sourceId} requires a non-empty body array.`);
  }

  const bodyBlocks = lesson.body.map(
    (block, index) => adaptBodyBlock(block, index, sourceId)
  );
  const appendedBlocks: LearningContentBlock[] = [];
  appendAuthoredTextBlock(appendedBlocks, lesson.explanation, 'explanation', sourceId);
  appendAuthoredTextBlock(appendedBlocks, lesson.finalTakeaway, 'finalTakeaway', sourceId);

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
    pages: createSemanticPages(
      bodyBlocks,
      appendedBlocks,
      title,
      sourceId,
      options,
      provenance
    ),
    metadata: provenance
  };
}
