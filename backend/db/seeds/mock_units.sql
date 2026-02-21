-- Civil War Interactive Map - Mock Military Units Data
-- Seed file: mock_units.sql
-- Contains historically accurate data for major Union and Confederate military units

-- Reset sequence for consistent IDs during development
-- ALTER SEQUENCE military_units_id_seq RESTART WITH 1;

-- ============================================
-- Union Forces
-- ============================================

-- Top-level Union Armies
INSERT INTO military_units (id, name, type, side, parent_id, formed_date, disbanded_date, description, peak_strength) VALUES

(1, 'Army of the Potomac', 'army', 'union', NULL, '1861-07-26', '1865-06-28',
    'The principal Union army in the Eastern Theater. Fought most of the major battles against Lee''s Army of Northern Virginia.',
    130000),

(2, 'Army of the Tennessee', 'army', 'union', NULL, '1862-02-17', '1865-08-01',
    'Major Union army in the Western Theater. Commanded by Grant and later Sherman.',
    120000),

(3, 'Army of the Cumberland', 'army', 'union', NULL, '1862-10-24', '1865-08-01',
    'Union army that fought in Tennessee and Georgia. Named for the Cumberland River.',
    80000),

(4, 'Army of the Ohio', 'army', 'union', NULL, '1861-11-15', '1865-08-01',
    'Union army operating in Kentucky and Tennessee.',
    48000),

(5, 'Army of the James', 'army', 'union', NULL, '1864-04-28', '1865-08-01',
    'Union army that operated on the Virginia Peninsula and around Petersburg.',
    40000);

-- Union Corps (major subordinate units of Army of the Potomac)
INSERT INTO military_units (id, name, type, side, parent_id, formed_date, disbanded_date, description, peak_strength) VALUES

(6, 'I Corps (Army of the Potomac)', 'corps', 'union', 1, '1862-03-13', '1864-03-23',
    'First Corps of the Army of the Potomac. Heavily engaged at Antietam and Gettysburg.',
    15000),

(7, 'II Corps (Army of the Potomac)', 'corps', 'union', 1, '1862-03-13', '1865-06-28',
    'Second Corps, one of the most distinguished in the Union Army. Held the center at Gettysburg.',
    17000),

(8, 'III Corps (Army of the Potomac)', 'corps', 'union', 1, '1862-03-13', '1864-03-23',
    'Third Corps. Fought at Chancellorsville and took heavy casualties at Gettysburg.',
    14000),

(9, 'V Corps (Army of the Potomac)', 'corps', 'union', 1, '1862-05-18', '1865-06-28',
    'Fifth Corps. Regulars and volunteers who fought throughout the war.',
    18000),

(10, 'VI Corps (Army of the Potomac)', 'corps', 'union', 1, '1862-05-18', '1865-06-28',
    'Sixth Corps. Largest corps by war''s end, known for reliability.',
    22000);

-- Union Divisions
INSERT INTO military_units (id, name, type, side, parent_id, formed_date, disbanded_date, description, peak_strength) VALUES

(11, 'Iron Brigade', 'brigade', 'union', 6, '1861-10-01', '1865-06-28',
    'Famous Western brigade (originally 1st Brigade, 1st Division, I Corps). Wore distinctive black hats. Heavy casualties at Gettysburg.',
    2100),

(12, 'Philadelphia Brigade', 'brigade', 'union', 7, '1861-08-01', '1865-06-28',
    'Brigade of II Corps composed of Pennsylvania regiments. Helped repulse Pickett''s Charge.',
    1800),

(13, 'Irish Brigade', 'brigade', 'union', 7, '1861-09-01', '1865-06-28',
    'Famous brigade composed primarily of Irish immigrants. Suffered enormous casualties throughout the war.',
    2500);

-- ============================================
-- Confederate Forces
-- ============================================

-- Top-level Confederate Armies
INSERT INTO military_units (id, name, type, side, parent_id, formed_date, disbanded_date, description, peak_strength) VALUES

(14, 'Army of Northern Virginia', 'army', 'confederate', NULL, '1862-06-01', '1865-04-09',
    'Principal Confederate army in the Eastern Theater, commanded by Robert E. Lee.',
    89000),

(15, 'Army of Tennessee', 'army', 'confederate', NULL, '1862-11-20', '1865-04-26',
    'Primary Confederate army in the Western Theater. Fought at Shiloh, Chickamauga, and Atlanta.',
    65000),

(16, 'Army of the Shenandoah (Confederate)', 'army', 'confederate', NULL, '1861-05-24', '1862-06-27',
    'Confederate army that operated in the Shenandoah Valley under Jackson.',
    30000),

(17, 'Army of Mississippi', 'army', 'confederate', NULL, '1862-03-05', '1862-11-20',
    'Confederate army that fought at Shiloh. Later reorganized into Army of Tennessee.',
    55000),

(18, 'Trans-Mississippi Department', 'army', 'confederate', NULL, '1862-05-26', '1865-05-26',
    'Confederate command west of the Mississippi River.',
    30000);

-- Confederate Corps (Army of Northern Virginia)
INSERT INTO military_units (id, name, type, side, parent_id, formed_date, disbanded_date, description, peak_strength) VALUES

