import { useEffect, useMemo, useState } from 'react';
import './recursionHanoiVisualizer.css';

const ROD_NAMES = {
  A: 'Source',
  B: 'Auxiliary',
  C: 'Target'
};

function getStorageKey(diagram) {
  return `recursion-hanoi-step:${diagram?.id || diagram?.title || 'default'}`;
}

function readStoredStep(diagram, maxStep) {
  if (typeof window === 'undefined') return -1;

  const savedValue = window.sessionStorage.getItem(getStorageKey(diagram));
  const parsedValue = Number.parseInt(savedValue || '-1', 10);

  if (Number.isNaN(parsedValue)) return -1;
  return Math.min(Math.max(parsedValue, -1), maxStep);
}

function makeTrace(diskCount) {
  const events = [];
  let callCounter = 0;

  function visit(n, source, auxiliary, target, parentId = null) {
    const callId = `hanoi-call-${callCounter}`;
    callCounter += 1;

    events.push({
      type: 'CALL',
      callId,
      parentId,
      n,
      source,
      auxiliary,
      target,
      title: `CALL: hanoi(${n}, ${source}, ${auxiliary}, ${target})`,
      note: n === 1
        ? `Base case: one disk can move directly from ${source} to ${target}.`
        : `Push a frame that plans: move ${n - 1} away, move disk ${n}, then rebuild ${n - 1}.`
    });

    if (n === 1) {
      events.push({
        type: 'MOVE',
        callId,
        disk: 1,
        from: source,
        to: target,
        title: `BASE CASE: move disk 1 from ${source} to ${target}`,
        note: 'The base case performs real work immediately, then returns.'
      });
      events.push({
        type: 'RETURN',
        callId,
        title: `RETURN: pop hanoi(1, ${source}, ${auxiliary}, ${target})`,
        note: 'The smallest problem is done, so its stack frame disappears.'
      });
      return;
    }

    events.push({
      type: 'PHASE',
      callId,
      phase: `1) Move ${n - 1} disk${n - 1 === 1 ? '' : 's'} from ${source} to ${auxiliary}`,
      title: `PHASE 1: clear disk ${n}`,
      note: `Disk ${n} is blocked. The ${n - 1} smaller disk${n - 1 === 1 ? '' : 's'} must move to ${auxiliary} first.`
    });

    visit(n - 1, source, target, auxiliary, callId);

    events.push({
      type: 'PHASE',
      callId,
      phase: `2) Move disk ${n} from ${source} to ${target}`,
      title: `RESUME: hanoi(${n}) wakes up`,
      note: `The left child returned. Disk ${n} is now exposed and can move from ${source} to ${target}.`
    });

    events.push({
      type: 'MOVE',
      callId,
      disk: n,
      from: source,
      to: target,
      title: `MOVE: disk ${n} from ${source} to ${target}`,
      note: `This is the middle move owned by hanoi(${n}).`
    });

    events.push({
      type: 'PHASE',
      callId,
      phase: `3) Move ${n - 1} disk${n - 1 === 1 ? '' : 's'} from ${auxiliary} to ${target}`,
      title: `PHASE 3: rebuild on ${target}`,
      note: `Now the smaller tower moves from ${auxiliary} onto disk ${n} at ${target}.`
    });

    visit(n - 1, auxiliary, source, target, callId);

    events.push({
      type: 'RETURN',
      callId,
      title: `RETURN: pop hanoi(${n}, ${source}, ${auxiliary}, ${target})`,
      note: 'This frame has completed all three phases, so control returns to its parent.'
    });
  }

  visit(diskCount, 'A', 'B', 'C');
  return events;
}

function makeInitialRuntime(diskCount) {
  return {
    rods: {
      A: Array.from({ length: diskCount }, (_, index) => diskCount - index),
      B: [],
      C: []
    },
    stack: [],
    treeNodes: new Map(),
    childrenByParent: new Map(),
    rootId: null,
    completedMoves: [],
    activeEvent: null,
    activeCallId: null,
    latestMove: null
  };
}

