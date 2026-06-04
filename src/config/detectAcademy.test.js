import assert from 'node:assert/strict';
import test from 'node:test';

import { detectAcademyIdFromHostname } from './detectAcademy.js';
import { getAcademyById } from './academyRegistry.js';

test('defaults to tech for localhost and unknown hosts', () => {
  assert.equal(detectAcademyIdFromHostname('localhost'), 'tech');
  assert.equal(detectAcademyIdFromHostname('preview.pages.dev'), 'tech');
  assert.equal(detectAcademyIdFromHostname('unknown.example.com'), 'tech');
});

test('detects tech academy from production host', () => {
  assert.equal(detectAcademyIdFromHostname('academy.qubitel.net'), 'tech');
});

test('detects CBC academy from subdomain', () => {
  assert.equal(detectAcademyIdFromHostname('cbc.academy.qubitel.net'), 'cbc');
});

test('detects Customer Experience academy from cx subdomain', () => {
  assert.equal(detectAcademyIdFromHostname('cx.academy.qubitel.net'), 'customer-experience');
});

test('returns default academy for unknown id', () => {
  assert.equal(getAcademyById('missing').id, 'tech');
});