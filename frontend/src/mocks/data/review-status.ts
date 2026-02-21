// Tracking file for systematic data review
// This tracks which people and events have been thoroughly examined
// and which still need review

export interface ReviewStatus {
  // People who have been thoroughly examined (complete battle list verified)
  reviewedPeople: number[];

  // People still pending review
  pendingPeople: number[];

  // Events that have been thoroughly examined (complete participant list verified)
  reviewedEvents: number[];

  // Events still pending review
  pendingEvents: number[];

  // Notes about gaps discovered during review
  notes: string[];

  // Last updated timestamp
  lastUpdated: string;
}

// Current review status
export const reviewStatus: ReviewStatus = {
  // IDs of people we've thoroughly examined
  reviewedPeople: [
    // Union commanders (base)
    1,   // Ulysses S. Grant - 13 battles
    2,   // William T. Sherman - 10 battles
    3,   // George B. McClellan - 8 battles
    4,   // George G. Meade - 9 battles
    5,   // Philip Sheridan - 9 battles
    6,   // George Thomas - 6 battles
    7,   // Ambrose E. Burnside - 5 battles
    8,   // Joseph Hooker - 5 battles
    9,   // Irvin McDowell - 2 battles
    10,  // Don Carlos Buell - 3 battles
    11,  // William Rosecrans - 5 battles
    12,  // John Pope - 2 battles
    // Confederate commanders (base)
    20,  // Robert E. Lee - 17 battles
    21,  // Stonewall Jackson - 13 battles
    22,  // James Longstreet - 10 battles
    23,  // P.G.T. Beauregard - 4 battles
    24,  // Joseph E. Johnston - 5 battles
    25,  // J.E.B. Stuart - 9 battles
    26,  // Braxton Bragg - 7 battles
    27,  // John Bell Hood - 11 battles
    28,  // Nathan Bedford Forrest - 4 battles
    29,  // A.P. Hill - 13 battles
    30,  // Jubal Early - 10 battles
    // Union corps/division commanders (batch2)
    50,  // Winfield Scott Hancock - 9 battles
    51,  // John F. Reynolds - 4 battles
    52,  // Daniel Sickles - 2 battles
    53,  // John Sedgwick - 7 battles
    54,  // Oliver O. Howard - 6 battles
    55,  // Henry W. Slocum - 6 battles
    56,  // Gouverneur K. Warren - 4 battles
    57,  // Andrew A. Humphreys - 5 battles
    58,  // Horatio G. Wright - 6 battles
    59,  // James B. McPherson - 3 battles
    60,  // John Schofield - 2 battles
    61,  // David D. Porter (Admiral) - 2 battles
    62,  // David G. Farragut (Admiral) - 2 battles
    63,  // Fitz John Porter - 4 battles
    64,  // William B. Franklin - 3 battles
    65,  // Edwin V. Sumner - 2 battles
    67,  // Alfred Pleasonton - 2 battles
    68,  // Judson Kilpatrick - 2 battles
    69,  // Wesley Merritt - 3 battles
    70,  // George Custer - 5 battles
    71,  // Benjamin Butler - 1 battle
    72,  // Nathaniel P. Banks - 2 battles
    74,  // Carl Schurz - 3 battles
    // Confederate corps/division commanders (batch2)
    80,  // Richard S. Ewell - 8 battles
    81,  // D.H. Hill - 4 battles
    82,  // John B. Gordon - 11 battles
    83,  // Lafayette McLaws - 5 battles
    84,  // George Pickett - 5 battles
    86,  // Leonidas Polk - 4 battles
    87,  // William J. Hardee - 7 battles
    88,  // Patrick Cleburne - 9 battles
    89,  // Wade Hampton - 8 battles
    90,  // Fitzhugh Lee - 4 battles
    91,  // Joseph Wheeler - 9 battles
    93,  // Franklin Buchanan (Admiral) - 2 battles
    96,  // Cadmus M. Wilcox - 3 battles
    97,  // John Hunt Morgan - 2 battles
    98,  // Earl Van Dorn - 1 battle
    99,  // Sterling Price - 2 battles
    100, // William Barksdale - 3 battles
    101, // Lewis Armistead - 1 battle
    102, // Richard B. Garnett - 1 battle
    103, // James J. Pettigrew - 1 battle
    104, // John Gregg - 2 battles
    // Western Theater commanders
    119, // Simon Bolivar Buckner - 3 battles
    120, // John C. Pemberton - 1 battle
    // Artillery
    127, // Robert Gould Shaw - 1 battle
    128, // Alexander McCook - 2 battles
    129, // Thomas Crittenden - 2 battles
    130, // Henry Hunt - 3 battles
    131, // Edward Porter Alexander - 3 battles
  ],

  // IDs of people pending review (mostly civilians/politicians, some remaining military)
  pendingPeople: [
    40, 41, 42, 43, 44, 45,  // Political leaders (Lincoln, Davis, cabinet)
    66,  // Rutherford B. Hayes (minor military role)
    73,  // Franz Sigel (needs events)
    85,  // John Bell Hood (duplicate of 27)
    92,  // Raphael Semmes (commerce raider, no land battles)
    94,  // John S. Mosby (partisan, raids not tracked)
    95,  // William E. Jones (cavalry, minor)
    105, // Archibald Gracie Jr. (Petersburg, killed)
    // Civilians
    110, 111, 112, 113, 114, 115, 116, 117, 118,
    125, 126,  // Black soldiers/officers (need Fort Wagner event)
  ],

  // IDs of events we've thoroughly examined (all major participants linked)
  reviewedEvents: [
    // Major battles with complete participant lists
    1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31,
    // Added battles
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
    43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
    // Naval battles
    54, 55, 56, 57,
    // Fort Wagner (54th Massachusetts)
    58,
  ],

  // IDs of events pending review
  pendingEvents: [
    3, 4, 32,  // Minor battles (Cheat Mountain, Ball's Bluff) and Lincoln assassination
  ],

  notes: [
    "Initial review status created. Starting systematic review of all figures.",
    "Priority: Start with major commanders (Grant, Lee, Sherman, etc.) as they touch the most events",
    "[McClellan reviewed] Added 5 battles: Rich Mountain, Corrick's Ford, Yorktown, Williamsburg, South Mountain",
    "[Lee reviewed] Added 2 battles: North Anna, Five Forks. Now has 17 battles.",
    "[Grant reviewed] Added 3 battles: Fort Henry, Iuka, Corinth. Now has 13 battles.",
    "[Jackson reviewed] Added 7 battles: Valley Campaign (Kernstown, McDowell, Front Royal, Winchester, Cross Keys, Port Republic) + Cedar Mountain. Now has 13 battles.",
    "[Sherman reviewed] Added 4 battles: Resaca, Kennesaw Mountain, Jonesborough, Bentonville. Now has 10 battles.",
    "[Troop Strength] Added approximate peak troop strength values to all 27 trackable commanders. Ranges from 4k (Custer) to 130k (Hooker). Visualization toggle added.",
    "[Systematic Review Complete] 75+ military commanders reviewed. Added: Humphreys, Wright, Pleasonton, Kilpatrick, Merritt, Schurz, Fitzhugh Lee, Gregg, Buckner, Pemberton, Hunt, Alexander, McCook, Crittenden. Naval officers: Farragut, Porter, Buchanan. 54 of 57 events reviewed.",
    "[Fort Wagner] Added event 58 - Second Battle of Fort Wagner (54th Massachusetts assault). Shaw properly linked. 55 of 58 events now reviewed.",
  ],

  lastUpdated: new Date().toISOString(),
};

