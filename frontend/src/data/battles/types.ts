/**
 * Deep Battle Data Structure
 *
 * This represents detailed battle information for "zoomed in" battle exploration,
 * including hour-by-hour timeline, unit positions, and movement data.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BattleDeepData {
  id: string;
  name: string;
  description: string;
  startDate: string;  // ISO date
  endDate: string;    // ISO date
  location: {
    lat: number;
    lng: number;
    // Bounding box for the battlefield
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  result: 'union_victory' | 'confederate_victory' | 'inconclusive';
  significance: string;

  // Order of Battle
  forces: {
    union: Force;
    confederate: Force;
  };

  // Timeline snapshots - discrete moments during the battle
  timeline: TimelineSnapshot[];

  // Key locations on the battlefield
  landmarks: Landmark[];

  // Flat unit list, used by "lite" battles instead of the nested corps hierarchy
  units?: LiteUnit[];
}

export interface Force {
  commander: string;
  commanderRank: string;
  armyName: string;
  totalStrength: number;
  casualties: {
    killed: number;
    wounded: number;
    captured: number;
    missing: number;
    total: number;
  };
  // Hierarchical unit structure
  corps: Corps[];
}

export interface Corps {
  id: string;
  name: string;
  commander: string;
  strength: number;
  divisions: Division[];
}

export interface Division {
  id: string;
  name: string;
  commander: string;
  strength: number;
  brigades: Brigade[];
}

export interface Brigade {
  id: string;
  name: string;
  commander: string;
  strength: number;
  regiments: Regiment[];
}

export interface Regiment {
  id: string;
  name: string;
  state: string;
  type: 'infantry' | 'cavalry' | 'artillery';
  strength: number;
  casualties?: number;
}

export interface TimelineSnapshot {
  id: string;
  datetime: string;  // ISO datetime
  label: string;     // e.g., "July 1, 10:00 AM"
  title: string;     // e.g., "Reynolds Falls"
  description: string;

  // Unit positions at this moment
  positions: UnitPosition[];

  // Events happening at this time
  events: BattleEvent[];
}

export interface UnitPosition {
  unitId: string;        // References a corps, division, brigade, or regiment
  unitType: 'corps' | 'division' | 'brigade' | 'regiment';
  side: 'union' | 'confederate';

  // Position on the battlefield
  lat: number;
  lng: number;

  // Unit state
  status: 'advancing' | 'defending' | 'retreating' | 'routing' | 'reserve' | 'arriving';
  facing?: number;       // Degrees, 0 = North

  // Optional: movement arrow to next position
  movementTo?: {
    lat: number;
    lng: number;
  };
}

export interface BattleEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'combat' | 'movement' | 'command' | 'casualty' | 'terrain';
  importance: 'critical' | 'major' | 'minor';
  location?: {
    lat: number;
    lng: number;
  };
  relatedUnits?: string[];  // Unit IDs involved
}

export interface Landmark {
  id: string;
  name: string;
  type:
    | 'hill'
    | 'ridge'
    | 'road'
    | 'town'
    | 'farm'
    | 'creek'
    | 'woods'
    | 'field'
    | 'river'
    | 'church'
    | 'bridge'
    | 'fort'
    | 'ford'
    | 'other';
  lat: number;
  lng: number;
  description?: string;
}

// ============================================================================
// LITE FORMAT
//
// A lighter on-disk format for deep dives (src/data/battles/lite/<slug>.json).
// Instead of a regiment-level order of battle it has a flat list of the units
// that appear on the map (typically corps/division level).
// The file name is the slug of the event name, e.g. "Battle of Shiloh" -> shiloh.json.
// ============================================================================

export interface LiteUnit {
  id: string;
  name: string;
  commander: string;
  strength?: number;
  type: 'corps' | 'division' | 'brigade' | 'regiment';
}

export interface LiteForce {
  commander: string;
  commanderRank: string;
  armyName: string;
  totalStrength: number;
  casualties: Force['casualties'];
  units: LiteUnit[];
}

export interface LiteBattleData extends Omit<BattleDeepData, 'forces' | 'units'> {
  forces: { union: LiteForce; confederate: LiteForce };
  /** URLs the data was derived from */
  sources?: string[];
  /** 'unreviewed' until a human has checked positions on the map */
  review?: 'unreviewed' | 'reviewed';
}

/** Convert a lite battle into the full BattleDeepData shape used by the UI. */
export function normalizeLiteBattle(lite: LiteBattleData): BattleDeepData {
  const { union, confederate } = lite.forces;
  const toForce = ({ units: _units, ...force }: LiteForce): Force => ({ ...force, corps: [] });
  return {
    ...lite,
    forces: { union: toForce(union), confederate: toForce(confederate) },
    units: [...union.units, ...confederate.units],
  };
}
