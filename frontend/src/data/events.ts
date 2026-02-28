import type { Location } from '../types';
import { getPersonById } from './people';

/**
 * Normalized Civil War event with ID-based references
 */
export interface NormalizedEvent {
  id: number;
  name: string;
  type: 'battle' | 'siege' | 'raid' | 'surrender' | 'proclamation';
  date_start: string;
  date_end: string;
  description: string;
  campaign: string | null;
  theater: 'Eastern' | 'Western';
  result: string | null;
  significance: number;
  cwsac_id: string | null;
  wikipedia_url: string | null;
  image_url: string | null;
  location_id: number;
  commander_ids: {
    union: number[];
    confederate: number[];
  };
}

/**
 * Legacy event type with inline location and string commanders
 * Used for backwards compatibility during migration
 */
export interface LegacyEvent {
  id: number;
  name: string;
  type: 'battle' | 'siege' | 'raid' | 'surrender' | 'proclamation';
  date_start: string;
  date_end: string;
  description: string;
  campaign: string | null;
  theater: 'Eastern' | 'Western';
  result: string | null;
  significance: number;
  cwsac_id: string | null;
  wikipedia_url: string | null;
  image_url: string | null;
  location: {
    id: number;
    name: string;
    type: string;
    coordinates: { lat: number; lng: number };
    state: string | null;
  };
  commanders: {
    union: string[];
    confederate: string[];
  };
  casualties?: {
    union: {
      killed: number | null;
      wounded: number | null;
      captured: number | null;
      missing: number | null;
      total_engaged: number | null;
    };
    confederate: {
      killed: number | null;
      wounded: number | null;
      captured: number | null;
      missing: number | null;
      total_engaged: number | null;
    };
  };
}

// Commander name to ID mapping
// These IDs match the consolidated people.ts
const COMMANDER_NAME_TO_ID: Record<string, number> = {
  // Union High Command (1-14)
  "Ulysses S. Grant": 1,
  "William T. Sherman": 2,
  "George B. McClellan": 3,
  "George G. Meade": 4,
  "Philip Sheridan": 5,
  "George Thomas": 6,
  "Ambrose E. Burnside": 7,
  "Joseph Hooker": 8,
  "Irvin McDowell": 9,
  "Don Carlos Buell": 10,
  "William Rosecrans": 11,
  "John Pope": 12,
  "David G. Farragut": 13,

  // Confederate High Command (20-33)
  "Robert E. Lee": 20,
  "Thomas J. 'Stonewall' Jackson": 21,
  "James Longstreet": 22,
  "P.G.T. Beauregard": 23,
  "Joseph E. Johnston": 24,
  "J.E.B. Stuart": 25,
  "Braxton Bragg": 26,
  "John Bell Hood": 27,
  "Nathan Bedford Forrest": 28,
  "A.P. Hill": 29,
  "Jubal Early": 30,
  "Richard S. Ewell": 31,
  "George Pickett": 32,

  // Union Corps/Division (50-79)
  "Winfield Scott Hancock": 50,
  "John F. Reynolds": 51,
  "Daniel Sickles": 52,
  "John Sedgwick": 53,
  "Oliver O. Howard": 54,
  "Henry W. Slocum": 55,
  "Gouverneur K. Warren": 56,
  "Andrew A. Humphreys": 57,
  "Horatio G. Wright": 58,
  "James B. McPherson": 59,
  "John Schofield": 60,
  "David D. Porter": 61,
  "Fitz John Porter": 63,
  "William B. Franklin": 64,
  "Edwin V. Sumner": 65,
  "Alfred Pleasonton": 67,
  "Benjamin Butler": 70,
  "Nathaniel P. Banks": 71,

  // Confederate Corps/Division (80-109)
  "D.H. Hill": 80,
  "John B. Gordon": 81,
  "Lafayette McLaws": 82,
  "Leonidas Polk": 83,
  "William J. Hardee": 84,
  "Patrick Cleburne": 85,
  "Wade Hampton": 86,
  "Joseph Wheeler": 88,
  "Earl Van Dorn": 94,
  "Sterling Price": 95,

  // Notable Figures (110-129)
  "Simon Bolivar Buckner": 119,
  "John C. Pemberton": 120,
  "Robert Gould Shaw": 127,

  // Additional Commanders (130-159)
  "Henry Hunt": 130,
  "Edward Porter Alexander": 131,
  "Albert Sidney Johnston": 132,
  "Alfred Terry": 133,
  "Andrew H. Foote": 134,
  "Catesby ap Roger Jones": 135,
  "Charles P. Stone": 136,
  "Edward D. Baker": 137,
  "James Shields": 138,
  "Jesse Reno": 139,
  "John B. Floyd": 140,
  "John B. Magruder": 141,
  "John C. Fremont": 142,
  "John L. Worden": 143,
  "John Pegram": 144,
  "John R. Kenly": 145,
  "Joseph J. Reynolds": 146,
  "Lloyd Tilghman": 147,
  "Mansfield Lovell": 148,
  "Nathan G. Evans": 149,
  "Quincy Gillmore": 150,
  "Robert Anderson": 151,
  "Robert C. Schenck": 152,
  "Robert H. Milroy": 153,
  "Robert S. Garnett": 154,
  "Thomas A. Morris": 155,
  "Truman Seymour": 156,
  "William Lamb": 157,
  "William Taliaferro": 158,

  // Special cases
  "Various": 0, // Placeholder for "Various" commanders
};

/**
 * Get commander ID by name
 */
export function getCommanderIdByName(name: string): number {
  const id = COMMANDER_NAME_TO_ID[name];
  if (id !== undefined) return id;

  // Log warning for unknown commanders
  console.warn(`Unknown commander: "${name}"`);
  return 0;
}

/**
 * Get commander name by ID (uses people.ts)
 */
export function getCommanderNameById(id: number): string {
  if (id === 0) return "Various";
  const person = getPersonById(id);
  return person?.name ?? `Unknown (ID: ${id})`;
}

// ==================== LOCATION DATA ====================
// Extracted and normalized from events for reference by location_id

