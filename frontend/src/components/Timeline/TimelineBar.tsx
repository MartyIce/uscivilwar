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
}

export default function TimelineBar({
  startYear,
  endYear,
  currentDate,
  onDateChange,
  events,
  isPlaying,
  onPlayToggle,
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

  // Calculate events by year for the density indicator
  const eventsByYear: Record<number, number> = {};
  events.forEach((event) => {
    const year = parseInt(event.date_start.substring(0, 4));
    eventsByYear[year] = (eventsByYear[year] || 0) + 1;
  });

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

      {/* Key events indicator */}
      <div className="px-4 pb-2 flex flex-wrap gap-2 text-xs">
        <span className="text-gray-500">Key Events:</span>
        {events
          .filter((e) => e.significance === 5)
          .slice(0, 5)
          .map((e) => (
            <span
              key={e.id}
              className="px-2 py-0.5 bg-gray-100 rounded text-gray-700"
            >
              {e.name.replace('Battle of ', '')} ({e.date_start.substring(0, 4)})
            </span>
          ))}
      </div>
    </div>
  );
}
