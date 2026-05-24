import { useEffect, useMemo, useRef, useState } from 'react';

import { topicLibraryConfig } from '../config/topicLibraryConfig.js';
import { topicProgress } from '../services/questionBankService.js';
import { getQuestionSetProgress } from '../services/topicFilterService.js';

const ALL = 'all';

function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function getFilterSummary(completionFilter, visibleTopicCount, allTopicsCount) {
  if (completionFilter === 'completed') {
    return `${pluralize(visibleTopicCount, 'topic')} contain completed questions.`;
  }

  if (completionFilter === 'incomplete') {
    return `${pluralize(visibleTopicCount, 'topic')} contain incomplete questions.`;
  }

  return `${visibleTopicCount} of ${allTopicsCount} topics match the current filters.`;
}

function getVisibleTopicProgress(topic, completed = {}) {
  if (Array.isArray(topic.filteredQuestions)) {
    return getQuestionSetProgress(topic.filteredQuestions, completed);
  }

  return topicProgress(
    { ...topic, count: topic.filteredCount ?? topic.count },
    completed
  );
}

function getFullTopicProgress(topic, completed = {}) {
  return topicProgress(topic, completed);
}

function getCountLabel(count, completionFilter) {
  if (completionFilter === 'completed') {
    return `${count} completed`;
  }

  if (completionFilter === 'incomplete') {
    return `${count} incomplete`;
  }

  return `${count} quiz`;
}

export default function TopicLibrary({
  topics,
  allTopicsCount,
  selectedId,
  completed,
  onSelect,
  difficulty,
  onDifficultyChange,
  difficultyOptions,
  completionFilter,
  onCompletionFilterChange
}) {
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const libraryRef = useRef(null);

  const filteredTopics = useMemo(() => {
    return [...topics].sort((a, b) => {
      const selectedDelta =
        Number(b.id === selectedId) - Number(a.id === selectedId);

      if (selectedDelta !== 0) return selectedDelta;

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === 'progress') {
        const ap = getVisibleTopicProgress(a, completed).percent;
        const bp = getVisibleTopicProgress(b, completed).percent;

        return bp - ap;
      }

      if (sortBy === 'questions') {
        return (
          (b.filteredCount ?? b.count ?? 0) -
          (a.filteredCount ?? a.count ?? 0)
        );
      }

      return (
        (b.featured ? 1 : 0) -
          (a.featured ? 1 : 0) ||
        a.name.localeCompare(b.name)
      );
    });
  }, [topics, sortBy, completed, selectedId]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTopics.length / topicLibraryConfig.topicsPerPage
    )
  );

  const safePage = Math.min(currentPage, totalPages);

  const visibleTopics = useMemo(() => {
    const start =
      (safePage - 1) * topicLibraryConfig.topicsPerPage;

    return filteredTopics.slice(
      start,
      start + topicLibraryConfig.topicsPerPage
    );
  }, [filteredTopics, safePage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [difficulty, completionFilter, sortBy, selectedId]);

  useEffect(() => {
    if (safePage === currentPage) return;
    setCurrentPage(safePage);
  }, [currentPage, safePage]);

  function goToPage(page) {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);

    requestAnimationFrame(() => {
      libraryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  return (
    <section className="topic-library glass-lite" ref={libraryRef}>
      <div className="library-head">
        <div>
          <p className="eyebrow">Topic library</p>

          <h2>Choose a topic</h2>

          <p>
            {getFilterSummary(
              completionFilter,
              filteredTopics.length,
              allTopicsCount ?? topics.length
            )}
          </p>
        </div>
      </div>

      <div className="topic-library-controls">
        <label>
          <span>Difficulty</span>

          <select
            value={difficulty}
            onChange={(event) => onDifficultyChange(event.target.value)}
          >
            <option value={ALL}>All difficulties</option>

            {difficultyOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Status</span>

          <select
            value={completionFilter}
            onChange={(event) =>
              onCompletionFilterChange(event.target.value)
            }
          >
            <option value="all">All questions</option>
            <option value="completed">Completed only</option>
            <option value="incomplete">Incomplete only</option>
          </select>
        </label>

        <label>
          <span>Sort</span>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="name">Name</option>
            <option value="progress">Progress</option>
            <option value="questions">Question count</option>
          </select>
        </label>
      </div>

      <div className="topic-picker scalable-topic-picker">
        {visibleTopics.map((topic) => {
          const count = topic.filteredCount ?? topic.count ?? 0;

          const progress = getVisibleTopicProgress(topic, completed);
          const fullProgress = getFullTopicProgress(topic, completed);

          const fullyCompleted =
            fullProgress.total > 0 && fullProgress.done === fullProgress.total;

          return (
            <button
              key={topic.id}
              type="button"
              className={`topic-tab glass ${
                selectedId === topic.id ? 'active' : ''
              } ${fullyCompleted ? 'done' : ''}`}
              onClick={() => onSelect(topic.id)}
            >
              <span className="eyebrow">
                {getCountLabel(count, completionFilter)}
              </span>

              <strong>{topic.name}</strong>

              <small>
                {progress.done}/{progress.total || count} visible complete
              </small>

              {completionFilter !== 'all' ? (
                <small>
                  Topic total: {fullProgress.done}/{fullProgress.total || topic.count || 0} complete
                </small>
              ) : null}

              {difficulty !== ALL ? (
                <small>Difficulty: {difficulty}</small>
              ) : null}

              {completionFilter !== 'all' ? (
                <small>
                  Status:{' '}
                  {completionFilter === 'completed'
                    ? 'Completed questions only'
                    : 'Incomplete questions only'}
                </small>
              ) : null}

              <em>{topic.description}</em>
            </button>
          );
        })}
      </div>

      {filteredTopics.length === 0 ? (
        <div className="empty-state glass-lite">
          <h3>No topics found</h3>
          <p>Try clearing the difficulty or status filters.</p>
        </div>
      ) : null}

      {totalPages > 1 ? (
        <nav
          className="pagination compact-pagination"
          aria-label="Topic library pages"
        >
          <div className="pagination-status">
            Page {safePage} of {totalPages}
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              onClick={() => goToPage(1)}
              disabled={safePage === 1}
            >
              First
            </button>

            <button
              type="button"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
            >
              Next
            </button>

            <button
              type="button"
              onClick={() => goToPage(totalPages)}
              disabled={safePage === totalPages}
            >
              Last
            </button>
          </div>
        </nav>
      ) : null}
    </section>
  );
}
