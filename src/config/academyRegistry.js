export const DEFAULT_ACADEMY_ID = 'tech';

export const academyRegistry = {
  tech: {
    id: 'tech',
    displayName: 'Technology Academy',
    productName: 'Senior Dev Accelerator',
    default: true,
    subdomains: ['academy.qubitel.net'],
    storageKey: 'senior-dev-accelerator:v2',
    categoryIds: [
      'dsa',
      'system',
      'java',
      'kubernetes-ckad',
      'aptitude',
      'ml-ai',
      'engineering-leadership'
    ]
  },

  cbc: {
    id: 'cbc',
    displayName: 'CBC Academy',
    productName: 'CBC Exam Practice',
    subdomains: ['cbc.academy.qubitel.net'],
    storageKey: 'senior-dev-accelerator:v2:cbc',
    categoryIds: []
  },

  'customer-experience': {
    id: 'customer-experience',
    displayName: 'Customer Experience Academy',
    productName: 'Customer Experience Academy',
    subdomains: ['cx.academy.qubitel.net'],
    storageKey: 'senior-dev-accelerator:v2:customer-experience',
    categoryIds: []
  }
};

export function getAcademyById(academyId = DEFAULT_ACADEMY_ID) {
  return academyRegistry[academyId] || academyRegistry[DEFAULT_ACADEMY_ID];
}

export function getDefaultAcademy() {
  return academyRegistry[DEFAULT_ACADEMY_ID];
}

export function getAcademies() {
  return Object.values(academyRegistry);
}