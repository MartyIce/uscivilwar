import type { EventType } from '../../types';

interface FilterSidebarProps {
  selectedTypes: EventType[];
  onTypeToggle: (type: EventType) => void;
  dateRange: { from: string; to: string };
  /** The topic's full date span (the default and the limits for the inputs) */
  fullDateRange: { from: string; to: string };
  /** Theaters to offer in the filter */
  theaters: { value: string; label: string }[];
  onDateRangeChange: (range: { from: string; to: string }) => void;
  selectedTheater: string | null;
  onTheaterChange: (theater: string | null) => void;
  onReset: () => void;
}

const EVENT_TYPES: { value: EventType; label: string; color: string }[] = [
  { value: 'battle', label: 'Battles', color: 'bg-red-500' },
  { value: 'siege', label: 'Sieges', color: 'bg-orange-500' },
  { value: 'raid', label: 'Raids', color: 'bg-yellow-500' },
  { value: 'skirmish', label: 'Skirmishes', color: 'bg-green-500' },
  { value: 'surrender', label: 'Surrenders', color: 'bg-purple-500' },
  { value: 'treaty', label: 'Treaties', color: 'bg-blue-500' },
  { value: 'proclamation', label: 'Proclamations', color: 'bg-indigo-500' },
  { value: 'election', label: 'Elections', color: 'bg-pink-500' },
];


export default function FilterSidebar({
  selectedTypes,
  onTypeToggle,
  dateRange,
  fullDateRange,
  theaters: THEATERS,
  onDateRangeChange,
  selectedTheater,
  onTheaterChange,
  onReset,
}: FilterSidebarProps) {
  const hasActiveFilters =
    selectedTypes.length < EVENT_TYPES.length ||
    dateRange.from !== fullDateRange.from ||
    dateRange.to !== fullDateRange.to ||
    selectedTheater !== null;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs text-blue-600 hover:underline"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Event Type filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Event Types</h3>
          <div className="space-y-2">
            {EVENT_TYPES.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.value)}
                  onChange={() => onTypeToggle(type.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div
                  className={`w-3 h-3 rounded-full ${type.color}`}
                ></div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  {type.label}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() =>
                EVENT_TYPES.forEach((t) => {
                  if (!selectedTypes.includes(t.value)) onTypeToggle(t.value);
                })
              }
              className="text-xs text-blue-600 hover:underline"
            >
              Select All
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() =>
                EVENT_TYPES.forEach((t) => {
                  if (selectedTypes.includes(t.value)) onTypeToggle(t.value);
                })
              }
              className="text-xs text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Date range filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Date Range</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) =>
                  onDateRangeChange({ ...dateRange, from: e.target.value })
                }
                min={fullDateRange.from}
                max={fullDateRange.to}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  onDateRangeChange({ ...dateRange, to: e.target.value })
                }
                min={fullDateRange.from}
                max={fullDateRange.to}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Theater filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Theater</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theater"
                checked={selectedTheater === null}
                onChange={() => onTheaterChange(null)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">All Theaters</span>
            </label>
            {THEATERS.map((theater) => (
              <label
                key={theater.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="theater"
                  checked={selectedTheater === theater.value}
                  onChange={() => onTheaterChange(theater.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">{theater.label}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
