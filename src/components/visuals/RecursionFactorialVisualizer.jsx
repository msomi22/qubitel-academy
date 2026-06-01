import { useEffect, useState } from 'react';

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export default function RecursionFactorialVisualizer({ diagram }) {
  const frames = asArray(diagram?.frames);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [diagram]);

  if (!frames.length) return null;

  const descentSteps = asArray(diagram.descentSteps).length ? asArray(diagram.descentSteps) : [
    { step: 1, label: '1. fact(4)', value: '4!', kind: 'descent' },
    { step: 2, label: '2. fact(3)', value: '3!', kind: 'descent' },
    { step: 3, label: '3. fact(2)', value: '2!', kind: 'descent' },
    { step: 4, label: '✔ Base case: return 1', value: 'fact(1) = 1', kind: 'base' }
  ];

  const returnSteps = asArray(diagram.returnSteps).length ? asArray(diagram.returnSteps) : [
    { step: 8, label: 'fact(4) = 4 × 6', value: '= 24', kind: 'return' },
    { step: 7, label: 'fact(3) = 3 × 2', value: '= 6', kind: 'return' },
    { step: 6, label: 'fact(2) = 2 × 1', value: '= 2', kind: 'return' },
    { step: 5, label: 'fact(1) = 1', value: '1', kind: 'return' }
  ];

  const maxStep = frames.length - 1;
  const activeFrame = frames[activeIndex] || frames[0];

  const getStepClass = (step) => [
    'recursion-factorial-box',
    `is-${step.kind || 'descent'}`,
    activeIndex >= step.step ? 'is-visible' : '',
    activeIndex === step.step ? 'is-active' : ''
  ].filter(Boolean).join(' ');

  const goBack = () => setActiveIndex((current) => Math.max(0, current - 1));
  const goNext = () => setActiveIndex((current) => Math.min(maxStep, current + 1));
  const restart = () => setActiveIndex(0);

  return (
    <section className="recursion-factorial-shell" aria-label={diagram.title || 'Factorial recursion walkthrough'}>
      <style>{`
        .recursion-factorial-shell { max-width: 980px; margin: 0 auto; border-radius: 18px; background: #ffffff; color: #333333; box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08); padding: 1.25rem; }
        .recursion-factorial-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.4rem; }
        .recursion-factorial-column { display: flex; flex-direction: column; gap: 0.95rem; }
        .recursion-factorial-return-list { height: 100%; display: flex; flex-direction: column; justify-content: flex-end; gap: 0.95rem; }
        .recursion-factorial-header { text-align: center; margin-bottom: 0.3rem; }
        .recursion-factorial-header h3 { margin: 0 0 0.25rem; font-family: inherit; font-size: 1.38rem; font-weight: 900; letter-spacing: 0.02em; }
        .recursion-factorial-header p { margin: 0; color: #666666; font-size: 0.95rem; line-height: 1.35; }
        .recursion-factorial-header.is-descent h3 { color: #4263eb; }
        .recursion-factorial-header.is-return h3 { color: #0ca678; }
        .recursion-factorial-box { min-height: 66px; display: flex; align-items: center; justify-content: space-between; gap: 1rem; border: 2px solid; border-radius: 12px; padding: 0.9rem 1.15rem; font-size: 1.08rem; font-weight: 850; opacity: 0.12; transform: translateY(-10px); transition: opacity 220ms ease, transform 220ms ease, box-shadow 220ms ease; }
        .recursion-factorial-box.is-visible { opacity: 1; transform: translateY(0); box-shadow: 0 10px 20px rgba(15, 23, 42, 0.05); }
        .recursion-factorial-box.is-active { box-shadow: 0 0 0 4px rgba(66, 99, 235, 0.14), 0 14px 24px rgba(15, 23, 42, 0.08); }
        .recursion-factorial-box.is-descent { background: #eef2ff; border-color: #c7d2fe; color: #4263eb; }
        .recursion-factorial-box.is-base { background: #ebfbee; border-color: #8ce99a; color: #2b8a3e; }
        .recursion-factorial-box.is-return { background: #e6fcf5; border-color: #96f2d7; color: #0ca678; }
        .recursion-factorial-controls { display: grid; grid-template-columns: auto auto minmax(0, 1fr) auto; align-items: center; gap: 0.75rem; margin-top: 1.25rem; padding-top: 1.2rem; border-top: 1px solid #eeeeee; }
        .recursion-factorial-controls button { border: 0; border-radius: 10px; padding: 0.7rem 1.2rem; font: inherit; font-size: 1rem; font-weight: 900; cursor: pointer; transition: background 160ms ease, opacity 160ms ease; }
        .recursion-factorial-controls button:disabled { background: #e9ecef; color: #adb5bd; cursor: not-allowed; opacity: 1; }
        .recursion-factorial-back, .recursion-factorial-restart { background: #f1f3f5; color: #495057; }
        .recursion-factorial-next { background: #4263eb; color: #ffffff; }
        .recursion-factorial-status { margin: 0; text-align: center; color: #495057; font-size: 1.02rem; font-weight: 650; line-height: 1.35; }
        @media (max-width: 860px) { .recursion-factorial-grid { grid-template-columns: 1fr; } .recursion-factorial-return-list { justify-content: flex-start; } .recursion-factorial-controls { grid-template-columns: 1fr 1fr; } .recursion-factorial-status { grid-column: 1 / -1; grid-row: 1; } }
      `}</style>

      <div className="recursion-factorial-grid">
        <div className="recursion-factorial-column">
          <div className="recursion-factorial-header is-descent">
            <h3>{diagram.descentTitle || 'CALL STACK (DESCENT)'}</h3>
            <p>{diagram.descentSubtitle || 'We keep calling the function with smaller inputs.'}</p>
          </div>
          {descentSteps.map((step) => (
            <div className={getStepClass(step)} key={step.step}>
              <span>{step.label}</span>
              <span>{step.value}</span>
            </div>
          ))}
        </div>

        <div className="recursion-factorial-column">
          <div className="recursion-factorial-header is-return">
            <h3>{diagram.returnTitle || 'UNWINDING (RETURN)'}</h3>
            <p>{diagram.returnSubtitle || 'We return and build the result back up.'}</p>
          </div>
          <div className="recursion-factorial-return-list">
            {returnSteps.map((step) => (
              <div className={getStepClass(step)} key={step.step}>
                <span>{step.label}</span>
                <span>{step.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recursion-factorial-controls" data-no-card-nav>
        <button type="button" className="recursion-factorial-back" onClick={goBack} disabled={activeIndex === 0}>← Back</button>
        <button type="button" className="recursion-factorial-restart" onClick={restart} disabled={activeIndex === 0}>↺ Restart</button>
        <p className="recursion-factorial-status" role="status">{activeFrame.description || diagram.summary}</p>
        <button type="button" className="recursion-factorial-next" onClick={goNext} disabled={activeIndex >= maxStep}>Next →</button>
      </div>
    </section>
  );
}
