import { findQuestionById } from './questionBankService.js';
import { getActiveAcademy } from '../config/detectAcademy.ts';

function getRecentQuestionsStorageKey() {
  const academy = getActiveAcademy();
  return academy.id === 'tech'
    ? 'senior-dev-accelerator:recent-questions'
    : `${academy.storageKey}:recent-questions`;
}

export const RECENT_QUESTIONS_STORAGE_KEY = getRecentQuestionsStorageKey();
const RECENT_LIMIT = 5;

function canUseLocalStorage() {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readRawRecentQuestions() {
  if (!canUseLocalStorage()) return {};

  try {
    const storedValue = window.localStorage.getItem(RECENT_QUESTIONS_STORAGE_KEY);
    if (!storedValue) return {};

    const parsed = JSON.parse(storedValue);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeRawRecentQuestions(nextRecentQuestions) {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.setItem(
      RECENT_QUESTIONS_STORAGE_KEY,
      JSON.stringify(nextRecentQuestions)
    );
  } catch {
    // Recent history is helpful but non-critical. Ignore storage quota/privacy failures.
  }
}

function normalizeRecentRecord(record) {
  if (!record || typeof record !== 'object') return null;

  const questionId = typeof record.questionId === 'string' ? record.questionId.trim() : '';
  const openCount = Number(record.openCount);
  const lastOpenedAt = typeof record.lastOpenedAt === 'string' ? record.lastOpenedAt : '';
  const fallbackTitle = typeof record.fallbackTitle === 'string' ? record.fallbackTitle.trim() : '';

  if (!questionId || !Number.isFinite(openCount) || openCount <= 0 || !lastOpenedAt) {
    return null;
  }

  return {
    questionId,
    openCount,
    lastOpenedAt,
    ...(fallbackTitle ? { fallbackTitle } : {})
  };
}

function compareRecentQuestions(a, b) {
  if (b.openCount !== a.openCount) return b.openCount - a.openCount;
  return new Date(b.lastOpenedAt).getTime() - new Date(a.lastOpenedAt).getTime();
}

export function getRecentQuestions() {
  return Object.values(readRawRecentQuestions())
    .map(normalizeRecentRecord)
    .filter(Boolean)
    .sort(compareRecentQuestions);
}

export function recordQuestionOpen(question) {
  const questionId = typeof question?.id === 'string' ? question.id.trim() : '';
  if (!questionId) return;

  const currentRecentQuestions = readRawRecentQuestions();
  const existingRecord = normalizeRecentRecord(currentRecentQuestions[questionId]);
  const fallbackTitle = typeof question?.title === 'string' ? question.title.trim() : '';

  currentRecentQuestions[questionId] = {
    questionId,
    openCount: (existingRecord?.openCount || 0) + 1,
    lastOpenedAt: new Date().toISOString(),
    ...(fallbackTitle ? { fallbackTitle } : existingRecord?.fallbackTitle ? { fallbackTitle: existingRecord.fallbackTitle } : {})
  };

  writeRawRecentQuestions(currentRecentQuestions);
}

export function clearRecentQuestions() {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.removeItem(RECENT_QUESTIONS_STORAGE_KEY);
  } catch {
    // Ignore storage failures so the UI remains stable.
  }
}

export async function hydrateRecentQuestions(recentEntries = getRecentQuestions()) {
  const topEntries = recentEntries.slice(0, RECENT_LIMIT);
  const hydratedRows = await Promise.all(
    topEntries.map(async (recentEntry) => {
      const normalizedEntry = normalizeRecentRecord(recentEntry);
      if (!normalizedEntry) return null;

      const currentEntry = await findQuestionById(normalizedEntry.questionId);
      const currentQuestion = currentEntry?.question;

      if (currentQuestion) {
        return {
          ...normalizedEntry,
          title: currentQuestion.title,
          topic: currentEntry.topic?.name || currentEntry.categoryName || 'Unavailable',
          difficulty: currentQuestion.difficulty || '—',
          route: `/problem/${encodeURIComponent(currentQuestion.id)}`,
          available: true
        };
      }

      if (!normalizedEntry.fallbackTitle) return null;

      return {
        ...normalizedEntry,
        title: normalizedEntry.fallbackTitle,
        topic: 'Unavailable',
        difficulty: '—',
        route: '',
        available: false
      };
    })
  );

  return hydratedRows.filter(Boolean).sort(compareRecentQuestions);
}
