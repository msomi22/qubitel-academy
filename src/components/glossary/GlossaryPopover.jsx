export default function GlossaryPopover({ id, onClose, term }) {
  if (!term) return null;

  return (
    <span aria-live="polite" className="glossary-popover" id={id} role="tooltip">
      <span className="glossary-popover-header">
        <strong className="glossary-popover-title">{term.term}</strong>
        {onClose ? (
          <button
            aria-label={`Close ${term.term} glossary definition`}
            className="glossary-popover-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        ) : null}
      </span>
      <span className="glossary-popover-definition">{term.definition}</span>
      {term.category ? <span className="glossary-popover-category">{term.category}</span> : null}
    </span>
  );
}
