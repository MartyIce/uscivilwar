import type { TrackableCommander } from '../../topics/data';

interface CommanderSelectorProps {
  commanders: TrackableCommander[];
  /** Group by Union/Confederate (Civil War); other topics show one list */
  groupBySide: boolean;
  selectedCommanders: string[];
  onToggleCommander: (commander: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommanderSelector({
  commanders,
  groupBySide,
  selectedCommanders,
  onToggleCommander,
  isOpen,
  onClose,
}: CommanderSelectorProps) {
  if (!isOpen) return null;

  const groups: { title: string | null; titleClass: string; list: TrackableCommander[] }[] = groupBySide
    ? [
        { title: 'Union', titleClass: 'text-blue-600', list: commanders.filter((c) => c.side === 'union') },
        { title: 'Confederate', titleClass: 'text-gray-600', list: commanders.filter((c) => c.side === 'confederate') },
      ]
    : [{ title: null, titleClass: '', list: commanders }];

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
        {groups.map((group, i) => (
          <div key={group.title ?? 'all'} className={i < groups.length - 1 ? 'mb-3' : ''}>
            {group.title && (
              <h4 className={`text-sm font-semibold ${group.titleClass} mb-2 sticky top-0 bg-white`}>
                {group.title}
              </h4>
            )}
            <div className="space-y-1">
              {group.list.map((commander) => (
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
        ))}
      </div>

      {/* Legend info */}
      {groupBySide && (
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
      )}
    </div>
  );
}
