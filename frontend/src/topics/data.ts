import { expandedEvents } from '../data';

/** The event shape the mock API serves (same as the Civil War data) */
export type TopicEvent = (typeof expandedEvents)[number];

/**
 * Events for each topic, served by the mock API (src/mocks/handlers.ts).
 * To add a topic: add its events here and a config in ./index.ts.
 */
export const topicEvents: Record<string, TopicEvent[]> = {
  uscivilwar: expandedEvents,
};

export const DEFAULT_API_TOPIC = 'uscivilwar';

export function getTopicEvents(topicId: string | null): TopicEvent[] {
  return topicEvents[topicId ?? DEFAULT_API_TOPIC] ?? [];
}
