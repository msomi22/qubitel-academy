import { useEffect, useState } from 'react';
import CategoryLibrary from '../components/CategoryLibrary.jsx';
import { getCategorySummaries } from '../services/questionBankService.js';
import { usePreferences } from '../hooks/usePreferences.js';

const learningTracksHeroStyles = `
  .category-page {
    gap: 28px;
  }

  .learning-tracks-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: grid;
    gap: 20px;
    width: 100%;
    padding: clamp(22px, 3vw, 34px);
    border: 1px solid color-mix(in srgb, var(--accent) 38%, var(--border));
    border-radius: 16px;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 96%, var(--accent) 4%), var(--bg-card));
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--accent) 10%, transparent),
      0 16px 34px rgba(0, 0, 0, 0.10),
      var(--shadow-soft);
  }

  .learning-tracks-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(circle at 0 0, color-mix(in srgb, var(--accent) 13%, transparent) 0, transparent 34%),
      linear-gradient(90deg, color-mix(in srgb, var(--accent) 13%, transparent), transparent 42%);
    opacity: 0.62;
  }

  .learning-tracks-hero__content {
    display: grid;
    gap: 16px;
    max-width: 760px;
  }

  .learning-tracks-hero__identity {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
  }

  .learning-tracks-hero__icon {
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    display: grid;
    place-items: center;
    border: 1px solid color-mix(in srgb, var(--accent) 38%, var(--border));
    border-radius: 10px;
    background: color-mix(in srgb, var(--accent-light) 82%, var(--bg-card));
    color: var(--accent-dark);
    box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff 22%, transparent);
  }

  .learning-tracks-hero__icon svg {
    width: 18px;
    height: 18px;
    display: block;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .learning-tracks-hero__label {
    margin: 0;
    color: var(--accent-dark) !important;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .learning-tracks-hero__title {
    margin: 0;
    max-width: 680px;
    color: color-mix(in srgb, var(--text-primary) 92%, var(--accent));
    font-family: var(--font-sans);
    font-size: clamp(2rem, 3vw, 2.85rem);
    font-style: normal;
    font-weight: 700;
    line-height: 1.04;
    letter-spacing: -0.045em;
  }

  .learning-tracks-hero__divider {
    width: 100%;
    max-width: 620px;
    height: 1px;
    border: 0;
    margin: 0;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent) 78%, var(--border)) 0 32%,
      color-mix(in srgb, var(--border) 86%, var(--accent)) 32% 100%
    );
  }

  .learning-tracks-hero__description {
    max-width: 590px;
    margin: 0;
    color: var(--text-secondary);
    font-size: clamp(0.94rem, 1vw, 1rem);
    line-height: 1.65;
  }

  @media (min-width: 1101px) {
    .category-page {
      gap: 30px;
    }

    .learning-tracks-hero {
      min-height: 244px;
      align-content: center;
    }
  }

  @media (max-width: 760px) {
    .category-page {
      gap: 18px;
    }

    .learning-tracks-hero {
      gap: 18px;
      padding: 20px;
      border-radius: 12px;
    }

    .learning-tracks-hero__content {
      gap: 14px;
    }

    .learning-tracks-hero__icon {
      width: 32px;
      height: 32px;
      flex-basis: 32px;
      border-radius: 9px;
    }

    .learning-tracks-hero__label {
      font-size: 0.68rem;
      letter-spacing: 0.1em;
    }

    .learning-tracks-hero__title {
      font-size: clamp(1.85rem, 9vw, 2.35rem);
      letter-spacing: -0.035em;
    }

    .learning-tracks-hero__divider {
      max-width: none;
    }

    .learning-tracks-hero__description {
      max-width: none;
      font-size: 0.94rem;
    }
  }
`;

export default function CategoriesPage() {
  const { completed } = usePreferences();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let alive = true;

    getCategorySummaries().then((nextCategories) => {
      if (alive) setCategories(nextCategories);
    });

    return () => { alive = false; };
  }, []);

  return (
    <main className="page category-page">
      <style>{learningTracksHeroStyles}</style>

      <section className="page-title learning-tracks-hero" aria-labelledby="learning-tracks-title">
        <div className="learning-tracks-hero__content">
          <div className="learning-tracks-hero__identity">
            <span className="learning-tracks-hero__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
                <path d="M7 11v4.25c0 1.25 2.24 2.25 5 2.25s5-1 5-2.25V11" />
                <path d="M21 8.5v5" />
              </svg>
            </span>
            <p className="learning-tracks-hero__label">Learning Tracks</p>
          </div>

          <h1 id="learning-tracks-title" className="learning-tracks-hero__title">
            Choose a Learning Track
          </h1>

          <hr className="learning-tracks-hero__divider" aria-hidden="true" />

          <p className="learning-tracks-hero__description">
            Pick a category to explore focused practice questions, patterns, and system design topics.
          </p>
        </div>
      </section>

      <CategoryLibrary
        categories={categories}
        completed={completed}
        title="Available tracks"
      />
    </main>
  );
}
