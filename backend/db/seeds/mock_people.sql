-- Civil War Interactive Map - Mock People Data
-- Seed file: mock_people.sql
-- Contains historically accurate data for major Civil War figures

-- Reset sequence for consistent IDs during development
-- ALTER SEQUENCE people_id_seq RESTART WITH 1;

INSERT INTO people (id, name, birth_date, death_date, side, rank, highest_rank, biography, image_url, wikipedia_url, wikidata_id) VALUES

-- Union Commanders
(1, 'Ulysses S. Grant', '1822-04-27', '1885-07-23', 'union',
    'Brigadier General', 'General of the Army',
    'Ulysses S. Grant was the commanding general of the Union Army during the final years of the American Civil War. His victory at Vicksburg and subsequent appointment as general-in-chief led to Union victory. He later served as the 18th President of the United States (1869-1877).',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ulysses_S._Grant_1870-1880.jpg/440px-Ulysses_S._Grant_1870-1880.jpg',
    'https://en.wikipedia.org/wiki/Ulysses_S._Grant',
    'Q34836'),

(2, 'William Tecumseh Sherman', '1820-02-08', '1891-02-14', 'union',
    'Brigadier General', 'General of the Army',
    'William Tecumseh Sherman served as a Union general during the Civil War. He is best known for his March to the Sea and his concept of "total war" - targeting infrastructure and civilian morale to break Confederate resistance.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/William-Tecumseh-Sherman.jpg/440px-William-Tecumseh-Sherman.jpg',
    'https://en.wikipedia.org/wiki/William_Tecumseh_Sherman',
    'Q189652'),

(3, 'George G. Meade', '1815-12-31', '1872-11-06', 'union',
    'Brigadier General', 'Major General',
    'George Gordon Meade commanded the Army of the Potomac at the decisive Battle of Gettysburg in July 1863. He continued to command the army through the end of the war, though Grant accompanied and directed its operations.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/George_Meade_Standing.jpg/440px-George_Meade_Standing.jpg',
    'https://en.wikipedia.org/wiki/George_Meade',
    'Q312287'),

(4, 'George B. McClellan', '1826-12-03', '1885-10-29', 'union',
    'Major General', 'Major General',
    'George Brinton McClellan organized the Army of the Potomac and served as general-in-chief of the Union Army (1861-1862). Known for his organizational skills but criticized for his cautious approach to combat. He ran against Lincoln in the 1864 presidential election.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/GeorgeMcClellan.jpg/440px-GeorgeMcClellan.jpg',
    'https://en.wikipedia.org/wiki/George_B._McClellan',
    'Q310192'),

(5, 'Philip Sheridan', '1831-03-06', '1888-08-05', 'union',
    'Captain', 'General of the Army',
    'Philip Henry Sheridan was a career United States Army officer and a Union general in the Civil War. His Shenandoah Valley campaigns in 1864 destroyed Confederate resources and his cavalry played a crucial role at Appomattox.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Philip_Sheridan_-_Brady-Handy-cropped.jpg/440px-Philip_Sheridan_-_Brady-Handy-cropped.jpg',
    'https://en.wikipedia.org/wiki/Philip_Sheridan',
    'Q353116'),

(6, 'Ambrose Burnside', '1824-05-23', '1881-09-13', 'union',
    'Colonel', 'Major General',
    'Ambrose Everett Burnside led Union forces at the disastrous Battle of Fredericksburg. His distinctive facial hair gave rise to the term "sideburns." He later served as Governor of Rhode Island and U.S. Senator.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Ambrose_Burnside_-_Brady-Handy.jpg/440px-Ambrose_Burnside_-_Brady-Handy.jpg',
    'https://en.wikipedia.org/wiki/Ambrose_Burnside',
    'Q359410'),

(7, 'Joseph Hooker', '1814-11-13', '1879-10-31', 'union',
    'Brigadier General', 'Major General',
    'Joseph Hooker commanded the Army of the Potomac and was defeated at Chancellorsville. He later served successfully in the Western Theater, particularly at the Battle of Chattanooga.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Joseph_Hooker_-_Brady-Handy.jpg/440px-Joseph_Hooker_-_Brady-Handy.jpg',
    'https://en.wikipedia.org/wiki/Joseph_Hooker',
    'Q458437'),

-- Confederate Commanders
(8, 'Robert E. Lee', '1807-01-19', '1870-10-12', 'confederate',
    'Colonel (U.S. Army)', 'General',
    'Robert Edward Lee was the most celebrated Confederate general. He commanded the Army of Northern Virginia and is widely considered one of the most skilled tacticians in American history. His surrender at Appomattox effectively ended the war.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Robert_Edward_Lee.jpg/440px-Robert_Edward_Lee.jpg',
    'https://en.wikipedia.org/wiki/Robert_E._Lee',
    'Q165557'),

