import type { TimelineSnapshot } from '../../data/battles/gettysburg-deep';

interface BattleTimelineProps {
  snapshots: TimelineSnapshot[];
  currentIndex: number;
  onSnapshotSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function BattleTimeline({
  snapshots,
  currentIndex,
  onSnapshotSelect,
  onNext,
  onPrev,
}: BattleTimelineProps) {
  const currentSnapshot = snapshots[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < snapshots.length - 1;

  // Group snapshots by day for visual organization
  const snapshotsByDay = snapshots.reduce((acc, snapshot, index) => {
    const day = snapshot.datetime.split('T')[0];
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push({ snapshot, index });
    return acc;
  }, {} as Record<string, { snapshot: TimelineSnapshot; index: number }[]>);

  const days = Object.keys(snapshotsByDay).sort();

  // Format time for display
  const formatTime = (datetime: string): string => {
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Format day label
  const formatDay = (dateStr: string): string => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg">
      {/* Current snapshot info */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Prev/Next buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={onPrev}
                disabled={!canGoPrev}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  canGoPrev
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                title="Previous snapshot"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <polygon points="14,3 6,10 14,17" />
                </svg>
              </button>
              <button
                onClick={onNext}
                disabled={!canGoNext}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  canGoNext
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                title="Next snapshot"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <polygon points="6,3 14,10 6,17" />
                </svg>
              </button>
            </div>

            {/* Current snapshot details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {currentSnapshot?.title || 'Loading...'}
              </h3>
              <p className="text-sm text-gray-500">
                {currentSnapshot?.label || ''} ({currentIndex + 1} of {snapshots.length})
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="text-sm text-gray-500">
            {Math.round(((currentIndex + 1) / snapshots.length) * 100)}% through battle
          </div>
        </div>

        {/* Description */}
        {currentSnapshot?.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {currentSnapshot.description}
          </p>
        )}
      </div>

      {/* Timeline visualization */}
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {days.map((day, dayIndex) => (
            <div key={day} className="flex flex-col">
              {/* Day label */}
              <div className="text-xs font-medium text-gray-500 mb-2 text-center">
                {formatDay(day)}
                <span className="ml-1 text-gray-400">Day {dayIndex + 1}</span>
              </div>

              {/* Snapshots for this day */}
              <div className="flex gap-2">
                {snapshotsByDay[day].map(({ snapshot, index }) => {
                  const isSelected = index === currentIndex;
                  const isPast = index < currentIndex;

                  return (
                    <button
                      key={snapshot.id}
                      onClick={() => onSnapshotSelect(index)}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : isPast
                          ? 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                      title={snapshot.title}
                    >
                      {/* Time */}
                      <span
                        className={`text-xs font-medium ${
                          isSelected ? 'text-blue-700' : 'text-gray-600'
                        }`}
                      >
                        {formatTime(snapshot.datetime)}
                      </span>

                      {/* Indicator dot */}
                      <div
                        className={`w-3 h-3 rounded-full mt-1 ${
                          isSelected
                            ? 'bg-blue-500'
                            : isPast
                            ? 'bg-gray-400'
                            : 'bg-gray-300'
                        }`}
                      />

                      {/* Event count badge */}
                      {snapshot.events.length > 0 && (
                        <span
                          className={`text-xs mt-1 px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {snapshot.events.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Connecting line between days */}
              {dayIndex < days.length - 1 && (
                <div className="absolute right-0 top-1/2 w-6 h-0.5 bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / snapshots.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
