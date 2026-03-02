import type { CivilWarEvent, Side } from '../../types';
import { usePersonByName } from '../../hooks/usePeople';
import { useCityByName, useStateByName, useBattleLookup } from '../../hooks/useReferenceData';
import EventDetail from './EventDetail';
import PersonDetail from './PersonDetail';
import CityDetail from './CityDetail';
import StateDetail from './StateDetail';
import DetailPanelShell from './DetailPanelShell';

interface DetailPanelProps {
  selectedEvent: CivilWarEvent | null;
  selectedPersonName: string | null;
  selectedCityName: string | null;
  selectedStateName: string | null;
  isLoading: boolean;
  onClose: () => void;
  onDeepDive?: (battleId: string) => void;
  onPersonClick?: (personName: string) => void;
  onEventClick?: (eventId: number) => void;
  onSideClick?: (side: Side, personSlug?: string) => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
}

export default function DetailPanel({
  selectedEvent,
  selectedPersonName,
  selectedCityName,
  selectedStateName,
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
  // All hooks called unconditionally before any early returns
  const { data: selectedPerson, isLoading: personLoading } = usePersonByName(selectedPersonName);
  const city = useCityByName(selectedCityName);
  const state = useStateByName(selectedStateName);
  const findBattle = useBattleLookup();

  // Shared shell props
  const shellProps = { canGoBack, canGoForward, onGoBack, onGoForward, onClose };

  // Show state detail if a state is selected (prioritize over event loading)
  if (selectedStateName && state) {
    const handleBattleClick = (battleName: string) => {
      const event = findBattle(battleName);
      if (event && onEventClick) {
        onEventClick(event.id);
      }
    };

    return (
      <DetailPanelShell {...shellProps}>
        <StateDetail state={state} onBattleClick={handleBattleClick} />
      </DetailPanelShell>
    );
  }

  // Show city detail if a city is selected (prioritize over event loading)
  if (selectedCityName && city) {
    return (
      <DetailPanelShell {...shellProps}>
        <CityDetail city={city} />
      </DetailPanelShell>
    );
  }

  // Show loading only for person/event fetches (not for state/city which are sync)
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

  // Show person detail if a person is selected and found
  if (selectedPersonName && selectedPerson) {
    return (
      <DetailPanelShell {...shellProps}>
        <PersonDetail
          person={selectedPerson}
          onEventClick={onEventClick}
          onSideClick={onSideClick}
        />
      </DetailPanelShell>
    );
  }

  // Show "person not found" if person was selected but not in database
  if (selectedPersonName && !selectedPerson) {
    return (
      <DetailPanelShell {...shellProps}>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">{selectedPersonName}</h3>
            <p className="mt-2 text-sm text-gray-500">
              Biographical data not yet available for this person.
            </p>
          </div>
        </div>
      </DetailPanelShell>
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
    <DetailPanelShell {...shellProps}>
      <EventDetail event={selectedEvent} onDeepDive={onDeepDive} onPersonClick={onPersonClick} />
    </DetailPanelShell>
  );
}
