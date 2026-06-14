import { useEffect, useMemo, useRef, useState } from 'react';

import { topicLibraryConfig } from '../config/topicLibraryConfig.js';
import useGridRemoteNavigation from '../hooks/useGridRemoteNavigation.js';
import { topicProgress } from '../services/questionBankService.js';
import { getQuestionSetProgress } from '../services/topicFilterService.js';

const ALL = 'all';

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

function getQuestionCountLabel(count) {
  return `${count} ${count === 1 ? 'question' : 'questions'}`;
}

function getTopicIconType(topic) {
  const source = `${topic.id || topic.name || ''}`.toLowerCase();
  if (source.includes('communication')) return 'communication';
  if (source.includes('delegation')) return 'delegation';
  if (source.includes('ownership')) return 'ownership';
  if (source.includes('mentor')) return 'mentorship';
  if (source.includes('delivery')) return 'delivery';
  if (source.includes('recursion')) return 'recursion';
  if (source.includes('nodes') || source.includes('graph')) return 'graph';
  if (source.includes('pair')) return 'pair';
  if (source.includes('pref')) return 'prefix';
  if (source.includes('search') || source.includes('sear')) return 'search';
  if (source.includes('stack')) return 'stack';
  if (source.includes('state')) return 'state';
  if (source.includes('wind')) return 'window';
  return 'default';
}

function getTopicShortLabel(topic) {
  const type = getTopicIconType(topic);
  const labels = {
    communication: 'COMM',
    delegation: 'DELG',
    ownership: 'OWN',
    mentorship: 'MENT',
    delivery: 'DLVR',
    recursion: 'RECUR',
    graph: 'NODES',
    pair: 'PAIR',
    prefix: 'PREF',
    search: 'SEAR',
    stack: 'STACK',
    state: 'STATE',
    window: 'WIND',
    default: String(topic.name || 'TOPIC').split(/\s|—|-/).filter(Boolean)[0]?.slice(0, 5).toUpperCase() || 'TOPIC'
  };

  return labels[type] || labels.default;
}

function TopicIcon({ topic }) {
  const type = getTopicIconType(topic);
  const commonProps = {
    className: `premium-topic-rail-icon icon-${type}`,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
  };

  if (type === 'communication') {
    return <svg {...commonProps}><path d="M5 6.5h9.5a3 3 0 0 1 3 3v3.2a3 3 0 0 1-3 3H10l-4.1 3.1v-3.1H5a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3Z" /><path d="M17 9h2a3 3 0 0 1 3 3v2.5a3 3 0 0 1-3 3h-.6v2.2l-2.7-2" /></svg>;
  }
  if (type === 'delegation') {
    return <svg {...commonProps}><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 20a6 6 0 0 1 11 0" /><path d="M13.5 18.5a5 5 0 0 1 8 1.5" /></svg>;
  }
  if (type === 'ownership') {
    return <svg {...commonProps}><path d="M12 3 20 6v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>;
  }
  if (type === 'mentorship') {
    return <svg {...commonProps}><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 8v6" /><path d="M15 11h6" /></svg>;
  }
  if (type === 'delivery') {
    return <svg {...commonProps}><path d="M5 16c-1.6.6-2.4 1.7-2.8 3.8 2.1-.4 3.2-1.2 3.8-2.8" /><path d="M8 15 5 12l4-5c2.5-3 5.8-4.4 10-4-.4 4.2-1.8 7.5-4.8 10L9 17l-3-3" /><path d="M14 6.5h.01" /></svg>;
  }
  if (type === 'graph') {
    return <svg {...commonProps}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="8" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="m8.2 7 7.6 1" /><path d="m7.4 8.3 3.4 7.4" /><path d="m16.7 10.2-3.4 5.6" /></svg>;
  }

  return <svg {...commonProps}><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4Z" /><path d="M9 8h6" /><path d="M9 12h5" /></svg>;
}

