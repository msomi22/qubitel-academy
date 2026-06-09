import { DefaultAcademyHome } from './DefaultAcademyHome.jsx';
import CbcAcademyHome from './CbcAcademyHome.jsx';

const HOME_OVERRIDES = Object.freeze({
  'cbc-academy': CbcAcademyHome
});

export function resolveHomeComponent(academyNode) {
  return HOME_OVERRIDES[academyNode?.id] || DefaultAcademyHome;
}