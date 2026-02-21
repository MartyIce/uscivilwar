import type { Person, Side } from '../../types';
import { peopleBatch2 } from './people-batch2';

// Base list of Civil War figures including military and political leaders
const basePeople: Person[] = [
  // ==================== UNION MILITARY ====================
  {
    id: 1,
    name: "Ulysses S. Grant",
    birth_date: "1822-04-27",
    death_date: "1885-07-23",
    side: "union",
    rank: "Lieutenant General",
    highest_rank: "General of the Army",
    biography: "Commanding general of the Union Army. His victories at Vicksburg and Chattanooga led to his appointment as general-in-chief. Later served as 18th President.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Ulysses_S._Grant"
  },
  {
    id: 2,
    name: "William T. Sherman",
    birth_date: "1820-02-08",
    death_date: "1891-02-14",
    side: "union",
    rank: "Major General",
    highest_rank: "General of the Army",
    biography: "Known for his March to the Sea and implementation of total war strategy. His capture of Atlanta helped secure Lincoln's reelection.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_Tecumseh_Sherman"
  },
  {
    id: 3,
    name: "George B. McClellan",
    birth_date: "1826-12-03",
    death_date: "1885-10-29",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Organized and trained the Army of the Potomac. Excellent organizer but overly cautious. Ran against Lincoln in the 1864 election.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/George_B._McClellan"
  },
  {
    id: 4,
    name: "George G. Meade",
    birth_date: "1815-12-31",
    death_date: "1872-11-06",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded the Army of the Potomac at Gettysburg. Continued to command under Grant until war's end.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/George_G._Meade"
  },
  {
    id: 5,
    name: "Philip Sheridan",
    birth_date: "1831-03-06",
    death_date: "1888-08-05",
    side: "union",
    rank: "Major General",
    highest_rank: "General of the Army",
    biography: "Union cavalry commander who led devastating raids in the Shenandoah Valley. His aggressive tactics helped end the war.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Philip_Sheridan"
  },
  {
    id: 6,
    name: "George Thomas",
    birth_date: "1816-07-31",
    death_date: "1870-03-28",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Known as the 'Rock of Chickamauga' for his steadfast defense. Won a decisive victory at Nashville.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/George_Henry_Thomas"
  },
  {
    id: 7,
    name: "Ambrose E. Burnside",
    birth_date: "1824-05-23",
    death_date: "1881-09-13",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded the Army of the Potomac briefly. The disastrous assault at Fredericksburg led to his removal. Known for his distinctive whiskers (sideburns).",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Ambrose_Burnside"
  },
  {
    id: 8,
    name: "Joseph Hooker",
    birth_date: "1814-11-13",
    death_date: "1879-10-31",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded the Army of the Potomac. Reorganized the army but was outmaneuvered by Lee at Chancellorsville.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Joseph_Hooker"
  },
  {
    id: 9,
    name: "Irvin McDowell",
    birth_date: "1818-10-15",
    death_date: "1885-05-04",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded Union forces at First Bull Run. His defeat there was the first major battle of the war.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Irvin_McDowell"
  },
  {
    id: 10,
    name: "Don Carlos Buell",
    birth_date: "1818-03-23",
    death_date: "1898-11-19",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "His reinforcements at Shiloh helped turn the battle into a Union victory. Commanded the Army of the Ohio.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Don_Carlos_Buell"
  },
  {
    id: 11,
    name: "William Rosecrans",
    birth_date: "1819-09-06",
    death_date: "1898-03-11",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded the Army of the Cumberland. Won at Stones River but was defeated at Chickamauga.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_Rosecrans"
  },
  {
    id: 12,
    name: "John Pope",
    birth_date: "1822-03-16",
    death_date: "1892-09-23",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded the Army of Virginia. Defeated decisively by Lee at Second Bull Run.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_Pope_(military_officer)"
  },
  // ==================== CONFEDERATE MILITARY ====================
  {
    id: 20,
    name: "Robert E. Lee",
    birth_date: "1807-01-19",
    death_date: "1870-10-12",
    side: "confederate",
    rank: "General",
    highest_rank: "General-in-Chief",
    biography: "Commanding general of the Army of Northern Virginia. Known for tactical brilliance. Surrendered to Grant at Appomattox.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Robert_E._Lee"
  },
  {
    id: 21,
    name: "Thomas J. 'Stonewall' Jackson",
    birth_date: "1824-01-21",
    death_date: "1863-05-10",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Earned his nickname at First Bull Run. Lee's most trusted subordinate. Mortally wounded by friendly fire at Chancellorsville.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Stonewall_Jackson"
  },
  {
    id: 22,
    name: "James Longstreet",
    birth_date: "1821-01-08",
    death_date: "1904-01-02",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Lee's 'Old War Horse.' Corps commander at Gettysburg and Chickamauga. After the war, became a Republican.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/James_Longstreet"
  },
  {
    id: 23,
    name: "P.G.T. Beauregard",
    birth_date: "1818-05-28",
    death_date: "1893-02-20",
    side: "confederate",
    rank: "General",
    highest_rank: "General",
    biography: "Ordered the first shots on Fort Sumter. Commanded at First Bull Run and Shiloh.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/P._G._T._Beauregard"
  },
  {
    id: 24,
    name: "Joseph E. Johnston",
    birth_date: "1807-02-03",
    death_date: "1891-03-21",
    side: "confederate",
    rank: "General",
    highest_rank: "General",
    biography: "Commanded Confederate forces early in the war. Wounded at Seven Pines, leading to Lee taking command. Later commanded in the West.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Joseph_E._Johnston"
  },
  {
    id: 25,
    name: "J.E.B. Stuart",
    birth_date: "1833-02-06",
    death_date: "1864-05-12",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Famous cavalry commander known for daring raids. Mortally wounded at the Battle of Yellow Tavern.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/J._E._B._Stuart"
  },
  {
    id: 26,
    name: "Braxton Bragg",
    birth_date: "1817-03-22",
    death_date: "1876-09-27",
    side: "confederate",
    rank: "General",
    highest_rank: "General",
    biography: "Commanded the Army of Tennessee. Won at Chickamauga but was defeated at Chattanooga. Known for poor relations with subordinates.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Braxton_Bragg"
  },
  {
    id: 27,
    name: "John Bell Hood",
    birth_date: "1831-06-29",
    death_date: "1879-08-30",
    side: "confederate",
    rank: "General",
    highest_rank: "General",
    biography: "Aggressive commander who lost his leg at Chickamauga. His Tennessee Campaign ended in the destruction of his army.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_Bell_Hood"
  },
  {
    id: 28,
    name: "Nathan Bedford Forrest",
    birth_date: "1821-07-13",
    death_date: "1877-10-29",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Self-taught cavalry commander known for aggressive tactics. Controversial for post-war association with the KKK.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Nathan_Bedford_Forrest"
  },
  {
    id: 29,
    name: "A.P. Hill",
    birth_date: "1825-11-09",
    death_date: "1865-04-02",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Corps commander under Lee. Killed during the fall of Petersburg. Lee reportedly called for Hill in his final hours.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/A._P._Hill"
  },
  {
    id: 30,
    name: "Jubal Early",
    birth_date: "1816-11-03",
    death_date: "1894-03-02",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Led a raid that reached the outskirts of Washington D.C. in 1864. Defeated by Sheridan in the Shenandoah Valley.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Jubal_Early"
  },
  // ==================== POLITICAL LEADERS ====================
  {
    id: 40,
    name: "Abraham Lincoln",
    birth_date: "1809-02-12",
    death_date: "1865-04-15",
    side: "union",
    rank: "President",
    highest_rank: "President",
    biography: "16th President of the United States. Led the nation through the Civil War. Issued the Emancipation Proclamation. Assassinated by John Wilkes Booth.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Abraham_Lincoln"
  },
  {
    id: 41,
    name: "Jefferson Davis",
    birth_date: "1808-06-03",
    death_date: "1889-12-06",
    side: "confederate",
    rank: "President",
    highest_rank: "President",
    biography: "President of the Confederate States of America. Former U.S. Senator and Secretary of War. Captured and imprisoned after the war.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Jefferson_Davis"
  },
  {
    id: 42,
    name: "Andrew Johnson",
    birth_date: "1808-12-29",
    death_date: "1875-07-31",
    side: "union",
    rank: "Vice President",
    highest_rank: "President",
    biography: "17th President, succeeding Lincoln. His lenient Reconstruction policies led to conflict with Congress and his impeachment.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Andrew_Johnson"
  },
  {
    id: 43,
    name: "Alexander Stephens",
    birth_date: "1812-02-11",
    death_date: "1883-03-04",
    side: "confederate",
    rank: "Vice President",
    highest_rank: "Vice President",
    biography: "Vice President of the Confederate States. His 'Cornerstone Speech' declared slavery the foundation of the Confederacy.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Alexander_H._Stephens"
  },
  {
    id: 44,
    name: "William H. Seward",
    birth_date: "1801-05-16",
    death_date: "1872-10-10",
    side: "union",
    rank: "Secretary of State",
    highest_rank: "Secretary of State",
    biography: "Lincoln's Secretary of State. Target of assassination attempt on the night Lincoln was killed. Later negotiated the purchase of Alaska.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_H._Seward"
  },
  {
    id: 45,
    name: "Edwin M. Stanton",
    birth_date: "1814-12-19",
    death_date: "1869-12-24",
    side: "union",
    rank: "Secretary of War",
    highest_rank: "Secretary of War",
    biography: "Lincoln's Secretary of War. Organized the Union's massive military effort. Said of Lincoln: 'Now he belongs to the ages.'",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Edwin_Stanton"
  }
];

// Combine base people with batch 2
export const expandedPeople: Person[] = [...basePeople, ...peopleBatch2];

// Helper to get person by ID
export function getPersonById(id: number): Person | undefined {
  return expandedPeople.find(p => p.id === id);
}

// Helper to get people by side
export function getPeopleBySide(side: Side): Person[] {
  return expandedPeople.filter(p => p.side === side);
}

// Helper to get military commanders only
export function getMilitaryCommanders(): Person[] {
  return expandedPeople.filter(p =>
    p.rank !== 'President' &&
    p.rank !== 'Vice President' &&
    p.rank !== 'Secretary of State' &&
    p.rank !== 'Secretary of War'
  );
}