function buildRuntime(events, activeIndex, diskCount) {
  const runtime = makeInitialRuntime(diskCount);

  for (let index = 0; index <= activeIndex; index += 1) {
    const event = events[index];
    if (!event) continue;

    runtime.activeEvent = event;
    runtime.activeCallId = event.callId;

    if (event.type === 'CALL') {
      runtime.treeNodes.set(event.callId, {
        callId: event.callId,
        parentId: event.parentId,
        n: event.n,
        source: event.source,
        auxiliary: event.auxiliary,
        target: event.target,
        status: 'active',
        action: 'pushed to stack'
      });

      if (event.parentId === null) {
        runtime.rootId = event.callId;
      } else {
        const siblings = runtime.childrenByParent.get(event.parentId) || [];
        runtime.childrenByParent.set(event.parentId, [...siblings, event.callId]);
      }

      if (runtime.stack.length > 0) {
        runtime.stack[runtime.stack.length - 1] = {
          ...runtime.stack[runtime.stack.length - 1],
          status: `Paused: waiting for hanoi(${event.n}, ${event.source}, ${event.auxiliary}, ${event.target})`,
          phase: 'paused'
        };
      }

      runtime.stack.push({
        callId: event.callId,
        n: event.n,
        source: event.source,
        auxiliary: event.auxiliary,
        target: event.target,
        status: event.note,
        phase: 'active'
      });
    }

    if (event.type === 'PHASE') {
      const node = runtime.treeNodes.get(event.callId);
      if (node) {
        runtime.treeNodes.set(event.callId, {
          ...node,
          status: 'active',
          action: event.phase
        });
      }

      const frameIndex = runtime.stack.findIndex((frame) => frame.callId === event.callId);
      if (frameIndex >= 0) {
        runtime.stack[frameIndex] = {
          ...runtime.stack[frameIndex],
          status: event.phase,
          phase: frameIndex === runtime.stack.length - 1 ? 'active' : 'paused'
        };
      }
    }

    if (event.type === 'MOVE') {
      const movingDisk = runtime.rods[event.from].pop();
      const disk = movingDisk ?? event.disk;

      runtime.rods[event.to].push(disk);
      runtime.latestMove = { ...event, disk };
      runtime.completedMoves.push(`${runtime.completedMoves.length + 1}. Disk ${disk}: ${event.from} → ${event.to}`);

      const node = runtime.treeNodes.get(event.callId);
      if (node) {
        runtime.treeNodes.set(event.callId, {
          ...node,
          status: 'active',
          action: `Moved disk ${disk}: ${event.from} → ${event.to}`
        });
      }

      const frameIndex = runtime.stack.findIndex((frame) => frame.callId === event.callId);
      if (frameIndex >= 0) {
        runtime.stack[frameIndex] = {
          ...runtime.stack[frameIndex],
          status: `Emitted move ${event.from} → ${event.to}`,
          phase: 'active'
        };
      }
    }

    if (event.type === 'RETURN') {
      const node = runtime.treeNodes.get(event.callId);
      if (node) {
        runtime.treeNodes.set(event.callId, {
          ...node,
          status: 'returned',
          action: node.action || 'finished'
        });
      }

      const returningIndex = runtime.stack.findIndex((frame) => frame.callId === event.callId);
      if (returningIndex >= 0) {
        runtime.stack.splice(returningIndex, 1);
      }

      if (runtime.stack.length > 0) {
        runtime.stack[runtime.stack.length - 1] = {
          ...runtime.stack[runtime.stack.length - 1],
          status: 'Resumed after child returned',
          phase: 'active'
        };
      }
    }
  }

  return runtime;
}

function Disk({ size, diskCount, isMoving }) {
  const width = `${46 + (size / diskCount) * 44}%`;

  return (
    <div
      className={`recursion-hanoi-disk disk-${size} ${isMoving ? 'is-moving' : ''}`}
      style={{ width }}
    >
      Disk {size}
    </div>
  );
}

