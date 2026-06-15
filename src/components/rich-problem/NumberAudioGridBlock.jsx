import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useGridRemoteNavigation from '../../hooks/useGridRemoteNavigation.js';

const AUTO_READ_DEFAULT_SECONDS = 5;
const AUTO_READ_INTERVAL_OPTIONS = [2, 3, 5, 10, 15, 30];
const MIN_AUTO_READ_SECONDS = 2;
const MAX_AUTO_READ_SECONDS = 60;

function normalizeAutoReadSeconds(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return AUTO_READ_DEFAULT_SECONDS;
  return Math.min(Math.max(Math.round(numericValue), MIN_AUTO_READ_SECONDS), MAX_AUTO_READ_SECONDS);
}

function safeNumbers(block) {
  return Array.isArray(block?.numbers)
    ? block.numbers.filter((item) => Number.isInteger(item?.number) && item?.label && item?.ariaLabel)
    : [];
}

function stopAudio(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}

function NumberAudioCard({ item, isActive, isAutoReading, itemRef, onPlay }) {
  const activityLabel = isAutoReading ? 'Auto Read' : isActive ? 'Playing' : '';
  const cardAriaLabel = isAutoReading ? `Reading now: ${item.label}` : item.ariaLabel;

  return (
    <button
      aria-current={isAutoReading ? 'true' : undefined}
      aria-label={cardAriaLabel}
      aria-pressed={isActive || isAutoReading}
      className={`number-audio-card ${isActive ? 'is-playing' : ''} ${isAutoReading ? 'is-auto-reading' : ''}`}
      data-grid-nav-item="true"
      onClick={() => onPlay(item)}
      ref={itemRef}
      style={{ '--number-card-accent': item.color }}
      type="button"
    >
      {isAutoReading ? <span className="number-audio-now-badge" aria-hidden="true">Reading now</span> : null}
      <span className="number-audio-card-value" aria-hidden="true">{item.display || item.number}</span>
      <span className="number-audio-card-label">{item.label}</span>
      <span className="number-audio-card-sound" aria-hidden="true">
        <span className="number-audio-sound-mark" />
        <span className="number-audio-playing-label">{activityLabel}</span>
      </span>
    </button>
  );
}

