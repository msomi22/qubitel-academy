import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { getPreviousSibling, getNextSibling, getSiblings } from '../learning/navigation/index.ts';

export default function LearningNodeSiblingNav({ registry, nodeId }) {
  const previousSibling = useMemo(
    () => getPreviousSibling(registry, nodeId),
    [registry, nodeId]
  );

  const nextSibling = useMemo(
    () => getNextSibling(registry, nodeId),
    [registry, nodeId]
  );

  const siblings = useMemo(
    () => getSiblings(registry, nodeId),
    [registry, nodeId]
  );

  if (siblings.length <= 1) {
    return null;
  }

  return (
    <nav className="learning-node-sibling-nav" aria-label="Sibling navigation">
      <div className="sibling-nav-buttons">
        {previousSibling ? (
          <NavLink
            to={`/learn/${previousSibling.id}`}
            className="sibling-nav-button sibling-previous"
            aria-label={`Go to previous: ${previousSibling.label}`}
          >
            ← {previousSibling.label}
          </NavLink>
        ) : (
          <span className="sibling-nav-button sibling-disabled" aria-disabled="true">
            ← Previous
          </span>
        )}

        <span className="sibling-nav-info">
          {siblings.findIndex((s) => s.id === nodeId) + 1} of {siblings.length}
        </span>

        {nextSibling ? (
          <NavLink
            to={`/learn/${nextSibling.id}`}
            className="sibling-nav-button sibling-next"
            aria-label={`Go to next: ${nextSibling.label}`}
          >
            {nextSibling.label} →
          </NavLink>
        ) : (
          <span className="sibling-nav-button sibling-disabled" aria-disabled="true">
            Next →
          </span>
        )}
      </div>
    </nav>
  );
}