export const eventLocations: Record<number, Location> = {
  1: { id: 1, name: "Fort Sumter", type: "fort", coordinates: { lat: 32.7522, lng: -79.8745 }, state: "South Carolina" },
  2: { id: 2, name: "Manassas", type: "battlefield", coordinates: { lat: 38.8128, lng: -77.5214 }, state: "Virginia" },
  3: { id: 3, name: "Cheat Mountain", type: "battlefield", coordinates: { lat: 38.6500, lng: -79.8500 }, state: "West Virginia" },
  4: { id: 4, name: "Ball's Bluff", type: "battlefield", coordinates: { lat: 39.1372, lng: -77.5283 }, state: "Virginia" },
  5: { id: 5, name: "Fort Donelson", type: "fort", coordinates: { lat: 36.4889, lng: -87.8619 }, state: "Tennessee" },
  6: { id: 6, name: "Pittsburg Landing", type: "battlefield", coordinates: { lat: 35.1475, lng: -88.3303 }, state: "Tennessee" },
  7: { id: 7, name: "Fair Oaks Station", type: "battlefield", coordinates: { lat: 37.5172, lng: -77.3111 }, state: "Virginia" },
  8: { id: 8, name: "Richmond Area", type: "battlefield", coordinates: { lat: 37.5407, lng: -77.4360 }, state: "Virginia" },
  9: { id: 9, name: "Manassas (Second)", type: "battlefield", coordinates: { lat: 38.8128, lng: -77.5214 }, state: "Virginia" },
  10: { id: 10, name: "Sharpsburg", type: "battlefield", coordinates: { lat: 39.4747, lng: -77.7447 }, state: "Maryland" },
  11: { id: 11, name: "Perryville", type: "battlefield", coordinates: { lat: 37.6486, lng: -84.9742 }, state: "Kentucky" },
  12: { id: 12, name: "Fredericksburg", type: "city", coordinates: { lat: 38.3032, lng: -77.4605 }, state: "Virginia" },
  13: { id: 13, name: "Murfreesboro", type: "battlefield", coordinates: { lat: 35.8764, lng: -86.4128 }, state: "Tennessee" },
  14: { id: 14, name: "Chancellorsville", type: "battlefield", coordinates: { lat: 38.3119, lng: -77.6411 }, state: "Virginia" },
  15: { id: 15, name: "Vicksburg", type: "city", coordinates: { lat: 32.3526, lng: -90.8779 }, state: "Mississippi" },
  16: { id: 16, name: "Gettysburg", type: "battlefield", coordinates: { lat: 39.8309, lng: -77.2311 }, state: "Pennsylvania" },
  17: { id: 17, name: "Chickamauga", type: "battlefield", coordinates: { lat: 34.9167, lng: -85.2617 }, state: "Georgia" },
  18: { id: 18, name: "Chattanooga", type: "city", coordinates: { lat: 35.0456, lng: -85.3097 }, state: "Tennessee" },
  19: { id: 19, name: "The Wilderness", type: "battlefield", coordinates: { lat: 38.3150, lng: -77.7300 }, state: "Virginia" },
  20: { id: 20, name: "Spotsylvania Court House", type: "battlefield", coordinates: { lat: 38.2000, lng: -77.5914 }, state: "Virginia" },
  21: { id: 21, name: "Cold Harbor", type: "battlefield", coordinates: { lat: 37.5897, lng: -77.2850 }, state: "Virginia" },
  22: { id: 22, name: "Petersburg", type: "city", coordinates: { lat: 37.2279, lng: -77.4019 }, state: "Virginia" },
  23: { id: 23, name: "Atlanta", type: "city", coordinates: { lat: 33.7490, lng: -84.3880 }, state: "Georgia" },
  24: { id: 24, name: "Atlanta (Fall)", type: "city", coordinates: { lat: 33.7490, lng: -84.3880 }, state: "Georgia" },
  25: { id: 25, name: "Cedar Creek", type: "battlefield", coordinates: { lat: 39.0178, lng: -78.3692 }, state: "Virginia" },
  26: { id: 26, name: "Georgia (March)", type: "battlefield", coordinates: { lat: 33.0, lng: -83.5 }, state: "Georgia" },
  27: { id: 27, name: "Franklin", type: "battlefield", coordinates: { lat: 35.9251, lng: -86.8689 }, state: "Tennessee" },
  28: { id: 28, name: "Nashville", type: "city", coordinates: { lat: 36.1627, lng: -86.7816 }, state: "Tennessee" },
  29: { id: 29, name: "Petersburg (Fall)", type: "city", coordinates: { lat: 37.2279, lng: -77.4019 }, state: "Virginia" },
  30: { id: 30, name: "Sayler's Creek", type: "battlefield", coordinates: { lat: 37.3103, lng: -78.2806 }, state: "Virginia" },
  31: { id: 31, name: "Appomattox Court House", type: "landmark", coordinates: { lat: 37.3765, lng: -78.7969 }, state: "Virginia" },
  32: { id: 32, name: "Washington D.C.", type: "capital", coordinates: { lat: 38.8977, lng: -77.0365 }, state: null },
  33: { id: 33, name: "Rich Mountain", type: "battlefield", coordinates: { lat: 38.8806, lng: -80.0139 }, state: "West Virginia" },
  34: { id: 34, name: "Corrick's Ford", type: "battlefield", coordinates: { lat: 39.0633, lng: -79.6753 }, state: "West Virginia" },
  35: { id: 35, name: "Yorktown", type: "fort", coordinates: { lat: 37.2385, lng: -76.5097 }, state: "Virginia" },
  36: { id: 36, name: "Williamsburg", type: "battlefield", coordinates: { lat: 37.2707, lng: -76.7075 }, state: "Virginia" },
  37: { id: 37, name: "South Mountain", type: "battlefield", coordinates: { lat: 39.4589, lng: -77.6178 }, state: "Maryland" },
  38: { id: 38, name: "North Anna River", type: "battlefield", coordinates: { lat: 37.8250, lng: -77.5225 }, state: "Virginia" },
  39: { id: 39, name: "Five Forks", type: "battlefield", coordinates: { lat: 37.0800, lng: -77.7764 }, state: "Virginia" },
  40: { id: 40, name: "Fort Henry", type: "fort", coordinates: { lat: 36.4167, lng: -88.0333 }, state: "Tennessee" },
  41: { id: 41, name: "Iuka", type: "battlefield", coordinates: { lat: 34.8117, lng: -88.1900 }, state: "Mississippi" },
  42: { id: 42, name: "Corinth", type: "battlefield", coordinates: { lat: 34.9342, lng: -88.5225 }, state: "Mississippi" },
  43: { id: 43, name: "Kernstown", type: "battlefield", coordinates: { lat: 39.1697, lng: -78.1742 }, state: "Virginia" },
  44: { id: 44, name: "McDowell", type: "battlefield", coordinates: { lat: 38.3058, lng: -79.5642 }, state: "Virginia" },
  45: { id: 45, name: "Front Royal", type: "battlefield", coordinates: { lat: 38.9181, lng: -78.1944 }, state: "Virginia" },
  46: { id: 46, name: "Winchester", type: "battlefield", coordinates: { lat: 39.1857, lng: -78.1633 }, state: "Virginia" },
  47: { id: 47, name: "Cross Keys", type: "battlefield", coordinates: { lat: 38.4292, lng: -78.8167 }, state: "Virginia" },
  48: { id: 48, name: "Port Republic", type: "battlefield", coordinates: { lat: 38.3008, lng: -78.8242 }, state: "Virginia" },
  49: { id: 49, name: "Cedar Mountain", type: "battlefield", coordinates: { lat: 38.3917, lng: -78.1111 }, state: "Virginia" },
  50: { id: 50, name: "Resaca", type: "battlefield", coordinates: { lat: 34.5803, lng: -84.9372 }, state: "Georgia" },
  51: { id: 51, name: "Kennesaw Mountain", type: "battlefield", coordinates: { lat: 33.9831, lng: -84.5783 }, state: "Georgia" },
  52: { id: 52, name: "Jonesborough", type: "battlefield", coordinates: { lat: 33.5218, lng: -84.3541 }, state: "Georgia" },
  53: { id: 53, name: "Bentonville", type: "battlefield", coordinates: { lat: 35.3206, lng: -78.3422 }, state: "North Carolina" },
  54: { id: 54, name: "Hampton Roads", type: "naval", coordinates: { lat: 36.9687, lng: -76.3353 }, state: "Virginia" },
  55: { id: 55, name: "New Orleans", type: "city", coordinates: { lat: 29.9511, lng: -90.0715 }, state: "Louisiana" },
  56: { id: 56, name: "Mobile Bay", type: "naval", coordinates: { lat: 30.2283, lng: -88.0417 }, state: "Alabama" },
  57: { id: 57, name: "Fort Fisher", type: "fort", coordinates: { lat: 33.9651, lng: -77.9269 }, state: "North Carolina" },
  58: { id: 58, name: "Fort Wagner", type: "fort", coordinates: { lat: 32.7581, lng: -79.8764 }, state: "South Carolina" },
};

