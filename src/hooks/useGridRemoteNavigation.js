import { useCallback, useEffect, useRef } from 'react';

const ARROW_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);
const ACTIVATE_KEYS = new Set(['Enter', ' ', 'Spacebar', 'NumpadEnter']);
const GRID_ITEM_SELECTOR = '[data-grid-nav-item="true"]';
const ROW_THRESHOLD_PX = 12;
const SCROLL_PADDING_PX = 18;
const MAX_SCROLL_BOTTOM_PADDING_PX = 110;
let nextGridId = 1;
let activeGridId = 0;

function isElement(value) {
  return value instanceof Element;
}

function isTextEditingTarget(target) {
  if (!isElement(target)) return false;
  return Boolean(target.closest('input, textarea, select, [contenteditable="true"], [role="textbox"], [role="combobox"], [role="listbox"], [role="slider"]'));
}

function isScrollable(node, axis) {
  if (!node) return false;
  const style = window.getComputedStyle(node);
  const overflow = axis === 'y' ? style.overflowY : style.overflowX;
  if (!/(auto|scroll|overlay)/.test(overflow)) return false;
  return axis === 'y'
    ? node.scrollHeight - node.clientHeight > 2
    : node.scrollWidth - node.clientWidth > 2;
}

function findScrollContainer(node, axis) {
  let parent = node?.parentElement || null;
  while (parent) {
    if (isScrollable(parent, axis)) return parent;
    parent = parent.parentElement;
  }

  const documentScroller = document.scrollingElement || document.documentElement;
  return isScrollable(documentScroller, axis) ? documentScroller : null;
}

function scrollElementBy(scroller, delta) {
  if (!scroller) return false;

  const beforeTop = scroller.scrollTop;
  const beforeLeft = scroller.scrollLeft;
  scroller.scrollBy({ ...delta, behavior: 'auto' });

  return Math.abs(scroller.scrollTop - beforeTop) > 0 || Math.abs(scroller.scrollLeft - beforeLeft) > 0;
}

function scrollItemIntoView(node) {
  if (!node) return;

  const yScroller = findScrollContainer(node, 'y');
  const xScroller = findScrollContainer(node, 'x');

  if (yScroller) {
    const itemRect = node.getBoundingClientRect();
    const scrollerRect = yScroller === document.scrollingElement || yScroller === document.documentElement
      ? { top: 0, bottom: window.innerHeight }
      : yScroller.getBoundingClientRect();
    const bottomPadding = Math.min(
      MAX_SCROLL_BOTTOM_PADDING_PX,
      Math.max(SCROLL_PADDING_PX, Math.round(yScroller.clientHeight * 0.14))
    );

    if (itemRect.top < scrollerRect.top + SCROLL_PADDING_PX) {
      scrollElementBy(yScroller, { top: itemRect.top - scrollerRect.top - SCROLL_PADDING_PX });
    } else if (itemRect.bottom > scrollerRect.bottom - bottomPadding) {
      scrollElementBy(yScroller, { top: itemRect.bottom - scrollerRect.bottom + bottomPadding });
    }
  }

  if (xScroller) {
    const itemRect = node.getBoundingClientRect();
    const scrollerRect = xScroller === document.scrollingElement || xScroller === document.documentElement
      ? { left: 0, right: window.innerWidth }
      : xScroller.getBoundingClientRect();

    if (itemRect.left < scrollerRect.left + SCROLL_PADDING_PX) {
      scrollElementBy(xScroller, { left: itemRect.left - scrollerRect.left - SCROLL_PADDING_PX });
    } else if (itemRect.right > scrollerRect.right - SCROLL_PADDING_PX) {
      scrollElementBy(xScroller, { left: itemRect.right - scrollerRect.right + SCROLL_PADDING_PX });
    }
  }
}

