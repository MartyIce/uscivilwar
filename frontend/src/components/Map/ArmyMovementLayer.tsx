import { CircleMarker, Tooltip } from 'react-leaflet';
// Polyline import preserved for when travel lines are re-enabled
// import { Polyline } from 'react-leaflet';
import type { ArmyMovement } from '../../types';
import { getArmyPathUpToDate, getArmyPositionAtDate, getCommanderTroopStrength } from '../../mocks/data/movements';

interface ArmyMovementLayerProps {
  movements: ArmyMovement[];
  currentDate: string;
  selectedCommanders: string[];
  showTroopStrength?: boolean;
}

// Calculate circle radius based on troop strength
// Range: 8 (smallest) to 22 (largest armies like Grant's 120k)
function getMarkerRadius(troopStrength: number, showTroopStrength: boolean): number {
  if (!showTroopStrength || troopStrength === 0) return 10;
  // Log scale works better for wide range of army sizes
  // 4000 troops -> ~8, 30000 -> ~13, 75000 -> ~17, 130000 -> ~20
  const minRadius = 8;
  const maxRadius = 22;
  const minTroops = 4000;
  const maxTroops = 130000;
  const normalized = Math.log(Math.max(troopStrength, minTroops)) / Math.log(maxTroops);
  return minRadius + normalized * (maxRadius - minRadius);
}

// Calculate fill opacity based on troop strength
// Range: 0.6 (smallest) to 1.0 (largest)
function getMarkerOpacity(troopStrength: number, showTroopStrength: boolean): number {
  if (!showTroopStrength || troopStrength === 0) return 1;
  const minOpacity = 0.6;
  const maxOpacity = 1.0;
  const normalized = Math.min(troopStrength / 100000, 1);
  return minOpacity + normalized * (maxOpacity - minOpacity);
}

export default function ArmyMovementLayer({
  movements,
  currentDate,
  selectedCommanders,
  showTroopStrength = false,
}: ArmyMovementLayerProps) {
  // Filter movements to only show selected commanders
  const visibleMovements = movements.filter((m) =>
    selectedCommanders.includes(m.commander)
  );

  return (
    <>
      {visibleMovements.map((movement) => {
        const path = getArmyPathUpToDate(movement, currentDate);
        const currentPosition = getArmyPositionAtDate(movement, currentDate);
        const troopStrength = getCommanderTroopStrength(movement.commander);
        const radius = getMarkerRadius(troopStrength, showTroopStrength);
        const fillOpacity = getMarkerOpacity(troopStrength, showTroopStrength);

        if (path.length < 2 && !currentPosition) return null;

        return (
          <div key={movement.id}>
            {/* Path line showing where the army has traveled - commented out for now, can re-enable later
            {path.length >= 2 && (
              <Polyline
                positions={path.map((p) => [p.lat, p.lng])}
                pathOptions={{
                  color: movement.color,
                  weight: showTroopStrength ? Math.max(2, radius / 4) : 3,
                  opacity: 0.7,
                  dashArray: movement.side === 'confederate' ? '10, 5' : undefined,
                }}
              />
            )}
            */}

            {/* Current position marker */}
            {currentPosition && (
              <CircleMarker
                center={[currentPosition.coordinates.lat, currentPosition.coordinates.lng]}
                radius={radius}
                pathOptions={{
                  color: '#fff',
                  weight: 2,
                  fillColor: movement.color,
                  fillOpacity,
                }}
              >
                <Tooltip permanent direction="top" offset={[0, -radius]}>
                  <div className="text-xs font-semibold">
                    {movement.commander}
                    {showTroopStrength && troopStrength > 0 && (
                      <span className="font-normal text-gray-500">
                        {' '}({(troopStrength / 1000).toFixed(0)}k)
                      </span>
                    )}
                    {currentPosition.location_name && (
                      <span className="font-normal text-gray-600">
                        {' '}@ {currentPosition.location_name}
                      </span>
                    )}
                  </div>
                </Tooltip>
              </CircleMarker>
            )}
          </div>
        );
      })}
    </>
  );
}
