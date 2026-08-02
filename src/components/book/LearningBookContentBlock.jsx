function BlockTitle({ children }) {
  if (!children) return null;
  return <h3 className="learning-book__block-title">{children}</h3>;
}

function BlockList({ block }) {
  const List = block.ordered ? 'ol' : 'ul';
  return (
    <div className="learning-book__block learning-book__block--list">
      <BlockTitle>{block.title}</BlockTitle>
      <List>
        {block.items.map((item, index) => (
          <li key={`${String(item)}-${index}`}>{String(item)}</li>
        ))}
      </List>
    </div>
  );
}

export default function LearningBookContentBlock({ block, isAnimationCopy = false }) {
  if (!block || typeof block !== 'object') return null;

  const blockType = block.type || '';

  if (blockType === 'paragraph' || blockType === 'text') {
    return (
      <div className="learning-book__block learning-book__block--text">
        <BlockTitle>{block.title}</BlockTitle>
        {block.text && <p>{block.text}</p>}
      </div>
    );
  }

  if (blockType === 'heading') {
    return (
      <h3 className="learning-book__block learning-book__block--heading">
        {block.text || block.title}
      </h3>
    );
  }

  if (blockType === 'list' && Array.isArray(block.items)) {
    return <BlockList block={block} />;
  }

  if (blockType === 'image' && typeof block.src === 'string') {
    return (
      <figure className="learning-book__block learning-book__block--image">
        <img src={block.src} alt={typeof block.alt === 'string' ? block.alt : ''} loading="lazy" />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }

  if (blockType === 'audio' && typeof block.src === 'string') {
    return (
      <div className="learning-book__block learning-book__block--audio">
        <BlockTitle>{block.title || block.label || 'Audio'}</BlockTitle>
        {isAnimationCopy ? (
          <p>Audio</p>
        ) : (
          <audio controls preload="metadata" src={block.src}>
            Your browser does not support audio playback.
          </audio>
        )}
      </div>
    );
  }

  if (blockType === 'quote' && (block.text || block.content || block.body)) {
    return (
      <blockquote className="learning-book__block learning-book__block--quote">
        <p>{block.text || block.content || block.body}</p>
        {block.cite && <cite>{block.cite}</cite>}
      </blockquote>
    );
  }

  const fallbackText = block.text || block.content || block.body;
  const hasItems = Array.isArray(block.items) && block.items.length > 0;

  if (!block.title && !fallbackText && !hasItems) return null;

  return (
    <div className="learning-book__block">
      <BlockTitle>{block.title}</BlockTitle>
      {fallbackText && <p>{fallbackText}</p>}
      {hasItems && (
        <ul>
          {block.items.map((item, index) => (
            <li key={`${String(item)}-${index}`}>{String(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}