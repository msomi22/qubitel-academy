import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AlphabetMasteryBlock from '../rich-problem/AlphabetMasteryBlock.jsx';
import NumberAudioGridBlock from '../rich-problem/NumberAudioGridBlock.jsx';
import { resolveInteractiveBookBlock } from './learningBookInteractiveBlock.model.js';

function BlockTitle({ children }) {
  if (!children) return null;
  return <h3 className="learning-book__block-title">{children}</h3>;
}


function BookImage({ block }) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const close = () => {
    setZoom(1);
    setIsOpen(false);
  };

  const viewer = isOpen
    ? createPortal(
        <div
          className="learning-book-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged instructional image"
        >
          <div className="learning-book-image-viewer__toolbar">
            <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.5))}>
              −
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((value) => Math.min(3, value + 0.5))}>
              +
            </button>
            <button type="button" onClick={() => setZoom(1)}>Reset</button>
            <button type="button" onClick={close}>Close</button>
          </div>

          <div className="learning-book-image-viewer__canvas">
            <img
              src={block.src}
              alt={typeof block.alt === 'string' ? block.alt : ''}
              style={{ width: `${zoom * 100}%` }}
              draggable="false"
            />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <figure className="learning-book__block learning-book__block--image">
        <button
          className="learning-book__image-button"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open image viewer"
        >
          <img
            src={block.src}
            alt={typeof block.alt === 'string' ? block.alt : ''}
            loading="lazy"
            decoding="async"
          />
          <span className="learning-book__image-hint">Tap to enlarge</span>
        </button>
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
      {viewer}
    </>
  );
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
  const interactiveBlock = resolveInteractiveBookBlock(block, isAnimationCopy);

  if (interactiveBlock?.mode === 'summary') {
    return (
      <div className="learning-book__block" aria-hidden="true">
        <BlockTitle>{interactiveBlock.title}</BlockTitle>
        <p>{interactiveBlock.text}</p>
      </div>
    );
  }

  if (interactiveBlock?.renderer === 'alphabetMastery') {
    return <AlphabetMasteryBlock block={block} presentation="book" />;
  }

  if (interactiveBlock?.renderer === 'numberAudioGrid') {
    return <NumberAudioGridBlock block={block} presentation="book" />;
  }

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
    return <BookImage block={block} />;
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