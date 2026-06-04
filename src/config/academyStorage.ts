import { getActiveAcademy } from './detectAcademy.ts';

export function getAcademyStorageKey(hostname?: string): string {
  return getActiveAcademy(hostname).storageKey;
}
