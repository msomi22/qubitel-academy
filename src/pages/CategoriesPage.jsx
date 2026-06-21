import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveAcademy } from '../config/detectAcademy.ts';
import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import { getChildren } from '../learning/registry/index.ts';
import { createLearningNodeRegistry } from '../learning/registry/index.ts';
import { createCbcGradesRegistrySource } from '../learning/academies/cbc/cbcGrades.registry.ts';

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
      <main className="page category-page premium-categories-page">
        <section className="categories-page-intro" aria-labelledby="categories-page-title">
          <h1 id="categories-page-title">Topics</h1>
          <p>Choose a topic to start learning.</p>
        </section>
        <p>Categories are being updated. Please use the sidebar to navigate.</p>
      </main>
    );
  }

  return (
    <main className="page category-page premium-categories-page">
      <section className="categories-page-intro" aria-labelledby="categories-page-title">
        <h1 id="categories-page-title">{activeAcademy.displayName}</h1>
        <p>Choose a grade to start learning.</p>
      </section>

      <div className="category-grid">
        {grades.map((grade) => (
          <button
            key={grade.id}
            onClick={() => grade.id === 'grade-1' ? handleGradeClick(grade.id) : null}
            className={`grade-card ${grade.id !== 'grade-1' ? 'disabled' : ''}`}
            disabled={grade.id !== 'grade-1'}
          >
            <div className="grade-card-icon">🎒</div>
            <div className="grade-card-content">
              <h3>{grade.label}</h3>
              <p>{grade.summary}</p>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
