import type { Person, Side } from '../types';

/**
 * Consolidated Civil War people data
 *
 * This file merges and deduplicates people from the original three files:
 * - people.ts (IDs 1-54, with image URLs)
 * - people-batch2.ts (IDs 50-159)
 * - people-expanded.ts (combined view)
 *
 * ID Schema:
 * - 1-14: Union high command
 * - 20-33: Confederate high command
 * - 40-45: Political leaders
 * - 50-79: Union corps/division commanders
 * - 80-109: Confederate corps/division commanders
 * - 110-129: Civilians, politicians, notable figures
 * - 130-159: Artillery, additional commanders
 */

export const allPeople: Person[] = [
  // ==================== UNION HIGH COMMAND (1-14) ====================
  {
    id: 1,
    name: "Ulysses S. Grant",
    birth_date: "1822-04-27",
    death_date: "1885-07-23",
    side: "union",
    rank: "Lieutenant General",
    highest_rank: "General of the Army",
    biography: "Commanding general of the Union Army. His victories at Vicksburg and Chattanooga led to his appointment as general-in-chief. Later served as 18th President.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ulysses_S_Grant_by_Brady_c1870-restored.jpg/440px-Ulysses_S_Grant_by_Brady_c1870-restored.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/William-Tecumseh-Sherman.jpg/440px-William-Tecumseh-Sherman.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/George_B._McClellan_-_retouched.jpg/440px-George_B._McClellan_-_retouched.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/George_Meade_Standing.jpg/440px-George_Meade_Standing.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Philip_Sheridan_1.jpg/440px-Philip_Sheridan_1.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/Philip_Sheridan"
  },
  {
    id: 6,
    name: "George Henry Thomas",
    birth_date: "1816-07-31",
    death_date: "1870-03-28",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Known as the 'Rock of Chickamauga' for his steadfast defense. Won a decisive victory at Nashville.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/George_H._Thomas_-_Brady-Handy.jpg/440px-George_H._Thomas_-_Brady-Handy.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Ambrose_Burnside_-_retouched.jpg/440px-Ambrose_Burnside_-_retouched.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hooker_-_Brady-Handy.jpg/440px-Hooker_-_Brady-Handy.jpg",
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
  {
    id: 13,
    name: "David G. Farragut",
    birth_date: "1801-07-05",
    death_date: "1870-08-14",
    side: "union",
    rank: "Rear Admiral",
    highest_rank: "Admiral",
    biography: "Famous for 'Damn the torpedoes, full speed ahead!' at Mobile Bay. First rear admiral, vice admiral, and admiral in U.S. Navy history. Captured New Orleans in 1862.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rear_Admiral_David_G._Farragut.jpg/440px-Rear_Admiral_David_G._Farragut.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/David_Farragut"
  },
  {
    id: 14,
    name: "George Custer",
    birth_date: "1839-12-05",
    death_date: "1876-06-25",
    side: "union",
    rank: "Brevet Major General",
    highest_rank: "Brevet Major General",
    biography: "Became the youngest general in the Union Army at 23. Flamboyant cavalry commander who played key roles at Gettysburg and in the Shenandoah Valley. Later killed at Little Bighorn.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Custer_Bvt_MG_Geo_A_1865_LC-BH831-365-crop.jpg/440px-Custer_Bvt_MG_Geo_A_1865_LC-BH831-365-crop.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/George_Armstrong_Custer"
  },

  // ==================== CONFEDERATE HIGH COMMAND (20-33) ====================
  {
    id: 20,
    name: "Robert E. Lee",
    birth_date: "1807-01-19",
    death_date: "1870-10-12",
    side: "confederate",
    rank: "General",
    highest_rank: "General-in-Chief",
    biography: "Commanding general of the Army of Northern Virginia. Known for tactical brilliance. Surrendered to Grant at Appomattox.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Robert_Edward_Lee.jpg/440px-Robert_Edward_Lee.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Stonewall_Jackson_by_Routzahn%2C_1862.png/440px-Stonewall_Jackson_by_Routzahn%2C_1862.png",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/James_Longstreet.jpg/440px-James_Longstreet.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/G.T._Beauregard.jpg/440px-G.T._Beauregard.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Joseph_E._Johnston.jpg/440px-Joseph_E._Johnston.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Jeb_stuart.jpg/440px-Jeb_stuart.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Braxton_Bragg.jpg/440px-Braxton_Bragg.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/John_Bell_Hood.jpg/440px-John_Bell_Hood.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nathan_Bedford_Forrest.jpg/440px-Nathan_Bedford_Forrest.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ap_hill.jpg/440px-Ap_hill.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Jubal_early.jpg/440px-Jubal_early.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/Jubal_Early"
  },
  {
    id: 31,
    name: "Richard S. Ewell",
    birth_date: "1817-02-08",
    death_date: "1872-01-25",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Lost a leg at Second Bull Run. Replaced Jackson as II Corps commander but was indecisive at Gettysburg.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Richard_Stoddert_Ewell.png/440px-Richard_Stoddert_Ewell.png",
    wikipedia_url: "https://en.wikipedia.org/wiki/Richard_S._Ewell"
  },
  {
    id: 32,
    name: "George Pickett",
    birth_date: "1825-01-16",
    death_date: "1875-07-30",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Led the famous 'Pickett's Charge' at Gettysburg. His division was devastated in the failed assault.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/George_E._Pickett.jpg/440px-George_E._Pickett.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/George_Pickett"
  },
  {
    id: 33,
    name: "John S. Mosby",
    birth_date: "1833-12-06",
    death_date: "1916-05-30",
    side: "confederate",
    rank: "Colonel",
    highest_rank: "Colonel",
    biography: "'Gray Ghost' - led partisan rangers in Northern Virginia. His raids were so effective the area was called 'Mosby's Confederacy.'",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Col_John_S_Mosby.jpg/440px-Col_John_S_Mosby.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/John_S._Mosby"
  },

  // ==================== POLITICAL LEADERS (40-45) ====================
  {
    id: 40,
    name: "Abraham Lincoln",
    birth_date: "1809-02-12",
    death_date: "1865-04-15",
    side: "union",
    rank: "President",
    highest_rank: "President",
    biography: "16th President of the United States. Led the nation through the Civil War. Issued the Emancipation Proclamation. Assassinated by John Wilkes Booth.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/440px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
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
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/President-Jefferson-Davis.jpg/440px-President-Jefferson-Davis.jpg",
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
  },

  // ==================== UNION CORPS/DIVISION COMMANDERS (50-79) ====================
  {
    id: 50,
    name: "Winfield Scott Hancock",
    birth_date: "1824-02-14",
    death_date: "1886-02-09",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Known as 'Hancock the Superb.' Commanded II Corps with distinction at Gettysburg where he was wounded repelling Pickett's Charge.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Winfield_Scott_Hancock_-_Brady-Handy.jpg/440px-Winfield_Scott_Hancock_-_Brady-Handy.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/Winfield_Scott_Hancock"
  },
  {
    id: 51,
    name: "John F. Reynolds",
    birth_date: "1820-09-20",
    death_date: "1863-07-01",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Highly respected corps commander killed on the first day of Gettysburg. Considered one of the Union's best generals.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/John_F._Reynolds.png/440px-John_F._Reynolds.png",
    wikipedia_url: "https://en.wikipedia.org/wiki/John_F._Reynolds"
  },
  {
    id: 52,
    name: "Daniel Sickles",
    birth_date: "1819-10-20",
    death_date: "1914-05-03",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Controversial III Corps commander. His unauthorized advance at Gettysburg created a salient; lost his leg to a cannonball.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Daniel_Sickles"
  },
  {
    id: 53,
    name: "John Sedgwick",
    birth_date: "1813-09-13",
    death_date: "1864-05-09",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "'Uncle John' commanded VI Corps. Killed by a Confederate sharpshooter at Spotsylvania after saying 'they couldn't hit an elephant.'",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/John_Sedgwick_-_Brady-Handy.jpg/440px-John_Sedgwick_-_Brady-Handy.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/John_Sedgwick"
  },
  {
    id: 54,
    name: "Oliver O. Howard",
    birth_date: "1830-11-08",
    death_date: "1909-10-26",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Lost his right arm at Fair Oaks. Led XI Corps at Chancellorsville and Gettysburg; later commanded Army of the Tennessee under Sherman.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Oliver_Otis_Howard"
  },
  {
    id: 55,
    name: "Henry W. Slocum",
    birth_date: "1827-09-24",
    death_date: "1894-04-14",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded XII Corps at Gettysburg and led the left wing of Sherman's army during the March to the Sea.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Henry_Warner_Slocum"
  },
  {
    id: 56,
    name: "Gouverneur K. Warren",
    birth_date: "1830-01-08",
    death_date: "1882-08-08",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Chief engineer who recognized Little Round Top's importance at Gettysburg. Later commanded V Corps; controversially relieved at Five Forks.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Gouverneur_K._Warren"
  },
  {
    id: 57,
    name: "Andrew A. Humphreys",
    birth_date: "1810-11-02",
    death_date: "1883-12-27",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Led a division at Fredericksburg; became Meade's chief of staff, then commanded II Corps in the final campaigns.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Andrew_A._Humphreys"
  },
  {
    id: 58,
    name: "Horatio G. Wright",
    birth_date: "1820-03-06",
    death_date: "1899-07-02",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Took command of VI Corps after Sedgwick's death. Led the corps through Petersburg and to Appomattox.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Horatio_G._Wright"
  },
  {
    id: 59,
    name: "James B. McPherson",
    birth_date: "1828-11-14",
    death_date: "1864-07-22",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded Army of the Tennessee under Sherman. Killed at the Battle of Atlanta - highest ranking Union officer killed in action.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/James_B._McPherson"
  },
  {
    id: 60,
    name: "John Schofield",
    birth_date: "1831-09-29",
    death_date: "1906-03-04",
    side: "union",
    rank: "Major General",
    highest_rank: "Lieutenant General",
    biography: "Commanded Army of the Ohio. Won the Battle of Franklin and later served as Secretary of War and Commanding General of the Army.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_Schofield"
  },
  {
    id: 61,
    name: "David D. Porter",
    birth_date: "1813-06-08",
    death_date: "1891-02-13",
    side: "union",
    rank: "Rear Admiral",
    highest_rank: "Admiral",
    biography: "Led the Mississippi Squadron at Vicksburg. Second naval officer to hold the rank of Admiral (after Farragut).",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/David_Dixon_Porter"
  },
  {
    id: 63,
    name: "Fitz John Porter",
    birth_date: "1822-08-31",
    death_date: "1901-05-21",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Led V Corps in the Peninsula and Second Bull Run campaigns. Court-martialed after Second Bull Run but later vindicated.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Fitz_John_Porter"
  },
  {
    id: 64,
    name: "William B. Franklin",
    birth_date: "1823-02-27",
    death_date: "1903-03-08",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Led VI Corps, then Left Grand Division at Fredericksburg. Blamed for the defeat and never held significant command again.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_B._Franklin"
  },
  {
    id: 65,
    name: "Edwin V. Sumner",
    birth_date: "1797-01-30",
    death_date: "1863-03-21",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Oldest active field commander. Led II Corps at Antietam and Right Grand Division at Fredericksburg. Died en route to new command.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Edwin_Vose_Sumner.jpg/440px-Edwin_Vose_Sumner.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/Edwin_V._Sumner"
  },
  {
    id: 66,
    name: "Rutherford B. Hayes",
    birth_date: "1822-10-04",
    death_date: "1893-01-17",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Wounded five times during the war. Later became the 19th President of the United States.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Rutherford_B._Hayes"
  },
  {
    id: 67,
    name: "Alfred Pleasonton",
    birth_date: "1824-06-07",
    death_date: "1897-02-17",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Led the Cavalry Corps of the Army of the Potomac during the Gettysburg Campaign. Known for exaggerating his accomplishments.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Alfred_Pleasonton"
  },
  {
    id: 68,
    name: "Judson Kilpatrick",
    birth_date: "1836-01-14",
    death_date: "1881-12-04",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Aggressive cavalry commander known as 'Kill-Cavalry' for his reckless tactics that caused high casualties among his men.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Judson_Kilpatrick"
  },
  {
    id: 69,
    name: "Wesley Merritt",
    birth_date: "1834-06-16",
    death_date: "1910-12-03",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Rose from captain to major general during the war. One of Sheridan's most trusted cavalry commanders.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Wesley_Merritt"
  },
  {
    id: 70,
    name: "Benjamin Butler",
    birth_date: "1818-11-05",
    death_date: "1893-01-11",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Political general who commanded at New Orleans and later the Army of the James. Controversial but declared escaped slaves 'contraband.'",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Benjamin_Butler"
  },
  {
    id: 71,
    name: "Nathaniel P. Banks",
    birth_date: "1816-01-30",
    death_date: "1894-09-01",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Political general who led unsuccessful Red River Campaign. Previously Governor of Massachusetts and Speaker of the House.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Nathaniel_P._Banks"
  },
  {
    id: 72,
    name: "Franz Sigel",
    birth_date: "1824-11-18",
    death_date: "1902-08-21",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "German-American general. His presence encouraged German immigrants to join the Union. 'I fights mit Sigel' was a popular phrase.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Franz_Sigel"
  },
  {
    id: 73,
    name: "Carl Schurz",
    birth_date: "1829-03-02",
    death_date: "1906-05-14",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "German-American general and statesman. Led a division at Second Bull Run and Gettysburg. Later served as Secretary of the Interior.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Carl_Schurz"
  },

  // ==================== CONFEDERATE CORPS/DIVISION COMMANDERS (80-109) ====================
  {
    id: 80,
    name: "D.H. Hill",
    birth_date: "1821-07-12",
    death_date: "1889-09-24",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Fought at Seven Pines, Seven Days, Antietam, and Chickamauga. Known for harsh criticism of fellow officers.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Daniel_Harvey_Hill"
  },
  {
    id: 81,
    name: "John B. Gordon",
    birth_date: "1832-02-06",
    death_date: "1904-01-09",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Rose from captain to corps commander. Wounded five times at Antietam alone. Later served as Governor and Senator from Georgia.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_Brown_Gordon"
  },
  {
    id: 82,
    name: "Lafayette McLaws",
    birth_date: "1821-01-15",
    death_date: "1897-07-24",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Division commander under Longstreet at Fredericksburg, Chancellorsville, Gettysburg, and Chickamauga.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Lafayette_McLaws"
  },
  {
    id: 83,
    name: "Leonidas Polk",
    birth_date: "1806-04-10",
    death_date: "1864-06-14",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "'Fighting Bishop' - Episcopal bishop who became a general. Killed by artillery at Pine Mountain during Atlanta Campaign.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Leonidas_Polk"
  },
  {
    id: 84,
    name: "William J. Hardee",
    birth_date: "1815-10-12",
    death_date: "1873-11-06",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Wrote the standard infantry tactics manual used by both sides. Corps commander in the Western Theater.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_J._Hardee"
  },
  {
    id: 85,
    name: "Patrick Cleburne",
    birth_date: "1828-03-16",
    death_date: "1864-11-30",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "'Stonewall of the West' - Irish-born division commander. Advocated arming slaves; killed at Franklin.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Patrick_Cleburne"
  },
  {
    id: 86,
    name: "Wade Hampton",
    birth_date: "1818-03-28",
    death_date: "1902-04-11",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Wealthy planter who raised his own legion. Succeeded Stuart as cavalry commander. Later served as Governor and Senator from SC.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Wade_Hampton_III"
  },
  {
    id: 87,
    name: "Fitzhugh Lee",
    birth_date: "1835-11-19",
    death_date: "1905-04-28",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Robert E. Lee's nephew. Cavalry division commander. Later served as Governor of Virginia and consul general to Havana.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Fitzhugh_Lee"
  },
  {
    id: 88,
    name: "Joseph Wheeler",
    birth_date: "1836-09-10",
    death_date: "1906-01-25",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "'Fighting Joe' - cavalry commander in the Western Theater. Later served as US general in Spanish-American War.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Joseph_Wheeler"
  },
  {
    id: 89,
    name: "Raphael Semmes",
    birth_date: "1809-09-27",
    death_date: "1877-08-30",
    side: "confederate",
    rank: "Rear Admiral",
    highest_rank: "Rear Admiral",
    biography: "Commander of CSS Alabama, the most successful Confederate commerce raider. Captured or destroyed 65 Union ships.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Raphael_Semmes"
  },
  {
    id: 90,
    name: "Franklin Buchanan",
    birth_date: "1800-09-17",
    death_date: "1874-05-11",
    side: "confederate",
    rank: "Admiral",
    highest_rank: "Admiral",
    biography: "First superintendent of US Naval Academy. Commanded CSS Virginia at Hampton Roads and the Confederate fleet at Mobile Bay.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Franklin_Buchanan"
  },
  {
    id: 91,
    name: "William E. Jones",
    birth_date: "1824-05-09",
    death_date: "1864-06-05",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "'Grumble' Jones - cavalry commander known for his irritable temper. Killed at the Battle of Piedmont.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_E._Jones"
  },
  {
    id: 92,
    name: "Cadmus M. Wilcox",
    birth_date: "1824-05-29",
    death_date: "1890-12-02",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Brigade and division commander in the Army of Northern Virginia. Fought from First Bull Run to Appomattox.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Cadmus_M._Wilcox"
  },
  {
    id: 93,
    name: "John Hunt Morgan",
    birth_date: "1825-06-01",
    death_date: "1864-09-04",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Led Morgan's Raiders on daring cavalry raids into Kentucky, Indiana, and Ohio. Killed in Tennessee in 1864.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_Hunt_Morgan"
  },
  {
    id: 94,
    name: "Earl Van Dorn",
    birth_date: "1820-09-17",
    death_date: "1863-05-07",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Led Confederate cavalry raids in Mississippi. Murdered by a jealous husband over an alleged affair.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Earl_Van_Dorn"
  },
  {
    id: 95,
    name: "Sterling Price",
    birth_date: "1809-09-20",
    death_date: "1867-09-29",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Former Governor of Missouri. Led Confederate forces in the Trans-Mississippi. Fled to Mexico after the war.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Sterling_Price"
  },
  {
    id: 96,
    name: "William Barksdale",
    birth_date: "1821-08-21",
    death_date: "1863-07-02",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Led Mississippi brigade. Killed leading a charge at Gettysburg on the second day.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_Barksdale"
  },
  {
    id: 97,
    name: "Lewis Armistead",
    birth_date: "1817-02-18",
    death_date: "1863-07-03",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Led his brigade with hat on sword during Pickett's Charge. Mortally wounded reaching Union lines; his friend was Union General Hancock.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Lewis_Armistead"
  },
  {
    id: 98,
    name: "Richard B. Garnett",
    birth_date: "1817-11-21",
    death_date: "1863-07-03",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Brigade commander killed during Pickett's Charge. Had been unfairly court-martialed by Stonewall Jackson.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Richard_B._Garnett"
  },
  {
    id: 99,
    name: "James J. Pettigrew",
    birth_date: "1828-07-04",
    death_date: "1863-07-17",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Led a division in Pickett's Charge (often called Pickett-Pettigrew Charge). Mortally wounded during retreat from Gettysburg.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/J._Johnston_Pettigrew"
  },
  {
    id: 100,
    name: "John Gregg",
    birth_date: "1828-09-28",
    death_date: "1864-10-07",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Texas brigade commander. Lee tried to lead his brigade personally at the Wilderness until soldiers sent him back.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_Gregg_(general)"
  },
  {
    id: 101,
    name: "Archibald Gracie Jr.",
    birth_date: "1832-12-01",
    death_date: "1864-12-02",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Alabama brigade commander killed by a Union sharpshooter at Petersburg.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Archibald_Gracie_III"
  },

  // ==================== CIVILIANS & NOTABLE FIGURES (110-129) ====================
  {
    id: 110,
    name: "Frederick Douglass",
    birth_date: "1817-02-14",
    death_date: "1895-02-20",
    side: "union",
    rank: "Civilian",
    highest_rank: "Statesman",
    biography: "Escaped slave who became the most prominent abolitionist. Advised Lincoln and recruited Black soldiers including his own sons.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Frederick_Douglass_by_Samuel_J_Miller%2C_1847-52.png/440px-Frederick_Douglass_by_Samuel_J_Miller%2C_1847-52.png",
    wikipedia_url: "https://en.wikipedia.org/wiki/Frederick_Douglass"
  },
  {
    id: 111,
    name: "Harriet Tubman",
    birth_date: "1822-03-01",
    death_date: "1913-03-10",
    side: "union",
    rank: "Scout",
    highest_rank: "Scout",
    biography: "Led enslaved people to freedom via the Underground Railroad. Served as scout, spy, and nurse for the Union Army.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Harriet_Tubman_c1868-69.jpg/440px-Harriet_Tubman_c1868-69.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/Harriet_Tubman"
  },
  {
    id: 112,
    name: "Clara Barton",
    birth_date: "1821-12-25",
    death_date: "1912-04-12",
    side: "union",
    rank: "Nurse",
    highest_rank: "Nurse",
    biography: "'Angel of the Battlefield' - nursed wounded soldiers at Antietam, Fredericksburg, and other battles. Founded American Red Cross.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Clara_Barton_1865.jpg/440px-Clara_Barton_1865.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/Clara_Barton"
  },
  {
    id: 113,
    name: "Mathew Brady",
    birth_date: "1822-05-18",
    death_date: "1896-01-15",
    side: "union",
    rank: "Civilian",
    highest_rank: "Photographer",
    biography: "Pioneer photographer who documented the Civil War. His images brought the reality of war home to Americans.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Mathew_Brady"
  },
  {
    id: 114,
    name: "Salmon P. Chase",
    birth_date: "1808-01-13",
    death_date: "1873-05-07",
    side: "union",
    rank: "Secretary of Treasury",
    highest_rank: "Chief Justice",
    biography: "Lincoln's Secretary of the Treasury who financed the war. Later served as Chief Justice of the Supreme Court.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Salmon_P._Chase"
  },
  {
    id: 115,
    name: "Gideon Welles",
    birth_date: "1802-07-01",
    death_date: "1878-02-11",
    side: "union",
    rank: "Secretary of the Navy",
    highest_rank: "Secretary of the Navy",
    biography: "Lincoln's Secretary of the Navy who oversaw the massive expansion of the Union Navy and the successful blockade.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Gideon_Welles"
  },
  {
    id: 116,
    name: "Stephen Mallory",
    birth_date: "1813-02-02",
    death_date: "1873-11-09",
    side: "confederate",
    rank: "Secretary of the Navy",
    highest_rank: "Secretary of the Navy",
    biography: "Confederate Secretary of the Navy who championed ironclads and commerce raiders despite limited resources.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Stephen_Mallory"
  },
  {
    id: 117,
    name: "Judah P. Benjamin",
    birth_date: "1811-08-06",
    death_date: "1884-05-06",
    side: "confederate",
    rank: "Secretary of State",
    highest_rank: "Secretary of State",
    biography: "Served as Confederate Attorney General, Secretary of War, and Secretary of State. Called 'the brains of the Confederacy.'",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Judah_P._Benjamin"
  },
  {
    id: 118,
    name: "Edmund Kirby Smith",
    birth_date: "1824-05-16",
    death_date: "1893-03-28",
    side: "confederate",
    rank: "General",
    highest_rank: "General",
    biography: "Commanded the Trans-Mississippi Department. Last Confederate general to surrender (June 2, 1865).",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Edmund_Kirby_Smith"
  },
  {
    id: 119,
    name: "Simon Bolivar Buckner",
    birth_date: "1823-04-01",
    death_date: "1914-01-08",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Surrendered Fort Donelson to Grant. Later served as Governor of Kentucky and was a pallbearer at Grant's funeral.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Simon_Bolivar_Buckner"
  },
  {
    id: 120,
    name: "John C. Pemberton",
    birth_date: "1814-08-10",
    death_date: "1881-07-13",
    side: "confederate",
    rank: "Lieutenant General",
    highest_rank: "Lieutenant General",
    biography: "Pennsylvania-born Confederate who surrendered Vicksburg to Grant. Never held major command again.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_C._Pemberton"
  },
  {
    id: 125,
    name: "Robert Smalls",
    birth_date: "1839-04-05",
    death_date: "1915-02-23",
    side: "union",
    rank: "Captain",
    highest_rank: "Captain (Navy)",
    biography: "Enslaved pilot who commandeered CSS Planter and delivered it to Union forces. Later served in US Congress.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Robert_Smalls.jpg/440px-Robert_Smalls.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/Robert_Smalls"
  },
  {
    id: 126,
    name: "Martin Delany",
    birth_date: "1812-05-06",
    death_date: "1885-01-24",
    side: "union",
    rank: "Major",
    highest_rank: "Major",
    biography: "First Black line field officer in US Army history. Abolitionist and early Black nationalist.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Martin_Delany"
  },
  {
    id: 127,
    name: "Robert Gould Shaw",
    birth_date: "1837-10-10",
    death_date: "1863-07-18",
    side: "union",
    rank: "Colonel",
    highest_rank: "Colonel",
    biography: "White officer who led the 54th Massachusetts, first Black regiment raised in the North. Killed at Fort Wagner.",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Robert_Gould_Shaw_daguerreotype.jpg/440px-Robert_Gould_Shaw_daguerreotype.jpg",
    wikipedia_url: "https://en.wikipedia.org/wiki/Robert_Gould_Shaw"
  },
  {
    id: 128,
    name: "Alexander McCook",
    birth_date: "1831-04-22",
    death_date: "1903-06-12",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "One of the 'Fighting McCooks.' Led XX Corps at Stones River and Chickamauga.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Alexander_McDowell_McCook"
  },
  {
    id: 129,
    name: "Thomas Crittenden",
    birth_date: "1819-05-15",
    death_date: "1893-10-23",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Led XXI Corps at Stones River and Chickamauga. Son of Senator John J. Crittenden.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Thomas_Leonidas_Crittenden"
  },

  // ==================== ARTILLERY & ADDITIONAL COMMANDERS (130-159) ====================
  {
    id: 130,
    name: "Henry Hunt",
    birth_date: "1819-09-14",
    death_date: "1889-02-11",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Chief of Artillery, Army of the Potomac. Masterfully deployed guns at Gettysburg against Pickett's Charge.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Henry_Jackson_Hunt"
  },
  {
    id: 131,
    name: "Edward Porter Alexander",
    birth_date: "1835-05-26",
    death_date: "1910-04-28",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Chief of artillery for Longstreet's Corps. Wrote an influential memoir of the war.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Edward_Porter_Alexander"
  },
  {
    id: 132,
    name: "Albert Sidney Johnston",
    birth_date: "1803-02-02",
    death_date: "1862-04-06",
    side: "confederate",
    rank: "General",
    highest_rank: "General",
    biography: "Senior Confederate general killed at Shiloh. Considered by Jefferson Davis to be the finest soldier in the Confederacy.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Albert_Sidney_Johnston"
  },
  {
    id: 133,
    name: "Alfred Terry",
    birth_date: "1827-11-10",
    death_date: "1890-12-16",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Led the successful assault on Fort Fisher in January 1865, closing the last major Confederate port.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Alfred_Terry"
  },
  {
    id: 134,
    name: "Andrew H. Foote",
    birth_date: "1806-09-12",
    death_date: "1863-06-26",
    side: "union",
    rank: "Flag Officer",
    highest_rank: "Rear Admiral",
    biography: "Naval commander whose gunboats supported Grant's capture of Forts Henry and Donelson.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Andrew_Hull_Foote"
  },
  {
    id: 135,
    name: "Catesby ap Roger Jones",
    birth_date: "1821-04-15",
    death_date: "1877-06-20",
    side: "confederate",
    rank: "Lieutenant",
    highest_rank: "Commander",
    biography: "Executive officer of CSS Virginia who took command during the Battle of Hampton Roads after Buchanan was wounded.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Catesby_ap_Roger_Jones"
  },
  {
    id: 136,
    name: "Charles P. Stone",
    birth_date: "1824-09-30",
    death_date: "1887-01-24",
    side: "union",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Commanded at Ball's Bluff disaster. Imprisoned without charges, became a scapegoat for the defeat.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Charles_P._Stone"
  },
  {
    id: 137,
    name: "Edward D. Baker",
    birth_date: "1811-02-24",
    death_date: "1861-10-21",
    side: "union",
    rank: "Colonel",
    highest_rank: "Colonel",
    biography: "U.S. Senator and close friend of Lincoln, killed leading troops at Ball's Bluff. Only sitting senator killed in combat.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Edward_Dickinson_Baker"
  },
  {
    id: 138,
    name: "James Shields",
    birth_date: "1806-05-10",
    death_date: "1879-06-01",
    side: "union",
    rank: "Brigadier General",
    highest_rank: "Major General",
    biography: "Irish-born general who fought Jackson in the Valley Campaign. Only person to serve as senator from three states.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/James_Shields_(politician)"
  },
  {
    id: 139,
    name: "Jesse Reno",
    birth_date: "1823-04-20",
    death_date: "1862-09-14",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Killed at South Mountain. The city of Reno, Nevada is named in his honor.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Jesse_L._Reno"
  },
  {
    id: 140,
    name: "John B. Floyd",
    birth_date: "1806-06-01",
    death_date: "1863-08-26",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Former Secretary of War. Escaped Fort Donelson before its surrender, leaving his troops behind.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_B._Floyd"
  },
  {
    id: 141,
    name: "John B. Magruder",
    birth_date: "1807-05-01",
    death_date: "1871-02-19",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Known as 'Prince John' for his theatrical style. Deceived McClellan with elaborate demonstrations during the Peninsula Campaign.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_B._Magruder"
  },
  {
    id: 142,
    name: "John C. Fremont",
    birth_date: "1813-01-21",
    death_date: "1890-07-13",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Famous explorer and first Republican presidential candidate. Controversial commander in Missouri and the Valley.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_C._Fr%C3%A9mont"
  },
  {
    id: 143,
    name: "John L. Worden",
    birth_date: "1818-03-12",
    death_date: "1897-10-18",
    side: "union",
    rank: "Lieutenant",
    highest_rank: "Rear Admiral",
    biography: "Commanded USS Monitor in its historic battle against CSS Virginia at Hampton Roads.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_L._Worden"
  },
  {
    id: 144,
    name: "John Pegram",
    birth_date: "1832-01-24",
    death_date: "1865-02-06",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Major General",
    biography: "Killed at Hatcher's Run, just three weeks after his wedding in Richmond.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_Pegram_(general)"
  },
  {
    id: 145,
    name: "John R. Kenly",
    birth_date: "1818-01-11",
    death_date: "1891-12-20",
    side: "union",
    rank: "Colonel",
    highest_rank: "Brigadier General",
    biography: "Commanded at Front Royal where his force was overwhelmed by Jackson's troops.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/John_R._Kenly"
  },
  {
    id: 146,
    name: "Joseph J. Reynolds",
    birth_date: "1822-01-04",
    death_date: "1899-02-25",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded at Cheat Mountain and later served in various capacities in the Western Theater.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Joseph_J._Reynolds"
  },
  {
    id: 147,
    name: "Lloyd Tilghman",
    birth_date: "1816-01-18",
    death_date: "1863-05-16",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Commanded Fort Henry when it fell to Grant's forces. Killed at Champion Hill.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Lloyd_Tilghman"
  },
  {
    id: 148,
    name: "Mansfield Lovell",
    birth_date: "1822-10-20",
    death_date: "1884-06-01",
    side: "confederate",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded the defense of New Orleans. Made a scapegoat for the city's fall to Farragut.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Mansfield_Lovell"
  },
  {
    id: 149,
    name: "Nathan G. Evans",
    birth_date: "1824-02-03",
    death_date: "1868-11-30",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Hero of First Bull Run where his small force delayed the Union flanking attack. Known as 'Shanks.'",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Nathan_George_Evans"
  },
  {
    id: 150,
    name: "Quincy Gillmore",
    birth_date: "1825-02-28",
    death_date: "1888-04-07",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Engineer officer who captured Fort Pulaski and commanded operations against Charleston.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Quincy_Adams_Gillmore"
  },
  {
    id: 151,
    name: "Robert Anderson",
    birth_date: "1805-06-14",
    death_date: "1871-10-26",
    side: "union",
    rank: "Major",
    highest_rank: "Brigadier General",
    biography: "Commander of Fort Sumter when the Civil War began. His defense made him a Union hero.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Robert_Anderson_(Civil_War)"
  },
  {
    id: 152,
    name: "Robert C. Schenck",
    birth_date: "1809-10-04",
    death_date: "1890-03-23",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Political general wounded at Second Bull Run. Later served as congressman and diplomat.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Robert_C._Schenck"
  },
  {
    id: 153,
    name: "Robert H. Milroy",
    birth_date: "1816-06-11",
    death_date: "1890-03-29",
    side: "union",
    rank: "Major General",
    highest_rank: "Major General",
    biography: "Commanded in the Shenandoah Valley. Suffered a major defeat at Second Winchester.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Robert_H._Milroy"
  },
  {
    id: 154,
    name: "Robert S. Garnett",
    birth_date: "1819-12-16",
    death_date: "1861-07-13",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "First general officer killed in the Civil War, at the Battle of Corrick's Ford.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Robert_S._Garnett"
  },
  {
    id: 155,
    name: "Thomas A. Morris",
    birth_date: "1811-12-26",
    death_date: "1904-03-23",
    side: "union",
    rank: "Brigadier General",
    highest_rank: "Brigadier General",
    biography: "Indiana militia general who commanded early operations in western Virginia.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Thomas_A._Morris"
  },
  {
    id: 156,
    name: "Truman Seymour",
    birth_date: "1824-09-24",
    death_date: "1891-10-30",
    side: "union",
    rank: "Brigadier General",
    highest_rank: "Major General",
    biography: "Present at Fort Sumter. Commanded the failed expedition at the Battle of Olustee.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Truman_Seymour"
  },
  {
    id: 157,
    name: "William Lamb",
    birth_date: "1835-02-07",
    death_date: "1909-03-18",
    side: "confederate",
    rank: "Colonel",
    highest_rank: "Colonel",
    biography: "Defender of Fort Fisher, the last major Confederate seaport. Wounded in the final assault.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_Lamb_(colonel)"
  },
  {
    id: 158,
    name: "William Taliaferro",
    birth_date: "1822-12-28",
    death_date: "1898-02-27",
    side: "confederate",
    rank: "Brigadier General",
    highest_rank: "Major General",
    biography: "Commanded under Jackson in the Valley Campaign. Later defended Fort Wagner against the 54th Massachusetts.",
    image_url: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/William_B._Taliaferro"
  },
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Get a person by their ID
 */
export function getPersonById(id: number): Person | undefined {
  return allPeople.find(p => p.id === id);
}

/**
 * Get a person by their name (exact match)
 */
export function getPersonByName(name: string): Person | undefined {
  return allPeople.find(p => p.name === name);
}

/**
 * Find people by partial name match
 */
export function findPeopleByName(searchTerm: string): Person[] {
  const lower = searchTerm.toLowerCase();
  return allPeople.filter(p => p.name.toLowerCase().includes(lower));
}

/**
 * Get all people for a given side
 */
export function getPeopleBySide(side: Side): Person[] {
  return allPeople.filter(p => p.side === side);
}

/**
 * Get all military commanders (excluding political leaders)
 */
export function getMilitaryCommanders(): Person[] {
  const politicalRanks = ['President', 'Vice President', 'Secretary of State', 'Secretary of War', 'Secretary of Treasury', 'Secretary of the Navy', 'Civilian'];
  return allPeople.filter(p => !politicalRanks.includes(p.rank || ''));
}

// ID migration map for updating references from old IDs
// Maps: old ID -> new ID (for IDs that changed during consolidation)
export const idMigration: Record<number, number> = {
  // Note: Most IDs stayed the same. This map is for any that changed.
  // The main changes were:
  // - ID 62 (Farragut duplicate) -> use ID 13
  // - ID 70 (Custer in batch2) -> use ID 14 (but we kept 14)
  // - ID 80 (Ewell in batch2) -> use ID 31
  // - ID 84 (Pickett in batch2) -> use ID 32
  // - ID 159 (Buchanan duplicate) -> use ID 90

  // people-batch2 duplicates that should point to main IDs:
  62: 13,   // Farragut duplicate -> main Farragut
  // Note: For Ewell (80 vs 31), Pickett (84 vs 32), we keep the lower ID
  // but the event-participants.ts uses the higher IDs, so we might need to update those
};

// For backwards compatibility with existing components
export const expandedPeople = allPeople;
