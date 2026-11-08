import { useState, useMemo } from 'react';
import type { CivilWarEvent } from '../../types';

interface BattlesBrowserProps {
  isOpen: boolean;
  events: CivilWarEvent[];
  selectedEventId: number | null;
  onClose: () => void;
  onEventSelect: (eventId: number) => void;
}

type ResultFilter = 'all' | 'union' | 'confederate' | 'other';

function getResultCategory(result: string | null): Exclude<ResultFilter, 'all'> {
  const lower = result?.toLowerCase() ?? '';
  if (lower.includes('union')) return 'union';
  if (lower.includes('confederate')) return 'confederate';
  return 'other';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const RESULT_BAR_COLOR: Record<Exclude<ResultFilter, 'all'>, string> = {
  union: 'bg-blue-500',
  confederate: 'bg-gray-500',
  other: 'bg-amber-500',
};

export default function BattlesBrowser({
  isOpen,
  events,
  selectedEventId,
  onClose,
  onEventSelect,
}: BattlesBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState<ResultFilter>('all');

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) => a.date_start.localeCompare(b.date_start) || a.id - b.id
      ),
    [events]
  );

  const filteredEvents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return sortedEvents.filter((event) => {
      if (filterResult !== 'all' && getResultCategory(event.result) !== filterResult) {
        return false;
      }
      if (!search) return true;
      return (
        event.name.toLowerCase().includes(search) ||
        event.campaign?.toLowerCase().includes(search) ||
        event.location?.name.toLowerCase().includes(search) ||
        event.location?.state?.toLowerCase().includes(search) ||
        event.theater?.toLowerCase().includes(search) ||
        event.description?.toLowerCase().includes(search) ||
        event.date_start.includes(search)
      );
    });
  }, [sortedEvents, searchTerm, filterResult]);

  const counts = useMemo(() => {
    const c = { union: 0, confederate: 0, other: 0 };
    for (const e of events) c[getResultCategory(e.result)]++;
    return c;
  }, [events]);

  if (!isOpen) return null;

  const tabClass = (active: boolean, activeClass: string, idleClass: string) =>
    `flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${
      active ? activeClass : idleClass
    }`;

  return (
    <div className="absolute top-16 right-4 z-[1000] bg-white rounded-lg shadow-xl w-96 max-h-[70vh] flex flex-col">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Battles ({events.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name, place, state, or year..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-1 mt-3">
          <button
            onClick={() => setFilterResult('all')}
            className={tabClass(filterResult === 'all', 'bg-gray-800 text-white', 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
          >
            All ({events.length})
          </button>
          <button
            onClick={() => setFilterResult('union')}
            className={tabClass(filterResult === 'union', 'bg-blue-600 text-white', 'bg-blue-50 text-blue-700 hover:bg-blue-100')}
          >
            Union ({counts.union})
          </button>
          <button
            onClick={() => setFilterResult('confederate')}
            className={tabClass(filterResult === 'confederate', 'bg-gray-600 text-white', 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
          >
            Confed. ({counts.confederate})
          </button>
          <button
            onClick={() => setFilterResult('other')}
            className={tabClass(filterResult === 'other', 'bg-amber-600 text-white', 'bg-amber-50 text-amber-700 hover:bg-amber-100')}
          >
            Other ({counts.other})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredEvents.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No battles found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => onEventSelect(event.id)}
                className={`w-full text-left p-3 hover:bg-gray-50 ${
                  event.id === selectedEventId ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-1 h-12 rounded-full flex-shrink-0 ${
                      RESULT_BAR_COLOR[getResultCategory(event.result)]
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-blue-600 truncate">{event.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(event.date_start)}
                      {event.location &&
                        ` · ${event.location.name}${
                          event.location.state ? `, ${event.location.state}` : ''
                        }`}
                    </div>
                    {event.result && (
                      <div className="text-xs text-gray-400 truncate mt-1">{event.result}</div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-gray-200 text-xs text-gray-500 text-center flex-shrink-0">
        Showing {filteredEvents.length} of {events.length} battles
      </div>
    </div>
  );
}
