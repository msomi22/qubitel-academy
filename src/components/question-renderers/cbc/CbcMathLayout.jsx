import {
  buildVerticalOperationRows,
  getVerticalOperationLayout
} from './mathLayout.js';

export default function CbcMathLayout({ question }) {
  const layout = getVerticalOperationLayout(question);
  if (!layout) return null;

  const { rows, underline, ariaLabel } = buildVerticalOperationRows(layout);

  return (
    <div className="cbc-math-layout" aria-label={ariaLabel} role="img">
      <pre className="cbc-vertical-operation">{rows.map((row) => `${row}\n`).join('')}{underline}</pre>
    </div>
  );
}