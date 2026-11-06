import { Question } from '../types';

export function calculateCourseProgress(completedLecturesCount: number, totalLecturesCount: number): number {
  if (totalLecturesCount <= 0) return 0;
  const progress = (completedLecturesCount / totalLecturesCount) * 100;
  return Math.min(100, Math.round(progress));
}

export interface QuizEvaluationResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  isPassed: boolean;
  questionResults: {
    questionId: string;
    selectedIndex: number;
    correctIndex: number;
    isCorrect: boolean;
  }[];
}

export function evaluateQuiz(
  questions: Question[],
  selectedAnswers: Record<string, number>,
  passingPercent: number = 70
): QuizEvaluationResult {
  let score = 0;
  const questionResults = questions.map((q) => {
    const selected = selectedAnswers[q.id];
    const isCorrect = selected === q.correctOptionIndex;
    if (isCorrect) score += 1;
    return {
      questionId: q.id,
      selectedIndex: selected !== undefined ? selected : -1,
      correctIndex: q.correctOptionIndex,
      isCorrect,
    };
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const isPassed = percentage >= passingPercent;

  return {
    score,
    totalQuestions,
    percentage,
    isPassed,
    questionResults,
  };
}

export function calculateBatchAttendanceRate(attendanceEntries: { status: 'Present' | 'Absent' | 'Late' }[]): number {
  if (attendanceEntries.length === 0) return 0;
  const presentCount = attendanceEntries.filter(e => e.status === 'Present' || e.status === 'Late').length;
  return Math.round((presentCount / attendanceEntries.length) * 100);
}
