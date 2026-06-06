import { useEffect, useLayoutEffect, useRef } from 'react';
import PassageReadAloudControls from './PassageReadAloudControls.jsx';

export function formatPassageTime(totalSeconds = 0) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes <= 0) return `${remainingSeconds}s`;
  if (remainingSeconds === 0) return `${minutes} min`;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function sentenceMapFor(passage = {}) {
  return new Map((passage.sentences || []).map((sentence) => [sentence.id, sentence]));
}

export function ReadingPassage({ passage = {}, activeSentenceId = '', className = '' }) {
  const bodyRef = useRef(null);

  useLayoutEffect(() => {
    const node = bodyRef.current;
    if (!node) return;
  
    node.scrollTop = 0;
  
    requestAnimationFrame(() => {
      node.scrollTop = 0;
    });
  }, [passage?.title]);

  const sentencesById = sentenceMapFor(passage);
  const paragraphs = Array.isArray(passage.paragraphs) ? passage.paragraphs : [];

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [passage?.title]);

  return (
    <article className={`cbc-reading-passage ${className}`.trim()} aria-label={passage.title || 'Reading passage'}>
      <h2>{passage.title || 'Reading Passage'}</h2>
      <div key={passage?.title} ref={bodyRef} className="cbc-reading-passage-body">
        {paragraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraph.id || paragraphIndex}>
            {(paragraph.sentenceIds || []).map((sentenceId) => {
              const sentence = sentencesById.get(sentenceId);
              if (!sentence) return null;

              return (
                <span
                  key={sentence.id}
                  className={activeSentenceId === sentence.id ? 'active-sentence' : ''}
                >
                  {sentence.text}{' '}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </article>
  );
}

export default function PassageDrawer({
  open,
  passage,
  timeLeft,
  lang = 'en-US',
  activeSentenceId,
  onActiveSentenceChange,
  onClose
}) {
  if (!open) return null;

  return (
    <div className="cbc-passage-drawer" role="dialog" aria-modal="true" aria-labelledby="cbc-passage-drawer-title">
      <div className="cbc-passage-drawer-panel">
        <header className="cbc-passage-drawer-head">
          <div>
            <p className="cbc-exam-kicker">Reading Passage</p>
            <h2 id="cbc-passage-drawer-title">{passage?.title || 'Reading Passage'}</h2>
            <span>Question time left: {formatPassageTime(timeLeft)}</span>
          </div>
          <button type="button" className="cbc-exam-button primary" onClick={onClose}>
            Back to Question
          </button>
        </header>

        <PassageReadAloudControls
          sentences={passage?.sentences || []}
          lang={lang}
          preferredVoiceNames={passage?.readAloud?.preferredVoiceNames || []}
          onActiveSentenceChange={onActiveSentenceChange}
          className="cbc-passage-drawer-read-aloud"
        />

        <ReadingPassage passage={passage} activeSentenceId={activeSentenceId} />
      </div>
    </div>
  );
}
