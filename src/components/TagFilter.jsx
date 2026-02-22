import { formatTag } from '../utils/projectLoader'

export default function TagFilter({ tags, activeTags, onToggleTag, onToggleAll }) {
  const isAllActive = activeTags === null;

  return (
    <div className="tag-filter">
      <button
        className={`tag-pill tag-pill-all ${isAllActive ? 'active' : ''}`}
        onClick={onToggleAll}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          className={`tag-pill ${activeTags !== null && activeTags.has(tag) ? 'active' : ''}`}
          onClick={() => onToggleTag(tag)}
        >
          {formatTag(tag)}
        </button>
      ))}
    </div>
  );
}
