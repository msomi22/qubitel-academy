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
  assert.match(cbcDashboardSource, /action-read-owl-book\.webp/);
  assert.match(cbcDashboardSource, /action-practice-target\.webp/);
  assert.match(cbcDashboardSource, /subject-english-hero\.webp/);
  assert.match(cbcDashboardSource, /subject-math-board-blocks\.webp/);
  assert.match(cbcDashboardSource, /className="cbc-home-stars-card"/);
});