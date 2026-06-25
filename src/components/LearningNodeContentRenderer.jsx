import { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createNodeRoutePath } from '../learning/routing';

function getAttributeValue(node, key) {
  return node?.attributes?.find((attr) => attr.key === key)?.value || '';
}

function getAppearanceValue(node, key) {
  return node?.appearances?.find((appearance) => appearance.key === key)?.value || '';
}

function getNodeText(node, keys, fallback = '') {
  const textKeys = Array.isArray(keys) ? keys : [keys];

  for (const key of textKeys) {
    const value =
      node?.[key] ||
      node?.metadata?.[key] ||
      getAttributeValue(node, key) ||
      getAppearanceValue(node, key);

    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return fallback;
}

function hasRenderableContent(node) {
  if (isBookContent(node?.content)) return true;

  const textFields = ['content', 'body', 'description', 'summary', 'instructions'];
  const listFields = ['sections', 'items', 'questions'];

  const hasText = textFields.some((key) => getNodeText(node, key).length > 0);
  const hasList = listFields.some((key) => Array.isArray(node?.[key]) && node[key].length > 0);

  return hasText || hasList;
}

function isBookContent(content) {
  return content?.type === 'book' && Array.isArray(content.pages);
}

function getAssessmentExamCards(node) {
  if (Array.isArray(node?.content?.exams)) return node.content.exams;
  if (Array.isArray(node?.exams)) return node.exams;
  return [];
}

function getExamQuestionCount(exam) {
  const metadataCount = Number(exam?.metadata?.questionCount ?? exam?.questionCount);
  if (Number.isFinite(metadataCount) && metadataCount > 0) return metadataCount;
  return Array.isArray(exam?.questions) ? exam.questions.length : 0;
}

function formatExamCardMetadata(exam) {
  return [
    `${getExamQuestionCount(exam)} ${getExamQuestionCount(exam) === 1 ? 'question' : 'questions'}`,
    exam?.estimatedTime
  ].filter(Boolean).join(' • ');
}

function renderTextBlock(value) {
  if (typeof value !== 'string' || value.trim().length === 0) return null;

  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => <p key={`${line}-${index}`}>{line}</p>);
}

function renderContentList(items) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const renderedItems = items
    .map((item, index) => {
      if (typeof item === 'string' && item.trim().length > 0) {
        return <li key={`${item}-${index}`}>{item}</li>;
      }

      if (item && typeof item === 'object') {
        const title = getNodeText(item, ['label', 'title', 'question']);
        const body = getNodeText(item, ['summary', 'description', 'instructions', 'content', 'body']);

        if (!title && !body) return null;

        return (
          <li key={title || body || index}>
            {title && <strong>{title}</strong>}
            {body && renderTextBlock(body)}
          </li>
        );
      }

      return null;
    })
    .filter(Boolean);

  if (renderedItems.length === 0) return null;

  return <ul>{renderedItems}</ul>;
}

function renderBookBlock(block, index) {
  if (!block || typeof block !== 'object') return null;

  const bodyText = [block.text, block.content, block.body]
    .find((value) => typeof value === 'string' && value.trim().length > 0);
  const items = Array.isArray(block.items) ? block.items : [];
  const hasTitle = typeof block.title === 'string' && block.title.trim().length > 0;
  const hasBody = typeof bodyText === 'string' && bodyText.trim().length > 0;
  const hasItems = items.length > 0;

  if (!hasTitle && !hasBody && !hasItems) return null;

  return (
    <section key={block.id || block.title || index} className="book-content-block">
      {hasTitle && <h5>{block.title}</h5>}
      {hasBody && renderTextBlock(bodyText)}
      {hasItems && renderContentList(items)}
    </section>
  );
}

