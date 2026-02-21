import { availableCommanders } from '../../mocks/data/movements';

interface CommanderSelectorProps {
  selectedCommanders: string[];
  onToggleCommander: (commander: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommanderSelector({
  selectedCommanders,
  onToggleCommander,
  isOpen,
  onClose,
}: CommanderSelectorProps) {
  if (!isOpen) return null;

  const unionCommanders = availableCommanders.filter((c) => c.side === 'union');
  const confederateCommanders = availableCommanders.filter((c) => c.side === 'confederate');

  return (
    <div className="absolute top-20 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 w-72 max-h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <h3 className="font-bold text-gray-800">Track Army Movements</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          &times;
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-3 flex-shrink-0">
        Select commanders to visualize their army movements on the map.
        Paths are estimated based on battle locations and dates.
      </p>

      {/* Scrollable commander list */}
      <div className="overflow-y-auto flex-1 min-h-0">
        {/* Union Commanders */}
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-blue-600 mb-2 sticky top-0 bg-white">Union</h4>
          <div className="space-y-1">
            {unionCommanders.map((commander) => (
              <label
                key={commander.name}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedCommanders.includes(commander.name)}
                  onChange={() => onToggleCommander(commander.name)}
                  className="rounded border-gray-300"
                />
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: commander.color }}
                />
                <span className="text-sm text-gray-700">{commander.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Confederate Commanders */}
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-2 sticky top-0 bg-white">Confederate</h4>
          <div className="space-y-1">
            {confederateCommanders.map((commander) => (
              <label
                key={commander.name}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedCommanders.includes(commander.name)}
                  onChange={() => onToggleCommander(commander.name)}
                  className="rounded border-gray-300"
                />
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 border border-gray-300"
                  style={{ backgroundColor: commander.color }}
                />
                <span className="text-sm text-gray-700">{commander.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Legend info */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex-shrink-0">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-500" />
            <span>Union path (solid)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gray-500" style={{ borderBottom: '2px dashed' }} />
            <span>Confederate path (dashed)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
