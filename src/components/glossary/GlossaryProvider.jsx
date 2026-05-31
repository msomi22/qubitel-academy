import { useMemo } from 'react';

import { tokenizeGlossaryText } from '../../utils/glossary/glossaryTokenizer.js';
import GlossaryTerm from './GlossaryTerm.jsx';

export default function GlossaryProvider({ enabled = true, text }) {
  const tokens = useMemo(() => tokenizeGlossaryText(text, { enabled }), [enabled, text]);

  if (typeof text !== 'string') return null;

  return tokens.map((token, index) => {
    if (token.type !== 'glossary') {
      return <span key={`text-${index}`}>{token.value}</span>;
    }

    return (
      <GlossaryTerm key={`${token.term.id}-${token.start}-${index}`} term={token.term}>
        {token.value}
      </GlossaryTerm>
    );
  });
}
