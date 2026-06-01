import { useEffect, useMemo, useState } from 'react';
import './recursionBranchingVisualizer.css';

function getStorageKey(diagram) {
  return `recursion-branching-step:${diagram?.id || diagram?.title || 'default'}`;
}

function readStoredStep(diagram, maxStep) {
  if (typeof window === 'undefined') return -1;

  const savedValue = window.sessionStorage.getItem(getStorageKey(diagram));
  const parsedValue = Number.parseInt(savedValue || '-1', 10);

  if (Number.isNaN(parsedValue)) return -1;
  return Math.min(Math.max(parsedValue, -1), maxStep);
}

function makeTrace(n) {
  const steps = [];
  let idCounter = 0;

  function visit(value, parentId = null) {
    const id = `fib-node-${idCounter}`;
    idCounter += 1;

    steps.push({ type: 'CALL', n: value, id, parentId });

    if (value <= 1) {
      steps.push({ type: 'RETURN', n: value, id, value, parentId });
      return value;
    }

    const leftValue = visit(value - 1, id);
    steps.push({ type: 'RESUME', n: value, id, state: 'left_done', leftValue });

    const rightValue = visit(value - 2, id);
    steps.push({ type: 'RESUME', n: value, id, state: 'right_done', leftValue, rightValue });

    const result = leftValue + rightValue;
    steps.push({ type: 'RETURN', n: value, id, value: result, parentId, leftValue, rightValue });
    return result;
  }

  visit(n);
  return steps;
}

function getEquationParts(node) {
  if (node.n <= 1) {
    return [{ value: String(node.value ?? node.n), kind: 'resolved' }];
  }

  if (node.state === 'left_done') {
    return [
      { value: String(node.leftValue), kind: 'resolved' },
      { value: ' + ', kind: 'operator' },
      { value: `fib(${node.n - 2})`, kind: 'unresolved' }
    ];
  }

  if (node.state === 'right_done') {
    return [
      { value: String(node.leftValue), kind: 'resolved' },
      { value: ' + ', kind: 'operator' },
      { value: String(node.rightValue), kind: 'resolved' }
    ];
  }

  if (node.state === 'returned') {
    return [{ value: String(node.value), kind: 'resolved' }];
  }

  return [
    { value: `fib(${node.n - 1})`, kind: 'unresolved' },
    { value: ' + ', kind: 'operator' },
    { value: `fib(${node.n - 2})`, kind: 'unresolved' }
  ];
}

function makeInitialRuntimeState() {
  return {
    rootId: null,
    nodes: new Map(),
    childrenByParent: new Map(),
    stack: [],
    activeId: null,
    status: 'System ready. Click Next Step to push the first Fibonacci call to memory.'
  };
}

function buildRuntimeState(steps, activeIndex) {
  const runtime = makeInitialRuntimeState();

  for (let index = 0; index <= activeIndex; index += 1) {
    const step = steps[index];
    if (!step) continue;

    runtime.activeId = null;

    if (step.type === 'CALL') {
      const node = {
        id: step.id,
        parentId: step.parentId,
        n: step.n,
        state: 'initial',
        value: step.n <= 1 ? step.n : undefined
      };

      runtime.nodes.set(step.id, node);

      if (step.parentId === null) {
        runtime.rootId = step.id;
      } else {
        const siblings = runtime.childrenByParent.get(step.parentId) || [];
        runtime.childrenByParent.set(step.parentId, [...siblings, step.id]);
      }

      if (runtime.stack.length > 0) {
        runtime.stack[runtime.stack.length - 1] = {
          ...runtime.stack[runtime.stack.length - 1],
          status: `Paused: Waiting on fib(${step.n})`,
          phase: 'paused'
        };
      }

      runtime.stack.push({ id: step.id, n: step.n, status: 'Executing...', phase: 'active' });
      runtime.activeId = step.id;
      runtime.status = step.n > 1
        ? `PUSH: Called fib(${step.n}). It does not know the answer yet, so it creates the equation fib(${step.n - 1}) + fib(${step.n - 2}).`
        : `PUSH: Called fib(${step.n}). This is a base case, so the answer is already known.`;
    }

    if (step.type === 'RESUME') {
      const node = runtime.nodes.get(step.id);
      if (node) {
        runtime.nodes.set(step.id, {
          ...node,
          state: step.state,
          leftValue: step.leftValue,
          rightValue: step.rightValue
        });
      }

      if (runtime.stack.length > 0) {
        runtime.stack[runtime.stack.length - 1] = {
          ...runtime.stack[runtime.stack.length - 1],
          status: step.state === 'left_done' ? 'Executing substitution...' : 'Adding values together...',
          phase: 'active'
        };
      }

      runtime.activeId = step.id;
      runtime.status = step.state === 'left_done'
        ? `SUBSTITUTE: fib(${step.n}) wakes up and replaces the left side with ${step.leftValue}. Now it must call the right side.`
        : `SUBSTITUTE: fib(${step.n}) wakes up and replaces the right side with ${step.rightValue}. Now both values are ready to add.`;
    }

    if (step.type === 'RETURN') {
      const node = runtime.nodes.get(step.id);
      if (node) {
        runtime.nodes.set(step.id, {
          ...node,
          state: 'returned',
          value: step.value,
          leftValue: step.leftValue,
          rightValue: step.rightValue
        });
      }

      runtime.stack.pop();
      runtime.activeId = step.id;
      runtime.status = `POP / RETURN: fib(${step.n}) resolves to ${step.value}. Its stack frame is removed and the number is handed back to the waiting parent.`;
    }
  }

  return runtime;
}

