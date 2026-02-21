-- Civil War Interactive Map - Mock Location Data
-- Seed file: mock_locations.sql
-- Contains historically accurate location data for major Civil War sites

-- Reset sequence for consistent IDs during development
-- ALTER SEQUENCE locations_id_seq RESTART WITH 1;

INSERT INTO locations (id, name, type, coordinates, state, description, external_id) VALUES

-- Major Battlefields
(1, 'Fort Sumter', 'fort',
    ST_GeogFromText('POINT(-79.8745 32.7522)'),
    'South Carolina',
    'Fort Sumter is a sea fort in Charleston Harbor, South Carolina. The first shots of the Civil War were fired here on April 12, 1861.',
    'cwsac_SC001'),

(2, 'Gettysburg', 'battlefield',
    ST_GeogFromText('POINT(-77.2311 39.8309)'),
    'Pennsylvania',
    'Site of the Battle of Gettysburg (July 1-3, 1863), the bloodiest battle of the Civil War and the turning point of the conflict.',
    'cwsac_PA002'),

(3, 'Antietam', 'battlefield',
    ST_GeogFromText('POINT(-77.7453 39.4747)'),
    'Maryland',
    'Site of the Battle of Antietam (September 17, 1862), the single bloodiest day in American military history with approximately 23,000 casualties.',
    'cwsac_MD003'),

(4, 'Vicksburg', 'battlefield',
    ST_GeogFromText('POINT(-90.8779 32.3526)'),
    'Mississippi',
    'Site of the Siege of Vicksburg (May 18 - July 4, 1863). Union victory gave control of the Mississippi River.',
    'cwsac_MS009'),

(5, 'Chancellorsville', 'battlefield',
    ST_GeogFromText('POINT(-77.6450 38.3058)'),
    'Virginia',
    'Site of the Battle of Chancellorsville (April 30 - May 6, 1863). Confederate tactical victory but cost the life of Stonewall Jackson.',
    'cwsac_VA032'),

(6, 'Bull Run (Manassas)', 'battlefield',
    ST_GeogFromText('POINT(-77.5214 38.8128)'),
    'Virginia',
    'Site of two major battles: First Battle of Bull Run (July 21, 1861) and Second Battle of Bull Run (August 28-30, 1862).',
    'cwsac_VA005'),

(7, 'Shiloh', 'battlefield',
    ST_GeogFromText('POINT(-88.3215 35.1486)'),
    'Tennessee',
    'Site of the Battle of Shiloh (April 6-7, 1862). One of the bloodiest battles in the Western Theater.',
    'cwsac_TN003'),

(8, 'Fredericksburg', 'battlefield',
    ST_GeogFromText('POINT(-77.4605 38.3032)'),
    'Virginia',
    'Site of the Battle of Fredericksburg (December 11-15, 1862). Decisive Confederate victory.',
    'cwsac_VA044'),

(9, 'Chickamauga', 'battlefield',
    ST_GeogFromText('POINT(-85.2606 34.9217)'),
    'Georgia',
    'Site of the Battle of Chickamauga (September 18-20, 1863). Second bloodiest battle after Gettysburg.',
    'cwsac_GA004'),

(10, 'Chattanooga', 'battlefield',
    ST_GeogFromText('POINT(-85.3097 35.0456)'),
    'Tennessee',
    'Site of the Battles for Chattanooga (November 23-25, 1863). Union victory opened the way for Sherman''s Atlanta Campaign.',
    'cwsac_TN018'),

-- Strategic Locations and Forts
(11, 'Appomattox Court House', 'landmark',
    ST_GeogFromText('POINT(-78.7969 37.3765)'),
    'Virginia',
    'Site where General Robert E. Lee surrendered to General Ulysses S. Grant on April 9, 1865, effectively ending the Civil War.',
    'nps_apco'),

(12, 'Richmond', 'capital',
    ST_GeogFromText('POINT(-77.4360 37.5407)'),
    'Virginia',
    'Capital of the Confederate States of America from 1861 to 1865.',
    'city_richmond_va'),

(13, 'Washington, D.C.', 'capital',
    ST_GeogFromText('POINT(-77.0369 38.9072)'),
    'District of Columbia',
    'Capital of the United States and center of Union government during the Civil War.',
    'city_washington_dc'),

(14, 'Atlanta', 'city',
    ST_GeogFromText('POINT(-84.3880 33.7490)'),
    'Georgia',
    'Major Confederate rail hub and industrial center. Captured by Sherman in September 1864.',
    'city_atlanta_ga'),

(15, 'Fort Henry', 'fort',
    ST_GeogFromText('POINT(-88.0353 36.3737)'),
    'Tennessee',
    'Confederate fort on the Tennessee River. Captured by Union forces on February 6, 1862.',
    'cwsac_TN001'),

(16, 'Fort Donelson', 'fort',
    ST_GeogFromText('POINT(-87.8617 36.4878)'),
    'Tennessee',
    'Confederate fort on the Cumberland River. Surrendered to Grant on February 16, 1862.',
    'cwsac_TN002'),

(17, 'Petersburg', 'battlefield',
    ST_GeogFromText('POINT(-77.4019 37.2279)'),
    'Virginia',
    'Site of the Siege of Petersburg (June 1864 - April 1865). Key to the defense of Richmond.',
    'cwsac_VA065'),

(18, 'Spotsylvania Court House', 'battlefield',
    ST_GeogFromText('POINT(-77.5911 38.2022)'),
    'Virginia',
    'Site of the Battle of Spotsylvania Court House (May 8-21, 1864). Part of Grant''s Overland Campaign.',
    'cwsac_VA048'),

(19, 'Cold Harbor', 'battlefield',
    ST_GeogFromText('POINT(-77.2897 37.5886)'),
    'Virginia',
    'Site of the Battle of Cold Harbor (May 31 - June 12, 1864). Costly Union assault against entrenched Confederates.',
    'cwsac_VA049'),

(20, 'The Wilderness', 'battlefield',
    ST_GeogFromText('POINT(-77.7306 38.3208)'),
    'Virginia',
    'Site of the Battle of the Wilderness (May 5-7, 1864). Opening battle of Grant''s Overland Campaign.',
    'cwsac_VA046');

-- Reset sequence to continue after manual inserts
SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations));
