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
