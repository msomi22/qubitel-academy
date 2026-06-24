import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createNodeRoutePath } from '../learning/routing';
import { getNavigationContext } from '../learning/navigation/index.ts';
import LearningNodeBreadcrumbs from './LearningNodeBreadcrumbs.jsx';
import LearningNodeChildGrid from './LearningNodeChildGrid.jsx';
import LearningNodeSiblingNav from './LearningNodeSiblingNav.jsx';
import LearningNodeContentRenderer from './LearningNodeContentRenderer.jsx';
import LearningNodeBookView from './LearningNodeBookView.jsx';
import './LearningNodeUI.css';

function getNodeAttributeValue(node, key) {
  return node?.attributes?.find((attribute) => attribute.key === key)?.value;
}

function getNodeAppearanceValue(node, key) {
  return node?.appearances?.find((appearance) => appearance.key === key)?.value;
}

function getNodeRenderingValue(node, key) {
  return (
    node?.rendering?.[key] ??
    node?.metadata?.[key] ??
    getNodeAttributeValue(node, key) ??
    getNodeAppearanceValue(node, key)
  );
}

function isInAcademy(navigation, academyNodeId) {
  return navigation?.breadcrumbs?.some((node) => node.id === academyNodeId);
}

function isDirectBookContent(node) {
  return node?.content?.type === 'book' && Array.isArray(node.content.pages);
}

const FLATTENED_CONTENT_KINDS = new Set(['notes', 'practice', 'revision', 'assessment', 'exam']);
const BOOK_STYLE_CHILD_KINDS = new Set(['strand', 'subStrand', 'learningArea']);

function shouldRenderBookView(currentNode, navigation) {
  if (!currentNode || currentNode.kind !== 'theme') return false;

  const explicitViewMode = getNodeRenderingValue(currentNode, 'viewMode');
  const explicitLayout = getNodeRenderingValue(currentNode, 'layout');

  if (explicitViewMode === 'book' || explicitLayout === 'book') {
    return true;
  }

  if (!isInAcademy(navigation, 'cbc-academy')) return false;

  const childKinds = navigation?.children?.map((child) => child.kind) || [];
  const hasDirectBookContentChildren = navigation?.children?.some((child) => isDirectBookContent(child));

  if (hasDirectBookContentChildren) return true;

  const hasFlattenedContentChildren = childKinds.some((kind) => FLATTENED_CONTENT_KINDS.has(kind));

  if (hasFlattenedContentChildren) return false;

  return childKinds.some((kind) => BOOK_STYLE_CHILD_KINDS.has(kind));
}

