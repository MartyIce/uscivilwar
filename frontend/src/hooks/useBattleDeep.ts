import { useState, useEffect, useMemo, useCallback } from 'react';
import { gettysburgDeep } from '../data/battles/gettysburg-deep';
import {
  normalizeLiteBattle,
  type BattleDeepData,
  type LiteBattleData,
  type TimelineSnapshot,
} from '../data/battles/types';
import { eventNameToSlug } from '../utils/slugs';

// Full (hand-built) deep battle data, bundled with the app
const battleRegistry: Record<string, BattleDeepData> = {
  gettysburg: gettysburgDeep,
};

// Lite battles: src/data/battles/lite/<slug>.json, loaded on demand
const liteLoaders = import.meta.glob<{ default: LiteBattleData }>('../data/battles/lite/*.json');
const liteIdToPath: Record<string, string> = Object.fromEntries(
  Object.keys(liteLoaders).map((path) => [path.match(/([^/]+)\.json$/)![1], path])
);

/**
 * Hook to access deep battle data and navigate through the timeline
 */
export function useBattleDeep(battleId: string) {
  const [lazyBattle, setLazyBattle] = useState<{ id: string; data: BattleDeepData } | null>(null);

  // Lite battles are loaded on demand (each is its own chunk)
  useEffect(() => {
    const load = liteLoaders[liteIdToPath[battleId]];
    if (battleRegistry[battleId] || !load) return;
    let cancelled = false;
    load().then((mod) => {
      if (!cancelled) setLazyBattle({ id: battleId, data: normalizeLiteBattle(mod.default) });
    });
    return () => {
      cancelled = true;
    };
  }, [battleId]);

  const battle =
    battleRegistry[battleId] ?? (lazyBattle?.id === battleId ? lazyBattle.data : undefined);

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

    // Lite battles have a flat unit list
    const liteUnit = battle.units?.find((u) => u.id === unitId);
    if (liteUnit) return liteUnit;

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
  return battleId in battleRegistry || battleId in liteIdToPath;
}

/**
 * Return the deep-dive battle ID for an event name, or null if the event has
 * no deep dive data. The ID is the event's slug ("Battle of Shiloh" -> "shiloh"),
 * which is also the lite JSON file name.
 */
export function getDeepDiveId(eventName: string): string | null {
  const id = eventNameToSlug(eventName);
  return hasBattleDeepData(id) ? id : null;
}

export type { BattleDeepData, TimelineSnapshot };
