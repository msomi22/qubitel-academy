import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import GlobalSearch from './GlobalSearch.jsx';
import SupportButton from './SupportButton.jsx';
import { siteConfig } from '../config/siteConfig.js';
import { usePreferences } from '../hooks/usePreferences.js';
import { categories } from '../services/questionBankService.js';

const MOBILE_NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/categories', label: 'Categories' },
  { to: '/recent', label: 'Recent' },
  { to: '/progress', label: 'Progress' },
  { to: '/settings', label: 'Settings' }
];

function pageTitle(pathname) {
  if (pathname === '/') return 'Learning Dashboard';
  if (pathname === '/categories') return 'Categories';
  if (pathname === '/dsa') return 'DSA Practice';
  if (pathname === '/random') return 'Random Practice';
  if (pathname === '/recent') return 'Recent';
  if (pathname === '/progress') return 'Progress';
  if (pathname === '/settings') return 'Settings';
  if (pathname.startsWith('/problem/')) return 'Focused Problem';

  if (pathname.startsWith('/category/')) {
    const categoryId = pathname.split('/')[2];
    const category = categories.find((item) => item.id === categoryId);
    return category?.name || 'Category Practice';
  }

  return siteConfig.appName;
}

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.3 15.6A8 8 0 0 1 8.4 3.7 8 8 0 1 0 20.3 15.6Z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="theme-toggle-chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, setTheme } = usePreferences();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`nav topbar ${mobileMenuOpen ? 'is-menu-open' : ''}`}>
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <span className="topbar-title">{pageTitle(location.pathname)}</span>

        <Link to="/" className="topbar-brand" aria-label={`${siteConfig.appName} dashboard`}>
          <img
            className="topbar-brand-logo topbar-brand-logo-light"
            src={siteConfig.brand.logoLight}
            alt={siteConfig.appName}
          />
          <img
            className="topbar-brand-logo topbar-brand-logo-dark"
            src={siteConfig.brand.logoDark}
            alt=""
            aria-hidden="true"
          />
        </Link>

        <GlobalSearch />

        <button
          className="icon-btn theme-toggle"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            <ThemeIcon theme={theme} />
          </span>
          <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          <ChevronDownIcon />
        </button>
      </header>

      <button
        type="button"
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setMobileMenuOpen(false)}
      />

      <nav
        id="mobile-nav-panel"
        className={`mobile-nav-panel ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        {MOBILE_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.label}
          </NavLink>
        ))}
        <SupportButton className="mobile-support-link" />
      </nav>
    </>
  );
}