export default function LearningNodePageShell({
  registry,
  nodeId,
  children,
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
      <section className="page learning-node-page">
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
  
  const parentPath =
    showParentBackButton && currentNode.parentId
      ? createNodeRoutePath(registry, currentNode.parentId, {
        includeRoot: false,
        includeAcademyRoot: false
      })
      : null;

  const kindLabel = getKindLabel(currentNode.kind);

  const shouldShowBookView = shouldRenderBookView(currentNode, navigation);
  const shouldShowDirectBookView = isDirectBookContent(currentNode);

  // Check if this is a learning area page that should use tabbed layout
  const isLearningAreaPage = currentNode.kind === 'learningArea';
  const shouldUseLearningAreaLayout = isLearningAreaPage && !shouldShowBookView;
  const isGradePage = currentNode.kind === 'grade';

  const headingId = `learning-node-heading-${currentNode.id}`;

  const themeChildren = useMemo(() => {
    if (!shouldUseLearningAreaLayout) return [];
    return navigation.children.filter((child) => child.kind === 'theme');
  }, [navigation.children, shouldUseLearningAreaLayout]);

  const assessmentChildren = useMemo(() => {
    if (!shouldUseLearningAreaLayout) return [];
    return navigation.children.filter((child) => child.kind === 'assessment' || child.kind === 'exam');
  }, [navigation.children, shouldUseLearningAreaLayout]);

  const [learningAreaPanel, setLearningAreaPanel] = useState('themes');

  const isAssessmentPanel = learningAreaPanel === 'assessments';

  const selectedLearningAreaChildren = isAssessmentPanel
    ? assessmentChildren
    : themeChildren;

  const selectedLearningAreaTitle = isAssessmentPanel
    ? 'Learning Area Assessments'
    : 'Themes';

  const selectedLearningAreaCountLabel = isAssessmentPanel
    ? `${assessmentChildren.length} exams`
    : `${themeChildren.length} themes`;

  const selectedLearningAreaSectionClassName = isAssessmentPanel
    ? 'learning-area-assessments-section'
    : 'learning-area-themes-section';

  return (
    <div className="page progress-page-focused learning-node-page">
      <section
        className={`glass progress-table-card learning-node-card ${
          shouldShowBookView ? 'progress-card-book-mode' : ''
        } ${
          shouldUseLearningAreaLayout ? 'progress-card-learning-area-mode' : ''
        } ${
          isGradePage ? 'progress-card-grade-mode' : ''
        }`}
        aria-labelledby={headingId}
      >
        <header className="learning-node-header">
          <div className="learning-node-breadcrumbs">
            <LearningNodeBreadcrumbs registry={registry} nodeId={currentNode.id} />
          </div>

          {shouldShowBookView ? (
            <h1 id={headingId} className="learning-node-sr-only">
              {currentNode.label}
            </h1>
          ) : shouldUseLearningAreaLayout ? (
            <h1 id={headingId} className="sr-only">
              {currentNode.label}
            </h1>
          ) : isGradePage ? (
            <h1 id={headingId} className="sr-only">
              {currentNode.label}
            </h1>
          ) : (
            <div className="progress-card-head">
              <div>
                <p className="eyebrow">{kindLabel}</p>
                <h1 id={headingId}>{currentNode.label}</h1>
                {currentNode.summary && <p>{currentNode.summary}</p>}
              </div>
            </div>
          )}

          {isGradePage && currentNode.parentId && (
            <div className="grade-page-action-row">
              <NavLink className="btn ghost learning-area-back-button grade-page-back-button" to="/categories">
                ← Back to Grades
              </NavLink>
            </div>
          )}

          {showParentBackButton && parentPath && !shouldShowBookView && !shouldUseLearningAreaLayout && (
            <div className="learning-node-parent-action" style={{ marginTop: '10px' }}>
              <NavLink className="btn ghost" to={parentPath}>
                ← Back to {navigation.parent?.label || 'previous'}
              </NavLink>
            </div>
          )}
        </header>

        <main className="learning-node-main">
          {children}

          {shouldShowBookView ? (
            <section className="learning-node-book-view-section">
              <LearningNodeBookView
                registry={registry}
                nodeId={currentNode.id}
                backPath={parentPath}
                backLabel="Themes"
              />
            </section>
          ) : shouldUseLearningAreaLayout ? (
            <div className="learning-area-tabbed-view">
              <div className="learning-area-action-row">
                {showParentBackButton && parentPath && (
                  <NavLink className="btn ghost learning-area-back-button" to={parentPath}>
                    ← Back to {navigation.parent?.label || 'previous'}
                  </NavLink>
                )}
                <div className="learning-area-tab-list" role="tablist" aria-label="Learning area sections">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={learningAreaPanel === 'themes'}
                    className={`learning-area-tab ${learningAreaPanel === 'themes' ? 'is-active' : ''}`}
                    onClick={() => setLearningAreaPanel('themes')}
                  >
                    <span>📚 Themes</span>
                    <strong>{themeChildren.length}</strong>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={learningAreaPanel === 'assessments'}
                    className={`learning-area-tab ${learningAreaPanel === 'assessments' ? 'is-active' : ''}`}
                    onClick={() => setLearningAreaPanel('assessments')}
                  >
                    <span>✅ Assessments</span>
                    <strong>{assessmentChildren.length}</strong>
                  </button>
                </div>
              </div>
              <section className={`learning-area-section ${selectedLearningAreaSectionClassName} ${selectedLearningAreaChildren.length === 0 ? 'is-empty' : ''}`}>
                <div className="learning-area-scroll-panel">
                  {selectedLearningAreaChildren.length > 0 ? (
                    <LearningNodeChildGrid key={learningAreaPanel} registry={registry} nodeId={currentNode.id} nodes={selectedLearningAreaChildren} hideSectionHeadings />
                  ) : (
                    <div className="learning-area-empty-state">
                      <strong>No {isAssessmentPanel ? 'assessments' : 'themes'} available yet.</strong>
                      <span>{isAssessmentPanel ? 'Assessment cards' : 'Theme cards'} will appear here when they are added.</span>
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : shouldShowDirectBookView ? (
            <section className="learning-node-book-view-section">
              <LearningNodeBookView
                registry={registry}
                nodeId={currentNode.id}
                backPath={parentPath}
                backLabel={navigation.parent?.label || 'previous'}
              />
            </section>
          ) : (
            <>
              {navigation.children.length > 0 && (
                <section className="learning-node-children">
                  <LearningNodeChildGrid registry={registry} nodeId={currentNode.id} />
                </section>
              )}

              {(currentNode.contentRef || currentNode.content) && (
                <section className="learning-node-content">
                  <LearningNodeContentRenderer
                    registry={registry}
                    node={currentNode}
                    {...contentRendererProps}
                  />
                </section>
              )}
            </>
          )}
        </main>

        {showSiblingNav && navigation.siblings.length > 1 && !shouldUseLearningAreaLayout && (
          <footer className="learning-node-footer">
            <LearningNodeSiblingNav registry={registry} nodeId={currentNode.id} />
          </footer>
        )}
      </section>
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