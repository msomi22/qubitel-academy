export default function SearchPanel({
  query,
  onQueryChange
}) {
  return (
    <section className="search-panel compact-search-panel search-only-panel" aria-label="Search questions">
      <label className="search-field search-input-wrap">
        <span>Search</span>
        <div className="compact-search-control">
          <span className="compact-search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search practices..."
            autoComplete="off"
          />
        </div>
      </label>
    </section>
  );
}
