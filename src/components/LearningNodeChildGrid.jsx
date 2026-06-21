import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { getChildren } from '../learning/registry/index.ts';

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

export default function LearningNodeChildGrid({ registry, nodeId }) {
  const groupedChildren = useMemo(() => {
    const children = getChildren(registry, nodeId);
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
  }, [registry, nodeId]);

  if (groupedChildren.length === 0) {
    return null;
  }

  return (
    <section className="learning-node-children" aria-label="Child nodes">
      {groupedChildren.map((group) => (
        <div key={group.key} className="child-group">
          <h2 className="child-group-title">{group.label}</h2>
          <div className="child-grid">
            {group.children.map((child) => {
              const path = `/learn/${child.id}`;
              const icon = getChildIcon(child.kind);
              const kindLabel = getKindLabel(child.kind);
              // Only enable Grade 1 English Activities; all other learning areas across all grades are disabled
              const isActiveLearningArea =
                child.kind === 'learningArea' &&
                child.id === 'grade-1-english-activities';
              const hasActions = child.actions && child.actions.length > 0;
              const isDisabled = !hasActions || (child.kind === 'learningArea' && !isActiveLearningArea);

              if (isDisabled) {
                return (
                  <div
                    key={child.id}
                    className="child-card child-card-disabled"
                    aria-label={`${child.label} - ${kindLabel} (disabled)`}
                    aria-disabled="true"
                  >
                    <span className="child-card-icon" aria-hidden="true">
                      {icon}
                    </span>
                    <span className="child-card-label">{child.label}</span>
                    <span className="child-card-kind">{kindLabel}</span>
                  </div>
                );
              }

              return (
                <NavLink
                  key={child.id}
                  to={path || '#'}
                  className="child-card"
                  aria-label={`${child.label} - ${kindLabel}`}
                >
                  <span className="child-card-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="child-card-label">{child.label}</span>
                  <span className="child-card-kind">{kindLabel}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function getChildIcon(kind) {
  const icons = {
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

  return icons[kind] || '📄';
}

function getKindLabel(kind) {
  const labels = {
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

  return labels[kind] || kind;
}
