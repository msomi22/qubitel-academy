import { useState, useMemo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getChildren } from '../learning/registry/index.ts';
import LearningNodeContentRenderer from './LearningNodeContentRenderer.jsx';

const CONTENT_TABS = [
  { key: 'notes', label: 'Notes', icon: '📖' },
  { key: 'practice', label: 'Practice', icon: '✏️' },
  { key: 'assessment', label: 'Assessment', icon: '✅' }
];

const TAB_GROUPS = {
  notes: new Set(['lessons', 'notes', 'practice', 'revision', 'assessments']),
  practice: new Set([]),
  assessment: new Set(['assessments'])
};

function filterContentGroups(contentGroups, selectedContentType) {
  const allowedGroups = TAB_GROUPS[selectedContentType] || new Set();
  if (allowedGroups.size === 0) return [];
  return contentGroups.filter((group) => allowedGroups.has(group.type));
}

export default function LearningNodeBookView({ registry, nodeId, backPath, backLabel }) {
  const [selectedContentType, setSelectedContentType] = useState('notes');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const pages = useMemo(() => {
    const children = getChildren(registry, nodeId);

    const strands = children.filter(child => child.kind === 'strand');
    const learningAreas = children.filter(child => child.kind === 'learningArea');

    const pageList = [];

    const tabCoverStrand = {
      notes: { label: 'Notes', icon: '📖', summary: 'Lessons and notes for Greetings' },
      practice: { label: 'Practice', icon: '✏️', summary: 'Practice exercises for Greetings' },
      assessment: { label: 'Assessment', icon: '✅', summary: 'Assessments for Greetings' }
    }[selectedContentType] || { label: 'Notes', icon: '📖', summary: '' };

    strands.forEach(strand => {
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

      const tabCover = {
        notes: { label: 'Notes', icon: '📖', summary: 'Lessons and notes for Greetings' },
        practice: { label: 'Practice', icon: '✏️', summary: 'Practice exercises for Greetings' },
        assessment: { label: 'Assessment', icon: '✅', summary: 'Assessments for Greetings' }
      }[selectedContentType] || { label: 'Notes', icon: '📖', summary: learningArea.summary || '' };

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
  }, [registry, nodeId, selectedContentType]);

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
          {CONTENT_TABS.map((tab) => (
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
  return null;
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