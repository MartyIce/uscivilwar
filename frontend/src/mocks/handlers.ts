import { http, HttpResponse } from 'msw';
import { mockEvents } from './data/events';
import { mockPeople } from './data/people';
import { mockLocations } from './data/locations';
import { mockBoundaries } from './data/boundaries';

const API_BASE = '/api/v1';

export const handlers = [
  // Events endpoints
  http.get(`${API_BASE}/events`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const type = url.searchParams.get('type');
    const dateFrom = url.searchParams.get('date_from');
    const dateTo = url.searchParams.get('date_to');
    const theater = url.searchParams.get('theater');
    const minSignificance = url.searchParams.get('min_significance');

    let events = [...mockEvents];

    // Apply filters
    if (type) {
      events = events.filter(e => e.type === type);
    }
    if (dateFrom) {
      events = events.filter(e => e.date_start >= dateFrom);
    }
    if (dateTo) {
      events = events.filter(e => e.date_start <= dateTo);
    }
    if (theater) {
      events = events.filter(e => e.theater === theater);
    }
    if (minSignificance) {
      const minSig = parseInt(minSignificance);
      events = events.filter(e => (e.significance || 0) >= minSig);
    }

    // Sort by date
    events.sort((a, b) => a.date_start.localeCompare(b.date_start));

    const total = events.length;
    const paginatedEvents = events.slice(offset, offset + limit);

    return HttpResponse.json({
      data: paginatedEvents,
      meta: {
        total,
        limit,
        offset,
        has_more: offset + limit < total
      }
    });
  }),

  http.get(`${API_BASE}/events/timeline`, ({ request }) => {
    const url = new URL(request.url);
    const dateFrom = url.searchParams.get('date_from') || '1861-01-01';
    const dateTo = url.searchParams.get('date_to') || '1865-12-31';

    let events = mockEvents.filter(e =>
      e.date_start >= dateFrom && e.date_start <= dateTo
    );

    return HttpResponse.json({
      events: events.map(e => ({
        id: e.id,
        name: e.name,
        type: e.type,
        date: e.date_start,
        coordinates: e.location?.coordinates || null,
        significance: e.significance || 3,
        result: e.result
      })),
      date_range: {
        start: dateFrom,
        end: dateTo
      }
    });
  }),

  http.get(`${API_BASE}/events/:id`, ({ params }) => {
    const event = mockEvents.find(e => e.id === parseInt(params.id as string));
    if (!event) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(event);
  }),

  http.get(`${API_BASE}/events/:id/participants`, ({ params }) => {
    const eventId = parseInt(params.id as string);
    const event = mockEvents.find(e => e.id === eventId);

    if (!event) {
      return new HttpResponse(null, { status: 404 });
    }

    // Return commanders as participants
    const participants = {
      union: event.commanders?.union.map(name => {
        const person = mockPeople.find(p => p.name.includes(name.split(' ').pop() || ''));
        return person || { name, side: 'union', role: 'commander' };
      }) || [],
      confederate: event.commanders?.confederate.map(name => {
        const person = mockPeople.find(p => p.name.includes(name.split(' ').pop() || ''));
        return person || { name, side: 'confederate', role: 'commander' };
      }) || []
    };

    return HttpResponse.json(participants);
  }),

  // Boundaries endpoints
  http.get(`${API_BASE}/boundaries`, ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || '1863-01-01';
    const type = url.searchParams.get('type');

    let boundaries = [...mockBoundaries];

    if (type) {
      boundaries = boundaries.filter(b => b.type === type);
    }

    return HttpResponse.json({
      date,
      boundaries
    });
  }),

  http.get(`${API_BASE}/boundaries/timeline`, () => {
    return HttpResponse.json({
      dates: [
        { date: '1861-04-12', description: 'Start of Civil War' },
        { date: '1861-05-20', description: 'North Carolina secedes' },
        { date: '1863-06-20', description: 'West Virginia admitted to Union' },
        { date: '1865-04-09', description: 'End of Civil War' }
      ]
    });
  }),

  // People endpoints
  http.get(`${API_BASE}/people`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const side = url.searchParams.get('side');

    let people = [...mockPeople];

    if (side) {
      people = people.filter(p => p.side === side);
    }

    const total = people.length;
    const paginatedPeople = people.slice(offset, offset + limit);

    return HttpResponse.json({
      data: paginatedPeople,
      meta: {
        total,
        limit,
        offset,
        has_more: offset + limit < total
      }
    });
  }),

  http.get(`${API_BASE}/people/:id`, ({ params }) => {
    const person = mockPeople.find(p => p.id === parseInt(params.id as string));
    if (!person) {
      return new HttpResponse(null, { status: 404 });
    }

    // Add events this person participated in
    const personEvents = mockEvents
      .filter(e =>
        e.commanders?.union.some(c => c.includes(person.name.split(' ').pop() || '')) ||
        e.commanders?.confederate.some(c => c.includes(person.name.split(' ').pop() || ''))
      )
      .map(e => ({
        event_id: e.id,
        event_name: e.name,
        date: e.date_start,
        role: 'commander' as const,
        unit_commanded: null
      }));

    return HttpResponse.json({
      ...person,
      events: personEvents,
      units_commanded: []
    });
  }),

  http.get(`${API_BASE}/people/:id/events`, ({ params }) => {
    const person = mockPeople.find(p => p.id === parseInt(params.id as string));
    if (!person) {
      return new HttpResponse(null, { status: 404 });
    }

    const events = mockEvents.filter(e =>
      e.commanders?.union.some(c => c.includes(person.name.split(' ').pop() || '')) ||
      e.commanders?.confederate.some(c => c.includes(person.name.split(' ').pop() || ''))
    );

    return HttpResponse.json({
      data: events,
      meta: {
        total: events.length,
        limit: 50,
        offset: 0,
        has_more: false
      }
    });
  }),

  // Locations endpoints
  http.get(`${API_BASE}/locations`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const type = url.searchParams.get('type');
    const state = url.searchParams.get('state');

    let locations = [...mockLocations];

    if (type) {
      locations = locations.filter(l => l.type === type);
    }
    if (state) {
      locations = locations.filter(l => l.state === state);
    }

    const total = locations.length;
    const paginatedLocations = locations.slice(offset, offset + limit);

    return HttpResponse.json({
      data: paginatedLocations,
      meta: {
        total,
        limit,
        offset,
        has_more: offset + limit < total
      }
    });
  }),

  http.get(`${API_BASE}/locations/:id`, ({ params }) => {
    const location = mockLocations.find(l => l.id === parseInt(params.id as string));
    if (!location) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(location);
  }),

  http.get(`${API_BASE}/locations/bounds`, ({ request }) => {
    const url = new URL(request.url);
    const north = parseFloat(url.searchParams.get('north') || '50');
    const south = parseFloat(url.searchParams.get('south') || '25');
    const east = parseFloat(url.searchParams.get('east') || '-65');
    const west = parseFloat(url.searchParams.get('west') || '-125');

    const locations = mockLocations.filter(l => {
      if (!l.coordinates) return false;
      return (
        l.coordinates.lat <= north &&
        l.coordinates.lat >= south &&
        l.coordinates.lng <= east &&
        l.coordinates.lng >= west
      );
    });

    return HttpResponse.json({
      data: locations,
      meta: {
        total: locations.length,
        bounds: { north, south, east, west }
      }
    });
  }),

  // Stats endpoints
  http.get(`${API_BASE}/stats/casualties`, () => {
    const unionCasualties = mockEvents.reduce((acc, e) => {
      if (e.casualties?.union) {
        acc.killed += e.casualties.union.killed || 0;
        acc.wounded += e.casualties.union.wounded || 0;
        acc.captured += e.casualties.union.captured || 0;
        acc.missing += e.casualties.union.missing || 0;
        acc.total_engaged += e.casualties.union.total_engaged || 0;
      }
      return acc;
    }, { killed: 0, wounded: 0, captured: 0, missing: 0, total_engaged: 0 });

    const confederateCasualties = mockEvents.reduce((acc, e) => {
      if (e.casualties?.confederate) {
        acc.killed += e.casualties.confederate.killed || 0;
        acc.wounded += e.casualties.confederate.wounded || 0;
        acc.captured += e.casualties.confederate.captured || 0;
        acc.missing += e.casualties.confederate.missing || 0;
        acc.total_engaged += e.casualties.confederate.total_engaged || 0;
      }
      return acc;
    }, { killed: 0, wounded: 0, captured: 0, missing: 0, total_engaged: 0 });

    return HttpResponse.json({
      union: unionCasualties,
      confederate: confederateCasualties,
      total_events: mockEvents.length
    });
  }),

  http.get(`${API_BASE}/stats/timeline`, () => {
    const eventsByYear: Record<string, number> = {};

    mockEvents.forEach(e => {
      const year = e.date_start.substring(0, 4);
      eventsByYear[year] = (eventsByYear[year] || 0) + 1;
    });

    return HttpResponse.json({
      by_year: eventsByYear,
      total: mockEvents.length
    });
  })
];
