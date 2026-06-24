import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveAcademy } from '../config/detectAcademy.ts';
import CategoryLibrary from '../components/CategoryLibrary.jsx';
import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import { getAcademyCatalog } from '../academies/catalog.js';
import { getChildren } from '../learning/registry/index.ts';
import { createLearningNodeRegistry } from '../learning/registry/index.ts';
import { createCbcGradesRegistrySource } from '../learning/academies/cbc/cbcGrades.registry.ts';
import { usePreferences } from '../hooks/usePreferences.js';

import '../styles/progress-table.css';
import '../styles/categories-premium-grid.css';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const activeAcademy = getActiveAcademy();
  const { completed } = usePreferences();
  const [grades, setGrades] = useState([]);

  const activeCatalog = useMemo(
    () => getAcademyCatalog(activeAcademy.id),
    [activeAcademy.id]
  );

  const gradeNodes = useMemo(() => {
    if (activeAcademy.id !== 'cbc') return [];
    
    const academyNode = getAcademyRootNodeById('cbc-academy');
    if (!academyNode) return [];
    
    const cbcGradesSource = createCbcGradesRegistrySource();
    const registry = createLearningNodeRegistry({
      nodes: [academyNode, ...cbcGradesSource.nodes]
    });
    
    const children = getChildren(registry, academyNode.id);
    return children.filter(child => child.kind === 'grade');
  }, [activeAcademy.id]);

  useEffect(() => {
    if (gradeNodes.length > 0) {
      setGrades(gradeNodes);
    }
  }, [gradeNodes]);

  const handleGradeClick = (gradeId) => {
    if (activeAcademy.id === 'cbc' && gradeId === 'grade-1') {
      navigate('/gd1');
      return;
    }

    navigate(`/learn/${gradeId}`);
  };

  if (activeAcademy.id !== 'cbc') {
    return (
      <main className="page progress-page-focused premium-categories-page">
        <section className="categories-page-intro" aria-labelledby="categories-heading">
          <h1 id="categories-heading">Categories</h1>
          <p>Choose a learning category to start practicing.</p>
        </section>

        <CategoryLibrary
          categories={activeCatalog.categories}
          completed={completed}
          copy={{
            searchLabel: 'Search categories',
            searchPlaceholder: 'Search categories...',
            controlsLabel: 'Category filters',
            libraryLabel: 'Learning categories',
            emptyTitle: 'No categories found',
            emptyDescription: 'Try a broader search or clear the domain filter.'
          }}
        />
      </main>
    );
  }

  return (
    <main className="page progress-page-focused grades-page">
      <section className="glass progress-table-card grades-card" aria-labelledby="grades-heading">
        <header className="grades-overview-header">
          <h1>{activeAcademy.displayName}</h1>
        </header>

        <section className="grades-overview-content" aria-labelledby="grades-heading">
          <p className="sr-only">Grades</p>
          <h2 id="grades-heading">Grades</h2>
          <p>Choose a grade to start learning.</p>
        </section>

        <div className="premium-category-grid">
          {grades.map((grade) => {
            const isDisabled = grade.id !== 'grade-1';
            return (
              <button
                type="button"
                key={grade.id}
                onClick={() => !isDisabled && handleGradeClick(grade.id)}
                className={`premium-category-card grade-picker-card accent-emerald ${isDisabled ? 'is-disabled' : ''}`}
                disabled={isDisabled}
              >
                <div className="premium-category-card__head">
                  <span className="premium-category-card__icon" aria-hidden="true">🎒</span>
                  <div className="premium-category-card__copy">
                    <div className="premium-category-card__title-line">
                      <strong>{grade.label}</strong>
                      <span className="premium-category-card__badge">
                        {isDisabled ? 'Soon' : 'Ready'}
                      </span>
                    </div>
                    <span className="premium-category-card__domain">CBC Grade</span>
                  </div>
                </div>
                <p>{grade.summary}</p>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}