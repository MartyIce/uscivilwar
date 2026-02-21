import type { EventParticipant } from '../../types';

// N-N Join table: Links people to events with their roles
// This allows querying "which battles was Lee in?" and "who fought at Gettysburg?"
export const eventParticipants: EventParticipant[] = [
  // ==================== FORT SUMTER (event 1) ====================
  { event_id: 1, person_id: 23, role: 'commander', side: 'confederate', unit_commanded: 'Confederate Forces', rank_at_time: 'Brigadier General' },

  // ==================== FIRST BULL RUN (event 2) ====================
  { event_id: 2, person_id: 9, role: 'commander', side: 'union', unit_commanded: 'Army of Northeastern Virginia', rank_at_time: 'Brigadier General' },
  { event_id: 2, person_id: 23, role: 'commander', side: 'confederate', unit_commanded: 'Army of the Potomac (CSA)', rank_at_time: 'Brigadier General' },
  { event_id: 2, person_id: 24, role: 'commander', side: 'confederate', unit_commanded: 'Army of the Shenandoah', rank_at_time: 'Brigadier General' },
  { event_id: 2, person_id: 21, role: 'commander', side: 'confederate', unit_commanded: '1st Virginia Brigade', rank_at_time: 'Brigadier General' },

  // ==================== CHEAT MOUNTAIN (event 3) - LEE'S FIRST ====================
  { event_id: 3, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Confederate Forces in Western Virginia', rank_at_time: 'General' },

  // ==================== FORT DONELSON (event 5) ====================
  { event_id: 5, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Brigadier General' },

  // ==================== SHILOH (event 6) ====================
  { event_id: 6, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },
  { event_id: 6, person_id: 2, role: 'subordinate', side: 'union', unit_commanded: '5th Division', rank_at_time: 'Brigadier General' },
  { event_id: 6, person_id: 10, role: 'commander', side: 'union', unit_commanded: 'Army of the Ohio', rank_at_time: 'Brigadier General' },
  { event_id: 6, person_id: 23, role: 'commander', side: 'confederate', unit_commanded: 'Army of the Mississippi', rank_at_time: 'General' },

  // ==================== SEVEN PINES (event 7) - LEE TAKES COMMAND ====================
  { event_id: 7, person_id: 3, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 7, person_id: 24, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 7, person_id: 20, role: 'subordinate', side: 'confederate', unit_commanded: 'Military Adviser', rank_at_time: 'General' },

  // ==================== SEVEN DAYS (event 8) - LEE'S FIRST OFFENSIVE ====================
  { event_id: 8, person_id: 3, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 8, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 8, person_id: 21, role: 'subordinate', side: 'confederate', unit_commanded: "Jackson's Corps", rank_at_time: 'Major General' },
  { event_id: 8, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: "Longstreet's Division", rank_at_time: 'Major General' },

  // ==================== SECOND BULL RUN (event 9) ====================
  { event_id: 9, person_id: 12, role: 'commander', side: 'union', unit_commanded: 'Army of Virginia', rank_at_time: 'Major General' },
  { event_id: 9, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 9, person_id: 21, role: 'subordinate', side: 'confederate', unit_commanded: "Jackson's Wing", rank_at_time: 'Major General' },
  { event_id: 9, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: "Longstreet's Wing", rank_at_time: 'Major General' },

  // ==================== ANTIETAM (event 10) ====================
  { event_id: 10, person_id: 3, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 10, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 10, person_id: 21, role: 'subordinate', side: 'confederate', unit_commanded: "Jackson's Corps", rank_at_time: 'Major General' },
  { event_id: 10, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: "Longstreet's Corps", rank_at_time: 'Major General' },

  // ==================== PERRYVILLE (event 11) ====================
  { event_id: 11, person_id: 10, role: 'commander', side: 'union', unit_commanded: 'Army of the Ohio', rank_at_time: 'Major General' },
  { event_id: 11, person_id: 26, role: 'commander', side: 'confederate', unit_commanded: 'Army of the Mississippi', rank_at_time: 'General' },

  // ==================== FREDERICKSBURG (event 12) ====================
  { event_id: 12, person_id: 7, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 12, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 12, person_id: 21, role: 'subordinate', side: 'confederate', unit_commanded: 'Second Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 12, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: 'First Corps', rank_at_time: 'Lieutenant General' },

  // ==================== STONES RIVER (event 13) ====================
  { event_id: 13, person_id: 11, role: 'commander', side: 'union', unit_commanded: 'Army of the Cumberland', rank_at_time: 'Major General' },
  { event_id: 13, person_id: 26, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },

  // ==================== CHANCELLORSVILLE (event 14) ====================
  { event_id: 14, person_id: 8, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 14, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 14, person_id: 21, role: 'subordinate', side: 'confederate', unit_commanded: 'Second Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 14, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: 'First Corps', rank_at_time: 'Lieutenant General' },

  // ==================== VICKSBURG (event 15) ====================
  { event_id: 15, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },
  { event_id: 15, person_id: 2, role: 'subordinate', side: 'union', unit_commanded: 'XV Corps', rank_at_time: 'Major General' },

  // ==================== GETTYSBURG (event 16) ====================
  { event_id: 16, person_id: 4, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 16, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: 'First Corps', rank_at_time: 'Lieutenant General' },

  // ==================== CHICKAMAUGA (event 17) ====================
  { event_id: 17, person_id: 11, role: 'commander', side: 'union', unit_commanded: 'Army of the Cumberland', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 6, role: 'subordinate', side: 'union', unit_commanded: 'XIV Corps', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 26, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },
  { event_id: 17, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: "Longstreet's Corps", rank_at_time: 'Lieutenant General' },

  // ==================== CHATTANOOGA (event 18) ====================
  { event_id: 18, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Military Division of the Mississippi', rank_at_time: 'Major General' },
  { event_id: 18, person_id: 6, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Cumberland', rank_at_time: 'Major General' },
  { event_id: 18, person_id: 2, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },
  { event_id: 18, person_id: 26, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },

  // ==================== WILDERNESS (event 19) ====================
  { event_id: 19, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Armies of the United States', rank_at_time: 'Lieutenant General' },
  { event_id: 19, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 19, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 19, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: 'First Corps', rank_at_time: 'Lieutenant General' },

  // ==================== SPOTSYLVANIA (event 20) ====================
  { event_id: 20, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Armies of the United States', rank_at_time: 'Lieutenant General' },
  { event_id: 20, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 20, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },

  // ==================== COLD HARBOR (event 21) ====================
  { event_id: 21, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Armies of the United States', rank_at_time: 'Lieutenant General' },
  { event_id: 21, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 21, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },

  // ==================== PETERSBURG SIEGE (event 22) ====================
  { event_id: 22, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Armies of the United States', rank_at_time: 'Lieutenant General' },
  { event_id: 22, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 22, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },

  // ==================== ATLANTA (event 23) ====================
  { event_id: 23, person_id: 2, role: 'commander', side: 'union', unit_commanded: 'Military Division of the Mississippi', rank_at_time: 'Major General' },
  { event_id: 23, person_id: 27, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },

  // ==================== FALL OF ATLANTA (event 24) ====================
  { event_id: 24, person_id: 2, role: 'commander', side: 'union', unit_commanded: 'Military Division of the Mississippi', rank_at_time: 'Major General' },
  { event_id: 24, person_id: 27, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },

  // ==================== CEDAR CREEK (event 25) ====================
  { event_id: 25, person_id: 5, role: 'commander', side: 'union', unit_commanded: 'Army of the Shenandoah', rank_at_time: 'Major General' },
  { event_id: 25, person_id: 30, role: 'commander', side: 'confederate', unit_commanded: 'Army of the Valley', rank_at_time: 'Lieutenant General' },

  // ==================== MARCH TO THE SEA (event 26) ====================
  { event_id: 26, person_id: 2, role: 'commander', side: 'union', unit_commanded: 'Military Division of the Mississippi', rank_at_time: 'Major General' },

  // ==================== FRANKLIN (event 27) ====================
  { event_id: 27, person_id: 27, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },

  // ==================== NASHVILLE (event 28) ====================
  { event_id: 28, person_id: 6, role: 'commander', side: 'union', unit_commanded: 'Army of the Cumberland', rank_at_time: 'Major General' },
  { event_id: 28, person_id: 27, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },

  // ==================== FALL OF PETERSBURG (event 29) ====================
  { event_id: 29, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Armies of the United States', rank_at_time: 'Lieutenant General' },
  { event_id: 29, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 29, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },

  // ==================== SAYLER'S CREEK (event 30) ====================
  { event_id: 30, person_id: 5, role: 'commander', side: 'union', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 30, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },

  // ==================== APPOMATTOX (event 31) ====================
  { event_id: 31, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Armies of the United States', rank_at_time: 'Lieutenant General' },
  { event_id: 31, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },

  // ==================== LINCOLN (present at key events) ====================
  { event_id: 32, person_id: 40, role: 'participant', side: 'union', rank_at_time: 'President' },
];

// Helper functions for querying the join table
export function getEventParticipants(eventId: number): EventParticipant[] {
  return eventParticipants.filter(ep => ep.event_id === eventId);
}

export function getPersonEvents(personId: number): EventParticipant[] {
  return eventParticipants.filter(ep => ep.person_id === personId);
}

export function getEventsByPerson(personId: number): number[] {
  return eventParticipants
    .filter(ep => ep.person_id === personId)
    .map(ep => ep.event_id);
}

export function getPeopleAtEvent(eventId: number): number[] {
  return eventParticipants
    .filter(ep => ep.event_id === eventId)
    .map(ep => ep.person_id);
}
