import { topicProgress } from '../services/questionBankService.js';

export default function TopicPicker({ topics, selectedId, completed, onSelect }) {
  return (
    <div className="topic-picker">
      {topics.map((topic) => {
        const p = topicProgress(topic, completed);
        return (
          <button
            key={`${topic.category || 'topic'}/${topic.id}`}
            className={`topic-tab glass ${selectedId === topic.id ? 'active' : ''}`}
            onClick={() => onSelect(topic.id)}
          >
            <span className="eyebrow">{topic.count ?? '…'} quiz</span>
            <strong>{topic.name}</strong>
            <small>{p.done}/{p.total || '…'} complete</small>
          </button>
        );
      })}
    </div>
  );
}
