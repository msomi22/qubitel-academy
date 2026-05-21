import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeProblem } from './normalizeProblem.js';
import { validateProblem, validateProblemCollection } from './validateProblem.js';
import { discoverProblems, getDiscoveredQuestionsForTopic } from './problemDiscovery.js';
import {
  defineProblem,
  defineMcqProblem,
  defineLearningProblem,
  defineSimpleSystemDesignProblem,
  defineComplexSystemDesignProblem
} from './problemAuthoring.js';

const topics = [
  { id: 'scalability', category: 'system' },
  { id: 'sliding-window', category: 'dsa' }
];

test('normalizeProblem keeps legacy fields and creates prompt/question aliases', () => {
  const normalized = normalizeProblem({
    id: 'legacy-1',
    type: 'coding',
    category: 'dsa',
    topicId: 'sliding-window',
    title: 'Legacy problem',
    difficulty: 'Easy',
    question: 'Legacy question',
    scenario: 'Keep me'
  });

  assert.equal(normalized.prompt, 'Legacy question');
  assert.equal(normalized.question, 'Legacy question');
  assert.equal(normalized.scenario, 'Keep me');
});

test('validateProblem accepts a complete supported problem', () => {
  const result = validateProblem({
    id: 'valid-1',
    type: 'simple-system-design',
    category: 'system',
    topicId: 'scalability',
    title: 'Valid problem',
    difficulty: 'Easy',
    prompt: 'Explain the design.'
  }, { topics });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test('validateProblem reports invalid topicId and invalid problem type', () => {
  const result = validateProblem({
    id: 'invalid-1',
    type: 'unknown-type',
    category: 'system',
    topicId: 'missing-topic',
    title: 'Invalid problem',
    difficulty: 'Easy',
    prompt: 'Explain the design.'
  }, { topics });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((item) => item.field === 'type'));
  assert.ok(result.errors.some((item) => item.field === 'topicId'));
});

test('validateProblemCollection detects duplicate ids', () => {
  const result = validateProblemCollection([
    {
      id: 'duplicate-1',
      type: 'coding',
      category: 'dsa',
      topicId: 'sliding-window',
      title: 'First',
      difficulty: 'Easy',
      question: 'First question'
    },
    {
      id: 'duplicate-1',
      type: 'coding',
      category: 'dsa',
      topicId: 'sliding-window',
      title: 'Second',
      difficulty: 'Easy',
      question: 'Second question'
    }
  ], { topics });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((item) => item.field === 'id' && item.message.includes('Duplicate')));
});

test('discoverProblems loads default and named problem exports', async () => {
  const modules = {
    '../data/problems/system/scalability/a.js': async () => ({
      default: {
        id: 'discovered-default-1',
        type: 'simple-system-design',
        category: 'system',
        topicId: 'scalability',
        title: 'Default export',
        difficulty: 'Easy',
        question: 'Default question'
      }
    }),
    '../data/problems/dsa/sliding-window/b.js': async () => ({
      problem: {
        id: 'discovered-named-1',
        type: 'coding',
        category: 'dsa',
        topicId: 'sliding-window',
        title: 'Named export',
        difficulty: 'Medium',
        prompt: 'Named prompt'
      }
    })
  };

  const problems = await discoverProblems({ modules, topics });
  const byTopic = await getDiscoveredQuestionsForTopic('scalability', { modules, topics });

  assert.equal(problems.length, 2);
  assert.equal(byTopic.length, 1);
  assert.equal(byTopic[0].id, 'discovered-default-1');
});

test('defineMcqProblem accepts correctAnswer as index', () => {
  const problem = defineMcqProblem({
    id: 'mcq-index',
    topicId: 'sliding-window',
    title: 'Index answer',
    question: 'Pick one.',
    options: ['A', 'B'],
    correctAnswer: 1
  }, { topics });

  assert.equal(problem.type, 'mcq');
  assert.equal(problem.correctAnswer, 1);
  assert.equal(problem.answer, 1);
  assert.equal(validateProblem(problem, { topics }).valid, true);
});

test('defineMcqProblem accepts correctAnswer as exact option string', () => {
  const problem = defineMcqProblem({
    id: 'mcq-string',
    topicId: 'sliding-window',
    title: 'String answer',
    prompt: 'Pick one.',
    options: ['A', 'B'],
    correctAnswer: 'B'
  }, { topics });

  assert.equal(problem.correctAnswer, 1);
  assert.equal(problem.answer, 1);
  assert.equal(validateProblem(problem, { topics }).valid, true);
});

test('defineMcqProblem forces mcq type for legacy multiple-choice input', () => {
  const problem = defineMcqProblem({
    id: 'mcq-legacy-type',
    type: 'multiple-choice',
    topicId: 'sliding-window',
    title: 'Legacy type',
    prompt: 'Pick one.',
    options: ['A', 'B'],
    correctAnswer: 'B'
  }, { topics });

  assert.equal(problem.type, 'mcq');
  assert.equal(problem.correctAnswer, 1);
});

