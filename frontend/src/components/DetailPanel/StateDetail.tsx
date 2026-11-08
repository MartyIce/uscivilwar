import type { StateData } from '../../mocks/data/states';
import { parseLocalDate } from '../../utils/dates';

interface StateDetailProps {
  state: StateData;
  onBattleClick?: (battleName: string) => void;
}

function getSideBadgeStyle(side: 'union' | 'confederate' | 'border'): string {
  switch (side) {
    case 'union':
      return 'bg-blue-100 text-blue-800';
    case 'confederate':
      return 'bg-gray-200 text-gray-800';
    case 'border':
      return 'bg-amber-100 text-amber-800';
  }
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'N/A';
  const date = parseLocalDate(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function StateDetail({ state, onBattleClick }: StateDetailProps) {
  const totalTroops = state.troopsProvided.union + state.troopsProvided.confederate;

  return (
    <div className="relative">
      {/* State header with color */}
      <div className={`h-32 ${
        state.side === 'union' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
        state.side === 'confederate' ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
        'bg-gradient-to-br from-amber-400 to-amber-600'
      } flex items-center justify-center`}>
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">{state.name}</h2>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded ${getSideBadgeStyle(state.side)}`}>
            {state.side === 'union' ? 'Union State' : state.side === 'confederate' ? 'Confederate State' : 'Border State'}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-800">
            Pop. {formatNumber(state.population1860)} (1860)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{state.description}</p>

        {/* Key dates for Confederate/Border states */}
        {(state.secessionDate || state.side === 'border') && (
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Dates</h3>
            <div className="text-sm text-gray-600 space-y-1">
              {state.secessionDate && (
                <p><span className="font-medium">Seceded:</span> {formatDate(state.secessionDate)}</p>
              )}
              {state.readmissionDate && (
                <p><span className="font-medium">Readmitted:</span> {formatDate(state.readmissionDate)}</p>
              )}
              <p><span className="font-medium">Capital:</span> {state.capital}</p>
            </div>
          </div>
        )}

        {/* Political leadership */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Wartime Governors</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">1861:</span> {state.governor1861}</p>
            <p><span className="font-medium">1865:</span> {state.governor1865}</p>
          </div>
        </div>

        {/* Military contribution */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Military Contribution</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total troops:</span>
              <span className="font-medium">{formatNumber(totalTroops)}</span>
            </div>
            {state.troopsProvided.union > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-600">Union troops:</span>
                <span className="font-medium text-blue-700">{formatNumber(state.troopsProvided.union)}</span>
              </div>
            )}
            {state.troopsProvided.confederate > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Confederate troops:</span>
                <span className="font-medium text-gray-700">{formatNumber(state.troopsProvided.confederate)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Casualties */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Casualties</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-red-50 rounded">
              <div className="text-lg font-bold text-red-700">{formatNumber(state.casualties.killed)}</div>
              <div className="text-xs text-red-600">Killed</div>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <div className="text-lg font-bold text-orange-700">{formatNumber(state.casualties.wounded)}</div>
              <div className="text-xs text-orange-600">Wounded</div>
            </div>
            <div className="p-2 bg-gray-100 rounded">
              <div className="text-lg font-bold text-gray-700">{formatNumber(state.casualties.total)}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </div>
        </div>

        {/* Major battles */}
        {state.majorBattles.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Major Battles in State</h3>
            <div className="flex flex-wrap gap-1">
              {state.majorBattles.map((battle, index) => (
                <button
                  key={index}
                  onClick={() => onBattleClick?.(battle)}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  {battle}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
