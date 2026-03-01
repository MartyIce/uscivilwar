import { GeoJSON } from 'react-leaflet';
import type { PathOptions } from 'leaflet';
import type { Boundary, Side } from '../../types';
import { useMemo, useRef, useEffect } from 'react';

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
  // Use ref for selectedStateName so event handlers always get current value
  // without requiring GeoJSON remount (which causes visual artifacts)
  const selectedStateRef = useRef(selectedStateName);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  // Keep ref in sync with prop
  useEffect(() => {
    selectedStateRef.current = selectedStateName;
    // Update styles on all layers when selection changes
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: L.Layer) => {
        const geoLayer = layer as L.Path & { feature?: GeoJSON.Feature };
        if (geoLayer.feature?.properties?.name) {
          const isSelected = geoLayer.feature.properties.name === selectedStateName;
          geoLayer.setStyle(getBoundaryStyle(geoLayer.feature.properties.side as Side | null, isSelected));
        }
      });
    }
  }, [selectedStateName]);

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
    const isSelected = feature.properties.name === selectedStateRef.current;
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
          // Use ref to get current selected state
          const isSelected = feature.properties?.name === selectedStateRef.current;
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

  // Stable key based only on boundary data, NOT selection state
  // This prevents unmount/remount flashing when selecting states
  const dataKey = boundaries.map(b => b.id).join(',');

  return (
    <GeoJSON
      key={dataKey}
      ref={geoJsonRef}
      data={geoJsonData}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}
