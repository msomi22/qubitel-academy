import { NavLink } from 'react-router-dom';
import { getActiveAcademy } from '../config/detectAcademy.ts';

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Home',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    )
  },
  {
    to: '/categories',
    label: 'Topics',
    academyLibrary: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16M7 12h10M10 18h4" />
      </svg>
    )
  },
  {
    to: '/random',
    label: 'Practice',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    )
  },
  {
    to: '/progress',
    label: 'Progress',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19V5M4 19h16m-13-4 3-4 4 3 5-8" />
      </svg>
    )
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
];

function academyLibraryLabel(academyId) {
  if (academyId === 'cbc') return 'Grades';
  if (academyId === 'skill') return 'Programmes';
  return 'Topics';
}

export default function BottomNav() {
  const activeAcademy = getActiveAcademy();

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          <span>{item.academyLibrary ? academyLibraryLabel(activeAcademy.id) : item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
