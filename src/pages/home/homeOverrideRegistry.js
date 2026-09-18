import { DefaultAcademyHome } from './DefaultAcademyHome.jsx';
import CbcAcademyHome from './CbcAcademyHome.jsx';
import SkillAcademyHome from './SkillAcademyHome.jsx';

const HOME_OVERRIDES = Object.freeze({
  'cbc-academy': CbcAcademyHome,
  'skill-academy': SkillAcademyHome
});

export function resolveHomeComponent(academyNode) {
  return HOME_OVERRIDES[academyNode?.id] || DefaultAcademyHome;
}