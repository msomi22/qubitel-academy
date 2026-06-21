import { useState, useMemo, useEffect } from 'react';
import { getChildren } from '../learning/registry/index.ts';
import LearningNodeContentRenderer from './LearningNodeContentRenderer.jsx';

/**
 * Book-page navigation for learning content - opens like turning pages in a book.
 * Each content item gets its own page. If an item is taller than the page,
 * the user can scroll up/down within that page instead of creating duplicate pages.
 */
export default function LearningNodeBookView({ registry, nodeId }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Build pages: one page per content item (plus chapter/review pages)
  const pages = useMemo(() => {
    const children = getChildren(registry, nodeId);

    const strands = children.filter(child => child.kind === 'strand');
    const learningAreas = children.filter(child => child.kind === 'learningArea');

    const pageList = [];

    // Strand-based content
    strands.forEach(strand => {
      const strandChildren = getChildren(registry, strand.id);
      const subStrands = strandChildren.filter(child => child.kind === 'subStrand');
      const strandAssessments = strandChildren.filter(child =>
        child.kind === 'assessment' || child.kind === 'exam'
      );

      pageList.push({ type: 'chapter', strand, subStrandCount: subStrands.length });

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

        // One item per page
        contentGroups.forEach(group => {
          group.items.forEach(item => {
            pageList.push({
              type: 'content',
              strand,
              subStrand,
              items: [{ ...item, groupType: group.type }]
            });
          });
        });

        if (contentGroups.length === 0) {
          pageList.push({ type: 'content', strand, subStrand, items: [] });
        }
      });

      if (strandAssessments.length > 0) {
        for (let i = 0; i < strandAssessments.length; i += 2) {
          pageList.push({
            type: 'review',
            strand,
            assessments: strandAssessments.slice(i, i + 2)
          });
        }
      }
    });

    // LearningArea-based content (Grade 1)
    learningAreas.forEach(learningArea => {
      const areaChildren = getChildren(registry, learningArea.id);
      const lessons = areaChildren.filter(child => child.kind === 'lesson');
      const practice = areaChildren.filter(child => child.kind === 'practice');
      const notes = areaChildren.filter(child => child.kind === 'notes');
      const revision = areaChildren.filter(child => child.kind === 'revision');
      const assessments = areaChildren.filter(child =>
        child.kind === 'assessment' || child.kind === 'exam'
      );

      pageList.push({
        type: 'chapter',
        strand: learningArea,
        subStrandCount: lessons.length + practice.length + notes.length + revision.length
      });

      const contentGroups = [];
      if (lessons.length > 0) contentGroups.push({ type: 'lessons', items: lessons });
      if (notes.length > 0) contentGroups.push({ type: 'notes', items: notes });
      if (practice.length > 0) contentGroups.push({ type: 'practice', items: practice });
      if (revision.length > 0) contentGroups.push({ type: 'revision', items: revision });

      // One item per page
      contentGroups.forEach(group => {
        group.items.forEach(item => {
          pageList.push({
            type: 'content',
            strand: learningArea,
            subStrand: learningArea,
            items: [{ ...item, groupType: group.type }]
          });
        });
      });

      if (assessments.length > 0) {
        for (let i = 0; i < assessments.length; i += 2) {
          pageList.push({
            type: 'review',
            strand: learningArea,
            assessments: assessments.slice(i, i + 2)
          });
        }
      }
    });

    return pageList;
  }, [registry, nodeId]);

  const totalPages = pages.length;

  // Clamp page index when pages change
  useEffect(() => {
    if (currentPageIndex >= totalPages && totalPages > 0) {
      setCurrentPageIndex(totalPages - 1);
    }
    if (currentPageIndex < 0) {
      setCurrentPageIndex(0);
    }
  }, [totalPages, currentPageIndex]);

  // Reset to first page when node changes
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [nodeId]);

  const currentPage = pages[currentPageIndex];

  const canGoPrevious = currentPageIndex > 0;
  const canGoNext = currentPageIndex < totalPages - 1;

  const goToPrevious = () => {
    if (canGoPrevious) setCurrentPageIndex(currentPageIndex - 1);
  };

  const goToNext = () => {
    if (canGoNext) setCurrentPageIndex(currentPageIndex + 1);
  };

  if (pages.length === 0) {
    return (
      <div className="book-empty">
        <p>📖 No content available yet. Content is being prepared.</p>
      </div>
    );
  }

  return (
    <div className="book-reader">
      <div className="book-progress-bar">
        <div
          className="book-progress-fill"
          style={{ width: `${totalPages > 0 ? ((currentPageIndex + 1) / totalPages) * 100 : 0}%` }}
        />
      </div>

      <div className="book-page-container">
        <div
          key={currentPageIndex}
          className="book-page book-page-active"
        >
          <BookPageContent
            page={currentPage}
            pageNumber={currentPageIndex + 1}
            totalPages={totalPages}
            registry={registry}
          />
        </div>
      </div>

      <div className="book-navigation">
        <button
          className="book-nav-button book-nav-previous"
          onClick={goToPrevious}
          disabled={!canGoPrevious}
          aria-label="Previous page"
        >
          <span className="book-nav-icon">←</span>
          <span className="book-nav-label">Previous</span>
        </button>

        <div className="book-page-indicator">
          <span className="book-current-page">{currentPageIndex + 1}</span>
          <span className="book-page-separator">/</span>
          <span className="book-total-pages">{totalPages}</span>
        </div>

        <button
          className="book-nav-button book-nav-next"
          onClick={goToNext}
          disabled={!canGoNext}
          aria-label="Next page"
        >
          <span className="book-nav-label">Next</span>
          <span className="book-nav-icon">→</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Renders page content. For content pages, uses a scrollable container
 * so overflowing content can be scrolled up/down within the same page.
 */
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
  return null;
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

  // Group items by kind
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