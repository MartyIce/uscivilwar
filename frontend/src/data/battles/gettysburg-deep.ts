/**
 * Deep Battle Data Structure
 *
 * This represents detailed battle information for "zoomed in" battle exploration,
 * including hour-by-hour timeline, unit positions, and movement data.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BattleDeepData {
  id: string;
  name: string;
  description: string;
  startDate: string;  // ISO date
  endDate: string;    // ISO date
  location: {
    lat: number;
    lng: number;
    // Bounding box for the battlefield
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  result: 'union_victory' | 'confederate_victory' | 'inconclusive';
  significance: string;

  // Order of Battle
  forces: {
    union: Force;
    confederate: Force;
  };

  // Timeline snapshots - discrete moments during the battle
  timeline: TimelineSnapshot[];

  // Key locations on the battlefield
  landmarks: Landmark[];
}

export interface Force {
  commander: string;
  commanderRank: string;
  armyName: string;
  totalStrength: number;
  casualties: {
    killed: number;
    wounded: number;
    captured: number;
    missing: number;
    total: number;
  };
  // Hierarchical unit structure
  corps: Corps[];
}

export interface Corps {
  id: string;
  name: string;
  commander: string;
  strength: number;
  divisions: Division[];
}

export interface Division {
  id: string;
  name: string;
  commander: string;
  strength: number;
  brigades: Brigade[];
}

export interface Brigade {
  id: string;
  name: string;
  commander: string;
  strength: number;
  regiments: Regiment[];
}

export interface Regiment {
  id: string;
  name: string;
  state: string;
  type: 'infantry' | 'cavalry' | 'artillery';
  strength: number;
  casualties?: number;
}

export interface TimelineSnapshot {
  id: string;
  datetime: string;  // ISO datetime
  label: string;     // e.g., "July 1, 10:00 AM"
  title: string;     // e.g., "Reynolds Falls"
  description: string;

  // Unit positions at this moment
  positions: UnitPosition[];

  // Events happening at this time
  events: BattleEvent[];
}

export interface UnitPosition {
  unitId: string;        // References a corps, division, brigade, or regiment
  unitType: 'corps' | 'division' | 'brigade' | 'regiment';
  side: 'union' | 'confederate';

  // Position on the battlefield
  lat: number;
  lng: number;

  // Unit state
  status: 'advancing' | 'defending' | 'retreating' | 'routing' | 'reserve' | 'arriving';
  facing?: number;       // Degrees, 0 = North

  // Optional: movement arrow to next position
  movementTo?: {
    lat: number;
    lng: number;
  };
}

export interface BattleEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'combat' | 'movement' | 'command' | 'casualty' | 'terrain';
  importance: 'critical' | 'major' | 'minor';
  location?: {
    lat: number;
    lng: number;
  };
  relatedUnits?: string[];  // Unit IDs involved
}

export interface Landmark {
  id: string;
  name: string;
  type: 'hill' | 'ridge' | 'road' | 'town' | 'farm' | 'creek' | 'woods' | 'field';
  lat: number;
  lng: number;
  description?: string;
}

// ============================================================================
// GETTYSBURG DATA
// ============================================================================

export const gettysburgDeep: BattleDeepData = {
  id: 'gettysburg',
  name: 'Battle of Gettysburg',
  description: `The Battle of Gettysburg was fought July 1-3, 1863, in and around the town of Gettysburg, Pennsylvania.
It was the battle with the largest number of casualties in the American Civil War and is often described as the war's turning point.
Union Major General George Meade's Army of the Potomac defeated attacks by Confederate General Robert E. Lee's Army of Northern Virginia,
ending Lee's second invasion of the North.`,

  startDate: '1863-07-01',
  endDate: '1863-07-03',

  location: {
    lat: 39.8309,
    lng: -77.2311,
    bounds: {
      north: 39.855,
      south: 39.785,
      east: -77.195,
      west: -77.265,
    },
  },

  result: 'union_victory',
  significance: 'Turning point of the Civil War. Ended Confederate invasion of the North. Combined with Vicksburg (July 4), marked the beginning of Confederate decline.',

  forces: {
    union: {
      commander: 'George G. Meade',
      commanderRank: 'Major General',
      armyName: 'Army of the Potomac',
      totalStrength: 93921,
      casualties: {
        killed: 3155,
        wounded: 14529,
        captured: 5365,
        missing: 0,
        total: 23049,
      },
      corps: [
        // ==================== I CORPS ====================
        {
          id: 'union-i-corps',
          name: 'I Corps',
          commander: 'John F. Reynolds',
          strength: 12220,
          divisions: [
            {
              id: 'union-i-1div',
              name: '1st Division',
              commander: 'James S. Wadsworth',
              strength: 3860,
              brigades: [
                {
                  id: 'union-i-1div-1brig',
                  name: '1st Brigade (Iron Brigade)',
                  commander: 'Solomon Meredith',
                  strength: 1829,
                  regiments: [
                    { id: '19th-indiana', name: '19th Indiana', state: 'Indiana', type: 'infantry', strength: 308 },
                    { id: '24th-michigan', name: '24th Michigan', state: 'Michigan', type: 'infantry', strength: 496 },
                    { id: '2nd-wisconsin', name: '2nd Wisconsin', state: 'Wisconsin', type: 'infantry', strength: 302 },
                    { id: '6th-wisconsin', name: '6th Wisconsin', state: 'Wisconsin', type: 'infantry', strength: 344 },
                    { id: '7th-wisconsin', name: '7th Wisconsin', state: 'Wisconsin', type: 'infantry', strength: 364 },
                  ],
                },
                {
                  id: 'union-i-1div-2brig',
                  name: '2nd Brigade',
                  commander: 'Lysander Cutler',
                  strength: 1871,
                  regiments: [
                    { id: '7th-indiana', name: '7th Indiana', state: 'Indiana', type: 'infantry', strength: 434 },
                    { id: '76th-new-york', name: '76th New York', state: 'New York', type: 'infantry', strength: 348 },
                    { id: '84th-new-york', name: '84th New York', state: 'New York', type: 'infantry', strength: 318 },
                    { id: '95th-new-york', name: '95th New York', state: 'New York', type: 'infantry', strength: 314 },
                    { id: '147th-new-york', name: '147th New York', state: 'New York', type: 'infantry', strength: 380 },
                    { id: '56th-pennsylvania', name: '56th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 252 },
                  ],
                },
              ],
            },
            {
              id: 'union-i-2div',
              name: '2nd Division',
              commander: 'John C. Robinson',
              strength: 3000,
              brigades: [
                {
                  id: 'union-i-2div-1brig',
                  name: '1st Brigade',
                  commander: 'Gabriel R. Paul',
                  strength: 1540,
                  regiments: [
                    { id: '16th-maine', name: '16th Maine', state: 'Maine', type: 'infantry', strength: 298 },
                    { id: '13th-massachusetts', name: '13th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 284 },
                    { id: '94th-new-york', name: '94th New York', state: 'New York', type: 'infantry', strength: 411 },
                    { id: '104th-new-york', name: '104th New York', state: 'New York', type: 'infantry', strength: 286 },
                    { id: '107th-pennsylvania', name: '107th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 255 },
                  ],
                },
                {
                  id: 'union-i-2div-2brig',
                  name: '2nd Brigade',
                  commander: 'Henry Baxter',
                  strength: 1460,
                  regiments: [
                    { id: '12th-massachusetts', name: '12th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 261 },
                    { id: '83rd-new-york', name: '83rd New York', state: 'New York', type: 'infantry', strength: 199 },
                    { id: '97th-new-york', name: '97th New York', state: 'New York', type: 'infantry', strength: 236 },
                    { id: '88th-pennsylvania', name: '88th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 340 },
                    { id: '90th-pennsylvania', name: '90th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 208 },
                  ],
                },
              ],
            },
            {
              id: 'union-i-3div',
              name: '3rd Division',
              commander: 'Abner Doubleday',
              strength: 4700,
              brigades: [
                {
                  id: 'union-i-3div-1brig',
                  name: '1st Brigade',
                  commander: 'Chapman Biddle',
                  strength: 1361,
                  regiments: [
                    { id: '80th-new-york', name: '80th New York', state: 'New York', type: 'infantry', strength: 287 },
                    { id: '121st-pennsylvania', name: '121st Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 263 },
                    { id: '142nd-pennsylvania', name: '142nd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 336 },
                    { id: '151st-pennsylvania', name: '151st Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 467 },
                  ],
                },
                {
                  id: 'union-i-3div-2brig',
                  name: '2nd Brigade (Bucktails)',
                  commander: 'Roy Stone',
                  strength: 1317,
                  regiments: [
                    { id: '143rd-pennsylvania', name: '143rd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 465 },
                    { id: '149th-pennsylvania', name: '149th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 450 },
                    { id: '150th-pennsylvania', name: '150th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 400 },
                  ],
                },
                {
                  id: 'union-i-3div-3brig',
                  name: '3rd Brigade (Vermont Brigade)',
                  commander: 'George J. Stannard',
                  strength: 1950,
                  regiments: [
                    { id: '13th-vermont', name: '13th Vermont', state: 'Vermont', type: 'infantry', strength: 636 },
                    { id: '14th-vermont', name: '14th Vermont', state: 'Vermont', type: 'infantry', strength: 647 },
                    { id: '16th-vermont', name: '16th Vermont', state: 'Vermont', type: 'infantry', strength: 661 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== II CORPS ====================
        {
          id: 'union-ii-corps',
          name: 'II Corps',
          commander: 'Winfield S. Hancock',
          strength: 11350,
          divisions: [
            {
              id: 'union-ii-1div',
              name: '1st Division',
              commander: 'John C. Caldwell',
              strength: 3320,
              brigades: [
                {
                  id: 'union-ii-1div-1brig',
                  name: '1st Brigade',
                  commander: 'Edward E. Cross',
                  strength: 855,
                  regiments: [
                    { id: '5th-new-hampshire', name: '5th New Hampshire', state: 'New Hampshire', type: 'infantry', strength: 179 },
                    { id: '61st-new-york', name: '61st New York', state: 'New York', type: 'infantry', strength: 104 },
                    { id: '81st-pennsylvania', name: '81st Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 175 },
                    { id: '148th-pennsylvania', name: '148th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 392 },
                  ],
                },
                {
                  id: 'union-ii-1div-2brig',
                  name: '2nd Brigade (Irish Brigade)',
                  commander: 'Patrick Kelly',
                  strength: 530,
                  regiments: [
                    { id: '28th-massachusetts', name: '28th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 224 },
                    { id: '63rd-new-york', name: '63rd New York', state: 'New York', type: 'infantry', strength: 75 },
                    { id: '69th-new-york', name: '69th New York', state: 'New York', type: 'infantry', strength: 75 },
                    { id: '88th-new-york', name: '88th New York', state: 'New York', type: 'infantry', strength: 90 },
                    { id: '116th-pennsylvania', name: '116th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 66 },
                  ],
                },
                {
                  id: 'union-ii-1div-3brig',
                  name: '3rd Brigade',
                  commander: 'Samuel K. Zook',
                  strength: 975,
                  regiments: [
                    { id: '52nd-new-york', name: '52nd New York', state: 'New York', type: 'infantry', strength: 134 },
                    { id: '57th-new-york', name: '57th New York', state: 'New York', type: 'infantry', strength: 175 },
                    { id: '66th-new-york', name: '66th New York', state: 'New York', type: 'infantry', strength: 147 },
                    { id: '140th-pennsylvania', name: '140th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 515 },
                  ],
                },
                {
                  id: 'union-ii-1div-4brig',
                  name: '4th Brigade',
                  commander: 'John R. Brooke',
                  strength: 1060,
                  regiments: [
                    { id: '27th-connecticut', name: '27th Connecticut', state: 'Connecticut', type: 'infantry', strength: 75 },
                    { id: '2nd-delaware', name: '2nd Delaware', state: 'Delaware', type: 'infantry', strength: 234 },
                    { id: '64th-new-york', name: '64th New York', state: 'New York', type: 'infantry', strength: 204 },
                    { id: '53rd-pennsylvania', name: '53rd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 135 },
                    { id: '145th-pennsylvania', name: '145th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 228 },
                  ],
                },
              ],
            },
            {
              id: 'union-ii-2div',
              name: '2nd Division',
              commander: 'John Gibbon',
              strength: 3610,
              brigades: [
                {
                  id: 'union-ii-2div-1brig',
                  name: '1st Brigade',
                  commander: 'William Harrow',
                  strength: 1365,
                  regiments: [
                    { id: '19th-maine', name: '19th Maine', state: 'Maine', type: 'infantry', strength: 439 },
                    { id: '15th-massachusetts', name: '15th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 239 },
                    { id: '1st-minnesota', name: '1st Minnesota', state: 'Minnesota', type: 'infantry', strength: 330, casualties: 224 },
                    { id: '82nd-new-york', name: '82nd New York', state: 'New York', type: 'infantry', strength: 355 },
                  ],
                },
                {
                  id: 'union-ii-2div-2brig',
                  name: '2nd Brigade (Philadelphia Brigade)',
                  commander: 'Alexander S. Webb',
                  strength: 1225,
                  regiments: [
                    { id: '69th-pennsylvania', name: '69th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 284 },
                    { id: '71st-pennsylvania', name: '71st Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 261 },
                    { id: '72nd-pennsylvania', name: '72nd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 380 },
                    { id: '106th-pennsylvania', name: '106th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 280 },
                  ],
                },
                {
                  id: 'union-ii-2div-3brig',
                  name: '3rd Brigade',
                  commander: 'Norman J. Hall',
                  strength: 920,
                  regiments: [
                    { id: '19th-massachusetts', name: '19th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 163 },
                    { id: '20th-massachusetts', name: '20th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 243 },
                    { id: '7th-michigan', name: '7th Michigan', state: 'Michigan', type: 'infantry', strength: 165 },
                    { id: '42nd-new-york', name: '42nd New York', state: 'New York', type: 'infantry', strength: 197 },
                    { id: '59th-new-york', name: '59th New York', state: 'New York', type: 'infantry', strength: 152 },
                  ],
                },
              ],
            },
            {
              id: 'union-ii-3div',
              name: '3rd Division',
              commander: 'Alexander Hays',
              strength: 3645,
              brigades: [
                {
                  id: 'union-ii-3div-1brig',
                  name: '1st Brigade',
                  commander: 'Samuel S. Carroll',
                  strength: 940,
                  regiments: [
                    { id: '14th-indiana', name: '14th Indiana', state: 'Indiana', type: 'infantry', strength: 189 },
                    { id: '4th-ohio', name: '4th Ohio', state: 'Ohio', type: 'infantry', strength: 299 },
                    { id: '8th-ohio', name: '8th Ohio', state: 'Ohio', type: 'infantry', strength: 209 },
                    { id: '7th-west-virginia', name: '7th West Virginia', state: 'West Virginia', type: 'infantry', strength: 243 },
                  ],
                },
                {
                  id: 'union-ii-3div-2brig',
                  name: '2nd Brigade',
                  commander: 'Thomas A. Smyth',
                  strength: 1105,
                  regiments: [
                    { id: '14th-connecticut', name: '14th Connecticut', state: 'Connecticut', type: 'infantry', strength: 172 },
                    { id: '1st-delaware', name: '1st Delaware', state: 'Delaware', type: 'infantry', strength: 251 },
                    { id: '12th-new-jersey', name: '12th New Jersey', state: 'New Jersey', type: 'infantry', strength: 444 },
                    { id: '108th-new-york', name: '108th New York', state: 'New York', type: 'infantry', strength: 200 },
                  ],
                },
                {
                  id: 'union-ii-3div-3brig',
                  name: '3rd Brigade',
                  commander: 'George L. Willard',
                  strength: 1510,
                  regiments: [
                    { id: '39th-new-york', name: '39th New York', state: 'New York', type: 'infantry', strength: 269 },
                    { id: '111th-new-york', name: '111th New York', state: 'New York', type: 'infantry', strength: 390 },
                    { id: '125th-new-york', name: '125th New York', state: 'New York', type: 'infantry', strength: 392 },
                    { id: '126th-new-york', name: '126th New York', state: 'New York', type: 'infantry', strength: 455 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== III CORPS ====================
        {
          id: 'union-iii-corps',
          name: 'III Corps',
          commander: 'Daniel E. Sickles',
          strength: 10675,
          divisions: [
            {
              id: 'union-iii-1div',
              name: '1st Division',
              commander: 'David B. Birney',
              strength: 5100,
              brigades: [
                {
                  id: 'union-iii-1div-1brig',
                  name: '1st Brigade',
                  commander: 'Charles K. Graham',
                  strength: 1515,
                  regiments: [
                    { id: '57th-pennsylvania', name: '57th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 207 },
                    { id: '63rd-pennsylvania', name: '63rd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 246 },
                    { id: '68th-pennsylvania', name: '68th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 320 },
                    { id: '105th-pennsylvania', name: '105th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 274 },
                    { id: '114th-pennsylvania', name: '114th Pennsylvania (Collis Zouaves)', state: 'Pennsylvania', type: 'infantry', strength: 259 },
                    { id: '141st-pennsylvania', name: '141st Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 209 },
                  ],
                },
                {
                  id: 'union-iii-1div-2brig',
                  name: '2nd Brigade',
                  commander: 'J. H. Hobart Ward',
                  strength: 2190,
                  regiments: [
                    { id: '20th-indiana', name: '20th Indiana', state: 'Indiana', type: 'infantry', strength: 401 },
                    { id: '3rd-maine', name: '3rd Maine', state: 'Maine', type: 'infantry', strength: 210 },
                    { id: '4th-maine', name: '4th Maine', state: 'Maine', type: 'infantry', strength: 287 },
                    { id: '86th-new-york', name: '86th New York', state: 'New York', type: 'infantry', strength: 287 },
                    { id: '124th-new-york', name: '124th New York (Orange Blossoms)', state: 'New York', type: 'infantry', strength: 238 },
                    { id: '99th-pennsylvania', name: '99th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 277 },
                    { id: '1st-usss', name: '1st U.S. Sharpshooters', state: 'United States', type: 'infantry', strength: 313 },
                    { id: '2nd-usss', name: '2nd U.S. Sharpshooters', state: 'United States', type: 'infantry', strength: 169 },
                  ],
                },
                {
                  id: 'union-iii-1div-3brig',
                  name: '3rd Brigade',
                  commander: 'Philippe de Trobriand',
                  strength: 2010,
                  regiments: [
                    { id: '17th-maine', name: '17th Maine', state: 'Maine', type: 'infantry', strength: 350 },
                    { id: '3rd-michigan', name: '3rd Michigan', state: 'Michigan', type: 'infantry', strength: 238 },
                    { id: '5th-michigan', name: '5th Michigan', state: 'Michigan', type: 'infantry', strength: 216 },
                    { id: '40th-new-york', name: '40th New York', state: 'New York', type: 'infantry', strength: 431 },
                    { id: '110th-pennsylvania', name: '110th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 152 },
                  ],
                },
              ],
            },
            {
              id: 'union-iii-2div',
              name: '2nd Division',
              commander: 'Andrew A. Humphreys',
              strength: 4925,
              brigades: [
                {
                  id: 'union-iii-2div-1brig',
                  name: '1st Brigade',
                  commander: 'Joseph B. Carr',
                  strength: 1720,
                  regiments: [
                    { id: '1st-massachusetts', name: '1st Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 321 },
                    { id: '11th-massachusetts', name: '11th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 286 },
                    { id: '16th-massachusetts', name: '16th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 245 },
                    { id: '12th-new-hampshire', name: '12th New Hampshire', state: 'New Hampshire', type: 'infantry', strength: 224 },
                    { id: '11th-new-jersey', name: '11th New Jersey', state: 'New Jersey', type: 'infantry', strength: 275 },
                    { id: '26th-pennsylvania', name: '26th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 365 },
                  ],
                },
                {
                  id: 'union-iii-2div-2brig',
                  name: '2nd Brigade (Excelsior Brigade)',
                  commander: 'William R. Brewster',
                  strength: 1450,
                  regiments: [
                    { id: '70th-new-york', name: '70th New York', state: 'New York', type: 'infantry', strength: 288 },
                    { id: '71st-new-york', name: '71st New York', state: 'New York', type: 'infantry', strength: 243 },
                    { id: '72nd-new-york', name: '72nd New York', state: 'New York', type: 'infantry', strength: 305 },
                    { id: '73rd-new-york', name: '73rd New York', state: 'New York', type: 'infantry', strength: 349 },
                    { id: '74th-new-york', name: '74th New York', state: 'New York', type: 'infantry', strength: 266 },
                    { id: '120th-new-york', name: '120th New York', state: 'New York', type: 'infantry', strength: 383 },
                  ],
                },
                {
                  id: 'union-iii-2div-3brig',
                  name: '3rd Brigade',
                  commander: 'George C. Burling',
                  strength: 1365,
                  regiments: [
                    { id: '2nd-new-hampshire', name: '2nd New Hampshire', state: 'New Hampshire', type: 'infantry', strength: 354 },
                    { id: '5th-new-jersey', name: '5th New Jersey', state: 'New Jersey', type: 'infantry', strength: 206 },
                    { id: '6th-new-jersey', name: '6th New Jersey', state: 'New Jersey', type: 'infantry', strength: 207 },
                    { id: '7th-new-jersey', name: '7th New Jersey', state: 'New Jersey', type: 'infantry', strength: 275 },
                    { id: '8th-new-jersey', name: '8th New Jersey', state: 'New Jersey', type: 'infantry', strength: 170 },
                    { id: '115th-pennsylvania', name: '115th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 153 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== V CORPS ====================
        {
          id: 'union-v-corps',
          name: 'V Corps',
          commander: 'George Sykes',
          strength: 10900,
          divisions: [
            {
              id: 'union-v-1div',
              name: '1st Division',
              commander: 'James Barnes',
              strength: 3420,
              brigades: [
                {
                  id: 'union-v-1div-1brig',
                  name: '1st Brigade',
                  commander: 'William S. Tilton',
                  strength: 655,
                  regiments: [
                    { id: '18th-massachusetts', name: '18th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 139 },
                    { id: '22nd-massachusetts', name: '22nd Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 137 },
                    { id: '1st-michigan', name: '1st Michigan', state: 'Michigan', type: 'infantry', strength: 145 },
                    { id: '118th-pennsylvania', name: '118th Pennsylvania (Corn Exchange)', state: 'Pennsylvania', type: 'infantry', strength: 233 },
                  ],
                },
                {
                  id: 'union-v-1div-2brig',
                  name: '2nd Brigade',
                  commander: 'Jacob B. Sweitzer',
                  strength: 1420,
                  regiments: [
                    { id: '9th-massachusetts', name: '9th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 412 },
                    { id: '32nd-massachusetts', name: '32nd Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 242 },
                    { id: '4th-michigan', name: '4th Michigan', state: 'Michigan', type: 'infantry', strength: 342 },
                    { id: '62nd-pennsylvania', name: '62nd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 426 },
                  ],
                },
                {
                  id: 'union-v-1div-3brig',
                  name: '3rd Brigade',
                  commander: 'Strong Vincent',
                  strength: 1335,
                  regiments: [
                    { id: '20th-maine', name: '20th Maine', state: 'Maine', type: 'infantry', strength: 386 },
                    { id: '16th-michigan', name: '16th Michigan', state: 'Michigan', type: 'infantry', strength: 263 },
                    { id: '44th-new-york', name: '44th New York', state: 'New York', type: 'infantry', strength: 391 },
                    { id: '83rd-pennsylvania', name: '83rd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 295 },
                  ],
                },
              ],
            },
            {
              id: 'union-v-2div',
              name: '2nd Division',
              commander: 'Romeyn B. Ayres',
              strength: 4020,
              brigades: [
                {
                  id: 'union-v-2div-1brig',
                  name: '1st Brigade',
                  commander: 'Hannibal Day',
                  strength: 1575,
                  regiments: [
                    { id: '3rd-us', name: '3rd U.S. Infantry', state: 'United States', type: 'infantry', strength: 300 },
                    { id: '4th-us', name: '4th U.S. Infantry', state: 'United States', type: 'infantry', strength: 163 },
                    { id: '6th-us', name: '6th U.S. Infantry', state: 'United States', type: 'infantry', strength: 150 },
                    { id: '12th-us', name: '12th U.S. Infantry', state: 'United States', type: 'infantry', strength: 416 },
                    { id: '14th-us', name: '14th U.S. Infantry', state: 'United States', type: 'infantry', strength: 546 },
                  ],
                },
                {
                  id: 'union-v-2div-2brig',
                  name: '2nd Brigade',
                  commander: 'Sidney Burbank',
                  strength: 960,
                  regiments: [
                    { id: '2nd-us', name: '2nd U.S. Infantry', state: 'United States', type: 'infantry', strength: 197 },
                    { id: '7th-us', name: '7th U.S. Infantry', state: 'United States', type: 'infantry', strength: 116 },
                    { id: '10th-us', name: '10th U.S. Infantry', state: 'United States', type: 'infantry', strength: 93 },
                    { id: '11th-us', name: '11th U.S. Infantry', state: 'United States', type: 'infantry', strength: 286 },
                    { id: '17th-us', name: '17th U.S. Infantry', state: 'United States', type: 'infantry', strength: 260 },
                  ],
                },
                {
                  id: 'union-v-2div-3brig',
                  name: '3rd Brigade',
                  commander: 'Stephen H. Weed',
                  strength: 1485,
                  regiments: [
                    { id: '140th-new-york', name: '140th New York', state: 'New York', type: 'infantry', strength: 449 },
                    { id: '146th-new-york', name: '146th New York (Garrard Tigers)', state: 'New York', type: 'infantry', strength: 456 },
                    { id: '91st-pennsylvania', name: '91st Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 220 },
                    { id: '155th-pennsylvania', name: '155th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 362 },
                  ],
                },
              ],
            },
            {
              id: 'union-v-3div',
              name: '3rd Division (Pennsylvania Reserves)',
              commander: 'Samuel W. Crawford',
              strength: 2900,
              brigades: [
                {
                  id: 'union-v-3div-1brig',
                  name: '1st Brigade',
                  commander: 'William McCandless',
                  strength: 1240,
                  regiments: [
                    { id: '1st-pa-reserves', name: '1st Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 375 },
                    { id: '2nd-pa-reserves', name: '2nd Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 233 },
                    { id: '6th-pa-reserves', name: '6th Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 324 },
                    { id: '13th-pa-reserves', name: '13th Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 298 },
                  ],
                },
                {
                  id: 'union-v-3div-3brig',
                  name: '3rd Brigade',
                  commander: 'Joseph W. Fisher',
                  strength: 1600,
                  regiments: [
                    { id: '5th-pa-reserves', name: '5th Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 285 },
                    { id: '9th-pa-reserves', name: '9th Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 319 },
                    { id: '10th-pa-reserves', name: '10th Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 401 },
                    { id: '11th-pa-reserves', name: '11th Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 327 },
                    { id: '12th-pa-reserves', name: '12th Pennsylvania Reserves', state: 'Pennsylvania', type: 'infantry', strength: 268 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== VI CORPS ====================
        {
          id: 'union-vi-corps',
          name: 'VI Corps',
          commander: 'John Sedgwick',
          strength: 13600,
          divisions: [
            {
              id: 'union-vi-1div',
              name: '1st Division',
              commander: 'Horatio G. Wright',
              strength: 4210,
              brigades: [
                {
                  id: 'union-vi-1div-1brig',
                  name: '1st Brigade',
                  commander: 'Alfred T. A. Torbert',
                  strength: 1320,
                  regiments: [
                    { id: '1st-new-jersey-vi', name: '1st New Jersey', state: 'New Jersey', type: 'infantry', strength: 330 },
                    { id: '2nd-new-jersey-vi', name: '2nd New Jersey', state: 'New Jersey', type: 'infantry', strength: 330 },
                    { id: '3rd-new-jersey-vi', name: '3rd New Jersey', state: 'New Jersey', type: 'infantry', strength: 330 },
                    { id: '15th-new-jersey-vi', name: '15th New Jersey', state: 'New Jersey', type: 'infantry', strength: 330 },
                  ],
                },
                {
                  id: 'union-vi-1div-2brig',
                  name: '2nd Brigade',
                  commander: 'Joseph J. Bartlett',
                  strength: 1325,
                  regiments: [
                    { id: '5th-maine-vi', name: '5th Maine', state: 'Maine', type: 'infantry', strength: 331 },
                    { id: '121st-new-york-vi', name: '121st New York', state: 'New York', type: 'infantry', strength: 331 },
                    { id: '95th-pennsylvania-vi', name: '95th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 331 },
                    { id: '96th-pennsylvania-vi', name: '96th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 332 },
                  ],
                },
                {
                  id: 'union-vi-1div-3brig',
                  name: '3rd Brigade',
                  commander: 'David A. Russell',
                  strength: 1485,
                  regiments: [
                    { id: '6th-maine-vi', name: '6th Maine', state: 'Maine', type: 'infantry', strength: 371 },
                    { id: '49th-pennsylvania-vi', name: '49th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 371 },
                    { id: '119th-pennsylvania-vi', name: '119th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 371 },
                    { id: '5th-wisconsin-vi', name: '5th Wisconsin', state: 'Wisconsin', type: 'infantry', strength: 372 },
                  ],
                },
              ],
            },
            {
              id: 'union-vi-2div',
              name: '2nd Division',
              commander: 'Albion P. Howe',
              strength: 3610,
              brigades: [
                {
                  id: 'union-vi-2div-2brig',
                  name: '2nd Brigade (Vermont Brigade)',
                  commander: 'Lewis A. Grant',
                  strength: 1830,
                  regiments: [
                    { id: '2nd-vermont-vi', name: '2nd Vermont', state: 'Vermont', type: 'infantry', strength: 366 },
                    { id: '3rd-vermont-vi', name: '3rd Vermont', state: 'Vermont', type: 'infantry', strength: 366 },
                    { id: '4th-vermont-vi', name: '4th Vermont', state: 'Vermont', type: 'infantry', strength: 366 },
                    { id: '5th-vermont-vi', name: '5th Vermont', state: 'Vermont', type: 'infantry', strength: 366 },
                    { id: '6th-vermont-vi', name: '6th Vermont', state: 'Vermont', type: 'infantry', strength: 366 },
                  ],
                },
                {
                  id: 'union-vi-2div-3brig',
                  name: '3rd Brigade',
                  commander: 'Thomas H. Neill',
                  strength: 1775,
                  regiments: [
                    { id: '7th-maine-vi', name: '7th Maine', state: 'Maine', type: 'infantry', strength: 355 },
                    { id: '43rd-new-york-vi', name: '43rd New York', state: 'New York', type: 'infantry', strength: 355 },
                    { id: '49th-new-york-vi', name: '49th New York', state: 'New York', type: 'infantry', strength: 355 },
                    { id: '77th-new-york-vi', name: '77th New York', state: 'New York', type: 'infantry', strength: 355 },
                    { id: '61st-pennsylvania-vi', name: '61st Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 355 },
                  ],
                },
              ],
            },
            {
              id: 'union-vi-3div',
              name: '3rd Division',
              commander: 'Frank Wheaton',
              strength: 4740,
              brigades: [
                {
                  id: 'union-vi-3div-1brig',
                  name: '1st Brigade',
                  commander: 'Alexander Shaler',
                  strength: 1770,
                  regiments: [
                    { id: '65th-new-york-vi', name: '65th New York', state: 'New York', type: 'infantry', strength: 354 },
                    { id: '67th-new-york-vi', name: '67th New York', state: 'New York', type: 'infantry', strength: 354 },
                    { id: '122nd-new-york-vi', name: '122nd New York', state: 'New York', type: 'infantry', strength: 354 },
                    { id: '23rd-pennsylvania-vi', name: '23rd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 354 },
                    { id: '82nd-pennsylvania-vi', name: '82nd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 354 },
                  ],
                },
                {
                  id: 'union-vi-3div-2brig',
                  name: '2nd Brigade',
                  commander: 'Henry L. Eustis',
                  strength: 1595,
                  regiments: [
                    { id: '7th-massachusetts-vi', name: '7th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 399 },
                    { id: '10th-massachusetts-vi', name: '10th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 399 },
                    { id: '37th-massachusetts-vi', name: '37th Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 399 },
                    { id: '2nd-rhode-island-vi', name: '2nd Rhode Island', state: 'Rhode Island', type: 'infantry', strength: 398 },
                  ],
                },
                {
                  id: 'union-vi-3div-3brig',
                  name: '3rd Brigade',
                  commander: 'David J. Nevin',
                  strength: 1370,
                  regiments: [
                    { id: '62nd-new-york-vi', name: '62nd New York', state: 'New York', type: 'infantry', strength: 274 },
                    { id: '93rd-pennsylvania-vi', name: '93rd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 274 },
                    { id: '98th-pennsylvania-vi', name: '98th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 274 },
                    { id: '102nd-pennsylvania-vi', name: '102nd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 274 },
                    { id: '139th-pennsylvania-vi', name: '139th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 274 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== XI CORPS ====================
        {
          id: 'union-xi-corps',
          name: 'XI Corps',
          commander: 'Oliver O. Howard',
          strength: 9190,
          divisions: [
            {
              id: 'union-xi-1div',
              name: '1st Division',
              commander: 'Francis C. Barlow',
              strength: 2480,
              brigades: [
                {
                  id: 'union-xi-1div-1brig',
                  name: '1st Brigade',
                  commander: 'Leopold von Gilsa',
                  strength: 1135,
                  regiments: [
                    { id: '41st-new-york-xi', name: '41st New York', state: 'New York', type: 'infantry', strength: 218 },
                    { id: '54th-new-york-xi', name: '54th New York', state: 'New York', type: 'infantry', strength: 189 },
                    { id: '68th-new-york-xi', name: '68th New York', state: 'New York', type: 'infantry', strength: 232 },
                    { id: '153rd-pennsylvania-xi', name: '153rd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 496 },
                  ],
                },
                {
                  id: 'union-xi-1div-2brig',
                  name: '2nd Brigade',
                  commander: 'Adelbert Ames',
                  strength: 1335,
                  regiments: [
                    { id: '17th-connecticut-xi', name: '17th Connecticut', state: 'Connecticut', type: 'infantry', strength: 386 },
                    { id: '25th-ohio-xi', name: '25th Ohio', state: 'Ohio', type: 'infantry', strength: 220 },
                    { id: '75th-ohio-xi', name: '75th Ohio', state: 'Ohio', type: 'infantry', strength: 275 },
                    { id: '107th-ohio-xi', name: '107th Ohio', state: 'Ohio', type: 'infantry', strength: 454 },
                  ],
                },
              ],
            },
            {
              id: 'union-xi-2div',
              name: '2nd Division',
              commander: 'Adolph von Steinwehr',
              strength: 2860,
              brigades: [
                {
                  id: 'union-xi-2div-1brig',
                  name: '1st Brigade',
                  commander: 'Charles R. Coster',
                  strength: 1215,
                  regiments: [
                    { id: '134th-new-york-xi', name: '134th New York', state: 'New York', type: 'infantry', strength: 400 },
                    { id: '154th-new-york-xi', name: '154th New York', state: 'New York', type: 'infantry', strength: 240 },
                    { id: '27th-pennsylvania-xi', name: '27th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 300 },
                    { id: '73rd-pennsylvania-xi', name: '73rd Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 275 },
                  ],
                },
                {
                  id: 'union-xi-2div-2brig',
                  name: '2nd Brigade',
                  commander: 'Orland Smith',
                  strength: 1640,
                  regiments: [
                    { id: '33rd-massachusetts-xi', name: '33rd Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 478 },
                    { id: '136th-new-york-xi', name: '136th New York', state: 'New York', type: 'infantry', strength: 484 },
                    { id: '55th-ohio-xi', name: '55th Ohio', state: 'Ohio', type: 'infantry', strength: 320 },
                    { id: '73rd-ohio-xi', name: '73rd Ohio', state: 'Ohio', type: 'infantry', strength: 358 },
                  ],
                },
              ],
            },
            {
              id: 'union-xi-3div',
              name: '3rd Division',
              commander: 'Carl Schurz',
              strength: 3110,
              brigades: [
                {
                  id: 'union-xi-3div-1brig',
                  name: '1st Brigade',
                  commander: 'Alexander Schimmelfennig',
                  strength: 1680,
                  regiments: [
                    { id: '82nd-illinois-xi', name: '82nd Illinois', state: 'Illinois', type: 'infantry', strength: 318 },
                    { id: '45th-new-york-xi', name: '45th New York', state: 'New York', type: 'infantry', strength: 375 },
                    { id: '157th-new-york-xi', name: '157th New York', state: 'New York', type: 'infantry', strength: 409 },
                    { id: '61st-ohio-xi', name: '61st Ohio', state: 'Ohio', type: 'infantry', strength: 309 },
                    { id: '74th-pennsylvania-xi', name: '74th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 269 },
                  ],
                },
                {
                  id: 'union-xi-3div-2brig',
                  name: '2nd Brigade',
                  commander: 'Wladimir Krzyzanowski',
                  strength: 1420,
                  regiments: [
                    { id: '58th-new-york-xi', name: '58th New York', state: 'New York', type: 'infantry', strength: 199 },
                    { id: '119th-new-york-xi', name: '119th New York', state: 'New York', type: 'infantry', strength: 262 },
                    { id: '82nd-ohio-xi', name: '82nd Ohio', state: 'Ohio', type: 'infantry', strength: 312 },
                    { id: '75th-pennsylvania-xi', name: '75th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 208 },
                    { id: '26th-wisconsin-xi', name: '26th Wisconsin', state: 'Wisconsin', type: 'infantry', strength: 440 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== XII CORPS ====================
        {
          id: 'union-xii-corps',
          name: 'XII Corps',
          commander: 'Henry W. Slocum',
          strength: 9700,
          divisions: [
            {
              id: 'union-xii-1div',
              name: '1st Division',
              commander: 'Alpheus S. Williams',
              strength: 5255,
              brigades: [
                {
                  id: 'union-xii-1div-1brig',
                  name: '1st Brigade',
                  commander: 'Archibald L. McDougall',
                  strength: 1835,
                  regiments: [
                    { id: '5th-connecticut-xii', name: '5th Connecticut', state: 'Connecticut', type: 'infantry', strength: 221 },
                    { id: '20th-connecticut-xii', name: '20th Connecticut', state: 'Connecticut', type: 'infantry', strength: 321 },
                    { id: '3rd-maryland-xii', name: '3rd Maryland', state: 'Maryland', type: 'infantry', strength: 290 },
                    { id: '123rd-new-york-xii', name: '123rd New York', state: 'New York', type: 'infantry', strength: 495 },
                    { id: '145th-new-york-xii', name: '145th New York', state: 'New York', type: 'infantry', strength: 219 },
                    { id: '46th-pennsylvania-xii', name: '46th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 262 },
                  ],
                },
                {
                  id: 'union-xii-1div-2brig',
                  name: '2nd Brigade',
                  commander: 'Henry H. Lockwood',
                  strength: 1815,
                  regiments: [
                    { id: '1st-md-potomac-xii', name: '1st Maryland Potomac Home Brigade', state: 'Maryland', type: 'infantry', strength: 696 },
                    { id: '1st-md-eastern-xii', name: '1st Maryland Eastern Shore', state: 'Maryland', type: 'infantry', strength: 532 },
                    { id: '150th-new-york-xii', name: '150th New York', state: 'New York', type: 'infantry', strength: 587 },
                  ],
                },
                {
                  id: 'union-xii-1div-3brig',
                  name: '3rd Brigade',
                  commander: 'Thomas H. Ruger',
                  strength: 1600,
                  regiments: [
                    { id: '27th-indiana-xii', name: '27th Indiana', state: 'Indiana', type: 'infantry', strength: 339 },
                    { id: '2nd-massachusetts-xii', name: '2nd Massachusetts', state: 'Massachusetts', type: 'infantry', strength: 316 },
                    { id: '13th-new-jersey-xii', name: '13th New Jersey', state: 'New Jersey', type: 'infantry', strength: 336 },
                    { id: '107th-new-york-xii', name: '107th New York', state: 'New York', type: 'infantry', strength: 319 },
                    { id: '3rd-wisconsin-xii', name: '3rd Wisconsin', state: 'Wisconsin', type: 'infantry', strength: 290 },
                  ],
                },
              ],
            },
            {
              id: 'union-xii-2div',
              name: '2nd Division',
              commander: 'John W. Geary',
              strength: 3965,
              brigades: [
                {
                  id: 'union-xii-2div-1brig',
                  name: '1st Brigade',
                  commander: 'Charles Candy',
                  strength: 1800,
                  regiments: [
                    { id: '5th-ohio-xii', name: '5th Ohio', state: 'Ohio', type: 'infantry', strength: 292 },
                    { id: '7th-ohio-xii', name: '7th Ohio', state: 'Ohio', type: 'infantry', strength: 282 },
                    { id: '29th-ohio-xii', name: '29th Ohio', state: 'Ohio', type: 'infantry', strength: 308 },
                    { id: '66th-ohio-xii', name: '66th Ohio', state: 'Ohio', type: 'infantry', strength: 313 },
                    { id: '28th-pennsylvania-xii', name: '28th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 303 },
                    { id: '147th-pennsylvania-xii', name: '147th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 302 },
                  ],
                },
                {
                  id: 'union-xii-2div-2brig',
                  name: '2nd Brigade',
                  commander: 'Thomas L. Kane',
                  strength: 700,
                  regiments: [
                    { id: '29th-pennsylvania-xii', name: '29th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 233 },
                    { id: '109th-pennsylvania-xii', name: '109th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 233 },
                    { id: '111th-pennsylvania-xii', name: '111th Pennsylvania', state: 'Pennsylvania', type: 'infantry', strength: 234 },
                  ],
                },
                {
                  id: 'union-xii-2div-3brig',
                  name: '3rd Brigade',
                  commander: 'George S. Greene',
                  strength: 1425,
                  regiments: [
                    { id: '60th-new-york-xii', name: '60th New York', state: 'New York', type: 'infantry', strength: 285 },
                    { id: '78th-new-york-xii', name: '78th New York', state: 'New York', type: 'infantry', strength: 285 },
                    { id: '102nd-new-york-xii', name: '102nd New York', state: 'New York', type: 'infantry', strength: 285 },
                    { id: '137th-new-york-xii', name: '137th New York', state: 'New York', type: 'infantry', strength: 285 },
                    { id: '149th-new-york-xii', name: '149th New York', state: 'New York', type: 'infantry', strength: 285 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== CAVALRY CORPS ====================
        {
          id: 'union-cavalry-corps',
          name: 'Cavalry Corps',
          commander: 'Alfred Pleasonton',
          strength: 11850,
          divisions: [
            {
              id: 'union-cav-1div',
              name: '1st Division',
              commander: 'John Buford',
              strength: 4075,
              brigades: [
                {
                  id: 'union-cav-1div-1brig',
                  name: '1st Brigade',
                  commander: 'William Gamble',
                  strength: 1600,
                  regiments: [
                    { id: '8th-illinois-cav', name: '8th Illinois Cavalry', state: 'Illinois', type: 'cavalry', strength: 472 },
                    { id: '12th-illinois-cav', name: '12th Illinois Cavalry', state: 'Illinois', type: 'cavalry', strength: 293 },
                    { id: '3rd-indiana-cav', name: '3rd Indiana Cavalry', state: 'Indiana', type: 'cavalry', strength: 320 },
                    { id: '8th-new-york-cav', name: '8th New York Cavalry', state: 'New York', type: 'cavalry', strength: 515 },
                  ],
                },
                {
                  id: 'union-cav-1div-2brig',
                  name: '2nd Brigade',
                  commander: 'Thomas C. Devin',
                  strength: 1150,
                  regiments: [
                    { id: '6th-new-york-cav', name: '6th New York Cavalry', state: 'New York', type: 'cavalry', strength: 247 },
                    { id: '9th-new-york-cav', name: '9th New York Cavalry', state: 'New York', type: 'cavalry', strength: 380 },
                    { id: '17th-pennsylvania-cav', name: '17th Pennsylvania Cavalry', state: 'Pennsylvania', type: 'cavalry', strength: 464 },
                    { id: '3rd-west-virginia-cav', name: '3rd West Virginia Cavalry', state: 'West Virginia', type: 'cavalry', strength: 59 },
                  ],
                },
                {
                  id: 'union-cav-1div-reserve',
                  name: 'Reserve Brigade',
                  commander: 'Wesley Merritt',
                  strength: 1320,
                  regiments: [
                    { id: '6th-pennsylvania-cav', name: '6th Pennsylvania Cavalry', state: 'Pennsylvania', type: 'cavalry', strength: 383 },
                    { id: '1st-us-cav', name: '1st U.S. Cavalry', state: 'United States', type: 'cavalry', strength: 235 },
                    { id: '2nd-us-cav', name: '2nd U.S. Cavalry', state: 'United States', type: 'cavalry', strength: 236 },
                    { id: '5th-us-cav', name: '5th U.S. Cavalry', state: 'United States', type: 'cavalry', strength: 233 },
                    { id: '6th-us-cav', name: '6th U.S. Cavalry', state: 'United States', type: 'cavalry', strength: 233 },
                  ],
                },
              ],
            },
            {
              id: 'union-cav-2div',
              name: '2nd Division',
              commander: 'David McM. Gregg',
              strength: 2615,
              brigades: [
                {
                  id: 'union-cav-2div-1brig',
                  name: '1st Brigade',
                  commander: 'John B. McIntosh',
                  strength: 1310,
                  regiments: [
                    { id: '1st-maryland-cav', name: '1st Maryland Cavalry', state: 'Maryland', type: 'cavalry', strength: 280 },
                    { id: '1st-new-jersey-cav', name: '1st New Jersey Cavalry', state: 'New Jersey', type: 'cavalry', strength: 318 },
                    { id: '3rd-pennsylvania-cav', name: '3rd Pennsylvania Cavalry', state: 'Pennsylvania', type: 'cavalry', strength: 349 },
                    { id: 'purnell-legion-cav', name: 'Purnell Legion Cavalry', state: 'Maryland', type: 'cavalry', strength: 250 },
                  ],
                },
                {
                  id: 'union-cav-2div-3brig',
                  name: '3rd Brigade',
                  commander: 'J. Irvin Gregg',
                  strength: 1265,
                  regiments: [
                    { id: '1st-maine-cav', name: '1st Maine Cavalry', state: 'Maine', type: 'cavalry', strength: 307 },
                    { id: '10th-new-york-cav', name: '10th New York Cavalry', state: 'New York', type: 'cavalry', strength: 437 },
                    { id: '4th-pennsylvania-cav', name: '4th Pennsylvania Cavalry', state: 'Pennsylvania', type: 'cavalry', strength: 325 },
                    { id: '16th-pennsylvania-cav', name: '16th Pennsylvania Cavalry', state: 'Pennsylvania', type: 'cavalry', strength: 196 },
                  ],
                },
              ],
            },
            {
              id: 'union-cav-3div',
              name: '3rd Division',
              commander: 'Judson Kilpatrick',
              strength: 3900,
              brigades: [
                {
                  id: 'union-cav-3div-1brig',
                  name: '1st Brigade',
                  commander: 'Elon J. Farnsworth',
                  strength: 1925,
                  regiments: [
                    { id: '5th-new-york-cav', name: '5th New York Cavalry', state: 'New York', type: 'cavalry', strength: 472 },
                    { id: '18th-pennsylvania-cav', name: '18th Pennsylvania Cavalry', state: 'Pennsylvania', type: 'cavalry', strength: 509 },
                    { id: '1st-vermont-cav', name: '1st Vermont Cavalry', state: 'Vermont', type: 'cavalry', strength: 600 },
                    { id: '1st-west-virginia-cav', name: '1st West Virginia Cavalry', state: 'West Virginia', type: 'cavalry', strength: 344 },
                  ],
                },
                {
                  id: 'union-cav-3div-2brig',
                  name: '2nd Brigade (Michigan Brigade)',
                  commander: 'George A. Custer',
                  strength: 1935,
                  regiments: [
                    { id: '1st-michigan-cav', name: '1st Michigan Cavalry', state: 'Michigan', type: 'cavalry', strength: 427 },
                    { id: '5th-michigan-cav', name: '5th Michigan Cavalry', state: 'Michigan', type: 'cavalry', strength: 654 },
                    { id: '6th-michigan-cav', name: '6th Michigan Cavalry', state: 'Michigan', type: 'cavalry', strength: 477 },
                    { id: '7th-michigan-cav', name: '7th Michigan Cavalry', state: 'Michigan', type: 'cavalry', strength: 377 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    confederate: {
      commander: 'Robert E. Lee',
      commanderRank: 'General',
      armyName: 'Army of Northern Virginia',
      totalStrength: 71699,
      casualties: {
        killed: 3903,
        wounded: 18735,
        captured: 5425,
        missing: 0,
        total: 28063,
      },
      corps: [
        // ==================== FIRST CORPS (LONGSTREET) ====================
        {
          id: 'csa-first-corps',
          name: 'First Corps',
          commander: 'James Longstreet',
          strength: 20700,
          divisions: [
            {
              id: 'csa-first-mclaws',
              name: "McLaws' Division",
              commander: 'Lafayette McLaws',
              strength: 6900,
              brigades: [
                {
                  id: 'csa-kershaw-brigade',
                  name: "Kershaw's Brigade",
                  commander: 'Joseph B. Kershaw',
                  strength: 2180,
                  regiments: [
                    { id: '2nd-south-carolina', name: '2nd South Carolina', state: 'South Carolina', type: 'infantry', strength: 412 },
                    { id: '3rd-south-carolina', name: '3rd South Carolina', state: 'South Carolina', type: 'infantry', strength: 406 },
                    { id: '7th-south-carolina', name: '7th South Carolina', state: 'South Carolina', type: 'infantry', strength: 408 },
                    { id: '8th-south-carolina', name: '8th South Carolina', state: 'South Carolina', type: 'infantry', strength: 300 },
                    { id: '15th-south-carolina', name: '15th South Carolina', state: 'South Carolina', type: 'infantry', strength: 348 },
                    { id: '3rd-sc-battalion', name: '3rd South Carolina Battalion', state: 'South Carolina', type: 'infantry', strength: 306 },
                  ],
                },
                {
                  id: 'csa-semmes-brigade',
                  name: "Semmes' Brigade",
                  commander: 'Paul J. Semmes',
                  strength: 1330,
                  regiments: [
                    { id: '10th-georgia', name: '10th Georgia', state: 'Georgia', type: 'infantry', strength: 303 },
                    { id: '50th-georgia', name: '50th Georgia', state: 'Georgia', type: 'infantry', strength: 302 },
                    { id: '51st-georgia', name: '51st Georgia', state: 'Georgia', type: 'infantry', strength: 378 },
                    { id: '53rd-georgia', name: '53rd Georgia', state: 'Georgia', type: 'infantry', strength: 347 },
                  ],
                },
                {
                  id: 'csa-barksdale-brigade',
                  name: "Barksdale's Brigade",
                  commander: 'William Barksdale',
                  strength: 1620,
                  regiments: [
                    { id: '13th-mississippi', name: '13th Mississippi', state: 'Mississippi', type: 'infantry', strength: 481 },
                    { id: '17th-mississippi', name: '17th Mississippi', state: 'Mississippi', type: 'infantry', strength: 401 },
                    { id: '18th-mississippi', name: '18th Mississippi', state: 'Mississippi', type: 'infantry', strength: 357 },
                    { id: '21st-mississippi', name: '21st Mississippi', state: 'Mississippi', type: 'infantry', strength: 381 },
                  ],
                },
                {
                  id: 'csa-wofford-brigade',
                  name: "Wofford's Brigade",
                  commander: 'William T. Wofford',
                  strength: 1400,
                  regiments: [
                    { id: '16th-georgia', name: '16th Georgia', state: 'Georgia', type: 'infantry', strength: 303 },
                    { id: '18th-georgia', name: '18th Georgia', state: 'Georgia', type: 'infantry', strength: 302 },
                    { id: '24th-georgia', name: '24th Georgia', state: 'Georgia', type: 'infantry', strength: 278 },
                    { id: 'cobbs-legion', name: "Cobb's Legion", state: 'Georgia', type: 'infantry', strength: 212 },
                    { id: 'phillips-legion', name: "Phillips' Legion", state: 'Georgia', type: 'infantry', strength: 274 },
                  ],
                },
              ],
            },
            {
              id: 'csa-first-pickett',
              name: "Pickett's Division",
              commander: 'George E. Pickett',
              strength: 5475,
              brigades: [
                {
                  id: 'csa-garnett-brigade',
                  name: "Garnett's Brigade",
                  commander: 'Richard B. Garnett',
                  strength: 1460,
                  regiments: [
                    { id: '8th-virginia', name: '8th Virginia', state: 'Virginia', type: 'infantry', strength: 193 },
                    { id: '18th-virginia', name: '18th Virginia', state: 'Virginia', type: 'infantry', strength: 312 },
                    { id: '19th-virginia', name: '19th Virginia', state: 'Virginia', type: 'infantry', strength: 328 },
                    { id: '28th-virginia', name: '28th Virginia', state: 'Virginia', type: 'infantry', strength: 330 },
                    { id: '56th-virginia', name: '56th Virginia', state: 'Virginia', type: 'infantry', strength: 296 },
                  ],
                },
                {
                  id: 'csa-kemper-brigade',
                  name: "Kemper's Brigade",
                  commander: 'James L. Kemper',
                  strength: 1630,
                  regiments: [
                    { id: '1st-virginia', name: '1st Virginia', state: 'Virginia', type: 'infantry', strength: 209 },
                    { id: '3rd-virginia', name: '3rd Virginia', state: 'Virginia', type: 'infantry', strength: 332 },
                    { id: '7th-virginia', name: '7th Virginia', state: 'Virginia', type: 'infantry', strength: 335 },
                    { id: '11th-virginia', name: '11th Virginia', state: 'Virginia', type: 'infantry', strength: 359 },
                    { id: '24th-virginia', name: '24th Virginia', state: 'Virginia', type: 'infantry', strength: 395 },
                  ],
                },
                {
                  id: 'csa-armistead-brigade',
                  name: "Armistead's Brigade",
                  commander: 'Lewis A. Armistead',
                  strength: 1950,
                  regiments: [
                    { id: '9th-virginia', name: '9th Virginia', state: 'Virginia', type: 'infantry', strength: 258 },
                    { id: '14th-virginia', name: '14th Virginia', state: 'Virginia', type: 'infantry', strength: 422 },
                    { id: '38th-virginia', name: '38th Virginia', state: 'Virginia', type: 'infantry', strength: 356 },
                    { id: '53rd-virginia', name: '53rd Virginia', state: 'Virginia', type: 'infantry', strength: 435 },
                    { id: '57th-virginia', name: '57th Virginia', state: 'Virginia', type: 'infantry', strength: 479 },
                  ],
                },
              ],
            },
            {
              id: 'csa-first-hood',
              name: "Hood's Division",
              commander: 'John B. Hood',
              strength: 7380,
              brigades: [
                {
                  id: 'csa-law-brigade',
                  name: "Law's Brigade",
                  commander: 'Evander M. Law',
                  strength: 1930,
                  regiments: [
                    { id: '4th-alabama', name: '4th Alabama', state: 'Alabama', type: 'infantry', strength: 346 },
                    { id: '15th-alabama', name: '15th Alabama', state: 'Alabama', type: 'infantry', strength: 499 },
                    { id: '44th-alabama', name: '44th Alabama', state: 'Alabama', type: 'infantry', strength: 363 },
                    { id: '47th-alabama', name: '47th Alabama', state: 'Alabama', type: 'infantry', strength: 347 },
                    { id: '48th-alabama', name: '48th Alabama', state: 'Alabama', type: 'infantry', strength: 375 },
                  ],
                },
                {
                  id: 'csa-robertson-brigade',
                  name: "Robertson's Brigade (Texas Brigade)",
                  commander: 'Jerome B. Robertson',
                  strength: 1730,
                  regiments: [
                    { id: '3rd-arkansas', name: '3rd Arkansas', state: 'Arkansas', type: 'infantry', strength: 479 },
                    { id: '1st-texas', name: '1st Texas', state: 'Texas', type: 'infantry', strength: 426 },
                    { id: '4th-texas', name: '4th Texas', state: 'Texas', type: 'infantry', strength: 415 },
                    { id: '5th-texas', name: '5th Texas', state: 'Texas', type: 'infantry', strength: 410 },
                  ],
                },
                {
                  id: 'csa-anderson-brigade',
                  name: "Anderson's Brigade",
                  commander: 'George T. Anderson',
                  strength: 1870,
                  regiments: [
                    { id: '7th-georgia', name: '7th Georgia', state: 'Georgia', type: 'infantry', strength: 377 },
                    { id: '8th-georgia', name: '8th Georgia', state: 'Georgia', type: 'infantry', strength: 312 },
                    { id: '9th-georgia', name: '9th Georgia', state: 'Georgia', type: 'infantry', strength: 340 },
                    { id: '11th-georgia', name: '11th Georgia', state: 'Georgia', type: 'infantry', strength: 310 },
                    { id: '59th-georgia', name: '59th Georgia', state: 'Georgia', type: 'infantry', strength: 525 },
                  ],
                },
                {
                  id: 'csa-benning-brigade',
                  name: "Benning's Brigade",
                  commander: 'Henry L. Benning',
                  strength: 1420,
                  regiments: [
                    { id: '2nd-georgia', name: '2nd Georgia', state: 'Georgia', type: 'infantry', strength: 348 },
                    { id: '15th-georgia', name: '15th Georgia', state: 'Georgia', type: 'infantry', strength: 368 },
                    { id: '17th-georgia', name: '17th Georgia', state: 'Georgia', type: 'infantry', strength: 350 },
                    { id: '20th-georgia', name: '20th Georgia', state: 'Georgia', type: 'infantry', strength: 354 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== SECOND CORPS (EWELL) ====================
        {
          id: 'csa-second-corps',
          name: 'Second Corps',
          commander: 'Richard S. Ewell',
          strength: 20700,
          divisions: [
            {
              id: 'csa-second-early',
              name: "Early's Division",
              commander: 'Jubal A. Early',
              strength: 5460,
              brigades: [
                {
                  id: 'csa-hays-brigade',
                  name: "Hays' Brigade (Louisiana Tigers)",
                  commander: 'Harry T. Hays',
                  strength: 1300,
                  regiments: [
                    { id: '5th-louisiana', name: '5th Louisiana', state: 'Louisiana', type: 'infantry', strength: 260 },
                    { id: '6th-louisiana', name: '6th Louisiana', state: 'Louisiana', type: 'infantry', strength: 260 },
                    { id: '7th-louisiana', name: '7th Louisiana', state: 'Louisiana', type: 'infantry', strength: 260 },
                    { id: '8th-louisiana', name: '8th Louisiana', state: 'Louisiana', type: 'infantry', strength: 260 },
                    { id: '9th-louisiana', name: '9th Louisiana', state: 'Louisiana', type: 'infantry', strength: 260 },
                  ],
                },
                {
                  id: 'csa-hoke-brigade',
                  name: "Hoke's Brigade (Avery's)",
                  commander: 'Isaac E. Avery',
                  strength: 1240,
                  regiments: [
                    { id: '6th-north-carolina', name: '6th North Carolina', state: 'North Carolina', type: 'infantry', strength: 414 },
                    { id: '21st-north-carolina', name: '21st North Carolina', state: 'North Carolina', type: 'infantry', strength: 413 },
                    { id: '57th-north-carolina', name: '57th North Carolina', state: 'North Carolina', type: 'infantry', strength: 413 },
                  ],
                },
                {
                  id: 'csa-gordon-brigade',
                  name: "Gordon's Brigade",
                  commander: 'John B. Gordon',
                  strength: 1810,
                  regiments: [
                    { id: '13th-georgia', name: '13th Georgia', state: 'Georgia', type: 'infantry', strength: 312 },
                    { id: '26th-georgia', name: '26th Georgia', state: 'Georgia', type: 'infantry', strength: 315 },
                    { id: '31st-georgia', name: '31st Georgia', state: 'Georgia', type: 'infantry', strength: 252 },
                    { id: '38th-georgia', name: '38th Georgia', state: 'Georgia', type: 'infantry', strength: 341 },
                    { id: '60th-georgia', name: '60th Georgia', state: 'Georgia', type: 'infantry', strength: 300 },
                    { id: '61st-georgia', name: '61st Georgia', state: 'Georgia', type: 'infantry', strength: 290 },
                  ],
                },
                {
                  id: 'csa-smith-brigade',
                  name: "Smith's Brigade",
                  commander: 'William Smith',
                  strength: 800,
                  regiments: [
                    { id: '31st-virginia', name: '31st Virginia', state: 'Virginia', type: 'infantry', strength: 160 },
                    { id: '49th-virginia', name: '49th Virginia', state: 'Virginia', type: 'infantry', strength: 160 },
                    { id: '52nd-virginia', name: '52nd Virginia', state: 'Virginia', type: 'infantry', strength: 160 },
                    { id: '58th-virginia', name: '58th Virginia', state: 'Virginia', type: 'infantry', strength: 160 },
                    { id: '13th-virginia-cav', name: '13th Virginia Cavalry (detachment)', state: 'Virginia', type: 'cavalry', strength: 160 },
                  ],
                },
              ],
            },
            {
              id: 'csa-second-johnson',
              name: "Johnson's Division",
              commander: 'Edward Johnson',
              strength: 6430,
              brigades: [
                {
                  id: 'csa-steuart-brigade',
                  name: "Steuart's Brigade",
                  commander: 'George H. Steuart',
                  strength: 2120,
                  regiments: [
                    { id: '1st-maryland-csa', name: '1st Maryland Battalion', state: 'Maryland', type: 'infantry', strength: 400 },
                    { id: '1st-nc-csa', name: '1st North Carolina', state: 'North Carolina', type: 'infantry', strength: 372 },
                    { id: '3rd-nc-csa', name: '3rd North Carolina', state: 'North Carolina', type: 'infantry', strength: 448 },
                    { id: '10th-virginia-johnson', name: '10th Virginia', state: 'Virginia', type: 'infantry', strength: 250 },
                    { id: '23rd-virginia', name: '23rd Virginia', state: 'Virginia', type: 'infantry', strength: 300 },
                    { id: '37th-virginia', name: '37th Virginia', state: 'Virginia', type: 'infantry', strength: 350 },
                  ],
                },
                {
                  id: 'csa-nicholls-brigade',
                  name: "Nicholls' Brigade",
                  commander: 'Jesse M. Williams',
                  strength: 1100,
                  regiments: [
                    { id: '1st-louisiana', name: '1st Louisiana', state: 'Louisiana', type: 'infantry', strength: 220 },
                    { id: '2nd-louisiana', name: '2nd Louisiana', state: 'Louisiana', type: 'infantry', strength: 220 },
                    { id: '10th-louisiana', name: '10th Louisiana', state: 'Louisiana', type: 'infantry', strength: 220 },
                    { id: '14th-louisiana', name: '14th Louisiana', state: 'Louisiana', type: 'infantry', strength: 220 },
                    { id: '15th-louisiana', name: '15th Louisiana', state: 'Louisiana', type: 'infantry', strength: 220 },
                  ],
                },
                {
                  id: 'csa-stonewall-brigade',
                  name: 'Stonewall Brigade',
                  commander: 'James A. Walker',
                  strength: 1320,
                  regiments: [
                    { id: '2nd-virginia', name: '2nd Virginia', state: 'Virginia', type: 'infantry', strength: 264 },
                    { id: '4th-virginia', name: '4th Virginia', state: 'Virginia', type: 'infantry', strength: 264 },
                    { id: '5th-virginia', name: '5th Virginia', state: 'Virginia', type: 'infantry', strength: 264 },
                    { id: '27th-virginia', name: '27th Virginia', state: 'Virginia', type: 'infantry', strength: 264 },
                    { id: '33rd-virginia', name: '33rd Virginia', state: 'Virginia', type: 'infantry', strength: 264 },
                  ],
                },
                {
                  id: 'csa-jones-brigade',
                  name: "Jones' Brigade",
                  commander: 'John M. Jones',
                  strength: 1520,
                  regiments: [
                    { id: '21st-virginia', name: '21st Virginia', state: 'Virginia', type: 'infantry', strength: 253 },
                    { id: '25th-virginia', name: '25th Virginia', state: 'Virginia', type: 'infantry', strength: 253 },
                    { id: '42nd-virginia', name: '42nd Virginia', state: 'Virginia', type: 'infantry', strength: 253 },
                    { id: '44th-virginia', name: '44th Virginia', state: 'Virginia', type: 'infantry', strength: 253 },
                    { id: '48th-virginia', name: '48th Virginia', state: 'Virginia', type: 'infantry', strength: 253 },
                    { id: '50th-virginia', name: '50th Virginia', state: 'Virginia', type: 'infantry', strength: 255 },
                  ],
                },
              ],
            },
            {
              id: 'csa-second-rodes',
              name: "Rodes' Division",
              commander: 'Robert E. Rodes',
              strength: 7980,
              brigades: [
                {
                  id: 'csa-daniel-brigade',
                  name: "Daniel's Brigade",
                  commander: 'Junius Daniel',
                  strength: 2160,
                  regiments: [
                    { id: '32nd-nc', name: '32nd North Carolina', state: 'North Carolina', type: 'infantry', strength: 432 },
                    { id: '43rd-nc', name: '43rd North Carolina', state: 'North Carolina', type: 'infantry', strength: 432 },
                    { id: '45th-nc', name: '45th North Carolina', state: 'North Carolina', type: 'infantry', strength: 432 },
                    { id: '53rd-nc', name: '53rd North Carolina', state: 'North Carolina', type: 'infantry', strength: 432 },
                    { id: '2nd-nc-battalion', name: '2nd North Carolina Battalion', state: 'North Carolina', type: 'infantry', strength: 432 },
                  ],
                },
                {
                  id: 'csa-iverson-brigade',
                  name: "Iverson's Brigade",
                  commander: 'Alfred Iverson',
                  strength: 1380,
                  regiments: [
                    { id: '5th-nc', name: '5th North Carolina', state: 'North Carolina', type: 'infantry', strength: 345 },
                    { id: '12th-nc', name: '12th North Carolina', state: 'North Carolina', type: 'infantry', strength: 345 },
                    { id: '20th-nc', name: '20th North Carolina', state: 'North Carolina', type: 'infantry', strength: 345 },
                    { id: '23rd-nc', name: '23rd North Carolina', state: 'North Carolina', type: 'infantry', strength: 345 },
                  ],
                },
                {
                  id: 'csa-doles-brigade',
                  name: "Doles' Brigade",
                  commander: 'George P. Doles',
                  strength: 1320,
                  regiments: [
                    { id: '4th-georgia', name: '4th Georgia', state: 'Georgia', type: 'infantry', strength: 330 },
                    { id: '12th-georgia', name: '12th Georgia', state: 'Georgia', type: 'infantry', strength: 330 },
                    { id: '21st-georgia', name: '21st Georgia', state: 'Georgia', type: 'infantry', strength: 330 },
                    { id: '44th-georgia', name: '44th Georgia', state: 'Georgia', type: 'infantry', strength: 330 },
                  ],
                },
                {
                  id: 'csa-ramseur-brigade',
                  name: "Ramseur's Brigade",
                  commander: 'Stephen D. Ramseur',
                  strength: 1030,
                  regiments: [
                    { id: '2nd-nc', name: '2nd North Carolina', state: 'North Carolina', type: 'infantry', strength: 257 },
                    { id: '4th-nc', name: '4th North Carolina', state: 'North Carolina', type: 'infantry', strength: 257 },
                    { id: '14th-nc', name: '14th North Carolina', state: 'North Carolina', type: 'infantry', strength: 258 },
                    { id: '30th-nc', name: '30th North Carolina', state: 'North Carolina', type: 'infantry', strength: 258 },
                  ],
                },
                {
                  id: 'csa-oneal-brigade',
                  name: "O'Neal's Brigade",
                  commander: "Edward A. O'Neal",
                  strength: 1690,
                  regiments: [
                    { id: '3rd-alabama', name: '3rd Alabama', state: 'Alabama', type: 'infantry', strength: 338 },
                    { id: '5th-alabama', name: '5th Alabama', state: 'Alabama', type: 'infantry', strength: 338 },
                    { id: '6th-alabama', name: '6th Alabama', state: 'Alabama', type: 'infantry', strength: 338 },
                    { id: '12th-alabama', name: '12th Alabama', state: 'Alabama', type: 'infantry', strength: 338 },
                    { id: '26th-alabama', name: '26th Alabama', state: 'Alabama', type: 'infantry', strength: 338 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== THIRD CORPS (A.P. HILL) ====================
        {
          id: 'csa-third-corps',
          name: 'Third Corps',
          commander: 'Ambrose P. Hill',
          strength: 22100,
          divisions: [
            {
              id: 'csa-third-heth',
              name: "Heth's Division",
              commander: 'Henry Heth',
              strength: 7460,
              brigades: [
                {
                  id: 'csa-pettigrew-brigade',
                  name: "Pettigrew's Brigade",
                  commander: 'J. Johnston Pettigrew',
                  strength: 2580,
                  regiments: [
                    { id: '11th-nc', name: '11th North Carolina', state: 'North Carolina', type: 'infantry', strength: 617 },
                    { id: '26th-nc', name: '26th North Carolina', state: 'North Carolina', type: 'infantry', strength: 843, casualties: 687 },
                    { id: '47th-nc', name: '47th North Carolina', state: 'North Carolina', type: 'infantry', strength: 567 },
                    { id: '52nd-nc', name: '52nd North Carolina', state: 'North Carolina', type: 'infantry', strength: 553 },
                  ],
                },
                {
                  id: 'csa-archer-brigade',
                  name: "Archer's Brigade",
                  commander: 'James J. Archer',
                  strength: 1200,
                  regiments: [
                    { id: '5th-al-battalion', name: '5th Alabama Battalion', state: 'Alabama', type: 'infantry', strength: 135 },
                    { id: '13th-alabama', name: '13th Alabama', state: 'Alabama', type: 'infantry', strength: 308 },
                    { id: '1st-tennessee', name: '1st Tennessee', state: 'Tennessee', type: 'infantry', strength: 281 },
                    { id: '7th-tennessee', name: '7th Tennessee', state: 'Tennessee', type: 'infantry', strength: 249 },
                    { id: '14th-tennessee', name: '14th Tennessee', state: 'Tennessee', type: 'infantry', strength: 220 },
                  ],
                },
                {
                  id: 'csa-davis-brigade',
                  name: "Davis' Brigade",
                  commander: 'Joseph R. Davis',
                  strength: 2300,
                  regiments: [
                    { id: '2nd-mississippi', name: '2nd Mississippi', state: 'Mississippi', type: 'infantry', strength: 492 },
                    { id: '11th-mississippi', name: '11th Mississippi', state: 'Mississippi', type: 'infantry', strength: 592 },
                    { id: '42nd-mississippi', name: '42nd Mississippi', state: 'Mississippi', type: 'infantry', strength: 575 },
                    { id: '55th-nc', name: '55th North Carolina', state: 'North Carolina', type: 'infantry', strength: 641 },
                  ],
                },
                {
                  id: 'csa-brockenbrough-brigade',
                  name: "Brockenbrough's Brigade",
                  commander: 'John M. Brockenbrough',
                  strength: 970,
                  regiments: [
                    { id: '40th-virginia', name: '40th Virginia', state: 'Virginia', type: 'infantry', strength: 253 },
                    { id: '47th-virginia', name: '47th Virginia', state: 'Virginia', type: 'infantry', strength: 209 },
                    { id: '55th-virginia', name: '55th Virginia', state: 'Virginia', type: 'infantry', strength: 268 },
                    { id: '22nd-va-battalion', name: '22nd Virginia Battalion', state: 'Virginia', type: 'infantry', strength: 240 },
                  ],
                },
              ],
            },
            {
              id: 'csa-third-pender',
              name: "Pender's Division",
              commander: 'William D. Pender',
              strength: 6735,
              brigades: [
                {
                  id: 'csa-perrin-brigade',
                  name: "Perrin's Brigade (McGowan's)",
                  commander: 'Abner M. Perrin',
                  strength: 1880,
                  regiments: [
                    { id: '1st-sc-rifles', name: '1st South Carolina Rifles', state: 'South Carolina', type: 'infantry', strength: 328 },
                    { id: '1st-sc-prov', name: '1st South Carolina (Provisional)', state: 'South Carolina', type: 'infantry', strength: 322 },
                    { id: '12th-sc', name: '12th South Carolina', state: 'South Carolina', type: 'infantry', strength: 401 },
                    { id: '13th-sc', name: '13th South Carolina', state: 'South Carolina', type: 'infantry', strength: 395 },
                    { id: '14th-sc', name: '14th South Carolina', state: 'South Carolina', type: 'infantry', strength: 434 },
                  ],
                },
                {
                  id: 'csa-lane-brigade',
                  name: "Lane's Brigade",
                  commander: 'James H. Lane',
                  strength: 1730,
                  regiments: [
                    { id: '7th-nc', name: '7th North Carolina', state: 'North Carolina', type: 'infantry', strength: 291 },
                    { id: '18th-nc', name: '18th North Carolina', state: 'North Carolina', type: 'infantry', strength: 346 },
                    { id: '28th-nc', name: '28th North Carolina', state: 'North Carolina', type: 'infantry', strength: 346 },
                    { id: '33rd-nc', name: '33rd North Carolina', state: 'North Carolina', type: 'infantry', strength: 430 },
                    { id: '37th-nc', name: '37th North Carolina', state: 'North Carolina', type: 'infantry', strength: 317 },
                  ],
                },
                {
                  id: 'csa-thomas-brigade',
                  name: "Thomas' Brigade",
                  commander: 'Edward L. Thomas',
                  strength: 1325,
                  regiments: [
                    { id: '14th-georgia', name: '14th Georgia', state: 'Georgia', type: 'infantry', strength: 331 },
                    { id: '35th-georgia', name: '35th Georgia', state: 'Georgia', type: 'infantry', strength: 331 },
                    { id: '45th-georgia', name: '45th Georgia', state: 'Georgia', type: 'infantry', strength: 331 },
                    { id: '49th-georgia', name: '49th Georgia', state: 'Georgia', type: 'infantry', strength: 332 },
                  ],
                },
                {
                  id: 'csa-scales-brigade',
                  name: "Scales' Brigade",
                  commander: 'Alfred M. Scales',
                  strength: 1400,
                  regiments: [
                    { id: '13th-nc', name: '13th North Carolina', state: 'North Carolina', type: 'infantry', strength: 233 },
                    { id: '16th-nc', name: '16th North Carolina', state: 'North Carolina', type: 'infantry', strength: 233 },
                    { id: '22nd-nc', name: '22nd North Carolina', state: 'North Carolina', type: 'infantry', strength: 233 },
                    { id: '34th-nc', name: '34th North Carolina', state: 'North Carolina', type: 'infantry', strength: 233 },
                    { id: '38th-nc', name: '38th North Carolina', state: 'North Carolina', type: 'infantry', strength: 234 },
                  ],
                },
              ],
            },
            {
              id: 'csa-third-anderson',
              name: "Anderson's Division",
              commander: 'Richard H. Anderson',
              strength: 7135,
              brigades: [
                {
                  id: 'csa-wilcox-brigade',
                  name: "Wilcox's Brigade",
                  commander: 'Cadmus M. Wilcox',
                  strength: 1725,
                  regiments: [
                    { id: '8th-alabama', name: '8th Alabama', state: 'Alabama', type: 'infantry', strength: 345 },
                    { id: '9th-alabama', name: '9th Alabama', state: 'Alabama', type: 'infantry', strength: 345 },
                    { id: '10th-alabama', name: '10th Alabama', state: 'Alabama', type: 'infantry', strength: 345 },
                    { id: '11th-alabama', name: '11th Alabama', state: 'Alabama', type: 'infantry', strength: 345 },
                    { id: '14th-alabama', name: '14th Alabama', state: 'Alabama', type: 'infantry', strength: 345 },
                  ],
                },
                {
                  id: 'csa-wright-brigade',
                  name: "Wright's Brigade",
                  commander: 'Ambrose R. Wright',
                  strength: 1410,
                  regiments: [
                    { id: '3rd-georgia', name: '3rd Georgia', state: 'Georgia', type: 'infantry', strength: 352 },
                    { id: '22nd-georgia', name: '22nd Georgia', state: 'Georgia', type: 'infantry', strength: 352 },
                    { id: '48th-georgia', name: '48th Georgia', state: 'Georgia', type: 'infantry', strength: 353 },
                    { id: '2nd-ga-battalion', name: '2nd Georgia Battalion', state: 'Georgia', type: 'infantry', strength: 353 },
                  ],
                },
                {
                  id: 'csa-mahone-brigade',
                  name: "Mahone's Brigade",
                  commander: 'William Mahone',
                  strength: 1540,
                  regiments: [
                    { id: '6th-virginia-mahone', name: '6th Virginia', state: 'Virginia', type: 'infantry', strength: 308 },
                    { id: '12th-virginia', name: '12th Virginia', state: 'Virginia', type: 'infantry', strength: 308 },
                    { id: '16th-virginia', name: '16th Virginia', state: 'Virginia', type: 'infantry', strength: 308 },
                    { id: '41st-virginia', name: '41st Virginia', state: 'Virginia', type: 'infantry', strength: 308 },
                    { id: '61st-virginia', name: '61st Virginia', state: 'Virginia', type: 'infantry', strength: 308 },
                  ],
                },
                {
                  id: 'csa-perry-brigade',
                  name: "Perry's Brigade",
                  commander: 'David Lang',
                  strength: 740,
                  regiments: [
                    { id: '2nd-florida', name: '2nd Florida', state: 'Florida', type: 'infantry', strength: 247 },
                    { id: '5th-florida', name: '5th Florida', state: 'Florida', type: 'infantry', strength: 247 },
                    { id: '8th-florida', name: '8th Florida', state: 'Florida', type: 'infantry', strength: 246 },
                  ],
                },
                {
                  id: 'csa-posey-brigade',
                  name: "Posey's Brigade",
                  commander: 'Carnot Posey',
                  strength: 1320,
                  regiments: [
                    { id: '12th-mississippi', name: '12th Mississippi', state: 'Mississippi', type: 'infantry', strength: 330 },
                    { id: '16th-mississippi', name: '16th Mississippi', state: 'Mississippi', type: 'infantry', strength: 330 },
                    { id: '19th-mississippi', name: '19th Mississippi', state: 'Mississippi', type: 'infantry', strength: 330 },
                    { id: '48th-mississippi', name: '48th Mississippi', state: 'Mississippi', type: 'infantry', strength: 330 },
                  ],
                },
              ],
            },
          ],
        },
        // ==================== CAVALRY DIVISION (STUART) ====================
        {
          id: 'csa-cavalry',
          name: 'Cavalry Division',
          commander: 'J.E.B. Stuart',
          strength: 6700,
          divisions: [
            {
              id: 'csa-stuart-division',
              name: "Stuart's Cavalry",
              commander: 'J.E.B. Stuart',
              strength: 6700,
              brigades: [
                {
                  id: 'csa-hampton-brigade',
                  name: "Hampton's Brigade",
                  commander: 'Wade Hampton',
                  strength: 1740,
                  regiments: [
                    { id: '1st-nc-cav', name: '1st North Carolina Cavalry', state: 'North Carolina', type: 'cavalry', strength: 407 },
                    { id: '1st-sc-cav', name: '1st South Carolina Cavalry', state: 'South Carolina', type: 'cavalry', strength: 360 },
                    { id: '2nd-sc-cav', name: '2nd South Carolina Cavalry', state: 'South Carolina', type: 'cavalry', strength: 185 },
                    { id: 'cobb-legion-cav', name: "Cobb's Legion Cavalry", state: 'Georgia', type: 'cavalry', strength: 371 },
                    { id: 'jeff-davis-legion', name: 'Jeff Davis Legion', state: 'Mississippi', type: 'cavalry', strength: 303 },
                    { id: 'phillips-legion-cav', name: "Phillips Legion Cavalry", state: 'Georgia', type: 'cavalry', strength: 114 },
                  ],
                },
                {
                  id: 'csa-fitz-lee-brigade',
                  name: "Fitz Lee's Brigade",
                  commander: 'Fitzhugh Lee',
                  strength: 1470,
                  regiments: [
                    { id: '1st-va-cav', name: '1st Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 350 },
                    { id: '2nd-va-cav', name: '2nd Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 280 },
                    { id: '3rd-va-cav', name: '3rd Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 280 },
                    { id: '4th-va-cav', name: '4th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 280 },
                    { id: '5th-va-cav', name: '5th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 280 },
                  ],
                },
                {
                  id: 'csa-wh-lee-brigade',
                  name: "W.H.F. Lee's Brigade",
                  commander: 'John R. Chambliss',
                  strength: 1300,
                  regiments: [
                    { id: '2nd-nc-cav', name: '2nd North Carolina Cavalry', state: 'North Carolina', type: 'cavalry', strength: 260 },
                    { id: '9th-va-cav', name: '9th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 260 },
                    { id: '10th-va-cav', name: '10th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 260 },
                    { id: '13th-va-cav-stuart', name: '13th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 260 },
                    { id: '15th-va-cav', name: '15th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 260 },
                  ],
                },
                {
                  id: 'csa-jenkins-brigade',
                  name: "Jenkins' Brigade",
                  commander: 'Albert G. Jenkins',
                  strength: 1200,
                  regiments: [
                    { id: '14th-va-cav', name: '14th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 240 },
                    { id: '16th-va-cav', name: '16th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 240 },
                    { id: '17th-va-cav', name: '17th Virginia Cavalry', state: 'Virginia', type: 'cavalry', strength: 240 },
                    { id: '34th-va-battalion', name: '34th Virginia Cavalry Battalion', state: 'Virginia', type: 'cavalry', strength: 240 },
                    { id: '36th-va-battalion', name: '36th Virginia Cavalry Battalion', state: 'Virginia', type: 'cavalry', strength: 240 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },

  landmarks: [
    // ========== HILLS AND RIDGES ==========
    { id: 'cemetery-hill', name: 'Cemetery Hill', type: 'hill', lat: 39.8206, lng: -77.2303, description: 'Key Union defensive position, anchor of the fishhook line' },
    { id: 'cemetery-ridge', name: 'Cemetery Ridge', type: 'ridge', lat: 39.8100, lng: -77.2350, description: 'Main Union defensive line running south from Cemetery Hill' },
    { id: 'little-round-top', name: 'Little Round Top', type: 'hill', lat: 39.7922, lng: -77.2386, description: 'Critical Union position on Day 2, defended by Vincent and Chamberlain' },
    { id: 'big-round-top', name: 'Big Round Top', type: 'hill', lat: 39.7872, lng: -77.2403, description: 'Larger but less tactically important hill south of Little Round Top' },
    { id: 'seminary-ridge', name: 'Seminary Ridge', type: 'ridge', lat: 39.8311, lng: -77.2458, description: 'Confederate artillery and infantry position, starting point of Pickett\'s Charge' },
    { id: 'culps-hill', name: "Culp's Hill", type: 'hill', lat: 39.8244, lng: -77.2186, description: 'Union right flank, heavily fortified, fighting on Days 2 and 3' },
    { id: 'mcpherson-ridge', name: 'McPherson Ridge', type: 'ridge', lat: 39.8381, lng: -77.2528, description: 'Initial fighting Day 1, where Reynolds fell' },
    { id: 'oak-hill', name: 'Oak Hill', type: 'hill', lat: 39.8450, lng: -77.2350, description: 'Confederate artillery position north of town on Day 1' },
    { id: 'oak-ridge', name: 'Oak Ridge', type: 'ridge', lat: 39.8420, lng: -77.2380, description: 'Union I Corps defensive position on Day 1' },
    { id: 'herr-ridge', name: 'Herr Ridge', type: 'ridge', lat: 39.8400, lng: -77.2650, description: 'Confederate approach route on Day 1' },
    { id: 'powers-hill', name: 'Powers Hill', type: 'hill', lat: 39.8150, lng: -77.2150, description: 'Union artillery reserve and XII Corps headquarters' },
    { id: 'benner-hill', name: "Benner's Hill", type: 'hill', lat: 39.8280, lng: -77.2100, description: 'Confederate artillery position east of town' },

    // ========== FIELDS AND COMBAT ZONES ==========
    { id: 'devils-den', name: "Devil's Den", type: 'field', lat: 39.7936, lng: -77.2442, description: 'Rocky outcrop with fierce hand-to-hand fighting on Day 2' },
    { id: 'the-wheatfield', name: 'The Wheatfield', type: 'field', lat: 39.7972, lng: -77.2417, description: 'Changed hands six times on Day 2, known as the Whirlpool of Death' },
    { id: 'peach-orchard', name: 'Peach Orchard', type: 'field', lat: 39.8017, lng: -77.2494, description: 'Sickles\' advanced position, scene of intense fighting Day 2' },
    { id: 'the-angle', name: 'The Angle', type: 'field', lat: 39.8114, lng: -77.2356, description: 'High Water Mark of the Confederacy, Armistead\'s farthest advance' },
    { id: 'copse-of-trees', name: 'Copse of Trees', type: 'woods', lat: 39.8108, lng: -77.2360, description: 'Aiming point for Pickett\'s Charge' },
    { id: 'plum-run', name: 'Plum Run (Valley of Death)', type: 'creek', lat: 39.7950, lng: -77.2420, description: 'Stream between Devil\'s Den and Little Round Top, site of heavy casualties' },
    { id: 'mcpherson-woods', name: "McPherson's Woods", type: 'woods', lat: 39.8370, lng: -77.2520, description: 'Where Reynolds was killed and Iron Brigade fought on Day 1' },
    { id: 'railroad-cut', name: 'Railroad Cut', type: 'field', lat: 39.8395, lng: -77.2440, description: 'Unfinished railroad grade, scene of fighting on Day 1' },
    { id: 'spangler-spring', name: 'Spangler Spring', type: 'field', lat: 39.8220, lng: -77.2160, description: 'Water source near Culp\'s Hill, informal truce area' },
    { id: 'east-cavalry-field', name: 'East Cavalry Field', type: 'field', lat: 39.8350, lng: -77.1800, description: 'Cavalry engagement on Day 3, Custer vs Stuart' },

    // ========== ROADS ==========
    { id: 'chambersburg-pike', name: 'Chambersburg Pike', type: 'road', lat: 39.8350, lng: -77.2550, description: 'Main road from the west, Confederate approach route Day 1' },
    { id: 'emmitsburg-road', name: 'Emmitsburg Road', type: 'road', lat: 39.8050, lng: -77.2480, description: 'Road crossing the battlefield, Pickett\'s Charge objective' },
    { id: 'taneytown-road', name: 'Taneytown Road', type: 'road', lat: 39.8100, lng: -77.2280, description: 'Union supply and reinforcement route behind Cemetery Ridge' },
    { id: 'baltimore-pike', name: 'Baltimore Pike', type: 'road', lat: 39.8180, lng: -77.2220, description: 'Main road southeast to Baltimore, Union supply line' },
    { id: 'hanover-road', name: 'Hanover Road', type: 'road', lat: 39.8350, lng: -77.2100, description: 'Road east from Gettysburg' },
    { id: 'carlisle-road', name: 'Carlisle Road', type: 'road', lat: 39.8400, lng: -77.2300, description: 'Road north from Gettysburg, Confederate approach' },
    { id: 'york-pike', name: 'York Pike', type: 'road', lat: 39.8320, lng: -77.2200, description: 'Road east to York, Early\'s approach route' },
    { id: 'hagerstown-road', name: 'Hagerstown Road', type: 'road', lat: 39.8280, lng: -77.2400, description: 'Road northwest from town' },

    // ========== FARMS AND BUILDINGS ==========
    { id: 'codori-farm', name: 'Codori Farm', type: 'farm', lat: 39.8090, lng: -77.2430, description: 'Farm on Emmitsburg Road, center of Pickett\'s Charge route' },
    { id: 'trostle-farm', name: 'Trostle Farm', type: 'farm', lat: 39.8000, lng: -77.2410, description: 'Scene of Bigelow\'s artillery stand, Sickles wounded nearby' },
    { id: 'rose-farm', name: 'Rose Farm', type: 'farm', lat: 39.7980, lng: -77.2450, description: 'Farm adjacent to the Wheatfield' },
    { id: 'sherfy-farm', name: 'Sherfy Farm', type: 'farm', lat: 39.8030, lng: -77.2510, description: 'Peach Orchard farm, heavy fighting Day 2' },
    { id: 'rogers-house', name: 'Rogers House', type: 'farm', lat: 39.8100, lng: -77.2320, description: 'On Cemetery Ridge, Union headquarters area' },
    { id: 'leister-house', name: 'Leister House', type: 'farm', lat: 39.8130, lng: -77.2300, description: 'General Meade\'s headquarters' },
    { id: 'mcpherson-farm', name: 'McPherson Farm', type: 'farm', lat: 39.8375, lng: -77.2530, description: 'Edward McPherson\'s farm, Day 1 fighting' },
    { id: 'bliss-farm', name: 'Bliss Farm', type: 'farm', lat: 39.8140, lng: -77.2420, description: 'Contested no-man\'s land between the lines' },
    { id: 'weikert-farm', name: 'Weikert Farm', type: 'farm', lat: 39.7940, lng: -77.2350, description: 'Union field hospital behind Little Round Top' },
    { id: 'hummelbaugh-farm', name: 'Hummelbaugh Farm', type: 'farm', lat: 39.8260, lng: -77.2150, description: 'Near Culp\'s Hill, field hospital' },
    { id: 'slyder-farm', name: 'Slyder Farm', type: 'farm', lat: 39.7850, lng: -77.2450, description: 'South of battlefield, Farnsworth\'s Charge area' },

    // ========== TOWN ==========
    { id: 'gettysburg-town', name: 'Gettysburg', type: 'town', lat: 39.8309, lng: -77.2311, description: 'County seat of Adams County, population ~2,400 in 1863' },
    { id: 'lutheran-seminary', name: 'Lutheran Theological Seminary', type: 'town', lat: 39.8320, lng: -77.2450, description: 'Seminary building used as observation post and hospital' },
    { id: 'evergreen-cemetery', name: 'Evergreen Cemetery', type: 'town', lat: 39.8200, lng: -77.2310, description: 'Cemetery gatehouse, Union signal station' },
  ],

  timeline: [
    // ========== DAY 1: July 1, 1863 ==========
    {
      id: 'day1-0530',
      datetime: '1863-07-01T05:30:00',
      label: 'July 1, 5:30 AM',
      title: 'First Contact',
      description: "Confederate Major General Henry Heth's division advances from Cashtown toward Gettysburg. Union cavalry under Brigadier General John Buford has established a defensive position west of town.",
      positions: [
        { unitId: 'union-buford-cavalry', unitType: 'division', side: 'union', lat: 39.8381, lng: -77.2528, status: 'defending' },
        { unitId: 'csa-third-heth', unitType: 'division', side: 'confederate', lat: 39.8450, lng: -77.2700, status: 'advancing', movementTo: { lat: 39.8381, lng: -77.2528 } },
      ],
      events: [
        {
          id: 'first-shots',
          time: '1863-07-01T05:30:00',
          title: 'First Shots at Marsh Creek',
          description: 'Shots exchanged between Confederate advance and Union cavalry pickets.',
          type: 'combat',
          importance: 'major',
          location: { lat: 39.8450, lng: -77.2650 },
        },
      ],
    },
    {
      id: 'day1-0730',
      datetime: '1863-07-01T07:30:00',
      label: 'July 1, 7:30 AM',
      title: 'Battle Begins',
      description: "Lieutenant Marcellus Jones of the 8th Illinois Cavalry fires the first shot at advancing Confederate forces. Buford's cavalry dismounts to form a defensive line on McPherson Ridge.",
      positions: [
        { unitId: 'union-buford-cavalry', unitType: 'division', side: 'union', lat: 39.8381, lng: -77.2528, status: 'defending' },
        { unitId: 'csa-third-heth', unitType: 'division', side: 'confederate', lat: 39.8400, lng: -77.2580, status: 'advancing' },
      ],
      events: [
        {
          id: 'first-shot-jones',
          time: '1863-07-01T07:30:00',
          title: 'First Infantry Shot',
          description: 'Lt. Marcellus Jones, 8th Illinois Cavalry, fires the first shot of the battle.',
          type: 'combat',
          importance: 'minor',
        },
      ],
    },
    {
      id: 'day1-1000',
      datetime: '1863-07-01T10:00:00',
      label: 'July 1, 10:00 AM',
      title: 'Reynolds Falls',
      description: "Union I Corps arrives under General John Reynolds. The Iron Brigade engages Heth's division. Reynolds is killed by a sharpshooter while directing troops near McPherson's Woods.",
      positions: [
        { unitId: 'union-i-corps', unitType: 'corps', side: 'union', lat: 39.8350, lng: -77.2480, status: 'defending' },
        { unitId: 'union-i-1div-1brig', unitType: 'brigade', side: 'union', lat: 39.8370, lng: -77.2510, status: 'defending' },
        { unitId: 'csa-third-heth', unitType: 'division', side: 'confederate', lat: 39.8390, lng: -77.2530, status: 'advancing' },
      ],
      events: [
        {
          id: 'reynolds-killed',
          time: '1863-07-01T10:15:00',
          title: 'General Reynolds Killed',
          description: "Major General John F. Reynolds, commanding I Corps, is shot and killed by a Confederate sharpshooter while directing the Iron Brigade near McPherson's Woods. Command passes to Abner Doubleday.",
          type: 'casualty',
          importance: 'critical',
          location: { lat: 39.8372, lng: -77.2519 },
          relatedUnits: ['union-i-corps'],
        },
        {
          id: 'iron-brigade-engages',
          time: '1863-07-01T10:00:00',
          title: 'Iron Brigade Engages',
          description: "The Iron Brigade, wearing their distinctive black hats, charges into McPherson's Woods. Confederate General Archer's brigade is driven back and Archer himself is captured.",
          type: 'combat',
          importance: 'major',
          relatedUnits: ['union-i-1div-1brig'],
        },
      ],
    },
    {
      id: 'day1-1200',
      datetime: '1863-07-01T12:00:00',
      label: 'July 1, 12:00 PM',
      title: 'XI Corps Arrives',
      description: "Union XI Corps under General Howard arrives and extends the Union line north of town. Confederate forces continue to build up.",
      positions: [
        { unitId: 'union-i-corps', unitType: 'corps', side: 'union', lat: 39.8350, lng: -77.2480, status: 'defending' },
        { unitId: 'union-xi-corps', unitType: 'corps', side: 'union', lat: 39.8380, lng: -77.2280, status: 'arriving' },
        { unitId: 'csa-third-heth', unitType: 'division', side: 'confederate', lat: 39.8400, lng: -77.2520, status: 'defending' },
      ],
      events: [
        {
          id: 'howard-arrives',
          time: '1863-07-01T12:00:00',
          title: 'XI Corps Arrives',
          description: 'Major General Oliver O. Howard arrives with XI Corps and takes overall command. He positions reserves on Cemetery Hill.',
          type: 'movement',
          importance: 'major',
        },
      ],
    },
    {
      id: 'day1-1600',
      datetime: '1863-07-01T16:00:00',
      label: 'July 1, 4:00 PM',
      title: 'Union Line Breaks',
      description: "Confederate forces overwhelm Union positions. Rodes' and Early's divisions attack XI Corps from the north while Hill's corps pressures I Corps from the west. The Union line collapses.",
      positions: [
        { unitId: 'union-i-corps', unitType: 'corps', side: 'union', lat: 39.8320, lng: -77.2400, status: 'retreating', movementTo: { lat: 39.8206, lng: -77.2303 } },
        { unitId: 'union-xi-corps', unitType: 'corps', side: 'union', lat: 39.8340, lng: -77.2280, status: 'retreating', movementTo: { lat: 39.8206, lng: -77.2303 } },
        { unitId: 'csa-second-corps', unitType: 'corps', side: 'confederate', lat: 39.8420, lng: -77.2200, status: 'advancing' },
        { unitId: 'csa-third-corps', unitType: 'corps', side: 'confederate', lat: 39.8400, lng: -77.2480, status: 'advancing' },
      ],
      events: [
        {
          id: 'union-retreat',
          time: '1863-07-01T16:30:00',
          title: 'Union Forces Retreat Through Town',
          description: 'Union forces retreat through Gettysburg in disorder. Thousands are captured in the streets. Survivors rally on Cemetery Hill south of town.',
          type: 'movement',
          importance: 'critical',
        },
      ],
    },
    {
      id: 'day1-1900',
      datetime: '1863-07-01T19:00:00',
      label: 'July 1, 7:00 PM',
      title: 'Day 1 Ends',
      description: "Union forces establish defensive positions on Cemetery Hill and Culp's Hill. Lee orders Ewell to take Cemetery Hill 'if practicable' but Ewell declines, a decision that remains controversial.",
      positions: [
        { unitId: 'union-i-corps', unitType: 'corps', side: 'union', lat: 39.8206, lng: -77.2303, status: 'defending' },
        { unitId: 'union-xi-corps', unitType: 'corps', side: 'union', lat: 39.8220, lng: -77.2250, status: 'defending' },
        { unitId: 'csa-second-corps', unitType: 'corps', side: 'confederate', lat: 39.8350, lng: -77.2250, status: 'reserve' },
        { unitId: 'csa-third-corps', unitType: 'corps', side: 'confederate', lat: 39.8350, lng: -77.2450, status: 'reserve' },
      ],
      events: [
        {
          id: 'ewell-decision',
          time: '1863-07-01T19:00:00',
          title: "Ewell's Controversial Decision",
          description: "Lee sends orders to Ewell to take Cemetery Hill 'if practicable.' Ewell, seeing Union reinforcements arriving and his troops exhausted, decides not to attack. Historians debate whether this was a missed opportunity.",
          type: 'command',
          importance: 'critical',
        },
      ],
    },

    // ========== DAY 2: July 2, 1863 ==========
    {
      id: 'day2-0600',
      datetime: '1863-07-02T06:00:00',
      label: 'July 2, 6:00 AM',
      title: 'Lines Form',
      description: "Both armies have spent the night reinforcing. The Union line now forms a 'fishhook' from Culp's Hill around Cemetery Hill and down Cemetery Ridge to the Round Tops. Lee plans to attack both flanks.",
      positions: [
        { unitId: 'union-i-corps', unitType: 'corps', side: 'union', lat: 39.8206, lng: -77.2303, status: 'defending' },
        { unitId: 'union-ii-corps', unitType: 'corps', side: 'union', lat: 39.8100, lng: -77.2350, status: 'defending' },
        { unitId: 'union-iii-corps', unitType: 'corps', side: 'union', lat: 39.8050, lng: -77.2380, status: 'defending' },
        { unitId: 'union-v-corps', unitType: 'corps', side: 'union', lat: 39.7950, lng: -77.2400, status: 'reserve' },
        { unitId: 'csa-first-corps', unitType: 'corps', side: 'confederate', lat: 39.8000, lng: -77.2550, status: 'reserve' },
        { unitId: 'csa-second-corps', unitType: 'corps', side: 'confederate', lat: 39.8300, lng: -77.2200, status: 'defending' },
        { unitId: 'csa-third-corps', unitType: 'corps', side: 'confederate', lat: 39.8311, lng: -77.2458, status: 'defending' },
      ],
      events: [
        {
          id: 'meade-arrives',
          time: '1863-07-02T03:00:00',
          title: 'Meade Arrives',
          description: 'General Meade arrives at Cemetery Hill after midnight and confers with his corps commanders. He approves the defensive position.',
          type: 'command',
          importance: 'major',
        },
      ],
    },
    {
      id: 'day2-1600',
      datetime: '1863-07-02T16:00:00',
      label: 'July 2, 4:00 PM',
      title: "Longstreet's Assault Begins",
      description: "After delays, Longstreet's corps attacks the Union left. Sickles has moved III Corps forward to the Peach Orchard, creating a vulnerable salient. Fierce fighting erupts at Devil's Den, the Wheatfield, and the Peach Orchard.",
      positions: [
        { unitId: 'union-iii-corps', unitType: 'corps', side: 'union', lat: 39.8017, lng: -77.2494, status: 'defending' },
        { unitId: 'union-v-corps', unitType: 'corps', side: 'union', lat: 39.7922, lng: -77.2386, status: 'defending' },
        { unitId: 'csa-first-mclaws', unitType: 'division', side: 'confederate', lat: 39.8050, lng: -77.2520, status: 'advancing' },
        { unitId: 'csa-first-hood', unitType: 'division', side: 'confederate', lat: 39.7950, lng: -77.2500, status: 'advancing' },
      ],
      events: [
        {
          id: 'devils-den-assault',
          time: '1863-07-02T16:00:00',
          title: "Devil's Den Assault",
          description: "Hood's division attacks Devil's Den and the rocky slopes below Little Round Top. Fierce hand-to-hand combat in the boulders.",
          type: 'combat',
          importance: 'major',
          location: { lat: 39.7936, lng: -77.2442 },
        },
        {
          id: 'sickles-wounded',
          time: '1863-07-02T18:00:00',
          title: 'Sickles Wounded',
          description: "General Sickles is struck by a cannonball, losing his right leg. III Corps is being overwhelmed.",
          type: 'casualty',
          importance: 'major',
        },
      ],
    },
    {
      id: 'day2-1700',
      datetime: '1863-07-02T17:00:00',
      label: 'July 2, 5:00 PM',
      title: 'Little Round Top',
      description: "Colonel Strong Vincent's brigade rushes to defend the unoccupied Little Round Top just as Confederate forces approach. The 20th Maine under Colonel Joshua Chamberlain holds the extreme left of the Union line.",
      positions: [
        { unitId: '20th-maine', unitType: 'regiment', side: 'union', lat: 39.7922, lng: -77.2386, status: 'defending' },
        { unitId: 'csa-15th-alabama', unitType: 'regiment', side: 'confederate', lat: 39.7910, lng: -77.2410, status: 'advancing' },
      ],
      events: [
        {
          id: 'chamberlain-bayonet',
          time: '1863-07-02T17:30:00',
          title: '20th Maine Bayonet Charge',
          description: "Out of ammunition, Colonel Chamberlain orders a bayonet charge. The 20th Maine sweeps down Little Round Top, capturing many Confederates and securing the Union left flank.",
          type: 'combat',
          importance: 'critical',
          location: { lat: 39.7922, lng: -77.2386 },
          relatedUnits: ['20th-maine'],
        },
      ],
    },
    {
      id: 'day2-1930',
      datetime: '1863-07-02T19:30:00',
      label: 'July 2, 7:30 PM',
      title: 'Day 2 Ends',
      description: "Fighting continues until dark. The Union line has held, though III Corps was shattered and the Wheatfield changed hands six times. Confederate attacks on Culp's Hill and Cemetery Hill are repulsed.",
      positions: [
        { unitId: 'union-ii-corps', unitType: 'corps', side: 'union', lat: 39.8100, lng: -77.2350, status: 'defending' },
        { unitId: 'union-v-corps', unitType: 'corps', side: 'union', lat: 39.7950, lng: -77.2400, status: 'defending' },
        { unitId: 'csa-first-corps', unitType: 'corps', side: 'confederate', lat: 39.8000, lng: -77.2500, status: 'defending' },
      ],
      events: [],
    },

    // ========== DAY 3: July 3, 1863 ==========
    {
      id: 'day3-0530',
      datetime: '1863-07-03T05:30:00',
      label: 'July 3, 5:30 AM',
      title: "Culp's Hill",
      description: "Fighting resumes at Culp's Hill where Confederates had gained a foothold the previous night. After hours of combat, Union forces reclaim all lost ground.",
      positions: [
        { unitId: 'union-xii-corps', unitType: 'corps', side: 'union', lat: 39.8244, lng: -77.2186, status: 'defending' },
        { unitId: 'csa-second-corps', unitType: 'corps', side: 'confederate', lat: 39.8260, lng: -77.2150, status: 'advancing' },
      ],
      events: [
        {
          id: 'culps-hill-fighting',
          time: '1863-07-03T05:30:00',
          title: "Culp's Hill Fighting Resumes",
          description: "Seven hours of intense fighting as Union XII Corps drives Confederate forces from their lodgement on Culp's Hill.",
          type: 'combat',
          importance: 'major',
          location: { lat: 39.8244, lng: -77.2186 },
        },
      ],
    },
    {
      id: 'day3-1300',
      datetime: '1863-07-03T13:00:00',
      label: 'July 3, 1:00 PM',
      title: 'The Bombardment',
      description: "After a morning lull, approximately 140 Confederate guns open fire on the Union center on Cemetery Ridge. About 80 Union guns respond. It is the largest artillery bombardment of the war.",
      positions: [
        { unitId: 'union-ii-corps', unitType: 'corps', side: 'union', lat: 39.8100, lng: -77.2350, status: 'defending' },
        { unitId: 'csa-first-pickett', unitType: 'division', side: 'confederate', lat: 39.8100, lng: -77.2550, status: 'reserve' },
      ],
      events: [
        {
          id: 'artillery-bombardment',
          time: '1863-07-03T13:00:00',
          title: 'Confederate Artillery Bombardment',
          description: '140+ Confederate guns fire on Cemetery Ridge for nearly two hours. Many shots fly high, hitting rear areas. Union artillery chief Hunt orders guns to cease fire to conserve ammunition, leading Confederates to believe they have silenced the Union guns.',
          type: 'combat',
          importance: 'critical',
        },
      ],
    },
    {
      id: 'day3-1500',
      datetime: '1863-07-03T15:00:00',
      label: 'July 3, 3:00 PM',
      title: "Pickett's Charge",
      description: "12,500 Confederate infantry emerge from Seminary Ridge and advance across nearly a mile of open ground toward the Union center. This assault, known as Pickett's Charge, represents the climax of the battle.",
      positions: [
        { unitId: 'csa-first-pickett', unitType: 'division', side: 'confederate', lat: 39.8100, lng: -77.2500, status: 'advancing', movementTo: { lat: 39.8100, lng: -77.2350 } },
        { unitId: 'csa-garnett-brigade', unitType: 'brigade', side: 'confederate', lat: 39.8110, lng: -77.2480, status: 'advancing' },
        { unitId: 'csa-armistead-brigade', unitType: 'brigade', side: 'confederate', lat: 39.8090, lng: -77.2490, status: 'advancing' },
        { unitId: 'union-ii-corps', unitType: 'corps', side: 'union', lat: 39.8100, lng: -77.2350, status: 'defending' },
      ],
      events: [
        {
          id: 'picketts-charge-begins',
          time: '1863-07-03T15:00:00',
          title: "Pickett's Charge Begins",
          description: "Three divisions under Pickett, Pettigrew, and Trimble step off from Seminary Ridge. They must cross nearly a mile of open ground under withering fire.",
          type: 'combat',
          importance: 'critical',
        },
        {
          id: 'armistead-high-water-mark',
          time: '1863-07-03T15:30:00',
          title: 'High Water Mark',
          description: "General Armistead, hat on sword, leads about 150 men over the stone wall at the Angle. This is the 'High Water Mark of the Confederacy.' Armistead is mortally wounded moments later. The breakthrough is quickly sealed.",
          type: 'combat',
          importance: 'critical',
          location: { lat: 39.8114, lng: -77.2356 },
          relatedUnits: ['csa-armistead-brigade'],
        },
      ],
    },
    {
      id: 'day3-1600',
      datetime: '1863-07-03T16:00:00',
      label: 'July 3, 4:00 PM',
      title: 'The Charge Fails',
      description: "The survivors of Pickett's Charge stream back to Seminary Ridge. Confederate casualties approach 60%. Lee rides out to meet them, saying 'It is all my fault.' The battle is effectively over.",
      positions: [
        { unitId: 'csa-first-pickett', unitType: 'division', side: 'confederate', lat: 39.8100, lng: -77.2500, status: 'retreating' },
        { unitId: 'union-ii-corps', unitType: 'corps', side: 'union', lat: 39.8100, lng: -77.2350, status: 'defending' },
      ],
      events: [
        {
          id: 'charge-repulsed',
          time: '1863-07-03T15:45:00',
          title: 'Charge Repulsed',
          description: "Pickett's Charge has failed with catastrophic losses. Of the approximately 12,500 men who made the charge, over 6,500 are casualties. All three of Pickett's brigade commanders are killed or mortally wounded.",
          type: 'combat',
          importance: 'critical',
        },
        {
          id: 'lee-my-fault',
          time: '1863-07-03T16:00:00',
          title: '"It Is All My Fault"',
          description: 'Lee rides out to rally the survivors, telling them "It is all my fault" and "It is I who have lost this fight."',
          type: 'command',
          importance: 'major',
        },
      ],
    },
    {
      id: 'day3-end',
      datetime: '1863-07-03T19:00:00',
      label: 'July 3, 7:00 PM',
      title: 'Battle Ends',
      description: "The Battle of Gettysburg is over. Lee begins preparations to retreat to Virginia. The three-day battle has produced over 50,000 casualties combined. The Confederacy will never again mount a major invasion of the North.",
      positions: [
        { unitId: 'union-forces', unitType: 'corps', side: 'union', lat: 39.8100, lng: -77.2350, status: 'defending' },
        { unitId: 'csa-forces', unitType: 'corps', side: 'confederate', lat: 39.8200, lng: -77.2500, status: 'defending' },
      ],
      events: [
        {
          id: 'battle-ends',
          time: '1863-07-03T19:00:00',
          title: 'Battle of Gettysburg Ends',
          description: 'After three days and over 50,000 casualties, the battle ends. Lee will retreat on July 4. The Union victory, combined with the fall of Vicksburg the same day, marks the turning point of the Civil War.',
          type: 'command',
          importance: 'critical',
        },
      ],
    },
  ],
};

export default gettysburgDeep;