export default function TopicLibrary({
  topics,
  label = 'Topics',
  selectedId,
  completed,
  onSelect,
  difficulty,
  onDifficultyChange,
  difficultyOptions,
  completionFilter,
  onCompletionFilterChange,
  sortBy = 'recommended',
  onSortChange
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const libraryRef = useRef(null);

  const filteredTopics = useMemo(() => {
    return [...topics].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return getVisibleTopicProgress(b, completed).percent - getVisibleTopicProgress(a, completed).percent;
      if (sortBy === 'questions') return (b.filteredCount ?? b.count ?? 0) - (a.filteredCount ?? a.count ?? 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name);
    });
  }, [topics, sortBy, completed]);

  const totalPages = Math.max(1, Math.ceil(filteredTopics.length / topicLibraryConfig.topicsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const visibleTopics = useMemo(() => {
    const start = (safePage - 1) * topicLibraryConfig.topicsPerPage;
    return filteredTopics.slice(start, start + topicLibraryConfig.topicsPerPage);
  }, [filteredTopics, safePage]);
  const selectedTopicIndex = Math.max(0, visibleTopics.findIndex((topic) => topic.id === selectedId));
  const { getItemRef, gridProps } = useGridRemoteNavigation({
    itemCount: visibleTopics.length,
    initialIndex: selectedTopicIndex
  });

  useEffect(() => { setCurrentPage(1); }, [difficulty, completionFilter, sortBy]);
  useEffect(() => { if (safePage !== currentPage) setCurrentPage(safePage); }, [currentPage, safePage]);

  function goToPage(page) {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
    requestAnimationFrame(() => libraryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  return (
    <section className="topic-library glass-lite premium-topic-rail" ref={libraryRef}>
      <div className="library-head premium-topic-rail-head"><p className="eyebrow">{label}</p></div>

      <div className="topic-library-controls premium-topic-rail-controls" aria-label="Question filters">
        <label><span>Difficulty</span><select value={difficulty} onChange={(event) => onDifficultyChange(event.target.value)}><option value={ALL}>All levels</option>{difficultyOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>Status</span><select value={completionFilter} onChange={(event) => onCompletionFilterChange(event.target.value)}><option value="all">All</option><option value="completed">Complete</option><option value="incomplete">Todo</option></select></label>
        <label><span>Sort</span><select value={sortBy} onChange={(event) => onSortChange?.(event.target.value)}><option value="recommended">Recommended</option><option value="name">Name</option><option value="progress">Progress</option><option value="questions">Questions</option></select></label>
      </div>

      <div className="topic-picker scalable-topic-picker premium-topic-rail-list" aria-label={`${label} navigation`} {...gridProps}>
        {visibleTopics.map((topic, index) => {
          const count = topic.filteredCount ?? topic.count ?? 0;
          const countLabel = getQuestionCountLabel(count);
          const shortLabel = getTopicShortLabel(topic);
          const progress = getVisibleTopicProgress(topic, completed);
          const fullProgress = getFullTopicProgress(topic, completed);
          const fullyCompleted = fullProgress.total > 0 && fullProgress.done === fullProgress.total;
          const progressTotal = progress.total || count;

          return (
            <button key={topic.id} type="button" aria-current={selectedId === topic.id ? 'true' : undefined} aria-label={`${shortLabel} — ${topic.name}, ${countLabel}, ${progress.done}/${progressTotal} complete`} className={`topic-tab glass premium-topic-rail-item icon-${getTopicIconType(topic)} ${selectedId === topic.id ? 'active' : ''} ${fullyCompleted ? 'done' : ''}`} data-grid-nav-item="true" onClick={() => onSelect(topic.id)} ref={getItemRef(index)}>
              <TopicIcon topic={topic} />
              <span className="premium-topic-rail-copy"><strong>{topic.name}</strong><em>{progress.done}/{progressTotal} complete</em></span>
              <span className="premium-topic-rail-compact" aria-hidden="true"><strong>{shortLabel}</strong><small>{countLabel}</small></span>
            </button>
          );
        })}
      </div>

      {filteredTopics.length === 0 ? <div className="empty-state glass-lite"><h3>No topics found</h3><p>Try clearing the difficulty or status filters.</p></div> : null}

      {totalPages > 1 ? (
        <nav className="pagination compact-pagination premium-topic-rail-pagination" aria-label="Topic library pages">
          <div className="pagination-status">Page {safePage} of {totalPages}</div>
          <div className="pagination-controls"><button type="button" onClick={() => goToPage(safePage - 1)} disabled={safePage === 1}>‹</button><button type="button" onClick={() => goToPage(safePage + 1)} disabled={safePage === totalPages}>›</button></div>
        </nav>
      ) : null}
    </section>
  );
}
