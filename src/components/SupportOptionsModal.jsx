import { useEffect, useRef } from 'react';

import { getEnabledSupportMethods, trackSupportEvent } from '../services/supportPaymentService.js';
import { siteConfig } from '../config/siteConfig.js';

export default function SupportOptionsModal({ onClose }) {
  const closeButtonRef = useRef(null);
  const methods = getEnabledSupportMethods();

  useEffect(() => {
    trackSupportEvent('support_modal_opened');
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose();
  }

  function handleOptionSelect(method) {
    trackSupportEvent('support_option_selected', { methodId: method.id });
    trackSupportEvent(`${method.id}_selected`, { methodId: method.id });
    window.open(method.url, '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <div
      aria-labelledby="support-options-title"
      aria-modal="true"
      className="support-modal-backdrop"
      onMouseDown={handleBackdropClick}
      role="dialog"
    >
      <section className="support-modal-card">
        <button
          aria-label="Close support options"
          className="support-modal-close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          ×
        </button>

        <span className="mini-label">Support the work</span>
        <h2 id="support-options-title">Help Create More Learning Content</h2>
        <p>{siteConfig.support.intro}</p>

        <div className="support-contribution-list" aria-label="Suggested contribution levels">
          <span>$1 — Support a learner</span>
          <span>$5 — Help fund new questions</span>
          <span>$10 — Help fund a new topic</span>
          <span>Custom amount</span>
        </div>

        <div className="support-method-list">
          {methods.map((method) => (
            <button
              className="support-method-card"
              key={method.id}
              onClick={() => handleOptionSelect(method)}
              type="button"
            >
              <span className="support-method-label">{method.label}</span>
              <span className="support-method-description">{method.description}</span>
              <span className="support-method-action">Continue →</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
