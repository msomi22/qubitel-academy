import { useEffect, useState } from 'react';
import CategoryLibrary from '../components/CategoryLibrary.jsx';
import { getCategorySummaries } from '../services/questionBankService.js';
import { usePreferences } from '../hooks/usePreferences.js';

export default function CategoriesPage() {
  const { completed } = usePreferences();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let alive = true;

    getCategorySummaries().then((nextCategories) => {
      if (alive) setCategories(nextCategories);
    });

    return () => { alive = false; };
  }, []);

  return (
    <main className="page category-page premium-categories-page">
      <section className="categories-page-intro" aria-labelledby="categories-page-title">
        <h1 id="categories-page-title">Topics</h1>
        <p>Choose a topic to start learning.</p>
      </section>

      <CategoryLibrary
        categories={categories}
        completed={completed}
      />
    </main>
  );
}
