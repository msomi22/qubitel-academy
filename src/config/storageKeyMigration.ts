import { getActiveAcademy } from './detectAcademy.ts';

const LEGACY_STORAGE_KEYS: Record<string, string> = {
  tech: 'senior-dev-accelerator:v2',
  cbc: 'senior-dev-accelerator:v2:cbc',
  'customer-experience': 'senior-dev-accelerator:v2:customer-experience'
};

const LEGACY_RECENT_QUESTION_KEYS: Record<string, string> = {
  tech: 'senior-dev-accelerator:recent-questions',
  cbc: 'senior-dev-accelerator:v2:cbc:recent-questions',
  'customer-experience': 'senior-dev-accelerator:v2:customer-experience:recent-questions'
};

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

function canUseStorage(storage: StorageLike | undefined): storage is StorageLike {
  return Boolean(storage);
}

function getLocalStorage(): StorageLike | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

function copyLegacyValueIfNeeded(storage: StorageLike, legacyKey: string, currentKey: string): boolean {
  if (!legacyKey || !currentKey || legacyKey === currentKey) return false;

  const currentValue = storage.getItem(currentKey);
  if (currentValue !== null) return false;

  const legacyValue = storage.getItem(legacyKey);
  if (legacyValue === null) return false;

  storage.setItem(currentKey, legacyValue);
  return true;
}

export function getLegacyAcademyStorageKey(academyId = getActiveAcademy().id): string | undefined {
  return LEGACY_STORAGE_KEYS[academyId];
}

export function getLegacyRecentQuestionsStorageKey(academyId = getActiveAcademy().id): string | undefined {
  return LEGACY_RECENT_QUESTION_KEYS[academyId];
}

export function migrateStorageKey({
  legacyKey,
  currentKey,
  storage = getLocalStorage()
}: {
  legacyKey?: string;
  currentKey: string;
  storage?: StorageLike;
}): boolean {
  if (!canUseStorage(storage) || !legacyKey) return false;

  try {
    return copyLegacyValueIfNeeded(storage, legacyKey, currentKey);
  } catch {
    return false;
  }
}

export function migrateAcademyStorageKey({
  academyId = getActiveAcademy().id,
  currentKey = getActiveAcademy().storageKey,
  storage = getLocalStorage()
}: {
  academyId?: string;
  currentKey?: string;
  storage?: StorageLike;
} = {}): boolean {
  if (!currentKey) return false;

  return migrateStorageKey({
    legacyKey: getLegacyAcademyStorageKey(academyId),
    currentKey,
    storage
  });
}

export function migrateRecentQuestionsStorageKey({
  academyId = getActiveAcademy().id,
  currentKey,
  storage = getLocalStorage()
}: {
  academyId?: string;
  currentKey: string;
  storage?: StorageLike;
}): boolean {
  return migrateStorageKey({
    legacyKey: getLegacyRecentQuestionsStorageKey(academyId),
    currentKey,
    storage
  });
}
