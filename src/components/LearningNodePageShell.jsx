import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { getNavigationContext } from '../learning/navigation/index.ts';
import LearningNodeBreadcrumbs from './LearningNodeBreadcrumbs.jsx';
import LearningNodeChildGrid from './LearningNodeChildGrid.jsx';
import LearningNodeJumpMenu from './LearningNodeJumpMenu.jsx';
import LearningNodeSiblingNav from './LearningNodeSiblingNav.jsx';
import LearningNodeContentRenderer from './LearningNodeContentRenderer.jsx';
import './LearningNodeUI.css';

export default function LearningNodePageShell({
  registry,
  nodeId,
  children,
  showJumpMenu = true,
  showSiblingNav = true,
  contentRendererProps = {}
}) {
  const navigation = useMemo(
    () => getNavigationContext(registry, nodeId),
    [registry, nodeId]
  );

  const currentNode = navigation.current;
  if (!currentNode) {
    return (
      <section className="learning-node-page">
        <h1>Content not found</h1>
        <p>The requested learning content could not be found.</p>
        <NavLink className="btn" to="/">
          Go home
        </NavLink>
      </section>
    );
  }

  // Hide back button when parent is academy (it's the root for domain-specific view)
  const showParentBackButton = currentNode.parentId && 
    navigation.parent?.kind !== 'academy' && 
    navigation.parent?.kind !== 'platform';
  
  const parentPath = showParentBackButton
    ? `/learn/${currentNode.parentId}`
    : null;

  const kindLabel = getKindLabel(currentNode.kind);

  return (
    <div className="learning-node-page">
      <header className="learning-node-header">
        <div className="learning-node-breadcrumbs">
          <LearningNodeBreadcrumbs registry={registry} nodeId={currentNode.id} />
        </div>

        <div className="learning-node-title-row">
          <div className="learning-node-title">
            <span className="learning-node-kind">{kindLabel}</span>
            <h1>{currentNode.label}</h1>
            {currentNode.summary && <p className="learning-node-summary">{currentNode.summary}</p>}
          </div>
        </div>

        {showParentBackButton && parentPath && (
          <div className="learning-node-parent-action">
            <NavLink className="btn btn-secondary" to={parentPath}>
              ← Back to {navigation.parent?.label || 'previous'}
            </NavLink>
          </div>
        )}
      </header>

      <main className="learning-node-main">
        {children}

        {navigation.children.length > 0 && (
          <section className="learning-node-children">
            <LearningNodeChildGrid registry={registry} nodeId={currentNode.id} />
          </section>
        )}

        {currentNode.contentRef && (
          <section className="learning-node-content">
            <LearningNodeContentRenderer
              registry={registry}
              node={currentNode}
              {...contentRendererProps}
            />
          </section>
        )}
      </main>

      {showSiblingNav && navigation.siblings.length > 1 && (
        <footer className="learning-node-footer">
          <LearningNodeSiblingNav registry={registry} nodeId={currentNode.id} />
        </footer>
      )}

      {showJumpMenu && navigation.parent?.kind !== 'academy' && navigation.parent?.kind !== 'platform' && (
        <LearningNodeJumpMenu registry={registry} nodeId={currentNode.id} />
      )}
    </div>
  );
}

function getKindLabel(kind) {
  const labels = {
    academy: 'Academy',
    grade: 'Grade',
    learningArea: 'Learning Area',
    theme: 'Theme',
    strand: 'Strand',
    subStrand: 'Sub-strand',
    notes: 'Notes',
    practice: 'Practice',
    revision: 'Revision',
    assessment: 'Assessment',
    exam: 'Exam',
    activity: 'Activity',
    content: 'Content'
  };

  return labels[kind] || kind;
}