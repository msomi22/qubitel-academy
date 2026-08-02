import type { LearningNode } from '../learning/core/index.ts';

export const STANDARD_CBC_CONTENT_TABS = [
  { key: 'learningMaterial', label: 'Learning Material', icon: '📖' },
  { key: 'practice', label: 'Practice', icon: '✏️' },
  { key: 'assessment', label: 'Assessment', icon: '✅' },
  { key: 'lessonPlan', label: 'Lesson Plan', icon: '🧑‍🏫' }
] as const;

export const ASSESSMENT_CARDS_PER_PAGE = 12;

export type StandardCbcContentType = typeof STANDARD_CBC_CONTENT_TABS[number]['key'];

type ExamDescriptor = {
  id: string;
  title?: string;
  description?: string;
  estimatedTime?: string;
  metadata?: Record<string, unknown>;
  questionCount?: number;
  questions?: unknown[];
};

export type AssessmentBookPage<TExam extends ExamDescriptor = ExamDescriptor> = {
  id: string;
  type: 'assessmentCollection';
  title: string;
  assessmentNode: LearningNode;
  exams: readonly TExam[];
};

export type PlaceholderBookPage = {
  type: 'placeholder';
  title: string;
};

export function isStandardCbcContentType(value: string): value is StandardCbcContentType {
  return STANDARD_CBC_CONTENT_TABS.some((tab) => tab.key === value);
}

export function resolveStandardCbcContentType(value: string): StandardCbcContentType {
  return isStandardCbcContentType(value) ? value : 'learningMaterial';
}

export function isCbcTheme(
  node: LearningNode | undefined,
  breadcrumbs: LearningNode[] = []
): boolean {
  return node?.kind === 'theme' && breadcrumbs.some((item) => item.id === 'cbc-academy');
}

export function createMissingContentPage(
  contentType: StandardCbcContentType
): PlaceholderBookPage {
  const tab = STANDARD_CBC_CONTENT_TABS.find((item) => item.key === contentType);

  return {
    type: 'placeholder',
    title: `${tab?.label || 'Content'} is not available yet.`
  };
}

export function createAssessmentBookPages<TExam extends ExamDescriptor>(
  assessmentNode: LearningNode
): AssessmentBookPage<TExam>[] {
  const content = assessmentNode.content;
  const exams = content && typeof content === 'object' && 'exams' in content
    && Array.isArray(content.exams)
    ? content.exams as readonly TExam[]
    : [];

  const pages: AssessmentBookPage<TExam>[] = [];

  for (let index = 0; index < exams.length; index += ASSESSMENT_CARDS_PER_PAGE) {
    pages.push({
      id: `${assessmentNode.id}-page-${Math.floor(index / ASSESSMENT_CARDS_PER_PAGE) + 1}`,
      type: 'assessmentCollection',
      title: assessmentNode.label || 'Assessment',
      assessmentNode,
      exams: exams.slice(index, index + ASSESSMENT_CARDS_PER_PAGE)
    });
  }

  return pages;
}