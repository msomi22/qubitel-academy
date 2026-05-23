import { useEffect, useState } from 'react';
import { formatVisualValue, getSemanticRoleClass, getVisualFrames } from './visualTypes.js';

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeEntries(state = {}) {
  if (Array.isArray(state.values)) return state.values.map((value, index) => [index, value, true]);
  return Object.entries(state.values || state).map(([key, value]) => [key, value, false]);
}

function VisualLegend({ legend = [] }) {
  if (!legend.length) return null;

  return (
    <div className="config-visual-legend" aria-label="Visual legend">
      {legend.map((item) => (
        <span className={`config-visual-legend-item ${getSemanticRoleClass(item.role)}`} key={`${item.role}-${item.label}`}>
          <span aria-hidden="true">{item.marker || item.label}</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

function VisualShell({ diagram, activeFrame, activeIndex, frameCount, playing, onPrevious, onNext, onTogglePlay, children }) {
  return (
    <section className={`config-visual config-visual-${diagram.type || 'generic'} config-visual-${diagram.variant || 'default'}`} aria-label={diagram.title || 'Visual walkthrough'}>
      <style>{`
        .config-visual { display: grid; gap: 1rem; }
        .config-visual * { box-sizing: border-box; }
        .config-visual-layout { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.85fr); gap: 1rem; align-items: start; }
        .config-visual-card { min-width: 0; border: 1px solid rgba(86, 67, 42, 0.16); border-radius: 24px; background: rgba(255, 252, 244, 0.78); box-shadow: 0 18px 45px rgba(74, 53, 27, 0.08); padding: 1rem; overflow: hidden; }
        .config-visual-card h3 { margin: 0 0 0.35rem; font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-strong, #2f261b); }
        .config-visual-muted { margin: 0 0 0.85rem; color: var(--text-muted, #756a5a); font-size: 0.92rem; line-height: 1.55; }
        .config-visual-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 0.9rem; }
        .config-visual-controls button { border: 1px solid rgba(86, 67, 42, 0.16); border-radius: 999px; background: rgba(255, 255, 255, 0.68); color: var(--text-strong, #2f261b); padding: 0.45rem 0.7rem; font: inherit; font-weight: 800; cursor: pointer; }
        .config-visual-controls button:disabled { cursor: not-allowed; opacity: 0.48; }
        .config-visual-controls span { margin-left: auto; color: var(--text-muted, #756a5a); font-size: 0.84rem; font-weight: 800; }
        .config-visual-explanation, .config-visual-final { margin-top: 0.85rem; border-radius: 18px; background: rgba(255, 255, 255, 0.58); border: 1px solid rgba(86, 67, 42, 0.12); padding: 0.85rem; }
        .config-visual-final { border-color: rgba(82, 116, 76, 0.24); background: rgba(82, 116, 76, 0.12); }
        .config-visual-explanation strong, .config-visual-final strong { display: block; margin-bottom: 0.25rem; color: var(--text-strong, #2f261b); }
        .config-visual-explanation p, .config-visual-final p { margin: 0; color: var(--text-muted, #756a5a); line-height: 1.55; }
        .config-visual-legend { display: flex; flex-wrap: wrap; gap: 0.45rem; margin: 0.9rem 0; }
        .config-visual-legend-item { display: inline-flex; align-items: center; gap: 0.35rem; border: 1px solid rgba(86, 67, 42, 0.12); background: rgba(255,255,255,0.5); border-radius: 999px; padding: 0.35rem 0.55rem; font-size: 0.8rem; color: var(--text-muted, #756a5a); }
        .config-visual-pill-list, .config-visual-state-values { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .config-visual-pill { border-radius: 999px; background: rgba(255, 255, 255, 0.58); border: 1px solid rgba(86, 67, 42, 0.12); padding: 0.4rem 0.62rem; font-weight: 800; color: var(--text-strong, #2f261b); }
        .config-visual-state-list { display: grid; gap: 0.45rem; }
        .config-visual-state-list.is-scrollable { max-height: 29rem; overflow-y: auto; overscroll-behavior: contain; padding-right: 0.35rem; scrollbar-gutter: stable; }
        .config-visual-state-row { border: 1px solid rgba(86, 67, 42, 0.12); border-radius: 16px; background: rgba(255,255,255,0.48); padding: 0.6rem; }
        .config-visual-state-row.active { background: rgba(234, 190, 117, 0.2); border-color: rgba(154, 104, 34, 0.28); }
        .config-visual-state-row strong { display: block; margin-bottom: 0.45rem; color: var(--text-strong, #2f261b); }
        .config-visual-state-row p { margin: 0.35rem 0 0; color: var(--text-muted, #756a5a); font-size: 0.8rem; }
        .config-visual-state-value { border-radius: 999px; background: rgba(255, 252, 244, 0.9); border: 1px solid rgba(86, 67, 42, 0.12); padding: 0.25rem 0.45rem; font-family: var(--font-mono); font-size: 0.8rem; }
        .config-visual-state-value.infinite { color: #8c392c; font-weight: 900; }
        .config-visual-list { display: grid; gap: 0.6rem; }
        .config-visual-node { border: 1px solid rgba(86, 67, 42, 0.13); border-radius: 18px; background: rgba(255, 255, 255, 0.5); padding: 0.7rem; color: var(--text-strong, #2f261b); }
        .config-visual-role-active, .config-visual-role-current { background: rgba(82, 116, 76, 0.16); border-color: rgba(82, 116, 76, 0.35); }
        .config-visual-role-window { background: rgba(37, 99, 235, 0.12); border-color: rgba(37, 99, 235, 0.42); color: #1d4ed8; box-shadow: inset 0 -3px 0 rgba(37, 99, 235, 0.18); }
        .config-visual-role-remove { background: rgba(220, 38, 38, 0.1); border-color: rgba(220, 38, 38, 0.42); color: #b91c1c; }
        .config-visual-role-add { background: rgba(22, 163, 74, 0.12); border-color: rgba(22, 163, 74, 0.42); color: #15803d; }
        .config-visual-role-best { background: rgba(245, 158, 11, 0.18); border-color: rgba(217, 119, 6, 0.5); color: #92400e; box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.12); }
        .config-visual-role-muted, .config-visual-role-visited { opacity: 0.72; }
        .config-visual-role-blocked, .config-visual-role-error, .config-visual-role-infinite { background: rgba(140, 57, 44, 0.1); border-color: rgba(140, 57, 44, 0.22); color: #8c392c; }
        .config-visual-role-goal, .config-visual-role-answer, .config-visual-role-success { background: rgba(82, 116, 76, 0.12); border-color: rgba(82, 116, 76, 0.26); }
        .config-visual-array { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
        .config-visual-array-cell { display: grid; justify-items: center; gap: 0.25rem; }
        .config-visual-array-index { color: var(--text-muted, #756a5a); font-size: 0.74rem; font-weight: 800; }
        .config-visual-array-item { min-width: 44px; min-height: 44px; display: grid; place-items: center; border-radius: 15px; border: 1px solid rgba(86, 67, 42, 0.14); background: rgba(255,255,255,0.54); font-weight: 900; transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease; }
        .config-visual-array-caption { min-height: 1rem; color: var(--text-muted, #756a5a); font-size: 0.72rem; font-weight: 800; }
        .config-visual-table { width: 100%; border-collapse: separate; border-spacing: 0.35rem; }
        .config-visual-table th, .config-visual-table td { border: 1px solid rgba(86, 67, 42, 0.12); background: rgba(255,255,255,0.48); border-radius: 12px; padding: 0.55rem; text-align: left; }
        .config-visual-timeline { display: grid; gap: 0.65rem; }
        .config-visual-timeline-step { display: grid; grid-template-columns: 2rem minmax(0, 1fr); gap: 0.55rem; align-items: start; }
        .config-visual-timeline-dot { width: 1.25rem; height: 1.25rem; border-radius: 999px; border: 2px solid rgba(86, 67, 42, 0.18); background: rgba(255,255,255,0.7); margin-top: 0.25rem; }
        .config-visual-timeline-step.is-active .config-visual-timeline-dot { background: rgba(82, 116, 76, 0.35); border-color: rgba(82, 116, 76, 0.45); }
        .config-visual-edge-list { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem; }
        .container-water { display: grid; gap: 1rem; }
        .container-water-stage { position: relative; min-height: 420px; border-radius: 24px; border: 1px solid rgba(148, 163, 184, 0.22); background: radial-gradient(circle at 25% 20%, rgba(59, 130, 246, 0.18), transparent 32%), linear-gradient(135deg, #07111f 0%, #0f172a 58%, #111827 100%); color: #f8fafc; padding: 1rem 1rem 3.9rem; overflow: hidden; }
        .container-water-chart { position: absolute; inset: 3rem 1.2rem 5.8rem 3.2rem; border-left: 2px solid rgba(226, 232, 240, 0.82); border-bottom: 2px solid rgba(226, 232, 240, 0.82); }
        .container-water-bar { position: absolute; bottom: 0; width: 4.5%; min-width: 18px; border: 2px solid rgba(226, 232, 240, 0.7); background: linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0.08)); border-radius: 6px 6px 0 0; transform: translateX(-50%); box-shadow: 0 10px 22px rgba(0,0,0,0.18); }
        .container-water-bar.left { border-color: #fb7185; background: linear-gradient(180deg, rgba(248, 113, 113, 0.44), rgba(248, 113, 113, 0.16)); box-shadow: 0 0 0 2px rgba(248, 113, 113, 0.2); }
        .container-water-bar.right { border-color: #4ade80; background: linear-gradient(180deg, rgba(74, 222, 128, 0.42), rgba(74, 222, 128, 0.16)); box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.18); }
        .container-water-bar.best { border-color: #facc15; box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.2), 0 0 24px rgba(250, 204, 21, 0.18); }
        .container-water-value { position: absolute; top: -1.6rem; left: 50%; transform: translateX(-50%); font-size: 0.78rem; font-weight: 900; color: #f8fafc; }
        .container-water-index { position: absolute; bottom: -1.75rem; left: 50%; transform: translateX(-50%); font-size: 0.78rem; font-weight: 800; color: #cbd5e1; }
        .container-water-pointer { position: absolute; bottom: -3.45rem; left: 50%; transform: translateX(-50%); font-size: 0.75rem; font-weight: 900; line-height: 1.05; text-align: center; }
        .container-water-pointer.left { color: #fb7185; } .container-water-pointer.right { color: #4ade80; }
        .container-water-fill { position: absolute; bottom: 0; border: 1px solid rgba(96, 165, 250, 0.55); background: linear-gradient(180deg, rgba(96, 165, 250, 0.58), rgba(37, 99, 235, 0.34)); box-shadow: inset 0 12px 24px rgba(191, 219, 254, 0.12); }
        .container-water-fill::before { content: ''; position: absolute; left: 0; right: 0; top: 0; border-top: 2px dashed rgba(191, 219, 254, 0.9); }
        .container-water-width { position: absolute; left: 3.2rem; right: 1.2rem; bottom: 1.2rem; display: flex; align-items: center; justify-content: center; color: #60a5fa; font-weight: 900; font-size: 0.86rem; }
        .container-water-width::before, .container-water-width::after { content: ''; height: 1px; flex: 1; border-top: 2px dashed rgba(226, 232, 240, 0.68); margin: 0 0.65rem; }
        .container-water-y-label { position: absolute; left: 1rem; color: #cbd5e1; font-size: 0.76rem; transform: translateY(50%); }
        .container-water-panels { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0.8rem; }
        .container-water-panel { border-radius: 20px; border: 1px solid rgba(148, 163, 184, 0.18); background: rgba(15, 23, 42, 0.86); color: #e2e8f0; padding: 0.9rem; }
        .container-water-panel h4 { margin: 0 0 0.65rem; color: #60a5fa; font-size: 0.95rem; }
        .container-water-metric { display: flex; justify-content: space-between; gap: 1rem; padding: 0.35rem 0; font-weight: 800; }
        .container-water-metric span:first-child { color: #cbd5e1; font-weight: 650; }
        .container-water-reason { margin: 0; color: #e2e8f0; line-height: 1.55; }
        .container-water-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 0.65rem; }
        .container-water-thumb { border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 18px; background: rgba(15, 23, 42, 0.78); color: #cbd5e1; padding: 0.65rem; min-height: 132px; }
        .container-water-thumb.active { border-color: #60a5fa; box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.22); }
        .container-water-thumb strong { display: inline-grid; place-items: center; width: 1.45rem; height: 1.45rem; border-radius: 999px; background: #3b82f6; color: white; margin-bottom: 0.45rem; }
        .container-water-thumb p { margin: 0; font-size: 0.82rem; line-height: 1.35; }
        .container-water-takeaway { display: grid; grid-template-columns: minmax(0, 1fr) minmax(180px, 0.55fr); gap: 1rem; border-radius: 22px; border: 1px solid rgba(34, 197, 94, 0.25); background: rgba(15, 23, 42, 0.88); color: #dbeafe; padding: 1rem; }
        .container-water-takeaway strong { color: #4ade80; display: block; margin-bottom: 0.35rem; }
        .container-water-mini { position: relative; min-height: 96px; border-bottom: 2px dashed rgba(226, 232, 240, 0.85); }
        .container-water-mini-wall { position: absolute; bottom: 0; width: 18px; border: 2px solid #fb7185; background: rgba(248, 113, 113, 0.2); }
        .container-water-mini-wall.right { right: 14px; left: auto; border-color: #4ade80; background: rgba(74, 222, 128, 0.2); }
        .container-water-mini-fill { position: absolute; bottom: 0; left: 34px; right: 32px; height: 54px; border-top: 2px dashed rgba(191, 219, 254, 0.9); background: rgba(59, 130, 246, 0.42); }
        @media (max-width: 860px) { .config-visual-layout { grid-template-columns: 1fr; } .config-visual-controls span { width: 100%; margin-left: 0; } .container-water-stage { min-height: 350px; } .container-water-panels, .container-water-takeaway { grid-template-columns: 1fr; } }
      `}</style>

      <div className="config-visual-layout">
        <div className="config-visual-card">
          <h3>{diagram.title || 'Visual walkthrough'}</h3>
          {diagram.description ? <p className="config-visual-muted">{diagram.description}</p> : null}

          {children}
          <VisualLegend legend={diagram.legend} />

          {frameCount > 1 ? (
            <div className="config-visual-controls" data-no-card-nav>
              <button type="button" onClick={onPrevious} disabled={activeIndex === 0}>Previous</button>
              <button type="button" onClick={onTogglePlay}>{playing ? 'Pause' : activeIndex >= frameCount - 1 ? 'Replay' : 'Play'}</button>
              <button type="button" onClick={onNext} disabled={activeIndex >= frameCount - 1}>Next</button>
              <span>Step {activeIndex + 1} of {frameCount}</span>
            </div>
          ) : null}

          <div className="config-visual-explanation">
            <strong>{activeFrame?.title || 'Current step'}</strong>
            <p>{activeFrame?.description || diagram.summary}</p>
          </div>

          {activeFrame?.finalResult ? (
            <div className="config-visual-final" role="status">
              <strong>{activeFrame.finalResult.title || 'Final answer'}</strong>
              <p>{activeFrame.finalResult.body}</p>
            </div>
          ) : null}
        </div>

        <StatePanel diagram={diagram} frames={getVisualFrames(diagram)} activeIndex={activeIndex} />
      </div>
    </section>
  );
}

function StatePanel({ diagram, frames, activeIndex }) {
  const rows = frames.slice(0, activeIndex + 1).filter((frame) => frame.state || frame.metrics);

  if (!rows.length) return null;

  const stateListClass = `config-visual-state-list ${rows.length > 3 ? 'is-scrollable' : ''}`.trim();

  return (
    <aside className="config-visual-card">
      <h3>{diagram.stateTitle || 'State evolution'}</h3>
      {diagram.stateDescription ? <p className="config-visual-muted">{diagram.stateDescription}</p> : null}
      <div className={stateListClass}>
        {rows.map((frame, index) => {
          const state = frame.state || frame.metrics || {};
          const entries = normalizeEntries(state);

          return (
            <div className={`config-visual-state-row ${index === rows.length - 1 ? 'active' : ''}`} key={`${frame.title}-${index}`}>
              <strong>{state.label || frame.title || `S${index}`}</strong>
              <span className="config-visual-state-values">
                {entries.map(([key, value, isArrayValue]) => (
                  <span className={`config-visual-state-value ${formatVisualValue(value) === '∞' ? 'infinite' : ''}`} key={`${key}-${value}`}>
                    {isArrayValue ? formatVisualValue(value) : `${key}: ${formatVisualValue(value)}`}
                  </span>
                ))}
              </span>
              {state.helper ? <p>{state.helper}</p> : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function ArrayView({ diagram, frame }) {
  const values = asArray(diagram.values || diagram.items);
  const frameItems = new Map(asArray(frame.items).map((item) => [item.index, item]));
  const activeRange = frame.activeRange || frame.window;

  return (
    <div className="config-visual-array">
      {values.map((value, index) => {
        const override = frameItems.get(index) || {};
        const inRange = Array.isArray(activeRange) && index >= activeRange[0] && index <= activeRange[1];
        const role = override.role || (inRange ? 'window' : 'neutral');
        return (
          <span className="config-visual-array-cell" key={`${value}-${index}`}>
            <span className="config-visual-array-index">{index}</span>
            <span className={`config-visual-array-item ${getSemanticRoleClass(role)}`}>{override.label || formatVisualValue(value)}</span>
            <span className="config-visual-array-caption">{override.caption || (inRange ? 'window' : '')}</span>
          </span>
        );
      })}
    </div>
  );
}

function ContainerWaterView({ diagram, frame, activeIndex, frames }) {
  const heights = asArray(diagram.values);
  const maxHeight = Math.max(...heights, 1);
  const left = frame.left ?? frame.pointers?.left ?? 0;
  const right = frame.right ?? frame.pointers?.right ?? heights.length - 1;
  const width = frame.width ?? Math.max(0, right - left);
  const waterLevel = frame.waterLevel ?? Math.min(heights[left] || 0, heights[right] || 0);
  const area = frame.area ?? width * waterLevel;
  const best = frame.best ?? area;
  const bestPair = frame.bestPair || diagram.bestPair || [left, right];
  const movePointer = frame.movePointer || (heights[left] <= heights[right] ? 'left' : 'right');
  const chartLeft = 6;
  const chartWidth = 88;
  const spacing = heights.length > 1 ? chartWidth / (heights.length - 1) : chartWidth;
  const xFor = (index) => chartLeft + spacing * index;
  const waterLeft = Math.min(xFor(left), xFor(right));
  const waterRight = Math.max(xFor(left), xFor(right));
  const waterHeight = (waterLevel / maxHeight) * 100;

  return (
    <div className="container-water">
      <div className="container-water-stage">
        {[8, 7, 6, 5, 4, 3, 2, 1].map((label) => (
          <span className="container-water-y-label" style={{ bottom: `${(label / maxHeight) * 73}%` }} key={label}>{label}</span>
        ))}
        <div className="container-water-chart">
          <div
            className="container-water-fill"
            style={{ left: `${waterLeft}%`, width: `${waterRight - waterLeft}%`, height: `${waterHeight}%` }}
            aria-label={`Water level ${waterLevel}`}
          />
          {heights.map((height, index) => {
            const isLeft = index === left;
            const isRight = index === right;
            const isBest = bestPair.includes(index);
            const className = ['container-water-bar', isLeft ? 'left' : '', isRight ? 'right' : '', isBest ? 'best' : ''].filter(Boolean).join(' ');
            return (
              <span className={className} style={{ left: `${xFor(index)}%`, height: `${(height / maxHeight) * 100}%` }} key={`${height}-${index}`}>
                <span className="container-water-value">{height}</span>
                <span className="container-water-index">{index}</span>
                {isLeft ? <span className="container-water-pointer left">↑<br />left</span> : null}
                {isRight ? <span className="container-water-pointer right">↑<br />right</span> : null}
              </span>
            );
          })}
        </div>
        <div className="container-water-width">width = {width}</div>
      </div>

      <div className="container-water-panels">
        <article className="container-water-panel">
          <h4>Current Container</h4>
          <div className="container-water-metric"><span>Left Index</span><strong>{left}</strong></div>
          <div className="container-water-metric"><span>Right Index</span><strong>{right}</strong></div>
          <div className="container-water-metric"><span>Width</span><strong>{width}</strong></div>
          <div className="container-water-metric"><span>Water Level</span><strong>{waterLevel}</strong></div>
          <div className="container-water-metric"><span>Area</span><strong>{width} × {waterLevel} = {area}</strong></div>
          <div className="container-water-metric"><span>Best So Far</span><strong>{best}</strong></div>
        </article>
        <article className="container-water-panel">
          <h4>Why move the {movePointer} pointer?</h4>
          <p className="container-water-reason">{frame.reason || 'The shorter wall is the bottleneck. Moving the taller wall would only shrink the width while the same short wall still limits the water level.'}</p>
        </article>
      </div>

      <div className="container-water-strip" aria-label="Walkthrough steps">
        {frames.map((step, index) => (
          <article className={`container-water-thumb ${index === activeIndex ? 'active' : ''}`} key={`${step.title}-${index}`}>
            <strong>{index + 1}</strong>
            <p>{step.short || step.title}</p>
            {step.best ? <p>⭐ Best: {step.best}</p> : null}
          </article>
        ))}
      </div>

      <div className="container-water-takeaway">
        <div>
          <strong>Key Takeaway</strong>
          <p>{diagram.takeaway || 'The area is limited by the shorter wall. Moving the taller wall will not fix the spill point, so always move the pointer at the shorter wall.'}</p>
        </div>
        <div className="container-water-mini" aria-hidden="true">
          <span className="container-water-mini-wall" style={{ left: '20px', height: '64px' }} />
          <span className="container-water-mini-fill" />
          <span className="container-water-mini-wall right" style={{ height: '86px' }} />
        </div>
      </div>
    </div>
  );
}

function TimelineView({ diagram, frame, activeIndex }) {
  const steps = asArray(diagram.steps || diagram.items || diagram.frames);

  return (
    <div className="config-visual-timeline">
      {steps.map((step, index) => {
        const active = index <= activeIndex || step.id === frame.stepId;
        return (
          <div className={`config-visual-timeline-step ${active ? 'is-active' : ''}`} key={`${step.title || step.label}-${index}`}>
            <span className="config-visual-timeline-dot" aria-hidden="true" />
            <div className={`config-visual-node ${getSemanticRoleClass(step.role || (active ? 'active' : 'neutral'))}`}>
              <strong>{step.title || step.label || `Step ${index + 1}`}</strong>
              {step.description ? <p className="config-visual-muted">{step.description}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TableView({ diagram, frame }) {
  const columns = asArray(diagram.columns);
  const rows = asArray(frame.rows || diagram.rows);

  return (
    <table className="config-visual-table">
      <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {columns.map((column) => {
              const value = Array.isArray(row) ? row[columns.indexOf(column)] : row[column];
              return <td key={`${column}-${rowIndex}`}>{formatVisualValue(value)}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CardsView({ diagram, frame }) {
  const cards = asArray(frame.cards || diagram.cards || diagram.items);

  return (
    <div className="config-visual-list">
      {cards.map((card, index) => (
        <article className={`config-visual-node ${getSemanticRoleClass(card.role)}`} key={`${card.title || card.label}-${index}`}>
          <strong>{card.title || card.label}</strong>
          {card.description ? <p className="config-visual-muted">{card.description}</p> : null}
        </article>
      ))}
    </div>
  );
}

function GraphLikeView({ diagram, frame }) {
  const nodes = asArray(diagram.nodes || frame.nodes);
  const edges = asArray(diagram.edges || frame.edges);
  const activeIds = new Set(asArray(frame.activeNodes || frame.activeIds));
  const visitedIds = new Set(asArray(frame.visitedNodes || frame.visitedIds));

  return (
    <div>
      <div className="config-visual-pill-list">
        {nodes.map((node) => {
          const id = node.id || node.label;
          const role = activeIds.has(id) ? 'active' : visitedIds.has(id) ? 'visited' : node.role;
          return <span className={`config-visual-pill ${getSemanticRoleClass(role)}`} key={id}>{node.label || id}</span>;
        })}
      </div>
      {edges.length ? (
        <div className="config-visual-edge-list">
          {edges.map((edge, index) => <span className="config-visual-state-value" key={`edge-${index}`}>{edge.from} → {edge.to}{edge.weight !== undefined ? ` (${edge.weight})` : ''}</span>)}
        </div>
      ) : null}
    </div>
  );
}

export default function ConfigVisualizer({ diagram }) {
  const frames = getVisualFrames(diagram);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const activeFrame = frames[activeIndex] || frames[0] || {};

  useEffect(() => {
    setActiveIndex(0);
    setPlaying(false);
  }, [diagram]);

  useEffect(() => {
    if (!playing || frames.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current >= frames.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, diagram?.intervalMs || 1400);
    return () => window.clearInterval(timer);
  }, [diagram?.intervalMs, frames.length, playing]);

  if (!frames.length) return null;

  const goPrevious = () => {
    setPlaying(false);
    setActiveIndex((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    setPlaying(false);
    setActiveIndex((current) => Math.min(frames.length - 1, current + 1));
  };

  const togglePlay = () => {
    if (activeIndex >= frames.length - 1) {
      setActiveIndex(0);
      setPlaying(true);
      return;
    }
    setPlaying((current) => !current);
  };

  const visualType = String(diagram.type || '').toLowerCase();
  const view = (() => {
    if (visualType === 'container-water') return <ContainerWaterView diagram={diagram} frame={activeFrame} activeIndex={activeIndex} frames={frames} />;
    if (visualType === 'array') return <ArrayView diagram={diagram} frame={activeFrame} />;
    if (visualType === 'timeline' || visualType === 'state') return <TimelineView diagram={diagram} frame={activeFrame} activeIndex={activeIndex} />;
    if (visualType === 'table') return <TableView diagram={diagram} frame={activeFrame} />;
    if (visualType === 'cards') return <CardsView diagram={diagram} frame={activeFrame} />;
    if (['graph', 'tree', 'heap'].includes(visualType)) return <GraphLikeView diagram={diagram} frame={activeFrame} />;
    return <CardsView diagram={diagram} frame={activeFrame} />;
  })();

  return (
    <VisualShell
      diagram={diagram}
      activeFrame={activeFrame}
      activeIndex={activeIndex}
      frameCount={frames.length}
      playing={playing}
      onPrevious={goPrevious}
      onNext={goNext}
      onTogglePlay={togglePlay}
    >
      {view}
    </VisualShell>
  );
}
