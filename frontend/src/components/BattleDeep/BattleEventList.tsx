import type { BattleEvent } from '../../data/battles/gettysburg-deep';

interface BattleEventListProps {
  events: BattleEvent[];
  onEventClick?: (event: BattleEvent) => void;
  selectedEventId?: string | null;
}

// Get background color based on importance
function getImportanceStyles(importance: BattleEvent['importance']): {
  bg: string;
  border: string;
  badge: string;
  text: string;
} {
  switch (importance) {
    case 'critical':
      return {
        bg: 'bg-red-50',
        border: 'border-l-red-500',
        badge: 'bg-red-500 text-white',
        text: 'text-red-800',
      };
    case 'major':
      return {
        bg: 'bg-amber-50',
        border: 'border-l-amber-500',
        badge: 'bg-amber-500 text-white',
        text: 'text-amber-800',
      };
    case 'minor':
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-l-gray-400',
        badge: 'bg-gray-400 text-white',
        text: 'text-gray-700',
      };
  }
}

// Get icon based on event type
function getEventTypeIcon(type: BattleEvent['type']): string {
  switch (type) {
    case 'combat':
      return 'X'; // Crossed swords
    case 'movement':
      return '>';
    case 'command':
      return '*';
    case 'casualty':
      return '!';
    case 'terrain':
      return '#';
    default:
      return '-';
  }
}

// Format time for display
function formatEventTime(timeStr: string): string {
  const date = new Date(timeStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function BattleEventList({
  events,
  onEventClick,
  selectedEventId,
}: BattleEventListProps) {
  if (events.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <svg
          className="w-12 h-12 mx-auto text-gray-300 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm">No events at this time</p>
      </div>
    );
  }

  // Sort events by time, then by importance
  const sortedEvents = [...events].sort((a, b) => {
    // First sort by time
    const timeCompare = a.time.localeCompare(b.time);
    if (timeCompare !== 0) return timeCompare;

    // Then by importance (critical > major > minor)
    const importanceOrder = { critical: 0, major: 1, minor: 2 };
    return importanceOrder[a.importance] - importanceOrder[b.importance];
  });

  return (
    <div className="divide-y divide-gray-100">
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">
          Events ({events.length})
        </h3>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {sortedEvents.map((event) => {
          const styles = getImportanceStyles(event.importance);
          const isSelected = event.id === selectedEventId;
          const hasLocation = !!event.location;

          return (
            <button
              key={event.id}
              onClick={() => onEventClick?.(event)}
              className={`w-full text-left p-3 border-l-4 transition-colors ${
                styles.bg
              } ${styles.border} ${
                isSelected ? 'ring-2 ring-inset ring-blue-500' : ''
              } ${
                hasLocation && onEventClick
                  ? 'hover:brightness-95 cursor-pointer'
                  : 'cursor-default'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Event type icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${styles.badge}`}
                >
                  {getEventTypeIcon(event.type)}
                </div>

                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-semibold ${styles.text}`}>
                      {event.title}
                    </h4>
                    {hasLocation && (
                      <span title="Has map location">
                        <svg
                          className="w-4 h-4 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatEventTime(event.time)}
                  </p>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Tags row */}
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded capitalize ${styles.badge}`}
                    >
                      {event.importance}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700 capitalize">
                      {event.type}
                    </span>
                    {event.relatedUnits && event.relatedUnits.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {event.relatedUnits.length} unit(s)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
