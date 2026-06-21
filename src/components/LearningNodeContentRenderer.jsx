import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

function createNodeRoutePath(registry, nodeId) {
  return `/learn/${nodeId}`;
}

export default function LearningNodeContentRenderer({ registry, node, contentRendererProps = {} }) {
  const contentType = useMemo(() => {
    return (
      node.attributes?.find((attr) => attr.key === 'contentType')?.value ||
      node.kind ||
      'content'
    );
  }, [node]);

  const legacyPath = node.attributes?.find((attr) => attr.key === 'legacyPath')?.value;
  const legacyManifestId = node.attributes?.find((attr) => attr.key === 'legacyManifestId')?.value;

  if (legacyPath && legacyManifestId) {
    return <LegacyContentRenderer legacyPath={legacyPath} legacyManifestId={legacyManifestId} node={node} />;
  }

  switch (contentType) {
    case 'notes':
      return <NotesRenderer node={node} {...contentRendererProps} />;
    case 'practice':
      return <PracticeRenderer node={node} {...contentRendererProps} />;
    case 'revision':
      return <RevisionRenderer node={node} {...contentRendererProps} />;
    case 'assessment':
      return <AssessmentRenderer node={node} registry={registry} {...contentRendererProps} />;
    case 'exam':
      return <ExamRenderer node={node} registry={registry} {...contentRendererProps} />;
    default:
      return <GenericRenderer node={node} {...contentRendererProps} />;
  }
}

function NotesRenderer({ node }) {
  return (
    <div className="content-renderer-notes">
      <h3>Notes</h3>
      {node.summary && <p className="notes-summary">{node.summary}</p>}
      <div className="notes-content">
        <p><strong>Learning Target:</strong> {node.label}</p>
        <p>Students will learn key vocabulary and concepts related to this topic.</p>
        <h4>Key Vocabulary</h4>
        <ul>
          <li>Vocabulary words will be listed here</li>
          <li>With definitions and examples</li>
        </ul>
        <h4>Examples</h4>
        <p>Examples and illustrations will be provided here..........</p>
        <p>Examples2 and illustrations will be provided here.</p>
      </div>
    </div>
  );
}

function PracticeRenderer({ node }) {
  return (
    <div className="content-renderer-practice">
      <h3>Practice</h3>
      {node.summary && <p className="practice-summary">{node.summary}</p>}
      <div className="practice-content">
        <p><strong>Instructions:</strong> Complete the practice activities below.</p>
        <div className="practice-placeholder">
          <p>Interactive practice questions will appear here.</p>
          <p className="practice-note">Practice content is being prepared.</p>
        </div>
      </div>
    </div>
  );
}

function RevisionRenderer({ node }) {
  return (
    <div className="content-renderer-revision">
      <h3>Revision</h3>
      {node.summary && <p className="revision-summary">{node.summary}</p>}
      <div className="revision-content">
        <p><strong>Review Questions:</strong> Test your understanding of this topic.</p>
        <div className="revision-placeholder">
          <p>Revision questions will appear here.</p>
          <p className="revision-note">Revision content is being prepared.</p>
        </div>
      </div>
    </div>
  );
}

function AssessmentRenderer({ node, registry }) {
  const parent = node.parentId ? registry.nodesById.get(node.parentId) : null;

  return (
    <div className="content-renderer-assessment">
      <h3>Assessment</h3>
      {node.summary && <p className="assessment-summary">{node.summary}</p>}
      {parent && (
        <p className="assessment-parent">
          Part of: <NavLink to={`/learn/${parent.id}`}>{parent.label}</NavLink>
        </p>
      )}
      <div className="assessment-content">
        <p><strong>Instructions:</strong> Answer all questions to the best of your ability.</p>
        <div className="assessment-placeholder">
          <p>Assessment questions will appear here.</p>
          <p className="assessment-note">Assessment content is being prepared.</p>
        </div>
      </div>
    </div>
  );
}

function ExamRenderer({ node, registry }) {
  const parent = node.parentId ? registry.nodesById.get(node.parentId) : null;

  return (
    <div className="content-renderer-exam">
      <h3>Exam</h3>
      {node.summary && <p className="exam-summary">{node.summary}</p>}
      {parent && (
        <p className="exam-parent">
          Exam for: <NavLink to={`/learn/${parent.id}`}>{parent.label}</NavLink>
        </p>
      )}
      <div className="exam-content">
        <p><strong>Instructions:</strong> Read each question carefully and select the best answer.</p>
        <div className="exam-placeholder">
          <p>Exam questions will appear here.</p>
          <p className="exam-note">Exam content is being prepared.</p>
        </div>
      </div>
    </div>
  );
}

function GenericRenderer({ node }) {
  return (
    <div className="content-renderer-generic">
      <h3>Content</h3>
      {node.summary && <p className="generic-summary">{node.summary}</p>}
      <div className="generic-content">
        <p>Learning content will be displayed here.</p>
        <p>
          <strong>Node ID:</strong> {node.id}
        </p>
      </div>
    </div>
  );
}

function LegacyContentRenderer({ legacyPath, legacyManifestId, node }) {
  return (
    <div className="learning-node-legacy-content">
      <h3>{node.label}</h3>
      {node.summary && <p className="legacy-summary">{node.summary}</p>}
      <div className="legacy-content-placeholder">
        <p><strong>Content Type:</strong> {node.kind}</p>
        <p><strong>Legacy Path:</strong> {legacyPath}</p>
        <p><strong>Manifest ID:</strong> {legacyManifestId}</p>
        <p className="legacy-note">
          This content is referenced from the legacy Grade 1 English system. 
          Full content integration will be completed in a future update.
        </p>
      </div>
    </div>
  );
}

