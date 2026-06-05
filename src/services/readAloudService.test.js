import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildReadAloudText,
  pickPreferredVoice,
  readAloudService
} from './readAloudService.js';

test('buildReadAloudText reads only the question prompt by default', () => {
  const text = buildReadAloudText({
    readAloudText: 'Choose the circle.',
    options: ['triangle', 'circle', 'square']
  });

  assert.equal(text, 'Choose the circle.');
});

test('buildReadAloudText can still include answer choices when explicitly requested', () => {
  const text = buildReadAloudText({
    readAloudText: 'Choose the circle.',
    readOptionsAloud: true,
    options: ['triangle', 'circle', 'square']
  });

  assert.equal(text, 'Choose the circle.. Option A, triangle. Option B, circle. Option C, square');
});

test('pickPreferredVoice chooses a matching voice when available', () => {
  const voices = [
    { name: 'English David', lang: 'en-US', voiceURI: 'david' },
    { name: 'English Samantha', lang: 'en-US', voiceURI: 'samantha' }
  ];

  assert.equal(pickPreferredVoice(voices, 'female', 'en-US').name, 'English Samantha');
  assert.equal(pickPreferredVoice(voices, 'male', 'en-US').name, 'English David');
});

test('readAloudService reports unsupported safely outside the browser', () => {
  const previousSpeechSynthesis = globalThis.speechSynthesis;
  const previousUtterance = globalThis.SpeechSynthesisUtterance;

  try {
    delete globalThis.speechSynthesis;
    delete globalThis.SpeechSynthesisUtterance;

    assert.equal(readAloudService.isSupported(), false);
    assert.equal(readAloudService.speak('Choose the circle.'), null);
  } finally {
    globalThis.speechSynthesis = previousSpeechSynthesis;
    globalThis.SpeechSynthesisUtterance = previousUtterance;
  }
});
