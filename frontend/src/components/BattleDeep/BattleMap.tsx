import { useEffect } from 'react';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet';
import { DivIcon } from 'leaflet';
import type { LatLngBoundsExpression } from 'leaflet';
import type {
  BattleDeepData,
  UnitPosition,
  Landmark,
} from '../../data/battles/gettysburg-deep';

interface BattleMapProps {
  battle: BattleDeepData;
  positions: UnitPosition[];
  landmarks: Landmark[];
  selectedEventLocation?: { lat: number; lng: number } | null;
  onUnitClick?: (unitId: string) => void;
  onLandmarkClick?: (landmarkId: string) => void;
}

// Fit map to battlefield bounds
function MapBoundsFitter({ bounds }: { bounds: BattleDeepData['location']['bounds'] }) {
  const map = useMap();

  useEffect(() => {
    const leafletBounds: LatLngBoundsExpression = [
      [bounds.south, bounds.west],
      [bounds.north, bounds.east],
    ];
    map.fitBounds(leafletBounds, { padding: [20, 20] });
  }, [map, bounds]);

  return null;
}

// Fly to event location when selected
function EventLocationHighlighter({
  location,
}: {
  location: { lat: number; lng: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 15, { duration: 0.5 });
    }
  }, [map, location]);

  return null;
}

// Get color for unit based on side
function getUnitColor(side: 'union' | 'confederate'): string {
  return side === 'union' ? '#3b82f6' : '#6b7280';
}

// Get icon/style based on unit status
function getStatusIcon(status: UnitPosition['status']): {
  symbol: string;
  animation: string;
} {
  switch (status) {
    case 'advancing':
      return { symbol: '>', animation: 'animate-pulse' };
    case 'defending':
      return { symbol: '#', animation: '' };
    case 'retreating':
      return { symbol: '<', animation: '' };
    case 'routing':
      return { symbol: '!', animation: 'animate-pulse' };
    case 'reserve':
      return { symbol: 'R', animation: '' };
    case 'arriving':
      return { symbol: '+', animation: 'animate-pulse' };
    default:
      return { symbol: '*', animation: '' };
  }
}

// Get landmark icon
function getLandmarkIcon(type: Landmark['type']): string {
  switch (type) {
    case 'hill':
      return '^';
    case 'ridge':
      return '~';
    case 'road':
      return '=';
    case 'town':
      return 'T';
    case 'farm':
      return 'F';
    case 'creek':
      return '~';
    case 'woods':
      return 'W';
    case 'field':
      return 'o';
    default:
      return '*';
  }
}

