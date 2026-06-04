const CONTENT_SECTIONS = [
  ['lessons', 'lesson'],
  ['practice', 'practice'],
  ['assessments', 'assessment']
];

export function getCatalogContentReferences(catalog) {
  return catalog.topics.flatMap((topic) => CONTENT_SECTIONS.flatMap(([section, kind]) => (
    (topic[section] || []).map((reference) => ({
      ...reference,
      academyId: topic.academyId || topic.academy,
      categoryId: topic.category,
      topicId: topic.id,
      kind,
      path: `../academies/${topic.academyId || topic.academy}/${topic.category}/${topic.id}/${reference.file}`
    }))
  )));
}

export function selectCatalogContentModules(catalog, modules = {}) {
  const declaredPaths = new Set(
    getCatalogContentReferences(catalog).map((reference) => reference.path)
  );

  return Object.fromEntries(
    Object.entries(modules).filter(([path]) => declaredPaths.has(path))
  );
}
