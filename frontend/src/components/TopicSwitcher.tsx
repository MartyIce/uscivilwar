import type { TopicConfig } from '../topics';

interface TopicSwitcherProps {
  topics: TopicConfig[];
  currentId: string;
  onChange: (id: string) => void;
}

/** Dropdown for switching topics. Hidden when there is only one topic. */
export default function TopicSwitcher({ topics, currentId, onChange }: TopicSwitcherProps) {
  if (topics.length < 2) return null;
  return (
    <select
      value={currentId}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Topic"
      className="bg-slate-700 text-slate-100 text-sm rounded px-2 py-2 border border-slate-600 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {topics.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
