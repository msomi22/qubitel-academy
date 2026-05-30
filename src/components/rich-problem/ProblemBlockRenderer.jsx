import { useState } from 'react';

import CodeBlock from '../code/CodeBlock.jsx';
import ProblemCalloutBlock from './ProblemCalloutBlock.jsx';
import ProblemFlowBlock from './ProblemFlowBlock.jsx';
import ProblemImageBlock, { isTrustedStaticImageSrc } from './ProblemImageBlock.jsx';
import ProblemTableBlock from './ProblemTableBlock.jsx';

const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const urlPattern = /(https?:\/\/[^\s]+)/g;

function LinkedText({ text }) {
  if (typeof text !== 'string') return null;

  const nodes = [];
  let lastIndex = 0;
  let match;

  markdownLinkPattern.lastIndex = 0;
  while ((match = markdownLinkPattern.exec(text)) !== null) {
    const [fullMatch, label, href] = match;
    if (match.index > lastIndex) {
      nodes.push(<AutoLinkedText key={`text-${lastIndex}`} text={text.slice(lastIndex, match.index)} />);
    }
    nodes.push(<a href={href} key={`link-${match.index}`} rel="noreferrer" target="_blank">{label}</a>);
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(<AutoLinkedText key={`text-${lastIndex}`} text={text.slice(lastIndex)} />);
  }

  return nodes;
}

function AutoLinkedText({ text }) {
  if (!text) return null;
  const parts = text.split(urlPattern);
  return parts.map((part, index) => {
    if (!part.match(urlPattern)) return <span key={`${part}-${index}`}>{part}</span>;
    return <a href={part} key={`${part}-${index}`} rel="noreferrer" target="_blank">{part}</a>;
  });
}

function UnknownBlock({ block, index }) {
  return (
    <section className="workspace-block problem-rich-block problem-rich-unknown" role="note">
      <span className="mini-label">Unsupported block</span>
      <p>Block {index + 1} uses unsupported type <strong>{block?.type || 'missing'}</strong>. Update the shared renderer before publishing this content.</p>
    </section>
  );
}

function SectionBlock({ block }) {
  const nestedBlocks = Array.isArray(block.body) ? block.body : [];
  return (
    <section className="workspace-block problem-rich-block problem-rich-section">
      {block.label ? <span className="mini-label">{block.label}</span> : null}
      {block.title ? <h4>{block.title}</h4> : null}
      {block.content ? <p><LinkedText text={block.content} /></p> : null}
      {nestedBlocks.length ? <div className="problem-rich-nested-blocks">{nestedBlocks.map((child, index) => <ProblemBlockRenderer block={child} index={index} key={`${child?.type || 'unknown'}-${child?.title || index}`} />)}</div> : null}
    </section>
  );
}

function DiagramBlock({ block }) {
  if (isTrustedStaticImageSrc(block.src)) return <ProblemImageBlock block={{ ...block, type: 'image' }} />;
  const lines = Array.isArray(block.lines) ? block.lines : [];
  const content = block.content || lines.join('\n');
  return (
    <section className="workspace-block problem-rich-block problem-diagram-block">
      {block.title ? <span className="mini-label">{block.title}</span> : <span className="mini-label">Diagram</span>}
      {content ? <pre>{content}</pre> : <p>No diagram content provided.</p>}
      {block.caption ? <p className="problem-rich-caption"><LinkedText text={block.caption} /></p> : null}
    </section>
  );
}

function RichCodeBlock({ block }) {
  return (
    <CodeBlock
      code={block.code ?? block.content ?? ''}
      language={block.language || 'java'}
      title={block.title || 'Code'}
      caption={block.caption}
      filename={block.filename}
      className="workspace-block problem-rich-block problem-code-block"
    />
  );
}

function ChecklistBlock({ block }) {
  const items = Array.isArray(block.items) ? block.items : [];
  return <section className="workspace-block problem-rich-block problem-checklist-block">{block.title ? <span className="mini-label">{block.title}</span> : <span className="mini-label">Checklist</span>}<ul className="problem-checklist">{items.map((item, index) => { const label = typeof item === 'string' ? item : item?.label || item?.text; const checked = typeof item === 'object' && item?.checked === true; return <li key={`${label || 'item'}-${index}`}><span aria-hidden="true">{checked ? '✓' : '•'}</span><p><LinkedText text={label} /></p></li>; })}</ul></section>;
}

