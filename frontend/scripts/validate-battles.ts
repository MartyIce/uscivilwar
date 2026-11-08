/**
 * Validate lite deep-dive battle files in src/data/battles/lite/.
 *
 * Usage: npm run validate:battles [-- <slug> ...]
 *
 * Errors fail the run (exit 1). Warnings flag things worth a human look.
 * This catches malformed data and impossible geography; it cannot prove that
 * unit positions are historically right, so a spot-check on the map is still needed.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expandedEvents as mockEvents } from '../src/mocks/data/events-expanded';
import { eventNameToSlug } from '../src/utils/slugs';
import type { LiteBattleData } from '../src/data/battles/types';

const LITE_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/data/battles/lite');

const RESULTS = ['union_victory', 'confederate_victory', 'inconclusive'];
const UNIT_TYPES = ['corps', 'division', 'brigade', 'regiment'];
const STATUSES = ['advancing', 'defending', 'retreating', 'routing', 'reserve', 'arriving'];
const EVENT_TYPES = ['combat', 'movement', 'command', 'casualty', 'terrain'];
const IMPORTANCES = ['critical', 'major', 'minor'];
const LANDMARK_TYPES = [
  'hill', 'ridge', 'road', 'town', 'farm', 'creek', 'woods', 'field',
  'river', 'church', 'bridge', 'fort', 'ford', 'other',
];

const MAX_CENTER_DISTANCE_KM = 25; // battle center vs. the app's event location
const MAX_BOUNDS_SPAN_DEG = 0.6; // ~65 km
const BOUNDS_MARGIN_DEG = 0.01; // ~1 km slack for points on the edge

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isStr = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

function validate(slug: string, data: LiteBattleData): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const err = (m: string) => errors.push(m);
  const warn = (m: string) => warnings.push(m);

  // --- Identity
  if (data.id !== slug) err(`id "${data.id}" must match the file name "${slug}"`);
  for (const k of ['name', 'description', 'significance'] as const) {
    if (!isStr(data[k])) err(`${k} is required`);
  }
  const start = Date.parse(data.startDate);
  const end = Date.parse(data.endDate);
  if (isNaN(start) || isNaN(end)) err('startDate/endDate must be ISO dates');
  else if (end < start) err('endDate is before startDate');
  if (!RESULTS.includes(data.result)) err(`result must be one of ${RESULTS.join(', ')}`);

  const matchingEvent = mockEvents.find((e) => eventNameToSlug(e.name) === slug);
  if (!matchingEvent) warn(`no event in the app has the slug "${slug}", so the deep dive will not be linked`);

  if (!data.sources?.length) warn('no sources listed');
  if (data.review !== 'reviewed' && data.review !== 'unreviewed') warn('review should be "unreviewed" or "reviewed"');

  // --- Location and bounds
  const loc = data.location;
  const b = loc?.bounds;
  let boundsOk = false;
  if (!loc || !isNum(loc.lat) || !isNum(loc.lng) || !b || ![b.north, b.south, b.east, b.west].every(isNum)) {
    err('location.lat/lng and location.bounds (north/south/east/west) must be numbers');
  } else if (b.north <= b.south || b.east <= b.west) {
    err('bounds are inverted (need north > south and east > west)');
  } else {
    boundsOk = true;
    if (b.north - b.south > MAX_BOUNDS_SPAN_DEG || b.east - b.west > MAX_BOUNDS_SPAN_DEG) {
      err(`bounds span more than ${MAX_BOUNDS_SPAN_DEG} degrees; battlefield bounds should be tight`);
    }
    if (loc.lat > b.north || loc.lat < b.south || loc.lng > b.east || loc.lng < b.west) {
      err('location.lat/lng is outside its own bounds');
    }
    const eventCoords = matchingEvent?.location?.coordinates;
    if (eventCoords) {
      const km = distanceKm(loc.lat, loc.lng, eventCoords.lat, eventCoords.lng);
      if (km > MAX_CENTER_DISTANCE_KM) {
        err(`battle center is ${km.toFixed(0)} km from the app's event location (${matchingEvent!.location!.name}); max ${MAX_CENTER_DISTANCE_KM} km`);
      }
    }
  }
  const inBounds = (lat: unknown, lng: unknown): boolean =>
    !boundsOk ||
    (isNum(lat) && isNum(lng) &&
      lat <= b.north + BOUNDS_MARGIN_DEG && lat >= b.south - BOUNDS_MARGIN_DEG &&
      lng <= b.east + BOUNDS_MARGIN_DEG && lng >= b.west - BOUNDS_MARGIN_DEG);

  // --- Forces and units
  const unitIds = new Map<string, 'union' | 'confederate'>();
  for (const side of ['union', 'confederate'] as const) {
    const f = data.forces?.[side];
    if (!f) { err(`forces.${side} is missing`); continue; }
    for (const k of ['commander', 'commanderRank', 'armyName'] as const) {
      if (!isStr(f[k])) err(`forces.${side}.${k} is required`);
    }
    if (!isNum(f.totalStrength) || f.totalStrength <= 0) err(`forces.${side}.totalStrength must be a positive number`);
    const c = f.casualties;
    if (!c || ![c.killed, c.wounded, c.captured, c.missing, c.total].every(isNum)) {
      err(`forces.${side}.casualties needs numeric killed/wounded/captured/missing/total`);
    } else if (c.killed + c.wounded + c.captured + c.missing !== c.total) {
      warn(`forces.${side}.casualties.total (${c.total}) is not the sum of its parts (${c.killed + c.wounded + c.captured + c.missing})`);
    }
    if (!Array.isArray(f.units) || f.units.length === 0) { err(`forces.${side}.units must be a non-empty list`); continue; }
    if (f.units.length < 4) warn(`forces.${side} has only ${f.units.length} units`);
    for (const u of f.units) {
      if (!isStr(u.id) || !isStr(u.name) || !isStr(u.commander)) err(`forces.${side}: unit needs id, name and commander (${JSON.stringify(u.id)})`);
      if (!UNIT_TYPES.includes(u.type)) err(`unit "${u.id}": type must be one of ${UNIT_TYPES.join(', ')}`);
      if (unitIds.has(u.id)) err(`duplicate unit id "${u.id}"`);
      unitIds.set(u.id, side);
    }
  }

  // --- Landmarks
  if (!Array.isArray(data.landmarks) || data.landmarks.length === 0) err('landmarks must be a non-empty list');
  else {
    if (data.landmarks.length < 8) warn(`only ${data.landmarks.length} landmarks (aim for 8+)`);
    const seen = new Set<string>();
    for (const l of data.landmarks) {
      if (!isStr(l.id) || !isStr(l.name)) err(`landmark needs id and name (${JSON.stringify(l.id)})`);
      if (seen.has(l.id)) err(`duplicate landmark id "${l.id}"`);
      seen.add(l.id);
      if (!LANDMARK_TYPES.includes(l.type)) err(`landmark "${l.id}": type "${l.type}" is not allowed`);
      if (!isNum(l.lat) || !isNum(l.lng)) err(`landmark "${l.id}": lat/lng must be numbers`);
      else if (!inBounds(l.lat, l.lng)) err(`landmark "${l.id}" is outside the battlefield bounds`);
    }
  }

  // --- Timeline
  if (!Array.isArray(data.timeline) || data.timeline.length === 0) { err('timeline must be a non-empty list'); return { errors, warnings }; }
  if (data.timeline.length < 6) warn(`only ${data.timeline.length} timeline snapshots (aim for 6+)`);
  const snapIds = new Set<string>();
  let prev = -Infinity;
  const eventIds = new Set<string>();
  for (const s of data.timeline) {
    const where = `snapshot "${s.id}"`;
    if (!isStr(s.id) || !isStr(s.label) || !isStr(s.title) || !isStr(s.description)) err(`${where}: id, label, title and description are required`);
    if (snapIds.has(s.id)) err(`duplicate snapshot id "${s.id}"`);
    snapIds.add(s.id);
    const t = Date.parse(s.datetime);
    if (isNaN(t)) err(`${where}: datetime is not a valid ISO datetime`);
    else {
      if (t < prev) err(`${where}: datetime is earlier than the previous snapshot`);
      prev = t;
      if (!isNaN(start) && !isNaN(end) && (t < start || t > end + 24 * 3600 * 1000 - 1)) {
        err(`${where}: datetime ${s.datetime} is outside ${data.startDate}..${data.endDate}`);
      }
    }
    if (!Array.isArray(s.positions) || s.positions.length === 0) err(`${where}: needs at least one position`);
    for (const p of s.positions ?? []) {
      if (!unitIds.has(p.unitId)) err(`${where}: position references unknown unit "${p.unitId}"`);
      else if (unitIds.get(p.unitId) !== p.side) err(`${where}: unit "${p.unitId}" is on the ${unitIds.get(p.unitId)} side but the position says ${p.side}`);
      if (!UNIT_TYPES.includes(p.unitType)) err(`${where}: unitType "${p.unitType}" is not allowed`);
      if (!STATUSES.includes(p.status)) err(`${where}: status "${p.status}" is not allowed`);
      if (!isNum(p.lat) || !isNum(p.lng)) err(`${where}: position of "${p.unitId}" needs numeric lat/lng`);
      else if (!inBounds(p.lat, p.lng)) err(`${where}: position of "${p.unitId}" is outside the battlefield bounds`);
      if (p.movementTo && !inBounds(p.movementTo.lat, p.movementTo.lng)) err(`${where}: movementTo of "${p.unitId}" is outside the battlefield bounds`);
    }
    const posKeys = (s.positions ?? []).map((p) => p.unitId);
    if (new Set(posKeys).size !== posKeys.length) err(`${where}: a unit appears more than once`);
    for (const e of s.events ?? []) {
      if (!isStr(e.id) || !isStr(e.title) || !isStr(e.description)) err(`${where}: event needs id, title and description`);
      if (eventIds.has(e.id)) err(`duplicate event id "${e.id}"`);
      eventIds.add(e.id);
      if (!EVENT_TYPES.includes(e.type)) err(`event "${e.id}": type "${e.type}" is not allowed`);
      if (!IMPORTANCES.includes(e.importance)) err(`event "${e.id}": importance "${e.importance}" is not allowed`);
      if (e.location && !inBounds(e.location.lat, e.location.lng)) err(`event "${e.id}" is outside the battlefield bounds`);
      for (const u of e.relatedUnits ?? []) if (!unitIds.has(u)) err(`event "${e.id}": relatedUnits has unknown unit "${u}"`);
    }
  }
  return { errors, warnings };
}

// --- CLI
const requested = process.argv.slice(2);
const slugs = (requested.length ? requested : readdirSync(LITE_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')));
let failed = false;
for (const slug of slugs) {
  let result: { errors: string[]; warnings: string[] };
  try {
    result = validate(slug, JSON.parse(readFileSync(join(LITE_DIR, `${slug}.json`), 'utf8')));
  } catch (e) {
    result = { errors: [`could not read/parse ${slug}.json: ${(e as Error).message}`], warnings: [] };
  }
  const status = result.errors.length ? 'FAIL' : 'ok';
  console.log(`${status.padEnd(4)} ${slug}  (${result.errors.length} errors, ${result.warnings.length} warnings)`);
  for (const m of result.errors) console.log(`  error:   ${m}`);
  for (const m of result.warnings) console.log(`  warning: ${m}`);
  if (result.errors.length) failed = true;
}
if (!slugs.length) console.log('no lite battle files found');
process.exit(failed ? 1 : 0);
