import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useGridRemoteNavigation from '../../hooks/useGridRemoteNavigation.js';

const AUTO_READ_DEFAULT_SECONDS = 5;
const AUTO_READ_INTERVAL_OPTIONS = [2, 3, 5, 10, 15, 30];
const MIN_AUTO_READ_SECONDS = 2;
const MAX_AUTO_READ_SECONDS = 60;
const AUTO_READ_FOCUS_DELAY_MS = 400;

function normalizeAutoReadSeconds(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return AUTO_READ_DEFAULT_SECONDS;
  return Math.min(Math.max(Math.round(numericValue), MIN_AUTO_READ_SECONDS), MAX_AUTO_READ_SECONDS);
}

function safeLetters(block) {
  return Array.isArray(block?.letters)
    ? block.letters.filter((item) => item?.letter && item?.identifier && item?.phonetic)
    : [];
}

function stopAudio(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}

function AlphabetCard({ card, cardType, color, display, isActive, isAutoReading, itemRef, onPlay }) {
  const isIdentifier = cardType === 'identifier';
  const activityLabel = isAutoReading ? 'Auto Read' : isActive ? 'Playing' : '';
  const cardAriaLabel = isAutoReading ? `Reading now: ${card.label}` : card.ariaLabel;

  return (
    <button
      aria-current={isAutoReading ? 'true' : undefined}
      aria-label={cardAriaLabel}
      aria-pressed={isActive || isAutoReading}
      className={`alphabet-mastery-card alphabet-mastery-card--${cardType} ${isActive ? 'is-playing' : ''} ${isAutoReading ? 'is-auto-reading' : ''}`}
      data-grid-nav-item="true"
      onClick={() => onPlay(card)}
      ref={itemRef}
      style={{ '--alphabet-card-accent': color }}
      type="button"
    >
      {isAutoReading ? (
        <span className="alphabet-mastery-now-badge" aria-hidden="true">
          Reading now
        </span>
      ) : null}

      <span className="alphabet-mastery-card-visual" aria-hidden="true">
        {isIdentifier ? display : card.visual}
      </span>

      <span className="alphabet-mastery-card-label">{card.label}</span>

      <span className="alphabet-mastery-card-footer" aria-hidden="true">
        <span className="alphabet-mastery-sound-mark" />
        <span className="alphabet-mastery-playing-label">{activityLabel}</span>
      </span>
    </button>
  );
}

