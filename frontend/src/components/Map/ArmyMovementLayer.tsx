import { Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import type { ArmyMovement } from '../../types';
import { getArmyPathUpToDate, getArmyPositionAtDate } from '../../mocks/data/movements';

interface ArmyMovementLayerProps {
  movements: ArmyMovement[];
  currentDate: string;
  selectedCommanders: string[];
}

export default function ArmyMovementLayer({
  movements,
  currentDate,
  selectedCommanders,
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

        if (path.length < 2 && !currentPosition) return null;

        return (
          <div key={movement.id}>
            {/* Path line showing where the army has traveled */}
            {path.length >= 2 && (
              <Polyline
                positions={path.map((p) => [p.lat, p.lng])}
                pathOptions={{
                  color: movement.color,
                  weight: 3,
                  opacity: 0.7,
                  dashArray: movement.side === 'confederate' ? '10, 5' : undefined,
                }}
              />
            )}

            {/* Current position marker */}
            {currentPosition && (
              <CircleMarker
                center={[currentPosition.coordinates.lat, currentPosition.coordinates.lng]}
                radius={10}
                pathOptions={{
                  color: '#fff',
                  weight: 2,
                  fillColor: movement.color,
                  fillOpacity: 1,
                }}
              >
                <Tooltip permanent direction="top" offset={[0, -10]}>
                  <div className="text-xs font-semibold">
                    {movement.commander}
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
