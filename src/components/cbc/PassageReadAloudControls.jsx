import { useEffect, useRef, useState } from 'react';

import { pickPreferredVoice } from '../../services/readAloudService.js';

function getSpeechSynthesis() {
  return typeof globalThis !== 'undefined' ? globalThis.speechSynthesis : null;
}

function getUtteranceConstructor() {
  return typeof globalThis !== 'undefined' ? globalThis.SpeechSynthesisUtterance : null;
}

function rateForSpeed(speed) {
  return speed === 'slow' ? 0.72 : 0.9;
}

export default function PassageReadAloudControls({
  sentences = [],
  lang = 'en-US',
  voiceType = 'female',
  preferredVoiceNames = [],
  onActiveSentenceChange,
  className = ''
}) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState('idle');
  const [speed, setSpeed] = useState('normal');
  const [errorMessage, setErrorMessage] = useState('');

  const stoppedRef = useRef(false);
  const speedRef = useRef(speed);

  useEffect(() => {
    setSupported(Boolean(getSpeechSynthesis() && getUtteranceConstructor()));
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => () => {
    stoppedRef.current = true;
    getSpeechSynthesis()?.cancel?.();
    onActiveSentenceChange?.('');
  }, [onActiveSentenceChange]);

  function speakSentence(index) {
    const synth = getSpeechSynthesis();
    const Utterance = getUtteranceConstructor();
    const sentence = sentences[index];

    if (!synth || !Utterance || !sentence) {
      setStatus('idle');
      onActiveSentenceChange?.('');
      return;
    }

    const activeLang = sentence.lang || lang;

    onActiveSentenceChange?.(sentence.id);

    const utterance = new Utterance(sentence.text);
    utterance.lang = activeLang;
    utterance.rate = rateForSpeed(speedRef.current);

    const isEnglish = activeLang.toLowerCase().startsWith('en');
    utterance.pitch = isEnglish ? 1.05 : 1;

    const availableVoices = synth.getVoices?.() || [];

    const preferredVoice = availableVoices.find((voice) =>
      preferredVoiceNames.some((name) =>
        voice.name.toLowerCase() === name.toLowerCase()
      )
    );

    const voice = preferredVoice || pickPreferredVoice(availableVoices, voiceType, activeLang);
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      if (stoppedRef.current) return;
      speakSentence(index + 1);
    };

    utterance.onerror = (event) => {
      if (stoppedRef.current) return;

      setStatus('idle');
      onActiveSentenceChange?.('');

      const reason = event?.error ? ` (${event.error})` : '';
      setErrorMessage(`Read aloud failed on this browser${reason}.`);
    };

    try {
      synth.speak(utterance);
    } catch (error) {
      setStatus('idle');
      onActiveSentenceChange?.('');
      setErrorMessage(`Read aloud failed on this browser: ${error?.message || String(error)}`);
    }
  }

  function startReading() {
    if (!supported || !sentences.length) return;

    setErrorMessage('');
    stoppedRef.current = false;
    getSpeechSynthesis()?.cancel?.();
    setStatus('reading');
    speakSentence(0);
  }

  function pauseReading() {
    getSpeechSynthesis()?.pause?.();
    setStatus('paused');
  }

  function resumeReading() {
    getSpeechSynthesis()?.resume?.();
    setStatus('reading');
  }

  function stopReading() {
    stoppedRef.current = true;
    getSpeechSynthesis()?.cancel?.();
    setStatus('idle');
    setErrorMessage('');
    onActiveSentenceChange?.('');
  }

  return (
    <section className={`cbc-passage-read-aloud ${className}`.trim()} aria-label="Passage read aloud controls">
      <div className="cbc-passage-read-aloud-actions">
        <button
          type="button"
          className="cbc-exam-button secondary"
          onClick={startReading}
          disabled={!supported || !sentences.length || status === 'reading'}
          title={supported ? 'Read the passage aloud' : 'Read aloud is not supported in this browser'}
        >
          Read Aloud
        </button>
        <button type="button" className="cbc-exam-button secondary" onClick={pauseReading} disabled={status !== 'reading'}>
          Pause
        </button>
        <button type="button" className="cbc-exam-button secondary" onClick={resumeReading} disabled={status !== 'paused'}>
          Resume
        </button>
        <button type="button" className="cbc-exam-button quiet" onClick={stopReading} disabled={status === 'idle'}>
          Stop
        </button>
      </div>

      <div className="cbc-passage-speed" role="group" aria-label="Read aloud speed">
        <button
          type="button"
          className={speed === 'slow' ? 'active' : ''}
          onClick={() => setSpeed('slow')}
          aria-pressed={speed === 'slow'}
        >
          Slow
        </button>
        <button
          type="button"
          className={speed === 'normal' ? 'active' : ''}
          onClick={() => setSpeed('normal')}
          aria-pressed={speed === 'normal'}
        >
          Normal
        </button>
      </div>

      {!supported ? <p>Read aloud is not supported in this browser.</p> : null}
      {errorMessage ? <p className="cbc-passage-read-aloud-error">{errorMessage}</p> : null}
    </section>
  );
}