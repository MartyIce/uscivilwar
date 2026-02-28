import { useState, useCallback } from 'react';
import { useBattleDeep } from '../../hooks/useBattleDeep';
import BattleTimeline from './BattleTimeline';
import BattleMap from './BattleMap';
import BattleEventList from './BattleEventList';
import type { BattleEvent } from '../../data/battles/gettysburg-deep';

interface BattleDeepViewProps {
  battleId: string;
  onClose?: () => void;
}

export default function BattleDeepView({ battleId, onClose }: BattleDeepViewProps) {
  const {
    battle,
    isLoaded,
    currentSnapshot,
    currentSnapshotIndex,
    goToSnapshot,
    nextSnapshot,
    prevSnapshot,
    currentPositions,
    currentEvents,
    findUnit,
    findLandmark,
  } = useBattleDeep(battleId);

  // Selected event for highlighting on map
  const [selectedEvent, setSelectedEvent] = useState<BattleEvent | null>(null);

  // Handle event click from event list
  const handleEventClick = useCallback((event: BattleEvent) => {
    if (event.location) {
      setSelectedEvent(event);
    }
  }, []);

  // Handle unit click on map
  const handleUnitClick = useCallback(
    (unitId: string) => {
      const unit = findUnit(unitId);
      if (unit) {
        console.log('Unit clicked:', unit);
        // Could open a unit detail panel here
      }
    },
    [findUnit]
  );

  // Handle landmark click on map
  const handleLandmarkClick = useCallback(
    (landmarkId: string) => {
      const landmark = findLandmark(landmarkId);
      if (landmark) {
        console.log('Landmark clicked:', landmark);
        // Could show landmark info
      }
    },
    [findLandmark]
  );

  // Format date range for display
  const formatDateRange = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString(
      'en-US',
      options
    )}`;
  };

  // Loading state
  if (!isLoaded || !battle) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading battle data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Back button and title */}
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                title="Back to map"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            )}
            <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">{battle.name}</h1>
              <p className="text-xs text-slate-300">
                {formatDateRange(battle.startDate, battle.endDate)}
              </p>
            </div>
          </div>

          {/* Battle result badge */}
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                battle.result === 'union_victory'
                  ? 'bg-blue-500 text-white'
                  : battle.result === 'confederate_victory'
                  ? 'bg-gray-500 text-white'
                  : 'bg-amber-500 text-white'
              }`}
            >
              {battle.result === 'union_victory'
                ? 'Union Victory'
                : battle.result === 'confederate_victory'
                ? 'Confederate Victory'
                : 'Inconclusive'}
            </span>
          </div>
        </div>

        {/* Battle info bar */}
        <div className="bg-slate-700 px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            {/* Forces summary */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-slate-300">
                  <span className="font-medium text-white">
                    {battle.forces.union.armyName}
                  </span>
                  <span className="ml-1 text-slate-400">
                    ({battle.forces.union.totalStrength.toLocaleString()} troops)
                  </span>
                </span>
              </div>
              <div className="text-slate-500">vs</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-slate-300">
                  <span className="font-medium text-white">
                    {battle.forces.confederate.armyName}
                  </span>
                  <span className="ml-1 text-slate-400">
                    ({battle.forces.confederate.totalStrength.toLocaleString()} troops)
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Commanders */}
          <div className="flex items-center gap-4 text-slate-300">
            <span>
              <span className="text-slate-400">Union:</span>{' '}
              <span className="font-medium text-white">
                {battle.forces.union.commanderRank} {battle.forces.union.commander}
              </span>
            </span>
            <span className="text-slate-600">|</span>
            <span>
              <span className="text-slate-400">Confederate:</span>{' '}
              <span className="font-medium text-white">
                {battle.forces.confederate.commanderRank} {battle.forces.confederate.commander}
              </span>
            </span>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map area */}
        <div className="flex-1 relative">
          <BattleMap
            battle={battle}
            positions={currentPositions}
            landmarks={battle.landmarks}
            selectedEventLocation={selectedEvent?.location || null}
            onUnitClick={handleUnitClick}
            onLandmarkClick={handleLandmarkClick}
          />
        </div>

        {/* Event sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          {/* Snapshot info */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentSnapshot?.title || 'Battle Overview'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {currentSnapshot?.label || ''}
            </p>
            {currentSnapshot?.description && (
              <p className="text-sm text-gray-600 mt-2">
                {currentSnapshot.description}
              </p>
            )}
          </div>

          {/* Event list */}
          <div className="flex-1 overflow-y-auto">
            <BattleEventList
              events={currentEvents}
              onEventClick={handleEventClick}
              selectedEventId={selectedEvent?.id}
            />
          </div>

          {/* Casualties summary */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <h3 className="text-xs font-medium text-gray-500 mb-2">
              Total Battle Casualties
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">
                  Union: {battle.forces.union.casualties.total.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                <span className="text-gray-600">
                  CSA: {battle.forces.confederate.casualties.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline at bottom */}
      <BattleTimeline
        snapshots={battle.timeline}
        currentIndex={currentSnapshotIndex}
        onSnapshotSelect={goToSnapshot}
        onNext={nextSnapshot}
        onPrev={prevSnapshot}
      />
    </div>
  );
}
