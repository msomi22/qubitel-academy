const ALLOWED_TONES = new Set(['info', 'warning', 'success', 'danger']);

export default function ProblemCalloutBlock({ block }) {
  const tone = ALLOWED_TONES.has(block.tone) ? block.tone : 'info';

  return (
    <aside className={`workspace-block problem-rich-block problem-callout problem-callout-${tone}`}>
      <span className="mini-label">{tone}</span>
      {block.title ? <h4>{block.title}</h4> : null}
      {block.content ? <p>{block.content}</p> : null}
    </aside>
  );
}
