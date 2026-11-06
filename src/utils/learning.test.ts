import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCourseProgress, evaluateQuiz, calculateBatchAttendanceRate } from './learning';
import { Question } from '../types';

test('calculateCourseProgress computes accurate percentage and caps at 100%', () => {
  assert.equal(calculateCourseProgress(10, 20), 50);
  assert.equal(calculateCourseProgress(17, 25), 68);
  assert.equal(calculateCourseProgress(0, 20), 0);
  assert.equal(calculateCourseProgress(25, 20), 100);
});

test('evaluateQuiz scores selections against answer key correctly', () => {
  const sampleQuestions: Question[] = [
    {
      id: 'q1',
      text: 'What is the primary objective of Capital Budgeting?',
      category: 'Finance',
      difficulty: 'Intermediate',
      options: ['Evaluating long-term investment projects', 'Managing day-to-day petty cash', 'Calculating income tax return', 'Issuing short-term credit notes'],
      correctOptionIndex: 0,
      explanation: 'Capital budgeting is the process of analyzing investment projects to maximize shareholder wealth.'
    },
    {
      id: 'q2',
      text: 'Which matrix maps market growth vs relative market share?',
      category: 'Strategy',
      difficulty: 'Basic',
      options: ['Ansoff Matrix', 'BCG Growth-Share Matrix', 'Porter Five Forces', 'SWOT Matrix'],
      correctOptionIndex: 1,
      explanation: 'The BCG matrix categorizes business units as Stars, Cash Cows, Question Marks, and Dogs.'
    }
  ];

  const fullScore = evaluateQuiz(sampleQuestions, { q1: 0, q2: 1 }, 70);
  assert.equal(fullScore.score, 2);
  assert.equal(fullScore.percentage, 100);
  assert.equal(fullScore.isPassed, true);

  const halfScore = evaluateQuiz(sampleQuestions, { q1: 0, q2: 0 }, 70);
  assert.equal(halfScore.score, 1);
  assert.equal(halfScore.percentage, 50);
  assert.equal(halfScore.isPassed, false);
});

test('calculateBatchAttendanceRate handles present and late attendees', () => {
  const entries: { status: 'Present' | 'Absent' | 'Late' }[] = [
    { status: 'Present' },
    { status: 'Present' },
    { status: 'Late' },
    { status: 'Absent' },
  ];
  assert.equal(calculateBatchAttendanceRate(entries), 75);
});
