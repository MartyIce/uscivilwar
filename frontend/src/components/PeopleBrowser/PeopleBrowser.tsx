import { useState, useMemo } from 'react';
import { expandedPeople } from '../../mocks/data/people-expanded';
import { getPersonEvents } from '../../mocks/data/event-participants';
import type { Side } from '../../types';

interface PeopleBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onPersonSelect?: (name: string) => void;
}

type FilterSide = 'all' | Side;

export default function PeopleBrowser({ isOpen, onClose, onPersonSelect }: PeopleBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSide, setFilterSide] = useState<FilterSide>('all');
  const [expandedPersonId, setExpandedPersonId] = useState<number | null>(null);

  const filteredPeople = useMemo(() => {
    return expandedPeople
      .filter((person) => {
        // Filter by side
        if (filterSide !== 'all' && person.side !== filterSide) return false;
        // Filter by search term
        if (searchTerm) {
          const search = searchTerm.toLowerCase();
          return (
            person.name.toLowerCase().includes(search) ||
            person.rank?.toLowerCase().includes(search) ||
            person.biography?.toLowerCase().includes(search)
          );
        }
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, filterSide]);

  const unionCount = expandedPeople.filter((p) => p.side === 'union').length;
  const confederateCount = expandedPeople.filter((p) => p.side === 'confederate').length;

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 z-[1000] bg-white rounded-lg shadow-xl w-96 max-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            People ({expandedPeople.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, rank, or bio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Side filter tabs */}
        <div className="flex gap-1 mt-3">
          <button
            onClick={() => setFilterSide('all')}
            className={`flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              filterSide === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({expandedPeople.length})
          </button>
          <button
            onClick={() => setFilterSide('union')}
            className={`flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              filterSide === 'union'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Union ({unionCount})
          </button>
          <button
            onClick={() => setFilterSide('confederate')}
            className={`flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              filterSide === 'confederate'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Confederate ({confederateCount})
          </button>
        </div>
      </div>

      {/* People list */}
      <div className="flex-1 overflow-y-auto">
        {filteredPeople.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No people found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredPeople.map((person) => {
              const events = getPersonEvents(person.id);
              const isExpanded = expandedPersonId === person.id;

              return (
                <div key={person.id} className="hover:bg-gray-50">
                  <button
                    onClick={() => setExpandedPersonId(isExpanded ? null : person.id)}
                    className="w-full text-left p-3"
                  >
                    <div className="flex items-start gap-3">
                      {/* Side indicator */}
                      <div
                        className={`w-1 h-12 rounded-full flex-shrink-0 ${
                          person.side === 'union' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPersonSelect?.(person.name);
                            }}
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline truncate text-left"
                          >
                            {person.name}
                          </button>
                          {events.length > 0 && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                              {events.length} battles
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{person.rank}</div>
                        {!isExpanded && person.biography && (
                          <div className="text-xs text-gray-400 truncate mt-1">
                            {person.biography}
                          </div>
                        )}
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-3 pb-3 pl-7">
                      <div className="bg-gray-50 rounded-lg p-3 text-sm">
                        {person.biography && (
                          <p className="text-gray-700 mb-2">{person.biography}</p>
                        )}
                        <div className="text-xs text-gray-500 space-y-1">
                          {person.birth_date && (
                            <div>Born: {person.birth_date}</div>
                          )}
                          {person.death_date && (
                            <div>Died: {person.death_date}</div>
                          )}
                          {person.highest_rank && person.highest_rank !== person.rank && (
                            <div>Highest Rank: {person.highest_rank}</div>
                          )}
                        </div>
                        {person.wikipedia_url && (
                          <a
                            href={person.wikipedia_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-xs"
                          >
                            Wikipedia →
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer showing count */}
      <div className="p-2 border-t border-gray-200 text-xs text-gray-500 text-center flex-shrink-0">
        Showing {filteredPeople.length} of {expandedPeople.length} people
      </div>
    </div>
  );
}
