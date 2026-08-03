import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAncestors, getChildren } from '../learning/registry/index.ts';

const ANCESTOR_LABELS = {
  academy: 'Academy',
  grade: 'Grade',
  learningArea: 'Learning Area',
  theme: 'Theme',
  strand: 'Strand',
  subStrand: 'Sub-strand'
};

export default function LearningNodeJumpMenu({ registry, nodeId }) {
  const [isOpen, setIsOpen] = useState(false);

  const ancestors = useMemo(
    () => getAncestors(registry, nodeId),
    [registry, nodeId]
  );

  const currentNode = registry.nodesById.get(nodeId);
  const siblings = useMemo(() => {
    if (!currentNode?.parentId) return [];
    return getChildren(registry, currentNode.parentId);
  }, [registry, currentNode]);

  const jumpTargets = useMemo(() => {
    const targets = [];

    for (const ancestor of ancestors) {
      const label = ANCESTOR_LABELS[ancestor.kind] || ancestor.kind;
      targets.push({
        id: ancestor.id,
        label: `${label}: ${ancestor.label}`,
        path: `/learn/${ancestor.id}`
      });
    }

    for (const sibling of siblings) {
      if (sibling.id !== nodeId) {
        targets.push({
          id: sibling.id,
          label: `Sibling: ${sibling.label}`,
          path: `/learn/${sibling.id}`
        });
      }
    }

    return targets;
  }, [registry, nodeId, ancestors, siblings]);

  if (jumpTargets.length === 0) {
    return null;
  }

  return (
    <div className="learning-node-jump-menu">
      <button
        type="button"
        className="jump-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Jump to...
      </button>

      {isOpen && (
        <div className="jump-menu-dropdown" role="menu">
          {jumpTargets.map((target) => (
            <NavLink
              key={target.id}
              to={target.path || '#'}
              className="jump-menu-item"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {target.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}