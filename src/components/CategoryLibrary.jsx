import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { categoryLibraryConfig } from '../config/categoryLibraryConfig.js';
import { getCategoryWithCounts } from '../services/questionBankService.js';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';

function categoryIconType(category) {
  const source = [category.id, category.name, category.domain].filter(Boolean).join(' ').toLowerCase();
  if (source.includes('aptitude')) return 'aptitude';
  if (source.includes('kubernetes') || source.includes('ckad')) return 'kubernetes';
  if (source.includes('ml') || source.includes('ai')) return 'ml';
  if (source.includes('system')) return 'system';
  if (source.includes('java')) return 'java';
  if (source.includes('leadership')) return 'leadership';
  if (source.includes('dsa') || source.includes('algorithm')) return 'dsa';
  return 'default';
}

function CategoryIcon({ category }) {
  const type = categoryIconType(category);

  return (
    <svg className="premium-category-card__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {type === 'aptitude' ? (
        <>
          <path d="M9 19c-2.7 0-5-2.2-5-5 0-1.9 1-3.5 2.5-4.4C6.7 6.5 9.2 4 12.3 4c3.2 0 5.8 2.5 6 5.6A5 5 0 0 1 16 19" />
          <path d="M9 10h6M9 14h6M12 7v10" />
        </>
      ) : null}
      {type === 'dsa' ? (
        <>
          <rect x="4" y="4" width="6" height="6" rx="1.5" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" />
          <rect x="4" y="14" width="6" height="6" rx="1.5" />
          <path d="M14 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm5 2 2 2" />
        </>
      ) : null}
      {type === 'kubernetes' ? (
        <>
          <path d="m12 2.8 8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6Z" />
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 5.7v2.8M12 15.5v2.8M5.7 12h2.8M15.5 12h2.8M7.6 7.6l2 2M14.4 14.4l2 2M16.4 7.6l-2 2M9.6 14.4l-2 2" />
        </>
      ) : null}
      {type === 'ml' ? (
        <>
          <circle cx="7" cy="7" r="2.5" />
          <circle cx="17" cy="7" r="2.5" />
          <circle cx="12" cy="17" r="2.5" />
          <path d="M9.2 8.5 11 14M14.8 8.5 13 14M9.4 7h5.2" />
        </>
      ) : null}
      {type === 'system' ? (
        <>
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4 10 20" />
        </>
      ) : null}
      {type === 'java' ? (
        <>
          <path d="M9 18h7a4 4 0 0 0 4-4h-3" />
          <path d="M6 12h10v4a3 3 0 0 1-3 3h-3a4 4 0 0 1-4-4v-3Z" />
          <path d="M10 3c2 1.4-.7 2.4 1.2 4M14 3c2 1.4-.7 2.4 1.2 4" />
        </>
      ) : null}
      {type === 'leadership' ? (
        <>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 20a7 7 0 0 1 14 0M5.5 11.5a2.5 2.5 0 0 0 0 5M18.5 11.5a2.5 2.5 0 0 1 0 5" />
        </>
      ) : null}
      {type === 'default' ? (
        <>
          <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21V5.5Z" />
          <path d="M5 5.5V21M9 7h7M9 11h5" />
        </>
      ) : null}
    </svg>
  );
}

function categoryAccent(category) {
  const palette = ['sky', 'violet', 'amber', 'emerald', 'rose', 'indigo', 'cyan'];
  const seed = `${category.id || ''}${category.name || ''}`;
  const hash = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function formatCount(value, singular, plural) {
  if (value === undefined || value === null) return '…';
  return `${value} ${value === 1 ? singular : plural}`;
}

function categoryClassName(category) {
  return String(category.id || 'topic')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-|-$/g, '');
}

function CategoryCard({ category }) {
  const progress = Number.isFinite(category.progressPercent) ? Math.round(category.progressPercent) : 0;
  const topicCount = formatCount(category.topicCount, 'Topic', 'Topics');
  const questionCount = formatCount(category.quizCount, 'Question', 'Questions');
  const progressCount = `${progress}%`;

  return (
    <Link
      className={`category-card scalable-category-card premium-category-card category-card--${categoryClassName(category)} accent-${categoryAccent(category)}`}
      to={category.route || `/category/${category.id}`}
    >
      <div className="premium-category-card__head">
        <span className="premium-category-card__icon" aria-hidden="true">
          <CategoryIcon category={category} />
        </span>
        <span className="premium-category-card__copy">
          <span className="premium-category-card__title-line">
            <strong>{category.name}</strong>
            {category.featured ? <em className="premium-category-card__badge">NEW</em> : null}
          </span>
          <small className="premium-category-card__domain">{category.domain || 'Learning path'}</small>
        </span>
      </div>

      <p>{category.description}</p>

      <div
        className="premium-category-card__meta"
        aria-label={`${category.name} learning stats: ${topicCount}, ${questionCount}, ${progressCount} complete`}
      >
        <span>{topicCount}</span>
        <span className="premium-category-card__separator" aria-hidden="true"> • </span>
        <span>{questionCount}</span>
        <span className="premium-category-card__separator" aria-hidden="true"> • </span>
        <span className="premium-category-card__progress">{progressCount}</span>
      </div>
    </Link>
  );
}

