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

  // ==================== HANCOCK (50) - II Corps ====================
  { event_id: 10, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'Division, II Corps', rank_at_time: 'Brigadier General' },
  { event_id: 12, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'Division, II Corps', rank_at_time: 'Brigadier General' },
  { event_id: 14, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'Division, II Corps', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },
  { event_id: 19, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },
  { event_id: 20, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },
  { event_id: 21, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },
  { event_id: 22, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },

  // ==================== SEDGWICK (53) - VI Corps ====================
  { event_id: 10, person_id: 53, role: 'subordinate', side: 'union', unit_commanded: 'Division, II Corps', rank_at_time: 'Major General' },
  { event_id: 12, person_id: 53, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 14, person_id: 53, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 53, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 19, person_id: 53, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 20, person_id: 53, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },

  // ==================== HOWARD (54) - XI Corps ====================
  { event_id: 7, person_id: 54, role: 'subordinate', side: 'union', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 14, person_id: 54, role: 'subordinate', side: 'union', unit_commanded: 'XI Corps', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 54, role: 'subordinate', side: 'union', unit_commanded: 'XI Corps', rank_at_time: 'Major General' },
  { event_id: 23, person_id: 54, role: 'subordinate', side: 'union', unit_commanded: 'IV Corps', rank_at_time: 'Major General' },
  { event_id: 26, person_id: 54, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },

  // ==================== MCPHERSON (59) - Army of the Tennessee ====================
  { event_id: 15, person_id: 59, role: 'subordinate', side: 'union', unit_commanded: 'XVII Corps', rank_at_time: 'Major General' },
  { event_id: 23, person_id: 59, role: 'commander', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },

  // ==================== CUSTER (70) - Cavalry ====================
  { event_id: 16, person_id: 70, role: 'subordinate', side: 'union', unit_commanded: 'Michigan Cavalry Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 19, person_id: 70, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Brigadier General' },
  { event_id: 31, person_id: 70, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },

  // ==================== EWELL (80) - Second Corps CSA ====================
  { event_id: 9, person_id: 80, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 80, role: 'subordinate', side: 'confederate', unit_commanded: 'Second Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 19, person_id: 80, role: 'subordinate', side: 'confederate', unit_commanded: 'Second Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 20, person_id: 80, role: 'subordinate', side: 'confederate', unit_commanded: 'Second Corps', rank_at_time: 'Lieutenant General' },

  // ==================== GORDON (82) - Corps Commander ====================
  { event_id: 10, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Regiment', rank_at_time: 'Colonel' },
  { event_id: 19, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 20, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 22, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Second Corps', rank_at_time: 'Major General' },
  { event_id: 31, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Second Corps', rank_at_time: 'Major General' },

  // ==================== PICKETT (84) - Famous Charge ====================
  { event_id: 12, person_id: 84, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 84, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 29, person_id: 84, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },

  // ==================== HARDEE (87) - Western Theater ====================
  { event_id: 6, person_id: 87, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Major General' },
  { event_id: 13, person_id: 87, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 17, person_id: 87, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 18, person_id: 87, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 23, person_id: 87, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },

  // ==================== CLEBURNE (88) - Stonewall of the West ====================
  { event_id: 6, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 13, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 18, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 23, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 27, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },

  // ==================== HAMPTON (89) - Cavalry ====================
  { event_id: 2, person_id: 89, role: 'subordinate', side: 'confederate', unit_commanded: 'Hampton Legion', rank_at_time: 'Colonel' },
  { event_id: 8, person_id: 89, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 10, person_id: 89, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 16, person_id: 89, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Major General' },
  { event_id: 22, person_id: 89, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Lieutenant General' },

  // ==================== WHEELER (91) - Western Cavalry ====================
  { event_id: 6, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry', rank_at_time: 'Colonel' },
  { event_id: 13, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 18, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 23, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },

  // ==================== J.E.B. STUART (25) - Cavalry Corps ANV ====================
  { event_id: 2, person_id: 25, role: 'subordinate', side: 'confederate', unit_commanded: '1st Virginia Cavalry', rank_at_time: 'Colonel' },
  { event_id: 8, person_id: 25, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },
  { event_id: 9, person_id: 25, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },
  { event_id: 10, person_id: 25, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },
  { event_id: 12, person_id: 25, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },
  { event_id: 14, person_id: 25, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 25, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },

  // ==================== A.P. HILL (29) - Third Corps ====================
  { event_id: 8, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 9, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Light Division', rank_at_time: 'Major General' },
  { event_id: 10, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Light Division', rank_at_time: 'Major General' },
  { event_id: 12, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Light Division', rank_at_time: 'Major General' },
  { event_id: 14, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Light Division', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Third Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 19, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Third Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 20, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Third Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 22, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Third Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 29, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Third Corps', rank_at_time: 'Lieutenant General' },

  // ==================== FORREST (28) - Cavalry ====================
  { event_id: 6, person_id: 28, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Regiment', rank_at_time: 'Colonel' },
  { event_id: 17, person_id: 28, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 28, person_id: 28, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Lieutenant General' },

  // ==================== EARLY (30) - Valley Campaign ====================
  { event_id: 10, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 12, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 14, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 19, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 25, person_id: 30, role: 'commander', side: 'confederate', unit_commanded: 'Army of the Valley', rank_at_time: 'Lieutenant General' },

  // ==================== BURNSIDE (7) - IX Corps ====================
  { event_id: 10, person_id: 7, role: 'subordinate', side: 'union', unit_commanded: 'IX Corps', rank_at_time: 'Major General' },
  { event_id: 12, person_id: 7, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 19, person_id: 7, role: 'subordinate', side: 'union', unit_commanded: 'IX Corps', rank_at_time: 'Major General' },
  { event_id: 22, person_id: 7, role: 'subordinate', side: 'union', unit_commanded: 'IX Corps', rank_at_time: 'Major General' },
  { event_id: 37, person_id: 7, role: 'subordinate', side: 'union', unit_commanded: 'IX Corps', rank_at_time: 'Major General' },

  // ==================== MCCLELLAN (3) - COMPLETE BATTLE LIST ====================
  // Rich Mountain (first major victory)
  { event_id: 33, person_id: 3, role: 'commander', side: 'union', unit_commanded: 'Department of the Ohio', rank_at_time: 'Major General' },
  // Corrick's Ford (pursuit of Garnett)
  { event_id: 34, person_id: 3, role: 'commander', side: 'union', unit_commanded: 'Department of the Ohio', rank_at_time: 'Major General' },
  // Siege of Yorktown (Peninsula Campaign begins)
  { event_id: 35, person_id: 3, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  // Battle of Williamsburg (rearguard action)
  { event_id: 36, person_id: 3, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  // South Mountain (gaps battle before Antietam)
  { event_id: 37, person_id: 3, role: 'commander', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },

  // ==================== ROSECRANS (11) - Additional ====================
  { event_id: 33, person_id: 11, role: 'subordinate', side: 'union', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },

  // ==================== HOOKER (8) - Additional ====================
  { event_id: 36, person_id: 8, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },
  { event_id: 10, person_id: 8, role: 'subordinate', side: 'union', unit_commanded: 'Division, I Corps', rank_at_time: 'Brigadier General' },

  // ==================== LONGSTREET (22) - Additional ====================
  { event_id: 36, person_id: 22, role: 'commander', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 37, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },

  // ==================== D.H. HILL (81) - Additional ====================
  { event_id: 37, person_id: 81, role: 'commander', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 10, person_id: 81, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },

  // ==================== SUMNER (65) - Additional ====================
  { event_id: 36, person_id: 65, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },
  { event_id: 10, person_id: 65, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },

  // ==================== ROBERT E. LEE (20) - ADDITIONAL BATTLES ====================
  { event_id: 37, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },
  { event_id: 38, person_id: 20, role: 'commander', side: 'confederate', unit_commanded: 'Army of Northern Virginia', rank_at_time: 'General' },

  // ==================== NORTH ANNA (38) - PARTICIPANTS ====================
  { event_id: 38, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Armies of the United States', rank_at_time: 'Lieutenant General' },
  { event_id: 38, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 38, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },

  // ==================== FIVE FORKS (39) - PARTICIPANTS ====================
  { event_id: 39, person_id: 5, role: 'commander', side: 'union', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 39, person_id: 56, role: 'subordinate', side: 'union', unit_commanded: 'V Corps', rank_at_time: 'Major General' },
  { event_id: 39, person_id: 84, role: 'commander', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 39, person_id: 70, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },

  // ==================== SHERIDAN (5) - ADDITIONAL ====================
  { event_id: 31, person_id: 5, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },

  // ==================== PICKETT (84) - ADDITIONAL ====================
  // (Five Forks already added above)

  // ==================== WARREN (56) - ADDITIONAL ====================
  { event_id: 19, person_id: 56, role: 'subordinate', side: 'union', unit_commanded: 'V Corps', rank_at_time: 'Major General' },
  { event_id: 20, person_id: 56, role: 'subordinate', side: 'union', unit_commanded: 'V Corps', rank_at_time: 'Major General' },

  // ==================== GRANT (1) - ADDITIONAL BATTLES ====================
  { event_id: 40, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'District of Cairo', rank_at_time: 'Brigadier General' },
  { event_id: 41, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },
  { event_id: 42, person_id: 1, role: 'commander', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },

  // ==================== ROSECRANS (11) - IUKA/CORINTH ====================
  { event_id: 41, person_id: 11, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Mississippi', rank_at_time: 'Major General' },
  { event_id: 42, person_id: 11, role: 'commander', side: 'union', unit_commanded: 'Army of the Mississippi', rank_at_time: 'Major General' },

  // ==================== VAN DORN (98) ====================
  { event_id: 42, person_id: 98, role: 'commander', side: 'confederate', unit_commanded: 'Army of West Tennessee', rank_at_time: 'Major General' },

  // ==================== PRICE (99) ====================
  { event_id: 41, person_id: 99, role: 'commander', side: 'confederate', unit_commanded: 'Army of the West', rank_at_time: 'Major General' },
  { event_id: 42, person_id: 99, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Major General' },

  // ==================== JACKSON (21) - VALLEY CAMPAIGN ====================
  { event_id: 43, person_id: 21, role: 'commander', side: 'confederate', unit_commanded: 'Valley District', rank_at_time: 'Major General' },
  { event_id: 44, person_id: 21, role: 'commander', side: 'confederate', unit_commanded: 'Valley District', rank_at_time: 'Major General' },
  { event_id: 45, person_id: 21, role: 'commander', side: 'confederate', unit_commanded: 'Valley District', rank_at_time: 'Major General' },
  { event_id: 46, person_id: 21, role: 'commander', side: 'confederate', unit_commanded: 'Valley District', rank_at_time: 'Major General' },
  { event_id: 47, person_id: 21, role: 'commander', side: 'confederate', unit_commanded: 'Valley District', rank_at_time: 'Major General' },
  { event_id: 48, person_id: 21, role: 'commander', side: 'confederate', unit_commanded: 'Valley District', rank_at_time: 'Major General' },
  { event_id: 49, person_id: 21, role: 'commander', side: 'confederate', unit_commanded: "Jackson's Corps", rank_at_time: 'Major General' },

  // ==================== EWELL (80) - VALLEY CAMPAIGN ====================
  { event_id: 45, person_id: 80, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 46, person_id: 80, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 47, person_id: 80, role: 'commander', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 48, person_id: 80, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },

  // ==================== BANKS (72) ====================
  { event_id: 46, person_id: 72, role: 'commander', side: 'union', unit_commanded: 'Department of the Shenandoah', rank_at_time: 'Major General' },
  { event_id: 49, person_id: 72, role: 'commander', side: 'union', unit_commanded: 'II Corps, Army of Virginia', rank_at_time: 'Major General' },

  // ==================== SHERMAN (2) - ATLANTA & CAROLINAS CAMPAIGNS ====================
  { event_id: 50, person_id: 2, role: 'commander', side: 'union', unit_commanded: 'Military Division of the Mississippi', rank_at_time: 'Major General' },
  { event_id: 51, person_id: 2, role: 'commander', side: 'union', unit_commanded: 'Military Division of the Mississippi', rank_at_time: 'Major General' },
  { event_id: 52, person_id: 2, role: 'commander', side: 'union', unit_commanded: 'Military Division of the Mississippi', rank_at_time: 'Major General' },
  { event_id: 53, person_id: 2, role: 'commander', side: 'union', unit_commanded: 'Military Division of the Mississippi', rank_at_time: 'Major General' },

  // ==================== THOMAS (6) - ATLANTA CAMPAIGN ====================
  { event_id: 50, person_id: 6, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Cumberland', rank_at_time: 'Major General' },
  { event_id: 51, person_id: 6, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Cumberland', rank_at_time: 'Major General' },

  // ==================== MCPHERSON (59) - ATLANTA CAMPAIGN ====================
  { event_id: 50, person_id: 59, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },

  // ==================== SCHOFIELD (60) - ATLANTA CAMPAIGN ====================
  { event_id: 50, person_id: 60, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Ohio', rank_at_time: 'Major General' },
  { event_id: 27, person_id: 60, role: 'commander', side: 'union', unit_commanded: 'Army of the Ohio', rank_at_time: 'Major General' },

  // ==================== HOWARD (54) - ATLANTA CAMPAIGN ====================
  { event_id: 52, person_id: 54, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Tennessee', rank_at_time: 'Major General' },

  // ==================== SLOCUM (55) - CAROLINAS ====================
  { event_id: 53, person_id: 55, role: 'subordinate', side: 'union', unit_commanded: 'Left Wing', rank_at_time: 'Major General' },

  // ==================== JOE JOHNSTON (24) - ATLANTA & BENTONVILLE ====================
  { event_id: 50, person_id: 24, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },
  { event_id: 51, person_id: 24, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },
  { event_id: 53, person_id: 24, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },

  // ==================== HOOD (27) - JONESBORO ====================
  { event_id: 52, person_id: 27, role: 'commander', side: 'confederate', unit_commanded: 'Army of Tennessee', rank_at_time: 'General' },

  // ==================== HARDEE (87) - ADDITIONAL ====================
  { event_id: 52, person_id: 87, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 53, person_id: 87, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },

  // ==================== BRAGG (26) - BENTONVILLE ====================
  { event_id: 53, person_id: 26, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'General' },

  // ==================== LONGSTREET (22) - ADDITIONAL ====================
  { event_id: 2, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 10, person_id: 22, role: 'subordinate', side: 'confederate', unit_commanded: 'Wing', rank_at_time: 'Major General' },

  // ==================== MEADE (4) - ADDITIONAL ====================
  { event_id: 10, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Division, I Corps', rank_at_time: 'Brigadier General' },
  { event_id: 12, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Division, V Corps', rank_at_time: 'Major General' },
  { event_id: 14, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'V Corps', rank_at_time: 'Major General' },
  { event_id: 38, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 39, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },
  { event_id: 31, person_id: 4, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Potomac', rank_at_time: 'Major General' },

  // ==================== SHERIDAN (5) - ADDITIONAL ====================
  { event_id: 6, person_id: 5, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Colonel' },
  { event_id: 11, person_id: 5, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },
  { event_id: 13, person_id: 5, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 5, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 19, person_id: 5, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 29, person_id: 5, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },

  // ==================== BEAUREGARD (23) - ADDITIONAL ====================
  { event_id: 22, person_id: 23, role: 'subordinate', side: 'confederate', unit_commanded: 'Department of NC & Southern VA', rank_at_time: 'General' },

  // ==================== JOE JOHNSTON (24) - ADDITIONAL ====================
  { event_id: 2, person_id: 24, role: 'commander', side: 'confederate', unit_commanded: 'Army of the Shenandoah', rank_at_time: 'Brigadier General' },

  // ==================== THOMAS (6) - ADDITIONAL ====================
  { event_id: 11, person_id: 6, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },
  { event_id: 13, person_id: 6, role: 'subordinate', side: 'union', unit_commanded: 'Center Wing', rank_at_time: 'Major General' },

  // ==================== HOOKER (8) - ADDITIONAL ====================
  { event_id: 18, person_id: 8, role: 'subordinate', side: 'union', unit_commanded: 'XI & XII Corps', rank_at_time: 'Major General' },
  { event_id: 50, person_id: 8, role: 'subordinate', side: 'union', unit_commanded: 'XX Corps', rank_at_time: 'Major General' },

  // ==================== STUART (25) - ADDITIONAL ====================
  { event_id: 49, person_id: 25, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry', rank_at_time: 'Major General' },

  // ==================== FORREST (28) - ADDITIONAL ====================
  { event_id: 18, person_id: 28, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry', rank_at_time: 'Brigadier General' },

  // ==================== HANCOCK (50) - ADDITIONAL ====================
  { event_id: 38, person_id: 50, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },

  // ==================== PICKETT (84) - ADDITIONAL ====================
  { event_id: 8, person_id: 84, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },

  // ==================== HOOD (27) - ADDITIONAL ====================
  { event_id: 8, person_id: 27, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 9, person_id: 27, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 10, person_id: 27, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 27, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 27, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 50, person_id: 27, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 51, person_id: 27, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },

  // ==================== CLEBURNE (88) - ADDITIONAL ====================
  { event_id: 50, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 51, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 52, person_id: 88, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },

  // ==================== MCDOWELL (9) - BULL RUN ====================
  { event_id: 9, person_id: 9, role: 'subordinate', side: 'union', unit_commanded: 'III Corps, Army of Virginia', rank_at_time: 'Major General' },

  // ==================== BUELL (10) - WESTERN THEATER ====================
  { event_id: 13, person_id: 10, role: 'subordinate', side: 'union', unit_commanded: 'Army of the Ohio', rank_at_time: 'Major General' },

  // ==================== POPE (12) - SECOND BULL RUN ====================
  { event_id: 49, person_id: 12, role: 'commander', side: 'union', unit_commanded: 'Army of Virginia', rank_at_time: 'Major General' },

  // ==================== BRAGG (26) - ADDITIONAL ====================
  { event_id: 6, person_id: 26, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Major General' },
  { event_id: 50, person_id: 26, role: 'subordinate', side: 'confederate', unit_commanded: 'Adviser', rank_at_time: 'General' },
  { event_id: 51, person_id: 26, role: 'subordinate', side: 'confederate', unit_commanded: 'Adviser', rank_at_time: 'General' },

  // ==================== EARLY (30) - ADDITIONAL ====================
  { event_id: 2, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Colonel' },
  { event_id: 8, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 9, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 20, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 21, person_id: 30, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },

  // ==================== A.P. HILL (29) - ADDITIONAL ====================
  { event_id: 2, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Regiment', rank_at_time: 'Colonel' },
  { event_id: 7, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 21, person_id: 29, role: 'subordinate', side: 'confederate', unit_commanded: 'Third Corps', rank_at_time: 'Lieutenant General' },

  // ==================== WHEELER (91) - ADDITIONAL ====================
  { event_id: 11, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry', rank_at_time: 'Colonel' },
  { event_id: 50, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 51, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },
  { event_id: 52, person_id: 91, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },

  // ==================== GORDON (82) - ADDITIONAL ====================
  { event_id: 14, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 16, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 21, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 25, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 29, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Major General' },
  { event_id: 30, person_id: 82, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Major General' },

  // ==================== HAMPTON (89) - ADDITIONAL ====================
  { event_id: 9, person_id: 89, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 12, person_id: 89, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 14, person_id: 89, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },

  // ==================== CUSTER (70) - ADDITIONAL ====================
  { event_id: 25, person_id: 70, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Brigadier General' },
  { event_id: 30, person_id: 70, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },

  // ==================== SEDGWICK (53) - ADDITIONAL ====================
  { event_id: 8, person_id: 53, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },

  // ==================== POLITICAL FIGURES ====================
  // Lincoln visited troops and was present at some key moments
  { event_id: 10, person_id: 40, role: 'participant', side: 'union', rank_at_time: 'President' }, // Visited Antietam
  { event_id: 29, person_id: 40, role: 'participant', side: 'union', rank_at_time: 'President' }, // Visited Petersburg

  // Jefferson Davis visited Western armies
  { event_id: 17, person_id: 41, role: 'participant', side: 'confederate', rank_at_time: 'President' }, // At Chickamauga
  { event_id: 18, person_id: 41, role: 'participant', side: 'confederate', rank_at_time: 'President' }, // At Chattanooga

  // ==================== ADDITIONAL BATCH2 COMMANDERS ====================
  // Reynolds (51) - killed at Gettysburg
  { event_id: 10, person_id: 51, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },
  { event_id: 12, person_id: 51, role: 'subordinate', side: 'union', unit_commanded: 'I Corps', rank_at_time: 'Major General' },
  { event_id: 14, person_id: 51, role: 'subordinate', side: 'union', unit_commanded: 'I Corps', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 51, role: 'subordinate', side: 'union', unit_commanded: 'I Corps', rank_at_time: 'Major General' },

  // Sickles (52) - wounded at Gettysburg
  { event_id: 14, person_id: 52, role: 'subordinate', side: 'union', unit_commanded: 'III Corps', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 52, role: 'subordinate', side: 'union', unit_commanded: 'III Corps', rank_at_time: 'Major General' },

  // Howard (54) - Additional
  { event_id: 10, person_id: 54, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },
  { event_id: 12, person_id: 54, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },

  // Slocum (55) - XII Corps
  { event_id: 10, person_id: 55, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },
  { event_id: 14, person_id: 55, role: 'subordinate', side: 'union', unit_commanded: 'XII Corps', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 55, role: 'subordinate', side: 'union', unit_commanded: 'XII Corps', rank_at_time: 'Major General' },
  { event_id: 18, person_id: 55, role: 'subordinate', side: 'union', unit_commanded: 'XII Corps', rank_at_time: 'Major General' },
  { event_id: 26, person_id: 55, role: 'subordinate', side: 'union', unit_commanded: 'Left Wing', rank_at_time: 'Major General' },

  // McLaws (83) - Division commander
  { event_id: 10, person_id: 83, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 12, person_id: 83, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 14, person_id: 83, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 83, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 83, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },

  // Polk (86) - Corps commander, Western Theater
  { event_id: 6, person_id: 86, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Major General' },
  { event_id: 11, person_id: 86, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 13, person_id: 86, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },
  { event_id: 17, person_id: 86, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },

  // D.H. Hill (81) - Additional
  { event_id: 7, person_id: 81, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 8, person_id: 81, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 81, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Lieutenant General' },

  // Armistead (101) - Pickett's Charge
  { event_id: 16, person_id: 101, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },

  // Garnett (102) - Pickett's Charge
  { event_id: 16, person_id: 102, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },

  // ==================== NAVAL OFFICERS ====================
  // Farragut (62)
  { event_id: 55, person_id: 62, role: 'commander', side: 'union', unit_commanded: 'West Gulf Blockading Squadron', rank_at_time: 'Flag Officer' },
  { event_id: 56, person_id: 62, role: 'commander', side: 'union', unit_commanded: 'West Gulf Blockading Squadron', rank_at_time: 'Rear Admiral' },

  // Porter (61)
  { event_id: 15, person_id: 61, role: 'subordinate', side: 'union', unit_commanded: 'Mississippi Squadron', rank_at_time: 'Acting Rear Admiral' },
  { event_id: 57, person_id: 61, role: 'commander', side: 'union', unit_commanded: 'North Atlantic Blockading Squadron', rank_at_time: 'Rear Admiral' },

  // Buchanan (93) - CSS Virginia / Mobile Bay
  { event_id: 54, person_id: 93, role: 'commander', side: 'confederate', unit_commanded: 'CSS Virginia', rank_at_time: 'Flag Officer' },
  { event_id: 56, person_id: 93, role: 'commander', side: 'confederate', unit_commanded: 'Mobile Squadron', rank_at_time: 'Admiral' },

  // Butler (71) - New Orleans
  { event_id: 55, person_id: 71, role: 'subordinate', side: 'union', unit_commanded: 'Army Forces', rank_at_time: 'Major General' },

  // ==================== ADDITIONAL BRIGADE COMMANDERS ====================
  // Barksdale (100) - Gettysburg
  { event_id: 12, person_id: 100, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 14, person_id: 100, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 16, person_id: 100, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },

  // Pettigrew (103) - Gettysburg
  { event_id: 16, person_id: 103, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },

  // Morgan (97) - Cavalry raids
  { event_id: 11, person_id: 97, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry', rank_at_time: 'Colonel' },
  { event_id: 13, person_id: 97, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry', rank_at_time: 'Brigadier General' },

  // Wilcox (96)
  { event_id: 8, person_id: 96, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 16, person_id: 96, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 19, person_id: 96, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },

  // Fitz John Porter (63) - Peninsula
  { event_id: 7, person_id: 63, role: 'subordinate', side: 'union', unit_commanded: 'V Corps', rank_at_time: 'Major General' },
  { event_id: 8, person_id: 63, role: 'subordinate', side: 'union', unit_commanded: 'V Corps', rank_at_time: 'Major General' },
  { event_id: 9, person_id: 63, role: 'subordinate', side: 'union', unit_commanded: 'V Corps', rank_at_time: 'Major General' },
  { event_id: 10, person_id: 63, role: 'subordinate', side: 'union', unit_commanded: 'V Corps', rank_at_time: 'Major General' },

  // Franklin (64) - Fredericksburg
  { event_id: 8, person_id: 64, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 10, person_id: 64, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 12, person_id: 64, role: 'subordinate', side: 'union', unit_commanded: 'Left Grand Division', rank_at_time: 'Major General' },

  // ==================== ADDITIONAL PEOPLE REVIEW ====================

  // Humphreys (57) - Division at Fredericksburg, II Corps later
  { event_id: 12, person_id: 57, role: 'subordinate', side: 'union', unit_commanded: 'Division, V Corps', rank_at_time: 'Brigadier General' },
  { event_id: 16, person_id: 57, role: 'subordinate', side: 'union', unit_commanded: 'Division, III Corps', rank_at_time: 'Major General' },
  { event_id: 19, person_id: 57, role: 'subordinate', side: 'union', unit_commanded: 'Chief of Staff', rank_at_time: 'Major General' },
  { event_id: 22, person_id: 57, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },
  { event_id: 31, person_id: 57, role: 'subordinate', side: 'union', unit_commanded: 'II Corps', rank_at_time: 'Major General' },

  // Wright (58) - VI Corps after Sedgwick's death
  { event_id: 20, person_id: 58, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 21, person_id: 58, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 22, person_id: 58, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 25, person_id: 58, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 29, person_id: 58, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },
  { event_id: 31, person_id: 58, role: 'subordinate', side: 'union', unit_commanded: 'VI Corps', rank_at_time: 'Major General' },

  // Pleasonton (67) - Cavalry Corps commander
  { event_id: 14, person_id: 67, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Brigadier General' },
  { event_id: 16, person_id: 67, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Corps', rank_at_time: 'Major General' },

  // Kilpatrick (68) - Cavalry
  { event_id: 16, person_id: 68, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Brigadier General' },
  { event_id: 26, person_id: 68, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Brigadier General' },

  // Merritt (69) - Cavalry, Shenandoah
  { event_id: 25, person_id: 69, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Brigadier General' },
  { event_id: 39, person_id: 69, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },
  { event_id: 31, person_id: 69, role: 'subordinate', side: 'union', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },

  // Schurz (74) - XI Corps
  { event_id: 9, person_id: 74, role: 'subordinate', side: 'union', unit_commanded: 'Division', rank_at_time: 'Brigadier General' },
  { event_id: 14, person_id: 74, role: 'subordinate', side: 'union', unit_commanded: 'Division, XI Corps', rank_at_time: 'Major General' },
  { event_id: 16, person_id: 74, role: 'subordinate', side: 'union', unit_commanded: 'Division, XI Corps', rank_at_time: 'Major General' },

  // Fitzhugh Lee (90) - Cavalry
  { event_id: 14, person_id: 90, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 16, person_id: 90, role: 'subordinate', side: 'confederate', unit_commanded: 'Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 19, person_id: 90, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 39, person_id: 90, role: 'subordinate', side: 'confederate', unit_commanded: 'Cavalry Division', rank_at_time: 'Major General' },

  // Gregg (104) - Texas Brigade
  { event_id: 19, person_id: 104, role: 'subordinate', side: 'confederate', unit_commanded: 'Texas Brigade', rank_at_time: 'Brigadier General' },
  { event_id: 22, person_id: 104, role: 'subordinate', side: 'confederate', unit_commanded: 'Texas Brigade', rank_at_time: 'Brigadier General' },

  // Buckner (119) - Fort Donelson
  { event_id: 5, person_id: 119, role: 'commander', side: 'confederate', unit_commanded: 'Fort Donelson', rank_at_time: 'Brigadier General' },
  { event_id: 11, person_id: 119, role: 'subordinate', side: 'confederate', unit_commanded: 'Division', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 119, role: 'subordinate', side: 'confederate', unit_commanded: 'Corps', rank_at_time: 'Major General' },

  // Pemberton (120) - Vicksburg
  { event_id: 15, person_id: 120, role: 'commander', side: 'confederate', unit_commanded: 'Department of Mississippi', rank_at_time: 'Lieutenant General' },

  // Shaw (127) - 54th Massachusetts at Fort Wagner
  { event_id: 58, person_id: 127, role: 'subordinate', side: 'union', unit_commanded: '54th Massachusetts Infantry', rank_at_time: 'Colonel' },

  // Fort Wagner (58) - additional participants
  { event_id: 58, person_id: 23, role: 'commander', side: 'confederate', unit_commanded: 'Department of SC, GA & FL', rank_at_time: 'General' },

  // Hunt (130) - Artillery chief
  { event_id: 10, person_id: 130, role: 'subordinate', side: 'union', unit_commanded: 'Artillery Reserve', rank_at_time: 'Colonel' },
  { event_id: 12, person_id: 130, role: 'subordinate', side: 'union', unit_commanded: 'Artillery Reserve', rank_at_time: 'Brigadier General' },
  { event_id: 16, person_id: 130, role: 'subordinate', side: 'union', unit_commanded: 'Artillery Reserve', rank_at_time: 'Brigadier General' },

  // E.P. Alexander (131) - Confederate artillery
  { event_id: 12, person_id: 131, role: 'subordinate', side: 'confederate', unit_commanded: 'Artillery Battalion', rank_at_time: 'Colonel' },
  { event_id: 16, person_id: 131, role: 'subordinate', side: 'confederate', unit_commanded: 'Artillery, First Corps', rank_at_time: 'Colonel' },
  { event_id: 19, person_id: 131, role: 'subordinate', side: 'confederate', unit_commanded: 'Artillery, First Corps', rank_at_time: 'Brigadier General' },

  // McCook (128) - XX Corps
  { event_id: 13, person_id: 128, role: 'subordinate', side: 'union', unit_commanded: 'XX Corps', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 128, role: 'subordinate', side: 'union', unit_commanded: 'XX Corps', rank_at_time: 'Major General' },

  // Crittenden (129) - XXI Corps
  { event_id: 13, person_id: 129, role: 'subordinate', side: 'union', unit_commanded: 'XXI Corps', rank_at_time: 'Major General' },
  { event_id: 17, person_id: 129, role: 'subordinate', side: 'union', unit_commanded: 'XXI Corps', rank_at_time: 'Major General' },
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
