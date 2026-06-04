import { getActiveAcademy } from '../config/detectAcademy.ts';

const visualModules = import.meta.env
  ? import.meta.glob('../academies/*/*/*/practice/visuals/*.js')
  : {};

export function buildCandidatePaths(questionId, academyId = getActiveAcademy().id) {
  const segments = questionId.split('-');

  if (segments.length < 2) {
    return [];
  }

  const topicFolder = segments.slice(0, -1).join('-');
  return [
    `../academies/${academyId}/dsa/${topicFolder}/practice/visuals/${questionId}.js`,
    `../academies/${academyId}/system/${topicFolder}/practice/visuals/${questionId}.js`
  ];
}

export async function loadVisualWalkthrough(questionId) {
  const candidates = buildCandidatePaths(questionId);

  for (const path of candidates) {
    const loader = visualModules[path];

    if (loader) {
      const module = await loader();
      return module.default || null;
    }
  }

  return null;
}
