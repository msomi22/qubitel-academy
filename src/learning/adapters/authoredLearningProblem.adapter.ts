import type {
  LearningBookContent,
  LearningContentBlock
} from '../core/learningNode.types.ts';

export type AuthoredLearningProblem = {
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
  estimatedTime?: unknown;
  estimatedTimeSeconds?: unknown;
  [key: string]: unknown;
};

export type AuthoredLearningProblemBookOptions = {
  manifestId?: string;
  pageId?: string;
  pageSubtitle?: string;
  pageBreakAfterBodyIndexes?: readonly number[];
};

type AuthoredBodyBlock = Record<string, unknown> & {
  type: string;
};

function requireText(value: unknown, field: string, sourceId: string): string {
  if (typeof value === 'string' && value.trim()) return value;
  throw new Error(`Authored learning problem ${sourceId} requires a non-empty ${field}.`);
}

function requireBodyBlock(
  candidate: unknown,
  index: number,
  sourceId: string
): AuthoredBodyBlock {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
    throw new Error(
      `Authored learning problem ${sourceId} has a malformed body block at index ${index}.`
    );
  }

  const block = candidate as Record<string, unknown>;
  if (typeof block.type !== 'string' || !block.type.trim()) {
    throw new Error(
      `Authored learning problem ${sourceId} has a body block without a type at index ${index}.`
    );
  }

  return block as AuthoredBodyBlock;
}

function adaptBodyBlock(
  candidate: unknown,
  index: number,
  sourceId: string
): LearningContentBlock {
  const block = requireBodyBlock(candidate, index, sourceId);
  const blockId = `${sourceId}-block-${String(index + 1).padStart(3, '0')}`;
  const authoredTitle = typeof block.title === 'string' && block.title.trim()
    ? block.title
    : undefined;

  if (block.type === 'checklist') {
    if (!Array.isArray(block.items) || block.items.length === 0) {
      throw new Error(
        `Authored learning problem ${sourceId} requires non-empty body[${index}].items.`
      );
    }

    const items = block.items.map((item, itemIndex) => (
      requireText(item, `body[${index}].items[${itemIndex}]`, sourceId)
    ));

    return {
      id: blockId,
      type: 'list',
      ...(authoredTitle ? { title: authoredTitle } : {}),
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
        `Authored learning problem ${sourceId} requires non-empty body[${index}].columns.`
      );
    }
    if (!Array.isArray(block.rows) || block.rows.length === 0) {
      throw new Error(
        `Authored learning problem ${sourceId} requires non-empty body[${index}].rows.`
      );
    }

    const columns = block.columns.map((column, columnIndex) => (
      requireText(column, `body[${index}].columns[${columnIndex}]`, sourceId)
    ));
    const rows = block.rows.map((candidateRow, rowIndex) => {
      if (!Array.isArray(candidateRow) || candidateRow.length !== columns.length) {
        throw new Error(
          `Authored learning problem ${sourceId} requires body[${index}].rows[${rowIndex}] `
          + `to contain ${columns.length} cells.`
        );
      }

      return candidateRow.map((cell, columnIndex) => (
        requireText(
          cell,
          `body[${index}].rows[${rowIndex}][${columnIndex}]`,
          sourceId
        )
      ));
    });

    return {
      id: blockId,
      type: 'list',
      ...(authoredTitle ? { title: authoredTitle } : {}),
      items: rows.map((row) => (
        row.map((cell, columnIndex) => `${columns[columnIndex]}: ${cell}`).join(' · ')
      )),
      metadata: {
        sourceBlockId: blockId,
        sourceBlockType: block.type,
        sourceBlockIndex: index,
        sourceColumns: [...columns],
        sourceRows: rows.map((row) => [...row])
      }
    };
  }

  if (block.type !== 'section' && block.type !== 'callout') {
    throw new Error(
      `Authored learning problem ${sourceId} uses unsupported body block type `
      + `${block.type} at index ${index}.`
    );
  }

  const title = requireText(block.title, `body[${index}].title`, sourceId);

  return {
    id: blockId,
    type: 'text',
    title,
    text: requireText(block.content, `body[${index}].content`, sourceId),
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

function appendTextBlock(
  blocks: LearningContentBlock[],
  value: unknown,
  field: 'explanation' | 'finalTakeaway',
  sourceId: string
): void {
  if (value === undefined || value === null) return;

  blocks.push({
    id: `${sourceId}-${field}`,
    type: 'text',
    title: field === 'explanation' ? 'Explanation' : 'Remember',
    text: requireText(value, field, sourceId),
    metadata: { sourceField: field }
  });
}

function getPageBreaks(
  candidateIndexes: readonly number[] | undefined,
  bodyLength: number,
  hasAppendedContent: boolean,
  sourceId: string
): Set<number> {
  if (candidateIndexes === undefined) return new Set();

  let previous = -1;
  candidateIndexes.forEach((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= bodyLength) {
      throw new Error(
        `Authored learning problem ${sourceId} has an out-of-range page break ${index}.`
      );
    }
    if (index <= previous) {
      throw new Error(
        `Authored learning problem ${sourceId} page breaks must be sorted and unique.`
      );
    }
    if (index === bodyLength - 1 && !hasAppendedContent) {
      throw new Error(
        `Authored learning problem ${sourceId} page break ${index} creates an empty page.`
      );
    }
    previous = index;
  });

  return new Set(candidateIndexes);
}

