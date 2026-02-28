import { useState, useMemo } from 'react';
import type { Side } from '../../types';
import {
  getHierarchy,
  filterByDate,
  type MilitaryPosition,
} from '../../data/militaryHierarchy';

interface OrgChartProps {
  side: Side;
  currentDate: string;
  onPersonClick?: (personSlug: string) => void;
  onClose: () => void;
}

interface OrgNodeProps {
  position: MilitaryPosition;
  level: number;
  onPersonClick?: (personSlug: string) => void;
  side: Side;
}

function OrgNode({ position, level, onPersonClick, side }: OrgNodeProps) {
  const [expanded, setExpanded] = useState(level < 3);
  const hasChildren = position.children && position.children.length > 0;

  const bgColor = side === 'union' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-300';
  const hoverColor = side === 'union' ? 'hover:bg-blue-100' : 'hover:bg-gray-100';
  const titleColor = side === 'union' ? 'text-blue-700' : 'text-gray-700';

  return (
    <div className="relative">
      {/* Node */}
      <div
        className={`flex items-center gap-2 p-2 rounded-lg border ${bgColor} ${
          position.personSlug ? `cursor-pointer ${hoverColor}` : ''
        }`}
        onClick={() => position.personSlug && onPersonClick?.(position.personSlug)}
      >
        {/* Expand/collapse toggle */}
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {!hasChildren && <div className="w-5" />}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-medium ${titleColor}`}>{position.title}</div>
          <div className="text-sm font-semibold text-gray-900 truncate">{position.name}</div>
        </div>

        {/* Link indicator */}
        {position.personSlug && (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
          {position.children!.map((child) => (
            <OrgNode
              key={child.id}
              position={child}
              level={level + 1}
              onPersonClick={onPersonClick}
              side={side}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgChart({ side, currentDate, onPersonClick, onClose }: OrgChartProps) {
  const hierarchy = getHierarchy(side);

  // Filter to show only positions active at current date
  const activePositions = useMemo(() => {
    return filterByDate(hierarchy.positions, currentDate);
  }, [hierarchy.positions, currentDate]);

  const sideName = side === 'union' ? 'Union' : 'Confederate';
  const headerBg = side === 'union' ? 'bg-blue-600' : 'bg-gray-700';

  // Format date for display
  const formattedDate = new Date(currentDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col m-4">
        {/* Header */}
        <div className={`${headerBg} text-white px-6 py-4 rounded-t-xl flex items-center justify-between`}>
          <div>
            <h2 className="text-xl font-bold">{sideName} Command Structure</h2>
            <p className="text-sm opacity-90">{formattedDate}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Timeline hint */}
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-100 text-sm text-amber-800">
          <span className="font-medium">Tip:</span> Use the timeline below the map to see how command changed over time.
        </div>

        {/* Tree view */}
        <div className="flex-1 overflow-y-auto p-6">
          {activePositions.length > 0 ? (
            <div className="space-y-3">
              {activePositions.map((position) => (
                <OrgNode
                  key={position.id}
                  position={position}
                  level={0}
                  onPersonClick={onPersonClick}
                  side={side}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No command structure data available for this date.</p>
              <p className="text-sm mt-2">Try adjusting the timeline to a date during the war (1861-1865).</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Click arrows to expand/collapse
            </span>
            <span className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${side === 'union' ? 'bg-blue-100 border border-blue-200' : 'bg-gray-100 border border-gray-300'}`} />
              Click names to view biography
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
