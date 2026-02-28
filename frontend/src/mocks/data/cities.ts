// Major cities with Civil War-era historical context
export interface CityData {
  id: number;
  name: string;
  state: string | null;
  coordinates: { lat: number; lng: number };
  side: 'union' | 'confederate' | 'border';
  population_1860: number | null;
  description: string;
  wartime_role: string;
  key_events: string[];
  image_url?: string;
}

export const majorCities: CityData[] = [
  {
    id: 1,
    name: "Washington D.C.",
    state: null,
    coordinates: { lat: 38.9072, lng: -77.0369 },
    side: 'union',
    population_1860: 75080,
    description: "Capital of the United States and seat of the Union government during the Civil War.",
    wartime_role: "Union capital, military headquarters, and center of political power. Abraham Lincoln directed the war effort from the White House while the city was heavily fortified against Confederate attack.",
    key_events: [
      "Lincoln's inaugurations (1861, 1865)",
      "Emancipation Proclamation signed (1863)",
      "Lincoln's assassination at Ford's Theatre (1865)"
    ]
  },
  {
    id: 2,
    name: "Richmond",
    state: "Virginia",
    coordinates: { lat: 37.5407, lng: -77.4360 },
    side: 'confederate',
    population_1860: 37910,
    description: "Capital of the Confederate States of America from May 1861 until its fall in April 1865.",
    wartime_role: "Confederate capital and major industrial center. Home to the Tredegar Iron Works, the South's largest iron manufacturer. The protection of Richmond was a primary objective throughout the war.",
    key_events: [
      "Became Confederate capital (1861)",
      "Seven Days Battles defense (1862)",
      "Siege and evacuation (1865)"
    ]
  },
  {
    id: 3,
    name: "New Orleans",
    state: "Louisiana",
    coordinates: { lat: 29.9511, lng: -90.0715 },
    side: 'confederate',
    population_1860: 168675,
    description: "The largest city in the Confederacy and a vital port controlling access to the Mississippi River.",
    wartime_role: "Major port and commercial center. Its capture by Admiral Farragut in April 1862 was a devastating blow to the Confederacy, cutting off a major trading port and securing the lower Mississippi for the Union.",
    key_events: [
      "Captured by Union Navy (April 1862)",
      "Occupied by General Butler",
      "Remained under Union control until war's end"
    ]
  },
  {
    id: 4,
    name: "Atlanta",
    state: "Georgia",
    coordinates: { lat: 33.7490, lng: -84.3880 },
    side: 'confederate',
    population_1860: 9554,
    description: "Major Confederate railroad hub and industrial center in the Deep South.",
    wartime_role: "Critical railroad junction connecting the eastern and western Confederacy. Its fall to Sherman in September 1864 boosted Union morale and helped ensure Lincoln's reelection.",
    key_events: [
      "Sherman's Atlanta Campaign (1864)",
      "Fall of Atlanta (September 1864)",
      "Burning of Atlanta before March to the Sea"
    ]
  },
  {
    id: 5,
    name: "Charleston",
    state: "South Carolina",
    coordinates: { lat: 32.7765, lng: -79.9311 },
    side: 'confederate',
    population_1860: 40522,
    description: "Where the Civil War began with the bombardment of Fort Sumter.",
    wartime_role: "Major Confederate port and symbolic heart of secession. Despite repeated Union attempts, the city held out until Sherman's approach from inland forced its evacuation in February 1865.",
    key_events: [
      "Bombardment of Fort Sumter (April 1861)",
      "54th Massachusetts assault on Fort Wagner (1863)",
      "Evacuated February 1865"
    ]
  },
  {
    id: 6,
    name: "Savannah",
    state: "Georgia",
    coordinates: { lat: 32.0809, lng: -81.0912 },
    side: 'confederate',
    population_1860: 22292,
    description: "Historic port city and endpoint of Sherman's March to the Sea.",
    wartime_role: "Important Confederate port. Sherman captured the city in December 1864 after his devastating march from Atlanta, famously presenting it as a 'Christmas gift' to President Lincoln.",
    key_events: [
      "Sherman's March to the Sea ends here (1864)",
      "City surrendered December 21, 1864",
      "Presented to Lincoln as Christmas gift"
    ]
  },
  {
    id: 7,
    name: "Nashville",
    state: "Tennessee",
    coordinates: { lat: 36.1627, lng: -86.7816 },
    side: 'border',
    population_1860: 16988,
    description: "Strategic Union supply base and site of a decisive battle.",
    wartime_role: "Captured early by Union forces (1862), Nashville became a major supply depot and staging area. The Battle of Nashville (1864) destroyed Hood's Army of Tennessee.",
    key_events: [
      "Captured by Union (February 1862)",
      "Battle of Nashville (December 1864)",
      "Hood's army destroyed"
    ]
  },
  {
    id: 8,
    name: "Vicksburg",
    state: "Mississippi",
    coordinates: { lat: 32.3526, lng: -90.8779 },
    side: 'confederate',
    population_1860: 4591,
    description: "The 'Gibraltar of the Confederacy' controlling the Mississippi River.",
    wartime_role: "Strategic fortress that controlled Mississippi River traffic. After a brilliant campaign and 47-day siege, Grant captured it on July 4, 1863, splitting the Confederacy in two.",
    key_events: [
      "Multiple failed Union attempts (1862-63)",
      "Grant's Vicksburg Campaign (1863)",
      "Surrendered July 4, 1863"
    ]
  },
  {
    id: 9,
    name: "Petersburg",
    state: "Virginia",
    coordinates: { lat: 37.2279, lng: -77.4019 },
    side: 'confederate',
    population_1860: 18266,
    description: "Railroad hub whose nine-month siege led to the fall of Richmond.",
    wartime_role: "Critical rail junction supplying Richmond. The Siege of Petersburg (1864-65) was the longest military event of the war, featuring trench warfare that foreshadowed World War I.",
    key_events: [
      "Siege begins (June 1864)",
      "Battle of the Crater (July 1864)",
      "Final assault (April 1865)"
    ]
  },
  {
    id: 10,
    name: "Memphis",
    state: "Tennessee",
    coordinates: { lat: 35.1495, lng: -90.0490 },
    side: 'confederate',
    population_1860: 22623,
    description: "Major Mississippi River port captured early in the war.",
    wartime_role: "Important river port and cotton trading center. Captured after a naval battle in June 1862, it became a Union supply base for operations in the Western Theater.",
    key_events: [
      "Naval Battle of Memphis (June 1862)",
      "Union occupation base",
      "Forrest's raid on Memphis (1864)"
    ]
  },
  {
    id: 11,
    name: "Mobile",
    state: "Alabama",
    coordinates: { lat: 30.6954, lng: -88.0399 },
    side: 'confederate',
    population_1860: 29258,
    description: "Last major Confederate port on the Gulf of Mexico.",
    wartime_role: "Vital blockade-running port. Admiral Farragut's victory at Mobile Bay (August 1864) with his cry 'Damn the torpedoes!' closed the port to Confederate use.",
    key_events: [
      "Major blockade-running port",
      "Battle of Mobile Bay (August 1864)",
      "City fell April 1865"
    ]
  },
  {
    id: 12,
    name: "Chattanooga",
    state: "Tennessee",
    coordinates: { lat: 35.0456, lng: -85.3097 },
    side: 'border',
    population_1860: 2545,
    description: "Gateway to the Deep South and site of dramatic Union victory.",
    wartime_role: "Critical railroad junction called the 'Gateway to the Deep South.' The Union victory here in November 1863 opened the way for Sherman's Atlanta Campaign.",
    key_events: [
      "Battle of Chickamauga (September 1863)",
      "Siege of Chattanooga",
      "Battle of Chattanooga (November 1863)"
    ]
  },
  {
    id: 13,
    name: "New York City",
    state: "New York",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    side: 'union',
    population_1860: 813669,
    description: "The largest city in America and financial capital of the Union.",
    wartime_role: "Financial center that helped fund the war through bond sales. Major port for receiving immigrants who filled Union ranks. Site of the 1863 Draft Riots, the largest civil insurrection in American history.",
    key_events: [
      "Draft Riots (July 1863)",
      "Shipped troops and supplies throughout war",
      "Lincoln's funeral procession (1865)"
    ]
  },
  {
    id: 14,
    name: "Philadelphia",
    state: "Pennsylvania",
    coordinates: { lat: 39.9526, lng: -75.1652 },
    side: 'union',
    population_1860: 565529,
    description: "Second largest Union city and major manufacturing center.",
    wartime_role: "Produced locomotives, ships, textiles, and military equipment. The Frankford Arsenal manufactured ammunition while the Philadelphia Navy Yard built warships including the USS New Ironsides.",
    key_events: [
      "Major recruiting and training center",
      "Great Central Fair raised war funds (1864)",
      "Produced ironclad warships"
    ]
  },
  {
    id: 15,
    name: "Boston",
    state: "Massachusetts",
    coordinates: { lat: 42.3601, lng: -71.0589 },
    side: 'union',
    population_1860: 177840,
    description: "Center of the abolitionist movement and intellectual hub of the Union.",
    wartime_role: "Hotbed of abolitionism where leaders like William Lloyd Garrison and Frederick Douglass rallied support. Home of the 54th Massachusetts, one of the first Black regiments.",
    key_events: [
      "54th Massachusetts formed (1863)",
      "Recruiting center for Black soldiers",
      "Abolitionist rallies throughout war"
    ]
  },
  {
    id: 16,
    name: "Chicago",
    state: "Illinois",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    side: 'union',
    population_1860: 112172,
    description: "Rapidly growing railroad hub and grain center of the Midwest.",
    wartime_role: "Major railroad junction that shipped grain, livestock, and troops. Camp Douglas held Confederate prisoners. The city's growth accelerated dramatically during the war years.",
    key_events: [
      "Republican Convention nominated Lincoln (1860)",
      "Camp Douglas POW camp",
      "Major supply depot for Western armies"
    ]
  },
  {
    id: 17,
    name: "Cincinnati",
    state: "Ohio",
    coordinates: { lat: 39.1031, lng: -84.5120 },
    side: 'union',
    population_1860: 161044,
    description: "The 'Queen City' and largest city in Ohio, vital to western operations.",
    wartime_role: "Major manufacturing center producing weapons, uniforms, and supplies. Its location on the Ohio River made it crucial for supplying Union armies in Kentucky and Tennessee.",
    key_events: [
      "Supplied Western Theater armies",
      "Threatened by Confederate raids (1862)",
      "Built ironclad gunboats"
    ]
  },
  {
    id: 18,
    name: "Pittsburgh",
    state: "Pennsylvania",
    coordinates: { lat: 40.4406, lng: -79.9959 },
    side: 'union',
    population_1860: 49221,
    description: "The 'Arsenal of the Union' and center of iron and steel production.",
    wartime_role: "Produced more iron and steel than any other American city. Fort Pitt Foundry cast enormous cannons while the Allegheny Arsenal manufactured ammunition and equipment.",
    key_events: [
      "Produced heavy artillery and armor plate",
      "Allegheny Arsenal explosion (1862)",
      "Supplied ironclad construction"
    ]
  },
  {
    id: 19,
    name: "St. Louis",
    state: "Missouri",
    coordinates: { lat: 38.6270, lng: -90.1994 },
    side: 'border',
    population_1860: 160773,
    description: "Gateway to the West and key to controlling Missouri.",
    wartime_role: "Strategically vital city that remained under Union control despite Confederate sympathies in Missouri. The St. Louis Arsenal provided weapons for Union forces throughout the Western Theater.",
    key_events: [
      "Camp Jackson Affair (May 1861)",
      "Base for Western operations",
      "Arsenal supplied Union armies"
    ]
  },
  {
    id: 20,
    name: "Baltimore",
    state: "Maryland",
    coordinates: { lat: 39.2904, lng: -76.6122 },
    side: 'border',
    population_1860: 212418,
    description: "Divided border city strategically vital to protecting Washington.",
    wartime_role: "Critical rail junction connecting Washington to the North. Pro-Confederate sentiment led to the Pratt Street Riot. The city was occupied by Union troops throughout the war to ensure Maryland's loyalty.",
    key_events: [
      "Pratt Street Riot (April 1861)",
      "Martial law declared",
      "Fort McHenry held political prisoners"
    ]
  },
  {
    id: 21,
    name: "Buffalo",
    state: "New York",
    coordinates: { lat: 42.8864, lng: -78.8784 },
    side: 'union',
    population_1860: 81129,
    description: "Major Great Lakes port and terminus of the Erie Canal.",
    wartime_role: "Important transportation hub connecting the Midwest to the East Coast. Shipped grain and supplies eastward while receiving manufactured goods and immigrants heading west.",
    key_events: [
      "Major grain shipping port",
      "Supplied Great Lakes region",
      "Recruited regiments for Union army"
    ]
  },
  {
    id: 22,
    name: "Cleveland",
    state: "Ohio",
    coordinates: { lat: 41.4993, lng: -81.6944 },
    side: 'union',
    population_1860: 43417,
    description: "Lake Erie port and growing industrial center.",
    wartime_role: "Manufactured iron products and shipped them via the Great Lakes. The city's refineries produced oil for lamps and lubricants needed by the military.",
    key_events: [
      "Iron and oil production center",
      "Camp Cleveland trained troops",
      "Shipped supplies via Great Lakes"
    ]
  },
  {
    id: 23,
    name: "Detroit",
    state: "Michigan",
    coordinates: { lat: 42.3314, lng: -83.0458 },
    side: 'union',
    population_1860: 45619,
    description: "Strategic Great Lakes city and gateway to the upper Midwest.",
    wartime_role: "Produced military equipment and recruited regiments. Fort Wayne protected the city and housed Confederate prisoners. The city's iron industry supported Union manufacturing.",
    key_events: [
      "Recruited Michigan regiments",
      "Fort Wayne POW camp",
      "Iron and copper shipping hub"
    ]
  },
  {
    id: 24,
    name: "Louisville",
    state: "Kentucky",
    coordinates: { lat: 38.2527, lng: -85.7585 },
    side: 'border',
    population_1860: 68033,
    description: "Largest city in Kentucky and crucial Union supply base.",
    wartime_role: "Though Kentucky was divided, Louisville remained firmly Union. The city served as a major supply depot for operations in Kentucky, Tennessee, and further south.",
    key_events: [
      "Remained loyal to Union",
      "Major supply depot",
      "Base for Army of the Ohio"
    ]
  }
];

// Get city by name
export function getCityByName(name: string): CityData | undefined {
  return majorCities.find(city => city.name.toLowerCase() === name.toLowerCase());
}

// Get city by coordinates (approximate match)
export function getCityByCoordinates(lat: number, lng: number, tolerance = 0.1): CityData | undefined {
  return majorCities.find(city =>
    Math.abs(city.coordinates.lat - lat) < tolerance &&
    Math.abs(city.coordinates.lng - lng) < tolerance
  );
}
