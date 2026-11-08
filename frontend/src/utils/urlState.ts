import type { Side } from '../types';

/**
 * Shareable app state stored in the URL query string.
 *
 * - ?event=gettysburg        selected event (slug from the event name)
 * - ?person=robert_lee       selected person (slug from the person's name)
 * - ?city=Charleston         selected city (name)
 * - ?state=South%20Carolina  selected state (name)
 * - ?deep=gettysburg         deep-dive view for a battle
 * - ?org=union               org chart for a side
 * - ?date=1862-05-24         timeline date (only when nothing is selected)
 */
export interface UrlState {
  event?: string;
  person?: string;
  city?: string;
  state?: string;
  deep?: string;
  org?: Extract<Side, 'union' | 'confederate'>;
  date?: string;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseUrlState(search: string): UrlState {
  const params = new URLSearchParams(search);
  const org = params.get('org');
  const date = params.get('date');
  return {
    event: params.get('event') || undefined,
    person: params.get('person') || undefined,
    city: params.get('city') || undefined,
    state: params.get('state') || undefined,
    deep: params.get('deep') || undefined,
    org: org === 'union' || org === 'confederate' ? org : undefined,
    date: date && DATE_PATTERN.test(date) && !isNaN(Date.parse(date)) ? date : undefined,
  };
}

// Fixed key order keeps URLs stable so they can be compared as strings
const KEY_ORDER: (keyof UrlState)[] = ['deep', 'org', 'event', 'person', 'city', 'state', 'date'];

/** Build a query string ("" or "?a=b") from the state, skipping empty values. */
export function buildSearch(state: UrlState): string {
  const params = new URLSearchParams();
  for (const key of KEY_ORDER) {
    const value = state[key];
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

/** True if the state selects something (as opposed to just a date). */
export function hasSelection(state: UrlState): boolean {
  return !!(state.event || state.person || state.city || state.state || state.deep || state.org);
}
