import { useEffect, useRef } from 'react';

const ARROW_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);
const ACTIVATE_KEYS = new Set(['Enter', ' ', 'Spacebar', 'NumpadEnter']);
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="link"]:not([aria-disabled="true"])',
  '[role="tab"]:not([aria-disabled="true"])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');
const POINTER_FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="link"]:not([aria-disabled="true"])',
  '[role="tab"]:not([aria-disabled="true"])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');
const EDITING_SELECTOR = 'input, textarea, select, [contenteditable="true"], [role="textbox"], [role="combobox"], [role="listbox"], [role="slider"]';
const SKIP_CONTAINER_SELECTOR = '[data-tv-remote-skip], [data-tv-grid], [inert]';
const HIDDEN_ANCESTOR_SELECTOR = '[aria-hidden="true"], [inert]';
const FOCUS_ATTR = 'data-tv-remote-focus';

function isElement(value) {
  return value instanceof Element;
}

function isEditableTarget(target) {
  return isElement(target) && Boolean(target.closest(EDITING_SELECTOR));
}

function isDisabled(node) {
  return Boolean(node.disabled || node.getAttribute('aria-disabled') === 'true');
}

function isVisible(node) {
  if (!node || isDisabled(node) || node.closest(SKIP_CONTAINER_SELECTOR) || node.closest(HIDDEN_ANCESTOR_SELECTOR)) return false;
  const style = window.getComputedStyle(node);
  if (style.visibility === 'hidden' || style.display === 'none') return false;
  const rect = node.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && node.getClientRects().length > 0;
}

function center(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function candidateScore(currentRect, candidateRect, key) {
  const currentCenter = center(currentRect);
  const candidateCenter = center(candidateRect);
  const dx = candidateCenter.x - currentCenter.x;
  const dy = candidateCenter.y - currentCenter.y;

  if (key === 'ArrowRight' && dx <= 4) return null;
  if (key === 'ArrowLeft' && dx >= -4) return null;
  if (key === 'ArrowDown' && dy <= 4) return null;
  if (key === 'ArrowUp' && dy >= -4) return null;

  const major = key === 'ArrowRight' || key === 'ArrowLeft' ? Math.abs(dx) : Math.abs(dy);
  const minor = key === 'ArrowRight' || key === 'ArrowLeft' ? Math.abs(dy) : Math.abs(dx);
  const overlap = key === 'ArrowRight' || key === 'ArrowLeft'
    ? Math.max(0, Math.min(currentRect.bottom, candidateRect.bottom) - Math.max(currentRect.top, candidateRect.top))
    : Math.max(0, Math.min(currentRect.right, candidateRect.right) - Math.max(currentRect.left, candidateRect.left));
  const overlapBonus = overlap > 0 ? Math.min(overlap, 80) : 0;

  return major * 10 + minor * 2 - overlapBonus;
}

function focusableItems() {
  return Array.from(document.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(isVisible)
    .map((node) => ({ node, rect: node.getBoundingClientRect() }));
}

function findCurrent(items, activeElement, lastFocused) {
  if (isElement(activeElement)) {
    const activeItem = items.find((item) => item.node === activeElement || item.node.contains(activeElement));
    if (activeItem) return activeItem;
  }

  if (isElement(lastFocused)) {
    const lastItem = items.find((item) => item.node === lastFocused || item.node.contains(lastFocused));
    if (lastItem) return lastItem;
  }

  return null;
}

function firstVisibleItem(items) {
  return [...items].sort((a, b) => (a.rect.top - b.rect.top) || (a.rect.left - b.rect.left))[0] || null;
}

function nextItem(items, current, key) {
  if (!current) return firstVisibleItem(items);

  return items
    .filter((item) => item.node !== current.node)
    .map((item) => ({ ...item, score: candidateScore(current.rect, item.rect, key) }))
    .filter((item) => item.score !== null)
    .sort((a, b) => a.score - b.score || a.rect.top - b.rect.top || a.rect.left - b.rect.left)[0] || null;
}

function markFocused(node) {
  document.querySelectorAll(`[${FOCUS_ATTR}="true"]`).forEach((item) => {
    if (item !== node) item.removeAttribute(FOCUS_ATTR);
  });

  if (node) node.setAttribute(FOCUS_ATTR, 'true');
}

function focusNode(node) {
  if (!node) return false;

  try {
    node.focus({ preventScroll: true });
  } catch {
    node.focus();
  }

  node.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  markFocused(node);
  return true;
}

export default function useTvRemoteNavigation() {
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    function handleFocusIn(event) {
      if (!isElement(event.target) || !isVisible(event.target)) return;
      lastFocusedRef.current = event.target;
      markFocused(event.target);
    }

    function handlePointerMove(event) {
      if (event.pointerType === 'touch' || !isElement(event.target)) return;
      if (event.target.closest(SKIP_CONTAINER_SELECTOR)) return;

      const target = event.target.closest(POINTER_FOCUSABLE_SELECTOR);
      if (!target || !isVisible(target) || target === document.activeElement) return;

      lastFocusedRef.current = target;
      focusNode(target);
    }

    function handleKeyDown(event) {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target) || isEditableTarget(document.activeElement)) return;
      if (isElement(event.target) && event.target.closest(SKIP_CONTAINER_SELECTOR)) return;
      if (isElement(document.activeElement) && document.activeElement.closest(SKIP_CONTAINER_SELECTOR)) return;

      if (ACTIVATE_KEYS.has(event.key)) {
        const activeElement = document.activeElement;
        if (!isElement(activeElement) || activeElement === document.body) {
          const target = lastFocusedRef.current;
          if (!target || !isVisible(target)) return;
          event.preventDefault();
          target.click();
        }
        return;
      }

      if (!ARROW_KEYS.has(event.key)) return;

      const items = focusableItems();
      if (!items.length) return;

      const current = findCurrent(items, document.activeElement, lastFocusedRef.current);
      const next = nextItem(items, current, event.key);
      if (!next || next.node === current?.node) return;

      event.preventDefault();
      lastFocusedRef.current = next.node;
      focusNode(next.node);
    }

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('keydown', handleKeyDown);
      markFocused(null);
    };
  }, []);
}
