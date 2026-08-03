import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function readSource(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), 'utf8');
}

const readerSource = readSource('./LearningBookReader.jsx');
const bookViewSource = readSource('../LearningNodeBookView.jsx');
const readerStyleSource = readSource('../../styles/learning-book-reader.css');
const learningNodeStyleSource = readSource('../LearningNodeUI.css');
const assessmentStyleSource = readSource('../../styles/topic-assessments.css');
const shellStyleSource = readSource('../../styles/theme-page-parity.css');

function extractRule(source, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return source.match(new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\}`))?.[1] || '';
}

test('each resting leaf owns bounded vertical scrolling with native boundary chaining', () => {
  const baseRule = extractRule(readerStyleSource, '.learning-book__resting-page-body');
  const singlePagesRule = extractRule(readerStyleSource, '.learning-book--single .learning-book__pages');
  const boundedPageRule = readerStyleSource.match(
    /\.learning-book--single \.learning-book__pages,[\s\S]*?\{([\s\S]*?)\}/
  )?.[1] || '';
  const scrollRule = readerStyleSource.match(
    /\.learning-book--single \.learning-book__resting-page-body,\s*\.learning-book--spread \.learning-book__resting-page-body\s*\{([\s\S]*?)\}/
  )?.[1] || '';

  assert.match(readerSource, /className="learning-book__resting-page-body"/);
  assert.match(baseRule, /height:\s*100%/);
  assert.match(baseRule, /min-height:\s*0/);
  assert.match(baseRule, /box-sizing:\s*border-box/);
  assert.match(singlePagesRule, /display:\s*grid/);
  assert.match(singlePagesRule, /grid-template-rows:\s*minmax\(0,\s*1fr\)/);
  assert.match(boundedPageRule, /height:\s*100%/);
  assert.match(boundedPageRule, /min-height:\s*0/);
  assert.match(boundedPageRule, /box-sizing:\s*border-box/);
  assert.match(scrollRule, /flex:\s*1 1 0/);
  assert.match(scrollRule, /height:\s*auto/);
  assert.match(scrollRule, /overflow-y:\s*auto/);
  assert.match(scrollRule, /overflow-x:\s*hidden/);
  assert.match(scrollRule, /overscroll-behavior-y:\s*auto/);
  assert.match(scrollRule, /touch-action:\s*pan-y/);
  assert.match(scrollRule, /padding-bottom:\s*clamp\(/);
  assert.doesNotMatch(scrollRule, /overflow-y:\s*scroll/);
  assert.doesNotMatch(scrollRule, /overscroll-behavior-y:\s*(?:contain|none)/);
  assert.doesNotMatch(singlePagesRule, /overflow:\s*hidden/);
});

test('reader controls remain outside the resting page scroll owner', () => {
  const pagesCloseIndex = readerSource.indexOf('</div>\n\n          <nav className="learning-book__controls"');
  const scrollOwnerIndex = readerSource.indexOf('className="learning-book__resting-page-body"');

  assert.ok(scrollOwnerIndex >= 0);
  assert.ok(pagesCloseIndex > scrollOwnerIndex);
  assert.match(readerStyleSource, /grid-template-rows:\s*minmax\(0, 1fr\) 62px/);
});

test('application page remains available as the receiving vertical scroll owner', () => {
  const pageWrapRule = extractRule(shellStyleSource, '.app-shell .page-wrap');

  assert.match(pageWrapRule, /height:\s*calc\(100vh - var\(--topbar-height\)\)/);
  assert.match(pageWrapRule, /overflow-y:\s*auto/);
  assert.match(pageWrapRule, /overflow-x:\s*hidden/);
  assert.doesNotMatch(pageWrapRule, /overscroll-behavior(?:-y)?:\s*(?:contain|none)/);
});

test('animation leaves remain inert and do not receive the resting scroll owner', () => {
  const restingPageSource = readerSource.match(
    /const renderReaderPage[\s\S]*?const renderTurningLeaf/
  )?.[0] || '';
  const turningLeafSource = readerSource.match(
    /const renderTurningLeaf[\s\S]*?if \(totalPages === 0\)/
  )?.[0] || '';

  assert.doesNotMatch(restingPageSource, /aria-hidden="true"/);
  assert.doesNotMatch(restingPageSource, /\binert\b/);
  assert.match(turningLeafSource, /aria-hidden="true"/);
  assert.match(turningLeafSource, /\binert\b/);
  assert.match(turningLeafSource, /isAnimationCopy:\s*true/);
  assert.doesNotMatch(turningLeafSource, /learning-book__resting-page-body/);
  assert.doesNotMatch(
    bookViewSource.match(/function AnimationCopyPage[\s\S]*?\n}/)?.[0] || '',
    /book-content-scroll--interactive/
  );
});

test('nested content does not create a second vertical scrollbar in single or spread mode', () => {
  const restingPageScrollOwnerRules = readerStyleSource.match(
    /\.learning-book--single \.learning-book__resting-page-body,\s*\.learning-book--spread \.learning-book__resting-page-body\s*\{[\s\S]*?overflow-y:\s*auto[\s\S]*?\}/g
  ) || [];
  const interactiveContentRule = extractRule(
    learningNodeStyleSource,
    '.book-content-scroll--interactive'
  );
  const nestedRule = readerStyleSource.match(
    /\.learning-book__resting-page-body > \.book-content-scroll,[\s\S]*?\{([\s\S]*?)\}/
  )?.[1] || '';
  const nestedInnerRule = extractRule(
    readerStyleSource,
    '.learning-book__resting-page-body > .book-content-scroll > .book-content-inner'
  );
  const assessmentGridRule = extractRule(assessmentStyleSource, '.topic-assessment-grid');

  assert.match(interactiveContentRule, /overflow-y:\s*auto/);
  assert.match(interactiveContentRule, /overflow-x:\s*hidden/);
  assert.match(interactiveContentRule, /overscroll-behavior-y:\s*auto/);
  assert.match(interactiveContentRule, /touch-action:\s*pan-y/);
  assert.doesNotMatch(interactiveContentRule, /overscroll-behavior:\s*(?:contain|none)/);
  assert.equal(restingPageScrollOwnerRules.length, 1);
  assert.match(nestedRule, /flex:\s*0 0 auto/);
  assert.match(nestedRule, /height:\s*auto/);
  assert.match(nestedRule, /min-height:\s*0/);
  assert.match(nestedRule, /max-height:\s*none/);
  assert.match(nestedRule, /overflow:\s*visible/);
  assert.match(nestedRule, /overscroll-behavior:\s*auto/);
  assert.match(nestedRule, /-webkit-overflow-scrolling:\s*auto/);
  assert.match(nestedRule, /touch-action:\s*auto/);
  assert.match(nestedInnerRule, /min-height:\s*0/);
  assert.doesNotMatch(nestedRule, /overflow-y:\s*auto/);
  assert.doesNotMatch(assessmentGridRule, /overflow-y\s*:/);
  assert.doesNotMatch(assessmentGridRule, /overscroll-behavior\s*:/);
  assert.doesNotMatch(assessmentGridRule, /-webkit-overflow-scrolling\s*:/);
});

test('vertical intent cancels swipe tracking while horizontal turns stay thresholded', () => {
  assert.match(readerSource, /const SWIPE_DISTANCE_PX = 52/);
  assert.match(readerSource, /const SWIPE_DIRECTION_RATIO = 1\.25/);
  assert.match(readerSource, /const hasVerticalIntent =/);
  assert.match(readerSource, /if \(hasVerticalIntent\) swipeRef\.current = null/);
  assert.match(readerSource, /onPointerMove=\{handlePointerMove\}/);
  assert.match(readerSource, /isInteractiveTarget\(event\.target\)/);
  assert.doesNotMatch(readerSource, /preventDefault\(/);
  assert.doesNotMatch(readerSource, /setPointerCapture\(/);
  assert.match(readerStyleSource, /\.learning-book__volume[\s\S]*?touch-action:\s*pan-y/);
});
