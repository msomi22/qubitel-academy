import { useCallback, useEffect, useRef } from 'react';

const ARROW_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);
const ROW_THRESHOLD_PX = 12;

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
  if (!(target instanceof Element)) return null;
  return items.find((item) => item.node === target || item.node.contains(target)) || null;
}

function nextIndexForKey(items, current, key) {
  const rows = groupRows(items);
  const rowIndex = rows.findIndex((row) => row.items.some((item) => item.index === current.index));
  if (rowIndex < 0) return current.index;

  const row = rows[rowIndex];
  const columnIndex = row.items.findIndex((item) => item.index === current.index);

  if (key === 'ArrowLeft') return row.items[columnIndex - 1]?.index ?? current.index;
  if (key === 'ArrowRight') return row.items[columnIndex + 1]?.index ?? current.index;
  if (key === 'ArrowUp') return closestItemInRow(rows[rowIndex - 1] || { items: [] }, current)?.index ?? current.index;
  if (key === 'ArrowDown') return closestItemInRow(rows[rowIndex + 1] || { items: [] }, current)?.index ?? current.index;

  return current.index;
}

export default function useGridRemoteNavigation({ itemCount, initialIndex = 0, autoFocus = true } = {}) {
  const itemRefs = useRef([]);
  const hasAutoFocusedRef = useRef(false);

  const getItemRef = useCallback((index) => (node) => {
    itemRefs.current[index] = node;
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

    if (scroll) {
      node.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    return true;
  }, []);

  const onKeyDown = useCallback((event) => {
    if (!ARROW_KEYS.has(event.key)) return;

    const items = visibleItems(itemRefs.current);
    const current = findCurrentItem(items, event.target);
    if (!current) return;

    const nextIndex = nextIndexForKey(items, current, event.key);
    if (nextIndex === current.index) return;

    event.preventDefault();
    focusItem(nextIndex);
  }, [focusItem]);

  useEffect(() => {
    itemRefs.current.length = itemCount || 0;
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

  return {
    focusItem,
    getItemRef,
    gridProps: {
      onKeyDown
    }
  };
}