/**
 * Get location by ID
 */
export function getLocationById(id: number): Location | undefined {
  return eventLocations[id];
}

// ==================== NORMALIZED EVENTS ====================

export const allEvents: NormalizedEvent[] = [
  // ==================== 1861 ====================
  {
    id: 1,
    name: "Battle of Fort Sumter",
    type: "battle",
    date_start: "1861-04-12",
    date_end: "1861-04-13",
    description: "The bombardment of Fort Sumter was the first military action of the American Civil War. Confederate forces opened fire on the Union-held fort in Charleston Harbor.",
    campaign: null,
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "SC001",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fort_Sumter",
    image_url: null,
    location_id: 1,
    commander_ids: {
      union: [151], // Robert Anderson
      confederate: [23] // P.G.T. Beauregard
    }
  },
  {
    id: 2,
    name: "First Battle of Bull Run",
    type: "battle",
    date_start: "1861-07-21",
    date_end: "1861-07-21",
    description: "The first major land battle of the Civil War. Union forces under Irvin McDowell were routed by Confederate forces. Thomas Jackson earned the nickname 'Stonewall' for his steadfast defense.",
    campaign: "Manassas Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA005",
    wikipedia_url: "https://en.wikipedia.org/wiki/First_Battle_of_Bull_Run",
    image_url: null,
    location_id: 2,
    commander_ids: {
      union: [9], // Irvin McDowell
      confederate: [23, 24, 21] // Beauregard, J.E. Johnston, Jackson
    }
  },
  {
    id: 3,
    name: "Battle of Cheat Mountain",
    type: "battle",
    date_start: "1861-09-12",
    date_end: "1861-09-15",
    description: "Robert E. Lee's first Civil War field command. An unsuccessful campaign in western Virginia due to poor coordination and bad weather. Lee was criticized for this failure.",
    campaign: "Operations in Western Virginia",
    theater: "Eastern",
    result: "Union victory",
    significance: 2,
    cwsac_id: "WV001",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Cheat_Mountain",
    image_url: null,
    location_id: 3,
    commander_ids: {
      union: [146], // Joseph J. Reynolds
      confederate: [20] // Robert E. Lee
    }
  },
  {
    id: 4,
    name: "Battle of Ball's Bluff",
    type: "battle",
    date_start: "1861-10-21",
    date_end: "1861-10-21",
    description: "A small but politically significant Union defeat. Senator Edward Baker was killed, leading to the creation of the Joint Committee on the Conduct of the War.",
    campaign: null,
    theater: "Eastern",
    result: "Confederate victory",
    significance: 2,
    cwsac_id: "VA004",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Ball%27s_Bluff",
    image_url: null,
    location_id: 4,
    commander_ids: {
      union: [137, 136], // Edward D. Baker, Charles P. Stone
      confederate: [149] // Nathan G. Evans
    }
  },
  // McClellan's Western Virginia Campaign
  {
    id: 33,
    name: "Battle of Rich Mountain",
    type: "battle",
    date_start: "1861-07-11",
    date_end: "1861-07-11",
    description: "A Union victory in western Virginia that made McClellan a national hero and led to his promotion to command of the Army of the Potomac.",
    campaign: "Operations in Western Virginia",
    theater: "Eastern",
    result: "Union victory",
    significance: 3,
    cwsac_id: "WV002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Rich_Mountain",
    image_url: null,
    location_id: 33,
    commander_ids: {
      union: [3, 11], // McClellan, Rosecrans
      confederate: [154, 144] // R.S. Garnett, John Pegram
    }
  },
  {
    id: 34,
    name: "Battle of Corrick's Ford",
    type: "battle",
    date_start: "1861-07-13",
    date_end: "1861-07-13",
    description: "Union forces pursued and defeated retreating Confederates. Confederate General Robert Garnett was killed, becoming the first general officer killed in the Civil War.",
    campaign: "Operations in Western Virginia",
    theater: "Eastern",
    result: "Union victory",
    significance: 2,
    cwsac_id: "WV003",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Corrick%27s_Ford",
    image_url: null,
    location_id: 34,
    commander_ids: {
      union: [3, 155], // McClellan, Thomas A. Morris
      confederate: [154] // Robert S. Garnett
    }
  },

  // ==================== 1862 ====================
  {
    id: 5,
    name: "Battle of Fort Donelson",
    type: "battle",
    date_start: "1862-02-11",
    date_end: "1862-02-16",
    description: "Grant's capture of Fort Donelson opened the Cumberland River to Union forces. Grant earned the nickname 'Unconditional Surrender' Grant.",
    campaign: "Fort Henry and Fort Donelson Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "TN002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fort_Donelson",
    image_url: null,
    location_id: 5,
    commander_ids: {
      union: [1], // Grant
      confederate: [140, 119] // John B. Floyd, Simon Bolivar Buckner
    }
  },
  {
    id: 6,
    name: "Battle of Shiloh",
    type: "battle",
    date_start: "1862-04-06",
    date_end: "1862-04-07",
    description: "A major battle in southwestern Tennessee. Confederate forces launched a surprise attack but were pushed back after reinforcements arrived. Over 23,000 casualties shocked both sides.",
    campaign: "Shiloh Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "TN003",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Shiloh",
    image_url: null,
    location_id: 6,
    commander_ids: {
      union: [1, 10, 2], // Grant, Don Carlos Buell, Sherman
      confederate: [132, 23] // Albert Sidney Johnston, Beauregard
    }
  },
  {
    id: 7,
    name: "Battle of Seven Pines (Fair Oaks)",
    type: "battle",
    date_start: "1862-05-31",
    date_end: "1862-06-01",
    description: "Confederate commander Joseph E. Johnston was severely wounded, leading to Robert E. Lee taking command of the Army of Northern Virginia on June 1, 1862.",
    campaign: "Peninsula Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 4,
    cwsac_id: "VA020",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Seven_Pines",
    image_url: null,
    location_id: 7,
    commander_ids: {
      union: [3], // McClellan
      confederate: [24, 20] // Joseph E. Johnston, Robert E. Lee
    }
  },
  {
    id: 8,
    name: "Seven Days Battles",
    type: "battle",
    date_start: "1862-06-25",
    date_end: "1862-07-01",
    description: "Lee's first major offensive as Army commander. A series of six battles that drove McClellan's Army of the Potomac away from Richmond despite heavy Confederate casualties.",
    campaign: "Peninsula Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA021",
    wikipedia_url: "https://en.wikipedia.org/wiki/Seven_Days_Battles",
    image_url: null,
    location_id: 8,
    commander_ids: {
      union: [3], // McClellan
      confederate: [20, 21, 22] // Lee, Jackson, Longstreet
    }
  },
  {
    id: 9,
    name: "Second Battle of Bull Run",
    type: "battle",
    date_start: "1862-08-28",
    date_end: "1862-08-30",
    description: "Lee's bold flanking maneuver led to a decisive Confederate victory. Pope's Army of Virginia was routed, forcing a Union retreat to Washington.",
    campaign: "Northern Virginia Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA026",
    wikipedia_url: "https://en.wikipedia.org/wiki/Second_Battle_of_Bull_Run",
    image_url: null,
    location_id: 9,
    commander_ids: {
      union: [12], // John Pope
      confederate: [20, 21, 22] // Lee, Jackson, Longstreet
    }
  },
  {
    id: 10,
    name: "Battle of Antietam",
    type: "battle",
    date_start: "1862-09-17",
    date_end: "1862-09-17",
    description: "The bloodiest single-day battle in American history with 22,717 casualties. Lee's first invasion of the North was halted. Lincoln used the victory to issue the Emancipation Proclamation.",
    campaign: "Maryland Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "MD003",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Antietam",
    image_url: null,
    location_id: 10,
    commander_ids: {
      union: [3], // McClellan
      confederate: [20, 22, 21] // Lee, Longstreet, Jackson
    }
  },
  {
    id: 11,
    name: "Battle of Perryville",
    type: "battle",
    date_start: "1862-10-08",
    date_end: "1862-10-08",
    description: "The largest Civil War battle in Kentucky. Bragg's Confederate invasion was repulsed, securing Kentucky for the Union.",
    campaign: "Confederate Heartland Offensive",
    theater: "Western",
    result: "Union victory",
    significance: 3,
    cwsac_id: "KY009",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Perryville",
    image_url: null,
    location_id: 11,
    commander_ids: {
      union: [10], // Don Carlos Buell
      confederate: [26] // Braxton Bragg
    }
  },
  {
    id: 12,
    name: "Battle of Fredericksburg",
    type: "battle",
    date_start: "1862-12-11",
    date_end: "1862-12-15",
    description: "Union forces under Burnside made repeated futile assaults against entrenched Confederate positions on Marye's Heights. A devastating Union defeat with over 12,000 casualties.",
    campaign: "Fredericksburg Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "VA024",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fredericksburg",
    image_url: null,
    location_id: 12,
    commander_ids: {
      union: [7], // Ambrose E. Burnside
      confederate: [20, 22, 21] // Lee, Longstreet, Jackson
    }
  },
  {
    id: 13,
    name: "Battle of Stones River",
    type: "battle",
    date_start: "1862-12-31",
    date_end: "1863-01-02",
    description: "A bloody but strategically important Union victory in Tennessee that boosted Northern morale after Fredericksburg.",
    campaign: "Stones River Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "TN010",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Stones_River",
    image_url: null,
    location_id: 13,
    commander_ids: {
      union: [11], // William Rosecrans
      confederate: [26] // Braxton Bragg
    }
  },
  // Grant's Western Campaign (1862)
  {
    id: 40,
    name: "Battle of Fort Henry",
    type: "battle",
    date_start: "1862-02-06",
    date_end: "1862-02-06",
    description: "Grant's gunboats captured Fort Henry on the Tennessee River, opening the way into the Confederate heartland. The fort fell before most infantry arrived.",
    campaign: "Fort Henry and Fort Donelson Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 3,
    cwsac_id: "TN001",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fort_Henry",
    image_url: null,
    location_id: 40,
    commander_ids: {
      union: [1, 134], // Grant, Andrew H. Foote
      confederate: [147] // Lloyd Tilghman
    }
  },
  {
    id: 41,
    name: "Battle of Iuka",
    type: "battle",
    date_start: "1862-09-19",
    date_end: "1862-09-19",
    description: "Grant's forces under Rosecrans attacked Confederate troops at Iuka, Mississippi. The Confederates escaped due to poor coordination, but were prevented from reinforcing Bragg.",
    campaign: "Iuka-Corinth Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 2,
    cwsac_id: "MS002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Iuka",
    image_url: null,
    location_id: 41,
    commander_ids: {
      union: [11, 1], // Rosecrans, Grant
      confederate: [95] // Sterling Price
    }
  },
  {
    id: 42,
    name: "Second Battle of Corinth",
    type: "battle",
    date_start: "1862-10-03",
    date_end: "1862-10-04",
    description: "Confederate forces under Van Dorn and Price attacked Rosecrans at Corinth. After initial gains, the assault was repulsed with heavy losses.",
    campaign: "Iuka-Corinth Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 3,
    cwsac_id: "MS003",
    wikipedia_url: "https://en.wikipedia.org/wiki/Second_Battle_of_Corinth",
    image_url: null,
    location_id: 42,
    commander_ids: {
      union: [11, 1], // Rosecrans, Grant
      confederate: [94, 95] // Earl Van Dorn, Sterling Price
    }
  },
  // Jackson's Valley Campaign (1862)
  {
    id: 43,
    name: "Battle of Kernstown",
    type: "battle",
    date_start: "1862-03-23",
    date_end: "1862-03-23",
    description: "Jackson's only tactical defeat, but a strategic success. The battle convinced Lincoln to withhold troops from McClellan to protect Washington.",
    campaign: "Jackson's Valley Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 3,
    cwsac_id: "VA027",
    wikipedia_url: "https://en.wikipedia.org/wiki/First_Battle_of_Kernstown",
    image_url: null,
    location_id: 43,
    commander_ids: {
      union: [138], // James Shields
      confederate: [21] // Jackson
    }
  },
  {
    id: 44,
    name: "Battle of McDowell",
    type: "battle",
    date_start: "1862-05-08",
    date_end: "1862-05-08",
    description: "Jackson repulsed a Union attack in the Allegheny Mountains, beginning his legendary Valley Campaign offensive.",
    campaign: "Jackson's Valley Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 2,
    cwsac_id: "VA031",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_McDowell",
    image_url: null,
    location_id: 44,
    commander_ids: {
      union: [153, 152], // Robert H. Milroy, Robert C. Schenck
      confederate: [21] // Jackson
    }
  },
  {
    id: 45,
    name: "Battle of Front Royal",
    type: "battle",
    date_start: "1862-05-23",
    date_end: "1862-05-23",
    description: "Jackson surprised and routed the Union garrison, capturing supplies and threatening Banks's flank. Belle Boyd provided intelligence to Jackson.",
    campaign: "Jackson's Valley Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 2,
    cwsac_id: "VA034",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Front_Royal",
    image_url: null,
    location_id: 45,
    commander_ids: {
      union: [145], // John R. Kenly
      confederate: [21] // Jackson
    }
  },
  {
    id: 46,
    name: "First Battle of Winchester",
    type: "battle",
    date_start: "1862-05-25",
    date_end: "1862-05-25",
    description: "Jackson routed Banks's forces and pursued them to the Potomac. The victory caused panic in Washington and diverted troops from McClellan.",
    campaign: "Jackson's Valley Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 3,
    cwsac_id: "VA036",
    wikipedia_url: "https://en.wikipedia.org/wiki/First_Battle_of_Winchester",
    image_url: null,
    location_id: 46,
    commander_ids: {
      union: [71], // Nathaniel P. Banks
      confederate: [21] // Jackson
    }
  },
  {
    id: 47,
    name: "Battle of Cross Keys",
    type: "battle",
    date_start: "1862-06-08",
    date_end: "1862-06-08",
    description: "Jackson's subordinate Ewell held off Fremont while Jackson prepared to strike Shields at Port Republic.",
    campaign: "Jackson's Valley Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 2,
    cwsac_id: "VA038",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Cross_Keys",
    image_url: null,
    location_id: 47,
    commander_ids: {
      union: [142], // John C. Fremont
      confederate: [31, 21] // Richard S. Ewell, Jackson
    }
  },
  {
    id: 48,
    name: "Battle of Port Republic",
    type: "battle",
    date_start: "1862-06-09",
    date_end: "1862-06-09",
    description: "Jackson defeated Shields in fierce fighting, then escaped before Fremont could join. The Valley Campaign ended in complete Confederate success.",
    campaign: "Jackson's Valley Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 3,
    cwsac_id: "VA039",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Port_Republic",
    image_url: null,
    location_id: 48,
    commander_ids: {
      union: [138], // James Shields
      confederate: [21] // Jackson
    }
  },
  {
    id: 49,
    name: "Battle of Cedar Mountain",
    type: "battle",
    date_start: "1862-08-09",
    date_end: "1862-08-09",
    description: "Jackson narrowly defeated Banks in the opening battle of the Northern Virginia Campaign. Jackson personally rallied his troops with sword drawn.",
    campaign: "Northern Virginia Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 3,
    cwsac_id: "VA025",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Cedar_Mountain",
    image_url: null,
    location_id: 49,
    commander_ids: {
      union: [71], // Nathaniel P. Banks
      confederate: [21] // Jackson
    }
  },
  // Peninsula Campaign
  {
    id: 35,
    name: "Siege of Yorktown",
    type: "siege",
    date_start: "1862-04-05",
    date_end: "1862-05-04",
    description: "McClellan besieged Confederate positions on the Virginia Peninsula. His cautious approach gave the Confederates time to prepare the defense of Richmond before withdrawing.",
    campaign: "Peninsula Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 2,
    cwsac_id: "VA007",
    wikipedia_url: "https://en.wikipedia.org/wiki/Siege_of_Yorktown_(1862)",
    image_url: null,
    location_id: 35,
    commander_ids: {
      union: [3], // McClellan
      confederate: [141, 24] // John B. Magruder, Joseph E. Johnston
    }
  },
  {
    id: 36,
    name: "Battle of Williamsburg",
    type: "battle",
    date_start: "1862-05-05",
    date_end: "1862-05-05",
    description: "A rearguard action during the Confederate withdrawal up the Peninsula. Union forces attacked Confederate defenses, resulting in a tactical Union victory.",
    campaign: "Peninsula Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 2,
    cwsac_id: "VA009",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Williamsburg",
    image_url: null,
    location_id: 36,
    commander_ids: {
      union: [3, 65, 8], // McClellan, Edwin V. Sumner, Joseph Hooker
      confederate: [22] // James Longstreet
    }
  },
  // Maryland Campaign
  {
    id: 37,
    name: "Battle of South Mountain",
    type: "battle",
    date_start: "1862-09-14",
    date_end: "1862-09-14",
    description: "Union forces fought through the mountain gaps held by Confederate defenders, setting the stage for Antietam. Union General Jesse Reno was killed.",
    campaign: "Maryland Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 3,
    cwsac_id: "MD002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_South_Mountain",
    image_url: null,
    location_id: 37,
    commander_ids: {
      union: [3, 7, 139], // McClellan, Burnside, Jesse Reno
      confederate: [80, 22] // D.H. Hill, James Longstreet
    }
  },
  // Naval Battles
  {
    id: 54,
    name: "Battle of Hampton Roads",
    type: "battle",
    date_start: "1862-03-08",
    date_end: "1862-03-09",
    description: "First battle between ironclad warships. CSS Virginia fought USS Monitor to a draw, revolutionizing naval warfare forever.",
    campaign: null,
    theater: "Eastern",
    result: "Inconclusive",
    significance: 5,
    cwsac_id: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Hampton_Roads",
    image_url: null,
    location_id: 54,
    commander_ids: {
      union: [143], // John L. Worden
      confederate: [90, 135] // Franklin Buchanan, Catesby ap Roger Jones
    }
  },
  {
    id: 55,
    name: "Capture of New Orleans",
    type: "battle",
    date_start: "1862-04-25",
    date_end: "1862-05-01",
    description: "Farragut's fleet ran past Confederate forts and captured the South's largest city and most important port.",
    campaign: null,
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Capture_of_New_Orleans",
    image_url: null,
    location_id: 55,
    commander_ids: {
      union: [13, 70], // David G. Farragut, Benjamin Butler
      confederate: [148] // Mansfield Lovell
    }
  },

  // ==================== 1863 ====================
  {
    id: 14,
    name: "Battle of Chancellorsville",
    type: "battle",
    date_start: "1863-04-30",
    date_end: "1863-05-06",
    description: "Lee's greatest victory, featuring Jackson's daring flanking maneuver. However, Jackson was mortally wounded by friendly fire, a loss from which Lee's army never fully recovered.",
    campaign: "Chancellorsville Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA032",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Chancellorsville",
    image_url: null,
    location_id: 14,
    commander_ids: {
      union: [8], // Joseph Hooker
      confederate: [20, 21, 22] // Lee, Jackson, Longstreet
    }
  },
  {
    id: 15,
    name: "Siege of Vicksburg",
    type: "siege",
    date_start: "1863-05-18",
    date_end: "1863-07-04",
    description: "Grant's brilliant campaign captured the 'Gibraltar of the Confederacy.' The surrender on July 4, 1863, gave the Union complete control of the Mississippi River, splitting the Confederacy.",
    campaign: "Vicksburg Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "MS011",
    wikipedia_url: "https://en.wikipedia.org/wiki/Siege_of_Vicksburg",
    image_url: null,
    location_id: 15,
    commander_ids: {
      union: [1, 2], // Grant, Sherman
      confederate: [120] // John C. Pemberton
    }
  },
  {
    id: 16,
    name: "Battle of Gettysburg",
    type: "battle",
    date_start: "1863-07-01",
    date_end: "1863-07-03",
    description: "The turning point of the Civil War. Lee's second invasion of the North ended in devastating defeat. Pickett's Charge on July 3rd became symbolic of Confederate defeat.",
    campaign: "Gettysburg Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "PA002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Gettysburg",
    image_url: null,
    location_id: 16,
    commander_ids: {
      union: [4], // George G. Meade
      confederate: [20, 22] // Lee, Longstreet
    }
  },
  {
    id: 17,
    name: "Battle of Chickamauga",
    type: "battle",
    date_start: "1863-09-19",
    date_end: "1863-09-20",
    description: "The bloodiest battle in the Western Theater. Longstreet's corps arrived from Virginia to help achieve a Confederate victory, but George Thomas's defense earned him the nickname 'Rock of Chickamauga.'",
    campaign: "Chickamauga Campaign",
    theater: "Western",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "GA006",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Chickamauga",
    image_url: null,
    location_id: 17,
    commander_ids: {
      union: [11, 6], // Rosecrans, George Thomas
      confederate: [26, 22] // Bragg, Longstreet
    }
  },
  {
    id: 18,
    name: "Battle of Chattanooga",
    type: "battle",
    date_start: "1863-11-23",
    date_end: "1863-11-25",
    description: "Grant's forces broke the Confederate siege of Chattanooga in dramatic fashion. The 'Battle Above the Clouds' on Lookout Mountain and the charge up Missionary Ridge opened the gateway to the Deep South.",
    campaign: "Chattanooga Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "TN024",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Chattanooga",
    image_url: null,
    location_id: 18,
    commander_ids: {
      union: [1, 6, 2], // Grant, Thomas, Sherman
      confederate: [26] // Bragg
    }
  },
  {
    id: 58,
    name: "Second Battle of Fort Wagner",
    type: "battle",
    date_start: "1863-07-18",
    date_end: "1863-07-18",
    description: "Famous assault by the 54th Massachusetts Infantry, one of the first Black regiments. Colonel Robert Gould Shaw was killed leading the charge. Though the assault failed, it proved the valor of Black soldiers and boosted recruitment.",
    campaign: "Operations Against Charleston",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "SC007",
    wikipedia_url: "https://en.wikipedia.org/wiki/Second_Battle_of_Fort_Wagner",
    image_url: null,
    location_id: 58,
    commander_ids: {
      union: [156, 127, 150], // Truman Seymour, Robert Gould Shaw, Quincy Gillmore
      confederate: [158, 23] // William Taliaferro, Beauregard
    }
  },

  // ==================== 1864 ====================
  {
    id: 19,
    name: "Battle of the Wilderness",
    type: "battle",
    date_start: "1864-05-05",
    date_end: "1864-05-07",
    description: "The first battle of Grant's Overland Campaign. Brutal fighting in dense forest was inconclusive, but unlike previous commanders, Grant continued his advance south rather than retreating.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 4,
    cwsac_id: "VA041",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_the_Wilderness",
    image_url: null,
    location_id: 19,
    commander_ids: {
      union: [1, 4], // Grant, Meade
      confederate: [20, 22] // Lee, Longstreet
    }
  },
  {
    id: 20,
    name: "Battle of Spotsylvania Court House",
    type: "battle",
    date_start: "1864-05-08",
    date_end: "1864-05-21",
    description: "A series of battles as Grant attempted to outflank Lee. The fighting at the 'Bloody Angle' on May 12 was among the most intense hand-to-hand combat of the entire war.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 4,
    cwsac_id: "VA046",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Spotsylvania_Court_House",
    image_url: null,
    location_id: 20,
    commander_ids: {
      union: [1, 4], // Grant, Meade
      confederate: [20] // Lee
    }
  },
  {
    id: 21,
    name: "Battle of Cold Harbor",
    type: "battle",
    date_start: "1864-05-31",
    date_end: "1864-06-12",
    description: "Grant's most costly tactical mistake. On June 3, Union forces lost 7,000 men in less than an hour assaulting Confederate entrenchments. Grant later wrote he regretted the assault.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "VA057",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Cold_Harbor",
    image_url: null,
    location_id: 21,
    commander_ids: {
      union: [1, 4], // Grant, Meade
      confederate: [20] // Lee
    }
  },
  {
    id: 22,
    name: "Siege of Petersburg",
    type: "siege",
    date_start: "1864-06-09",
    date_end: "1865-03-25",
    description: "A nine-month siege of the vital rail hub of Petersburg. Grant's strategy of extending his lines gradually wore down Lee's dwindling forces. The trench warfare foreshadowed World War I.",
    campaign: "Richmond-Petersburg Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA068",
    wikipedia_url: "https://en.wikipedia.org/wiki/Siege_of_Petersburg",
    image_url: null,
    location_id: 22,
    commander_ids: {
      union: [1, 4], // Grant, Meade
      confederate: [20] // Lee
    }
  },
  {
    id: 23,
    name: "Battle of Atlanta",
    type: "battle",
    date_start: "1864-07-22",
    date_end: "1864-07-22",
    description: "Hood attacked Sherman's forces east of Atlanta but was repulsed with heavy losses. Union General James McPherson was killed, the highest-ranking Union officer killed in combat.",
    campaign: "Atlanta Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "GA015",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Atlanta",
    image_url: null,
    location_id: 23,
    commander_ids: {
      union: [2, 59], // Sherman, James B. McPherson
      confederate: [27] // John Bell Hood
    }
  },
  {
    id: 24,
    name: "Fall of Atlanta",
    type: "battle",
    date_start: "1864-09-02",
    date_end: "1864-09-02",
    description: "Sherman captured Atlanta after a prolonged campaign. This victory boosted Northern morale and virtually ensured Lincoln's reelection in November.",
    campaign: "Atlanta Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "GA020",
    wikipedia_url: "https://en.wikipedia.org/wiki/Atlanta_Campaign",
    image_url: null,
    location_id: 24,
    commander_ids: {
      union: [2], // Sherman
      confederate: [27] // Hood
    }
  },
  {
    id: 25,
    name: "Battle of Cedar Creek",
    type: "battle",
    date_start: "1864-10-19",
    date_end: "1864-10-19",
    description: "Sheridan's dramatic ride to rally his troops turned a Confederate surprise attack into a decisive Union victory, ending Confederate resistance in the Shenandoah Valley.",
    campaign: "Valley Campaigns of 1864",
    theater: "Eastern",
    result: "Union victory",
    significance: 4,
    cwsac_id: "VA122",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Cedar_Creek",
    image_url: null,
    location_id: 25,
    commander_ids: {
      union: [5], // Philip Sheridan
      confederate: [30] // Jubal Early
    }
  },
  {
    id: 26,
    name: "Sherman's March to the Sea",
    type: "raid",
    date_start: "1864-11-15",
    date_end: "1864-12-21",
    description: "Sherman's devastating 285-mile march from Atlanta to Savannah. His 60,000 troops destroyed military targets, railroads, and resources, demonstrating the concept of total war.",
    campaign: "Savannah Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Sherman%27s_March_to_the_Sea",
    image_url: null,
    location_id: 26,
    commander_ids: {
      union: [2], // Sherman
      confederate: [0] // Various
    }
  },
  {
    id: 27,
    name: "Battle of Franklin",
    type: "battle",
    date_start: "1864-11-30",
    date_end: "1864-11-30",
    description: "One of the bloodiest battles of the war. Hood's frontal assault resulted in catastrophic Confederate losses, including six generals killed and the effective destruction of the Army of Tennessee.",
    campaign: "Franklin-Nashville Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "TN038",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Franklin_(1864)",
    image_url: null,
    location_id: 27,
    commander_ids: {
      union: [60], // John Schofield
      confederate: [27] // Hood
    }
  },
  {
    id: 28,
    name: "Battle of Nashville",
    type: "battle",
    date_start: "1864-12-15",
    date_end: "1864-12-16",
    description: "George Thomas destroyed Hood's Army of Tennessee in a decisive two-day battle. It was the most complete victory by either side during the war.",
    campaign: "Franklin-Nashville Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "TN040",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Nashville",
    image_url: null,
    location_id: 28,
    commander_ids: {
      union: [6], // George Thomas
      confederate: [27] // Hood
    }
  },
  // Atlanta Campaign battles
  {
    id: 50,
    name: "Battle of Resaca",
    type: "battle",
    date_start: "1864-05-13",
    date_end: "1864-05-15",
    description: "First major battle of the Atlanta Campaign. Sherman flanked Johnston's position at Dalton, forcing a Confederate withdrawal.",
    campaign: "Atlanta Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 3,
    cwsac_id: "GA005",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Resaca",
    image_url: null,
    location_id: 50,
    commander_ids: {
      union: [2, 6, 59, 60], // Sherman, Thomas, McPherson, Schofield
      confederate: [24] // Joseph E. Johnston
    }
  },
  {
    id: 51,
    name: "Battle of Kennesaw Mountain",
    type: "battle",
    date_start: "1864-06-27",
    date_end: "1864-06-27",
    description: "Sherman's frontal assault on entrenched Confederates was repulsed with 3,000 casualties. One of Sherman's few direct assaults during the campaign.",
    campaign: "Atlanta Campaign",
    theater: "Western",
    result: "Confederate victory",
    significance: 3,
    cwsac_id: "GA011",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Kennesaw_Mountain",
    image_url: null,
    location_id: 51,
    commander_ids: {
      union: [2, 6], // Sherman, Thomas
      confederate: [24] // Johnston
    }
  },
  {
    id: 52,
    name: "Battle of Jonesborough",
    type: "battle",
    date_start: "1864-08-31",
    date_end: "1864-09-01",
    description: "Sherman cut the last railroad into Atlanta. Hood was forced to evacuate the city, giving Sherman his crowning achievement.",
    campaign: "Atlanta Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "GA017",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Jonesborough",
    image_url: null,
    location_id: 52,
    commander_ids: {
      union: [2, 54], // Sherman, Oliver O. Howard
      confederate: [27, 84] // Hood, William J. Hardee
    }
  },
  // Additional 1864 battles
  {
    id: 38,
    name: "Battle of North Anna",
    type: "battle",
    date_start: "1864-05-23",
    date_end: "1864-05-26",
    description: "Lee fortified an inverted 'V' position along the North Anna River, but illness prevented him from exploiting Grant's divided forces. Grant disengaged and continued south.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 3,
    cwsac_id: "VA054",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_North_Anna",
    image_url: null,
    location_id: 38,
    commander_ids: {
      union: [1, 4], // Grant, Meade
      confederate: [20] // Lee
    }
  },
  {
    id: 56,
    name: "Battle of Mobile Bay",
    type: "battle",
    date_start: "1864-08-05",
    date_end: "1864-08-05",
    description: "Farragut's famous 'Damn the torpedoes!' battle. Union fleet captured Mobile Bay, closing one of the last Confederate ports.",
    campaign: null,
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Mobile_Bay",
    image_url: null,
    location_id: 56,
    commander_ids: {
      union: [13], // David G. Farragut
      confederate: [90] // Franklin Buchanan
    }
  },

  // ==================== 1865 ====================
  {
    id: 39,
    name: "Battle of Five Forks",
    type: "battle",
    date_start: "1865-04-01",
    date_end: "1865-04-01",
    description: "Sheridan's decisive victory cut the last railroad into Petersburg, forcing Lee's evacuation. Pickett's division was overwhelmed; it was the 'Waterloo of the Confederacy.'",
    campaign: "Appomattox Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA088",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Five_Forks",
    image_url: null,
    location_id: 39,
    commander_ids: {
      union: [5, 56], // Sheridan, Gouverneur K. Warren
      confederate: [32] // George Pickett
    }
  },
  {
    id: 29,
    name: "Fall of Petersburg",
    type: "battle",
    date_start: "1865-04-02",
    date_end: "1865-04-02",
    description: "Grant's final assault broke through Confederate lines at Petersburg. Lee evacuated both Petersburg and Richmond, beginning the Appomattox Campaign.",
    campaign: "Appomattox Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA091",
    wikipedia_url: "https://en.wikipedia.org/wiki/Third_Battle_of_Petersburg",
    image_url: null,
    location_id: 29,
    commander_ids: {
      union: [1, 4], // Grant, Meade
      confederate: [20] // Lee
    }
  },
  {
    id: 30,
    name: "Battle of Sayler's Creek",
    type: "battle",
    date_start: "1865-04-06",
    date_end: "1865-04-06",
    description: "Union forces destroyed nearly a quarter of Lee's retreating army, capturing about 8,000 prisoners including several generals. Lee reportedly said, 'My God! Has the army been dissolved?'",
    campaign: "Appomattox Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 4,
    cwsac_id: "VA094",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Sayler%27s_Creek",
    image_url: null,
    location_id: 30,
    commander_ids: {
      union: [5], // Philip Sheridan
      confederate: [20, 31] // Lee, Richard S. Ewell
    }
  },
  {
    id: 31,
    name: "Appomattox Court House",
    type: "surrender",
    date_start: "1865-04-09",
    date_end: "1865-04-09",
    description: "Robert E. Lee surrendered the Army of Northern Virginia to Ulysses S. Grant, effectively ending the Civil War. Grant's generous terms allowed Confederate soldiers to return home with their horses.",
    campaign: "Appomattox Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA097",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Appomattox_Court_House",
    image_url: null,
    location_id: 31,
    commander_ids: {
      union: [1], // Grant
      confederate: [20] // Lee
    }
  },
  {
    id: 32,
    name: "Lincoln Assassination",
    type: "proclamation",
    date_start: "1865-04-14",
    date_end: "1865-04-15",
    description: "President Abraham Lincoln was shot by John Wilkes Booth at Ford's Theatre and died the next morning. His death shocked the nation just days after Lee's surrender.",
    campaign: null,
    theater: "Eastern",
    result: null,
    significance: 5,
    cwsac_id: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Assassination_of_Abraham_Lincoln",
    image_url: null,
    location_id: 32,
    commander_ids: {
      union: [],
      confederate: []
    }
  },
  {
    id: 53,
    name: "Battle of Bentonville",
    type: "battle",
    date_start: "1865-03-19",
    date_end: "1865-03-21",
    description: "Johnston's last attempt to stop Sherman in the Carolinas Campaign. The largest battle fought in North Carolina and Johnston's final offensive.",
    campaign: "Carolinas Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 3,
    cwsac_id: "NC009",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Bentonville",
    image_url: null,
    location_id: 53,
    commander_ids: {
      union: [2, 55], // Sherman, Henry W. Slocum
      confederate: [24, 26, 84] // Johnston, Bragg, Hardee
    }
  },
  {
    id: 57,
    name: "Battle of Fort Fisher",
    type: "battle",
    date_start: "1865-01-13",
    date_end: "1865-01-15",
    description: "Largest amphibious operation of the war. Capture of Fort Fisher closed Wilmington, the last major Confederate port.",
    campaign: null,
    theater: "Eastern",
    result: "Union victory",
    significance: 4,
    cwsac_id: "NC014",
    wikipedia_url: "https://en.wikipedia.org/wiki/Second_Battle_of_Fort_Fisher",
    image_url: null,
    location_id: 57,
    commander_ids: {
      union: [61, 133], // David D. Porter, Alfred Terry
      confederate: [26, 157] // Braxton Bragg, William Lamb
    }
  },
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Get event by ID
 */
export function getEventById(id: number): NormalizedEvent | undefined {
  return allEvents.find(e => e.id === id);
}

/**
 * Get events by year
 */
export function getEventsByYear(year: number): NormalizedEvent[] {
  return allEvents.filter(e => e.date_start.startsWith(String(year)));
}

/**
 * Get events by campaign
 */
export function getEventsByCampaign(campaign: string): NormalizedEvent[] {
  return allEvents.filter(e => e.campaign === campaign);
}

/**
 * Get events by theater
 */
export function getEventsByTheater(theater: 'Eastern' | 'Western'): NormalizedEvent[] {
  return allEvents.filter(e => e.theater === theater);
}

/**
 * Get events involving a specific commander (by ID)
 */
export function getEventsByCommanderId(commanderId: number): NormalizedEvent[] {
  return allEvents.filter(e =>
    e.commander_ids.union.includes(commanderId) ||
    e.commander_ids.confederate.includes(commanderId)
  );
}

/**
 * Convert normalized event to legacy format (for backwards compatibility)
 */
export function toLegacyEvent(event: NormalizedEvent): LegacyEvent {
  const location = getLocationById(event.location_id);

  return {
    ...event,
    location: location ? {
      id: location.id,
      name: location.name,
      type: location.type,
      coordinates: location.coordinates ?? { lat: 0, lng: 0 },
      state: location.state
    } : {
      id: event.location_id,
      name: "Unknown",
      type: "battlefield",
      coordinates: { lat: 0, lng: 0 },
      state: null
    },
    commanders: {
      union: event.commander_ids.union.map(id => getCommanderNameById(id)),
      confederate: event.commander_ids.confederate.map(id => getCommanderNameById(id))
    }
  };
}

/**
 * Get all events in legacy format
 */
export function getAllLegacyEvents(): LegacyEvent[] {
  return allEvents.map(toLegacyEvent);
}

// For backwards compatibility
export const expandedEvents = getAllLegacyEvents();