(19, 'First Corps (Army of Northern Virginia)', 'corps', 'confederate', 14, '1862-11-06', '1865-04-09',
    'Longstreet''s Corps. The "Old War Horse" of Lee''s army.',
    22000),

(20, 'Second Corps (Army of Northern Virginia)', 'corps', 'confederate', 14, '1862-11-06', '1865-04-09',
    'Originally Jackson''s Corps, later commanded by Ewell and then Early.',
    21000),

(21, 'Third Corps (Army of Northern Virginia)', 'corps', 'confederate', 14, '1863-05-30', '1865-04-09',
    'A.P. Hill''s Corps. Created after Chancellorsville.',
    22000),

(22, 'Cavalry Corps (Army of Northern Virginia)', 'corps', 'confederate', 14, '1863-09-09', '1865-04-09',
    'J.E.B. Stuart''s cavalry. Provided reconnaissance and screening.',
    9000);

-- Confederate Divisions and Brigades
INSERT INTO military_units (id, name, type, side, parent_id, formed_date, disbanded_date, description, peak_strength) VALUES

(23, 'Pickett''s Division', 'division', 'confederate', 19, '1862-10-01', '1865-04-09',
    'George Pickett''s Division. Famous for Pickett''s Charge at Gettysburg.',
    6000),

(24, 'Hood''s Division', 'division', 'confederate', 19, '1862-10-01', '1864-07-17',
    'John Bell Hood''s Division. Later Hood commanded the Army of Tennessee.',
    7000),

(25, 'Stonewall Brigade', 'brigade', 'confederate', 20, '1861-05-01', '1864-05-12',
    'Jackson''s original brigade from the Shenandoah Valley. Among the most famous Confederate units.',
    3000),

(26, 'Texas Brigade', 'brigade', 'confederate', 24, '1861-10-22', '1865-04-09',
    'Hood''s Texas Brigade. Noted for aggressive tactics and high casualties.',
    3500);

-- ============================================
-- Naval Forces
-- ============================================

INSERT INTO military_units (id, name, type, side, parent_id, formed_date, disbanded_date, description, peak_strength) VALUES

(27, 'Union Navy - West Gulf Blockading Squadron', 'navy_fleet', 'union', NULL, '1862-02-21', '1865-08-01',
    'Commanded by David Farragut. Captured New Orleans and fought at Mobile Bay.',
    NULL),

(28, 'USS Monitor', 'navy_ship', 'union', NULL, '1862-02-25', '1862-12-31',
    'Revolutionary ironclad warship. Fought CSS Virginia in first battle of ironclads.',
    NULL),

(29, 'Confederate Navy - James River Squadron', 'navy_fleet', 'confederate', NULL, '1861-06-01', '1865-04-03',
    'Confederate squadron defending Richmond on the James River.',
    NULL),

(30, 'CSS Virginia (Merrimack)', 'navy_ship', 'confederate', 29, '1862-02-17', '1862-05-11',
    'First Confederate ironclad. Fought USS Monitor in the Battle of Hampton Roads.',
    NULL);

-- Reset sequence to continue after manual inserts
SELECT setval('military_units_id_seq', (SELECT MAX(id) FROM military_units));

-- ============================================
-- Unit Event Participation
-- ============================================

INSERT INTO unit_event_participation (unit_id, event_id, strength, casualties, role) VALUES

-- First Bull Run
(14, 2, 32000, 1982, 'defending'),

-- Antietam
(1, 6, 87000, 12400, 'attacking'),
(14, 6, 38000, 10316, 'defending'),
(7, 6, 5500, 2255, 'attacking'),

-- Fredericksburg
(1, 7, 114000, 12653, 'attacking'),
(14, 7, 72500, 5309, 'defending'),

-- Chancellorsville
(1, 8, 130000, 17197, 'attacking'),
(14, 8, 60000, 12764, 'defending'),
(20, 8, 21000, 5500, 'flanking'),

-- Gettysburg
(1, 9, 83000, 23049, 'defending'),
(14, 9, 75000, 23231, 'attacking'),
(6, 9, 12000, 6059, 'defending'),
(7, 9, 12500, 4369, 'defending'),
(11, 9, 1800, 1153, 'defending'),
(19, 9, 20000, 8000, 'attacking'),
(23, 9, 5500, 2655, 'attacking'),

-- Chickamauga
(3, 11, 60000, 16170, 'defending'),
(15, 11, 65000, 18454, 'attacking'),

-- Chattanooga
(2, 12, 40000, 5824, 'attacking'),
(3, 12, 16000, NULL, 'attacking'),
(15, 12, 44000, 6667, 'defending'),

-- Wilderness
(1, 13, 102000, 17666, 'attacking'),
(14, 13, 61000, 11125, 'defending'),

-- Spotsylvania
(1, 14, 100000, 18399, 'attacking'),
(14, 14, 52000, 12702, 'defending'),
(7, 14, 15000, 6000, 'attacking'),

-- Cold Harbor
(1, 15, 108000, 12737, 'attacking'),
(14, 15, 59000, 3463, 'defending'),

-- Petersburg (Siege)
(1, 16, 125000, 42000, 'besieging'),
(14, 16, 65000, 32000, 'defending');
