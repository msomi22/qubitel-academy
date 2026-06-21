import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveAcademy } from '../config/detectAcademy.ts';
import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import { getChildren } from '../learning/registry/index.ts';
import { createLearningNodeRegistry } from '../learning/registry/index.ts';
import { createCbcGradesRegistrySource } from '../learning/academies/cbc/cbcGrades.registry.ts';

import '../styles/progress-table.css';
import '../styles/categories-premium-grid.css';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const activeAcademy = getActiveAcademy();
  const [grades, setGrades] = useState([]);

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
    navigate(`/learn/${gradeId}`);
  };

  if (activeAcademy.id !== 'cbc') {
    return (
      <main className="page progress-page-focused grades-page">
        <section className="glass progress-table-card grades-card" aria-labelledby="grades-heading">
          <div className="progress-card-head">
            <div>
              <p className="eyebrow">Topics</p>
              <h1 id="grades-heading">Topics</h1>
              <p>Choose a topic to start learning.</p>
            </div>
          </div>
          <p>Categories are being updated. Please use the sidebar to navigate.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page progress-page-focused grades-page">
      <section className="glass progress-table-card grades-card" aria-labelledby="grades-heading">
        <div className="progress-card-head">
          <div>
            <p className="eyebrow">Grades</p>
            <h1 id="grades-heading">{activeAcademy.displayName}</h1>
            <p>Choose a grade to start learning.</p>
          </div>
        </div>

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