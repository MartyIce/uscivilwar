import { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import MapContainer from './components/Map/MapContainer';
import DetailPanel from './components/DetailPanel/DetailPanel';
import TimelineBar from './components/Timeline/TimelineBar';
import FilterSidebar from './components/Filters/FilterSidebar';
import CommanderSelector from './components/CommanderTracker/CommanderSelector';
import { useEvents, useEvent } from './hooks/useEvents';
import { useBoundaries } from './hooks/useBoundaries';
import { mockArmyMovements } from './mocks/data/movements';
import type { EventType } from './types';
import './App.css';

// All event types for initial filter state
const ALL_EVENT_TYPES: EventType[] = [
  'battle',
  'siege',
  'raid',
  'skirmish',
  'surrender',
  'treaty',
  'proclamation',
  'election',
];

// Default date range for the Civil War
const DEFAULT_DATE_RANGE = {
  from: '1861-01-01',
  to: '1865-12-31',
};

function App() {
  // UI state
  const [showFilters, setShowFilters] = useState(false);
  const [showCommanderSelector, setShowCommanderSelector] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState('1861-04-12'); // Start at Fort Sumter
  const [isPlaying, setIsPlaying] = useState(false);

  // Army movement tracking - default to showing Lee and Grant
  const [selectedCommanders, setSelectedCommanders] = useState<string[]>([
    'Robert E. Lee',
    'Ulysses S. Grant',
  ]);

  // Filter state
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>(ALL_EVENT_TYPES);
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);

  // Fetch data
  const { data: eventsData, isLoading: eventsLoading } = useEvents({
    date_from: dateRange.from,
    date_to: dateRange.to,
    theater: selectedTheater || undefined,
    limit: 200,
  });

  const { data: selectedEvent, isLoading: eventLoading } = useEvent(selectedEventId);

  const { data: boundariesData } = useBoundaries({
    date: currentDate,
    type: 'state',
  });

  // Filter events by type and current date (rolling window)
  const filteredEvents = useMemo(() => {
    if (!eventsData?.data) return [];

    // Show events within a 6-month window ending at current date
    const currentDateObj = new Date(currentDate);
    const windowStart = new Date(currentDateObj);
    windowStart.setMonth(windowStart.getMonth() - 6);
    const windowStartStr = windowStart.toISOString().split('T')[0];

    return eventsData.data.filter((event) => {
      // Filter by type
      if (!selectedTypes.includes(event.type)) return false;

      // Filter by current date window (show events within last 6 months)
      const eventDate = event.date_end || event.date_start;
      if (eventDate > currentDate) return false; // Event hasn't happened yet
      if (event.date_start < windowStartStr) return false; // Event is too old

      return true;
    });
  }, [eventsData?.data, selectedTypes, currentDate]);

  // All events for the timeline (not filtered by current date)
  const allEvents = useMemo(() => {
    if (!eventsData?.data) return [];
    return eventsData.data.filter((event) => selectedTypes.includes(event.type));
  }, [eventsData?.data, selectedTypes]);

  // Handle type filter toggle
  const handleTypeToggle = useCallback((type: EventType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  // Handle filter reset
  const handleFilterReset = useCallback(() => {
    setSelectedTypes(ALL_EVENT_TYPES);
    setDateRange(DEFAULT_DATE_RANGE);
    setSelectedTheater(null);
  }, []);

  // Handle event selection
  const handleEventSelect = useCallback((eventId: number) => {
    setSelectedEventId(eventId);
  }, []);

  // Handle detail panel close
  const handleDetailClose = useCallback(() => {
    setSelectedEventId(null);
  }, []);

  // Auto-play timeline
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentDate((prev) => {
        const current = new Date(prev);
        current.setDate(current.getDate() + 7); // Advance by 1 week

        const maxDate = new Date(dateRange.to);
        if (current > maxDate) {
          setIsPlaying(false);
          return dateRange.to;
        }

        return current.toISOString().split('T')[0];
      });
    }, 200); // Update every 200ms

    return () => clearInterval(interval);
  }, [isPlaying, dateRange.to]);

  // Handle play/pause toggle
  const handlePlayToggle = useCallback(() => {
    if (!isPlaying && currentDate >= dateRange.to) {
      // If at end, reset to beginning
      setCurrentDate(dateRange.from);
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying, currentDate, dateRange]);

  // Handle commander toggle for army tracking
  const handleCommanderToggle = useCallback((commander: string) => {
    setSelectedCommanders((prev) =>
      prev.includes(commander)
        ? prev.filter((c) => c !== commander)
        : [...prev, commander]
    );
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header onToggleFilters={() => setShowFilters(!showFilters)} showFilters={showFilters} />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Filter sidebar */}
        {showFilters && (
          <FilterSidebar
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedTheater={selectedTheater}
            onTheaterChange={setSelectedTheater}
            onReset={handleFilterReset}
          />
        )}

        {/* Map area */}
        <div className="flex-1 relative">
          {eventsLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading map data...</p>
              </div>
            </div>
          ) : (
            <MapContainer
              events={filteredEvents}
              boundaries={boundariesData?.boundaries || []}
              selectedEventId={selectedEventId}
              onEventSelect={handleEventSelect}
              currentDate={currentDate}
              armyMovements={mockArmyMovements}
              selectedCommanders={selectedCommanders}
            />
          )}

          {/* Army movement tracking button */}
          <button
            onClick={() => setShowCommanderSelector(!showCommanderSelector)}
            className={`absolute top-4 left-4 z-[1000] px-3 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors ${
              selectedCommanders.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">
              Track Armies {selectedCommanders.length > 0 && `(${selectedCommanders.length})`}
            </span>
          </button>

          {/* Commander selector panel */}
          <CommanderSelector
            selectedCommanders={selectedCommanders}
            onToggleCommander={handleCommanderToggle}
            isOpen={showCommanderSelector}
            onClose={() => setShowCommanderSelector(false)}
          />
        </div>

        {/* Detail panel */}
        <DetailPanel
          selectedEvent={selectedEvent || null}
          isLoading={eventLoading}
          onClose={handleDetailClose}
        />
      </div>

      {/* Timeline bar */}
      <TimelineBar
        startYear={1861}
        endYear={1865}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        events={allEvents}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
      />
    </div>
  );
}

export default App;
