import type { ArmyMovement, ArmyWaypoint, Coordinates, Side } from '../types';
import { allEvents, getEventById, getLocationById } from './events';
import { getPersonById } from './people';

// Average march speed: ~12-15 miles per day for Civil War armies
const MILES_PER_DAY = 12;
const MILES_PER_DEGREE_LAT = 69;
const MILES_PER_DEGREE_LNG = 54.6; // Approximate for US latitudes

// Calculate distance between two coordinates in miles
function calculateDistance(from: Coordinates, to: Coordinates): number {
  const latDiff = Math.abs(to.lat - from.lat) * MILES_PER_DEGREE_LAT;
  const lngDiff = Math.abs(to.lng - from.lng) * MILES_PER_DEGREE_LNG;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

// Add days to a date string
function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

// Get days between two dates
function daysBetween(from: string, to: string): number {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  return Math.floor((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
}

// Interpolate position between two points
function interpolatePosition(
  from: Coordinates,
  to: Coordinates,
  progress: number // 0 to 1
): Coordinates {
  return {
    lat: from.lat + (to.lat - from.lat) * progress,
    lng: from.lng + (to.lng - from.lng) * progress,
  };
}

// Generate waypoints between two battle locations
function generateWaypointsBetween(
  fromCoords: Coordinates,
  toCoords: Coordinates,
  fromDate: string,
  toDate: string
): ArmyWaypoint[] {
  const distance = calculateDistance(fromCoords, toCoords);
  const totalDays = daysBetween(fromDate, toDate);
  const travelDays = Math.ceil(distance / MILES_PER_DAY);

  // If not enough time to travel, create fewer waypoints
  const actualTravelDays = Math.min(travelDays, Math.max(1, totalDays - 2));

  // Start travel a few days after the battle
  const restDays = Math.min(3, Math.floor((totalDays - actualTravelDays) / 2));

  const waypoints: ArmyWaypoint[] = [];

  for (let day = 1; day <= actualTravelDays; day++) {
    const progress = day / actualTravelDays;
    const coords = interpolatePosition(fromCoords, toCoords, progress);
    const date = addDays(fromDate, restDays + day);

    // Don't add waypoint if it's past the destination date
    if (date >= toDate) break;

    waypoints.push({
      date,
      coordinates: coords,
    });
  }

  return waypoints;
}

/**
 * Simplified CommanderConfig - uses person_id reference
 * Derives name and side from Person at runtime
 */
interface CommanderConfig {
  person_id: number;           // Reference to Person
  army_name: string;           // Unique to movements
  color: string;               // Visualization
  base_location: Coordinates;  // Starting position
  troop_strength: number;      // Peak approximate troop strength
}

// Commander configurations - now using person_id references
const COMMANDER_CONFIGS: CommanderConfig[] = [
  // Union commanders - troop strengths are approximate peak values
  {
    person_id: 1, // Ulysses S. Grant
    army_name: 'Army of the Tennessee / Armies of the US',
    color: '#3b82f6',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 120000,
  },
  {
    person_id: 2, // William T. Sherman
    army_name: 'Military Division of the Mississippi',
    color: '#10b981',
    base_location: { lat: 35.1495, lng: -90.0490 },
    troop_strength: 100000,
  },
  {
    person_id: 3, // George B. McClellan
    army_name: 'Army of the Potomac',
    color: '#0ea5e9',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 100000,
  },
  {
    person_id: 4, // George G. Meade
    army_name: 'Army of the Potomac',
    color: '#2563eb',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 95000,
  },
  {
    person_id: 5, // Philip Sheridan
    army_name: 'Cavalry Corps / Army of the Shenandoah',
    color: '#7c3aed',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 40000,
  },
  {
    person_id: 6, // George Thomas
    army_name: 'Army of the Cumberland',
    color: '#0284c7',
    base_location: { lat: 36.1627, lng: -86.7816 },
    troop_strength: 60000,
  },
  {
    person_id: 8, // Joseph Hooker
    army_name: 'Army of the Potomac',
    color: '#1d4ed8',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 130000,
  },
  // Confederate commanders
  {
    person_id: 20, // Robert E. Lee
    army_name: 'Army of Northern Virginia',
    color: '#6b7280',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 75000,
  },
  {
    person_id: 21, // Thomas J. 'Stonewall' Jackson
    army_name: "Jackson's Corps",
    color: '#78716c',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 25000,
  },
  {
    person_id: 22, // James Longstreet
    army_name: 'First Corps, ANV',
    color: '#57534e',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 20000,
  },
  {
    person_id: 23, // P.G.T. Beauregard
    army_name: 'Confederate Forces',
    color: '#a3a3a3',
    base_location: { lat: 32.7765, lng: -79.9311 },
    troop_strength: 35000,
  },
  {
    person_id: 26, // Braxton Bragg
    army_name: 'Army of Tennessee',
    color: '#44403c',
    base_location: { lat: 35.0456, lng: -85.3097 },
    troop_strength: 65000,
  },
  {
    person_id: 27, // John Bell Hood
    army_name: 'Army of Tennessee',
    color: '#292524',
    base_location: { lat: 33.7490, lng: -84.3880 },
    troop_strength: 40000,
  },
  {
    person_id: 28, // Nathan Bedford Forrest
    army_name: "Forrest's Cavalry Corps",
    color: '#1c1917',
    base_location: { lat: 35.1495, lng: -90.0490 },
    troop_strength: 10000,
  },
  {
    person_id: 29, // A.P. Hill
    army_name: 'Third Corps, ANV',
    color: '#4b5563',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 22000,
  },
  {
    person_id: 30, // Jubal Early
    army_name: 'Army of the Valley',
    color: '#6b7280',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 14000,
  },
  // Additional Union commanders
  {
    person_id: 50, // Winfield Scott Hancock
    army_name: 'II Corps',
    color: '#1d4ed8',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 25000,
  },
  {
    person_id: 53, // John Sedgwick
    army_name: 'VI Corps',
    color: '#3730a3',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 15000,
  },
  {
    person_id: 54, // Oliver O. Howard
    army_name: 'XI Corps / Army of the Tennessee',
    color: '#4338ca',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 13000,
  },
  {
    person_id: 59, // James B. McPherson
    army_name: 'Army of the Tennessee',
    color: '#0369a1',
    base_location: { lat: 35.1495, lng: -90.0490 },
    troop_strength: 24000,
  },
  {
    person_id: 14, // George Custer
    army_name: 'Michigan Cavalry Brigade',
    color: '#b91c1c',
    base_location: { lat: 38.9072, lng: -77.0369 },
    troop_strength: 4000,
  },
  // Additional Confederate commanders
  {
    person_id: 31, // Richard S. Ewell
    army_name: 'Second Corps, ANV',
    color: '#525252',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 20000,
  },
  {
    person_id: 81, // John B. Gordon
    army_name: 'Second Corps, ANV',
    color: '#737373',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 12000,
  },
  {
    person_id: 32, // George Pickett
    army_name: "Pickett's Division",
    color: '#a3a3a3',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 6000,
  },
  {
    person_id: 84, // William J. Hardee
    army_name: "Hardee's Corps",
    color: '#3f3f46',
    base_location: { lat: 35.0456, lng: -85.3097 },
    troop_strength: 15000,
  },
  {
    person_id: 85, // Patrick Cleburne
    army_name: "Cleburne's Division",
    color: '#27272a',
    base_location: { lat: 35.0456, lng: -85.3097 },
    troop_strength: 7000,
  },
  {
    person_id: 86, // Wade Hampton
    army_name: 'Cavalry Corps, ANV',
    color: '#44403c',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 6000,
  },
  {
    person_id: 88, // Joseph Wheeler
    army_name: 'Cavalry Corps, Army of Tennessee',
    color: '#57534e',
    base_location: { lat: 35.0456, lng: -85.3097 },
    troop_strength: 5000,
  },
  {
    person_id: 25, // J.E.B. Stuart
    army_name: 'Cavalry Corps, ANV',
    color: '#78716c',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 10000,
  },
  // Political leaders (no troop command)
  {
    person_id: 40, // Abraham Lincoln
    army_name: 'President of the United States',
    color: '#1e40af',
    base_location: { lat: 38.8977, lng: -77.0365 },
    troop_strength: 0,
  },
  {
    person_id: 41, // Jefferson Davis
    army_name: 'President of the Confederate States',
    color: '#374151',
    base_location: { lat: 37.5407, lng: -77.4360 },
    troop_strength: 0,
  },
];

/**
 * Get events for a person (using the normalized events)
 */
function getPersonEvents(personId: number): { event_id: number; date_start: string }[] {
  return allEvents
    .filter(event =>
      event.commander_ids.union.includes(personId) ||
      event.commander_ids.confederate.includes(personId)
    )
    .map(event => ({ event_id: event.id, date_start: event.date_start }));
}

// Generate movements for a specific commander using the normalized data
function generateCommanderMovements(config: CommanderConfig): ArmyMovement | null {
  const person = getPersonById(config.person_id);
  if (!person || !person.side) return null;

  // Get all event IDs for this person
  const personEvents = getPersonEvents(config.person_id);
  if (personEvents.length === 0) return null;

  // Get the actual events and filter for those with valid locations
  const commanderEvents = personEvents
    .map(pe => {
      const event = getEventById(pe.event_id);
      if (!event) return null;
      const location = getLocationById(event.location_id);
      if (!location?.coordinates) return null;
      return { event, location };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null)
    .sort((a, b) => a.event.date_start.localeCompare(b.event.date_start));

  if (commanderEvents.length === 0) return null;

  const waypoints: ArmyWaypoint[] = [];

  // Add starting position before first battle
  const firstEvent = commanderEvents[0];
  if (config.base_location && firstEvent.location?.coordinates) {
    const startDate = addDays(firstEvent.event.date_start, -14); // 2 weeks before first battle
    waypoints.push({
      date: startDate,
      coordinates: config.base_location,
      location_name: 'Headquarters',
    });

    // Generate travel waypoints to first battle
    const travelWaypoints = generateWaypointsBetween(
      config.base_location,
      firstEvent.location.coordinates,
      startDate,
      firstEvent.event.date_start
    );
    waypoints.push(...travelWaypoints);
  }

  // Process each battle and generate movement between them
  for (let i = 0; i < commanderEvents.length; i++) {
    const { event, location } = commanderEvents[i];
    if (!location?.coordinates) continue;

    // Add waypoint for the battle itself
    waypoints.push({
      date: event.date_start,
      coordinates: location.coordinates,
      location_name: location.name,
      is_battle: true,
      event_id: event.id,
    });

    // If battle has an end date, stay at location
    if (event.date_end && event.date_end !== event.date_start) {
      waypoints.push({
        date: event.date_end,
        coordinates: location.coordinates,
        location_name: location.name,
        is_battle: true,
        event_id: event.id,
      });
    }

    // Generate movement to next battle
    const nextEventData = commanderEvents[i + 1];
    if (nextEventData && nextEventData.location?.coordinates) {
      const fromDate = event.date_end || event.date_start;
      const travelWaypoints = generateWaypointsBetween(
        location.coordinates,
        nextEventData.location.coordinates,
        fromDate,
        nextEventData.event.date_start
      );
      waypoints.push(...travelWaypoints);
    }
  }

  return {
    id: person.name.toLowerCase().replace(/\s+/g, '-').replace(/[.']/g, ''),
    name: config.army_name,
    commander: person.name,
    side: person.side,
    color: config.color,
    waypoints,
  };
}

// Generate all commander movements
export function generateAllMovements(): ArmyMovement[] {
  const movements: ArmyMovement[] = [];

  for (const config of COMMANDER_CONFIGS) {
    const movement = generateCommanderMovements(config);
    if (movement && movement.waypoints.length > 0) {
      movements.push(movement);
    }
  }

  return movements;
}

// Get movement data for a specific commander
export function getCommanderMovement(commanderName: string): ArmyMovement | null {
  const config = COMMANDER_CONFIGS.find(c => {
    const person = getPersonById(c.person_id);
    return person?.name === commanderName;
  });
  if (!config) return null;
  return generateCommanderMovements(config);
}

// Get position of an army at a specific date
export function getArmyPositionAtDate(
  movement: ArmyMovement,
  date: string
): { coordinates: Coordinates; location_name?: string } | null {
  if (movement.waypoints.length === 0) return null;

  // Find waypoints before and after the date
  let before: ArmyWaypoint | null = null;
  let after: ArmyWaypoint | null = null;

  for (const waypoint of movement.waypoints) {
    if (waypoint.date <= date) {
      before = waypoint;
    } else if (!after) {
      after = waypoint;
      break;
    }
  }

  // If date is before all waypoints, return null
  if (!before) return null;

  // If date is after all waypoints or no waypoint after, return last known position
  if (!after) {
    return {
      coordinates: before.coordinates,
      location_name: before.location_name,
    };
  }

  // Interpolate between before and after
  const totalDays = daysBetween(before.date, after.date);
  const elapsedDays = daysBetween(before.date, date);
  const progress = totalDays > 0 ? elapsedDays / totalDays : 0;

  return {
    coordinates: interpolatePosition(before.coordinates, after.coordinates, progress),
    location_name: before.is_battle ? before.location_name : undefined,
  };
}

// Get path up to a specific date
export function getArmyPathUpToDate(
  movement: ArmyMovement,
  date: string
): Coordinates[] {
  const path: Coordinates[] = [];

  for (const waypoint of movement.waypoints) {
    if (waypoint.date > date) break;
    path.push(waypoint.coordinates);
  }

  // Add current interpolated position
  const currentPos = getArmyPositionAtDate(movement, date);
  if (currentPos && path.length > 0) {
    const lastPos = path[path.length - 1];
    // Only add if different from last position
    if (
      lastPos.lat !== currentPos.coordinates.lat ||
      lastPos.lng !== currentPos.coordinates.lng
    ) {
      path.push(currentPos.coordinates);
    }
  }

  return path;
}

// Pre-generated movements for export
export const mockArmyMovements: ArmyMovement[] = generateAllMovements();

// List of available commanders (derived from person data)
export const availableCommanders = COMMANDER_CONFIGS.map(c => {
  const person = getPersonById(c.person_id);
  return {
    person_id: c.person_id,
    name: person?.name ?? `Unknown (ID: ${c.person_id})`,
    side: person?.side ?? 'union' as Side,
    armyName: c.army_name,
    color: c.color,
    troopStrength: c.troop_strength,
  };
});

// Get troop strength for a commander
export function getCommanderTroopStrength(commanderName: string): number {
  const config = COMMANDER_CONFIGS.find(c => {
    const person = getPersonById(c.person_id);
    return person?.name === commanderName;
  });
  if (!config) return 0;
  return config.troop_strength;
}

// Get commander config by person ID
export function getCommanderConfigById(personId: number): CommanderConfig | undefined {
  return COMMANDER_CONFIGS.find(c => c.person_id === personId);
}
