import { useState } from 'react';
import { Link } from 'react-router-dom';

function list(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value];
}

function text(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map(text).filter(Boolean).join(' ');
  if (typeof value === 'object') return Object.values(value).map(text).filter(Boolean).join(' | ');
  return String(value);
}

function ObjectiveCard({ title, objective, objectiveContent = null }) {
  const objectiveText = text(objective);

  if (!objectiveContent && !objectiveText && !title) return null;

  return (
    <section className="workspace-block scenario-box" aria-labelledby="standard-practice-objective-title">
      <span className="mini-label">Objective</span>
      {objectiveContent || (
        <>
          {title ? <h1 id="standard-practice-objective-title">{title}</h1> : null}
          {objectiveText ? <p>{objectiveText}</p> : null}
        </>
      )}
    </section>
  );
}

function PracticeGuidePanel({ practiceGuide }) {
  const guideText = text(practiceGuide);

  if (!guideText) return null;

  return (
    <section className="workspace-block">
      <span className="mini-label">Practice Guide</span>
      <p>{guideText}</p>
    </section>
  );
}

function TagsSidebar({ tags }) {
  const rows = list(tags);

  if (!rows.length) return null;

  return (
    <aside className="practice-support-panel" aria-label="Practice metadata">
      <section>
        <span className="mini-label">Tags</span>
        <div className="compact-chip-row muted">
          {rows.map((tag) => <span key={text(tag)}>#{text(tag)}</span>)}
        </div>
      </section>
    </aside>
  );
}

/**
 * Shared reusable practice shell for current and future practice activities.
 *
 * This component owns only the common page chrome:
 * Back | Overview | Practice Guide | Focus mode | Done,
 * the objective area, replaceable body content, tags/sidebar, and optional
 * Previous / Next / indicator areas.
 *
 * Practice-specific content must be provided through replaceable slots:
 * objectiveContent, children, navigationTop, navigationBottom, focusModeControl, and doneControl.
 */
export default function StandardPracticeWorkspace({
  backPath,
  backLabel = 'Back',
  title,
  objective,
  objectiveContent = null,
  practiceGuide,
  tags,
  children,
  navigationTop = null,
  navigationBottom = null,
  focusModeControl = null,
  doneControl = null
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [focusMode, setFocusMode] = useState(false);
  const guideText = text(practiceGuide);

  return (
    <>
      <article className={`focused-practice-workspace glass-lite standard-practice-workspace ${focusMode ? 'focus-mode' : ''}`}>
        <div className="focused-tabs-wrap learning-node-problem-header" aria-label="Practice navigation">
          <div className="focused-tabs learning-node-problem-tabs" role="tablist" aria-label="Practice sections">
            {backPath ? <Link className="learning-node-back-link" to={backPath}>{backLabel}</Link> : null}
            <button
              type="button"
              className={`focused-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              type="button"
              className={`focused-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'guide'}
              onClick={() => setActiveTab('guide')}
            >
              Practice Guide
            </button>
          </div>
          <div className="focused-tabs-actions">
            {focusModeControl || (
              <button
                type="button"
                className={`focus-mode-toggle ${focusMode ? 'active' : ''}`}
                aria-pressed={focusMode}
                onClick={() => setFocusMode((current) => !current)}
              >
                {focusMode ? 'Exit focus' : 'Focus mode'}
              </button>
            )}
            {doneControl}
          </div>
        </div>

        <div className="focused-workspace-layout">
          <div className="focused-tab-content">
            {activeTab === 'overview' ? (
              <div className="focused-panel-stack">
                <ObjectiveCard title={title} objective={objective} objectiveContent={objectiveContent} />
                <section className="workspace-block standard-practice-body-card">
                  {children}
                </section>
                {navigationBottom}
              </div>
            ) : null}
            {activeTab === 'guide' ? (
              <div className="focused-panel-stack">
                <PracticeGuidePanel practiceGuide={guideText || 'No practice guide is configured yet.'} />
              </div>
            ) : null}
          </div>
          {!focusMode ? <TagsSidebar tags={tags} /> : null}
        </div>
      </article>
    </>
  );
}