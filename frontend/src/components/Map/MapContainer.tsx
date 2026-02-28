import { MapContainer as LeafletMapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import EventMarkers from './EventMarkers';
import BoundaryLayer from './BoundaryLayer';
import ArmyMovementLayer from './ArmyMovementLayer';
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
      <BoundaryLayer boundaries={boundaries} />

      {/* Army movement paths and markers */}
      {armyMovements.length > 0 && selectedCommanders.length > 0 && (
        <ArmyMovementLayer
          movements={armyMovements}
          currentDate={currentDate}
          selectedCommanders={selectedCommanders}
          showTroopStrength={showTroopStrength}
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
