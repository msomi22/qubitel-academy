import { useEffect, useMemo, useRef, useState } from 'react';

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

function NumberAudioCard({ item, isActive, onPlay }) {
  return (
    <button
      type="button"
      className={`number-audio-card ${isActive ? 'is-playing' : ''}`}
      style={{ '--number-card-accent': item.color }}
      aria-label={item.ariaLabel}
      aria-pressed={isActive}
      onClick={() => onPlay(item)}
    >
      <span className="number-audio-card-value" aria-hidden="true">{item.display || item.number}</span>
      <span className="number-audio-card-label">{item.label}</span>
      <span className="number-audio-card-sound" aria-hidden="true">
        <span className="number-audio-sound-mark" />
        <span className="number-audio-playing-label">{isActive ? 'Playing' : ''}</span>
      </span>
    </button>
  );
}

export default function NumberAudioGridBlock({ block }) {
  const numbers = useMemo(() => safeNumbers(block), [block]);
  const audioRef = useRef(null);
  const [activeNumberId, setActiveNumberId] = useState('');
  const [playedNumberIds, setPlayedNumberIds] = useState(() => new Set());
  const [audioMessage, setAudioMessage] = useState('');
  const totalCards = numbers.length;
  const progress = totalCards ? Math.round((playedNumberIds.size / totalCards) * 100) : 0;

  useEffect(() => () => stopAudio(audioRef.current), []);

  function clearCurrentAudio() {
    if (!audioRef.current) return;
    stopAudio(audioRef.current);
    audioRef.current = null;
  }

  // function handlePlay(item) {
  //   clearCurrentAudio();

  //   if (!item?.audioSrc) {
  //     setActiveNumberId('');
  //     setAudioMessage(`Audio is not available for ${item?.label || 'this number'}.`);
  //     return;
  //   }

  //   const audio = new Audio(item.audioSrc);
  //   audioRef.current = audio;
  //   setActiveNumberId(item.id);
  //   setAudioMessage('');

  //   audio.addEventListener('ended', () => {
  //     setActiveNumberId((current) => (current === item.id ? '' : current));
  //   }, { once: true });
  //   audio.addEventListener('error', () => {
  //     setActiveNumberId((current) => (current === item.id ? '' : current));
  //     setAudioMessage(`Audio is not available for ${item.label}.`);
  //   }, { once: true });

  //   audio.play()
  //     .then(() => {
  //       setPlayedNumberIds((current) => {
  //         const next = new Set(current);
  //         next.add(item.id);
  //         return next;
  //       });
  //     })
  //     .catch(() => {
  //       setActiveNumberId('');
  //       setAudioMessage(`Audio could not play for ${item.label}.`);
  //     });
  // }

  function handlePlay(item) {
    clearCurrentAudio();
  
    if (!item?.audioSrc) {
      console.warn('Number audio source missing', {
        numberId: item?.id,
        label: item?.label,
        audioFile: item?.audioFile,
        item
      });
      setActiveNumberId('');
      setAudioMessage(`Audio is not available for ${item?.label || 'this number'}.`);
      return;
    }
  
    const audio = new Audio(item.audioSrc);
    audio.preload = 'auto';
    audioRef.current = audio;
    setActiveNumberId(item.id);
    setAudioMessage('');
  
    audio.addEventListener('ended', () => {
      setActiveNumberId((current) => (current === item.id ? '' : current));
    }, { once: true });
  
    audio.addEventListener('error', () => {
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
        setPlayedNumberIds((current) => {
          const next = new Set(current);
          next.add(item.id);
          return next;
        });
      })
      .catch((error) => {
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
  }

  if (!numbers.length) {
    return (
      <section className="workspace-block problem-rich-block number-audio-board number-audio-empty" role="note">
        <h4>{block?.title || 'Numbers'}</h4>
        <p>Number cards are not available.</p>
      </section>
    );
  }

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
      </div>

      <div className="number-audio-grid" aria-label="Number sound cards">
        {numbers.map((item) => (
          <NumberAudioCard
            item={item}
            isActive={activeNumberId === item.id}
            key={item.id}
            onPlay={handlePlay}
          />
        ))}
      </div>

      <div className="number-audio-status" role="status" aria-live="polite">
        {audioMessage || (activeNumberId ? 'Playing audio.' : '')}
      </div>
    </section>
  );
}
