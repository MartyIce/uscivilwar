import { useRef, useEffect, useMemo } from 'react';
import TimelineSlider from './TimelineSlider';
import type { CivilWarEvent } from '../../types';

interface TimelineBarProps {
  startYear: number;
  endYear: number;
  currentDate: string;
  onDateChange: (date: string) => void;
  events: CivilWarEvent[];
  isPlaying: boolean;
  onPlayToggle: () => void;
  onNextEvent: () => void;
  onPrevEvent: () => void;
  onEventSelect?: (eventId: number) => void;
}

export default function TimelineBar({
  startYear,
  endYear,
  currentDate,
  onDateChange,
  events,
  isPlaying,
  onPlayToggle,
  onNextEvent,
  onPrevEvent,
  onEventSelect,
}: TimelineBarProps) {
  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const battleListRef = useRef<HTMLDivElement>(null);

  // Calculate events by year for the density indicator
  const eventsByYear: Record<number, number> = {};
  events.forEach((event) => {
    const year = parseInt(event.date_start.substring(0, 4));
    eventsByYear[year] = (eventsByYear[year] || 0) + 1;
  });

  // Get top 20 battles sorted chronologically (only high-significance battles)
  const topBattles = useMemo(() => {
    return events
      .filter((e) => e.type === 'battle' && (e.significance || 0) >= 4)
      .sort((a, b) => {
        // Sort chronologically by date
        const dateDiff = a.date_start.localeCompare(b.date_start);
        if (dateDiff !== 0) return dateDiff;
        // Then by significance for same-date events (descending)
        return (b.significance || 0) - (a.significance || 0);
      })
      .slice(0, 20);
  }, [events]);

  // Find the index of the battle nearest to current date
  const nearestBattleIndex = useMemo(() => {
    if (topBattles.length === 0) return -1;

    let nearestIdx = 0;
    let minDiff = Infinity;

    topBattles.forEach((battle, idx) => {
      const battleDate = new Date(battle.date_start).getTime();
      const current = new Date(currentDate).getTime();
      const diff = Math.abs(battleDate - current);

      // Prefer battles that have already happened
      const hasHappened = battleDate <= current;
      const adjustedDiff = hasHappened ? diff : diff + 1000 * 60 * 60 * 24 * 30; // Add 30 days penalty for future battles

      if (adjustedDiff < minDiff) {
        minDiff = adjustedDiff;
        nearestIdx = idx;
      }
    });

    return nearestIdx;
  }, [topBattles, currentDate]);

  // Auto-scroll to nearest battle
  useEffect(() => {
    if (battleListRef.current && nearestBattleIndex >= 0) {
      const container = battleListRef.current;
      const buttons = container.querySelectorAll('button');
      const targetButton = buttons[nearestBattleIndex];

      if (targetButton) {
        const containerWidth = container.offsetWidth;
        const buttonLeft = targetButton.offsetLeft;
        const buttonWidth = targetButton.offsetWidth;

        // Scroll to center the target button
        container.scrollTo({
          left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [nearestBattleIndex]);

  // Check if a battle is in the current viewing window (within 6 months)
  const isInWindow = (battleDate: string): boolean => {
    const battle = new Date(battleDate).getTime();
    const current = new Date(currentDate).getTime();
    const sixMonths = 1000 * 60 * 60 * 24 * 180;
    return battle <= current && battle >= current - sixMonths;
  };

  // Handle battle click - jump to that date and select the event
  const handleBattleClick = (battle: CivilWarEvent) => {
    onDateChange(battle.date_start);
    if (onEventSelect) {
      onEventSelect(battle.id);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg">
      {/* Event density indicator */}
      <div className="h-8 bg-gray-100 flex items-end px-4">
        {Array.from({ length: endYear - startYear + 1 }, (_, i) => {
          const year = startYear + i;
          const count = eventsByYear[year] || 0;
          const height = count > 0 ? Math.min(100, count * 15 + 20) : 0;

          return (
            <div
              key={year}
              className="flex-1 flex flex-col items-center justify-end mx-0.5"
            >
              <div
                className="w-full bg-blue-400 rounded-t"
                style={{ height: `${height}%` }}
                title={`${year}: ${count} events`}
              />
            </div>
          );
        })}
      </div>

      {/* Main timeline controls */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Playback controls */}
          <div className="flex items-center gap-1">
            {/* Previous event button */}
            <button
              onClick={onPrevEvent}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
              title="Previous event"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <polygon points="14,3 6,10 14,17" />
              </svg>
            </button>

            {/* Play/Pause button */}
            <button
              onClick={onPlayToggle}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="5" y="4" width="3" height="12" />
                  <rect x="12" y="4" width="3" height="12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <polygon points="5,3 18,10 5,17" />
                </svg>
              )}
            </button>

            {/* Next event button */}
            <button
              onClick={onNextEvent}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
              title="Next event"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <polygon points="6,3 14,10 6,17" />
              </svg>
            </button>
          </div>

          {/* Current date display */}
          <div className="min-w-[180px] text-center">
            <p className="text-lg font-semibold text-gray-800">
              {formatDate(currentDate)}
            </p>
          </div>

          {/* Timeline slider */}
          <div className="flex-1">
            <TimelineSlider
              startYear={startYear}
              endYear={endYear}
              currentDate={currentDate}
              onDateChange={onDateChange}
            />
          </div>

          {/* Year labels */}
          <div className="flex gap-4 text-sm text-gray-500">
            <span>{startYear}</span>
            <span>-</span>
            <span>{endYear}</span>
          </div>
        </div>
      </div>

      {/* Scrolling major battles list */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 whitespace-nowrap">Major Battles:</span>
          <div
            ref={battleListRef}
            className="flex-1 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-1.5 pb-1">
              {topBattles.map((battle, idx) => {
                const inWindow = isInWindow(battle.date_start);
                const isNearest = idx === nearestBattleIndex;
                const isPast = new Date(battle.date_start) <= new Date(currentDate);

                return (
                  <button
                    key={battle.id}
                    onClick={() => handleBattleClick(battle)}
                    className={`
                      px-2.5 py-1 rounded text-xs whitespace-nowrap transition-all
                      ${isNearest
                        ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                        : inWindow
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : isPast
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }
                    `}
                    title={`${battle.name} - ${battle.date_start}${battle.result ? ` (${battle.result})` : ''}`}
                  >
                    {battle.name.replace('Battle of ', '').replace('Siege of ', '')}
                    <span className="ml-1 opacity-60">
                      {battle.date_start.substring(0, 4)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