function Equation({ node }) {
  return (
    <div className="recursion-branching-node-equation">
      {getEquationParts(node).map((part, index) => (
        <span className={`math-${part.kind}`} key={`${part.value}-${index}`}>{part.value}</span>
      ))}
    </div>
  );
}

function TreeNode({ nodeId, runtime }) {
  const node = runtime.nodes.get(nodeId);
  if (!node) return null;

  const children = runtime.childrenByParent.get(nodeId) || [];
  const isActive = runtime.activeId === nodeId;
  const isReturned = node.state === 'returned';

  return (
    <div className="recursion-branching-tree-branch">
      <article className={`recursion-branching-tree-node ${isActive ? 'is-active' : ''} ${isReturned ? 'is-returned' : ''}`}>
        <div className="recursion-branching-node-title">fib({node.n})</div>
        <Equation node={node} />
      </article>

      {children.length ? (
        <div className="recursion-branching-tree-children">
          {children.map((childId) => <TreeNode nodeId={childId} runtime={runtime} key={childId} />)}
        </div>
      ) : null}
    </div>
  );
}

function StackFrame({ frame, index, total }) {
  const isTop = index === 0;
  return (
    <article className={`recursion-branching-memory-frame ${isTop ? 'is-active' : 'is-paused'}`}>
      <div className="recursion-branching-frame-header">
        <strong>fib({frame.n})</strong>
        <span>{frame.status}</span>
      </div>
      <small>{isTop ? 'Currently executing' : `Stack depth ${total - index}`}</small>
    </article>
  );
}

export default function RecursionBranchingVisualizer({ diagram }) {
  const input = Number.isInteger(diagram?.input) ? diagram.input : 4;
  const steps = useMemo(() => makeTrace(input), [input]);
  const maxStep = steps.length - 1;
  const [activeIndex, setActiveIndex] = useState(() => readStoredStep(diagram, maxStep));

  useEffect(() => {
    setActiveIndex(readStoredStep(diagram, maxStep));
  }, [diagram, maxStep]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(getStorageKey(diagram), String(activeIndex));
  }, [activeIndex, diagram]);

  const runtime = useMemo(() => buildRuntimeState(steps, activeIndex), [steps, activeIndex]);
  const stackTopFirst = [...runtime.stack].reverse();

  const goBack = () => setActiveIndex((current) => Math.max(-1, current - 1));
  const goNext = () => setActiveIndex((current) => Math.min(maxStep, current + 1));
  const restart = () => setActiveIndex(-1);

  return (
    <section className="recursion-branching-shell" aria-label={diagram.title || `Fibonacci(${input}) math substitution visualizer`}>
      <header className="recursion-branching-hero">
        <h3>{diagram.title || `Fibonacci(${input}) - The Math Substitution Visualizer`}</h3>
        <p>{diagram.summary || 'Watch parent functions go to sleep, wait for their children, and substitute the answers into their equations.'}</p>
      </header>

      <div className="recursion-branching-controls" data-no-card-nav>
        <button type="button" onClick={goBack} disabled={activeIndex < 0}>Previous Step</button>
        <button type="button" className="recursion-branching-next" onClick={goNext} disabled={activeIndex >= maxStep}>Next Step</button>
        <button type="button" onClick={restart} disabled={activeIndex < 0}>Restart</button>
      </div>

      <div className="recursion-branching-stage">
        <section className="recursion-branching-tree-card">
          <h4>Recursion Tree</h4>
          <div className="recursion-branching-tree-scroll">
            <div className="recursion-branching-tree-root">
              {runtime.rootId ? <TreeNode nodeId={runtime.rootId} runtime={runtime} /> : (
                <p className="recursion-branching-empty-state">Click Next Step to create the first call.</p>
              )}
            </div>
          </div>
        </section>

        <aside className="recursion-branching-memory-card">
          <h4>Call Stack (Memory)</h4>
          <div className="recursion-branching-stack-label">Top of Stack</div>
          <div className="recursion-branching-memory-stack">
            {stackTopFirst.length ? stackTopFirst.map((frame, index) => (
              <StackFrame frame={frame} index={index} total={stackTopFirst.length} key={`${frame.id}-${index}`} />
            )) : <p className="recursion-branching-empty-state">Stack is empty.</p>}
          </div>
          <div className="recursion-branching-stack-label is-bottom">Bottom of Stack</div>
        </aside>
      </div>

      <div className="recursion-branching-status" role="status">
        {runtime.status}
      </div>
    </section>
  );
}
