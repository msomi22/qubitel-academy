function ascii(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();
}

function escapePdfText(value) {
  return ascii(value)
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)');
}

function formatCompletedAt(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? ascii(value) : date.toLocaleString();
}

function reportLines(attempt, context = {}) {
  return [
    context.platformName || 'Qubitel Academy Platform',
    context.productName || 'CBC Exam Practice',
    '',
    `Academy: ${context.academyName || 'CBC Academy'}`,
    `Category: ${context.categoryName || 'Grade 3'}`,
    `Topic: ${context.topicName || 'English'}`,
    `Lesson / skill: ${context.skillName || 'Spelling'}`,
    '',
    `Exam: ${attempt.examTitle}`,
    `Attempt: ${attempt.attemptNumber}`,
    `Learner: ${context.learnerName || 'Learner'}`,
    `Completed: ${formatCompletedAt(attempt.completedAt)}`,
    `Status: ${attempt.status}`,
    '',
    `Score: ${attempt.correctCount} / ${attempt.totalQuestions}`,
    `Percentage: ${attempt.percentage}%`,
    `Incorrect answers: ${attempt.incorrectCount}`,
    `Unanswered or timed out: ${attempt.unansweredCount}`
  ];
}

export function createExamResultPdf(attempt, context = {}) {
  const lines = reportLines(attempt, context);
  const textCommands = lines
    .map((line) => `(${escapePdfText(line)}) Tj\nT*`)
    .join('\n');
  const stream = `BT\n/F1 12 Tf\n50 760 Td\n20 TL\n${textCommands}\nET`;
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\nendobj',
    `4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj'
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }

  const xrefOffset = pdf.length;
  const xrefRows = offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, '0')} 00000 n `)
    .join('\n');

  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${xrefRows}\n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return pdf;
}

export function downloadExamResultPdf(attempt, context = {}) {
  const pdf = createExamResultPdf(attempt, context);
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${attempt.examId}-attempt-${attempt.attemptNumber}.pdf`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
