import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { createNodeRoutePath } from '../learning/routing';
import { getChildren } from '../learning/registry/index.ts';

const ICON_BY_KIND = {
  learningArea: '📖',
  theme: '📚',
  strand: '📝',
  subStrand: '📄',
  notes: '📒',
  practice: '✏️',
  revision: '🔄',
  assessment: '✅',
  exam: '📝',
  lesson: '🎓',
  question: '❓',
  activity: '🎯',
  content: '📄'
};

const LABEL_BY_KIND = {
  learningArea: 'Learning Area',
  theme: 'Theme',
  strand: 'Strand',
  subStrand: 'Sub-strand',
  notes: 'Notes',
  practice: 'Practice',
  revision: 'Revision',
  assessment: 'Assessment',
  exam: 'Exam',
  lesson: 'Lesson',
  question: 'Question',
  activity: 'Activity',
  content: 'Content'
};

const KIND_GROUPS = {
  learningAreas: { kinds: ['learningArea'], label: 'Learning Areas' },
  themes: { kinds: ['theme'], label: 'Themes' },
  strands: { kinds: ['strand'], label: 'Strands' },
  subStrands: { kinds: ['subStrand'], label: 'Sub-strands' },
  content: {
    kinds: ['notes', 'practice', 'revision', 'assessment', 'exam', 'activity', 'content'],
    label: 'Content'
  },
  lessons: { kinds: ['lesson'], label: 'Lessons' },
  questions: { kinds: ['question'], label: 'Questions' }
};

function LearningAreaCard({ child, path, kindLabel, isDisabled }) {
  const icon = ICON_BY_KIND.learningArea;
  const cardContent = (
    <>
      <span className="learning-area-node-card__icon-tile" aria-hidden="true">
        <span className="learning-area-node-card__icon">{icon}</span>
      </span>

      <span className="learning-area-node-card__content">
        <strong className="learning-area-node-card__title">{child.label}</strong>
        <span className="learning-area-node-card__meta">{kindLabel}</span>
      </span>

      {child.summary && (
        <span className="learning-area-node-card__summary">{child.summary}</span>
      )}

      <span className="learning-area-node-card__badge">
        {isDisabled ? 'Soon' : kindLabel}
      </span>

      {!isDisabled && (
        <span className="learning-area-node-card__arrow" aria-hidden="true">→</span>
      )}
    </>
  );

  if (isDisabled) {
    return (
      <div
        className="premium-category-card learning-area-node-card is-disabled"
        aria-label={`${child.label} - ${kindLabel} (disabled)`}
        aria-disabled="true"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <NavLink
      to={path || '#'}
      className="premium-category-card learning-area-node-card is-available"
      aria-label={`${child.label} - ${kindLabel}`}
    >
      {cardContent}
    </NavLink>
  );
}

export default function LearningNodeChildGrid({ registry, nodeId, nodes, hideSectionHeadings = false }) {
  const groupedChildren = useMemo(() => {
    const children = nodes || getChildren(registry, nodeId);
    const groups = [];

    for (const [groupKey, groupConfig] of Object.entries(KIND_GROUPS)) {
      const matchingChildren = children.filter((child) => groupConfig.kinds.includes(child.kind));
      if (matchingChildren.length > 0) {
        groups.push({
          key: groupKey,
          label: groupConfig.label,
          children: matchingChildren
        });
      }
    }

    const groupedIds = new Set(groups.flatMap((g) => g.children.map((c) => c.id)));
    const ungrouped = children.filter((child) => !groupedIds.has(child.id));
    if (ungrouped.length > 0) {
      groups.push({
        key: 'other',
        label: 'More',
        children: ungrouped
      });
    }

    return groups;
  }, [registry, nodeId, nodes]);

  if (groupedChildren.length === 0) {
    return null;
  }

  return (
    <div className="learning-node-children" aria-label="Child nodes">
      {groupedChildren.map((group) => (
        <div
          key={group.key}
          className={`child-group ${group.key === 'learningAreas' ? 'child-group--learning-areas' : ''}`.trim()}
        >
          {!hideSectionHeadings && <h2 className="child-group-title">{group.label}</h2>}
          <div
            className={`premium-category-grid child-grid-inner ${
              group.key === 'learningAreas' ? 'learning-area-node-grid' : ''
            }`.trim()}
          >
            {group.children.map((child) => {
              const path = createNodeRoutePath(registry, child, {
                includeRoot: false,
                includeAcademyRoot: false
              });
              const icon = ICON_BY_KIND[child.kind] || '📄';
              const kindLabel = LABEL_BY_KIND[child.kind] || child.kind;
              const isActiveLearningArea =
                child.kind === 'learningArea' &&
                ['grade-1-english-activities', 'grade-1-mathematical-activities'].includes(child.id);
              const hasActions = child.actions && child.actions.length > 0;
              const isDisabled = !hasActions || (child.kind === 'learningArea' && !isActiveLearningArea);

              if (child.kind === 'learningArea') {
                return (
                  <LearningAreaCard
                    key={child.id}
                    child={child}
                    path={path}
                    kindLabel={kindLabel}
                    isDisabled={isDisabled}
                  />
                );
              }

              if (isDisabled) {
                return (
                  <div
                    key={child.id}
                    className="premium-category-card is-disabled"
                    aria-label={`${child.label} - ${kindLabel} (disabled)`}
                    aria-disabled="true"
                  >
                    <div className="premium-category-card__head">
                      <span className="premium-category-card__icon" aria-hidden="true">
                        {icon}
                      </span>
                      <div className="premium-category-card__copy">
                        <div className="premium-category-card__title-line">
                          <strong>{child.label}</strong>
                          <span className="premium-category-card__badge">Soon</span>
                        </div>
                        <span className="premium-category-card__domain">{kindLabel}</span>
                      </div>
                    </div>
                    {child.summary && <p>{child.summary}</p>}
                  </div>
                );
              }

              return (
                <NavLink
                  key={child.id}
                  to={path || '#'}
                  className="premium-category-card"
                  aria-label={`${child.label} - ${kindLabel}`}
                >
                  <div className="premium-category-card__head">
                    <span className="premium-category-card__icon" aria-hidden="true">
                      {icon}
                    </span>
                    <div className="premium-category-card__copy">
                      <div className="premium-category-card__title-line">
                        <strong>{child.label}</strong>
                        <span className="premium-category-card__badge">{kindLabel}</span>
                      </div>
                      <span className="premium-category-card__domain">{kindLabel}</span>
                    </div>
                  </div>
                  {child.summary && <p>{child.summary}</p>}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}