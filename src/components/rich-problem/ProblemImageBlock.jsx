import { useEffect, useState } from 'react';

const DEFAULT_MIN_ZOOM = 0.75;
const DEFAULT_MAX_ZOOM = 3;
const DEFAULT_ZOOM_STEP = 0.25;
const DEFAULT_ZOOM = 1;

export function isTrustedStaticImageSrc(src) {
  if (typeof src !== 'string') return false;
  const trimmed = src.trim();
  if (!trimmed || trimmed.includes('://') || trimmed.startsWith('//')) return false;

  return ['/assets/', '/images/', '/diagrams/', '/screenshots/', '/static/']
    .some((prefix) => trimmed.startsWith(prefix));
}

function clampZoom(value, minZoom, maxZoom) {
  return Math.min(maxZoom, Math.max(minZoom, value));
}

function readZoomNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function isLargeDiagramBlock(block) {
  const searchableText = [block.title, block.alt, block.caption, block.variant, block.kind]
    .filter((value) => typeof value === 'string')
    .join(' ')
    .toLowerCase();

  return searchableText.includes('diagram') || searchableText.includes('architecture');
}

function ImageViewer({ alt, block, canExpand, expanded = false, onClose, onExpand, src }) {
  const minZoom = readZoomNumber(block.minZoom, DEFAULT_MIN_ZOOM);
  const maxZoom = Math.max(minZoom, readZoomNumber(block.maxZoom, DEFAULT_MAX_ZOOM));
  const zoomStep = readZoomNumber(block.zoomStep, DEFAULT_ZOOM_STEP);
  const initialZoom = clampZoom(readZoomNumber(block.initialZoom, DEFAULT_ZOOM), minZoom, maxZoom);
  const [scale, setScale] = useState(initialZoom);

  const zoomPercentage = `${Math.round(scale * 100)}%`;
  const canZoomOut = scale > minZoom;
  const canZoomIn = scale < maxZoom;

  function updateScale(nextScale) {
    setScale((currentScale) => clampZoom(
      typeof nextScale === 'function' ? nextScale(currentScale) : nextScale,
      minZoom,
      maxZoom
    ));
  }

  function resetScale() {
    setScale(initialZoom);
  }

  return (
    <>
      <div className="problem-image-zoom-controls" aria-label={`${block.title || 'Image'} zoom controls`}>
        <button aria-label="Zoom out" disabled={!canZoomOut} onClick={() => updateScale((currentScale) => currentScale - zoomStep)} type="button">−</button>
        <span aria-live="polite">{zoomPercentage}</span>
        <button aria-label="Zoom in" disabled={!canZoomIn} onClick={() => updateScale((currentScale) => currentScale + zoomStep)} type="button">+</button>
        <button disabled={scale === initialZoom} onClick={resetScale} type="button">Reset</button>
        {canExpand && !expanded ? <button onClick={onExpand} type="button">Fullscreen</button> : null}
        {expanded ? <button onClick={onClose} type="button">Close</button> : null}
      </div>
      <div className={`problem-image-zoom-frame${expanded ? ' problem-image-zoom-frame-expanded' : ''}`}>
        <div
          className="problem-image-zoom-canvas"
          style={{ width: `${scale * 100}%` }}
        >
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </div>
    </>
  );
}

export default function ProblemImageBlock({ block }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') setExpanded(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [expanded]);

  if (!isTrustedStaticImageSrc(block.src)) {
    return (
      <section className="workspace-block problem-rich-block problem-rich-empty">
        <span className="mini-label">Image</span>
        <p>Image source is not an allowed root-relative static path.</p>
      </section>
    );
  }

  const src = block.src.trim();
  const alt = block.alt || block.caption || block.title || 'Problem visual';
  const canZoom = block.zoomable === true || isLargeDiagramBlock(block);
  const canExpand = block.fullscreen !== false;
  const figureClassName = [
    'workspace-block',
    'problem-rich-block',
    'problem-image-block',
    canZoom ? 'problem-image-zoomable' : ''
  ].filter(Boolean).join(' ');

  return (
    <figure className={figureClassName}>
      {block.title ? <span className="mini-label">{block.title}</span> : null}
      {canZoom ? (
        <ImageViewer
          alt={alt}
          block={block}
          canExpand={canExpand}
          onClose={() => setExpanded(false)}
          onExpand={() => setExpanded(true)}
          src={src}
        />
      ) : (
        <img src={src} alt={alt} loading="lazy" />
      )}
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      {expanded && canZoom && canExpand ? (
        <div className="problem-image-expanded-backdrop" role="presentation" onClick={() => setExpanded(false)}>
          <div
            aria-label={block.title || 'Expanded problem image'}
            aria-modal="true"
            className="problem-image-expanded-panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="problem-image-expanded-header">
              <strong>{block.title || 'Expanded image'}</strong>
              <button onClick={() => setExpanded(false)} type="button">Close</button>
            </div>
            <ImageViewer
              alt={alt}
              block={block}
              canExpand={false}
              expanded
              onClose={() => setExpanded(false)}
              src={src}
            />
            {block.caption ? <p className="problem-rich-caption">{block.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </figure>
  );
}
