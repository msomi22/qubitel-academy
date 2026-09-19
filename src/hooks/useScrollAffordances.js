import { useEffect } from 'react';

const SCROLLABLE_OVERFLOW = new Set(['auto', 'scroll', 'overlay']);
const OVERFLOW_EPSILON = 3;

function updateAffordance(element) {
  const canScroll = element.scrollHeight > element.clientHeight + OVERFLOW_EPSILON;

  element.classList.toggle('vertical-scroll-affordance', canScroll);

  if (!canScroll) {
    delete element.dataset.scrollUp;
    delete element.dataset.scrollDown;
    return;
  }

  element.dataset.scrollUp = element.scrollTop > OVERFLOW_EPSILON ? 'true' : 'false';
  element.dataset.scrollDown =
    element.scrollTop + element.clientHeight < element.scrollHeight - OVERFLOW_EPSILON
      ? 'true'
      : 'false';
}

export default function useScrollAffordances() {
  useEffect(() => {
    const observed = new Set();
    let frameId = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => updateAffordance(target));
    });

    const scan = () => {
      frameId = 0;

      document.querySelectorAll('*').forEach((element) => {
        if (!(element instanceof HTMLElement)) return;
        if (element.dataset.scrollAffordance === 'off') return;

        const overflowY = window.getComputedStyle(element).overflowY;
        if (!SCROLLABLE_OVERFLOW.has(overflowY)) return;

        if (!observed.has(element)) {
          observed.add(element);
          resizeObserver.observe(element);
        }

        updateAffordance(element);
      });
    };

    const scheduleScan = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(scan);
    };

    const handleScroll = (event) => {
      if (event.target instanceof HTMLElement) {
        updateAffordance(event.target);
      }
    };

    const mutationObserver = new MutationObserver(scheduleScan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', scheduleScan);
    scheduleScan();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', scheduleScan);

      observed.forEach((element) => {
        element.classList.remove('vertical-scroll-affordance');
        delete element.dataset.scrollUp;
        delete element.dataset.scrollDown;
      });
    };
  }, []);
}
