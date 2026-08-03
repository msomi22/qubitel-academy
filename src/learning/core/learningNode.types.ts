export type NodeAttribute = {
  key: string;
  value: unknown;
};

export type NodeFeature = {
  kind: string;
};

export type NodeAction = {
  intent: string;
};

export type NodeAppearance = {
  key: string;
  value: unknown;
};

export type LearningContentBlock = {
  type: string;
  title?: string;
  text?: string;
  content?: string;
  body?: string;
  items?: string[];
  [key: string]: unknown;
};

export type LearningBookPage = {
  id: string;
  title: string;
  subtitle?: string;
  blocks: LearningContentBlock[];
  metadata?: Record<string, unknown>;
};

export type LearningBookContent = {
  type: 'book';
  title: string;
  description?: string;
  pages: LearningBookPage[];
  metadata?: Record<string, unknown>;
};

export type LearningNodeContent =
  | string
  | LearningBookContent
  | Record<string, unknown>
  | unknown[];

export type LearningNode = {
  id: string;
  kind: string;
  label: string;
  summary?: string;
  content?: LearningNodeContent;
  parentId?: string;
  childIds?: string[];
  attributes?: NodeAttribute[];
  features?: NodeFeature[];
  actions?: NodeAction[];
  appearances?: NodeAppearance[];
  version?: number;
};

export type LearningNodeInput = Omit<LearningNode, 'id' | 'kind' | 'label'> & {
  id: string;
  kind: string;
  label: string;
};

export type ContainerNodeKind =
  | 'platform'
  | 'academy'
  | 'category'
  | 'grade'
  | 'learningArea'
  | 'theme'
  | 'strand'
  | 'subStrand'
  | 'topic';

export type ContentNodeKind =
  | 'lesson'
  | 'question'
  | 'practice'
  | 'assessment'
  | 'exam'
  | 'notes'
  | 'revision'
  | 'activity';
