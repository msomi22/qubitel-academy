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

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