// Helper to mark a person as reviewed
export function markPersonReviewed(personId: number): void {
  const idx = reviewStatus.pendingPeople.indexOf(personId);
  if (idx > -1) {
    reviewStatus.pendingPeople.splice(idx, 1);
    reviewStatus.reviewedPeople.push(personId);
    reviewStatus.lastUpdated = new Date().toISOString();
  }
}

// Helper to mark an event as reviewed
export function markEventReviewed(eventId: number): void {
  const idx = reviewStatus.pendingEvents.indexOf(eventId);
  if (idx > -1) {
    reviewStatus.pendingEvents.splice(idx, 1);
    reviewStatus.reviewedEvents.push(eventId);
    reviewStatus.lastUpdated = new Date().toISOString();
  }
}

// Helper to add a note
export function addReviewNote(note: string): void {
  reviewStatus.notes.push(`[${new Date().toISOString()}] ${note}`);
  reviewStatus.lastUpdated = new Date().toISOString();
}

// Get review progress
export function getReviewProgress(): {
  peopleReviewed: number;
  peopleTotal: number;
  peoplePercent: number;
  eventsReviewed: number;
  eventsTotal: number;
  eventsPercent: number;
} {
  const peopleTotal = reviewStatus.reviewedPeople.length + reviewStatus.pendingPeople.length;
  const eventsTotal = reviewStatus.reviewedEvents.length + reviewStatus.pendingEvents.length;

  return {
    peopleReviewed: reviewStatus.reviewedPeople.length,
    peopleTotal,
    peoplePercent: Math.round((reviewStatus.reviewedPeople.length / peopleTotal) * 100),
    eventsReviewed: reviewStatus.reviewedEvents.length,
    eventsTotal,
    eventsPercent: Math.round((reviewStatus.reviewedEvents.length / eventsTotal) * 100),
  };
}
