// Type definitions for the US Civil War Interactive Map

export type Side = 'union' | 'confederate' | 'neutral' | 'border';
export type EventType = 'battle' | 'siege' | 'raid' | 'skirmish' | 'treaty' | 'election' | 'proclamation' | 'surrender';
export type LocationType = 'city' | 'battlefield' | 'fort' | 'river' | 'landmark' | 'capital' | 'naval';
export type PersonRole = 'commander' | 'subordinate' | 'participant' | 'casualty' | 'signatory';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: number;
  name: string;
  type: LocationType;
  coordinates: Coordinates | null;
  state: string | null;
  description?: string | null;
}

export interface CasualtyStats {
  killed: number | null;
  wounded: number | null;
  captured: number | null;
  missing: number | null;
  total_engaged: number | null;
}

export interface CivilWarEvent {
  id: number;
  name: string;
  type: EventType;
  date_start: string;
  date_end: string | null;
  description: string | null;
  campaign: string | null;
  theater: string | null;
  result: string | null;
  significance: number | null;
  cwsac_id: string | null;
  wikipedia_url: string | null;
  image_url: string | null;
  location?: Location;
  casualties?: {
    union: CasualtyStats;
    confederate: CasualtyStats;
  };
  commanders?: {
    union: string[];
    confederate: string[];
  };
}

export interface TimelineEvent {
  id: number;
  name: string;
  type: EventType;
  date: string;
  coordinates: Coordinates | null;
  significance: number;
  result: string | null;
}

export interface Person {
  id: number;
  name: string;
  birth_date: string | null;
  death_date: string | null;
  side: Side | null;
  rank: string | null;
  highest_rank: string | null;
  biography: string | null;
  image_url: string | null;
  wikipedia_url: string | null;
  events?: PersonEvent[];
  units_commanded?: string[];
}

export interface PersonEvent {
  event_id: number;
  event_name: string;
  date: string;
  role: PersonRole;
  unit_commanded: string | null;
}

export interface Boundary {
  id: number;
  name: string;
  type: string;
  side: Side | null;
  geojson?: GeoJSON.Feature;
}

export interface BoundaryResponse {
  date: string;
  boundaries: Boundary[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

export interface TimelineResponse {
  events: TimelineEvent[];
  date_range: {
    start: string;
    end: string;
  };
}

export interface EventQueryParams {
  type?: EventType;
  date_from?: string;
  date_to?: string;
  side?: 'union' | 'confederate';
  theater?: string;
  campaign?: string;
  min_significance?: number;
  location_id?: number;
  limit?: number;
  offset?: number;
  include_casualties?: boolean;
  include_location?: boolean;
}

export interface BoundaryQueryParams {
  date: string;
  type?: 'state' | 'territory' | 'county';
  include_geojson?: boolean;
}

// Person-Event relationship (N-N join)
export interface EventParticipant {
  event_id: number;
  person_id: number;
  role: PersonRole;
  side: Side;
  unit_commanded?: string;
  rank_at_time?: string;
}

// Army movement types
export interface ArmyWaypoint {
  date: string;
  coordinates: Coordinates;
  location_name?: string;
  is_battle?: boolean;
  event_id?: number;
}

export interface ArmyMovement {
  id: string;
  name: string; // e.g., "Army of Northern Virginia"
  commander: string; // Primary commander name
  side: Side;
  color: string; // For visualization
  waypoints: ArmyWaypoint[];
}

export interface CommanderMovement {
  commander_name: string;
  side: Side;
  armies: string[]; // Names of armies commanded
  movements: ArmyMovement[];
}
