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
    // Union commanders
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
    50,  // Winfield Scott Hancock - 9 battles
    53,  // John Sedgwick - 7 battles
    70,  // George Custer - 5 battles
    // Confederate commanders
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
    80,  // Richard S. Ewell - 8 battles
    82,  // John B. Gordon - 11 battles
    84,  // George Pickett - 5 battles
    87,  // William J. Hardee - 7 battles
    88,  // Patrick Cleburne - 9 battles
    89,  // Wade Hampton - 8 battles
    91,  // Joseph Wheeler - 9 battles
  ],

  // IDs of people pending review
  pendingPeople: [
    // All base people IDs 1-12, 20-30 now reviewed
    40, 41, 42, 43, 44, 45,  // Political leaders
    // From people-batch2.ts (IDs 50-131)
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74,
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    100, 101, 102, 103, 104, 105,
    110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    125, 126, 127, 128, 129, 130, 131,
  ],

  // IDs of events we've thoroughly examined
  reviewedEvents: [],

  // IDs of events pending review (current events 1-53)
  pendingEvents: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    33, 34, 35, 36, 37,  // McClellan: Rich Mountain, Corrick's Ford, Yorktown, Williamsburg, South Mountain
    38, 39,  // Lee: North Anna, Five Forks
    40, 41, 42,  // Grant: Fort Henry, Iuka, Corinth
    43, 44, 45, 46, 47, 48, 49,  // Jackson Valley Campaign + Cedar Mountain
    50, 51, 52, 53,  // Sherman Atlanta Campaign + Bentonville
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
