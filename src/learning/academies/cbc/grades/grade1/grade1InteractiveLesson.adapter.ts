import type {
  LearningBookPage,
  LearningContentBlock
} from '../../../../core/index.ts';

type CanonicalInteractiveLesson = {
  id: string;
  title: string;
  question?: string;
  body: unknown[];
  explanation?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
};

type SemanticInteractivePage = {
  id: string;
  title: string;
  startIndex: number;
  endIndex: number;
};

type InteractiveLessonPageOptions = {
  manifestId: string;
  interactiveBlockType: string;
  itemField: string;
  pageSubtitle: string;
  pages: readonly SemanticInteractivePage[];
};

type SourceBlock = Record<string, unknown> & {
  type: string;
};

function cloneValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneValue(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, cloneValue(item)])
    ) as T;
  }

  return value;
}

function requireText(value: unknown, field: string): string {
  if (typeof value === 'string' && value.trim()) return value;
  throw new Error(`${field} must be a non-empty string.`);
}

function requireBlock(value: unknown, lessonId: string): SourceBlock {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${lessonId} contains a malformed body block.`);
  }

  const block = value as Record<string, unknown>;
  return {
    ...block,
    type: requireText(block.type, `${lessonId} body block type`)
  };
}

export function createInteractiveLessonPages(
  lesson: CanonicalInteractiveLesson,
  options: InteractiveLessonPageOptions
): LearningBookPage[] {
  const lessonId = requireText(lesson?.id, 'lesson.id');
  requireText(lesson?.title, `${lessonId}.title`);
  requireText(options.manifestId, 'manifestId');
  requireText(options.interactiveBlockType, 'interactiveBlockType');
  requireText(options.itemField, 'itemField');

  if (!Array.isArray(lesson.body)) {
    throw new Error(`${lessonId}.body must be an array.`);
  }

  const sourceBlocks = lesson.body.map((block) => requireBlock(block, lessonId));
  const objectiveBlock = sourceBlocks.find((block) => block.type === 'section');
  const interactiveBlock = sourceBlocks.find(
    (block) => block.type === options.interactiveBlockType
  );

  if (!interactiveBlock) {
    throw new Error(`${lessonId} requires one ${options.interactiveBlockType} block.`);
  }

  const sourceItems = interactiveBlock[options.itemField];
  if (!Array.isArray(sourceItems) || sourceItems.length === 0) {
    throw new Error(`${lessonId}.${options.itemField} must be a non-empty array.`);
  }

  let expectedStartIndex = 0;
  const pageIds = new Set<string>();

  const pages = options.pages.map((page, pageIndex): LearningBookPage => {
    const pageId = requireText(page.id, `pages[${pageIndex}].id`);
    const pageTitle = requireText(page.title, `pages[${pageIndex}].title`);

    if (pageIds.has(pageId)) {
      throw new Error(`Duplicate interactive lesson page ID: ${pageId}.`);
    }
    pageIds.add(pageId);

    if (
      !Number.isInteger(page.startIndex)
      || !Number.isInteger(page.endIndex)
      || page.startIndex !== expectedStartIndex
      || page.endIndex <= page.startIndex
      || page.endIndex > sourceItems.length
    ) {
      throw new Error(`${lessonId} semantic pages must be contiguous and in source order.`);
    }

    expectedStartIndex = page.endIndex;
    const blocks: LearningContentBlock[] = [];

    if (pageIndex === 0 && objectiveBlock) {
      blocks.push(cloneValue(objectiveBlock) as LearningContentBlock);
    }

    blocks.push({
      ...cloneValue(interactiveBlock),
      id: `${pageId}-interactive-content`,
      [options.itemField]: cloneValue(sourceItems.slice(page.startIndex, page.endIndex)),
      metadata: {
        ...(interactiveBlock.metadata && typeof interactiveBlock.metadata === 'object'
          ? cloneValue(interactiveBlock.metadata as Record<string, unknown>)
          : {}),
        sourceBlockType: options.interactiveBlockType,
        sourceStartIndex: page.startIndex,
        sourceEndIndex: page.endIndex
      }
    } as LearningContentBlock);

    if (pageIndex === options.pages.length - 1 && lesson.explanation) {
      blocks.push({
        id: `${lessonId}-explanation`,
        type: 'text',
        title: 'Remember',
        text: lesson.explanation,
        metadata: { sourceField: 'explanation' }
      });
    }

    return {
      id: pageId,
      title: pageTitle,
      subtitle: options.pageSubtitle,
      blocks,
      metadata: {
        sourceType: 'canonicalInteractiveLesson',
        authoredLessonId: lessonId,
        manifestId: options.manifestId,
        sourceLearningAreaId: lesson.metadata?.learningAreaId,
        sourceTags: cloneValue(lesson.tags || []),
        sourceQuestion: lesson.question || '',
        semanticPagePosition: pageIndex + 1
      }
    };
  });

  if (expectedStartIndex !== sourceItems.length) {
    throw new Error(`${lessonId} semantic pages must include every source item exactly once.`);
  }

  return pages;
}