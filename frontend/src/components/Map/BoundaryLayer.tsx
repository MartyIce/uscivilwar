import { GeoJSON } from 'react-leaflet';
import type { PathOptions } from 'leaflet';
import type { Boundary, Side } from '../../types';
import { useMemo } from 'react';

interface BoundaryLayerProps {
  boundaries: Boundary[];
  onStateClick?: (stateName: string) => void;
  selectedStateName?: string | null;
}

// Style function for boundaries based on side and selection
function getBoundaryStyle(side: Side | null, isSelected: boolean): PathOptions {
  const baseStyle: PathOptions = {
    weight: isSelected ? 4 : 2,
    opacity: isSelected ? 1 : 0.7,
    fillOpacity: isSelected ? 0.4 : 0.2,
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

export default function BoundaryLayer({ boundaries, onStateClick, selectedStateName }: BoundaryLayerProps) {
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

  // Style each feature based on its properties and selection state
  const style = (feature: GeoJSON.Feature | undefined) => {
    if (!feature?.properties) return getBoundaryStyle(null, false);
    const isSelected = feature.properties.name === selectedStateName;
    return getBoundaryStyle(feature.properties.side as Side | null, isSelected);
  };

  // Click handler and hover effects on each feature
  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    if (feature.properties?.name) {
      // Add hover effect
      layer.on({
        mouseover: (e) => {
          const target = e.target;
          target.setStyle({
            weight: 3,
            fillOpacity: 0.35,
          });
        },
        mouseout: (e) => {
          const target = e.target;
          const isSelected = feature.properties?.name === selectedStateName;
          target.setStyle(getBoundaryStyle(feature.properties?.side as Side | null, isSelected));
        },
        click: () => {
          if (onStateClick && feature.properties?.name) {
            onStateClick(feature.properties.name);
          }
        },
      });

      // Add tooltip instead of popup
      (layer as L.Path).bindTooltip(feature.properties.name, {
        permanent: false,
        direction: 'center',
        className: 'state-tooltip',
      });
    }
  };

  if (geoJsonData.features.length === 0) {
    return null;
  }

  // Use a stable key based on the data content and selection
  // This prevents unmount/remount flashing when dragging the timeline
  const dataKey = `${boundaries.map(b => b.id).join(',')}-${selectedStateName || ''}`;

  return (
    <GeoJSON
      key={dataKey}
      data={geoJsonData}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}