export default function AlphabetMasteryBlock({ block }) {
  const letters = useMemo(() => safeLetters(block), [block]);
  const audioRef = useRef(null);
  const isMountedRef = useRef(false);
  const autoReadPlayTimerRef = useRef(null);

  const [activeCardId, setActiveCardId] = useState('');
  const [playedCardIds, setPlayedCardIds] = useState(() => new Set());
  const [audioMessage, setAudioMessage] = useState('');

  const [autoReadStatus, setAutoReadStatus] = useState('idle');
  const [autoReadIndex, setAutoReadIndex] = useState(-1);
  const [autoReadIntervalSeconds, setAutoReadIntervalSeconds] = useState(() => normalizeAutoReadSeconds(block?.autoReadSeconds));
  const [autoReadSeconds, setAutoReadSeconds] = useState(autoReadIntervalSeconds);

  const totalCards = letters.length * 2;
  const progress = totalCards ? Math.round((playedCardIds.size / totalCards) * 100) : 0;

  const flattenedCards = useMemo(() => {
    return letters.flatMap((item) => [
      {
        card: item.identifier,
        cardType: 'identifier',
        color: item.color,
        display: item.display
      },
      {
        card: item.phonetic,
        cardType: 'phonetic',
        color: item.color,
        display: item.display
      }
    ]);
  }, [letters]);

  const autoReadIntervalOptions = useMemo(() => {
    return Array.from(new Set([...AUTO_READ_INTERVAL_OPTIONS, autoReadIntervalSeconds])).sort((a, b) => a - b);
  }, [autoReadIntervalSeconds]);

  const { focusItem, getItemRef, gridProps } = useGridRemoteNavigation({
    itemCount: totalCards,
    initialIndex: 0
  });

  const activeAutoReadItem = autoReadStatus !== 'idle' && autoReadIndex >= 0 ? flattenedCards[autoReadIndex] : null;
  const isAutoReadActive = autoReadStatus !== 'idle';
  const isAutoReadPaused = autoReadStatus === 'paused';

  const clearAutoReadPlayTimer = useCallback(() => {
    if (!autoReadPlayTimerRef.current) return;

    window.clearTimeout(autoReadPlayTimerRef.current);
    autoReadPlayTimerRef.current = null;
  }, []);

  const clearCurrentAudio = useCallback(() => {
    if (!audioRef.current) return;

    stopAudio(audioRef.current);
    audioRef.current = null;
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      clearAutoReadPlayTimer();
      clearCurrentAudio();
    };
  }, [clearAutoReadPlayTimer, clearCurrentAudio]);

  useEffect(() => {
    const nextSeconds = normalizeAutoReadSeconds(block?.autoReadSeconds);
    setAutoReadIntervalSeconds(nextSeconds);
    setAutoReadSeconds(nextSeconds);
  }, [block?.autoReadSeconds]);

  const playAlphabetCard = useCallback((card) => {
    clearCurrentAudio();

    if (!card?.audioSrc) {
      console.warn('Alphabet audio source missing', {
        cardId: card?.id,
        label: card?.label,
        audioFile: card?.audioFile,
        card
      });

      if (isMountedRef.current) {
        setActiveCardId('');
        setAudioMessage(`Audio is not available for ${card?.label || 'this card'}.`);
      }

      return;
    }

    const audio = new Audio(card.audioSrc);
    audio.preload = 'auto';
    audioRef.current = audio;

    setActiveCardId(card.id);
    setAudioMessage('');

    audio.addEventListener('ended', () => {
      if (!isMountedRef.current || audioRef.current !== audio) return;

      audioRef.current = null;
      setActiveCardId((current) => (current === card.id ? '' : current));
    }, { once: true });

    audio.addEventListener('error', () => {
      if (!isMountedRef.current || audioRef.current !== audio) return;

      audioRef.current = null;

      console.warn('Alphabet audio element error', {
        cardId: card.id,
        label: card.label,
        audioFile: card.audioFile,
        audioSrc: card.audioSrc,
        mediaError: audio.error
      });

      setActiveCardId((current) => (current === card.id ? '' : current));
      setAudioMessage(`Audio is not available for ${card.label}.`);
    }, { once: true });

    audio.load();

    audio.play()
      .then(() => {
        if (!isMountedRef.current) return;

        setPlayedCardIds((current) => {
          const next = new Set(current);
          next.add(card.id);
          return next;
        });
      })
      .catch((error) => {
        if (!isMountedRef.current || audioRef.current !== audio || error?.name === 'AbortError') return;

        audioRef.current = null;

        console.warn('Alphabet audio playback failed', {
          cardId: card.id,
          label: card.label,
          audioFile: card.audioFile,
          audioSrc: card.audioSrc,
          errorName: error?.name,
          errorMessage: error?.message,
          error
        });

        setActiveCardId('');
        setAudioMessage(`Audio could not play for ${card.label}.`);
      });
  }, [clearCurrentAudio]);

  const resetAutoReadState = useCallback(() => {
    clearAutoReadPlayTimer();
    setAutoReadStatus('idle');
    setAutoReadIndex(-1);
    setAutoReadSeconds(autoReadIntervalSeconds);
    setActiveCardId('');
    clearCurrentAudio();
  }, [autoReadIntervalSeconds, clearAutoReadPlayTimer, clearCurrentAudio]);

  const finishAutoRead = useCallback(() => {
    resetAutoReadState();
    setAudioMessage('Auto Read complete.');
    window.requestAnimationFrame(() => focusItem(0));
  }, [focusItem, resetAutoReadState]);

  function handleManualPlay(card) {
    if (isAutoReadActive) resetAutoReadState();
    playAlphabetCard(card);
  }

  function handleStartAutoRead() {
    if (!flattenedCards.length) return;

    clearAutoReadPlayTimer();
    setAudioMessage('');
    setAutoReadIndex(0);
    setAutoReadSeconds(autoReadIntervalSeconds);
    setAutoReadStatus('running');
  }

  function handleAutoReadIntervalChange(event) {
    const nextSeconds = normalizeAutoReadSeconds(event.target.value);

    setAutoReadIntervalSeconds(nextSeconds);
    setAutoReadSeconds(nextSeconds);
  }

  function handlePauseAutoRead() {
    if (!isAutoReadActive || isAutoReadPaused) return;

    clearAutoReadPlayTimer();
    clearCurrentAudio();
    setActiveCardId('');
    setAutoReadStatus('paused');
    setAudioMessage('Auto Read paused.');
  }

  function handleResumeAutoRead() {
    if (!isAutoReadPaused) return;

    setAudioMessage('');
    setAutoReadStatus('running');
  }

  function handleStopAutoRead() {
    const focusIndex = autoReadIndex >= 0 ? autoReadIndex : 0;

    resetAutoReadState();
    setAudioMessage('Auto Read stopped.');
    window.requestAnimationFrame(() => focusItem(focusIndex));
  }

  useEffect(() => {
    if (autoReadStatus === 'idle') return;

    if (!flattenedCards.length) {
      resetAutoReadState();
      return;
    }

    if (autoReadIndex >= flattenedCards.length) {
      finishAutoRead();
    }
  }, [autoReadIndex, autoReadStatus, finishAutoRead, flattenedCards.length, resetAutoReadState]);

  useEffect(() => {
    if (autoReadStatus !== 'running' || autoReadIndex < 0) return undefined;

    const item = flattenedCards[autoReadIndex];
    if (!item?.card) return undefined;

    clearAutoReadPlayTimer();

    focusItem(autoReadIndex);
    setActiveCardId(item.card.id);

    const cardToRead = item.card;
    const indexToRead = autoReadIndex;

    autoReadPlayTimerRef.current = window.setTimeout(() => {
      if (!isMountedRef.current) return;
      if (autoReadStatus !== 'running') return;
      if (indexToRead !== autoReadIndex) return;

      playAlphabetCard(cardToRead);
    }, AUTO_READ_FOCUS_DELAY_MS);

    return () => {
      clearAutoReadPlayTimer();
    };
  }, [
    autoReadIndex,
    autoReadStatus,
    clearAutoReadPlayTimer,
    flattenedCards,
    focusItem,
    playAlphabetCard
  ]);

  useEffect(() => {
    if (autoReadStatus !== 'running' || !flattenedCards.length) return undefined;
  
    if (autoReadSeconds <= 0) {
      if (activeCardId) return undefined;
  
      if (autoReadIndex < flattenedCards.length - 1) {
        setAutoReadIndex((current) => Math.min(current + 1, flattenedCards.length - 1));
        setAutoReadSeconds(autoReadIntervalSeconds);
        return undefined;
      }
  
      finishAutoRead();
      return undefined;
    }
  
    const timeout = window.setTimeout(() => {
      if (!isMountedRef.current) return;
  
      setAutoReadSeconds((current) => Math.max(0, current - 1));
    }, 1000);
  
    return () => window.clearTimeout(timeout);
  }, [
    activeCardId,
    autoReadIndex,
    autoReadIntervalSeconds,
    autoReadSeconds,
    autoReadStatus,
    finishAutoRead,
    flattenedCards.length
  ]);

  if (!letters.length) {
    return (
      <section className="workspace-block problem-rich-block alphabet-mastery-board alphabet-mastery-empty" role="note">
        <h4>{block?.title || 'Alphabet Mastery'}</h4>
        <p>Alphabet cards are not available.</p>
      </section>
    );
  }

  const autoReadStatusText = activeAutoReadItem
    ? `${isAutoReadPaused ? 'Paused on' : 'Auto Reading'} ${activeAutoReadItem.card.label}.`
    : '';

  return (
    <section className="workspace-block problem-rich-block alphabet-mastery-board" aria-labelledby="alphabet-mastery-heading">
      <div className="alphabet-mastery-hero">
        <div className="alphabet-mastery-heading">
          <span className="alphabet-mastery-back">English</span>
          <h4 id="alphabet-mastery-heading">{block?.title || 'Alphabet Mastery'}</h4>
          {block?.subtitle ? <p>{block.subtitle}</p> : null}
        </div>

        <div className="alphabet-mastery-mascot" aria-hidden="true">🦊</div>

        <div className="alphabet-mastery-progress" aria-label={`${progress}% complete`}>
          <span>My Progress</span>
          <strong>{progress}%</strong>
          <small>{playedCardIds.size} / {totalCards} cards</small>
        </div>
      </div>

      <div className="alphabet-mastery-toolbar">
        <span className="alphabet-mastery-tab is-active">A-Z</span>
        <span className="alphabet-mastery-toolbar-count">{totalCards} cards</span>
        <span className="alphabet-mastery-sound-status">Sound on</span>

        <div className="alphabet-mastery-auto-controls" aria-label="Auto Read controls">
          <label className="alphabet-mastery-interval-control">
            <span>Every</span>
            <select
              aria-label="Auto Read interval"
              value={autoReadIntervalSeconds}
              onChange={handleAutoReadIntervalChange}
            >
              {autoReadIntervalOptions.map((seconds) => (
                <option key={seconds} value={seconds}>{seconds}s</option>
              ))}
            </select>
          </label>

          {!isAutoReadActive ? (
            <button className="alphabet-mastery-auto-button" onClick={handleStartAutoRead} type="button">
              Auto Read
            </button>
          ) : (
            <>
              <span className="alphabet-mastery-auto-timer" role="timer" aria-live="polite">
                <strong>{isAutoReadPaused ? `Paused: ${autoReadSeconds}s` : `Auto Read: ${autoReadSeconds}s`}</strong>
                <small>Next card in {autoReadSeconds} seconds</small>
              </span>

              <button
                className="alphabet-mastery-auto-button alphabet-mastery-auto-button--secondary"
                onClick={isAutoReadPaused ? handleResumeAutoRead : handlePauseAutoRead}
                type="button"
              >
                {isAutoReadPaused ? 'Resume' : 'Pause'}
              </button>

              <button
                className="alphabet-mastery-auto-button alphabet-mastery-auto-button--secondary"
                onClick={handleStopAutoRead}
                type="button"
              >
                Stop
              </button>
            </>
          )}
        </div>
      </div>

      <div className="alphabet-mastery-grid" aria-label="Alphabet sound cards" {...gridProps}>
        {letters.map((item, index) => (
          <div className="alphabet-mastery-letter-row" style={{ '--alphabet-card-accent': item.color }} key={item.id}>
            <AlphabetCard
              card={item.identifier}
              cardType="identifier"
              color={item.color}
              display={item.display}
              isActive={activeCardId === item.identifier.id}
              isAutoReading={activeAutoReadItem?.card?.id === item.identifier.id}
              itemRef={getItemRef(index * 2)}
              onPlay={handleManualPlay}
            />

            <AlphabetCard
              card={item.phonetic}
              cardType="phonetic"
              color={item.color}
              display={item.display}
              isActive={activeCardId === item.phonetic.id}
              isAutoReading={activeAutoReadItem?.card?.id === item.phonetic.id}
              itemRef={getItemRef(index * 2 + 1)}
              onPlay={handleManualPlay}
            />
          </div>
        ))}
      </div>

      <div className="alphabet-mastery-status" role="status" aria-live="polite">
        {audioMessage || autoReadStatusText || (activeCardId ? 'Playing audio.' : '')}
      </div>
    </section>
  );
}