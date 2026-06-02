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
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';
import { usePreferences } from '../hooks/usePreferences.js';

import {
  getCategory,
  getVisibleTopicsForCategory,
  loadTopicBank
} from '../services/questionBankService.js';

function normalizeSearchText(value) {
  return String(value || '').trim().toLowerCase();
}

function questionMatchesSearch(question, query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const haystack = [
    question.title,
    question.summary,
    question.shortSummary,
    question.scenario,
    question.question,
    question.prompt,
    question.starterThought,
    question.primaryPattern,
    question.finalPattern,
    question.pattern,
    question.category,
    question.type,
    question.difficulty,
    ...(question.tags || [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

export default function CategoryPage({ fixedCategoryId }) {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchState = useMemo(
    () => readCategorySearchState(searchParams),
    [searchParams]
  );

  const categoryId = fixedCategoryId || params.categoryId;
  const category = getCategory(categoryId);

  const pref = usePreferences();

  const [topics, setTopics] = useState([]);
  const [topicBanks, setTopicBanks] = useState({});
  const [completed, setCompleted] = useState(pref.completed);

  const [selectedId, setSelectedId] = useState(
    searchState.topicId || pref.selectedTopics?.[categoryId] || ''
  );

  const [topicDifficulty, setTopicDifficulty] = useState(searchState.difficulty || ALL_FILTER);
  const [completionFilter, setCompletionFilter] = useState(searchState.completionFilter || 'all');
  const [questionSearch, setQuestionSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(searchState.page || 1);

  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingBanks, setLoadingBanks] = useState(true);

  const debouncedQuestionSearch = useDebouncedValue(questionSearch, 160);

  useEffect(() => {
    setTopicDifficulty(searchState.difficulty || ALL_FILTER);
    setCompletionFilter(searchState.completionFilter || 'all');
    setCurrentPage(searchState.page || 1);

    if (searchState.topicId) {
      setSelectedId(searchState.topicId);
    }
  }, [searchState.topicId, searchState.page, searchState.difficulty, searchState.completionFilter]);

  useEffect(() => {
    let alive = true;

    setLoadingTopics(true);
    setLoadingBanks(true);
    setQuestionSearch('');

    getVisibleTopicsForCategory(categoryId)
      .then(async (nextTopics) => {
        if (!alive) return;

        setTopics(nextTopics);

        const storedSelectedId =
          searchState.topicId ||
          storageService.getSelectedTopic?.(categoryId) ||
          selectedId;

        const validSelectedId = nextTopics.some(
          (topic) => topic.id === storedSelectedId
        )
          ? storedSelectedId
          : nextTopics[0]?.id || '';

        setSelectedId(validSelectedId);

        const loadedBanks = await Promise.all(
          nextTopics.map(async (topic) => {
            const bank = await loadTopicBank(topic.id);
            return [topic.id, bank];
          })
        );

        if (!alive) return;

        setTopicBanks(Object.fromEntries(loadedBanks));
      })
      .finally(() => {
        if (!alive) return;

        setLoadingTopics(false);
        setLoadingBanks(false);
      });

    return () => {
      alive = false;
    };
  }, [categoryId]);

  useEffect(() => {
    if (selectedId) {
      storageService.setSelectedTopic(categoryId, selectedId);
    }
  }, [categoryId, selectedId]);

  useEffect(() => {
    if (loadingTopics || loadingBanks || !selectedId) return;

    const nextParams = buildCategorySearchParams({
      topicId: selectedId,
      page: currentPage,
      difficulty: topicDifficulty,
      completionFilter
    });

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [
    completionFilter,
    currentPage,
    loadingBanks,
    loadingTopics,
    searchParams,
    selectedId,
    setSearchParams,
    topicDifficulty
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuestionSearch]);

  const topicsWithBanks = useMemo(() => {
    return topics.map((topic) => {
      const bank = topicBanks[topic.id];

      return {
        ...topic,
        questions: bank?.questions || [],
        count: bank?.questions?.length || 0
      };
    });
  }, [topics, topicBanks]);

  const topicDifficultyOptions = useMemo(() => {
    const order = {
      Easy: 1,
      Medium: 2,
      Hard: 3
    };

    const set = new Set();

    topicsWithBanks.forEach((topic) => {
      topic.questions.forEach((question) => {
        if (question.difficulty) {
          set.add(question.difficulty);
        }
      });
    });

    return Array.from(set).sort(
      (a, b) => (order[a] || 99) - (order[b] || 99)
    );
  }, [topicsWithBanks]);

  const filteredTopics = useMemo(() => {
    return topicsWithBanks
      .map((topic) => {
        const filteredQuestions = getFilteredTopicQuestions(
          topic,
          completed,
          topicDifficulty,
          completionFilter
        ).filter((question) =>
          questionMatchesSearch(question, debouncedQuestionSearch)
        );

        return {
          ...topic,
          filteredQuestions,
          filteredCount: filteredQuestions.length
        };
      })
      .filter((topic) => topic.filteredCount > 0);
  }, [topicsWithBanks, topicDifficulty, completionFilter, completed, debouncedQuestionSearch]);

  const selectedTopic = useMemo(() => {
    return filteredTopics.find((topic) => topic.id === selectedId);
  }, [filteredTopics, selectedId]);

  const visibleLibraryTopics = useMemo(() => {
    if (completionFilter === 'all') {
      return filteredTopics;
    }

    return selectedTopic ? [selectedTopic] : filteredTopics.slice(0, 1);
  }, [completionFilter, filteredTopics, selectedTopic]);

  useEffect(() => {
    if (!filteredTopics.length) return;

    const selectedStillVisible = filteredTopics.some(
      (topic) => topic.id === selectedId
    );

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

  const handleCompletionClick = (id) => {
    if (completed[id]) {
      const updated = storageService.resetQuestionProgress(id);
      setCompleted(updated.completed);
      return;
    }

    setCompleted(storageService.markComplete(id));
  };

  const categoryProgress = useMemo(() => {
    const allQuestions = topicsWithBanks.flatMap((topic) => topic.questions || []);
    const total = allQuestions.length;
    const done = allQuestions.filter((question) => completed[question.id]).length;

    return {
      done,
      total,
      percent: total ? Math.round((done / total) * 100) : 0
    };
  }, [topicsWithBanks, completed]);

  const returnContext = useMemo(() => ({
    categoryId,
    topicId: selectedId,
    page: currentPage,
    difficulty: topicDifficulty,
    completionFilter
  }), [categoryId, completionFilter, currentPage, selectedId, topicDifficulty]);

  if (!category) {
    return (
      <main className="page category-page">
        <section className="hero-card glass">
          <p className="eyebrow">Unknown category</p>
          <h1>Category not found</h1>
          <p>This category does not exist in the category manifest.</p>
          <Link className="btn" to="/">
            Go back home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page category-page premium-topic-page">
      <Link className="premium-topic-back" to="/categories">
        <span aria-hidden="true">←</span> Back to Categories
      </Link>

      <section className="page-title premium-topic-header">
        <div className="premium-topic-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M9.5 4.5a3 3 0 0 0-3 3v.25A3.25 3.25 0 0 0 5 13.95 3.5 3.5 0 0 0 9.5 19.5V4.5Z" />
            <path d="M14.5 4.5a3 3 0 0 1 3 3v.25A3.25 3.25 0 0 1 19 13.95a3.5 3.5 0 0 1-4.5 5.55V4.5Z" />
            <path d="M9.5 8.5H7.75M9.5 12H7m2.5 3.5H7.75M14.5 8.5h1.75M14.5 12H17m-2.5 3.5h1.75" />
          </svg>
        </div>

        <div className="premium-topic-copy">
          <p className="eyebrow">{category.shortName || category.name}</p>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>

        <div className="premium-topic-meta" aria-label={`${category.name} summary`}>
          <span>
            <strong>{topicsWithBanks.length}</strong>
            <small>{topicsWithBanks.length === 1 ? 'Topic' : 'Topics'}</small>
          </span>
          <span>
            <strong>{categoryProgress.total}</strong>
            <small>{categoryProgress.total === 1 ? 'Question' : 'Questions'}</small>
          </span>
          <span>
            <strong>{categoryProgress.percent}%</strong>
            <small>Progress</small>
          </span>
        </div>
      </section>

      {loadingTopics || loadingBanks ? (
        <LoadingCard label="Loading category topics..." />
      ) : (
        <>
          <TopicLibrary
            topics={visibleLibraryTopics}
            allTopicsCount={topics.length}
            selectedId={selectedId}
            completed={completed}
            onSelect={handleTopicSelect}
            difficulty={topicDifficulty}
            onDifficultyChange={handleDifficultyChange}
            difficultyOptions={topicDifficultyOptions}
            completionFilter={completionFilter}
            onCompletionFilterChange={handleCompletionFilterChange}
            questionSearch={questionSearch}
            onQuestionSearchChange={setQuestionSearch}
          />

          {selectedTopic ? (
            <TopicSection
              topic={selectedTopic}
              questions={selectedTopic.filteredQuestions}
              completed={completed}
              onToggle={handleCompletionClick}
              activeDifficulty={topicDifficulty}
              searchQuery={debouncedQuestionSearch}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              returnContext={returnContext}
            />
          ) : (
            <div className="empty-state glass-lite premium-question-empty">
              <h3>No questions found</h3>
              <p>Try a broader search or clear the difficulty and status filters.</p>
            </div>
          )}

        </>
      )}
    </main>
  );
}
