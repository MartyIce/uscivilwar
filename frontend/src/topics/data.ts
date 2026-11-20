import { expandedEvents, expandedPeople, getEventsByCommanderId } from '../data';
import { majorCities, type CityData } from '../mocks/data/cities';
import type { Person } from '../types';
import usRevolutionEvents from './usrevolution/events.json';
import usRevolutionPeople from './usrevolution/people.json';
import usRevolutionCities from './usrevolution/cities.json';

/** The event shape the mock API serves (same as the Civil War data) */
export type TopicEvent = (typeof expandedEvents)[number];

/**
 * Events for each topic, served by the mock API (src/mocks/handlers.ts).
 * To add a topic: add its events here and a config in ./index.ts.
 */
export const topicEvents: Record<string, TopicEvent[]> = {
  uscivilwar: expandedEvents,
  usrevolution: usRevolutionEvents as unknown as TopicEvent[],
};

export const DEFAULT_API_TOPIC = 'uscivilwar';

export function getTopicEvents(topicId: string | null): TopicEvent[] {
  return topicEvents[topicId ?? DEFAULT_API_TOPIC] ?? [];
}

/** People for each topic (served by the mock API and shown in the People browser) */
export const topicPeople: Record<string, Person[]> = {
  uscivilwar: expandedPeople,
  usrevolution: usRevolutionPeople as unknown as Person[],
};

export function getTopicPeople(topicId: string | null): Person[] {
  return topicPeople[topicId ?? DEFAULT_API_TOPIC] ?? [];
}

/** Cities for each topic (map markers and city detail) */
export const topicCities: Record<string, CityData[]> = {
  uscivilwar: majorCities,
  usrevolution: usRevolutionCities as unknown as CityData[],
};

export function getTopicCities(topicId: string | null): CityData[] {
  return topicCities[topicId ?? DEFAULT_API_TOPIC] ?? [];
}

/** True when a commander name from an event refers to this person (exact name or a listed alias) */
export function personMatchesName(person: Person, name: string): boolean {
  const n = name.trim().toLowerCase();
  return person.name.toLowerCase() === n || (person.aliases ?? []).some((a) => a.toLowerCase() === n);
}

/** Events a person commanded in, for any topic */
export function getPersonTopicEvents(topicId: string | null, person: Person): TopicEvent[] {
  if ((topicId ?? DEFAULT_API_TOPIC) === 'uscivilwar') {
    const ids = new Set(getEventsByCommanderId(person.id).map((e) => e.id));
    return expandedEvents.filter((e) => ids.has(e.id));
  }
  return getTopicEvents(topicId).filter((e) =>
    [...(e.commanders?.union ?? []), ...(e.commanders?.confederate ?? [])].some((c) => personMatchesName(person, c))
  );
}
