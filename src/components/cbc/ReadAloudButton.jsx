import { useEffect, useMemo, useState } from 'react';

import { readAloudService } from '../../services/readAloudService.js';
import { storageService } from '../../services/storageService.js';

function isReadAloudEnabled(question) {
  return Boolean(question?.readAloud || question?.metadata?.readAloud || question?.readAloudText || question?.metadata?.readAloudText);
}

function readAloudTextFor(question) {
  return question?.readAloudText || question?.metadata?.readAloudText || question?.question || question?.title || '';
}

function shouldReadOptions(question) {
  return Boolean(question?.readOptionsAloud || question?.metadata?.readOptionsAloud);
}

function shouldAutoRead(question) {
  return Boolean(question?.autoReadAloud || question?.metadata?.autoReadAloud);
}

export default function ReadAloudButton({ question, className = '' }) {
  const [voiceType, setVoiceType] = useState(() => storageService.getGradeOneVoiceType());
  const [supported, setSupported] = useState(() => readAloudService.isSupported());

  const questionId = question?.id || '';
  const enabled = isReadAloudEnabled(question);
  const readText = useMemo(() => readAloudTextFor(question), [question]);

  useEffect(() => {
    setSupported(readAloudService.isSupported());
  }, []);

  useEffect(() => {
    readAloudService.stop();
    return () => readAloudService.stop();
  }, [questionId]);

  useEffect(() => {
    if (!enabled || !supported || !shouldAutoRead(question)) return undefined;

    const timer = window.setTimeout(() => {
      readAloudService.stop();
      readAloudService.speak(readText, {
        voiceType,
        readOptionsAloud: shouldReadOptions(question),
        answerOptions: question?.options || []
      });
    }, 350);

    return () => {
      window.clearTimeout(timer);
      readAloudService.stop();
    };
  }, [enabled, question, readText, supported, voiceType]);

  if (!enabled) return null;

  function handleReadAgain() {
    readAloudService.stop();
    readAloudService.speak(readText, {
      voiceType,
      readOptionsAloud: shouldReadOptions(question),
      answerOptions: question?.options || []
    });
  }

  function handleVoiceChange(event) {
    const nextVoiceType = event.target.value === 'male' ? 'male' : 'female';
    setVoiceType(nextVoiceType);
    storageService.setGradeOneVoiceType(nextVoiceType);
  }

  return (
    <section className={`cbc-read-aloud-panel ${className}`.trim()} aria-label="Read aloud controls">
      <div>
        <button
          type="button"
          className="cbc-read-aloud-button"
          aria-label="Read question aloud again"
          onClick={handleReadAgain}
          disabled={!supported || !readText}
          title={supported ? 'Read question aloud again' : 'Read aloud is not supported in this browser'}
        >
          <span aria-hidden="true">🔊</span>
          Read again
        </button>
        {!supported ? <p>Read aloud is not supported in this browser.</p> : null}
      </div>
      <label className="cbc-read-aloud-voice-select">
        <span>Voice</span>
        <select value={voiceType} onChange={handleVoiceChange} aria-label="Choose read aloud voice">
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </label>
    </section>
  );
}
