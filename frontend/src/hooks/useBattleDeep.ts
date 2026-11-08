import { useState, useMemo, useCallback } from 'react';
import { gettysburgDeep, type BattleDeepData, type TimelineSnapshot } from '../data/battles/gettysburg-deep';

// Registry of deep battle data
const battleRegistry: Record<string, BattleDeepData> = {
  gettysburg: gettysburgDeep,
};

/**
 * Hook to access deep battle data and navigate through the timeline
 */
export function useBattleDeep(battleId: string) {
  const battle = battleRegistry[battleId];

  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(0);

  const currentSnapshot = useMemo(() => {
    if (!battle) return null;
    return battle.timeline[currentSnapshotIndex] || null;
  }, [battle, currentSnapshotIndex]);

  const totalSnapshots = battle?.timeline.length || 0;

  const goToSnapshot = useCallback((index: number) => {
    if (!battle) return;
    const clampedIndex = Math.max(0, Math.min(index, battle.timeline.length - 1));
    setCurrentSnapshotIndex(clampedIndex);
  }, [battle]);

  const nextSnapshot = useCallback(() => {
    goToSnapshot(currentSnapshotIndex + 1);
  }, [currentSnapshotIndex, goToSnapshot]);

  const prevSnapshot = useCallback(() => {
    goToSnapshot(currentSnapshotIndex - 1);
  }, [currentSnapshotIndex, goToSnapshot]);

  const goToTime = useCallback((datetime: string) => {
    if (!battle) return;
    const index = battle.timeline.findIndex(s => s.datetime === datetime);
    if (index >= 0) {
      setCurrentSnapshotIndex(index);
    }
  }, [battle]);

  // Get all unit positions for current snapshot
  const currentPositions = useMemo(() => {
    if (!currentSnapshot) return [];
    return currentSnapshot.positions;
  }, [currentSnapshot]);

  // Get all events for current snapshot
  const currentEvents = useMemo(() => {
    if (!currentSnapshot) return [];
    return currentSnapshot.events;
  }, [currentSnapshot]);

  // Get positions for a specific side
  const getPositionsBySide = useCallback((side: 'union' | 'confederate') => {
    return currentPositions.filter(p => p.side === side);
  }, [currentPositions]);

  // Lookup a unit by ID in the order of battle
  const findUnit = useCallback((unitId: string) => {
    if (!battle) return null;

    // Search through both forces
    for (const side of ['union', 'confederate'] as const) {
      const force = battle.forces[side];
      for (const corps of force.corps) {
        if (corps.id === unitId) return { ...corps, side, type: 'corps' };
        for (const division of corps.divisions) {
          if (division.id === unitId) return { ...division, side, type: 'division' };
          for (const brigade of division.brigades) {
            if (brigade.id === unitId) return { ...brigade, side, type: 'brigade' };
            for (const regiment of brigade.regiments) {
              if (regiment.id === unitId) return { ...regiment, side, type: 'regiment' };
            }
          }
        }
      }
    }
    return null;
  }, [battle]);

  // Get landmark by ID
  const findLandmark = useCallback((landmarkId: string) => {
    if (!battle) return null;
    return battle.landmarks.find(l => l.id === landmarkId) || null;
  }, [battle]);

  return {
    // Battle data
    battle,
    isLoaded: !!battle,

    // Timeline navigation
    currentSnapshot,
    currentSnapshotIndex,
    totalSnapshots,
    goToSnapshot,
    nextSnapshot,
    prevSnapshot,
    goToTime,

    // Current state
    currentPositions,
    currentEvents,
    getPositionsBySide,

    // Lookups
    findUnit,
    findLandmark,
  };
}

/**
 * Get list of available deep battles
 */
export function useAvailableDeepBattles() {
  return useMemo(() => {
    return Object.entries(battleRegistry).map(([id, battle]) => ({
      id,
      name: battle.name,
      startDate: battle.startDate,
      endDate: battle.endDate,
      snapshotCount: battle.timeline.length,
    }));
  }, []);
}

/**
 * Check if a battle has deep data available
 */
export function hasBattleDeepData(battleId: string): boolean {
  return battleId in battleRegistry;
}

// Map event names to deep battle IDs (add more as deep dives are added)
const eventNameToDeepId: Record<string, string> = {
  gettysburg: 'gettysburg',
};

/**
 * Return the deep-dive battle ID for an event name, or null if the event has
 * no deep dive data available.
 */
export function getDeepDiveId(eventName: string): string | null {
  const lower = eventName.toLowerCase();
  for (const [needle, id] of Object.entries(eventNameToDeepId)) {
    if (lower.includes(needle) && hasBattleDeepData(id)) return id;
  }
  return null;
}

export type { BattleDeepData, TimelineSnapshot };
