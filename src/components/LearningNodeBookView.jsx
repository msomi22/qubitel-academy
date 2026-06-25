import { useState, useMemo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getChildren } from '../learning/registry/index.ts';
import { createNodeRoutePath } from '../learning/routing';
import LearningNodeContentRenderer from './LearningNodeContentRenderer.jsx';

const CONTENT_TABS = [
  { key: 'learningMaterial', label: 'Learning Material', icon: '📖' },
  { key: 'practice', label: 'Practice', icon: '✏️' },
  { key: 'assessment', label: 'Assessment', icon: '✅' },
  { key: 'lessonPlan', label: 'Lesson Plan', icon: '🧑‍🏫' }
];

const TAB_GROUPS = {
  learningMaterial: new Set(['lessons', 'notes', 'learningMaterial']),
  notes: new Set(['lessons', 'notes', 'practice', 'revision', 'assessments']),
  practice: new Set([]),
  assessment: new Set(['assessments']),
  lessonPlan: new Set(['lessonPlan'])
};

const TAB_COVER_FALLBACKS = {
  learningMaterial: { label: 'Learning Material', icon: '📖', summary: 'Student learning material' },
  notes: { label: 'Notes', icon: '📖', summary: 'Lessons and notes' },
  practice: { label: 'Practice', icon: '✏️', summary: 'Practice exercises' },
  assessment: { label: 'Assessment', icon: '✅', summary: 'Assessments' },
  lessonPlan: { label: 'Lesson Plan', icon: '🧑‍🏫', summary: 'Teacher lesson plan' }
};

const TAB_SUMMARY_KEYS = {
  learningMaterial: ['learningMaterialSummary', 'notesSummary', 'lessonSummary', 'lessonsSummary'],
  notes: ['notesSummary', 'lessonSummary', 'lessonsSummary'],
  practice: ['practiceSummary'],
  assessment: ['assessmentSummary', 'assessmentsSummary'],
  lessonPlan: ['lessonPlanSummary']
};

const DIRECT_CONTENT_TAB_ORDER = ['learningMaterial', 'notes', 'practice', 'assessment', 'lessonPlan'];
const DIRECT_CONTENT_TAB_META = {
  learningMaterial: { label: 'Learning Material', icon: '📖' },
  notes: { label: 'Notes', icon: '📖' },
  practice: { label: 'Practice', icon: '✏️' },
  assessment: { label: 'Assessment', icon: '✅' },
  exam: { label: 'Assessment', icon: '✅' },
  lessonPlan: { label: 'Lesson Plan', icon: '🧑‍🏫' }
};

function getNodeMetadataValue(node, key) {
  return node?.metadata?.[key] || node?.attributes?.find((attr) => attr.key === key)?.value || '';
}

function getTabCover(tabKey, sourceNode) {
  const fallback = TAB_COVER_FALLBACKS[tabKey] || TAB_COVER_FALLBACKS.notes;
  const tabSummary = TAB_SUMMARY_KEYS[tabKey]
    ?.map((key) => getNodeMetadataValue(sourceNode, key))
    .find((value) => typeof value === 'string' && value.trim().length > 0);

  return {
    ...fallback,
    summary: tabSummary || fallback.summary
  };
}

function filterContentGroups(contentGroups, selectedContentType) {
  const allowedGroups = TAB_GROUPS[selectedContentType] || new Set();
  if (allowedGroups.size === 0) return [];
  return contentGroups.filter((group) => allowedGroups.has(group.type));
}

function isDirectBookContent(node) {
  return node?.content?.type === 'book' && Array.isArray(node.content.pages);
}

function getContentType(node) {
  return getNodeMetadataValue(node, 'contentType') || node?.kind || '';
}

function getDirectContentChildren(node, registry) {
  if (!node) return [];

  return getChildren(registry, node.id)
    .filter((child) => DIRECT_CONTENT_TAB_ORDER.includes(getContentType(child)))
    .sort((a, b) => (
      DIRECT_CONTENT_TAB_ORDER.indexOf(getContentType(a)) - DIRECT_CONTENT_TAB_ORDER.indexOf(getContentType(b))
    ));
}

