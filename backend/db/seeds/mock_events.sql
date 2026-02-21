-- Civil War Interactive Map - Mock Events Data
-- Seed file: mock_events.sql
-- Contains historically accurate data for major Civil War battles and events

-- Reset sequence for consistent IDs during development
-- ALTER SEQUENCE events_id_seq RESTART WITH 1;

INSERT INTO events (id, name, type, date_start, date_end, location_id, campaign, theater, result, significance, description, cwsac_id, wikipedia_url) VALUES

-- 1861 Events
(1, 'Battle of Fort Sumter', 'battle', '1861-04-12', '1861-04-13', 1,
    NULL, 'Eastern',
    'Confederate victory', 5,
    'The bombardment of Fort Sumter was the first military action of the American Civil War. Confederate forces under P.G.T. Beauregard opened fire on the Union garrison commanded by Major Robert Anderson. The surrender of the fort united the North against the Confederacy.',
    'SC001', 'https://en.wikipedia.org/wiki/Battle_of_Fort_Sumter'),

(2, 'First Battle of Bull Run', 'battle', '1861-07-21', '1861-07-21', 6,
    'Manassas Campaign', 'Eastern',
    'Confederate victory', 4,
    'Also known as First Manassas, this was the first major land battle of the Civil War. Union forces under Irvin McDowell were routed by Confederates under Beauregard and Johnston. Thomas Jackson earned the nickname "Stonewall" for his brigade''s steadfast defense.',
    'VA005', 'https://en.wikipedia.org/wiki/First_Battle_of_Bull_Run'),

-- 1862 Events
(3, 'Battle of Fort Donelson', 'siege', '1862-02-11', '1862-02-16', 16,
    'Fort Henry and Fort Donelson Campaign', 'Western',
    'Union victory', 4,
    'Ulysses S. Grant captured this Confederate fort on the Cumberland River. His demand for "unconditional surrender" made him a national hero. The victory opened up the Tennessee and Cumberland rivers to Union gunboats.',
    'TN002', 'https://en.wikipedia.org/wiki/Battle_of_Fort_Donelson'),

(4, 'Battle of Shiloh', 'battle', '1862-04-06', '1862-04-07', 7,
    'Operations against Corinth', 'Western',
    'Union victory', 5,
    'Also known as the Battle of Pittsburg Landing. Confederate forces under Albert Sidney Johnston launched a surprise attack but were ultimately defeated. Johnston was killed and over 23,000 soldiers became casualties, shocking both North and South.',
    'TN003', 'https://en.wikipedia.org/wiki/Battle_of_Shiloh'),

(5, 'Second Battle of Bull Run', 'battle', '1862-08-28', '1862-08-30', 6,
    'Northern Virginia Campaign', 'Eastern',
    'Confederate victory', 4,
    'Robert E. Lee''s Army of Northern Virginia decisively defeated John Pope''s Army of Virginia. The victory cleared the way for Lee''s first invasion of the North, leading to the Maryland Campaign.',
    'VA026', 'https://en.wikipedia.org/wiki/Second_Battle_of_Bull_Run'),

(6, 'Battle of Antietam', 'battle', '1862-09-17', '1862-09-17', 3,
    'Maryland Campaign', 'Eastern',
    'Union victory', 5,
    'The bloodiest single-day battle in American military history with approximately 23,000 casualties. McClellan''s Army of the Potomac halted Lee''s invasion of Maryland. The Union "victory" gave Lincoln the opportunity to issue the Emancipation Proclamation.',
    'MD003', 'https://en.wikipedia.org/wiki/Battle_of_Antietam'),

(7, 'Battle of Fredericksburg', 'battle', '1862-12-11', '1862-12-15', 8,
    'Fredericksburg Campaign', 'Eastern',
    'Confederate victory', 4,
    'Ambrose Burnside''s disastrous frontal assault against entrenched Confederate positions resulted in over 12,000 Union casualties. Lee''s defensive victory was one of the most one-sided battles of the war.',
    'VA044', 'https://en.wikipedia.org/wiki/Battle_of_Fredericksburg'),

