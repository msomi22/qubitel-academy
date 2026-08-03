import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Button from './Button.jsx';

import { searchConfig } from '../config/searchConfig.js';
import { performanceConfig } from '../config/performanceConfig.js';

function clampPage(page, totalPages) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function buildPageNumbers(currentPage, totalPages, windowSize) {
  const safeWindow = Math.max(3, windowSize);
  const half = Math.floor(safeWindow / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + safeWindow - 1);

  start = Math.max(1, end - safeWindow + 1);

  const pages = [];

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}

function SearchResultPreview({ entry, completed }) {
  const question = entry.question;
  const questionId = question.id || entry.id;

  return (
    <NavLink
      className={`search-preview-card glass-lite ${
        completed ? 'done' : ''
      }`}
      to={`/practice/${encodeURIComponent(questionId)}`}
      state={{
        searchEntry: entry
      }}
    >
      <div className="result-context">
        <span>{entry.topicName}</span>

        <small>
          {entry.type} · {entry.difficulty}
        </small>
      </div>

      <div className="search-preview-body">
        <h3>{question.title}</h3>

        <p>
          {question.scenario ||
            question.question ||
            entry.snippet ||
            'Open this practice.'}
        </p>
      </div>

      <div className="tags">
        {question.tags?.slice(0, 5).map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <strong className="open-focused-link">
        Open practice →
      </strong>
    </NavLink>
  );
}

function SearchResultsSection({ results, completed }) {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  const pageSize = Math.max(1, searchConfig.searchPageSize);
  const totalQuestions = results.length;
  const totalPages = Math.max(1, Math.ceil(totalQuestions / pageSize));

  const safePage = clampPage(currentPage, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, totalQuestions);

  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  const visibleResults = useMemo(
    () => results.slice(pageStart, pageEnd),
    [results, pageStart, pageEnd]
  );

  const pageNumbers = useMemo(
    () =>
      buildPageNumbers(
        safePage,
        totalPages,
        performanceConfig.paginationWindow
      ),
    [safePage, totalPages]
  );

  function goToPage(page) {
    setCurrentPage(clampPage(page, totalPages));

    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  if (!totalQuestions) {
    return (
      <section className="search-results-section" ref={sectionRef}>
        <div className="empty-state glass-lite">
          <h2>No matching practices yet</h2>

          <p>
            Try fewer words, remove one filter, or search by a broader
            concept like cache, graph, retry, window, queue, or index.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="search-results-section" ref={sectionRef}>
      <div className="section-head search-results-head">
        <div>
          <p className="eyebrow">Search results</p>

          <h2>{totalQuestions} matching practices</h2>

          <p className="render-note">
            Showing results {pageStart + 1}-{pageEnd}. Click any result
            to open the practice workspace.
          </p>
        </div>
      </div>

      <div className="card-grid compact-grid">
        {visibleResults.map((entry) => (
          <SearchResultPreview
            key={entry.id}
            entry={entry}
            completed={!!completed[entry.question.id || entry.id]}
          />
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          className="pagination glass-lite"
          aria-label="Search result pages"
        >
          <div className="pagination-summary">
            Page <strong>{safePage}</strong> of{' '}
            <strong>{totalPages}</strong>
          </div>

          <div className="pagination-controls">
            <Button
              className="ghost"
              onClick={() => goToPage(1)}
              disabled={safePage === 1}
            >
              First
            </Button>

            <Button
              className="ghost"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
            >
              Previous
            </Button>

            {pageNumbers[0] > 1 ? (
              <span className="pagination-gap">…</span>
            ) : null}

            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                className={`page-btn ${
                  page === safePage ? 'active' : ''
                }`}
                onClick={() => goToPage(page)}
                aria-current={page === safePage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages ? (
              <span className="pagination-gap">…</span>
            ) : null}

            <Button
              className="ghost"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
            >
              Next
            </Button>

            <Button
              className="ghost"
              onClick={() => goToPage(totalPages)}
              disabled={safePage === totalPages}
            >
              Last
            </Button>
          </div>
        </nav>
      ) : null}
    </section>
  );
}

export default memo(SearchResultsSection);