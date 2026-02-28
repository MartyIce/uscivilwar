// Civil War-era state data
export interface StateData {
  name: string;
  side: 'union' | 'confederate' | 'border';
  admissionDate?: string;
  secessionDate?: string;
  readmissionDate?: string;
  capital: string;
  governor1861: string;
  governor1865: string;
  population1860: number;
  troopsProvided: {
    union: number;
    confederate: number;
  };
  casualties: {
    killed: number;
    wounded: number;
    total: number;
  };
  majorBattles: string[];
  description: string;
}

export const stateData: Record<string, StateData> = {
  'Virginia': {
    name: 'Virginia',
    side: 'confederate',
    secessionDate: '1861-04-17',
    readmissionDate: '1870-01-26',
    capital: 'Richmond',
    governor1861: 'John Letcher',
    governor1865: 'William Smith',
    population1860: 1596318,
    troopsProvided: { union: 32000, confederate: 150000 },
    casualties: { killed: 15000, wounded: 40000, total: 55000 },
    majorBattles: ['First Bull Run', 'Seven Days', 'Fredericksburg', 'Chancellorsville', 'Wilderness', 'Petersburg'],
    description: 'The most fought-over state of the war. Home to the Confederate capital at Richmond and site of over 120 named battles.'
  },
  'Pennsylvania': {
    name: 'Pennsylvania',
    side: 'union',
    capital: 'Harrisburg',
    governor1861: 'Andrew Curtin',
    governor1865: 'Andrew Curtin',
    population1860: 2906215,
    troopsProvided: { union: 360000, confederate: 0 },
    casualties: { killed: 33000, wounded: 65000, total: 98000 },
    majorBattles: ['Gettysburg'],
    description: 'Key industrial state that provided more troops than any other Union state except New York. Site of the war\'s most famous battle at Gettysburg.'
  },
  'Georgia': {
    name: 'Georgia',
    side: 'confederate',
    secessionDate: '1861-01-19',
    readmissionDate: '1870-07-15',
    capital: 'Milledgeville (wartime)',
    governor1861: 'Joseph E. Brown',
    governor1865: 'Joseph E. Brown',
    population1860: 1057286,
    troopsProvided: { union: 3500, confederate: 120000 },
    casualties: { killed: 11000, wounded: 25000, total: 36000 },
    majorBattles: ['Chickamauga', 'Atlanta', 'Kennesaw Mountain', 'March to the Sea'],
    description: 'Sherman\'s March to the Sea devastated the state in 1864. Atlanta\'s fall was a turning point ensuring Lincoln\'s reelection.'
  },
  'Tennessee': {
    name: 'Tennessee',
    side: 'confederate',
    secessionDate: '1861-06-08',
    readmissionDate: '1866-07-24',
    capital: 'Nashville',
    governor1861: 'Isham Harris',
    governor1865: 'William Brownlow',
    population1860: 1109801,
    troopsProvided: { union: 31000, confederate: 115000 },
    casualties: { killed: 13000, wounded: 30000, total: 43000 },
    majorBattles: ['Shiloh', 'Stones River', 'Chattanooga', 'Franklin', 'Nashville'],
    description: 'Most fought-over state in the Western Theater. Deeply divided, with East Tennessee strongly pro-Union.'
  },
  'Maryland': {
    name: 'Maryland',
    side: 'border',
    capital: 'Annapolis',
    governor1861: 'Thomas Hicks',
    governor1865: 'Augustus Bradford',
    population1860: 687049,
    troopsProvided: { union: 46638, confederate: 22000 },
    casualties: { killed: 4000, wounded: 8000, total: 12000 },
    majorBattles: ['Antietam', 'South Mountain', 'Monocacy'],
    description: 'Border state that remained in the Union despite strong Southern sympathies. Site of the bloodiest single-day battle at Antietam.'
  },
  'South Carolina': {
    name: 'South Carolina',
    side: 'confederate',
    secessionDate: '1860-12-20',
    readmissionDate: '1868-07-09',
    capital: 'Columbia',
    governor1861: 'Francis Pickens',
    governor1865: 'Andrew Magrath',
    population1860: 703708,
    troopsProvided: { union: 5000, confederate: 63000 },
    casualties: { killed: 8000, wounded: 15000, total: 23000 },
    majorBattles: ['Fort Sumter', 'Fort Wagner', 'Charleston operations'],
    description: 'First state to secede and site of the war\'s opening shots at Fort Sumter. Charleston was a major Confederate port.'
  },
  'New York': {
    name: 'New York',
    side: 'union',
    capital: 'Albany',
    governor1861: 'Edwin Morgan',
    governor1865: 'Reuben Fenton',
    population1860: 3880735,
    troopsProvided: { union: 448850, confederate: 0 },
    casualties: { killed: 46534, wounded: 80000, total: 126534 },
    majorBattles: [],
    description: 'Provided more troops and money than any other Union state. The Draft Riots of 1863 were the largest civil disturbance in American history.'
  },
  'Mississippi': {
    name: 'Mississippi',
    side: 'confederate',
    secessionDate: '1861-01-09',
    readmissionDate: '1870-02-23',
    capital: 'Jackson',
    governor1861: 'John Pettus',
    governor1865: 'Charles Clark',
    population1860: 791305,
    troopsProvided: { union: 500, confederate: 78000 },
    casualties: { killed: 10000, wounded: 20000, total: 30000 },
    majorBattles: ['Vicksburg', 'Corinth', 'Champion Hill'],
    description: 'Control of the Mississippi River was a key Union objective. The fall of Vicksburg split the Confederacy in two.'
  },
  'Kentucky': {
    name: 'Kentucky',
    side: 'border',
    capital: 'Frankfort',
    governor1861: 'Beriah Magoffin',
    governor1865: 'Thomas Bramlette',
    population1860: 1155684,
    troopsProvided: { union: 75760, confederate: 35000 },
    casualties: { killed: 10000, wounded: 20000, total: 30000 },
    majorBattles: ['Perryville', 'Mill Springs'],
    description: 'Lincoln said "I hope to have God on my side, but I must have Kentucky." The state provided troops to both armies.'
  },
  'Ohio': {
    name: 'Ohio',
    side: 'union',
    capital: 'Columbus',
    governor1861: 'William Dennison',
    governor1865: 'John Brough',
    population1860: 2339511,
    troopsProvided: { union: 310654, confederate: 0 },
    casualties: { killed: 35000, wounded: 60000, total: 95000 },
    majorBattles: [],
    description: 'Third highest contributor of Union troops. Home state of Grant, Sherman, and Sheridan.'
  },
  'Louisiana': {
    name: 'Louisiana',
    side: 'confederate',
    secessionDate: '1861-01-26',
    readmissionDate: '1868-07-09',
    capital: 'Baton Rouge',
    governor1861: 'Thomas Moore',
    governor1865: 'Henry Allen',
    population1860: 708002,
    troopsProvided: { union: 5000, confederate: 56000 },
    casualties: { killed: 5000, wounded: 15000, total: 20000 },
    majorBattles: ['New Orleans', 'Port Hudson', 'Red River Campaign'],
    description: 'New Orleans, the South\'s largest city, fell to Union forces in 1862. Port Hudson was the last Confederate stronghold on the Mississippi.'
  },
  'North Carolina': {
    name: 'North Carolina',
    side: 'confederate',
    secessionDate: '1861-05-20',
    readmissionDate: '1868-07-04',
    capital: 'Raleigh',
    governor1861: 'John Ellis',
    governor1865: 'Zebulon Vance',
    population1860: 992622,
    troopsProvided: { union: 3156, confederate: 125000 },
    casualties: { killed: 19673, wounded: 40000, total: 59673 },
    majorBattles: ['Bentonville', 'Fort Fisher'],
    description: 'Contributed more troops and suffered more casualties than any other Confederate state. Last state to secede.'
  },
  'Alabama': {
    name: 'Alabama',
    side: 'confederate',
    secessionDate: '1861-01-11',
    readmissionDate: '1868-07-13',
    capital: 'Montgomery',
    governor1861: 'Andrew Moore',
    governor1865: 'Thomas Watts',
    population1860: 964201,
    troopsProvided: { union: 2576, confederate: 90000 },
    casualties: { killed: 8000, wounded: 25000, total: 33000 },
    majorBattles: ['Mobile Bay'],
    description: 'Montgomery was the first Confederate capital. Mobile Bay was one of the last major Confederate ports.'
  },
  'Missouri': {
    name: 'Missouri',
    side: 'border',
    capital: 'Jefferson City',
    governor1861: 'Claiborne Jackson',
    governor1865: 'Thomas Fletcher',
    population1860: 1182012,
    troopsProvided: { union: 100000, confederate: 40000 },
    casualties: { killed: 13000, wounded: 20000, total: 33000 },
    majorBattles: ['Wilson\'s Creek', 'Pea Ridge'],
    description: 'Site of intense guerrilla warfare. Had rival governments, one Union and one Confederate.'
  },
  'West Virginia': {
    name: 'West Virginia',
    side: 'union',
    admissionDate: '1863-06-20',
    capital: 'Wheeling',
    governor1861: 'Francis Pierpont (Restored VA)',
    governor1865: 'Arthur Boreman',
    population1860: 376688,
    troopsProvided: { union: 32000, confederate: 7000 },
    casualties: { killed: 2000, wounded: 4000, total: 6000 },
    majorBattles: ['Philippi', 'Rich Mountain', 'Cheat Mountain'],
    description: 'Created during the war when western Virginia counties refused to secede. Admitted as the 35th state in 1863.'
  },
  'New Jersey': {
    name: 'New Jersey',
    side: 'union',
    capital: 'Trenton',
    governor1861: 'Charles Olden',
    governor1865: 'Joel Parker',
    population1860: 672035,
    troopsProvided: { union: 76814, confederate: 0 },
    casualties: { killed: 6300, wounded: 12000, total: 18300 },
    majorBattles: [],
    description: 'Provided troops and industrial support to the Union. Some Democratic opposition to the war led to political tensions.'
  },
  'Massachusetts': {
    name: 'Massachusetts',
    side: 'union',
    capital: 'Boston',
    governor1861: 'John Andrew',
    governor1865: 'John Andrew',
    population1860: 1231066,
    troopsProvided: { union: 146730, confederate: 0 },
    casualties: { killed: 13942, wounded: 25000, total: 38942 },
    majorBattles: [],
    description: 'Center of abolitionism. Raised the famous 54th Massachusetts, one of the first Black regiments.'
  },
  'Connecticut': {
    name: 'Connecticut',
    side: 'union',
    capital: 'Hartford',
    governor1861: 'William Buckingham',
    governor1865: 'William Buckingham',
    population1860: 460147,
    troopsProvided: { union: 55864, confederate: 0 },
    casualties: { killed: 5354, wounded: 10000, total: 15354 },
    majorBattles: [],
    description: 'Major arms manufacturer. Colt and other factories supplied Union forces with weapons.'
  },
  'Rhode Island': {
    name: 'Rhode Island',
    side: 'union',
    capital: 'Providence',
    governor1861: 'William Sprague',
    governor1865: 'James Smith',
    population1860: 174620,
    troopsProvided: { union: 23236, confederate: 0 },
    casualties: { killed: 1685, wounded: 3000, total: 4685 },
    majorBattles: [],
    description: 'Smallest state but quick to respond. Governor Sprague personally led troops to Washington.'
  },
  'Vermont': {
    name: 'Vermont',
    side: 'union',
    capital: 'Montpelier',
    governor1861: 'Erastus Fairbanks',
    governor1865: 'John Gregory Smith',
    population1860: 315098,
    troopsProvided: { union: 34238, confederate: 0 },
    casualties: { killed: 5224, wounded: 9000, total: 14224 },
    majorBattles: [],
    description: 'Strongly anti-slavery. Site of the northernmost Confederate raid at St. Albans in 1864.'
  },
  'New Hampshire': {
    name: 'New Hampshire',
    side: 'union',
    capital: 'Concord',
    governor1861: 'Ichabod Goodwin',
    governor1865: 'Joseph Gilmore',
    population1860: 326073,
    troopsProvided: { union: 33937, confederate: 0 },
    casualties: { killed: 4882, wounded: 8000, total: 12882 },
    majorBattles: [],
    description: 'Strongly supported the Union cause. Franklin Pierce, former president, was a controversial critic of Lincoln.'
  },
  'Maine': {
    name: 'Maine',
    side: 'union',
    capital: 'Augusta',
    governor1861: 'Israel Washburn Jr.',
    governor1865: 'Samuel Cony',
    population1860: 628279,
    troopsProvided: { union: 70107, confederate: 0 },
    casualties: { killed: 9398, wounded: 15000, total: 24398 },
    majorBattles: [],
    description: 'Hannibal Hamlin, Lincoln\'s first VP, was from Maine. Joshua Chamberlain became a famous hero at Gettysburg.'
  },
  'Indiana': {
    name: 'Indiana',
    side: 'union',
    capital: 'Indianapolis',
    governor1861: 'Oliver Morton',
    governor1865: 'Oliver Morton',
    population1860: 1350428,
    troopsProvided: { union: 196363, confederate: 0 },
    casualties: { killed: 26672, wounded: 50000, total: 76672 },
    majorBattles: [],
    description: 'Fourth highest contributor of Union troops. Governor Morton was one of Lincoln\'s strongest supporters.'
  },
  'Illinois': {
    name: 'Illinois',
    side: 'union',
    capital: 'Springfield',
    governor1861: 'Richard Yates',
    governor1865: 'Richard Oglesby',
    population1860: 1711951,
    troopsProvided: { union: 259092, confederate: 0 },
    casualties: { killed: 34834, wounded: 60000, total: 94834 },
    majorBattles: [],
    description: 'Lincoln\'s home state. Second highest contributor of Union troops after New York.'
  },
  'Michigan': {
    name: 'Michigan',
    side: 'union',
    capital: 'Lansing',
    governor1861: 'Austin Blair',
    governor1865: 'Henry Crapo',
    population1860: 749113,
    troopsProvided: { union: 90048, confederate: 0 },
    casualties: { killed: 14753, wounded: 25000, total: 39753 },
    majorBattles: [],
    description: 'George Custer led the Michigan Cavalry Brigade. First western state to send troops to Washington.'
  },
  'Wisconsin': {
    name: 'Wisconsin',
    side: 'union',
    capital: 'Madison',
    governor1861: 'Alexander Randall',
    governor1865: 'James Lewis',
    population1860: 775881,
    troopsProvided: { union: 91379, confederate: 0 },
    casualties: { killed: 12216, wounded: 20000, total: 32216 },
    majorBattles: [],
    description: 'The Iron Brigade, composed largely of Wisconsin troops, was one of the Union\'s elite units.'
  },
  'Minnesota': {
    name: 'Minnesota',
    side: 'union',
    capital: 'St. Paul',
    governor1861: 'Alexander Ramsey',
    governor1865: 'Stephen Miller',
    population1860: 172023,
    troopsProvided: { union: 24020, confederate: 0 },
    casualties: { killed: 2584, wounded: 5000, total: 7584 },
    majorBattles: [],
    description: 'First state to offer troops after Fort Sumter. Also dealt with the Dakota War of 1862.'
  },
  'Iowa': {
    name: 'Iowa',
    side: 'union',
    capital: 'Des Moines',
    governor1861: 'Samuel Kirkwood',
    governor1865: 'William Stone',
    population1860: 674913,
    troopsProvided: { union: 76242, confederate: 0 },
    casualties: { killed: 13001, wounded: 22000, total: 35001 },
    majorBattles: [],
    description: 'Provided more troops per capita than any other state. Strongly Republican and anti-slavery.'
  },
  'Kansas': {
    name: 'Kansas',
    side: 'union',
    admissionDate: '1861-01-29',
    capital: 'Topeka',
    governor1861: 'Charles Robinson',
    governor1865: 'Samuel Crawford',
    population1860: 107206,
    troopsProvided: { union: 20149, confederate: 0 },
    casualties: { killed: 2630, wounded: 4000, total: 6630 },
    majorBattles: ['Quantrill\'s Raid on Lawrence'],
    description: 'Bleeding Kansas violence preceded the war. Lawrence was burned by Quantrill\'s Raiders in 1863.'
  },
  'California': {
    name: 'California',
    side: 'union',
    capital: 'Sacramento',
    governor1861: 'John Downey',
    governor1865: 'Frederick Low',
    population1860: 379994,
    troopsProvided: { union: 15725, confederate: 0 },
    casualties: { killed: 573, wounded: 1000, total: 1573 },
    majorBattles: [],
    description: 'Too far to send troops east but provided gold that helped finance the war. Guarded against Confederate sympathizers.'
  },
  'Oregon': {
    name: 'Oregon',
    side: 'union',
    capital: 'Salem',
    governor1861: 'John Whiteaker',
    governor1865: 'Addison Gibbs',
    population1860: 52465,
    troopsProvided: { union: 1810, confederate: 0 },
    casualties: { killed: 46, wounded: 100, total: 146 },
    majorBattles: [],
    description: 'Distant from the fighting but firmly Union. Troops served in the Pacific Northwest.'
  },
  'Delaware': {
    name: 'Delaware',
    side: 'border',
    capital: 'Dover',
    governor1861: 'William Burton',
    governor1865: 'Gove Saulsbury',
    population1860: 112216,
    troopsProvided: { union: 12284, confederate: 500 },
    casualties: { killed: 882, wounded: 1500, total: 2382 },
    majorBattles: [],
    description: 'Slave state that remained loyal. Rejected the 13th Amendment initially but slavery ended there anyway.'
  },
  'Texas': {
    name: 'Texas',
    side: 'confederate',
    secessionDate: '1861-02-01',
    readmissionDate: '1870-03-30',
    capital: 'Austin',
    governor1861: 'Edward Clark',
    governor1865: 'Pendleton Murrah',
    population1860: 604215,
    troopsProvided: { union: 2000, confederate: 90000 },
    casualties: { killed: 5000, wounded: 12000, total: 17000 },
    majorBattles: ['Galveston', 'Sabine Pass', 'Palmito Ranch'],
    description: 'Sam Houston opposed secession and was removed as governor. Last battle of the war fought at Palmito Ranch.'
  },
  'Arkansas': {
    name: 'Arkansas',
    side: 'confederate',
    secessionDate: '1861-05-06',
    readmissionDate: '1868-06-22',
    capital: 'Little Rock',
    governor1861: 'Henry Rector',
    governor1865: 'Harris Flanagin',
    population1860: 435450,
    troopsProvided: { union: 8289, confederate: 60000 },
    casualties: { killed: 5000, wounded: 10000, total: 15000 },
    majorBattles: ['Pea Ridge', 'Prairie Grove'],
    description: 'Initially hesitant to secede. Pea Ridge was the largest battle west of the Mississippi.'
  },
  'Florida': {
    name: 'Florida',
    side: 'confederate',
    secessionDate: '1861-01-10',
    readmissionDate: '1868-06-25',
    capital: 'Tallahassee',
    governor1861: 'Madison Perry',
    governor1865: 'Abraham Allison',
    population1860: 140424,
    troopsProvided: { union: 1290, confederate: 15000 },
    casualties: { killed: 1000, wounded: 3000, total: 4000 },
    majorBattles: ['Olustee'],
    description: 'Smallest Confederate state by population. Supplied beef and salt to Confederate armies.'
  },
  'Nevada': {
    name: 'Nevada',
    side: 'union',
    admissionDate: '1864-10-31',
    capital: 'Carson City',
    governor1861: 'James Nye (Territory)',
    governor1865: 'Henry Blasdel',
    population1860: 6857,
    troopsProvided: { union: 1180, confederate: 0 },
    casualties: { killed: 33, wounded: 50, total: 83 },
    majorBattles: [],
    description: 'Admitted during the war to help ensure passage of the 13th Amendment. Called the "Battle Born State."'
  }
};

// Get state data by name
export function getStateByName(name: string): StateData | undefined {
  return stateData[name];
}

// Get all states
export function getAllStates(): StateData[] {
  return Object.values(stateData);
}
