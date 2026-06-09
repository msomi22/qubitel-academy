import { useEffect, useState } from 'react';
import { usePreferences } from '../hooks/usePreferences.js';
import { getAcademyHomeViewModel } from '../learning/home/index.ts';
import { LoadingAcademyHome } from './home/DefaultAcademyHome.jsx';
import { resolveHomeComponent } from './home/homeOverrideRegistry.js';

export default function Home() {
  const { completed, randomCount = 0 } = usePreferences();
  const [homeModel, setHomeModel] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

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