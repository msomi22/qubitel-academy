export type AssessmentExamMode = 'timed-comprehension';

export type AssessmentExamDescriptorInput = {
  manifestId: string;
  runtimeExamId: string;
  title: string;
  description?: string;
  sourceFile: string;
  questionCount: number;
  questionTimeSeconds: number;
  examMode?: AssessmentExamMode;
};

export type AssessmentExamDescriptor = {
  id: string;
  title: string;
  description?: string;
  estimatedTime: string;
  metadata: {
    manifestId: string;
    examId: string;
    examTitle: string;
    sourceFile: string;
    questionCount: number;
    questionTimeSeconds: number;
    totalTimeSeconds: number;
    assessmentType: 'exam';
    examMode?: AssessmentExamMode;
  };
};

function requireText(value: string, fieldName: string): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(`${fieldName} must be a non-empty string.`);
  }

  return normalizedValue;
}

function requirePositiveInteger(value: number, fieldName: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive integer.`);
  }

  return value;
}

function formatEstimatedTime(totalTimeSeconds: number): string {
  if (totalTimeSeconds < 60) return `${totalTimeSeconds} sec`;

  const minutes = Math.floor(totalTimeSeconds / 60);
  const seconds = totalTimeSeconds % 60;

  return seconds === 0 ? `${minutes} min` : `${minutes} min ${seconds} sec`;
}

export function createAssessmentExamDescriptor(
  input: AssessmentExamDescriptorInput
): AssessmentExamDescriptor {
  const manifestId = requireText(input.manifestId, 'manifestId');
  const runtimeExamId = requireText(input.runtimeExamId, 'runtimeExamId');
  const title = requireText(input.title, 'title');
  const sourceFile = requireText(input.sourceFile, 'sourceFile');
  const questionCount = requirePositiveInteger(input.questionCount, 'questionCount');
  const questionTimeSeconds = requirePositiveInteger(
    input.questionTimeSeconds,
    'questionTimeSeconds'
  );
  const totalTimeSeconds = questionCount * questionTimeSeconds;
  const description = input.description?.trim();

  return {
    id: runtimeExamId,
    title,
    ...(description ? { description } : {}),
    estimatedTime: formatEstimatedTime(totalTimeSeconds),
    metadata: {
      manifestId,
      examId: runtimeExamId,
      examTitle: title,
      sourceFile,
      questionCount,
      questionTimeSeconds,
      totalTimeSeconds,
      assessmentType: 'exam',
      ...(input.examMode ? { examMode: input.examMode } : {})
    }
  };
}