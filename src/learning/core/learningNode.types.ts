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

export type LearningNode = {
  id: string;
  kind: string;
  label: string;
  summary?: string;
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
