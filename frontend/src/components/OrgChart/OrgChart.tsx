import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Side } from '../../types';
import {
  getHierarchy,
  filterByDate,
  findPersonFirstAppearance,
  type MilitaryPosition,
} from '../../data/militaryHierarchy';
import { parseLocalDate } from '../../utils/dates';

interface OrgChartProps {
  side: Side;
  initialDate: string;
  highlightedPersonSlug?: string;
  onPersonClick?: (personSlug: string) => void;
  onDateChange?: (date: string) => void;
  onClose: () => void;
}

interface OrgNodeProps {
  position: MilitaryPosition;
  level: number;
  onPersonClick?: (personSlug: string) => void;
  side: Side;
  highlightedPersonSlug?: string;
}

// Civil War date range
const WAR_START = new Date('1861-04-12').getTime();
const WAR_END = new Date('1865-04-09').getTime();

function OrgNode({ position, level, onPersonClick, side, highlightedPersonSlug }: OrgNodeProps) {
  const isHighlighted = position.personSlug === highlightedPersonSlug;

  // Check if any descendant contains the highlighted person (to auto-expand)
  const containsHighlighted = useMemo(() => {
    if (!highlightedPersonSlug) return false;
    function check(pos: MilitaryPosition): boolean {
      if (pos.personSlug === highlightedPersonSlug) return true;
      return pos.children?.some(check) ?? false;
    }
    return check(position);
  }, [position, highlightedPersonSlug]);

  const [expanded, setExpanded] = useState(level < 3 || containsHighlighted);
  const hasChildren = position.children && position.children.length > 0;

  // Auto-expand when highlighted person is a descendant
  useEffect(() => {
    if (containsHighlighted && !expanded) {
      setExpanded(true);
    }
  }, [containsHighlighted, expanded]);

  const bgColor = isHighlighted
    ? side === 'union' ? 'bg-blue-200 border-blue-400 ring-2 ring-blue-400' : 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-400'
    : side === 'union' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-300';
  const hoverColor = side === 'union' ? 'hover:bg-blue-100' : 'hover:bg-gray-100';
  const titleColor = side === 'union' ? 'text-blue-700' : 'text-gray-700';

  return (
    <div className="relative">
      {/* Node */}
      <div
        id={isHighlighted ? 'highlighted-person' : undefined}
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
              highlightedPersonSlug={highlightedPersonSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgChart({ side, initialDate, highlightedPersonSlug, onPersonClick, onDateChange, onClose }: OrgChartProps) {
  const hierarchy = getHierarchy(side);

  // Find the date to start at - if highlighting a person, jump to their first appearance
  const startDate = useMemo(() => {
    if (highlightedPersonSlug) {
      const firstAppearance = findPersonFirstAppearance(hierarchy.positions, highlightedPersonSlug);
      if (firstAppearance) {
        return firstAppearance;
      }
    }
    return initialDate;
  }, [highlightedPersonSlug, hierarchy.positions, initialDate]);

  // Local date state for the org chart timeline
  const [currentDate, setCurrentDate] = useState(startDate);

  // Scroll to highlighted person after render
  useEffect(() => {
    if (highlightedPersonSlug) {
      // Give time for the tree to expand and render
      const timer = setTimeout(() => {
        const el = document.getElementById('highlighted-person');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [highlightedPersonSlug, currentDate]);

  // Notify parent of date changes
  const handleDateChange = useCallback((date: string) => {
    setCurrentDate(date);
    onDateChange?.(date);
  }, [onDateChange]);

  // Filter to show only positions active at current date
  const activePositions = useMemo(() => {
    return filterByDate(hierarchy.positions, currentDate);
  }, [hierarchy.positions, currentDate]);

  const sideName = side === 'union' ? 'Union' : 'Confederate';
  const headerBg = side === 'union' ? 'bg-blue-600' : 'bg-gray-700';
  const sliderColor = side === 'union' ? 'accent-blue-600' : 'accent-gray-600';

  // Format date for display
  const formattedDate = parseLocalDate(currentDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Convert date to slider value (0-100)
  const dateToSlider = useCallback((dateStr: string) => {
    const date = new Date(dateStr).getTime();
    return ((date - WAR_START) / (WAR_END - WAR_START)) * 100;
  }, []);

  // Convert slider value to date
  const sliderToDate = useCallback((value: number) => {
    const timestamp = WAR_START + (value / 100) * (WAR_END - WAR_START);
    return new Date(timestamp).toISOString().split('T')[0];
  }, []);

  const sliderValue = dateToSlider(currentDate);

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
                  highlightedPersonSlug={highlightedPersonSlug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No command structure data available for this date.</p>
              <p className="text-sm mt-2">Try adjusting the timeline to a date during the war.</p>
            </div>
          )}
        </div>

        {/* Timeline slider */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 whitespace-nowrap">Apr 1861</span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => handleDateChange(sliderToDate(parseFloat(e.target.value)))}
                className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${sliderColor}`}
              />
              {/* Year markers */}
              <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[10px] text-gray-400">
                <span>1861</span>
                <span>1862</span>
                <span>1863</span>
                <span>1864</span>
                <span>1865</span>
              </div>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">Apr 1865</span>
          </div>
        </div>

        {/* Legend */}
        <div className="px-6 py-3 bg-gray-100 border-t border-gray-200 rounded-b-xl">
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
