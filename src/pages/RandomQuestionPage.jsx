import { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../components/Button.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import LoadingCard from '../components/LoadingCard.jsx';
import { allTopics, categories, getRandomQuestion } from '../services/questionBankService.js';
import { storageService } from '../services/storageService.js';
import { usePreferences } from '../hooks/usePreferences.js';
import { confettiBurst } from '../utils/confetti.js';

const EMPTY_RANDOM_MESSAGE = 'No questions are available for the selected filters. Try All categories or choose another topic.';

function topicFilterValue(topic) {
  return `${topic.category}/${topic.id}`;
}

export default function RandomQuestionPage() {
  const pref = usePreferences();
  const [filters, setFilters] = useState({ category: 'all', topicId: '' });
  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(pref.completed);
  const requestIdRef = useRef(0);

  const topics = useMemo(
    () => allTopics.filter((topic) => filters.category === 'all' || topic.category === filters.category),
    [filters.category]
  );
  const categoryNameById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.name])),
    []
  );

  async function pickQuestion(nextFilters = filters, increment = false) {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setLoading(true);
    setError('');

    try {
      const question = await getRandomQuestion(nextFilters);
      if (requestId !== requestIdRef.current) return;

      setQ(question);

      if (increment) {
        const nextCount = storageService.incrementRandom();
        if (nextCount % 10 === 0) confettiBurst();
      }
    } catch {
      if (requestId !== requestIdRef.current) return;

      setQ(null);
      setError(EMPTY_RANDOM_MESSAGE);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }

  useEffect(() => { pickQuestion(filters, false); }, []);

  function updateCategory(category) {
    const next = { category, topicId: '' };
    setFilters(next);
    pickQuestion(next, false);
  }

  function updateTopic(topicId) {
    const next = { ...filters, topicId };
    setFilters(next);
    pickQuestion(next, false);
  }

  function handleCompletionClick(id) {
    if (completed[id]) {
      const updated = storageService.resetQuestionProgress(id);
      setCompleted(updated.completed);
      return;
    }

    setCompleted(storageService.markComplete(id));
  }

  return (
    <main className="page random-page">
      <section className="page-title">
        <p className="eyebrow">Random engine</p>
  
        <h1>Train under uncertainty</h1>
  
        <p>
          The random engine works with any number of categories.
          Choose all categories, one category, or one exact topic.
        </p>
      </section>
  
      <div className="filters glass random-controls">
        <select
          value={filters.category}
          onChange={(event) => updateCategory(event.target.value)}
        >
          <option value="all">All categories</option>
  
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
  
        <select
          value={filters.topicId}
          onChange={(event) => updateTopic(event.target.value)}
        >
          <option value="">Any subtopic</option>
  
          {topics.map((topic) => (
            <option key={topicFilterValue(topic)} value={topicFilterValue(topic)}>
              {filters.category === 'all'
                ? `${topic.name} (${categoryNameById.get(topic.category) || topic.category})`
                : topic.name}
            </option>
          ))}
        </select>
  
        <Button onClick={() => pickQuestion(filters, true)}>
          Give me a question
        </Button>
      </div>
  
      {loading ? (
        <LoadingCard label="Choosing a question…" />
      ) : error ? (
        <div className="glass empty-state" role="status">
          <p>{error}</p>
        </div>
      ) : q ? (
        <QuestionCard
          question={q}
          completed={!!completed[q.id]}
          onToggle={handleCompletionClick}
        />
      ) : null}
    </main>
  );
}
