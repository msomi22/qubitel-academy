export type AcademyId = 'tech' | 'cbc' | 'customer-experience';
export type ContentStatus = 'draft' | 'review' | 'active' | 'archived';

export interface AcademyConfig {
  id: AcademyId;
  displayName: string;
  productName: string;
  default?: boolean;
  subdomains: string[];
  storageKey: string;
  categoryIds: string[];
}

export interface ContentReference {
  id: string;
  file: string;
}

export interface AcademyManifest {
  id: AcademyId;
  displayName: string;
  productName: string;
  description?: string;
  subdomains: string[];
  storageKey: string;
  default?: boolean;
  categories: string[];
}

export interface CategoryManifest {
  id: string;
  displayName: string;
  academy: AcademyId;
  description?: string;
  shortName?: string;
  domain?: string;
  tags?: string[];
  route?: string;
  featured?: boolean;
  topics: string[];
}

export interface TopicManifest {
  id: string;
  displayName: string;
  academy: AcademyId;
  category: string;
  description?: string;
  status?: ContentStatus;
  lessons: ContentReference[];
  practice: ContentReference[];
  assessments: ContentReference[];
  [key: string]: unknown;
}

export interface AcademyCatalog {
  academy: AcademyManifest;
  categories: CategoryManifest[];
  topics: TopicManifest[];
}
