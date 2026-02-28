import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Header from './components/Header';
import MapContainer from './components/Map/MapContainer';
import DetailPanel from './components/DetailPanel/DetailPanel';
import TimelineBar from './components/Timeline/TimelineBar';
import FilterSidebar from './components/Filters/FilterSidebar';
import CommanderSelector from './components/CommanderTracker/CommanderSelector';
import PeopleBrowser from './components/PeopleBrowser/PeopleBrowser';
import { useEvents, useEvent } from './hooks/useEvents';
import { useBoundaries } from './hooks/useBoundaries';
import { usePersonByName } from './hooks/usePeople';
import { useDeepLink } from './hooks/useDeepLink';
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
  // Deep linking for event and person selection
  const {
    eventId: selectedEventId,
    personName: selectedPersonName,
    setEventId: setSelectedEventId,
    setPersonName: setSelectedPersonName,
    clearSelection,
  } = useDeepLink();

  // UI state
  const [showFilters, setShowFilters] = useState(false);
  const [showCommanderSelector, setShowCommanderSelector] = useState(false);
  const [showPeopleBrowser, setShowPeopleBrowser] = useState(false);
  const [currentDate, setCurrentDate] = useState('1861-04-12'); // Start at Fort Sumter
  const [isPlaying, setIsPlaying] = useState(false);

  // Army movement tracking - default to showing Lee and Grant
  const [selectedCommanders, setSelectedCommanders] = useState<string[]>([
    'Robert E. Lee',
    'Ulysses S. Grant',
  ]);
  const [showTroopStrength, setShowTroopStrength] = useState(false);

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

  // Fetch person by name when a commander is clicked
  const { data: selectedPerson, isLoading: personLoading } = usePersonByName(selectedPersonName);

  // Use a fixed date for boundaries since they don't change frequently
  // This prevents re-fetching on every timeline drag
  const { data: boundariesData } = useBoundaries({
    date: '1863-01-01',
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

      // Event disappears 6 months after it ends
      const eventEndDate = event.date_end || event.date_start;
      if (eventEndDate < windowStartStr) return false; // Event ended too long ago

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
  }, [setSelectedEventId]);

  // Handle detail panel close
  const handleDetailClose = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  // Handle person click from event detail
  const handlePersonClick = useCallback((name: string) => {
    setSelectedPersonName(name);
  }, [setSelectedPersonName]);

  // Handle back to event from person detail
  const handleBackToEvent = useCallback(() => {
    setSelectedPersonName(null);
  }, [setSelectedPersonName]);

  // Handle event click from person detail
  const handleEventClickFromPerson = useCallback((eventId: number) => {
    setSelectedEventId(eventId);
  }, [setSelectedEventId]);

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

  // Handle jump to next event
  const handleNextEvent = useCallback(() => {
    if (!allEvents.length) return;

    // Find the next event after the current date
    const sortedEvents = [...allEvents].sort((a, b) =>
      a.date_start.localeCompare(b.date_start)
    );

    const nextEvent = sortedEvents.find(
      (event) => event.date_start > currentDate
    );

    if (nextEvent) {
      setCurrentDate(nextEvent.date_start);
      setIsPlaying(false);
    }
  }, [allEvents, currentDate]);

  // Handle jump to previous event
  const handlePrevEvent = useCallback(() => {
    if (!allEvents.length) return;

    // Find the previous event before the current date
    const sortedEvents = [...allEvents].sort((a, b) =>
      b.date_start.localeCompare(a.date_start)
    );

    const prevEvent = sortedEvents.find(
      (event) => event.date_start < currentDate
    );

    if (prevEvent) {
      setCurrentDate(prevEvent.date_start);
      setIsPlaying(false);
    }
  }, [allEvents, currentDate]);

  // Handle commander toggle for army tracking
  const handleCommanderToggle = useCallback((commander: string) => {
    setSelectedCommanders((prev) =>
      prev.includes(commander)
        ? prev.filter((c) => c !== commander)
        : [...prev, commander]
    );
  }, []);

  // Track if we've initialized from URL to prevent re-scrolling
  const initializedFromUrl = useRef(false);

  // Scroll timeline to event date when loading from URL
  useEffect(() => {
    if (selectedEvent && !initializedFromUrl.current) {
      // Set timeline to show the event's date
      setCurrentDate(selectedEvent.date_start);
      initializedFromUrl.current = true;
    }
  }, [selectedEvent]);

  // Reset the initialization flag when selection is cleared
  useEffect(() => {
    if (!selectedEventId && !selectedPersonName) {
      initializedFromUrl.current = false;
    }
  }, [selectedEventId, selectedPersonName]);

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
              showTroopStrength={showTroopStrength}
            />
          )}

          {/* Army movement tracking button */}
          <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2">
            <button
              onClick={() => setShowCommanderSelector(!showCommanderSelector)}
              className={`px-3 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors ${
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

            {/* Troop strength toggle - only show when commanders are selected */}
            {selectedCommanders.length > 0 && (
              <button
                onClick={() => setShowTroopStrength(!showTroopStrength)}
                className={`px-3 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors ${
                  showTroopStrength
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title="Show army sizes - larger circles represent larger armies"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Size</span>
              </button>
            )}
          </div>

          {/* Commander selector panel */}
          <CommanderSelector
            selectedCommanders={selectedCommanders}
            onToggleCommander={handleCommanderToggle}
            isOpen={showCommanderSelector}
            onClose={() => setShowCommanderSelector(false)}
          />

          {/* People browser button */}
          <button
            onClick={() => setShowPeopleBrowser(!showPeopleBrowser)}
            className={`absolute top-4 right-4 z-[1000] px-3 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors ${
              showPeopleBrowser
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-sm font-medium">People</span>
          </button>

          {/* People browser panel */}
          <PeopleBrowser
            isOpen={showPeopleBrowser}
            onClose={() => setShowPeopleBrowser(false)}
          />
        </div>

        {/* Detail panel */}
        <DetailPanel
          selectedEvent={selectedEvent || null}
          selectedPerson={selectedPerson || null}
          selectedPersonName={selectedPersonName}
          isLoading={eventLoading || personLoading}
          onClose={handleDetailClose}
          onPersonClick={handlePersonClick}
          onEventClick={handleEventClickFromPerson}
          onBackToEvent={handleBackToEvent}
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
        onNextEvent={handleNextEvent}
        onPrevEvent={handlePrevEvent}
      />
    </div>
  );
}

export default App;