-- 1863 Events
(8, 'Battle of Chancellorsville', 'battle', '1863-04-30', '1863-05-06', 5,
    'Chancellorsville Campaign', 'Eastern',
    'Confederate victory', 5,
    'Often called Lee''s "perfect battle." Despite being outnumbered 2-to-1, Lee divided his forces and flanked Hooker''s army. However, Stonewall Jackson was mortally wounded by friendly fire, a loss Lee called losing his "right arm."',
    'VA032', 'https://en.wikipedia.org/wiki/Battle_of_Chancellorsville'),

(9, 'Battle of Gettysburg', 'battle', '1863-07-01', '1863-07-03', 2,
    'Gettysburg Campaign', 'Eastern',
    'Union victory', 5,
    'The turning point of the Civil War. Lee''s second invasion of the North ended in defeat after three days of fighting. Pickett''s Charge on the final day resulted in catastrophic Confederate losses. Combined casualties exceeded 50,000.',
    'PA002', 'https://en.wikipedia.org/wiki/Battle_of_Gettysburg'),

(10, 'Siege of Vicksburg', 'siege', '1863-05-18', '1863-07-04', 4,
    'Vicksburg Campaign', 'Western',
    'Union victory', 5,
    'Grant''s campaign to capture this Confederate fortress on the Mississippi. After a 47-day siege, the garrison surrendered on July 4, 1863. Combined with the fall of Port Hudson, the Union gained complete control of the Mississippi River, splitting the Confederacy.',
    'MS009', 'https://en.wikipedia.org/wiki/Siege_of_Vicksburg'),

(11, 'Battle of Chickamauga', 'battle', '1863-09-19', '1863-09-20', 9,
    'Chickamauga Campaign', 'Western',
    'Confederate victory', 4,
    'The second bloodiest battle of the war after Gettysburg. Braxton Bragg''s Confederate forces defeated William Rosecrans'' Union army, forcing them to retreat to Chattanooga. George Thomas earned the nickname "Rock of Chickamauga" for his defensive stand.',
    'GA004', 'https://en.wikipedia.org/wiki/Battle_of_Chickamauga'),

(12, 'Battles of Chattanooga', 'battle', '1863-11-23', '1863-11-25', 10,
    'Chattanooga Campaign', 'Western',
    'Union victory', 4,
    'Grant''s forces broke the Confederate siege of Chattanooga in dramatic fashion. The assault on Missionary Ridge and Sherman''s battles at Tunnel Hill opened the gateway to Georgia for the Atlanta Campaign.',
    'TN018', 'https://en.wikipedia.org/wiki/Chattanooga_Campaign'),

-- 1864 Events
(13, 'Battle of the Wilderness', 'battle', '1864-05-05', '1864-05-07', 20,
    'Overland Campaign', 'Eastern',
    'Inconclusive', 4,
    'The opening battle of Grant''s Overland Campaign. Two days of confused fighting in dense forest resulted in approximately 29,000 combined casualties. Unlike previous commanders, Grant continued to advance south rather than retreat.',
    'VA046', 'https://en.wikipedia.org/wiki/Battle_of_the_Wilderness'),

(14, 'Battle of Spotsylvania Court House', 'battle', '1864-05-08', '1864-05-21', 18,
    'Overland Campaign', 'Eastern',
    'Inconclusive', 4,
    'Fourteen days of intense combat including the brutal fighting at the "Bloody Angle" on May 12. Combined casualties exceeded 30,000. Grant continued his strategy of constant engagement.',
    'VA048', 'https://en.wikipedia.org/wiki/Battle_of_Spotsylvania_Court_House'),

(15, 'Battle of Cold Harbor', 'battle', '1864-05-31', '1864-06-12', 19,
    'Overland Campaign', 'Eastern',
    'Confederate victory', 4,
    'Grant''s frontal assault on June 3 resulted in approximately 7,000 Union casualties in less than an hour. Grant later wrote it was the only attack he regretted ordering. The armies then moved toward Petersburg.',
    'VA049', 'https://en.wikipedia.org/wiki/Battle_of_Cold_Harbor'),

