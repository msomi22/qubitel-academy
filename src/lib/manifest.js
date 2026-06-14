const SAFE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CONTENT_KEYS = ['lessons', 'practice', 'assessments'];

function issue(path, field, message) {
  return { path, field, message };
}

function isSafeId(value) {
  return typeof value === 'string' && SAFE_ID_PATTERN.test(value);
}

function isSafeContentFile(value, section) {
  if (typeof value !== 'string') return false;

  const parts = value.split('/');

  if (parts.length < 2 || parts[0] !== section) return false;

  const fileName = parts[parts.length - 1];

  if (!fileName.endsWith('.js')) return false;

  return parts.slice(1).every((part, index, segments) => {
    const valueToCheck = index === segments.length - 1
      ? part.replace(/\.js$/, '')
      : part;

    return isSafeId(valueToCheck);
  });
}

function validateSafeId(value, path, field, errors) {
  if (!isSafeId(value)) {
    errors.push(issue(path, field, `${field} must be a lowercase kebab-case safe id.`));
  }
}

function validateString(value, path, field, errors) {
  if (typeof value !== 'string' || !value.trim()) {
    errors.push(issue(path, field, `${field} must be a non-empty string.`));
  }
}

function validateStringArray(value, path, field, errors) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !item.trim())) {
    errors.push(issue(path, field, `${field} must be an array of non-empty strings.`));
  }
}

function validateContentReferences(value, path, field, errors) {
  if (!Array.isArray(value)) {
    errors.push(issue(path, field, `${field} must be an array.`));
    return;
  }

  for (const [index, reference] of value.entries()) {
    const referenceField = `${field}[${index}]`;
    if (!reference || typeof reference !== 'object' || Array.isArray(reference)) {
      errors.push(issue(path, referenceField, 'Content reference must be an object.'));
      continue;
    }

    validateSafeId(reference.id, path, `${referenceField}.id`, errors);
    validateString(reference.file, path, `${referenceField}.file`, errors);
    if (reference.learningAreaId !== undefined) {
      validateSafeId(reference.learningAreaId, path, `${referenceField}.learningAreaId`, errors);
    }
    if (typeof reference.file === 'string') {
      if (!isSafeContentFile(reference.file, field)) {
        errors.push(issue(
          path,
          `${referenceField}.file`,
          `Content file must be a .js file under ${field}/ using safe path segments.`
        ));
      }
    }
  }
}

function validateLearningAreas(value, path, errors) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    errors.push(issue(path, 'learningAreas', 'learningAreas must be an array when provided.'));
    return;
  }

  const seen = new Set();
  for (const [index, area] of value.entries()) {
    const field = `learningAreas[${index}]`;
    if (!area || typeof area !== 'object' || Array.isArray(area)) {
      errors.push(issue(path, field, 'Learning area must be an object.'));
      continue;
    }

    validateSafeId(area.id, path, `${field}.id`, errors);
    validateString(area.title, path, `${field}.title`, errors);
    if (area.description !== undefined) validateString(area.description, path, `${field}.description`, errors);
    if (area.sequence !== undefined && !Number.isFinite(Number(area.sequence))) {
      errors.push(issue(path, `${field}.sequence`, 'sequence must be a finite number when provided.'));
    }

    if (!area.id || !seen.has(area.id)) {
      if (area.id) seen.add(area.id);
      continue;
    }
    errors.push(issue(path, `${field}.id`, `Duplicate learning area id: ${area.id}.`));
  }
}

export function validateAcademyManifest(manifest, path = 'academy.manifest.json') {
  const errors = [];
  validateSafeId(manifest?.id, path, 'id', errors);
  validateString(manifest?.displayName, path, 'displayName', errors);
  validateString(manifest?.productName, path, 'productName', errors);
  validateStringArray(manifest?.subdomains, path, 'subdomains', errors);
  validateString(manifest?.storageKey, path, 'storageKey', errors);
  validateStringArray(manifest?.categories, path, 'categories', errors);
  return errors;
}

export function validateCategoryManifest(manifest, path = 'category.manifest.json') {
  const errors = [];
  validateSafeId(manifest?.id, path, 'id', errors);
  validateSafeId(manifest?.academy, path, 'academy', errors);
  validateString(manifest?.displayName, path, 'displayName', errors);
  validateStringArray(manifest?.topics, path, 'topics', errors);
  return errors;
}

