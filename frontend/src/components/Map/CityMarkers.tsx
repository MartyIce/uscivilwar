import { Marker, Tooltip } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { majorCities, type CityData } from '../../mocks/data/cities';

interface CityMarkersProps {
  onCityClick: (cityName: string) => void;
  selectedCityName: string | null;
}

// Get marker color based on side
function getMarkerColor(side: 'union' | 'confederate' | 'border'): string {
  switch (side) {
    case 'union':
      return '#3b82f6'; // blue
    case 'confederate':
      return '#6b7280'; // gray
    case 'border':
      return '#f59e0b'; // amber
  }
}

// Create city marker icon
function createCityIcon(city: CityData, isSelected: boolean): DivIcon {
  const color = getMarkerColor(city.side);
  const size = isSelected ? 24 : 18;

  return new DivIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid ${isSelected ? '#000' : '#fff'};
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transform: rotate(45deg);
        ${isSelected ? 'animation: marker-pulse 1.5s ease-in-out 3;' : ''}
        transition: transform 0.2s;
        pointer-events: none;
      ">
        <span style="transform: rotate(-45deg);">C</span>
      </div>
    `,
    className: 'city-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function CityMarkers({ onCityClick, selectedCityName }: CityMarkersProps) {
  return (
    <>
      {majorCities.map((city) => {
        const isSelected = city.name === selectedCityName;

        return (
          <Marker
            key={city.id}
            position={[city.coordinates.lat, city.coordinates.lng]}
            icon={createCityIcon(city, isSelected)}
            eventHandlers={{
              click: () => onCityClick(city.name),
            }}
          >
            <Tooltip direction="top" offset={[0, -15]}>
              <div className="text-xs font-semibold">{city.name}</div>
              <div className="text-xs text-gray-500">{city.state || 'D.C.'}</div>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}
