import { useEffect, useState } from 'react';
import { usePreferences } from '../hooks/usePreferences.js';
import { getAcademyHomeViewModel } from '../learning/home/index.ts';
import { detectAcademyIdFromLocation } from '../config/detectAcademy.ts';
import { LoadingAcademyHome } from './home/DefaultAcademyHome.jsx';
import { resolveHomeComponent } from './home/homeOverrideRegistry.js';

function DashboardPlaceholder() {
  return (
    <div className="learning-dashboard-page dashboard-command-center">
      <section className="glass dashboard-command-hero" aria-labelledby="dashboard-title">
        <div className="dashboard-command-hero__copy">
          <p className="eyebrow">Dashboard</p>
          <h1 id="dashboard-title">Welcome back</h1>
          <p>Your learning dashboard is being updated.</p>
        </div>
      </section>

      <section className="dashboard-command-grid" aria-label="Dashboard overview">
        <article className="glass dashboard-command-card">
          <div className="dashboard-command-card__head">
            <div>
              <p className="eyebrow">Activity</p>
              <h2>Recent learning activity</h2>
            </div>
          </div>
          <p>Your recent learning activity will appear here.</p>
        </article>

        <article className="glass dashboard-command-card">
          <div className="dashboard-command-card__head">
            <div>
              <p className="eyebrow">Practice</p>
              <h2>Recommended practice</h2>
            </div>
          </div>
          <p>Recommended practice sessions will appear here.</p>
        </article>

        <article className="glass dashboard-command-card">
          <div className="dashboard-command-card__head">
            <div>
              <p className="eyebrow">Progress</p>
              <h2>Progress summary</h2>
            </div>
          </div>
          <p>Your learning progress summary will appear here.</p>
        </article>

        <article className="glass dashboard-command-card">
          <div className="dashboard-command-card__head">
            <div>
              <p className="eyebrow">Coming soon</p>
              <h2>More features</h2>
            </div>
          </div>
          <p>New dashboard features are on the way.</p>
        </article>
      </section>
    </div>
  );
}

export default function Home() {
  const { completed, randomCount = 0 } = usePreferences();
  const [homeModel, setHomeModel] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const activeAcademyId = detectAcademyIdFromLocation();

  useEffect(() => {
    let alive = true;

    setLoadingStats(true);

    getAcademyHomeViewModel({ completed })
      .then((nextHomeModel) => {
        if (!alive) return;
        setHomeModel(nextHomeModel);
      })
      .finally(() => {
        if (alive) setLoadingStats(false);
      });

    return () => {
      alive = false;
    };
  }, [completed]);

  // Show DashboardPlaceholder for CBC academy (Dashboard should not show Grade 1 content)
  if (activeAcademyId === 'cbc') {
    return <DashboardPlaceholder />;
  }

  if (!homeModel) {
    return <LoadingAcademyHome />;
  }

  const AcademyHome = resolveHomeComponent(homeModel.academyNode);

  return (
    <AcademyHome
      homeModel={homeModel}
      loadingStats={loadingStats}
      randomCount={randomCount}
    />
  );
}