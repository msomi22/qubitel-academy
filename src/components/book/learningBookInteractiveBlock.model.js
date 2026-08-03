const INTERACTIVE_BOOK_BLOCKS = {
  alphabetMastery: {
    itemField: 'letters',
    itemLabel: 'letter cards'
  },
  numberAudioGrid: {
    itemField: 'numbers',
    itemLabel: 'number cards'
  }
};

export function resolveInteractiveBookBlock(block, isAnimationCopy = false) {
  const definition = INTERACTIVE_BOOK_BLOCKS[block?.type];
  if (!definition) return null;

  const items = Array.isArray(block?.[definition.itemField])
    ? block[definition.itemField]
    : [];

  if (!isAnimationCopy) {
    return {
      mode: 'interactive',
      renderer: block.type
    };
  }

  return {
    mode: 'summary',
    title: block.title || 'Interactive learning activity',
    text: `${items.length} ${definition.itemLabel}`
  };
}