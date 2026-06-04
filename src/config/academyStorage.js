import { getActiveAcademy } from './detectAcademy.js';

export function getAcademyStorageKey(hostname) {
  return getActiveAcademy(hostname).storageKey;
}