function createPages(
  bodyBlocks: LearningContentBlock[],
  appendedBlocks: LearningContentBlock[],
  title: string,
  sourceId: string,
  options: AuthoredLearningProblemBookOptions,
  provenance: Record<string, unknown>
): LearningBookContent['pages'] {
  const pageBreaks = getPageBreaks(
    options.pageBreakAfterBodyIndexes,
    bodyBlocks.length,
    appendedBlocks.length > 0,
    sourceId
  );
  const groups: LearningContentBlock[][] = [];
  let current: LearningContentBlock[] = [];

  bodyBlocks.forEach((block, index) => {
    current.push(block);
    if (pageBreaks.has(index)) {
      groups.push(current);
      current = [];
    }
  });

  current.push(...appendedBlocks);
  if (current.length > 0) groups.push(current);

  return groups.map((blocks, index) => {
    const pageNumber = index + 1;
    const id = groups.length === 1 && options.pageId
      ? options.pageId
      : `${sourceId}-page-${String(pageNumber).padStart(3, '0')}`;

    return {
      id,
      title: groups.length === 1 ? title : blocks[0]?.title || `${title} ${pageNumber}`,
      ...(options.pageSubtitle ? { subtitle: options.pageSubtitle } : {}),
      blocks,
      metadata: {
        ...provenance,
        semanticPagePosition: pageNumber
      }
    };
  });
}

export function adaptAuthoredLearningProblemToBook(
  problem: AuthoredLearningProblem,
  options: AuthoredLearningProblemBookOptions = {}
): LearningBookContent {
  if (!problem || typeof problem !== 'object') {
    throw new Error('A normalized authored learning problem object is required.');
  }

  const sourceId = requireText(problem.id, 'id', 'unknown');
  const title = requireText(problem.title, 'title', sourceId);
  if (!Array.isArray(problem.body) || problem.body.length === 0) {
    throw new Error(`Authored learning problem ${sourceId} requires a non-empty body array.`);
  }

  const bodyBlocks = problem.body.map(
    (block, index) => adaptBodyBlock(block, index, sourceId)
  );
  const appendedBlocks: LearningContentBlock[] = [];
  appendTextBlock(appendedBlocks, problem.explanation, 'explanation', sourceId);
  appendTextBlock(appendedBlocks, problem.finalTakeaway, 'finalTakeaway', sourceId);

  const provenance = {
    sourceType: 'authoredLearningProblem',
    authoredProblemType: problem.type,
    authoredProblemId: sourceId,
    ...(options.manifestId ? { manifestId: options.manifestId } : {}),
    tags: Array.isArray(problem.tags) ? [...problem.tags] : [],
    authoredMetadata: { ...(problem.metadata || {}) },
    difficulty: problem.difficulty,
    estimatedTime: problem.estimatedTime,
    estimatedTimeSeconds: problem.estimatedTimeSeconds
  };

  return {
    type: 'book',
    title,
    description: problem.question || problem.prompt || '',
    pages: createPages(
      bodyBlocks,
      appendedBlocks,
      title,
      sourceId,
      options,
      provenance
    ),
    metadata: {
      ...provenance,
      sourceProblem: problem
    }
  };
}
