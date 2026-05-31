export default function GlossaryPopover({ id, term }) {
  if (!term) return null;

  return (
    <span className="glossary-popover" id={id}>
      <strong className="glossary-popover-title">{term.term}</strong>
      <span className="glossary-popover-definition">{term.definition}</span>
      {term.category ? <span className="glossary-popover-category">{term.category}</span> : null}
    </span>
  );
}