export function validateTopicManifest(manifest, path = 'topic.manifest.json') {
  const errors = [];
  validateSafeId(manifest?.id, path, 'id', errors);
  validateSafeId(manifest?.academy, path, 'academy', errors);
  validateSafeId(manifest?.category, path, 'category', errors);
  validateString(manifest?.displayName, path, 'displayName', errors);
  validateLearningAreas(manifest?.learningAreas, path, errors);
  for (const key of CONTENT_KEYS) validateContentReferences(manifest?.[key], path, key, errors);

  const references = CONTENT_KEYS.flatMap((key) => manifest?.[key] || []);
  const learningAreaIds = new Set((manifest?.learningAreas || []).map((area) => area?.id).filter(Boolean));
  for (const field of ['id', 'file']) {
    const seen = new Set();
    for (const reference of references) {
      if (!reference?.[field] || !seen.has(reference[field])) {
        if (reference?.[field]) seen.add(reference[field]);
        continue;
      }
      errors.push(issue(path, field, `Duplicate content ${field}: ${reference[field]}.`));
    }
  }

  if (references.some((reference) => reference?.learningAreaId)) {
    for (const [index, reference] of references.entries()) {
      if (!reference?.learningAreaId || learningAreaIds.has(reference.learningAreaId)) continue;
      errors.push(issue(
        path,
        `content[${index}].learningAreaId`,
        `Unknown learning area: ${reference.learningAreaId}.`
      ));
    }
  }

  return errors;
}

function duplicateErrors(records, keyFor, type) {
  const errors = [];
  const seen = new Map();

  for (const record of records) {
    const key = keyFor(record.manifest);
    if (!key || !seen.has(key)) {
      if (key) seen.set(key, record.path);
      continue;
    }

    errors.push(issue(record.path, 'id', `Duplicate ${type} id also declared by ${seen.get(key)}.`));
  }

  return errors;
}

export function validateManifestRecords({
  academyRecords = [],
  categoryRecords = [],
  topicRecords = []
} = {}) {
  const errors = [
    ...academyRecords.flatMap(({ path, manifest }) => validateAcademyManifest(manifest, path)),
    ...categoryRecords.flatMap(({ path, manifest }) => validateCategoryManifest(manifest, path)),
    ...topicRecords.flatMap(({ path, manifest }) => validateTopicManifest(manifest, path)),
    ...duplicateErrors(academyRecords, (manifest) => manifest.id, 'academy'),
    ...duplicateErrors(categoryRecords, (manifest) => `${manifest.academy}/${manifest.id}`, 'category'),
    ...duplicateErrors(topicRecords, (manifest) => `${manifest.academy}/${manifest.category}/${manifest.id}`, 'topic')
  ];

  const academies = new Map(academyRecords.map((record) => [record.manifest.id, record]));
  const categories = new Map(categoryRecords.map((record) => [
    `${record.manifest.academy}/${record.manifest.id}`,
    record
  ]));
  const topics = new Map(topicRecords.map((record) => [
    `${record.manifest.academy}/${record.manifest.category}/${record.manifest.id}`,
    record
  ]));

  for (const { path, manifest } of categoryRecords) {
    const academy = academies.get(manifest.academy)?.manifest;
    if (!academy) errors.push(issue(path, 'academy', `Unknown academy: ${manifest.academy}.`));
    else if (academy.categories.includes(manifest.id) && !manifest.topics.length) {
      errors.push(issue(path, 'topics', 'Active academy categories must declare at least one topic.'));
    }
  }

  for (const { path, manifest } of topicRecords) {
    const categoryKey = `${manifest.academy}/${manifest.category}`;
    const category = categories.get(categoryKey)?.manifest;
    if (!category) errors.push(issue(path, 'category', `Unknown category: ${categoryKey}.`));
    else if (!category.topics.includes(manifest.id)) {
      errors.push(issue(path, 'id', `Topic is not registered in ${categoryKey}.`));
    }
  }

  for (const { path, manifest } of academyRecords) {
    for (const categoryId of manifest.categories) {
      if (!categories.has(`${manifest.id}/${categoryId}`)) {
        errors.push(issue(path, 'categories', `Missing category manifest for ${manifest.id}/${categoryId}.`));
      }
    }
  }

  for (const { path, manifest } of categoryRecords) {
    for (const topicId of manifest.topics) {
      if (!topics.has(`${manifest.academy}/${manifest.id}/${topicId}`)) {
        errors.push(issue(path, 'topics', `Missing topic manifest for ${manifest.academy}/${manifest.id}/${topicId}.`));
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