function getDirectSiblingContentTabs(registry, node) {
  if (!isDirectBookContent(node) || !node.parentId) return [];

  return getChildren(registry, node.parentId)
    .filter((sibling) => DIRECT_CONTENT_TAB_ORDER.includes(getContentType(sibling)))
    .sort((a, b) => (
      DIRECT_CONTENT_TAB_ORDER.indexOf(getContentType(a)) - DIRECT_CONTENT_TAB_ORDER.indexOf(getContentType(b))
    ))
    .map((sibling) => {
      const contentType = getContentType(sibling);
      const tabMeta = DIRECT_CONTENT_TAB_META[contentType] || {
        label: sibling.label,
        icon: '📄'
      };

      return {
        key: contentType,
        label: tabMeta.label,
        icon: tabMeta.icon,
        path: createNodeRoutePath(registry, sibling.id, {
          includeRoot: false,
          includeAcademyRoot: false
        })
      };
    });
}

function getDirectChildContentTabs(registry, node) {
  return getDirectContentChildren(node, registry).map((child) => {
    const contentType = getContentType(child);
    const tabMeta = DIRECT_CONTENT_TAB_META[contentType] || {
      label: child.label,
      icon: '📄'
    };

    return {
      key: contentType,
      label: tabMeta.label,
      icon: tabMeta.icon
    };
  });
}

function createDirectBookPages(node) {
  return node.content.pages.map((bookPage, index) => ({
    type: 'directBookContent',
    title: bookPage.title || `Page ${index + 1}`,
    subtitle: bookPage.subtitle || '',
    description: bookPage.description || '',
    content: Array.isArray(bookPage.blocks) ? bookPage.blocks : []
  }));
}

function createDirectContentPages(node, parentNode) {
  if (isDirectBookContent(node)) {
    return createDirectBookPages(node);
  }

  return [{
    type: 'content',
    strand: parentNode || node,
    subStrand: node,
    items: [{ ...node, groupType: getContentType(node) }]
  }];
}

