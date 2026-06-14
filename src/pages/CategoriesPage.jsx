import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryLibrary from '../components/CategoryLibrary.jsx';
import { getActiveAcademy } from '../config/detectAcademy.ts';
import { getCategorySummaries } from '../services/questionBankService.js';
import { storageService } from '../services/storageService.js';
import { usePreferences } from '../hooks/usePreferences.js';
import {
  buildCbcGradeDestinationPath,
  readCbcGradeSelectionIntent
} from '../utils/cbcGradeSelectionRouting.js';

const defaultCategoryCopy = {
  title: 'Topics',
  description: 'Choose a topic to start learning.'
};

const gradeSelectionCopy = {
  title: 'Grades',
  description: 'Choose a grade to continue.',
  searchLabel: 'Search grades',
  searchPlaceholder: 'Search grades...',
  controlsLabel: 'Grade filters',
  libraryLabel: 'Grade categories',
  emptyTitle: 'No grades found',
  emptyDescription: 'Try a broader search or clear the domain filter.'
};

export default function CategoriesPage() {
  const { completed } = usePreferences();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const isCbcAcademy = getActiveAcademy().id === 'cbc';
  const gradeSelectionIntent = isCbcAcademy
    ? readCbcGradeSelectionIntent(searchParams)
    : null;
  const copy = gradeSelectionIntent ? gradeSelectionCopy : defaultCategoryCopy;
  const getCategoryRoute = gradeSelectionIntent
    ? (category) => buildCbcGradeDestinationPath(category, gradeSelectionIntent, {
      continueTopicId: storageService.getSelectedTopic(category.id)
    })
    : null;

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
        <h1 id="categories-page-title">{copy.title}</h1>
        <p>{copy.description}</p>
      </section>

      <CategoryLibrary
        categories={categories}
        completed={completed}
        copy={copy}
        getCategoryRoute={getCategoryRoute}
      />
    </main>
  );
}
