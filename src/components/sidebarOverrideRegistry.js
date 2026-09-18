import Sidebar from './Sidebar.jsx';
import CbcSidebar from './CbcSidebar.jsx';
import SkillSidebar from './SkillSidebar.jsx';

const SIDEBAR_OVERRIDES = Object.freeze({
  cbc: CbcSidebar,
  skill: SkillSidebar
});

export function resolveSidebarComponent(academyId) {
  return SIDEBAR_OVERRIDES[academyId] || Sidebar;
}
