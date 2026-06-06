import assert from 'node:assert/strict';
import test from 'node:test';

import {
  detectAcademyIdFromHostname,
  detectAcademyIdFromLocation
} from './detectAcademy.ts';
import { getAcademyStorageKey } from './academyStorage.ts';
import { getAcademyById } from './academyRegistry.ts';

test('defaults to tech for localhost and unknown hosts', () => {
  assert.equal(detectAcademyIdFromHostname('localhost'), 'tech');
  assert.equal(detectAcademyIdFromHostname('preview.pages.dev'), 'tech');
  assert.equal(detectAcademyIdFromHostname('unknown.example.com'), 'tech');
  assert.equal(detectAcademyIdFromHostname('cbc.preview.pages.dev'), 'tech');
  assert.equal(detectAcademyIdFromHostname('cx.example.com'), 'tech');
});

test('detects tech academy from production host', () => {
  assert.equal(detectAcademyIdFromHostname('academy.qubitel.net'), 'tech');
});

test('detects CBC academy from subdomain', () => {
  assert.equal(detectAcademyIdFromHostname('cbc.academy.qubitel.net'), 'cbc');
  assert.equal(detectAcademyIdFromHostname('CBC.ACADEMY.QUBITEL.NET.'), 'cbc');
});

test('detects Customer Experience academy from cx subdomain', () => {
  assert.equal(detectAcademyIdFromHostname('cx.academy.qubitel.net'), 'customer-experience');
});

test('allows local academy override for manual testing', () => {
  assert.equal(
    detectAcademyIdFromLocation({ hostname: 'localhost', search: '?academy=cbc' } as Location),
    'cbc'
  );
  assert.equal(
    detectAcademyIdFromLocation({ hostname: '127.0.0.1', search: '?academy=customer-experience' } as Location),
    'customer-experience'
  );
  assert.equal(
    detectAcademyIdFromLocation({ hostname: 'preview.pages.dev', search: '?academy=cbc' } as Location),
    'tech'
  );
});

test('returns default academy for unknown id', () => {
  assert.equal(getAcademyById('missing').id, 'tech');
});

test('keeps learner storage isolated by academy while preserving the tech key', () => {
  assert.equal(getAcademyStorageKey('academy.qubitel.net'), 'senior-dev-accelerator:v2');
  assert.equal(getAcademyStorageKey('cbc.academy.qubitel.net'), 'senior-dev-accelerator:v2:cbc');
  assert.equal(
    getAcademyStorageKey('cx.academy.qubitel.net'),
    'senior-dev-accelerator:v2:customer-experience'
  );
});