export default function LearningNodeBookView({ registry, nodeId, backPath, backLabel }) {
  const [selectedContentType, setSelectedContentType] = useState('learningMaterial');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentNode = registry.nodesById.get(nodeId);
  const isDirectBookNode = isDirectBookContent(currentNode);
  const directContentChildren = useMemo(
    () => getDirectContentChildren(currentNode, registry),
    [currentNode, registry]
  );
  const selectedDirectContentChild = directContentChildren.find(
    (child) => getContentType(child) === selectedContentType
  ) || directContentChildren[0];
  const directContentTabs = useMemo(
    () => getDirectSiblingContentTabs(registry, currentNode),
    [registry, currentNode]
  );
  const directChildContentTabs = useMemo(
    () => getDirectChildContentTabs(registry, currentNode),
    [registry, currentNode]
  );
  const visibleContentTabs = directContentTabs.length > 0
    ? directContentTabs
    : directChildContentTabs.length > 0
      ? directChildContentTabs
      : CONTENT_TABS;
  const activeContentType = isDirectBookNode ? getContentType(currentNode) : selectedContentType;

  const pages = useMemo(() => {
    if (isDirectBookContent(currentNode)) {
      return createDirectBookPages(currentNode);
    }

    if (selectedDirectContentChild) {
      return createDirectContentPages(selectedDirectContentChild, currentNode);
    }

    const children = getChildren(registry, nodeId);

    const strands = children.filter(child => child.kind === 'strand');
    const learningAreas = children.filter(child => child.kind === 'learningArea');

    const pageList = [];

    strands.forEach(strand => {
      const tabCoverStrand = getTabCover(selectedContentType, strand);
      const strandChildren = getChildren(registry, strand.id);
      const subStrands = strandChildren.filter(child => child.kind === 'subStrand');
      const strandAssessments = strandChildren.filter(child =>
        child.kind === 'assessment' || child.kind === 'exam'
      );

      pageList.push({
        type: 'chapter',
        strand: {
          ...strand,
          label: tabCoverStrand.label,
          summary: tabCoverStrand.summary,
          appearances: [{ key: 'icon', value: tabCoverStrand.icon }]
        },
        subStrandCount: subStrands.length
      });

      subStrands.forEach(subStrand => {
        const subStrandChildren = getChildren(registry, subStrand.id);
        const notes = subStrandChildren.filter(child => child.kind === 'notes');
        const practice = subStrandChildren.filter(child => child.kind === 'practice');
        const revision = subStrandChildren.filter(child => child.kind === 'revision');
        const assessments = subStrandChildren.filter(child =>
          child.kind === 'assessment' || child.kind === 'exam'
        );

        const contentGroups = [];
        if (notes.length > 0) contentGroups.push({ type: 'notes', items: notes });
        if (practice.length > 0) contentGroups.push({ type: 'practice', items: practice });
        if (revision.length > 0) contentGroups.push({ type: 'revision', items: revision });
        if (assessments.length > 0) contentGroups.push({ type: 'assessments', items: assessments });

        const filteredStrandGroups = filterContentGroups(contentGroups, selectedContentType);

        filteredStrandGroups.forEach(group => {
          group.items.forEach(item => {
            pageList.push({
              type: 'content',
              strand,
              subStrand,
              items: [{ ...item, groupType: group.type }]
            });
          });
        });

        if (filteredStrandGroups.length === 0) {
          pageList.push({ type: 'content', strand, subStrand, items: [] });
        }
      });

      if (strandAssessments.length > 0 && (selectedContentType === 'assessment' || selectedContentType === 'notes')) {
        for (let i = 0; i < strandAssessments.length; i += 2) {
          pageList.push({
            type: 'review',
            strand,
            assessments: strandAssessments.slice(i, i + 2)
          });
        }
      }
    });

    learningAreas.forEach(learningArea => {
      const areaChildren = getChildren(registry, learningArea.id);
      const lessons = areaChildren.filter(child => child.kind === 'lesson');
      const practice = areaChildren.filter(child => child.kind === 'practice');
      const notes = areaChildren.filter(child => child.kind === 'notes');
      const revision = areaChildren.filter(child => child.kind === 'revision');
      const assessments = areaChildren.filter(child =>
        child.kind === 'assessment' || child.kind === 'exam'
      );

      const tabCover = getTabCover(selectedContentType, learningArea);

      pageList.push({
        type: 'chapter',
        strand: {
          ...learningArea,
          label: tabCover.label,
          summary: tabCover.summary,
          appearances: [{ key: 'icon', value: tabCover.icon }]
        },
        subStrandCount: lessons.length + practice.length + notes.length + revision.length
      });

      const contentGroups = [];
      if (lessons.length > 0) contentGroups.push({ type: 'lessons', items: lessons });
      if (notes.length > 0) contentGroups.push({ type: 'notes', items: notes });
      if (practice.length > 0) contentGroups.push({ type: 'practice', items: practice });
      if (revision.length > 0) contentGroups.push({ type: 'revision', items: revision });

      const filteredContentGroups = filterContentGroups(contentGroups, selectedContentType);

      filteredContentGroups.forEach(group => {
        group.items.forEach(item => {
          pageList.push({
            type: 'content',
            strand: learningArea,
            subStrand: learningArea,
            items: [{ ...item, groupType: group.type }]
          });
        });
      });

      if (assessments.length > 0 && (selectedContentType === 'assessment' || selectedContentType === 'notes')) {
        for (let i = 0; i < assessments.length; i += 2) {
          pageList.push({
            type: 'review',
            strand: learningArea,
            assessments: assessments.slice(i, i + 2)
          });
        }
      }

      if (selectedContentType === 'practice') {
        pageList.push({ type: 'placeholder', title: 'More practice coming soon' });
        pageList.push({ type: 'placeholder', title: 'Practice exercises coming soon' });
      }
      if (selectedContentType === 'assessment') {
        pageList.push({ type: 'placeholder', title: 'More assessments coming soon' });
        pageList.push({ type: 'placeholder', title: 'Assessments coming soon' });
      }
    });

    return pageList;
  }, [registry, nodeId, selectedContentType, currentNode, selectedDirectContentChild]);

  const totalPages = pages.length;

  useEffect(() => {
    if (currentPageIndex >= totalPages && totalPages > 0) {
      setCurrentPageIndex(totalPages - 1);
    }
    if (currentPageIndex < 0) {
      setCurrentPageIndex(0);
    }
  }, [totalPages, currentPageIndex]);

  useEffect(() => {
    setCurrentPageIndex(0);
  }, [nodeId]);

  const currentPage = pages[currentPageIndex];

  const canGoPrevious = currentPageIndex > 0;
  const canGoNext = currentPageIndex < totalPages - 1;

  const goToPrevious = () => {
    if (canGoPrevious) setCurrentPageIndex(prev => prev - 1);
  };

  const goToNext = () => {
    if (canGoNext) setCurrentPageIndex(prev => prev + 1);
  };

  if (pages.length === 0) {
    return (
      <div className="book-empty">
        <p>📖 No content available yet. Content is being prepared.</p>
      </div>
    );
  }

  const progressPercentage =
    totalPages > 0 ? ((currentPageIndex + 1) / totalPages) * 100 : 0;

  const selectContentType = (contentType) => {
    if (contentType !== selectedContentType) {
      setSelectedContentType(contentType);
      setCurrentPageIndex(0);
    }
  };

  return (
    <div className="book-reader">
      <div className="book-toolbar">
        {backPath && (
          <NavLink className="book-toolbar-back" to={backPath}>
            ← Back to {backLabel || 'Themes'}
          </NavLink>
        )}

        <div className="book-content-tabs" role="tablist" aria-label="Choose content type">
          {visibleContentTabs.map((tab) => (
            tab.path ? (
              <NavLink
                key={tab.key}
                role="tab"
                aria-selected={activeContentType === tab.key}
                className={`book-content-tab ${activeContentType === tab.key ? 'book-content-tab-active' : ''}`}
                to={tab.path}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </NavLink>
            ) : (
              <button
                key={tab.key}
                role="tab"
                aria-selected={selectedContentType === tab.key}
                className={`book-content-tab ${selectedContentType === tab.key ? 'book-content-tab-active' : ''}`}
                onClick={() => selectContentType(tab.key)}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          ))}
        </div>
      </div>

      <div className="book-progress-bar" aria-hidden="true">
        <div
          className="book-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="book-page-container">
        <div
          key={`${selectedContentType}-${currentPageIndex}`}
          className="book-page book-page-active"
        >
          <div className="book-page-body">
            <BookPageContent
              page={currentPage}
              pageNumber={currentPageIndex + 1}
              totalPages={totalPages}
              registry={registry}
            />
          </div>

          {totalPages > 0 && (
            <div className="book-page-footer-nav">
              <button
                className="book-page-nav-button"
                onClick={goToPrevious}
                disabled={!canGoPrevious}
              >
                ← <span className="book-page-nav-label">Previous</span>
              </button>

              <div className="book-page-footer-indicator">
                <strong>{currentPageIndex + 1}</strong>
                <span>/</span>
                <span>{totalPages}</span>
              </div>

              <button
                className="book-page-nav-button book-page-nav-button-primary"
                onClick={goToNext}
                disabled={!canGoNext}
              >
                <span className="book-page-nav-label">Next</span> →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BookPageContent({ page, pageNumber, totalPages, registry }) {
  if (page.type === 'chapter') {
    return <ChapterPage page={page} pageNumber={pageNumber} totalPages={totalPages} />;
  }
  if (page.type === 'content') {
    return (
      <ContentPage
        page={page}
        pageNumber={pageNumber}
        totalPages={totalPages}
        registry={registry}
      />
    );
  }
  if (page.type === 'review') {
    return <ReviewPage page={page} pageNumber={pageNumber} totalPages={totalPages} registry={registry} />;
  }
  if (page.type === 'placeholder') {
    return <PlaceholderPage page={page} pageNumber={pageNumber} totalPages={totalPages} />;
  }
  if (page.type === 'directBookContent') {
    return <DirectBookContentPage page={page} pageNumber={pageNumber} totalPages={totalPages} />;
  }
  return null;
}

function DirectBookContentPage({ page, pageNumber, totalPages }) {
  return (
    <>
      <div className="book-page-header">
        <span className="book-page-breadcrumb">{page.title}</span>
        <span className="book-page-number">Page {pageNumber} of {totalPages}</span>
      </div>

      <div className="book-content-scroll">
        <div className="book-content-inner">
          {page.subtitle && <p>{page.subtitle}</p>}
          {page.description && <p>{page.description}</p>}
          {page.content.map((block, index) => (
            <section key={block.id || block.title || index} className="book-content-group">
              {block.title && <h4 className="book-content-group-title">{block.title}</h4>}
              {block.text && <p>{block.text}</p>}
              {block.content && <p>{block.content}</p>}
              {Array.isArray(block.items) && block.items.length > 0 && (
                <ul>
                  {block.items.map((item, itemIndex) => (
                    <li key={`${item}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function PlaceholderPage({ page, pageNumber, totalPages }) {
  return (
    <>
      <div className="book-page-header">
        <span className="book-page-breadcrumb">Coming soon</span>
        <span className="book-page-number">Page {pageNumber} of {totalPages}</span>
      </div>
      <div className="book-placeholder-content">
        <div className="book-placeholder-icon">🚧</div>
        <h3 className="book-placeholder-title">{page.title}</h3>
        <p className="book-placeholder-text">This section is being prepared. Please check back later.</p>
      </div>
    </>
  );
}

function ChapterPage({ page, pageNumber, totalPages }) {
  const { strand, subStrandCount } = page;
  const strandIcon = strand.appearances?.find(a => a.key === 'icon')?.value || '📖';

  return (
    <>
      <div className="book-page-header">
        <span className="book-page-breadcrumb">{strand.label}</span>
        <span className="book-page-number">Page {pageNumber} of {totalPages}</span>
      </div>
      <div className="book-chapter-content">
        <div className="book-chapter-icon">{strandIcon}</div>
        <h2 className="book-chapter-title">{strand.label}</h2>
        {strand.summary && (
          <p className="book-chapter-summary">{strand.summary}</p>
        )}
        <div className="book-chapter-meta">
          <span className="book-chapter-badge">
            {subStrandCount} section{subStrandCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <div className="book-page-footer">
        <span className="book-page-hint">Turn the page to begin →</span>
      </div>
    </>
  );
}

function ContentPage({ page, pageNumber, totalPages, registry }) {
  const { strand, subStrand, items } = page;

  const typeIcons = {
    lessons: '📚', notes: '📝', practice: '✏️', revision: '🔄', assessments: '🎯'
  };
  const typeLabels = {
    lessons: 'Lessons', notes: 'Notes', practice: 'Practice', revision: 'Revision', assessments: 'Assessments'
  };

  const groupedItems = {
    lessons: items.filter(item => item.kind === 'lesson'),
    notes: items.filter(item => item.kind === 'notes'),
    practice: items.filter(item => item.kind === 'practice'),
    revision: items.filter(item => item.kind === 'revision'),
    assessments: items.filter(item => item.kind === 'assessment' || item.kind === 'exam')
  };

  return (
    <>
      <div className="book-page-header">
        <span className="book-page-breadcrumb">{strand.label} › {subStrand.label}</span>
        <span className="book-page-number">Page {pageNumber} of {totalPages}</span>
      </div>

      <div className="book-content-scroll">
        <div className="book-content-inner">
          {items.length === 0 ? (
            <p>📄 No content available for this section yet.</p>
          ) : (
            Object.entries(groupedItems).map(([type, typeItems]) => {
              if (typeItems.length === 0) return null;
              return (
                <div key={type} className="book-content-group">
                  <h4 className="book-content-group-title">
                    {typeIcons[type]} {typeLabels[type]}
                  </h4>
                  {typeItems.map(item => (
                    <div key={item.id} className="book-content-item">
                      <LearningNodeContentRenderer registry={registry} node={item} />
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

function ReviewPage({ page, pageNumber, totalPages, registry }) {
  const { strand, assessments } = page;

  return (
    <>
      <div className="book-page-header">
        <span className="book-page-breadcrumb">{strand.label}</span>
        <span className="book-page-number">Page {pageNumber} of {totalPages}</span>
      </div>
      <div className="book-review-section">
        <div className="book-review-header">
          <span className="book-review-icon">✅</span>
          <h3 className="book-review-title">Chapter Review</h3>
        </div>
        <p className="book-review-intro">
          Test your understanding of {strand.label}
        </p>
        <div className="book-assessment-group">
          {assessments.map(assessment => (
            <div key={assessment.id} className="book-assessment-item">
              <LearningNodeContentRenderer registry={registry} node={assessment} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}