import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';
import './styles/ui-refresh.css';
import './styles/visual-learning.css';
import './styles/problem-focus-workspace.css';
import './styles/problem-focus-font-match.css';
import './styles/learning-dashboard.css';
import './styles/senior-ui.css';
import './styles/problem-pill-fixes.css';
import './styles/theme-page-parity.css';
import './styles/theme-dark-palette-fix.css';
import './styles/sidebar-spacing-fix.css';
import './styles/sidebar-icons.css';
import './styles/compact-search.css';
import './styles/global-search.css';
import './styles/public-brand-logo-fix.css';
import './styles/simple-problem-list.css';
import './styles/complex-system-design.css';
import './styles/rich-problem.css';
import './styles/ide-code-block.css';
import './styles/mobile-first-rich-problem-ui.css';
import './styles/ux-improvements.css';
import './styles/mobile-home-overflow-fix.css';
import './styles/responsive-sidebar-layout.css';
import './styles/responsive-topic-library-cards.css';
import './styles/mobile-first-topic-library-fix.css';
import './styles/focused-text-wrap-fix.css';
import './styles/glossary.css';
import './styles/categories-premium-grid.css';
import './styles/problem-page-premium-mobile.css';
import './styles/topic-page-premium-question-grid.css';
import './styles/topic-page-subtopic-grid-fix.css';
import './styles/topic-page-reference-dashboard.css';
import './styles/topic-page-mobile-two-column.css';
import './styles/topic-page-final-rail-table-tuning.css';
import './styles/topic-page-category-overview-controls.css';
import './styles/topic-page-compact-density.css';
import './styles/topic-page-control-row-compact.css';
import './styles/topic-page-view-toggle-icon-fix.css';
import './styles/topic-page-back-link.css';
import './styles/problem-page-timer-visibility.css';
import './styles/topic-page-adaptive-hero-compact.css';
import './styles/topic-page-phone-layout.css';
import './styles/topic-page-phone-polish.css';
import './styles/topic-page-phone-topic-cards-final.css';
import './styles/topic-page-mobile-card-body.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