function BookContentRenderer({ content }) {
  const pages = Array.isArray(content?.pages) ? content.pages : [];

  return (
    <div className="content-renderer-book">
      <h3>{content.title}</h3>
      {renderTextBlock(content.description)}
      {pages.length === 0 ? (
        <p className="book-content-empty">Notes content is being prepared.</p>
      ) : (
        <div className="book-content-pages">
          {pages.map((page, pageIndex) => {
            if (!page || typeof page !== 'object') return null;

            const blocks = Array.isArray(page.blocks) ? page.blocks : [];

            return (
              <section key={page.id || page.title || pageIndex} className="book-content-page">
                <h4>{page.title || `Page ${pageIndex + 1}`}</h4>
                {renderTextBlock(page.subtitle)}
                {blocks.map((block, blockIndex) => renderBookBlock(block, blockIndex))}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function LearningNodeContentRenderer({ registry, node, contentRendererProps = {} }) {
  const contentType = useMemo(() => {
    return (
      getAttributeValue(node, 'contentType') ||
      node.kind ||
      'content'
    );
  }, [node]);

  const legacyPath = getAttributeValue(node, 'legacyPath');
  const legacyManifestId = getAttributeValue(node, 'legacyManifestId');

  if (legacyPath && legacyManifestId) {
    return <LegacyContentRenderer legacyPath={legacyPath} legacyManifestId={legacyManifestId} node={node} />;
  }

  if (isBookContent(node?.content)) {
    return <BookContentRenderer content={node.content} />;
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
  const instructions = getNodeText(node, 'instructions');
  const content = getNodeText(node, 'content');
  const body = getNodeText(node, 'body');
  const description = getNodeText(node, 'description');
  const summary = getNodeText(node, 'summary');
  const sections = Array.isArray(node?.sections) ? node.sections : [];
  const items = Array.isArray(node?.items) ? node.items : [];
  const hasContent = hasRenderableContent(node);

  return (
    <div className="content-renderer-notes">
      <h3>Notes</h3>
      <div className="notes-content">
        {hasContent ? (
          <>
            {renderTextBlock(instructions)}
            {renderTextBlock(content)}
            {renderTextBlock(body)}
            {renderContentList(sections)}
            {renderContentList(items)}
            {renderTextBlock(description)}
            {renderTextBlock(summary)}
          </>
        ) : (
          <p>Content is being prepared.</p>
        )}
      </div>
    </div>
  );
}

function PracticeRenderer({ node }) {
  const instructions = getNodeText(node, 'instructions');
  const questions = Array.isArray(node?.questions) ? node.questions : [];
  const items = Array.isArray(node?.items) ? node.items : [];
  const content = getNodeText(node, 'content');
  const body = getNodeText(node, 'body');
  const sections = Array.isArray(node?.sections) ? node.sections : [];
  const description = getNodeText(node, 'description');
  const summary = getNodeText(node, 'summary');
  const hasContent = hasRenderableContent(node);

  return (
    <div className="content-renderer-practice">
      <h3>Practice</h3>
      <div className="practice-content">
        {hasContent ? (
          <>
            {renderTextBlock(instructions)}
            {renderContentList(questions)}
            {renderContentList(items)}
            {renderTextBlock(content)}
            {renderTextBlock(body)}
            {renderContentList(sections)}
            {renderTextBlock(description)}
            {renderTextBlock(summary)}
          </>
        ) : (
          <p className="practice-note">Practice content is being prepared.</p>
        )}
      </div>
    </div>
  );
}

function RevisionRenderer({ node }) {
  const instructions = getNodeText(node, 'instructions');
  const questions = Array.isArray(node?.questions) ? node.questions : [];
  const items = Array.isArray(node?.items) ? node.items : [];
  const content = getNodeText(node, 'content');
  const body = getNodeText(node, 'body');
  const sections = Array.isArray(node?.sections) ? node.sections : [];
  const description = getNodeText(node, 'description');
  const summary = getNodeText(node, 'summary');
  const hasContent = hasRenderableContent(node);

  return (
    <div className="content-renderer-revision">
      <h3>Revision</h3>
      <div className="revision-content">
        {hasContent ? (
          <>
            {renderTextBlock(instructions)}
            {renderContentList(questions)}
            {renderContentList(items)}
            {renderTextBlock(content)}
            {renderTextBlock(body)}
            {renderContentList(sections)}
            {renderTextBlock(description)}
            {renderTextBlock(summary)}
          </>
        ) : (
          <p className="revision-note">Revision content is being prepared.</p>
        )}
      </div>
    </div>
  );
}

function AssessmentRenderer({ node, registry }) {
  const navigate = useNavigate();
  const parent = node.parentId ? registry.nodesById.get(node.parentId) : null;
  const instructions = getNodeText(node, 'instructions');
  const questions = Array.isArray(node?.questions) ? node.questions : [];
  const items = Array.isArray(node?.items) ? node.items : [];
  const examCards = getAssessmentExamCards(node);
  const content = getNodeText(node, 'content');
  const body = getNodeText(node, 'body');
  const sections = Array.isArray(node?.sections) ? node.sections : [];
  const description = getNodeText(node, 'description');
  const summary = getNodeText(node, 'summary');
  const hasContent = hasRenderableContent(node) || examCards.length > 0;

  if (examCards.length > 0) {
    return (
      <div className="topic-assessment-grid">
        {examCards.map((exam) => (
          <button
            key={exam.id}
            type="button"
            className="topic-assessment-card"
            aria-label={`${exam.title}. ${exam.description || ''}`.trim()}
            onClick={() => navigate(`/exam/${exam.id}`)}
          >
            <span className="topic-assessment-icon" aria-hidden="true">📝</span>
            <span className="topic-assessment-copy">
              <strong>{exam.title}</strong>
              <small>{[exam.description, formatExamCardMetadata(exam)].filter(Boolean).join(' • ')}</small>
            </span>
            <span className="topic-assessment-status">Ready</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="content-renderer-assessment">
      <h3>Assessment</h3>
      {parent && (
        <p className="assessment-parent">
          Part of: <NavLink to={createNodeRoutePath(registry, parent.id, {
            includeRoot: false,
            includeAcademyRoot: false
          })}>{parent.label}</NavLink>
        </p>
      )}
      <div className="assessment-content">
        {hasContent ? (
          <>
            {examCards.length > 0 && (
              <section className="topic-assessment-panel" aria-labelledby={`${node.id}-exam-card-heading`}>
                <div className="topic-assessment-head">
                  <div>
                    <p className="eyebrow">Assessment</p>
                    <h3 id={`${node.id}-exam-card-heading`}>Exams</h3>
                  </div>
                  <span>{examCards.length} available</span>
                </div>
                <div className="topic-assessment-grid">
                  {examCards.map((exam) => (
                    <button
                      key={exam.id}
                      type="button"
                      className="topic-assessment-card"
                      aria-label={`${exam.title}. ${exam.description || ''}`.trim()}
                    >
                      <span className="topic-assessment-icon" aria-hidden="true">📝</span>
                      <span className="topic-assessment-copy">
                        <strong>{exam.title}</strong>
                        <small>{[exam.description, formatExamCardMetadata(exam)].filter(Boolean).join(' • ')}</small>
                      </span>
                      <span className="topic-assessment-status">Ready</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {renderTextBlock(instructions)}
            {renderContentList(questions)}
            {renderContentList(items)}
            {renderTextBlock(content)}
            {renderTextBlock(body)}
            {renderContentList(sections)}
            {renderTextBlock(description)}
            {renderTextBlock(summary)}
          </>
        ) : (
          <p className="assessment-note">Assessment content is being prepared.</p>
        )}
      </div>
    </div>
  );
}

function ExamRenderer({ node, registry }) {
  const parent = node.parentId ? registry.nodesById.get(node.parentId) : null;
  const instructions = getNodeText(node, 'instructions');
  const questions = Array.isArray(node?.questions) ? node.questions : [];
  const items = Array.isArray(node?.items) ? node.items : [];
  const content = getNodeText(node, 'content');
  const body = getNodeText(node, 'body');
  const sections = Array.isArray(node?.sections) ? node.sections : [];
  const description = getNodeText(node, 'description');
  const summary = getNodeText(node, 'summary');
  const hasContent = hasRenderableContent(node);

  return (
    <div className="content-renderer-exam">
      <h3>Exam</h3>
      {parent && (
        <p className="exam-parent">
          Exam for: <NavLink to={createNodeRoutePath(registry, parent.id, {
            includeRoot: false,
            includeAcademyRoot: false
          })}>{parent.label}</NavLink>
        </p>
      )}
      <div className="exam-content">
        {hasContent ? (
          <>
            {renderTextBlock(instructions)}
            {renderContentList(questions)}
            {renderContentList(items)}
            {renderTextBlock(content)}
            {renderTextBlock(body)}
            {renderContentList(sections)}
            {renderTextBlock(description)}
            {renderTextBlock(summary)}
          </>
        ) : (
          <p className="exam-note">Exam content is being prepared.</p>
        )}
      </div>
    </div>
  );
}

function GenericRenderer({ node }) {
  const instructions = getNodeText(node, 'instructions');
  const content = getNodeText(node, 'content');
  const body = getNodeText(node, 'body');
  const sections = Array.isArray(node?.sections) ? node.sections : [];
  const items = Array.isArray(node?.items) ? node.items : [];
  const questions = Array.isArray(node?.questions) ? node.questions : [];
  const description = getNodeText(node, 'description');
  const summary = getNodeText(node, 'summary');
  const hasContent = hasRenderableContent(node);

  return (
    <div className="content-renderer-generic">
      <h3>Content</h3>
      <div className="generic-content">
        {hasContent ? (
          <>
            {renderTextBlock(instructions)}
            {renderTextBlock(content)}
            {renderTextBlock(body)}
            {renderContentList(sections)}
            {renderContentList(items)}
            {renderContentList(questions)}
            {renderTextBlock(description)}
            {renderTextBlock(summary)}
          </>
        ) : (
          <p>Content is being prepared.</p>
        )}
      </div>
    </div>
  );
}

function LegacyContentRenderer({ legacyPath, legacyManifestId, node }) {
  const instructions = getNodeText(node, 'instructions');
  const content = getNodeText(node, 'content');
  const body = getNodeText(node, 'body');
  const sections = Array.isArray(node?.sections) ? node.sections : [];
  const items = Array.isArray(node?.items) ? node.items : [];
  const questions = Array.isArray(node?.questions) ? node.questions : [];
  const description = getNodeText(node, 'description');
  const summary = getNodeText(node, 'summary');
  const hasContent = hasRenderableContent(node);
  const hasLegacyReference = Boolean(legacyPath || legacyManifestId);

  return (
    <div className="learning-node-legacy-content">
      <h3>Content</h3>
      <div className="legacy-content-placeholder">
        {hasContent ? (
          <>
            {renderTextBlock(instructions)}
            {renderTextBlock(content)}
            {renderTextBlock(body)}
            {renderContentList(sections)}
            {renderContentList(items)}
            {renderContentList(questions)}
            {renderTextBlock(description)}
            {renderTextBlock(summary)}
          </>
        ) : (
          <p className="legacy-note">
            {hasLegacyReference
              ? 'This content is linked to an existing content source.'
              : 'Content is being prepared.'}
          </p>
        )}
      </div>
    </div>
  );
}

