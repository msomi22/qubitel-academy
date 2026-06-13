import { useEffect, useMemo, useRef, useState } from 'react';

function safeLetters(block) {
  return Array.isArray(block?.letters) ? block.letters.filter((item) => item?.letter && item?.identifier && item?.phonetic) : [];
}

function stopAudio(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}

function AlphabetCard({ card, cardType, color, display, isActive, onPlay }) {
  const isIdentifier = cardType === 'identifier';
  return (
    <button
      type="button"
      className={`alphabet-mastery-card alphabet-mastery-card--${cardType} ${isActive ? 'is-playing' : ''}`}
      style={{ '--alphabet-card-accent': color }}
      aria-label={card.ariaLabel}
      aria-pressed={isActive}
      onClick={() => onPlay(card)}
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
  const [activeCardId, setActiveCardId] = useState('');
  const [playedCardIds, setPlayedCardIds] = useState(() => new Set());
  const [audioMessage, setAudioMessage] = useState('');
  const totalCards = letters.length * 2;
  const progress = totalCards ? Math.round((playedCardIds.size / totalCards) * 100) : 0;

  useEffect(() => () => stopAudio(audioRef.current), []);

  function clearCurrentAudio() {
    if (!audioRef.current) return;
    stopAudio(audioRef.current);
    audioRef.current = null;
  }

  // function handlePlay(card) {
  //   clearCurrentAudio();

  //   if (!card?.audioSrc) {
  //     setActiveCardId('');
  //     setAudioMessage(`Audio is not available for ${card?.label || 'this card'}.`);
  //     return;
  //   }

  //   const audio = new Audio(card.audioSrc);
  //   audioRef.current = audio;
  //   setActiveCardId(card.id);
  //   setAudioMessage('');

  //   audio.addEventListener('ended', () => {
  //     setActiveCardId((current) => (current === card.id ? '' : current));
  //   }, { once: true });
  //   audio.addEventListener('error', () => {
  //     setActiveCardId((current) => (current === card.id ? '' : current));
  //     setAudioMessage(`Audio is not available for ${card.label}.`);
  //   }, { once: true });

  //   audio.play()
  //     .then(() => {
  //       setPlayedCardIds((current) => {
  //         const next = new Set(current);
  //         next.add(card.id);
  //         return next;
  //       });
  //     })
  //     .catch(() => {
  //       setActiveCardId('');
  //       setAudioMessage(`Audio could not play for ${card.label}.`);
  //     });
  // }


  function handlePlay(card) {
    clearCurrentAudio();
  
    if (!card?.audioSrc) {
      console.warn('Alphabet audio source missing', {
        cardId: card?.id,
        label: card?.label,
        audioFile: card?.audioFile,
        card
      });
      setActiveCardId('');
      setAudioMessage(`Audio is not available for ${card?.label || 'this card'}.`);
      return;
    }
  
    const audio = new Audio(card.audioSrc);
    audio.preload = 'auto';
    audioRef.current = audio;
    setActiveCardId(card.id);
    setAudioMessage('');
  
    audio.addEventListener('ended', () => {
      setActiveCardId((current) => (current === card.id ? '' : current));
    }, { once: true });
  
    audio.addEventListener('error', () => {
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
        setPlayedCardIds((current) => {
          const next = new Set(current);
          next.add(card.id);
          return next;
        });
      })
      .catch((error) => {
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
  }

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

      <div className="alphabet-mastery-grid" aria-label="Alphabet sound cards">
        {letters.map((item) => (
          <div className="alphabet-mastery-letter-row" style={{ '--alphabet-card-accent': item.color }} key={item.id}>
            <AlphabetCard
              card={item.identifier}
              cardType="identifier"
              color={item.color}
              display={item.display}
              isActive={activeCardId === item.identifier.id}
              onPlay={handlePlay}
            />
            <AlphabetCard
              card={item.phonetic}
              cardType="phonetic"
              color={item.color}
              display={item.display}
              isActive={activeCardId === item.phonetic.id}
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
