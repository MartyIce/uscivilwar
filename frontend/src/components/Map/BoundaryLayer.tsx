import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import type { Boundary, Side } from '../../types';
import { useMemo } from 'react';

interface BoundaryLayerProps {
  boundaries: Boundary[];
}

// Style function for boundaries based on side
function getBoundaryStyle(side: Side | null): PathOptions {
  const baseStyle: PathOptions = {
    weight: 2,
    opacity: 0.7,
    fillOpacity: 0.2,
  };

  switch (side) {
    case 'union':
      return {
        ...baseStyle,
        color: '#3b82f6', // blue
        fillColor: '#3b82f6',
      };
    case 'confederate':
      return {
        ...baseStyle,
        color: '#6b7280', // gray
        fillColor: '#6b7280',
      };
    case 'border':
      return {
        ...baseStyle,
        color: '#f59e0b', // amber
        fillColor: '#f59e0b',
      };
    default:
      return {
        ...baseStyle,
        color: '#9ca3af', // light gray
        fillColor: '#9ca3af',
      };
  }
}

export default function BoundaryLayer({ boundaries }: BoundaryLayerProps) {
  // Create a GeoJSON FeatureCollection from boundaries
  const geoJsonData = useMemo(() => {
    const features = boundaries
      .filter((b) => b.geojson)
      .map((b) => ({
        ...b.geojson!,
        properties: {
          ...b.geojson!.properties,
          id: b.id,
          name: b.name,
          side: b.side,
        },
      }));

    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }, [boundaries]);

  // Style each feature based on its properties
  const style = (feature: GeoJSON.Feature | undefined) => {
    if (!feature?.properties) return getBoundaryStyle(null);
    return getBoundaryStyle(feature.properties.side as Side | null);
  };

  // Popup on each feature
  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    if (feature.properties?.name) {
      const side = feature.properties.side as Side | null;
      const sideLabel = side
        ? side.charAt(0).toUpperCase() + side.slice(1)
        : 'Unknown';

      layer.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold">${feature.properties.name}</h3>
          <p class="text-sm text-gray-600">Alignment: ${sideLabel}</p>
        </div>
      `);
    }
  };

  if (geoJsonData.features.length === 0) {
    return null;
  }

  // Use a stable key based on the data content, not the date
  // This prevents unmount/remount flashing when dragging the timeline
  const dataKey = boundaries.map(b => b.id).join(',');

  return (
    <GeoJSON
      key={dataKey}
      data={geoJsonData}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}