// Create unit marker icon
function createUnitIcon(
  position: UnitPosition,
  isSelected: boolean
): DivIcon {
  const color = getUnitColor(position.side);
  const { symbol } = getStatusIcon(position.status);
  const size = position.unitType === 'corps' ? 32 : position.unitType === 'division' ? 28 : 24;
  const fontSize = position.unitType === 'corps' ? 14 : 12;

  return new DivIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid ${isSelected ? '#000' : '#fff'};
        border-radius: ${position.unitType === 'regiment' ? '4px' : '50%'};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${fontSize}px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
        transition: transform 0.2s;
        pointer-events: none;
      ">
        ${symbol}
      </div>
    `,
    className: 'custom-unit-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// Create landmark marker icon
function createLandmarkIcon(landmark: Landmark): DivIcon {
  const icon = getLandmarkIcon(landmark.type);

  return new DivIcon({
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background-color: #78716c;
        border: 1px solid #fff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        opacity: 0.8;
        pointer-events: none;
      ">
        ${icon}
      </div>
    `,
    className: 'custom-landmark-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

// Create selected event location marker
function createEventLocationIcon(): DivIcon {
  return new DivIcon({
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: #ef4444;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        animation: pulse 1.5s infinite;
        pointer-events: none;
      "></div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      </style>
    `,
    className: 'custom-event-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export default function BattleMap({
  battle,
  positions,
  landmarks,
  selectedEventLocation,
  onUnitClick,
  onLandmarkClick,
}: BattleMapProps) {
  const center: [number, number] = [battle.location.lat, battle.location.lng];

  // Group positions by side for legend
  const unionPositions = positions.filter((p) => p.side === 'union');
  const confederatePositions = positions.filter((p) => p.side === 'confederate');

  return (
    <div className="relative h-full w-full">
      <LeafletMapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
        minZoom={11}
        maxZoom={17}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        {/* Fit map to battlefield bounds */}
        <MapBoundsFitter bounds={battle.location.bounds} />

        {/* Highlight selected event location */}
        {selectedEventLocation && (
          <EventLocationHighlighter location={selectedEventLocation} />
        )}

        {/* Landmark markers */}
        {landmarks.map((landmark) => (
          <Marker
            key={landmark.id}
            position={[landmark.lat, landmark.lng]}
            icon={createLandmarkIcon(landmark)}
            eventHandlers={{
              click: () => onLandmarkClick?.(landmark.id),
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm">{landmark.name}</h3>
                <p className="text-xs text-gray-500 capitalize">{landmark.type}</p>
                {landmark.description && (
                  <p className="text-xs text-gray-600 mt-1">{landmark.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Movement arrows (draw before markers so they're behind) */}
        {positions
          .filter((p) => p.movementTo)
          .map((position) => {
            const color = getUnitColor(position.side);
            return (
              <Polyline
                key={`movement-${position.unitId}`}
                positions={[
                  [position.lat, position.lng],
                  [position.movementTo!.lat, position.movementTo!.lng],
                ]}
                pathOptions={{
                  color,
                  weight: 3,
                  opacity: 0.7,
                  dashArray: '10, 5',
                }}
              />
            );
          })}

        {/* Movement arrow heads */}
        {positions
          .filter((p) => p.movementTo)
          .map((position) => {
            const color = getUnitColor(position.side);
            return (
              <Marker
                key={`arrow-${position.unitId}`}
                position={[position.movementTo!.lat, position.movementTo!.lng]}
                icon={
                  new DivIcon({
                    html: `
                      <div style="
                        width: 0;
                        height: 0;
                        border-left: 6px solid transparent;
                        border-right: 6px solid transparent;
                        border-bottom: 10px solid ${color};
                        transform: rotate(${calculateArrowRotation(
                          position.lat,
                          position.lng,
                          position.movementTo!.lat,
                          position.movementTo!.lng
                        )}deg);
                        opacity: 0.7;
                      "></div>
                    `,
                    className: 'arrow-marker',
                    iconSize: [12, 10],
                    iconAnchor: [6, 5],
                  })
                }
              />
            );
          })}

        {/* Unit position markers */}
        {positions.map((position) => (
          <Marker
            key={position.unitId}
            position={[position.lat, position.lng]}
            icon={createUnitIcon(position, false)}
            eventHandlers={{
              click: () => onUnitClick?.(position.unitId),
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm">{position.unitId}</h3>
                <p className="text-xs text-gray-500">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-white mr-1 ${
                      position.side === 'union' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                  >
                    {position.side === 'union' ? 'Union' : 'Confederate'}
                  </span>
                  <span className="capitalize">{position.unitType}</span>
                </p>
                <p className="text-xs mt-1">
                  <span className="font-medium">Status:</span>{' '}
                  <span className="capitalize">{position.status}</span>
                </p>
                {position.movementTo && (
                  <p className="text-xs text-amber-600 mt-1">Moving to new position</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Selected event location marker */}
        {selectedEventLocation && (
          <Marker
            position={[selectedEventLocation.lat, selectedEventLocation.lng]}
            icon={createEventLocationIcon()}
          />
        )}
      </LeafletMapContainer>

      {/* Legend overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-md p-3 text-xs">
        <h4 className="font-semibold text-gray-700 mb-2">Forces</h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-gray-600">Union ({unionPositions.length} units)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            <span className="text-gray-600">
              Confederate ({confederatePositions.length} units)
            </span>
          </div>
        </div>

        <h4 className="font-semibold text-gray-700 mt-3 mb-2">Status</h4>
        <div className="grid grid-cols-2 gap-1 text-gray-600">
          <div className="flex items-center gap-1">
            <span className="w-3 text-center font-bold">&gt;</span>
            <span>Advancing</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 text-center font-bold">#</span>
            <span>Defending</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 text-center font-bold">&lt;</span>
            <span>Retreating</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 text-center font-bold">R</span>
            <span>Reserve</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Calculate arrow rotation based on movement direction
function calculateArrowRotation(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): number {
  const dLat = toLat - fromLat;
  const dLng = toLng - fromLng;
  const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
  // Arrow points up by default, so we need to adjust
  return angle;
}
