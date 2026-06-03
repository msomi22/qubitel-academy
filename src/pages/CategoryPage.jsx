import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import TopicSection from '../components/TopicSection.jsx';
import TopicLibrary from '../components/TopicLibrary.jsx';
import LoadingCard from '../components/LoadingCard.jsx';

import { storageService } from '../services/storageService.js';
import {
  ALL_FILTER,
  getFilteredTopicQuestions
} from '../services/topicFilterService.js';
import {
  buildCategorySearchParams,
  readCategorySearchState
} from '../services/categoryNavigationService.js';
import { usePreferences } from '../hooks/usePreferences.js';

import {
  getCategory,
  getVisibleTopicsForCategory,
  loadTopicBank
} from '../services/questionBankService.js';

function CategoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M14.5 19a5 5 0 0 1 7 0" />
    </svg>
  );
}

export default function CategoryPage({ fixedCategoryId }) {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchState = useMemo(() => readCategorySearchState(searchParams), [searchParams]);
  const categoryId = fixedCategoryId || params.categoryId;
  const category = getCategory(categoryId);
  const pref = usePreferences();

  const [topics, setTopics] = useState([]);
  const [topicBanks, setTopicBanks] = useState({});
  const [completed, setCompleted] = useState(pref.completed);
  const [selectedId, setSelectedId] = useState(searchState.topicId || pref.selectedTopics?.[categoryId] || '');
  const [topicDifficulty, setTopicDifficulty] = useState(searchState.difficulty || ALL_FILTER);
  const [completionFilter, setCompletionFilter] = useState(searchState.completionFilter || 'all');
  const [currentPage, setCurrentPage] = useState(searchState.page || 1);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingBanks, setLoadingBanks] = useState(true);

  useEffect(() => {
    setCompleted(pref.completed || {});
  }, [pref.completed]);

  useEffect(() => {
    function refreshCompletedState() {
      setCompleted(storageService.read().completed || {});
    }

    window.addEventListener('focus', refreshCompletedState);
    document.addEventListener('visibilitychange', refreshCompletedState);

    return () => {
      window.removeEventListener('focus', refreshCompletedState);
      document.removeEventListener('visibilitychange', refreshCompletedState);
    };
  }, []);

  useEffect(() => {
    setTopicDifficulty(searchState.difficulty || ALL_FILTER);
    setCompletionFilter(searchState.completionFilter || 'all');
    setCurrentPage(searchState.page || 1);
    if (searchState.topicId) setSelectedId(searchState.topicId);
  }, [searchState.topicId, searchState.page, searchState.difficulty, searchState.completionFilter]);

  useEffect(() => {
    let alive = true;
    setLoadingTopics(true);
    setLoadingBanks(true);

    getVisibleTopicsForCategory(categoryId)
      .then(async (nextTopics) => {
        if (!alive) return;
        setTopics(nextTopics);
        const storedSelectedId = searchState.topicId || storageService.getSelectedTopic?.(categoryId) || selectedId;
        const validSelectedId = nextTopics.some((topic) => topic.id === storedSelectedId) ? storedSelectedId : nextTopics[0]?.id || '';
        setSelectedId(validSelectedId);

        const loadedBanks = await Promise.all(nextTopics.map(async (topic) => {
          const bank = await loadTopicBank(topic.id);
          return [topic.id, bank];
        }));

        if (!alive) return;
        setTopicBanks(Object.fromEntries(loadedBanks));
      })
      .finally(() => {
        if (!alive) return;
        setLoadingTopics(false);
        setLoadingBanks(false);
      });

    return () => { alive = false; };
  }, [categoryId]);

  useEffect(() => {
    if (selectedId) storageService.setSelectedTopic(categoryId, selectedId);
  }, [categoryId, selectedId]);

  useEffect(() => {
    if (loadingTopics || loadingBanks || !selectedId) return;
    const nextParams = buildCategorySearchParams({ topicId: selectedId, page: currentPage, difficulty: topicDifficulty, completionFilter });
    if (nextParams.toString() !== searchParams.toString()) setSearchParams(nextParams, { replace: true });
  }, [completionFilter, currentPage, loadingBanks, loadingTopics, searchParams, selectedId, setSearchParams, topicDifficulty]);

  const topicsWithBanks = useMemo(() => topics.map((topic) => {
    const bank = topicBanks[topic.id];
    return { ...topic, questions: bank?.questions || [], count: bank?.questions?.length || 0 };
  }), [topics, topicBanks]);

  const topicDifficultyOptions = useMemo(() => {
    const order = { Easy: 1, Medium: 2, Hard: 3 };
    const set = new Set();
    topicsWithBanks.forEach((topic) => topic.questions.forEach((question) => { if (question.difficulty) set.add(question.difficulty); }));
    return Array.from(set).sort((a, b) => (order[a] || 99) - (order[b] || 99));
  }, [topicsWithBanks]);

  const filteredTopics = useMemo(() => topicsWithBanks.map((topic) => {
    const filteredQuestions = getFilteredTopicQuestions(topic, completed, topicDifficulty, completionFilter);
    return { ...topic, filteredQuestions, filteredCount: filteredQuestions.length };
  }).filter((topic) => topic.filteredCount > 0), [topicsWithBanks, topicDifficulty, completionFilter, completed]);

  const selectedTopic = useMemo(() => filteredTopics.find((topic) => topic.id === selectedId), [filteredTopics, selectedId]);
  const visibleLibraryTopics = useMemo(() => {
    if (completionFilter === 'all') return filteredTopics;
    return selectedTopic ? [selectedTopic] : filteredTopics.slice(0, 1);
  }, [completionFilter, filteredTopics, selectedTopic]);

  const categoryStats = useMemo(() => {
    const totalTopics = topicsWithBanks.length;
    const totalQuestions = topicsWithBanks.reduce((sum, topic) => sum + topic.count, 0);
    const completedCount = topicsWithBanks.reduce((sum, topic) => sum + topic.questions.filter((question) => completed[question.id]).length, 0);
    const percent = totalQuestions ? Math.round((completedCount / totalQuestions) * 100) : 0;
    return { totalTopics, totalQuestions, completedCount, percent };
  }, [completed, topicsWithBanks]);

  useEffect(() => {
    if (!filteredTopics.length) return;
    const selectedStillVisible = filteredTopics.some((topic) => topic.id === selectedId);
    if (!selectedStillVisible) {
      setSelectedId(filteredTopics[0].id);
      setCurrentPage(1);
    }
  }, [filteredTopics, selectedId]);

  const handleTopicSelect = (id) => {
    setSelectedId(id);
    setCurrentPage(1);
  };
  const handleDifficultyChange = (difficulty) => {
    setTopicDifficulty(difficulty);
    setCurrentPage(1);
  };
  const handleCompletionFilterChange = (filter) => {
    setCompletionFilter(filter);
    setCurrentPage(1);
  };
  const handleSortChange = (nextSort) => {
    setSortBy(nextSort);
    setCurrentPage(1);
  };

  const returnContext = useMemo(() => ({ categoryId, topicId: selectedId, page: currentPage, difficulty: topicDifficulty, completionFilter }), [categoryId, completionFilter, currentPage, selectedId, topicDifficulty]);

  if (!category) {
    return (
      <main className="page category-page">
        <section className="hero-card glass">
          <p className="eyebrow">Unknown category</p>
          <h1>Category not found</h1>
          <p>This category does not exist in the category manifest.</p>
          <Link className="btn" to="/categories">Go back to categories</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page category-page premium-topic-dashboard-page">
      <div className="premium-category-back-row">
        <Link className="premium-category-back-link" to="/categories">← All categories</Link>
      </div>

      <section className="premium-category-overview-card">
        <div className="premium-category-icon"><CategoryIcon /></div>
        <div className="premium-category-copy">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
        <div className="premium-category-progress-row">
          <span>{categoryStats.totalTopics} Topics</span>
          <span aria-hidden="true">•</span>
          <span>{categoryStats.totalQuestions} Questions</span>
          <strong>{categoryStats.percent}% complete</strong>
        </div>
        <div className="premium-category-progress-track" aria-label={`${categoryStats.percent}% complete`}>
          <span style={{ width: `${categoryStats.percent}%` }} />
        </div>
      </section>

      <section className="premium-category-control-row" aria-label="Topic controls">
        <label><span>Difficulty</span><select value={topicDifficulty} onChange={(event) => handleDifficultyChange(event.target.value)}><option value={ALL_FILTER}>All levels</option>{topicDifficultyOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>Status</span><select value={completionFilter} onChange={(event) => handleCompletionFilterChange(event.target.value)}><option value="all">All</option><option value="completed">Complete</option><option value="incomplete">Todo</option></select></label>
        <label className="premium-sort-control"><span>Sort</span><select value={sortBy} onChange={(event) => handleSortChange(event.target.value)}><option value="recommended">Recommended</option><option value="name">Name</option><option value="progress">Progress</option><option value="questions">Questions</option></select></label>
        <div className="premium-view-toggle" role="group" aria-label="View mode">
          <button type="button" className={viewMode === 'grid' ? 'active' : ''} aria-pressed={viewMode === 'grid'} onClick={() => setViewMode('grid')} title="Grid view"><span className="grid-icon" aria-hidden="true" /></button>
          <button type="button" className={viewMode === 'list' ? 'active' : ''} aria-pressed={viewMode === 'list'} onClick={() => setViewMode('list')} title="List view"><span className="list-icon" aria-hidden="true" /></button>
        </div>
      </section>

      {loadingTopics || loadingBanks ? (
        <LoadingCard label="Loading category topics…" />
      ) : (
        <div className={`premium-topic-dashboard-shell view-${viewMode}`}>
          <TopicLibrary topics={visibleLibraryTopics} allTopicsCount={topics.length} selectedId={selectedId} completed={completed} onSelect={handleTopicSelect} difficulty={topicDifficulty} onDifficultyChange={handleDifficultyChange} difficultyOptions={topicDifficultyOptions} completionFilter={completionFilter} onCompletionFilterChange={handleCompletionFilterChange} sortBy={sortBy} onSortChange={handleSortChange} />
          {selectedTopic ? <TopicSection topic={selectedTopic} questions={selectedTopic.filteredQuestions} completed={completed} activeDifficulty={topicDifficulty} currentPage={currentPage} onPageChange={setCurrentPage} returnContext={returnContext} /> : null}
        </div>
      )}
    </main>
  );
}
