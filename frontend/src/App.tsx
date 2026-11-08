import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Header from './components/Header';
import MapContainer from './components/Map/MapContainer';
import DetailPanel from './components/DetailPanel/DetailPanel';
import TimelineBar from './components/Timeline/TimelineBar';
import FilterSidebar from './components/Filters/FilterSidebar';
import CommanderSelector from './components/CommanderTracker/CommanderSelector';
import PeopleBrowser from './components/PeopleBrowser/PeopleBrowser';
import BattlesBrowser from './components/BattlesBrowser/BattlesBrowser';
import BattleDeepView from './components/BattleDeep/BattleDeepView';
import OrgChart from './components/OrgChart/OrgChart';
import { useEvents, useEvent } from './hooks/useEvents';
import { useNavigationHistory } from './hooks/useNavigationHistory';
import { armyMovements, stateBoundaries } from './data';
import type { EventType, Side } from './types';
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
  const [showPeopleBrowser, setShowPeopleBrowser] = useState(false);
  const [showBattlesBrowser, setShowBattlesBrowser] = useState(false);
  const [deepBattleId, setDeepBattleId] = useState<string | null>(null);
  const [orgChartSide, setOrgChartSide] = useState<Side | null>(null);
  const [orgChartHighlightedPerson, setOrgChartHighlightedPerson] = useState<string | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState('1861-04-12'); // Start at Fort Sumter
  const [isPlaying, setIsPlaying] = useState(false);

  // Navigation history for detail panel
  const navHistory = useNavigationHistory();

  // Derive selected event/person/city/state from navigation history
  const selectedEventId = navHistory.current?.type === 'event' ? navHistory.current.eventId : null;
  const selectedPersonName = navHistory.current?.type === 'person' ? navHistory.current.personName : null;
  const selectedCityName = navHistory.current?.type === 'city' ? navHistory.current.cityName : null;
  const selectedStateName = navHistory.current?.type === 'state' ? navHistory.current.stateName : null;

  // Army movement tracking - default to showing Lee and Grant
  const [selectedCommanders, setSelectedCommanders] = useState<string[]>([
    'Robert E. Lee',
    'Ulysses S. Grant',
  ]);
  const [showTroopStrength, setShowTroopStrength] = useState(false);
  const [showCities, setShowCities] = useState(true);

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

      // Always include the selected event so it stays visible on the map
      if (event.id === selectedEventId) return true;

      // Filter by current date window (show events within last 6 months)
      const eventDate = event.date_end || event.date_start;
      if (eventDate > currentDate) return false; // Event hasn't happened yet

      // Event disappears 6 months after it ends
      const eventEndDate = event.date_end || event.date_start;
      if (eventEndDate < windowStartStr) return false; // Event ended too long ago

      return true;
    });
  }, [eventsData?.data, selectedTypes, currentDate, selectedEventId]);

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

  // Handle event selection (from map or person detail)
  const handleEventSelect = useCallback((eventId: number) => {
    navHistory.navigate({ type: 'event', eventId });

    // Also update the timeline to the event's date
    const event = eventsData?.data?.find(e => e.id === eventId);
    if (event?.date_start) {
      setCurrentDate(event.date_start);
    }
  }, [navHistory, eventsData?.data]);

  // On first load, select Fort Sumter so it is highlighted and its details show
  const hasAutoSelectedInitialEvent = useRef(false);
  useEffect(() => {
    if (hasAutoSelectedInitialEvent.current || !eventsData?.data?.length) return;
    const sumter = eventsData.data.find((e) => e.name.includes('Fort Sumter'));
    if (sumter) {
      hasAutoSelectedInitialEvent.current = true;
      handleEventSelect(sumter.id);
    }
  }, [eventsData?.data, handleEventSelect]);

  // Handle detail panel close
  const handleDetailClose = useCallback(() => {
    navHistory.clear();
  }, [navHistory]);

  // Handle deep dive into a battle
  const handleDeepDive = useCallback((battleId: string) => {
    setDeepBattleId(battleId);
  }, []);

  // Handle closing deep dive view
  const handleDeepDiveClose = useCallback(() => {
    setDeepBattleId(null);
  }, []);

  // Handle person click from event details - show person in detail panel
  const handlePersonClick = useCallback((personName: string) => {
    navHistory.navigate({ type: 'person', personName });
  }, [navHistory]);

  // Handle city click - show city in detail panel
  const handleCityClick = useCallback((cityName: string) => {
    navHistory.navigate({ type: 'city', cityName });
  }, [navHistory]);

  // Handle state click - show state in detail panel
  const handleStateClick = useCallback((stateName: string) => {
    navHistory.navigate({ type: 'state', stateName });
  }, [navHistory]);

  // Handle side click - show org chart
  const handleSideClick = useCallback((side: Side, personSlug?: string) => {
    setOrgChartSide(side);
    setOrgChartHighlightedPerson(personSlug);
  }, []);

  // Handle org chart close
  const handleOrgChartClose = useCallback(() => {
    setOrgChartSide(null);
    setOrgChartHighlightedPerson(undefined);
  }, []);

  // Handle person click from org chart
  const handleOrgChartPersonClick = useCallback((personSlug: string) => {
    // Convert slug to name (replace hyphens with spaces and capitalize)
    const personName = personSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    navHistory.navigate({ type: 'person', personName });
    setOrgChartSide(null);
  }, [navHistory]);

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

  // Step to the next/previous event: select it so the map pans and highlights it
  const stepEvent = useCallback(
    (direction: 1 | -1) => {
      if (!allEvents.length) return;

      const sorted = [...allEvents].sort(
        (a, b) => a.date_start.localeCompare(b.date_start) || a.id - b.id
      );

      const selectedIndex = sorted.findIndex((e) => e.id === selectedEventId);
      let target: (typeof sorted)[number] | undefined;
      if (selectedIndex !== -1) {
        target = sorted[selectedIndex + direction];
      } else if (direction === 1) {
        target = sorted.find((e) => e.date_start > currentDate);
      } else {
        target = [...sorted].reverse().find((e) => e.date_start < currentDate);
      }

      if (target) {
        handleEventSelect(target.id);
        setIsPlaying(false);
      }
    },
    [allEvents, currentDate, selectedEventId, handleEventSelect]
  );

  const handleNextEvent = useCallback(() => stepEvent(1), [stepEvent]);
  const handlePrevEvent = useCallback(() => stepEvent(-1), [stepEvent]);

  // Handle commander toggle for army tracking
  const handleCommanderToggle = useCallback((commander: string) => {
    setSelectedCommanders((prev) =>
      prev.includes(commander)
        ? prev.filter((c) => c !== commander)
        : [...prev, commander]
    );
  }, []);

  // Show deep battle view if a battle is selected for deep dive
  if (deepBattleId) {
    return <BattleDeepView battleId={deepBattleId} onClose={handleDeepDiveClose} />;
  }

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
              selectedEvent={selectedEvent}
              boundaries={stateBoundaries}
              selectedEventId={selectedEventId}
              onEventSelect={handleEventSelect}
              currentDate={currentDate}
              armyMovements={armyMovements}
              selectedCommanders={selectedCommanders}
              showTroopStrength={showTroopStrength}
              showCities={showCities}
              onCityClick={handleCityClick}
              selectedCityName={selectedCityName}
              onStateClick={handleStateClick}
              selectedStateName={selectedStateName}
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
                title="Show troop strength - larger markers = larger armies, with troop counts shown"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-sm font-medium">Troop #</span>
              </button>
            )}

            {/* Cities toggle */}
            <button
              onClick={() => setShowCities(!showCities)}
              className={`px-3 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors ${
                showCities
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              title="Show/hide major cities"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Cities</span>
            </button>
          </div>

          {/* Commander selector panel */}
          <CommanderSelector
            selectedCommanders={selectedCommanders}
            onToggleCommander={handleCommanderToggle}
            isOpen={showCommanderSelector}
            onClose={() => setShowCommanderSelector(false)}
          />

          {/* Battles browser button */}
          <button
            onClick={() => {
              setShowBattlesBrowser(!showBattlesBrowser);
              setShowPeopleBrowser(false);
            }}
            className={`absolute top-4 right-32 z-[1000] px-3 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors ${
              showBattlesBrowser
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Battles</span>
          </button>

          <BattlesBrowser
            isOpen={showBattlesBrowser}
            events={eventsData?.data ?? []}
            selectedEventId={selectedEventId}
            onClose={() => setShowBattlesBrowser(false)}
            onEventSelect={(id) => {
              handleEventSelect(id);
              setShowBattlesBrowser(false);
            }}
          />

          {/* People browser button */}
          <button
            onClick={() => {
              setShowPeopleBrowser(!showPeopleBrowser);
              setShowBattlesBrowser(false);
            }}
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
            onPersonSelect={handlePersonClick}
          />
        </div>

        {/* Detail panel */}
        <DetailPanel
          selectedEvent={selectedEvent || null}
          selectedPersonName={selectedPersonName}
          selectedCityName={selectedCityName}
          selectedStateName={selectedStateName}
          isLoading={eventLoading}
          onClose={handleDetailClose}
          onDeepDive={handleDeepDive}
          onPersonClick={handlePersonClick}
          onEventClick={handleEventSelect}
          onSideClick={handleSideClick}
          canGoBack={navHistory.canGoBack}
          canGoForward={navHistory.canGoForward}
          onGoBack={navHistory.goBack}
          onGoForward={navHistory.goForward}
        />

        {/* Org chart modal */}
        {orgChartSide && (
          <OrgChart
            side={orgChartSide}
            initialDate={currentDate}
            highlightedPersonSlug={orgChartHighlightedPerson}
            onPersonClick={handleOrgChartPersonClick}
            onClose={handleOrgChartClose}
          />
        )}
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
        onEventSelect={handleEventSelect}
      />
    </div>
  );
}

export default App;
