import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function readSource(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), 'utf8');
}

const appSource = readSource('../../App.jsx');
const cbcDashboardSource = readSource('../../pages/home/CbcAcademyHome.jsx');
const cbcSidebarSource = readSource('../../components/CbcSidebar.jsx');
const homeSource = readSource('../../pages/Home.jsx');
const overrideSource = readSource('../../pages/home/homeOverrideRegistry.js');
const learningNodeShellSource = readSource('../../components/LearningNodePageShell.jsx');
const cbcDashboardStyleSource = readSource('../../styles/cbc-academy-home.css');
const cbcHeroActionStyleSource = readSource('../../styles/cbc-home/02-hero-actions.css');
const learningAreaHrefSource = cbcDashboardSource.match(
  /function getLearningAreaHref[\s\S]*?\n}/
)?.[0] || '';

test('root Dashboard route renders the academy-aware Home composition', () => {
  assert.match(appSource, /<Route\s+path="\/"\s+element=\{<Home\s*\/>\}/);
  assert.match(homeSource, /resolveHomeComponent\(homeModel\.academyNode\)/);
  assert.doesNotMatch(homeSource, /DashboardPlaceholder/);
});

test('CBC alone resolves to the existing CBC dashboard override', () => {
  assert.match(overrideSource, /'cbc-academy':\s*CbcAcademyHome/);
  assert.match(overrideSource, /\|\|\s*DefaultAcademyHome/);
  assert.doesNotMatch(overrideSource, /'technology-academy':\s*CbcAcademyHome/);
  assert.doesNotMatch(overrideSource, /'customer-experience-academy':\s*CbcAcademyHome/);
});

test('CBC sidebar preserves Dashboard and Grades destinations', () => {
  assert.match(cbcSidebarSource, /to:\s*'\/',[\s\S]*?label:\s*'Dashboard'/);
  assert.match(cbcSidebarSource, /to:\s*'\/categories',[\s\S]*?label:\s*'Grades'/);
});

test('restored CBC dashboard keeps its established styles and artwork', () => {
  assert.match(cbcDashboardSource, /cbc-academy-home\.css/);
  assert.match(cbcDashboardSource, /owl-with-backpack-transparent\.webp/);
  assert.match(cbcDashboardSource, /action-continue-book\.webp/);
  assert.match(cbcDashboardSource, /action-practice-target\.webp/);
  assert.match(cbcDashboardSource, /subject-english-hero\.webp/);
  assert.match(cbcDashboardSource, /subject-math-board-blocks\.webp/);
  assert.match(cbcDashboardSource, /className="cbc-home-stars-card"/);
});

test('CBC learning-area cards open subject-filtered Grades selection', () => {
  assert.match(
    learningAreaHrefSource,
    /buildCbcSubjectGradeSelectionPath\(\{ subject \}\)/
  );
  assert.doesNotMatch(
    learningAreaHrefSource,
    /buildCbcGradeSelectionPath/
  );
});

test('Tech and CX continue to use the default academy dashboard', () => {
  assert.match(overrideSource, /\|\|\s*DefaultAcademyHome/);
  assert.doesNotMatch(overrideSource, /'technology-academy':\s*CbcAcademyHome/);
  assert.doesNotMatch(overrideSource, /'customer-experience-academy':\s*CbcAcademyHome/);
});

test('CBC LearningNode pages record resolved visits for Continue', () => {
  assert.match(learningNodeShellSource, /recordCbcLearningNodeVisit\(\{/);
  assert.match(learningNodeShellSource, /node:\s*currentNode/);
  assert.match(learningNodeShellSource, /tab:\s*searchParams\.get\('tab'\)/);
});

test('Continue uses validated history or safe Grades fallback only', () => {
  assert.match(cbcDashboardSource, /lastActivityState\?\.href \|\| '\/categories'/);
  assert.doesNotMatch(cbcDashboardSource, /continueSection\?\.href/);
  assert.doesNotMatch(cbcDashboardSource, /continueAction\?\.href/);
});

test('misleading CBC dashboard sections are not rendered', () => {
  assert.doesNotMatch(cbcDashboardSource, /Read with me/);
  assert.doesNotMatch(cbcDashboardSource, /read-with-me/);
  assert.doesNotMatch(cbcDashboardSource, /actionReadOwlBook/);
  assert.doesNotMatch(cbcDashboardSource, /cbc-home-action-card--read/);
  assert.doesNotMatch(cbcDashboardSource, /Today&apos;s learning/);
  assert.doesNotMatch(cbcDashboardSource, /cbc-home-lesson-panel/);
  assert.doesNotMatch(cbcDashboardSource, /CbcLessonCard/);
  assert.doesNotMatch(cbcDashboardSource, /getTodayLessons/);
  assert.doesNotMatch(cbcDashboardStyleSource, /06-todays-learning\.css/);
});

test('Continue, Practice, and Explore learning areas remain rendered', () => {
  assert.match(cbcDashboardSource, /variant="cbc-home-action-card--continue"/);
  assert.match(cbcDashboardSource, /to="\/random"[\s\S]*?title="Practice"/);
  assert.match(cbcDashboardSource, /function getLearningAreaHref/);
  assert.match(cbcDashboardSource, /function CbcLearningAreaCard/);
  assert.match(cbcDashboardSource, /className="cbc-home-learning-grid"/);
  assert.match(
    cbcHeroActionStyleSource,
    /\.cbc-home-hero-actions[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/
  );
});