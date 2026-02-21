import type { ArmyMovement, ArmyWaypoint, Coordinates, Side } from '../../types';
import { expandedEvents } from './events-expanded';
import { expandedPeople } from './people-expanded';
import { getPersonEvents } from './event-participants';

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

// Commander configurations with their army names and colors
interface CommanderConfig {
  personId: number;
  name: string;
  side: Side;
  armyName: string;
  color: string;
  baseLocation: Coordinates;
}

// Build commander configs from expanded people data
const COMMANDER_CONFIGS: CommanderConfig[] = [
  // Union commanders
  {
    personId: 1,
    name: 'Ulysses S. Grant',
    side: 'union',
    armyName: 'Army of the Tennessee / Armies of the US',
    color: '#3b82f6',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  {
    personId: 2,
    name: 'William T. Sherman',
    side: 'union',
    armyName: 'Military Division of the Mississippi',
    color: '#10b981',
    baseLocation: { lat: 35.1495, lng: -90.0490 }, // Memphis
  },
  {
    personId: 3,
    name: 'George B. McClellan',
    side: 'union',
    armyName: 'Army of the Potomac',
    color: '#0ea5e9',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  {
    personId: 4,
    name: 'George G. Meade',
    side: 'union',
    armyName: 'Army of the Potomac',
    color: '#2563eb',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  {
    personId: 5,
    name: 'Philip Sheridan',
    side: 'union',
    armyName: 'Cavalry Corps / Army of the Shenandoah',
    color: '#7c3aed',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  {
    personId: 6,
    name: 'George Thomas',
    side: 'union',
    armyName: 'Army of the Cumberland',
    color: '#0284c7',
    baseLocation: { lat: 36.1627, lng: -86.7816 }, // Nashville
  },
  {
    personId: 8,
    name: 'Joseph Hooker',
    side: 'union',
    armyName: 'Army of the Potomac',
    color: '#1d4ed8',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  // Confederate commanders
  {
    personId: 20,
    name: 'Robert E. Lee',
    side: 'confederate',
    armyName: 'Army of Northern Virginia',
    color: '#6b7280',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  {
    personId: 21,
    name: "Thomas J. 'Stonewall' Jackson",
    side: 'confederate',
    armyName: "Jackson's Corps",
    color: '#78716c',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  {
    personId: 22,
    name: 'James Longstreet',
    side: 'confederate',
    armyName: 'First Corps, ANV',
    color: '#57534e',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  {
    personId: 23,
    name: 'P.G.T. Beauregard',
    side: 'confederate',
    armyName: 'Confederate Forces',
    color: '#a3a3a3',
    baseLocation: { lat: 32.7765, lng: -79.9311 }, // Charleston
  },
  {
    personId: 26,
    name: 'Braxton Bragg',
    side: 'confederate',
    armyName: 'Army of Tennessee',
    color: '#44403c',
    baseLocation: { lat: 35.0456, lng: -85.3097 }, // Chattanooga
  },
  {
    personId: 27,
    name: 'John Bell Hood',
    side: 'confederate',
    armyName: 'Army of Tennessee',
    color: '#292524',
    baseLocation: { lat: 33.7490, lng: -84.3880 }, // Atlanta
  },
  {
    personId: 28,
    name: 'Nathan Bedford Forrest',
    side: 'confederate',
    armyName: "Forrest's Cavalry Corps",
    color: '#1c1917',
    baseLocation: { lat: 35.1495, lng: -90.0490 }, // Memphis area
  },
  {
    personId: 29,
    name: 'A.P. Hill',
    side: 'confederate',
    armyName: 'Third Corps, ANV',
    color: '#4b5563',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  {
    personId: 30,
    name: 'Jubal Early',
    side: 'confederate',
    armyName: 'Army of the Valley',
    color: '#6b7280',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  // Additional Union commanders from batch2
  {
    personId: 50,
    name: 'Winfield Scott Hancock',
    side: 'union',
    armyName: 'II Corps',
    color: '#1d4ed8',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  {
    personId: 53,
    name: 'John Sedgwick',
    side: 'union',
    armyName: 'VI Corps',
    color: '#3730a3',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  {
    personId: 54,
    name: 'Oliver O. Howard',
    side: 'union',
    armyName: 'XI Corps / Army of the Tennessee',
    color: '#4338ca',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  {
    personId: 59,
    name: 'James B. McPherson',
    side: 'union',
    armyName: 'Army of the Tennessee',
    color: '#0369a1',
    baseLocation: { lat: 35.1495, lng: -90.0490 }, // Memphis
  },
  {
    personId: 70,
    name: 'George Custer',
    side: 'union',
    armyName: 'Michigan Cavalry Brigade',
    color: '#b91c1c',
    baseLocation: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  },
  // Additional Confederate commanders from batch2
  {
    personId: 80,
    name: 'Richard S. Ewell',
    side: 'confederate',
    armyName: 'Second Corps, ANV',
    color: '#525252',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  {
    personId: 82,
    name: 'John B. Gordon',
    side: 'confederate',
    armyName: 'Second Corps, ANV',
    color: '#737373',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  {
    personId: 84,
    name: 'George Pickett',
    side: 'confederate',
    armyName: "Pickett's Division",
    color: '#a3a3a3',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  {
    personId: 87,
    name: 'William J. Hardee',
    side: 'confederate',
    armyName: "Hardee's Corps",
    color: '#3f3f46',
    baseLocation: { lat: 35.0456, lng: -85.3097 }, // Chattanooga
  },
  {
    personId: 88,
    name: 'Patrick Cleburne',
    side: 'confederate',
    armyName: "Cleburne's Division",
    color: '#27272a',
    baseLocation: { lat: 35.0456, lng: -85.3097 }, // Chattanooga
  },
  {
    personId: 89,
    name: 'Wade Hampton',
    side: 'confederate',
    armyName: 'Cavalry Corps, ANV',
    color: '#44403c',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  {
    personId: 91,
    name: 'Joseph Wheeler',
    side: 'confederate',
    armyName: 'Cavalry Corps, Army of Tennessee',
    color: '#57534e',
    baseLocation: { lat: 35.0456, lng: -85.3097 }, // Chattanooga
  },
  {
    personId: 25,
    name: 'J.E.B. Stuart',
    side: 'confederate',
    armyName: 'Cavalry Corps, ANV',
    color: '#78716c',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
  // Political leaders
  {
    personId: 40,
    name: 'Abraham Lincoln',
    side: 'union',
    armyName: 'President of the United States',
    color: '#1e40af',
    baseLocation: { lat: 38.8977, lng: -77.0365 }, // White House
  },
  {
    personId: 41,
    name: 'Jefferson Davis',
    side: 'confederate',
    armyName: 'President of the Confederate States',
    color: '#374151',
    baseLocation: { lat: 37.5407, lng: -77.4360 }, // Richmond
  },
];

// Generate movements for a specific commander using the join table
function generateCommanderMovements(config: CommanderConfig): ArmyMovement | null {
  // Get all event IDs for this person from the join table
  const personEventIds = getPersonEvents(config.personId).map(ep => ep.event_id);

  if (personEventIds.length === 0) return null;

  // Get the actual events and filter for those with coordinates
  const commanderEvents = expandedEvents
    .filter(event => personEventIds.includes(event.id))
    .filter(event => event.location?.coordinates)
    .sort((a, b) => a.date_start.localeCompare(b.date_start));

  if (commanderEvents.length === 0) return null;

  const waypoints: ArmyWaypoint[] = [];

  // Add starting position before first battle
  const firstEvent = commanderEvents[0];
  if (config.baseLocation && firstEvent.location?.coordinates) {
    const startDate = addDays(firstEvent.date_start, -14); // 2 weeks before first battle
    waypoints.push({
      date: startDate,
      coordinates: config.baseLocation,
      location_name: 'Headquarters',
    });

    // Generate travel waypoints to first battle
    const travelWaypoints = generateWaypointsBetween(
      config.baseLocation,
      firstEvent.location.coordinates,
      startDate,
      firstEvent.date_start
    );
    waypoints.push(...travelWaypoints);
  }

  // Process each battle and generate movement between them
  for (let i = 0; i < commanderEvents.length; i++) {
    const event = commanderEvents[i];
    if (!event.location?.coordinates) continue;

    // Add waypoint for the battle itself
    waypoints.push({
      date: event.date_start,
      coordinates: event.location.coordinates,
      location_name: event.location.name,
      is_battle: true,
      event_id: event.id,
    });

    // If battle has an end date, stay at location
    if (event.date_end && event.date_end !== event.date_start) {
      waypoints.push({
        date: event.date_end,
        coordinates: event.location.coordinates,
        location_name: event.location.name,
        is_battle: true,
        event_id: event.id,
      });
    }

    // Generate movement to next battle
    const nextEvent = commanderEvents[i + 1];
    if (nextEvent && nextEvent.location?.coordinates) {
      const fromDate = event.date_end || event.date_start;
      const travelWaypoints = generateWaypointsBetween(
        event.location.coordinates,
        nextEvent.location.coordinates,
        fromDate,
        nextEvent.date_start
      );
      waypoints.push(...travelWaypoints);
    }
  }

  return {
    id: config.name.toLowerCase().replace(/\s+/g, '-').replace(/[.']/g, ''),
    name: config.armyName,
    commander: config.name,
    side: config.side,
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
  const config = COMMANDER_CONFIGS.find(c => c.name === commanderName);
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

// List of available commanders
export const availableCommanders = COMMANDER_CONFIGS.map(c => ({
  name: c.name,
  side: c.side,
  armyName: c.armyName,
  color: c.color,
}));
