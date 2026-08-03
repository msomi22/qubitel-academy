import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { usePreferences } from '../hooks/usePreferences.js';
import { useQuestionSearch } from '../hooks/useQuestionSearch.js';
import { allTopics } from '../services/questionBankService.js';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function GlobalResult({ entry, completed, onSelect }) {
  const question = entry.question;
  const questionId = question.id || entry.id;

  return (
    <NavLink
      className={`global-search-result ${completed ? 'done' : ''}`}
      to={`/practice/${encodeURIComponent(questionId)}`}
      state={{ searchEntry: entry }}
      onClick={onSelect}
    >
      <span>{entry.topicName}</span>
      <strong>{question.title}</strong>
      <small>{entry.difficulty} · {entry.type}</small>
    </NavLink>
  );
}

export default function GlobalSearch() {
  const location = useLocation();
  const { completed } = usePreferences();
  const search = useQuestionSearch(allTopics);
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const query = search.query.trim();
  const hasQuery = query.length > 0;
  const showPanel = hasQuery && search.isActive && panelOpen;
  const visibleResults = search.results.slice(0, 6);

  useEffect(() => {
    setPanelOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!panelOpen) return undefined;

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setPanelOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setPanelOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [panelOpen]);

  function clearSearch() {
    search.clearSearch();
    setPanelOpen(false);
  }

  function closeSearchPanel() {
    setPanelOpen(false);
  }

  return (
    <div className="global-search" role="search" ref={rootRef}>
      <label className="global-search-control">
        <span className="sr-only">Search practices</span>
        <SearchIcon />
        <input
          ref={inputRef}
          type="search"
          value={search.query}
          onChange={(event) => {
            search.setQuery(event.target.value);
            setPanelOpen(true);
          }}
          onFocus={() => {
            if (hasQuery) setPanelOpen(true);
          }}
          placeholder="Search practices, concepts, or technologies..."
          autoComplete="off"
        />
      </label>

      {showPanel ? (
        <div className="global-search-panel glass-lite">
          {search.isIndexing ? (
            <p className="global-search-status">Building search index…</p>
          ) : visibleResults.length ? (
            <>
              <div className="global-search-head">
                <span>{search.results.length} matches</span>
                <button type="button" onClick={clearSearch}>Clear</button>
              </div>

              <div className="global-search-results">
                {visibleResults.map((entry) => (
                  <GlobalResult
                    key={entry.id}
                    entry={entry}
                    completed={!!completed[entry.question.id || entry.id]}
                    onSelect={closeSearchPanel}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="global-search-empty">
              <strong>No matches found</strong>
              <p>Try a broader term like cache, graph, retry, window, queue, or index.</p>
              <button type="button" onClick={clearSearch}>Clear search</button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
