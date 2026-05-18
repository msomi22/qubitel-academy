import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import LoadingCard from '../components/LoadingCard.jsx';
import { allTopics, categories, getRandomQuestion } from '../services/questionBankService.js';
import { storageService } from '../services/storageService.js';
import { usePreferences } from '../hooks/usePreferences.js';
import { confettiBurst } from '../utils/confetti.js';

export default function RandomQuestionPage() {
  const pref = usePreferences();
  const [filters, setFilters] = useState({ category: 'all', topicId: '' });
  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(pref.completed);

  const topics = useMemo(
    () => allTopics.filter((topic) => filters.category === 'all' || topic.category === filters.category),
    [filters.category]
  );

  async function pickQuestion(nextFilters = filters, increment = false) {
    setLoading(true);
    if (increment) {
      const nextCount = storageService.incrementRandom();
      if (nextCount % 10 === 0) confettiBurst();
    }
    const question = await getRandomQuestion(nextFilters);
    setQ(question);
    setLoading(false);
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
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
  
        <Button onClick={() => pickQuestion(filters, true)}>
          Give me a question
        </Button>
      </div>
  
      {loading || !q ? (
        <LoadingCard label="Choosing a question…" />
      ) : (
        <QuestionCard
          question={q}
          completed={!!completed[q.id]}
          onToggle={handleCompletionClick}
        />
      )}
    </main>
  );
}
