import { useCallback, useEffect, useRef, useState } from 'react';
import '../../styles/learning-book-reader.css';

const SPREAD_MIN_WIDTH_PX = 900;
const TURN_FALLBACK_MS = 850;
const SWIPE_DISTANCE_PX = 52;
const SWIPE_DIRECTION_RATIO = 1.25;

const INTERACTIVE_TARGET_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'audio',
  'video',
  'details',
  'summary',
  '[contenteditable="true"]',
  '[role="button"]',
  '[role="link"]',
  '[data-no-page-turn]'
].join(',');

function isInteractiveTarget(target) {
  return target instanceof Element && Boolean(target.closest(INTERACTIVE_TARGET_SELECTOR));
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getSpreadAnchor(pageIndex) {
  return Math.floor(pageIndex / 2) * 2;
}

function getLastSpreadAnchor(totalPages) {
  return Math.max(0, getSpreadAnchor(totalPages - 1));
}

function BlankPage({ side }) {
  return (
    <div
      className={`learning-book__blank learning-book__blank--${side}`}
      aria-hidden="true"
    />
  );
}

export default function LearningBookReader({
  pages,
  currentPageIndex,
  onPageChange,
  bookTitle,
  renderPage,
  resetKey
}) {
  const [isSpread, setIsSpread] = useState(false);
  const [turn, setTurn] = useState(null);
  const readerRef = useRef(null);
  const turnTimerRef = useRef(null);
  const isTurningRef = useRef(false);
  const pendingTargetRef = useRef(null);
  const swipeRef = useRef(null);

  const totalPages = pages.length;
  const clampedPageIndex = totalPages > 0
    ? Math.min(Math.max(currentPageIndex, 0), totalPages - 1)
    : 0;
  const activeIndex = isSpread ? getSpreadAnchor(clampedPageIndex) : clampedPageIndex;
  const rightPageIndex = isSpread ? activeIndex + 1 : null;
  const visibleLeftIndex = turn?.isSpread
    ? turn.direction === 'next' ? turn.sourceIndex : turn.targetIndex
    : activeIndex;
  const visibleRightIndex = turn?.isSpread
    ? turn.direction === 'next' ? turn.targetIndex + 1 : turn.sourceIndex + 1
    : rightPageIndex;
  const lastVisibleIndex = isSpread
    ? Math.min(activeIndex + 1, totalPages - 1)
    : activeIndex;
  const canGoPrevious = activeIndex > 0;
  const canGoNext = lastVisibleIndex < totalPages - 1;

  const clearTurnTimer = useCallback(() => {
    if (turnTimerRef.current !== null) {
      window.clearTimeout(turnTimerRef.current);
      turnTimerRef.current = null;
    }
  }, []);

  const finishTurn = useCallback(() => {
    clearTurnTimer();
    isTurningRef.current = false;
    pendingTargetRef.current = null;
    setTurn(null);
  }, [clearTurnTimer]);

  const requestPageTurn = useCallback((direction) => {
    if (isTurningRef.current || totalPages === 0) return;

    const step = isSpread ? 2 : 1;
    const lastAnchor = isSpread ? getLastSpreadAnchor(totalPages) : totalPages - 1;
    const targetIndex = direction === 'next'
      ? Math.min(activeIndex + step, lastAnchor)
      : Math.max(activeIndex - step, 0);

    if (targetIndex === activeIndex) return;

    if (prefersReducedMotion()) {
      onPageChange(targetIndex);
      return;
    }

    isTurningRef.current = true;
    pendingTargetRef.current = targetIndex;
    setTurn({
      direction,
      isSpread,
      sourceIndex: activeIndex,
      targetIndex
    });
    onPageChange(targetIndex);

    clearTurnTimer();
    turnTimerRef.current = window.setTimeout(finishTurn, TURN_FALLBACK_MS);
  }, [
    activeIndex,
    clearTurnTimer,
    finishTurn,
    isSpread,
    onPageChange,
    totalPages
  ]);

  useEffect(() => {
    const reader = readerRef.current;
    if (!reader || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const nextIsSpread = entry.contentRect.width >= SPREAD_MIN_WIDTH_PX;
      setIsSpread((currentIsSpread) => (
        currentIsSpread === nextIsSpread ? currentIsSpread : nextIsSpread
      ));
    });

    observer.observe(reader);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    finishTurn();
    swipeRef.current = null;
  }, [finishTurn, isSpread, resetKey]);

  useEffect(() => {
    if (isSpread) {
      const spreadAnchor = getSpreadAnchor(clampedPageIndex);
      if (spreadAnchor !== currentPageIndex) onPageChange(spreadAnchor);
    }
  }, [clampedPageIndex, currentPageIndex, isSpread, onPageChange]);

  useEffect(() => {
    if (turn && pendingTargetRef.current !== null && currentPageIndex !== pendingTargetRef.current) {
      finishTurn();
    }
  }, [currentPageIndex, finishTurn, turn]);

  useEffect(() => {
    return () => clearTurnTimer();
  }, [clearTurnTimer]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.defaultPrevented
        || event.altKey
        || event.ctrlKey
        || event.metaKey
        || isInteractiveTarget(event.target)
      ) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        requestPageTurn('previous');
      } else if (event.key === 'ArrowRight') {
        requestPageTurn('next');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [requestPageTurn]);

  const handlePointerDown = (event) => {
    if (isTurningRef.current || isInteractiveTarget(event.target)) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    swipeRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY
    };
  };

  const handlePointerUp = (event) => {
    const swipe = swipeRef.current;
    swipeRef.current = null;

    if (!swipe || swipe.pointerId !== event.pointerId || isTurningRef.current) return;

    const deltaX = event.clientX - swipe.startX;
    const deltaY = event.clientY - swipe.startY;
    const isHorizontalSwipe = Math.abs(deltaX) >= SWIPE_DISTANCE_PX
      && Math.abs(deltaX) > Math.abs(deltaY) * SWIPE_DIRECTION_RATIO;

    if (!isHorizontalSwipe) return;
    requestPageTurn(deltaX < 0 ? 'next' : 'previous');
  };

  const handlePointerCancel = () => {
    swipeRef.current = null;
  };

  const handleTurnAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return;
    finishTurn();
  };

  const renderReaderPage = (pageIndex, side, isAnimationCopy = false) => {
    if (pageIndex < 0 || pageIndex >= totalPages) return <BlankPage side={side} />;

    return (
      <article className={`learning-book__page learning-book__page--${side}`}>
        <div className="learning-book__page-content">
          {renderPage(pages[pageIndex], {
            pageIndex,
            pageNumber: pageIndex + 1,
            totalPages,
            isAnimationCopy
          })}
        </div>
      </article>
    );
  };

  const renderTurningLeaf = () => {
    if (!turn) return null;

    if (!turn.isSpread) {
      const sourcePage = pages[turn.sourceIndex];
      const targetPage = pages[turn.targetIndex];
      return (
        <div
          className={`learning-book__leaf learning-book__leaf--single learning-book__leaf--${turn.direction}`}
          aria-hidden="true"
          inert
          onAnimationEnd={handleTurnAnimationEnd}
        >
          <div className="learning-book__leaf-face learning-book__leaf-face--front">
            <div className="learning-book__page-content">
              {renderPage(sourcePage, {
                pageIndex: turn.sourceIndex,
                pageNumber: turn.sourceIndex + 1,
                totalPages,
                isAnimationCopy: true
              })}
            </div>
          </div>
          <div className="learning-book__leaf-face learning-book__leaf-face--back">
            <div className="learning-book__page-content">
              {renderPage(targetPage, {
                pageIndex: turn.targetIndex,
                pageNumber: turn.targetIndex + 1,
                totalPages,
                isAnimationCopy: true
              })}
            </div>
          </div>
        </div>
      );
    }

    const turningPageIndex = turn.direction === 'next'
      ? Math.min(turn.sourceIndex + 1, totalPages - 1)
      : turn.sourceIndex;
    const turningBackIndex = turn.direction === 'next'
      ? turn.targetIndex
      : Math.min(turn.targetIndex + 1, totalPages - 1);

    return (
      <div
        className={`learning-book__leaf learning-book__leaf--spread learning-book__leaf--${turn.direction}`}
        aria-hidden="true"
        inert
        onAnimationEnd={handleTurnAnimationEnd}
      >
        <div className="learning-book__leaf-face learning-book__leaf-face--front">
          <div className="learning-book__page-content">
            {renderPage(pages[turningPageIndex], {
              pageIndex: turningPageIndex,
              pageNumber: turningPageIndex + 1,
              totalPages,
              isAnimationCopy: true
            })}
          </div>
        </div>
        <div className="learning-book__leaf-face learning-book__leaf-face--back">
          <div className="learning-book__page-content">
            {renderPage(pages[turningBackIndex], {
              pageIndex: turningBackIndex,
              pageNumber: turningBackIndex + 1,
              totalPages,
              isAnimationCopy: true
            })}
          </div>
        </div>
      </div>
    );
  };

  if (totalPages === 0) return null;

  const indicatorText = isSpread && rightPageIndex < totalPages
    ? `Pages ${activeIndex + 1}–${rightPageIndex + 1} of ${totalPages}`
    : `Page ${activeIndex + 1} of ${totalPages}`;

  return (
    <section
      ref={readerRef}
      className={`learning-book ${isSpread ? 'learning-book--spread' : 'learning-book--single'}`}
      aria-label={`${bookTitle || 'Learning material'} book reader`}
    >
      <div className="learning-book__stage">
        <div
          className="learning-book__volume"
          role="group"
          aria-roledescription="book"
          aria-label={bookTitle || 'Learning material'}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div className="learning-book__pages">
            <div className="learning-book__gutter" aria-hidden="true" />
            {renderReaderPage(visibleLeftIndex, 'left')}
            {isSpread && renderReaderPage(visibleRightIndex, 'right')}
            {renderTurningLeaf()}
          </div>

          <nav className="learning-book__controls" aria-label="Book page controls">
            <button
              className="learning-book__control"
              type="button"
              onClick={() => requestPageTurn('previous')}
              disabled={!canGoPrevious || Boolean(turn)}
            >
              <span aria-hidden="true">←</span>
              <span>Previous</span>
            </button>

            <span className="learning-book__indicator" aria-label={indicatorText}>
              {indicatorText}
            </span>

            <button
              className="learning-book__control learning-book__control--primary"
              type="button"
              onClick={() => requestPageTurn('next')}
              disabled={!canGoNext || Boolean(turn)}
            >
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </nav>
        </div>
      </div>

      <p className="learning-book__announcement" aria-live="polite" aria-atomic="true">
        {indicatorText}
      </p>
    </section>
  );
}