(16, 'Siege of Petersburg', 'siege', '1864-06-09', '1865-03-25', 17,
    'Richmond-Petersburg Campaign', 'Eastern',
    'Union victory', 5,
    'The longest siege in American history (nearly 10 months). Grant''s forces gradually extended their lines, cutting Confederate supply routes. The fall of Petersburg led directly to the evacuation of Richmond.',
    'VA065', 'https://en.wikipedia.org/wiki/Siege_of_Petersburg'),

(17, 'Battle of Atlanta', 'battle', '1864-07-22', '1864-07-22', 14,
    'Atlanta Campaign', 'Western',
    'Union victory', 4,
    'Sherman''s forces defeated John Bell Hood''s Confederate army in the decisive battle for Atlanta. Hood''s aggressive counterattacks failed to stop the Union advance.',
    'GA008', 'https://en.wikipedia.org/wiki/Battle_of_Atlanta'),

-- 1865 Events
(18, 'Surrender at Appomattox Court House', 'surrender', '1865-04-09', NULL, 11,
    'Appomattox Campaign', 'Eastern',
    NULL, 5,
    'General Robert E. Lee surrendered the Army of Northern Virginia to General Ulysses S. Grant at Appomattox Court House, Virginia. The terms were generous: Confederate soldiers were paroled and allowed to return home.',
    NULL, 'https://en.wikipedia.org/wiki/Battle_of_Appomattox_Court_House'),

-- Political Events
(19, 'Emancipation Proclamation', 'proclamation', '1863-01-01', NULL, 13,
    NULL, NULL,
    NULL, 5,
    'President Abraham Lincoln''s executive order freeing all slaves in Confederate-held territory. While it did not immediately free any slaves, it fundamentally changed the character of the war and allowed African Americans to serve in the Union Army.',
    NULL, 'https://en.wikipedia.org/wiki/Emancipation_Proclamation'),

(20, 'Lincoln''s Re-election', 'election', '1864-11-08', NULL, 13,
    NULL, NULL,
    'Union victory', 4,
    'Abraham Lincoln defeated George B. McClellan in the 1864 presidential election. The victory ensured the Union would continue fighting until Confederate surrender rather than negotiate peace.',
    NULL, 'https://en.wikipedia.org/wiki/1864_United_States_presidential_election');

-- Reset sequence to continue after manual inserts
SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));

-- ============================================
-- Event Casualties Data
-- ============================================

INSERT INTO event_casualties (event_id, side, killed, wounded, captured, missing, total_engaged) VALUES

-- Fort Sumter (minimal casualties)
(1, 'union', 2, 0, 0, 0, 85),
(1, 'confederate', 0, 4, 0, 0, 500),

-- First Bull Run
(2, 'union', 460, 1124, 1312, 0, 28000),
(2, 'confederate', 387, 1582, 13, 0, 32000),

-- Fort Donelson
(3, 'union', 500, 2108, 224, 0, 27000),
(3, 'confederate', 327, 1127, 12392, 0, 21000),

-- Shiloh
(4, 'union', 1754, 8408, 2885, 0, 65085),
(4, 'confederate', 1728, 8012, 959, 0, 44968),

-- Second Bull Run
(5, 'union', 1724, 8372, 5958, 0, 62000),
(5, 'confederate', 1481, 7627, 89, 0, 50000),

-- Antietam
(6, 'union', 2108, 9540, 753, 0, 87164),
(6, 'confederate', 1546, 7752, 1018, 0, 38000),

-- Fredericksburg
(7, 'union', 1284, 9600, 1769, 0, 114000),
(7, 'confederate', 595, 4061, 653, 0, 72500),

-- Chancellorsville
(8, 'union', 1606, 9672, 5919, 0, 133868),
(8, 'confederate', 1665, 9081, 2018, 0, 60892),

-- Gettysburg
(9, 'union', 3155, 14529, 5365, 0, 83289),
(9, 'confederate', 4708, 12693, 5830, 0, 75000),

-- Vicksburg
(10, 'union', 806, 3940, 164, 0, 77000),
(10, 'confederate', 805, 1938, 29491, 0, 33000),

-- Chickamauga
(11, 'union', 1657, 9756, 4757, 0, 60000),
(11, 'confederate', 2312, 14674, 1468, 0, 65000),