export default function NumberAudioGridBlock({ block }) {
  const numbers = useMemo(() => safeNumbers(block), [block]);
  const audioRef = useRef(null);
  const isMountedRef = useRef(false);

  const [activeNumberId, setActiveNumberId] = useState('');
  const [playedNumberIds, setPlayedNumberIds] = useState(() => new Set());
  const [audioMessage, setAudioMessage] = useState('');

  const [autoReadStatus, setAutoReadStatus] = useState('idle');
  const [autoReadIndex, setAutoReadIndex] = useState(-1);
  const [autoReadIntervalSeconds, setAutoReadIntervalSeconds] = useState(() => normalizeAutoReadSeconds(block?.autoReadSeconds));
  const [autoReadSeconds, setAutoReadSeconds] = useState(autoReadIntervalSeconds);

  const autoReadIntervalOptions = useMemo(() => {
    return Array.from(new Set([...AUTO_READ_INTERVAL_OPTIONS, autoReadIntervalSeconds])).sort((a, b) => a - b);
  }, [autoReadIntervalSeconds]);

  const totalCards = numbers.length;
  const progress = totalCards ? Math.round((playedNumberIds.size / totalCards) * 100) : 0;

  const { focusItem, getItemRef, gridProps } = useGridRemoteNavigation({
    itemCount: totalCards,
    initialIndex: 0
  });

  const activeAutoReadItem = autoReadStatus !== 'idle' && autoReadIndex >= 0 ? numbers[autoReadIndex] : null;
  const isAutoReadActive = autoReadStatus !== 'idle';
  const isAutoReadPaused = autoReadStatus === 'paused';

  const clearCurrentAudio = useCallback(() => {
    if (!audioRef.current) return;

    stopAudio(audioRef.current);
    audioRef.current = null;
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      clearCurrentAudio();
    };
  }, [clearCurrentAudio]);

  useEffect(() => {
    const nextSeconds = normalizeAutoReadSeconds(block?.autoReadSeconds);
    setAutoReadIntervalSeconds(nextSeconds);
    setAutoReadSeconds(nextSeconds);
  }, [block?.autoReadSeconds]);

  const playNumber = useCallback((item) => {
    clearCurrentAudio();

    if (!item?.audioSrc) {
      console.warn('Number audio source missing', {
        numberId: item?.id,
        label: item?.label,
        audioFile: item?.audioFile,
        item
      });

      if (isMountedRef.current) {
        setActiveNumberId('');
        setAudioMessage(`Audio is not available for ${item?.label || 'this number'}.`);
      }

      return;
    }

    const audio = new Audio(item.audioSrc);
    audio.preload = 'auto';
    audioRef.current = audio;

    setActiveNumberId(item.id);
    setAudioMessage('');

    audio.addEventListener('ended', () => {
      if (!isMountedRef.current || audioRef.current !== audio) return;

      audioRef.current = null;
      setActiveNumberId((current) => (current === item.id ? '' : current));
    }, { once: true });

    audio.addEventListener('error', () => {
      if (!isMountedRef.current || audioRef.current !== audio) return;

      audioRef.current = null;

      console.warn('Number audio element error', {
        numberId: item.id,
        label: item.label,
        audioFile: item.audioFile,
        audioSrc: item.audioSrc,
        mediaError: audio.error
      });

      setActiveNumberId((current) => (current === item.id ? '' : current));
      setAudioMessage(`Audio is not available for ${item.label}.`);
    }, { once: true });

    audio.load();

    audio.play()
      .then(() => {
        if (!isMountedRef.current) return;

        setPlayedNumberIds((current) => {
          const next = new Set(current);
          next.add(item.id);
          return next;
        });
      })
      .catch((error) => {
        if (!isMountedRef.current || audioRef.current !== audio || error?.name === 'AbortError') return;

        audioRef.current = null;

        console.warn('Number audio playback failed', {
          numberId: item.id,
          label: item.label,
          audioFile: item.audioFile,
          audioSrc: item.audioSrc,
          errorName: error?.name,
          errorMessage: error?.message,
          error
        });

        setActiveNumberId('');
        setAudioMessage(`Audio could not play for ${item.label}.`);
      });
  }, [clearCurrentAudio]);

  const resetAutoReadState = useCallback(() => {
    setAutoReadStatus('idle');
    setAutoReadIndex(-1);
    setAutoReadSeconds(autoReadIntervalSeconds);
    setActiveNumberId('');
    clearCurrentAudio();
  }, [autoReadIntervalSeconds, clearCurrentAudio]);

  const finishAutoRead = useCallback(() => {
    resetAutoReadState();
    setAudioMessage('Auto Read complete.');
    window.requestAnimationFrame(() => focusItem(0));
  }, [focusItem, resetAutoReadState]);

  function handleManualPlay(item) {
    if (isAutoReadActive) resetAutoReadState();
    playNumber(item);
  }

  function handleStartAutoRead() {
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

    clearCurrentAudio();

    // Keep activeNumberId so Resume at 0s cannot skip the current number.
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
    if (autoReadStatus !== 'running' || autoReadIndex < 0) return;

    const item = numbers[autoReadIndex];
    if (!item) return;

    focusItem(autoReadIndex);
    playNumber(item);
  }, [autoReadIndex, autoReadStatus, focusItem, numbers, playNumber]);

  useEffect(() => {
    if (autoReadStatus !== 'running' || !numbers.length) return undefined;

    if (autoReadSeconds <= 0) {
      if (activeNumberId) return undefined;

      if (autoReadIndex < numbers.length - 1) {
        setAutoReadIndex((current) => Math.min(current + 1, numbers.length - 1));
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
    activeNumberId,
    autoReadIndex,
    autoReadIntervalSeconds,
    autoReadSeconds,
    autoReadStatus,
    finishAutoRead,
    numbers.length
  ]);

  if (!numbers.length) {
    return (
      <section className="workspace-block problem-rich-block number-audio-board number-audio-empty" role="note">
        <h4>{block?.title || 'Numbers'}</h4>
        <p>Number cards are not available.</p>
      </section>
    );
  }

  const autoReadStatusText = activeAutoReadItem
    ? `${isAutoReadPaused ? 'Paused on' : 'Auto Reading'} ${activeAutoReadItem.label}.`
    : '';

  return (
    <section className="workspace-block problem-rich-block number-audio-board" aria-labelledby="number-audio-heading">
      <div className="number-audio-hero">
        <div className="number-audio-heading">
          <span className="number-audio-back">Mathematics</span>
          <h4 id="number-audio-heading">{block.title || 'Numbers 1–100'}</h4>
          {block.subtitle ? <p>{block.subtitle}</p> : null}
        </div>

        <div className="number-audio-mascot" aria-hidden="true">123</div>

        <div className="number-audio-progress" aria-label={`${progress}% complete`}>
          <span>My Progress</span>
          <strong>{progress}%</strong>
          <small>{playedNumberIds.size} / {totalCards} numbers</small>
        </div>
      </div>

      <div className="number-audio-toolbar">
        <span className="number-audio-tab is-active">1-100</span>
        <span className="number-audio-toolbar-count">{totalCards} cards</span>
        <span className="number-audio-sound-status">Sound on</span>

        <div className="number-audio-auto-controls" aria-label="Auto Read controls">
          <label className="number-audio-interval-control">
            <span>Every</span>
            <select aria-label="Auto Read interval" value={autoReadIntervalSeconds} onChange={handleAutoReadIntervalChange}>
              {autoReadIntervalOptions.map((seconds) => (
                <option key={seconds} value={seconds}>{seconds}s</option>
              ))}
            </select>
          </label>

          {!isAutoReadActive ? (
            <button className="number-audio-auto-button" onClick={handleStartAutoRead} type="button">
              Auto Read
            </button>
          ) : (
            <>
              <span className="number-audio-auto-timer" role="timer" aria-live="polite">
                <strong>{isAutoReadPaused ? `Paused: ${autoReadSeconds}s` : `Auto Read: ${autoReadSeconds}s`}</strong>
                <small>Next number in {autoReadSeconds} seconds</small>
              </span>

              <button
                className="number-audio-auto-button number-audio-auto-button--secondary"
                onClick={isAutoReadPaused ? handleResumeAutoRead : handlePauseAutoRead}
                type="button"
              >
                {isAutoReadPaused ? 'Resume' : 'Pause'}
              </button>

              <button className="number-audio-auto-button number-audio-auto-button--secondary" onClick={handleStopAutoRead} type="button">
                Stop
              </button>
            </>
          )}
        </div>
      </div>

      <div className="number-audio-grid" aria-label="Number sound cards" {...gridProps}>
        {numbers.map((item, index) => (
          <NumberAudioCard
            item={item}
            isActive={activeNumberId === item.id}
            isAutoReading={activeAutoReadItem?.id === item.id}
            itemRef={getItemRef(index)}
            key={item.id}
            onPlay={handleManualPlay}
          />
        ))}
      </div>

      <div className="number-audio-status" role="status" aria-live="polite">
        {audioMessage || autoReadStatusText || (activeNumberId ? 'Playing audio.' : '')}
      </div>
    </section>
  );
}