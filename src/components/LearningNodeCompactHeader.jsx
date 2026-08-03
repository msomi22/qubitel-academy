import { NavLink } from 'react-router-dom';

export default function LearningNodeCompactHeader({
  backTo,
  backLabel,
  backAriaLabel,
  breadcrumbs,
  actions
}) {
  const className = [
    'learning-node-compact-header',
    actions ? 'learning-node-compact-header--with-actions' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={className}>
      <div className="learning-node-compact-header__row">
        <div className="learning-node-compact-header__primary">
          {backTo && backLabel && (
            <NavLink
              className="learning-node-compact-header__back"
              to={backTo}
              aria-label={backAriaLabel || backLabel}
            >
              <span aria-hidden="true">←</span>
              <span>{backLabel}</span>
            </NavLink>
          )}

          <div className="learning-node-compact-header__breadcrumbs">
            {breadcrumbs}
          </div>
        </div>

        {actions && (
          <div className="learning-node-compact-header__actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}