export default function CategoryLibrary({ categories = [], completed = {} }) {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [countedCategories, setCountedCategories] = useState({});

  const debouncedQuery = useDebouncedValue(query, categoryLibraryConfig.categorySearchDebounceMs);

  const domains = useMemo(() => {
    const unique = Array.from(new Set(categories.map((category) => category.domain || 'General')));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [categories]);

  const filtered = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    const base = categories.filter((category) => {
      const matchesDomain = domain === 'all' || (category.domain || 'General') === domain;
      if (!matchesDomain) return false;

      if (!normalizedQuery) return true;

      const haystack = [
        category.name,
        category.shortName,
        category.description,
        category.domain,
        category.id,
        ...(category.tags || [])
      ].filter(Boolean).join(' ').toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    return [...base].sort((a, b) => {
      const aCounts = countedCategories[a.id] || a;
      const bCounts = countedCategories[b.id] || b;

      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'topics') return (bCounts.topicCount || 0) - (aCounts.topicCount || 0);
      if (sortBy === 'questions') return (bCounts.quizCount || 0) - (aCounts.quizCount || 0);
      if (sortBy === 'progress') return (bCounts.progressPercent || 0) - (aCounts.progressPercent || 0);

      const featuredDelta = Number(b.featured === true) - Number(a.featured === true);
      return featuredDelta || a.name.localeCompare(b.name);
    });
  }, [categories, countedCategories, debouncedQuery, domain, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / categoryLibraryConfig.categoriesPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const visibleCategories = useMemo(() => {
    const start = (safePage - 1) * categoryLibraryConfig.categoriesPerPage;
    return filtered.slice(start, start + categoryLibraryConfig.categoriesPerPage);
  }, [filtered, safePage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, domain, sortBy]);

  useEffect(() => {
    let alive = true;
    const missing = visibleCategories.filter((category) => !countedCategories[category.id]);
    if (!missing.length) return () => { alive = false; };

    Promise.all(missing.map((category) => getCategoryWithCounts(category.id, completed)))
      .then((rows) => {
        if (!alive) return;
        setCountedCategories((previous) => {
          const next = { ...previous };
          rows.filter(Boolean).forEach((row) => { next[row.id] = row; });
          return next;
        });
      });

    return () => { alive = false; };
  }, [visibleCategories, completed, countedCategories]);

  function goToPage(page) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section className="category-library premium-category-library" aria-label="Topic categories">
      <div className="category-library-controls premium-category-controls" aria-label="Topic filters">
        <label className="premium-category-controls__search">
          <span>Search topics</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search topics..."
            aria-label="Search topics"
            autoComplete="off"
          />
        </label>

        <label>
          <span>Domain</span>
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            aria-label="Filter topics by domain"
          >
            <option value="all">All Domains</option>
            {domains.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>Sort</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort topics"
          >
            <option value="featured">Featured First</option>
            <option value="name">Name</option>
            <option value="topics">Most Topics</option>
            <option value="questions">Most Questions</option>
            <option value="progress">Progress</option>
          </select>
        </label>
      </div>

      <div className="category-grid scalable-category-grid premium-category-grid">
        {visibleCategories.map((category) => (
          <CategoryCard key={category.id} category={countedCategories[category.id] || category} />
        ))}
      </div>

      {!visibleCategories.length ? (
        <div className="empty-state glass-lite premium-category-empty">
          <h2>No topics found</h2>
          <p>Try a broader search or clear the domain filter.</p>
        </div>
      ) : null}

      {totalPages > 1 ? (
        <div className="pagination category-pagination glass-lite">
          <div className="pagination-summary">
            Page {safePage} of {totalPages}. Showing {visibleCategories.length} of {filtered.length} categories.
          </div>
          <div className="pagination-controls">
            <button className="page-btn" disabled={safePage === 1} onClick={() => goToPage(1)}>First</button>
            <button className="page-btn" disabled={safePage === 1} onClick={() => goToPage(safePage - 1)}>Prev</button>
            <button className="page-btn active">{safePage}</button>
            <button className="page-btn" disabled={safePage === totalPages} onClick={() => goToPage(safePage + 1)}>Next</button>
            <button className="page-btn" disabled={safePage === totalPages} onClick={() => goToPage(totalPages)}>Last</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
