/*
DECISION: 
Vite + React + React Router remains the best fit for this version because the product is a fast, 
static, highly interactive learning platform. This refactor uses route-level lazy loading 
and topic-level lazy quiz banks, so the dashboard no longer downloads or parses every question upfront. 

Next.js would be useful later for SSR, auth, payments, or a database-backed CMS; 
Angular would be stronger for a large enterprise team but heavier for this content-first product.
*/
import { Suspense, lazy, useEffect, useRef } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import CbcSidebar from './components/CbcSidebar.jsx';
import StatusBar from './components/StatusBar.jsx';
import BottomNav from './components/BottomNav.jsx';
import OnboardingOverlay from './components/OnboardingOverlay.jsx';
import PageSkeleton from './components/PageSkeleton.jsx';
import { siteConfig } from './config/siteConfig.js';
import { useContentProtection } from './hooks/useContentProtection.js';
import { usePreferences } from './hooks/usePreferences.js';
import useTvRemoteNavigation from './hooks/useTvRemoteNavigation.js';
import { detectAcademyIdFromLocation } from './config/detectAcademy.ts';

const Home = lazy(() => import('./pages/Home.jsx'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage.jsx'));
const DSAPage = lazy(() => import('./pages/DSAPage.jsx'));
const SystemDesignPage = lazy(() => import('./pages/SystemDesignPage.jsx'));
const CategoryPage = lazy(() => import('./pages/CategoryPage.jsx'));
const RandomQuestionPage = lazy(() => import('./pages/RandomQuestionPage.jsx'));
const RecentPage = lazy(() => import('./pages/RecentPage.jsx'));
const ProgressPage = lazy(() => import('./pages/ProgressPage.jsx'));
const SettingsPage = lazy(() => import('./pages/SettingsPage.jsx'));
const ProblemPage = lazy(() => import('./pages/ProblemPage.jsx'));
const ExamSessionPage = lazy(() => import('./pages/ExamSessionPage.jsx'));
const LearningNodePage = lazy(() => import('./pages/LearningNodePage.jsx'));

function isProblemRoute(pathname = '') {
  return pathname.startsWith('/problem/');
}

function RouteScrollReset() {
  const location = useLocation();
  const previousPathnameRef = useRef(location.pathname);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const previousPathname = previousPathnameRef.current;
    previousPathnameRef.current = location.pathname;

    const preserveProblemScroll = Boolean(
      location.state?.preserveProblemScroll
      && isProblemRoute(previousPathname)
      && isProblemRoute(location.pathname)
    );

    if (preserveProblemScroll) return undefined;

    const reset = () => {
      const pageWrap = document.querySelector('.page-wrap');
      const mainContent = document.querySelector('.main-content');

      pageWrap?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      mainContent?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    reset();
    const frameId = window.requestAnimationFrame(reset);
    const timeoutId = window.setTimeout(reset, 250);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.state]);

  return null;
}

export default function App() {
  useContentProtection();
  useTvRemoteNavigation();
  const { theme } = usePreferences();
  const { pathname } = useLocation();
  const isExamRoute = pathname.startsWith('/exam/');
  const activeAcademyId = detectAcademyIdFromLocation();
  const isCbcAcademy = activeAcademyId === 'cbc';

  useEffect(() => {
    document.title = `${siteConfig.appName} | Learning Dashboard`;
  }, []);

  return (
    <div className={`app-shell ${theme} ${isExamRoute ? 'exam-route-shell' : ''}`}>
      <RouteScrollReset />

      {/* First-visit onboarding — shows once, stores dismissal in localStorage */}
      <OnboardingOverlay />

      {!isExamRoute ? <Navbar /> : null}
      <div className={`layout ${isExamRoute ? 'exam-route-layout' : ''}`}>
        {!isExamRoute ? (isCbcAcademy ? <CbcSidebar /> : <Sidebar />) : null}
        <main className="page-wrap protect-content">
          {/* PageSkeleton replaces the blank LoadingCard for a better
              perceived-performance experience on route transitions */}
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/dsa" element={<DSAPage />} />
              <Route path="/system-design" element={<SystemDesignPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/random" element={<RandomQuestionPage />} />
              <Route path="/recent" element={<RecentPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/problem/:questionId" element={<ProblemPage />} />
              <Route path="/exam/:examId" element={<ExamSessionPage />} />
              <Route path="/learn/:nodeId" element={<LearningNodePage />} />
              <Route
                path="*"
                element={
                  <section className="hero-card">
                    <h1>Page not found</h1>
                    <p>Use the navigation to continue learning.</p>
                    <NavLink className="btn" to="/">Go home</NavLink>
                  </section>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>

      {/* Bottom navigation bar — visible on mobile only (CSS controls display) */}
      {!isExamRoute ? <BottomNav /> : null}

      {!isExamRoute ? <StatusBar /> : null}
    </div>
  );
}
