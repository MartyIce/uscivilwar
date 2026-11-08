import { usCivilWar } from './uscivilwar';
import type { TopicConfig } from './types';

export type { TopicConfig } from './types';

/** All topics, in switcher order. The first is the default. */
export const topics: TopicConfig[] = [usCivilWar];

export const DEFAULT_TOPIC_ID = topics[0].id;

export function getTopic(id: string | undefined): TopicConfig | undefined {
  return topics.find((t) => t.id === id);
}
