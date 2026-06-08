import type { AcademyConfig, AcademyId } from '../types/academy.ts';

export const DEFAULT_ACADEMY_ID: AcademyId = 'tech';

export const academyRegistry: Record<AcademyId, AcademyConfig> = {
  tech: {
    id: 'tech',
    displayName: 'Technology Academy',
    productName: 'Qubitel Academy',
    default: true,
    subdomains: ['academy.qubitel.net', 'tech.academy.qubitel.net'],
    storageKey: 'qubitel-academy