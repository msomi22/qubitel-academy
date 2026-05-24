import { Fragment, useEffect, useMemo, useState } from 'react';

function normalizeIndex(value) {
  return Number.isInteger(value) ? value : Number.parseInt(value, 10);
}

function cellKey(row, col) {
  return `${row}:${col}`;
}

function formatValue(value) {
  if (value === Infinity || value === 'Infinity') return '∞';
  return String(value);
}

function buildCellMap(cells = []) {
  const map = new Map();

  cells.forEach((cell) => {
    const row = normalizeIndex(cell.row);
    const col = normalizeIndex(cell.col);
    if (!Number.isInteger(row) || !Number.isInteger(col)) return;

    map.set(cellKey(row, col), cell);
  });

  return map;
}

function VisualLegend({ legend = [] }) {
  if (!legend.length) return null;

  return (
    <div className="grid-visualizer-legend" aria-label="Visual legend">
      {legend.map((item) => (
        <span className="grid-visualizer-legend-item" key={`${item.role}-${item.label}`}>
          <span aria-hidden="true">{item.marker || item.label}</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

function VisualControls({ activeIndex, total, playing, onPrevious, onNext, onTogglePlay }) {
  if (total <= 1) return null;

  return (
    <div className="grid-visualizer-controls" data-no-card-nav>
      <button type="button" onClick={onPrevious} disabled={activeIndex === 0}>Previous</button>
      <button type="button" onClick={onTogglePlay}>{playing ? 'Pause' : activeIndex >= total - 1 ? 'Replay' : 'Play'}</button>
      <button type="button" onClick={onNext} disabled={activeIndex >= total - 1}>Next</button>
      <span>Step {activeIndex + 1} of {total}</span>
    </div>
  );
}

function StateHistory({ frames = [], activeIndex, stateTitle, stateDescription }) {
  const visibleFrames = useMemo(() => frames.slice(0, activeIndex + 1), [activeIndex, frames]);
  const rows = visibleFrames.filter((frame) => frame.state);

  if (!rows.length) return null;

  return (
    <aside className="grid-visualizer-card">
      <h3>{stateTitle || 'State evolution'}</h3>
      {stateDescription ? <p className="grid-visualizer-muted">{stateDescription}</p> : null}

      <div className="grid-visualizer-state-list">
        {rows.map((frame, index) => (
          <div className={`grid-visualizer-state-row ${index === rows.length - 1 ? 'active' : ''}`} key={`${frame.state.label || frame.title}-${index}`}>
            <span className="grid-visualizer-state-label">{frame.state.label || `S${index}`}</span>
            <span className="grid-visualizer-state-values">
              {(frame.state.values || []).map((value, valueIndex) => (
                <span className={`grid-visualizer-state-value ${formatValue(value) === '∞' ? 'infinite' : ''}`} key={`${value}-${valueIndex}`}>
                  {formatValue(value)}
                </span>
              ))}
            </span>
            {frame.state.helper ? <p>{frame.state.helper}</p> : null}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function GridVisualizer({ diagram }) {
  const rows = diagram?.rows || [];
  const columns = diagram?.columns || [];
  const frames = diagram?.frames || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const activeFrame = frames[activeIndex] || frames[0] || {};
  const baseCells = useMemo(() => buildCellMap(diagram?.baseCells || []), [diagram?.baseCells]);
  const frameCells = useMemo(() => buildCellMap([...(activeFrame.cells || []), ...(activeFrame.activeCells || [])]), [activeFrame]);

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
    }, diagram?.intervalMs || 1200);

    return () => window.clearInterval(timer);
  }, [diagram?.intervalMs, frames.length, playing]);

  if (!rows.length || !columns.length || !frames.length) return null;

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

  return (
    <section className={`grid-visualizer grid-visualizer-${diagram.variant || 'default'}`} aria-label={diagram.title || 'Grid visual walkthrough'}>
      <style>{`
        .grid-visualizer { display: grid; gap: 1rem; max-width: 100%; min-width: 0; overflow: hidden; }
        .grid-visualizer * { box-sizing: border-box; }
        .grid-visualizer-layout { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.85fr); gap: 1rem; align-items: start; max-width: 100%; min-width: 0; overflow: hidden; }
        .grid-visualizer-card { min-width: 0; max-width: 100%; overflow: hidden; border: 1px solid rgba(86, 67, 42, 0.16); border-radius: 24px; background: rgba(255, 252, 244, 0.78); box-shadow: 0 18px 45px rgba(74, 53, 27, 0.08); padding: 1rem; }
        .grid-visualizer-card h3 { margin: 0 0 0.35rem; font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-strong, #2f261b); }
        .grid-visualizer-muted { margin: 0 0 0.85rem; color: var(--text-muted, #756a5a); font-size: 0.92rem; line-height: 1.55; }
        .grid-visualizer-board { display: grid; grid-template-columns: minmax(4.8rem, auto) repeat(var(--grid-columns), minmax(44px, 1fr)); gap: 0.45rem; max-width: 100%; min-width: 0; overflow-x: auto; overflow-y: hidden; padding-bottom: 0.25rem; -webkit-overflow-scrolling: touch; }
        .grid-visualizer-column-label, .grid-visualizer-row-label { min-width: 0; color: var(--text-muted, #756a5a); font-size: 0.78rem; font-weight: 800; text-align: center; }
        .grid-visualizer-row-label { display: flex; align-items: center; justify-content: flex-start; text-align: left; }
        .grid-visualizer-cell { min-width: 44px; min-height: 44px; border: 1px solid rgba(86, 67, 42, 0.14); border-radius: 15px; background: rgba(255, 255, 255, 0.54); display: grid; place-items: center; font-weight: 900; transition: transform 160ms ease, background 160ms ease, border-color 160ms ease; }
        .grid-visualizer-cell.role-open { color: var(--text-muted, #756a5a); }
        .grid-visualizer-cell.role-active, .grid-visualizer-cell.role-frog { background: rgba(82, 116, 76, 0.16); border-color: rgba(82, 116, 76, 0.35); transform: translateY(-1px); }
        .grid-visualizer-cell.role-blocked { background: rgba(140, 57, 44, 0.1); border-color: rgba(140, 57, 44, 0.22); color: #8c392c; }
        .grid-visualizer-cell.role-goal { box-shadow: inset 0 0 0 1px rgba(78, 116, 76, 0.22); }
        .grid-visualizer-cell.is-active-column { background: rgba(234, 190, 117, 0.18); border-color: rgba(154, 104, 34, 0.28); }
        .grid-visualizer-legend { display: flex; flex-wrap: wrap; gap: 0.45rem; margin: 0.9rem 0; }
        .grid-visualizer-legend-item { display: inline-flex; align-items: center; gap: 0.35rem; max-width: 100%; border: 1px solid rgba(86, 67, 42, 0.12); background: rgba(255,255,255,0.5); border-radius: 999px; padding: 0.35rem 0.55rem; font-size: 0.8rem; color: var(--text-muted, #756a5a); }
        .grid-visualizer-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 0.9rem; }
        .grid-visualizer-controls button { border: 1px solid rgba(86, 67, 42, 0.16); border-radius: 999px; background: rgba(255, 255, 255, 0.68); color: var(--text-strong, #2f261b); padding: 0.45rem 0.7rem; font: inherit; font-weight: 800; cursor: pointer; }
        .grid-visualizer-controls button:disabled { cursor: not-allowed; opacity: 0.48; }
        .grid-visualizer-controls span { margin-left: auto; color: var(--text-muted, #756a5a); font-size: 0.84rem; font-weight: 800; }
        .grid-visualizer-explanation { margin-top: 0.85rem; border-radius: 18px; background: rgba(255, 255, 255, 0.58); border: 1px solid rgba(86, 67, 42, 0.12); padding: 0.85rem; }
        .grid-visualizer-explanation strong { display: block; margin-bottom: 0.25rem; color: var(--text-strong, #2f261b); }
        .grid-visualizer-explanation p { margin: 0; color: var(--text-muted, #756a5a); line-height: 1.55; }
        .grid-visualizer-state-list { display: grid; gap: 0.45rem; }
        .grid-visualizer-state-row { display: grid; grid-template-columns: 3.2rem minmax(0, 1fr); gap: 0.5rem; align-items: center; border: 1px solid rgba(86, 67, 42, 0.12); border-radius: 16px; background: rgba(255,255,255,0.48); padding: 0.55rem; }
        .grid-visualizer-state-row.active { background: rgba(234, 190, 117, 0.2); border-color: rgba(154, 104, 34, 0.28); }
        .grid-visualizer-state-label { font-weight: 900; color: var(--text-strong, #2f261b); }
        .grid-visualizer-state-values { display: flex; flex-wrap: wrap; gap: 0.4rem; min-width: 0; }
        .grid-visualizer-state-value { border-radius: 999px; background: rgba(255, 252, 244, 0.9); border: 1px solid rgba(86, 67, 42, 0.12); padding: 0.25rem 0.45rem; font-family: var(--font-mono); font-size: 0.8rem; }
        .grid-visualizer-state-value.infinite { color: #8c392c; font-weight: 900; }
        .grid-visualizer-state-row p { grid-column: 2; margin: -0.18rem 0 0; color: var(--text-muted, #756a5a); font-size: 0.78rem; }
        .grid-visualizer-final { border: 1px solid rgba(82, 116, 76, 0.24); background: rgba(82, 116, 76, 0.12); border-radius: 20px; padding: 0.9rem; margin-top: 1rem; }
        .grid-visualizer-final strong { display: block; margin-bottom: 0.25rem; color: var(--text-strong, #2f261b); }
        .grid-visualizer-final p { margin: 0; color: var(--text-muted, #756a5a); }
        @media (max-width: 860px) {
          .grid-visualizer { overflow: visible; }
          .grid-visualizer-layout { grid-template-columns: minmax(0, 1fr); }
          .grid-visualizer-card { border-radius: 18px; padding: 0.8rem; }
          .grid-visualizer-board { grid-template-columns: minmax(3.4rem, auto) repeat(var(--grid-columns), minmax(36px, 1fr)); gap: 0.3rem; }
          .grid-visualizer-cell { min-width: 36px; min-height: 36px; border-radius: 12px; }
          .grid-visualizer-column-label, .grid-visualizer-row-label { font-size: 0.72rem; }
          .grid-visualizer-legend { gap: 0.35rem; }
          .grid-visualizer-controls span { width: 100%; margin-left: 0; }
        }
      `}</style>

      <div className="grid-visualizer-layout">
        <div className="grid-visualizer-card">
          <h3>{diagram.title || 'Grid walkthrough'}</h3>
          {diagram.description ? <p className="grid-visualizer-muted">{diagram.description}</p> : null}

          <div className="grid-visualizer-board" style={{ '--grid-columns': columns.length }}>
            <span aria-hidden="true" />
            {columns.map((column, columnIndex) => (
              <span className="grid-visualizer-column-label" key={`column-${columnIndex}`}>{column}</span>
            ))}

            {rows.map((row, rowIndex) => (
              <Fragment key={`row-${rowIndex}`}>
                <span className="grid-visualizer-row-label">{row}</span>
                {columns.map((_, columnIndex) => {
                  const baseCell = baseCells.get(cellKey(rowIndex, columnIndex));
                  const frameCell = frameCells.get(cellKey(rowIndex, columnIndex));
                  const cell = frameCell || baseCell || { role: 'open', label: diagram.defaultCellLabel || '·' };
                  const isActiveColumn = activeFrame.column === columnIndex || activeFrame.position === columnIndex;
                  const className = ['grid-visualizer-cell', `role-${cell.role || 'open'}`, isActiveColumn ? 'is-active-column' : ''].filter(Boolean).join(' ');

                  return (
                    <span className={className} key={`cell-${rowIndex}-${columnIndex}`} aria-label={cell.ariaLabel || `${row}, column ${columnIndex}`}>
                      {cell.label || cell.marker || diagram.defaultCellLabel || '·'}
                    </span>
                  );
                })}
              </Fragment>
            ))}
          </div>

          <VisualLegend legend={diagram.legend} />

          <VisualControls
            activeIndex={activeIndex}
            total={frames.length}
            playing={playing}
            onPrevious={goPrevious}
            onNext={goNext}
            onTogglePlay={togglePlay}
          />

          <div className="grid-visualizer-explanation">
            <strong>{activeFrame.title || 'Current step'}</strong>
            <p>{activeFrame.description}</p>
          </div>

          {activeFrame.finalResult ? (
            <div className="grid-visualizer-final" role="status">
              <strong>{activeFrame.finalResult.title || 'Final answer'}</strong>
              <p>{activeFrame.finalResult.body}</p>
            </div>
          ) : null}
        </div>

        <StateHistory
          frames={frames}
          activeIndex={activeIndex}
          stateTitle={diagram.stateTitle}
          stateDescription={diagram.stateDescription}
        />
      </div>
    </section>
  );
}
