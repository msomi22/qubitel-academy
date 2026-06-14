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
import './styles/problem-page-mobile-text-wrap-final.css';
import './styles/dashboard-mobile-premium.css';
import './styles/dashboard-command-center-width.css';
import './styles/workspace-secondary-pages-polish.css';
import './styles/random-page-premium-polish.css';
import './styles/cbc-exam.css';
import './styles/cbc-exam-compact-fixes.css';
import './styles/cbc-grade-one-renderer.css';
import './styles/question-navigation-controls.css';
import './styles/problem-navigation-stability.css';
import './styles/cbc-exam-stability.css';
import './styles/cbc-exam-scroll-jump-fix.css';
import './styles/cbc-exam-natural-scroll-fix.css';
import './styles/topic-assessments.css';
import './styles/cbc-subject-learning-areas.css';
import './styles/cbc-grade-one-wide-screen-fix.css';
import './styles/cbc-exam-start-button-fix.css';
import './styles/alphabet-mastery.css';
import './styles/number-audio-grid.css';

function loadCloudflareAnalytics() {
  const { hostname, protocol } = window.location;
  if (protocol !== 'https:' || !hostname.endsWith('qubitel.net')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.dataset.cfBeacon = JSON.stringify({ token: '9999826788fd4feb8268344e28e04a0d' });
  document.head.append(script);
}


function enableTvDebugOverlay() {
  const params = new URLSearchParams(window.location.search);

  if (params.get('tvDebug') !== 'true') {
    return;
  }

  function showDebug(title, details) {
    document.body.innerHTML = `
      <pre style="
        white-space: pre-wrap;
        padding: 32px;
        font-size: 22px;
        line-height: 1.5;
        color: #ffffff;
        background: #111827;
        min-height: 100vh;
        overflow: auto;
      ">${title}

${details}</pre>
    `;
  }

  window.addEventListener('error', (event) => {
    showDebug(
      'TV Runtime Error',
      [
        event.message,
        event.filename,
        `Line: ${event.lineno}, Column: ${event.colno}`,
        event.error?.stack || ''
      ].join('\n')
    );
  });

  window.addEventListener('unhandledrejection', (event) => {
    showDebug(
      'TV Promise Rejection',
      [
        event.reason?.message || String(event.reason),
        event.reason?.stack || ''
      ].join('\n')
    );
  });
}

enableTvDebugOverlay();

loadCloudflareAnalytics();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
