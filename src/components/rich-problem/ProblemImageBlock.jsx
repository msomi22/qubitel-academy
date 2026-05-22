export function isTrustedStaticImageSrc(src) {
  if (typeof src !== 'string') return false;
  const trimmed = src.trim();
  if (!trimmed || trimmed.includes('://') || trimmed.startsWith('//')) return false;

  return ['/assets/', '/images/', '/diagrams/', '/screenshots/', '/static/', './assets/', './images/', './diagrams/', './screenshots/', './static/']
    .some((prefix) => trimmed.startsWith(prefix));
}

export default function ProblemImageBlock({ block }) {
  if (!isTrustedStaticImageSrc(block.src)) {
    return (
      <section className="workspace-block problem-rich-block problem-rich-empty">
        <span className="mini-label">Image</span>
        <p>Image source is not an allowed local or trusted static path.</p>
      </section>
    );
  }

  return (
    <figure className="workspace-block problem-rich-block problem-image-block">
      {block.title ? <span className="mini-label">{block.title}</span> : null}
      <img src={block.src} alt={block.alt || block.caption || block.title || 'Problem visual'} loading="lazy" />
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  );
}
