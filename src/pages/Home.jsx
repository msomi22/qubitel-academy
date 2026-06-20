import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../hooks/usePreferences.js';
import { getAcademyHomeViewModel } from '../learning/home/index.ts';
import { detectAcademyIdFromLocation } from '../config/detectAcademy.ts';
import { LoadingAcademyHome } from './home/DefaultAcademyHome.jsx';
import { resolveHomeComponent } from './home/homeOverrideRegistry.js';

export default function Home() {
  const { completed, randomCount = 0 } = usePreferences();
  const [homeModel, setHomeModel] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const navigate = useNavigate();
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

  // Redirect non-tech academies (like CBC) to their first grade
  useEffect(() => {
    if (activeAcademyId && activeAcademyId !== 'tech') {
      navigate('/learn/grade-1', { replace: true });
    }
  }, [activeAcademyId, navigate]);

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