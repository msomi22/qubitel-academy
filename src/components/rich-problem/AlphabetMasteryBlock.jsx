import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useGridRemoteNavigation from '../../hooks/useGridRemoteNavigation.js';

function safeLetters(block) {
  return Array.isArray(block?.letters) ? block.letters.filter((item) => item?.letter && item?.identifier && item?.phonetic) : [];
}

function stopAudio(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}

function AlphabetCard({ card, cardType, color, display, isActive, itemRef, onPlay }) {
  const isIdentifier = cardType === 'identifier';
  return (
    <button
      aria-label={card.ariaLabel}
      aria-pressed={isActive}
      className={`alphabet-mastery-card alphabet-mastery-card--${cardType} ${isActive ? 'is-playing' : ''}`}
      data-grid-nav-item="true"
      onClick={() => onPlay(card)}
      ref={itemRef}
      style={{ '--alphabet-card-accent': color }}
      type="button"
    >
      <span className="alphabet-mastery-card-visual" aria-hidden="true">
        {isIdentifier ? display : card.visual}
      </span>
      <span className="alphabet-mastery-card-label">{card.label}</span>
      <span className="alphabet-mastery-card-footer" aria-hidden="true">
        <span className="alphabet-mastery-sound-mark" />
        <span className="alphabet-mastery-playing-label">{isActive ? 'Playing' : ''}</span>
      </span>
    </button>
  );
}

export default function AlphabetMasteryBlock({ block }) {
  const letters = useMemo(() => safeLetters(block), [block]);
  const audioRef = useRef(null);
  const isMountedRef = useRef(false);
  const [activeCardId, setActiveCardId] = useState('');
  const [playedCardIds, setPlayedCardIds] = useState(() => new Set());
  const [audioMessage, setAudioMessage] = useState('');
  const totalCards = letters.length * 2;
  const progress = totalCards ? Math.round((playedCardIds.size / totalCards) * 100) : 0;
  const { getItemRef, gridProps } = useGridRemoteNavigation({
    itemCount: totalCards,
    initialIndex: 0
  });

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

  const handlePlay = useCallback((card) => {
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

  if (!letters.length) {
    return (
      <section className="workspace-block problem-rich-block alphabet-mastery-board alphabet-mastery-empty" role="note">
        <h4>{block?.title || 'Alphabet Mastery'}</h4>
        <p>Alphabet cards are not available.</p>
      </section>
    );
  }

  return (
    <section className="workspace-block problem-rich-block alphabet-mastery-board" aria-labelledby="alphabet-mastery-heading">
      <div className="alphabet-mastery-hero">
        <div className="alphabet-mastery-heading">
          <span className="alphabet-mastery-back">English</span>
          <h4 id="alphabet-mastery-heading">{block.title || 'Alphabet Mastery'}</h4>
          {block.subtitle ? <p>{block.subtitle}</p> : null}
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
              itemRef={getItemRef(index * 2)}
              onPlay={handlePlay}
            />
            <AlphabetCard
              card={item.phonetic}
              cardType="phonetic"
              color={item.color}
              display={item.display}
              isActive={activeCardId === item.phonetic.id}
              itemRef={getItemRef(index * 2 + 1)}
              onPlay={handlePlay}
            />
          </div>
        ))}
      </div>

      <div className="alphabet-mastery-status" role="status" aria-live="polite">
        {audioMessage || (activeCardId ? 'Playing audio.' : '')}
      </div>
    </section>
  );
}
