import {
  DEFAULT_ACADEMY_ID,
  academyRegistry,
  getAcademyById
} from './academyRegistry.ts';

import type { AcademyConfig, AcademyId } from '../types/academy.ts';

function normalizeHostname(hostname = '') {
  return String(hostname || '')
    .trim()
    .toLowerCase()
    .replace(/\.$/, '');
}

function normalizeAcademyParam(value: string | null): AcademyId | null {
  const academyId = String(value || '').trim().toLowerCase();

  if (academyId === 'cbc') return 'cbc';

  // URL shortcut: ?academy=cx
  if (academyId === 'cx') return 'customer-experience';

  // Also allow the real AcademyId directly
  if (academyId === 'customer-experience') return 'customer-experience';

  // academy=tech should use default
  if (academyId === 'tech') return DEFAULT_ACADEMY_ID;

  return null;
}

function isLocalHostname(hostname = '') {
  return ['localhost', '127.0.0.1', '::1'].includes(normalizeHostname(hostname));
}

function isCloudflarePagesHostname(hostname = '') {
  const normalized = normalizeHostname(hostname);
  return normalized === 'pages.dev' || normalized.endsWith('.pages.dev');
}

function canUseAcademyQueryOverride(hostname = '') {
  return isLocalHostname(hostname) || isCloudflarePagesHostname(hostname);
}

export function detectAcademyIdFromHostname(hostname = ''): AcademyId {
  const normalized = normalizeHostname(hostname);

  const matchedAcademy = Object.values(academyRegistry).find((academy) =>
    (academy.subdomains || []).some((subdomain) => subdomain.toLowerCase() === normalized)
  );

  return matchedAcademy?.id || DEFAULT_ACADEMY_ID;
}

export function detectAcademyIdFromLocation(locationLike = globalThis?.location): AcademyId {
  const hostname = locationLike?.hostname || '';
  const academyOverride = normalizeAcademyParam(
    new URLSearchParams(locationLike?.search || '').get('academy')
  );

  if (academyOverride && canUseAcademyQueryOverride(hostname)) {
    return academyOverride;
  }

  return detectAcademyIdFromHostname(hostname);
}

export function getActiveAcademy(hostname = globalThis?.location?.hostname || ''): AcademyConfig {
  if (hostname === (globalThis?.location?.hostname || '')) {
    return getAcademyById(detectAcademyIdFromLocation(globalThis.location));
  }

  return getAcademyById(detectAcademyIdFromHostname(hostname));
}