function Rod({ rodId, disks, diskCount, latestMove }) {
  const movingDiskOnRod = latestMove?.to === rodId ? latestMove.disk : null;

  return (
    <article className="recursion-hanoi-rod-card">
      <header>
        <strong>Rod {rodId}</strong>
        <span>{ROD_NAMES[rodId]}</span>
      </header>

      <div className="recursion-hanoi-rod-stage" aria-label={`Rod ${rodId}, ${ROD_NAMES[rodId]}`}>
        <div className="recursion-hanoi-rod-pole" aria-hidden="true" />
        <div className="recursion-hanoi-disk-stack">
          {disks.map((disk) => (
            <Disk
              size={disk}
              diskCount={diskCount}
              isMoving={movingDiskOnRod === disk}
              key={`${rodId}-${disk}`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function TreeNode({ nodeId, runtime }) {
  const node = runtime.treeNodes.get(nodeId);
  if (!node) return null;

  const children = runtime.childrenByParent.get(nodeId) || [];
  const isActive = runtime.activeCallId === nodeId && node.status !== 'returned';
  const isReturned = node.status === 'returned';

  return (
    <div className="recursion-hanoi-tree-branch">
      <article className={`recursion-hanoi-tree-node ${isActive ? 'is-active' : ''} ${isReturned ? 'is-returned' : ''}`}>
        <strong>hanoi({node.n})</strong>
        <code>{node.source} → {node.target} via {node.auxiliary}</code>
        {node.action ? <span>{node.action}</span> : null}
      </article>

      {children.length ? (
        <div className="recursion-hanoi-tree-children">
          {children.map((childId) => <TreeNode nodeId={childId} runtime={runtime} key={childId} />)}
        </div>
      ) : null}
    </div>
  );
}

function StackFrame({ frame, index, total }) {
  const isTop = index === 0;

  return (
    <article className={`recursion-hanoi-frame ${isTop ? 'is-active' : 'is-paused'}`}>
      <div>
        <strong>hanoi({frame.n}, {frame.source}, {frame.auxiliary}, {frame.target})</strong>
        <small>{isTop ? 'Currently executing' : `Waiting below stack depth ${total - index}`}</small>
      </div>
      <p>{frame.status}</p>
    </article>
  );
}

function MoveList({ moves }) {
  const visibleMoves = moves.slice(-5);

  if (!visibleMoves.length) return null;

  return (
    <div className="recursion-hanoi-moves">
      <ol>
        {visibleMoves.map((move) => <li key={move}>{move}</li>)}
      </ol>
    </div>
  );
}

export default function RecursionHanoiVisualizer({ diagram }) {
  const diskCount = Number.isInteger(diagram?.disks) ? diagram.disks : 3;
  const events = useMemo(() => makeTrace(diskCount), [diskCount]);
  const maxStep = events.length - 1;
  const [activeIndex, setActiveIndex] = useState(() => readStoredStep(diagram, maxStep));

  useEffect(() => {
    setActiveIndex(readStoredStep(diagram, maxStep));
  }, [diagram, maxStep]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(getStorageKey(diagram), String(activeIndex));
  }, [activeIndex, diagram]);

  const runtime = useMemo(() => buildRuntime(events, activeIndex, diskCount), [events, activeIndex, diskCount]);
  const stackTopFirst = [...runtime.stack].reverse();
  const progress = activeIndex < 0 ? 0 : ((activeIndex + 1) / events.length) * 100;

  const goBack = () => setActiveIndex((current) => Math.max(-1, current - 1));
  const goNext = () => setActiveIndex((current) => Math.min(maxStep, current + 1));
  const restart = () => setActiveIndex(-1);

  return (
    <section className="recursion-hanoi-shell" aria-label={diagram?.title || `Tower of Hanoi with ${diskCount} disks`}>
      <div className="recursion-hanoi-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="recursion-hanoi-controls" data-no-card-nav>
        <button type="button" onClick={goBack} disabled={activeIndex < 0}>Previous Step</button>
        <button type="button" className="recursion-hanoi-next" onClick={goNext} disabled={activeIndex >= maxStep}>Next Step</button>
        <button type="button" onClick={restart} disabled={activeIndex < 0}>Restart</button>
        <span>Step {activeIndex + 1 <= 0 ? 0 : activeIndex + 1} of {events.length}</span>
      </div>

      <section className="recursion-hanoi-board-card is-wide">
        <h4>Physical Towers</h4>
        <div className="recursion-hanoi-rods">
          {Object.entries(runtime.rods).map(([rodId, disks]) => (
            <Rod
              rodId={rodId}
              disks={disks}
              diskCount={diskCount}
              latestMove={runtime.latestMove}
              key={rodId}
            />
          ))}
        </div>
      </section>

      <div className="recursion-hanoi-lower-layout">
        <section className="recursion-hanoi-tree-card">
          <h4>Recursion Tree</h4>
          <div className="recursion-hanoi-tree-scroll">
            <div className="recursion-hanoi-tree-root">
              {runtime.rootId ? <TreeNode nodeId={runtime.rootId} runtime={runtime} /> : (
                <p className="recursion-hanoi-empty">Click Next Step to create the first recursion-tree node.</p>
              )}
            </div>
          </div>
        </section>

        <aside className="recursion-hanoi-memory-card">
          <h4>Call Stack (Memory)</h4>
          <div className="recursion-hanoi-stack-label">Top of Stack</div>
          <div className="recursion-hanoi-stack">
            {stackTopFirst.length ? (
              stackTopFirst.map((frame, index) => (
                <StackFrame frame={frame} index={index} total={stackTopFirst.length} key={`${frame.callId}-${index}`} />
              ))
            ) : (
              <p className="recursion-hanoi-empty">Stack is empty. The full plan has returned.</p>
            )}
          </div>
          <div className="recursion-hanoi-stack-label is-bottom">Bottom of Stack</div>

          <MoveList moves={runtime.completedMoves} />
        </aside>
      </div>
    </section>
  );
}
