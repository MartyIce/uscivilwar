import type { CivilWarEvent } from '../../types';
import EventDetail from './EventDetail';

interface DetailPanelProps {
  selectedEvent: CivilWarEvent | null;
  isLoading: boolean;
  onClose: () => void;
}

export default function DetailPanel({
  selectedEvent,
  isLoading,
  onClose,
}: DetailPanelProps) {
  if (isLoading) {
    return (
      <div className="w-96 bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!selectedEvent) {
    return (
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <svg
              className="w-16 h-16 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-700">
              Select an Event
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Click on a marker on the map to view event details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
        title="Close"
      >
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Event details */}
      <div className="flex-1 overflow-y-auto">
        <EventDetail event={selectedEvent} />
      </div>
    </div>
  );
}
