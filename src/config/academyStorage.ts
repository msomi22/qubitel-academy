import { getActiveAcademy } from './detectAcademy.ts';
import { migrateAcademyStorageKey } from './storageKeyMigration.ts';

export function getAcademyStorageKey(hostname?: string): string {
  const academy = getActiveAcademy(hostname);
  migrateAcademyStorageKey({
    academyId: academy.id,
    currentKey: academy.storageKey
  });
  return academy.storageKey;
}