function ComparisonBlock({ block }) {
  const items = Array.isArray(block.items) ? block.items : [];
  return <section className="workspace-block problem-rich-block problem-comparison-block">{block.title ? <span className="mini-label">{block.title}</span> : <span className="mini-label">Comparison</span>}<div className="problem-comparison-grid">{items.map((item, index) => <article key={`${item?.label || 'comparison'}-${index}`}>{item?.label ? <strong>{item.label}</strong> : null}{item?.content ? <p><LinkedText text={item.content} /></p> : null}{Array.isArray(item?.points) ? <ul>{item.points.map((point) => <li key={point}><LinkedText text={point} /></li>)}</ul> : null}</article>)}</div></section>;
}

function List({ title, items }) {
  if (!Array.isArray(items) || !items.length) return null;
  return <div><strong>{title}</strong><ul>{items.map((item) => <li key={item}><LinkedText text={item} /></li>)}</ul></div>;
}

function ArchitectureDecisionBlock({ block }) {
  return <section className="workspace-block problem-rich-block problem-architecture-decision-block"><span className="mini-label">Architecture decision</span>{block.title ? <h4>{block.title}</h4> : null}{block.context ? <p><LinkedText text={block.context} /></p> : null}{block.decision ? <div className="problem-decision-highlight"><strong>Decision</strong><p><LinkedText text={block.decision} /></p></div> : null}<div className="problem-decision-grid"><List title="Accepted trade-offs" items={block.tradeoffs} /><List title="Consequences" items={block.consequences} /></div></section>;
}

function TabsBlock({ block }) {
  const tabs = Array.isArray(block.tabs) ? block.tabs.filter((tab) => tab?.label && Array.isArray(tab?.body)) : [];
  const [activeTabId, setActiveTabId] = useState(() => tabs[0]?.id || tabs[0]?.label || 'tab-0');
  const activeTab = tabs.find((tab) => (tab.id || tab.label) === activeTabId) || tabs[0];

  if (!tabs.length) return <UnknownBlock block={{ type: 'tabs' }} index={0} />;

  return (
    <section className="workspace-block problem-rich-block problem-tabs-block">
      {block.title ? <span className="mini-label">{block.title}</span> : <span className="mini-label">Tabs</span>}
      {block.description ? <p className="problem-tabs-description"><LinkedText text={block.description} /></p> : null}
      <div className="problem-tabs-list" role="tablist" aria-label={block.title || 'Problem tabs'}>
        {tabs.map((tab, index) => {
          const tabId = tab.id || tab.label || `tab-${index}`;
          const selected = tabId === activeTabId;
          return (
            <button
              aria-selected={selected}
              className="problem-tab-button"
              key={tabId}
              onClick={() => setActiveTabId(tabId)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="problem-tab-panel" role="tabpanel">
        {activeTab.body.map((child, index) => <ProblemBlockRenderer block={child} index={index} key={`${child?.type || 'unknown'}-${child?.title || index}`} />)}
      </div>
    </section>
  );
}

export default function ProblemBlockRenderer({ block, index = 0 }) {
  if (!block || typeof block !== 'object') return <UnknownBlock block={{ type: 'invalid' }} index={index} />;
  switch (block.type) {
    case 'section': return <SectionBlock block={block} />;
    case 'callout': return <ProblemCalloutBlock block={block} />;
    case 'table': return <ProblemTableBlock block={block} />;
    case 'image': return <ProblemImageBlock block={block} />;
    case 'diagram': return <DiagramBlock block={block} />;
    case 'flow': return <ProblemFlowBlock block={block} />;
    case 'code': return <RichCodeBlock block={block} />;
    case 'checklist': return <ChecklistBlock block={block} />;
    case 'comparison': return <ComparisonBlock block={block} />;
    case 'architectureDecision': return <ArchitectureDecisionBlock block={block} />;
    case 'tabs': return <TabsBlock block={block} />;
    case 'divider': return <hr className="problem-rich-divider" aria-hidden="true" />;
    default: return <UnknownBlock block={block} index={index} />;
  }
}
