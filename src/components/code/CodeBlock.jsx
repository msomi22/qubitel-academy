import { useState } from 'react';

import { tokenizeCode } from '../../utils/codeTokenizer.js';

function text(value) {
  if (value === null || value === undefined) return '';
  return String(value);
}

function normalizeLanguage(language) {
  const value = text(language).trim().toLowerCase();
  return value || 'text';
}

function tokenClassName(type) {
  return `code-token-${type || 'plain'}`;
}

async function copyTextToClipboard(value) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export default function CodeBlock({
  code,
  language = 'text',
  title,
  caption,
  filename,
  className = ''
}) {
  const [copyState, setCopyState] = useState('idle');
  const safeCode = text(code);
  const label = title || filename || 'Code';
  const normalizedLanguage = normalizeLanguage(language);
  const lines = tokenizeCode(safeCode || 'No code sample is configured yet.');
  const rootClassName = ['ide-code-block', className].filter(Boolean).join(' ');
  const copyLabel = copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy';

  async function handleCopy() {
    try {
      await copyTextToClipboard(safeCode);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch (error) {
      setCopyState('failed');
      window.setTimeout(() => setCopyState('idle'), 2200);
    }
  }

  return (
    <figure className={rootClassName} aria-label={`${label} code block`}>
      <figcaption className="ide-code-header">
        <span className="ide-code-title">{label}</span>
        <span className="ide-code-meta">
          {filename ? <span className="ide-code-filename">{filename}</span> : null}
          <span className="ide-code-language">{normalizedLanguage}</span>
          <button
            aria-label={`Copy ${label}`}
            className={`ide-code-copy-button ${copyState === 'copied' ? 'is-copied' : ''} ${copyState === 'failed' ? 'is-failed' : ''}`}
            onClick={handleCopy}
            type="button"
          >
            {copyLabel}
          </button>
        </span>
      </figcaption>

      <div className="ide-code-scroll" tabIndex={0}>
        <pre className="ide-code-pre">
          <code>
            {lines.map((line, lineIndex) => (
              <span className="ide-code-line" key={`line-${lineIndex}`}>
                {line.length ? line.map((token, tokenIndex) => (
                  <span className={tokenClassName(token.type)} key={`${token.type}-${lineIndex}-${tokenIndex}`}>
                    {token.value}
                  </span>
                )) : '\u00A0'}
              </span>
            ))}
          </code>
        </pre>
      </div>

      {caption ? <figcaption className="problem-rich-caption ide-code-caption">{caption}</figcaption> : null}
    </figure>
  );
}
