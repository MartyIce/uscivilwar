import { getCityByName, type CityData } from '../mocks/data/cities';
import { getStateByName, type StateData } from '../mocks/data/states';
import { expandedEvents } from '../mocks/data/events-expanded';
import type { CivilWarEvent } from '../types';

/**
 * Look up a city by name.
 * Currently uses mock data; swap for useQuery when real API is available.
 */
export function useCityByName(name: string | null): CityData | undefined {
  if (!name) return undefined;
  return getCityByName(name);
}

/**
 * Look up a state by name.
 * Currently uses mock data; swap for useQuery when real API is available.
 */
export function useStateByName(name: string | null): StateData | undefined {
  if (!name) return undefined;
  return getStateByName(name);
}

/**
 * Returns a function that finds a battle event by name substring match.
 * Currently uses mock expanded events; swap for API-backed search later.
 */
export function useBattleLookup(): (battleName: string) => CivilWarEvent | undefined {
  return (battleName: string) => {
    return expandedEvents.find(e =>
      e.name.toLowerCase().includes(battleName.toLowerCase()) ||
      battleName.toLowerCase().includes(
        e.name.replace('Battle of ', '').replace('Siege of ', '').toLowerCase()
      )
    );
  };
}