test('defineMcqProblem preserves answer when provided', () => {
  const problem = defineMcqProblem({
    id: 'mcq-preserve-answer',
    topicId: 'sliding-window',
    title: 'Preserve answer',
    prompt: 'Pick one.',
    options: ['A', 'B'],
    correctAnswer: 'B',
    answer: 'B'
  }, { topics });

  assert.equal(problem.correctAnswer, 1);
  assert.equal(problem.answer, 'B');
});

test('defineMcqProblem fails clearly for invalid correctAnswer', () => {
  assert.throws(
    () => defineMcqProblem({
      id: 'mcq-invalid',
      topicId: 'sliding-window',
      title: 'Invalid answer',
      prompt: 'Pick one.',
      options: ['A', 'B'],
      correctAnswer: 'C'
    }, { topics }),
    /correctAnswer must exactly match one of the provided options/
  );
});

test('defineLearningProblem supports educational content without options', () => {
  const problem = defineLearningProblem({
    id: 'learning-1',
    topicId: 'sliding-window',
    title: 'Learn windows',
    prompt: 'Explain the invariant.',
    explanation: 'Keep a valid window.',
    hints: ['Track left and right.'],
    starterThought: 'What changes when right moves?',
    relatedConcepts: ['invariant'],
    references: ['internal'],
    followUpQuestions: ['When should left move?']
  }, { topics });

  assert.equal(problem.type, 'learning');
  assert.equal(problem.options, undefined);
  assert.equal(validateProblem(problem, { topics }).valid, true);
});

test('defineSimpleSystemDesignProblem defaults system design type', () => {
  const problem = defineSimpleSystemDesignProblem({
    id: 'simple-system-1',
    topicId: 'scalability',
    title: 'Design a counter',
    question: 'Design a simple counter.'
  }, { topics });

  assert.equal(problem.type, 'simple-system-design');
  assert.equal(validateProblem(problem, { topics }).valid, true);
});

test('defineComplexSystemDesignProblem supports richer optional fields', () => {
  const problem = defineComplexSystemDesignProblem({
    id: 'complex-system-1',
    topicId: 'scalability',
    title: 'Design analytics',
    prompt: 'Design analytics.',
    requirements: ['high availability'],
    constraints: ['large traffic'],
    evaluationCriteria: ['trade-offs']
  }, { topics });

  assert.equal(problem.type, 'complex-system-design');
  assert.deepEqual(problem.requirements, ['high availability']);
  assert.equal(validateProblem(problem, { topics }).valid, true);
});

test('defineProblem infers category from topicId', () => {
  const problem = defineProblem({
    id: 'infer-category',
    type: 'coding',
    topicId: 'sliding-window',
    title: 'Infer category',
    prompt: 'Solve it.'
  }, { topics });

  assert.equal(problem.category, 'dsa');
  assert.ok(problem.tags.includes('dsa'));
  assert.ok(problem.tags.includes('sliding-window'));
});

test('defineProblem normalizes prompt and question aliases', () => {
  const promptOnly = defineProblem({
    id: 'prompt-only',
    type: 'coding',
    category: 'dsa',
    topicId: 'sliding-window',
    title: 'Prompt only',
    prompt: 'Prompt text.'
  }, { topics });
  const questionOnly = defineProblem({
    id: 'question-only',
    type: 'coding',
    category: 'dsa',
    topicId: 'sliding-window',
    title: 'Question only',
    question: 'Question text.'
  }, { topics });

  assert.equal(promptOnly.question, 'Prompt text.');
  assert.equal(questionOnly.prompt, 'Question text.');
});

test('defineProblem defaults metadata.authoringVersion to 2', () => {
  const problem = defineProblem({
    id: 'metadata-default',
    type: 'coding',
    category: 'dsa',
    topicId: 'sliding-window',
    title: 'Metadata',
    prompt: 'Solve it.'
  }, { topics });

  assert.equal(problem.metadata.authoringVersion, 2);
});

test('missing required fields still fail validation', () => {
  const problem = defineProblem({
    type: 'coding',
    topicId: 'sliding-window',
    prompt: 'Incomplete.'
  }, { topics });
  const result = validateProblem(problem, { topics });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((item) => item.field === 'id'));
  assert.ok(result.errors.some((item) => item.field === 'title'));
});

test('raw object exports remain backwards compatible', () => {
  const rawProblem = {
    id: 'raw-legacy',
    type: 'multiple-choice',
    category: 'dsa',
    topicId: 'sliding-window',
    title: 'Raw legacy',
    difficulty: 'Easy',
    question: 'Legacy question?',
    options: ['Yes', 'No'],
    answer: 'Yes'
  };
  const normalized = normalizeProblem(rawProblem);

  assert.equal(normalized.prompt, 'Legacy question?');
  assert.equal(validateProblem(normalized, { topics }).valid, true);
});
