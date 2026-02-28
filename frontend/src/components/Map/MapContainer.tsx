import { MapContainer as LeafletMapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import EventMarkers from './EventMarkers';
import BoundaryLayer from './BoundaryLayer';
import ArmyMovementLayer from './ArmyMovementLayer';
import CityMarkers from './CityMarkers';
import type { CivilWarEvent, Boundary, ArmyMovement } from '../../types';

interface MapContainerProps {
  events: CivilWarEvent[];
  boundaries: Boundary[];
  selectedEventId: number | null;
  onEventSelect: (eventId: number) => void;
  currentDate: string;
  armyMovements?: ArmyMovement[];
  selectedCommanders?: string[];
  showTroopStrength?: boolean;
  showCities?: boolean;
  onCityClick?: (cityName: string) => void;
  selectedCityName?: string | null;
  onStateClick?: (stateName: string) => void;
  selectedStateName?: string | null;
}

// Center of continental US
const US_CENTER: LatLngExpression = [39, -98];
const DEFAULT_ZOOM = 4;

export default function MapContainer({
  events,
  boundaries,
  selectedEventId,
  onEventSelect,
  currentDate,
  armyMovements = [],
  selectedCommanders = [],
  showTroopStrength = false,
  showCities = true,
  onCityClick,
  selectedCityName,
  onStateClick,
  selectedStateName,
}: MapContainerProps) {
  return (
    <LeafletMapContainer
      center={US_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full"
      zoomControl={false}
      minZoom={3}
      maxZoom={12}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />

      {/* Boundary layer for states */}
      <BoundaryLayer
        boundaries={boundaries}
        onStateClick={onStateClick}
        selectedStateName={selectedStateName}
      />

      {/* Army movement paths and markers */}
      {armyMovements.length > 0 && selectedCommanders.length > 0 && (
        <ArmyMovementLayer
          movements={armyMovements}
          currentDate={currentDate}
          selectedCommanders={selectedCommanders}
          showTroopStrength={showTroopStrength}
        />
      )}

      {/* City markers */}
      {showCities && onCityClick && (
        <CityMarkers
          onCityClick={onCityClick}
          selectedCityName={selectedCityName || null}
        />
      )}

      {/* Event markers */}
      <EventMarkers
        events={events}
        selectedEventId={selectedEventId}
        onEventSelect={onEventSelect}
      />
    </LeafletMapContainer>
  );
}
