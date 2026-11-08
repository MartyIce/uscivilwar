import type { LatLngExpression } from 'leaflet';
import type { Boundary } from '../types';

/**
 * A "topic" is one timeline the app can show: a war, or any other sequence of
 * events. Each topic has its own URL (/<id>) and configures everything that
 * used to be hardcoded for the Civil War.
 */
export interface TopicConfig {
  /** URL segment, e.g. "uscivilwar" -> /uscivilwar */
  id: string;
  /** Short display name for the switcher */
  name: string;
  /** Header banner image, relative to the app's base URL. Omit for a text header. */
  bannerUrl?: string;
  /** Title shown in the header (and as the banner's alt text) */
  title: string;
  /** Text for the info dialog */
  description: string;
  /** Full time span of the topic; the timeline and date filters use this */
  dateRange: { from: string; to: string };
  /** Date the timeline opens on (inside dateRange) */
  startDate: string;
  /** Slug of the event to select on first load (see utils/slugs) */
  defaultEventSlug?: string;
  /** Initial map view */
  mapView: { center: LatLngExpression; zoom: number };
  /**
   * Region boundaries as they were during this topic's time span, wherever in
   * the world that is. (Static for now; per-topic datasets can load lazily.)
   */
  boundaries: Boundary[];
  /** Theaters for the filter sidebar (matches the `theater` field of events) */
  theaters: { value: string; label: string }[];
  /** Which optional parts of the UI have data for this topic */
  features: {
    /** People browser and person details */
    people: boolean;
    /** "Track Armies" and troop strength */
    armyTracking: boolean;
    /** Major cities layer */
    cities: boolean;
  };
}
