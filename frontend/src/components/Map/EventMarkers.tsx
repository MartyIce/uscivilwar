import { Marker, Popup, useMap } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import type { CivilWarEvent, EventType } from '../../types';
import { useEffect } from 'react';

interface EventMarkersProps {
  events: CivilWarEvent[];
  selectedEventId: number | null;
  onEventSelect: (eventId: number) => void;
}

// Color mapping based on result
function getMarkerColor(result: string | null): string {
  if (!result) return '#f59e0b'; // amber for unknown
  const lowerResult = result.toLowerCase();
  if (lowerResult.includes('union')) return '#3b82f6'; // blue for Union victory
  if (lowerResult.includes('confederate')) return '#6b7280'; // gray for Confederate victory
  return '#f59e0b'; // amber for inconclusive
}

// Icon mapping based on event type
function getEventIcon(type: EventType): string {
  switch (type) {
    case 'battle':
      return 'X'; // crossed swords symbol
    case 'siege':
      return 'S';
    case 'raid':
      return 'R';
    case 'skirmish':
      return 's';
    case 'surrender':
      return 'F'; // flag
    case 'treaty':
      return 'T';
    default:
      return '*';
  }
}

// Create custom marker icons
function createMarkerIcon(event: CivilWarEvent, isSelected: boolean): DivIcon {
  const color = getMarkerColor(event.result);
  const icon = getEventIcon(event.type);
  const size = isSelected ? 36 : 28;
  const fontSize = isSelected ? 16 : 12;

  return new DivIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid ${isSelected ? '#000' : '#fff'};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${fontSize}px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ${isSelected ? 'transform: scale(1.2);' : ''}
        transition: transform 0.2s;
        pointer-events: none;
      ">
        ${icon}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// Component to pan map to selected event
function MapPanner({ event }: { event: CivilWarEvent | undefined }) {
  const map = useMap();

  useEffect(() => {
    if (event?.location?.coordinates) {
      map.flyTo(
        [event.location.coordinates.lat, event.location.coordinates.lng],
        8,
        { duration: 0.5 }
      );
    }
  }, [event, map]);

  return null;
}

export default function EventMarkers({
  events,
  selectedEventId,
  onEventSelect,
}: EventMarkersProps) {
  const eventsWithCoordinates = events.filter(
    (event) => event.location?.coordinates
  );

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <>
      <MapPanner event={selectedEvent} />
      {eventsWithCoordinates.map((event) => {
        const { lat, lng } = event.location!.coordinates!;
        const isSelected = event.id === selectedEventId;

        return (
          <Marker
            key={event.id}
            position={[lat, lng]}
            icon={createMarkerIcon(event, isSelected)}
            eventHandlers={{
              click: () => onEventSelect(event.id),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-sm">{event.name}</h3>
                <p className="text-xs text-gray-600">{event.date_start}</p>
                {event.result && (
                  <p className="text-xs mt-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-white ${
                        event.result.toLowerCase().includes('union')
                          ? 'bg-blue-500'
                          : event.result.toLowerCase().includes('confederate')
                          ? 'bg-gray-500'
                          : 'bg-amber-500'
                      }`}
                    >
                      {event.result}
                    </span>
                  </p>
                )}
                <button
                  onClick={() => onEventSelect(event.id)}
                  className="mt-2 text-xs text-blue-600 hover:underline"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
