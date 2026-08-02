export function getVerticalOperationLayout(question = {}) {
  const layout = question?.rendering?.mathLayout || question?.metadata?.rendering?.mathLayout || null;
  return layout?.type === 'vertical-operation' ? layout : null;
}

export function buildVerticalOperationRows(layout = {}) {
  const operands = Array.isArray(layout.operands) ? layout.operands.map(String) : [];
  const operator = String(layout.operator || '').trim();
  const longestOperand = operands.reduce((longest, operand) => Math.max(longest, operand.length), 0);
  const width = Math.max(longestOperand + (operator ? 2 : 0), 3);

  const rows = operands.map((operand, index) => {
    const prefix = index === operands.length - 1 && operator ? operator : ' ';
    return `${prefix} ${operand.padStart(longestOperand, ' ')}`.padStart(width, ' ');
  });

  return {
    rows,
    underline: layout.underline === false ? '' : '_'.repeat(width),
    ariaLabel: layout.ariaLabel || `${operands.join(` ${operator} `)}`.trim()
  };
}