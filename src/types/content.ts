export type AcademyContentKind = 'lesson' | 'practice' | 'assessment';

export interface AcademyContentLocation {
  academyId: string;
  categoryId: string;
  topicId: string;
  kind: AcademyContentKind;
  id: string;
  file: string;
}
