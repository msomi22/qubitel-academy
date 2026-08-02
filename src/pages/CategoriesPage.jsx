import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveAcademy } from '../config/detectAcademy.ts';
import CategoryLibrary from '../components/CategoryLibrary.jsx';
import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import { getAcademyCatalog } from '../academies/catalog.js';
import {
  createLearningNodeRegistry,
  getChildren,
  isLearningNodeReady
} from '../learning/registry/index.ts';
import { createCbcGradesRegistrySource } from '../learning/academies/cbc/cbcGrades.registry.ts';
import { getAppearance } from '../learning/core/index.ts';
import { createNodeRoutePath } from '../learning/routing';
import { usePreferences } from '../hooks/usePreferences.js';

import '../styles/progress-table.css';
import '../styles/categories-premium-grid.css';

function GradePickerCard({ grade, isAvailable, onSelect }) {
  const icon = getAppearance(grade, 'icon') || '🎒';
  const status = isAvailable ? 'Ready' : 'Soon';
  const cardClassName = [
    'premium-category-card',
    'grade-picker-card',
    'accent-emerald',
    isAvailable ? 'is-available' : 'is-disabled'
  ].join(' ');

  return (
    <button
      type="button"
      onClick={() => isAvailable && onSelect(grade)}
      className={cardClassName}
      disabled={!isAvailable}
    >
      <span className="grade-picker-card__icon-tile" aria-hidden="true">
        <span className="grade-picker-card__icon">{icon}</span>
      </span>

      <span className="grade-picker-card__content">
        <strong className="grade-picker-card__title">{grade.label}</strong>
        <span className="grade-picker-card__domain">CBC Grade</span>
        <span className="grade-picker-card__summary">{grade.summary}</span>
      </span>

      <span className="grade-picker-card__badge">{status}</span>

      {isAvailable ? (
        <span className="grade-picker-card__arrow" aria-hidden="true">→</span>
      ) : null}
    </button>
  );
}

export default function CategoriesPage() {
  const navigate = useNavigate();
  const activeAcademy = getActiveAcademy();
  const { completed } = usePreferences();

  const activeCatalog = useMemo(
    () => getAcademyCatalog(activeAcademy.id),
    [activeAcademy.id]
  );

  const cbcGradeModel = useMemo(() => {
    if (activeAcademy.id !== 'cbc') return null;
    
    const academyNode = getAcademyRootNodeById('cbc-academy');
    if (!academyNode) return null;
    
    const cbcGradesSource = createCbcGradesRegistrySource();
    const registry = createLearningNodeRegistry({
      nodes: [academyNode, ...cbcGradesSource.nodes]
    });
    
    const children = getChildren(registry, academyNode.id);
    return {
      registry,
      grades: children.filter(child => child.kind === 'grade')
    };
  }, [activeAcademy.id]);

  const handleGradeClick = (grade) => {
    if (!cbcGradeModel) return;

    navigate(createNodeRoutePath(cbcGradeModel.registry, grade, {
      includeRoot: false,
      includeAcademyRoot: false
    }));
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
          {(cbcGradeModel?.grades || []).map((grade) => {
            const hasActions = Boolean(grade.actions?.length);
            const isAvailable = hasActions && isLearningNodeReady(
              cbcGradeModel.registry,
              grade
            );
            return (
              <GradePickerCard
                key={grade.id}
                grade={grade}
                isAvailable={isAvailable}
                onSelect={handleGradeClick}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}