-- Chattanooga
(12, 'union', 753, 4722, 349, 0, 56000),
(12, 'confederate', 361, 2160, 4146, 0, 44000),

-- Wilderness
(13, 'union', 2246, 12037, 3383, 0, 101895),
(13, 'confederate', 1495, 7928, 1702, 0, 61025),

-- Spotsylvania
(14, 'union', 2725, 13416, 2258, 0, 100000),
(14, 'confederate', 1467, 6235, 5000, 0, 52000),

-- Cold Harbor
(15, 'union', 1844, 9077, 1816, 0, 108000),
(15, 'confederate', 83, 3380, 0, 0, 59000),

-- Petersburg (total siege casualties)
(16, 'union', 8150, 32000, 2000, 0, 125000),
(16, 'confederate', 4000, 28000, 0, 0, 65000),

-- Atlanta
(17, 'union', 430, 1559, 1733, 0, 34863),
(17, 'confederate', 562, 2500, 1000, 0, 40000);

-- ============================================
-- Person-Event Roles
-- ============================================

INSERT INTO person_event_roles (person_id, event_id, role, unit_commanded, notes) VALUES

-- Fort Sumter
(12, 1, 'commander', 'Confederate Forces', 'Ordered first shots of the war'),

-- First Bull Run
(12, 2, 'commander', 'Confederate Forces', 'Co-commanded with Johnston'),
(9, 2, 'subordinate', 'First Virginia Brigade', 'Earned nickname "Stonewall"'),

-- Shiloh
(1, 4, 'commander', 'Army of the Tennessee', 'First major victory'),

-- Antietam
(4, 6, 'commander', 'Army of the Potomac', 'Failed to pursue Lee'),
(8, 6, 'commander', 'Army of Northern Virginia', 'Retreated after battle'),

-- Fredericksburg
(6, 7, 'commander', 'Army of the Potomac', 'Disastrous frontal assault'),
(8, 7, 'commander', 'Army of Northern Virginia', 'Defensive victory'),

-- Chancellorsville
(7, 8, 'commander', 'Army of the Potomac', 'Outmaneuvered by Lee'),
(8, 8, 'commander', 'Army of Northern Virginia', 'Lee''s "perfect battle"'),
(9, 8, 'subordinate', 'Second Corps', 'Mortally wounded'),

-- Gettysburg
(3, 9, 'commander', 'Army of the Potomac', 'First battle in command'),
(8, 9, 'commander', 'Army of Northern Virginia', 'Invasion of the North failed'),
(10, 9, 'subordinate', 'First Corps', 'Delayed attack controversial'),

-- Vicksburg
(1, 10, 'commander', 'Army of the Tennessee', 'Brilliant campaign'),

-- Chickamauga
(13, 11, 'commander', 'Army of Tennessee', 'Victory but failed to follow up'),

-- Chattanooga
(1, 12, 'commander', 'Military Division of the Mississippi', 'Relieved siege'),

-- Wilderness through Cold Harbor
(1, 13, 'commander', 'Union Forces', 'Beginning of Overland Campaign'),
(8, 13, 'commander', 'Army of Northern Virginia', NULL),
(1, 14, 'commander', 'Union Forces', NULL),
(8, 14, 'commander', 'Army of Northern Virginia', NULL),
(1, 15, 'commander', 'Union Forces', 'Later regretted the assault'),
(8, 15, 'commander', 'Army of Northern Virginia', NULL),

-- Petersburg
(1, 16, 'commander', 'Union Forces', 'Directed siege operations'),
(8, 16, 'commander', 'Army of Northern Virginia', 'Defended for 10 months'),

-- Atlanta
(2, 17, 'commander', 'Military Division of the Mississippi', 'Atlanta Campaign'),

-- Appomattox
(1, 18, 'signatory', NULL, 'Accepted Lee''s surrender'),
(8, 18, 'signatory', 'Army of Northern Virginia', 'Surrendered the army'),

-- Emancipation Proclamation
(16, 19, 'signatory', NULL, 'Issued the proclamation');

-- Reset sequence
SELECT setval('event_casualties_id_seq', (SELECT MAX(id) FROM event_casualties));
SELECT setval('person_event_roles_id_seq', (SELECT MAX(id) FROM person_event_roles));
