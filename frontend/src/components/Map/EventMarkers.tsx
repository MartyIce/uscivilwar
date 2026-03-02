import { Marker, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import type { CivilWarEvent, EventType } from '../../types';
import { useEffect, useRef, useState } from 'react';

interface EventMarkersProps {
  events: CivilWarEvent[];
  selectedEvent?: CivilWarEvent | null;
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
  const size = isSelected ? 40 : 28;
  const fontSize = isSelected ? 18 : 12;

  // Pulse animation for selected markers (keyframes defined in App.css)
  const selectedStyles = isSelected
    ? `
        animation: marker-pulse 1s ease-in-out infinite;
        border: 3px solid #1d4ed8;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 4px 8px rgba(0,0,0,0.3);
      `
    : `
        border: 2px solid #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      `;

  return new DivIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${fontSize}px;
        ${selectedStyles}
        transition: all 0.3s ease;
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

// Minimum zoom level to show labels (higher = more zoomed in)
const LABEL_ZOOM_THRESHOLD = 7;

export default function EventMarkers({
  events,
  selectedEvent,
  selectedEventId,
  onEventSelect,
}: EventMarkersProps) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  // Track zoom level changes
  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });

  const eventsWithCoordinates = events.filter(
    (event) => event.location?.coordinates
  );

  // Cache DivIcon instances to avoid re-creating them on every render.
  // Leaflet checks reference equality, so new instances cause unnecessary DOM updates.
  const iconCacheRef = useRef(new Map<string, DivIcon>());

  // Prune stale cache entries when the event list changes
  useEffect(() => {
    const validIds = new Set(events.map(e => e.id));
    const cache = iconCacheRef.current;
    for (const key of cache.keys()) {
      const eventId = parseInt(key.split('-')[0]);
      if (!validIds.has(eventId)) {
        cache.delete(key);
      }
    }
  }, [events]);

  function getCachedIcon(event: CivilWarEvent, isSelected: boolean): DivIcon {
    const key = `${event.id}-${isSelected}`;
    const cache = iconCacheRef.current;
    let icon = cache.get(key);
    if (!icon) {
      icon = createMarkerIcon(event, isSelected);
      cache.set(key, icon);
    }
    return icon;
  }

  const showLabels = zoom >= LABEL_ZOOM_THRESHOLD;

  return (
    <>
      <MapPanner event={selectedEvent ?? undefined} />
      {eventsWithCoordinates.map((event) => {
        const { lat, lng } = event.location!.coordinates!;
        const isSelected = event.id === selectedEventId;
        // Show label if zoomed in enough, or if this event is selected
        const showLabel = showLabels || isSelected;

        return (
          <Marker
            key={event.id}
            position={[lat, lng]}
            icon={getCachedIcon(event, isSelected)}
            eventHandlers={{
              click: () => onEventSelect(event.id),
            }}
          >
            {showLabel && (
              <Tooltip permanent direction="top" offset={[0, -20]}>
                <div className="text-xs font-semibold">{event.name}</div>
              </Tooltip>
            )}
          </Marker>
        );
      })}
    </>
  );
}
