export type AcademyId = 'tech' | 'cbc' | 'customer-experience';

export interface AcademyConfig {
  id: AcademyId;
  displayName: string;
  productName: string;
  default?: boolean;
  subdomains: string[];
  storageKey: string;
  categoryIds: string[];
}