(9, 'Thomas J. "Stonewall" Jackson', '1824-01-21', '1863-05-10', 'confederate',
    'Colonel', 'Lieutenant General',
    'Thomas Jonathan "Stonewall" Jackson was one of the most gifted tactical commanders in U.S. history. He earned his nickname at First Bull Run and led brilliant campaigns in the Shenandoah Valley. He was mortally wounded by friendly fire at Chancellorsville.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Stonewall_Jackson_by_Routzahn%2C_1862.png/440px-Stonewall_Jackson_by_Routzahn%2C_1862.png',
    'https://en.wikipedia.org/wiki/Stonewall_Jackson',
    'Q215931'),

(10, 'James Longstreet', '1821-01-08', '1904-01-02', 'confederate',
    'Major', 'Lieutenant General',
    'James Longstreet was one of Lee''s most trusted subordinates. He commanded the First Corps of the Army of Northern Virginia and was Lee''s "Old War Horse." His delayed attack at Gettysburg remained controversial.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/James_Longstreet.jpg/440px-James_Longstreet.jpg',
    'https://en.wikipedia.org/wiki/James_Longstreet',
    'Q707260'),

(11, 'J.E.B. Stuart', '1833-02-06', '1864-05-12', 'confederate',
    'Lieutenant Colonel', 'Major General',
    'James Ewell Brown "Jeb" Stuart was a Confederate cavalry commander known for his reconnaissance and raiding skills. His absence during the Gettysburg campaign is often cited as a factor in the Confederate defeat. He was mortally wounded at Yellow Tavern.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Jeb_stuart.jpg/440px-Jeb_stuart.jpg',
    'https://en.wikipedia.org/wiki/J._E._B._Stuart',
    'Q354544'),

(12, 'P.G.T. Beauregard', '1818-05-28', '1893-02-20', 'confederate',
    'Major', 'General',
    'Pierre Gustave Toutant Beauregard ordered the first shots of the war at Fort Sumter and commanded Confederate forces at First Bull Run. He later served in the Western Theater and defended Petersburg.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/P._G._T._Beauregard.jpg/440px-P._G._T._Beauregard.jpg',
    'https://en.wikipedia.org/wiki/P._G._T._Beauregard',
    'Q544773'),

(13, 'Braxton Bragg', '1817-03-22', '1876-09-27', 'confederate',
    'Lieutenant Colonel', 'General',
    'Braxton Bragg commanded the Army of Tennessee and won the Battle of Chickamauga but failed to follow up the victory. His difficult personality and questionable decisions made him unpopular with his subordinates.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Braxton_Bragg.jpg/440px-Braxton_Bragg.jpg',
    'https://en.wikipedia.org/wiki/Braxton_Bragg',
    'Q506496'),

(14, 'Joseph E. Johnston', '1807-02-03', '1891-03-21', 'confederate',
    'Brigadier General (U.S. Army)', 'General',
    'Joseph Eggleston Johnston commanded Confederate forces in Virginia early in the war and later the Army of Tennessee. His defensive strategy against Sherman frustrated both his enemy and Confederate President Jefferson Davis.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Joseph_E._Johnston.jpg/440px-Joseph_E._Johnston.jpg',
    'https://en.wikipedia.org/wiki/Joseph_E._Johnston',
    'Q548590'),

(15, 'A.P. Hill', '1825-11-09', '1865-04-02', 'confederate',
    'First Lieutenant', 'Lieutenant General',
    'Ambrose Powell Hill commanded the Light Division and later the Third Corps of the Army of Northern Virginia. He was killed in action during the final days of the Petersburg Campaign.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/A._P._Hill.jpg/440px-A._P._Hill.jpg',
    'https://en.wikipedia.org/wiki/A._P._Hill',
    'Q501318'),

-- Political Figures
(16, 'Abraham Lincoln', '1809-02-12', '1865-04-15', 'union',
    'President', 'President',
    'Abraham Lincoln served as the 16th President of the United States and led the nation through the Civil War. He preserved the Union, abolished slavery with the Emancipation Proclamation and Thirteenth Amendment, and was assassinated by John Wilkes Booth.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/440px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
    'https://en.wikipedia.org/wiki/Abraham_Lincoln',
    'Q91'),

(17, 'Jefferson Davis', '1808-06-03', '1889-12-06', 'confederate',
    'President', 'President',
    'Jefferson Finis Davis served as the President of the Confederate States of America for its entire existence. A former U.S. Senator and Secretary of War, he struggled to maintain Confederate unity and was captured after the war.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/President-Jefferson-Davis.jpg/440px-President-Jefferson-Davis.jpg',
    'https://en.wikipedia.org/wiki/Jefferson_Davis',
    'Q162269');

-- Reset sequence to continue after manual inserts
SELECT setval('people_id_seq', (SELECT MAX(id) FROM people));
