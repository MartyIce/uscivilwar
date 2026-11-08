import { stateBoundaries } from '../data';
import type { Boundary } from '../types';
import type { TopicConfig } from './types';

// The thirteen original states, using today's outlines (an approximation of
// the colonies' borders in 1775-1783; Maine was part of Massachusetts and
// Vermont was disputed, so neither is shown).
const ORIGINAL_STATES = [
  'Massachusetts', 'New Hampshire', 'Connecticut', 'Rhode Island', 'New York',
  'New Jersey', 'Pennsylvania', 'Delaware', 'Maryland', 'Virginia',
  'North Carolina', 'South Carolina', 'Georgia',
];

const boundaries: Boundary[] = stateBoundaries
  .filter((b) => ORIGINAL_STATES.includes(b.name))
  .map((b) => ({ ...b, side: null }));

export const usRevolution: TopicConfig = {
  id: 'usrevolution',
  name: 'American Revolution',
  title: 'The American Revolution, 1775-1783',
  description:
    'An interactive map exploring the American Revolutionary War (1775-1783). Navigate through time to see its battles and sieges.',
  dateRange: { from: '1775-01-01', to: '1783-12-31' },
  startDate: '1775-04-19',
  defaultEventSlug: 'battles_of_lexington_and_concord',
  mapView: { center: [39.5, -76.5], zoom: 5 },
  boundaries,
  theaters: [
    { value: 'Northern', label: 'Northern Theater' },
    { value: 'Middle', label: 'Middle Colonies' },
    { value: 'Southern', label: 'Southern Theater' },
  ],
  features: { people: false, armyTracking: false, cities: false },
};
