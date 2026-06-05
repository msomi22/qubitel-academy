function ShapeVisual({ shape }) {
  const normalized = String(shape || '').toLowerCase();

  if (normalized === 'circle') {
    return <span className="cbc-visual-shape circle" aria-hidden="true" />;
  }

  if (normalized === 'triangle') {
    return <span className="cbc-visual-shape triangle" aria-hidden="true" />;
  }

  if (normalized === 'rectangle') {
    return <span className="cbc-visual-shape rectangle" aria-hidden="true" />;
  }

  return <span className="cbc-visual-shape square" aria-hidden="true" />;
}

export default function CbcVisualAid({ visual, label = '' }) {
  if (!visual) return null;

  if (visual.type === 'shape') {
    return <ShapeVisual shape={visual.shape} />;
  }

  if (visual.type === 'emoji') {
    return <span className="cbc-visual-emoji" aria-hidden="true">{visual.value}</span>;
  }

  if (visual.type === 'objects') {
    const count = Math.max(0, Number(visual.count) || 0);
    return (
      <span className="cbc-visual-objects" aria-label={label || `${count} objects`}>
        {Array.from({ length: count }).map((_, index) => (
          <span key={`${visual.item || 'item'}-${index}`} aria-hidden="true">{visual.item || '●'}</span>
        ))}
      </span>
    );
  }

  if (visual.type === 'text') {
    return <span className="cbc-visual-text">{visual.value}</span>;
  }

  return null;
}
