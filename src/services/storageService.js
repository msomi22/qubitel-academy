import { getAcademyStorageKey } from '../config/academyStorage.ts';

const defaults = {
  theme: 'light',
  completed: {},
  randomCount: 0,
  selectedTopics: {},
  selectedAnswers: {},
  timedQuestionAttempts: {},
  examAttempts: {},
  activeExamSessions: {},
  lastCbcActivity: null,
  grade1VoiceType: 'female',
  complexDesignSubmissions: {}
};

export const storageService = {
  read() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(getAcademyStorageKey()) || '{}') }; }
    catch { return defaults; }
  },
  write(next) { localStorage.setItem(getAcademyStorageKey(), JSON.stringify({ ...this.read(), ...next })); },
  toggleComplete(id) {
    const state = this.read();
    const completed = { ...state.completed, [id]: !state.completed[id] };
    this.write({ completed });
    return completed;
  },
  markComplete(id) {
    const state = this.read();
    if (state.completed[id]) return state.completed;

    const completed = { ...state.completed, [id]: true };
    this.write({ completed });
    return completed;
  },
  resetQuestionProgress(questionId) {
    const state = this.read();

    const completed = { ...state.completed };
    const selectedAnswers = { ...state.selectedAnswers };
    const timedQuestionAttempts = { ...state.timedQuestionAttempts };
    const complexDesignSubmissions = { ...state.complexDesignSubmissions };

    delete completed[questionId];
    delete selectedAnswers[questionId];
    delete timedQuestionAttempts[questionId];
    delete complexDesignSubmissions[questionId];

    this.write({
      completed,
      selectedAnswers,
      timedQuestionAttempts,
      complexDesignSubmissions
    });

    return {
      completed,
      selectedAnswers,
      timedQuestionAttempts,
      complexDesignSubmissions
    };
  },
  setSelectedAnswer(questionId, answerIndex) {
    const state = this.read();
    const selectedAnswers = {
      ...state.selectedAnswers,
      [questionId]: answerIndex
    };

    this.write({ selectedAnswers });
    return selectedAnswers;
  },
  getSelectedAnswer(questionId) {
    const answer = this.read().selectedAnswers?.[questionId];
    return Number.isInteger(answer) ? answer : null;
  },
  setTimedQuestionAttempt(questionId, attempt) {
    const state = this.read();
    const timedQuestionAttempts = {
      ...state.timedQuestionAttempts,
      [questionId]: {
        ...(state.timedQuestionAttempts?.[questionId] || {}),
        ...attempt,
        updatedAt: new Date().toISOString()
      }
    };

    this.write({ timedQuestionAttempts });
    return timedQuestionAttempts[questionId];
  },
  getTimedQuestionAttempt(questionId) {
    return this.read().timedQuestionAttempts?.[questionId] || null;
  },
  addExamAttempt(examId, attempt) {
    const state = this.read();
    const examAttempts = {
      ...state.examAttempts,
      [examId]: [...(state.examAttempts?.[examId] || []), attempt]
    };

    this.write({ examAttempts });
    return examAttempts[examId];
  },
  getExamAttempts(examId) {
    return [...(this.read().examAttempts?.[examId] || [])];
  },
  setActiveExamSession(examId, session) {
    const state = this.read();
    const activeExamSessions = {
      ...state.activeExamSessions,
      [examId]: {
        ...session,
        examId,
        updatedAt: new Date().toISOString()
      }
    };

    this.write({ activeExamSessions });
    return activeExamSessions[examId];
  },
  getActiveExamSession(examId) {
    return this.read().activeExamSessions?.[examId] || null;
  },
  clearActiveExamSession(examId) {
    const state = this.read();
    const activeExamSessions = { ...state.activeExamSessions };

    delete activeExamSessions[examId];
    this.write({ activeExamSessions });
    return activeExamSessions;
  },
  setLastCbcActivity(activity = {}) {
    const nodeId = String(activity.nodeId || '').trim();
    const nodeKind = String(activity.nodeKind || '').trim();
    if (!nodeId) return null;

    const lastCbcActivity = {
      academy: 'cbc',
      nodeId,
      nodeKind,
      updatedAt: activity.updatedAt || new Date().toISOString()
    };

    if (activity.tab) lastCbcActivity.tab = String(activity.tab).trim();

    this.write({ lastCbcActivity });
    return lastCbcActivity;
  },
  getLastCbcActivity() {
    const activity = this.read().lastCbcActivity;

    if (!activity || activity.academy !== 'cbc' || !activity.nodeId) return null;

    return activity;
  },
  clearLastCbcActivity() {
    this.write({ lastCbcActivity: null });
  },
  setGradeOneVoiceType(voiceType) {
    const grade1VoiceType = voiceType === 'male' ? 'male' : 'female';
    this.write({ grade1VoiceType });
    return grade1VoiceType;
  },
  getGradeOneVoiceType() {
    return this.read().grade1VoiceType === 'male' ? 'male' : 'female';
  },
  setComplexDesignSubmission(questionId, submission) {
    const state = this.read();
    const complexDesignSubmissions = {
      ...state.complexDesignSubmissions,
      [questionId]: {
        ...submission,
        submittedAt: submission.submittedAt || new Date().toISOString()
      }
    };

    this.write({ complexDesignSubmissions });
    return complexDesignSubmissions[questionId];
  },
  getComplexDesignSubmission(questionId) {
    return this.read().complexDesignSubmissions?.[questionId] || null;
  },
  setTheme(theme) { this.write({ theme }); },
  setSelectedTopic(category, topicId) {
    const state = this.read();
    this.write({ selectedTopics: { ...state.selectedTopics, [category]: topicId } });
  },
  getSelectedTopic(category) {
    return this.read().selectedTopics?.[category] || '';
  },
  incrementRandom() {
    const state = this.read();
    const randomCount = state.randomCount + 1;
    this.write({ randomCount });
    return randomCount;
  }
};
