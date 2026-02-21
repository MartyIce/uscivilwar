import type { CivilWarEvent } from '../../types';

// Comprehensive Civil War events including all major battles
// This expands on the original events.ts with many more battles
export const expandedEvents: CivilWarEvent[] = [
  // ==================== 1861 ====================
  {
    id: 1,
    name: "Battle of Fort Sumter",
    type: "battle",
    date_start: "1861-04-12",
    date_end: "1861-04-13",
    description: "The bombardment of Fort Sumter was the first military action of the American Civil War. Confederate forces opened fire on the Union-held fort in Charleston Harbor.",
    campaign: null,
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "SC001",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fort_Sumter",
    image_url: null,
    location: {
      id: 1,
      name: "Fort Sumter",
      type: "fort",
      coordinates: { lat: 32.7522, lng: -79.8745 },
      state: "South Carolina"
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
    description: "The first major land battle of the Civil War. Union forces under Irvin McDowell were routed by Confederate forces. Thomas Jackson earned the nickname 'Stonewall' for his steadfast defense.",
    campaign: "Manassas Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA005",
    wikipedia_url: "https://en.wikipedia.org/wiki/First_Battle_of_Bull_Run",
    image_url: null,
    location: {
      id: 2,
      name: "Manassas",
      type: "battlefield",
      coordinates: { lat: 38.8128, lng: -77.5214 },
      state: "Virginia"
    },
    commanders: {
      union: ["Irvin McDowell"],
      confederate: ["P.G.T. Beauregard", "Joseph E. Johnston", "Thomas J. Jackson"]
    }
  },
  {
    id: 3,
    name: "Battle of Cheat Mountain",
    type: "battle",
    date_start: "1861-09-12",
    date_end: "1861-09-15",
    description: "Robert E. Lee's first Civil War field command. An unsuccessful campaign in western Virginia due to poor coordination and bad weather. Lee was criticized for this failure.",
    campaign: "Operations in Western Virginia",
    theater: "Eastern",
    result: "Union victory",
    significance: 2,
    cwsac_id: "WV001",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Cheat_Mountain",
    image_url: null,
    location: {
      id: 3,
      name: "Cheat Mountain",
      type: "battlefield",
      coordinates: { lat: 38.6500, lng: -79.8500 },
      state: "West Virginia"
    },
    commanders: {
      union: ["Joseph J. Reynolds"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 4,
    name: "Battle of Ball's Bluff",
    type: "battle",
    date_start: "1861-10-21",
    date_end: "1861-10-21",
    description: "A small but politically significant Union defeat. Senator Edward Baker was killed, leading to the creation of the Joint Committee on the Conduct of the War.",
    campaign: null,
    theater: "Eastern",
    result: "Confederate victory",
    significance: 2,
    cwsac_id: "VA004",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Ball%27s_Bluff",
    image_url: null,
    location: {
      id: 4,
      name: "Ball's Bluff",
      type: "battlefield",
      coordinates: { lat: 39.1372, lng: -77.5283 },
      state: "Virginia"
    },
    commanders: {
      union: ["Edward D. Baker", "Charles P. Stone"],
      confederate: ["Nathan G. Evans"]
    }
  },
  // ==================== 1862 ====================
  {
    id: 5,
    name: "Battle of Fort Donelson",
    type: "battle",
    date_start: "1862-02-11",
    date_end: "1862-02-16",
    description: "Grant's capture of Fort Donelson opened the Cumberland River to Union forces. Grant earned the nickname 'Unconditional Surrender' Grant.",
    campaign: "Fort Henry and Fort Donelson Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "TN002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fort_Donelson",
    image_url: null,
    location: {
      id: 5,
      name: "Fort Donelson",
      type: "fort",
      coordinates: { lat: 36.4889, lng: -87.8619 },
      state: "Tennessee"
    },
    commanders: {
      union: ["Ulysses S. Grant"],
      confederate: ["John B. Floyd", "Simon Bolivar Buckner"]
    }
  },
  {
    id: 6,
    name: "Battle of Shiloh",
    type: "battle",
    date_start: "1862-04-06",
    date_end: "1862-04-07",
    description: "A major battle in southwestern Tennessee. Confederate forces launched a surprise attack but were pushed back after reinforcements arrived. Over 23,000 casualties shocked both sides.",
    campaign: "Shiloh Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "TN003",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Shiloh",
    image_url: null,
    location: {
      id: 6,
      name: "Pittsburg Landing",
      type: "battlefield",
      coordinates: { lat: 35.1475, lng: -88.3303 },
      state: "Tennessee"
    },
    commanders: {
      union: ["Ulysses S. Grant", "Don Carlos Buell", "William T. Sherman"],
      confederate: ["Albert Sidney Johnston", "P.G.T. Beauregard"]
    }
  },
  {
    id: 7,
    name: "Battle of Seven Pines (Fair Oaks)",
    type: "battle",
    date_start: "1862-05-31",
    date_end: "1862-06-01",
    description: "Confederate commander Joseph E. Johnston was severely wounded, leading to Robert E. Lee taking command of the Army of Northern Virginia on June 1, 1862.",
    campaign: "Peninsula Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 4,
    cwsac_id: "VA020",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Seven_Pines",
    image_url: null,
    location: {
      id: 7,
      name: "Fair Oaks Station",
      type: "battlefield",
      coordinates: { lat: 37.5172, lng: -77.3111 },
      state: "Virginia"
    },
    commanders: {
      union: ["George B. McClellan"],
      confederate: ["Joseph E. Johnston", "Robert E. Lee"]
    }
  },
  {
    id: 8,
    name: "Seven Days Battles",
    type: "battle",
    date_start: "1862-06-25",
    date_end: "1862-07-01",
    description: "Lee's first major offensive as Army commander. A series of six battles that drove McClellan's Army of the Potomac away from Richmond despite heavy Confederate casualties.",
    campaign: "Peninsula Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA021",
    wikipedia_url: "https://en.wikipedia.org/wiki/Seven_Days_Battles",
    image_url: null,
    location: {
      id: 8,
      name: "Richmond Area",
      type: "battlefield",
      coordinates: { lat: 37.5407, lng: -77.4360 },
      state: "Virginia"
    },
    commanders: {
      union: ["George B. McClellan"],
      confederate: ["Robert E. Lee", "Thomas J. Jackson", "James Longstreet"]
    }
  },
  {
    id: 9,
    name: "Second Battle of Bull Run",
    type: "battle",
    date_start: "1862-08-28",
    date_end: "1862-08-30",
    description: "Lee's bold flanking maneuver led to a decisive Confederate victory. Pope's Army of Virginia was routed, forcing a Union retreat to Washington.",
    campaign: "Northern Virginia Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA026",
    wikipedia_url: "https://en.wikipedia.org/wiki/Second_Battle_of_Bull_Run",
    image_url: null,
    location: {
      id: 9,
      name: "Manassas",
      type: "battlefield",
      coordinates: { lat: 38.8128, lng: -77.5214 },
      state: "Virginia"
    },
    commanders: {
      union: ["John Pope"],
      confederate: ["Robert E. Lee", "Thomas J. Jackson", "James Longstreet"]
    }
  },
  {
    id: 10,
    name: "Battle of Antietam",
    type: "battle",
    date_start: "1862-09-17",
    date_end: "1862-09-17",
    description: "The bloodiest single-day battle in American history with 22,717 casualties. Lee's first invasion of the North was halted. Lincoln used the victory to issue the Emancipation Proclamation.",
    campaign: "Maryland Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "MD003",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Antietam",
    image_url: null,
    location: {
      id: 10,
      name: "Sharpsburg",
      type: "battlefield",
      coordinates: { lat: 39.4747, lng: -77.7447 },
      state: "Maryland"
    },
    commanders: {
      union: ["George B. McClellan"],
      confederate: ["Robert E. Lee", "James Longstreet", "Thomas J. Jackson"]
    }
  },
  {
    id: 11,
    name: "Battle of Perryville",
    type: "battle",
    date_start: "1862-10-08",
    date_end: "1862-10-08",
    description: "The largest Civil War battle in Kentucky. Bragg's Confederate invasion was repulsed, securing Kentucky for the Union.",
    campaign: "Confederate Heartland Offensive",
    theater: "Western",
    result: "Union victory",
    significance: 3,
    cwsac_id: "KY009",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Perryville",
    image_url: null,
    location: {
      id: 11,
      name: "Perryville",
      type: "battlefield",
      coordinates: { lat: 37.6486, lng: -84.9742 },
      state: "Kentucky"
    },
    commanders: {
      union: ["Don Carlos Buell"],
      confederate: ["Braxton Bragg"]
    }
  },
  {
    id: 12,
    name: "Battle of Fredericksburg",
    type: "battle",
    date_start: "1862-12-11",
    date_end: "1862-12-15",
    description: "Union forces under Burnside made repeated futile assaults against entrenched Confederate positions on Marye's Heights. A devastating Union defeat with over 12,000 casualties.",
    campaign: "Fredericksburg Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "VA024",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fredericksburg",
    image_url: null,
    location: {
      id: 12,
      name: "Fredericksburg",
      type: "city",
      coordinates: { lat: 38.3032, lng: -77.4605 },
      state: "Virginia"
    },
    commanders: {
      union: ["Ambrose E. Burnside"],
      confederate: ["Robert E. Lee", "James Longstreet", "Thomas J. Jackson"]
    }
  },
  {
    id: 13,
    name: "Battle of Stones River",
    type: "battle",
    date_start: "1862-12-31",
    date_end: "1863-01-02",
    description: "A bloody but strategically important Union victory in Tennessee that boosted Northern morale after Fredericksburg.",
    campaign: "Stones River Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "TN010",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Stones_River",
    image_url: null,
    location: {
      id: 13,
      name: "Murfreesboro",
      type: "battlefield",
      coordinates: { lat: 35.8764, lng: -86.4128 },
      state: "Tennessee"
    },
    commanders: {
      union: ["William Rosecrans"],
      confederate: ["Braxton Bragg"]
    }
  },
  // ==================== 1863 ====================
  {
    id: 14,
    name: "Battle of Chancellorsville",
    type: "battle",
    date_start: "1863-04-30",
    date_end: "1863-05-06",
    description: "Lee's greatest victory, featuring Jackson's daring flanking maneuver. However, Jackson was mortally wounded by friendly fire, a loss from which Lee's army never fully recovered.",
    campaign: "Chancellorsville Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "VA032",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Chancellorsville",
    image_url: null,
    location: {
      id: 14,
      name: "Chancellorsville",
      type: "battlefield",
      coordinates: { lat: 38.3119, lng: -77.6411 },
      state: "Virginia"
    },
    commanders: {
      union: ["Joseph Hooker"],
      confederate: ["Robert E. Lee", "Thomas J. Jackson", "James Longstreet"]
    }
  },
  {
    id: 15,
    name: "Siege of Vicksburg",
    type: "siege",
    date_start: "1863-05-18",
    date_end: "1863-07-04",
    description: "Grant's brilliant campaign captured the 'Gibraltar of the Confederacy.' The surrender on July 4, 1863, gave the Union complete control of the Mississippi River, splitting the Confederacy.",
    campaign: "Vicksburg Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "MS011",
    wikipedia_url: "https://en.wikipedia.org/wiki/Siege_of_Vicksburg",
    image_url: null,
    location: {
      id: 15,
      name: "Vicksburg",
      type: "city",
      coordinates: { lat: 32.3526, lng: -90.8779 },
      state: "Mississippi"
    },
    commanders: {
      union: ["Ulysses S. Grant", "William T. Sherman"],
      confederate: ["John C. Pemberton"]
    }
  },
  {
    id: 16,
    name: "Battle of Gettysburg",
    type: "battle",
    date_start: "1863-07-01",
    date_end: "1863-07-03",
    description: "The turning point of the Civil War. Lee's second invasion of the North ended in devastating defeat. Pickett's Charge on July 3rd became symbolic of Confederate defeat.",
    campaign: "Gettysburg Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "PA002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Gettysburg",
    image_url: null,
    location: {
      id: 16,
      name: "Gettysburg",
      type: "battlefield",
      coordinates: { lat: 39.8309, lng: -77.2311 },
      state: "Pennsylvania"
    },
    commanders: {
      union: ["George G. Meade"],
      confederate: ["Robert E. Lee", "James Longstreet"]
    }
  },
  {
    id: 17,
    name: "Battle of Chickamauga",
    type: "battle",
    date_start: "1863-09-19",
    date_end: "1863-09-20",
    description: "The bloodiest battle in the Western Theater. Longstreet's corps arrived from Virginia to help achieve a Confederate victory, but George Thomas's defense earned him the nickname 'Rock of Chickamauga.'",
    campaign: "Chickamauga Campaign",
    theater: "Western",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "GA006",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Chickamauga",
    image_url: null,
    location: {
      id: 17,
      name: "Chickamauga",
      type: "battlefield",
      coordinates: { lat: 34.9167, lng: -85.2617 },
      state: "Georgia"
    },
    commanders: {
      union: ["William Rosecrans", "George Thomas"],
      confederate: ["Braxton Bragg", "James Longstreet"]
    }
  },
  {
    id: 18,
    name: "Battle of Chattanooga",
    type: "battle",
    date_start: "1863-11-23",
    date_end: "1863-11-25",
    description: "Grant's forces broke the Confederate siege of Chattanooga in dramatic fashion. The 'Battle Above the Clouds' on Lookout Mountain and the charge up Missionary Ridge opened the gateway to the Deep South.",
    campaign: "Chattanooga Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "TN024",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Chattanooga",
    image_url: null,
    location: {
      id: 18,
      name: "Chattanooga",
      type: "city",
      coordinates: { lat: 35.0456, lng: -85.3097 },
      state: "Tennessee"
    },
    commanders: {
      union: ["Ulysses S. Grant", "George Thomas", "William T. Sherman"],
      confederate: ["Braxton Bragg"]
    }
  },
  // ==================== 1864 ====================
  {
    id: 19,
    name: "Battle of the Wilderness",
    type: "battle",
    date_start: "1864-05-05",
    date_end: "1864-05-07",
    description: "The first battle of Grant's Overland Campaign. Brutal fighting in dense forest was inconclusive, but unlike previous commanders, Grant continued his advance south rather than retreating.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 4,
    cwsac_id: "VA041",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_the_Wilderness",
    image_url: null,
    location: {
      id: 19,
      name: "The Wilderness",
      type: "battlefield",
      coordinates: { lat: 38.3150, lng: -77.7300 },
      state: "Virginia"
    },
    commanders: {
      union: ["Ulysses S. Grant", "George G. Meade"],
      confederate: ["Robert E. Lee", "James Longstreet"]
    }
  },
  {
    id: 20,
    name: "Battle of Spotsylvania Court House",
    type: "battle",
    date_start: "1864-05-08",
    date_end: "1864-05-21",
    description: "A series of battles as Grant attempted to outflank Lee. The fighting at the 'Bloody Angle' on May 12 was among the most intense hand-to-hand combat of the entire war.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Inconclusive",
    significance: 4,
    cwsac_id: "VA046",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Spotsylvania_Court_House",
    image_url: null,
    location: {
      id: 20,
      name: "Spotsylvania Court House",
      type: "battlefield",
      coordinates: { lat: 38.2000, lng: -77.5914 },
      state: "Virginia"
    },
    commanders: {
      union: ["Ulysses S. Grant", "George G. Meade"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 21,
    name: "Battle of Cold Harbor",
    type: "battle",
    date_start: "1864-05-31",
    date_end: "1864-06-12",
    description: "Grant's most costly tactical mistake. On June 3, Union forces lost 7,000 men in less than an hour assaulting Confederate entrenchments. Grant later wrote he regretted the assault.",
    campaign: "Overland Campaign",
    theater: "Eastern",
    result: "Confederate victory",
    significance: 4,
    cwsac_id: "VA057",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Cold_Harbor",
    image_url: null,
    location: {
      id: 21,
      name: "Cold Harbor",
      type: "battlefield",
      coordinates: { lat: 37.5897, lng: -77.2850 },
      state: "Virginia"
    },
    commanders: {
      union: ["Ulysses S. Grant", "George G. Meade"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 22,
    name: "Siege of Petersburg",
    type: "siege",
    date_start: "1864-06-09",
    date_end: "1865-03-25",
    description: "A nine-month siege of the vital rail hub of Petersburg. Grant's strategy of extending his lines gradually wore down Lee's dwindling forces. The trench warfare foreshadowed World War I.",
    campaign: "Richmond-Petersburg Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA068",
    wikipedia_url: "https://en.wikipedia.org/wiki/Siege_of_Petersburg",
    image_url: null,
    location: {
      id: 22,
      name: "Petersburg",
      type: "city",
      coordinates: { lat: 37.2279, lng: -77.4019 },
      state: "Virginia"
    },
    commanders: {
      union: ["Ulysses S. Grant", "George G. Meade"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 23,
    name: "Battle of Atlanta",
    type: "battle",
    date_start: "1864-07-22",
    date_end: "1864-07-22",
    description: "Hood attacked Sherman's forces east of Atlanta but was repulsed with heavy losses. Union General James McPherson was killed, the highest-ranking Union officer killed in combat.",
    campaign: "Atlanta Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "GA015",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Atlanta",
    image_url: null,
    location: {
      id: 23,
      name: "Atlanta",
      type: "city",
      coordinates: { lat: 33.7490, lng: -84.3880 },
      state: "Georgia"
    },
    commanders: {
      union: ["William T. Sherman", "James B. McPherson"],
      confederate: ["John Bell Hood"]
    }
  },
  {
    id: 24,
    name: "Fall of Atlanta",
    type: "battle",
    date_start: "1864-09-02",
    date_end: "1864-09-02",
    description: "Sherman captured Atlanta after a prolonged campaign. This victory boosted Northern morale and virtually ensured Lincoln's reelection in November.",
    campaign: "Atlanta Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "GA020",
    wikipedia_url: "https://en.wikipedia.org/wiki/Atlanta_Campaign",
    image_url: null,
    location: {
      id: 24,
      name: "Atlanta",
      type: "city",
      coordinates: { lat: 33.7490, lng: -84.3880 },
      state: "Georgia"
    },
    commanders: {
      union: ["William T. Sherman"],
      confederate: ["John Bell Hood"]
    }
  },
  {
    id: 25,
    name: "Battle of Cedar Creek",
    type: "battle",
    date_start: "1864-10-19",
    date_end: "1864-10-19",
    description: "Sheridan's dramatic ride to rally his troops turned a Confederate surprise attack into a decisive Union victory, ending Confederate resistance in the Shenandoah Valley.",
    campaign: "Valley Campaigns of 1864",
    theater: "Eastern",
    result: "Union victory",
    significance: 4,
    cwsac_id: "VA122",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Cedar_Creek",
    image_url: null,
    location: {
      id: 25,
      name: "Cedar Creek",
      type: "battlefield",
      coordinates: { lat: 39.0178, lng: -78.3692 },
      state: "Virginia"
    },
    commanders: {
      union: ["Philip Sheridan"],
      confederate: ["Jubal Early"]
    }
  },
  {
    id: 26,
    name: "Sherman's March to the Sea",
    type: "raid",
    date_start: "1864-11-15",
    date_end: "1864-12-21",
    description: "Sherman's devastating 285-mile march from Atlanta to Savannah. His 60,000 troops destroyed military targets, railroads, and resources, demonstrating the concept of total war.",
    campaign: "Savannah Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Sherman%27s_March_to_the_Sea",
    image_url: null,
    location: {
      id: 26,
      name: "Georgia",
      type: "battlefield",
      coordinates: { lat: 33.0, lng: -83.5 },
      state: "Georgia"
    },
    commanders: {
      union: ["William T. Sherman"],
      confederate: ["Various"]
    }
  },
  {
    id: 27,
    name: "Battle of Franklin",
    type: "battle",
    date_start: "1864-11-30",
    date_end: "1864-11-30",
    description: "One of the bloodiest battles of the war. Hood's frontal assault resulted in catastrophic Confederate losses, including six generals killed and the effective destruction of the Army of Tennessee.",
    campaign: "Franklin-Nashville Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 4,
    cwsac_id: "TN038",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Franklin_(1864)",
    image_url: null,
    location: {
      id: 27,
      name: "Franklin",
      type: "battlefield",
      coordinates: { lat: 35.9251, lng: -86.8689 },
      state: "Tennessee"
    },
    commanders: {
      union: ["John Schofield"],
      confederate: ["John Bell Hood"]
    }
  },
  {
    id: 28,
    name: "Battle of Nashville",
    type: "battle",
    date_start: "1864-12-15",
    date_end: "1864-12-16",
    description: "George Thomas destroyed Hood's Army of Tennessee in a decisive two-day battle. It was the most complete victory by either side during the war.",
    campaign: "Franklin-Nashville Campaign",
    theater: "Western",
    result: "Union victory",
    significance: 5,
    cwsac_id: "TN040",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Nashville",
    image_url: null,
    location: {
      id: 28,
      name: "Nashville",
      type: "city",
      coordinates: { lat: 36.1627, lng: -86.7816 },
      state: "Tennessee"
    },
    commanders: {
      union: ["George Thomas"],
      confederate: ["John Bell Hood"]
    }
  },
  // ==================== 1865 ====================
  {
    id: 29,
    name: "Fall of Petersburg",
    type: "battle",
    date_start: "1865-04-02",
    date_end: "1865-04-02",
    description: "Grant's final assault broke through Confederate lines at Petersburg. Lee evacuated both Petersburg and Richmond, beginning the Appomattox Campaign.",
    campaign: "Appomattox Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA091",
    wikipedia_url: "https://en.wikipedia.org/wiki/Third_Battle_of_Petersburg",
    image_url: null,
    location: {
      id: 29,
      name: "Petersburg",
      type: "city",
      coordinates: { lat: 37.2279, lng: -77.4019 },
      state: "Virginia"
    },
    commanders: {
      union: ["Ulysses S. Grant", "George G. Meade"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 30,
    name: "Battle of Sayler's Creek",
    type: "battle",
    date_start: "1865-04-06",
    date_end: "1865-04-06",
    description: "Union forces destroyed nearly a quarter of Lee's retreating army, capturing about 8,000 prisoners including several generals. Lee reportedly said, 'My God! Has the army been dissolved?'",
    campaign: "Appomattox Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 4,
    cwsac_id: "VA094",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Sayler%27s_Creek",
    image_url: null,
    location: {
      id: 30,
      name: "Sayler's Creek",
      type: "battlefield",
      coordinates: { lat: 37.3103, lng: -78.2806 },
      state: "Virginia"
    },
    commanders: {
      union: ["Philip Sheridan"],
      confederate: ["Robert E. Lee", "Richard S. Ewell"]
    }
  },
  {
    id: 31,
    name: "Appomattox Court House",
    type: "surrender",
    date_start: "1865-04-09",
    date_end: "1865-04-09",
    description: "Robert E. Lee surrendered the Army of Northern Virginia to Ulysses S. Grant, effectively ending the Civil War. Grant's generous terms allowed Confederate soldiers to return home with their horses.",
    campaign: "Appomattox Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "VA097",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Appomattox_Court_House",
    image_url: null,
    location: {
      id: 31,
      name: "Appomattox Court House",
      type: "landmark",
      coordinates: { lat: 37.3765, lng: -78.7969 },
      state: "Virginia"
    },
    commanders: {
      union: ["Ulysses S. Grant"],
      confederate: ["Robert E. Lee"]
    }
  },
  {
    id: 32,
    name: "Lincoln Assassination",
    type: "proclamation",
    date_start: "1865-04-14",
    date_end: "1865-04-15",
    description: "President Abraham Lincoln was shot by John Wilkes Booth at Ford's Theatre and died the next morning. His death shocked the nation just days after Lee's surrender.",
    campaign: null,
    theater: "Eastern",
    result: null,
    significance: 5,
    cwsac_id: null,
    wikipedia_url: "https://en.wikipedia.org/wiki/Assassination_of_Abraham_Lincoln",
    image_url: null,
    location: {
      id: 32,
      name: "Washington D.C.",
      type: "capital",
      coordinates: { lat: 38.8977, lng: -77.0365 },
      state: null
    },
    commanders: {
      union: [],
      confederate: []
    }
  }
];
