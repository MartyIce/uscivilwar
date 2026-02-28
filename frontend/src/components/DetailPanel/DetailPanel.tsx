import type { CivilWarEvent, Side } from '../../types';
import { usePersonByName } from '../../hooks/usePeople';
import EventDetail from './EventDetail';
import PersonDetail from './PersonDetail';

// Navigation header with back/forward buttons
function NavigationHeader({
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onClose,
}: {
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
  onClose: () => void;
}) {
  const hasHistory = canGoBack || canGoForward;

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center gap-1">
        {hasHistory && (
          <>
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              className={`p-1.5 rounded transition-colors ${
                canGoBack
                  ? 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onGoForward}
              disabled={!canGoForward}
              className={`p-1.5 rounded transition-colors ${
                canGoForward
                  ? 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="Go forward"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      <button
        onClick={onClose}
        className="p-1.5 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
        title="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

interface DetailPanelProps {
  selectedEvent: CivilWarEvent | null;
  selectedPersonName: string | null;
  isLoading: boolean;
  onClose: () => void;
  onDeepDive?: (battleId: string) => void;
  onPersonClick?: (personName: string) => void;
  onEventClick?: (eventId: number) => void;
  onSideClick?: (side: Side) => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
}

export default function DetailPanel({
  selectedEvent,
  selectedPersonName,
  isLoading,
  onClose,
  onDeepDive,
  onPersonClick,
  onEventClick,
  onSideClick,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
}: DetailPanelProps) {
  // Fetch person data when a person name is selected
  const { data: selectedPerson, isLoading: personLoading } = usePersonByName(selectedPersonName);

  if (isLoading || personLoading) {
    return (
      <div className="w-96 bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Show person detail if a person is selected
  if (selectedPersonName && selectedPerson) {
    return (
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
        {/* Navigation header */}
        <NavigationHeader
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onGoBack={onGoBack}
          onGoForward={onGoForward}
          onClose={onClose}
        />

        {/* Person details */}
        <div className="flex-1 overflow-y-auto">
          <PersonDetail
            person={selectedPerson}
            onEventClick={onEventClick}
            onSideClick={onSideClick}
          />
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
      {/* Navigation header */}
      <NavigationHeader
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={onGoBack}
        onGoForward={onGoForward}
        onClose={onClose}
      />

      {/* Event details */}
      <div className="flex-1 overflow-y-auto">
        <EventDetail event={selectedEvent} onDeepDive={onDeepDive} onPersonClick={onPersonClick} />
      </div>
    </div>
  );
}
