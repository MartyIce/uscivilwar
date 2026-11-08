import type {
  CivilWarEvent,
  Person,
  Location,
  PaginatedResponse,
  BoundaryResponse,
  TimelineResponse,
  EventQueryParams,
  BoundaryQueryParams
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : '/api/v1';

// The topic whose data the API should return. Set by the app when the topic changes.
let apiTopic = 'uscivilwar';
export function setApiTopic(topicId: string): void {
  apiTopic = topicId;
}
export function getApiTopic(): string {
  return apiTopic;
}

// Generic fetch wrapper with error handling
async function fetchJson<T>(rawUrl: string, options?: RequestInit): Promise<T> {
  const url = `${rawUrl}${rawUrl.includes('?') ? '&' : '?'}topic=${encodeURIComponent(apiTopic)}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Build query string from params object
function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

// Events API
export const eventsApi = {
  getAll: async (params: EventQueryParams = {}): Promise<PaginatedResponse<CivilWarEvent>> => {
    const queryString = buildQueryString(params as Record<string, string | number | boolean | undefined>);
    return fetchJson<PaginatedResponse<CivilWarEvent>>(`${API_BASE}/events${queryString}`);
  },

  getById: async (id: number): Promise<CivilWarEvent> => {
    return fetchJson<CivilWarEvent>(`${API_BASE}/events/${id}`);
  },

  getTimeline: async (dateFrom?: string, dateTo?: string): Promise<TimelineResponse> => {
    const queryString = buildQueryString({
      date_from: dateFrom,
      date_to: dateTo,
    });
    return fetchJson<TimelineResponse>(`${API_BASE}/events/timeline${queryString}`);
  },

  getParticipants: async (eventId: number) => {
    return fetchJson<{
      union: Person[];
      confederate: Person[];
    }>(`${API_BASE}/events/${eventId}/participants`);
  },
};

// Boundaries API
export const boundariesApi = {
  get: async (params: BoundaryQueryParams): Promise<BoundaryResponse> => {
    const queryString = buildQueryString({ ...params });
    return fetchJson<BoundaryResponse>(`${API_BASE}/boundaries${queryString}`);
  },

  getTimeline: async () => {
    return fetchJson<{
      dates: Array<{ date: string; description: string }>;
    }>(`${API_BASE}/boundaries/timeline`);
  },
};

// People API
export const peopleApi = {
  getAll: async (params: {
    limit?: number;
    offset?: number;
    side?: 'union' | 'confederate';
  } = {}): Promise<PaginatedResponse<Person>> => {
    const queryString = buildQueryString(params as Record<string, string | number | boolean | undefined>);
    return fetchJson<PaginatedResponse<Person>>(`${API_BASE}/people${queryString}`);
  },

  getById: async (id: number): Promise<Person & {
    events: Array<{
      event_id: number;
      event_name: string;
      date: string;
      role: string;
      unit_commanded: string | null;
    }>;
    units_commanded: string[];
  }> => {
    return fetchJson(`${API_BASE}/people/${id}`);
  },

  getEvents: async (personId: number): Promise<PaginatedResponse<CivilWarEvent>> => {
    return fetchJson<PaginatedResponse<CivilWarEvent>>(`${API_BASE}/people/${personId}/events`);
  },
};

// Locations API
export const locationsApi = {
  getAll: async (params: {
    limit?: number;
    offset?: number;
    type?: string;
    state?: string;
  } = {}): Promise<PaginatedResponse<Location>> => {
    const queryString = buildQueryString(params as Record<string, string | number | boolean | undefined>);
    return fetchJson<PaginatedResponse<Location>>(`${API_BASE}/locations${queryString}`);
  },

  getById: async (id: number): Promise<Location> => {
    return fetchJson<Location>(`${API_BASE}/locations/${id}`);
  },

  getByBounds: async (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }): Promise<{ data: Location[]; meta: { total: number; bounds: typeof bounds } }> => {
    const queryString = buildQueryString(bounds as Record<string, number>);
    return fetchJson(`${API_BASE}/locations/bounds${queryString}`);
  },
};

// Stats API
export const statsApi = {
  getCasualties: async () => {
    return fetchJson<{
      union: {
        killed: number;
        wounded: number;
        captured: number;
        missing: number;
        total_engaged: number;
      };
      confederate: {
        killed: number;
        wounded: number;
        captured: number;
        missing: number;
        total_engaged: number;
      };
      total_events: number;
    }>(`${API_BASE}/stats/casualties`);
  },

  getTimeline: async () => {
    return fetchJson<{
      by_year: Record<string, number>;
      total: number;
    }>(`${API_BASE}/stats/timeline`);
  },
};

// Export all APIs
export const api = {
  events: eventsApi,
  boundaries: boundariesApi,
  people: peopleApi,
  locations: locationsApi,
  stats: statsApi,
};

export default api;
