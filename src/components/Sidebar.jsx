import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SupportButton from './SupportButton.jsx';
import { siteConfig } from '../config/siteConfig.js';

const ICON_PATHS = {
  dashboard: (
    <>
      <path d="M4 4h6v6H4z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6H4z" />
      <path d="M14 14h6v6h-6z" />
    </>
  ),
  categories: (
    <>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </>
  ),
  recent: (
    <>
      <path d="M12 8v5l3 2" />
      <path d="M3.05 11a9 9 0 1 1 2.64 6.36" />
      <path d="M3 17h4v-4" />
    </>
  ),
  progress: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 3-4 4 3 5-8" />
      <path d="M17 6h2v2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.92 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 0 1 21 6.34l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  )
};

const NAV_ITEMS = [
  { to: '/', icon: 'dashboard', label: 'Dashboard', end: true },
  { to: '/categories', icon: 'categories', label: 'Categories' },
  { to: '/recent', icon: 'recent', label: 'Recent' },
  { to: '/progress', icon: 'progress', label: 'Progress' },
  { to: '/settings', icon: 'settings', label: 'Settings' }
];

function NavIcon({ name }) {
  return (
    <svg
      className="nav-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name] || ICON_PATHS.categories}
    </svg>
  );
}

function NavItem({ to, icon, end, children, onNavigate }) {
  const navClass = ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`.trim();

  return (
    <NavLink to={to} end={end} className={navClass} onClick={onNavigate}>
      <NavIcon name={icon} />
      <span className="nav-text">{children}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  const [isTabletSidebarOpen, setIsTabletSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsTabletSidebarOpen(false);
  }, [pathname]);

  const closeTabletSidebar = () => setIsTabletSidebarOpen(false);

  return (
    <>
      <button
        className="tablet-sidebar-toggle"
        type="button"
        aria-label={isTabletSidebarOpen ? 'Hide sidebar navigation' : 'Show sidebar navigation'}
        aria-expanded={isTabletSidebarOpen}
        aria-controls="app-sidebar"
        onClick={() => setIsTabletSidebarOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <button
        className={`tablet-sidebar-backdrop ${isTabletSidebarOpen ? 'is-open' : ''}`}
        type="button"
        aria-label="Hide sidebar navigation"
        onClick={closeTabletSidebar}
      />

      <aside
        id="app-sidebar"
        className={`sidebar app-sidebar ${isTabletSidebarOpen ? 'is-floating-open' : ''}`}
      >
        <Link
          to="/"
          className="sidebar-logo"
          aria-label={`${siteConfig.appName} dashboard`}
          onClick={closeTabletSidebar}
        >
          <img
            className="brand-logo brand-logo-light"
            src="/brand-logo-light.svg"
            alt={siteConfig.appName}
          />
          <img
            className="brand-logo brand-logo-dark"
            src="/brand-logo-dark.svg"
            alt=""
            aria-hidden="true"
          />
        </Link>

        <div className="nav-section">
          <p className="nav-label">Workspace</p>
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              end={item.end}
              onNavigate={closeTabletSidebar}
            >
              {item.label}
            </NavItem>
          ))}
        </div>

        <div className="sidebar-spacer" />

        <SupportButton className="nav-item support-link" />
      </aside>
    </>
  );
}