function scrollToward(node, key) {
  const axis = key === 'ArrowUp' || key === 'ArrowDown' ? 'y' : 'x';
  const scroller = findScrollContainer(node, axis);
  if (!scroller) return false;

  const size = axis === 'y' ? scroller.clientHeight : scroller.clientWidth;
  const amount = Math.max(120, Math.round(size * 0.65));
  const direction = key === 'ArrowUp' || key === 'ArrowLeft' ? -1 : 1;

  return axis === 'y'
    ? scrollElementBy(scroller, { top: direction * amount })
    : scrollElementBy(scroller, { left: direction * amount });
}

function visibleItems(refs) {
  return refs
    .map((node, index) => {
      if (!node || node.disabled || !node.getClientRects().length) return null;
      const rect = node.getBoundingClientRect();
      return {
        index,
        node,
        rect,
        centerX: rect.left + rect.width / 2
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a.rect.top - b.rect.top) || (a.rect.left - b.rect.left));
}

function groupRows(items) {
  return items.reduce((rows, item) => {
    const row = rows.find((candidate) => Math.abs(candidate.top - item.rect.top) <= ROW_THRESHOLD_PX);
    if (row) {
      row.items.push(item);
      row.top = Math.min(row.top, item.rect.top);
      return rows;
    }

    rows.push({ top: item.rect.top, items: [item] });
    return rows;
  }, []).map((row) => ({
    ...row,
    items: row.items.sort((a, b) => a.rect.left - b.rect.left)
  }));
}

function closestItemInRow(row, current) {
  return row.items.reduce((closest, item) => {
    if (!closest) return item;
    return Math.abs(item.centerX - current.centerX) < Math.abs(closest.centerX - current.centerX)
      ? item
      : closest;
  }, null);
}

function findCurrentItem(items, target) {
  if (!isElement(target)) return null;
  return items.find((item) => item.node === target || item.node.contains(target)) || null;
}

function nextIndexForKey(items, current, key) {
  const rows = groupRows(items);
  const rowIndex = rows.findIndex((row) => row.items.some((item) => item.index === current.index));
  if (rowIndex < 0) return current.index;

  const row = rows[rowIndex];
  const columnIndex = row.items.findIndex((item) => item.index === current.index);

  const sequentialIndex = key === 'ArrowRight' || key === 'ArrowDown'
    ? current.index + 1
    : current.index - 1;
  const sequentialItem = items.find((item) => item.index === sequentialIndex);
  const fallbackIndex = sequentialItem?.index ?? current.index;

  if (key === 'ArrowLeft') return row.items[columnIndex - 1]?.index ?? fallbackIndex;
  if (key === 'ArrowRight') return row.items[columnIndex + 1]?.index ?? fallbackIndex;
  if (key === 'ArrowUp') return closestItemInRow(rows[rowIndex - 1] || { items: [] }, current)?.index ?? fallbackIndex;
  if (key === 'ArrowDown') return closestItemInRow(rows[rowIndex + 1] || { items: [] }, current)?.index ?? fallbackIndex;

  return current.index;
}

export default function useGridRemoteNavigation({ itemCount, initialIndex = 0, autoFocus = true, onNavigate = null } = {}) {
  const itemRefs = useRef([]);
  const containerRef = useRef(null);
  const hasAutoFocusedRef = useRef(false);
  const activeIndexRef = useRef(Math.max(0, initialIndex));
  const gridIdRef = useRef(0);

  if (!gridIdRef.current) {
    gridIdRef.current = nextGridId;
    nextGridId += 1;
  }

  const markActiveGrid = useCallback(() => {
    activeGridId = gridIdRef.current;
  }, []);

  const getItemRef = useCallback((index) => (node) => {
    itemRefs.current[index] = node;
  }, []);

  const getItemIndexFromTarget = useCallback((target) => {
    if (!isElement(target)) return -1;
    const itemNode = target.closest(GRID_ITEM_SELECTOR);
    return itemRefs.current.findIndex((node) => node && (node === itemNode || node.contains(itemNode)));
  }, []);

  const setContainerRef = useCallback((node) => {
    containerRef.current = node;
  }, []);

  const focusItem = useCallback((index, options = {}) => {
    const node = itemRefs.current[index];
    if (!node) return false;

    const { preventScroll = true, scroll = true } = options;
    try {
      node.focus({ preventScroll });
    } catch {
      node.focus();
    }

    activeIndexRef.current = index;
    markActiveGrid();

    if (scroll) {
      scrollItemIntoView(node);
      window.requestAnimationFrame(() => scrollItemIntoView(node));
    }

    return true;
  }, [markActiveGrid]);

  const handleNavigationKey = useCallback((event, { documentLevel = false } = {}) => {
    if (isTextEditingTarget(event.target) || isTextEditingTarget(document.activeElement)) return;

    const items = visibleItems(itemRefs.current);
    if (!items.length) return;

    if (ACTIVATE_KEYS.has(event.key)) {
      const eventTargetItem = findCurrentItem(items, event.target);
      if (eventTargetItem && !documentLevel) return;

      const activeItem = findCurrentItem(items, document.activeElement)
        || items.find((item) => item.index === activeIndexRef.current)
        || items[0];

      if (!activeItem || eventTargetItem?.index === activeItem.index) return;

      event.preventDefault();
      markActiveGrid();
      activeItem.node.click();
      return;
    }

    if (!ARROW_KEYS.has(event.key)) return;

    const current = findCurrentItem(items, event.target)
      || findCurrentItem(items, document.activeElement)
      || items.find((item) => item.index === activeIndexRef.current)
      || items[0];
    if (!current) return;

    const nextIndex = nextIndexForKey(items, current, event.key);
    event.preventDefault();
    markActiveGrid();
    if (nextIndex === current.index) {
      scrollToward(current.node, event.key);
      return;
    }

    if (focusItem(nextIndex) && typeof onNavigate === 'function') {
      onNavigate(nextIndex, event);
    }
  }, [focusItem, markActiveGrid, onNavigate]);

  const onKeyDown = useCallback((event) => {
    handleNavigationKey(event);
  }, [handleNavigationKey]);

  const onFocusCapture = useCallback((event) => {
    const index = getItemIndexFromTarget(event.target);
    if (index < 0) return;
    activeIndexRef.current = index;
    markActiveGrid();
  }, [getItemIndexFromTarget, markActiveGrid]);

  const onPointerMove = useCallback((event) => {
    if (event.pointerType === 'touch') return;
    const index = getItemIndexFromTarget(event.target);
    if (index < 0 || index === activeIndexRef.current) return;
    focusItem(index, { preventScroll: true, scroll: false });
  }, [focusItem, getItemIndexFromTarget]);

  useEffect(() => {
    itemRefs.current.length = itemCount || 0;
    activeIndexRef.current = Math.min(activeIndexRef.current, Math.max((itemCount || 1) - 1, 0));
  }, [itemCount]);

  useEffect(() => {
    if (!autoFocus || hasAutoFocusedRef.current || !itemCount) return undefined;

    const frame = window.requestAnimationFrame(() => {
      if (focusItem(initialIndex, { preventScroll: true, scroll: false })) {
        hasAutoFocusedRef.current = true;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [autoFocus, focusItem, initialIndex, itemCount]);

  useEffect(() => {
    function handleDocumentKeyDown(event) {
      if (event.defaultPrevented) return;

      const container = containerRef.current;
      if (!container) return;

      const targetIsInGrid = isElement(event.target) && container.contains(event.target);
      const activeElement = document.activeElement;
      const activeIsInGrid = isElement(activeElement) && container.contains(activeElement);

      if (activeGridId !== gridIdRef.current && !targetIsInGrid && !activeIsInGrid) return;
      handleNavigationKey(event, { documentLevel: true });
    }

    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
      if (activeGridId === gridIdRef.current) activeGridId = 0;
    };
  }, [handleNavigationKey]);

  return {
    focusItem,
    getItemRef,
    gridProps: {
      'data-tv-grid': 'true',
      onFocusCapture,
      onKeyDown,
      onPointerMove,
      ref: setContainerRef
    }
  };
}
