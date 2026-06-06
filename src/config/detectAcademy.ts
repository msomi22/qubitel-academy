import {
  DEFAULT_ACADEMY_ID,
  academyRegistry,
  getAcademyById
} from './academyRegistry.ts';

import type { AcademyConfig, AcademyId } from '../types/academy.ts';

export function detectAcademyIdFromHostname(hostname = ''): AcademyId {
  const normalized = String(hostname || '')
    .trim()
    .toLowerCase()
    .replace(/\.$/, '');

  const matchedAcademy = Object.values(academyRegistry).find((academy) =>
    (academy.subdomains || []).some((subdomain) => subdomain.toLowerCase() === normalized)
  );

  return matchedAcademy?.id || DEFAULT_ACADEMY_ID;
}

function isLocalHostname(hostname = '') {
  return ['localhost', '127.0.0.1', '::1'].includes(String(hostname || '').toLowerCase());
}

export function detectAcademyIdFromLocation(locationLike = globalThis?.location): AcademyId {
  const hostname = locationLike?.hostname || '';
  if (isLocalHostname(hostname)) {
    const academyId = new URLSearchParams(locationLike?.search || '').get('academy');
    if (academyId && academyRegistry[academyId as AcademyId]) return academyId as AcademyId;
  }

  return detectAcademyIdFromHostname(hostname);
}

export function getActiveAcademy(hostname = globalThis?.location?.hostname || ''): AcademyConfig {
  if (hostname === (globalThis?.location?.hostname || '')) {
    return getAcademyById(detectAcademyIdFromLocation(globalThis.location));
  }

  return getAcademyById(detectAcademyIdFromHostname(hostname));
}
