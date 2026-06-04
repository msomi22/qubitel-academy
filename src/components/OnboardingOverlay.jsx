import { useState, useEffect } from 'react';
import { getActiveAcademy } from '../config/detectAcademy.ts';
import { siteConfig } from '../config/siteConfig.js';

const activeAcademy = getActiveAcademy();
const STORAGE_KEY = activeAcademy.id === 'tech'
  ? 'sda_onboarding_done'
  : `${activeAcademy.storageKey}:onboarding-done`;

const STEPS = [
  {
    icon: '📂',
    title: 'Pick a topic',
    body: 'Browse categories and topics organised around a focused learning path. Each topic contains curated material for deliberate practice.'
  },
  {
    icon: '⚡',
    title: 'Work through questions',
    body: 'Answer coding, MCQ, system design, and debugging questions. Every question has an explanation so you actually learn.'
  },
  {
    icon: '📈',
    title: 'Track your progress',
    body: 'Your progress is saved locally. The dashboard shows your weak areas and recommends the next topic so you always know what to do next.'
  }
];

export default function OnboardingOverlay() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      const done = localStorage.getItem(STORAGE_KEY);
      if (!done) setVisible(true);
    } catch {
      // localStorage may be blocked; skip onboarding
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setVisible(false);
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  }

  if (!visible) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div
      className="onboarding-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome to ${siteConfig.appName}`}
    >
      <div className="onboarding-card">
        <div className="onboarding-step-icon" aria-hidden="true">
          {current.icon}
        </div>

        <h2>{current.title}</h2>
        <p>{current.body}</p>

        <div className="onboarding-dots" aria-hidden="true">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`onboarding-dot${i === step ? ' active' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding-actions">
          {step > 0 && (
            <button
              className="btn ghost"
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </button>
          )}
          <button className="btn" onClick={next}>
            {isLast ? 'Start learning' : 'Next'}
          </button>
          {!isLast && (
            <button
              className="btn ghost"
              onClick={dismiss}
              style={{ fontSize: '0.8rem', opacity: 0.6 }}
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
