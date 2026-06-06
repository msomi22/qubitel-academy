import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  getAllTopicsWithCounts,
  topicProgress
} from '../services/questionBankService.js';

import { usePreferences } from '../hooks/usePreferences.js';
import { storageService } from '../services/storageService.js';
import LoadingCard from '../components/LoadingCard.jsx';

import '../styles/progress-table.css';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'started', label: 'Started' },
  { value: 'not-started', label: 'Not started' },
  { value: 'completed', label: 'Completed' }
];

const SORTS = [
  { value: 'progress', label: 'Progress' },
  { value: 'az', label: 'A → Z' },
  { value: 'completed-first', label: 'Completed first' },
  { value: 'not-started-first', label: 'Not started first' }
];

const ROW_OPTIONS = [8, 12, 16, 24];

function getStatus(progress) {
  if (progress.total > 0 && progress.done === progress.total) {
    return 'Completed';
  }

  if (progress.done > 0) {
    return 'In progress';
  }

  return 'Not started';
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function compareByProgress(a, b) {
  if (b.progress.percent !== a.progress.percent) {
    return b.progress.percent - a.progress.percent;
  }

  return a.name.localeCompare(b.name) || a.category.localeCompare(b.category);
}

export default function ProgressPage() {
  const { completed } = usePreferences();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('progress');
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;

    setLoading(true);

    getAllTopicsWithCounts()
      .then((nextTopics) => {
        if (!alive) return;
        setTopics(nextTopics);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [completed]);

  useEffect(() => {
    setPage(1);
  }, [filter, sort, rowsPerPage]);

  const progressRows = useMemo(() => {
    return topics.map((topic) => {
      const progress = topicProgress(topic, completed);
      const status = getStatus(progress);

      return {
        ...topic,
        progress,
        status
      };
    });
  }, [topics, completed]);

  const filteredRows = useMemo(() => {
    const nextRows = progressRows.filter((topic) => {
      const { done, total } = topic.progress;

      if (filter === 'started') return done > 0 && done < total;
      if (filter === 'not-started') return done === 0;
      if (filter === 'completed') return total > 0 && done === total;

      return true;
    });

    return [...nextRows].sort((a, b) => {
      if (sort === 'az') return a.name.localeCompare(b.name) || a.category.localeCompare(b.category);

      if (sort === 'completed-first') {
        const aDone = a.progress.total > 0 && a.progress.done === a.progress.total;
        const bDone = b.progress.total > 0 && b.progress.done === b.progress.total;

        if (aDone !== bDone) return Number(bDone) - Number(aDone);
        return compareByProgress(a, b);
      }

      if (sort === 'not-started-first') {
        const aNotStarted = a.progress.done === 0;
        const bNotStarted = b.progress.done === 0;

        if (aNotStarted !== bNotStarted) {
          return Number(bNotStarted) - Number(aNotStarted);
        }

        return a.name.localeCompare(b.name) || a.category.localeCompare(b.category);
      }

      return compareByProgress(a, b);
    });
  }, [progressRows, filter, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const safePage = Math.min(page, pageCount);
  const startIndex = (safePage - 1) * rowsPerPage;
  const visibleRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);
  const showingStart = filteredRows.length ? startIndex + 1 : 0;
  const showingEnd = filteredRows.length
    ? Math.min(startIndex + rowsPerPage, filteredRows.length)
    : 0;

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount));
  }, [pageCount]);

  const openTopic = (topic) => {
    storageService.setSelectedTopic(topic.category, topic.id);
  };

  return (
    <main className="page progress-page progress-page-focused">
      {loading ? (
        <LoadingCard label="Calculating real progress counts…" />
      ) : (
        <section className="glass progress-table-card" aria-labelledby="progress-heading">
          <div className="progress-card-head">
            <div>
              <p className="eyebrow">Progress</p>
              <h1 id="progress-heading">Learning progress</h1>
              <p>Track completion across topics.</p>
            </div>
          </div>

          <div className="progress-toolbar" aria-label="Progress table controls">
            <div className="progress-filter-tabs" role="group" aria-label="Filter topics">
              {FILTERS.map((item) => (
                <button
                  className={`progress-filter-tab ${filter === item.value ? 'active' : ''}`}
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="progress-table-controls">
              <label>
                <span>Rows</span>
                <select
                  value={rowsPerPage}
                  onChange={(event) => setRowsPerPage(Number(event.target.value))}
                >
                  {ROW_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Sort</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  {SORTS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="progress-table-scroll">
            <table className="progress-topic-table">
              <thead>
                <tr>
                  <th scope="col">Topic</th>
                  <th scope="col">Solved</th>
                  <th scope="col">Progress</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((topic) => (
                  <tr key={`${topic.category}/${topic.id}`}>
                    <td>
                      <div className="progress-topic-name">
                        <strong>{topic.name}</strong>
                        <span>{topic.description}</span>
                      </div>
                    </td>
                    <td className="progress-solved-count">
                      {topic.progress.done} / {topic.progress.total}
                    </td>
                    <td>
                      <div className="progress-bar-cell">
                        <span className="progress-bar-track" aria-hidden="true">
                          <span
                            className="progress-bar-fill"
                            style={{ width: `${topic.progress.percent}%` }}
                          />
                        </span>
                        <span>{topic.progress.percent}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`progress-status-chip ${statusClass(topic.status)}`}>
                        {topic.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        className="btn ghost progress-open-btn"
                        to={`/category/${topic.category}`}
                        onClick={() => openTopic(topic)}
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visibleRows.length === 0 ? (
            <div className="progress-empty-state">
              No topics match this progress filter yet.
            </div>
          ) : null}

          <div className="progress-pagination">
            <p>
              Showing {showingStart}–{showingEnd} of {filteredRows.length} topics
            </p>

            <div className="progress-page-controls" aria-label="Progress pages">
              <button
                className="page-btn"
                type="button"
                disabled={safePage === 1}
                onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              >
                Previous
              </button>

              {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  className={`page-btn ${safePage === pageNumber ? 'active' : ''}`}
                  key={pageNumber}
                  type="button"
                  aria-current={safePage === pageNumber ? 'page' : undefined}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                className="page-btn"
                type="button"
                disabled={safePage === pageCount}
                onClick={() => setPage((currentPage) => Math.min(pageCount, currentPage + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
