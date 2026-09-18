import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { createNodeUiPath } from '../learning/routing';
import { getBreadcrumbs } from '../learning/navigation/index.ts';
function isPlainTextBreadcrumb(node) {
  return node?.kind === 'academy';
}

export default function LearningNodeBreadcrumbs({ registry, nodeId }) {
  const breadcrumbs = useMemo(
    () => getBreadcrumbs(registry, nodeId, { 
      includeCurrentInBreadcrumbs: true,
      skipKinds: ['platform']
    }),
    [registry, nodeId]
  );

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="learning-node-breadcrumbs">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((node, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isPlainText = isPlainTextBreadcrumb(node);
          const path = createNodeUiPath(registry, node.id, {
            includeRoot: false,
            includeAcademyRoot: false
          });

          return (
            <li key={node.id} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {node.label}
                </span>
              ) : isPlainText ? (
                <span className="breadcrumb-text" aria-hidden="true">
                  {node.label}
                </span>
              ) : (
                <NavLink
                  to={path}
                  className="breadcrumb-link"
                  aria-label={`Go to ${node.label}`}
                >
                  {node.label}
                </NavLink>
              )}
              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
