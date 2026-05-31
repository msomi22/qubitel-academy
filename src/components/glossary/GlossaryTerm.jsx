import { useId, useState } from 'react';

import GlossaryPopover from './GlossaryPopover.jsx';

export default function GlossaryTerm({ children, term }) {
  const generatedId = useId();
  const popoverId = `glossary-popover-${generatedId.replace(/:/g, '')}`;
  const [open, setOpen] = useState(false);

  if (!term) return <>{children}</>;

  function openPopover() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      close();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPopover();
    }
  }

  return (
    <span className={`glossary-term${open ? ' glossary-term-open' : ''}`} onMouseLeave={close}>
      <button
        aria-expanded={open}
        aria-describedby={open ? popoverId : undefined}
        className="glossary-term-button"
        onBlur={close}
        onClick={openPopover}
        onFocus={openPopover}
        onKeyDown={handleKeyDown}
        onMouseEnter={openPopover}
        type="button"
      >
        {children}
      </button>
      {open ? <GlossaryPopover id={popoverId} onClose={close} term={term} /> : null}
    </span>
  );
}
