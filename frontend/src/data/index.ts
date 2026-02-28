/**
 * Consolidated Civil War Data Module
 *
 * This directory contains all the normalized data for the Civil War application.
 * It replaces the previous mocks/data/ directory with a cleaner structure.
 *
 * Key changes from the old structure:
 * - People: Consolidated from 3 files into one with unique IDs
 * - Events: Now use commander_ids and location_id instead of string/inline references
 * - Movements: CommanderConfig uses person_id reference
 */

// People
export {
  allPeople,
  getPersonById,
  getPersonByName,
  findPeopleByName,
  getPeopleBySide,
  getMilitaryCommanders,
  idMigration,
  expandedPeople,
} from './people';

// Events
export {
  // New normalized types and data
  type NormalizedEvent,
  type LegacyEvent,
  allEvents,
  getEventById,
  getEventsByYear,
  getEventsByCampaign,
  getEventsByTheater,
  getEventsByCommanderId,
  // Location data
  eventLocations,
  getLocationById as getEventLocationById,
  // Name <-> ID mapping
  getCommanderIdByName,
  getCommanderNameById,
  // Backwards compatibility
  toLegacyEvent,
  getAllLegacyEvents,
  expandedEvents,
} from './events';

// Locations
export {
  locations,
  getLocationById,
  getLocationsByState,
  getLocationsByType,
} from './locations';

// Boundaries
export { stateBoundaries } from './boundaries';

// Movements
export {
  armyMovements,
  availableCommanders,
  generateAllMovements,
  getCommanderMovement,
  getArmyPositionAtDate,
  getArmyPathUpToDate,
  getCommanderTroopStrength,
  getCommanderConfigById,
} from './movements';

// Military Hierarchy (existing)
export * from './militaryHierarchy';

// Battle Deep Dives (existing)
export * from './battles/gettysburg-deep';
