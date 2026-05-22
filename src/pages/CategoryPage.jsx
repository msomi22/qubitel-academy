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
  const [currentPage, setCurrentPage] = useState(searchState.page || 1);

  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingBanks, setLoadingBanks] = useState(true);

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
        );

        return {
          ...topic,
          filteredQuestions,
          filteredCount: filteredQuestions.length
        };
      })
      .filter((topic) => topic.filteredCount > 0);
  }, [topicsWithBanks, topicDifficulty, completionFilter, completed]);

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
    <main className="page category-page">
      <section className="page-title">
        <p className="eyebrow">{category.shortName || category.name}</p>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </section>

      {loadingTopics || loadingBanks ? (
        <LoadingCard label="Loading category topics…" />
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
          />

          {selectedTopic ? (
            <TopicSection
              topic={selectedTopic}
              questions={selectedTopic.filteredQuestions}
              completed={completed}
              onToggle={handleCompletionClick}
              activeDifficulty={topicDifficulty}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              returnContext={returnContext}
            />
          ) : null}

        </>
      )}
    </main>
  );
}
