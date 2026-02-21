import type { CivilWarEvent } from '../../types';
import { expandedEvents } from './events-expanded';

// Re-export expanded events as the main mockEvents
// This maintains backward compatibility while using the comprehensive dataset
export const mockEvents: CivilWarEvent[] = expandedEvents;

// Original subset kept for reference - now uses expanded data
export const mockEventsLegacy: CivilWarEvent[] = [
  {
    id: 1,
    name: "Battle of Fort Sumter",
    type: "battle",
    date_start: "1861-04-12",
    date_end: "1861-04-13",
    description: "The bombardment of Fort Sumter was the first military action of the American Civil War. Confederate forces opened fire on the Union-held fort in Charleston Harbor, marking the beginning of four years of conflict.",
    campaign: null,
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "SC001",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fort_Sumter",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Fort_Sumter_storm_flag_1861.jpg/440px-Fort_Sumter_storm_flag_1861.jpg",
    location: {
      id: 1,
      name: "Fort Sumter",
      type: "fort",
      coordinates: { lat: 32.7522, lng: -79.8745 },
      state: "South Carolina"
    },
    casualties: {
      union: { killed: 0, wounded: 4, captured: 0, missing: 0, total_engaged: 85 },
      confederate: { killed: 0, wounded: 4, captured: 0, missing: 0, total_engaged: 500 }
    },
    commanders: {
      union: ["Robert Anderson"],
      confederate: ["P.G.T. Beauregard"]
    }
  },
  {
    id: 2,
    name: "First Battle of Bull Run",
    type: "battle",
    date_start: "1861-07-21",
    date_end: "1861-07-21",
    description: "The first major land battle of the Civil War. Union forces under Irvin McDowell marched from Washington D.C. to attack Confederate forces near Manassas Junction. After initial Union success, Confederate reinforcements turned the tide.",
    campaign: "Manassas Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA005",
    wikipedia_url: "https://en.wikipedia.org/wiki/First_Battle_of_Bull_Run",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/First_Battle_of_Bull_Run_Kurz_%26_Allison.jpg/440px-First_Battle_of_Bull_Run_Kurz_%26_Allison.jpg",
    location: {
      id: 2,
      name: "Manassas",
      type: "battlefield",
      coordinates: { lat: 38.8128, lng: -77.5214 },
      state: "Virginia"
    },
    casualties: {
      union: { killed: 460, wounded: 1124, captured: 1312, missing: 0, total_engaged: 28450 },
      confederate: { killed: 387, wounded: 1582, captured: 13, missing: 0, total_engaged: 32230 }
    },
    commanders: {
      union: ["Irvin McDowell"],
      confederate: ["P.G.T. Beauregard", "Joseph E. Johnston"]
    }
  },
  {
    id: 3,
    name: "Battle of Shiloh",
    type: "battle",
    date_start: "1862-04-06",
    date_end: "1862-04-07",
    description: "A major battle in the Western Theater fought in southwestern Tennessee. Confederate forces launched a surprise attack on Union troops under Ulysses S. Grant. After initial success, the Confederates were pushed back the next day.",
    campaign: "Shiloh Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "TN003",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Shiloh",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Battle_of_Shiloh.jpg/440px-Battle_of_Shiloh.jpg",
    location: {
      id: 3,
      name: "Pittsburg Landing",
      type: "battlefield",
      coordinates: { lat: 35.1475, lng: -88.3303 },
      state: "Tennessee"
    },
    casualties: {
      union: { killed: 1754, wounded: 8408, captured: 2885, missing: 0, total_engaged: 65085 },
      confederate: { killed: 1728, wounded: 8012, captured: 959, missing: 0, total_engaged: 44968 }
    },
    commanders: {
      union: ["Ulysses S. Grant", "Don Carlos Buell"],
      confederate: ["Albert Sidney Johnston", "P.G.T. Beauregard"]
    }
  },
  {
    id: 4,
    name: "Battle of Antietam",
    type: "battle",
    date_start: "1862-09-17",
    date_end: "1862-09-17",
    description: "The bloodiest single-day battle in American history. Robert E. Lee's first invasion of the North was halted by George McClellan's Army of the Potomac near Sharpsburg, Maryland. The battle gave Lincoln the opportunity to issue the Emancipation Proclamation.",
    campaign: "Maryland Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "MD003",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Antietam",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Battle_of_Antietam_by_Thure_de_Thulstrup.jpg/440px-Battle_of_Antietam_by_Thure_de_Thulstrup.jpg",
    location: {
      id: 4,
      name: "Sharpsburg",
      type: "battlefield",
      coordinates: { lat: 39.4747, lng: -77.7447 },
      state: "Maryland"
    },
    casualties: {
      union: { killed: 2108, wounded: 9540, captured: 753, missing: 0, total_engaged: 87000 },
      confederate: { killed: 1546, wounded: 7752, captured: 1018, missing: 0, total_engaged: 45000 }
    },
    commanders: {
      union: ["George B. McClellan"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 5,
    name: "Battle of Fredericksburg",
    type: "battle",
    date_start: "1862-12-11",
    date_end: "1862-12-15",
    description: "Union forces under Ambrose Burnside made repeated futile assaults against entrenched Confederate positions on Marye's Heights. The battle was a devastating Union defeat.",
    campaign: "Fredericksburg Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "VA024",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fredericksburg",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Battle_of_Fredericksburg%2C_Dec_13%2C_1862.png/440px-Battle_of_Fredericksburg%2C_Dec_13%2C_1862.png",
    location: {
      id: 5,
      name: "Fredericksburg",
      type: "city",
      coordinates: { lat: 38.3032, lng: -77.4605 },
      state: "Virginia"
    },
    casualties: {
      union: { killed: 1284, wounded: 9600, captured: 1769, missing: 0, total_engaged: 114000 },
      confederate: { killed: 608, wounded: 4116, captured: 653, missing: 0, total_engaged: 72500 }
    },
    commanders: {
      union: ["Ambrose E. Burnside"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 6,
    name: "Battle of Chancellorsville",
    type: "battle",
    date_start: "1863-04-30",
    date_end: "1863-05-06",
    description: "Often considered Robert E. Lee's greatest victory, the battle saw a daring flanking maneuver by Stonewall Jackson. However, the victory came at a high cost when Jackson was mortally wounded by friendly fire.",
    campaign: "Chancellorsville Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA032",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Chancellorsville",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Battle_of_Chancellorsville.png/440px-Battle_of_Chancellorsville.png",
    location: {
      id: 6,
      name: "Chancellorsville",
      type: "battlefield",
      coordinates: { lat: 38.3119, lng: -77.6411 },
      state: "Virginia"
    },
    casualties: {
      union: { killed: 1606, wounded: 9762, captured: 5919, missing: 0, total_engaged: 133868 },
      confederate: { killed: 1665, wounded: 9081, captured: 2018, missing: 0, total_engaged: 60892 }
    },
    commanders: {
      union: ["Joseph Hooker"],
      confederate: ["Robert E. Lee", "Stonewall Jackson"]
    }
  },
  {
    id: 7,
    name: "Battle of Gettysburg",
    type: "battle",
    date_start: "1863-07-01",
    date_end: "1863-07-03",
    description: "The turning point of the Civil War. Lee's second invasion of the North ended in a devastating defeat at Gettysburg, Pennsylvania. Pickett's Charge on the third day became symbolic of Confederate defeat.",
    campaign: "Gettysburg Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "PA002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Gettysburg",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Battle_of_Gettysburg%2C_by_Currier_and_Ives.png/440px-Battle_of_Gettysburg%2C_by_Currier_and_Ives.png",
    location: {
      id: 7,
      name: "Gettysburg",
      type: "battlefield",
      coordinates: { lat: 39.8309, lng: -77.2311 },
      state: "Pennsylvania"
    },
    casualties: {
      union: { killed: 3155, wounded: 14529, captured: 5365, missing: 0, total_engaged: 83289 },
      confederate: { killed: 4708, wounded: 12693, captured: 5830, missing: 0, total_engaged: 75000 }
    },
    commanders: {
      union: ["George G. Meade"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 8,
    name: "Siege of Vicksburg",
    type: "siege",
    date_start: "1863-05-18",
    date_end: "1863-07-04",
    description: "A pivotal siege that gave Union forces control of the Mississippi River. After months of maneuvers and a 47-day siege, the Confederate garrison surrendered on July 4, 1863, splitting the Confederacy in two.",
    campaign: "Vicksburg Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "MS011",
    wikipedia_url: "https://en.wikipedia.org/wiki/Siege_of_Vicksburg",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Vicksburg_by_Kurz_%26_Allison.jpg/440px-Vicksburg_by_Kurz_%26_Allison.jpg",
    location: {
      id: 8,
      name: "Vicksburg",
      type: "city",
      coordinates: { lat: 32.3526, lng: -90.8779 },
      state: "Mississippi"
    },
    casualties: {
      union: { killed: 806, wounded: 3940, captured: 164, missing: 0, total_engaged: 77000 },
      confederate: { killed: 805, wounded: 1938, captured: 29495, missing: 0, total_engaged: 33000 }
    },
    commanders: {
      union: ["Ulysses S. Grant"],
      confederate: ["John C. Pemberton"]
    }
  },
  {
    id: 9,
    name: "Battle of Chickamauga",
    type: "battle",
    date_start: "1863-09-19",
    date_end: "1863-09-20",
    description: "The bloodiest battle in the Western Theater. Confederate forces under Braxton Bragg defeated the Union Army of the Cumberland, but failed to destroy it. Union forces retreated to Chattanooga.",
    campaign: "Chickamauga Campaign",
    theater: "Western",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "GA006",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Chickamauga",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Kurz_and_Allison_-_Battle_of_Chickamauga.jpg/440px-Kurz_and_Allison_-_Battle_of_Chickamauga.jpg",
    location: {
      id: 9,
      name: "Chickamauga",
      type: "battlefield",
      coordinates: { lat: 34.9167, lng: -85.2617 },
      state: "Georgia"
    },
    casualties: {
      union: { killed: 1657, wounded: 9756, captured: 4757, missing: 0, total_engaged: 60000 },
      confederate: { killed: 2312, wounded: 14674, captured: 1468, missing: 0, total_engaged: 65000 }
    },
    commanders: {
      union: ["William Rosecrans", "George Thomas"],
      confederate: ["Braxton Bragg"]
    }
  },
  {
    id: 10,
    name: "Battle of the Wilderness",
    type: "battle",
    date_start: "1864-05-05",
    date_end: "1864-05-07",
    description: "The first battle of Grant's Overland Campaign against Lee's Army of Northern Virginia. Fought in dense forest, the battle was inconclusive, but unlike previous commanders, Grant continued his advance south.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 4,
    cwsac_id: "VA041",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_the_Wilderness",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Battle_of_the_Wilderness.jpg/440px-Battle_of_the_Wilderness.jpg",
    location: {
      id: 10,
      name: "The Wilderness",
      type: "battlefield",
      coordinates: { lat: 38.3150, lng: -77.7300 },
      state: "Virginia"
    },
    casualties: {
      union: { killed: 2246, wounded: 12037, captured: 3383, missing: 0, total_engaged: 101895 },
      confederate: { killed: 1495, wounded: 7928, captured: 1702, missing: 0, total_engaged: 61025 }
    },
    commanders: {
      union: ["Ulysses S. Grant", "George G. Meade"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 11,
    name: "Battle of Spotsylvania Court House",
    type: "battle",
    date_start: "1864-05-08",
    date_end: "1864-05-21",
    description: "A series of battles as Grant attempted to outflank Lee after the Wilderness. The fighting at the 'Bloody Angle' on May 12 was among the most intense of the entire war.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 4,
    cwsac_id: "VA046",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Spotsylvania_Court_House",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Battle_of_Spottsylvania_by_Thure_de_Thulstrup.jpg/440px-Battle_of_Spottsylvania_by_Thure_de_Thulstrup.jpg",
    location: {
      id: 11,
      name: "Spotsylvania Court House",
      type: "battlefield",
      coordinates: { lat: 38.2000, lng: -77.5914 },
      state: "Virginia"
    },
    casualties: {
      union: { killed: 2725, wounded: 13416, captured: 2258, missing: 0, total_engaged: 100000 },
      confederate: { killed: 1467, wounded: 6235, captured: 5000, missing: 0, total_engaged: 52000 }
    },
    commanders: {
      union: ["Ulysses S. Grant", "George G. Meade"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 12,
    name: "Battle of Atlanta",
    type: "battle",
    date_start: "1864-07-22",
    date_end: "1864-07-22",
    description: "One of the most important battles of Sherman's Atlanta Campaign. Confederate General John Bell Hood attacked Sherman's forces east of Atlanta but was repulsed with heavy losses.",
    campaign: "Atlanta Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "GA015",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Atlanta",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Battle_of_Atlanta.jpg/440px-Battle_of_Atlanta.jpg",
    location: {
      id: 12,
      name: "Atlanta",
      type: "city",
      coordinates: { lat: 33.7490, lng: -84.3880 },
      state: "Georgia"
    },
    casualties: {
      union: { killed: 430, wounded: 1559, captured: 1733, missing: 0, total_engaged: 34863 },
      confederate: { killed: 1000, wounded: 4000, captured: 3000, missing: 0, total_engaged: 40000 }
    },
    commanders: {
      union: ["William T. Sherman", "James B. McPherson"],
      confederate: ["John Bell Hood"]
    }
  },
  {
    id: 13,
    name: "Siege of Petersburg",
    type: "siege",
    date_start: "1864-06-09",
    date_end: "1865-03-25",
    description: "A nine-month siege of the vital rail hub of Petersburg, Virginia. Grant's strategy was to extend his lines and cut Lee's supply routes. The siege resulted in trench warfare that foreshadowed World War I.",
    campaign: "Richmond-Petersburg Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA068",
    wikipedia_url: "https://en.wikipedia.org/wiki/Siege_of_Petersburg",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Petersburg_mine_explosion.jpg/440px-Petersburg_mine_explosion.jpg",
    location: {
      id: 13,
      name: "Petersburg",
      type: "city",
      coordinates: { lat: 37.2279, lng: -77.4019 },
      state: "Virginia"
    },
    casualties: {
      union: { killed: 5000, wounded: 30000, captured: 7000, missing: 0, total_engaged: 125000 },
      confederate: { killed: 4000, wounded: 24000, captured: 4000, missing: 0, total_engaged: 65000 }
    },
    commanders: {
      union: ["Ulysses S. Grant"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 14,
    name: "Sherman's March to the Sea",
    type: "raid",
    date_start: "1864-11-15",
    date_end: "1864-12-21",
    description: "Sherman's devastating march from Atlanta to Savannah, implementing total war strategy. His army destroyed military targets, industry, infrastructure, and civilian property across Georgia.",
    campaign: "Savannah Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Sherman%27s_March_to_the_Sea",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/SavannahCampaign.svg/440px-SavannahCampaign.svg.png",
    location: {
      id: 14,
      name: "Georgia",
      type: "battlefield",
      coordinates: { lat: 33.0, lng: -83.5 },
      state: "Georgia"
    },
    casualties: {
      union: { killed: 103, wounded: 428, captured: 278, missing: 0, total_engaged: 62000 },
      confederate: { killed: 250, wounded: 750, captured: 2500, missing: 0, total_engaged: 13000 }
    },
    commanders: {
      union: ["William T. Sherman"],
      confederate: ["Various"]
    }
  },
  {
    id: 15,
    name: "Appomattox Court House",
    type: "surrender",
    date_start: "1865-04-09",
    date_end: "1865-04-09",
    description: "Robert E. Lee surrendered the Army of Northern Virginia to Ulysses S. Grant at Appomattox Court House, Virginia, effectively ending the Civil War. Grant's generous terms allowed Confederate soldiers to return home.",
    campaign: "Appomattox Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA097",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Appomattox_Court_House",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lee_Surrenders_to_Grant_at_Appomattox.jpg/440px-Lee_Surrenders_to_Grant_at_Appomattox.jpg",
    location: {
      id: 15,
      name: "Appomattox Court House",
      type: "landmark",
      coordinates: { lat: 37.3765, lng: -78.7969 },
      state: "Virginia"
    },
    casualties: {
      union: { killed: 164, wounded: 377, captured: 0, missing: 0, total_engaged: 63285 },
      confederate: { killed: 500, wounded: 1000, captured: 27805, missing: 0, total_engaged: 28356 }
    },
    commanders: {
      union: ["Ulysses S. Grant"],
      confederate: ["Robert E. Lee"]
    }
  }
];
