import { NavLink } from 'react-router-dom';
import LearningNodeBreadcrumbs from '../LearningNodeBreadcrumbs.jsx';

export default function LearningBookHeader({
  registry,
  nodeId,
  backPath,
  tabs,
  activeContentType,
  selectedContentType,
  onSelectContentType
}) {
  return (
    <div className="learning-book-header">
      <div className="learning-book-header__primary">
        {backPath && (
          <NavLink
            className="book-toolbar-back"
            to={backPath}
            aria-label="Back to Themes"
          >
            <span aria-hidden="true">←</span>
            <span>Themes</span>
          </NavLink>
        )}

        <div className="learning-book-header__breadcrumbs">
          <LearningNodeBreadcrumbs registry={registry} nodeId={nodeId} />
        </div>
      </div>

      <div className="book-content-tabs" role="tablist" aria-label="Choose content type">
        {tabs.map((tab) => {
          const isActive = tab.path
            ? activeContentType === tab.key
            : selectedContentType === tab.key;
          const className = `book-content-tab ${isActive ? 'book-content-tab-active' : ''}`;

          return tab.path ? (
            <NavLink
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              className={className}
              to={tab.path}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.label}</span>
            </NavLink>
          ) : (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={className}
              onClick={() => onSelectContentType(tab.key)}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}