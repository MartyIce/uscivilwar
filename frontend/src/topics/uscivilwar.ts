import { stateBoundaries } from '../data';
import type { TopicConfig } from './types';

export const usCivilWar: TopicConfig = {
  id: 'uscivilwar',
  name: 'American Civil War',
  bannerUrl: 'header-banner.jpg',
  bannerAlt: 'The American Civil War: A Nation Divided, 1861-1865',
  description:
    'An interactive map exploring the American Civil War (1861-1865). Navigate through time to see battles, movements, and key figures.',
  dateRange: { from: '1861-01-01', to: '1865-12-31' },
  startDate: '1861-04-12',
  defaultEventSlug: 'fort_sumter',
  mapView: { center: [39, -98], zoom: 4 },
  boundaries: stateBoundaries,
};
