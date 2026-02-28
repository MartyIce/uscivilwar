import type { Side } from '../types';

export interface MilitaryPosition {
  id: string;
  title: string;
  name: string;
  personSlug?: string; // For linking to person detail
  startDate: string;
  endDate: string;
  children?: MilitaryPosition[];
}

export interface MilitaryHierarchy {
  side: Side;
  positions: MilitaryPosition[];
}

/**
 * Union military and political hierarchy over time.
 * Each position has date ranges for when that person held the role.
 */
export const unionHierarchy: MilitaryHierarchy = {
  side: 'union',
  positions: [
    {
      id: 'lincoln',
      title: 'President & Commander-in-Chief',
      name: 'Abraham Lincoln',
      personSlug: 'abraham_lincoln',
      startDate: '1861-03-04',
      endDate: '1865-04-15',
      children: [
        // War Secretaries
        {
          id: 'cameron',
          title: 'Secretary of War',
          name: 'Simon Cameron',
          startDate: '1861-03-05',
          endDate: '1862-01-14',
        },
        {
          id: 'stanton',
          title: 'Secretary of War',
          name: 'Edwin M. Stanton',
          startDate: '1862-01-15',
          endDate: '1865-04-15',
          children: [
            // General-in-Chief succession
            {
              id: 'scott',
              title: 'General-in-Chief',
              name: 'Winfield Scott',
              startDate: '1861-03-04',
              endDate: '1861-11-01',
            },
            {
              id: 'mcclellan-chief',
              title: 'General-in-Chief',
              name: 'George B. McClellan',
              personSlug: 'george_mcclellan',
              startDate: '1861-11-01',
              endDate: '1862-03-11',
            },
            {
              id: 'halleck',
              title: 'General-in-Chief',
              name: 'Henry W. Halleck',
              startDate: '1862-07-23',
              endDate: '1864-03-12',
              children: [
                {
                  id: 'aop-mcclellan',
                  title: 'Army of the Potomac',
                  name: 'George B. McClellan',
                  personSlug: 'george_mcclellan',
                  startDate: '1861-11-01',
                  endDate: '1862-11-07',
                },
                {
                  id: 'aop-burnside',
                  title: 'Army of the Potomac',
                  name: 'Ambrose E. Burnside',
                  personSlug: 'ambrose_burnside',
                  startDate: '1862-11-07',
                  endDate: '1863-01-26',
                },
                {
                  id: 'aop-hooker',
                  title: 'Army of the Potomac',
                  name: 'Joseph Hooker',
                  personSlug: 'joseph_hooker',
                  startDate: '1863-01-26',
                  endDate: '1863-06-28',
                },
                {
                  id: 'aop-meade-early',
                  title: 'Army of the Potomac',
                  name: 'George G. Meade',
                  personSlug: 'george_meade',
                  startDate: '1863-06-28',
                  endDate: '1864-03-12',
                },
              ],
            },
            {
              id: 'grant-chief',
              title: 'General-in-Chief',
              name: 'Ulysses S. Grant',
              personSlug: 'ulysses_grant',
              startDate: '1864-03-12',
              endDate: '1865-04-15',
              children: [
                {
                  id: 'aop-meade',
                  title: 'Army of the Potomac',
                  name: 'George G. Meade',
                  personSlug: 'george_meade',
                  startDate: '1864-03-12',
                  endDate: '1865-04-15',
                  children: [
                    {
                      id: 'ii-corps-hancock',
                      title: 'II Corps',
                      name: 'Winfield S. Hancock',
                      personSlug: 'winfield_hancock',
                      startDate: '1864-03-12',
                      endDate: '1864-11-26',
                    },
                    {
                      id: 'v-corps-warren',
                      title: 'V Corps',
                      name: 'Gouverneur K. Warren',
                      startDate: '1864-03-12',
                      endDate: '1865-04-01',
                    },
                    {
                      id: 'vi-corps-sedgwick',
                      title: 'VI Corps',
                      name: 'John Sedgwick',
                      personSlug: 'john_sedgwick',
                      startDate: '1864-03-12',
                      endDate: '1864-05-09',
                    },
                    {
                      id: 'vi-corps-wright',
                      title: 'VI Corps',
                      name: 'Horatio G. Wright',
                      startDate: '1864-05-09',
                      endDate: '1865-04-15',
                    },
                    {
                      id: 'cavalry-sheridan',
                      title: 'Cavalry Corps',
                      name: 'Philip Sheridan',
                      personSlug: 'philip_sheridan',
                      startDate: '1864-04-04',
                      endDate: '1865-04-15',
                    },
                  ],
                },
                {
                  id: 'military-div-miss',
                  title: 'Military Division of the Mississippi',
                  name: 'William T. Sherman',
                  personSlug: 'william_sherman',
                  startDate: '1864-03-18',
                  endDate: '1865-04-15',
                  children: [
                    {
                      id: 'army-cumberland',
                      title: 'Army of the Cumberland',
                      name: 'George H. Thomas',
                      personSlug: 'george_thomas',
                      startDate: '1864-03-18',
                      endDate: '1865-04-15',
                    },
                    {
                      id: 'army-tennessee-union',
                      title: 'Army of the Tennessee',
                      name: 'James B. McPherson',
                      startDate: '1864-03-18',
                      endDate: '1864-07-22',
                    },
                    {
                      id: 'army-ohio',
                      title: 'Army of the Ohio',
                      name: 'John M. Schofield',
                      startDate: '1864-03-18',
                      endDate: '1865-04-15',
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Navy
        {
          id: 'welles',
          title: 'Secretary of the Navy',
          name: 'Gideon Welles',
          startDate: '1861-03-07',
          endDate: '1865-04-15',
          children: [
            {
              id: 'farragut',
              title: 'West Gulf Blockading Squadron',
              name: 'David G. Farragut',
              personSlug: 'david_farragut',
              startDate: '1862-01-09',
              endDate: '1865-04-15',
            },
          ],
        },
      ],
    },
  ],
};

/**
 * Confederate military and political hierarchy over time.
 */
export const confederateHierarchy: MilitaryHierarchy = {
  side: 'confederate',
  positions: [
    {
      id: 'davis',
      title: 'President & Commander-in-Chief',
      name: 'Jefferson Davis',
      personSlug: 'jefferson_davis',
      startDate: '1861-02-18',
      endDate: '1865-05-10',
      children: [
        // War Secretaries
        {
          id: 'walker',
          title: 'Secretary of War',
          name: 'Leroy P. Walker',
          startDate: '1861-02-21',
          endDate: '1861-09-16',
        },
        {
          id: 'benjamin',
          title: 'Secretary of War',
          name: 'Judah P. Benjamin',
          startDate: '1861-09-17',
          endDate: '1862-03-18',
        },
        {
          id: 'seddon',
          title: 'Secretary of War',
          name: 'James A. Seddon',
          startDate: '1862-11-21',
          endDate: '1865-02-06',
          children: [
            // Army commands
            {
              id: 'anv-lee',
              title: 'Army of Northern Virginia',
              name: 'Robert E. Lee',
              personSlug: 'robert_lee',
              startDate: '1862-06-01',
              endDate: '1865-04-09',
              children: [
                {
                  id: 'first-corps-longstreet',
                  title: 'First Corps',
                  name: 'James Longstreet',
                  personSlug: 'james_longstreet',
                  startDate: '1862-10-11',
                  endDate: '1865-04-09',
                },
                {
                  id: 'second-corps-jackson',
                  title: 'Second Corps',
                  name: "Thomas J. 'Stonewall' Jackson",
                  personSlug: 'thomas_jackson',
                  startDate: '1862-10-11',
                  endDate: '1863-05-10',
                },
                {
                  id: 'second-corps-ewell',
                  title: 'Second Corps',
                  name: 'Richard S. Ewell',
                  personSlug: 'richard_ewell',
                  startDate: '1863-05-30',
                  endDate: '1864-05-29',
                },
                {
                  id: 'second-corps-early',
                  title: 'Second Corps',
                  name: 'Jubal A. Early',
                  personSlug: 'jubal_early',
                  startDate: '1864-05-29',
                  endDate: '1865-03-30',
                },
                {
                  id: 'third-corps-hill',
                  title: 'Third Corps',
                  name: 'A.P. Hill',
                  personSlug: 'ap_hill',
                  startDate: '1863-05-30',
                  endDate: '1865-04-02',
                },
                {
                  id: 'cavalry-stuart',
                  title: 'Cavalry Corps',
                  name: 'J.E.B. Stuart',
                  personSlug: 'jeb_stuart',
                  startDate: '1862-07-28',
                  endDate: '1864-05-12',
                },
              ],
            },
            {
              id: 'aot-bragg',
              title: 'Army of Tennessee',
              name: 'Braxton Bragg',
              personSlug: 'braxton_bragg',
              startDate: '1862-11-20',
              endDate: '1863-12-02',
            },
            {
              id: 'aot-johnston',
              title: 'Army of Tennessee',
              name: 'Joseph E. Johnston',
              personSlug: 'joseph_johnston',
              startDate: '1863-12-27',
              endDate: '1864-07-17',
            },
            {
              id: 'aot-hood',
              title: 'Army of Tennessee',
              name: 'John Bell Hood',
              personSlug: 'john_hood',
              startDate: '1864-07-17',
              endDate: '1865-01-23',
            },
            {
              id: 'western-forrest',
              title: 'Cavalry Corps (Western)',
              name: 'Nathan Bedford Forrest',
              personSlug: 'nathan_forrest',
              startDate: '1863-06-01',
              endDate: '1865-05-09',
            },
          ],
        },
        {
          id: 'breckinridge',
          title: 'Secretary of War',
          name: 'John C. Breckinridge',
          startDate: '1865-02-06',
          endDate: '1865-05-10',
          children: [
            {
              id: 'lee-general-in-chief',
              title: 'General-in-Chief',
              name: 'Robert E. Lee',
              personSlug: 'robert_lee',
              startDate: '1865-01-31',
              endDate: '1865-04-09',
            },
          ],
        },
        // Navy
        {
          id: 'mallory',
          title: 'Secretary of the Navy',
          name: 'Stephen R. Mallory',
          startDate: '1861-03-04',
          endDate: '1865-05-02',
        },
      ],
    },
  ],
};

/**
 * Get the hierarchy for a specific side.
 */
export function getHierarchy(side: Side): MilitaryHierarchy {
  return side === 'union' ? unionHierarchy : confederateHierarchy;
}

/**
 * Filter positions to only show those active at a given date.
 */
export function filterByDate(positions: MilitaryPosition[], date: string): MilitaryPosition[] {
  return positions
    .filter(pos => pos.startDate <= date && pos.endDate >= date)
    .map(pos => ({
      ...pos,
      children: pos.children ? filterByDate(pos.children, date) : undefined,
    }));
}

/**
 * Find the earliest date a person appears in the hierarchy.
 */
export function findPersonFirstAppearance(positions: MilitaryPosition[], personSlug: string): string | null {
  let earliestDate: string | null = null;

  function search(pos: MilitaryPosition) {
    if (pos.personSlug === personSlug) {
      if (!earliestDate || pos.startDate < earliestDate) {
        earliestDate = pos.startDate;
      }
    }
    if (pos.children) {
      pos.children.forEach(search);
    }
  }

  positions.forEach(search);
  return earliestDate;
}

/**
 * Check if a person exists anywhere in the hierarchy (at any date).
 */
export function personExistsInHierarchy(positions: MilitaryPosition[], personSlug: string): boolean {
  function search(pos: MilitaryPosition): boolean {
    if (pos.personSlug === personSlug) return true;
    if (pos.children) {
      return pos.children.some(search);
    }
    return false;
  }

  return positions.some(search);
}
