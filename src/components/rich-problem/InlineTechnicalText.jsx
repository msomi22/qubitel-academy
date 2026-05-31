import GlossaryProvider from '../glossary/GlossaryProvider.jsx';

const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const urlPattern = /(https?:\/\/[^\s]+)/g;
const inlineSyntaxPattern = /(`([^`]+)`|\*\*([^*]+)\*\*)/g;

function TechnicalToken({ children, index }) {
  return (
    <span className={`inline-tech-token inline-tech-token-${index % 4}`}>
      {children}
    </span>
  );
}

function PlainText({ text }) {
  if (!text) return null;
  return <GlossaryProvider text={text} />;
}

function TokenizedText({ text }) {
  if (!text) return null;

  const nodes = [];
  let lastIndex = 0;
  let match;
  let tokenIndex = 0;

  inlineSyntaxPattern.lastIndex = 0;
  while ((match = inlineSyntaxPattern.exec(text)) !== null) {
    const [fullMatch, , inlineToken, boldText] = match;
    if (match.index > lastIndex) {
      nodes.push(<PlainText key={`plain-${lastIndex}`} text={text.slice(lastIndex, match.index)} />);
    }

    if (inlineToken) {
      nodes.push(<TechnicalToken index={tokenIndex} key={`token-${match.index}`}>{inlineToken}</TechnicalToken>);
      tokenIndex += 1;
    } else if (boldText) {
      nodes.push(<strong key={`strong-${match.index}`}>{boldText}</strong>);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(<PlainText key={`plain-${lastIndex}`} text={text.slice(lastIndex)} />);
  }

  return nodes;
}

function AutoLinkedText({ text }) {
  if (!text) return null;
  const parts = text.split(urlPattern);
  return parts.map((part, index) => {
    if (!part.match(urlPattern)) return <TokenizedText key={`${part}-${index}`} text={part} />;
    return <a href={part} key={`${part}-${index}`} rel="noreferrer" target="_blank">{part}</a>;
  });
}

export default function InlineTechnicalText({ text }) {
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
